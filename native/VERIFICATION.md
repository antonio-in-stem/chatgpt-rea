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
