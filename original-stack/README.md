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

Run Start-Original.ps1 from PowerShell. This launches the original app with separate local directories; account isolation is not established and it is not yet an offline demo. Use -DryRun to inspect launch configuration without starting it. It retains original startup/network behavior, which can download runtime/plugin metadata into state. Do not copy real credentials into that directory to simulate fixtures. Capture-OriginalWindow.ps1 captures only the verified isolated executable and supports WindowIndex because the runtime has a helper window as well as the login window. State and screenshots are excluded from Git.

Space reclaimed for this phase: only native/target/debug/deps, a regenerable Rust build cache (~6 GB). Source and packaged native executables were retained.

## Runtime observation correction

A subsequent read-only probe of the original app://-/index.html renderer found a populated account sidebar and composer, despite the separate child profile directories. The route was not the login window. The mechanism is unresolved (native runtime state, credential/host coordination, or another account-state path); do not infer offline/demo isolation from the directory settings. All processes whose executable path was inside this copied runtime were stopped after observation. No login action or account mutation was performed by the agent. The private screenshot remains only under ignored state/. Do not redistribute that state.

REA list_electron_targets evidence ev_2ca489b6dbf243501b889f158f973053b8f714c56e623de13167251c35f85976 observed Chromium155 but excluded4 non-file pages. The fallback Probe-Renderer.cjs reads bridge method names and CSS metrics through the copy's loopback CDP endpoint; it does not invoke host bridge methods. It also captures the main renderer. App/preload code remains unchanged. Main renderer font stack resolves to Segoe UI fallback, font weight430; body16px is inherited context, not proof every control uses16px.

Before another app launch, identify and isolate the native account/profile and host-coordination paths. Supplying demo data without contacting live account services remains unfinished. Start-Original.ps1 is a diagnostic launcher, not an account-isolated demo guarantee.

## App-server adapter seam

Static source Yo in application-network-startup-CfAQmSYg.js selects CODEX_APP_SERVER_WS_URL before host.websocket_url, unless CODEX_APP_SERVER_FORCE_CLI is1. Main A5 applies the same force-CLI override and distinguishes local/cloud host routing. Exact expressions and provenance are retained in transport-*.recovered.js and transport-source.json. Main constructor sets localClientCoordinationEnabled based on A5(localHost)==null. These observations identify a supported transport seam; they do not yet establish the cause of inherited account state or cover the native account broker.

demo_transport.py is a loopback-only WebSocket contract recorder. It never connects upstream; it logs method names/parameter keys only, not parameter values. Unknown requests return method-not-implemented and notifications receive no reply. It now implements the four initial fixture methods documented below; complete offline startup has not been demonstrated. Three tests exercise actual WebSocket request/reply, ID correlation, redaction of parameter values, notification behavior, malformed input and credential-free fixture responses. Python websockets was already available locally; no dependency was installed.

The original runtime has NOT been launched against this recorder. Account/profile and native network isolation must be resolved before using it to observe startup, and response schemas must be recovered before implementing fixtures. No frontend components or styles were changed.

## Exported authoritative protocol

The shipped pristine/resources/codex.exe (codex-cli0.162.0-alpha.17.2) exported1,335 JSON-schema/TypeScript files using app-server generate-json-schema --experimental and app-server generate-ts --experimental. protocol-manifest.json records the generator SHA256, commands and every output SHA256. These are generated protocol bindings, not recovered original UI TypeScript.

The local adapter now supports initialize, account/read, configRequirements/read and getAuthStatus. Values represent synthetic no-account/no-policy state; initialize identifies itself as rea-demo and uses only state/demo-home. All other requests still fail explicitly. The legacy getAuthStatus fixture uses the exported TypeScript definition. Its JSON response schema was not in the export: derived-contracts/GetAuthStatusResponse.json is explicitly a manual transcription, not an original generated schema. It returns null authMethod/authToken even when a caller requests a token refresh.

Three Python transport tests pass. Validate-Fixtures.cjs validates the actual handler output against the exported response schemas using an already installed Ajv package passed as its argument. Schemars uint/uint16/uint64 extensions are registered, with wide integers conservatively restricted to the JS-safe range. The current fixtures contain no wide integer values. All four responses validate; three use original exported JSON schemas and getAuthStatus uses the explicitly derived schema. Shape validity does not prove original frontend startup compatibility, feature availability or account/network isolation. The original runtime remains stopped; no app launch against these fixtures has occurred.

## Child environment boundary

Start-Original.ps1 strips inherited CODEX_, CHATGPT_, OWL_, ELECTRON_, OPENAI_ and NODE_ environment variables from ProcessStartInfo only, then explicitly sets the two local Codex profile paths. This removes inherited session/tool-pipe and CLI routing; no parent or system environment is modified. DryRun verifies hashes and prepares directories but does not start the executable. Verification confirmed that only CODEX_ELECTRON_USER_DATA_PATH and CODEX_HOME remain in those child namespaces and that the parent environment is unchanged. This is not proof that native account storage or network access is isolated; the cause of the earlier populated account remains unresolved. No runtime launch was performed for this change.

## First real demo-transport startup

A fresh named profile demo-probe-20261013-a was launched with CODEX_APP_SERVER_WS_URL pointing at the loopback adapter. The unmodified runtime connected and issued initialize, getAuthStatus, account/read and additional startup requests. demo-startup-observation.json records the method counts without parameter values. The original renderer displayed its connection-gateway screen with the adapter's unimplemented-contract error; the sidebar/composer did not load. No auth.json appeared in this new profile during the observation. This does not establish full network isolation. The older profile does contain an auth.json with tokens; its origin is still unknown and it is not reused for demo tests.

Start-Original.ps1 now accepts -StateName and -DemoTransportUrl. A demo endpoint must be a bare ws://127.0.0.1:<port> URL, a state name is mandatory, and a profile containing auth.json is rejected. Probe-Renderer.cjs accepts the matching state name and stores its capture/report within that ignored profile. The runtime and recorder were stopped after the probe.

Observed read methods project/list, plugin/list, experimentalFeature/list, remoteControl/status/read and config/read now have synthetic empty/disabled fixtures validated against the original exported schemas. Nine responses validate in total, with int64 conservatively limited to JS-safe integers. These five additions were made after the runtime capture and need another startup observation. Mutations remain explicit errors; no fake persistence success is returned. Next: retry this original frontend with the expanded fixture set and implement the next observed contract according to its exported type.

## Gateway and onboarding observation

A second fresh profile demo-probe-20261013-b connected to the adapter. The runtime requested account/gatewayOAuth/read; its source-defined no-gateway response removed the connection-error screen. Additional observed reads now have fixtures: thread/list, mcpServerStatus/list, plugin/installed, externalAgentConfig/detect, windowsSandbox/readiness, model/list and permissionProfile/list. The model catalog contains one explicitly synthetic Demo entry; no real generation is provided. Sandbox readiness reports notConfigured, not a fabricated working sandbox.

Seventeen handler responses validate against their schemas (legacy auth still uses the documented transcribed schema). The validator now handles original Schemars int32 and uint32 formats with their explicit numeric bounds. Runtime reconnections advanced to an original onboarding view with a logo and Pensando; sidebar and composer remain absent. demo-onboarding-observation.json records per-iteration method counts and limitations. There was no auth.json in the second profile at shutdown. The runtime and adapter were stopped after observation. A cold startup is the next diagnostic step because reconnection retains renderer query state. Inspect the conversational-onboarding host boundary if the spinner persists; do not replace the onboarding component or force success in the UI.

## Original main shell reached

Cold profile demo-probe-20261013-c reached the original onboarding form after the content window was shown. The recovered s3s component selects its completion-capable animation only when EP is true; CBs writes EP from focus state. Source ranges and hash are retained in demo-shell-observation.json and evidence/onboarding-focus.recovered.js. The earlier Pensando screen was therefore not sufficient evidence of a missing server contract.

Using the original controls, the demo selected IngenierÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â­a, continued, selected Omitir and confirmed Ir a ChatGPT. The original rail, sidebar, new-chat canvas and contenteditable composer then loaded. evidence/original-demo-shell.png is a native PrintWindow capture of the original content window; the larger helper window is blank. CDP screenshots omit native compositing and can show black/transparent chrome, so they must not be used alone for palette comparisons. The probe now records document focus and visibility (this Owl renderer reported focused=true and visibility=hidden simultaneously).

No auth.json appeared in this profile during the observation. This verifies initial shell startup with synthetic data, not complete functionality, full account/network isolation, or the deferred native Rust port. The sidebar currently has no projects/chats and Windows sandbox readiness remains the honest demo value notConfigured. Next work is stateful demo project/conversation contracts and local configuration mutations, plus the remaining observed collaborationMode/list and plugin/read contracts. Preserve all original renderer files and demo-profile onboarding state for the next run.

## Persistent demo projects

The adapter now routes project/list, project/read, project/create, project/update and project/delete through demo_projects.py. It atomically persists a local JSON store, correlates creation idempotency keys, validates demo inputs, pages/sorts lists and publishes source-shaped project/changed notifications to connected clients. Project roots are stored metadata only; the adapter never accesses those paths. The default store is ignored state/demo-projects.json; --project-state selects another demo store. Project move/import and thread membership remain unimplemented. Invalid mutations leave memory/disk state unchanged; disk failures are not reported as successes.

Seven Python tests pass, including persistence across store reload, duplicate creation, invalid request rollback, simulated replace failure, pagination and RPC notification routing. Validate-Projects.cjs verifies real store responses and change notifications against exported original JSON schemas. The WebSocket loop tolerates normal abrupt runtime shutdown without a traceback.

Two synthetic projects were seeded for the runtime test. The original host queried project/list, but its sidebar still displayed No hay proyectos. The recovered storeProject method keeps server project maps and a separate host cache; evidence/project-host-cache.recovered.js and project-host-observation.json retain this evidence. Visible integration remains unverified and needs the original host creation/cache path, not DOM injection. The original profile still opens the main shell after onboarding. Runtime and adapter were stopped after this test.

## Original project creation flow

Demo-Controls.cjs adds explicit inspect, pointer click, DOM activate and input fill operations scoped to a named demo profile without auth.json. The original AÃƒÂ±adir nuevo proyecto control opened its create-project dialog after renderer startup settled. Filling Nombre del proyecto and activating Crear proyecto opened the original folder-trust dialog. Native capture: evidence/original-project-trust-dialog.png. Pointer-only causality was not established; the earlier lack of response must not be attributed solely to event type.

The original host created C:/Users/PC/Documents/ChatGPT/UI Component Lab as its default project folder before asking for trust. It was verified empty and removed after this test; no trust was confirmed. This corrects the earlier assumption that creating a folderless project would be metadata-only at the host boundary: only the Python adapter itself has that property. The next required dependency is persistent config/batchWrite/config/read to store demo trust, before the host reaches project/create and its local cache write. Keep configuration confined to demo state, and select an explicit demo root for future creation. No project is yet verified visible in the sidebar.

## Persistent configuration and visible project integration

ConfigStore implements config/read, config/value/write and config/batchWrite in a demo-only JSON file. TOML key syntax is parsed for quoted Windows paths; writes use atomic replacement, content-based versions and expectedVersion conflict detection. Caller-supplied file paths outside the configured demo file are rejected. Read responses expose the demo user layer and origins. Replace, object/scalar upsert and null deletion are demo semantics; array upsert is explicitly unsupported. No user config.toml is edited and reload requests do not execute any code.

The original create-project form created UI Component Lab at C:/Users/PC/Documents/ChatGPT/UI Component Lab. Its original trust dialog was confirmed for that demo folder, allowing creation to proceed. No projects trust entries were found in the demo config afterward, so the trust persistence mechanism is not verified. The host then called project/create and added the project to its own sidebar/cache. project/move was additionally implemented according to the recovered beforeProjectId contract. The app and adapter were both stopped/restarted; the project remained visible and selected. evidence/original-persistent-project.png shows the verified result. The demo folder is retained because the visible project points to it.

Eleven Python tests pass. Validate-Config.cjs validates live store read/write responses against the original schemas, and Validate-Projects.cjs now also covers project/move. The empty-list fixture paths remain available only to stateless unit probes; the running server routes these operations to persistent stores. Conversations and generation remain unimplemented. Runtime processes were stopped after verification; next work is local conversation state and source-shaped events for the original canvas.
