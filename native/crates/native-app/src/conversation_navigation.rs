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

#[derive(Default)]
pub(super) struct NavigationUi {
    pub preview: Option<String>,
    preview_task: Option<Task<()>>,
    focused: Option<String>,
    focuses: HashMap<String, (FocusHandle, Vec<Subscription>)>,
    bounds: std::rc::Rc<std::cell::RefCell<HashMap<String, Bounds<Pixels>>>>,
    pub scrub: Option<(String, bool)>,
    pointer: Option<Point<Pixels>>,
}

impl WorkspaceApp {
    pub(super) fn navigate_message(&mut self, id: &str, cx: &mut Context<Self>) {
        self.navigate_message_with_behavior(id, false, cx);
    }
    fn navigate_message_with_behavior(&mut self, id: &str, instant: bool, cx: &mut Context<Self>) {
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
        if instant || self.settings.read(cx).current_settings().reduced_motion {
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

    fn navigation_preview_request(
        &mut self,
        id: Option<String>,
        immediate: bool,
        cx: &mut Context<Self>,
    ) {
        let id = id.filter(|id| {
            self.workspace
                .conversation(&self.active)
                .ok()
                .is_some_and(|chat| chat.messages.iter().any(|m| &m.id == id))
        });
        self.navigation_ui.preview_task.take();
        self.navigation_ui.preview = None;
        if let Some(id) = id {
            if immediate {
                self.navigation_ui.preview = Some(id);
            } else {
                let conversation = self.active.clone();
                self.navigation_ui.preview_task = Some(cx.spawn(async move |this, cx| {
                    cx.background_executor()
                        .timer(Duration::from_millis(150))
                        .await;
                    let _ = this.update(cx, |s, cx| {
                        if s.active == conversation
                            && s.route == Route::Chat
                            && s.navigation_hover.as_ref() == Some(&id)
                        {
                            s.navigation_ui.preview = Some(id);
                            cx.notify();
                        }
                    });
                }));
            }
        }
        cx.notify();
    }
    fn navigation_focus_handle(
        &mut self,
        id: &str,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) -> FocusHandle {
        if let Some((focus, _)) = self.navigation_ui.focuses.get(id) {
            return focus.clone();
        }
        let focus = cx.focus_handle();
        let in_id = id.to_owned();
        let out_id = id.to_owned();
        let subscriptions = vec![
            cx.on_focus_in(&focus, window, move |s, _, cx| {
                if !s.navigation_ui.focuses.contains_key(&in_id) {
                    return;
                }
                s.navigation_ui.focused = Some(in_id.clone());
                s.navigation_preview_request(Some(in_id.clone()), true, cx);
            }),
            cx.on_focus_out(&focus, window, move |s, _, _, cx| {
                if s.navigation_ui.focused.as_ref() == Some(&out_id) {
                    s.navigation_ui.focused = None;
                    s.navigation_preview_request(s.navigation_hover.clone(), false, cx);
                }
            }),
        ];
        self.navigation_ui
            .focuses
            .insert(id.to_owned(), (focus.clone(), subscriptions));
        focus
    }
    pub(super) fn navigation_scrub_move(&mut self, event: &MouseMoveEvent, cx: &mut Context<Self>) {
        let Some((current, _)) = self.navigation_ui.scrub.as_ref() else {
            return;
        };
        self.navigation_ui.pointer = Some(event.position);
        if event.pressed_button != Some(MouseButton::Left) {
            self.navigation_scrub_finish(cx);
            return;
        }
        let nearest = self
            .navigation_ui
            .bounds
            .borrow()
            .iter()
            .min_by(|(_, a), (_, b)| {
                f32::from((a.center().y - event.position.y).abs())
                    .total_cmp(&f32::from((b.center().y - event.position.y).abs()))
            })
            .map(|(id, _)| id.clone());
        if let Some(id) = nearest.filter(|id| id != current) {
            self.navigation_ui.scrub = Some((id.clone(), true));
            self.navigation_hover = Some(id.clone());
            self.navigation_preview_request(Some(id.clone()), true, cx);
            self.navigate_message_with_behavior(&id, true, cx);
        }
    }
    pub(super) fn navigation_scrub_finish(&mut self, cx: &mut Context<Self>) {
        if let Some((id, moved)) = self.navigation_ui.scrub.take() {
            if !moved {
                self.navigate_message(&id, cx);
            }
            let inside = self.navigation_ui.pointer.is_some_and(|position| {
                self.navigation_ui
                    .bounds
                    .borrow()
                    .values()
                    .any(|bounds| bounds.contains(&position))
            });
            self.navigation_hover = inside.then_some(id.clone());
            self.navigation_preview_request(inside.then_some(id), true, cx);
            cx.notify();
        }
    }

    pub(super) fn conversation_rail(
        &mut self,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) -> AnyElement {
        let Some(chat) = self.workspace.conversation(&self.active).ok() else {
            return div().into_any_element();
        };
        let items = chat
            .messages
            .iter()
            .enumerate()
            .filter(|(_, m)| m.role == MessageRole::User)
            .map(|(index, m)| (index, m.clone()))
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
            self.navigation_ui.preview_task.take();
            self.navigation_ui.preview = None;
            self.navigation_ui.scrub = None;
            self.navigation_hover = None;
            return div().into_any_element();
        }
        let hovered = items.iter().position(|(_, m)| {
            self.navigation_hover
                .as_ref()
                .or(self.navigation_ui.focused.as_ref())
                .map(String::as_str)
                == Some(m.id.as_str())
        });
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
            let down_id = id.clone();
            let bounds_id = id.clone();
            let measured = self.navigation_ui.bounds.clone();
            let focus = self.navigation_focus_handle(&id, window, cx);
            markers = markers.child(
                div()
                    .relative()
                    .track_focus(&focus)
                    .child(
                        canvas(
                            move |bounds, _, _| {
                                measured.borrow_mut().insert(bounds_id.clone(), bounds);
                            },
                            |_, _, _, _| {},
                        )
                        .absolute()
                        .inset_0(),
                    )
                    .child(
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
                            if s.navigation_ui.scrub.is_some() {
                                return;
                            }
                            if *hovered {
                                s.navigation_hover = Some(hover_id.clone());
                                s.navigation_preview_request(Some(hover_id.clone()), false, cx);
                            } else if s.navigation_hover.as_ref() == Some(&hover_id) {
                                s.navigation_hover = None;
                                s.navigation_preview_request(
                                    s.navigation_ui.focused.clone(),
                                    true,
                                    cx,
                                );
                            }
                        }))
                        .on_mouse_down(
                            MouseButton::Left,
                            cx.listener(move |s, event: &MouseDownEvent, _, cx| {
                                s.navigation_ui.pointer = Some(event.position);
                                s.navigation_ui.scrub = Some((down_id.clone(), false));
                                s.navigation_preview_request(Some(down_id.clone()), true, cx);
                            }),
                        )
                        .on_click(cx.listener(move |s, _, _, cx| {
                            if s.navigation_ui.scrub.is_none() {
                                s.navigate_message(&id, cx);
                            }
                        })),
                    ),
            );
        }
        let mut layer = div().absolute().inset_0().child(
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
                .child(markers),
        );
        if let Some(id) = self.navigation_ui.preview.as_ref() {
            if let (Some((index, message)), Some(bounds)) = (
                items.iter().find(|(_, m)| &m.id == id),
                self.navigation_ui.bounds.borrow().get(id).cloned(),
            ) {
                let answer = self
                    .workspace
                    .conversation(&self.active)
                    .ok()
                    .and_then(|chat| {
                        chat.messages
                            .iter()
                            .skip(index + 1)
                            .take_while(|m| m.role != MessageRole::User)
                            .find(|m| m.role == MessageRole::Assistant)
                    })
                    .map(|m| m.content.clone())
                    .unwrap_or_default();
                let delta = bounds.center().y - viewport.center().y;
                let preview = div()
                    .id("conversation-navigation-preview")
                    .test_support()
                    .relative()
                    .top(delta)
                    .w_full()
                    .p(px(8.))
                    .rounded(px(12.))
                    .border(px(0.5))
                    .border_color(cx.theme().colors.border)
                    .bg(cx.theme().colors.popover)
                    .shadow_lg()
                    .flex()
                    .flex_col()
                    .gap(px(8.))
                    .text_size(native_ui::typography::TextRole::Small.in_app(cx))
                    .line_height(px(20.))
                    .child(
                        div()
                            .truncate()
                            .font_weight(FontWeight::MEDIUM)
                            .child(message.content.clone()),
                    )
                    .when(!answer.is_empty(), |d| {
                        d.child(
                            div()
                                .line_clamp(3)
                                .overflow_hidden()
                                .text_color(cx.theme().colors.muted_foreground)
                                .child(answer),
                        )
                    });
                layer = layer.child(
                    div()
                        .absolute()
                        .left(px(52.))
                        .top_0()
                        .bottom_0()
                        .w(px(320.).min(window.viewport_size().width - px(16.)))
                        .flex()
                        .flex_col()
                        .justify_center()
                        .child(preview),
                );
            }
        }
        layer.into_any_element()
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
