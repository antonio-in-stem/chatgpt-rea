//! Electron OVs typography scale, app-initial-b8e1c8014bb4.js:449756/449966.
//! Only font sizes scale here. Fixed CSS spacing and explicit leading stay fixed.
use gpui_kit::component::ActiveTheme;
use gpui_kit::{App, Pixels, px};

#[derive(Clone, Copy, Debug)]
pub enum TextRole {
    Caption,
    Small,
    Body,
    Large,
    HeadingSmall,
    HeadingMedium,
    HeadingLarge,
    HeadingApp,
}
impl TextRole {
    pub fn pixels(self, ui_size: f32) -> Pixels {
        let base = match self {
            Self::Caption => 12.,
            Self::Small => 13.,
            Self::Body => 14.,
            Self::Large => 16.,
            Self::HeadingSmall => 18.,
            Self::HeadingMedium => 20.,
            Self::HeadingLarge => 24.,
            Self::HeadingApp => 28.,
        };
        px((base * ui_size / 14.).round())
    }
    pub fn in_app(self, cx: &App) -> Pixels {
        self.pixels(f32::from(cx.theme().font_size))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn electron_scale_preserves_default_and_rounds_each_role() {
        // These are the source OVs values evaluated at the preference bounds.
        for (role, small, normal, large) in [
            (TextRole::Caption, 9., 12., 14.),
            (TextRole::Small, 10., 13., 15.),
            (TextRole::Body, 11., 14., 16.),
            (TextRole::Large, 13., 16., 18.),
            (TextRole::HeadingSmall, 14., 18., 21.),
            (TextRole::HeadingMedium, 16., 20., 23.),
            (TextRole::HeadingLarge, 19., 24., 27.),
            (TextRole::HeadingApp, 22., 28., 32.),
        ] {
            assert_eq!(role.pixels(11.), px(small));
            assert_eq!(role.pixels(14.), px(normal));
            assert_eq!(role.pixels(16.), px(large));
        }
    }
}
