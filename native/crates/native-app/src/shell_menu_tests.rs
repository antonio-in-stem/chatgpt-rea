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
