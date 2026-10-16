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
