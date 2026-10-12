// Source constraints: catalog/VISUAL-REFERENCE.md. Electron toolbar 46px,
// sidebar default 340px (240..520), rows 30px with 10px corners.
use gpui_kit::base::TestSupportExt;
use gpui_kit::component::button::{Button, ButtonVariants};

// Matches shipped dC: the minimum wins when the viewport is narrower than480px.
fn clamp_sidebar_width(width: Pixels, viewport: Pixels) -> Pixels {
    width.min(px(520.)).min(viewport - px(240.)).max(px(240.))
}
impl WorkspaceApp {
    fn open_shell_menu(&mut self, dialog: Dialog, window: &mut Window, cx: &mut Context<Self>) {
        if self.dialog.is_none() {
            self.previous_focus = match dialog {
                Dialog::BrandMenu => Some(self.shell_trigger_focus[0].clone()),
                Dialog::AccountMenu => Some(self.shell_trigger_focus[1].clone()),
                _ => window.focused(cx),
            };
        }
        self.dialog = Some(dialog);
        self.shell_menu_index = if dialog == Dialog::HelpMenu { 2 } else { 0 };
        window.focus(&self.shell_menu_focus[self.shell_menu_index], cx);
        cx.notify();
    }
    fn shell_menu_key(
        &mut self,
        event: &KeyDownEvent,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) -> bool {
        let Some(dialog) = self.dialog else {
            return false;
        };
        let count = match dialog {
            Dialog::BrandMenu => 1,
            Dialog::AccountMenu => 2,
            Dialog::HelpMenu => 3,
            Dialog::ChatMenu => 5,
            _ => return false,
        };
        let next = match event.keystroke.key.as_str() {
            "down" => Some((self.shell_menu_index + 1) % count),
            "up" => Some((self.shell_menu_index + count - 1) % count),
            "home" => Some(0),
            "end" => Some(count - 1),
            "right" if dialog == Dialog::AccountMenu && self.shell_menu_index == 1 => {
                self.open_shell_menu(Dialog::HelpMenu, window, cx);
                cx.stop_propagation();
                return true;
            }
            "left" if dialog == Dialog::HelpMenu => {
                self.dialog = Some(Dialog::AccountMenu);
                self.shell_menu_index = 1;
                window.focus(&self.shell_menu_focus[1], cx);
                cx.notify();
                cx.stop_propagation();
                return true;
            }
            "enter" | "space" => {
                let action = match dialog {
                    Dialog::BrandMenu => Action::Close,
                    Dialog::AccountMenu | Dialog::HelpMenu => match self.shell_menu_index {
                        0 => Action::Route(Route::Settings),
                        1 => Action::HelpMenu,
                        _ => Action::KeyboardSettings,
                    },
                    Dialog::ChatMenu => match self.shell_menu_index {
                        0 => Action::Rename,
                        1 => Action::Pin,
                        2 => Action::AssignProject,
                        3 => Action::Archive,
                        _ => Action::DeleteChat,
                    },
                    _ => unreachable!(),
                };
                self.act(action, window, cx);
                cx.stop_propagation();
                return true;
            }
            _ => None,
        };
        if let Some(next) = next {
            self.shell_menu_index = next;
            window.focus(&self.shell_menu_focus[next], cx);
            cx.notify();
            cx.stop_propagation();
            true
        } else {
            false
        }
    }
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
                div()
                    .id("brand-menu")
                    .aria_label("Switch mode, current mode: ChatGPT")
                    .test_support()
                    .track_focus(&self.shell_trigger_focus[0])
                    .flex()
                    .items_center()
                    .tab_stop(true)
                    .role(Role::Button)
                    .hover(|s| s.bg(cx.theme().colors.secondary))
                    .on_key_down(cx.listener(|this, event: &KeyDownEvent, window, cx| {
                        if matches!(event.keystroke.key.as_str(), "enter" | "space") {
                            this.act(Action::BrandMenu, window, cx);
                            cx.stop_propagation();
                        }
                    }))
                    .h(px(32.))
                    .px(px(8.))
                    .rounded(px(10.))
                    .child(
                        div()
                            .flex()
                            .items_center()
                            .gap(px(4.))
                            .child(
                                native_ui::icon("wordmark", 18.)
                                    .w(px(77.13))
                                    .text_color(cx.theme().colors.foreground),
                            )
                            .child(
                                native_ui::icon("chevron-down", 12.)
                                    .text_color(cx.theme().colors.muted_foreground),
                            ),
                    )
                    .on_click(
                        cx.listener(|this, _, window, cx| this.act(Action::BrandMenu, window, cx)),
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
        recents = recents.child(self.sidebar_row(
            "scheduled",
            "Scheduled",
            5,
            Action::Route(Route::Tool(0)),
            self.route == Route::Tool(0),
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
                div()
                    .id("profile-menu")
                    .aria_label("Profile and settings")
                    .test_support()
                    .track_focus(&self.shell_trigger_focus[1])
                    .flex()
                    .items_center()
                    .tab_stop(true)
                    .role(Role::Button)
                    .hover(|s| s.bg(cx.theme().colors.secondary))
                    .on_key_down(cx.listener(|this, event: &KeyDownEvent, window, cx| {
                        if matches!(event.keystroke.key.as_str(), "enter" | "space") {
                            this.act(Action::AccountMenu, window, cx);
                            cx.stop_propagation();
                        }
                    }))
                    .w_full()
                    .h(px(44.))
                    .px(px(8.))
                    .rounded(px(10.))
                    .justify_start()
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
    fn shell_menu(&self, dialog: Dialog, window: &Window, cx: &mut Context<Self>) -> AnyElement {
        let mut panel = div()
            .w(
                if matches!(dialog, Dialog::AccountMenu | Dialog::HelpMenu) {
                    clamp_sidebar_width(
                        px(self.workspace.settings.sidebar_width as f32),
                        window.viewport_size().width,
                    ) - px(16.)
                } else if dialog == Dialog::BrandMenu {
                    px(240.)
                } else {
                    px(248.)
                },
            )
            .p(px(6.))
            .rounded(px(14.))
            .border_1()
            .border_color(cx.theme().colors.border)
            .bg(cx.theme().colors.popover)
            .shadow_lg()
            .flex()
            .flex_col()
            .gap(px(2.));
        if matches!(dialog, Dialog::AccountMenu | Dialog::HelpMenu) {
            let name = self
                .settings
                .read(cx)
                .current_settings()
                .display_name
                .trim();
            panel = panel.child(
                div()
                    .px(px(8.))
                    .py(px(10.))
                    .flex()
                    .flex_col()
                    .child(if name.is_empty() {
                        "User".to_owned()
                    } else {
                        name.to_owned()
                    })
                    .child(
                        div()
                            .text_size(px(12.))
                            .text_color(cx.theme().colors.muted_foreground)
                            .child("Personal account"),
                    ),
            );
        }
        if dialog == Dialog::BrandMenu {
            // Dns: ChatGPT item only; Codex capability is false in this local fixture.
            panel = panel.child(
                div()
                    .id(("shell-menu-focus", 0usize))
                    .test_support()
                    .track_focus(&self.shell_menu_focus[0])
                    .child(
                        Button::new("brand-chatgpt")
                            .tab_stop(false)
                            .ghost()
                            .w_full()
                            .h(px(60.))
                            .px(px(8.))
                            .rounded(px(8.))
                            .accessibility_label("ChatGPT — Create, learn, and explore")
                            .child(
                                div()
                                    .w_full()
                                    .flex()
                                    .flex_col()
                                    .items_start()
                                    .gap(px(4.))
                                    .child(div().text_size(px(14.)).child("ChatGPT"))
                                    .child(
                                        div()
                                            .text_size(px(12.))
                                            .text_color(cx.theme().colors.muted_foreground)
                                            .child("Create, learn, and explore"),
                                    ),
                            )
                            .on_click(cx.listener(|this, _, window, cx| {
                                this.act(Action::Close, window, cx)
                            })),
                    ),
            );
        }
        let items: Vec<(&'static str, &'static str, usize, Action)> = if dialog == Dialog::BrandMenu
        {
            vec![]
        } else if dialog == Dialog::ChatMenu {
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
                ("help", "Help", 712, Action::HelpMenu),
            ]
        };
        for (index, (name, label, key, action)) in items.into_iter().enumerate() {
            panel = panel.child(
                div()
                    .id(("shell-menu-focus", index))
                    .test_support()
                    .track_focus(&self.shell_menu_focus[index])
                    .child(
                        Button::new(("app-btn", key))
                            .tab_stop(false)
                            .when(self.shell_menu_index == index, |b| {
                                b.bg(cx.theme().colors.secondary)
                            })
                            .ghost()
                            .accessibility_label(label)
                            .child(
                                div()
                                    .w_full()
                                    .flex()
                                    .items_center()
                                    .gap(px(8.))
                                    .when(!name.is_empty(), |row| {
                                        row.child(
                                            native_ui::icon(name, 18.)
                                                .text_color(cx.theme().colors.foreground),
                                        )
                                    })
                                    .child(label)
                                    .when(key == 712, |row| {
                                        row.child(div().flex_1())
                                            .child(native_ui::icon("chevron-right", 12.))
                                    }),
                            )
                            .w_full()
                            .h(px(32.))
                            .px(px(8.))
                            .justify_start()
                            .rounded(px(8.))
                            .text_size(px(13.))
                            .on_click(cx.listener(move |this, _, window, cx| {
                                if !matches!(action, Action::HelpMenu) {
                                    this.dialog = None;
                                }
                                this.act(action.clone(), window, cx);
                            })),
                    ),
            );
        }
        let anchored = div()
            .absolute()
            .when(dialog == Dialog::ChatMenu, |d| {
                // Align with More's right edge:138px caption controls +8px gap.
                // Popup-specific gap/width remain pending source/runtime confirmation.
                d.top(px(46.)).right(px(146.))
            })
            .when(
                matches!(dialog, Dialog::AccountMenu | Dialog::HelpMenu),
                |d| d.bottom(px(58.)).left(px(8.)),
            )
            .when(dialog == Dialog::BrandMenu, |d| {
                d.top(px(44.)).left(px(16.))
            })
            .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation())
            .child(panel)
            .when(dialog == Dialog::HelpMenu, |anchor| {
                anchor.child(
                    div()
                        .absolute()
                        .bottom_0()
                        .left(
                            clamp_sidebar_width(
                                px(self.workspace.settings.sidebar_width as f32),
                                window.viewport_size().width,
                            ) - px(10.),
                        )
                        .w(px(240.))
                        .on_mouse_down(MouseButton::Left, |_, _, cx| cx.stop_propagation())
                        .p(px(6.))
                        .rounded(px(14.))
                        .border_1()
                        .border_color(cx.theme().colors.border)
                        .bg(cx.theme().colors.popover)
                        .shadow_lg()
                        .child(
                            div()
                                .id(("shell-menu-focus", 2usize))
                                .test_support()
                                .track_focus(&self.shell_menu_focus[2])
                                .child(
                                    Button::new(("app-btn", 713usize))
                                        .tab_stop(false)
                                        .ghost()
                                        .w_full()
                                        .h(px(32.))
                                        .px(px(8.))
                                        .accessibility_label("Keyboard shortcuts")
                                        .child(
                                            div()
                                                .w_full()
                                                .flex()
                                                .items_center()
                                                .gap(px(8.))
                                                .child(native_ui::icon("keyboard", 18.))
                                                .child("Keyboard shortcuts"),
                                        )
                                        .on_click(cx.listener(|this, _, window, cx| {
                                            this.act(Action::KeyboardSettings, window, cx)
                                        })),
                                ),
                        ),
                )
            })
            .focus_trap("shell-menu", &self.modal_focus);
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
            Route::Library => self.library_view(window, cx),
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
            .capture_key_down(cx.listener(|this, event, window, cx| {
                if !this.shell_menu_key(event, window, cx) {
                    this.handle_key(event, window, cx);
                }
            }))
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
            root = root.child(
                if matches!(
                    dialog,
                    Dialog::ChatMenu | Dialog::AccountMenu | Dialog::BrandMenu | Dialog::HelpMenu
                ) {
                    self.shell_menu(dialog, window, cx)
                } else {
                    self.dialog_view(dialog, cx)
                },
            );
        }
        root
    }
}
