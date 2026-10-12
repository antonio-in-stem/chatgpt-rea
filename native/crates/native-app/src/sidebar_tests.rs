//! Pointer dispatch and durable sidebar layout; no implementation-only mock drag.
use super::{clamp_sidebar_width, WorkspaceApp};
use gpui_kit::test::TestWindowExt;
use gpui_kit::{
    point, px, size, AnyWindowHandle, AppContext, Bounds, Entity, TestAppContext, WindowBounds,
    WindowOptions,
};
use std::{
    path::PathBuf,
    sync::atomic::{AtomicU64, Ordering},
};
static SEQUENCE: AtomicU64 = AtomicU64::new(0);
struct Storage(PathBuf);
impl Storage {
    fn new() -> Self {
        Self(std::env::temp_dir().join(format!(
            "native-sidebar-ui-{}-{}",
            std::process::id(),
            SEQUENCE.fetch_add(1, Ordering::Relaxed)
        )))
    }
}
impl Drop for Storage {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.0);
    }
}
fn open(
    cx: &mut TestAppContext,
    storage: &Storage,
    width: f32,
) -> (AnyWindowHandle, Entity<WorkspaceApp>) {
    cx.update(|cx| {
        gpui_kit::init(cx);
        gpui_kit::open_window(
            WindowOptions {
                window_bounds: Some(WindowBounds::Windowed(Bounds {
                    origin: point(px(0.), px(0.)),
                    size: size(px(width), px(900.)),
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
fn sidebar_pointer_drag_clamps_and_reopens_at_saved_width(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (window, app) = open(cx, &storage, 1200.);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        assert_eq!(app.read(cx).workspace.settings.sidebar_width, 340);
        // Separator is the last6px inside the340px sidebar. End point leaves handle.
        let start = window.find("sidebar-resize-handle").bounds().center();
        window.drag(start, point(start.x + px(100.), start.y), cx);
        assert_eq!(app.read(cx).workspace.settings.sidebar_width, 440);
        assert!(app.read(cx).sidebar_resize.is_none());
    })
    .unwrap();
    assert_eq!(
        native_core::Workspace::load(storage.0.join("workspace.json"))
            .unwrap()
            .settings
            .sidebar_width,
        440
    );
    let (reopened, restored) = open(cx, &storage, 1200.);
    cx.update_window(reopened, |_, window, cx| {
        window.render_frame(cx);
        assert_eq!(restored.read(cx).workspace.settings.sidebar_width, 440);
        window.drag(point(px(437.), px(120.)), point(px(1100.), px(120.)), cx);
        assert_eq!(restored.read(cx).workspace.settings.sidebar_width, 520);
        window.drag(point(px(517.), px(120.)), point(px(30.), px(120.)), cx);
        assert_eq!(restored.read(cx).workspace.settings.sidebar_width, 290);
    })
    .unwrap();
}
#[gpui_kit::test]
fn sidebar_drag_reserves_content_and_preserves_corrupt_storage(cx: &mut TestAppContext) {
    let storage = Storage::new();
    std::fs::create_dir_all(&storage.0).unwrap();
    let path = storage.0.join("workspace.json");
    let original = b"corrupt workspace must stay intact";
    std::fs::write(&path, original).unwrap();
    let (window, app) = open(cx, &storage, 700.);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.drag(point(px(337.), px(120.)), point(px(660.), px(120.)), cx);
        assert_eq!(app.read(cx).workspace.settings.sidebar_width, 460);
        assert!(app.read(cx).load_error.is_some());
    })
    .unwrap();
    assert_eq!(std::fs::read(path).unwrap(), original);
}
#[test]
fn sidebar_legacy_settings_default_and_source_minimum() {
    let settings: native_core::Settings =
        serde_json::from_str(r#"{"dark_mode":true,"provider_url":"","model":""}"#).unwrap();
    assert_eq!(settings.sidebar_width, 340);
    assert_eq!(clamp_sidebar_width(px(520.), px(400.)), px(290.));
    assert_eq!(clamp_sidebar_width(px(520.), px(700.)), px(460.));
}

#[gpui_kit::test]
fn rail_persists_when_sidebar_collapses_and_project_groups_open_chats(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage, 1280.);
    cx.update_window(handle, |_, window, cx| {
        let chat = app.update(cx, |s, cx| {
            let project = s.workspace.projects[0].id.clone();
            let chat = s.workspace.create_conversation();
            s.workspace.append_message(&chat, native_core::MessageRole::User, "Grouped conversation").unwrap();
            s.workspace.assign_project(&chat, Some(&project)).unwrap();
            cx.notify();
            chat
        });
        window.render_frame(cx);
        let rail = window.find("navigation-rail").bounds();
        let sidebar = window.find("sidebar").bounds();
        assert_eq!(rail.size.width, px(48.));
        assert_eq!(sidebar.size.width + rail.size.width, px(340.));
        assert_eq!(window.find("application-titlebar").bounds().size.height, px(40.));
        window.click(("sidebar-project", 0usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).collapsed_sidebar_projects.len(), 1);
        window.click(("sidebar-project", 0usize), cx);
        window.render_frame(cx);
        assert!(app.read(cx).collapsed_sidebar_projects.is_empty());
        let index = app.read(cx).workspace.conversations.iter()
            .filter(|c| !c.archived && !c.messages.is_empty()).count() - 1;
        window.click(("nav", 100 + index), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).active, chat);
        window.click(("app-btn", 720usize), cx);
        window.render_frame(cx);
        assert!(window.try_find("sidebar").is_none());
        assert_eq!(window.find("navigation-rail").bounds().size.width, px(48.));
        window.click(("nav", 3usize), cx);
        window.render_frame(cx);
        assert!(matches!(app.read(cx).route, super::Route::Library));
        window.click(("app-btn", 720usize), cx);
        window.render_frame(cx);
        assert!(window.try_find("sidebar").is_some());
    }).unwrap();
}
