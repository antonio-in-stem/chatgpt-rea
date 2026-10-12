# Projects and Library: recovered Windows frontend mapping

This patch replaces the previous generic split project editor and component gallery with source-backed Projects rows and Library file navigation. Data remains local demo fixtures, as requested. It is not a claim of complete pixel parity or original cloud functionality.

## Projects evidence

- `recovered-frontend/readable/assets/projects-index-page-39541e9a312e.js`, `li`, lines1100–1300: title Projects; compact sticky header; search; New project; table with Name and Updated; expanded project chat rows; explicit empty state. `jr` at367 is `minmax(0,1fr) 4rem 8rem`,16px gaps. Skeleton row minimum70px; actions32px square,8px radius. `Pr` supplies row divider.
- `extracted/webview/assets/app-initial-b8e1c8014bb4.js`: shared page contentWidth `extraWide` resolves1440px maximum; compact header uses24px responsive48px gutters.
- `recovered-frontend/readable/assets/chatgpt-project-settings-dialog-99331eebb4cd.js`: named Name/Instructions form, native-sized multiline instruction control and Save operation. Original is a dialog, including service-backed memory/access fields. Native editor now uses the same centered modal composition; backend-only memory/access fields remain absent.

Native implementation: max1440px table, flexible Name +64px Updated +128px action columns,70px rows, child chat expansion, actual name/chat-title search, create/edit/save/cancel/remove and chat opening. No timestamps are invented; local model has none, so Updated displays an em dash. Local project selection is a single expanded row; searching also expands matching rows. Original can expand multiple rows and sort by name/modified; those variants remain incomplete. Header is currently scrollable with its parent rather than collapsing sticky.20px shell gutter remains a native adaptation.

## Library evidence

- `extracted/webview/assets/library-page-54c00b8ed493.js`, `Ha`, `va`, `ga`: page title, search, grid/list mode, navigation All/Images and category filters Documents/Spreadsheets/Presentations/PDFs; explicit file opening callback; provider/source/favorites/folder/trash branches are conditional original features.
- `extracted/webview/assets/library-item-layout-46ad68524acb.js`: card `rounded-2xl border bg-surface-elevated`, aspect-video preview, caption20px horizontal/14px vertical; list row14px name,13px metadata,12px icon/name gap and160px date column; hover/focus actions and selection.
- `extracted/webview/assets/library-masonry-d30f6d616ee2.js`: responsive masonry1–6 columns with12/16px gaps.
- `extracted/webview/assets/library-item-layout-7e45bffed115.css`: file/folder hover and reduced-motion variants.

Native implementation: file cards use16px border radius,16:9 preview region,20x14px caption spacing,16px wrapping gap; list mode uses actual named files; toolbar retained search, working category controls and grid/list toggle. Eleven named sample files route to the retained rich entities, replacing Studios & viewers entirely. Local Markdown documents open their existing editor with Save/Preview/Delete and a Library return action. Source file-type filters are displayed as flat chips in this native subset instead of original filter popover. Card widths242px are a native wrapping approximation rather than the original masonry breakpoints. Preview excerpts for user documents come from actual saved content; rich sample thumbnails are static summaries, not live snapshots of edited rich state. Source provider/folder/favorites/trash/selection/sorting flows remain absent and must not be marked exact.

## State and IPO

Input: saved Workspace projects/documents, retained rich entities, native search/category/view/edit actions. Process: local filtering; project CRUD and chat linking through existing Action handlers; document CRUD through existing storage; rich card opens Route::Rich with retained entity. Output: interactive source-derived index layouts and persisted project/document edits.

Added view-only state: `project_editing`, retained `project_search` and `library_search` entities, `library_category` (only0..5 assigned by enumerated controls), `library_grid`. Search changes notify the parent renderer. Existing persisted schema is unchanged.

## Validation

Formatting/parser: rustfmt only; no concurrent cargo build/test run by this agent. Parent should run `cargo test -p native-app --features ui-tests --lib`.

New separate `project_library_tests.rs` dispatches pointer/keyboard events to filter spreadsheets, switch list mode, search Team budget, open retained Spreadsheet; create a project with typed name, save, collapse and expand its row. Existing chat tests remain owned by another agent.
## Modal fidelity update

Recovered app-shared-737655e1fb23.js exports XMi as IT (project settings dialog), tNi supplies default rounded-3xl geometry, and YMi(default) resolves w-130 =520px. Electron app-shared CSS dialog overlay is #0002. Native project modal now uses520px width,24px radius,16px form gaps and #00000022 overlay. It keeps the Projects table visible behind an occluding overlay and reuses the existing shell modal mount. Tab focus is trapped; Name receives initial focus; Escape, Cancel, close button and outside pointer close without saving and restore the prior focus handle. Save validates/persists through existing handler before closing. Global navigation shortcuts do not interrupt this modal. Native maximum height88% approximates source viewport-minus96px; source cloud permissions/memory/instruction counters are not invented.

Original chevron-right/down and document/spreadsheet/presentation SVG assets now replace text toggles and generic file icons. Added third UI regression project_modal_escape_cancel_and_focus_restore_do_not_save; tests remain pending central execution, no Cargo run by this agent.

## Runtime screenshot fixes

Inspected qa/native-projects-port-2.png and qa/native-library-port-2.png. The toolkit Button interior centered direct child content and SVG currentColor was not inherited reliably. Project rows now use one full-width, left-aligned inner flex container; child chat/remove rows use full-width text children. Chevron/folder/plus/modal-close and Library list icons receive explicit semantic tint. Library card outer overflow is clipped and preview top corners explicitly use15px radius inside the16px bordered card, removing square background protrusions. These fixes are source saved and formatted; updated native screenshots/tests remain parent verification.
