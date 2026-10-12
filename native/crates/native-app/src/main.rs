#![cfg_attr(all(target_os = "windows", not(test)), windows_subsystem = "windows")]
extern crate gpui_kit as gpui;
mod app;
mod fixtures;
use gpui_kit::component::{Theme, ThemeMode};
use gpui_kit::*;
fn main() {
    gpui_kit::application()
        .with_assets(gpui_kit::assets::Assets)
        .run(|cx| {
            gpui_kit::init(cx);
            Theme::change(ThemeMode::Dark, None, cx);
            let bounds = Bounds::centered(None, size(px(1440.), px(940.)), cx);
            gpui_kit::open_window(
                WindowOptions {
                    window_bounds: Some(WindowBounds::Windowed(bounds)),
                    titlebar: Some(TitlebarOptions {
                        title: None,
                        appears_transparent: true,
                        traffic_light_position: None,
                    }),
                    ..Default::default()
                },
                cx,
                |window, cx| {
                    window.set_window_title("ChatGPT · Rust");
                    cx.new(|cx| app::WorkspaceApp::new(window, cx))
                },
            )
            .expect("Cannot open native workspace window");
            cx.activate(true);
        });
}
