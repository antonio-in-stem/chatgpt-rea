//! Source: bookmarked-thread-user-message-navigation E/A and navigation-rail yt/mt.
//! Local conversations are fully loaded; server reveal/bookmarks are separate contracts.
use super::*;

pub(super) fn next_target(tops: &[f32], previous: bool) -> Option<usize> {
    if previous {
        for (index, top) in tops.iter().enumerate().rev() {
            if top.abs() <= 24. {
                return index.checked_sub(1);
            }
            if *top < 0. {
                return Some(index);
            }
        }
        (!tops.is_empty()).then_some(0)
    } else {
        tops.iter().position(|top| *top > 24.)
    }
}

impl WorkspaceApp {
    pub(super) fn navigate_message(&mut self, id: &str, cx: &mut Context<Self>) {
        let index = self
            .workspace
            .conversation(&self.active)
            .ok()
            .and_then(|chat| chat.messages.iter().position(|m| m.id == id));
        let Some(bounds) = index.and_then(|index| self.transcript.bounds_for_item(index)) else {
            return;
        };
        let target = (self.transcript.bounds().top() - bounds.top())
            .clamp(-self.transcript.max_offset().y, px(0.));
        self.navigation_motion.take();
        let start = self.transcript.offset().y;
        if self.settings.read(cx).current_settings().reduced_motion {
            self.transcript.set_offset(point(px(0.), target));
            cx.notify();
            return;
        }
        let conversation = self.active.clone();
        self.navigation_motion = Some(cx.spawn(async move |this, cx| {
            // Browser smooth-scroll timing is platform-dependent. This native easing
            // is a demo approximation; target selection/alignment follow the source.
            for step in 1..=18 {
                cx.background_executor()
                    .timer(Duration::from_millis(16))
                    .await;
                if !this
                    .update(cx, |s, cx| {
                        if s.active != conversation || s.route != Route::Chat {
                            return false;
                        }
                        let progress = chat_motion::hero_ease_in_out(step as f32 / 18.);
                        s.transcript
                            .set_offset(point(px(0.), start + (target - start) * progress));
                        cx.notify();
                        true
                    })
                    .unwrap_or(false)
                {
                    break;
                }
            }
        }));
        cx.notify();
    }

    pub(super) fn navigation_key(&mut self, event: &KeyDownEvent, cx: &mut Context<Self>) -> bool {
        let modifiers = &event.keystroke.modifiers;
        if self.route != Route::Chat
            || self.dialog.is_some()
            || !modifiers.alt
            || modifiers.control
            || modifiers.shift
            || modifiers.platform
            || !matches!(event.keystroke.key.as_str(), "up" | "down")
        {
            return false;
        }
        let Some(chat) = self.workspace.conversation(&self.active).ok() else {
            return false;
        };
        let items = chat
            .messages
            .iter()
            .enumerate()
            .filter(|(_, m)| m.role == MessageRole::User)
            .filter_map(|(index, m)| {
                self.transcript.bounds_for_item(index).map(|bounds| {
                    (
                        m.id.clone(),
                        f32::from(
                            bounds.top() + self.transcript.offset().y
                                - self.transcript.bounds().top(),
                        ),
                    )
                })
            })
            .collect::<Vec<_>>();
        let tops = items.iter().map(|(_, top)| *top).collect::<Vec<_>>();
        let Some(target) = next_target(&tops, event.keystroke.key == "up") else {
            return false;
        };
        self.navigate_message(&items[target].0, cx);
        cx.stop_propagation();
        true
    }

    pub(super) fn conversation_rail(&self, window: &Window, cx: &mut Context<Self>) -> AnyElement {
        let Some(chat) = self.workspace.conversation(&self.active).ok() else {
            return div().into_any_element();
        };
        let items = chat
            .messages
            .iter()
            .enumerate()
            .filter(|(_, m)| m.role == MessageRole::User)
            .collect::<Vec<_>>();
        let left = if self.sidebar {
            f32::from(clamp_sidebar_width(
                px(self.workspace.settings.sidebar_width as f32),
                window.viewport_size().width,
            ))
        } else {
            48.
        };
        let canvas_width = f32::from(window.viewport_size().width) - left - 8.;
        let gutter = ((canvas_width - 768.) / 2.).max(24.);
        if items.len() < 4 || gutter < 48. {
            return div().into_any_element();
        }
        let hovered = items
            .iter()
            .position(|(_, m)| self.navigation_hover.as_deref() == Some(m.id.as_str()));
        let height = (items.len() as f32 * 10.)
            .min(f32::from(window.viewport_size().height) * 0.7)
            .min(640.);
        let viewport = self.transcript.bounds();
        let mut markers = div().flex().flex_col();
        for (ordinal, (index, message)) in items.iter().enumerate() {
            let visible = self
                .transcript
                .bounds_for_item(*index)
                .is_some_and(|bounds| {
                    let top = bounds.top() + self.transcript.offset().y;
                    let bottom = bounds.bottom() + self.transcript.offset().y;
                    bottom > viewport.top() + px(16.) && top < viewport.bottom()
                });
            let distance = hovered.map(|hover| hover.abs_diff(ordinal));
            let width = match distance {
                Some(0) => 26.,
                Some(1) => 20.,
                Some(2) => 14.,
                Some(3) => 10.,
                _ => 6.,
            };
            let mut ink = cx.theme().colors.foreground;
            ink.a = if distance == Some(0) {
                1.
            } else if visible && hovered.is_none() {
                0.6
            } else {
                0.4
            };
            let id = message.id.clone();
            let hover_id = id.clone();
            markers = markers.child(
                gpui_kit::component::button::Button::new(SharedString::from(format!(
                    "conversation-marker-{}",
                    id
                )))
                .ghost()
                .w(px(36.))
                .h(px(10.))
                .p_0()
                .rounded(px(2.))
                .accessibility_label(format!(
                    "Go to message {}: {}",
                    ordinal + 1,
                    message.content
                ))
                .child(
                    div()
                        .w(px(30.))
                        .h(px(2.))
                        .child(div().w(px(width)).h(px(2.)).bg(ink)),
                )
                .on_hover(cx.listener(move |s, hovered, _, cx| {
                    if *hovered {
                        s.navigation_hover = Some(hover_id.clone());
                    } else if s.navigation_hover.as_ref() == Some(&hover_id) {
                        s.navigation_hover = None;
                    }
                    cx.notify();
                }))
                .on_click(cx.listener(move |s, _, _, cx| s.navigate_message(&id, cx))),
            );
        }
        div()
            .id("conversation-navigation-rail")
            .test_support()
            .absolute()
            .left(px(16.))
            .top(relative(0.5))
            .mt(px(-height / 2.))
            .w(px(36.))
            .h(px(height))
            .overflow_y_scroll()
            .child(markers)
            .into_any_element()
    }
}

#[cfg(test)]
mod tests {
    use super::next_target;
    #[test]
    fn keyboard_targets_use_source_viewport_tolerance() {
        assert_eq!(next_target(&[], false), None);
        assert_eq!(next_target(&[0., 100., 200.], false), Some(1));
        assert_eq!(next_target(&[24., 100.], false), Some(1));
        assert_eq!(next_target(&[24.1, 100.], false), Some(0));
        assert_eq!(next_target(&[-100., -24., 80.], true), Some(0));
        assert_eq!(next_target(&[-100., -24.1, 80.], true), Some(1));
        assert_eq!(next_target(&[100., 200.], true), Some(0));
        assert_eq!(next_target(&[0., 100.], true), None);
    }
}
