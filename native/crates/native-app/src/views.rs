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
    fn chat_icon_button(
        &self,
        icon: &'static str,
        label: &'static str,
        key: usize,
        action: Action,
        cx: &mut Context<Self>,
    ) -> gpui_kit::component::button::Button {
        use gpui_kit::component::button::ButtonVariants;
        gpui_kit::component::button::Button::new(("app-btn", key))
            .ghost()
            .w(px(28.))
            .h(px(28.))
            .p_0()
            .rounded(px(8.))
            .accessibility_label(label)
            .tooltip(label)
            .child(native_ui::icon(icon, 18.).text_color(cx.theme().colors.foreground))
            .on_click(cx.listener(move |this, _, window, cx| this.act(action.clone(), window, cx)))
    }
    fn chat_message_view(
        &mut self,
        index: usize,
        message: &native_core::ChatMessage,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) -> AnyElement {
        let user = message.role == MessageRole::User;
        let toolbar = if let Some(toolbar) = self.message_actions.get(&message.id) {
            toolbar.clone()
        } else {
            let parent = cx.weak_entity();
            let toolbar =
                cx.new(|cx| ChatMessageActions::new(message.clone(), index, parent, window, cx));
            self.message_actions
                .insert(message.id.clone(), toolbar.clone());
            toolbar
        };
        toolbar.update(cx, |toolbar, cx| {
            if toolbar.message.content != message.content || toolbar.index != index {
                toolbar.message = message.clone();
                toolbar.index = index;
                cx.notify();
            }
        });
        let hover_target = toolbar.clone();
        let bubble = div()
            .text_size(native_ui::typography::TextRole::Body.in_app(cx))
            .line_height(px(24.))
            .when(user, |s| {
                let mut surface = cx.theme().colors.muted;
                if cx.theme().mode.is_dark() {
                    // Original normal dark bubble: text-neutral (#dfdfdf) at 5%.
                    surface = rgb(0xdfdfdf).into();
                    surface.a = 0.05;
                }
                s.ml_auto()
                    .line_height(px(22.75))
                    .font_weight(FontWeight(430.))
                    .max_w(relative(0.7))
                    .px(px(16.))
                    .py(px(10.))
                    .relative()
                    .child(native_ui::corners::squircle_surface(
                        22., surface,
                    ))
            })
            .child(TextView::markdown(
                ("message", index),
                message.content.clone(),
            ));
        div()
            .id(("chat-turn", index))
            .w_full()
            .max_w(px(768.))
            .mx_auto()
            .flex()
            .flex_col()
            .gap(px(6.))
            .on_hover(move |hovered, _, cx| {
                hover_target.update(cx, |toolbar, cx| toolbar.hover(*hovered, cx))
            })
            .when(self.workspace.settings.codex_surface && !user, |row| {
                if let Some(activity)=&message.activity { row.child(self.turn_activity_view(&message.id,activity,cx)) } else { row }
            })
            .child(bubble)
            .child(toolbar)
            .into_any_element()
    }
    fn chat_composer_view(&self, cx: &mut Context<Self>) -> AnyElement {
        use gpui_kit::component::{button::ButtonVariants, Sizable};
        let codex=self.workspace.settings.codex_surface;
        let measured = self.composer_bounds.clone();
        let mut composer = div()
            .id("composer-frame").test_support()
            .relative()
            .child(
                canvas(move |bounds, _, _| measured.set(bounds), |_, _, _, _| {})
                    .absolute()
                    .inset_0(),
            )
            .w_full()
            .max_w(px(768.))
            .mx_auto()
            .rounded(px(22.))
            .when(!codex || !cx.theme().mode.is_dark(), |s| s.shadow_lg())
            .bg(native_ui::tokens::composer_surface(
                cx.theme().mode.is_dark(),
            ))
            // Recovered multiline layout: empty attachment spacer is 8 + 6 px.
            .p(px(if codex { 0. } else { 8. }))
            .when(codex, |s| s.pt(px(14.)))
            .flex()
            .flex_col()
            .gap(px(4.));
        if let Some(tool) = self.composer_tools.get(&self.active) {
            composer = composer.child(self.button(
                format!("{tool} ×"),
                760,
                Action::ComposerTool(tool),
                cx,
            ));
        }
        if self.edit_message.is_some() {
            composer = composer.child(
                div()
                    .px(px(12.))
                    .py(px(4.))
                    .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                    .text_color(cx.theme().colors.muted_foreground)
                    .child("Editing message"),
            );
        }
        if !self.current_attachments().is_empty() {
            let mut files = div().flex().flex_wrap().gap(px(8.)).pb(px(6.));
            for (i, item) in self.current_attachments().iter().enumerate() {
                let status = match item.status {
                    AttachmentStatus::Queued => "Preparing…",
                    AttachmentStatus::Ready => "Ready",
                    AttachmentStatus::Failed => "Failed",
                };
                let mut chip = div()
                    .flex()
                    .items_center()
                    .gap(px(8.))
                    .p(px(8.))
                    .rounded(px(12.))
                    .border_1()
                    .border_color(cx.theme().colors.border)
                    .child(
                        native_ui::icon("image", 20.)
                            .text_color(cx.theme().colors.muted_foreground),
                    )
                    .child(
                        div()
                            .flex()
                            .flex_col()
                            .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                            .child(item.name.clone())
                            .child(
                                div()
                                    .text_color(cx.theme().colors.muted_foreground)
                                    .child(status),
                            ),
                    );
                if item.status == AttachmentStatus::Failed {
                    chip = chip.child(self.button(
                        "Retry",
                        2200 + i,
                        Action::RetryAttachment(item.id),
                        cx,
                    ));
                }
                chip = chip.child(self.chat_icon_button(
                    "close",
                    "Remove attachment",
                    2000 + i,
                    Action::RemoveAttachment(item.id),
                    cx,
                ));
                files = files.child(chip);
            }
            composer = composer.child(files);
        }
        composer = composer.child(
            div().id("composer-editor-region").test_support()
                .min_h(px(44.)).px(px(if codex { 8. } else { 4. })).flex()
                .when(!codex, |s| s.items_center()).child(
                Textarea::new(&self.composer)
                    // XSmall removes vertical padding and retains 4 px inline.
                    .when(codex, |input| input.xsmall())
                    .appearance(false)
                    .bordered(false)
                    .w_full()
                    .text_size(native_ui::typography::TextRole::Body.in_app(cx))
                    .line_height(px(20.))
                    .aria_label(if codex { "Work with Codex" } else { "Ask ChatGPT" }),
            ),
        );
        let model = gpui_kit::component::button::Button::new(("app-btn", 201usize))
            .ghost()
            .h(px(28.))
            .px(px(6.))
            .rounded(px(8.))
            .text_size(native_ui::typography::TextRole::Small.in_app(cx))
            .when(!codex,|b|b.label(MODELS[self.model_index]))
            .when(codex,|b| {
                let (model,effort)=self.codex_model_selection();
                b.child(div().flex().items_center().gap(px(6.))
                    .child(div().font_weight(FontWeight::MEDIUM).child(model.label()))
                    .child(div().text_color(cx.theme().colors.muted_foreground).child(effort.label())))
            })
            .child(
                native_ui::icon("chevron-down", 12.).text_color(cx.theme().colors.muted_foreground),
            )
            .accessibility_label("Choose model")
            .on_click(cx.listener(|this, _, window, cx| this.act(Action::Model, window, cx)));
        let send = gpui_kit::component::button::Button::new(("app-btn", 203usize))
            .ghost()
            .w(px(28.))
            .h(px(28.))
            .p_0()
            .rounded_full()
            .bg(cx.theme().colors.foreground)
            .accessibility_label(if self.streaming {
                "Stop response"
            } else {
                "Send message"
            })
            .tooltip(if self.streaming {
                "Stop response"
            } else {
                "Send message"
            })
            .child(
                native_ui::icon(if self.streaming { "stop" } else { "send" }, 18.)
                    .text_color(cx.theme().colors.background),
            )
            .on_click(cx.listener(|this, _, window, cx| {
                this.act(
                    if this.streaming {
                        Action::Stop
                    } else {
                        Action::Send
                    },
                    window,
                    cx,
                )
            }));
        let mut leading=div().id("composer-leading-controls").test_support().flex().items_center().gap(px(5.))
            .child(self.chat_icon_button("plus","Add photos and files",200,Action::Attach,cx));
        let mut trailing=div().id("composer-trailing-controls").test_support().min_w_0().flex().items_center().gap(px(6.));
        if codex {
            leading=leading.child(gpui_kit::component::button::Button::new("composer-permissions").ghost()
                .h(px(28.)).px(px(6.)).rounded(px(8.))
                .text_size(native_ui::typography::TextRole::Small.in_app(cx))
                .label(self.permission_label()).accessibility_label("Change permissions")
                .on_click(cx.listener(|s,_,w,cx|s.act(Action::Permissions,w,cx))));
            trailing=trailing.child(model);
        } else { leading=leading.child(model); }
        trailing=trailing.child(self.chat_icon_button(if codex { "mic" } else { "voice" },
            if codex { "Dictate" } else { "Use voice" },202,Action::Route(Route::Rich(4)),cx)).child(send);
        composer
            .child(
                div()
                    .id("composer-footer").test_support()
                    .flex()
                    .items_center()
                    .justify_between()
                    .px(px(if codex { 8. } else { 2. }))
                    .when(codex, |s| s.mb(px(8.)))
                    .child(leading)
                    .child(trailing),
            )
            .into_any_element()
    }
    fn chat_view(&mut self, window: &mut Window, cx: &mut Context<Self>) -> AnyElement {
        let chat = self.workspace.conversation(&self.active).ok().cloned();
        let home = chat.as_ref().is_none_or(|chat| chat.messages.is_empty());
        if home {
            let headline = div()
                .relative()
                .text_center()
                .text_size(px(32.))
                .line_height(px(38.))
                .font_weight(FontWeight::NORMAL)
                .child("Ready when you are.");
            let headline = if self.settings.read(cx).current_settings().reduced_motion {
                headline.into_any_element()
            } else {
                headline
                    .with_animation(
                        SharedString::from(format!("chat-home-headline-{}", self.active)),
                        Animation::new(Duration::from_millis(200))
                            .with_easing(chat_motion::hero_ease_in_out),
                        |headline, progress| {
                            headline.opacity(progress).top(px(-4. * (1. - progress)))
                        },
                    )
                    .into_any_element()
            };
            return div()
                .id("chat-home")
                .size_full()
                .flex()
                .flex_col()
                .justify_center()
                .px(px(24.))
                .pb(px(80.))
                .child(
                    div()
                        .w_full()
                        .max_w(px(768.))
                        .mx_auto()
                        .flex()
                        .flex_col()
                        .gap(px(28.))
                        .child(headline)
                        .child(self.chat_composer_view(cx)),
                )
                .into_any_element();
        }
        let mut messages = div()
            .id("chat-transcript").test_support()
            .on_scroll_wheel(cx.listener(|s, _, _, cx| { s.navigation_motion.take(); cx.notify(); }))
            .track_scroll(&self.transcript)
            .flex_1()
            .min_h_0()
            .overflow_y_scroll()
            .px(px(24.))
            .pt(px(24.))
            .pb(px(20.))
            .flex()
            .flex_col()
            .gap(px(20.));
        if let Some(chat) = chat {
            for (index, message) in chat.messages.iter().enumerate() {
                messages = messages.child(self.chat_message_view(index, message, window, cx));
            }
        }
        div()
            .size_full()
            .flex()
            .flex_col()
            .child(div().relative().flex_1().min_h_0().flex().flex_col()
                .child(messages).child(self.conversation_rail(window, cx)))
            .child(
                div()
                    .px(px(24.))
                    .pt(px(8.))
                    .pb(px(20.))
                    .child(self.chat_composer_view(cx)),
            )
            .into_any_element()
    }
    fn projects_view(&self, window: &Window, cx: &mut Context<Self>) -> AnyElement {
        use gpui_kit::component::button::{Button, ButtonVariants};
        let colors = cx.theme().colors.clone();
        let gutter = if window.viewport_size().width >= px(1024.) { 48. } else { 24. };
        let scroll = (-f32::from(self.projects_scroll.offset().y)).max(0.);
        // QJa / _shell_bomwa_2: empty navigation sticks at -16px;
        // the page-surface variant disables the legacy title translation.
        let title_shift = 0.; // data-new-slate-layout keeps the title in the sticky row.
        let header = div()
            .id("projects-sticky-header").test_support()
            .absolute().top(px(-scroll.min(16.))).left_0().right_0()
            .h(px(77.)).pt(px(16.))
            .bg(colors.background)
            .border_b_1().border_color(if scroll > 0. { colors.border } else { colors.background })
            .occlude()
            .on_scroll_wheel(cx.listener(|s, event: &ScrollWheelEvent, _, cx| {
                let mut offset = s.projects_scroll.offset();
                offset.y = (offset.y + event.delta.pixel_delta(px(20.)).y)
                    .clamp(-s.projects_scroll.max_offset().y, px(0.));
                s.projects_scroll.set_offset(offset);
                cx.stop_propagation();
                cx.notify();
            }))
            .child(div().w_full().max_w(px(1440.)).mx_auto().px(px(gutter))
                .h(px(60.)).flex().items_center().justify_between().gap(px(16.))
                .child(div().h(px(60.)).min_w_0().overflow_hidden().flex_1()
                    .child(div().id("projects-heading").relative().top(px(12. - title_shift))
                        .h(px(36.)).flex().items_center()
                        .text_size(native_ui::typography::TextRole::HeadingLarge.in_app(cx))
                        .font_weight(FontWeight::MEDIUM).child("Projects")))
                .child(div().flex().items_center().gap(px(12.))
                    .child(div().w(px(240.)).child(Input::new(&self.project_search)))
                    .child(Button::new(("app-btn", 300usize)).primary()
                        .label(if self.workspace.projects.is_empty() { "New project" } else { "Create" })
                        .on_click(cx.listener(|s, _, w, cx| s.act(Action::NewProject, w, cx))))));
        let mut content = div().w_full().max_w(px(1440.)).mx_auto().px(px(gutter))
            .flex().flex_col().child(div().h(px(77.)).flex_shrink_0());
        let query = self.project_search.read(cx).value().trim().to_lowercase();
        content = content.child(
            div()
                .id("projects-table-heading").test_support()
                .h(px(40.)).flex_shrink_0()
                .flex()
                .items_center()
                .gap(px(16.))
                .border_b_1()
                .border_color(colors.border)
                .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                .text_color(colors.muted_foreground)
                .child(div().flex_1().child(self.project_sort_header("Name", ProjectSortKey::Name, cx)))
                .child(div().w(px(64.)).child(self.project_sort_header("Updated", ProjectSortKey::Modified, cx)))
                .child(div().w(px(128.))),
        );
        let mut visible = 0;
        let mut rows = self.workspace.projects.iter().enumerate().collect::<Vec<_>>();
        rows.sort_by(|(_, a), (_, b)| self.project_sort.compare(a, b));
        for (i, p) in rows {
            let chats = self
                .workspace
                .conversations
                .iter()
                .filter(|c| c.project_id.as_deref() == Some(p.id.as_str()) && !c.archived)
                .collect::<Vec<_>>();
            if !query.is_empty()
                && !p.name.to_lowercase().contains(&query)
                && !chats
                    .iter()
                    .any(|c| c.title.to_lowercase().contains(&query))
            {
                continue;
            }
            visible += 1;
            let search_expanded = !query.is_empty() && chats.iter().any(|c| c.title.to_lowercase().contains(&query));
            let expanded = self.expanded_projects.contains(&p.id) || search_expanded;
            let project_id = p.id.clone();
            content = content.child(
                div()
                    .min_h(px(70.))
                    .flex()
                    .items_center()
                    .gap(px(16.))
                    .border_b_1()
                    .border_color(colors.border)
                    .child(
                        Button::new(("project-open", i))
                            .ghost()
                            .flex_1()
                            .min_w_0()
                            .h(px(54.))
                            .px(px(8.))
                            .justify_start()
                            .gap(px(12.))
                            .rounded(px(8.))
                            .accessibility_label(if search_expanded {
                                format!("Search matches in {}", p.name)
                            } else {
                                format!("{} {}", if expanded { "Collapse" } else { "Expand" }, p.name)
                            })
                            .child(
                                div()
                                    .w_full()
                                    .flex()
                                    .items_center()
                                    .gap(px(12.))
                                    .text_left()
                                    .when(!search_expanded, |row| row.child(
                                        native_ui::icon(
                                            if expanded {
                                                "chevron-down"
                                            } else {
                                                "chevron-right"
                                            },
                                            16.,
                                        )
                                        .text_color(colors.foreground),
                                    ))
                                    .child(
                                        native_ui::icon("projects", 20.)
                                            .text_color(colors.foreground),
                                    )
                                    .child(
                                        div()
                                            .min_w_0()
                                            .flex_1()
                                            .flex()
                                            .flex_col()
                                            .items_start()
                                            .gap(px(3.))
                                            .child(div().text_size(native_ui::typography::TextRole::Body.in_app(cx)).child(p.name.clone()))
                                            .child(
                                                div()
                                                    .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                                                    .text_color(colors.muted_foreground)
                                                    .child(format!("{} chats", chats.len())),
                                            ),
                                    ),
                            )
                            .on_click(cx.listener(move |s, _, _, cx| {
                                if !search_expanded {
                                    if !s.expanded_projects.remove(&project_id) {
                                        s.expanded_projects.insert(project_id.clone());
                                    }
                                }
                                cx.notify();
                            })),
                    )
                    .child(
                        div()
                            .w(px(64.))
                            .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                            .text_color(colors.muted_foreground)
                            .child(project_sort::modified_label(p.modified_at_ms, chrono::Local::now())),
                    )
                    .child(
                        div()
                            .w(px(128.))
                            .flex()
                            .justify_end()
                            .gap(px(4.))
                            .child(
                                Button::new(("project-edit", i))
                                    .ghost()
                                    .label("Edit")
                                    .on_click(cx.listener({
                                        let id = p.id.clone();
                                        move |s, _, w, cx| {
                                            s.act(Action::Project(id.clone()), w, cx);
                                            s.previous_focus = w.focused(cx);
                                            s.project_editing = true;
                                            s.notice.clear();
                                            s.dialog = Some(Dialog::ProjectEditor);
                                            s.project_name
                                                .update(cx, |input, cx| input.focus(w, cx));
                                            cx.notify();
                                        }
                                    })),
                            )
                            .child(
                                Button::new(("project-chat", i))
                                    .ghost()
                                    .h(px(32.))
                                    .w(px(32.))
                                    .p_0()
                                    .accessibility_label("New chat in project")
                                    .tooltip("New chat in project")
                                    .child(
                                        native_ui::icon("plus", 18.).text_color(colors.foreground),
                                    )
                                    .on_click(cx.listener({
                                        let id = p.id.clone();
                                        move |s, _, w, cx| {
                                            s.act(Action::Project(id.clone()), w, cx);
                                            s.act(Action::NewProjectChat, w, cx);
                                        }
                                    })),
                            ),
                    ),
            );
            if expanded {
                let mut children = div().pb(px(12.)).pl(px(28.)).flex().flex_col();
                if chats.is_empty() {
                    children = children.child(
                        div()
                            .py(px(8.))
                            .text_size(native_ui::typography::TextRole::Small.in_app(cx))
                            .text_color(colors.muted_foreground)
                            .child("No chats"),
                    );
                }
                for (j, chat) in chats.iter().enumerate() {
                    if search_expanded && !chat.title.to_lowercase().contains(&query) { continue; }
                    children = children.child(
                        Button::new(("project-child", i * 10000 + j))
                            .ghost()
                            .h(px(36.))
                            .justify_start()
                            .px(px(8.))
                            .accessibility_label(chat.title.clone())
                            .child(div().w_full().text_left().child(chat.title.clone()))
                            .on_click(cx.listener({
                                let id = chat.id.clone();
                                move |s, _, w, cx| s.act(Action::Chat(id.clone()), w, cx)
                            })),
                    );
                }
                {
                    children = children.child(
                        Button::new(("project-remove", i))
                            .ghost()
                            .justify_start()
                            .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                            .accessibility_label("Remove project")
                            .child(div().w_full().text_left().child("Remove project"))
                            .tooltip("Remove project and keep its chats")
                            .on_click(
                                cx.listener({ let id = p.id.clone(); move |s, _, w, cx| {
                                    s.act(Action::Project(id.clone()), w, cx);
                                    s.act(Action::DeleteProject, w, cx);
                                }}),
                            ),
                    );
                }
                content = content.child(children);
            }
        }
        if visible == 0 {
            content = content.child(
                div()
                    .py(px(40.))
                    .text_center()
                    .text_color(colors.muted_foreground)
                    .child(if query.is_empty() {
                        "Create a project to keep related chats, files, and instructions together."
                    } else {
                        "No projects match your search."
                    }),
            );
        }
        div().id("projects-index").size_full().relative().overflow_hidden()
            .on_scroll_wheel(cx.listener(|_, _, _, cx| cx.notify()))
            .child(div().id("projects-scroll").test_support().size_full().overflow_y_scroll()
                .track_scroll(&self.projects_scroll).child(content))
            .child(header)
            .into_any_element()
    }
    fn library_columns(width: f32) -> u16 {
        // Recovered @sm/@xl/@3xl/@5xl/@7xl container thresholds (24/36/48/64/80rem).
        1 + [384., 576., 768., 1024., 1280.]
            .iter()
            .filter(|threshold| width >= **threshold)
            .count() as u16
    }
    fn library_filters(&self, cx: &mut Context<Self>) -> AnyElement {
        use gpui_kit::component::{
            button::{Button, ButtonVariants},
            checkbox::Checkbox,
            popover::Popover,
        };
        let parent = cx.entity();
        let count = self.library_categories.count_ones();
        Popover::new("library-filter-popover")
            .anchor(Anchor::TopRight)
            .trigger(
                Button::new("library-filter-trigger")
                    .ghost()
                    .child(
                        div()
                            .flex()
                            .items_center()
                            .gap(px(4.))
                            .child(
                                native_ui::icon("library-filter", 20.)
                                    .text_color(cx.theme().colors.foreground),
                            )
                            .when(count > 0, |d| d.child(count.to_string())),
                    )
                    .accessibility_label(format!("Open filters, {count} active filters")),
            )
            .content(move |_, _, cx| {
                let selected = parent.read(cx).library_categories;
                let popover = cx.entity();
                let mut menu = div().w(px(224.)).flex().flex_col().gap(px(2.)).child(
                    div()
                        .px(px(8.))
                        .py(px(6.))
                        .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                        .text_color(cx.theme().colors.muted_foreground)
                        .child("File type"),
                );
                for (i, name) in [
                    (2usize, "Images"),
                    (1, "Documents"),
                    (3, "Spreadsheets"),
                    (4, "Presentations"),
                    (5, "PDFs"),
                ] {
                    let target = parent.clone();
                    let popover = popover.clone();
                    menu = menu.child(
                        Checkbox::new(("library-filter", i))
                            .w_full()
                            .px(px(8.))
                            .py(px(7.))
                            .label(name)
                            .checked(selected & (1 << i) != 0)
                            .on_change(move |checked, _, cx| {
                                target.update(cx, |s, cx| {
                                    if *checked {
                                        s.library_categories |= 1 << i;
                                    } else {
                                        s.library_categories &= !(1 << i);
                                    }
                                    cx.notify();
                                });
                                popover.update(cx, |_, cx| cx.notify());
                            }),
                    );
                }
                menu
            })
            .into_any_element()
    }

    fn library_file_card(
        &self,
        index: usize,
        title: &str,
        kind: &str,
        preview: &str,
        action: Action,
        card_width: f32,
        cx: &mut Context<Self>,
    ) -> AnyElement {
        use gpui_kit::component::button::{Button, ButtonVariants};
        let colors = cx.theme().colors.clone();
        let mut card = Button::new(("library-file", index))
            .ghost()
            .p_0()
            .rounded(px(16.))
            .overflow_hidden()
            .accessibility_label(format!("Open {title}"))
            .tooltip(format!("Open {title}"))
            .on_click(cx.listener(move |s, _, w, cx| s.act(action.clone(), w, cx)));
        if self.library_grid {
            card = card
                .w_full()
                .min_w_0()
                .h_auto()
                .border_1()
                .border_color(colors.border)
                .child(
                    div()
                        .w_full()
                        .text_left()
                        .flex()
                        .flex_col()
                        .child(
                            div()
                                .h(px(card_width * 9. / 16.))
                                .rounded_t(px(15.))
                                .w_full()
                                .overflow_hidden()
                                .p(px(20.))
                                .bg(colors.muted)
                                .flex()
                                .flex_col()
                                .gap(px(6.))
                                .child(
                                    native_ui::icon(
                                        match kind {
                                            "Image" => "image",
                                            "Spreadsheet" | "Chart" => "spreadsheet",
                                            "Presentation" => "presentation",
                                            _ => "document",
                                        },
                                        24.,
                                    )
                                    .text_color(colors.muted_foreground),
                                )
                                .child(
                                    div()
                                        .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                                        .text_color(colors.muted_foreground)
                                        .whitespace_normal()
                                        .child(preview.to_owned()),
                                ),
                        )
                        .child(
                            div()
                                .px(px(20.))
                                .py(px(14.))
                                .flex()
                                .flex_col()
                                .gap(px(4.))
                                .items_start()
                                .child(
                                    div()
                                        .text_size(native_ui::typography::TextRole::Body.in_app(cx))
                                        .font_weight(FontWeight::MEDIUM)
                                        .child(title.to_owned()),
                                )
                                .child(
                                    div()
                                        .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                                        .text_color(colors.muted_foreground)
                                        .child(kind.to_owned()),
                                ),
                        ),
                );
        } else {
            card = card
                .w_full()
                .h(px(56.))
                .px(px(12.))
                .justify_start()
                .border_b_1()
                .border_color(colors.border)
                .child(
                    div()
                        .w_full()
                        .text_left()
                        .flex()
                        .items_center()
                        .gap(px(12.))
                        .child(
                            native_ui::icon(
                                match kind {
                                    "Image" => "image",
                                    "Spreadsheet" | "Chart" => "spreadsheet",
                                    "Presentation" => "presentation",
                                    _ => "document",
                                },
                                24.,
                            )
                            .text_color(colors.foreground),
                        )
                        .child(
                            div()
                                .flex_1()
                                .min_w_0()
                                .text_size(native_ui::typography::TextRole::Body.in_app(cx))
                                .child(title.to_owned()),
                        )
                        .child(
                            div()
                                .w(px(160.))
                                .text_size(native_ui::typography::TextRole::Small.in_app(cx))
                                .text_color(colors.muted_foreground)
                                .child(kind.to_owned()),
                        ),
                );
        }
        card.into_any_element()
    }
    fn library_view(&self, window: &mut Window, cx: &mut Context<Self>) -> AnyElement {
        use gpui_kit::component::button::{Button, ButtonVariants};
        let colors = cx.theme().colors.clone();
        let mut library = div()
            .id("library")
            .size_full()
            .overflow_y_scroll()
            .px(px(20.))
            .pb(px(20.))
            .flex()
            .flex_col()
            .gap(px(20.));
        if self.document.is_some() {
            library = library
                .child(
                    div()
                        .h(px(56.))
                        .flex()
                        .items_center()
                        .justify_between()
                        .child(
                            Button::new("library-back")
                                .ghost()
                                .label("Library")
                                .on_click(cx.listener(|s, _, _, cx| {
                                    s.document = None;
                                    cx.notify();
                                })),
                        )
                        .child(
                            div()
                                .flex()
                                .gap(px(8.))
                                .child(self.button("Save", 401, Action::SaveDocument, cx))
                                .child(self.button(
                                    if self.doc_preview { "Edit" } else { "Preview" },
                                    402,
                                    Action::Preview,
                                    cx,
                                ))
                                .child(self.button("Delete", 403, Action::DeleteDocument, cx)),
                        ),
                )
                .child(
                    div()
                        .w_full()
                        .max_w(px(768.))
                        .mx_auto()
                        .child(Input::new(&self.doc_title)),
                );
            return library
                .child(
                    div()
                        .w_full()
                        .max_w(px(768.))
                        .mx_auto()
                        .child(if self.doc_preview {
                            div()
                                .py(px(20.))
                                .child(TextView::markdown(
                                    "document-preview",
                                    self.doc_editor.read(cx).value(),
                                ))
                                .into_any_element()
                        } else {
                            Textarea::new(&self.doc_editor).into_any_element()
                        }),
                )
                .into_any_element();
        }
        library = library.child(
            div()
                .h(px(76.))
                .flex()
                .items_center()
                .justify_between()
                .gap(px(16.))
                .child(
                    div()
                        .text_size(native_ui::typography::TextRole::HeadingLarge.in_app(cx))
                        .font_weight(FontWeight::MEDIUM)
                        .child("Library"),
                )
                .child(
                    div()
                        .flex()
                        .items_center()
                        .gap(px(8.))
                        .child(div().w(px(220.)).child(Input::new(&self.library_search)))
                        .child(
                            Button::new("library-view-toggle")
                                .ghost()
                                .label(if self.library_grid {
                                    "List view"
                                } else {
                                    "Grid view"
                                })
                                .on_click(cx.listener(|s, _, _, cx| {
                                    s.library_grid = !s.library_grid;
                                    cx.notify();
                                })),
                        )
                        .child(self.library_filters(cx))
                        .child(self.button("Create", 400, Action::NewDocument, cx)),
                ),
        );
        let mut navigation = div()
            .id("library-navigation")
            .flex()
            .flex_wrap()
            .gap(px(8.));
        for (i, name) in ["All", "Images"].iter().enumerate() {
            navigation = navigation.child(
                Button::new(("library-tab", i))
                    .ghost()
                    .rounded(px(999.))
                    .h(px(32.))
                    .px(px(12.))
                    .when(self.library_images_only == (i == 1), |b| b.bg(colors.muted))
                    .label(*name)
                    .on_click(cx.listener(move |s, _, window, cx| {
                        s.library_images_only = i == 1;
                        s.library_categories = 0;
                        s.library_search
                            .update(cx, |input, cx| input.set_value("", window, cx));
                        cx.notify();
                    })),
            );
        }
        library = library.child(navigation);
        if self.library_categories != 0 {
            let mut tags = div()
                .id("library-active-filters")
                .flex()
                .flex_wrap()
                .gap(px(8.));
            for (i, name) in [
                (2usize, "Images"),
                (1, "Documents"),
                (3, "Spreadsheets"),
                (4, "Presentations"),
                (5, "PDFs"),
            ] {
                if self.library_categories & (1 << i) == 0 {
                    continue;
                }
                tags = tags.child(
                    Button::new(("library-clear-filter", i))
                        .label(name)
                        .accessibility_label(format!("Clear {name} filter"))
                        .child(native_ui::icon("close", 12.).text_color(colors.foreground))
                        .on_click(cx.listener(move |s, _, _, cx| {
                            s.library_categories &= !(1 << i);
                            cx.notify();
                        })),
                );
            }
            library = library.child(tags);
        }
        let sidebar = if self.sidebar {
            f32::from(clamp_sidebar_width(
                px(self.workspace.settings.sidebar_width as f32),
                window.viewport_size().width,
            ))
        } else {
            48. // The destination rail stays visible when the contextual sidebar is hidden.
        };
        let available = (f32::from(window.viewport_size().width) - sidebar - 8. - 40.).max(64.);
        let columns = Self::library_columns(available);
        let gap = if f32::from(window.viewport_size().width) >= 640. {
            16.
        } else {
            12.
        };
        let card_width = (available - gap * (columns - 1) as f32) / columns as f32;
        let query = self.library_search.read(cx).value().trim().to_lowercase();
        let mut files = div()
            .id("library-files")
            .gap(px(gap))
            .items_start()
            .when(self.library_grid, |d| d.grid().grid_cols(columns))
            .when(!self.library_grid, |d| d.flex().flex_col());
        let mut count = 0;
        for (i, d) in self.workspace.documents.iter().enumerate() {
            let (category, kind) = match d.kind {
                DocumentKind::Spreadsheet => (3, "Spreadsheet"),
                DocumentKind::Presentation => (4, "Presentation"),
                DocumentKind::Drawing => (2, "Image"),
                _ => (1, "Document"),
            };
            if (self.library_images_only && category != 2)
                || (self.library_categories != 0 && self.library_categories & (1 << category) == 0)
                || (!query.is_empty()
                    && !format!("{} {kind}", d.title)
                        .to_lowercase()
                        .contains(&query))
            {
                continue;
            }
            count += 1;
            let preview = d.content.chars().take(90).collect::<String>();
            files = files.child(self.library_file_card(
                i,
                &d.title,
                kind,
                &preview,
                Action::Document(d.id.clone()),
                card_width,
                cx,
            ));
        }
        // Named local example files open the existing retained editor entities.
        // These titles describe sample content, not selectable component types.
        let samples = [
            (
                "A quieter workspace",
                "Document",
                "Design principles · Milestones",
                1,
            ),
            (
                "Team budget",
                "Spreadsheet",
                "Item                 Planned     Actual\nResearch             1200          900\nDesign               2400        2300",
                3,
            ),
            (
                "Ideas, made tangible",
                "Presentation",
                "One canvas.\nA hundred possibilities.",
                4,
            ),
            (
                "Landscape study",
                "Image",
                "Procedural image · Local annotations",
                2,
            ),
            (
                "Meeting notes",
                "Audio",
                "00:00 ━━━━━━━━━ 02:00\nSample recording timeline",
                0,
            ),
            (
                "Product flow",
                "Diagram",
                "Idea → Draft → Review → Publish",
                1,
            ),
            (
                "Places to explore",
                "Map",
                "Local map with saved markers",
                0,
            ),
            (
                "Design handbook",
                "PDF",
                "A short guide to thoughtful interfaces",
                5,
            ),
            (
                "Function study",
                "Math",
                "y = x²\nCoordinates and curves",
                1,
            ),
            (
                "Geometry study",
                "3D scene",
                "Procedural geometry · Local scene",
                0,
            ),
            (
                "Budget overview",
                "Chart",
                "Planning, design and development",
                3,
            ),
        ];
        for (i, (title, kind, preview, category)) in samples.iter().enumerate() {
            if (self.library_images_only && *category != 2)
                || (self.library_categories != 0 && self.library_categories & (1 << *category) == 0)
                || (!query.is_empty() && !format!("{title} {kind}").to_lowercase().contains(&query))
            {
                continue;
            }
            count += 1;
            files = files.child(self.library_file_card(
                1000 + i,
                title,
                kind,
                preview,
                Action::Route(Route::Rich(i)),
                card_width,
                cx,
            ));
        }
        if count == 0 {
            files = files.child(
                div()
                    .w_full()
                    .py(px(40.))
                    .text_center()
                    .text_color(colors.muted_foreground)
                    .child("No files match your search."),
            );
        }
        library.child(files).into_any_element()
    }

    fn project_dialog(&self, cx: &mut Context<Self>) -> AnyElement {
        use gpui_kit::component::button::{Button, ButtonVariants};
        let content = div()
            .id("project-editor")
            .w(px(520.))
            .max_w(relative(0.92))
            .max_h(relative(0.88))
            .overflow_y_scroll()
            .p(px(24.))
            .rounded(px(24.))
            .bg(cx.theme().colors.background)
            .border_1()
            .border_color(cx.theme().colors.border)
            .shadow_lg()
            .flex()
            .flex_col()
            .gap(px(16.))
            .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation())
            .child(
                div()
                    .flex()
                    .items_center()
                    .justify_between()
                    .gap(px(16.))
                    .child(
                        div()
                            .text_size(native_ui::typography::TextRole::HeadingMedium.in_app(cx))
                            .font_weight(FontWeight::MEDIUM)
                            .child(if self.project.is_some() {
                                "Edit project"
                            } else {
                                "Create project"
                            }),
                    )
                    .child(
                        Button::new("project-editor-close")
                            .ghost()
                            .w(px(32.))
                            .h(px(32.))
                            .p_0()
                            .rounded_full()
                            .accessibility_label("Close project editor")
                            .tooltip("Close")
                            .child(
                                native_ui::icon("close", 20.)
                                    .text_color(cx.theme().colors.foreground),
                            )
                            .on_click(cx.listener(|s, _, w, cx| s.act(Action::Close, w, cx))),
                    ),
            )
            .child(
                div()
                    .flex()
                    .flex_col()
                    .gap(px(8.))
                    .child(div().text_size(native_ui::typography::TextRole::Small.in_app(cx)).child("Name"))
                    .child(Input::new(&self.project_name)),
            )
            .child(
                div()
                    .flex()
                    .flex_col()
                    .gap(px(8.))
                    .child(div().text_size(native_ui::typography::TextRole::Small.in_app(cx)).child("Instructions"))
                    .child(Textarea::new(&self.project_instructions)),
            )
            .when(!self.notice.is_empty(), |d| {
                d.child(
                    div()
                        .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
                        .text_color(cx.theme().colors.muted_foreground)
                        .child(self.notice.clone()),
                )
            })
            .child(
                div()
                    .flex()
                    .justify_end()
                    .gap(px(8.))
                    .child(
                        Button::new("project-editor-cancel")
                            .label("Cancel")
                            .on_click(cx.listener(|s, _, w, cx| s.act(Action::Close, w, cx))),
                    )
                    .child(
                        Button::new(("app-btn", 301usize))
                            .primary()
                            .label("Save")
                            .on_click(cx.listener(|s, _, w, cx| s.act(Action::SaveProject, w, cx))),
                    ),
            );
        div()
            .absolute()
            .inset_0()
            .bg(rgba(0x00000022))
            .flex()
            .items_center()
            .justify_center()
            .on_mouse_down(
                MouseButton::Left,
                cx.listener(|s, _, w, cx| s.act(Action::Close, w, cx)),
            )
            .child(content.focus_trap("project-editor-dialog", &self.modal_focus))
            .occlude()
            .into_any_element()
    }

    fn dialog_view(
        &self,
        dialog: Dialog,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) -> AnyElement {
        if matches!(dialog,Dialog::Permissions|Dialog::FullAccessConfirm) { return self.permissions_view(dialog,window,cx); }
        if dialog == Dialog::Share { return self.share_dialog_view(window, cx); }
        if dialog == Dialog::ComposerLibrary {
            return self.composer_library_view(window, cx);
        }
        if matches!(dialog, Dialog::Model | Dialog::Attachments) {
            return self.composer_menu_view(dialog, cx);
        }
        if dialog == Dialog::ProjectEditor {
            return self.project_dialog(cx);
        }
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
            Dialog::EditMenu
            | Dialog::Share
            | Dialog::ChatMenu
            | Dialog::AccountMenu
            | Dialog::BrandMenu
            | Dialog::HelpMenu
            | Dialog::ProjectEditor => unreachable!(),
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
            Dialog::Model | Dialog::ComposerLibrary | Dialog::Permissions | Dialog::FullAccessConfirm => unreachable!(),
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
            Dialog::Attachments => unreachable!(),
        }
        content = content.child(self.button("Close", 699, Action::Close, cx));
        div()
            .absolute()
            .inset_0()
            .bg(native_ui::tokens::dialog_overlay())
            .flex()
            .items_center()
            .justify_center()
            .child(content.focus_trap("workspace-dialog", &self.modal_focus))
            .occlude()
            .into_any_element()
    }
}

impl WorkspaceApp {
    fn project_sort_header(&self, label: &'static str, key: ProjectSortKey, cx: &mut Context<Self>) -> impl IntoElement {
        use gpui_kit::component::button::{Button, ButtonVariants};
        let active = self.project_sort.key == key;
        Button::new(if key == ProjectSortKey::Name { "project-sort-name" } else { "project-sort-modified" })
            .ghost().h(px(24.)).px_0().gap(px(4.))
            .text_size(native_ui::typography::TextRole::Caption.in_app(cx))
            .text_color(if active { cx.theme().foreground } else { native_ui::tokens::tertiary_text(cx.theme().mode.is_dark()) })
            .accessibility_label(format!("Sort by {label}{}", if active { if self.project_sort.descending { ", descending" } else { ", ascending" } } else { "" }))
            .child(label)
            .when(active, |button| button.child(native_ui::icon("project-sort", 16.)
                .when(self.project_sort.descending, |icon| icon.with_transformation(gpui_kit::Transformation::rotate(gpui_kit::radians(std::f32::consts::PI))))))
            .on_click(cx.listener(move |app, _, _, cx| { app.project_sort.select(key); cx.notify(); }))
    }
}
