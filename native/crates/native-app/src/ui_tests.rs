//! Real GPUI event tests. Every fixture owns an isolated temporary storage directory.
use super::{Dialog, WorkspaceApp};
use gpui_kit::test::TestWindowExt;
use gpui_kit::{
    AnyWindowHandle, AppContext, Bounds, Entity, TestAppContext, WindowBounds, WindowOptions,
    point, px, size,
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
        assert!(
            messages[messages.len() - 2]
                .content
                .contains("First line\nSecond line")
        );
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
        window.click(("app-btn", 802usize), cx);
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
        window.click(("nav", 901usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).recent_limit, 60);
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
        window.click(("app-btn", 612usize), cx);
    })
    .unwrap();
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
        assert!(
            app.workspace
                .conversation(&app.active)
                .unwrap()
                .messages
                .last()
                .unwrap()
                .content
                .contains("No animation please")
        );
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
