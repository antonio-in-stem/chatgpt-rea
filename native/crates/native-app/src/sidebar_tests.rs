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

#[gpui_kit::test]
fn sidebar_project_pages_are_independent_of_recents_and_each_other(cx: &mut TestAppContext) {
    let storage=Storage::new();
    let (handle,app)=open(cx,&storage,1280.);
    cx.simulate_window_resize(handle,size(px(1280.),px(1600.)));
    cx.update_window(handle,|_,window,cx| {
        let projects=app.update(cx,|s,cx| {
            s.workspace.conversations.clear();
            s.workspace.projects.clear();
            for i in 0..30 {
                let id=s.workspace.create_conversation();
                s.workspace.append_message(&id,native_core::MessageRole::User,&format!("Ungrouped {i}")).unwrap();
            }
            let mut projects=Vec::new();
            for name in ["First","Second"] {
                let project=s.workspace.create_project(name).unwrap();
                for i in 0..7 {
                    let id=s.workspace.create_conversation();
                    s.workspace.append_message(&id,native_core::MessageRole::User,&format!("{name} {i}")).unwrap();
                    s.workspace.assign_project(&id,Some(&project)).unwrap();
                }
                projects.push(project);
            }
            cx.notify();
            projects
        });
        window.render_frame(cx);
        // Global rows30+ must still render in their project, beyond the global page.
        assert!(window.try_find(("nav",130usize)).is_some());
        assert!(window.try_find(("nav",134usize)).is_some());
        assert!(window.try_find(("nav",135usize)).is_none());
        assert!(window.try_find(("nav",137usize)).is_some());
        assert!(window.try_find(("nav",142usize)).is_none());
        window.click(("sidebar-project-more",0usize),cx);
        window.render_frame(cx);
        assert!(window.try_find(("nav",136usize)).is_some());
        assert!(window.try_find(("nav",142usize)).is_none());
        assert_eq!(app.read(cx).recent_limit,10);
        assert_eq!(app.read(cx).sidebar_project_limits.get(&projects[0]),Some(&15));
        assert!(app.read(cx).sidebar_project_limits.get(&projects[1]).is_none());
        window.click(("sidebar-project",0usize),cx);
        window.click(("sidebar-project",0usize),cx);
        window.render_frame(cx);
        assert!(window.try_find(("nav",136usize)).is_some());
        window.click(("nav",136usize),cx);
        assert_eq!(app.read(cx).active,app.read(cx).workspace.conversations[36].id);
        window.click(("nav",901usize),cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).recent_limit,20);
        assert!(window.try_find(("nav",119usize)).is_some());
        assert!(window.try_find(("nav",142usize)).is_none());
    }).unwrap();
}

#[test]
fn sidebar_page_selection_keeps_active_and_absorbs_single_tail_in_source_order() {
    use super::sidebar_visible_indices as select;
    assert_eq!(select(0,5,None),Vec::<usize>::new());
    assert_eq!(select(6,5,None),vec![0,1,2,3,4,5]);
    assert_eq!(select(7,5,None),vec![0,1,2,3,4]);
    assert_eq!(select(7,5,Some(6)),vec![0,1,2,3,4,5,6]);
    assert_eq!(select(8,5,Some(7)),vec![0,1,2,3,4,7]);
    assert_eq!(select(8,5,Some(2)),vec![0,1,2,3,4]);
    assert_eq!(select(8,5,Some(9)),vec![0,1,2,3,4]);
}
#[gpui_kit::test]
fn sidebar_reveals_active_chat_without_expanding_every_group(cx: &mut TestAppContext) {
    let storage=Storage::new();
    let (handle,app)=open(cx,&storage,1280.);
    cx.update_window(handle,|_,window,cx| {
        let ids=app.update(cx,|s,cx| {
            s.workspace.conversations.clear();
            let project=s.workspace.projects[0].id.clone();
            let mut ids=Vec::new();
            for i in 0..8 {
                let id=s.workspace.create_conversation();
                s.workspace.append_message(&id,native_core::MessageRole::User,&format!("Project chat {i}")).unwrap();
                s.workspace.assign_project(&id,Some(&project)).unwrap();
                ids.push(id);
            }
            s.switch_chat(ids[7].clone(),window,cx);
            cx.notify();
            ids
        });
        window.render_frame(cx);
        assert!(window.try_find(("nav",107usize)).is_some());
        assert!(window.try_find(("nav",105usize)).is_none());
        assert!(window.try_find(("sidebar-project-more",0usize)).is_some());
        window.click(("nav",100usize),cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).active,ids[0]);
        assert!(window.try_find(("nav",107usize)).is_none());
        assert!(app.read(cx).sidebar_project_limits.is_empty());
        // Seven rows plus an active row outside the first five leave only one
        // hidden row: render all seven in original order and omit Show more.
        app.update(cx,|s,cx| {
            s.workspace.conversations.remove(5);
            s.switch_chat(ids[7].clone(),window,cx);
            cx.notify();
        });
        window.render_frame(cx);
        assert!(window.try_find(("nav",105usize)).is_some());
        assert!(window.try_find(("nav",106usize)).is_some());
        assert!(window.try_find(("sidebar-project-more",0usize)).is_none());
    }).unwrap();
}

#[gpui_kit::test]
fn sidebar_section_toggle_hides_only_its_content(cx: &mut TestAppContext) {
    let storage=Storage::new();
    let (handle,app)=open(cx,&storage,1280.);
    cx.update_window(handle,|_,window,cx| {
        window.render_frame(cx);
        let active=app.read(cx).active.clone();
        let count=app.read(cx).workspace.conversations.len();
        assert!(window.try_find(("sidebar-project",0usize)).is_some());
        window.click("sidebar-section-Projects",cx);
        window.render_frame(cx);
        assert!(window.try_find(("sidebar-project",0usize)).is_none());
        assert!(window.try_find("sidebar-section-Pinned").is_some());
        assert_eq!(app.read(cx).active,active);
        assert_eq!(app.read(cx).workspace.conversations.len(),count);
        let saved=native_core::Workspace::load(storage.0.join("workspace.json")).unwrap();
        assert!(saved.settings.collapsed_sidebar_sections.contains("threads"));
        assert_eq!(saved.conversations.len(),count);
        window.click("sidebar-section-Projects",cx);
        window.render_frame(cx);
        assert!(window.try_find(("sidebar-project",0usize)).is_some());
        let saved=native_core::Workspace::load(storage.0.join("workspace.json")).unwrap();
        assert!(!saved.settings.collapsed_sidebar_sections.contains("threads"));
    }).unwrap();
}

#[gpui_kit::test]
fn saved_section_collapse_is_applied_on_open(cx: &mut TestAppContext) {
    let storage=Storage::new();
    let mut workspace=crate::fixtures::workspace();
    workspace.settings.collapsed_sidebar_sections.insert("threads".into());
    workspace.save(storage.0.join("workspace.json")).unwrap();
    let (handle,_app)=open(cx,&storage,1280.);
    cx.update_window(handle,|_,window,cx| {
        window.render_frame(cx);
        assert!(window.try_find("sidebar-section-Projects").is_some());
        assert!(window.try_find(("sidebar-project",0usize)).is_none());
        window.click("sidebar-section-Projects",cx);
        window.render_frame(cx);
        assert!(window.try_find(("sidebar-project",0usize)).is_some());
        window.press("enter",cx);
        window.render_frame(cx);
        assert!(window.try_find(("sidebar-project",0usize)).is_none());
        window.press("space",cx);
        window.render_frame(cx);
        assert!(window.try_find(("sidebar-project",0usize)).is_some());
    }).unwrap();
}

#[gpui_kit::test]
fn sidebar_context_menu_targets_unopened_chat(cx: &mut TestAppContext) {
    let storage=Storage::new();
    let (handle,app)=open(cx,&storage,1280.);
    cx.update_window(handle,|_,window,cx| {
        let (active,target)=app.update(cx,|s,cx| {
            s.workspace.conversations.clear();
            let active=s.workspace.create_conversation();
            s.workspace.append_message(&active,native_core::MessageRole::User,"Active chat").unwrap();
            s.workspace.conversation_mut(&active).unwrap().pinned=true;
            let target=s.workspace.create_conversation();
            s.workspace.append_message(&target,native_core::MessageRole::User,"Other chat").unwrap();
            s.switch_chat(active.clone(),window,cx);
            cx.notify();
            (active,target)
        });
        window.render_frame(cx);
        window.right_click(("sidebar-row-content",101usize),cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).active,active);
        assert_eq!(app.read(cx).chat_action_target.as_deref(),Some(target.as_str()));
        window.press("down",cx);
        window.press("enter",cx);
        window.render_frame(cx);
        assert!(app.read(cx).workspace.conversation(&target).unwrap().pinned);
        assert_eq!(app.read(cx).active,active);
        window.right_click(("sidebar-row-content",101usize),cx);
        window.render_frame(cx);
        app.update(cx,|s,cx| s.act(super::Action::ConfirmDelete,window,cx));
        window.render_frame(cx);
        assert!(app.read(cx).workspace.conversation(&target).is_err());
        assert!(app.read(cx).workspace.conversation(&active).is_ok());
        assert_eq!(app.read(cx).active,active);
    }).unwrap();
}
