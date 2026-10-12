use super::{ToolKind, ToolSurface};
use gpui_kit::test::TestWindowExt;
use gpui_kit::{
    AnyWindowHandle, AppContext, Bounds, Entity, TestAppContext, WindowBounds, WindowOptions,
    point, px, size,
};
fn open(cx: &mut TestAppContext, kind: ToolKind) -> (AnyWindowHandle, Entity<ToolSurface>) {
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
            |window, cx| cx.new(|cx| ToolSurface::new(kind, window, cx)),
        )
        .unwrap()
    })
}
#[gpui_kit::test]
fn connector_permissions_and_revocation(cx: &mut TestAppContext) {
    let (h, v) = open(cx, ToolKind::Connectors);
    cx.update_window(h, |_, w, cx| {
        w.render_frame(cx);
        w.click(("tool-button", 10usize), cx);
        w.render_frame(cx);
        w.click(("connector-write", 0usize), cx);
        assert!(v.read(cx).state.connectors[0].write);
        w.click(("connector-read", 0usize), cx);
        assert!(!v.read(cx).state.connectors[0].read);
        w.click(("tool-button", 10usize), cx);
        let connector = &v.read(cx).state.connectors[0];
        assert!(!connector.connected);
        assert!(!connector.write);
    })
    .unwrap();
}
#[gpui_kit::test]
fn schedule_calendar_and_form_validation(cx: &mut TestAppContext) {
    let (h, v) = open(cx, ToolKind::Automations);
    cx.update_window(h, |_, w, cx| {
        w.render_frame(cx);
        w.click(("tool-button", 0usize), cx);
        w.render_frame(cx);
        w.click(("tool-button", 1usize), cx);
        assert_eq!(v.read(cx).state.automations.len(), 1);
        assert!(v.read(cx).notice.contains("date"));
        let title = v.read(cx).title.clone();
        let prompt = v.read(cx).prompt.clone();
        let date = v.read(cx).starts_at.clone();
        w.click(("input", title.entity_id()), cx);
        w.input("Weekly review", cx);
        w.click(("input", prompt.entity_id()), cx);
        w.input("Review fixture priorities", cx);
        w.click(("date-picker", date.entity_id()), cx);
        w.render_frame(cx);
        let today = chrono::Local::now().date_naive();
        let id = (0..6)
            .map(|week| format!("calendar-{today}-0-{week}"))
            .find(|id| w.try_find(id.clone()).is_some())
            .expect("today calendar cell");
        w.click(id, cx);
        w.render_frame(cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update_window(h, |_, w, cx| {
        w.press("escape", cx);
        w.render_frame(cx);
        assert!(v.read(cx).starts_at.read(cx).date_time().is_some());
        w.click(("tool-button", 1usize), cx);
        w.render_frame(cx);
        assert_eq!(v.read(cx).state.automations.len(), 2);
        let task = &v.read(cx).state.automations[1];
        assert_eq!(task.title, "Weekly review");
        assert!(task.starts_at.is_some());
    })
    .unwrap();
}
#[gpui_kit::test]
fn diff_resize_and_comment(cx: &mut TestAppContext) {
    let (h, v) = open(cx, ToolKind::CodeReview);
    cx.update_window(h, |_, w, cx| {
        w.render_frame(cx);
        let original = v.read(cx).diff_sizes.read(cx).sizes()[0];
        w.click(("tool-button", 4usize), cx);
        w.render_frame(cx);
        assert!(v.read(cx).diff_sizes.read(cx).sizes()[0] < original);
        w.click(("tool-button", 1501usize), cx);
        let input = v.read(cx).entry.clone();
        w.click(("input", input.entity_id()), cx);
        w.input("Review this line", cx);
        w.press("enter", cx);
    })
    .unwrap();
    cx.run_until_parked();
    cx.update(|cx| assert!(v.read(cx).state.files[0].comments[0].starts_with("Diff row 2")));
}
