use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub enum RichKind {
    Document,
    Spreadsheet,
    Slides,
    Image,
    Media,
    Diagram,
    Map,
    Pdf,
    Math,
    Scene,
    Charts,
}
impl RichKind {
    pub fn title(self) -> &'static str {
        match self {
            Self::Document => "Document studio",
            Self::Spreadsheet => "Workbook",
            Self::Slides => "Presentation",
            Self::Image => "Image studio",
            Self::Media => "Media & voice",
            Self::Diagram => "Diagram canvas",
            Self::Map => "Places",
            Self::Pdf => "PDF review",
            Self::Math => "Math lab",
            Self::Scene => "3D scene",
            Self::Charts => "Chart studio",
        }
    }
    pub fn key(self) -> &'static str {
        match self {
            Self::Document => "document",
            Self::Spreadsheet => "spreadsheet",
            Self::Slides => "slides",
            Self::Image => "image",
            Self::Media => "media",
            Self::Diagram => "diagram",
            Self::Map => "map",
            Self::Pdf => "pdf",
            Self::Math => "math",
            Self::Scene => "scene",
            Self::Charts => "charts",
        }
    }
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Slide {
    pub title: String,
    pub body: String,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(default)]
pub struct RichModel {
    pub pdf_page: usize,
    pub equation: String,
    pub math_x: f32,
    pub scene_yaw: f32,
    pub chart_style: usize,
    pub document: String,
    pub cells: Vec<Vec<String>>,
    pub selected: (usize, usize),
    pub range_anchor: Option<(usize, usize)>,
    pub extend_range: bool,
    pub column_widths: [u16; 3],
    pub annotation_color: u32,
    pub annotation_opacity: u8,
    pub annotation_colors: Vec<u32>,
    pub annotation_opacities: Vec<u8>,
    pub slides: Vec<Slide>,
    pub slide: usize,
    pub zoom: f32,
    pub rotation: u16,
    pub annotations: Vec<String>,
    pub playing: bool,
    pub recording: bool,
    pub muted: bool,
    pub position: u32,
    pub selected_node: usize,
    pub pan: i32,
    pub selected_place: usize,
}
impl Default for RichModel {
    fn default() -> Self {
        Self {
            pdf_page:0,equation:"x^2".into(),math_x:1.,scene_yaw:0.45,chart_style:0,
            document: "# A quieter workspace\n\nA reusable **native document** that you can edit.\n\n## Design principles\n\n- Keep the work in focus\n- Make every action reversible\n- Build with accessible components\n\n| Milestone | Status |\n| --- | --- |\n| Prototype | Ready |\n| User testing | Next |\n\n> Select source, write, preview, and save locally.\n".into(),
            cells: vec![vec!["Research".into(),"12".into(),"120".into()],vec!["Design".into(),"24".into(),"240".into()],vec!["Build".into(),"36".into(),"360".into()],vec!["Review".into(),"8".into(),"80".into()],vec!["Total".into(),"=SUM(B1:B4)".into(),"=SUM(C1:C4)".into()]],
            selected:(0,0), range_anchor:None, extend_range:false, column_widths:[190;3], annotation_color:0xD6B478, annotation_opacity:255, annotation_colors:vec![], annotation_opacities:vec![],
            slides:vec![Slide{title:"Ideas, made tangible.".into(),body:"A native toolkit for thoughtful work.\n\nOne canvas. A hundred possibilities.".into()},Slide{title:"Less friction. More focus.".into(),body:"Documents • Data • Images\n\nReusable surfaces with real interactions.".into()},Slide{title:"Build the next thing.".into(),body:"Prototype → Refine → Share\n\nYour components, your application.".into()}],
            slide:0,zoom:1.,rotation:0,annotations:vec![],playing:false,recording:false,muted:false,position:0,selected_node:0,pan:0,selected_place:0,
        }
    }
}
impl RichModel {
    pub fn validate(&self) -> bool {
        self.pdf_page < 3
            && self.chart_style < 3
            && self.math_x.is_finite()
            && (-5.0..=5.0).contains(&self.math_x)
            && self.scene_yaw.is_finite()
            && (0.0..std::f32::consts::TAU).contains(&self.scene_yaw)
            && self.rotation <= 270
            && self.rotation % 90 == 0
            && (-180..=180).contains(&self.pan)
            && !self.slides.is_empty()
            && self.slide < self.slides.len()
            && !self.cells.is_empty()
            && self.cells.iter().all(|r| r.len() == 3)
            && self.selected.0 < self.cells.len()
            && self.selected.1 < 3
            && self
                .range_anchor
                .is_none_or(|(r, c)| r < self.cells.len() && c < 3)
            && self.column_widths.iter().all(|w| (90..=360).contains(w))
            && self.annotation_color <= 0xFFFFFF
            && self.annotation_colors.len() <= self.annotations.len()
            && self.annotation_opacities.len() <= self.annotations.len()
            && self.annotation_colors.iter().all(|c| *c <= 0xFFFFFF)
            && self.zoom.is_finite()
            && (0.5..=2.).contains(&self.zoom)
            && self.position <= 180
            && self.selected_place < 4
            && self.selected_node < 4
    }
    pub fn select_cell(&mut self, row: usize, col: usize, extend: bool) {
        if row >= self.cells.len() || col >= 3 {
            return;
        }
        if extend {
            self.range_anchor.get_or_insert(self.selected);
        } else {
            self.range_anchor = None;
        }
        self.selected = (row, col);
    }
    pub fn select_row(&mut self, row: usize) {
        if row < self.cells.len() {
            self.selected = (row, 0);
            self.range_anchor = Some((row, 2));
        }
    }
    pub fn select_column(&mut self, col: usize) {
        if col < 3 {
            self.selected = (0, col);
            self.range_anchor = Some((self.cells.len() - 1, col));
        }
    }
    pub fn range_bounds(&self) -> (usize, usize, usize, usize) {
        let (ar, ac) = self.range_anchor.unwrap_or(self.selected);
        let (r, c) = self.selected;
        (ar.min(r), ac.min(c), ar.max(r), ac.max(c))
    }
    pub fn contains_cell(&self, row: usize, col: usize) -> bool {
        let (r1, c1, r2, c2) = self.range_bounds();
        (r1..=r2).contains(&row) && (c1..=c2).contains(&col)
    }
    pub fn range_label(&self) -> String {
        let (r1, c1, r2, c2) = self.range_bounds();
        format!(
            "{}{}:{}{}",
            (b'A' + c1 as u8) as char,
            r1 + 1,
            (b'A' + c2 as u8) as char,
            r2 + 1
        )
    }
    pub fn resize_column(&mut self, delta: i32) {
        let col = self.selected.1;
        self.column_widths[col] = (self.column_widths[col] as i32)
            .saturating_add(delta)
            .clamp(90, 360) as u16;
    }
    pub fn range_tsv(&self) -> String {
        let (r1, c1, r2, c2) = self.range_bounds();
        (r1..=r2)
            .map(|r| {
                (c1..=c2)
                    .map(|c| self.display_cell(r, c))
                    .collect::<Vec<_>>()
                    .join("\t")
            })
            .collect::<Vec<_>>()
            .join("\n")
    }
    pub fn fill_range(&mut self, value: String) {
        let (r1, c1, r2, c2) = self.range_bounds();
        for r in r1..=r2 {
            for c in c1..=c2 {
                self.cells[r][c] = value.clone();
            }
        }
    }
    pub fn sample_equation(&self, x: f32) -> Option<f32> {
        match self.equation.trim().replace(' ', "").as_str() {
            "x" => Some(x),
            "x^2" | "x*x" => Some(x * x),
            "sin(x)" => Some(x.sin()),
            "cos(x)" => Some(x.cos()),
            _ => None,
        }
    }
    pub fn move_point(&mut self, delta: f32) {
        self.math_x = (self.math_x + delta).clamp(-5., 5.);
    }
    pub fn turn_scene(&mut self, delta: f32) {
        self.scene_yaw = (self.scene_yaw + delta).rem_euclid(std::f32::consts::TAU);
    }
    pub fn evaluate(&self, row: usize, col: usize) -> Result<String, String> {
        self.eval_inner(row, col, &mut Vec::new()).map(|n| {
            if n.fract() == 0. {
                format!("{n:.0}")
            } else {
                format!("{n:.2}")
            }
        })
    }
    fn eval_inner(
        &self,
        row: usize,
        col: usize,
        seen: &mut Vec<(usize, usize)>,
    ) -> Result<f64, String> {
        if seen.contains(&(row, col)) {
            return Err("#CYCLE".into());
        }
        let s = self
            .cells
            .get(row)
            .and_then(|r| r.get(col))
            .ok_or("#REF")?
            .trim();
        if let Ok(n) = s.parse::<f64>() {
            return if n.is_finite() {
                Ok(n)
            } else {
                Err("#VALUE".into())
            };
        }
        let u = s.to_ascii_uppercase();
        let body = u
            .strip_prefix("=SUM(")
            .and_then(|x| x.strip_suffix(')'))
            .ok_or("#VALUE")?;
        let (start, end) = body.split_once(':').ok_or("#FORMULA")?;
        let (r1, c1) = cell_ref(start)?;
        let (r2, c2) = cell_ref(end)?;
        if r2 < r1 || c2 < c1 || r2 >= self.cells.len() || c2 >= 3 {
            return Err("#REF".into());
        }
        seen.push((row, col));
        let mut sum = 0.;
        for r in r1..=r2 {
            for c in c1..=c2 {
                sum += self.eval_inner(r, c, seen)?;
            }
        }
        seen.pop();
        Ok(sum)
    }
    pub fn display_cell(&self, row: usize, col: usize) -> String {
        let raw = &self.cells[row][col];
        if raw.starts_with('=') {
            self.evaluate(row, col).unwrap_or_else(|e| e)
        } else {
            raw.clone()
        }
    }
    pub fn sort_rows(&mut self) {
        // The final fixture total stays outside the sorted data range.
        let end = self.cells.len().saturating_sub(1);
        let col = self.selected.1;
        self.cells[..end].sort_by(
            |a, b| match (a[col].parse::<f64>(), b[col].parse::<f64>()) {
                (Ok(x), Ok(y)) => x.total_cmp(&y),
                _ => a[col].cmp(&b[col]),
            },
        );
    }
    pub fn add_slide(&mut self) {
        self.slides.push(Slide {
            title: "Untitled slide".into(),
            body: "Start with one clear idea.".into(),
        });
        self.slide = self.slides.len() - 1;
    }
    pub fn duplicate_slide(&mut self) {
        let copy = self.slides[self.slide].clone();
        self.slide += 1;
        self.slides.insert(self.slide, copy);
    }
    pub fn move_slide(&mut self, delta: isize) {
        let next = self.slide as isize + delta;
        if next >= 0 && (next as usize) < self.slides.len() {
            self.slides.swap(self.slide, next as usize);
            self.slide = next as usize;
        }
    }
    pub fn delete_slide(&mut self) {
        if self.slides.len() > 1 {
            self.slides.remove(self.slide);
            self.slide = self.slide.min(self.slides.len() - 1);
        }
    }
    pub fn zoom_by(&mut self, delta: f32) {
        self.zoom = (self.zoom + delta).clamp(0.5, 2.);
    }
    pub fn seek(&mut self, delta: i32) {
        self.position = (self.position as i32 + delta).clamp(0, 180) as u32;
    }
    pub fn tick(&mut self) {
        if self.playing || self.recording {
            self.position = (self.position + 1).min(180);
            if self.position == 180 {
                self.playing = false;
                self.recording = false;
            }
        }
    }
}
fn cell_ref(s: &str) -> Result<(usize, usize), String> {
    let b = s.trim().as_bytes();
    if b.len() < 2 || !(b'A'..=b'C').contains(&b[0]) {
        return Err("#REF".into());
    }
    let row = s.trim()[1..].parse::<usize>().map_err(|_| "#REF")?;
    if row == 0 {
        return Err("#REF".into());
    }
    Ok((row - 1, (b[0] - b'A') as usize))
}
#[cfg(test)]
mod tests {
    use super::{RichModel, cell_ref};
    #[test]
    fn workbook_ranges_widths_and_annotation_colors_roundtrip() {
        let mut m = RichModel::default();
        m.select_cell(0, 1, false);
        m.select_cell(2, 2, true);
        assert_eq!(m.range_label(), "B1:C3");
        assert!(m.contains_cell(1, 1));
        assert!(!m.contains_cell(3, 1));
        assert_eq!(m.range_tsv(), "12\t120\n24\t240\n36\t360");
        m.resize_column(20);
        assert_eq!(m.column_widths[2], 210);
        m.resize_column(-1000);
        assert_eq!(m.column_widths[2], 90);
        m.resize_column(1000);
        assert_eq!(m.column_widths[2], 360);
        m.annotation_color = 0x0088FF;
        m.annotations.push("Note".into());
        m.annotation_colors.push(m.annotation_color);
        let restored: RichModel =
            serde_json::from_str(&serde_json::to_string(&m).unwrap()).unwrap();
        assert_eq!(restored.range_label(), "B1:C3");
        assert_eq!(restored.column_widths[2], 360);
        assert_eq!(restored.annotation_colors, vec![0x0088FF]);
        assert!(restored.validate());
        m.select_row(1);
        assert_eq!(m.range_label(), "A2:C2");
        m.select_column(2);
        assert_eq!(m.range_label(), "C1:C5");
        m.column_widths[0] = u16::MAX;
        assert!(!m.validate());
    }
    #[test]
    fn extreme_geometry_is_rejected() {
        let mut m = RichModel::default();
        m.rotation = u16::MAX;
        assert!(!m.validate());
        m.rotation = 0;
        m.pan = i32::MAX;
        assert!(!m.validate());
        m.pan = 0;
        m.math_x = f32::MAX;
        assert!(!m.validate());
        m.math_x = 0.;
        m.scene_yaw = f32::MAX;
        assert!(!m.validate());
    }
    #[test]
    fn equation_and_scene_controls() {
        let mut m = RichModel::default();
        assert_eq!(m.sample_equation(3.), Some(9.));
        m.equation = "sin(x)".into();
        assert_eq!(m.sample_equation(0.), Some(0.));
        m.equation = "unknown".into();
        assert_eq!(m.sample_equation(1.), None);
        m.move_point(100.);
        assert_eq!(m.math_x, 5.);
        m.turn_scene(100.);
        assert!(m.scene_yaw >= 0. && m.scene_yaw < std::f32::consts::TAU);
    }
    #[test]
    fn sum_recalculates() {
        let mut m = RichModel::default();
        assert_eq!(m.evaluate(4, 1).unwrap(), "80");
        m.cells[0][1] = "20".into();
        assert_eq!(m.evaluate(4, 1).unwrap(), "88");
    }
    #[test]
    fn formulas_reject_cycles_and_ranges() {
        let mut m = RichModel::default();
        m.cells[0][1] = "=SUM(B1:B2)".into();
        assert_eq!(m.evaluate(0, 1).unwrap_err(), "#CYCLE");
        m.cells[0][1] = "=SUM(A1:C9999)".into();
        assert_eq!(m.evaluate(0, 1).unwrap_err(), "#REF");
        assert!(cell_ref("A0").is_err());
    }
    #[test]
    fn numeric_sort_keeps_total() {
        let mut m = RichModel::default();
        m.selected.1 = 1;
        m.sort_rows();
        assert_eq!(m.cells[0][1], "8");
        assert_eq!(m.cells[4][0], "Total");
        assert_eq!(m.evaluate(4, 1).unwrap(), "80");
    }
    #[test]
    fn slide_operations_keep_selection_valid() {
        let mut m = RichModel::default();
        m.duplicate_slide();
        assert_eq!(m.slides[0].title, m.slides[1].title);
        m.move_slide(-1);
        assert_eq!(m.slide, 0);
        m.add_slide();
        assert_eq!(m.slide, 4);
        for _ in 0..10 {
            m.delete_slide();
        }
        assert_eq!(m.slides.len(), 1);
        assert!(m.validate());
    }
    #[test]
    fn playback_and_zoom_are_bounded() {
        let mut m = RichModel::default();
        m.zoom_by(99.);
        assert_eq!(m.zoom, 2.);
        m.seek(999);
        m.playing = true;
        m.tick();
        assert!(!m.playing);
        m.seek(-999);
        assert_eq!(m.position, 0);
    }
    #[test]
    fn serialization_preserves_edits() {
        let mut m = RichModel::default();
        m.document = "saved draft".into();
        m.annotations.push("Note".into());
        let d: RichModel = serde_json::from_str(&serde_json::to_string(&m).unwrap()).unwrap();
        assert_eq!(d.document, "saved draft");
        assert_eq!(d.annotations.len(), 1);
        assert!(d.validate());
    }
}
