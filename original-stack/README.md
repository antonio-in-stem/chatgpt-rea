# Original stack reconstruction

Latest direction from the owner: preserve the shipped app and design first; defer the Rust port. The native demo is not the baseline for this phase.

## Preserved inputs

- `pristine/resources/app.asar`: byte-identical installed production package, not a rewritten UI.
- `pristine/ChatGPT.exe`, `Codex.exe`: shipped native launchers.
- Runtime identity/configuration files: Owl, Chromium with Electron compatibility. Do not substitute a generic Electron release without proving compatibility.
- `snapshot.json`: source paths, sizes and SHA256, verified by Capture-Original.ps1.
- Existing extracted package: C:/Users/PC/Repositories/chatgpt-rea/extracted. Main entry is .vite/build/early-bootstrap.js. Bundled JS, CSS, fonts and assets are the authoritative frontend.
- Existing readable code: C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable. This is formatted production code, not original TSX/source maps.

## Reconstruction rules

Keep pristine files unchanged. Future instrumentation, host shims and demo data belong in a separate working copy and must have an explicit patch manifest. Preserve renderer code, styles, font files, images, icons and original control behavior. Backend demo adapters must supply data through the existing host/network contracts rather than replace components. Retain original license notices.

## Current verification and remaining work

The snapshot script compares source/destination SHA256. Complete-Runtime.ps1 has now copied and hash-verified all 3,594 files (2,318,386,060 bytes) from the installed app directory, including chrome.dll, locales, resources and unpacked native modules. runtime-inventory.json records each file. Start-Original.ps1 launched that runtime using separate profile, appdata and CLI-home directories. The original Spanish sign-in screen was visually observed in state/original-second-window.png. No original-account profile was copied; no sign-in was performed. This proves packaged-runtime startup, not offline operation of authenticated screens.

The shipped npm scripts reference unavailable monorepo sources and cannot be treated as a usable source build. The executable is a launcher; native decompilation is not a conversion of the renderer back to original React/TypeScript.

Next: inspect the original renderer/host initialization boundary and provide explicit demo data adapters in a separate working copy. The sign-in gate currently prevents the interior app from being exercised with the isolated empty account state. Authentication-dependent screens require faithful demo data adapters before the app can operate offline. Compare the same content/state/viewport/DPI to the original; do not use Rust interaction tests as visual evidence.

## Run

Run Start-Original.ps1 from PowerShell. This launches the original app with isolated local state; it is not yet an offline demo. It retains original startup/network behavior, which can download runtime/plugin metadata into state. Do not copy real credentials into that directory to simulate fixtures. Capture-OriginalWindow.ps1 captures only the verified isolated executable and supports WindowIndex because the runtime has a helper window as well as the login window. State and screenshots are excluded from Git.

Space reclaimed for this phase: only native/target/debug/deps, a regenerable Rust build cache (~6 GB). Source and packaged native executables were retained.

## Runtime observation correction

A subsequent read-only probe of the original app://-/index.html renderer found a populated account sidebar and composer, despite the separate child profile directories. The route was not the login window. The mechanism is unresolved (native runtime state, credential/host coordination, or another account-state path); do not infer offline/demo isolation from the directory settings. All processes whose executable path was inside this copied runtime were stopped after observation. No login action or account mutation was performed by the agent. The private screenshot remains only under ignored state/. Do not redistribute that state.

REA list_electron_targets evidence ev_2ca489b6dbf243501b889f158f973053b8f714c56e623de13167251c35f85976 observed Chromium155 but excluded4 non-file pages. The fallback Probe-Renderer.cjs reads bridge method names and CSS metrics through the copy's loopback CDP endpoint; it does not invoke host bridge methods. It also captures the main renderer. App/preload code remains unchanged. Main renderer font stack resolves to Segoe UI fallback, font weight430; body16px is inherited context, not proof every control uses16px.

Before another app launch, identify and isolate the native account/profile and host-coordination paths. Supplying demo data without contacting live account services remains unfinished. Start-Original.ps1 is a diagnostic launcher, not an account-isolated demo guarantee.

## App-server adapter seam

Static source Yo in application-network-startup-CfAQmSYg.js selects CODEX_APP_SERVER_WS_URL before host.websocket_url, unless CODEX_APP_SERVER_FORCE_CLI is1. Main A5 applies the same force-CLI override and distinguishes local/cloud host routing. Exact expressions and provenance are retained in transport-*.recovered.js and transport-source.json. Main constructor sets localClientCoordinationEnabled based on A5(localHost)==null. These observations identify a supported transport seam; they do not yet establish the cause of inherited account state or cover the native account broker.

demo_transport.py is a loopback-only WebSocket contract recorder. It never connects upstream; it logs method names/parameter keys only, not parameter values. Unknown requests return method-not-implemented and notifications receive no reply. It has no fixture methods yet and therefore cannot boot the app as a usable offline demo. Two tests exercise actual WebSocket request/reply, ID correlation, redaction of parameter values, notification behavior and malformed input. Python websockets was already available locally; no dependency was installed.

The original runtime has NOT been launched against this recorder. Account/profile and native network isolation must be resolved before using it to observe startup, and response schemas must be recovered before implementing fixtures. No frontend components or styles were changed.
