// Source: permissions-mode-dropdown-7bfb50f8e130.js. All mutations are demo state.
impl WorkspaceApp {
    fn permission_index(&self) -> usize {
        match self
            .workspace
            .conversation(&self.active)
            .map(|c| c.demo_permissions)
            .unwrap_or_default()
        {
            native_core::DemoPermissions::Ask => 0,
            native_core::DemoPermissions::GuardianApprovals => 1,
            native_core::DemoPermissions::FullAccess => 2,
        }
    }
    fn permission_label(&self) -> &'static str {
        ["Ask for approval", "Approve for me", "Full access"][self.permission_index()]
    }
    fn permissions_view(
        &self,
        dialog: Dialog,
        window: &Window,
        cx: &mut Context<Self>,
    ) -> AnyElement {
        use gpui_kit::component::button::{Button, ButtonVariants};
        let confirm = dialog == Dialog::FullAccessConfirm;
        let width =
            px(if confirm { 520. } else { 360. }).min(window.viewport_size().width - px(24.));
        let mut panel = div()
            .id("permissions-panel")
            .test_support()
            .w(width)
            .p(px(if confirm { 24. } else { 6. }))
            .rounded(px(12.))
            .bg(cx.theme().colors.popover)
            .border_1()
            .border_color(cx.theme().colors.border)
            .shadow_lg()
            .flex()
            .flex_col()
            .gap(px(4.))
            .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation());
        if confirm {
            panel=panel.child(div().text_size(px(20.)).font_weight(FontWeight::SEMIBOLD).child("Turn on Full Access?"))
                .child(div().py(px(12.)).child("Codex will be able to run commands, use the internet, and create and edit files anywhere on this computer without your permission. This includes but is not limited to:"));
            for (title, description) in [
                (
                    "Files and folders",
                    "Create, edit, and delete files anywhere on this computer",
                ),
                (
                    "Terminal commands",
                    "Run commands, install software, and change system settings",
                ),
                (
                    "Internet and connected apps",
                    "Access websites, send data, and use enabled plugins",
                ),
            ] {
                panel = panel.child(
                    div()
                        .py(px(8.))
                        .flex()
                        .flex_col()
                        .gap(px(4.))
                        .child(div().font_weight(FontWeight::MEDIUM).child(title))
                        .child(
                            div()
                                .text_color(cx.theme().colors.muted_foreground)
                                .child(description),
                        ),
                );
            }
            panel = panel
                .child(
                    div()
                        .text_size(px(12.))
                        .text_color(cx.theme().colors.muted_foreground)
                        .child("Demo: this choice only changes the interface."),
                )
                .child(
                    div()
                        .pt(px(16.))
                        .flex()
                        .justify_end()
                        .gap(px(8.))
                        .child(
                            Button::new("permissions-cancel")
                                .label("Go back")
                                .on_click(cx.listener(|s, _, w, cx| s.act(Action::Close, w, cx))),
                        )
                        .child(
                            Button::new("permissions-confirm")
                                .primary()
                                .label("Confirm")
                                .on_click(cx.listener(|s, _, w, cx| {
                                    s.act(Action::ConfirmFullAccess, w, cx)
                                })),
                        ),
                );
        } else {
            panel = panel.child(
                div()
                    .p(px(8.))
                    .text_size(px(14.))
                    .font_weight(FontWeight::MEDIUM)
                    .child("How should ChatGPT actions be approved?"),
            );
            for (index, (label, _, action, key)) in
                self.composer_menu_actions(dialog).into_iter().enumerate()
            {
                let description = [
                    "Always ask to edit external files and use the internet",
                    "Only ask for actions detected as potentially unsafe",
                    "Unrestricted access to the internet and any file on your computer",
                ][index];
                panel = panel.child(
                    Button::new(("app-btn", key))
                        .ghost()
                        .w_full()
                        .h_auto()
                        .p(px(8.))
                        .rounded(px(6.))
                        .accessibility_label(label)
                        .when(index == self.composer_menu_index, |b| {
                            b.bg(cx.theme().colors.secondary)
                        })
                        .child(
                            div()
                                .w_full()
                                .flex()
                                .items_center()
                                .gap(px(8.))
                                .child(
                                    div()
                                        .flex_1()
                                        .min_w_0()
                                        .flex()
                                        .flex_col()
                                        .items_start()
                                        .gap(px(4.))
                                        .child(div().text_size(px(14.)).child(label))
                                        .child(
                                            div()
                                                .text_size(px(13.))
                                                .text_left()
                                                .whitespace_normal()
                                                .text_color(cx.theme().colors.muted_foreground)
                                                .child(description),
                                        ),
                                )
                                .when(index == self.permission_index(), |d| {
                                    d.child(native_ui::icon("check", 16.))
                                }),
                        )
                        .on_click(cx.listener(move |s, _, w, cx| s.act(action.clone(), w, cx))),
                );
            }
        }
        let panel = panel.focus_trap("permissions-focus", &self.modal_focus);
        let mut layer = div().absolute().inset_0().occlude().on_mouse_down(
            MouseButton::Left,
            cx.listener(|s, _, w, cx| s.act(Action::Close, w, cx)),
        );
        if confirm {
            layer = layer
                .bg(native_ui::tokens::dialog_overlay())
                .flex()
                .items_center()
                .justify_center()
                .child(panel);
        } else {
            let bounds = self.composer_bounds.get();
            layer = layer.child(
                anchored()
                    .anchor(Anchor::BottomLeft)
                    .position(point(bounds.left() + px(36.), bounds.top() - px(8.)))
                    .child(panel),
            );
        }
        layer.into_any_element()
    }
}
