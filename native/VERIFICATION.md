# Verification — 2026-10-12

## Automated checks

`cargo test --workspace --all-features --locked --offline` completed successfully on Windows x64 / Rust MSVC 1.95.

| Crate | Passing tests |
|---|---:|
| native-core | 10 |
| native-rich | 19 |
| native-settings | 11 |
| native-tools | 9 |
| native-workspace | 14 |
| Total | 63 |

23 tests drive GPUI rendering, hit testing and keyboard/text input. They cover chat drafts, explicit choices, modal focus, pagination, attachment failure/retry/cancel, streaming cancellation and scroll anchoring, reduced motion, all 19 retained surfaces at 1440×940 and 1024×768, document editing/undo/find/replace, spreadsheet/slides persistence, corrupt-file protection, settings keyboard navigation/theme/font/hotkeys/recovery, calendar selection, connector permissions and diff resizing/comments.

The settings test binary passed five additional parallel runs (11 tests each) after fixing a temporary-path collision. Tests use isolated temporary storage rather than account data. These tests validate native layout/event/model behavior; they are not pixel comparisons against the original application.

## Windows process checks

The native application created its Windows window and rendered the chat successfully. A targeted PrintWindow capture of that process was inspected. This verifies one startup screen, not every DPI/accessibility/animation combination.

WebView2 host passed 11 real DOM/navigation checks in `qa/webhost-verified.json` with exit code 0: title, toolbar, sandbox, home iframe, initial history, editable notes, back, forward, reload, dashboard via Enter and external-address rejection. The smoke test ran inside the local Windows WebView2 runtime. An initial navigation filter rejected the generated data: HTML URL; the fix permits that exact document. This verifies local web content behavior, not browser feature parity.

## Extraction and traceability

20,988 ASAR/unpacked files extracted. All webview files matched their declared hashes. Eight shipped unpacked native binaries differ from ASAR-declared hashes; retained and documented in the original extraction reports.

`IndexSources.py` indexed every entry and found zero missing evidence paths. 102 files have explicit content references in the catalogs. File classification is not a semantic port of all 20,988 entries.

## Limits

Fixture-based media, formulas, PDF, diagrams, maps and 3D have documented frontend behaviors and restricted content engines. No live backend, OAuth, transcription, account synchronization or original source maps are involved. No exhaustive behavioral or visual parity claim is made. See `catalog/COVERAGE.md` for remaining frontend gaps; the original requirement of absolutely every original behavior has not been demonstrated.
## Packaged executable check

The packaged native-workspace.exe launched successfully and its own window was captured and inspected (qa/packaged-startup.png). The sibling packaged native-web-host.exe also completed all 11 smoke checks with exit code 0 (qa/packaged-webhost.json). Both executables are development-profile Windows GUI binaries with debug symbols disabled; they are not release-optimized builds.
