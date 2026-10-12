use gpui_kit::component::{
    ActiveTheme, IndexPath, Theme, ThemeMode,
    button::{Button, ButtonVariants},
    input::{Input, InputState},
    select::{Select, SelectState},
    slider::{Slider, SliderState, SliderValue},
    switch::Switch,
};
use gpui_kit::{prelude::*, *};
use serde::{Deserialize, Serialize};
use std::{
    collections::BTreeMap,
    path::{Path, PathBuf},
};

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq)]
#[serde(default)]
pub struct Settings {
    pub display_name: String,
    pub instructions: String,
    pub theme: String,
    pub font_size: u8,
    pub reduced_motion: bool,
    pub notifications: bool,
    pub sound: bool,
    pub memory: bool,
    pub voice: String,
    pub language: String,
    pub connections: BTreeMap<String, bool>,
    pub hotkeys: BTreeMap<String, String>,
}
impl Default for Settings {
    fn default() -> Self {
        Self {
            display_name: "Alex".into(),
            instructions: "Keep answers clear and concise.".into(),
            theme: "Dark".into(),
            font_size: 14,
            reduced_motion: false,
            notifications: true,
            sound: false,
            memory: true,
            voice: "Juniper".into(),
            language: "English".into(),
            connections: ["Google Drive", "GitHub", "Calendar"]
                .into_iter()
                .map(|s| (s.into(), false))
                .collect(),
            hotkeys: [
                ("New chat", "Ctrl+N"),
                ("Search", "Ctrl+K"),
                ("Settings", "Ctrl+Comma"),
            ]
            .into_iter()
            .map(|(a, b)| (a.into(), b.into()))
            .collect(),
        }
    }
}
impl Settings {
    pub fn validate(&self) -> Result<(), String> {
        if !(12..=24).contains(&self.font_size) {
            return Err("Font size must be between 12 and 24.".into());
        }
        if !["Light", "Dark"].contains(&self.theme.as_str()) {
            return Err("Choose Light or Dark.".into());
        }
        if self.display_name.trim().is_empty() {
            return Err("Display name cannot be empty.".into());
        }
        let mut seen = std::collections::HashSet::new();
        for (name, key) in &self.hotkeys {
            let normalized = key
                .split('+')
                .map(|s| s.trim().to_ascii_lowercase())
                .collect::<Vec<_>>();
            if normalized.len() < 2
                || normalized.iter().any(|x| x.is_empty())
                || !normalized[..normalized.len() - 1]
                    .iter()
                    .all(|x| ["ctrl", "alt", "shift", "win"].contains(&x.as_str()))
            {
                return Err(format!(
                    "{name}: use a modifier and key, for example Ctrl+K."
                ));
            }
            let mut mods = normalized[..normalized.len() - 1].to_vec();
            mods.sort();
            mods.dedup();
            mods.push(normalized.last().unwrap().clone());
            if !seen.insert(mods.join("+")) {
                return Err(format!("{name}: shortcut duplicates another action."));
            }
        }
        Ok(())
    }
    pub fn load(path: &Path) -> Result<Self, String> {
        let bytes = match std::fs::read(path) {
            Ok(bytes) => bytes,
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => return Ok(Self::default()),
            Err(e) => return Err(e.to_string()),
        };
        let value: Self = serde_json::from_slice(&bytes).map_err(|e| e.to_string())?;
        value.validate()?;
        Ok(value)
    }
    pub fn save(&self, path: &Path) -> Result<(), String> {
        self.validate()?;
        // Never overwrite unreadable, corrupt or invalid persisted settings.
        Self::load(path)?;
        self.write_staged(path)
    }
    fn write_staged(&self, path: &Path) -> Result<(), String> {
        self.validate()?;
        if let Some(parent) = path.parent().filter(|p| !p.as_os_str().is_empty()) {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        let bytes = serde_json::to_vec_pretty(self).map_err(|e| e.to_string())?;
        let pending =
            path.with_extension(format!("pending-{}-{}", std::process::id(), unique_stamp()));
        let result = (|| -> Result<(), String> {
            use std::io::Write;
            let mut file = std::fs::OpenOptions::new()
                .write(true)
                .create_new(true)
                .open(&pending)
                .map_err(|e| e.to_string())?;
            file.write_all(&bytes).map_err(|e| e.to_string())?;
            file.sync_all().map_err(|e| e.to_string())?;
            drop(file);
            std::fs::rename(&pending, path)
                .map_err(|e| format!("Could not replace saved settings: {e}"))
        })();
        if result.is_err() {
            let _ = std::fs::remove_file(&pending);
        }
        result
    }
    /// Explicit recovery preserves the original bytes before replacing them with defaults.
    pub fn recover_defaults(path: &Path) -> Result<PathBuf, String> {
        use std::io::Write;
        let bytes =
            std::fs::read(path).map_err(|e| format!("Cannot back up original settings: {e}"))?;
        let backup = path.with_extension(format!(
            "corrupt-backup-{}-{}.json",
            std::process::id(),
            unique_stamp()
        ));
        let mut file = std::fs::OpenOptions::new()
            .write(true)
            .create_new(true)
            .open(&backup)
            .map_err(|e| e.to_string())?;
        file.write_all(&bytes)
            .map_err(|e| format!("Could not back up settings: {e}"))?;
        file.sync_all()
            .map_err(|e| format!("Could not sync backup: {e}"))?;
        drop(file);
        Self::default().write_staged(path)?;
        Ok(backup)
    }
}
// Wall clocks can repeat at Windows timer resolution; the process-local counter
// guarantees distinct staging/backup/test-storage names for concurrent callers.
fn unique_stamp() -> String {
    static NEXT: std::sync::atomic::AtomicU64 = std::sync::atomic::AtomicU64::new(0);
    let serial = NEXT.fetch_add(1, std::sync::atomic::Ordering::Relaxed);
    let clock = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_nanos();
    format!("{clock}-{serial}")
}
#[derive(Clone, Debug)]
pub struct SettingsChanged {
    pub settings: Settings,
}

type Choice = Entity<SelectState<Vec<SharedString>>>;
pub struct SettingsSurface {
    storage_path: PathBuf,
    config: Settings,
    section: usize,
    message: String,
    error: bool,
    name: Entity<InputState>,
    instructions: Entity<InputState>,
    hotkeys: Vec<(String, Entity<InputState>)>,
    theme: Choice,
    voice: Choice,
    language: Choice,
    font: Entity<SliderState>,
    pending_connection: Option<String>,
    voice_preview: bool,
    load_blocked: bool,
    section_focus: Vec<FocusHandle>,
}
impl EventEmitter<SettingsChanged> for SettingsSurface {}
const SECTIONS: [&str; 8] = [
    "General",
    "Appearance",
    "Personalization",
    "Notifications",
    "Voice",
    "Connections",
    "Accessibility",
    "Keyboard",
];
fn choice(options: &[&str], selected: &str, window: &mut Window, cx: &mut App) -> Choice {
    let index = options.iter().position(|x| *x == selected).unwrap_or(0);
    let values = options
        .iter()
        .map(|x| SharedString::from((*x).to_owned()))
        .collect::<Vec<_>>();
    cx.new(|cx| SelectState::new(values, Some(IndexPath::default().row(index)), window, cx))
}
fn field(value: &str, window: &mut Window, cx: &mut App) -> Entity<InputState> {
    cx.new(|cx| InputState::new(window, cx).default_value(value.to_owned()))
}
impl SettingsSurface {
    pub fn new(storage_path: PathBuf, window: &mut Window, cx: &mut Context<Self>) -> Self {
        let (config, message, error) = match Settings::load(&storage_path) {
            Ok(s) => (
                s,
                "Settings are stored locally on this device.".into(),
                false,
            ),
            Err(e) => (
                Settings::default(),
                format!(
                    "Could not load settings: {e}. Save is blocked; the original file is unchanged."
                ),
                true,
            ),
        };
        if !error {
            apply_theme(&config, window, cx);
        }
        let name = field(&config.display_name, window, cx);
        let instructions = field(&config.instructions, window, cx);
        let hotkeys = config
            .hotkeys
            .iter()
            .map(|(k, v)| (k.clone(), field(v, window, cx)))
            .collect();
        let theme = choice(&["Light", "Dark"], &config.theme, window, cx);
        let voice = choice(
            &["Juniper", "Ember", "Breeze", "Cove"],
            &config.voice,
            window,
            cx,
        );
        let language = choice(
            &["English", "Español", "Français"],
            &config.language,
            window,
            cx,
        );
        let font = cx.new(|_| {
            SliderState::new()
                .min(12.)
                .max(24.)
                .step(1.)
                .default_value(config.font_size as f32)
        });
        Self {
            section_focus: SECTIONS.iter().map(|_| cx.focus_handle()).collect(),
            storage_path,
            config,
            section: 0,
            message,
            error,
            name,
            instructions,
            hotkeys,
            theme,
            voice,
            language,
            font,
            pending_connection: None,
            voice_preview: false,
            load_blocked: error,
        }
    }
    fn collect(&mut self, cx: &App) {
        self.config.display_name = self.name.read(cx).value().to_string();
        self.config.instructions = self.instructions.read(cx).value().to_string();
        for (key, input) in &self.hotkeys {
            self.config
                .hotkeys
                .insert(key.clone(), input.read(cx).value().to_string());
        }
        self.config.theme = self
            .theme
            .read(cx)
            .selected_value()
            .map(|x| x.to_string())
            .unwrap_or("Dark".into());
        self.config.voice = self
            .voice
            .read(cx)
            .selected_value()
            .map(|x| x.to_string())
            .unwrap_or("Juniper".into());
        self.config.language = self
            .language
            .read(cx)
            .selected_value()
            .map(|x| x.to_string())
            .unwrap_or("English".into());
        if let SliderValue::Single(v) = self.font.read(cx).value() {
            self.config.font_size = v.round() as u8;
        }
    }
    pub fn current_settings(&self) -> &Settings {
        &self.config
    }
    pub fn toggle_theme(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        if self.load_blocked {
            self.message =
                "Theme change blocked: recover the original settings file in Settings first."
                    .into();
            self.error = true;
            cx.notify();
            return;
        }
        let previous = self.config.theme.clone();
        self.config.theme = if previous == "Dark" { "Light" } else { "Dark" }.into();
        self.theme = choice(&["Light", "Dark"], &self.config.theme, window, cx);
        match self.config.save(&self.storage_path) {
            Ok(()) => self.did_save(window, cx),
            Err(e) => {
                self.config.theme = previous;
                self.theme = choice(&["Light", "Dark"], &self.config.theme, window, cx);
                self.message = format!("Could not save theme: {e}");
                self.error = true;
            }
        }
        cx.notify();
    }
    fn did_save(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        apply_theme(&self.config, window, cx);
        self.message="Saved locally. Theme and font size applied. Reduced-motion preference is stored and emitted; this kit has no global reduced-motion switch.".into();
        self.error = false;
        cx.emit(SettingsChanged {
            settings: self.config.clone(),
        });
    }
    fn apply(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        if self.load_blocked {
            self.message = "Save blocked. Recover the original settings file first.".into();
            self.error = true;
            cx.notify();
            return;
        }
        self.collect(cx);
        match self.config.save(&self.storage_path) {
            Ok(()) => self.did_save(window, cx),
            Err(e) => {
                self.message = format!("Could not save: {e}");
                self.error = true;
            }
        }
        cx.notify();
    }
    fn recover(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        match Settings::recover_defaults(&self.storage_path) {
            Ok(backup) => {
                self.replace(Settings::default(), window, cx);
                self.load_blocked = false;
                self.did_save(window, cx);
                self.message = format!(
                    "Recovered defaults. Original settings backed up at {}.",
                    backup.display()
                );
            }
            Err(e) => {
                self.message = format!("Recovery failed; original settings retained: {e}");
                self.error = true;
            }
        }
        cx.notify();
    }
    fn replace(&mut self, config: Settings, window: &mut Window, cx: &mut Context<Self>) {
        self.name.update(cx, |s, cx| {
            s.set_value(config.display_name.clone(), window, cx)
        });
        self.instructions.update(cx, |s, cx| {
            s.set_value(config.instructions.clone(), window, cx)
        });
        self.hotkeys = config
            .hotkeys
            .iter()
            .map(|(k, v)| (k.clone(), field(v, window, cx)))
            .collect();
        self.theme = choice(&["Light", "Dark"], &config.theme, window, cx);
        self.voice = choice(
            &["Juniper", "Ember", "Breeze", "Cove"],
            &config.voice,
            window,
            cx,
        );
        self.language = choice(
            &["English", "Español", "Français"],
            &config.language,
            window,
            cx,
        );
        self.font = cx.new(|_| {
            SliderState::new()
                .min(12.)
                .max(24.)
                .step(1.)
                .default_value(config.font_size as f32)
        });
        self.config = config;
    }
}
fn apply_theme(config: &Settings, window: &mut Window, cx: &mut App) {
    Theme::change(
        if config.theme == "Light" {
            ThemeMode::Light
        } else {
            ThemeMode::Dark
        },
        Some(window),
        cx,
    );
    // Neutral palette values are grounded in app-shared CSS gray-fixed tokens.
    // Mapping them onto native roles is an approximation, not an exact original theme.
    // Theme::update reconciles legacy colors into semantic tokens and refreshes windows.
    Theme::update(cx, |theme| {
        theme.font_size = px(config.font_size as f32);
        let dark = config.theme == "Dark";
        let background: Hsla = rgb(if dark { 0x212121 } else { 0xffffff }).into();
        let foreground: Hsla = rgb(if dark { 0xdfdfdf } else { 0x1a1c1f }).into();
        let sidebar: Hsla = rgb(if dark { 0x181818 } else { 0xf9f9f9 }).into();
        let muted: Hsla = rgb(if dark { 0x303030 } else { 0xf9f9f9 }).into();
        let subtle: Hsla = rgb(if dark { 0xafafaf } else { 0x5d5d5d }).into();
        let border: Hsla = rgb(if dark { 0x414141 } else { 0xdfdfdf }).into();
        let primary: Hsla = rgb(if dark { 0xededed } else { 0x212121 }).into();
        let on_primary: Hsla = rgb(if dark { 0x181818 } else { 0xffffff }).into();
        let hover: Hsla = rgb(if dark { 0x414141 } else { 0xededed }).into();
        let c = &mut theme.colors;
        c.background = background;
        c.foreground = foreground;
        c.sidebar = sidebar;
        c.sidebar_foreground = foreground;
        c.sidebar_border = border;
        c.sidebar_accent = muted;
        c.sidebar_accent_foreground = foreground;
        c.sidebar_primary = primary;
        c.sidebar_primary_foreground = on_primary;
        c.primary = primary;
        c.primary_foreground = on_primary;
        c.primary_hover = rgb(if dark { 0xdfdfdf } else { 0x303030 }).into();
        c.primary_active = rgb(if dark { 0xafafaf } else { 0x414141 }).into();
        c.muted = muted;
        c.muted_foreground = subtle;
        c.border = border;
        c.input = border;
        c.secondary = muted;
        c.secondary_foreground = foreground;
        c.secondary_hover = hover;
        c.secondary_active = hover;
        c.accent = hover;
        c.accent_foreground = foreground;
        c.popover = background;
        c.popover_foreground = foreground;
        c.list = background;
        c.list_hover = muted;
        c.list_active = muted;
        c.ring = primary;
        c.skeleton = muted;
        c.slider_bar = primary;
        c.slider_thumb = primary;
        c.switch = primary;
        c.switch_thumb = on_primary;
    });
}
fn label(text: impl Into<SharedString>) -> Div {
    div().text_sm().child(text.into())
}
impl Render for SettingsSurface {
    fn render(&mut self, _window: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let colors = cx.theme();
        let bg = colors.background;
        let fg = colors.foreground;
        let border = colors.border;
        let muted = colors.muted_foreground;
        if self.load_blocked {
            return div().size_full().bg(bg).text_color(fg).p_6().flex().flex_col().gap_4()
                .child(div().text_2xl().child("Settings recovery required"))
                .child(self.message.clone())
                .child("The original file has not been changed. Recovery creates a byte-for-byte backup before writing defaults.")
                .child(Button::new("recover-settings").tooltip("Preserve original bytes in a backup before restoring defaults").label("Back up original and restore defaults")
                    .on_click(cx.listener(|s,_,w,cx|s.recover(w,cx))))
                .child(Button::new("retry-settings-load").label("Retry loading original")
                    .on_click(cx.listener(|s,_,w,cx|{
                        match Settings::load(&s.storage_path){
                            Ok(config)=>{s.replace(config,w,cx);s.load_blocked=false;apply_theme(&s.config,w,cx);s.error=false;s.message="Settings reloaded.".into();cx.emit(SettingsChanged{settings:s.config.clone()});},
                            Err(e)=>{s.message=format!("Settings still cannot be loaded: {e}");s.error=true;}
                        }cx.notify();
                    })))
                .into_any_element();
        }
        let mut body = div().flex().flex_col().gap_4();
        match self.section {
            0 => {
                body=body.child(label("Display name")).child(Input::new(&self.name))
                .child(label("Preferred language · demo preference")).child(Select::new(&self.language).id("settings-language").accessibility_label("Preferred language (demo)"))
                .child(label("Language is stored as a demo preference; this interface remains in English. No account or service is changed."));
            }
            1 => {
                body = body
                    .child(label("Color theme"))
                    .child(
                        Select::new(&self.theme)
                            .id("settings-theme")
                            .accessibility_label("Color theme"),
                    )
                    .child(label("Text size · 12–24 px"))
                    .child(Slider::new(&self.font))
                    .child(
                        div()
                            .p_4()
                            .border_1()
                            .border_color(border)
                            .rounded_lg()
                            .text_size(px(self.font.read(cx).value().start()))
                            .child("The quick brown fox jumps over the lazy dog."),
                    )
                    .child(label(
                        "Save changes to apply the selected application theme.",
                    ));
            }
            2 => {
                body = body
                    .child(label("How should the assistant respond?"))
                    .child(Input::new(&self.instructions))
                    .child(
                        Switch::new("memory")
                            .label("Remember demo preferences")
                            .checked(self.config.memory)
                            .on_change(cx.listener(|s, v, _, cx| {
                                s.config.memory = *v;
                                cx.notify();
                            })),
                    )
                    .child(label(
                        "Personalization is local demo data; it is not sent to a model.",
                    ));
            }
            3 => {
                body = body
                    .child(
                        Switch::new("notify")
                            .label("Show completion notifications")
                            .checked(self.config.notifications)
                            .on_change(cx.listener(|s, v, _, cx| {
                                s.config.notifications = *v;
                                cx.notify();
                            })),
                    )
                    .child(
                        Switch::new("sound")
                            .label("Notification sound preference")
                            .checked(self.config.sound)
                            .on_change(cx.listener(|s, v, _, cx| {
                                s.config.sound = *v;
                                cx.notify();
                            })),
                    )
                    .child(
                        Button::new("test-notification")
                            .tooltip("Show a local demo notification preview")
                            .label("Preview notification")
                            .on_click(cx.listener(|s, _, _, cx| {
                                s.message = if s.config.notifications {
                                    "Demo notification: Your task is ready."
                                } else {
                                    "Notifications are off. Enable them to preview."
                                }
                                .into();
                                s.error = false;
                                cx.notify();
                            })),
                    );
            }
            4 => {
                body = body
                    .child(label("Voice"))
                    .child(
                        Select::new(&self.voice)
                            .id("settings-voice")
                            .accessibility_label("Demo voice"),
                    )
                    .child(label(
                        "Simulated voice preview — no microphone, synthesis or audio service.",
                    ))
                    .child(
                        Button::new("voice-play")
                            .tooltip("Simulate a preview; no audio is played")
                            .label(if self.voice_preview {
                                "Stop simulated preview"
                            } else {
                                "Play simulated preview"
                            })
                            .on_click(cx.listener(|s, _, _, cx| {
                                s.voice_preview = !s.voice_preview;
                                cx.notify();
                            })),
                    )
                    .child(label(if self.voice_preview {
                        "▂ ▅ ▃ ▆ ▄  Preview playing (simulation): Hello, how can I help?"
                    } else {
                        "Preview stopped."
                    }));
            }
            5 => {
                body = body.child(label("Demo connections · no OAuth and no network access."));
                for provider in ["Google Drive", "GitHub", "Calendar"] {
                    let connected = *self.config.connections.get(provider).unwrap_or(&false);
                    let p = provider.to_string();
                    body = body.child(
                        div()
                            .flex()
                            .items_center()
                            .justify_between()
                            .gap_4()
                            .child(label(format!(
                                "{provider} · {}",
                                if connected {
                                    "Connected (demo)"
                                } else {
                                    "Not connected"
                                }
                            )))
                            .child(
                                Button::new(SharedString::from(format!("connect-{provider}")))
                                    .label(if connected {
                                        "Disconnect"
                                    } else {
                                        "Connect demo"
                                    })
                                    .on_click(cx.listener(move |s, _, _, cx| {
                                        if connected {
                                            s.config.connections.insert(p.clone(), false);
                                        } else {
                                            s.pending_connection = Some(p.clone());
                                        }
                                        cx.notify();
                                    })),
                            ),
                    );
                }
                if let Some(p) = self.pending_connection.clone() {
                    body = body.child(
                        div()
                            .p_4()
                            .border_1()
                            .border_color(border)
                            .rounded_lg()
                            .flex()
                            .flex_col()
                            .gap_3()
                            .child(label(format!(
                                "Allow {p} in this demo? This only changes local sample state."
                            )))
                            .child(
                                Button::new("confirm-connection")
                                    .primary()
                                    .label("Allow demo connection")
                                    .on_click(cx.listener(|s, _, _, cx| {
                                        if let Some(p) = s.pending_connection.take() {
                                            s.config.connections.insert(p, true);
                                        }
                                        cx.notify();
                                    })),
                            )
                            .child(Button::new("cancel-connection").label("Cancel").on_click(
                                cx.listener(|s, _, _, cx| {
                                    s.pending_connection = None;
                                    cx.notify();
                                }),
                            )),
                    );
                }
            }
            6 => {
                body=body.child(Switch::new("reduced-motion").label("Prefer reduced motion").checked(self.config.reduced_motion)
                .on_change(cx.listener(|s,v,_,cx|{s.config.reduced_motion=*v;cx.notify();})))
                .child(label("Preference is saved and sent to the application. The component kit has no global reduced-motion switch; this screen uses static transitions."))
                .child(label("Use Tab and Shift+Tab to move between native controls. Font size is available in Appearance."));
            }
            _ => {
                body=body.child(label("Edit demo shortcut mappings. Use Ctrl, Alt, Shift or Win plus a key. Duplicates are rejected on save."))
                .child(label("Stored mappings are a demo configuration; operating-system shortcuts are not registered."));
                for (name, input) in &self.hotkeys {
                    body = body.child(label(name.clone())).child(Input::new(input));
                }
            }
        }
        div()
            .size_full()
            .bg(bg)
            .text_color(fg)
            .flex()
            .p_6()
            .gap_6()
            .child(
                div()
                    .w(px(190.))
                    .flex_shrink_0()
                    .flex()
                    .flex_col()
                    .gap_2()
                    .child(div().text_xl().mb_4().child("Settings"))
                    .child(
                        gpui_kit::base::RadioGroup::new("settings-sections")
                            .axis(Axis::Vertical)
                            .flex()
                            .flex_col()
                            .gap_2()
                            .children(SECTIONS.iter().enumerate().map(|(i, title)| {
                                // The upstream styled group supplies semantics but no arrow navigation.
                                // Owned handles keep focus and the controlled selection on the same item.
                                gpui_kit::base::Radio::new(i)
                                    .checked(i == self.section)
                                    .track_focus(&self.section_focus[i])
                                    .tab_stop(i == self.section)
                                    .accessibility_label(*title)
                                    .set_position(i + 1, SECTIONS.len())
                                    .p_2()
                                    .rounded_md()
                                    .bg(if i == self.section {
                                        cx.theme().muted
                                    } else {
                                        bg
                                    })
                                    .child(*title)
                                    .on_click(cx.listener(move |s, _, window, cx| {
                                        s.section = i;
                                        window.focus(&s.section_focus[i], cx);
                                        cx.notify();
                                    }))
                                    .on_key_down(cx.listener(
                                        |s, event: &KeyDownEvent, window, cx| {
                                            let next = match event.keystroke.key.as_str() {
                                                "down" | "right" => {
                                                    Some((s.section + 1) % SECTIONS.len())
                                                }
                                                "up" | "left" => Some(
                                                    (s.section + SECTIONS.len() - 1)
                                                        % SECTIONS.len(),
                                                ),
                                                "home" => Some(0),
                                                "end" => Some(SECTIONS.len() - 1),
                                                _ => None,
                                            };
                                            if let Some(next) = next {
                                                s.section = next;
                                                window.focus(&s.section_focus[next], cx);
                                                cx.stop_propagation();
                                                cx.notify();
                                            }
                                        },
                                    ))
                            })),
                    ),
            )
            .child(
                div()
                    .id("settings-content")
                    .flex_1()
                    .min_w_0()
                    .overflow_y_scroll()
                    .flex()
                    .flex_col()
                    .gap_5()
                    .child(div().text_2xl().child(SECTIONS[self.section]))
                    .child(body)
                    .child(
                        div()
                            .mt_4()
                            .flex()
                            .gap_2()
                            .child(
                                Button::new("settings-save")
                                    .tooltip("Validate and save preferences on this device")
                                    .primary()
                                    .label("Save changes")
                                    .on_click(cx.listener(|s, _, w, cx| s.apply(w, cx))),
                            )
                            .child(
                                Button::new("settings-reload")
                                    .tooltip("Discard this draft and reload saved preferences")
                                    .label("Reload saved")
                                    .on_click(cx.listener(|s, _, w, cx| {
                                        match Settings::load(&s.storage_path) {
                                            Ok(v) => {
                                                s.replace(v, w, cx);
                                                apply_theme(&s.config, w, cx);
                                                s.load_blocked = false;
                                                s.message = "Reloaded local settings.".into();
                                                s.error = false;
                                            }
                                            Err(e) => {
                                                s.message = e;
                                                s.error = true;
                                                s.load_blocked = true;
                                            }
                                        }
                                        cx.notify();
                                    })),
                            )
                            .child(
                                Button::new("settings-reset")
                                    .tooltip("Reset the draft only; Save changes to keep defaults")
                                    .label("Reset draft")
                                    .on_click(cx.listener(|s, _, w, cx| {
                                        s.replace(Settings::default(), w, cx);
                                        s.message =
                                            "Defaults restored in draft. Save to persist.".into();
                                        s.error = false;
                                        cx.notify();
                                    })),
                            ),
                    )
                    .child(
                        div()
                            .p_3()
                            .rounded_lg()
                            .border_1()
                            .border_color(border)
                            .text_color(if self.error {
                                rgb(0xe56b6f).into()
                            } else {
                                muted
                            })
                            .child(self.message.clone()),
                    ),
            )
            .into_any_element()
    }
}
#[cfg(test)]
mod tests {
    use super::Settings;
    #[test]
    fn temporary_names_are_unique_across_concurrent_callers() {
        let workers = (0..8)
            .map(|_| {
                std::thread::spawn(|| (0..256).map(|_| super::unique_stamp()).collect::<Vec<_>>())
            })
            .collect::<Vec<_>>();
        let names = workers
            .into_iter()
            .flat_map(|worker| worker.join().unwrap())
            .collect::<std::collections::HashSet<_>>();
        assert_eq!(names.len(), 8 * 256);
    }
    #[test]
    fn duplicate_modifiers_order_is_rejected() {
        let mut s = Settings::default();
        s.hotkeys.insert("A".into(), "Ctrl+Shift+K".into());
        s.hotkeys.insert("B".into(), "shift+ctrl+k".into());
        assert!(s.validate().is_err());
    }
    #[test]
    fn invalid_font_rejected() {
        let mut s = Settings::default();
        s.font_size = 80;
        assert!(s.validate().is_err());
    }
    #[test]
    fn persistence_rejects_invalid_without_overwriting() {
        let path = std::env::temp_dir().join(format!(
            "native-settings-{}-{}.json",
            std::process::id(),
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap()
                .as_nanos()
        ));
        let initial = Settings::default();
        initial.save(&path).unwrap();
        let mut invalid = initial.clone();
        invalid.font_size = 255;
        assert!(invalid.save(&path).is_err());
        assert_eq!(Settings::load(&path).unwrap(), initial);
        std::fs::remove_file(path).unwrap();
    }
    #[test]
    fn corrupt_save_is_blocked_and_recovery_keeps_backup() {
        let path = std::env::temp_dir().join(format!(
            "native-settings-corrupt-{}-{}.json",
            std::process::id(),
            super::unique_stamp()
        ));
        let original = b"{broken settings";
        std::fs::write(&path, original).unwrap();
        assert!(Settings::default().save(&path).is_err());
        assert_eq!(std::fs::read(&path).unwrap(), original);
        let backup = Settings::recover_defaults(&path).unwrap();
        assert_eq!(std::fs::read(&backup).unwrap(), original);
        assert_eq!(Settings::load(&path).unwrap(), Settings::default());
        std::fs::remove_file(path).unwrap();
        std::fs::remove_file(backup).unwrap();
    }
    #[test]
    fn replacement_updates_existing_valid_settings() {
        let path = std::env::temp_dir().join(format!(
            "native-settings-replace-{}-{}.json",
            std::process::id(),
            super::unique_stamp()
        ));
        let mut settings = Settings::default();
        settings.save(&path).unwrap();
        settings.font_size = 18;
        settings.save(&path).unwrap();
        assert_eq!(Settings::load(&path).unwrap().font_size, 18);
        std::fs::remove_file(path).unwrap();
    }
    #[test]
    fn roundtrip() {
        let s = Settings::default();
        let text = serde_json::to_vec(&s).unwrap();
        assert_eq!(s, serde_json::from_slice::<Settings>(&text).unwrap());
    }
}

#[cfg(all(test, feature = "ui-tests"))]
mod ui_tests;
