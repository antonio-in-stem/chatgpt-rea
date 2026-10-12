# Native rich surfaces

Reusable retained GPUI entities for an interactive Windows frontend demo.

```rust
let surface = cx.new(|cx| RichSurface::new(RichKind::Document, window, cx));
```

Keep the returned entity alive when navigating. Available kinds: Document, Spreadsheet, Slides, Image, Media, Diagram, Map, Pdf, Math, Scene, Charts.

## Contracts

- Input: a surface kind and local fixture/persisted model. No user account or remote service required.
- Processing: RichModel owns edits, selections, calculation and playback demo state; RichSurface owns native input entities and presentation.
- Output: interactive native content and explicit local-save status. Save writes JSON under LOCALAPPDATA/NativeFrontendDemo, with a temporary-directory fallback.

## Included behavior

- Markdown source editing and preview; local document save.
- Selectable spreadsheet cells/row and column headers, editable formula bar, numeric SUM ranges, cycles/reference errors, sort excluding the total row, row insertion and save.
- Slide navigation, add/duplicate/delete/reorder, editable title/body, live native slide preview and save.
- Procedural image composition with zoom/orientation and editable annotation list.
- Timed playback/recording simulation with seek, mute and waveform. No audio device is accessed.
- Fixed diagram with selection, zoom and horizontal pan; fictional native vector map with marker selection and zoom.

- Native PDF frontend fixture with three pages, zoom, text search, page notes and saved notes. This does not decode PDF files.
- Live equation plotting for x, x^2, sin(x), cos(x), constrained point movement and viewport controls.
- Projected 3D cube with live yaw, zoom and reset; chart fixture with column/dot/bubble styles and selectable data.

## Explicit limits

This crate is a working fixture demo, not a production office/media engine. It does not implement DOCX/XLSX/PPTX codecs, arbitrary Mermaid parsing, image decoding or true pixel rotation, real maps, media decoding, recording devices, transcription, generative edits or arbitrary HTML. Formula grammar is numeric literals and SUM rectangular A:C ranges only. Other expressions produce visible errors. Production source-map/review/PDF/math/3D engines remain catalog items despite the interactive fixture surfaces. JSON persistence is local and does not imply cloud sync.

## Verification

Run `cargo check -p native-rich` and `cargo test -p native-rich --lib`. Pure model tests cover formula recalculation, cycles/range errors, numeric sorting, slide selection invariants, bounded playback/zoom and serialization. Interactive GPUI windows still require host smoke testing.
### Headless native interaction tests

`cargo test -p native-rich --features ui-tests --lib` enables GPUI Kit test support. The opt-in tests open real headless GPUI windows, render native surfaces, click observed controls, dispatch keyboard text and Enter, then save and reopen from isolated temporary storage. They cover spreadsheet editing, slide editing/reordering and the blocked UI for corrupt persisted data. These are interaction/layout tests, not rendered-pixel or Windows device tests. The feature is disabled in the normal application build.
### Document and workbook editing controls

The document toolbar applies bold, italic, a URL link or a bulleted list to the native Textarea selection (inserting a placeholder if selection is empty). Literal case-sensitive Find next selects a match; Replace selected and Replace all use native edit history. Ctrl+Z/Ctrl+Y remain available. Link destinations are explicit in the URL field.

Workbook selection supports Shift-click, an explicit Extend range toggle, row/column headers and keyboard-accessible direction controls. Selection and per-column widths persist. Narrower/Wider adjust the active column from 90 to 360 px. Copy range writes TSV to the clipboard; Fill selection uses the formula-bar value for every selected cell. Resizing is button-driven, not a draggable separator. Image annotations include a native color picker; each new note retains its chosen color.