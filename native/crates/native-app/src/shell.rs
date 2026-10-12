// Source constraints: catalog/VISUAL-REFERENCE.md. Electron toolbar 46px,
// sidebar default 340px (240..520), rows 30px with 10px corners.
use gpui_kit::base::TestSupportExt;
use gpui_kit::component::button::{Button, ButtonVariants};

// Matches shipped dC: the minimum wins when the viewport is narrower than480px.
fn clamp_sidebar_width(width: Pixels, viewport: Pixels) -> Pixels {
    width.min(px(520.)).min(viewport - px(240.)).max(px(240.))
}
impl WorkspaceApp {
    fn finish_sidebar_resize(&mut self, cx: &mut Context<Self>) {
        if self.sidebar_resize.take().is_some() {
            self.persist();
            cx.notify();
        }
    }
    fn resize_sidebar(
        &mut self,
        event: &MouseMoveEvent,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) {
        if let Some((start_x, start_width)) = self.sidebar_resize {
            if event.pressed_button != Some(MouseButton::Left) {
                self.finish_sidebar_resize(cx);
                return;
            }
            let width = clamp_sidebar_width(
                start_width + event.position.x - start_x,
                window.viewport_size().width,
            );
            self.workspace.settings.sidebar_width = f32::from(width).round() as u16;
            cx.notify();
        }
    }

    fn row_button(
        &self,
        icon: Option<&str>,
        label: impl Into<SharedString>,
        key: usize,
        action: Action,
        selected: bool,
        cx: &mut Context<Self>,
    ) -> Button {
        let label: SharedString = label.into();
        let mut row = div().w_full().flex().items_center().gap(px(8.)).min_w_0();
        if let Some(icon) = icon {
            row = row.child(native_ui::icon(icon, 20.).text_color(cx.theme().colors.foreground));
        }
        row = row.child(div().flex_1().min_w_0().truncate().child(label.clone()));
        Button::new(("nav", key))
            .ghost()
            .accessibility_label(label)
            .w_full()
            .h(px(30.))
            .px(px(8.))
            .rounded(px(10.))
            .text_size(px(13.))
            .child(row)
            .when(selected, |b| b.bg(cx.theme().colors.secondary))
            .on_click(cx.listener(move |this, _, window, cx| this.act(action.clone(), window, cx)))
    }
    fn nav(
        &self,
        label: impl Into<SharedString>,
        key: usize,
        action: Action,
        selected: bool,
        cx: &mut Context<Self>,
    ) -> Button {
        self.row_button(None, label, key, action, selected, cx)
    }
    fn shell_icon(
        &self,
        name: &'static str,
        label: &'static str,
        key: usize,
        action: Action,
        cx: &mut Context<Self>,
    ) -> Button {
        Button::new(("app-btn", key))
            .ghost()
            .icon(native_ui::glyph(name))
            .accessibility_label(label)
            .tooltip(label)
            .size(px(28.))
            .p_0()
            .rounded(px(8.))
            .on_click(cx.listener(move |this, _, window, cx| this.act(action.clone(), window, cx)))
    }
    fn sidebar_row(
        &self,
        name: &'static str,
        label: impl Into<SharedString>,
        key: usize,
        action: Action,
        selected: bool,
        cx: &mut Context<Self>,
    ) -> Button {
        self.row_button(Some(name), label, key, action, selected, cx)
    }
    fn sidebar_view(&self, window: &Window, cx: &mut Context<Self>) -> impl IntoElement {
        let display_name = self
            .settings
            .read(cx)
            .current_settings()
            .display_name
            .trim()
            .to_owned();
        let display_name = if display_name.is_empty() {
            "User".to_owned()
        } else {
            display_name
        };
        let profile_initial = display_name
            .chars()
            .next()
            .unwrap_or('U')
            .to_uppercase()
            .to_string();
        let width = clamp_sidebar_width(
            px(self.workspace.settings.sidebar_width as f32),
            window.viewport_size().width,
        );
        let header = div()
            .h(px(32.))
            .mx(px(8.))
            .mb(px(8.))
            .flex()
            .items_center()
            .justify_between()
            .child(
                div().flex().items_center().gap(px(8.)).child(
                    native_ui::icon("wordmark", 18.)
                        .w(px(77.13))
                        .text_color(cx.theme().colors.foreground),
                ),
            )
            .child(
                div()
                    .flex()
                    .gap(px(2.))
                    .child(self.shell_icon("search", "Search chats", 709, Action::Search, cx))
                    .child(self.shell_icon("sidebar", "Close sidebar", 700, Action::Sidebar, cx)),
            );
        let mut recents = div()
            .id("recents")
            .track_scroll(&self.recents_scroll)
            .flex_1()
            .min_h_0()
            .overflow_y_scroll()
            .flex()
            .flex_col()
            .gap(px(2.))
            .mt(px(16.));
        // Destination visibility/order is fixture state; each original destination is feature gated.
        recents = recents
            .child(self.sidebar_row(
                "projects",
                "Projects",
                2,
                Action::Route(Route::Projects),
                self.route == Route::Projects,
                cx,
            ))
            .child(self.sidebar_row(
                "library",
                "Library",
                3,
                Action::Route(Route::Library),
                self.route == Route::Library,
                cx,
            ));
        let muted = cx.theme().colors.muted_foreground;
        let section = |label: &'static str| {
            div()
                .mt(px(16.))
                .mb(px(4.))
                .px(px(8.))
                .text_size(px(12.))
                .text_color(muted)
                .child(label)
        };
        let mut chats = self
            .workspace
            .conversations
            .iter()
            .filter(|c| !c.archived && !c.messages.is_empty())
            .collect::<Vec<_>>();
        chats.sort_by_key(|c| !c.pinned);
        let mut last_pinned = None;
        for (i, chat) in chats.iter().take(self.recent_limit).enumerate() {
            if last_pinned != Some(chat.pinned) {
                recents = recents.child(section(if chat.pinned { "Pinned" } else { "Chats" }));
                last_pinned = Some(chat.pinned);
            }
            recents = recents.child(self.nav(
                chat.title.clone(),
                100 + i,
                Action::Chat(chat.id.clone()),
                self.route == Route::Chat && self.active == chat.id,
                cx,
            ));
        }
        if chats.len() > self.recent_limit {
            recents = recents.child(self.nav("Show more", 901, Action::ShowMoreChats, false, cx));
        }
        div()
            .id("sidebar")
            .relative()
            .w(width)
            .h_full()
            .flex_shrink_0()
            .bg(cx.theme().colors.sidebar)
            .px(px(8.))
            .pt(px(8.))
            .pb(px(8.))
            .flex()
            .flex_col()
            .child(
                div()
                    .id("sidebar-resize-handle")
                    .test_support()
                    .absolute()
                    .right_0()
                    .top_0()
                    .bottom_0()
                    .w(px(6.))
                    .cursor_col_resize()
                    .on_mouse_down(
                        MouseButton::Left,
                        cx.listener(move |this, event: &MouseDownEvent, _, cx| {
                            this.sidebar_resize = Some((event.position.x, width));
                            cx.stop_propagation();
                            cx.notify();
                        }),
                    ),
            )
            .child(header)
            .child(self.sidebar_row("new-chat", "New chat", 0, Action::New, false, cx))
            .child(recents)
            .child(
                Button::new("profile-menu")
                    .ghost()
                    .w_full()
                    .h(px(44.))
                    .px(px(8.))
                    .rounded(px(10.))
                    .justify_start()
                    .accessibility_label("Profile and settings")
                    .child(
                        div()
                            .w_full()
                            .flex()
                            .items_center()
                            .gap(px(8.))
                            .child(
                                div()
                                    .size(px(28.))
                                    .rounded_full()
                                    .bg(rgb(0x416d58))
                                    .text_color(rgb(0xffffff))
                                    .flex()
                                    .items_center()
                                    .justify_center()
                                    .text_size(px(12.))
                                    .child(profile_initial),
                            )
                            .child(div().text_size(px(13.)).child(display_name)),
                    )
                    .on_click(
                        cx.listener(|this, _, window, cx| {
                            this.act(Action::AccountMenu, window, cx)
                        }),
                    ),
            )
    }
    fn shell_menu(&self, dialog: Dialog, cx: &mut Context<Self>) -> AnyElement {
        let mut panel = div()
            .w(px(248.))
            .p(px(6.))
            .rounded(px(14.))
            .border_1()
            .border_color(cx.theme().colors.border)
            .bg(cx.theme().colors.popover)
            .shadow_lg()
            .flex()
            .flex_col()
            .gap(px(2.));
        let items: Vec<(&'static str, &'static str, usize, Action)> = if dialog == Dialog::ChatMenu
        {
            let pinned = self
                .workspace
                .conversation(&self.active)
                .is_ok_and(|c| c.pinned);
            vec![
                ("edit", "Rename", 702, Action::Rename),
                (
                    "pin",
                    if pinned { "Unpin" } else { "Pin" },
                    703,
                    Action::Pin,
                ),
                ("projects", "Move to project", 705, Action::AssignProject),
                ("archive", "Archive", 704, Action::Archive),
                ("trash", "Delete", 707, Action::DeleteChat),
            ]
        } else {
            vec![
                ("settings", "Settings", 4, Action::Route(Route::Settings)),
                ("image", "Appearance", 701, Action::Theme),
            ]
        };
        for (name, label, key, action) in items {
            panel = panel.child(
                Button::new(("app-btn", key))
                    .ghost()
                    .accessibility_label(label)
                    .child(
                        div()
                            .w_full()
                            .flex()
                            .items_center()
                            .gap(px(8.))
                            .child(
                                native_ui::icon(name, 18.).text_color(cx.theme().colors.foreground),
                            )
                            .child(label),
                    )
                    .w_full()
                    .h(px(32.))
                    .px(px(8.))
                    .justify_start()
                    .rounded(px(8.))
                    .text_size(px(13.))
                    .on_click(cx.listener(move |this, _, window, cx| {
                        this.dialog = None;
                        this.act(action.clone(), window, cx);
                    })),
            );
        }
        let anchored = div()
            .absolute()
            .when(dialog == Dialog::ChatMenu, |d| {
                d.top(px(44.)).right(px(12.))
            })
            .when(dialog == Dialog::AccountMenu, |d| {
                d.bottom(px(56.)).left(px(12.))
            })
            .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation())
            .child(panel.focus_trap("shell-menu", &self.modal_focus));
        div()
            .absolute()
            .inset_0()
            .occlude()
            .on_mouse_down(
                MouseButton::Left,
                cx.listener(|this, _, window, cx| this.act(Action::Close, window, cx)),
            )
            .child(anchored)
            .into_any_element()
    }
}
impl Render for WorkspaceApp {
    fn render(&mut self, window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let title: SharedString = match self.route {
            Route::Chat => self
                .workspace
                .conversation(&self.active)
                .map(|c| {
                    if c.messages.is_empty() {
                        "ChatGPT".into()
                    } else {
                        c.title.clone().into()
                    }
                })
                .unwrap_or_else(|_| "ChatGPT".into()),
            Route::Projects => "Projects".into(),
            Route::Library => "Library".into(),
            Route::Settings => "Settings".into(),
            Route::Rich(i) => RICH_LABELS[i].into(),
            Route::Tool(i) => TOOL_LABELS[i].into(),
        };
        let mut start = div().flex().items_center().gap(px(4.)).min_w_0();
        if !self.sidebar {
            start =
                start.child(self.shell_icon("sidebar", "Open sidebar", 700, Action::Sidebar, cx));
        }
        // Plain Chat fixture has no page-surface: shipped ki is null unless tpp/flora
        // or hasPageSurface. Those modes are not implemented by this fixture.
        if self.route != Route::Chat {
            start = start.child(
                div()
                    .max_w(px(320.))
                    .truncate()
                    .text_size(px(14.))
                    .font_weight(FontWeight::MEDIUM)
                    .child(title),
            );
        }
        let mut end = div().flex().items_center().gap(px(6.));
        if self.route == Route::Chat
            && self
                .workspace
                .conversation(&self.active)
                .is_ok_and(|c| !c.messages.is_empty())
        {
            end = end
                .child(
                    Button::new(("app-btn", 706usize))
                        .ghost()
                        .icon(native_ui::glyph("share"))
                        .label("Share")
                        .h(px(28.))
                        .rounded(px(8.))
                        .text_size(px(13.))
                        .on_click(
                            cx.listener(|this, _, window, cx| this.act(Action::Share, window, cx)),
                        ),
                )
                .child(self.shell_icon("more", "More", 708, Action::ChatMenu, cx));
        }
        let controls = div().h(px(36.)).flex().flex_shrink_0().children(
            [
                (
                    "window-minimize",
                    WindowControlArea::Min,
                    gpui_kit::component::IconName::WindowMinimize,
                ),
                (
                    "window-maximize",
                    WindowControlArea::Max,
                    if window.is_maximized() {
                        gpui_kit::component::IconName::WindowRestore
                    } else {
                        gpui_kit::component::IconName::WindowMaximize
                    },
                ),
                (
                    "window-close",
                    WindowControlArea::Close,
                    gpui_kit::component::IconName::WindowClose,
                ),
            ]
            .into_iter()
            .map(|(id, area, icon)| {
                div()
                    .id(id)
                    .w(px(46.))
                    .h_full()
                    .flex()
                    .items_center()
                    .justify_center()
                    .window_control_area(area)
                    .hover(|s| s.bg(cx.theme().colors.secondary))
                    .child(gpui_kit::component::Icon::new(icon).size(px(12.)))
            }),
        );
        let header = div()
            .id("conversation-toolbar")
            .h(px(46.))
            .flex_shrink_0()
            .pl(px(16.))
            .flex()
            .items_center()
            .justify_between()
            .window_control_area(WindowControlArea::Drag)
            .child(start)
            .child(
                div()
                    .h_full()
                    .flex()
                    .items_center()
                    .gap(px(8.))
                    .child(end)
                    .child(div().h_full().pt(px(0.)).child(controls)),
            );
        let body = match self.route {
            Route::Chat => self.chat_view(window, cx),
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
                    .text_color(cx.theme().colors.danger)
                    .child(format!("Storage could not be loaded. {error}")),
            );
        }
        if !self.notice.is_empty() {
            main = main.child(
                div()
                    .px_4()
                    .py_2()
                    .text_size(px(13.))
                    .text_color(cx.theme().colors.muted_foreground)
                    .child(self.notice.clone()),
            );
        }
        main = main.child(div().flex_1().min_h_0().child(body));
        let mut root = div()
            .id("workspace-app")
            .track_focus(&self.focus)
            .on_mouse_move(cx.listener(Self::resize_sidebar))
            .on_mouse_up(
                MouseButton::Left,
                cx.listener(|this, _, _, cx| this.finish_sidebar_resize(cx)),
            )
            .on_mouse_up_out(
                MouseButton::Left,
                cx.listener(|this, _, _, cx| this.finish_sidebar_resize(cx)),
            )
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
            root = root.child(self.sidebar_view(window, cx));
        }
        root = root.child(main);
        // Capture the drag above descendants so controls never consume the release.
        if self.sidebar_resize.is_some() {
            root = root.child(
                div()
                    .absolute()
                    .inset_0()
                    .occlude()
                    .cursor_col_resize()
                    .on_mouse_move(cx.listener(Self::resize_sidebar))
                    .on_mouse_up(
                        MouseButton::Left,
                        cx.listener(|this, _, _, cx| this.finish_sidebar_resize(cx)),
                    ),
            );
        }
        if let Some(dialog) = self.dialog {
            root = root.child(self.dialog_view(dialog, cx));
        }
        root
    }
}
