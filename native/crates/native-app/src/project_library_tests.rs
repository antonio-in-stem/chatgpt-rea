//! Projects and Library tests dispatch real GPUI events against isolated storage.
use super::{Action, Route, WorkspaceApp};
use gpui_kit::test::TestWindowExt;
use gpui_kit::{
    AnyWindowHandle, AppContext, Bounds, Entity, TestAppContext, WindowBounds, WindowOptions,
    point, px, size,
};
static TEMP_SEQUENCE: std::sync::atomic::AtomicU64 = std::sync::atomic::AtomicU64::new(0);
struct Storage(std::path::PathBuf);
impl Storage {
    fn new() -> Self {
        Self(std::env::temp_dir().join(format!(
                "native-library-test-{}-{}-{}",
                std::process::id(),
                std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)
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
fn library_filters_list_search_and_open_retained_spreadsheet(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        app.update(cx, |s, cx| s.act(Action::Route(Route::Library), window, cx));
        window.render_frame(cx);
        window.click(("library-filter", 3usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).library_category, 3);
        assert!(window.try_find(("library-file", 1001usize)).is_some());
        assert!(window.try_find(("library-file", 1003usize)).is_none());
        window.click("library-view-toggle", cx);
        window.render_frame(cx);
        assert!(!app.read(cx).library_grid);
        let search = app.read(cx).library_search.clone();
        window.click(("input", search.entity_id()), cx);
        window.input("Team budget", cx);
        window.render_frame(cx);
        assert!(window.try_find(("library-file", 1010usize)).is_none());
        window.click(("library-file", 1001usize), cx);
        window.render_frame(cx);
        assert!(matches!(app.read(cx).route, Route::Rich(1)));
    })
    .unwrap();
}
#[gpui_kit::test]
fn projects_create_then_collapse_and_expand_saved_row(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        app.update(cx, |s, cx| {
            s.act(Action::Route(Route::Projects), window, cx)
        });
        window.render_frame(cx);
        assert!(!app.read(cx).project_editing);
        window.click(("app-btn", 300usize), cx);
        window.render_frame(cx);
        assert!(app.read(cx).project_editing);
        let name = app.read(cx).project_name.clone();
        window.click(("input", name.entity_id()), cx);
        window.input("Native component research", cx);
        window.click(("app-btn", 301usize), cx);
        window.render_frame(cx);
        assert!(!app.read(cx).project_editing);
        let index = app
            .read(cx)
            .workspace
            .projects
            .iter()
            .position(|p| p.name == "Native component research")
            .unwrap();
        assert!(app.read(cx).project.is_some());
        window.click(("project-open", index), cx);
        window.render_frame(cx);
        assert!(app.read(cx).project.is_none());
        window.click(("project-open", index), cx);
        window.render_frame(cx);
        assert!(app.read(cx).project.is_some());
    })
    .unwrap();
}

#[gpui_kit::test]
fn project_modal_escape_cancel_and_focus_restore_do_not_save(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        app.update(cx, |s, cx| {
            s.act(Action::Route(Route::Projects), window, cx)
        });
        window.render_frame(cx);
        let initial_count = app.read(cx).workspace.projects.len();
        window.click(("app-btn", 300usize), cx);
        window.render_frame(cx);
        assert!(app.read(cx).dialog == Some(super::Dialog::ProjectEditor));
        let input = app.read(cx).project_name.clone();
        assert_eq!(
            window.find(("input", input.entity_id())).focused(),
            Some(true)
        );
        let previous = app
            .read(cx)
            .previous_focus
            .clone()
            .expect("opening modal retains prior focus");
        window.input("Discard on escape", cx);
        window.press("escape", cx);
        window.render_frame(cx);
        assert!(!app.read(cx).project_editing);
        assert!(app.read(cx).dialog.is_none());
        assert!(previous.is_focused(window));
        assert_eq!(app.read(cx).workspace.projects.len(), initial_count);
        window.click(("app-btn", 300usize), cx);
        window.render_frame(cx);
        window.input("Discard on cancel", cx);
        window.click("project-editor-cancel", cx);
        window.render_frame(cx);
        assert!(app.read(cx).dialog.is_none());
        assert_eq!(app.read(cx).workspace.projects.len(), initial_count);
    })
    .unwrap();
}
