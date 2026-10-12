//! Stateful local demo tools. Terminal commands never enter a system shell.
use gpui_kit::component::button::Button;
use gpui_kit::component::checkbox::Checkbox;
use gpui_kit::component::date_picker::{DatePicker, DatePickerState, DateTime};
use gpui_kit::component::input::{Input, InputEvent, InputState};
use gpui_kit::component::resizable::{ResizableState, h_resizable, resizable_panel};
use gpui_kit::component::select::{Select, SelectState};
use gpui_kit::component::time_field::TimePrecision;
use gpui_kit::component::{ActiveTheme, Disableable, IndexPath};
use gpui_kit::{prelude::*, *};
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ToolKind {
    Automations,
    Connectors,
    Browser,
    CodeReview,
    Terminal,
}
#[derive(Clone, Debug)]
pub struct Automation {
    pub title: String,
    pub prompt: String,
    pub frequency: String,
    pub starts_at: Option<String>,
    pub paused: bool,
    pub runs: Vec<String>,
}
#[derive(Clone, Debug)]
pub struct Connector {
    pub name: String,
    pub description: String,
    pub connected: bool,
    pub read: bool,
    pub write: bool,
}
#[derive(Clone, Debug)]
pub struct ReviewFile {
    pub path: String,
    pub before: Vec<String>,
    pub after: Vec<String>,
    pub staged: bool,
    pub comments: Vec<String>,
}
#[derive(Clone, Debug)]
pub struct ToolState {
    pub automations: Vec<Automation>,
    pub connectors: Vec<Connector>,
    pub files: Vec<ReviewFile>,
    pub selected: usize,
    pub split: bool,
    pub selected_line: usize,
    pub terminal: Vec<String>,
}
impl Default for ToolState {
    fn default() -> Self {
        Self {
            automations: vec![Automation {
                title: "Morning briefing".into(),
                prompt: "Summarize project priorities".into(),
                frequency: "Daily".into(),
                starts_at: None,
                paused: false,
                runs: vec!["Demo run 1 · Completed · 3 priorities prepared".into()],
            }],
            connectors: [
                ("GitHub", "Repositories, issues and pull requests"),
                ("Google Drive", "Documents and shared files"),
                ("Calendar", "Events and availability"),
                ("Slack", "Channels and team messages"),
            ]
            .into_iter()
            .map(|(name, description)| Connector {
                name: name.into(),
                description: description.into(),
                connected: false,
                read: true,
                write: false,
            })
            .collect(),
            files: vec![
                ReviewFile {
                    path: "src/theme.rs".into(),
                    before: vec![
                        "pub const SURFACE: u32 = 0x202020;".into(),
                        "pub const RADIUS: f32 = 8.0;".into(),
                    ],
                    after: vec![
                        "pub const SURFACE: u32 = 0x181818;".into(),
                        "pub const RADIUS: f32 = 12.0;".into(),
                    ],
                    staged: false,
                    comments: vec![],
                },
                ReviewFile {
                    path: "README.md".into(),
                    before: vec!["# Workspace".into(), "Prototype".into()],
                    after: vec![
                        "# Native Workspace".into(),
                        "A functional Windows demo built in Rust.".into(),
                    ],
                    staged: false,
                    comments: vec![],
                },
            ],
            selected: 0,
            split: true,
            selected_line: 0,
            terminal: vec![
                "Native Workspace · safe demo terminal".into(),
                "Type help to see available commands. No commands execute on your computer.".into(),
            ],
        }
    }
}
impl ToolState {
    pub fn save_automation(
        &mut self,
        edit: Option<usize>,
        title: &str,
        prompt: &str,
        frequency: &str,
    ) -> Result<(), String> {
        if title.trim().is_empty() || prompt.trim().is_empty() {
            return Err("Add a title and instructions".into());
        }
        if !["Daily", "Weekdays", "Weekly", "Once"].contains(&frequency) {
            return Err("Choose a supported schedule.".into());
        }
        let task = Automation {
            title: title.trim().into(),
            prompt: prompt.into(),
            frequency: frequency.into(),
            starts_at: None,
            paused: false,
            runs: vec![],
        };
        if let Some(i) = edit {
            let old = self.automations.get_mut(i).ok_or("Task no longer exists")?;
            old.title = task.title;
            old.prompt = task.prompt;
            old.frequency = task.frequency;
        } else {
            self.automations.push(task);
        }
        Ok(())
    }
    pub fn run_automation(&mut self, index: usize) -> Result<(), String> {
        let task = self.automations.get_mut(index).ok_or("Task not found")?;
        task.runs.push(format!(
            "Demo run {} · Completed · {}",
            task.runs.len() + 1,
            task.prompt
        ));
        Ok(())
    }
    pub fn command(&mut self, command: &str) {
        let command = command.trim();
        if command.is_empty() {
            return;
        }
        if command == "clear" {
            self.terminal.clear();
            return;
        }
        self.terminal.push(format!("> {command}"));
        self.terminal.push(match command{"help"=>"help            Show commands\nls              List demo files\ncat README.md   Read demo document\ncat src/theme.rs Read demo source\npwd             Show virtual path\nclear           Clear output".into(),"ls"=>"README.md\nsrc/theme.rs\nnotes.md".into(),"pwd"=>"demo:/workspace (virtual)".into(),"cat README.md"=>"# Native Workspace\nA local functional frontend demo. No live backend.".into(),"cat src/theme.rs"=>self.files[0].after.join("\n"),"cat notes.md"=>"Review spacing, test keyboard navigation, and refine the composer.".into(),_=>"Unknown demo command. Type help. System shell execution is disabled.".into()});
    }
}
#[derive(Clone)]
enum Action {
    Select(usize),
    NewTask,
    EditTask(usize),
    SaveTask,
    CancelEdit,
    Pause(usize),
    Run(usize),
    DeleteTask(usize),
    Connect(usize),
    Read(usize),
    Write(usize),
    Search,
    Split,
    ResizeDiff(f32),
    Stage,
    Revert,
    Line(usize),
    Comment,
    DeleteComment(usize),
    Command,
    Clear,
    LaunchBrowser,
}
pub struct ToolSurface {
    pub kind: ToolKind,
    pub state: ToolState,
    title: Entity<InputState>,
    prompt: Entity<InputState>,
    frequency: Entity<SelectState<Vec<SharedString>>>,
    starts_at: Entity<DatePickerState>,
    entry: Entity<InputState>,
    editing: Option<usize>,
    show_editor: bool,
    diff_sizes: Entity<ResizableState>,
    filter: String,
    notice: String,
}
impl ToolSurface {
    pub fn new(kind: ToolKind, window: &mut Window, cx: &mut Context<Self>) -> Self {
        let view = Self {
            kind,
            state: ToolState::default(),
            title: cx.new(|cx| InputState::new(window, cx).placeholder("Task name")),
            prompt: cx
                .new(|cx| InputState::new(window, cx).placeholder("What should this task do?")),
            frequency: cx.new(|cx| {
                SelectState::new(
                    ["Daily", "Weekdays", "Weekly", "Once"]
                        .iter()
                        .map(|s| SharedString::from(*s))
                        .collect(),
                    Some(IndexPath::default().row(0)),
                    window,
                    cx,
                )
            }),
            starts_at: cx
                .new(|cx| DatePickerState::new(window, cx).time_precision(TimePrecision::Minute)),
            entry: cx.new(|cx| {
                InputState::new(window, cx).placeholder(match kind {
                    ToolKind::Connectors => "Search apps",
                    ToolKind::CodeReview => "Write a review comment",
                    ToolKind::Terminal => "Enter a demo command",
                    _ => "Search",
                })
            }),
            editing: None,
            show_editor: false,
            diff_sizes: cx.new(|_| ResizableState::default()),
            filter: String::new(),
            notice: String::new(),
        };
        cx.subscribe_in(
            &view.entry,
            window,
            |this, _, event, window, cx| match event {
                InputEvent::PressEnter { .. } => match this.kind {
                    ToolKind::Terminal => this.act(Action::Command, window, cx),
                    ToolKind::CodeReview => this.act(Action::Comment, window, cx),
                    ToolKind::Connectors => this.act(Action::Search, window, cx),
                    _ => (),
                },
                InputEvent::Change if this.kind == ToolKind::Connectors => {
                    this.act(Action::Search, window, cx)
                }
                _ => (),
            },
        )
        .detach();
        view
    }
    fn act(&mut self, action: Action, window: &mut Window, cx: &mut Context<Self>) {
        match action {
            Action::Select(i) => {
                self.state.selected = i;
                self.state.selected_line = 0;
            }
            Action::NewTask => {
                self.editing = None;
                self.show_editor = true;
                self.title.update(cx, |s, cx| s.set_value("", window, cx));
                self.prompt.update(cx, |s, cx| s.set_value("", window, cx));
                self.frequency.update(cx, |s, cx| {
                    s.set_selected_index(Some(IndexPath::default().row(0)), window, cx)
                });
                self.starts_at.update(cx, |s, cx| {
                    s.set_date_time(DateTime::Single(None), window, cx)
                });
            }
            Action::EditTask(i) => {
                if let Some(t) = self.state.automations.get(i) {
                    let (title, prompt, frequency) =
                        (t.title.clone(), t.prompt.clone(), t.frequency.clone());
                    self.title
                        .update(cx, |s, cx| s.set_value(title, window, cx));
                    self.prompt
                        .update(cx, |s, cx| s.set_value(prompt, window, cx));
                    let selected = ["Daily", "Weekdays", "Weekly", "Once"]
                        .iter()
                        .position(|s| *s == frequency)
                        .unwrap_or(0);
                    self.frequency.update(cx, |s, cx| {
                        s.set_selected_index(Some(IndexPath::default().row(selected)), window, cx)
                    });
                    let start = t.starts_at.as_ref().and_then(|s| {
                        chrono::NaiveDateTime::parse_from_str(s, "%Y-%m-%d %H:%M").ok()
                    });
                    self.starts_at.update(cx, |s, cx| {
                        s.set_date_time(DateTime::Single(start), window, cx)
                    });
                    self.editing = Some(i);
                    self.show_editor = true;
                }
            }
            Action::SaveTask => {
                let frequency = self
                    .frequency
                    .read(cx)
                    .selected_value()
                    .map(|s| s.to_string())
                    .unwrap_or_default();
                let start = self.starts_at.read(cx).date_time().start();
                if start.is_none() {
                    self.notice = "Choose a start date and time.".into();
                    cx.notify();
                    return;
                }
                match self.state.save_automation(
                    self.editing,
                    &self.title.read(cx).value(),
                    &self.prompt.read(cx).value(),
                    &frequency,
                ) {
                    Ok(()) => {
                        let index = self.editing.unwrap_or(self.state.automations.len() - 1);
                        self.state.automations[index].starts_at =
                            start.map(|d| d.format("%Y-%m-%d %H:%M").to_string());
                        self.show_editor = false;
                        self.notice = "Task saved locally for this demo session".into();
                    }
                    Err(e) => self.notice = e,
                }
            }
            Action::CancelEdit => self.show_editor = false,
            Action::Pause(i) => {
                if let Some(t) = self.state.automations.get_mut(i) {
                    t.paused = !t.paused;
                }
            }
            Action::Run(i) => {
                self.notice = match self.state.run_automation(i) {
                    Ok(()) => "Demo run completed. See run history below.".into(),
                    Err(e) => e,
                };
            }
            Action::DeleteTask(i) => {
                if i < self.state.automations.len() {
                    self.state.automations.remove(i);
                    if self.editing == Some(i) {
                        self.show_editor = false;
                    }
                    self.editing = editor_after_delete(self.editing, i);
                    self.notice = "Task removed".into();
                }
            }
            Action::Connect(i) => {
                if let Some(c) = self.state.connectors.get_mut(i) {
                    c.connected = !c.connected;
                    if !c.connected {
                        c.write = false;
                    }
                    self.notice = if c.connected {
                        "Demo connection enabled; no account authorization was performed"
                    } else {
                        "Demo connection revoked"
                    }
                    .into();
                }
            }
            Action::Read(i) => {
                if let Some(c) = self.state.connectors.get_mut(i) {
                    if c.connected {
                        c.read = !c.read;
                    }
                }
            }
            Action::Write(i) => {
                if let Some(c) = self.state.connectors.get_mut(i) {
                    if c.connected {
                        c.write = !c.write;
                    }
                }
            }
            Action::Search => self.filter = self.entry.read(cx).value().to_lowercase(),
            Action::Split => self.state.split = !self.state.split,
            Action::ResizeDiff(delta) => {
                let width = self
                    .diff_sizes
                    .read(cx)
                    .sizes()
                    .first()
                    .copied()
                    .unwrap_or(px(300.));
                self.diff_sizes
                    .update(cx, |s, cx| s.resize_panel(0, width + px(delta), window, cx));
            }
            Action::Stage => {
                if let Some(f) = self.state.files.get_mut(self.state.selected) {
                    f.staged = !f.staged;
                }
            }
            Action::Revert => {
                if let Some(f) = self.state.files.get_mut(self.state.selected) {
                    f.after = f.before.clone();
                    f.staged = false;
                    self.notice = "Demo file reverted".into();
                }
            }
            Action::Line(i) => self.state.selected_line = i,
            Action::Comment => {
                let value = self.entry.read(cx).value().to_string();
                if value.trim().is_empty() {
                    self.notice = "Write a comment first".into();
                } else if let Some(f) = self.state.files.get_mut(self.state.selected) {
                    f.comments.push(format!(
                        "Diff row {} · {}",
                        self.state.selected_line + 1,
                        value
                    ));
                    self.entry.update(cx, |s, cx| s.set_value("", window, cx));
                }
            }
            Action::DeleteComment(i) => {
                if let Some(f) = self.state.files.get_mut(self.state.selected) {
                    if i < f.comments.len() {
                        f.comments.remove(i);
                    }
                }
            }
            Action::Command => {
                let command = self.entry.read(cx).value().to_string();
                self.state.command(&command);
                self.entry.update(cx, |s, cx| s.set_value("", window, cx));
            }
            Action::Clear => self.state.terminal.clear(),
            Action::LaunchBrowser => {
                self.notice = match launch_browser() {
                    Ok(()) => "WebView2 content host opened in its own native window".into(),
                    Err(e) => e,
                };
            }
        }
        cx.notify();
    }
    fn button(
        &self,
        label: impl Into<SharedString>,
        key: usize,
        action: Action,
        cx: &mut Context<Self>,
    ) -> impl IntoElement {
        Button::new(("tool-button", key))
            .label(label)
            .on_click(cx.listener(move |this, _, window, cx| this.act(action.clone(), window, cx)))
    }
    fn automation_view(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut view = div().flex().flex_col().gap_4().child(self.button(
            "+ New scheduled task",
            0,
            Action::NewTask,
            cx,
        ));
        if self.show_editor {
            view = view.child(
                div()
                    .p_4()
                    .rounded_xl()
                    .bg(cx.theme().colors.muted)
                    .flex()
                    .flex_col()
                    .gap_3()
                    .child("Task editor")
                    .child(Input::new(&self.title))
                    .child(Input::new(&self.prompt))
                    .child(
                        div()
                            .flex()
                            .gap_3()
                            .child(Select::new(&self.frequency))
                            .child(
                                DatePicker::new(&self.starts_at).placeholder("Start date and time"),
                            ),
                    )
                    .child(
                        div()
                            .text_sm()
                            .child("Local demo schedule · does not run in the background"),
                    )
                    .child(
                        div()
                            .flex()
                            .gap_2()
                            .child(self.button("Save task", 1, Action::SaveTask, cx))
                            .child(self.button("Cancel", 2, Action::CancelEdit, cx)),
                    ),
            );
        }
        for (i, t) in self.state.automations.iter().enumerate() {
            let mut card = div()
                .p_4()
                .rounded_xl()
                .border_1()
                .border_color(cx.theme().colors.border)
                .flex()
                .flex_col()
                .gap_2()
                .child(div().text_lg().child(t.title.clone()))
                .child(t.prompt.clone())
                .child(
                    div()
                        .text_sm()
                        .text_color(cx.theme().colors.muted_foreground)
                        .child(format!(
                            "{} · {}",
                            format!(
                                "{} · {}",
                                t.frequency,
                                t.starts_at.as_deref().unwrap_or("Choose start in Edit")
                            ),
                            if t.paused { "Paused" } else { "Active" }
                        )),
                )
                .child(
                    div()
                        .flex()
                        .gap_2()
                        .child(self.button("Edit", 100 + i * 5, Action::EditTask(i), cx))
                        .child(self.button(
                            if t.paused { "Resume" } else { "Pause" },
                            101 + i * 5,
                            Action::Pause(i),
                            cx,
                        ))
                        .child(self.button("Run demo", 102 + i * 5, Action::Run(i), cx))
                        .child(self.button("Delete", 103 + i * 5, Action::DeleteTask(i), cx)),
                );
            for run in t.runs.iter().rev().take(5) {
                card = card.child(div().text_sm().text_color(rgb(0xa8d7be)).child(run.clone()));
            }
            view = view.child(card);
        }
        if self.state.automations.is_empty() {
            view = view.child("No scheduled tasks. Create one to get started.");
        }
        view.into_any_element()
    }
    fn connectors_view(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut view = div().flex().flex_col().gap_4().child(
            div()
                .flex()
                .gap_2()
                .child(Input::new(&self.entry))
                .child(self.button("Search", 0, Action::Search, cx)),
        );
        let mut matches = 0;
        for (i, c) in self
            .state
            .connectors
            .iter()
            .enumerate()
            .filter(|(_, c)| c.name.to_lowercase().contains(&self.filter))
        {
            matches += 1;
            view = view.child(
                div()
                    .p_4()
                    .rounded_xl()
                    .border_1()
                    .border_color(cx.theme().colors.border)
                    .flex()
                    .flex_col()
                    .gap_3()
                    .child(div().text_lg().child(format!(
                        "{}  {}",
                        c.name,
                        if c.connected {
                            "· Connected (demo)"
                        } else {
                            ""
                        }
                    )))
                    .child(c.description.clone())
                    .child(
                        div()
                            .flex()
                            .gap_2()
                            .child(self.button(
                                if c.connected {
                                    "Revoke connection"
                                } else {
                                    "Connect demo"
                                },
                                10 + i * 4,
                                Action::Connect(i),
                                cx,
                            ))
                            .child(
                                Checkbox::new(("connector-read", i))
                                    .label("Read access")
                                    .checked(c.read)
                                    .disabled(!c.connected)
                                    .tooltip("Allow this demo connection to read fixture content")
                                    .on_click(cx.listener(move |this, _, window, cx| {
                                        this.act(Action::Read(i), window, cx)
                                    })),
                            )
                            .child(
                                Checkbox::new(("connector-write", i))
                                    .label("Write access")
                                    .checked(c.write)
                                    .disabled(!c.connected)
                                    .tooltip("Allow this demo connection to modify fixture content")
                                    .on_click(cx.listener(move |this, _, window, cx| {
                                        this.act(Action::Write(i), window, cx)
                                    })),
                            ),
                    ),
            );
        }
        if matches == 0 {
            view = view.child("No apps match your search.");
        }
        view.into_any_element()
    }
    fn review_view(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut nav = div().flex().gap_2();
        for (i, f) in self.state.files.iter().enumerate() {
            nav = nav.child(self.button(
                format!(
                    "{}{}",
                    if self.state.selected == i { "● " } else { "" },
                    f.path
                ),
                10 + i,
                Action::Select(i),
                cx,
            ));
        }
        let mut view =
            div()
                .flex()
                .flex_col()
                .gap_4()
                .child(nav)
                .child(div().flex().gap_2().child(self.button(
                    if self.state.split {
                        "Split → Unified"
                    } else {
                        "Unified → Split"
                    },
                    0,
                    Action::Split,
                    cx,
                )));
        if let Some(file) = self.state.files.get(self.state.selected) {
            view = view.child(
                div()
                    .flex()
                    .gap_2()
                    .child(self.button(
                        if file.staged {
                            "Unstage file"
                        } else {
                            "Stage file"
                        },
                        1,
                        Action::Stage,
                        cx,
                    ))
                    .child(self.button("Revert demo file", 2, Action::Revert, cx))
                    .when(self.state.split, |row| {
                        row.child(self.button("Narrow before", 4, Action::ResizeDiff(-40.), cx))
                            .child(self.button("Widen before", 5, Action::ResizeDiff(40.), cx))
                    }),
            );
            let mut left = div()
                .id("diff-before")
                .h_full()
                .overflow_y_scroll()
                .flex()
                .flex_col()
                .gap_2();
            let mut right = div()
                .id("diff-after")
                .h_full()
                .overflow_y_scroll()
                .flex()
                .flex_col()
                .gap_2();
            for (i, (before, after)) in diff_rows(&file.before, &file.after).into_iter().enumerate()
            {
                let equal = before.is_some() && before == after;
                let old = before
                    .map(|s| format!("{} {}", if equal { " " } else { "−" }, s))
                    .unwrap_or_default();
                let new = after
                    .map(|s| format!("{} {}", if equal { " " } else { "+" }, s))
                    .unwrap_or_default();
                let equal_color = cx.theme().colors.foreground;
                if self.state.split {
                    let bg = if self.state.selected_line == i {
                        cx.theme().colors.accent
                    } else {
                        cx.theme().colors.muted
                    };
                    left = left.child(
                        div()
                            .min_h(px(74.))
                            .p_3()
                            .bg(bg)
                            .child(self.button(
                                format!("{} · before", i + 1),
                                500 + i,
                                Action::Line(i),
                                cx,
                            ))
                            .child(
                                div()
                                    .text_color(if equal {
                                        equal_color
                                    } else {
                                        rgb(0xca6464).into()
                                    })
                                    .child(old),
                            ),
                    );
                    right = right.child(
                        div()
                            .min_h(px(74.))
                            .p_3()
                            .bg(bg)
                            .child(self.button(
                                format!("{} · after", i + 1),
                                1500 + i,
                                Action::Line(i),
                                cx,
                            ))
                            .child(
                                div()
                                    .text_color(if equal {
                                        equal_color
                                    } else {
                                        rgb(0x398865).into()
                                    })
                                    .child(new),
                            ),
                    );
                    continue;
                }
                let line = div()
                    .flex()
                    .flex_col()
                    .when(!old.is_empty(), |v| {
                        v.child(
                            div()
                                .text_color(if equal {
                                    equal_color
                                } else {
                                    rgb(0xca6464).into()
                                })
                                .child(old),
                        )
                    })
                    .when(!equal && !new.is_empty(), |v| {
                        v.child(div().text_color(rgb(0x398865)).child(new))
                    });
                view = view.child(
                    div()
                        .p_3()
                        .rounded_lg()
                        .bg(rgb(if self.state.selected_line == i {
                            0x333b41
                        } else {
                            0x242424
                        }))
                        .child(self.button(
                            format!("Select diff row {}", i + 1),
                            500 + i,
                            Action::Line(i),
                            cx,
                        ))
                        .child(line),
                );
            }
            if self.state.split {
                view = view.child(
                    h_resizable("review-split")
                        .with_state(&self.diff_sizes)
                        .size(px(340.))
                        .child(
                            resizable_panel()
                                .size(px(450.))
                                .size_range(px(140.)..px(1800.))
                                .child(left),
                        )
                        .child(
                            resizable_panel()
                                .size(px(450.))
                                .size_range(px(140.)..px(1800.))
                                .child(right),
                        ),
                );
            }
            view = view.child(
                div()
                    .flex()
                    .gap_2()
                    .child(Input::new(&self.entry))
                    .child(self.button("Add comment", 3, Action::Comment, cx)),
            );
            for (i, c) in file.comments.iter().enumerate() {
                view = view.child(
                    div()
                        .flex()
                        .items_center()
                        .justify_between()
                        .child(c.clone())
                        .child(self.button("Remove", 100 + i, Action::DeleteComment(i), cx)),
                );
            }
        }
        view.into_any_element()
    }
    fn terminal_view(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut output = div()
            .id("terminal-output")
            .h(px(380.))
            .overflow_y_scroll()
            .p_4()
            .rounded_xl()
            .bg(cx.theme().colors.muted)
            .font_family("Consolas")
            .flex()
            .flex_col()
            .gap_2();
        for text in &self.state.terminal {
            for line in text.lines() {
                output = output.child(line.to_string());
            }
        }
        div()
            .flex()
            .flex_col()
            .gap_4()
            .child(output)
            .child(
                div()
                    .flex()
                    .gap_2()
                    .child(Input::new(&self.entry))
                    .child(self.button("Run", 0, Action::Command, cx))
                    .child(self.button("Clear", 1, Action::Clear, cx)),
            )
            .into_any_element()
    }
}
impl Render for ToolSurface {
    fn render(&mut self, _: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let (title, description) = match self.kind {
            ToolKind::Automations => (
                "Scheduled tasks",
                "Create tasks, edit instructions and inspect demo run history.",
            ),
            ToolKind::Connectors => (
                "Apps & connections",
                "Explore connection and permission states with local demo data.",
            ),
            ToolKind::Browser => (
                "Web content",
                "A separate Rust WebView2 host renders local interactive pages.",
            ),
            ToolKind::CodeReview => (
                "Code review",
                "Compare changes, stage demo files and leave line comments.",
            ),
            ToolKind::Terminal => (
                "Terminal",
                "A safe local command simulation, with no system shell access.",
            ),
        };
        let body=match self.kind{ToolKind::Automations=>self.automation_view(cx),ToolKind::Connectors=>self.connectors_view(cx),ToolKind::CodeReview=>self.review_view(cx),ToolKind::Terminal=>self.terminal_view(cx),ToolKind::Browser=>div().p_6().rounded_xl().border_1().border_color(cx.theme().colors.border).flex().flex_col().gap_4().child("Local preview browser").child("Open home, edit notes, explore a dashboard, and use back / forward / reload in the preview window.").child(self.button("Open WebView2 preview",0,Action::LaunchBrowser,cx)).into_any_element()};
        div()
            .id("tool-surface")
            .size_full()
            .overflow_y_scroll()
            .p_6()
            .bg(cx.theme().colors.background)
            .text_color(cx.theme().colors.foreground)
            .flex()
            .flex_col()
            .gap_4()
            .child(div().text_2xl().child(title))
            .child(
                div()
                    .text_color(cx.theme().colors.muted_foreground)
                    .child(description),
            )
            .child(body)
            .when(!self.notice.is_empty(), |v| {
                v.child(
                    div()
                        .p_3()
                        .rounded_lg()
                        .bg(cx.theme().colors.muted)
                        .text_color(cx.theme().colors.foreground)
                        .child(self.notice.clone()),
                )
            })
    }
}
fn launch_browser() -> Result<(), String> {
    let exe = std::env::current_exe().map_err(|e| e.to_string())?;
    let host = exe
        .parent()
        .ok_or("Executable directory unavailable")?
        .join("native-web-host.exe");
    if !host.is_file() {
        return Err(
            "Build native-web-host and place native-web-host.exe beside this application".into(),
        );
    }
    let mut command = std::process::Command::new(host);
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        command.creation_flags(0x08000000);
    }
    command
        .spawn()
        .map(|_| ())
        .map_err(|e| format!("Cannot open WebView2 host: {e}"))
}
#[cfg(test)]
mod tests {
    use super::ToolState;
    #[test]
    fn terminal_never_executes_shell() {
        let mut s = ToolState::default();
        s.command("powershell Remove-Item anything");
        assert!(s.terminal.last().unwrap().contains("disabled"));
        s.command("ls");
        assert!(s.terminal.last().unwrap().contains("README.md"));
        s.command("clear");
        assert!(s.terminal.is_empty());
    }
    #[test]
    fn task_edit_preserves_runs_and_pause() {
        let mut s = ToolState::default();
        s.automations[0].paused = true;
        s.save_automation(Some(0), "Updated", "New prompt", "Weekly")
            .unwrap();
        assert!(s.automations[0].paused);
        assert_eq!(s.automations[0].runs.len(), 1);
        s.run_automation(0).unwrap();
        assert_eq!(s.automations[0].runs.len(), 2);
    }
    #[test]
    fn unsupported_schedule_does_not_mutate() {
        let mut s = ToolState::default();
        assert!(
            s.save_automation(Some(0), "Changed", "prompt", "arbitrary text")
                .is_err()
        );
        assert_eq!(s.automations[0].title, "Morning briefing");
    }
    #[test]
    fn invalid_task_does_not_create() {
        let mut s = ToolState::default();
        assert!(s.save_automation(None, " ", "prompt", "Daily").is_err());
        assert_eq!(s.automations.len(), 1);
        assert!(s.run_automation(90).is_err());
    }
}

fn editor_after_delete(editing: Option<usize>, deleted: usize) -> Option<usize> {
    editing.and_then(|i| {
        if i == deleted {
            None
        } else {
            Some(if i > deleted { i - 1 } else { i })
        }
    })
}
/// LCS rows preserve unchanged context and every added or removed line.
fn diff_rows<'a>(
    before: &'a [String],
    after: &'a [String],
) -> Vec<(Option<&'a str>, Option<&'a str>)> {
    let mut lengths = vec![vec![0; after.len() + 1]; before.len() + 1];
    for i in (0..before.len()).rev() {
        for j in (0..after.len()).rev() {
            lengths[i][j] = if before[i] == after[j] {
                lengths[i + 1][j + 1] + 1
            } else {
                lengths[i + 1][j].max(lengths[i][j + 1])
            };
        }
    }
    let (mut i, mut j) = (0, 0);
    let mut rows = vec![];
    while i < before.len() || j < after.len() {
        if i < before.len() && j < after.len() && before[i] == after[j] {
            rows.push((Some(before[i].as_str()), Some(after[j].as_str())));
            i += 1;
            j += 1;
        } else if i < before.len() && (j == after.len() || lengths[i + 1][j] >= lengths[i][j + 1]) {
            rows.push((Some(before[i].as_str()), None));
            i += 1;
        } else {
            rows.push((None, Some(after[j].as_str())));
            j += 1;
        }
    }
    rows
}
#[cfg(test)]
mod regressions {
    use super::{diff_rows, editor_after_delete};
    #[test]
    fn deleting_earlier_task_keeps_editor_on_same_task() {
        assert_eq!(editor_after_delete(Some(2), 0), Some(1));
        assert_eq!(editor_after_delete(Some(1), 1), None);
        assert_eq!(editor_after_delete(Some(0), 2), Some(0));
    }
    #[test]
    fn diff_preserves_context_and_unequal_tails() {
        let old = vec!["a".into(), "b".into()];
        let new = vec!["a".into(), "x".into(), "y".into()];
        let rows = diff_rows(&old, &new);
        assert_eq!(rows[0], (Some("a"), Some("a")));
        assert_eq!(
            rows.iter().filter_map(|r| r.0).collect::<Vec<_>>(),
            vec!["a", "b"]
        );
        assert_eq!(
            rows.iter().filter_map(|r| r.1).collect::<Vec<_>>(),
            vec!["a", "x", "y"]
        );
    }
}

#[cfg(all(test, feature = "ui-tests"))]
mod ui_tests;
