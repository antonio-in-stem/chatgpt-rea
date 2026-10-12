//! Projects and Library tests dispatch real GPUI events against isolated storage.
use super::{Action, Route, WorkspaceApp};
use gpui_kit::test::TestWindowExt;
use gpui_kit::{
    point, px, size, AnyWindowHandle, AppContext, Bounds, Entity, TestAppContext, WindowBounds,
    WindowOptions,
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
        window.click("library-filter-trigger", cx);
        window.render_frame(cx);
        window.click(("library-filter", 3usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).library_categories, 1 << 3);
        assert!(window.try_find(("library-file", 1001usize)).is_some());
        assert!(window.try_find(("library-file", 1003usize)).is_none());
        window.press("escape", cx);
        window.render_frame(cx);
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
        let id = app.read(cx).workspace.projects[index].id.clone();
        assert!(app.read(cx).expanded_projects.contains(&id));
        window.click(("project-open", index), cx);
        window.render_frame(cx);
        assert!(!app.read(cx).expanded_projects.contains(&id));
        window.click(("project-open", index), cx);
        window.render_frame(cx);
        assert!(app.read(cx).expanded_projects.contains(&id));
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

#[gpui_kit::test]
fn library_popover_multiselect_tags_and_browse_reset(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        app.update(cx, |s, cx| s.act(Action::Route(Route::Library), window, cx));
        window.render_frame(cx);
        window.click("library-filter-trigger", cx);
        window.render_frame(cx);
        window.click(("library-filter", 3usize), cx);
        window.render_frame(cx);
        window.click(("library-filter", 5usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).library_categories, (1 << 3) | (1 << 5));
        window.press("escape", cx);
        window.render_frame(cx);
        assert!(window.try_find(("library-file", 1001usize)).is_some());
        assert!(window.try_find(("library-file", 1007usize)).is_some());
        assert!(window.try_find(("library-file", 1003usize)).is_none());
        window.click(("library-clear-filter", 3usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).library_categories, 1 << 5);
        assert!(window.try_find(("library-file", 1001usize)).is_none());
        window.click(("library-tab", 1usize), cx);
        window.render_frame(cx);
        assert!(app.read(cx).library_images_only);
        assert_eq!(app.read(cx).library_categories, 0);
        assert!(window.try_find(("library-file", 1003usize)).is_some());
        assert!(window.try_find(("library-file", 1007usize)).is_none());
        let search = app.read(cx).library_search.clone();
        window.click(("input", search.entity_id()), cx);
        window.input("missing file", cx);
        window.render_frame(cx);
        window.click(("library-tab", 0usize), cx);
        window.render_frame(cx);
        assert!(!app.read(cx).library_images_only);
        assert!(search.read(cx).value().is_empty());
        assert!(window.try_find(("library-file", 1007usize)).is_some());
    })
    .unwrap();
}
#[gpui_kit::test]
fn library_grid_reflows_at_source_container_breakpoint(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        app.update(cx, |s, cx| s.act(Action::Route(Route::Library), window, cx));
        window.render_frame(cx);
        let first = window.find(("library-file", 0usize)).bounds();
        let fifth = window.find(("library-file", 1003usize)).bounds();
        let sixth = window.find(("library-file", 1004usize)).bounds();
        assert_eq!(
            first.origin.y, fifth.origin.y,
            "1060px content must use five columns"
        );
        assert!(sixth.origin.y > first.origin.y);
        app.update(cx, |s, cx| {
            s.sidebar = false;
            cx.notify();
        });
        window.render_frame(cx);
        let first = window.find(("library-file", 0usize)).bounds();
        let sixth = window.find(("library-file", 1004usize)).bounds();
        assert_eq!(
            first.origin.y, sixth.origin.y,
            "1400px content must use six columns"
        );
    })
    .unwrap();
}
#[test]
fn library_css_container_thresholds_match_extracted_tokens() {
    for (width, expected) in [
        (383., 1),
        (384., 2),
        (575., 2),
        (576., 3),
        (767., 3),
        (768., 4),
        (1023., 4),
        (1024., 5),
        (1279., 5),
        (1280., 6),
    ] {
        assert_eq!(WorkspaceApp::library_columns(width), expected);
    }
}

#[gpui_kit::test]
fn projects_expand_independently_and_search_restores_manual_state(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        app.update(cx, |app, cx| {
            let first = app.workspace.projects[0].id.clone();
            for name in ["Needle conversation", "Unrelated conversation"] {
                let chat = app.workspace.create_conversation();
                app.workspace.rename_conversation(&chat, name).unwrap();
                app.workspace.assign_project(&chat, Some(&first)).unwrap();
            }
            app.workspace.create_project("Second project").unwrap();
            app.workspace.create_project("NameOnly project").unwrap();
            app.act(Action::Route(Route::Projects), window, cx);
        });
        window.render_frame(cx);
        window.click(("project-open", 0usize), cx);
        window.render_frame(cx);
        window.click(("project-open", 1usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).expanded_projects.len(), 2);
        window.click(("project-open", 0usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).expanded_projects.len(), 1);
        let search = app.read(cx).project_search.clone();
        window.click(("input", search.entity_id()), cx);
        window.input("Needle", cx);
        window.render_frame(cx);
        assert!(window.try_find(("project-child", 1usize)).is_some());
        assert!(window.try_find(("project-child", 0usize)).is_none());
        assert!(window.try_find(("project-child", 2usize)).is_none());
        // Forced search expansion does not modify the manual expansion set.
        window.click(("project-open", 0usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).expanded_projects.len(), 1);
        window.click(("input", search.entity_id()), cx);
        window.press("ctrl-a", cx);
        window.input("NameOnly", cx);
        window.render_frame(cx);
        assert!(window.try_find(("project-open", 2usize)).is_some());
        assert!(window.try_find(("project-remove", 2usize)).is_none());
        window.press("ctrl-a", cx);
        window.press("backspace", cx);
        window.render_frame(cx);
        assert!(window.try_find(("project-remove", 1usize)).is_some());
        assert!(window.try_find(("project-remove", 0usize)).is_none());
        window.click(("project-open", 0usize), cx);
        window.render_frame(cx);
        window.click(("project-remove", 0usize), cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).workspace.projects.len(), 2);
        assert_eq!(app.read(cx).workspace.projects[0].name, "Second project");
        assert_eq!(app.read(cx).expanded_projects.len(), 1);
    }).unwrap();
}

#[gpui_kit::test]
fn project_headers_sort_rows_and_preserve_expansion(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, app) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        app.update(cx, |app, cx| {
            app.workspace.create_project("Alpha").unwrap();
            app.workspace.create_project("Zulu").unwrap();
            for project in &mut app.workspace.projects { project.modified_at_ms = None; }
            app.act(Action::Route(Route::Projects), window, cx);
        });
        window.render_frame(cx);
        let alpha_y = window.find(("project-open", 1usize)).bounds().origin.y;
        let zulu_y = window.find(("project-open", 2usize)).bounds().origin.y;
        assert!(zulu_y < alpha_y, "Missing dates tie-break by descending name");
        window.click(("project-open", 1usize), cx);
        window.render_frame(cx);
        window.click("project-sort-name", cx);
        window.render_frame(cx);
        assert!(window.find(("project-open", 1usize)).bounds().origin.y < window.find(("project-open", 2usize)).bounds().origin.y);
        assert!(window.try_find(("project-remove", 1usize)).is_some());
        window.click("project-sort-name", cx);
        window.render_frame(cx);
        assert!(window.find(("project-open", 2usize)).bounds().origin.y < window.find(("project-open", 1usize)).bounds().origin.y);
        window.click("project-sort-modified", cx);
        window.render_frame(cx);
        assert!(app.read(cx).project_sort.descending);
        window.click("project-sort-modified", cx);
        window.render_frame(cx);
        assert!(!app.read(cx).project_sort.descending);
        assert!(window.find(("project-open", 1usize)).bounds().origin.y < window.find(("project-open", 2usize)).bounds().origin.y);
    }).unwrap();
}
