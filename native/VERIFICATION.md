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
