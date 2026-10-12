# Native frontend: product coverage audit

Static source snapshot, not a parity or runtime-verification claim. The goal is an application with fixture-backed workflows, not a component gallery. Native source paths below are relative to native/crates; original paths are relative to extracted.

## Evidence levels

- Original evidence establishes constructs in the shipped bundle, not account enablement or every original screen.
- Upstream availability means source exists in gpui-component 0.7.3. The real application dependency gpui-kit 0.7.3 reexports it as gpui_kit::component (kit src/lib.rs:165). Availability is not integration or matching behavior.
- Demo implementation means source has controls/state/actions. This audit did not build, launch or visually test them.
- Remaining work concerns frontend decisions with local fixtures. Backend inference, transcription, OAuth, providers and binary codecs are excluded.

## Previous functional baseline (superseded by VERIFICATION.md)

The earlier functional baseline suite passed **63/63 tests**: core 10, rich 19, settings 11, tools 9 and app 14. This includes **23 native headless UI integration tests**: rich 5, settings 4, tools 3 and app 11. Counts describe test execution, not a parity percentage or a Windows visual/UI Automation assessment.

Settings tests cover radio Arrow/Home navigation and focus, theme/font controls, shortcut editing and duplicate rejection, and explicit corruption recovery preserving the exact original bytes. A clock-resolution collision between parallel temporary directories was fixed with an atomic per-process suffix shared by staging, backups and test storage. The settings test executable was then repeated **five times with all 11 tests passing each run**, without disabling parallelism.

Shell tests cover modal focus, direct model/project choices, pagination, attachment lifecycle/isolation, reduced motion and route layouts. Rich tests cover persisted sheets/slides, corruption protection, document selection editing and workbook range/width behavior. Tool UI tests cover real calendar clicks with validated schedules, native checkbox permissions, and diff resizing/comments. These verified scenarios do not establish every original primitive or every edge case. The parent also reports a native WebView2/DOM smoke run exited 0 with all 11 checks passing: home and notes content, Go, Back, Forward, Reload, dashboard, Enter navigation and invalid external navigation handling. The with_html generated data:text/html base64 URL now passes an exact generated-URL allowlist. Evidence: qa/webhost-verified.json. This verifies the fixture browser flow, not arbitrary external-site compatibility.

## Priority gaps and recently closed source gaps

1. **Modal baseline implemented and tested**: shell overlays now use FocusTrapElement, occlusion, initial modal focus, Escape capture and focus restoration. The parent reports the four baseline shell UI tests pass. Nested dismissable layers, Windows UIA/Narrator labels and outside-dismiss policies still need dedicated checks. Original shared JS contains FocusScope, DismissableLayer and DialogTitle.

2. **Direct choices implemented and tested**: model and project dialogs expose explicit options, replacing cycling/first-project assignment. Source: native-app/src/app.rs::Action::Model/ChooseModel and native-app/src/views.rs::dialog_view. Original select and dropdown implementations remain evidence, not proof of exact visual equivalence.

3. **Attachment fixture lifecycle implemented and tested**: queues are keyed by conversation ID, with queued/ready/failed, retry and cancel/remove actions. Completion checks both ID and attempt to prevent stale results. Pending queues are session-only; ready attachment filenames persist in messages. Native OS file picking/drag-drop and progress detail remain uncovered. Source: native-app/src/app.rs::current_attachments and native-app/src/views.rs::chat_view.

4. **Navigation partially improved**: recents have Show more in pages of 30; stream bottom-follow uses a 48px proximity threshold. Project/file hierarchy, active-row reveal and virtualized variable-height transcripts remain gaps. Source: native-app/src/views.rs::sidebar_view and native-app/src/app.rs::stream_response. Original: virtualized-turn-list-93f4162a687b.js, base-file-tree-f18041e294eb.js, tree-scroll-36725f65cbb1.js.

5. **Editor/workbook decisions**: source now provides Bold/Italic/Link/List through native Textarea selection replacement, literal find-next/replace-selected/replace-all and undo. Workbook range/row/column selection, Shift-click/Extend, arrow-button movement, retained width controls (90–360px), copy TSV and fill-range are implemented. Related UI/model tests passed centrally. Full original editor engines are outside demo scope. Original: writing-block-editor-ce8d20140432.js, text-file-editor-search-panel-6a8aa4ccdb75.js, workbook-panel-7a161e905940.js.

6. **Resizable work surfaces partially covered**: review now has a real native resizable diff plus keyboard size buttons; tool resize/comment UI tests pass. Cross-session width persistence, DPI behavior and reuse across other work surfaces remain separate acceptance items. Original: split-view-194f08a5d0cd.js.

7. **Feedback workflows**: inline notices and attachment retry cover some states, but transient toast queues, skeletons, announcements and shared busy/disabled contracts remain gaps. Original: shared toast store and loading-placeholder-8d41ffaba1ef.js.

8. **Settings effect boundaries**: saved theme/font apply globally; shell uses semantic tokens. Reduced motion now causes instant fixture response completion instead of streaming. Language explicitly states it is a stored demo preference and the interface stays English. Native radio section navigation now owns explicit roving focus and Arrow/Home/End handling; useful action tooltips are integrated. All four settings UI tests pass, including corrected radio navigation and focus; the full settings executable also passed five repeated runs. Voice and notifications remain labeled local simulations.

## Implemented application flows observed in source

Chat creation, rename, pin/archive/delete, local search, copy/share snapshot, branch/edit/regenerate and fixture streaming are wired to local domain state. Projects/documents have create/edit/save/delete flows. Settings retains one entity across routes and has save/reload/reset/recovery. Eleven rich routes contain interactive local fixtures; five tool routes provide automation editing/run history, connector permission states, code-review comments/staging, safe terminal simulation and a separate WebView2 content host verified by the 11-check native/DOM smoke report (qa/webhost-verified.json). Automation uses DatePicker/Select with schedule validation; connection permissions use native Checkbox controls and tooltips.

These are useful workflows; they do not establish completeness. Backend/codec absence is not counted as a frontend defect.

## Primitive-family matrix

Rows describe static source coverage. The test snapshot above records the limited verified baseline; other behavior remains pending runtime verification. Precise literal snippets and upstream declaration paths are in primitives.json.

| Family | Original evidence | Upstream candidates | Demo source coverage | Remaining verification |
|---|---|---|---|---|

| theme | webview/assets/app-shared-9a94b907ed47.css | theme | Settings apply saved theme; header uses the settings entity. Verify all nested surfaces and restart. Source: native-settings/src/lib.rs::apply_theme; native-app/src/views.rs::render | Change semantic theme and verify all surfaces update; runtime unverified. |
| typography | webview/assets/app-shared-9a94b907ed47.css | text | Settings apply global font size; original typography/metrics are not reproduced. Verify DPI and clipping. Source: native-settings/src/lib.rs::apply_theme | Render Unicode and font weights at three DPI levels; runtime unverified. |
| button | webview/assets/button-52dfb42b12be.js | button | App/tool/rich controls use kit Button with event handlers. Verify focus keyboard labels and disabled states. Source: native-app/src/views.rs::button; native-tools/src/lib.rs::button | Loading disabled and pressed states; pointer/key activation once; runtime unverified. |
| checkbox | webview/assets/app-shared-737655e1fb23.js | checkbox | Connection permission workflow uses native Checkbox; permission UI test passed. Source: native-tools/src/lib.rs | Mixed/disabled states and Windows UIA remain unverified. |
| switch | webview/assets/app-shared-737655e1fb23.js | switch | Settings switches mutate draft and save. Verify keyboard and persisted state. Source: native-settings/src/lib.rs::render | Toggle checked state by keyboard and pointer; runtime unverified. |
| radio_group | webview/assets/radio-group-434f5f94e777.js | radio | Settings native radio group owns roving focus, Arrow/Home/End selection and wrap; keyboard/focus UI test passed. Source: native-settings/src/lib.rs::render | Selection/focus exercised headlessly; Windows UIA and visual focus ring still need assessment. |
| toggle_group | webview/assets/app-shared-737655e1fb23.js | button | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Activate/deactivate single option with one change event; runtime unverified. |
| segmented_control | webview/assets/SegmentedControl-23a4006850e2.js | button | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Selected thumb aligns during resize; runtime unverified. |
| slider | webview/assets/app-shared-737655e1fb23.js | slider | Settings font-size slider has preview/save. Verify accessible range and key steps. Source: native-settings/src/lib.rs::render | Clamp current value to min/max and expose orientation; runtime unverified. |
| range_input | webview/assets/range-slider-5c9566973ec1.js | slider | Only the single-value font slider is integrated; no range selection. Source: native-settings/src/lib.rs::render | Keep thumb synchronized with endpoint values; runtime unverified. |
| number_input | webview/assets/format-number-input-b026fe0339b2.js | input | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Preserve partial decimal text and enforce precision on commit; runtime unverified. |
| text_input | webview/assets/input-474eb7f2698c.js | input | Native Inputs/Textareas retain entities across routes. IME selection undo clipboard remain unverified. Source: native-app/src/views.rs; native-settings/src/lib.rs | Support IME undo clipboard caret and demo suggestions; runtime unverified. |
| select | webview/assets/select-c16e3005a3c5.js | select, combobox | Theme/language/voice and automation frequency use native Select; model/project dialogs expose direct options. Relevant settings/tool/app UI tests passed. Source: native-settings/src/lib.rs::choice; native-app/src/app.rs::Action::Model/AssignProject | Open using keyboard select clear disabled and loading options; runtime unverified. |
| popover | webview/assets/popover-27c4fbdc9c29.js | popover, hover_card | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Respect hover delay and restore focus after outside dismissal; runtime unverified. |
| tooltip | webview/assets/app-shared-737655e1fb23.js | tooltip | Settings actions and tool permissions expose tooltips. Source: native-settings/src/lib.rs::render | Show focused/hovered description with configured delay; runtime unverified. |
| dialog | webview/assets/dialog-shell-df796bfbc480.js | dialog | Search/rename/delete/attachments/model/project overlays use FocusTrapElement, occlusion, Escape and focus restoration; four baseline shell UI tests passed. Source: native-app/src/views.rs::dialog_view | Respect modal focus and outside dismissal policy; runtime unverified. |
| menu | webview/assets/app-shared-737655e1fb23.js | menu, native_menu | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Navigate checkable enabled entries and Escape closes; runtime unverified. |
| context_menu | webview/assets/context-menu-289f1a13127e.js | menu | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Right-click and Shift+F10 open same demo action menu; runtime unverified. |
| command_palette | webview/assets/command-menu-dialog-e1ab846c2043.js | command | Chat-search overlay exists; no grouped action palette or selected-result keyboard contract. Source: native-app/src/views.rs::Dialog::Search | Filter fixture actions then activate and show loading/empty state; runtime unverified. |
| tabs | webview/assets/app-shared-737655e1fb23.js | tab | Settings use a native radio navigation list, not tablist; tool review view buttons have no demonstrated tablist contract. Source: native-settings/src/lib.rs::render; native-tools/src/lib.rs::review_view | Arrow navigation respects disabled tabs and inactive focus; runtime unverified. |
| breadcrumbs | webview/assets/toolbar-breadcrumb-aeefda3b3d86.js | breadcrumb | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Parent action changes local route while current page is marked; runtime unverified. |
| tree | webview/assets/base-file-tree-f18041e294eb.js | tree | Projects and review files are flat buttons; no expandable tree navigation. Source: native-app/src/views.rs::projects_view | Preserve expansion selection and scroll for fixture tree; runtime unverified. |
| reveal_selection | webview/assets/tree-scroll-36725f65cbb1.js | tree, scroll | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Reveal selected row without stealing focus; runtime unverified. |
| virtual_list | webview/assets/virtualized-turn-list-93f4162a687b.js | virtual_list | Ordinary scroll containers; recents Show more adds 30; stream bottom-follow proximity threshold is 48px. No virtualizer integration. Source: native-app/src/views.rs::sidebar_view/chat_view | Scroll by stable key after variable-height changes; runtime unverified. |
| data_table | webview/assets/table-b3a110ed96f1.js | table | Workbook has formula/sort/add row plus persisted rectangle/row/column selection, Shift-click/Extend, width controls, TSV copy and range fill; related UI/model tests passed. Source: native-rich/src/lib.rs::spreadsheet | Filter fixture rows and activate correct stable row identity; runtime unverified. |
| split_pane | webview/assets/split-view-194f08a5d0cd.js | resizable, dock | Review uses native resizable diff panels and keyboard width buttons; resize/comment UI test passed. Restart persistence remains unverified. Source: native-tools/src/lib.rs::review_view | Pointer and keyboard resizing obey bounds at three DPI settings; runtime unverified. |
| color_palette | webview/assets/color-palette-d07808540f80.js | color_picker | Native ColorPicker persists per-image-annotation colors; crate suite passed, but picker interaction itself is not separately asserted here. Source: native-rich/src/lib.rs | Choose labeled swatch and expose selected state; runtime unverified. |
| date_picker | webview/assets/DatePicker-2e79bee347a2.js | time::date_picker, time::calendar | Automation uses native DatePicker/Select and validated schedule values; actual calendar-click UI test passed. Source: native-tools/src/lib.rs::automation_view | Select fixture date respecting leap day locale and bounds; runtime unverified. |
| toast | webview/assets/app-shared-737655e1fb23.js | notification | Inline notices exist, not queued transient toasts with actions and announcements. Source: native-app/src/views.rs::notice; native-settings/src/lib.rs::message | Update toast ID without duplication and announce meaningful message; runtime unverified. |
| skeleton | webview/assets/loading-placeholder-8d41ffaba1ef.js | skeleton, shimmer | No application workflow integration located; upstream availability alone is insufficient. Source: No concrete demo source | Toggle fixture loading without duplicate accessible text or layout shift; runtime unverified. |
| file_drag | webview/assets/file-drag-864118da8a34.js | No direct match established | Per-conversation fixture queues provide queued/ready/failed/retry/cancel; no native drag/drop. Source: native-app/src/views.rs::Dialog::Attachments | Drag/cancel fixture file without network services; runtime unverified. |
| icons | webview/assets/SegmentedControl-23a4006850e2.js | icon | Unicode glyphs and kit internal icons; no shared icon catalog and systematic accessible names. Source: native-app/src/views.rs | Render fixture SVG with color bounds and decorative semantics; runtime unverified. |
| motion | webview/assets/app-shared-737655e1fb23.js | No direct match established | Reduced motion completes fixture replies instantly; media waveform and other effects need separate verification. Source: native-app/src/app.rs::stream_response; native-rich/src/lib.rs::media | Reduced motion removes nonessential effects without hiding state; runtime unverified. |
| rich_text | webview/assets/app-initial-b8e1c8014bb4.js | No direct match established | Markdown Textarea with Bold/Italic/Link/List selection actions and literal find/replace preserving undo; document interaction test passed. Source: native-rich/src/lib.rs::document | Edit fixture document with format undo redo paste and IME; runtime unverified. |
| code_editor | webview/assets/chatgpt-code-block-editor-ea44a9d2124a.js | input, highlighter | Read-only fixture diff/comments; no editable code/find/replace/language controls. Source: native-tools/src/lib.rs::review_view | Edit fixture code with syntax wrapping undo and IME; runtime unverified. |
| math | webview/assets/app-shared-9a94b907ed47.css | No direct match established | Four expression plots with movable point; no demonstrated typesetting/editing surface. Source: native-rich/src/lib.rs::math | Render fixture math and accessible alternative; runtime unverified. |
| diagram | webview/assets/mermaid.core-cf33bb7e5cda.js | No direct match established | Fixed selectable four-node scene with pan/zoom; no source/preview/editor actions. Source: native-rich/src/lib.rs::diagram | Render fixture graph and show invalid-input error; runtime unverified. |
| a11y | webview/assets/app-shared-737655e1fb23.js | No direct match established | Kit control semantics partially inherited; UIA/Narrator/modal/list semantics unverified. Source: native-app/src/views.rs::root/dialog_view | Expose Windows UIA role name state and action on demo screens; runtime unverified. |
| focus | webview/assets/app-shared-737655e1fb23.js | No direct match established | Root focus, kit inputs, FocusTrapElement modal scopes and focus restoration are integrated; baseline shell UI tests passed. Source: native-app/src/views.rs::root/dialog_view | Nested overlays restore intended focus and nonmodal content does not trap; runtime unverified. |
| overlay_foundation | webview/assets/app-shared-737655e1fb23.js | popover, dialog | Single absolute overlay; no reusable dismissable layer stack. Source: native-app/src/views.rs::dialog_view | Nested layers dismiss correctly without click-through; runtime unverified. |
| input_foundation | webview/assets/command-menu-dialog-e1ab846c2043.js | kbd, input | Configured shortcuts/native inputs wired; modal scope and IME conflict tests pending. Source: native-app/src/app.rs::handle_key | Shortcut dispatch respects editable controls; runtime unverified. |
| layout_foundation | webview/assets/split-view-194f08a5d0cd.js | resizable, scroll | Shell uses ordinary scroll; review integrates native resizable panels. Route layout and diff resizing tests pass; no transcript virtualization. Source: native-app/src/views.rs | Tiny/large window resize never yields negative constraints; runtime unverified. |
| form_foundation | webview/assets/dialog-fields-70f615b1d3e5.js | form | Settings/task/schedule validation tests pass, including preservation of invalid drafts and saved bytes; shared label/error association contract remains incomplete. Source: native-settings/src/lib.rs; native-tools/src/lib.rs::save_automation | Show linked validation error without discarding partial input; runtime unverified. |
| i18n | webview/assets/DatePicker-2e79bee347a2.js | No direct match established | Language preference explicitly labeled demo-only; interface remains English, no RTL workflow. Source: native-settings/src/lib.rs | Change demo locale while preserving stored date value; runtime unverified. |

## Uncertain original families

Keep these separate; name-only evidence is not a verified behavior contract.

- accordion: name_only; upstream accordion exists. Do not claim equivalence or a parity percentage.
- collapsible: name_only; upstream collapsible exists. Do not claim equivalence or a parity percentage.
- scroll_area: inferred; upstream scroll exists. Do not claim equivalence or a parity percentage.
- pagination: name_only; upstream pagination exists. Do not claim equivalence or a parity percentage.
- avatar: name_only; upstream avatar exists. Do not claim equivalence or a parity percentage.
- badge: inferred; upstream badge exists. Do not claim equivalence or a parity percentage.
- progress: name_only; upstream progress exists. Do not claim equivalence or a parity percentage.
- spinner: name_only; upstream spinner exists. Do not claim equivalence or a parity percentage.
- file_upload: name_only; upstream attachment exists. Do not claim equivalence or a parity percentage.
- empty_state: name_only; upstream empty exists. Do not claim equivalence or a parity percentage.

## Rich-surface UI work remaining (engines excluded)

| Surface | Existing demo | Frontend decisions still to cover |
|---|---|---|
| Workbook | Formula bar, sorting, add row/save; persisted rectangular/row/column selections, Shift-click/Extend, movement, width controls, copy TSV/fill range (related tests passed centrally) | Paste, sheet navigation, pointer divider resizing, freeze-pane controls and validation |
| Slides | Select/add/duplicate/delete/reorder and text editing | Object selection handles, inspector, thumbnail keyboard navigation, present/exit controls |
| Image/gallery | Procedural artwork, orientation/zoom, notes with persisted native ColorPicker colors (related tests passed centrally) | Previous/next gallery, thumbnails, crop/annotation mode, cancel/apply/undo |
| PDF review | Fixture pages/search/annotations | Page strip, find-next/count/highlight, selected annotation deletion, viewport scroll |
| Diagram/math | Fixed nodes and sampled expressions | Source/preview, copy/export fixture actions, node inspector and visible pan/reset state |
| Media/voice | Labeled timer/waveform/record simulation | Seek dragging, speed/volume, reconnect/failure/pending states and session-close confirmation |
| Charts/map/3D | Selectable fixture data/places and rotation | Hover detail, legends, keyboard equivalents, reset and retained pan/zoom |
| Artifact review | Fixture line/page comments | Resolve/reopen threads, bulk apply/discard and selection-linked annotations |

Rich evidence paths are in rich-content.json. Some targets are proposed acceptance contracts; inspect the referenced shipped implementation before claiming exact equivalence.

## Runtime acceptance gate

Run complete flows: create project Ã¢â€ â€™ create chat Ã¢â€ â€™ attach fixture Ã¢â€ â€™ send/stop Ã¢â€ â€™ edit/branch Ã¢â€ â€™ open artifact Ã¢â€ â€™ change/save/reload Ã¢â€ â€™ return to retained draft. Include cancellation and failure. Then test keyboard-only operation, IME, text selection/copy, resize at 100/150/200% DPI, restart persistence, focus restoration, settings effects, simulated error/loading recovery and Windows UI Automation/Narrator.

This audit did not run builds or capture screenshots. The parent task owns the central build; its reported test results are recorded above. The central 63/63 result and settings stability repetitions are recorded above. OS-level visual, DPI, IME and UIA acceptance remains outstanding; the fixture browser host passed its 11-check native/DOM smoke run; arbitrary external websites remain outside that verification. Counts of 44 confirmed families and 10 uncertain candidates are inventory counts, not a functional-coverage denominator.
