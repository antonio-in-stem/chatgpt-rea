use super::{Action, Dialog, Route, WorkspaceApp};
use gpui_kit::test::TestWindowExt;
use gpui_kit::{point, px, size, AppContext, Bounds, TestAppContext, WindowBounds, WindowOptions};
use std::sync::atomic::{AtomicU64, Ordering};
static SEQUENCE: AtomicU64 = AtomicU64::new(0);
fn fixture(
    cx: &mut TestAppContext,
) -> (
    gpui_kit::AnyWindowHandle,
    gpui_kit::Entity<WorkspaceApp>,
    std::path::PathBuf,
) {
    let path = std::env::temp_dir().join(format!(
        "native-shell-menu-{}-{}",
        std::process::id(),
        SEQUENCE.fetch_add(1, Ordering::Relaxed)
    ));
    let (window, app) = cx.update(|cx| {
        gpui_kit::init(cx);
        gpui_kit::open_window(
            WindowOptions {
                window_bounds: Some(WindowBounds::Windowed(Bounds {
                    origin: point(px(0.), px(0.)),
                    size: size(px(1200.), px(900.)),
                })),
                ..Default::default()
            },
            cx,
            |window, cx| cx.new(|cx| WorkspaceApp::with_storage(path.clone(), window, cx)),
        )
        .unwrap()
    });
    (window, app, path)
}
#[gpui_kit::test]
fn brand_menu_preserves_chat_and_dismisses_by_escape(cx: &mut TestAppContext) {
    let (window, app, path) = fixture(cx);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        let active = app.read(cx).active.clone();
        let count = app.read(cx).workspace.conversations.len();
        window.click("brand-menu", cx);
        assert!(app.read(cx).dialog == Some(Dialog::BrandMenu));
        window.click("brand-chatgpt", cx);
        assert!(app.read(cx).dialog.is_none());
        assert_eq!(app.read(cx).active, active);
        assert_eq!(app.read(cx).workspace.conversations.len(), count);
        window.click("brand-menu", cx);
        window.press("escape", cx);
        assert!(app.read(cx).dialog.is_none());
    })
    .unwrap();
    let _ = std::fs::remove_dir_all(path);
}
#[gpui_kit::test]
fn profile_help_opens_existing_keyboard_settings(cx: &mut TestAppContext) {
    let (window, app, path) = fixture(cx);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click("profile-menu", cx);
        assert!(app.read(cx).dialog == Some(Dialog::AccountMenu));
        window.click(("app-btn", 712usize), cx);
        assert!(app.read(cx).dialog == Some(Dialog::HelpMenu));
        window.click(("app-btn", 713usize), cx);
        assert!(app.read(cx).route == Route::Settings);
        assert!(app.read(cx).dialog.is_none());
        window.render_frame(cx);
        assert_eq!(
            window.within("settings-sections").find(6usize).checked(),
            Some(true)
        );
    })
    .unwrap();
    let _ = std::fs::remove_dir_all(path);
}
#[gpui_kit::test]
fn scheduled_destination_routes_to_automation_surface(cx: &mut TestAppContext) {
    let (window, app, path) = fixture(cx);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click(("nav", 5usize), cx);
        assert!(app.read(cx).route == Route::Tool(0));
        window.click("profile-menu", cx);
        window.click(("app-btn", 4usize), cx);
        assert!(app.read(cx).route == Route::Settings);
        app.update(cx, |app, cx| app.act(Action::Close, window, cx));
    })
    .unwrap();
    let _ = std::fs::remove_dir_all(path);
}

#[gpui_kit::test]
fn profile_menu_arrow_navigation_submenu_and_escape_restore_focus(cx: &mut TestAppContext) {
    let (window, app, path) = fixture(cx);
    cx.update_window(window, |_, window, cx| {
        window.render_frame(cx);
        window.click("profile-menu", cx);
        window.press("end", cx);
        assert_eq!(
            window.find(("shell-menu-focus", 1usize)).focused(),
            Some(true)
        );
        window.press("up", cx);
        assert_eq!(
            window.find(("shell-menu-focus", 0usize)).focused(),
            Some(true)
        );
        window.press("down", cx);
        window.press("right", cx);
        assert!(app.read(cx).dialog == Some(Dialog::HelpMenu));
        assert_eq!(
            window.find(("shell-menu-focus", 2usize)).focused(),
            Some(true)
        );
        window.press("left", cx);
        assert!(app.read(cx).dialog == Some(Dialog::AccountMenu));
        window.press("home", cx);
        assert_eq!(
            window.find(("shell-menu-focus", 0usize)).focused(),
            Some(true)
        );
        window.press("escape", cx);
        assert!(app.read(cx).dialog.is_none());
        assert_eq!(window.find("profile-menu").focused(), Some(true));
    })
    .unwrap();
    let _ = std::fs::remove_dir_all(path);
}

#[gpui_kit::test]
fn codex_surface_switch_preserves_draft_and_moves_model_to_trailing_controls(cx: &mut TestAppContext) {
    let (handle,app,path)=fixture(cx);
    cx.update_window(handle,|_,window,cx| {
        window.render_frame(cx);
        let composer=app.read(cx).composer.clone();
        let active=app.read(cx).active.clone();
        window.click(("input",composer.entity_id()),cx);
        window.input("Keep this draft",cx);
        window.click("brand-menu",cx);
        window.press("down",cx);
        window.press("enter",cx);
        window.render_frame(cx);
        assert!(app.read(cx).workspace.settings.codex_surface);
        assert_eq!(composer.read(cx).value().to_string(),"Keep this draft");
        assert_eq!(composer.read(cx).presentation().placeholder().to_string(),"Work with Codex");
        assert_eq!(app.read(cx).active,active);
        let model=window.find(("app-btn",201usize)).bounds();
        let trailing=window.find("composer-trailing-controls").bounds();
        assert!(model.left()>=trailing.left() && model.right()<=trailing.right());
        let saved=native_core::Workspace::load(path.join("workspace.json")).unwrap();
        assert!(saved.settings.codex_surface);
        assert_eq!(saved.conversation(&active).unwrap().draft,"Keep this draft");
        window.click("brand-menu",cx);
        window.click("brand-chatgpt",cx);
        window.render_frame(cx);
        assert!(!app.read(cx).workspace.settings.codex_surface);
        assert_eq!(composer.read(cx).value().to_string(),"Keep this draft");
        assert_eq!(composer.read(cx).presentation().placeholder().to_string(),"Ask ChatGPT");
        let model=window.find(("app-btn",201usize)).bounds();
        let leading=window.find("composer-leading-controls").bounds();
        assert!(model.left()>=leading.left() && model.right()<=leading.right());
    }).unwrap();
    let _=std::fs::remove_dir_all(path);
}

#[gpui_kit::test]
fn permissions_selection_confirmation_and_chat_isolation(cx: &mut TestAppContext) {
    use native_core::DemoPermissions as P;
    let (handle,app,path)=fixture(cx);
    cx.update_window(handle,|_,window,cx| {
        app.update(cx,|s,cx|s.act(Action::Surface(true),window,cx));
        window.render_frame(cx);
        let first=app.read(cx).active.clone();
        window.click("composer-permissions",cx);
        window.press("down",cx);
        window.press("enter",cx);
        assert!(app.read(cx).dialog.is_none());
        assert_eq!(app.read(cx).workspace.conversation(&first).unwrap().demo_permissions,P::GuardianApprovals);
        window.click("composer-permissions",cx);
        window.click(("app-btn",782usize),cx);
        assert!(app.read(cx).dialog==Some(Dialog::FullAccessConfirm));
        assert_eq!(app.read(cx).workspace.conversation(&first).unwrap().demo_permissions,P::GuardianApprovals);
        window.press("escape",cx);
        assert_eq!(app.read(cx).workspace.conversation(&first).unwrap().demo_permissions,P::GuardianApprovals);
        window.click("composer-permissions",cx);
        window.click(("app-btn",782usize),cx);
        window.click("permissions-cancel",cx);
        assert_eq!(app.read(cx).workspace.conversation(&first).unwrap().demo_permissions,P::GuardianApprovals);
        window.click("composer-permissions",cx);
        window.click(("app-btn",782usize),cx);
        window.click("permissions-confirm",cx);
        assert_eq!(app.read(cx).workspace.conversation(&first).unwrap().demo_permissions,P::FullAccess);
        let saved=native_core::Workspace::load(path.join("workspace.json")).unwrap();
        assert_eq!(saved.conversation(&first).unwrap().demo_permissions,P::FullAccess);
        app.update(cx,|s,cx|s.act(Action::New,window,cx));
        window.render_frame(cx);
        assert_eq!(app.read(cx).permission_index(),0);
        // Abandoning a pending confirmation cannot apply it to the next chat.
        window.click("composer-permissions",cx);
        window.click(("app-btn",782usize),cx);
        app.update(cx,|s,cx| {
            s.act(Action::New,window,cx);
            s.act(Action::ConfirmFullAccess,window,cx);
        });
        assert_eq!(app.read(cx).permission_index(),0);
        app.update(cx,|s,cx|s.act(Action::Chat(first),window,cx));
        assert_eq!(app.read(cx).permission_index(),2);
    }).unwrap();
    let _=std::fs::remove_dir_all(path);
}

#[gpui_kit::test]
fn codex_model_effort_slider_and_chat_selection_persist(cx:&mut TestAppContext) {
    use native_core::{CodexModel as M,ReasoningEffort as E};
    let (handle,app,path)=fixture(cx);
    let first=cx.update_window(handle,|_,window,cx| {
        app.update(cx,|s,cx|s.act(Action::Surface(true),window,cx));
        window.render_frame(cx);
        let first=app.read(cx).active.clone();
        window.click(("app-btn",201usize),cx);
        window.click(("app-btn",752usize),cx);
        window.render_frame(cx);
        assert_eq!(app.read(cx).codex_model_selection(),(M::Luna,E::Medium));
        let slider=app.read(cx).effort_slider.entity_id();
        let bounds=window.find(("slider",slider)).bounds();
        window.click_at(("slider",slider),point(bounds.size.width-px(2.),bounds.size.height/2.),cx);
        window.render_frame(cx);
        first
    }).unwrap();
    cx.run_until_parked();
    cx.update_window(handle,|_,window,cx| {
        window.render_frame(cx);
        assert_eq!(app.read(cx).codex_model_selection().1,E::Ultra);
        window.press("left",cx);
        assert_eq!(app.read(cx).codex_model_selection().1,E::Max);
        window.press("home",cx);
        assert_eq!(app.read(cx).codex_model_selection().1,E::Light);
        window.press("escape",cx);
        assert!(app.read(cx).dialog.is_none());
        let saved=native_core::Workspace::load(path.join("workspace.json")).unwrap();
        let chat=saved.conversation(&first).unwrap();
        assert_eq!((chat.codex_model,chat.reasoning_effort),(M::Luna,E::Light));
        app.update(cx,|s,cx|s.act(Action::New,window,cx));
        assert_eq!(app.read(cx).codex_model_selection(),(M::Astra,E::Medium));
        app.update(cx,|s,cx|s.act(Action::Chat(first),window,cx));
        window.click(("app-btn",201usize),cx);
        assert_eq!(app.read(cx).effort_slider.read(cx).value(),gpui_kit::component::slider::SliderValue::Single(0.));
    }).unwrap();
    let _=std::fs::remove_dir_all(path);
}
