// bZe base menu plus the Windows-only Settings append in CZe.
const EDIT_MENU_ITEMS: [(&str, &str); 8] = [
    ("Undo", "Ctrl+Z"), ("Redo", "Ctrl+Y"), ("Cut", "Ctrl+X"),
    ("Copy", "Ctrl+C"), ("Paste", "Ctrl+V"), ("Delete", "Delete"),
    ("Select All", "Ctrl+A"), ("Settings…", "Ctrl+,"),
];
impl WorkspaceApp {
    fn run_edit_command(&mut self, index: usize, window: &mut Window, cx: &mut Context<Self>) {
        use gpui_kit::base::input;
        if index == 7 {
            self.act(Action::Close,window,cx);
            self.act(Action::Route(Route::Settings),window,cx);
            return;
        }
        let action: Box<dyn gpui_kit::Action> = match index {
            0 => Box::new(input::Undo), 1 => Box::new(input::Redo),
            2 => Box::new(input::Cut), 3 => Box::new(input::Copy),
            4 => Box::new(input::Paste), 5 => Box::new(input::Delete),
            6 => Box::new(input::SelectAll), _ => return,
        };
        self.dialog=None;
        if let Some(focus)=self.previous_focus.take() {
            window.focus(&focus,cx);
            window.dispatch_action(action,cx);
        }
    }
    fn edit_menu_key(&mut self, event: &KeyDownEvent, window: &mut Window, cx: &mut Context<Self>) -> bool {
        match event.keystroke.key.as_str() {
            "up" => self.shell_menu_index=(self.shell_menu_index+EDIT_MENU_ITEMS.len()-1)%EDIT_MENU_ITEMS.len(),
            "down" => self.shell_menu_index=(self.shell_menu_index+1)%EDIT_MENU_ITEMS.len(),
            "home" => self.shell_menu_index=0,
            "end" => self.shell_menu_index=EDIT_MENU_ITEMS.len()-1,
            "enter" | "space" => self.run_edit_command(self.shell_menu_index,window,cx),
            "escape" => self.act(Action::Close,window,cx),
            _ => return false,
        }
        cx.stop_propagation(); cx.notify(); true
    }
    fn edit_menu_view(&self, cx: &mut Context<Self>) -> AnyElement {
        let colors=cx.theme().colors.clone();
        let mut panel=div().id("application-edit-popup").test_support()
            .absolute().left(px(104.)).top(px(34.)).w(px(240.))
            .p(px(4.)).rounded(px(8.)).bg(colors.popover).border_1().border_color(colors.border)
            .shadow_lg().flex().flex_col().track_focus(&self.modal_focus)
            .on_mouse_down(MouseButton::Left,|_,_,cx|cx.stop_propagation());
        for (index,(label,shortcut)) in EDIT_MENU_ITEMS.iter().enumerate() {
            if index==2 || index==6 || index==7 { panel=panel.child(div().h(px(1.)).my(px(4.)).bg(colors.border)); }
            panel=panel.child(Button::new(("application-edit-item",index)).ghost().w_full().h(px(28.))
                .px(px(8.)).rounded(px(4.)).text_size(px(13.))
                .when(self.shell_menu_index==index,|b|b.bg(colors.secondary))
                .accessibility_label(*label)
                .child(div().w_full().flex().items_center().justify_between()
                    .child(*label).child(div().text_color(colors.muted_foreground).child(*shortcut)))
                .on_click(cx.listener(move |s,_,w,cx|s.act(Action::EditCommand(index),w,cx))));
        }
        div().absolute().inset_0().occlude()
            .on_mouse_down(MouseButton::Left,cx.listener(|s,_,w,cx|s.act(Action::Close,w,cx)))
            .child(panel).into_any_element()
    }
}
