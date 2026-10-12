# Projects and Library: recovered Windows frontend mapping

This patch replaces the previous generic split project editor and component gallery with source-backed Projects rows and Library file navigation. Data remains local demo fixtures, as requested. It is not a claim of complete pixel parity or original cloud functionality.

## Projects evidence

- `recovered-frontend/readable/assets/projects-index-page-39541e9a312e.js`, `li`, lines1100–1300: title Projects; compact sticky header; search; New project; table with Name and Updated; expanded project chat rows; explicit empty state. `jr` at367 is `minmax(0,1fr) 4rem 8rem`,16px gaps. Skeleton row minimum70px; actions32px square,8px radius. `Pr` supplies row divider.
- `extracted/webview/assets/app-initial-b8e1c8014bb4.js`: shared page contentWidth `extraWide` resolves1440px maximum; compact header uses24px responsive48px gutters.
- `recovered-frontend/readable/assets/chatgpt-project-settings-dialog-99331eebb4cd.js`: named Name/Instructions form, native-sized multiline instruction control and Save operation. Original is a dialog, including service-backed memory/access fields. Native editor now uses the same centered modal composition; backend-only memory/access fields remain absent.

Native implementation: max1440px table, flexible Name +64px Updated +128px action columns,70px rows, child chat expansion, actual name/chat-title search, create/edit/save/cancel/remove and chat opening. Project creation and meaningful name/instructions edits now record local modification milliseconds; old files deserialize with no date and render the source hyphen. Expansion now uses an independent set, following source lines1089–1092. Search forces expansion only for matching child conversations (lines1220–1246), displays those matches and leaves the manual set intact; name-only matches do not force expansion. Sortable headers are implemented; complete locale equivalence remains incomplete. Header is currently scrollable with its parent rather than collapsing sticky.20px shell gutter remains a native adaptation.

## Library evidence

- `extracted/webview/assets/library-page-54c00b8ed493.js`, `Ha`, `va`, `ga`: page title, search, grid/list mode, navigation All/Images and category filters Documents/Spreadsheets/Presentations/PDFs; explicit file opening callback; provider/source/favorites/folder/trash branches are conditional original features.
- `extracted/webview/assets/library-item-layout-46ad68524acb.js`: card `rounded-2xl border bg-surface-elevated`, aspect-video preview, caption20px horizontal/14px vertical; list row14px name,13px metadata,12px icon/name gap and160px date column; hover/focus actions and selection.
- `extracted/webview/assets/library-masonry-d30f6d616ee2.js`: responsive masonry1–6 columns with12/16px gaps.
- `extracted/webview/assets/library-item-layout-7e45bffed115.css`: file/folder hover and reduced-motion variants.

Native implementation: file cards use16px border radius,16:9 preview region,20x14px caption spacing,16px wrapping gap; list mode uses actual named files; toolbar retained search, working category controls and grid/list toggle. Eleven named sample files route to the retained rich entities, replacing Studios & viewers entirely. Local Markdown documents open their existing editor with Save/Preview/Delete and a Library return action. File-type filters now use the recovered anchored multiselect popover pattern, with removable active tags and separate All/Images navigation. Card widths now derive from the source container breakpoints (384/576/768/1024/1280px =>2/3/4/5/6 columns) and available native content width. Preview excerpts for user documents come from actual saved content; rich sample thumbnails are static summaries, not live snapshots of edited rich state. Source provider/folder/favorites/trash/selection/sorting flows remain absent and must not be marked exact.

## State and IPO

Input: saved Workspace projects/documents, retained rich entities, native search/category/view/edit actions. Process: local filtering; project CRUD and chat linking through existing Action handlers; document CRUD through existing storage; rich card opens Route::Rich with retained entity. Output: interactive source-derived index layouts and persisted project/document edits.

Added view-only state: `project_editing`, retained `project_search` and `library_search` entities, `library_categories` (u8 bits1..5 assigned only by source file-type controls), `library_images_only`, `library_grid`. Search changes notify the parent renderer. Existing persisted schema is unchanged.

## Validation

Formatting/parser: rustfmt only; no concurrent cargo build/test run by this agent. Parent should run `cargo test -p native-app --features ui-tests --lib`.

New separate `project_library_tests.rs` dispatches pointer/keyboard events to filter spreadsheets, switch list mode, search Team budget, open retained Spreadsheet; create a project with typed name, save, collapse and expand its row. Existing chat tests remain owned by another agent.
## Modal fidelity update

Recovered app-shared-737655e1fb23.js exports XMi as IT (project settings dialog), tNi supplies default rounded-3xl geometry, and YMi(default) resolves w-130 =520px. Electron app-shared CSS dialog overlay is #0002. Native project modal now uses520px width,24px radius,16px form gaps and #00000022 overlay. It keeps the Projects table visible behind an occluding overlay and reuses the existing shell modal mount. Tab focus is trapped; Name receives initial focus; Escape, Cancel, close button and outside pointer close without saving and restore the prior focus handle. Save validates/persists through existing handler before closing. Global navigation shortcuts do not interrupt this modal. Native maximum height88% approximates source viewport-minus96px; source cloud permissions/memory/instruction counters are not invented.

Original chevron-right/down and document/spreadsheet/presentation SVG assets now replace text toggles and generic file icons. Added third UI regression project_modal_escape_cancel_and_focus_restore_do_not_save; tests remain pending central execution, no Cargo run by this agent.

## Runtime screenshot fixes

Inspected qa/native-projects-port-2.png and qa/native-library-port-2.png. The toolkit Button interior centered direct child content and SVG currentColor was not inherited reliably. Project rows now use one full-width, left-aligned inner flex container; child chat/remove rows use full-width text children. Chevron/folder/plus/modal-close and Library list icons receive explicit semantic tint. Library card outer overflow is clipped and preview top corners explicitly use15px radius inside the16px bordered card, removing square background protrusions. These fixes are source saved and formatted; updated native screenshots/tests remain parent verification.

## Source filters and responsive layout update

`library-page-54c00b8ed493.js` function `na` uses CheckboxItem multiselect category membership, opens an end-aligned menu, displays active count and keeps the menu open while checking. `aa` renders removable tags; `ga` resets search/categories/sources on browse-tab navigation. Native Library now follows these state transitions with toolkit Popover + accessible Checkbox controls, retaining query/grid-list state. Tabs provided are the functional All/Images subset; Suggested/Favorites/Folders remain unimplemented rather than inert. Uploaded/Generated is intentionally absent because the local file model does not contain provenance. No source classification is invented.

Filter SVG binding is traced: Library `ve=Xet` resolves `_pr=$(h7n)` -> filter-light-16; `be=Zet` resolves `x_r=$(_7n)` -> filter-light-20 in app-shared. Parent extracted the original20px vector as native-ui `library-filter`; trigger uses that exact asset and count. Generic grid/list icons are not asserted as bound; native toggle retains accessible List view/Grid view text.

`library-masonry-d30f6d616ee2.js` defines1/2/3/4/5/6 columns at @sm/@xl/@3xl/@5xl/@7xl; shared CSS maps these to24/36/48/64/80rem. Native uses384/576/768/1024/1280 logical pixels, source12/16px gaps, aspect-video preview height from card width, and native grid. Available width follows viewport minus the same clamped actual sidebar width and40px Library gutters, so sidebar resize/hide reflows cards. The current fixtures have equal-height previews: this matches the uniform-height case of the source masonry. Original shortest-column assignment for arbitrary measured thumbnail heights and its reorder animation remain unimplemented; no full masonry parity claimed. The224px toolkit popup width and checkbox appearance remain native adaptations.

Additional tests (not yet executed by this agent): source breakpoint boundaries; native element bounds showing five-to-six column reflow when sidebar hides; actual menu multiselection, Escape dismissal, tag removal and Images/All reset. Prior filter/search/list/open test now opens the filter menu first. Run centrally: `cargo test -p native-app --features ui-tests --lib`. Formatting/parser checks completed; no Cargo command run by this agent.
## Independent expansion verification

Selection for editing is separate from the expansion set. Deletion removes the clicked project from that set and retains other expanded rows. Search-forced rows hide their toggle, matching xi at source lines1807–1828; the parent row still lacks the original project-detail navigation. A native pointer/keyboard test covers two simultaneous expansions, manual collapse, child-title search, hidden nonmatching chats, name-only matches, clearing search and deleting the correct row.

## Sortable project headers

Source Kr/Xr/Zr at610–690 and header vi at1370–1408 define modified-descending initially, name-ascending on first selection, toggling on repeated selection and deterministic name/ID ties. Native headers now implement that state machine and keep row identity/expansion through reordering. The original arrow-up-md-light-16 descriptor is embedded with its hash and source binding.

Updated sorting now uses optional local modified_at_ms, retaining the original value0 fallback and name/ID ties for old projects without dates. Windows NLS CompareStringEx with IGNORECASE/IGNORENONSPACE approximates source Intl.Collator base sensitivity; exhaustive ICU/locale equivalence is unverified. Other platforms use a lowercase fallback and are outside current Windows fidelity scope.

## Project modification dates

Source yi at1419 parses cloud project gizmo.updated_at. Native demo maps creation and meaningful project edits to persisted optional modified_at_ms; reopening or saving an unchanged project does not assign a new date. Old files keep None without fabrication. Dr at330–355 renders a hyphen for missing data and delegates to app-initial yBo/xBo/dBo at359520–359690 for compact relative text. Native English labels follow just now, m/h/d/w/mo/y, elapsed sub-day thresholds and local calendar days after24h. The project index refreshes every60 seconds while visible; localized date labels and exact source clock scheduling are not yet reproduced.
