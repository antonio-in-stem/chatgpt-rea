#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum SharePhase {
    Idle,
    Creating,
    CreateFailed,
    CopyFailed,
    Blocked,
}
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum ShareDemoOutcome {
    Success,
    CreateFailed,
    CopyFailed,
    Blocked,
}
impl ShareDemoOutcome {
    fn from_environment() -> Self {
        match std::env::var("NATIVE_SHARE_DEMO_OUTCOME").as_deref() {
            Ok("create-failed") => Self::CreateFailed,
            Ok("copy-failed") => Self::CopyFailed,
            Ok("blocked") => Self::Blocked,
            _ => Self::Success,
        }
    }
}
impl WorkspaceApp {
    fn share_action_label(&self) -> &'static str {
        if self.share_phase == SharePhase::Blocked {
            return "Close";
        }
        let Some(snapshot) = &self.share_preview else {
            return "Create link";
        };
        match self.share_snapshots.get(&snapshot.id) {
            None => "Create link",
            Some(existing)
                if existing.messages.last().map(|m| &m.id)
                    != snapshot.messages.last().map(|m| &m.id) =>
            {
                "Update link"
            }
            Some(_) => "Copy link",
        }
    }
    fn begin_share(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        if self.dialog != Some(Dialog::Share) || self.share_phase == SharePhase::Creating {
            return;
        }
        if self.share_phase == SharePhase::Blocked {
            self.act(Action::Close, window, cx);
            return;
        }
        let Some(snapshot) = self.share_preview.clone() else {
            return;
        };
        self.share_phase = SharePhase::Creating;
        let generation = self.share_generation;
        let outcome = std::mem::replace(&mut self.share_demo_outcome, ShareDemoOutcome::Success);
        cx.spawn_in(window, async move |this, cx| {
            cx.background_executor()
                .timer(Duration::from_millis(300))
                .await;
            let _ = this.update_in(cx, |app, window, cx| {
                if app.dialog != Some(Dialog::Share) || app.share_generation != generation {
                    return;
                }
                app.share_phase = match outcome {
                    ShareDemoOutcome::CreateFailed => SharePhase::CreateFailed,
                    ShareDemoOutcome::Blocked => SharePhase::Blocked,
                    ShareDemoOutcome::CopyFailed => SharePhase::CopyFailed,
                    ShareDemoOutcome::Success => SharePhase::Idle,
                };
                if matches!(
                    outcome,
                    ShareDemoOutcome::Success | ShareDemoOutcome::CopyFailed
                ) {
                    let id = snapshot.id.clone();
                    let url = format!("https://chatgpt-demo.invalid/share/{id}");
                    app.share_snapshots.insert(id, snapshot);
                    if outcome == ShareDemoOutcome::CopyFailed {
                        app.share_recovery_url
                            .update(cx, |input, cx| input.set_value(url, window, cx));
                    } else {
                        cx.write_to_clipboard(ClipboardItem::new_string(url));
                        app.act(Action::Close, window, cx);
                        app.notice =
                            "Demo link copied. This conversation has not been published.".into();
                    }
                }
                cx.notify();
            });
        })
        .detach();
    }
}

// Personal conversation branch of the recovered thread-dialog and thread-preview.
// Demo snapshots are in memory only. The .invalid address never publishes user data.
impl WorkspaceApp {
    fn share_dialog_view(&self, window: &mut Window, cx: &mut Context<Self>) -> AnyElement {
        use gpui_kit::base::Disableable;
        use gpui_kit::component::button::Button;
        let colors = cx.theme().colors.clone();
        let Some(snapshot) = self.share_preview.as_ref() else {
            return div().into_any_element();
        };
        let width = 520_f32.min(f32::from(window.viewport_size().width) - 32.);
        let title = if snapshot.title.trim().is_empty() {
            "Share chat".to_owned()
        } else {
            format!("Share {}", snapshot.title.trim())
        };
        let mut transcript = div().p(px(16.)).flex().flex_col().gap(px(16.));
        for (index, message) in snapshot.messages.iter().enumerate() {
            let user = message.role == MessageRole::User;
            transcript = transcript.child(
                div()
                    .text_size(px(14.))
                    .line_height(px(20.))
                    .when(user, |d| {
                        d.ml_auto()
                            .max_w(relative(0.77))
                            .rounded(px(16.))
                            .px(px(12.))
                            .py(px(8.))
                            .bg(colors.secondary)
                    })
                    .child(
                        TextView::markdown(("share-message", index), message.content.clone())
                            .selectable(false),
                    ),
            );
        }
        let preview = div()
            .relative()
            .id("share-preview")
            .test_support()
            .h(px(((width - 40.) * 630. / 1200.).max(224.)))
            .flex_shrink_0()
            .overflow_hidden()
            .rounded(px(8.))
            .border_1()
            .border_color(colors.border)
            .bg(colors.background)
            .child(transcript)
            .child(
                div()
                    .absolute()
                    .inset_0()
                    .occlude()
                    .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation()),
            )
            .child(
                div()
                    .absolute()
                    .left_0()
                    .right_0()
                    .bottom_0()
                    .h(px(64.))
                    .bg(linear_gradient(
                        0.,
                        linear_color_stop(colors.background, 0.),
                        linear_color_stop(colors.background.opacity(0.), 1.),
                    )),
            );
        let mut body = div()
            .id("share-body")
            .test_support()
            .min_h_0()
            .overflow_y_scroll()
            .py(px(20.))
            .flex()
            .flex_col()
            .gap(px(12.))
            .child(preview)
            .child(
                div()
                    .text_size(px(14.))
                    .text_color(colors.muted_foreground)
                    .whitespace_normal()
                    .child("Anyone with the link can view this chat"),
            )
            .child(
                div()
                    .text_size(px(12.))
                    .text_color(colors.muted_foreground)
                    .child("Local demo · no public link is created"),
            );
        if self.share_phase == SharePhase::Blocked {
            body = div()
                .id("share-blocked")
                .test_support()
                .py(px(40.))
                .text_size(px(14.))
                .child("This conversation can't be shared");
        } else if matches!(
            self.share_phase,
            SharePhase::CreateFailed | SharePhase::CopyFailed
        ) {
            body = body.child(
                div()
                    .id("share-error")
                    .test_support()
                    .text_size(px(14.))
                    .text_color(colors.danger)
                    .whitespace_normal()
                    .child(if self.share_phase == SharePhase::CopyFailed {
                        "Share link created, but it could not be copied"
                    } else {
                        "Could not create share link"
                    }),
            );
            if self.share_phase == SharePhase::CopyFailed {
                body = body.child(
                    Input::new(&self.share_recovery_url)
                        .readonly(true)
                        .aria_label("Share link"),
                );
            }
        }
        let busy = self.share_phase == SharePhase::Creating;
        let panel = div()
            .relative()
            .w(px(width))
            .max_h(relative(0.9))
            .p(px(20.))
            .rounded(px(24.))
            .bg(colors.popover)
            .shadow_lg()
            .flex()
            .flex_col()
            .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation())
            .child(
                div()
                    .pr(px(32.))
                    .mb(px(8.))
                    .flex_shrink_0()
                    .flex()
                    .flex_col()
                    .gap(px(4.))
                    .child(
                        div()
                            .text_size(px(18.))
                            .line_height(px(28.))
                            .font_weight(FontWeight::SEMIBOLD)
                            .truncate()
                            .child(title),
                    )
                    .child(
                        div()
                            .text_size(px(14.))
                            .text_color(colors.muted_foreground)
                            .whitespace_normal()
                            .child("Your name and any messages you add after sharing stay private"),
                    ),
            )
            .when(!busy, |panel| {
                panel.child(
                    div()
                        .absolute()
                        .top(px(16.))
                        .right(px(16.))
                        .child(self.chat_icon_button("close", "Close", 780, Action::Close, cx)),
                )
            })
            .child(body)
            .child(
                div()
                    .mt(px(20.))
                    .flex_shrink_0()
                    .flex()
                    .justify_end()
                    .gap(px(12.))
                    .child(
                        Button::new("share-submit")
                            .outline()
                            .label(self.share_action_label())
                            .disabled(busy)
                            .loading(busy)
                            .on_click(cx.listener(|app, _, window, cx| {
                                app.act(Action::ShareCommit, window, cx)
                            })),
                    ),
            );
        div()
            .absolute()
            .inset_0()
            .bg(rgba(0x00000044))
            .flex()
            .items_center()
            .justify_center()
            .on_mouse_down(
                MouseButton::Left,
                cx.listener(|app, _, window, cx| app.act(Action::Close, window, cx)),
            )
            .child(
                panel
                    .focus_trap("share-dialog", &self.modal_focus)
                    .test_support(),
            )
            .occlude()
            .into_any_element()
    }
}
