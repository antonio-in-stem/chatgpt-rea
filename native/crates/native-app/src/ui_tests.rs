//! Real GPUI event tests. Every fixture owns an isolated temporary storage directory.
use super::{Dialog, WorkspaceApp};
use gpui_kit::test::TestWindowExt;
use gpui_kit::{
    point, px, size, AnyWindowHandle, AppContext, Bounds, Entity, TestAppContext, WindowBounds,
    WindowOptions,
};
use std::{
    path::PathBuf,
    time::{Duration, SystemTime, UNIX_EPOCH},
};
static TEMP_SEQUENCE: std::sync::atomic::AtomicU64 = std::sync::atomic::AtomicU64::new(0);
struct Storage(PathBuf);
impl Storage {
    fn new() -> Self {
        Self(std::env::temp_dir().join(format!(
                "native-app-ui-{}-{}-{}",
                std::process::id(),
                SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .unwrap()
                    .as_nanos(),
                TEMP_SEQUENCE.fetch_add(1, std::sync::atomic::Ordering::Relaxed)
            )))
    }
}
impl Drop for Storage {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.0);
    }
}
fn open(cx: &mut TestAppContext, storage: &Storage) -> (AnyWindowHandle, Entity<WorkspaceApp>) {
    cx.update(|cx| {
        gpui_kit::init(cx);
        gpui_kit::open_window(
            WindowOptions {
                window_bounds: Some(WindowBounds::Windowed(Bounds {
                    origin: point(px(0.), px(0.)),
                    size: size(px(1440.), px(1000.)),
                })),
                ..Default::default()
            },
            cx,
            |window, cx| cx.new(|cx| WorkspaceApp::with_storage(storage.0.clone(), window, cx)),
        )
        .unwrap()
    })
}
#[gpui_kit::test]
fn search_modal_focus_and_escape_restore_composer(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    let (composer, search) = cx.update(|cx| {
        let app = app.read(cx);
        (app.composer.clone(), app.search.clone())
    });
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("input", composer.entity_id()), cx);
        window.press("ctrl-k", cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        assert!(app.read(cx).dialog == Some(Dialog::Search));
        assert_eq!(
            window.find(("input", search.entity_id())).focused(),
            Some(true)
        );
        window.input("reading", cx);
    })
    .unwrap();
    cx.update_window(window, |_, window, cx| {
        window.press("escape", cx);
        window.render_frame(cx);
        assert!(app.read(cx).dialog.is_none());
        assert_eq!(
            window.find(("input", composer.entity_id())).focused(),
            Some(true)
        );
    })
    .unwrap();
}
#[gpui_kit::test]
fn chat_drafts_survive_new_chat_and_sidebar_navigation(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    let (first, composer) = cx.update(|cx| {
        let app = app.read(cx);
        (app.active.clone(), app.composer.clone())
    });
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("input", composer.entity_id()), cx);
        window.input("Original draft", cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update(|cx| {
        assert_eq!(
            app.read(cx).workspace.conversation(&first).unwrap().draft,
            "Original draft"
        )
    });
    cx.update_window(window, |_, window, cx| {
        window.press("ctrl-n", cx);
        window.render_frame(cx);
        window.input("New draft", cx);
    })
    .unwrap();
    cx.run_until_parked();
    let second = cx.update(|cx| {
        let app = app.read(cx);
        assert_ne!(app.active, first);
        assert_eq!(
            app.workspace.conversation(&app.active).unwrap().draft,
            "New draft"
        );
        app.active.clone()
    });
    cx.update_window(window, |_, window, cx| {
        window.click(("nav", 100usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).active, first);
        assert_eq!(composer.read(cx).value().as_ref(), "Original draft");
        assert_eq!(
            app.read(cx).workspace.conversation(&second).unwrap().draft,
            "New draft"
        );
    })
    .unwrap();
}
#[gpui_kit::test]
fn multiline_send_and_stop_cancel_future_stream_updates(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    let composer = cx.update(|cx| app.read(cx).composer.clone());
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("input", composer.entity_id()), cx);
        window.input("First line\nSecond line", cx);
        assert_eq!(
            composer.read(cx).value().as_ref(),
            "First line\nSecond line",
            "Composer must retain typed multiline input before submission"
        );
        window.press("ctrl-enter", cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update(|cx| {
        let app = app.read(cx);
        assert!(app.streaming);
        let messages = &app.workspace.conversation(&app.active).unwrap().messages;
        assert!(messages[messages.len() - 2]
            .content
            .contains("First line\nSecond line"));
        assert!(composer.read(cx).value().is_empty());
    });
    cx.background_executor
        .advance_clock(Duration::from_millis(120));
    cx.run_until_parked();
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 203usize), cx);
    })
    .unwrap();
    let stopped = cx.update(|cx| {
        let app = app.read(cx);
        assert!(!app.streaming);
        app.workspace
            .conversation(&app.active)
            .unwrap()
            .messages
            .last()
            .unwrap()
            .content
            .clone()
    });
    cx.background_executor.advance_clock(Duration::from_secs(5));
    cx.run_until_parked();
    cx.update(|cx| {
        let app = app.read(cx);
        assert_eq!(
            app.workspace
                .conversation(&app.active)
                .unwrap()
                .messages
                .last()
                .unwrap()
                .content,
            stopped
        );
    });
}
#[gpui_kit::test]
fn invalid_storage_is_visible_and_never_replaced_by_ui_changes(cx: &mut TestAppContext) {
    let storage = Storage::new();
    std::fs::create_dir_all(&storage.0).unwrap();
    let path = storage.0.join("workspace.json");
    std::fs::write(&path, b"{invalid state").unwrap();
    let (window, app) = open(cx, &storage);
    let composer = cx.update(|cx| app.read(cx).composer.clone());
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        assert!(app.read(cx).load_error.is_some());
        window.click(("input", composer.entity_id()), cx);
        window.input("Retained in memory", cx);
    })
    .unwrap();
    cx.run_until_parked();
    assert_eq!(std::fs::read(path).unwrap(), b"{invalid state");
}

#[gpui_kit::test]
fn explicit_model_and_project_choices(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    let second = cx.update(|cx| {
        app.update(cx, |app, cx| {
            let id = app.workspace.create_project("Second project").unwrap();
            cx.notify();
            id
        })
    });
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 201usize), cx);
        window.render_frame(cx);
        window.click(("app-btn", 752usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).model_index, 2);
        assert!(app.read(cx).dialog.is_none());
        window.click(("app-btn", 708usize), cx);
        window.render_frame(cx);
        window.click(("app-btn", 705usize), cx);
        window.render_frame(cx);
        assert!(app.read(cx).dialog == Some(super::Dialog::ChatMenu), "project click closed parent menu");
        assert!(app.read(cx).project_submenu.is_some(), "project submenu was not opened");
        let option=app.read(cx).project_menu_choices().iter().position(|(name,_)| name=="Second project").unwrap();
        window.click(("chat-project-option", option), cx);
    })
    .unwrap();
    cx.update(|cx| {
        let app = app.read(cx);
        assert_eq!(
            app.workspace
                .conversation(&app.active)
                .unwrap()
                .project_id
                .as_deref(),
            Some(second.as_str())
        );
    });
}
#[gpui_kit::test]
fn recents_show_more_exposes_next_page(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    cx.update(|cx| {
        app.update(cx, |app, cx| {
            for i in 0..65 {
                let id = app.workspace.create_conversation();
                app.workspace
                    .rename_conversation(&id, &format!("Extra chat {i}"))
                    .unwrap();
                app.workspace
                    .append_message(&id, native_core::MessageRole::User, "Saved conversation")
                    .unwrap();
            }
            app.recents_scroll.scroll_to_bottom();
            cx.notify();
        })
    });
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        app.update(cx, |s, cx| {
            s.recents_scroll.scroll_to_bottom();
            cx.notify();
        });
        window.render_frame(cx);
        window.click(("nav", 901usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).recent_limit, 20);
    })
    .unwrap();
}
#[gpui_kit::test]
fn attachment_retry_cancel_and_conversation_isolation(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    let first = cx.update(|cx| app.read(cx).active.clone());
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 200usize), cx);
        window.render_frame(cx);
        window.click(("app-btn", 610usize), cx);
    })
    .unwrap();
    assert!(cx.did_prompt_for_paths());
    cx.simulate_path_prompt_response(|_| Some(vec![PathBuf::from("quarterly-data.csv")]));
    cx.run_until_parked();
    cx.background_executor
        .advance_clock(Duration::from_millis(400));
    cx.run_until_parked();
    cx.update(|cx| {
        assert_eq!(
            app.read(cx).current_attachments()[0].status,
            super::AttachmentStatus::Failed
        )
    });
    cx.update_window(window, |_, window, cx| {
        window.press("ctrl-n", cx);
        window.render_frame(cx);
        assert!(app.read(cx).current_attachments().is_empty());
        window.click(("nav", 100usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).active, first);
        window.click(("app-btn", 2200usize), cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.background_executor
        .advance_clock(Duration::from_millis(400));
    cx.run_until_parked();
    cx.update(|cx| {
        assert_eq!(
            app.read(cx).current_attachments()[0].status,
            super::AttachmentStatus::Ready
        )
    });
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 2000usize), cx);
        window.render_frame(cx);
        assert!(app.read(cx).current_attachments().is_empty());
    })
    .unwrap();
}
#[gpui_kit::test]
fn reduced_motion_renders_response_without_streaming(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let mut settings = native_settings::Settings::default();
    settings.reduced_motion = true;
    settings.save(&storage.0.join("settings.json")).unwrap();
    let (window, app) = open(cx, &storage);
    let composer = cx.update(|cx| app.read(cx).composer.clone());
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("input", composer.entity_id()), cx);
        window.input("No animation please", cx);
        window.press("ctrl-enter", cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update(|cx| {
        let app = app.read(cx);
        assert!(!app.streaming);
        assert!(app
            .workspace
            .conversation(&app.active)
            .unwrap()
            .messages
            .last()
            .unwrap()
            .content
            .contains("No animation please"));
    });
}
#[gpui_kit::test]
fn all_retained_surfaces_render_at_desktop_and_compact_sizes(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    for dimensions in [size(px(1440.), px(940.)), size(px(1024.), px(768.))] {
        cx.simulate_window_resize(window, dimensions);
        for route in [
            super::Route::Projects,
            super::Route::Library,
            super::Route::Settings,
        ]
        .into_iter()
        .chain((0..11).map(super::Route::Rich))
        .chain((0..5).map(super::Route::Tool))
        {
            cx.update_window(window, |_, window, cx| {
                app.update(cx, |app, cx| {
                    app.act(super::Action::Route(route), window, cx)
                });
                window.render_frame(cx);
            })
            .unwrap();
        }
    }
}

#[gpui_kit::test]
fn streaming_does_not_pull_reader_down_after_scrolling_up(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    let composer = cx.update(|cx| app.read(cx).composer.clone());
    cx.update(|cx| {
        app.update(cx, |app, cx| {
            let active = app.active.clone();
            app.workspace.conversation_mut(&active).unwrap().messages[1].content = (0..100)
                .map(|i| format!("Paragraph {i}: some content to review.\n\n"))
                .collect();
            cx.notify();
        })
    });
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("input", composer.entity_id()), cx);
        window.input("Continue", cx);
        window.press("ctrl-enter", cx);
        window.render_frame(cx);
    })
    .unwrap();
    // Input events dispatch after the window update; settle send before the user scrolls.
    cx.run_until_parked();
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        assert!(app.read(cx).streaming);
        app.read(cx).transcript.set_offset(point(px(0.), px(0.)));
        window.render_frame(cx);
        assert!(app.read(cx).transcript.max_offset().y > px(48.));
    })
    .unwrap();
    cx.run_until_parked();
    cx.background_executor
        .advance_clock(Duration::from_millis(120));
    cx.run_until_parked();
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        assert_eq!(app.read(cx).transcript.offset().y, px(0.));
        window.click(("app-btn", 203usize), cx);
    })
    .unwrap();
}
#[gpui_kit::test]
fn cancel_queued_attachment_does_not_resurrect_when_preparation_finishes(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 200usize), cx);
        window.render_frame(cx);
        window.click(("app-btn", 610usize), cx);
    })
    .unwrap();
    cx.simulate_path_prompt_response(|_| Some(vec![PathBuf::from("design-notes.md")]));
    cx.run_until_parked();
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 2000usize), cx);
        assert!(app.read(cx).current_attachments().is_empty());
    })
    .unwrap();
    cx.run_until_parked();
    cx.background_executor
        .advance_clock(Duration::from_millis(400));
    cx.run_until_parked();
    cx.update(|cx| assert!(app.read(cx).current_attachments().is_empty()));
}

#[gpui_kit::test]
fn user_message_actions_reveal_for_pointer_and_keyboard_focus(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    cx.update_window(window, |_, window, cx| window.render_frame(cx))
        .unwrap();
    cx.run_until_parked();
    let (toolbar, composer, expected) = cx.update(|cx| {
        let state = app.read(cx);
        let message = &state
            .workspace
            .conversation(&state.active)
            .unwrap()
            .messages[0];
        (
            state.message_actions[&message.id].clone(),
            state.composer.clone(),
            message.content.clone(),
        )
    });
    cx.update_window(window, |_, window, cx| {
        window.hover(("input", composer.entity_id()), cx);
        window.render_frame(cx);
        assert!(!toolbar.read(cx).visible());
        window.hover(("app-btn", 1000usize), cx);
        window.render_frame(cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update(|cx| assert!(toolbar.read(cx).visible()));
    cx.update_window(window, |_, window, cx| {
        window.hover(("input", composer.entity_id()), cx);
        window.render_frame(cx);
        window.focus(&toolbar.read(cx).focus.clone(), cx);
        window.press("tab", cx);
        window.render_frame(cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update(|cx| assert!(toolbar.read(cx).focused && toolbar.read(cx).visible()));
    cx.update_window(window, |_, window, cx| {
        window.press("enter", cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update(|cx| {
        assert_eq!(
            cx.read_from_clipboard().and_then(|item| item.text()),
            Some(expected)
        )
    });
    cx.update_window(window, |_, window, cx| {
        window.click(("input", composer.entity_id()), cx)
    })
    .unwrap();
    cx.run_until_parked();
    cx.update(|cx| assert!(!toolbar.read(cx).focused && !toolbar.read(cx).visible()));
}

#[gpui_kit::test]
fn composer_popup_keyboard_selection_and_tool_isolation(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 201usize), cx);
        window.render_frame(cx);
        window.press("end", cx);
        window.press("enter", cx);
        assert_eq!(app.read(cx).model_index, 2);
        assert!(app.read(cx).dialog.is_none());
        window.render_frame(cx);
        window.click(("app-btn", 200usize), cx);
        window.render_frame(cx);
        window.press("end", cx);
        window.press("enter", cx);
        let active = app.read(cx).active.clone();
        assert_eq!(
            app.read(cx).composer_tools.get(&active),
            Some(&"Web search")
        );
        app.update(cx, |app, cx| app.act(super::Action::New, window, cx));
        assert!(!app
            .read(cx)
            .composer_tools
            .contains_key(&app.read(cx).active));
    })
    .unwrap();
}
#[gpui_kit::test]
fn file_picker_cancellation_preserves_attachments(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 200usize), cx);
        window.render_frame(cx);
        window.click(("app-btn", 610usize), cx);
    })
    .unwrap();
    assert!(cx.did_prompt_for_paths());
    cx.simulate_path_prompt_response(|options| {
        assert!(options.files && options.multiple && !options.directories);
        None
    });
    cx.run_until_parked();
    cx.update(|cx| assert!(app.read(cx).current_attachments().is_empty()));
}
#[gpui_kit::test]
fn library_picker_attaches_selection_without_leaving_chat(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage);
    let active = cx.update(|cx| app.read(cx).active.clone());
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("app-btn", 200usize), cx);
        window.render_frame(cx);
        window.click(("app-btn", 611usize), cx);
        window.render_frame(cx);
        assert!(app.read(cx).dialog == Some(Dialog::ComposerLibrary));
        window.click(("composer-library-file", 0usize), cx);
        window.render_frame(cx);
        window.click(("app-btn", 770usize), cx);
        assert!(app.read(cx).dialog.is_none());
        assert!(app.read(cx).route == super::Route::Chat);
        assert_eq!(app.read(cx).active, active);
        assert_eq!(app.read(cx).current_attachments().len(), 1);
        assert_eq!(
            app.read(cx).current_attachments()[0].name,
            app.read(cx).workspace.documents[0].title
        );
    })
    .unwrap();
}

#[gpui_kit::test]
fn composer_popup_geometry_tracks_composer_and_model_contract(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        for sidebar in [true, false] {
            app.update(cx, |s, cx| {
                s.sidebar = sidebar;
                cx.notify();
            });
            window.render_frame(cx);
            window.click(("app-btn", 200usize), cx);
            window.render_frame(cx);
            let composer = app.read(cx).composer_bounds.get();
            let popup = window.find("composer-menu-focus").bounds();
            assert_eq!(popup.size.width, composer.size.width);
            assert!(
                (popup.origin.x - composer.origin.x).abs() <= px(0.5),
                "Pixel rounding must not detach the popup from the composer"
            );
            assert_eq!(
                popup.origin.y + popup.size.height,
                composer.origin.y - px(4.)
            );
            window.press("escape", cx);
            window.render_frame(cx);
            window.click(("app-btn", 201usize), cx);
            window.render_frame(cx);
            let popup = window.find("composer-menu-focus").bounds();
            assert_eq!(popup.size.width, px(254.));
            assert_eq!(
                popup.origin.y + popup.size.height,
                composer.origin.y - px(8.)
            );
            window.press("escape", cx);
            window.render_frame(cx);
        }
    })
    .unwrap();
}

#[gpui_kit::test]
fn library_picker_layout_search_and_clear_preserve_dialog(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        app.update(cx, |s, cx| {
            s.act(super::Action::ComposerLibrary, window, cx)
        });
        window.render_frame(cx);
        assert!(window.try_find("composer-library-footer").is_none());
        let row = window.find(("composer-library-file", 0usize)).bounds();
        assert_eq!(row.size.height, px(50.));
        window.click(("composer-library-file", 0usize), cx);
        window.render_frame(cx);
        assert!(window.try_find("composer-library-footer").is_some());
        window.click("composer-library-layout", cx);
        window.render_frame(cx);
        let card = window.find(("composer-library-file", 0usize)).bounds();
        assert_eq!(card.size.width, card.size.height);
        assert!((f32::from(card.size.width) - (640. - 24.) / 3.).abs() < 1.);
        assert_eq!(app.read(cx).composer_library_selection.len(), 1);
        let search = app.read(cx).composer_library_query.clone();
        search.update(cx, |s, cx| s.set_value("not a matching file", window, cx));
        window.render_frame(cx);
        assert!(window.try_find(("composer-library-file", 0usize)).is_none());
        assert!(window.try_find("composer-library-footer").is_some());
        window.click("composer-library-clear", cx);
        window.render_frame(cx);
        assert!(app.read(cx).dialog == Some(Dialog::ComposerLibrary));
        assert!(app.read(cx).composer_library_selection.is_empty());
        assert!(window.try_find("composer-library-footer").is_none());
        assert_eq!(search.read(cx).value().as_str(), "not a matching file");
    })
    .unwrap();
}

fn finish_share_demo(cx: &mut TestAppContext) {
    cx.run_until_parked();
    cx.background_executor
        .advance_clock(Duration::from_millis(350));
    cx.run_until_parked();
}
#[gpui_kit::test]
fn share_cancel_busy_commit_update_and_private_draft(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    let id = cx.update(|cx| app.read(cx).active.clone());
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        cx.write_to_clipboard(gpui_kit::ClipboardItem::new_string("unchanged".into()));
        app.update(cx, |s, cx| s.act(super::Action::Share, window, cx));
        window.render_frame(cx);
        assert_eq!(window.find("share-dialog").bounds().size.width, px(520.));
        assert_eq!(
            cx.read_from_clipboard().and_then(|i| i.text()),
            Some("unchanged".to_owned())
        );
        window.press("escape", cx);
        assert!(app.read(cx).dialog.is_none());
        app.update(cx, |s, cx| s.act(super::Action::Share, window, cx));
        window.render_frame(cx);
        window.click("share-submit", cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).share_phase, super::SharePhase::Creating);
        assert!(window.try_find(("app-btn", 780usize)).is_none());
        window.press("escape", cx);
        assert!(app.read(cx).dialog == Some(Dialog::Share));
        assert!(app.read(cx).share_snapshots.is_empty());
    })
    .unwrap();
    finish_share_demo(cx);
    cx.update_window(handle, |_, window, cx| {
        assert!(app.read(cx).dialog.is_none());
        assert_eq!(
            cx.read_from_clipboard().and_then(|i| i.text()),
            Some(format!("https://chatgpt-demo.invalid/share/{id}"))
        );
        app.update(cx, |s, cx| {
            s.workspace
                .conversations
                .iter_mut()
                .find(|c| c.id == id)
                .unwrap()
                .draft = "private later draft".into();
            s.act(super::Action::Share, window, cx);
        });
        assert_eq!(app.read(cx).share_action_label(), "Copy link");
        assert!(app
            .read(cx)
            .share_preview
            .as_ref()
            .unwrap()
            .draft
            .is_empty());
        app.update(cx, |s, cx| {
            s.act(super::Action::Close, window, cx);
            s.workspace
                .append_message(&id, native_core::MessageRole::User, "A later message")
                .unwrap();
            s.act(super::Action::Share, window, cx);
        });
        assert_eq!(app.read(cx).share_action_label(), "Update link");
        window.render_frame(cx);
        window.click("share-submit", cx);
    })
    .unwrap();
    finish_share_demo(cx);
    cx.update(|cx| {
        let snapshot = app.read(cx).share_snapshots.get(&id).unwrap();
        assert_eq!(snapshot.messages.last().unwrap().content, "A later message");
        assert!(snapshot.draft.is_empty());
        assert_eq!(
            app.read(cx).workspace.conversation(&id).unwrap().draft,
            "private later draft"
        );
    });
}
#[gpui_kit::test]
fn share_failures_retry_and_readonly_recovery(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    for outcome in [
        super::ShareDemoOutcome::CreateFailed,
        super::ShareDemoOutcome::CopyFailed,
        super::ShareDemoOutcome::Blocked,
    ] {
        cx.update_window(handle, |_, window, cx| {
            app.update(cx, |s, cx| {
                s.share_demo_outcome = outcome;
                s.act(super::Action::Share, window, cx);
            });
            window.render_frame(cx);
            window.click("share-submit", cx);
        })
        .unwrap();
        finish_share_demo(cx);
        cx.update_window(handle, |_, window, cx| {
            window.render_frame(cx);
            assert!(app.read(cx).dialog == Some(Dialog::Share));
            if outcome == super::ShareDemoOutcome::Blocked {
                assert!(window.try_find("share-blocked").is_some());
                assert!(window.try_find("share-preview").is_none());
                assert_eq!(app.read(cx).share_action_label(), "Close");
            } else {
                assert!(window.try_find("share-error").is_some());
                if outcome == super::ShareDemoOutcome::CopyFailed {
                    let input = app.read(cx).share_recovery_url.clone();
                    let before = input.read(cx).value();
                    window.click(("input", input.entity_id()), cx);
                    window.input("must not modify", cx);
                    assert_eq!(input.read(cx).value(), before);
                    assert!(before.starts_with("https://chatgpt-demo.invalid/share/"));
                }
            }
            window.click("share-submit", cx);
        })
        .unwrap();
        finish_share_demo(cx);
        cx.update(|cx| assert!(app.read(cx).dialog.is_none()));
    }
}

#[gpui_kit::test]
fn share_preview_blocks_links_and_abandoned_creation(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        app.update(cx, |s, cx| {
            let id = s.active.clone();
            let chat = s
                .workspace
                .conversations
                .iter_mut()
                .find(|c| c.id == id)
                .unwrap();
            chat.messages.truncate(1);
            chat.messages[0].role = native_core::MessageRole::Assistant;
            chat.messages[0].content = "[Preview link](https://example.invalid/preview)".into();
            s.act(super::Action::Share, window, cx);
        });
        window.render_frame(cx);
        window.click_at("share-preview", point(px(30.), px(28.)), cx);
        window.click("share-submit", cx);
        app.update(cx, |s, cx| s.act(super::Action::New, window, cx));
    })
    .unwrap();
    finish_share_demo(cx);
    assert!(cx.opened_url().is_none());
    cx.update(|cx| {
        assert!(app.read(cx).share_snapshots.is_empty());
        assert!(app.read(cx).dialog.is_none());
    });
}

#[gpui_kit::test]
fn conversation_markers_navigate_real_messages_and_keyboard_survives_hidden_rail(
    cx: &mut TestAppContext,
) {
    let storage = Storage::new();
    let mut settings = native_settings::Settings::default();
    settings.reduced_motion = true;
    settings.save(&storage.0.join("settings.json")).unwrap();
    let (handle, app) = open(cx, &storage);
    let ids = cx
        .update_window(handle, |_, window, cx| {
            let ids = app.update(cx, |s, cx| {
                let chat = s.workspace.create_conversation();
                let mut ids = Vec::new();
                for i in 0..3 {
                    ids.push(
                        s.workspace
                            .append_message(
                                &chat,
                                native_core::MessageRole::User,
                                &format!("Question {i}"),
                            )
                            .unwrap(),
                    );
                    s.workspace
                        .append_message(
                            &chat,
                            native_core::MessageRole::Assistant,
                            &"A long response paragraph.\n\n".repeat(40),
                        )
                        .unwrap();
                }
                s.switch_chat(chat, window, cx);
                s.transcript.set_offset(point(px(0.), px(0.)));
                ids
            });
            window.render_frame(cx);
            app.update(cx, |s, cx| {
                s.transcript.set_offset(point(px(0.), px(0.)));
                cx.notify();
            });
            window.render_frame(cx);
            assert!(window.try_find("conversation-navigation-rail").is_none());
            let composer = app.read(cx).composer.clone();
            window.click(("input", composer.entity_id()), cx);
            window.press("alt-down", cx);
            window.render_frame(cx);
            assert!(app.read(cx).transcript.offset().y < px(-100.));
            let offset = app.read(cx).transcript.offset();
            window.press("alt-shift-down", cx);
            window.render_frame(cx);
            assert_eq!(app.read(cx).transcript.offset(), offset);
            window.press("alt-up", cx);
            window.render_frame(cx);
            assert!(app.read(cx).transcript.offset().y > offset.y);
            let fourth = app.update(cx, |s, cx| {
                let chat = s.active.clone();
                let id = s
                    .workspace
                    .append_message(&chat, native_core::MessageRole::User, "Question four")
                    .unwrap();
                s.workspace
                    .append_message(
                        &chat,
                        native_core::MessageRole::Assistant,
                        &"Final answer.\n\n".repeat(40),
                    )
                    .unwrap();
                cx.notify();
                id
            });
            window.render_frame(cx);
            assert_eq!(
                window
                    .find("conversation-navigation-rail")
                    .bounds()
                    .size
                    .width,
                px(36.)
            );
            window.hover(
                gpui_kit::SharedString::from(format!("conversation-marker-{}", fourth)),
                cx,
            );
            window.render_frame(cx);
            assert_eq!(
                app.read(cx).navigation_hover.as_deref(),
                Some(fourth.as_str())
            );
            window.click(
                gpui_kit::SharedString::from(format!("conversation-marker-{}", fourth)),
                cx,
            );
            window.render_frame(cx);
            let s = app.read(cx);
            let target = s.transcript.bounds_for_item(6).unwrap().top() + s.transcript.offset().y;
            assert!((target - s.transcript.bounds().top()).abs() <= px(1.));
            ids
        })
        .unwrap();
    assert_eq!(ids.len(), 3);
    cx.simulate_window_resize(handle, size(px(1211.), px(1000.)));
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        assert!(window.try_find("conversation-navigation-rail").is_none());
    })
    .unwrap();
    cx.simulate_window_resize(handle, size(px(1212.), px(1000.)));
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        assert!(window.try_find("conversation-navigation-rail").is_some());
    })
    .unwrap();
}

#[gpui_kit::test]
fn conversation_preview_delay_focus_and_pointer_capture(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    let ids = cx
        .update_window(handle, |_, window, cx| {
            window.activate_window();
            let ids = app.update(cx, |s, cx| {
                let chat = s.workspace.create_conversation();
                let mut ids = Vec::new();
                for i in 0..5 {
                    ids.push(
                        s.workspace
                            .append_message(
                                &chat,
                                native_core::MessageRole::User,
                                &format!("Prompt {i}"),
                            )
                            .unwrap(),
                    );
                    s.workspace
                        .append_message(
                            &chat,
                            native_core::MessageRole::Assistant,
                            &"Response line.\n\n".repeat(30),
                        )
                        .unwrap();
                }
                s.switch_chat(chat, window, cx);
                ids
            });
            window.render_frame(cx);
            window.hover(
                gpui_kit::SharedString::from(format!("conversation-marker-{}", ids[0])),
                cx,
            );
            assert_eq!(
                app.read(cx).navigation_hover.as_deref(),
                Some(ids[0].as_str()),
                "initial hover"
            );
            assert!(window.try_find("conversation-navigation-preview").is_none());
            ids
        })
        .unwrap();
    cx.run_until_parked();
    cx.update_window(handle, |_, window, cx| {
        window.hover(
            gpui_kit::SharedString::from(format!("conversation-marker-{}", ids[0])),
            cx,
        );
    })
    .unwrap();
    cx.run_until_parked();
    cx.background_executor
        .advance_clock(Duration::from_millis(149));
    cx.run_until_parked();
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        assert!(window.try_find("conversation-navigation-preview").is_none());
    })
    .unwrap();
    cx.background_executor
        .advance_clock(Duration::from_millis(1));
    cx.run_until_parked();
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        assert!(
            app.read(cx).navigation_ui.preview.is_some(),
            "preview state absent; hover={:?}",
            app.read(cx).navigation_hover
        );
        let preview = window.find("conversation-navigation-preview").bounds();
        let marker = window
            .find(gpui_kit::SharedString::from(format!(
                "conversation-marker-{}",
                ids[0]
            )))
            .bounds();
        assert_eq!(preview.size.width, px(320.));
        assert_eq!(marker.size.height, px(10.));
        assert!((preview.center().y - marker.center().y).abs() <= px(1.));
        assert_eq!(preview.left(), marker.right());
        window.hover("application-titlebar", cx);
        window.render_frame(cx);
        assert!(window.try_find("conversation-navigation-preview").is_none());
        let from = window
            .find(gpui_kit::SharedString::from(format!(
                "conversation-marker-{}",
                ids[0]
            )))
            .bounds()
            .center();
        let to = window
            .find(gpui_kit::SharedString::from(format!(
                "conversation-marker-{}",
                ids[3]
            )))
            .bounds()
            .center();
        window.drag(from, to, cx);
        window.render_frame(cx);
        assert!(app.read(cx).navigation_ui.scrub.is_none());
        assert!(
            app.read(cx).navigation_motion.is_none(),
            "Scrub release must not start a follow-up smooth click"
        );
        let s = app.read(cx);
        let target = s.transcript.bounds_for_item(6).unwrap().top() + s.transcript.offset().y;
        assert!((target - s.transcript.bounds().top()).abs() <= px(1.));
        assert_eq!(s.navigation_ui.preview.as_deref(), Some(ids[3].as_str()));
        // Keyboard focus moves to the next native button and reveals immediately.
        window.press("tab", cx);
        window.render_frame(cx);
        assert!(window.try_find("conversation-navigation-preview").is_some());
        window.hover("application-titlebar", cx);
        app.update(cx, |s, cx| s.act(super::Action::New, window, cx));
        window.render_frame(cx);
        assert!(window.try_find("conversation-navigation-preview").is_none());
    })
    .unwrap();
    cx.background_executor
        .advance_clock(Duration::from_millis(200));
    cx.run_until_parked();
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        assert!(app.read(cx).navigation_ui.preview.is_none());
    })
    .unwrap();
}

#[gpui_kit::test]
fn conversation_title_uses_available_header_space_without_displacing_actions(cx: &mut TestAppContext) {
    let storage=Storage::new();
    let (handle,app)=open(cx,&storage);
    cx.update_window(handle,|_,_window,cx| {
        app.update(cx,|s,cx| {
            let id=s.active.clone();
            let chat=s.workspace.conversations.iter_mut().find(|c| c.id==id).unwrap();
            chat.title="A long conversation title that should use the available header space ".repeat(8);
            cx.notify();
        });
    }).unwrap();
    for width in [1440.,900.,600.] {
        cx.simulate_window_resize(handle,size(px(width),px(1000.)));
        cx.update_window(handle,|_,window,cx| {
            window.render_frame(cx);
            let header=window.find("conversation-toolbar").bounds();
            let title=window.find("conversation-title").bounds();
            let actions=window.find("conversation-header-actions").bounds();
            assert_eq!(header.size.height,px(52.));
            assert!(title.right()<=actions.left(),"Title overlaps actions at {width}");
            assert!(actions.right()<=header.right(),"Actions escape header at {width}");
            assert!(title.size.width>px(0.));
            if width==1440. { assert!(title.size.width>px(320.)); }
            window.click(("app-btn",708usize),cx);
            assert!(app.read(cx).dialog==Some(Dialog::ChatMenu));
            window.press("escape",cx);
        }).unwrap();
    }
}

