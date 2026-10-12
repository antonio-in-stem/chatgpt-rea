// Personal conversation branch of the recovered thread-dialog and thread-preview.
// Demo snapshots are in memory only. The .invalid address never publishes user data.
impl WorkspaceApp {
    fn share_dialog_view(&self, window: &mut Window, cx: &mut Context<Self>) -> AnyElement {
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
                    .child(TextView::markdown(
                        ("share-message", index),
                        message.content.clone(),
                    )),
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
        let body = div()
            .id("share-body")
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
            .child(
                div()
                    .absolute()
                    .top(px(16.))
                    .right(px(16.))
                    .child(self.chat_icon_button("close", "Close", 780, Action::Close, cx)),
            )
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
                            .label(if self.share_snapshots.contains_key(&snapshot.id) {
                                "Copy link"
                            } else {
                                "Create link"
                            })
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
