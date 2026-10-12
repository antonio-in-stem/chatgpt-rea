//! Reusable native frontend facade used independently of the demo shell.
//!
//! `controls` and `behavior` are upstream GPUI Kit modules with their original
//! contracts. The higher-level surfaces below contain this project's demo
//! compositions. Re-exporting a control does not assert ChatGPT behavioral parity.
//! See catalog/ for the evidence and per-family acceptance requirements.
pub use gpui_kit as runtime;
pub use gpui_kit::base as behavior;
pub use gpui_kit::component as controls;
pub use native_core as domain;
pub use native_rich::{RichKind, RichSurface};
pub use native_settings::SettingsSurface;
pub use native_tools::{ToolKind, ToolSurface};
