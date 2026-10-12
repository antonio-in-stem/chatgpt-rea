//! Headless tests dispatch native pointer/keyboard events; each owns isolated storage.
use super::{Settings, SettingsSurface, unique_stamp};
use gpui_kit::component::ActiveTheme;
use gpui_kit::test::TestWindowExt;
use gpui_kit::{
    AnyWindowHandle, AppContext, Bounds, Entity, TestAppContext, WindowBounds, WindowOptions,
    point, px, size,
};
use std::path::PathBuf;

struct Storage(PathBuf);
impl Storage {
    fn new() -> Self {
        let dir = std::env::temp_dir().join(format!(
            "native-settings-ui-{}-{}",
            std::process::id(),
            unique_stamp()
        ));
        std::fs::create_dir_all(&dir).unwrap();
        Self(dir)
    }
    fn file(&self) -> PathBuf {
        self.0.join("settings.json")
    }
}
impl Drop for Storage {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.0);
    }
}
fn open(cx: &mut TestAppContext, storage: &Storage) -> (AnyWindowHandle, Entity<SettingsSurface>) {
    cx.update(|cx| {
        gpui_kit::init(cx);
        gpui_kit::open_window(
            WindowOptions {
                window_bounds: Some(WindowBounds::Windowed(Bounds {
                    origin: point(px(0.), px(0.)),
                    size: size(px(1200.), px(1000.)),
                })),
                ..Default::default()
            },
            cx,
            |window, cx| cx.new(|cx| SettingsSurface::new(storage.file(), window, cx)),
        )
        .unwrap()
    })
}

#[gpui_kit::test]
fn section_navigation_uses_native_radio_keyboard_selection(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, view) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        window.within("settings-sections").click(0usize, cx);
        window.press("down", cx);
        window.render_frame(cx);
        assert_eq!(view.read(cx).section, 1);
        window.press("up", cx);
        window.render_frame(cx);
        assert_eq!(view.read(cx).section, 0);
        window.press("up", cx);
        window.render_frame(cx);
        assert_eq!(
            view.read(cx).section,
            6,
            "ArrowUp wraps to the last section"
        );
        assert!(view.read(cx).section_focus[6].is_focused(window));
        window.press("home", cx);
        window.render_frame(cx);
        assert_eq!(view.read(cx).section, 0);
        assert!(view.read(cx).section_focus[0].is_focused(window));
    })
    .unwrap();
}

#[gpui_kit::test]
fn theme_and_font_apply_from_native_controls_and_persist(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let mut initial = Settings::default();
    initial.theme = "Dark".into();
    initial.font_size = 11;
    initial.save(&storage.file()).unwrap();
    let (handle, view) = open(cx, &storage);
    let font = cx.update(|cx| view.read(cx).font.clone());
    let code_font = cx.update(|cx| view.read(cx).code_font.clone());
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        window.within("settings-sections").click(1usize, cx);
        window.render_frame(cx);
        window.click("settings-theme", cx);
        window.render_frame(cx);
        window.press("up", cx);
        window.press("enter", cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        window.click(("slider", font.entity_id()), cx);
        window.render_frame(cx);
        window.click(("slider", code_font.entity_id()), cx);
        window.render_frame(cx);
        window.click("settings-save", cx);
        window.render_frame(cx);
        assert!(!view.read(cx).error, "{}", view.read(cx).message);
        assert_eq!(view.read(cx).config.theme, "Light");
        assert!(!cx.theme().mode.is_dark());
        let configured = view.read(cx).config.font_size;
        assert_ne!(
            configured, 11,
            "Slider interaction must change the fixture value"
        );
        assert_eq!(cx.theme().font_size, px(configured as f32));
        let code_size = view.read(cx).config.code_font_size;
        assert_ne!(code_size, 12);
        assert_eq!(cx.theme().mono_font_size, px(code_size as f32));
    })
    .unwrap();
    let saved = Settings::load(&storage.file()).unwrap();
    assert_eq!(saved.theme, "Light");
    assert_ne!(saved.font_size, 11);
    assert_ne!(saved.code_font_size, 12);
}

#[gpui_kit::test]
fn shortcut_edit_save_and_duplicate_error_preserve_saved_value(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, view) = open(cx, &storage);
    let search = cx.update(|cx| {
        view.read(cx)
            .hotkeys
            .iter()
            .find(|(name, _)| name == "Search")
            .unwrap()
            .1
            .clone()
    });
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        window.within("settings-sections").click(6usize, cx);
        window.render_frame(cx);
        window.click(("input", search.entity_id()), cx);
        window.press("ctrl-a", cx);
        window.input("Ctrl+Shift+P", cx);
        window.click("settings-save", cx);
        window.render_frame(cx);
        assert!(!view.read(cx).error, "{}", view.read(cx).message);
    })
    .unwrap();
    assert_eq!(
        Settings::load(&storage.file()).unwrap().hotkeys["Search"],
        "Ctrl+Shift+P"
    );
    cx.update_window(handle, |_, window, cx| {
        window.click(("input", search.entity_id()), cx);
        window.press("ctrl-a", cx);
        window.input("Ctrl+N", cx);
        window.click("settings-save", cx);
        window.render_frame(cx);
        assert!(view.read(cx).error);
        assert!(view.read(cx).message.contains("duplicates"));
    })
    .unwrap();
    assert_eq!(
        Settings::load(&storage.file()).unwrap().hotkeys["Search"],
        "Ctrl+Shift+P"
    );
}

#[gpui_kit::test]
fn explicit_recovery_click_preserves_original_bytes(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let original = b"{ damaged settings \x00 original bytes";
    std::fs::write(storage.file(), original).unwrap();
    let (handle, view) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        assert!(view.read(cx).load_blocked);
        assert!(window.try_find("settings-save").is_none());
        assert_eq!(std::fs::read(storage.file()).unwrap(), original);
        window.click("recover-settings", cx);
        window.render_frame(cx);
        assert!(!view.read(cx).load_blocked, "{}", view.read(cx).message);
        assert!(!view.read(cx).error);
    })
    .unwrap();
    assert_eq!(
        Settings::load(&storage.file()).unwrap(),
        Settings::default()
    );
    let backups = std::fs::read_dir(&storage.0)
        .unwrap()
        .map(|e| e.unwrap().path())
        .filter(|p| {
            p.file_name()
                .unwrap()
                .to_string_lossy()
                .contains("corrupt-backup")
        })
        .collect::<Vec<_>>();
    assert_eq!(backups.len(), 1);
    assert_eq!(std::fs::read(&backups[0]).unwrap(), original);
}

#[gpui_kit::test]
fn reduce_motion_is_in_appearance_and_retains_saved_preference(cx: &mut TestAppContext) {
    let storage = Storage::new();
    let (handle, view) = open(cx, &storage);
    cx.update_window(handle, |_, window, cx| {
        window.render_frame(cx);
        window.within("settings-sections").click(1usize, cx);
        window.render_frame(cx);
        window.click("reduced-motion", cx);
        window.click("settings-save", cx);
        window.render_frame(cx);
        assert!(!view.read(cx).error, "{}", view.read(cx).message);
        assert!(view.read(cx).config.reduced_motion);
        window.within("settings-sections").click(0usize, cx);
        window.render_frame(cx);
        window.within("settings-sections").click(1usize, cx);
        window.render_frame(cx);
        assert!(view.read(cx).config.reduced_motion);
    })
    .unwrap();
    assert!(Settings::load(&storage.file()).unwrap().reduced_motion);
}
