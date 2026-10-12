# Rich content native Windows acceptance catalog

This catalog specifies interactive demo frontend families for full v1. Real backends are not required; fixture simulations are explicit. Production engine fidelity is separate. WebView2 is allowed only for web content. Every family is **not_implemented**. It does not claim that the native app currently has these capabilities. Static bundle evidence is not runtime verification. The extracted assets contain Codex and shared ChatGPT identifiers; account gates and product exposure remain unknown.

## Native engine boundary

Rust native UI can replace Electron surfaces, but document layout, spreadsheet calculation, PDF, media, 3D, diagrams and arbitrary web artifacts each require real engines. Arbitrary HTML/CSS/JavaScript requires a browser engine or a clearly restricted native DSL. Native-only mode must explicitly reject unsupported artifacts. Service-backed inference, routing, upload and collaboration remain adapters; no frontend catalog supplies those services.

## Acceptance rules

- Functional fixtures, persistence, keyboard/IME and failure recovery must pass before changing status.
- A component gallery, static screenshot or placeholder does not satisfy acceptance.
- Original unsupported/gated options remain explicit. Spreadsheet schema fields do not prove editing support.
- The LaTeX syntax chunk proves grammar support, not bundled compilation.

## composer

- Rust: `composer::MessageComposer`; class: composition; native_status: **not_implemented**.
- Input: Draft text/document, attachments, reply context, keyboard/clipboard/drop events.
- Processing: Maintain draft and selection; validate input; emit send/cancel/dictate commands.
- Output: Editable draft and typed commands; preserve draft on failure.
- Native engines: IME-capable native text editor; clipboard and drag/drop.
- External dependencies: message transport; dictation service.
- Evidence: `extracted/webview/assets/composer-controls-673b82b7d381.js`.
- Limitations: Paste/drop/removal, dictation/send and reply UI inspected; messaging-specific limits must not be globalized.

Acceptance:

- [ ] Type accented text and IME composition; Enter sends once and Shift+Enter inserts newline
- [ ] Paste text and multiple files; failed send preserves text and attachment queue

## attachment_queue

- Rust: `attachments::AttachmentQueue`; class: composition; native_status: **not_implemented**.
- Input: Files and upload progress/results.
- Processing: Validate configured limits; queue, cancel, retry and remove.
- Output: Attachment chips and explicit queued/uploading/failed/unavailable states.
- Native engines: file dialogs; thumbnail decode.
- External dependencies: upload/download provider.
- Evidence: `extracted/webview/assets/composer-controls-673b82b7d381.js`.
- Limitations: Eight-file/20 MB strings occur in a messaging branch; applicability elsewhere unknown.

Acceptance:

- [ ] Cancel upload then retry without duplicate attachment
- [ ] Unavailable file and rejected file show distinct actionable errors

## markdown

- Rust: `rich_text::MarkdownView`; class: engine; native_status: **not_implemented**.
- Input: Markdown plus typed custom content references and streaming fragments.
- Processing: Parse AST; lay out selectable text/code/tables/math and dispatch embedded views.
- Output: Native rich content plus link/reference actions.
- Native engines: Markdown parser; text shaping; syntax highlighting.
- External dependencies: linked assets.
- Evidence: `extracted/webview/assets/chatgpt-markdown-view-6383cfd02a00.js`, `extracted/webview/assets/conversation-markdown-96073a19fcc0.js`.
- Limitations: Custom code/chart/image/link and learning-content branches inspected; full grammar parity unverified.

Acceptance:

- [ ] Render nested lists/table/code/math fixture and copy selected text accurately
- [ ] Append streaming fragments without losing selection or scroll position

## text_editor

- Rust: `editors::TextDocumentEditor`; class: engine; native_status: **not_implemented**.
- Input: File bytes/path, encoding, edits and search queries.
- Processing: Maintain text/history; highlight, search, preview and save atomically.
- Output: Editor state, match navigation, saved bytes or explicit errors.
- Native engines: incremental text buffer; IME; syntax lexer; file IO.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/text-file-editor-tab-content.electron-7740fe89f2cf.js`, `extracted/webview/assets/text-file-editor-search-panel-6a8aa4ccdb75.js`, `extracted/webview/assets/text-file-editor-extensions-df25d2549997.js`.
- Limitations: Source/preview/copy/find/read-only/unsaved/error states inspected.

Acceptance:

- [ ] Edit/save/reopen file; undo restores prior text
- [ ] Find next/previous; toggle Markdown preview; cancel unsaved close
- [ ] Large-file fixture opens read-only with explanation

## writing_blocks

- Rust: `writing::WritingBlock`; class: composition; native_status: **not_implemented**.
- Input: Structured writing draft and selected range.
- Processing: Edit and issue explicit transformation requests.
- Output: Updated draft or proposed edit with accept/reject.
- Native engines: rich text editor.
- External dependencies: optional rewriting service.
- Evidence: `extracted/webview/assets/writing-block-editor-ce8d20140432.js`, `extracted/webview/assets/editable-writing-block-76b316ad4a95.js`, `extracted/webview/assets/chatgpt-writing-block-ai-tools-f4f9c9fb93cb.js`.
- Limitations: Chunks enumerated; detailed actions not exhaustively inspected.

Acceptance:

- [ ] Edit a block independently of chat history
- [ ] Transformation failure preserves original draft

## document_session

- Rust: `documents::DocumentSession`; class: engine; native_status: **not_implemented**.
- Input: Document snapshot/revision, transactions, remote updates, presence.
- Processing: Validate revisions/operations; group history; reconcile changes and anchors.
- Output: Committed revision, rejection/recovery and cursor/presence events.
- Native engines: transaction engine; CRDT/OT-compatible collaboration model.
- External dependencies: optional collaboration transport.
- Evidence: `extracted/webview/assets/document-session-53c3feae1bbe.js`, `extracted/webview/assets/document-model-5c69a6a854ee.js`.
- Limitations: Revision/history/presence/recovery inspected; yjs-cursor/yjs-undo strings observed.

Acceptance:

- [ ] Undo grouped local edits without undoing remote edits
- [ ] Reject stale/invalid operation and preserve document
- [ ] Close session cleans up presence; read-only rejects mutations

## document_editor

- Rust: `documents::DocumentEditor`; class: engine; native_status: **not_implemented**.
- Input: Document model with paragraphs, tables and drawing objects.
- Processing: Paginate/layout; edit text and embedded objects; apply format transactions.
- Output: Editable paginated view and model updates.
- Native engines: text shaping/pagination; 2D scene graph; table layout.
- External dependencies: image assets; optional document codec.
- Evidence: `extracted/webview/assets/PopcornElectronDocumentPanel-1ab83da35d77.js`, `extracted/webview/assets/draw-document-to-ctx-7e9cc2763202.js`.
- Limitations: Insertion, text formatting, source data/chart controls inspected; complete DOCX fidelity not established.

Acceptance:

- [ ] Insert text/image/chart/table/shape and save/reopen model
- [ ] Change font/alignment/fill/borders; undo exact prior state
- [ ] Resize page and verify selections retain correct anchors

## workbook_model

- Rust: `spreadsheets::WorkbookModel`; class: engine; native_status: **not_implemented**.
- Input: Sheets/cells/styles/formulas/named ranges and metadata.
- Processing: Evaluate dependency graph and validate transactional edits.
- Output: Calculated values/errors and stable workbook snapshot.
- Native engines: formula parser/evaluator; cell storage; dependency graph.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/spreadsheet-39872aab4541.js`, `extracted/webview/assets/spreadsheet-df79eb6d3926.js`, `extracted/webview/assets/workbook-a5fd35d4d2b0.js`.
- Limitations: Formula/shared-array/pivot/conditional-format/sparkline schema fields observed; schema presence does not prove edit support.

Acceptance:

- [ ] Recalculate dependent formulas after change
- [ ] Detect cycles and malformed formulas without hang
- [ ] Round-trip styles and validation metadata

## workbook_editor

- Rust: `spreadsheets::WorkbookEditor`; class: engine; native_status: **not_implemented**.
- Input: Workbook model, selected range, viewport and edit commands.
- Processing: Virtualize cells; edit formulas; merge/fill/resize/filter/sort/format.
- Output: Rendered grid, range selection and workbook transactions.
- Native engines: virtualized grid; formula editor; range clipboard; frozen-pane geometry.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/workbook-panel-7a161e905940.js`, `extracted/webview/assets/freeze-panes-dca45108f6fc.js`.
- Limitations: Original contains 'Formatting these cells is not supported yet' and 'Not yet available for spreadsheets'; unsupported menu branches must be explicit.

Acceptance:

- [ ] Navigate/edit 100000-row fixture without rendering every cell
- [ ] Merge/unmerge; fill down/right; resize/autofit and undo
- [ ] Add/rename/delete sheet; filter/sort; apply validation and conditional formatting
- [ ] Frozen panes and range selection remain correct during scrolling

## workbook_codecs

- Rust: `spreadsheets::WorkbookCodec`; class: engine; native_status: **not_implemented**.
- Input: CSV/Markdown/XLSX bytes and export options.
- Processing: Parse/serialize without silent loss; report unsupported features.
- Output: Workbook or exported bytes plus fidelity warnings.
- Native engines: CSV parser; Markdown table parser; XLSX ZIP/XML codec.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/workbook-from-csv-321c2b0af158.js`, `extracted/webview/assets/workbook-from-markdown-761249e6d0b9.js`, `extracted/webview/assets/workbook-export-133809f15456.js`.
- Limitations: Codec filenames enumerated; full round-trip formats and fidelity not yet verified.

Acceptance:

- [ ] Import CSV containing quotes/newlines and preserve cell values
- [ ] Export/reopen supported XLSX fixture; report unsupported metadata

## presentation

- Rust: `presentations::PresentationEditor`; class: engine; native_status: **not_implemented**.
- Input: Slides, notes, shapes/text/images/charts/tables and input events.
- Processing: Select/transform/reorder objects; edit slides and format properties.
- Output: Editable slide scene and reversible model transactions.
- Native engines: 2D scene graph; hit testing; text editor; PPTX codec.
- External dependencies: image assets.
- Evidence: `extracted/webview/assets/presentation-panel-bb4e35846cf4.js`, `extracted/webview/assets/presentation-2d2953ab876c.js`, `extracted/webview/assets/presentation-image-assets-612a64b5d83a.js`.
- Limitations: Slide templates/grid, notes, chart/table editing, opacity/strokes/z-order and PPTX extension inspected.

Acceptance:

- [ ] Insert/duplicate/hide/delete slides; reorder and edit notes
- [ ] Insert and resize table; reorder rows/columns with keyboard
- [ ] Change chart/legend/axes and object z-order; undo
- [ ] Export/reopen supported PPTX fixture with explicit fidelity report

## pdf

- Rust: `pdf::PdfReviewPane`; class: engine; native_status: **not_implemented**.
- Input: PDF bytes, page/zoom, annotations and optional source map.
- Processing: Render virtualized pages; map selection/clicks to source; collect comments.
- Output: Readable pages and annotation/source-location actions.
- Native engines: native PDF render/text engine; page cache.
- External dependencies: optional edit-request provider.
- Evidence: `extracted/webview/assets/pdf-preview-panel-9561a1494340.js`, `extracted/webview/assets/pdf-preview-diff-932b5cdd5695.js`, `extracted/webview/assets/pdf-6ebdda94c915.js`.
- Limitations: PDF annotation/source location inspected; diff chunk enumerated, detailed diff semantics unverified.

Acceptance:

- [ ] Open multi-page PDF, zoom and navigate while maintaining annotation positions
- [ ] Click mapped page location or Enter to locate source
- [ ] Malformed/encrypted PDF reports failure without crash

## math_typesetting

- Rust: `math::EquationView`; class: engine; native_status: **not_implemented**.
- Input: Math expression and edit/selection events.
- Processing: Parse/type-set equations and maintain edit model.
- Output: Selectable accessible equation or precise parse error.
- Native engines: math parser/layout; math fonts; native equation editing.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/katex-b62b0c0d6a07.js`, `extracted/webview/assets/rehype-katex-306cbb023acf.js`, `extracted/webview/assets/mathlive.min-c4bd9636f76e.js`.
- Limitations: KaTeX/MathLive engine files bundled; complete expression/edit parity not runtime verified.

Acceptance:

- [ ] Render fractions/matrices/scripts and copy expression text
- [ ] Invalid input remains editable with error location

## latex_source

- Rust: `editors::LatexEditor`; class: composition; native_status: **not_implemented**.
- Input: TeX source and compile request.
- Processing: Edit/highlight; invoke separately configured compiler; map diagnostics.
- Output: Saved source, diagnostics and optional PDF preview.
- Native engines: text editor; optional native TeX compiler.
- External dependencies: compiler distribution/fonts if compilation enabled.
- Evidence: `extracted/webview/assets/latex-60a93e5746e6.js`, `extracted/webview/assets/tex-88a281e4c36a.js`, `extracted/webview/assets/pdf-preview-panel-9561a1494340.js`.
- Limitations: latex chunk imports TeX grammar; this evidence does NOT establish bundled compilation. Compile acceptance is proposed functionality, not recovered behavior.

Acceptance:

- [ ] Edit/save TeX without compiler present
- [ ] Compile fixture through configured engine; report line errors and preview PDF

## interactive_math

- Rust: `math::InteractivePlot`; class: engine; native_status: **not_implemented**.
- Input: Equations, domains, draggable points, restrictions and viewport.
- Processing: Sample curves; apply constraints; map coordinates and gestures.
- Output: Interactive plot with stable labels and point values.
- Native engines: expression evaluator; adaptive sampler; 2D plotting.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/math-block-coordinate-plane-2798ca12d1cd.js`, `extracted/webview/assets/math-block-graph-a414ede8cf78.js`, `extracted/webview/assets/math-block-viewport-97562af6b93b.js`, `extracted/webview/assets/interactive-chart-f408b0d0debe.js`, `extracted/webview/assets/chatgpt_math_blocks-75ddf978e7bd.js`.
- Limitations: Coordinate mapping/sampling/labels and Chart.js zoom/Hammer imports inspected.

Acceptance:

- [ ] Pan/zoom and drag constrained point; verify coordinates numerically
- [ ] Discontinuity fixture does not connect across asymptote

## diagrams

- Rust: `diagrams::DiagramView`; class: engine; native_status: **not_implemented**.
- Input: Diagram source, family, theme and export action.
- Processing: Parse/layout/render; preserve semantic labels and report parse errors.
- Output: Native diagram scene and exported image/vector.
- Native engines: diagram grammars; graph layout; vector renderer.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/mermaid-diagram-5f4aab898147.js`, `extracted/webview/assets/chatgpt-mermaid-preview-actions-d8d094561ea4.js`, `extracted/webview/assets/mermaid.core-2bb0614a5c95.js`, `extracted/webview/assets/sequenceDiagram-DBY2YBRQ-1d575def6496.js`, `extracted/webview/assets/architectureDiagram-ZJ3FMSHR-48dc2768043f.js`.
- Limitations: Enumerated families: flow/sequence/ER/gantt/git/block/C4/architecture/mindmap/quadrant/requirement/sankey/venn/wardley/xy/ABNF/ishikawa/journey. Native Mermaid source parity is a major engine project; pre-rendered SVG alone is not parity.

Acceptance:

- [ ] Render fixture per supported family and export legible output
- [ ] Malformed source returns positioned error; keyboard zoom works

## charts

- Rust: `charts::ChartView`; class: engine; native_status: **not_implemented**.
- Input: Typed series/data, scales, style and interaction commands.
- Processing: Compute scales/layout/hit tests; render and expose data table.
- Output: Interactive chart with tooltips/selection/export.
- Native engines: chart renderer; axis/tick layout.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/interactive-chart-f408b0d0debe.js`, `extracted/webview/assets/CartesianChart-e8628fda1e75.js`, `extracted/webview/assets/ComposedChart-5142795cbf43.js`, `extracted/webview/assets/chart-content-reference-441c4b420241.js`.
- Limitations: Chart engines inspected; named workbook menu choices can be gated, not guaranteed operational.

Acceptance:

- [ ] Render bar/line/pie/area/scatter/histogram/waterfall/funnel/treemap fixtures
- [ ] Empty/missing/negative data have defined behavior
- [ ] Keyboard exposes data equivalent to hover

## maps

- Rust: `maps::MapPanel`; class: engine; native_status: **not_implemented**.
- Input: Map viewport, places, route stops and search actions.
- Processing: Render map; select places; request search/routing through adapter.
- Output: Map/detail/itinerary view and provider errors.
- Native engines: native tile/vector renderer; geo projection.
- External dependencies: licensed tile/style provider; geocoding/routing/search provider.
- Evidence: `extracted/webview/assets/hosted-map-86562d84d282.js`, `extracted/webview/assets/mapbox-canvas-30df8d52a28e.js`, `extracted/webview/assets/mapbox-gl-f4d05716cad3.js`.
- Limitations: Search Here/place/details/route-mode/day/stops inspected. Search/geocoding/routing are external services.

Acceptance:

- [ ] Pan/zoom/select place; Search Here targets visible bounds
- [ ] Show multistop/day itinerary and travel mode/duration
- [ ] Offline/provider failure retains current map with explicit error

## image_gallery

- Rust: `images::ImageGallery`; class: composition; native_status: **not_implemented**.
- Input: Image collection, selection and navigation/save actions.
- Processing: Decode/cache images; navigate/open preview; save via adapter.
- Output: Gallery/lightbox and download success/failure.
- Native engines: image decoding; texture cache.
- External dependencies: optional asset provider/share adapter.
- Evidence: `extracted/webview/assets/generated-image-gallery-bd408a6e3331.js`.
- Limitations: Edit/preview/share/save/canvas/navigation labels inspected.

Acceptance:

- [ ] Navigate previous/next and close preview by keyboard
- [ ] Download selected image and verify bytes; failed load is explicit

## image_editor

- Rust: `images::ImageEditor`; class: engine; native_status: **not_implemented**.
- Input: Image, masks/strokes, brush size, resize and edit requests.
- Processing: Transform coordinates; maintain reversible markup/masks; dispatch service edits.
- Output: Local overlay/export or pending/result/error service state.
- Native engines: raster/vector compositing; mask model; history.
- External dependencies: optional generative edit/background removal provider.
- Evidence: `extracted/webview/assets/image-tools-toolbar-1c6b2faef234.js`, `extracted/webview/assets/image-drawing-1a53acf60bad.js`.
- Limitations: Brush/remove/erase/markup/BG remove/resize controls inspected; algorithm locality not established.

Acceptance:

- [ ] Draw/erase at zoom and undo/redo precisely
- [ ] Resize presets preserve declared aspect ratio
- [ ] Service failure preserves original and mask

## animated_images

- Rust: `images::AnimatedImageEditor`; class: engine; native_status: **not_implemented**.
- Input: Animated image frames/timing, frame index and comments.
- Processing: Composite frames correctly; playback/scrub/speed; annotate/export.
- Output: Animated view, frame/GIF export and positioned comments.
- Native engines: GIF decode/encode; frame scheduler; clipboard image.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/image-side-panel-52fa25a9c71b.js`.
- Limitations: GIF controls, frame actions, comments and movable toolbar inspected.

Acceptance:

- [ ] Play/pause/select frames and change speed
- [ ] Copy/download frame; export GIF and verify timings/disposal
- [ ] Annotations remain attached to correct frame and coordinates

## artifact_review

- Rust: `review::AnnotationLayer`; class: composition; native_status: **not_implemented**.
- Input: Artifact identity/revision, stable anchor and comment edits.
- Processing: Resolve anchors; edit/batch comments; send explicit requests.
- Output: Persistent comment set and review actions/status.
- Native engines: anchor geometry; text editor; transaction integration.
- External dependencies: optional review/edit-request transport.
- Evidence: `extracted/webview/assets/annotation-comment-editor-card-c849b85f5f78.js`, `extracted/webview/assets/artifact-annotation-batch-controls-99c7e3731fd3.js`, `extracted/webview/assets/PopcornReviewBarOverlay-901375da02eb.js`.
- Limitations: Shared review files enumerated; concrete image/PDF annotation actions inspected.

Acceptance:

- [ ] Place/edit/delete comment and reopen artifact
- [ ] Changing zoom preserves pin position; deleted anchor shows orphan state
- [ ] Batch failure does not silently drop comments

## audio

- Rust: `media::AudioPlayer`; class: composition; native_status: **not_implemented**.
- Input: Audio bytes/stream and playback commands.
- Processing: Decode/buffer/play/pause; expose progress; save source.
- Output: Audible playback and explicit media/device errors.
- Native engines: native audio decoder/output; device handling.
- External dependencies: optional stream provider.
- Evidence: `extracted/webview/assets/audio-23d4f6f19a9c.js`, `extracted/webview/assets/chatgpt-audio-playback-button-1b8191a7f555.js`.
- Limitations: Play/pause/download labels inspected; seek controls not established from inspected snippets.

Acceptance:

- [ ] Play/pause/download known audio fixture
- [ ] Unplug/change output device gracefully; bad media reports error

## video

- Rust: `media::VideoPlayer`; class: engine; native_status: **not_implemented**.
- Input: Video source and playback/lightbox/frame commands.
- Processing: Decode/synchronize audio/video; render frames and navigate collection.
- Output: Native video playback/lightbox and captured frame.
- Native engines: Windows Media Foundation or equivalent native decode; GPU frame upload.
- External dependencies: optional video provider.
- Evidence: `extracted/webview/assets/video-1fb0062dbe33.js`, `extracted/webview/assets/chatgpt-video-lightbox-1f502990eeba.js`, `extracted/webview/assets/async-video-carousel-efe1bdd4be65.js`, `extracted/webview/assets/capture-video-frame-3bc494c51023.js`.
- Limitations: Video/lightbox/carousel/frame-capture modules enumerated; full control behavior unverified.

Acceptance:

- [ ] Play A/V synchronization fixture; resize/fullscreen without restart
- [ ] Capture frame and navigate carousel; missing codec shows error

## voice_session

- Rust: `voice::VoiceSessionPanel`; class: composition; native_status: **not_implemented**.
- Input: Session settings, device events, audio/video/screen streams and transport state.
- Processing: Coordinate capture/transport/playback and session lifecycle.
- Output: Voice focus UI, transcript, media controls and connection errors.
- Native engines: WASAPI audio capture/output; camera/screen capture; echo cancellation.
- External dependencies: voice inference/realtime transport provider.
- Evidence: `extracted/webview/assets/voice-session-82332de4a122.js`.
- Limitations: Connecting/transcribing/capacity/focus/voice/language/camera/screen controls inspected; inference is external.

Acceptance:

- [ ] Start/end session; mute and stop sharing cease capture
- [ ] Simulate reconnect/capacity failure/poor connection without frozen UI
- [ ] Choose language/voice; show transcript and playback errors

## voice_preferences

- Rust: `voice::VoicePreferences`; class: composition; native_status: **not_implemented**.
- Input: Voice/language/dictionary/hotkey configuration and recording history.
- Processing: Validate/persist settings; manage recordings; request retranscription.
- Output: Settings state and copy/download/retry actions.
- Native engines: global hotkey; local storage; audio file IO.
- External dependencies: voice-list/transcription provider.
- Evidence: `extracted/webview/assets/voice-settings-b01c053349a0.js`.
- Limitations: Voice, language, dictionary, hotkey, recent recordings/actions inspected; source contains macOS-specific screen-context copy.

Acceptance:

- [ ] Persist dictionary/language and register hotkey with conflict error
- [ ] Copy/download recording; retry failed transcription
- [ ] Windows permissions text matches actual platform

## recording_dsp

- Rust: `voice::Recorder`; class: engine; native_status: **not_implemented**.
- Input: PCM frames/device events and record/stop commands.
- Processing: Buffer/resample/process audio; finalize recording and confirm stop.
- Output: Recorded audio, levels/VAD and explicit stopped/unknown/error state.
- Native engines: realtime ring buffer; resampler; DSP/VAD; audio capture.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/recording-control-43edadd34c0c.js`, `extracted/webview/assets/voice-dsp-209836305db2.js`, `extracted/webview/assets/dictation-audio-worklet-5c2f03781068.js`, `extracted/webview/assets/realtime-buffered-audio-worklet-550138dc2d39.js`, `extracted/webview/assets/vad-audio-frame-processor-b6bea101f49a.js`.
- Limitations: Stop failure wording inspected; DSP/worklet modules enumerated, algorithms not fully inspected.

Acceptance:

- [ ] Record fixture and verify duration/sample rate
- [ ] Stop confirmation failure remains explicit; no false stopped state
- [ ] Capture thread avoids blocking file/network IO

## voice_visualization

- Rust: `voice::VoiceVisualization`; class: primitive; native_status: **not_implemented**.
- Input: Voice state and normalized audio levels.
- Processing: Animate state transitions with bounded rendering cost.
- Output: Native animated orb/level visual plus accessible state label.
- Native engines: GPU/vector animation.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/horizon-voice-orb-controller-17a1ed1ea156.js`.
- Limitations: Controller chunk enumerated; exact visual/timing parity unverified.

Acceptance:

- [ ] Drive idle/listening/speaking/error fixtures
- [ ] Reduced-motion mode communicates same state

## scene3d

- Rust: `scenes::SceneViewport3d`; class: engine; native_status: **not_implemented**.
- Input: Scene equations/geometry/restrictions and camera events.
- Processing: Sample meshes/curves; orbit/pick/project labels.
- Output: Interactive scene with reset and XY orientation.
- Native engines: native GPU renderer; camera/orbit; expression sampling.
- External dependencies: none required for core local behavior.
- Evidence: `extracted/webview/assets/three-3d-renderer-be4ee3530d16.js`, `extracted/webview/assets/three.module-859594e5f29f.js`, `extracted/webview/assets/OrbitControls-5154c5320372.js`.
- Limitations: Three.js/OrbitControls/equation imports and reset/XY labels inspected.

Acceptance:

- [ ] Orbit/zoom/reset then select XY orientation deterministically
- [ ] Render curve/surface restrictions and verify coordinate labels
- [ ] GPU/device failure reports recoverable state

## html_visualization

- Rust: `artifacts::VisualizationHost`; class: engine; native_status: **not_implemented**.
- Input: Untrusted HTML/CSS/JS artifact with declared capabilities.
- Processing: Execute only inside isolated browser engine OR validate and translate restricted native scene DSL.
- Output: Interactive artifact or explicit unsupported-format result.
- Native engines: browser engine for arbitrary web parity OR restricted native DSL interpreter.
- External dependencies: artifact resources subject to policy.
- Evidence: `extracted/webview/assets/visualization-standalone-document-c473ea74403b.js`, `extracted/webview/assets/visualization-sandbox-html-9789fcd97fb6.js`, `extracted/webview/assets/visualization-sandbox-config-6b6f7f81aeb3.js`.
- Limitations: Observed sandboxed iframe with allow-scripts and codex-visualization id. Arbitrary HTML/CSS/JS cannot be preserved by Rust widgets alone; no Electron is compatible with a separate web engine, but no browser engine requires restricted scope.

Acceptance:

- [ ] HTML fixture containing script cannot access native filesystem/IPC by default
- [ ] Dynamic content updates measured height without layout loop
- [ ] Native-only mode rejects unsupported HTML instead of displaying fake functional preview
