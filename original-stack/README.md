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

Using the original controls, the demo selected IngenierÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­a, continued, selected Omitir and confirmed Ir a ChatGPT. The original rail, sidebar, new-chat canvas and contenteditable composer then loaded. evidence/original-demo-shell.png is a native PrintWindow capture of the original content window; the larger helper window is blank. CDP screenshots omit native compositing and can show black/transparent chrome, so they must not be used alone for palette comparisons. The probe now records document focus and visibility (this Owl renderer reported focused=true and visibility=hidden simultaneously).

No auth.json appeared in this profile during the observation. This verifies initial shell startup with synthetic data, not complete functionality, full account/network isolation, or the deferred native Rust port. The sidebar currently has no projects/chats and Windows sandbox readiness remains the honest demo value notConfigured. Next work is stateful demo project/conversation contracts and local configuration mutations, plus the remaining observed collaborationMode/list and plugin/read contracts. Preserve all original renderer files and demo-profile onboarding state for the next run.

## Persistent demo projects

The adapter now routes project/list, project/read, project/create, project/update and project/delete through demo_projects.py. It atomically persists a local JSON store, correlates creation idempotency keys, validates demo inputs, pages/sorts lists and publishes source-shaped project/changed notifications to connected clients. Project roots are stored metadata only; the adapter never accesses those paths. The default store is ignored state/demo-projects.json; --project-state selects another demo store. Project move/import and thread membership remain unimplemented. Invalid mutations leave memory/disk state unchanged; disk failures are not reported as successes.

Seven Python tests pass, including persistence across store reload, duplicate creation, invalid request rollback, simulated replace failure, pagination and RPC notification routing. Validate-Projects.cjs verifies real store responses and change notifications against exported original JSON schemas. The WebSocket loop tolerates normal abrupt runtime shutdown without a traceback.

Two synthetic projects were seeded for the runtime test. The original host queried project/list, but its sidebar still displayed No hay proyectos. The recovered storeProject method keeps server project maps and a separate host cache; evidence/project-host-cache.recovered.js and project-host-observation.json retain this evidence. Visible integration remains unverified and needs the original host creation/cache path, not DOM injection. The original profile still opens the main shell after onboarding. Runtime and adapter were stopped after this test.

## Original project creation flow

Demo-Controls.cjs adds explicit inspect, pointer click, DOM activate and input fill operations scoped to a named demo profile without auth.json. The original AÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â±adir nuevo proyecto control opened its create-project dialog after renderer startup settled. Filling Nombre del proyecto and activating Crear proyecto opened the original folder-trust dialog. Native capture: evidence/original-project-trust-dialog.png. Pointer-only causality was not established; the earlier lack of response must not be attributed solely to event type.

The original host created C:/Users/PC/Documents/ChatGPT/UI Component Lab as its default project folder before asking for trust. It was verified empty and removed after this test; no trust was confirmed. This corrects the earlier assumption that creating a folderless project would be metadata-only at the host boundary: only the Python adapter itself has that property. The next required dependency is persistent config/batchWrite/config/read to store demo trust, before the host reaches project/create and its local cache write. Keep configuration confined to demo state, and select an explicit demo root for future creation. No project is yet verified visible in the sidebar.

## Persistent configuration and visible project integration

ConfigStore implements config/read, config/value/write and config/batchWrite in a demo-only JSON file. TOML key syntax is parsed for quoted Windows paths; writes use atomic replacement, content-based versions and expectedVersion conflict detection. Caller-supplied file paths outside the configured demo file are rejected. Read responses expose the demo user layer and origins. Replace, object/scalar upsert and null deletion are demo semantics; array upsert is explicitly unsupported. No user config.toml is edited and reload requests do not execute any code.

The original create-project form created UI Component Lab at C:/Users/PC/Documents/ChatGPT/UI Component Lab. Its original trust dialog was confirmed for that demo folder, allowing creation to proceed. No projects trust entries were found in the demo config afterward, so the trust persistence mechanism is not verified. The host then called project/create and added the project to its own sidebar/cache. project/move was additionally implemented according to the recovered beforeProjectId contract. The app and adapter were both stopped/restarted; the project remained visible and selected. evidence/original-persistent-project.png shows the verified result. The demo folder is retained because the visible project points to it.

Eleven Python tests pass. Validate-Config.cjs validates live store read/write responses against the original schemas, and Validate-Projects.cjs now also covers project/move. The empty-list fixture paths remain available only to stateless unit probes; the running server routes these operations to persistent stores. Conversations and generation remain unimplemented. Runtime processes were stopped after verification; next work is local conversation state and source-shaped events for the original canvas.

## Original conversation canvas verified

A synthetic transcript in demo-thread.json now drives thread/list, thread/read, thread/turns/list and thread/resume through demo_threads.py. It preserves original Thread/Turn/ThreadItem shapes and exposes one completed user/assistant turn with Markdown, a Rust code block and a table. List responses omit turns; read/includeTurns and resume hydrate them. Resume reports a read-only demo with no direct input execution. Empty source-shaped attachment, queue and collaboration-mode lists support opening the chat.

The original sidebar displayed Frontend Conversation Demo. Opening it first exposed the missing resume contract; after implementation and a cold restart, the original canvas rendered the message, syntax-highlighted code, table and message controls. Native evidence: evidence/original-demo-conversation.png. No renderer, styles or component markup were rewritten. The visible Windows sandbox setup banner remains the original response to demo readiness notConfigured.

Fifteen Python tests pass. Validate-Threads.cjs validates actual list/read/turn-page/resume outputs against the exported schemas; all twenty initial fixture checks also pass. Filtering and a bounded demo cursor exist for this one transcript, not a complete conversation database. Conversation mutations, event streaming, project assignment, complete pagination semantics and action verification remain future work. The runtime and adapter were stopped after verification.

## Persistent conversation actions

ThreadStore wraps the seeded transcript with atomic local persistence in state/demo-threads.json (--thread-state override). thread/name/set, thread/archive and thread/unarchive emit the original thread/name/updated, thread/archived and thread/unarchived notification shapes. Reads and lists use persisted names/archive state while preserving the original transcript. Restoring returns metadata without turns, as required by the Thread contract outside read/resume/fork.

Original sidebar Archivar chat was exercised: the row disappeared, the original Chat archivado toast appeared, and archived=true was written. Activating the toast's Deshacer restored the row, displayed Chat restaurado and persisted archived=false with the turn intact. evidence/original-thread-archived.png and evidence/original-thread-restored.png retain native captures. Renaming is persistence/schema-tested but has not yet been exercised through the original UI.

Seventeen Python tests pass, including archive/restore/reload/history preservation and write-failure rollback. Validate-Threads.cjs validates mutation responses and notification payloads against the exported schemas. This remains one seeded conversation; multi-chat creation, send/stream events, branching and other actions remain pending. The runtime and adapter were stopped after verification, with the transcript restored for subsequent work.

## Multi-conversation storage and fork contract

The demo thread store now uses a versioned map of conversations and migrates the prior single-thread JSON on the next mutation. Forking copies history through an inclusive lastTurnId or before an exclusive beforeTurnId, retains forkedFromId, and leaves the parent unchanged. Branches can be independently renamed and reloaded. Exported schemas validate fork responses and thread/started notifications. This implements a limited local demo contract, not the complete backend.

The original renderer's Bifurcar chat desde aqui control opened its original two-option dialog. Selecting the current-workspace option issued thread/fork with config, cwd, excludeTurns, lastTurnId, path, runtimeWorkspaceRoots, threadId and threadSource. The request did not create a branch: nonempty config/workspace/source overrides remain rejected by the adapter. UI branching is therefore NOT verified successful; the next integration step is to recover and implement the observed metadata/config semantics. No renderer or CSS changes were made.

## Original fork flow verified

The recovered $rn.prepareRequest function builds thread/fork with configuration, workspace roots, source classification and excludeTurns. The extracted function is retained in evidence/fork-request.recovered.js. The demo now accepts and retains these values as inert metadata; no tools or commands are executed. Workspace roots and reasoning-effort metadata survive resume. Arbitrary configuration is retained, not interpreted as a complete backend configuration engine.

Selecting the original current-workspace fork option created a second persisted conversation. The frontend subsequently requested read/resume and name/set, chose Frontend Conversation Demo (2), displayed the inherited Markdown/code/table history and its original Continuacion de otro chat separator. The source conversation remained intact. evidence/original-forked-conversation.png records the native window. Twenty-one tests pass, including invalid metadata rollback and reload. Remaining observed unsupported requests include ancestor-filtered thread lists, thread/goal/get and hooks/list. New-chat generation, full configuration semantics and the deferred Rust port remain incomplete.

## Branch follow-up read contracts

thread/goal/get now returns goal:null for an existing demo conversation and rejects unknown IDs. hooks/list returns a source-shaped empty-hooks entry for each requested cwd (or the demo session cwd when omitted/empty), without accessing paths or executing hooks. ThreadStore resolves ancestorThreadId through parentThreadId at every depth, excludes the ancestor itself and does not mistake forkedFromId for spawned ancestry. Parent and ancestor filters are mutually exclusive as specified by ThreadListParams. Traversal is bounded against cycles.

Twenty-three Python tests pass. The validator also checks ThreadGoalGetResponse and HooksListResponse against the exported schemas. These follow-up reads were prompted by the preceding original-runtime fork observation; this change has contract/unit verification, not a new visual runtime observation. Goal mutation and hook execution remain unsupported; these empty states accurately describe the demo.

## Original goal strip and controls

The demo persists thread/goal/set and thread/goal/clear state, returns the original response shapes and broadcasts thread/goal/updated or thread/goal/cleared. Existing goals retain their objective/budget when only status changes. Counts are local demo values: no model runs, automatic continuation, tool execution or token consumption occurs. Origin values are validated but this local demo does not replicate production authorization policy.

A seeded goal rendered the original Objetivo en curso strip. Activating Pausar objetivo persisted paused and displayed Objetivo en pausa with the original resume/delete/edit icons. Activating Borrar objetivo sent thread/goal/clear and removed the persisted goal. Native screenshots are evidence/original-goal-active.png and original-goal-paused.png. The capture exposed a zeroed elapsed timer on pause; the adapter now accumulates active elapsed seconds and preserves them across pause/resume. That timer correction is unit-tested, not yet visually rechecked. Twenty-five tests pass and goal response/notification schemas validate. Editing, resume UI, budget-limited and completion visuals remain unverified.

Clear-flow caveat: the final DOM inspection still returned four goal-related controls after the store reported zero goals. Immediate visual removal is therefore not verified and may require investigation of the original host notification/cache path. The verified clear result is persisted state only.

## Goal clear replay and original side-panel editor

Added value-free delivery observations for notifications (method, successful sends and failures only). In a fresh runtime, clicking Borrar objetivo produced thread/goal/cleared delivered to one socket with zero send failures; a later DOM inspection found no goal controls, and evidence/original-goal-cleared.png shows the strip removed. The previous stale-controls symptom was not reproduced; no root cause or renderer fix is claimed.

An externally seeded demo goal update reached the open renderer without restart. Editar objetivo opened its original right-hand editor tab. Input.insertText on the already-focused contenteditable and the original Guardar button persisted the edited objective. evidence/original-goal-editor.png captures the original split pane, tab, editor and composer layout. Pausing afterwards displayed 1m 5s, confirming the prior elapsed-time correction now preserves time visually. The goal is left paused in demo storage. Demo-Controls permits insert-focused only when the current element is contenteditable and the named profile contains no auth.json. Twenty-five tests still pass. Goal resume, complete and budget-limited states remain unverified.

## Empty conversation creation contract

thread/start now creates independent persistent demo conversations with empty turns and no inherited transcript, fork, goal or title. It accepts source-shaped cwd, runtime roots, project association, model/provider, reasoning metadata and legacy/paginated history selection. Responses and thread/started events validate against the original exported schemas. Resume preserves the selected model and roots across store reload. Startup configuration is inert demo metadata; executable tools/environments and ephemeral sessions remain unsupported. The reported sandbox remains read-only and no execution permission is granted.

Twenty-six tests pass, including independent identities, empty history, project filtering, reload and invalid-input rollback. Title filtering now handles untitled threads. This is contract-level creation support; the original New chat -> send flow is not yet verified and still needs demo turn lifecycle events and review of the existing Windows setup gate. No renderer edits were made.

## Live demo turn lifecycle

demo_turns.py builds deterministic text-only turn/start results and ordered original notifications: thread active, turn started, user item started/completed, agent item started/text delta/completed, turn completed and thread idle. The complete transcript is atomically persisted before the response/event sequence is emitted. No generation or tools run. This initial cycle is immediate (duration zero), not timed streaming or an interruptible background job. Rich input spans, attachments and active-turn interruption remain unimplemented. Client message identity is retained for frontend reconciliation.

A new empty chat was created through the loopback contract while the original app was open, named Live Message Demo, and opened from its original sidebar. A turn/start RPC then delivered the live event sequence. The original canvas rendered the user bubble, fixed assistant response and message actions; evidence/original-live-demo-turn.png records the native window. This verifies live event rendering, not the composer send path: the original Windows setup notice still blocks that path. Twenty-seven tests pass; start/turn/item/delta/status/completion responses and notifications validate against exported schemas.

## Original composer send verified

The adapter accepts --demo-sandbox-state ready|notConfigured|updateRequired, defaulting to notConfigured. This explicitly selects a simulated UI scenario; it does not configure Windows sandboxing or enable tool execution. Startup output records simulatedWindowsReadiness and executesTools:false. All command execution methods remain unsupported, tested under each scenario.

With the ready demo scenario, the original Windows setup notice disappeared. The actual Nuevo chat text button opened its original composer; Input.insertText and the original Enviar button triggered thread/start and turn/start. A second message sent through the same composer produced another completed turn. Both user/assistant pairs persisted in the same chat. evidence/original-composer-send.png captures the native window after the second send. No renderer or CSS was modified.

Twenty-eight tests pass. This verifies the basic original new-chat/send path with fixed demo responses. Streaming remains immediate; cancellation, rich attachments and the remaining frontend workflows still need implementation/verification. activate-text in Demo-Controls resolves a unique visible exact-text button separately from icon buttons sharing an accessible label.

## Gradual demo output and original stop button

The running adapter now uses streaming ThreadStore mode. It persists an in-progress turn, delivers synthetic text in 12-character chunks on a background asyncio task, and accepts other requests while output is pending. --demo-chunk-delay controls the interval (default 0.6 seconds; the visual probe used 2). turn/interrupt persists interrupted with the current partial items, emits completion/idle and prevents later scheduled fragments from being applied. The existing synchronous helper mode remains for isolated fixture validation. Overlapping starts are rejected.

The original Nuevo chat/composer/Enviar path displayed Detener during output. Clicking Detener sent turn/interrupt, retained a partial assistant response, returned the composer to its send state and produced zero subsequent delta notifications in the capture. The persisted turn lasted 14 seconds. evidence/original-stream-interrupted.png records the original stopped-state layout. Its header showed 0s despite durationMs=14000 in storage: timing presentation remains a known fidelity gap, not a verified match. Twenty-nine tests pass, including partial-history reload and rejection of late events. Process-crash recovery of active demo turns and background-task failure handling still need work.

## Work-duration source audit

Recovered functions retained in evidence/work-duration.recovered.js distinguish work timing from turn duration. Cwr/Owr use finalAssistantStartedAtMs for completed work, nxr gives cancelled work an unknown endpoint, and the display timer D7e computes max((completedAtMs or local time) - startedAtMs, 0). This does not yet prove why the live interrupted header showed 0s; changing durationMs alone is not a justified fix.

The audit did identify a separate concrete event defect: item/completed timestamps were generated before streaming and still equalled startup time after delayed delivery. apply_stream_event now stamps item lifecycle events at their actual application time. A controlled-clock test confirms the emitted item completion timestamp and completed turn duration. Thirty tests pass. The interrupted-header rendering still requires a runtime replay and complete trace through its caller; no visual correction is claimed.

## Interrupted transport recovery

At adapter startup, recover_active_turns marks persisted in-progress turns failed with a source-shaped TurnError explaining the demo transport restart. It retains partial items, makes the thread idle and allows another send. Elapsed time ends at the last persisted demo progress timestamp, excluding downtime. Recovery is idempotent and old scheduled events cannot update a failed turn. A resumed live streaming thread now reports active instead of always reporting idle.

Background streaming errors are observed explicitly, sanitized to their exception class in logs, and finalized as failed turn/idle notifications when persistence still works. Finalization errors are reported rather than left as unobserved task exceptions. This does not promise recovery when the state file itself is unwritable or corrupt. Thirty-one tests pass, including simulated restart, preserved partial input, excluded downtime, idempotence, late-event rejection and a subsequent send. Failure events validate against the exported schemas. These recovery changes are contract/unit verified; the original error-state screen has not yet been visually verified.

## Original recovery error and continuation verified

A separate Recovery UI Demo conversation was seeded with a persisted in-progress turn and partial text, then the adapter was started. Startup reported recoveredDemoTurns:1. Opening the chat in the unchanged original renderer displayed the partial response followed by its original error component containing the demo restart explanation. evidence/original-recovered-error.png records this state.

A new message was typed into the original composer and sent using Enviar. It streamed and completed in the same conversation, preserving the previous failed turn. Persisted statuses are [failed, completed]; recovery-ui-observation.json and original-recovered-continued.png retain the result. This verifies recovery from seeded interrupted state, not an actual OS/process crash during this capture. No source or style modifications were required for the error component.

## Original user-message editing verified

thread/revert now preserves the history prefix before beforeTurnId for paginated demo conversations, rejecting missing boundaries and active turns. Its response omits turns and supplies a demo turn cursor when retained history exists. It changes only transcript JSON; no workspace file rollback occurs. thread/reverted notifications and the response validate against original schemas. Legacy thread/rollback remains unsupported.

The first runtime attempt exposed missing thread/items/list hydration: a reopened paginated chat had no message controls. The adapter now returns original ThreadItemEntry shapes with turn filtering, forward/reverse paging and exclusive item anchors. Historical item timestamps are null when not retained; reverse-navigation backwardsCursor remains unimplemented.

After restart, the original Editar mensaje control opened the editor. Text entered into its focused textarea and sent through its Enviar button triggered thread/revert followed by turn/start. The final store contains one completed replacement turn with Original demo text. Edited in the original UI. evidence/original-message-edited.png records the unchanged original renderer. Thirty-three tests pass, including retained-prefix rehydration, missing boundaries and item pagination/anchors.

## Legacy rollback contract

The recovered B9t and _8t consumers require rollbackResponse.thread with the full retained turns array. The exported protocol inventory contains no legacy ThreadRollbackResponse schema. evidence/legacy-rollback.recovered.js retains the production consumer evidence; schema validation checks the structurally equivalent ThreadReadResponse wrapper only, not a claimed original rollback schema.

thread/rollback now removes a positive bounded number of final turns from legacy demo history, rejects active turns and invalid counts, and persists the retained prefix. It returns the complete thread and does not invent an unobserved rollback notification. Only transcript JSON changes; workspace files are never rolled back. Thirty-four tests pass, including preservation/reload of earlier turns and rollback to an empty history. Legacy editing still requires an original-runtime UI test; paginated editing remains separately verified.

## Original legacy message editing verified

A Legacy Edit Demo conversation with historyMode=legacy was opened in the original renderer. Editar mensaje, native text entry into its editor and Enviar issued thread/rollback with numTurns, followed by turn/start. Persistence shows one completed replacement turn containing Legacy message to edit. Updated through the original legacy editor. evidence/original-legacy-message-edited.png retains the native capture. Both legacy and paginated editing now have separate runtime observations.

An additional attempt opened Acciones del chat, but the menu options were not exposed in the inspected renderer DOM; renaming through that menu remains unverified. No host-private callback was invoked to bypass the menu.

## One-command demo launcher

From original-stack, run ./Start-Demo.ps1 in PowerShell 7. Python with websockets must already be installed; the launcher does not install dependencies. It verifies the original executable/ASAR using Start-Original, starts a loopback adapter, reads its dynamically assigned endpoint and opens the copied runtime visibly. It keeps project/config/thread JSON under the selected demo profile. The default profile is demo-desktop; -StateName selects another demo-* name. The ready Windows UI scenario is explicit in startup output and can be changed with -WindowsScenario. It is not an OS sandbox guarantee. -DryRun checks/prepares paths without launching processes.

A named mutex and copied-runtime process check reject concurrent launchers to avoid attaching the frontend to the wrong server. The adapter is stopped in finally after runtime exit; an adapter failure also closes the runtime launched by this invocation. Inspection is opt-in through -InspectRuntime. Fresh profiles still run the original onboarding/account gates; the launch test below proves process lifecycle only, not completion of first-run onboarding or all account-gated features.

Live verification with demo-launcher-check started both processes, rejected a second invocation before spawning another adapter, and exited successfully after the tracked runtime process tree was terminated. Both tracked PIDs were absent afterwards. The default fresh profile is separate from previously populated observation profiles and does not import their account or demo databases.

## Clean-profile onboarding and reopening verified

The coordinated launcher was run with a new demo-first-run-audit profile. The original onboarding controls were used in order: Ingeniería, Continuar, Omitir, Ir a ChatGPT. The unmodified shell then displayed the seeded demo conversation. Nuevo chat, native text input and Enviar created one completed turn containing "Fresh profile demo: original onboarding completed." and the fixed demo response. No account fixture or renderer change was needed, and the profile's codex-home/auth.json was absent.

After the first runtime and adapter were confirmed absent, the same launcher/profile was reopened. The onboarding did not recur; the persisted conversation was opened through its original sidebar row. Its message actions and composer were present, and the native capture shows the retained transcript. Evidence: first-run-observation.json, original-first-run-composer.png and original-first-run-reopened.png. This verifies the clean-profile basic chat path, not all account-gated features or native credential/network isolation.

The initial in-process PowerShell capture failed with a stack overflow while the app remained alive. Running Capture-OriginalWindow.ps1 using a separate `pwsh -NoProfile -File` process succeeded; use that invocation for repeatable captures. No fix to the capture helper itself is claimed.

## Measured original shell geometry and typography

Run `node original-stack/Measure-Renderer.cjs demo-first-run-audit` while that explicit demo profile is open with inspection enabled. The read-only probe refuses profiles containing codex-home/auth.json and selects only app://-/index.html. It records source executable/ASAR hashes, viewport/DPR, anchor ancestry, computed styles, inherited-variable overrides, pseudo-element styles, focus/hover state and actual platform fonts on text nodes. It does not mutate the renderer. Output is state/<profile>/render-metrics.json.

Evidence/render-metrics-1090x760.json contains 97 measured nodes at 1090x760 CSS pixels and DPR 1 in the reopened demo conversation. Parent references and anchor chains were checked for consistency. The userMessage selector did not match this build and is explicitly empty; bubble geometry is not yet covered. Empty font arrays on containers do not establish a missing font: text descendants report Segoe UI and Segoe UI Semibold.

Observed surfaces in this state:

| Surface | Geometry / finish |
| --- | --- |
| Rail | 52 px wide; home button 36x36 px |
| Sidebar surface | 288 px wide; corners TL/TR/BR/BL = 12/0/0/12 px; translucent Oklab background |
| Main surface | corners 0/12/4/0 px; rgb(24,24,24) |
| Composer surface | 713x98 px; 22 px corners; rgb(54,54,54); inset 1 px white shadow at 0.2 alpha |
| Composer editable | 14 px type, 20 px line height, declared weight 430 |
| Send button | 28x28 px |
| Permission control | 13 px type, 18 px line height |

These measurements explain why uniform corner rounding and flat approximated surfaces lose fidelity. They are a baseline for the later native port, not universal layout constants. Responsive widths, alternate themes, message bubbles and interaction states remain to be measured. Matching computed styles alone does not reproduce Chromium text rasterization or compositing.

## Message bubble contours and permission-chip hover

Static inspection of user-message-bd254db1d77f.js identified the actual bubble class `_bubble_11evq_1`; this build does not use the previously attempted data-message-author-role selector. The measurement tool now anchors to that shipped class, whose version dependence is explicit. The extracted user-message-f152e09d34c3.css is retained unchanged as evidence/user-message.recovered.css. Additional hashed CSS fragments in superellipse-source.json show the supported superellipse feature branch and the 1.25 radius-scale variable; fragments are static evidence, not proof that every listed rule applies to this screen.

The runtime report render-metrics-message-1090x760.json covers 119 nodes and now includes corner-shape, filters and masks. The observed regular user bubble has 22 px radii with `superellipse(1.5)`, a 70% maximum width, 10 px vertical / 16 px horizontal padding and a translucent background. Its text actually uses Segoe UI. The bubble container's inherited 16 px font does not describe its text descendants; use the fontSamples node styles when porting text. Compact and temporary variants have separate extracted rules but have not been exercised here.

Demo-Controls supports hover via mouseMoved without a click. Hovering Cambiar permisos changed its background from transparent to rgba(255,255,255,0.08), retaining its existing text color, 28 px height and `superellipse(1)` corner shape. permission-hover-observation.json records the baseline-relative change; original-permission-hover.png visually confirms the chip highlight and original tooltip. Tooltip geometry and timing were not measured. No renderer/CSS changes were made. A native rounded rectangle with only the same radius is therefore insufficient to reproduce every original contour; the superellipse shape is part of the measured contract.

## Original long-message expansion cycle

A 30-line plain-text message was entered through Nuevo chat and the original composer/Enviar controls in demo-first-run-audit. The original bubble exposed Mostrar más; activating it exposed Mostrar menos, and activating that restored the collapsed height. At the recorded 1090x760 viewport, bubble heights were 506.75 -> 733.5 -> 506.75 CSS px and aria-expanded changed false -> true -> false. The inner clipped region used max-height 433 px with a 22.75 px line height in the collapsed state. Conversation scrolling placed the top above the visible viewport; recorded heights are independent of that position.

The measure tool now includes the actual bubble's expansion button and aria-expanded/aria-hidden/inert attributes. evidence/collapse-observation.json retains the three states and the source-module hash; original-long-message-collapsed.png captures the final original state. The extracted module is preserved as collapsible-user-message.recovered.js. Static code includes line-height-based clipping, resize/mutation observers, and inert/aria-hidden handling for clipped interactive descendants. This run verifies plain-text expansion only; code-block clipping, link accessibility, resize transitions and expansion persistence remain unverified. No renderer or styles were modified.

## Runtime diagnostic capture in the demo launcher

Start-Demo now drains the original runtime's stdout and stderr concurrently into runtime-stdout.log and runtime-stderr.log under the selected demo profile. Logs are streamed to disk, not accumulated in memory, and replaced on each launch. The console retains the launcher status/error. This does not suppress diagnostics or modify the renderer. Start-Original -PassThru returns the actual process with redirected streams; its caller owns draining and disposing that process. PassThru and WaitForExit cannot be combined. Existing standalone launch behavior is unchanged without PassThru.

Live verification: the original controls remained available with redirection active. Killing only the demo adapter caused the launcher to report failure and close its runtime; both tracked PIDs were then absent. The completed log files contained 443124 and 271687 bytes. A second launch succeeded, proving mutex release. Terminating its runtime tree made the launcher exit 0 with no diagnostic flood; both PIDs were absent and both log files could be opened with exclusive access afterward. This verifies forced process-termination cleanup, not the product's tray/window-close behavior. Pipe-drain cleanup has a bounded wait and reports failure instead of silently discarding it.

## Original chat search connected to demo history

The original search dialog issued thread/search with searchTerm, archived, cursor, limit, sortKey and sourceKinds. Its exported ThreadSearchParams/ThreadSearchResponse contracts define results as {thread,snippet}. The adapter now searches local demo titles, previews and user/assistant text using case-insensitive substring matching. Results omit transcript turns and include a bounded snippet around the match, preserving Unicode offsets. Archive/source filters and timestamp sorts are supported. Demo keyset cursors carry a query/filter scope and support reversing direction; they are not upstream cursor values or upstream full-text ranking. The demo's default interactive sources are cli, vscode and appServer. No external content is queried.

Thirty-seven tests pass, including content-only matching, archive filters, reverse paging, invalid query/cursor inputs and late Unicode matches. ThreadSearchResponse validates against the original exported schema. In the original UI, filling Buscar chats with Fresh profile displayed one matching conversation and its snippet; Enter from the focused combobox closed the dialog and opened that conversation with its original message controls. Captures: original-search-result.png and original-search-opened.png. Empty-state and multi-page UI behavior remain unverified.

Demo-Controls now supports text/search inputs, placeholder-based input identification and bounded search-key actions requiring a focused combobox. An initial attempt typed too early during the dialog transition and reached the composer; the successful verification targeted the identified Buscar chats input explicitly. No renderer callback or CSS was replaced.

## Original pinned-sidebar workflow

The recovered host module src-CP7XXlpZ.js defines reserved pinned section 01984de2-8f74-7c91-a3b2-5c5e937cf318 and lists its threads using section_position. Hashed fragments are retained in evidence/pinned-section-source.json. The adapter now supports thread/section/move to that reserved section or null, threadSection/list for the built-in section, and persisted section_position ordering. Thread.section is the original ThreadSection object, not a string; list filtering resolves its id. sectionEnteredAt changes on section entry/removal. Unknown/custom sections remain unsupported.

Moves validate their anchor before committing, preserve transcript history and use the existing atomic storage path. Explicit beforeThreadId changes stored order; the demo lists section_position in forward order by default and reverses it for explicit desc. No unobserved notification was invented. Thirty-nine tests pass, covering restart, order changes, unpinning, invalid anchors and persistence failure; section responses and populated Thread.section validate against exported schemas. Drag-and-drop ordering has not been UI-tested.

In the untouched original sidebar, Fijar chat moved Frontend Conversation Demo into Fijados. After closing both demo processes and restarting, Fijados and Desfijar chat were still present. Using Desfijar chat removed the empty section and persisted section:null. original-pinned-sidebar.png and pinned-sidebar-observation.json retain the visual/state evidence. Demo-Controls row-action scopes a uniquely labelled action to a uniquely labelled original row, avoiding ambiguous repeated pin buttons.

## Custom section contracts; original UI integration remains incomplete

The demo store now persists custom sections alongside threads, with generated UUIDv7 identities, names and nullable appearance. threadSection/create, list, update and delete use the exported response shapes. Updating without appearance preserves it; explicit null clears it. Renames update the section object embedded in assigned threads. Deleting a demo section removes its assignments without deleting conversations or transcript content. The existing atomic commit includes both section and thread changes. thread/section/move and section_position now accept persisted custom sections as well as the reserved pinned section. Reserved-section edits are rejected.

Forty-one tests pass, including rename/reload, appearance preservation/clearing, deletion without history loss, pagination and failed-delete atomicity. All four section operation responses validate against the original generated schemas.

Runtime coverage is narrower: the sidebar options menu did not expose its choices in the inspected renderer DOM. A Component Library Demo section was therefore created and assigned through direct loopback RPC, explicitly not through original UI. After restarting, it did not appear in the original sidebar. This is evidence that server-side persistence alone is insufficient for the host's custom-section registration/discovery path. The test section was removed through RPC, retaining the conversation. evidence/custom-section-observation.json records this limitation. Original menu creation, renaming and deletion remain unverified; no claim of completed UI integration is made.

## Custom-section eligibility and corrected menu inspection

The source audit now distinguishes server persistence from renderer eligibility. In the recovered shared bundle, lZ reads feature gate 68267662; dZ resolves an allowed account id or null; fZ/pZ require that id. The initial bundle aliases yje=lZ, lBe=fZ and Kh=pZ. Automatic app-server section queries require yje, lBe and the pinnedThreads bridge; the move-to-section menu returns no entries without Kh. evidence/custom-section-gates.json retains the exact alias chain and source excerpts. The runtime feature-gate value was not directly measured, so its disabled state is not claimed. A section RPC does not establish the renderer's allowed-account state. The account/eligibility path remains the integration gap, not the section CRUD contract.

An earlier menu limitation was partly an observation error: the original Chat sidebar options button moves from x=338 to x=286 after hovering Recientes. Hovering the header first, then clicking the newly measured button, exposed its Radix menu in the main DOM. Hovering Organizar barra lateral exposed Por proyecto and En una sola lista; the menu also contains a Proyectos checkbox. It is not necessary to infer an inaccessible native menu for this control. original-sidebar-organization-menu.png captures those original controls. This does not establish that other previously unobserved menus have the same cause.

Demo-Controls inspect/actions now include menuitemradio and menuitemcheckbox, and describe reads a named control's DOM/geometry. Click now checks the element under the pointer after movement and rejects obscured/moved targets. A subsequent submenu click was rejected by this check, so no grouping change is claimed. The wrapper still requires explicit reveal/hover sequencing; it does not force hidden controls or call internal state APIs.
