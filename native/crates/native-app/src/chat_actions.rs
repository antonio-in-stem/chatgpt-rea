use super::*;
use gpui_kit::component::button::{Button, ButtonVariants};

/// Retained focus scope for the shipped user-message hover/focus-within toolbar.
pub(super) struct ChatMessageActions {
    pub(super) focus: FocusHandle,
    pub(super) hovered: bool,
    pub(super) focused: bool,
    pub(super) message: native_core::ChatMessage,
    pub(super) index: usize,
    parent: WeakEntity<WorkspaceApp>,
    _subscriptions: Vec<Subscription>,
}
impl ChatMessageActions {
    pub(super) fn new(
        message: native_core::ChatMessage,
        index: usize,
        parent: WeakEntity<WorkspaceApp>,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) -> Self {
        let focus = cx.focus_handle();
        let subscriptions = vec![
            cx.on_focus_in(&focus, window, |this, _, cx| {
                let _ = this;
                cx.notify();
            }),
            cx.on_focus_out(&focus, window, |this, _, _, cx| {
                let _ = this;
                cx.notify();
            }),
        ];
        Self {
            focus,
            hovered: false,
            focused: false,
            message,
            index,
            parent,
            _subscriptions: subscriptions,
        }
    }
    pub(super) fn visible(&self) -> bool {
        self.message.role != MessageRole::User || self.hovered || self.focused
    }
    pub(super) fn hover(&mut self, value: bool, cx: &mut Context<Self>) {
        if self.hovered != value {
            self.hovered = value;
            cx.notify();
        }
    }
    fn control(
        &self,
        icon: &'static str,
        label: &'static str,
        offset: usize,
        action: Action,
        cx: &mut Context<Self>,
    ) -> Button {
        let parent = self.parent.clone();
        Button::new(("app-btn", 1000 + self.index * 6 + offset))
            .ghost()
            .w(px(28.))
            .h(px(28.))
            .p_0()
            .rounded(px(6.))
            .accessibility_label(label)
            .tooltip(label)
            .child(native_ui::icon(icon, 18.).text_color(cx.theme().colors.muted_foreground))
            .on_click(move |_, window, cx| {
                let _ = parent.update(cx, |app, cx| app.act(action.clone(), window, cx));
            })
    }
}
impl Render for ChatMessageActions {
    fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        self.focused = self.focus.contains_focused(window, cx);
        let user = self.message.role == MessageRole::User;
        div()
            .id(("message-actions", self.index))
            .track_focus(&self.focus)
            .tab_group()
            .tab_stop(false)
            .flex()
            .items_center()
            .gap(px(2.))
            .opacity(if self.visible() { 1. } else { 0. })
            .when(user, |s| s.justify_end())
            .child(self.control(
                "copy",
                "Copy",
                0,
                Action::Copy(self.message.content.clone()),
                cx,
            ))
            .child(self.control(
                "branch",
                "Branch in new chat",
                1,
                Action::Branch(self.message.id.clone()),
                cx,
            ))
            .child(if user {
                self.control(
                    "edit",
                    "Edit message",
                    2,
                    Action::Edit(self.message.id.clone(), self.message.content.clone()),
                    cx,
                )
            } else {
                self.control(
                    "regenerate",
                    "Try again",
                    3,
                    Action::Regenerate(self.message.id.clone()),
                    cx,
                )
            })
    }
}
