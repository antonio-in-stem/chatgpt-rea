const RICH_LABELS: [&str; 11] = [
    "Document studio",
    "Spreadsheet",
    "Slides",
    "Image studio",
    "Voice & media",
    "Diagram canvas",
    "Places",
    "PDF viewer",
    "Math & LaTeX",
    "3D scene",
    "Charts",
];
const TOOL_LABELS: [&str; 5] = [
    "Scheduled tasks",
    "Apps",
    "Browser",
    "Code review",
    "Terminal",
];
impl WorkspaceApp {
    fn button(
        &self,
        label: impl Into<SharedString>,
        key: usize,
        action: Action,
        cx: &mut Context<Self>,
    ) -> impl IntoElement {
        gpui_kit::component::button::Button::new(("app-btn", key))
            .label(label)
            .on_click(cx.listener(move |this, _, window, cx| this.act(action.clone(), window, cx)))
    }
    fn nav(
        &self,
        label: impl Into<SharedString>,
        key: usize,
        action: Action,
        selected: bool,
        cx: &mut Context<Self>,
    ) -> impl IntoElement {
        use gpui_kit::component::button::ButtonVariants;
        let label: SharedString = label.into();
        gpui_kit::component::button::Button::new(("nav", key))
            .ghost()
            .w_full()
            .label(if selected {
                format!("● {label}")
            } else {
                label.to_string()
            })
            .on_click(cx.listener(move |this, _, window, cx| this.act(action.clone(), window, cx)))
    }
    fn sidebar_view(&self, cx: &mut Context<Self>) -> impl IntoElement {
        let mut side = div()
            .id("sidebar")
            .w(px(250.))
            .h_full()
            .flex_shrink_0()
            .bg(cx.theme().colors.sidebar)
            .p_3()
            .flex()
            .flex_col()
            .gap_1()
            .child(
                div()
                    .p_3()
                    .text_lg()
                    .font_weight(FontWeight::SEMIBOLD)
                    .child("◉  Workspace"),
            )
            .child(self.nav("＋ New chat", 0, Action::New, false, cx))
            .child(self.nav(
                format!(
                        "⌕ Search chats  {}",
                        self.settings
                            .read(cx)
                            .current_settings()
                            .hotkeys
                            .get("Search")
                            .map(String::as_str)
                            .unwrap_or("")
                    ),
                1,
                Action::Search,
                false,
                cx,
            ))
            .child(self.nav(
                "▣ Projects",
                2,
                Action::Route(Route::Projects),
                self.route == Route::Projects,
                cx,
            ))
            .child(self.nav(
                "▤ Library",
                3,
                Action::Route(Route::Library),
                self.route == Route::Library,
                cx,
            ));
        for (i, label) in TOOL_LABELS.iter().enumerate() {
            side = side.child(self.nav(
                *label,
                10 + i,
                Action::Route(Route::Tool(i)),
                self.route == Route::Tool(i),
                cx,
            ));
        }
        let mut recents = div()
            .id("recents")
            .track_scroll(&self.recents_scroll)
            .flex_1()
            .min_h_0()
            .overflow_y_scroll()
            .mt_4()
            .flex()
            .flex_col()
            .gap_1()
            .child(
                div()
                    .px_3()
                    .py_2()
                    .text_xs()
                    .text_color(cx.theme().colors.muted_foreground)
                    .child("YOUR CHATS"),
            );
        let mut chats = self
            .workspace
            .conversations
            .iter()
            .filter(|c| !c.archived)
            .collect::<Vec<_>>();
        chats.sort_by_key(|c| !c.pinned);
        for (i, c) in chats.iter().take(self.recent_limit).enumerate() {
            recents = recents.child(self.nav(
                format!("{}{}", if c.pinned { "◈ " } else { "" }, c.title),
                100 + i,
                Action::Chat(c.id.clone()),
                self.route == Route::Chat && self.active == c.id,
                cx,
            ));
        }
        if chats.len() > self.recent_limit {
            recents = recents.child(self.button("Show more chats", 901, Action::ShowMoreChats, cx));
        }
        side.child(recents)
            .child(
                div()
                    .border_t_1()
                    .border_color(cx.theme().colors.sidebar_border)
                    .pt_3()
                    .child(self.nav(
                        "⚙ Settings",
                        4,
                        Action::Route(Route::Settings),
                        self.route == Route::Settings,
                        cx,
                    )),
            )
            .child(
                div()
                    .px_3()
                    .py_2()
                    .text_xs()
                    .text_color(cx.theme().colors.muted_foreground)
                    .child("LOCAL DEMO · RUST / GPUI"),
            )
    }
    fn chat_view(&self, cx: &mut Context<Self>) -> AnyElement {
        let chat = self.workspace.conversation(&self.active).ok();
        let mut messages = div()
            .id("chat-transcript")
            .track_scroll(&self.transcript)
            .flex_1()
            .min_h_0()
            .overflow_y_scroll()
            .px_6()
            .py_6()
            .flex()
            .flex_col()
            .gap_6();
        if let Some(chat) = chat {
            if chat.messages.is_empty() {
                messages = messages
                    .child(
                        div()
                            .mt(px(100.))
                            .mb_8()
                            .text_3xl()
                            .text_center()
                            .child("What would you like to explore?"),
                    )
                    .child(div().text_center().text_color(cx.theme().colors.muted_foreground).child(
                        "Write a message, attach a demo file, or open a tool from the sidebar.",
                    ));
            }
            for (i, m) in chat.messages.iter().enumerate() {
                let user = m.role == MessageRole::User;
                let mut row = div()
                    .w_full()
                    .max_w(px(850.))
                    .mx_auto()
                    .flex()
                    .flex_col()
                    .gap_2();
                let bubble = div()
                    .p_4()
                    .rounded_xl()
                    .when(user, |s| {
                        s.ml_auto().max_w(px(660.)).bg(cx.theme().colors.muted)
                    })
                    .child(TextView::markdown(("message", i), m.content.clone()));
                row = row
                    .child(div().text_xs().text_color(rgb(0x8c8c8c)).child(if user {
                        "YOU"
                    } else {
                        "ASSISTANT · DEMO"
                    }))
                    .child(bubble);
                let mut actions = div()
                    .flex()
                    .gap_2()
                    .child(self.button("Copy", 1000 + i * 6, Action::Copy(m.content.clone()), cx))
                    .child(self.button("Branch", 1001 + i * 6, Action::Branch(m.id.clone()), cx));
                if user {
                    actions = actions.child(self.button(
                        "Edit",
                        1002 + i * 6,
                        Action::Edit(m.id.clone(), m.content.clone()),
                        cx,
                    ));
                } else {
                    actions = actions.child(self.button(
                        "Regenerate",
                        1003 + i * 6,
                        Action::Regenerate(m.id.clone()),
                        cx,
                    ));
                }
                row = row.child(actions);
                messages = messages.child(row);
            }
        }
        let mut composer = div()
            .max_w(px(880.))
            .w_full()
            .mx_auto()
            .p_4()
            .rounded_xl()
            .border_1()
            .border_color(cx.theme().colors.border)
            .bg(cx.theme().colors.muted)
            .flex()
            .flex_col()
            .gap_3();
        if self.edit_message.is_some() {
            composer = composer.child(
                div()
                    .text_sm()
                    .child("Editing creates a new branch and preserves the original chat."),
            );
        }
        if !self.current_attachments().is_empty() {
            let mut files = div().flex().flex_wrap().gap_2();
            for (i, item) in self.current_attachments().iter().enumerate() {
                let status = match item.status {
                    AttachmentStatus::Queued => "Preparing…",
                    AttachmentStatus::Ready => "Ready",
                    AttachmentStatus::Failed => "Failed",
                };
                let mut chip = div()
                    .flex()
                    .items_center()
                    .gap_1()
                    .child(format!("▧ {} · {status}", item.name));
                if item.status == AttachmentStatus::Failed {
                    chip = chip.child(self.button(
                        "Retry",
                        2200 + i,
                        Action::RetryAttachment(item.id),
                        cx,
                    ));
                }
                chip =
                    chip.child(self.button("×", 2000 + i, Action::RemoveAttachment(item.id), cx));
                files = files.child(chip);
            }
            composer = composer.child(files);
        }
        composer = composer.child(Textarea::new(&self.composer)).child(
            div()
                .flex()
                .justify_between()
                .items_center()
                .child(
                    div()
                        .flex()
                        .gap_2()
                        .child(self.button("＋ Attach", 200, Action::Attach, cx))
                        .child(self.button(
                            format!("{} ▾", MODELS[self.model_index]),
                            201,
                            Action::Model,
                            cx,
                        ))
                        .child(self.button("♪ Voice", 202, Action::Route(Route::Rich(4)), cx)),
                )
                .child(self.button(
                    if self.streaming {
                        "■ Stop"
                    } else {
                        "↑ Send"
                    },
                    203,
                    if self.streaming {
                        Action::Stop
                    } else {
                        Action::Send
                    },
                    cx,
                )),
        );
        div().size_full().flex().flex_col().child(messages).child(div().px_6().pb_3().child(composer)).child(div().pb_3().text_center().text_xs().text_color(cx.theme().colors.muted_foreground).child("Local demo responses · No account or backend connection · Ctrl+Enter to send")).into_any_element()
    }
    fn projects_view(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut list = div()
            .flex()
            .flex_col()
            .gap_2()
            .w(px(230.))
            .flex_shrink_0()
            .child(self.button("＋ New project", 300, Action::NewProject, cx));
        for (i, p) in self.workspace.projects.iter().enumerate() {
            list = list.child(self.nav(
                p.name.clone(),
                300 + i,
                Action::Project(p.id.clone()),
                self.project.as_deref() == Some(&p.id),
                cx,
            ));
        }
        let mut editor = div()
            .flex_1()
            .flex()
            .flex_col()
            .gap_4()
            .child(div().text_2xl().child("Projects"))
            .child("Organize chats and keep instructions together.")
            .child(Input::new(&self.project_name))
            .child(Textarea::new(&self.project_instructions))
            .child(
                div()
                    .flex()
                    .gap_2()
                    .child(self.button("Save project", 301, Action::SaveProject, cx))
                    .child(self.button("New chat here", 302, Action::NewProjectChat, cx)),
            );
        if self.project.is_some() {
            editor = editor.child(self.button(
                "Remove project (keep chats)",
                303,
                Action::DeleteProject,
                cx,
            ));
            for (i, c) in self
                .workspace
                .conversations
                .iter()
                .filter(|c| c.project_id == self.project)
                .enumerate()
            {
                editor = editor.child(self.nav(
                    c.title.clone(),
                    350 + i,
                    Action::Chat(c.id.clone()),
                    false,
                    cx,
                ));
            }
        }
        div()
            .size_full()
            .p_6()
            .flex()
            .gap_6()
            .child(list)
            .child(editor)
            .into_any_element()
    }
    fn library_view(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut library = div()
            .id("library")
            .size_full()
            .overflow_y_scroll()
            .p_6()
            .flex()
            .flex_col()
            .gap_4()
            .child(div().text_2xl().child("Library"))
            .child("Create, edit and explore your documents.");
        let mut toolbar = div().flex().gap_2().child(self.button(
            "＋ New document",
            400,
            Action::NewDocument,
            cx,
        ));
        for (i, d) in self.workspace.documents.iter().enumerate() {
            toolbar = toolbar.child(self.button(
                d.title.clone(),
                410 + i,
                Action::Document(d.id.clone()),
                cx,
            ));
        }
        library = library.child(toolbar);
        if self.document.is_some() {
            library = library.child(Input::new(&self.doc_title)).child(
                div()
                    .flex()
                    .gap_2()
                    .child(self.button("Save", 401, Action::SaveDocument, cx))
                    .child(self.button(
                        if self.doc_preview {
                            "Edit Markdown"
                        } else {
                            "Preview"
                        },
                        402,
                        Action::Preview,
                        cx,
                    ))
                    .child(self.button("Delete document", 403, Action::DeleteDocument, cx)),
            );
            library = if self.doc_preview {
                library.child(div().p_6().child(TextView::markdown(
                    "document-preview",
                    self.doc_editor.read(cx).value(),
                )))
            } else {
                library.child(Textarea::new(&self.doc_editor))
            };
        }
        library = library.child(div().mt_4().text_lg().child("Studios & viewers"));
        let mut cards = div().flex().flex_wrap().gap_3();
        for (i, label) in RICH_LABELS.iter().enumerate() {
            cards = cards.child(self.button(
                format!("▧ {label} →"),
                500 + i,
                Action::Route(Route::Rich(i)),
                cx,
            ));
        }
        library.child(cards).into_any_element()
    }
    fn dialog_view(&self, dialog: Dialog, cx: &mut Context<Self>) -> AnyElement {
        let mut content = div()
            .w(px(610.))
            .max_h(px(640.))
            .p_6()
            .rounded_xl()
            .bg(cx.theme().colors.background)
            .border_1()
            .border_color(cx.theme().colors.border)
            .flex()
            .flex_col()
            .gap_4();
        match dialog {
            Dialog::Search => {
                content = content
                    .child(div().text_xl().child("Search chats"))
                    .child(Input::new(&self.search));
                let query = self.search.read(cx).value().to_lowercase();
                let mut matches = div()
                    .id("search-matches")
                    .max_h(px(400.))
                    .overflow_y_scroll()
                    .flex()
                    .flex_col()
                    .gap_2();
                let mut found = 0;
                for (i, c) in self
                    .workspace
                    .conversations
                    .iter()
                    .filter(|c| {
                        c.title.to_lowercase().contains(&query)
                            || c.messages
                                .iter()
                                .any(|m| m.content.to_lowercase().contains(&query))
                    })
                    .enumerate()
                {
                    found += 1;
                    matches = matches.child(self.nav(
                        format!("{}{}", c.title, if c.archived { " · Archived" } else { "" }),
                        600 + i,
                        Action::Chat(c.id.clone()),
                        false,
                        cx,
                    ));
                }
                if found == 0 {
                    matches = matches.child("No matching chats");
                }
                content = content.child(matches);
            }
            Dialog::Rename => {
                content = content
                    .child("Rename chat")
                    .child(Input::new(&self.rename))
                    .child(self.button("Save title", 601, Action::SaveRename, cx));
            }
            Dialog::Delete => {
                content = content
                    .child(div().text_xl().child("Delete this chat?"))
                    .child("The local conversation will be removed. This cannot be undone.")
                    .child(self.button("Delete chat", 602, Action::ConfirmDelete, cx));
            }
            Dialog::Model => {
                content = content
                    .child("Choose a demo response mode")
                    .child("All modes use the same local fixture; no provider is contacted.");
                for (i, label) in MODELS.iter().enumerate() {
                    content = content.child(self.button(
                        format!("{}{}", if i == self.model_index { "✓ " } else { "" }, label),
                        750 + i,
                        Action::ChooseModel(i),
                        cx,
                    ));
                }
            }
            Dialog::Project => {
                content = content.child("Move chat to a project").child(self.button(
                    "No project",
                    800,
                    Action::ChooseProject(None),
                    cx,
                ));
                for (i, project) in self.workspace.projects.iter().enumerate() {
                    content = content.child(self.button(
                        project.name.clone(),
                        801 + i,
                        Action::ChooseProject(Some(project.id.clone())),
                        cx,
                    ));
                }
                if self.workspace.projects.is_empty() {
                    content =
                        content.child(self.button("Create a project", 850, Action::NewProject, cx));
                }
            }
            Dialog::Attachments => {
                content = content
                    .child("Choose a demo attachment")
                    .child("These are sample attachment chips; no files are uploaded.");
                for (i, name) in [
                    "design-notes.md",
                    "reference-image.png",
                    "quarterly-data.csv",
                ]
                .iter()
                .enumerate()
                {
                    content = content.child(self.button(*name, 610 + i, Action::Fixture(i), cx));
                }
            }
        }
        content = content.child(self.button("Close", 699, Action::Close, cx));
        div()
            .absolute()
            .inset_0()
            .bg(rgba(0x00000088))
            .flex()
            .items_center()
            .justify_center()
            .child(content.focus_trap("workspace-dialog", &self.modal_focus))
            .occlude()
            .into_any_element()
    }
}
impl Render for WorkspaceApp {
    fn render(&mut self, _: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let dark = cx.theme().mode.is_dark();
        let title = match self.route {
            Route::Chat => self
                .workspace
                .conversation(&self.active)
                .map(|c| c.title.clone())
                .unwrap_or_else(|_| "New chat".into()),
            Route::Projects => "Projects".into(),
            Route::Library => "Library".into(),
            Route::Settings => "Settings".into(),
            Route::Rich(i) => RICH_LABELS[i].into(),
            Route::Tool(i) => TOOL_LABELS[i].into(),
        };
        let mut header = div()
            .h(px(66.))
            .flex_shrink_0()
            .px_5()
            .flex()
            .items_center()
            .justify_between()
            .child(
                div()
                    .flex()
                    .items_center()
                    .gap_3()
                    .child(self.button("☰", 700, Action::Sidebar, cx))
                    .child(div().text_lg().child(title))
                    .child(
                        div()
                            .px_2()
                            .py_1()
                            .rounded_md()
                            .text_xs()
                            .text_color(cx.theme().colors.muted_foreground)
                            .child("DEMO"),
                    ),
            );
        let mut actions = div().flex().gap_2().child(self.button(
            if dark { "☀" } else { "☾" },
            701,
            Action::Theme,
            cx,
        ));
        if self.route == Route::Chat {
            let c = self.workspace.conversation(&self.active).ok();
            actions = actions
                .child(self.button("Rename", 702, Action::Rename, cx))
                .child(self.button(
                    if c.is_some_and(|c| c.pinned) {
                        "Unpin"
                    } else {
                        "Pin"
                    },
                    703,
                    Action::Pin,
                    cx,
                ))
                .child(self.button(
                    if c.is_some_and(|c| c.archived) {
                        "Unarchive"
                    } else {
                        "Archive"
                    },
                    704,
                    Action::Archive,
                    cx,
                ))
                .child(self.button("Project", 705, Action::AssignProject, cx))
                .child(self.button("Share", 706, Action::Share, cx))
                .child(self.button("Delete", 707, Action::DeleteChat, cx));
        }
        header = header.child(actions);
        let body = match self.route {
            Route::Chat => self.chat_view(cx),
            Route::Projects => self.projects_view(cx),
            Route::Library => self.library_view(cx),
            Route::Settings => self.settings.clone().into_any_element(),
            Route::Rich(i) => self.rich[i].clone().into_any_element(),
            Route::Tool(i) => self.tools[i].clone().into_any_element(),
        };
        let mut main = div()
            .flex_1()
            .min_w_0()
            .h_full()
            .flex()
            .flex_col()
            .child(header);
        if let Some(error) = &self.load_error {
            main = main.child(
                div()
                    .p_3()
                    .bg(rgb(0x663333))
                    .text_color(rgb(0xffffff))
                    .child(format!(
                        "Storage could not be loaded. Changes will not overwrite it. {error}"
                    )),
            );
        }
        if !self.notice.is_empty() {
            main = main.child(
                div()
                    .px_5()
                    .py_2()
                    .text_sm()
                    .text_color(rgb(if dark { 0xb3ccb7 } else { 0x395c41 }))
                    .child(self.notice.clone()),
            );
        }
        main = main.child(div().flex_1().min_h_0().child(body));
        let mut root = div()
            .id("workspace-app")
            .track_focus(&self.focus)
            .capture_key_down(
                cx.listener(|this, event, window, cx| this.handle_key(event, window, cx)),
            )
            .key_context("Workspace")
            .relative()
            .size_full()
            .bg(cx.theme().colors.background)
            .text_color(cx.theme().colors.foreground)
            .flex()
            .on_action(
                cx.listener(|this, _: &NewChat, window, cx| this.act(Action::New, window, cx)),
            )
            .on_action(
                cx.listener(|this, _: &Search, window, cx| this.act(Action::Search, window, cx)),
            )
            .on_action(
                cx.listener(|this, _: &Escape, window, cx| this.act(Action::Close, window, cx)),
            );
        if self.sidebar {
            root = root.child(self.sidebar_view(cx));
        }
        root = root.child(main);
        if let Some(dialog) = self.dialog {
            root = root.child(self.dialog_view(dialog, cx));
        }
        root
    }
}
