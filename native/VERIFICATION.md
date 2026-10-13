# Verification — 2026-10-12



## Automated checks



`cargo test --workspace --all-features --locked --offline` completed successfully on Windows x64 / Rust MSVC 1.95.



| Crate | Passing tests |

|---|---:|

| native-core | 10 |

| native-rich | 19 |

| native-settings | 12 |

| native-tools | 9 |

| native-workspace | 22 |

| Total | 72 |



30 tests drive GPUI rendering, hit testing and keyboard/text input. They cover chat drafts, explicit choices, modal focus, pagination, attachment failure/retry/cancel, streaming cancellation and scroll anchoring, reduced motion, all 19 retained surfaces at 1440×940 and 1024×768, document editing/undo/find/replace, spreadsheet/slides persistence, corrupt-file protection, settings keyboard navigation/theme/font/hotkeys/recovery, calendar selection, connector permissions and diff resizing/comments.



The settings test binary passed five additional parallel runs (11 tests each) after fixing a temporary-path collision. Tests use isolated temporary storage rather than account data. These tests validate native layout/event/model behavior; they are not pixel comparisons against the original application.



## Source-derived visual port update



The full workspace suite passed 72 tests after integrating native SVGs, header/sidebar/chat geometry, 200ms reduced-motion-aware hero animation, Settings layout, Projects modal and Library file navigation. Sidebar pointer tests cover persistence, min/max/viewport clamps and corrupt storage preservation. Project modal tests cover creation, Escape, cancel and focus restoration. A discovered Windows temporary-folder collision was removed using atomic per-process sequences.



Native captures exposed centered project labels, untinted SVGs and unclipped Library preview corners despite passing behavioral tests. Those findings were corrected separately and rechecked. `qa/visual-port-tests.log` records the full suite; `qa/visual-app-final-tests.log` records the subsequent app-only check.



See [FIDELITY-STATUS.md](catalog/FIDELITY-STATUS.md) for the exact outstanding scope. The goal is still incomplete.



## Windows process checks



The native application created its Windows window and rendered the chat successfully. A targeted PrintWindow capture of that process was inspected. This verifies one startup screen, not every DPI/accessibility/animation combination.



WebView2 host passed 11 real DOM/navigation checks in `qa/webhost-verified.json` with exit code 0: title, toolbar, sandbox, home iframe, initial history, editable notes, back, forward, reload, dashboard via Enter and external-address rejection. The smoke test ran inside the local Windows WebView2 runtime. An initial navigation filter rejected the generated data: HTML URL; the fix permits that exact document. This verifies local web content behavior, not browser feature parity.



## Extraction and traceability



20,988 ASAR/unpacked files extracted. All webview files matched their declared hashes. Eight shipped unpacked native binaries differ from ASAR-declared hashes; retained and documented in the original extraction reports.



`IndexSources.py` indexed every entry and found zero missing evidence paths. 102 files have explicit content references in the catalogs. File classification is not a semantic port of all 20,988 entries.



## Limits



Fixture-based media, formulas, PDF, diagrams, maps and 3D have documented frontend behaviors and restricted content engines. No live backend, OAuth, transcription, account synchronization or original source maps are involved. No exhaustive behavioral or visual parity claim is made. See `catalog/COVERAGE.md` for remaining frontend gaps; the original requirement of absolutely every original behavior has not been demonstrated.

## Previous packaged executable check (before visual changes)



The packaged native-workspace.exe launched successfully and its own window was captured and inspected (qa/packaged-startup.png). The sibling packaged native-web-host.exe also completed all 11 smoke checks with exit code 0 (qa/packaged-webhost.json). Both executables are development-profile Windows GUI binaries with debug symbols disabled; they are not release-optimized builds.



## Current visual build checkpoint



Latest build and package: `cargo build --workspace --locked --offline` passed; `scripts/Package.ps1` refreshed both local executables. native-workspace.exe SHA-256 `6c8de1dff921768ea1c97844ef3148164e2e745b2f4205cc37d9cf9357972d29`. After the final view-only corrections, all22 app tests passed again. The last full suite was72/72.



Targeted PrintWindow captures `qa/native-home-port-3.png`, `qa/native-projects-port-3.png`, and `qa/native-library-port-3.png` show the current real Windows render. Projects alignment and visible SVGs, and Library corner clipping, were visually inspected after correction. The prior modal capture `qa/native-project-dialog-port-2.png` predates the close-icon tint fix. Capture storage uses an isolated LOCALAPPDATA profile. Original-app pixel parity remains unverified.



Build retains a dead-code warning for Route::Tool: retained tool surfaces need source-correct navigation integration. This is a known unfinished workflow, not a reason to hide the warning or claim completeness.



## Source-derived menus and Library checkpoint (2026-10-12)



Workspace tests: **83 passed**, zero failed: core10, rich19, settings12, tools9, app33. Command: `cargo test --workspace --all-features --locked --offline`. Build: `cargo build --workspace --locked --offline`, passed. Warnings: unused Theme/Fixture action variants remain.



New geometry assertion measures actual GPUI popup bounds with sidebar shown/hidden: Plus matches composer width/left and 4px gap; model uses254px and8px. Existing keyboard, cancellation, selection and per-conversation isolation tests pass. This is bounded layout/behavior coverage, not pixel parity.



Owned Windows preview captures: `qa/native-home-port-4.png`, `qa/native-plus-port-4.png`, `qa/native-library-picker-port-4.png`. Captured by HWND only; visually inspected. Native menu click required activating the owned preview before synthetic pointer messages. No original-window comparison is available. Library picker content remains a partial implementation.



Repackaged binaries:

- native-workspace.exe: 55824896 bytes; SHA-256 `de941dfabd7309120e9056c96301fc9e08228d86f3487e76df2951d7959ad69d`.

- native-web-host.exe: 2359296 bytes; SHA-256 `38f8d1f14ae1414a46207413d278a37e027f8ecef4078a1a4ff03b853ba6e357`.



## Library picker list/grid checkpoint



`cargo test -p native-workspace --all-features --locked --offline`: 34 passed. Full workspace build passed. Changes touch app rendering/state and static native-ui assets; other crate tests were not rerun this checkpoint (previous full suite83 passed). Windows list/selected-grid captures inspected; original comparison unavailable.



- native-workspace.exe: 55846912 bytes, SHA-256 `b071308f45cf1c717084b235d4f6762609bedf290adf0e190ed6b6a309afbef3`.

- native-web-host.exe: 2359296 bytes, SHA-256 `38f8d1f14ae1414a46207413d278a37e027f8ecef4078a1a4ff03b853ba6e357`.



## Personal Share dialog checkpoint



App tests35 passed; workspace Windows build passed. Owned HWND capture qa/native-share-dialog-6.png inspected. Only app state/rendering changed; unchanged crate tests not rerun. Source branch scope/gaps in catalog/SHARE-DIALOG.md.



- native-workspace.exe: 55876608 bytes; SHA-256 `eaa6b8a3d4faf282c7e5836c0a68535654807fdbb19e10ab7bd1cd3f099b1c78`.

- native-web-host.exe: 2359296 bytes; SHA-256 `38f8d1f14ae1414a46207413d278a37e027f8ecef4078a1a4ff03b853ba6e357`.



## Share async/error states checkpoint



37 native-app tests passed; workspace Windows build passed. Owned HWND screenshot qa/native-share-copy-failed-7.png inspected. Non-app crate tests unchanged and not rerun. Fixture error transport and coverage boundaries: catalog/SHARE-DIALOG.md.



- native-workspace.exe: 55904256 bytes; SHA-256 `a249a2d4903a4aac0aef63a4649975bcb54f708872d63ae83f672d5f82e68e03`.

- native-web-host.exe: 2359296 bytes; SHA-256 `38f8d1f14ae1414a46207413d278a37e027f8ecef4078a1a4ff03b853ba6e357`.



## Dialog scrim source correction — 2026-10-12



All three native modal backdrops now consume the source Electron `#0002` token. `cargo build --bin native-workspace` passed (existing unused Action variants warning). Package SHA-256: `4462f0dcee849895edbd636c04b6bd05502816661fe94b0749cfd42b300b198e`. The isolated preview launched and was captured. Synthetic Share clicks produced hover only, so those captures do not verify the modal scrim pixels; no original-window parity claim is made. No behavior was changed and no new behavior tests were added.


## Independent font preferences — 2026-10-12

13 native-settings tests passed, including native slider changes for both font settings, theme application, persistence, code-size bounds and legacy-file migration without rewriting original bytes. Windows native-workspace build passed. Package SHA-256 `e02261659c490921935d8325a8e99154537e12dbd41167854f73395f63a6e48c` (55,953,408 bytes). No original-app pixel parity asserted.

## Source typography scaling — 2026-10-12

Native-ui formula test passes for all eight connected roles at 11/14/16px preferences. Existing interaction suites pass: native-workspace 37, native-settings 13. Windows build passed with the existing unused Action variants warning. Package SHA-256 `261e9fc7fd701c8239954103989b6de52b17e55d6c3b32381121e73687bde309`, 55,955,456 bytes. These checks cover scaling arithmetic and retained interactions, not original-window visual equivalence.

## Numeric font controls — 2026-10-12

13 native-settings tests passed with decimal Enter commit, invalid-value restore, independent preference persistence and explicit Blur event-handler coverage. Desktop blur notification remains unverified. Windows native-workspace build passed. See dist/windows/manifest.json for this package hash.

## Font Blur verification corrected — 2026-10-12

The previous manual Blur event was removed. GPUI window.rs:3536 suppresses previous/current focus paths when a window is inactive. Activating the headless test window enables genuine InputEvent::Blur delivery on pointer focus transfer. All 13 native-settings tests pass; the font test now also verifies that automatic font persistence does not save an unrelated profile-name draft, which remains editable and is saved only by the existing Save action. No production binary change in this checkpoint. Desktop preview PID73884/HWND657674 was captured using PrintWindow but Windows denied foreground focus; no keyboard events were sent while another window held focus.

## Projects independent expansion — 2026-10-12

38 native-workspace tests passed, including a pointer/keyboard sequence for simultaneous row expansion, search-forced matching children, name-only search, restoring manual expansion and deleting the correct row. Windows build and packaging passed. Source evidence: projects-index-page-39541e9a312e.js1089–1092,1220–1246,1807–1828. No original-window pixel equivalence claim.

## Projects sortable headers — 2026-10-12

41 native-workspace tests passed. Added checks verify actual row positions after header clicks, expansion retention, direction defaults, stable ID ties and Windows case/accent comparison. Windows build passed with the existing unused Action variants warning. Package SHA-256 `dc3aea61d57e9397970b84498299c843c3d80d9365d24d6afb978b25453fd490`. Full ICU locale equivalence, actual project dates and original-window pixel comparison remain unverified.

## Project modification dates — 2026-10-12

11 native-core and43 native-workspace tests passed. Coverage includes legacy missing dates, nonmutating unchanged edits, persisted edit dates, date-priority sorting, future/under-one-minute labels, all compact unit boundaries and local-calendar versus elapsed-day behavior. Windows build and packaging passed; SHA-256 `aa11329848869f193d216e16e1b583f8776e4bdeea2d56cb738520ead4df8b0c`. Localization, original clock scheduling and original-window pixel comparison remain open.

## Shell composition checkpoint

45native-workspace and13native-settings tests pass after the rail/sidebar/frame and Windows font changes. Build and Package.ps1 succeed. native-workspace.exe56110592bytes SHA256dba0f6250498712bc60c7b78050651d9e02ad544944a70e20ebfa3125766e91d. See catalog/SHELL-REFERENCE.md for source vs screenshot adjustments, capture limitations and major remaining gaps. Goal not complete.

## Conversation navigation checkpoint

47native-workspace tests pass. Real pointer/keyboard/resize checks cover marker visibility, jump alignment and hidden-rail shortcuts. Build+Package succeed; native-workspace.exe56154624bytes SHA25604d589f1fd507772f81c273a051015f6f17f34cb01543a873341b34d6c34896e. Inspected qa/native-navigation-11.png. Remaining fidelity limitations catalog/SHELL-REFERENCE.md.


## 2026-10-12 navigation preview checkpoint
- native-workspace with ui-tests: 48 passed, zero failed.
- Native Windows debug build and packaging succeeded.
- native-workspace.exe: 56,231,936 bytes; SHA256 6e4babf689b8c8ad42188790f6ebaf0343516e06adb516a0f4ada43bd9abcda1.
- New event test checks 149/150 ms delay, 320 px preview geometry, drag alignment, duplicate-click suppression, keyboard focus and conversation-change cancellation.
- No new comparison capture of the installed original was obtained; exact shell/canvas fidelity remains unverified and incomplete.


## 2026-10-12 flexible header checkpoint
49 native-workspace tests pass. Debug build/package succeeded. Binary SHA2566afddbce363f0e8fa461a06148cd7240ee4a5e4d3fbb95d1610c314be46c2f64,56230912bytes. Own-window capture qa/native-header-12.png (PID12528,HWND3738300) inspected: valid full frame; title/actions remain in their allocated areas. Capture also confirms major outstanding parity gaps in rail inventory, sidebar density, and the Codex transcript/composer. Goal remains incomplete.

## 2026-10-12 independent sidebar lists
Existing49 workspace tests pass after pagination changes. New independent-pages UI test passes separately (50 total defined). It checks30 ungrouped chats and two7-chat projects, per-project expansion, collapse/reopen retention and real chat activation. Build/package succeeded. Binary: {'name': 'native-workspace.exe', 'bytes': 56245760, 'sha256': '40cb0ef3b630057aa73a47201deeba2f0f147565698209c4fdcd550f9188dc5e'}

## 2026-10-12 active sidebar row
52 workspace tests passed. Build/package succeeded. Binary: {'name': 'native-workspace.exe', 'bytes': 56248832, 'sha256': 'a9e91d18c503e562b402d9877f98ecc1e1eedbf24416d6b10621790e62902fa6'}. Source kPo visibility semantics verified statically; full visual parity remains incomplete.

## 2026-10-12 Codex surface selection
Existing52 workspace tests passed after mode integration; new mode/draft/geometry UI test passed after fixing draft flush (53 tests defined). Native-core11 tests passed. Build/package succeeded. Binary: {'name': 'native-workspace.exe', 'bytes': 56255488, 'sha256': 'a2f58f50880b34e4e42b4cdb08d38c1aaca944d6742d639ba6ba653d3071ef78'}. No full visual parity claim.

## 2026-10-12 permissions demo
54 workspace tests and11 native-core tests pass. Real UI test covers keyboard choice, Escape, Go back, explicit confirmation, stored per-chat selection and abandoned confirmation on chat change. Build/package succeeded. Binary: {'name': 'native-workspace.exe', 'bytes': 56297472, 'sha256': '6874fafd2d7ed3c9f59475407f0b03c83ac173b5dd72244a019d2cca7ed31e16'}. Valid own-window capture native-codex-14 inspected; exact visual fidelity remains incomplete.

## 2026-10-12 model/effort demo
55 workspace tests and11 core tests passed. Native event test covers model selection, pointer movement to the slider end, keyboard decrement/Home, Escape, persisted values and chat-switch synchronization. Build/package succeeded. Binary: {'name': 'native-workspace.exe', 'bytes': 56344064, 'sha256': '617600fc0a65b3dd65b64ba37b4d31274eeb7a1c3fbf215ee9951e9e4fa1925c'}. PID24468 of the previous demo was stopped after path verification before building. Exact original model picker visual parity remains incomplete.


### Composer frame checkpoint (2026-10-12)
Recovered `app-initial-99e8b4b455fa.css:414,446,548` and
`app-shared-9a94b907ed47.css:48025-48031`: default multiline empty attachment
spacer totals 14 px, editor wrapper inline padding 12 px, input/footer gap 4 px,
footer inline padding and bottom margin 8 px. Codex mode now uses these wrapper
measurements instead of uniform outer padding. ChatGPT mode retains its prior layout.
Dark Codex no longer uses the generic large exterior shadow; the original inset
1 px white shadow remains unported. Source radius remains 22 px for this shell.

Verification: 55 workspace tests passed; the existing mode-switch test now checks
real rendered top/gap/bottom/leading-control bounds and passes. Windows debug build
and package succeeded. Executable SHA256:
`58eff718bab4a35525ea3641d7a919717da947ab2ab08d486f9beaa222fbca22`.
Own-app capture `qa/native-composer-16-visible.png` was inspected. Initial hidden
capture `qa/native-composer-16.png` is black and is not visual evidence.

Remaining: native Textarea internal inset/placeholder baseline, attachment layout,
source inset shadow, screenshot background color discrepancy, Codex transcript
activity/tool rows, full rail/sidebar inventories, titlebar menus and home layout.
This checkpoint does not establish visual parity.


### Native history and editor inset checkpoint (2026-10-13 UTC)
- Shipped source: app-initial-b8e1c8014bb4.js:75444-75449 dispatches
  navigate-back / navigate-forward host messages. Original arrow_left-40991fb9b16f.svg
  and arrow_right-7532e350d6ae.svg copied unchanged into native-ui.
- Titlebar now exposes working back/forward controls. Session-local route/chat
  history truncates the forward branch after new navigation, skips removed/archived
  chats, and flushes the outgoing editor draft before switching chats. It is a
  native demo implementation of the recovered command intent, not a recovered host
  history implementation. Scroll restoration, browser/panel history, cross-mode
  navigation and keyboard accelerators remain pending.
- GPUI component Input::render installs Medium internal padding (10 x, 8 y).
  Codex textarea now uses XSmall (4 x, 0 y) with an 8 px wrapper to obtain 12 px
  total inline inset and remove the unintended 8 px vertical inset. Text size and
  line height remain explicitly controlled. ChatGPT mode stays unchanged.
- 56 workspace tests passed, including real titlebar click traversal, drafts,
  forward-branch truncation and deleted destinations. Build/package successful.
  SHA256: 6484bd79f17b9ce6dabb151b779322be63de821970e511100085f2477c535f11.
- Inspected own-window capture qa/native-history-17-final.png; initial capture
  native-history-17.png exposed missing explicit SVG colors, fixed before packaging.
  Preview PID 37704. Menus and remaining Codex transcript/sidebar fidelity are
  incomplete; no exact-parity claim.


### Windows Edit menu checkpoint — 2026-10-13 UTC
Recovered host function bZe from original .vite/build/main-BklS_2Y2.js,
retained in catalog/windows-edit-menu.original.js with parent digest/range in
catalog/WINDOWS-MENUS.md. This is static source evidence, not runtime observation.
Ported all seven Windows Edit roles, separators, keyboard row traversal and
Escape/click-away dismissal. Actions restore prior focus before dispatching to
the native input engine. The titlebar exposes Edit; File/View/Help are pending.
Popup dimensions and positioning are provisional; disabled-item availability,
typeahead, Alt menu activation, cross-menu traversal and localization remain.

Validation: existing 56-test workspace suite passed. New targeted UI test passed
for menu Select All -> Delete -> Undo and Escape. Windows build and packaging
passed. SHA256 4b9fef9478b0116fac6497c4026d0f7d8b24ba617e7dee43143b9c0947b29ed6.
Previous preview PID 37704 was stopped after checking its executable path.
No new visual-parity claim; overall requested clone remains incomplete.


### Host menu map and Windows Settings correction — 2026-10-13 UTC
Extracted complete CZe by AST and validated formatted AST equivalence. All 35
referenced command IDs resolve to shipped registry definitions; full expressions,
hidden flags and gating retained in catalog/windows-menu-map.json. This corrects
the previous checkpoint: Windows Edit appends Settings after the seven base roles.
Settings is now rendered after its separator and opens native settings; the real
menu test covers End/Enter plus existing select/delete/undo behavior and passed.
Build/package passed; SHA256 ad303ae066ba62208186ff5d874dbb9d883fdea60035e846458b4a2df0d708af.
No new preview process. File/View/Help and exact visual parity remain incomplete.


## Activity canvas checkpoint — 2026-10-13 UTC
 58 workspace tests pass; 11 core tests pass. Dedicated window test
checks expansion, persistence, switching chats and stopped-turn visibility.
The first real Windows launch revealed main-thread stack overflow in expanded
rich layout. MSVC binary now reserves 8 MiB instead of its 1 MiB default (reserve,
not upfront commit). Real launch/capture then succeeded. This is runtime evidence
for this fixture, not proof against arbitrarily deep future content.

Final inspected capture: qa/native-activity-18-final.png, PID 76660. Initial
successful capture exposed centered disclosure text; final capture verifies left
alignment. Build/package SHA256:
1feb5f44f97394ae4ceec5d73d2191eaad7b5710bb9c32efed9d0d12852fc8f3.
The full requested frontend clone is still incomplete.


## Command disclosure checkpoint — 2026-10-13 UTC
Source sC (sites-end-resource:9380 onward) initializes commands collapsed and
supplies disclosure to its timeline row. Body resolves to user-message-attachments
vn/un/yn, exported as l: 8 px radius/border, command prefixed with $, raw output,
144 px maximum output viewport, separate copy actions, right-aligned Success or
Exit code footer. timeline-activity-body default adds top8/bottom4/gap8.
Both additional modules are retained with original digests and AST equivalence
in activity-source/manifest.json (now eight modules).

Native commands now expand independently (session-local message ID + entry index),
show literal output rather than fenced Markdown, bound output height to144px and
copy command/output independently. No command execution. Footer handles success
and nonzero exit. Current data model only has completed commands; running,
interrupted, unknown exit, cwd, ANSI output, gradient fades, hover-only copy and
animation are pending. Colors and font remain partly provisional. Existing note
about generic Markdown command chrome is superseded by this checkpoint.

58-test workspace suite passed; expanded focused test also passes copy byte-for-
byte for markup-like output, output-height limit and toggling. Build/package SHA:
538a26b796494f82adde6d7d5e4513bcff4174e8b1c84d478fdc69d7f98b340e.
Inspected real compact-state capture qa/native-command-19.png, PID46296.
Expanded body verified by native UI test, not a new real-window screenshot.
Full frontend parity remains incomplete.


## Command lifecycle checkpoint — 2026-10-13 UTC
Ported the state distinction observed in sC/OC and user-message-attachments yn:
Running / Completed / Stopped, with optional exit code. While running, footer
reserves its source padding with no success text. Stopped has Stopped; completed
zero has Success; nonzero/missing has Exit code N/unknown. Row labels follow the
state. This supersedes the prior completed-only data-model limitation.

New Codex demo activity starts with a running command; completion/stopping only
transitions entries still running, preserving already completed results. These
are local frontend transitions; commands are never executed. Old numeric exit
codes and absent status deserialize as completed, preserving existing saved data.

Validation: 59 workspace tests and 12 core tests pass, including legacy deserialize,
missing exit-code roundtrips and stop/finish transitions preserving prior failures.
Build/package SHA256 cd99280eb420937426bead8dde88584d657b94e4c2dc1ed8b2d9d76fc94afa7a.
Preview PID46296 stopped after verifying its executable path. No new real-window
capture this checkpoint. Remaining: visual state matrix, ANSI/cwd, hover-only
copy controls, fades, animation, accessibility expanded state and broader shell
fidelity. Full frontend clone remains incomplete.


## Windows shell corners checkpoint
Recovered source replaces guessed 16px top-only corners with 12/12/2/12px Windows application-menu corners and 4px page insets. Native post-descendant paint clips corner backgrounds. See catalog/SHELL-CORNERS.md. Build passed; 59 workspace tests passed; real own-window capture qa/native-corners-20.png inspected. Component superellipse parity remains incomplete.


## Electron text inheritance
The shell now requests FontWeight(430), matching app-shared-9a94b907ed47.css Electron --font-ui-weight. Explicit child weights remain overrides; Windows font selection may resolve this request to an installed static face, so this does not prove glyph rasterization parity. Command/output rows now inherit configured mono font family/size rather than hardcoded Consolas 12px.


## Rail superellipse
Source-derived superellipse(1.5) and15.625px radius extent now apply to destination rail buttons. Native-ui geometry/typography tests2 pass; workspace tests59 pass; executable capture qa/native-rail-21.png inspected. Sidebar/profile migration remains pending.
