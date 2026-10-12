//! Default neutral tokens from app-shared-9a94b907ed47.css, lines 5134–5458.
//! Alpha remains alpha: flattening against a guessed backdrop changes elevated UI.
//! Custom account themes and Electron transparency are separate unresolved layers.
use gpui_kit::{Hsla, rgb};
fn ink(dark: bool, alpha: f32) -> Hsla {
    let mut color: Hsla = rgb(if dark { 0xffffff } else { 0x1a1c1f }).into();
    color.a = alpha;
    color
}
/// --color-background-composer-surface -> elevated-primary-opaque, CSS5703.
pub fn composer_surface(dark: bool) -> Hsla {
    rgb(if dark { 0x282828 } else { 0xffffff }).into()
}
pub fn border(dark: bool) -> Hsla {
    ink(dark, 0.08)
}
pub fn border_heavy(dark: bool) -> Hsla {
    ink(dark, if dark { 0.16 } else { 0.12 })
}
pub fn secondary(dark: bool) -> Hsla {
    ink(dark, 0.05)
}
pub fn secondary_hover(dark: bool) -> Hsla {
    ink(dark, if dark { 0.08 } else { 0.05 })
}
pub fn secondary_active(dark: bool) -> Hsla {
    ink(dark, if dark { 0.12 } else { 0.04 })
}
pub fn secondary_text(dark: bool) -> Hsla {
    ink(dark, 0.70)
}
pub fn tertiary_text(dark: bool) -> Hsla {
    ink(dark, 0.50)
}
/// --color-ring -> --app-color-border-focus, CSS5468/5788.
pub fn focus_ring(dark: bool) -> Hsla {
    let mut color: Hsla = rgb(0x339cff).into();
    color.a = if dark { 0.70 } else { 1.0 };
    color
}
