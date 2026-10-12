//! Shipped vector geometry rendered by the native GPUI SVG renderer.
//! No webview or JavaScript runtime participates in these controls.
pub mod tokens;
pub mod typography;
use gpui_kit::{prelude::*, *};

pub fn icon_data(name: &str) -> &'static [u8] {
    match name {
        "wordmark" => include_bytes!("../assets/chatgpt-wordmark.svg"),
        "plus" => include_bytes!("../assets/composer_plus-451d93cbdc23.svg"),
        "mic" => include_bytes!("../assets/composer_mic-1c2dfc365b22.svg"),
        "voice" => include_bytes!("../assets/voice_5_bars_soundwave-36e8087185c0.svg"),
        "send" => include_bytes!("../assets/arrow_up-6c904b0911e9.svg"),
        "stop" => include_bytes!("../assets/stop-d40b2b9849a3.svg"),
        "copy" => include_bytes!("../assets/copy-fca5b461d233.svg"),
        "edit" => include_bytes!("../assets/edit-f9caffbe09e1.svg"),
        "regenerate" => include_bytes!("../assets/arrow_rotate_cw-4a213574bd44.svg"),
        "branch" => include_bytes!("../assets/branch-cddbdb4445c4.svg"),
        "more" => include_bytes!("../assets/ellipsis-9e39f0de3171.svg"),
        "chevron-down" => include_bytes!("../assets/chevron_down-6d8fb03d85b2.svg"),
        "sidebar" => include_bytes!("../assets/sidebar_left-59ba729cde31.svg"),
        "new-chat" => include_bytes!("../assets/compose_edit_square-2e8bc761727d.svg"),
        "search" => include_bytes!("../assets/search-799c22aba3de.svg"),
        "library" => include_bytes!("../assets/library-29533709afea.svg"),
        "projects" => include_bytes!("../assets/folder-2bb8c26384b3.svg"),
        "settings" => include_bytes!("../assets/settings-b4aeca2bb8a4.svg"),
        "share" => include_bytes!("../assets/share-ff60a9206871.svg"),
        "close" => include_bytes!("../assets/x-809c088b232e.svg"),
        "pin" => include_bytes!("../assets/pin-2fd723b94de8.svg"),
        "trash" => include_bytes!("../assets/trash-91a07fbf24e7.svg"),
        "archive" => include_bytes!("../assets/archive-30c19584748a.svg"),
        "image" => include_bytes!("../assets/image-f4b6b38efca3.svg"),
        "logo" => include_bytes!("../assets/openai_logo_regular-ceb75a1754fa.svg"),
        "chevron-right" => include_bytes!("../assets/chevron_right-b4fa8e89cb1b.svg"),
        "document" => include_bytes!("../assets/file_document-c15c8075d55c.svg"),
        "spreadsheet" => include_bytes!("../assets/file_spreadsheet-88eaa777523b.svg"),
        "presentation" => include_bytes!("../assets/file_presentation-bb201ec30014.svg"),
        "check" => include_bytes!("../assets/check-56cbce595426.svg"),
        "paperclip" => include_bytes!("../assets/paperclip_attach-fc9fac23c1a5.svg"),
        "globe" => include_bytes!("../assets/globe_real_time_search-ce40aa9e913b.svg"),
        "sliders" => include_bytes!("../assets/sliders-79c556d00732.svg"),
        "brain" => include_bytes!("../assets/brain-9069679dc06a.svg"),
        "sparkles" => include_bytes!("../assets/sparkles-45085c6ed846.svg"),
        "help" => include_bytes!("../assets/question_mark_circle-d5293e0405f8.svg"),
        "keyboard" => include_bytes!("../assets/keyboard_shortcut-1e0656de5d91.svg"),
        "scheduled" => include_bytes!("../assets/tasks-f059f3631d29.svg"),
        "grid" => include_bytes!("../assets/grid-9233444e81da.svg"),
        "list" => include_bytes!("../assets/list-ea876c3c4e37.svg"),
        "library-filter" => include_bytes!("../assets/filter-light-20.svg"),
        "picker-grid" => include_bytes!("../assets/square-grid-2x2-light-20.svg"),
        "project-sort" => include_bytes!("../assets/arrow-up-md-light-16.svg"),
        "picker-list" => include_bytes!("../assets/list-bullet-light-20.svg"),
        _ => &[],
    }
}

pub fn icon(name: &str, size: f32) -> Svg {
    svg().data(icon_data(name)).size(px(size)).flex_shrink_0()
}

pub fn glyph(name: &str) -> gpui_kit::component::Icon {
    gpui_kit::component::Icon::default().data(icon_data(name))
}
