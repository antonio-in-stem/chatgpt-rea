//! Pointer dispatch and durable sidebar layout; no implementation-only mock drag.
use super::{WorkspaceApp, clamp_sidebar_width};
use gpui_kit::test::TestWindowExt;
use gpui_kit::{
    AnyWindowHandle, AppContext, Bounds, Entity, TestAppContext, WindowBounds, WindowOptions,
    point, px, size,
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
        assert_eq!(restored.read(cx).workspace.settings.sidebar_width, 240);
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
    assert_eq!(clamp_sidebar_width(px(520.), px(400.)), px(240.));
    assert_eq!(clamp_sidebar_width(px(520.), px(700.)), px(460.));
}
