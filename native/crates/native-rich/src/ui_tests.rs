//! Real GPUI render/input/click integration tests. Requires the opt-in ui-tests feature.
//! No environment variables or application data files are changed.
use super::{RichKind, RichSurface, persistence};
use gpui_kit::{
    AppContext, Bounds, Entity, Point, TestAppContext, WindowBounds, WindowOptions, base::Root, px,
    size, test::TestWindowExt,
};
use std::{
    path::PathBuf,
    sync::atomic::{AtomicU64, Ordering},
};
static NEXT_UI: AtomicU64 = AtomicU64::new(1);
struct Storage(PathBuf);
impl Storage {
    fn new() -> Self {
        let path = std::env::temp_dir().join(format!(
            "native-rich-ui-{}-{}",
            std::process::id(),
            NEXT_UI.fetch_add(1, Ordering::Relaxed)
        ));
        std::fs::create_dir_all(&path).expect("create isolated UI fixture storage");
        Self(path)
    }
    fn file(&self) -> PathBuf {
        self.0.join("surface.json")
    }
}
impl Drop for Storage {
    fn drop(&mut self) {
        let _ = std::fs::remove_dir_all(&self.0);
    }
}
fn open(
    cx: &mut TestAppContext,
    kind: RichKind,
    path: PathBuf,
) -> (gpui_kit::WindowHandle<Root>, Entity<RichSurface>) {
    cx.update(|cx| {
        let (window, surface) = gpui_kit::open_window(
            WindowOptions {
                window_bounds: Some(WindowBounds::Windowed(Bounds {
                    origin: Point::default(),
                    size: size(px(1100.), px(1000.)),
                })),
                ..Default::default()
            },
            cx,
            |window, cx| cx.new(|cx| RichSurface::with_storage(kind, path, window, cx)),
        )
        .expect("open native rich test window");
        (window.downcast::<Root>().expect("base Root"), surface)
    })
}
#[cfg(target_os = "macos")]
const SELECT_ALL: &str = "cmd-a";
#[cfg(not(target_os = "macos"))]
const SELECT_ALL: &str = "ctrl-a";

#[gpui_kit::test]
fn spreadsheet_click_edit_enter_save_reopen(cx: &mut TestAppContext) {
    cx.update(gpui_kit::init);
    let storage = Storage::new();
    let (handle, surface) = open(cx, RichKind::Spreadsheet, storage.file());
    let formula = cx.update(|cx| surface.read(cx).formula.clone());
    cx.update_window(handle.into(), |_, window, cx| {
        window.render_frame(cx);
        assert!(window.find(("cell", 1usize)).visible());
        window.click(("cell", 1usize), cx); // B1 through real hit testing.
        window.click(("input", formula.entity_id()), cx);
        window.press(SELECT_ALL, cx);
        window.input("20", cx);
        window.press("enter", cx);
        window.render_frame(cx);
    })
    .unwrap();
    cx.update(|cx| {
        let state = surface.read(cx);
        assert_eq!(state.model.selected, (0, 1));
        assert_eq!(state.model.cells[0][1], "20");
        assert_eq!(state.model.evaluate(4, 1).unwrap(), "88");
    });
    cx.update_window(handle.into(), |_, window, cx| {
        window.click("savesheet", cx);
    })
    .unwrap();
    cx.update(|cx| assert_eq!(surface.read(cx).status, "Saved locally"));
    let saved = persistence::load(&storage.file()).unwrap().unwrap();
    assert_eq!(saved.cells[0][1], "20");
    let (reopened, restored) = open(cx, RichKind::Spreadsheet, storage.file());
    cx.update_window(reopened.into(), |_, window, cx| {
        window.render_frame(cx);
        assert!(window.find(("cell", 13usize)).visible()); // B5 computed total.
    })
    .unwrap();
    cx.update(|cx| {
        assert_eq!(restored.read(cx).status, "Restored local demo");
        assert_eq!(restored.read(cx).model.evaluate(4, 1).unwrap(), "88");
    });
}

#[gpui_kit::test]
fn slide_add_edit_duplicate_reorder_delete_save(cx: &mut TestAppContext) {
    cx.update(gpui_kit::init);
    let storage = Storage::new();
    let (handle, surface) = open(cx, RichKind::Slides, storage.file());
    let (title, source) = cx.update(|cx| {
        (
            surface.read(cx).title.clone(),
            surface.read(cx).source.clone(),
        )
    });
    cx.update_window(handle.into(), |_, window, cx| {
        window.render_frame(cx);
        window.click("newslide", cx);
        window.click(("input", title.entity_id()), cx);
        window.press(SELECT_ALL, cx);
        window.input("Native integration test", cx);
        window.click(("input", source.entity_id()), cx);
        window.press(SELECT_ALL, cx);
        window.input("This body was entered through native input dispatch.", cx);
    })
    .unwrap();
    cx.update(|cx| {
        let state = surface.read(cx);
        assert_eq!(state.model.slides.len(), 4);
        assert_eq!(state.model.slides[3].title, "Native integration test");
        assert!(state.model.slides[3].body.starts_with("This body"));
    });
    cx.update_window(handle.into(), |_, window, cx| {
        window.click("dupslide", cx);
        window.click("moveslideleft", cx);
    })
    .unwrap();
    cx.update(|cx| {
        let state = surface.read(cx);
        assert_eq!(state.model.slides.len(), 5);
        assert_eq!(state.model.slide, 3);
        assert_eq!(state.model.slides[3].title, "Native integration test");
    });
    cx.update_window(handle.into(), |_, window, cx| {
        window.click("deleteslide", cx);
        window.click("saveslides", cx);
    })
    .unwrap();
    let saved = persistence::load(&storage.file()).unwrap().unwrap();
    assert_eq!(saved.slides.len(), 4);
    assert_eq!(saved.slides[3].title, "Native integration test");
    let (reopened, restored) = open(cx, RichKind::Slides, storage.file());
    cx.update_window(reopened.into(), |_, window, cx| window.render_frame(cx))
        .unwrap();
    cx.update(|cx| {
        let state = restored.read(cx);
        assert_eq!(
            state.model.slides[3].body,
            "This body was entered through native input dispatch."
        );
        assert_eq!(state.status, "Restored local demo");
    });
}

#[gpui_kit::test]
fn corrupt_storage_renders_blocked_surface_without_save_button(cx: &mut TestAppContext) {
    cx.update(gpui_kit::init);
    let storage = Storage::new();
    let bytes = b"saved user document, deliberately malformed fixture";
    std::fs::write(storage.file(), bytes).unwrap();
    let (handle, surface) = open(cx, RichKind::Spreadsheet, storage.file());
    cx.update_window(handle.into(), |_, window, cx| {
        window.render_frame(cx);
        assert!(window.try_find("savesheet").is_none());
        assert!(window.try_find("apply").is_none());
    })
    .unwrap();
    cx.update(|cx| {
        assert!(
            surface
                .read(cx)
                .load_error
                .as_ref()
                .unwrap()
                .contains("Invalid saved data")
        );
    });
    assert_eq!(std::fs::read(storage.file()).unwrap(), bytes);
}

#[gpui_kit::test]
fn document_selection_format_find_replace_and_save(cx: &mut TestAppContext) {
    cx.update(gpui_kit::init);
    let storage = Storage::new();
    let (handle, surface) = open(cx, RichKind::Document, storage.file());
    let (source, find, replacement) = cx.update(|cx| {
        let s = surface.read(cx);
        (
            s.source.clone(),
            s.find_query.clone(),
            s.replace_with.clone(),
        )
    });
    cx.update_window(handle.into(), |_, window, cx| {
        window.render_frame(cx);
        window.click(("input", source.entity_id()), cx);
        window.press(SELECT_ALL, cx);
        window.input("Hello world", cx);
        window.press(SELECT_ALL, cx);
        window.click("doc-bold", cx);
    })
    .unwrap();
    cx.update(|cx| assert_eq!(surface.read(cx).model.document, "**Hello world**"));
    cx.update_window(handle.into(), |_, window, cx| {
        window.press("ctrl-z", cx);
    })
    .unwrap();
    cx.update(|cx| assert_eq!(surface.read(cx).model.document, "Hello world"));
    cx.update_window(handle.into(), |_, window, cx| {
        window.click(("input", find.entity_id()), cx);
        window.input("world", cx);
        window.click("doc-find", cx);
    })
    .unwrap();
    cx.update(|cx| assert_eq!(source.read(cx).selected_value().as_ref(), "world"));
    cx.update_window(handle.into(), |_, window, cx| {
        window.click("doc-italic", cx);
        window.click(("input", replacement.entity_id()), cx);
        window.input("native", cx);
        window.click("doc-replace-all", cx);
    })
    .unwrap();
    cx.update(|cx| assert_eq!(surface.read(cx).model.document, "Hello *native*"));
    cx.update_window(handle.into(), |_, window, cx| {
        window.click(("input", source.entity_id()), cx);
        window.press(SELECT_ALL, cx);
        window.click("doc-link", cx);
        window.press(SELECT_ALL, cx);
        window.click("doc-list", cx);
        window.click("save-doc", cx);
    })
    .unwrap();
    let saved = persistence::load(&storage.file()).unwrap().unwrap();
    assert_eq!(saved.document, "- [Hello *native*](https://example.com)");
}

#[gpui_kit::test]
fn workbook_range_fill_resize_save_and_reopen(cx: &mut TestAppContext) {
    cx.update(gpui_kit::init);
    let storage = Storage::new();
    let (handle, surface) = open(cx, RichKind::Spreadsheet, storage.file());
    let formula = cx.update(|cx| surface.read(cx).formula.clone());
    cx.update_window(handle.into(), |_, window, cx| {
        window.render_frame(cx);
        window.click(("cell", 1usize), cx);
        window.click("extendrange", cx);
        window.click(("cell", 8usize), cx);
        window.click("widecolumn", cx);
    })
    .unwrap();
    cx.update(|cx| {
        let s = surface.read(cx);
        assert_eq!(s.model.range_label(), "B1:C3");
        assert_eq!(s.model.column_widths[2], 210);
    });
    cx.update_window(handle.into(), |_, window, cx| {
        window.click(("input", formula.entity_id()), cx);
        window.press(SELECT_ALL, cx);
        window.input("7", cx);
        window.click("fillrange", cx);
        window.click("savesheet", cx);
    })
    .unwrap();
    let saved = persistence::load(&storage.file()).unwrap().unwrap();
    assert_eq!(saved.range_tsv(), "7\t7\n7\t7\n7\t7");
    assert_eq!(saved.column_widths[2], 210);
    let (reopened, restored) = open(cx, RichKind::Spreadsheet, storage.file());
    cx.update_window(reopened.into(), |_, window, cx| window.render_frame(cx))
        .unwrap();
    cx.update(|cx| {
        let s = restored.read(cx);
        assert_eq!(s.model.range_label(), "B1:C3");
        assert_eq!(s.model.column_widths[2], 210);
        assert!(s.model.extend_range);
    });
}
