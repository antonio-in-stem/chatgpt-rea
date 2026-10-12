use gpui_kit::base::{Disableable, Selectable};
// Source: app-primary-19fe57fd8c00.js S5e/D5e/O5e and ChatGPT plus items.
// The installed bundle receives model names from server data; MODELS is a local catalog fixture.
impl WorkspaceApp {
    fn composer_menu_actions(
        &self,
        dialog: Dialog,
    ) -> Vec<(&'static str, &'static str, Action, usize)> {
        if dialog == Dialog::Model {
            MODELS
                .iter()
                .enumerate()
                .map(|(i, label)| (*label, "", Action::ChooseModel(i), 750 + i))
                .collect()
        } else {
            vec![
                ("Add photos & files", "paperclip", Action::PickFiles, 610),
                ("Add library files", "library", Action::ComposerLibrary, 611),
                (
                    "Create image",
                    "image",
                    Action::ComposerTool("Create image"),
                    612,
                ),
                (
                    "Web search",
                    "globe",
                    Action::ComposerTool("Web search"),
                    613,
                ),
            ]
        }
    }
    fn composer_menu_key(
        &mut self,
        event: &KeyDownEvent,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) -> bool {
        let Some(dialog @ (Dialog::Model | Dialog::Attachments)) = self.dialog else {
            return false;
        };
        let rows = self.composer_menu_actions(dialog);
        match event.keystroke.key.as_str() {
            "down" => self.composer_menu_index = (self.composer_menu_index + 1) % rows.len(),
            "up" => {
                self.composer_menu_index = (self.composer_menu_index + rows.len() - 1) % rows.len()
            }
            "home" => self.composer_menu_index = 0,
            "end" => self.composer_menu_index = rows.len() - 1,
            "enter" | "space" => self.act(rows[self.composer_menu_index].2.clone(), window, cx),
            key if key.len() == 1
                && !event.keystroke.modifiers.control
                && !event.keystroke.modifiers.alt =>
            {
                if let Some(i) = rows
                    .iter()
                    .position(|r| r.0.to_lowercase().starts_with(key))
                {
                    self.composer_menu_index = i;
                }
            }
            _ => return false,
        }
        cx.stop_propagation();
        cx.notify();
        true
    }
    fn composer_pick_files(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        let conversation = self.active.clone();
        self.act(Action::Close, window, cx);
        let picker = cx.prompt_for_paths(PathPromptOptions {
            files: true,
            directories: false,
            multiple: true,
            prompt: Some("Select files".into()),
        });
        cx.spawn(async move |this, cx| match picker.await {
            Ok(Ok(Some(paths))) => {
                let _ = this.update(cx, |app, cx| {
                    if app.workspace.conversation(&conversation).is_err() {
                        return;
                    }
                    for path in paths {
                        let Some(name) = path.file_name().map(|n| n.to_string_lossy().into_owned())
                        else {
                            continue;
                        };
                        if app
                            .attachments
                            .get(&conversation)
                            .is_some_and(|items| items.iter().any(|a| a.name == name))
                        {
                            continue;
                        }
                        app.attachment_sequence += 1;
                        let id = app.attachment_sequence;
                        app.attachments
                            .entry(conversation.clone())
                            .or_default()
                            .push(Attachment {
                                id,
                                name,
                                status: AttachmentStatus::Queued,
                                attempt: 0,
                            });
                        app.prepare_attachment(conversation.clone(), id, 0, cx);
                    }
                    cx.notify();
                });
            }
            Ok(Err(error)) => {
                let _ = this.update(cx, |app, cx| {
                    app.notice = format!("Unable to select files: {error}");
                    cx.notify();
                });
            }
            _ => {}
        })
        .detach();
    }
    fn composer_menu_view(&self, dialog: Dialog, cx: &mut Context<Self>) -> AnyElement {
        use gpui_kit::component::button::{Button, ButtonVariants};
        let colors = &cx.theme().colors;
        let bounds = self.composer_bounds.get();
        let is_model = dialog == Dialog::Model;
        let mut menu = div()
            .w(if is_model {
                px(254.)
            } else {
                bounds.size.width
            })
            .p(px(6.))
            .rounded(px(12.))
            .bg(colors.popover)
            .text_color(colors.foreground)
            .border_1()
            .border_color(colors.border)
            .shadow_lg()
            .flex()
            .flex_col()
            .gap(px(2.))
            .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation());
        for (index, (label, icon, action, key)) in
            self.composer_menu_actions(dialog).into_iter().enumerate()
        {
            let checked = if dialog == Dialog::Model {
                index == self.model_index
            } else {
                self.composer_tools.get(&self.active) == Some(&label)
            };
            let mut row = div().w_full().flex().items_center().gap(px(10.));
            if !icon.is_empty() {
                row = row.child(native_ui::icon(icon, 20.).text_color(colors.foreground));
            }
            let detail = match action {
                Action::PickFiles => Some("Upload from computer"),
                Action::ComposerLibrary => Some("Browse and search your files"),
                _ => None,
            };
            let mut content = div()
                .flex_1()
                .min_w_0()
                .flex()
                .items_center()
                .gap(px(8.))
                .child(div().flex_shrink_0().child(label));
            if let Some(detail) = detail {
                content = content.child(
                    div()
                        .flex_1()
                        .min_w_0()
                        .truncate()
                        .text_color(colors.muted_foreground)
                        .child(detail),
                );
            }
            row = row.child(content);
            if checked {
                row = row.child(native_ui::icon("check", 16.).text_color(colors.foreground));
            }
            menu = menu.child(
                Button::new(("app-btn", key))
                    .ghost()
                    .w_full()
                    .h(px(36.))
                    .px(px(8.))
                    .rounded(px(6.))
                    .text_size(px(14.))
                    .accessibility_label(label)
                    .selected(index == self.composer_menu_index)
                    .child(row)
                    .on_click(
                        cx.listener(move |app, _, window, cx| app.act(action.clone(), window, cx)),
                    ),
            );
        }
        let popup = anchored()
            .anchor(Anchor::BottomLeft)
            .position(point(
                bounds.origin.x + px(if is_model { 42. } else { 0. }),
                bounds.origin.y - px(if is_model { 8. } else { 4. }),
            ))
            .child(
                menu.focus_trap("composer-menu-focus", &self.modal_focus)
                    .test_support(),
            );
        div()
            .absolute()
            .inset_0()
            .on_mouse_down(
                MouseButton::Left,
                cx.listener(|app, _, window, cx| app.act(Action::Close, window, cx)),
            )
            .child(popup)
            .occlude()
            .into_any_element()
    }
}
// LibraryFilePickerDialog source: size=xwide; inner height560/gap16/header20.
impl WorkspaceApp {
    fn composer_library_view(&self, cx: &mut Context<Self>) -> AnyElement {
        use gpui_kit::component::{
            button::{Button, ButtonVariants},
            checkbox::Checkbox,
        };
        let colors = &cx.theme().colors;
        let query = self.composer_library_query.read(cx).value().to_lowercase();
        let mut rows = div()
            .id("composer-library-results")
            .flex_1()
            .min_h_0()
            .overflow_y_scroll()
            .flex()
            .flex_col()
            .gap(px(4.));
        let mut count = 0;
        for (i, document) in self
            .workspace
            .documents
            .iter()
            .enumerate()
            .filter(|(_, d)| d.title.to_lowercase().contains(&query))
        {
            count += 1;
            let id = document.id.clone();
            rows = rows.child(
                div().px(px(12.)).py(px(10.)).rounded(px(8.)).child(
                    Checkbox::new(("composer-library-file", i))
                        .label(document.title.clone())
                        .checked(self.composer_library_selection.contains(&id))
                        .on_click(cx.listener(move |app, _, window, cx| {
                            app.act(Action::ComposerLibraryToggle(id.clone()), window, cx)
                        })),
                ),
            );
        }
        if count == 0 {
            rows = rows.child(div().p(px(24.)).text_color(colors.muted_foreground).child(
                if query.is_empty() {
                    "No recent files yet"
                } else {
                    "No matching files"
                },
            ));
        }
        let panel = div()
            .w(px(680.))
            .max_w(relative(0.92))
            .h(px(560.))
            .max_h(relative(0.9))
            .p(px(20.))
            .rounded(px(20.))
            .bg(colors.popover)
            .shadow_lg()
            .flex()
            .flex_col()
            .gap(px(16.))
            .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation())
            .child(
                div()
                    .flex()
                    .justify_between()
                    .items_center()
                    .child(
                        div()
                            .text_size(px(20.))
                            .font_weight(FontWeight::MEDIUM)
                            .child("Add from Library"),
                    )
                    .child(self.chat_icon_button("close", "Close", 769, Action::Close, cx)),
            )
            .child(Input::new(&self.composer_library_query).aria_label("Search Library"))
            .child(rows)
            .child(
                div().flex().justify_end().child(
                    Button::new(("app-btn", 770usize))
                        .primary()
                        .label("Add to chat")
                        .disabled(self.composer_library_selection.is_empty())
                        .on_click(cx.listener(|app, _, window, cx| {
                            app.act(Action::ComposerLibraryConfirm, window, cx)
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
            .child(panel.focus_trap("composer-library-modal", &self.modal_focus))
            .occlude()
            .into_any_element()
    }
}
