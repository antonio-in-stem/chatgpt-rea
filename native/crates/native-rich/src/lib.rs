//! Reusable native fixture surfaces. Service behavior is explicitly simulated.
mod model;
mod persistence;
use gpui_kit::component::{
    ActiveTheme,
    button::Button,
    color_picker::{ColorPicker, ColorPickerEvent, ColorPickerState},
    input::{Input, InputEvent, InputState, Textarea, TextareaState},
    text::TextView,
};
use gpui_kit::*;
pub use model::{RichKind, RichModel, Slide};
use std::time::Duration;

#[derive(Clone)]
enum Action {
    Save,
    Preview,
    ApplyCell,
    Sort,
    AddRow,
    AddSlide,
    Duplicate,
    DeleteSlide,
    Previous,
    Next,
    MoveLeft,
    MoveRight,
    ZoomIn,
    ZoomOut,
    Rotate,
    AddNote,
    ClearNotes,
    Play,
    Record,
    Mute,
    Back,
    Forward,
    Reset,
    PanLeft,
    PanRight,
    PdfPrevious,
    PdfNext,
    Find,
    Plot,
    PointLeft,
    PointRight,
    TurnLeft,
    TurnRight,
    ChartStyle,
    DocBold,
    DocItalic,
    DocLink,
    DocList,
    DocFind,
    DocReplace,
    DocReplaceAll,
    ExtendRange,
    RangeLeft,
    RangeRight,
    RangeUp,
    RangeDown,
    CopyRange,
    FillRange,
    NarrowColumn,
    WideColumn,
}
pub struct RichSurface {
    kind: RichKind,
    model: RichModel,
    source: Entity<TextareaState>,
    title: Entity<InputState>,
    formula: Entity<InputState>,
    note: Entity<InputState>,
    find_query: Entity<InputState>,
    replace_with: Entity<InputState>,
    note_color: Entity<ColorPickerState>,
    preview: bool,
    status: String,
    load_error: Option<String>,
    storage_file: std::path::PathBuf,
    subscriptions: Vec<Subscription>,
    timer: Option<Task<()>>,
}
impl RichSurface {
    pub fn new(kind: RichKind, window: &mut Window, cx: &mut Context<Self>) -> Self {
        Self::with_storage(kind, storage_path(kind), window, cx)
    }
    /// Internal storage injection keeps UI integration tests isolated from user data.
    fn with_storage(
        kind: RichKind,
        storage_file: std::path::PathBuf,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) -> Self {
        let (loaded, load_error) = match persistence::load(&storage_file) {
            Ok(model) => (model, None),
            Err(error) => (None, Some(error)),
        };
        let status = if load_error.is_some() {
            "Saved data could not be loaded; surface blocked"
        } else if loaded.is_some() {
            "Restored local demo"
        } else {
            "Fixture ready"
        };
        let mut model = loaded.unwrap_or_default();
        model.playing = false;
        model.recording = false;
        let source_text = if kind == RichKind::Slides {
            model.slides[model.slide].body.clone()
        } else {
            model.document.clone()
        };
        let source = cx.new(|cx| {
            TextareaState::new(window, cx)
                .default_value(source_text)
                .rows(15)
        });
        let title = cx.new(|cx| {
            InputState::new(window, cx).default_value(model.slides[model.slide].title.clone())
        });
        let formula_value = if kind == RichKind::Document {
            "https://example.com".into()
        } else if kind == RichKind::Math {
            model.equation.clone()
        } else {
            model.cells[model.selected.0][model.selected.1].clone()
        };
        let formula = cx.new(|cx| InputState::new(window, cx).default_value(formula_value));
        let note = cx.new(|cx| InputState::new(window, cx).placeholder("Add an annotation…"));
        let find_query = cx.new(|cx| InputState::new(window, cx).placeholder("Find text…"));
        let replace_with = cx.new(|cx| InputState::new(window, cx).placeholder("Replace with…"));
        let note_color = cx.new(|cx| {
            ColorPickerState::new(window, cx).default_value(rgba(
                (model.annotation_color << 8) | model.annotation_opacity as u32,
            ))
        });
        let mut result = Self {
            kind,
            model,
            source,
            title,
            formula,
            note,
            find_query,
            replace_with,
            note_color,
            preview: false,
            status: status.into(),
            load_error,
            storage_file,
            subscriptions: vec![],
            timer: None,
        };
        result.subscriptions.push(cx.subscribe_in(
            &result.source,
            window,
            |this, state, event, _, cx| {
                if matches!(event, InputEvent::Change) {
                    let value = state.read(cx).value().to_string();
                    if this.kind == RichKind::Slides {
                        this.model.slides[this.model.slide].body = value;
                    } else {
                        this.model.document = value;
                    }
                    this.status = "Unsaved changes".into();
                    cx.notify();
                }
            },
        ));
        result.subscriptions.push(cx.subscribe_in(
            &result.title,
            window,
            |this, state, event, _, cx| {
                if matches!(event, InputEvent::Change) {
                    this.model.slides[this.model.slide].title = state.read(cx).value().to_string();
                    this.status = "Unsaved changes".into();
                    cx.notify();
                }
            },
        ));
        result.subscriptions.push(cx.subscribe_in(
            &result.formula,
            window,
            |this, _, event, window, cx| {
                if matches!(event, InputEvent::PressEnter { .. }) {
                    if this.kind == RichKind::Spreadsheet {
                        this.act(Action::ApplyCell, window, cx);
                    } else if this.kind == RichKind::Math {
                        this.act(Action::Plot, window, cx);
                    }
                }
            },
        ));
        result.subscriptions.push(cx.subscribe_in(
            &result.note_color,
            window,
            |this, _, event, _, cx| {
                if let ColorPickerEvent::Change(Some(color)) = event {
                    let color = color.to_rgb();
                    this.model.annotation_color = (((color.r * 255.).round() as u32) << 16)
                        | (((color.g * 255.).round() as u32) << 8)
                        | ((color.b * 255.).round() as u32);
                    this.model.annotation_opacity = (color.a * 255.).round() as u8;
                    this.status = "New annotation color selected".into();
                    cx.notify();
                }
            },
        ));
        if kind == RichKind::Media {
            result.timer = Some(cx.spawn(async move |this, cx| {
                loop {
                    cx.background_executor().timer(Duration::from_secs(1)).await;
                    if this
                        .update(cx, |this, cx| {
                            if this.model.playing || this.model.recording {
                                this.model.tick();
                                cx.notify();
                            }
                        })
                        .is_err()
                    {
                        break;
                    }
                }
            }));
        }
        result
    }
    fn button(
        &self,
        id: &'static str,
        label: &str,
        action: Action,
        cx: &mut Context<Self>,
    ) -> Button {
        Button::new(id)
            .label(label.to_string())
            .on_click(cx.listener(move |this, _, window, cx| this.act(action.clone(), window, cx)))
    }
    fn sync_slide(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        let slide = &self.model.slides[self.model.slide];
        self.source
            .update(cx, |s, cx| s.set_value(slide.body.clone(), window, cx));
        self.title
            .update(cx, |s, cx| s.set_value(slide.title.clone(), window, cx));
    }
    fn select_cell(&mut self, row: usize, col: usize, window: &mut Window, cx: &mut Context<Self>) {
        self.model.select_cell(row, col, self.model.extend_range);
        self.formula.update(cx, |s, cx| {
            s.set_value(self.model.cells[row][col].clone(), window, cx)
        });
        cx.notify();
    }
    fn act(&mut self, action: Action, window: &mut Window, cx: &mut Context<Self>) {
        match action {
            Action::DocBold => self.format_document("bold", window, cx),
            Action::DocItalic => self.format_document("italic", window, cx),
            Action::DocLink => self.format_document("link", window, cx),
            Action::DocList => self.format_document("list", window, cx),
            Action::DocFind => self.find_document(window, cx),
            Action::DocReplace => self.replace_document(false, window, cx),
            Action::DocReplaceAll => self.replace_document(true, window, cx),
            Action::ExtendRange => {
                self.model.extend_range = !self.model.extend_range;
                if !self.model.extend_range {
                    self.model.range_anchor = None;
                }
            }
            Action::RangeLeft | Action::RangeRight | Action::RangeUp | Action::RangeDown => {
                let (r, c) = self.model.selected;
                let (r, c) = match action {
                    Action::RangeLeft => (r, c.saturating_sub(1)),
                    Action::RangeRight => (r, (c + 1).min(2)),
                    Action::RangeUp => (r.saturating_sub(1), c),
                    _ => (r.saturating_add(1).min(self.model.cells.len() - 1), c),
                };
                self.model.select_cell(r, c, self.model.extend_range);
                self.sync_formula(window, cx);
            }
            Action::NarrowColumn => self.model.resize_column(-20),
            Action::WideColumn => self.model.resize_column(20),
            Action::CopyRange => {
                cx.write_to_clipboard(ClipboardItem::new_string(self.model.range_tsv()));
                self.status = format!("Copied {}", self.model.range_label());
            }
            Action::FillRange => {
                self.model
                    .fill_range(self.formula.read(cx).value().to_string());
                self.status = format!("Filled {} · unsaved", self.model.range_label());
            }
            Action::PdfPrevious => self.model.pdf_page = self.model.pdf_page.saturating_sub(1),
            Action::PdfNext => self.model.pdf_page = (self.model.pdf_page + 1).min(2),
            Action::Find => {
                let q = self.note.read(cx).value().to_string().to_lowercase();
                if q.trim().is_empty() {
                    self.status = "Type a search term".into();
                } else if let Some(i) = PDF_PAGES.iter().position(|p| p.to_lowercase().contains(&q))
                {
                    self.model.pdf_page = i;
                    self.status = format!("Found on page {}", i + 1);
                } else {
                    self.status = "No matches in fixture pages".into();
                }
            }
            Action::Plot => {
                self.model.equation = self.formula.read(cx).value().to_string();
                self.status = if self.model.sample_equation(0.).is_some() {
                    "Plot updated".into()
                } else {
                    "Unsupported demo expression: use x, x^2, sin(x), cos(x)".into()
                };
            }
            Action::PointLeft => self.model.move_point(-0.25),
            Action::PointRight => self.model.move_point(0.25),
            Action::TurnLeft => self.model.turn_scene(-0.2),
            Action::TurnRight => self.model.turn_scene(0.2),
            Action::ChartStyle => self.model.chart_style = (self.model.chart_style + 1) % 3,
            Action::Save => {
                self.status = match self.load_error.as_ref().map_or_else(
                    || persistence::save(&self.storage_file, &self.model),
                    |e| Err(format!("Load error blocks save: {e}")),
                ) {
                    Ok(()) => "Saved locally".into(),
                    Err(e) => format!("Save failed: {e}"),
                };
            }
            Action::Preview => self.preview = !self.preview,
            Action::ApplyCell => {
                let (r, c) = self.model.selected;
                self.model.cells[r][c] = self.formula.read(cx).value().to_string();
                self.status = "Cell updated · unsaved".into();
            }
            Action::Sort => {
                self.model.sort_rows();
                let (r, c) = self.model.selected;
                self.select_cell(r, c, window, cx);
                self.status = "Sorted selected column (total excluded)".into();
            }
            Action::AddRow => {
                let i = self.model.cells.len() - 1;
                self.model
                    .cells
                    .insert(i, vec!["New item".into(), "0".into(), "0".into()]);
                let end = self.model.cells.len() - 1;
                self.model.cells[end][1] = format!("=SUM(B1:B{end})");
                self.model.cells[end][2] = format!("=SUM(C1:C{end})");
                self.status = "Row inserted; totals expanded".into();
            }
            Action::AddSlide => {
                self.model.add_slide();
                self.sync_slide(window, cx);
            }
            Action::Duplicate => {
                self.model.duplicate_slide();
                self.sync_slide(window, cx);
            }
            Action::DeleteSlide => {
                self.model.delete_slide();
                self.sync_slide(window, cx);
            }
            Action::Previous => {
                self.model.slide = self.model.slide.saturating_sub(1);
                self.sync_slide(window, cx);
            }
            Action::Next => {
                self.model.slide = (self.model.slide + 1).min(self.model.slides.len() - 1);
                self.sync_slide(window, cx);
            }
            Action::MoveLeft => {
                self.model.move_slide(-1);
                self.sync_slide(window, cx);
            }
            Action::MoveRight => {
                self.model.move_slide(1);
                self.sync_slide(window, cx);
            }
            Action::ZoomIn => self.model.zoom_by(0.1),
            Action::ZoomOut => self.model.zoom_by(-0.1),
            Action::Rotate => self.model.rotation = (self.model.rotation % 360 + 90) % 360,
            Action::AddNote => {
                let note = self.note.read(cx).value().to_string();
                if !note.trim().is_empty() {
                    let note = if self.kind == RichKind::Pdf {
                        format!("Page {}: {note}", self.model.pdf_page + 1)
                    } else {
                        note
                    };
                    while self.model.annotation_colors.len() < self.model.annotations.len() {
                        self.model.annotation_colors.push(0xD6B478);
                    }
                    while self.model.annotation_opacities.len() < self.model.annotations.len() {
                        self.model.annotation_opacities.push(255);
                    }
                    self.model.annotations.push(note);
                    self.model
                        .annotation_opacities
                        .push(self.model.annotation_opacity);
                    self.model
                        .annotation_colors
                        .push(self.model.annotation_color);
                    self.note.update(cx, |s, cx| s.set_value("", window, cx));
                    self.status = "Annotation added".into();
                }
            }
            Action::ClearNotes => {
                self.model.annotations.clear();
                self.model.annotation_colors.clear();
                self.model.annotation_opacities.clear();
            }
            Action::Play => {
                self.model.playing = !self.model.playing;
                self.model.recording = false;
                if self.model.position == 180 {
                    self.model.position = 0;
                }
            }
            Action::Record => {
                self.model.recording = !self.model.recording;
                self.model.playing = false;
                self.status = "Simulated recording · microphone is not accessed".into();
                if self.model.position == 180 {
                    self.model.position = 0;
                }
            }
            Action::Mute => self.model.muted = !self.model.muted,
            Action::Back => self.model.seek(-15),
            Action::Forward => self.model.seek(15),
            Action::Reset => {
                self.model.zoom = 1.;
                self.model.rotation = 0;
                self.model.pan = 0;
                self.model.scene_yaw = 0.45;
                self.model.math_x = 1.;
            }
            Action::PanLeft => self.model.pan = self.model.pan.saturating_sub(30).max(-180),
            Action::PanRight => self.model.pan = self.model.pan.saturating_add(30).min(180),
        }
        cx.notify();
    }
    fn format_document(
        &mut self,
        style: &'static str,
        window: &mut Window,
        cx: &mut Context<Self>,
    ) {
        let selected = self.source.read(cx).selected_value().to_string();
        let text = if selected.is_empty() {
            "text"
        } else {
            &selected
        };
        let formatted = match style {
            "bold" => format!("**{text}**"),
            "italic" => format!("*{text}*"),
            "list" => text
                .lines()
                .map(|line| format!("- {line}"))
                .collect::<Vec<_>>()
                .join("\n"),
            "link" => {
                let url = self.formula.read(cx).value().to_string();
                if !(url.starts_with("https://")
                    || url.starts_with("http://")
                    || url.starts_with("mailto:"))
                {
                    self.status = "Use an http, https or mailto URL".into();
                    cx.notify();
                    return;
                }
                format!("[{text}]({})", url.replace(')', "%29").replace(' ', "%20"))
            }
            _ => return,
        };
        self.preview = false;
        self.source.update(cx, |state, cx| {
            state.replace(formatted, window, cx);
            state.focus(window, cx);
        });
        self.model.document = self.source.read(cx).value().to_string();
        self.status = "Selection formatted · Ctrl+Z to undo".into();
    }
    fn find_document(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        let query = self.find_query.read(cx).value().to_string();
        if query.is_empty() {
            self.status = "Enter text to find".into();
            return;
        }
        let value = self.source.read(cx).value().to_string();
        let current = self.source.read(cx).selected_range().end;
        let matches: Vec<_> = value
            .match_indices(&query)
            .map(|(i, _)| i..i + query.len())
            .collect();
        if matches.is_empty() {
            self.status = "No matches".into();
            return;
        }
        let index = matches.iter().position(|r| r.start >= current).unwrap_or(0);
        self.preview = false;
        self.source.update(cx, |state, cx| {
            state.set_selected_range(matches[index].clone(), cx);
            state.focus(window, cx);
        });
        self.status = format!(
            "Match {} of {} · literal, case-sensitive",
            index + 1,
            matches.len()
        );
    }
    fn replace_document(&mut self, all: bool, window: &mut Window, cx: &mut Context<Self>) {
        let query = self.find_query.read(cx).value().to_string();
        if query.is_empty() {
            self.status = "Enter text to find before replacing".into();
            return;
        }
        let replacement = self.replace_with.read(cx).value().to_string();
        if all {
            let text = self.source.read(cx).value().to_string();
            let count = text.matches(&query).count();
            if count == 0 {
                self.status = "No matches".into();
                return;
            }
            let text = text.replace(&query, &replacement);
            self.source.update(cx, |state, cx| {
                state.replace_all(text, window, cx);
                state.focus(window, cx);
            });
            self.status = format!("Replaced {count} matches · Ctrl+Z to undo");
        } else {
            if self.source.read(cx).selected_value().as_ref() != query {
                self.find_document(window, cx);
                return;
            }
            self.source.update(cx, |state, cx| {
                state.replace(replacement, window, cx);
                state.focus(window, cx);
            });
            self.status = "Replaced selected match · Ctrl+Z to undo".into();
        }
        self.preview = false;
        self.model.document = self.source.read(cx).value().to_string();
    }
    fn sync_formula(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        let (r, c) = self.model.selected;
        self.formula.update(cx, |state, cx| {
            state.set_value(self.model.cells[r][c].clone(), window, cx)
        });
        cx.notify();
    }
    fn document(&self, cx: &mut Context<Self>) -> AnyElement {
        let controls = div()
            .flex()
            .flex_wrap()
            .gap_2()
            .child(self.button("doc-bold", "Bold", Action::DocBold, cx))
            .child(self.button("doc-italic", "Italic", Action::DocItalic, cx))
            .child(self.button("doc-list", "Bulleted list", Action::DocList, cx))
            .child(
                div()
                    .w(px(230.))
                    .child(Input::new(&self.formula).aria_label("Link destination")),
            )
            .child(self.button("doc-link", "Insert link", Action::DocLink, cx))
            .child(self.button(
                "preview",
                if self.preview {
                    "Show source"
                } else {
                    "Show preview"
                },
                Action::Preview,
                cx,
            ))
            .child(self.button("save-doc", "Save document", Action::Save, cx));
        let find = div()
            .flex()
            .flex_wrap()
            .gap_2()
            .child(
                div()
                    .w(px(185.))
                    .child(Input::new(&self.find_query).aria_label("Find in document")),
            )
            .child(self.button("doc-find", "Find next", Action::DocFind, cx))
            .child(
                div()
                    .w(px(185.))
                    .child(Input::new(&self.replace_with).aria_label("Replacement text")),
            )
            .child(self.button("doc-replace", "Replace selected", Action::DocReplace, cx))
            .child(self.button("doc-replace-all", "Replace all", Action::DocReplaceAll, cx));
        let content = if self.preview {
            div()
                .p_6()
                .child(TextView::markdown(
                    "rich-doc-preview",
                    self.model.document.clone(),
                ))
                .into_any_element()
        } else {
            div()
                .child(Textarea::new(&self.source).h(px(390.)))
                .into_any_element()
        };
        div().flex().flex_col().gap_4().child(controls).child(find)
            .child(div().rounded_lg().border_1().border_color(cx.theme().border).p_4().child(content))
            .child("Select source text before formatting. Find is literal and case-sensitive. Native Ctrl+Z/Ctrl+Y preserves edit history.")
            .into_any_element()
    }
    fn spreadsheet(&self, cx: &mut Context<Self>) -> AnyElement {
        let (sr, sc) = self.model.selected;
        let total_width = 40.
            + self
                .model
                .column_widths
                .iter()
                .map(|w| *w as f32)
                .sum::<f32>();
        let mut grid = div()
            .min_w(px(total_width))
            .flex()
            .flex_col()
            .border_1()
            .border_color(cx.theme().border);
        let mut header = div()
            .flex()
            .child(div().w(px(40.)).flex_shrink_0().p_2().child("#"));
        for col in 0..3 {
            header = header.child(
                Button::new(("column", col))
                    .w(px(self.model.column_widths[col] as f32))
                    .flex_shrink_0()
                    .label(format!(
                        "{} · {}",
                        (b'A' + col as u8) as char,
                        ["Project", "Hours", "Budget"][col]
                    ))
                    .on_click(cx.listener(move |this, _, window, cx| {
                        this.model.select_column(col);
                        this.sync_formula(window, cx);
                    })),
            );
        }
        grid = grid.child(header);
        for row in 0..self.model.cells.len() {
            let mut line = div().flex().child(
                Button::new(("row", row))
                    .w(px(40.))
                    .flex_shrink_0()
                    .label(format!("{}", row + 1))
                    .on_click(cx.listener(move |this, _, window, cx| {
                        this.model.select_row(row);
                        this.sync_formula(window, cx);
                    })),
            );
            for col in 0..3 {
                line = line.child(
                    Button::new(("cell", row * 3 + col))
                        .w(px(self.model.column_widths[col] as f32))
                        .flex_shrink_0()
                        .min_h(px(42.))
                        .border_2()
                        .border_color(if self.model.contains_cell(row, col) {
                            cx.theme().primary
                        } else {
                            cx.theme().border
                        })
                        .label(self.model.display_cell(row, col))
                        .on_click(cx.listener(move |this, event: &ClickEvent, window, cx| {
                            this.model.select_cell(
                                row,
                                col,
                                this.model.extend_range || event.modifiers().shift,
                            );
                            this.sync_formula(window, cx);
                        })),
                );
            }
            grid = grid.child(line);
        }
        div().flex().flex_col().gap_3()
            .child(div().flex().flex_wrap().gap_2().items_center().child(format!("{}{} ƒx",(b'A'+sc as u8)as char,sr+1))
                .child(div().w(px(310.)).child(Input::new(&self.formula)))
                .child(self.button("apply","Apply cell",Action::ApplyCell,cx))
                .child(self.button("fillrange","Fill selection",Action::FillRange,cx)))
            .child(div().flex().flex_wrap().gap_2().items_center()
                .child(self.button("extendrange",if self.model.extend_range{"Extend range: on"}else{"Extend range: off"},Action::ExtendRange,cx))
                .child(self.button("rangeleft","←",Action::RangeLeft,cx)).child(self.button("rangeright","→",Action::RangeRight,cx))
                .child(self.button("rangeup","↑",Action::RangeUp,cx)).child(self.button("rangedown","↓",Action::RangeDown,cx))
                .child(format!("Selected {}",self.model.range_label())).child(self.button("copyrange","Copy range",Action::CopyRange,cx)))
            .child(div().flex().flex_wrap().gap_2().items_center()
                .child(format!("Column {} · {} px",(b'A'+sc as u8)as char,self.model.column_widths[sc]))
                .child(self.button("narrowcolumn","Narrower",Action::NarrowColumn,cx)).child(self.button("widecolumn","Wider",Action::WideColumn,cx))
                .child(self.button("sort","Sort ↑",Action::Sort,cx)).child(self.button("addrow","Add row",Action::AddRow,cx)).child(self.button("savesheet","Save workbook",Action::Save,cx)))
            .child(div().id("rich-sheet-scroll").w_full().overflow_x_scroll().child(grid))
            .child("Shift-click or enable Extend range to select a rectangle. Headers select whole rows/columns. Width and selection persist with Save. SUM ranges and numeric literals are supported.")
            .into_any_element()
    }

    fn slides(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut thumbs = div()
            .flex()
            .min_w(px(self.model.slides.len() as f32 * 148.))
            .gap_2();
        for (index, slide) in self.model.slides.iter().enumerate() {
            thumbs = thumbs.child(
                Button::new(("slide", index))
                    .w(px(140.))
                    .h(px(82.))
                    .border_1()
                    .border_color(rgb(if index == self.model.slide {
                        0xc5bb9b
                    } else {
                        0x41454a
                    }))
                    .label(format!("{} · {}", index + 1, slide.title))
                    .on_click(cx.listener(move |this, _, window, cx| {
                        this.model.slide = index;
                        this.sync_slide(window, cx);
                        cx.notify();
                    })),
            );
        }
        let stage = div()
            .p_8()
            .min_h(px(260.))
            .rounded_lg()
            .bg(rgb(0xe9e2d2))
            .text_color(rgb(0x293937))
            .child(
                div()
                    .text_3xl()
                    .child(self.model.slides[self.model.slide].title.clone()),
            )
            .child(
                div()
                    .mt_6()
                    .child(self.model.slides[self.model.slide].body.clone()),
            )
            .child(
                div()
                    .mt_8()
                    .text_sm()
                    .child(format!("{:02} / NATIVE STUDIO", self.model.slide + 1)),
            );
        div()
            .flex()
            .flex_col()
            .gap_3()
            .child(
                div()
                    .id("rich-slide-scroll")
                    .w_full()
                    .overflow_x_scroll()
                    .child(thumbs),
            )
            .child(
                div()
                    .flex()
                    .flex_wrap()
                    .gap_2()
                    .child(self.button("prev", "Previous", Action::Previous, cx))
                    .child(self.button("next", "Next", Action::Next, cx))
                    .child(self.button("newslide", "Add", Action::AddSlide, cx))
                    .child(self.button("dupslide", "Duplicate", Action::Duplicate, cx))
                    .child(self.button("moveslideleft", "Move left", Action::MoveLeft, cx))
                    .child(self.button("moveslideright", "Move right", Action::MoveRight, cx))
                    .child(self.button("deleteslide", "Delete", Action::DeleteSlide, cx))
                    .child(self.button("saveslides", "Save", Action::Save, cx)),
            )
            .child(stage)
            .child(Input::new(&self.title))
            .child(Textarea::new(&self.source).h(px(110.)))
            .into_any_element()
    }
    fn zoom_controls(&self, cx: &mut Context<Self>) -> Div {
        div()
            .flex()
            .gap_2()
            .items_center()
            .child(self.button("zoomout", "−", Action::ZoomOut, cx))
            .child(format!("{:.0}%", self.model.zoom * 100.))
            .child(self.button("zoomin", "+", Action::ZoomIn, cx))
            .child(self.button("resetview", "Reset", Action::Reset, cx))
    }
    fn image(&self, cx: &mut Context<Self>) -> AnyElement {
        let portrait = self.model.rotation % 180 != 0;
        let w = if portrait { 230. } else { 400. } * self.model.zoom;
        let h = if portrait { 320. } else { 230. } * self.model.zoom;
        let colors = match self.model.rotation {
            90 => [0xe7c8a0, 0x8bada5, 0x476963],
            180 => [0x476963, 0xe7c8a0, 0x8bada5],
            270 => [0x8bada5, 0x476963, 0xe7c8a0],
            _ => [0x476963, 0x8bada5, 0xe7c8a0],
        };
        let art = div()
            .w(px(w))
            .h(px(h))
            .rounded_lg()
            .overflow_hidden()
            .bg(rgb(colors[0]))
            .flex()
            .flex_col()
            .child(
                div().h(px(h * 0.34)).bg(rgb(colors[1])).child(
                    div()
                        .ml_8()
                        .mt_4()
                        .size(px(h * 0.22))
                        .rounded_full()
                        .bg(rgb(colors[2])),
                ),
            )
            .child(
                div()
                    .flex_1()
                    .p_6()
                    .text_color(rgb(0xfaf2de))
                    .child("FORM / LIGHT")
                    .child(div().text_3xl().child(format!("{}°", self.model.rotation))),
            )
            .child(div().h(px(22.)).bg(rgb(colors[2])));
        let mut notes = div().flex().flex_col().gap_2();
        for (i, note) in self.model.annotations.iter().enumerate() {
            notes = notes.child(
                div()
                    .p_2()
                    .rounded_md()
                    .bg(cx.theme().muted)
                    .border_l_4()
                    .border_color(rgba(
                        (*self.model.annotation_colors.get(i).unwrap_or(&0xD6B478) << 8)
                            | *self.model.annotation_opacities.get(i).unwrap_or(&255) as u32,
                    ))
                    .child(format!("{}  {}", i + 1, note)),
            );
        }
        div().flex().flex_col().gap_3().child(self.zoom_controls(cx).child(self.button("rotate","Rotate 90°",Action::Rotate,cx)))
            .child(div().h(px(380.)).flex().items_center().justify_center().overflow_hidden().bg(cx.theme().muted).child(art))
            .child("Procedural demo artwork · orientation changes the native composition; no source image decoder.").child(ColorPicker::new(&self.note_color).label("New annotation color"))
            .child(div().flex().gap_2().child(div().w(px(340.)).child(Input::new(&self.note))).child(self.button("addnote","Add annotation",Action::AddNote,cx)).child(self.button("clearnotes","Clear",Action::ClearNotes,cx)).child(self.button("saveimage","Save",Action::Save,cx))).child(notes).into_any_element()
    }
    fn media(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut waveform = div()
            .flex()
            .gap_1()
            .items_center()
            .h(px(145.))
            .justify_center();
        for i in 0..48 {
            let level = 18. + ((i * 17 + (self.model.position as usize) * 3) % 90) as f32;
            waveform = waveform.child(div().w(px(6.)).h(px(level)).rounded_full().bg(rgb(
                if self.model.muted {
                    0x52585d
                } else if self.model.recording {
                    0xe88e81
                } else {
                    0x91b8a6
                },
            )));
        }
        div().flex().flex_col().gap_4().child(div().rounded_lg().p_6().bg(cx.theme().muted).child(div().text_2xl().child(if self.model.recording{"Recording simulation"}else if self.model.playing{"Playing simulation"}else{"Ready to listen"})).child(waveform))
            .child(format!("{:02}:{:02} / 03:00",self.model.position/60,self.model.position%60))
            .child(div().h(px(8.)).rounded_full().bg(rgb(0x3b4146)).child(div().h_full().w(relative(self.model.position as f32/180.)).rounded_full().bg(rgb(0x91b8a6))))
            .child(div().flex().gap_2().child(self.button("back15","−15s",Action::Back,cx)).child(self.button("play",if self.model.playing{"Pause"}else{"Play"},Action::Play,cx)).child(self.button("forward15","+15s",Action::Forward,cx)).child(self.button("record",if self.model.recording{"Stop recording"}else{"Record demo"},Action::Record,cx)).child(self.button("mute",if self.model.muted{"Unmute"}else{"Mute"},Action::Mute,cx)))
            .child(div().p_4().bg(cx.theme().muted).rounded_lg().child("DEMO · No microphone, camera, audio output, transcription or network is accessed. The timeline and waveform animate from local state."))
            .into_any_element()
    }
    fn diagram(&self, cx: &mut Context<Self>) -> AnyElement {
        let labels = ["Capture", "Understand", "Compose", "Deliver"];
        let mut nodes = div()
            .flex()
            .gap_3()
            .items_center()
            .ml(px((self.model.pan + 180) as f32));
        for (i, label) in labels.iter().enumerate() {
            if i > 0 {
                nodes = nodes.child("→");
            }
            nodes = nodes.child(
                Button::new(("node", i))
                    .w(px(115. * self.model.zoom))
                    .h(px(76. * self.model.zoom))
                    .border_2()
                    .border_color(rgb(if self.model.selected_node == i {
                        0xcfc298
                    } else {
                        0x5c7772
                    }))
                    .label(label.to_string())
                    .on_click(cx.listener(move |this, _, _, cx| {
                        this.model.selected_node = i;
                        cx.notify();
                    })),
            );
        }
        div().flex().flex_col().gap_4().child(self.zoom_controls(cx).child(self.button("panleft","← Pan",Action::PanLeft,cx)).child(self.button("panright","Pan →",Action::PanRight,cx)))
            .child(div().h(px(250.)).flex().items_center().overflow_hidden().rounded_lg().bg(cx.theme().muted).child(nodes))
            .child(div().p_4().border_1().border_color(cx.theme().border).rounded_lg().child(format!("Selected: {} · Node {}",labels[self.model.selected_node],self.model.selected_node+1)).child(div().mt_2().child(["Collect structured inputs and files.","Validate contracts and maintain local state.","Render native reusable components.","Save and reuse the result."][self.model.selected_node])))
            .child("Interactive fixed scene · selectable nodes, zoom and horizontal pan. Mermaid parsing is a separate engine.").into_any_element()
    }
    fn map(&self, cx: &mut Context<Self>) -> AnyElement {
        let places = [
            ("Moss coffee", "12 Willow Lane · 4 min walk"),
            ("Design library", "8 Cedar Avenue · 8 min walk"),
            ("River gardens", "Riverside path · 11 min walk"),
            ("Studio north", "24 Pine Street · 15 min walk"),
        ];
        let mut map = div()
            .relative()
            .h(px(320.))
            .w_full()
            .rounded_lg()
            .overflow_hidden()
            .bg(rgb(0x293e39));
        for i in 0..7 {
            map = map
                .child(
                    div()
                        .absolute()
                        .top(px(i as f32 * 52.))
                        .left_0()
                        .w_full()
                        .h(px(10.))
                        .bg(rgb(0x526257)),
                )
                .child(
                    div()
                        .absolute()
                        .left(px(i as f32 * 105.))
                        .top_0()
                        .h_full()
                        .w(px(12.))
                        .bg(rgb(0x526257)),
                );
        }
        for (i, (name, _)) in places.iter().enumerate() {
            let x = (65. + (i % 2) as f32 * 230.) * self.model.zoom;
            let y = (44. + (i / 2) as f32 * 145.) * self.model.zoom;
            map = map.child(
                Button::new(("place", i))
                    .absolute()
                    .left(px(x))
                    .top(px(y))
                    .border_2()
                    .border_color(rgb(if self.model.selected_place == i {
                        0xe1cfaa
                    } else {
                        0x839f8e
                    }))
                    .label(name.to_string())
                    .on_click(cx.listener(move |this, _, _, cx| {
                        this.model.selected_place = i;
                        cx.notify();
                    })),
            );
        }
        div().flex().flex_col().gap_4().child(self.zoom_controls(cx)).child(map).child(div().p_4().rounded_lg().bg(cx.theme().muted).child(div().text_xl().child(places[self.model.selected_place].0)).child(places[self.model.selected_place].1))
            .child("Fictional local vector map · select markers and zoom. No location permission, map tiles or routing service.").into_any_element()
    }
    fn pdf(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut annotations = div().flex().flex_col().gap_2();
        for note in &self.model.annotations {
            annotations = annotations.child(
                div()
                    .p_2()
                    .rounded_md()
                    .bg(cx.theme().muted)
                    .child(note.clone()),
            );
        }
        div().flex().flex_col().gap_3()
            .child(self.zoom_controls(cx).child(self.button("pdfprev","Previous page",Action::PdfPrevious,cx)).child(format!("{} / 3",self.model.pdf_page+1)).child(self.button("pdfnext","Next page",Action::PdfNext,cx)))
            .child(div().flex().gap_2().child(div().w(px(290.)).child(Input::new(&self.note))).child(self.button("pdffind","Find text",Action::Find,cx)).child(self.button("pdfannotate","Annotate page",Action::AddNote,cx)).child(self.button("pdfsave","Save notes",Action::Save,cx)))
            .child(div().h(px(370.)).overflow_hidden().bg(cx.theme().muted).flex().justify_center().p_4()
                .child(div().w(px(420.*self.model.zoom)).min_h(px(540.*self.model.zoom)).p_8().bg(rgb(0xf8f5eb)).text_color(rgb(0x293c36)).text_size(px(15.*self.model.zoom)).child(div().text_2xl().child(format!("Native / Research notes · {}",self.model.pdf_page+1))).child(div().mt_6().child(PDF_PAGES[self.model.pdf_page]))))
            .child(annotations).child("PDF frontend fixture · 3 native sample pages, search and page annotations. Binary PDF decoding is not used.").into_any_element()
    }
    fn math(&self, cx: &mut Context<Self>) -> AnyElement {
        let mut plot = div()
            .relative()
            .w_full()
            .h(px(320.))
            .overflow_hidden()
            .bg(cx.theme().muted)
            .rounded_lg();
        let origin_x = 320. + self.model.pan as f32;
        let scale = 25. * self.model.zoom;
        for i in -10..=10 {
            plot = plot.child(
                div()
                    .absolute()
                    .left(px(origin_x + i as f32 * scale))
                    .top_0()
                    .w(px(if i == 0 { 2. } else { 1. }))
                    .h_full()
                    .bg(rgb(if i == 0 { 0x87a99b } else { 0x35484a })),
            );
            plot = plot.child(
                div()
                    .absolute()
                    .top(px(210. + i as f32 * scale))
                    .left_0()
                    .h(px(if i == 0 { 2. } else { 1. }))
                    .w_full()
                    .bg(rgb(if i == 0 { 0x87a99b } else { 0x35484a })),
            );
        }
        for i in -160..=160 {
            let x = i as f32 / 32.;
            if let Some(y) = self.model.sample_equation(x) {
                let sy = 210. - y * scale;
                if (0.0..315.).contains(&sy) {
                    plot = plot.child(
                        div()
                            .absolute()
                            .left(px(origin_x + x * scale))
                            .top(px(sy))
                            .size(px(4.))
                            .rounded_full()
                            .bg(rgb(0xdfc595)),
                    );
                }
            }
        }
        if let Some(y) = self.model.sample_equation(self.model.math_x) {
            plot = plot.child(
                div()
                    .absolute()
                    .left(px(origin_x + self.model.math_x * scale - 5.))
                    .top(px(210. - y * scale - 5.))
                    .size(px(12.))
                    .rounded_full()
                    .bg(rgb(0xe78b79)),
            );
        }
        div().flex().flex_col().gap_3().child(div().flex().gap_2().items_center().child("y =").child(div().w(px(240.)).child(Input::new(&self.formula))).child(self.button("plot","Plot",Action::Plot,cx)))
            .child(self.zoom_controls(cx).child(self.button("mathleft","Pan ←",Action::PanLeft,cx)).child(self.button("mathright","Pan →",Action::PanRight,cx))).child(plot)
            .child(div().flex().gap_2().items_center().child(self.button("pointleft","Point ←",Action::PointLeft,cx)).child(format!("P = ({:.2}, {})",self.model.math_x,self.model.sample_equation(self.model.math_x).map(|v|format!("{v:.2}")).unwrap_or("undefined".into()))).child(self.button("pointright","Point →",Action::PointRight,cx)))
            .child("Live native sampled plot · supported expressions: x, x^2, sin(x), cos(x). Point movement is constrained to the curve.").into_any_element()
    }
    fn scene(&self, cx: &mut Context<Self>) -> AnyElement {
        let angle = self.model.scene_yaw;
        let project = |x: f32, y: f32, z: f32| {
            let rx = x * angle.cos() - z * angle.sin();
            let rz = x * angle.sin() + z * angle.cos();
            (
                330. + (rx + rz * 0.32) * 80. * self.model.zoom,
                155. + (y + rz * 0.3) * 80. * self.model.zoom,
            )
        };
        let vertices = [
            (-1., -1., -1.),
            (1., -1., -1.),
            (1., 1., -1.),
            (-1., 1., -1.),
            (-1., -1., 1.),
            (1., -1., 1.),
            (1., 1., 1.),
            (-1., 1., 1.),
        ];
        let edges = [
            (0, 1),
            (1, 2),
            (2, 3),
            (3, 0),
            (4, 5),
            (5, 6),
            (6, 7),
            (7, 4),
            (0, 4),
            (1, 5),
            (2, 6),
            (3, 7),
        ];
        let mut stage = div()
            .relative()
            .h(px(340.))
            .overflow_hidden()
            .rounded_lg()
            .bg(cx.theme().muted);
        for (a, b) in edges {
            let (x1, y1, z1) = vertices[a];
            let (x2, y2, z2) = vertices[b];
            for step in 0..30 {
                let t = step as f32 / 29.;
                let (x, y) = project(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, z1 + (z2 - z1) * t);
                stage = stage.child(
                    div()
                        .absolute()
                        .left(px(x))
                        .top(px(y))
                        .size(px(3.))
                        .rounded_full()
                        .bg(rgb(0x8bb6aa)),
                );
            }
        }
        for (index, (x, y, z)) in vertices.iter().enumerate() {
            let (sx, sy) = project(*x, *y, *z);
            stage = stage
                .child(
                    div()
                        .absolute()
                        .left(px(sx - 4.))
                        .top(px(sy - 4.))
                        .size(px(8.))
                        .rounded_full()
                        .bg(rgb(0xe7cea2)),
                )
                .child(
                    div()
                        .absolute()
                        .left(px(sx + 8.))
                        .top(px(sy))
                        .text_sm()
                        .child(format!("V{}", index + 1)),
                );
        }
        div().flex().flex_col().gap_3().child(self.zoom_controls(cx).child(self.button("sceneleft","Rotate ←",Action::TurnLeft,cx)).child(self.button("sceneright","Rotate →",Action::TurnRight,cx)))
            .child(stage).child(format!("Yaw {:.0}° · 8 vertices · 12 edges",angle.to_degrees())).child("Procedural 3D wireframe projected into native geometry. Rotation, zoom and reset are live; no imported mesh/material engine.").into_any_element()
    }
    fn charts(&self, cx: &mut Context<Self>) -> AnyElement {
        let values = [12., 24., 36., 8.];
        let names = ["Research", "Design", "Build", "Review"];
        let mut chart = div()
            .relative()
            .h(px(310.))
            .w_full()
            .p_6()
            .bg(cx.theme().muted)
            .rounded_lg()
            .overflow_hidden();
        for (i, value) in values.iter().enumerate() {
            let active = self.model.selected_node == i;
            let color = rgb(if active { 0xe5c895 } else { 0x8bb7a7 });
            let x = 45. + i as f32 * 130.;
            let marker = if self.model.chart_style == 0 {
                div().w(px(74.)).h(px(value * 5.)).rounded_md()
            } else {
                div()
                    .size(px(if self.model.chart_style == 1 {
                        18.
                    } else {
                        value * 1.7
                    }))
                    .rounded_full()
            };
            chart =
                chart.child(
                    div()
                        .absolute()
                        .left(px(x))
                        .bottom(px(45.))
                        .child(marker.bg(color))
                        .child(Button::new(("chartseries", i)).label(names[i]).on_click(
                            cx.listener(move |this, _, _, cx| {
                                this.model.selected_node = i;
                                cx.notify();
                            }),
                        )),
                );
        }
        div().flex().flex_col().gap_3().child(div().flex().gap_2().items_center().child(self.button("chartstyle","Change style",Action::ChartStyle,cx)).child(["Column","Dot","Bubble"][self.model.chart_style])).child(chart)
            .child(format!("{} · {} hours · {:.0}% of total",names[self.model.selected_node],values[self.model.selected_node],values[self.model.selected_node]/80.*100.))
            .child("Native chart fixture · three styles and selectable data. Workbook cells are a separate demo model.").into_any_element()
    }
}
const PDF_PAGES: [&str; 3] = [
    "Purpose\n\nGood tools make room for concentration. This sample report explores a native desktop workspace with reusable surfaces.\n\nEvery visible action changes local state. Data stays in the demo until you save it.",
    "Research\n\nParticipants preferred a calm layout, clear hierarchy and reversible actions.\n\nKey findings\n• Keep navigation predictable\n• Explain pending and failed states\n• Make keyboard actions discoverable",
    "Next steps\n\nBuild a reusable foundation, test the interactions and document boundaries.\n\nAcceptance checklist\n1. Edit a document\n2. Explore data\n3. Annotate the result\n4. Save and return later",
];
impl Render for RichSurface {
    fn render(&mut self, _: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let content = if let Some(error) = &self.load_error {
            div().p_6().rounded_lg().border_1().border_color(rgb(0xbf8474)).child("Cannot load saved content").child(div().mt_4().child(error.clone())).child(div().mt_4().child("The original file has not been changed. Restore or repair that file outside this app, then reopen this surface. No fixture is substituted for your saved content.")).into_any_element()
        } else {
            match self.kind {
                RichKind::Document => self.document(cx),
                RichKind::Spreadsheet => self.spreadsheet(cx),
                RichKind::Slides => self.slides(cx),
                RichKind::Image => self.image(cx),
                RichKind::Media => self.media(cx),
                RichKind::Diagram => self.diagram(cx),
                RichKind::Map => self.map(cx),
                RichKind::Pdf => self.pdf(cx),
                RichKind::Math => self.math(cx),
                RichKind::Scene => self.scene(cx),
                RichKind::Charts => self.charts(cx),
            }
        };
        div()
            .id("rich-surface")
            .size_full()
            .overflow_y_scroll()
            .p_6()
            .bg(cx.theme().background)
            .text_color(cx.theme().foreground)
            .flex()
            .flex_col()
            .gap_4()
            .child(
                div()
                    .flex()
                    .justify_between()
                    .child(div().text_2xl().child(self.kind.title()))
                    .child(
                        div()
                            .text_sm()
                            .text_color(cx.theme().muted_foreground)
                            .child(self.status.clone()),
                    ),
            )
            .child(content)
    }
}
fn storage_path(kind: RichKind) -> std::path::PathBuf {
    let root = std::env::var_os("LOCALAPPDATA")
        .map(std::path::PathBuf::from)
        .unwrap_or_else(std::env::temp_dir);
    root.join("NativeFrontendDemo")
        .join(format!("rich-{}.json", kind.key()))
}

#[cfg(all(test, feature = "ui-tests"))]
mod ui_tests;
