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
