# Complete original frontend payload

`@rea/ui` remains the partial component library. `@rea/original-frontend` is a separate local dependency containing the entire original `webview` tree. It retains internal bundles and assets as accepted by the owner. It does not expose independent React screens. The original-host consumer integration is verified separately as described below.

## Reproduce locally

Use the already extracted `webview` directory and the pinned pristine ASAR. No app account, profile, network download, formatter or re-extraction is involved. Choose new output directories with at least 2 GB available for package, tarball and isolated consumer.

```powershell
node original-stack/Package-Frontend.cjs C:/path/to/pristine/resources/app.asar C:/path/to/extracted/webview C:/path/to/new-package
node original-stack/Verify-FrontendPackage.cjs C:/path/to/new-package C:/path/to/new-consumer
```

The first command verifies the ASAR hash, exact member set and every extracted file against its original archive bytes. Links and unpacked members require explicit handling and are rejected. Failed output is retained for inspection; choose a new output for a later build.

The second command uses local npm to pack, install offline with scripts disabled, import the installed package and verify every payload hash. Nothing is published to npm or GitHub. It retains the tarball and consumer with `verification.json`.

```js
import { frontendRoot, entryHtml, detachedEntryHtml, manifestUrl } from '@rea/original-frontend';
```

These are file URLs for integration code running in Node/Electron. Preserve the entire tree and relative paths when serving it through the original app protocol. The HTML still needs original bootstrap, host bridge, router, state and service contracts. Merely opening it through `file:` or a generic static server does not prove an operational screen.

The installed original-host consumer passed13 scenarios in Verify-ConversationFlow.cjs for the original shell and demo conversation flow. This is separate from payload identity and does not establish every frontend flow, a standalone React API or global visual parity. Rust remains deferred.

## Run with the original demo host

After building/installing the demo host that supports the external package root:

```powershell
./original-stack/Start-Demo.ps1 -StateName demo-consumer -DemoHost -InspectRuntime -DemoPagesTls -FrontendPackageRoot C:/path/to/consumer/node_modules/@rea/original-frontend
```

The host verifies the package manifest and every listed resource before giving its `webview` directory to the original `app://` protocol. Original routing, bootstrap, preload and demo services remain supplied by the host. Missing or altered resources fail startup. Omit `FrontendPackageRoot` to use the bundled resources as before.

This is an original-host consumer, not an independent React mount or a portable replacement for the required Electron runtime. A fresh profile has different demo state; do not claim every historical fixture/scenario is reproduced merely by starting it.

## Capture the transparent Windows shell

Use `node original-stack/Demo-Controls.cjs demo-PROFILE capture-demo-window`. This records a local PNG with CDP `fromSurface:false` and returns `captureMode: view`. Default surface capture can incorrectly make the transparent titlebar/rail black and Home opaque white in this runtime. A screenshot artifact is not a reason to alter original CSS. The same-window comparison resolved this anomaly; full matched-state visual parity remains a separate requirement.

## Relocate an existing verified demo runtime

The launchers accept `-RuntimeLocationPath` only together with `-DemoHost`. The manifest identifies an already staged demo runtime and its existing integrity metadata:

```json
{
  "runtimeRoot": "runtime",
  "inventoryPath": "runtime-inventory.json",
  "patchManifestPath": "patch-manifest.json"
}
```

Relative entries resolve against the manifest directory, not the shell working directory. Absolute entries remain supported. Keep the three targets together when moving the bundle; do not edit hashes to accommodate changed runtime contents. Omitting the parameter preserves the existing local manifest default.

```powershell
./original-stack/Start-Demo.ps1 -StateName demo-consumer -DemoHost -RuntimeLocationPath 'D:/REA bundle/runtime-location.json' -DryRun
./original-stack/Start-Demo.ps1 -StateName demo-consumer -DemoHost -RuntimeLocationPath 'D:/REA bundle/runtime-location.json' -InspectRuntime -DemoPagesTls -FrontendPackageRoot 'D:/REA consumer/node_modules/@rea/original-frontend'
```

The profile and demo stores remain under `original-stack/state/<StateName>`. PowerShell, Python and adapter dependencies are still required. This parameter does not export the runtime, migrate existing profiles, install dependencies or make the separate Install-DemoHost.py installer relocatable. A new profile does not contain all previously prepared scenarios.

`Test-DemoRelocation.ps1` passes6 preflight checks against inert temporary fixtures: initial location, relocation into a path with spaces, legacy absolute paths, non-demo rejection, modified-runtime rejection and malformed-location rejection. No executable is launched by that test. A real fresh-machine launch remains unverified. `Test-RuntimeIntegrity.ps1` separately exercises the full-file integrity guard.

Before UI verification, run `node original-stack/Demo-Controls.cjs demo-PROFILE show-demo-window`. It validates the demo process path and profile, restores it if Windows reports it minimized, then brings the renderer forward. A minimized Electron window can yield blank captures and unavailable composer commands; `Page.bringToFront` alone did not restore it in the observed case. This helper does not change original styles or capability guards.

## Export the existing runtime without profiles

Use the existing verified demo runtime location and a new output directory. The export requires Python3.12+ (the tested version), at least the inventory byte total plus64MiB free, and no re-extraction or build:

```powershell
python original-stack/Export-DemoRuntime.py original-stack/state/instrumented-profile-host/runtime-location.json 'D:/new-rea-runtime-bundle'
```

The exporter streams each inventoried file through SHA-256 into `runtime/`. It rejects unsafe/duplicate inventory paths, links, unexpected or missing runtime members, changed file bytes, altered renderer metadata and existing destinations. The relative `runtime-location.json` appears only after every file passes. Failed partial output remains for inspection and cannot be launched through an export manifest; choose another new destination for a later attempt.

The result contains the runtime, sanitized integrity metadata and an export report. Profiles, credentials, conversations and fixture stores are outside the runtime and are not exported. Keep this original binary bundle local/private; it is not included in Git commits. The minimized patch metadata supports launching; it is not a replacement for the full local host-build manifest used by Install-DemoHost.py.

Alongside the bundle, keep a checkout of this repository for the launchers and demo adapters. The tested environment uses PowerShell7 and Python3.12. Install adapter dependencies in a chosen virtual environment, then activate it so the launcher's `python` command selects that interpreter:

```powershell
python -m venv .venv-demo
. ./.venv-demo/Scripts/Activate.ps1
python -m pip install -r original-stack/demo-requirements.txt
./original-stack/Start-Demo.ps1 -StateName demo-portable -DemoHost -RuntimeLocationPath 'D:/new-rea-runtime-bundle/runtime-location.json' -DryRun
./original-stack/Start-Demo.ps1 -StateName demo-portable -DemoHost -RuntimeLocationPath 'D:/new-rea-runtime-bundle/runtime-location.json' -DemoPagesTls -InspectRuntime
```

The runtime already contains the original frontend; omit FrontendPackageRoot to use it. To test the separate installed `@rea/original-frontend` package, pass its path as described earlier. A fresh profile needs its own demo scenario data. Export verification and launcher preflight do not prove every screen works on a second machine; that UI validation remains pending. No new app instance was launched as part of the recorded export verification.

## Real exported-consumer acceptance

The exported runtime was subsequently launched on this Windows machine with a new `demo-export-consumer-v1` profile, using the relative manifest and its bundled original frontend. `Verify-ConversationFlow.cjs` passed13 UI scenarios, including image attachment/removal, fixed demo reply, history navigation, rename and reload persistence. The original rail, avatar, sidebar, conversation and composer were visually inspected. See `evidence/exported-consumer.json`.

This reuses the installed Python dependencies and proves relocation on this machine; a clean second machine remains unverified. Other historical screen fixtures were not migrated into the fresh profile. Keep the old profile separately if you need those scenarios.
