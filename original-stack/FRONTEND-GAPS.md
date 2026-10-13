# Original frontend gap audit — 2026-10-13

Scope: two read-only REA workers; no Rust edits and no replacement renderer components. This is a bounded follow-up inventory, not proof of complete screen coverage.

## Profile / rail

Live original demo: profile button renders its original Settings SVG. Static source: app-initial-b8e1c8014bb4.js function iPo around 351125 reads identity from gp(); profile De is constructed only for authMethod=chatgpt (351270), and the effective profile ke selects Settings when null (351386). Current demo authMethod is null. Thus replacing the SVG would hide the missing identity integration instead of reproducing the source behavior. Next: trace the host identity contract and supply explicit synthetic demo identity through a documented isolated adapter. Merely adding email to account/read is not sufficient evidence. Remaining navigation gates require separate tracing.

## Prioritized demo gaps

1. Composer queue: thread/queue/list is fixed empty; add/update/delete/reorder/start are missing. Original app-shared-737655e1fb23.js:183749-184059 calls those methods and listens for thread/queue/changed. QueuedSubmission contains id, input:UserInput[], clientUserMessageId. Verify original queue controls, edit/remove/reorder, persistence and no duplicate start.
2. Composer attachment: seeded history data-URI thumbnail/viewer works, but local picker -> chip -> removal -> send -> reopened history is unverified. app-primary-19fe57fd8c00.js:71267-71280 guards stale attachment generations; jdt at 71557 uses selected base64 or read-file-binary and returns dataUrl/filename/localPath. This includes the host boundary, not solely app-server RPCs.
3. Plugin catalog/detail: plugin/list and plugin/installed are empty; plugin/read is missing. app-shared-737655e1fb23.js:232530-232577 requests marketplacePath or remoteMarketplaceName plus pluginName; original response is {plugin:PluginDetail}. Use inert synthetic data to verify card/detail/close/reopen and error states. This does not implement installation.

Bundles cited are under state/recovered-all/readable/assets. Exported protocol bindings are under protocol/typescript/v2. Existing evidence covers some shell/conversation/project flows, not all frontend functionality. Historical README entries must be reconciled against latest source and observations before reporting status.
## Additional rail source gates

In app-initial-b8e1c8014bb4.js, ljo (347737) builds destinations and ujo (348226) filters destinationDiscoveryEnabled. Space/cards requires G(Mr) at 347810. Security (348147) requires desktop navigation enabled, mode eligibility, local-host eligibility and VAo plugin/gate readiness. Projects Njo (348570) depends on sidebar mode/layout/flat mode; final shell visibility has additional rules. FFn/RFn (119510/119525) resolve visibilityByAccountId and orderByAccountId, falling back to anonymous and retaining only eligible IDs. Home unread dot in Vts (394744, passed at 395015) comes from unread activity state, not decoration.

Still unresolved: precise Mr capability provider, security plugin identity, grid destination, host gp identity seam and avatar fetch. These are static observations, not runtime proof of a working populated rail. Complete fixtures at these contracts rather than hardcoding visible icons or copying a real account session.
## Prepared identity fixture (not yet integrated)

`demo_identity.cjs` supplies fresh source-shaped account/read, account-info and /me demo records from one explicit local PNG. Uses reserved example.invalid email and rea-demo identifiers, with hasChatGptToken=false; no token is created or read. It is not imported by the launcher or host yet, so the visible gear is unchanged. Two Node tests pass for consistent identity, exact local image bytes, caller-mutation isolation and invalid local image rejection. accountRead additionally validates against the original exported GetAccountResponse schema. Host instrumentation and runtime/avatar verification are the next required steps; this module alone does not complete them.
## Instrumented host package prepared

Build-DemoHost.cjs builds state/instrumented-profile-host/app.asar from the pinned pristine archive. It changes only .vite/build/main-BklS_2Y2.js at O_, readAccountInfo and fetchHttp. Identity comes from demo_identity.cjs; only GET /me and /backend-api/me at the ChatGPT origin return local demo data. Other requests through that fetchHttp method fail explicitly. This is not full process network isolation. No real auth token is supplied.

The builder checks source/archive hashes, unique source seams, JavaScript syntax, byte preservation of the original ASAR data region and the new main member hash. The updated header points only main at an appended replacement; the old member remains unused in the data region. The pristine package is never modified. patch-manifest.json records output hash c97af2013404d31bffb98c33c9b4eeb4cc4f4e34b621c8443bdceafeaecdb33e. Renderer resources are unchanged.

Not yet wired to launch: a separate runtime directory and explicit account/read demo fixture are still required, followed by runtime compatibility and visual avatar verification. Do not replace pristine/resources/app.asar or claim that building this variant fixes the live UI. Additional original account/workspace/profile gates may require more source-derived fixture routes.
## First instrumented-runtime startup

A distinct physical runtime copy at S:/rea-profile-runtime-v1 contains 3,594 hash-verified files. Start-Demo -DemoHost selects its manifest and an explicit synthetic account fixture; normal demo startup retains no-account behavior. 47 existing adapter tests pass and both launcher scripts parse successfully.

Runtime PID 73896 exited before rendering: native ASAR integrity rejected the modified header. Direct hashing established pristine header 6b993af172cfc4425644e357856706390067ea457bc76bc11d0d3d5905c3bab5 versus modified c575b6a05d8a4d7b21415e1c98ce267b280754721ce33236a25c228cb51ec82e. The pristine reference occurs as ASCII at ChatGPT.exe offset 4752119 in the copied runtime. The initial log-label interpretation was reversed and is corrected in evidence/profile-host-startup.json. No executable was modified. Next step is a consistent test-package integrity reference, separately manifested, then another real startup. Avatar rendering remains unverified; original reference/runtime and Rust remain untouched.

## Integrity-aligned runtime reaches original sign-in

The copied ChatGPT.exe has only its 64-byte ASAR header hash reference updated at offset 4752119. New executable SHA256 f35f95f163354c1ae51e8bbb60c16ab749f4c1c973b949413a50e35181f3b301; patch manifest and runtime inventory agree. This changes the publisher-signed binary, so it is a local instrumented test executable, not an authentic signed distribution. Pristine remains unchanged. Runtime 13016 started and rendered the original sign-in screen (content HWND786694); helper HWND5442758 is black and must not count as app rendering proof. Next dependency is consistent synthetic session UI state: hasChatGptToken=false selects sign-in. No actual login occurred. Start-Demo now distinguishes process started from UI ready and will report nonzero app exit codes.

## Additional source-derived navigation prerequisites

Space: app-shared t3r:237633 requires capability chatgpt and Statsig2200939124=true. Capability:255477 requires access policy chatgpt and feature in_app_chat not disabled. Policy dui:247574 needs accountAccess=allowed and loaded rollout770071981; false permits directly, true additionally requires chatgpt.workspace.feature.desktop-app-chat.access.

Grid is Sites: original sites-light-20 asset (app-shared:202826), exported Bit and imported ar. app-initial yyr/jL:158007 requires Statsig637432221=true and GET /wham/sites/access -> {enabled:true}. ljo:348055 also requires desktop destinations and local host; pins can still hide it.

Security VAo:347568 requires Statsig1598376=true plus enabled AVAILABLE plugin whose id starts codex-security@ on a local host. These are static prerequisites; the demo Statsig/access fixture boundary and runtime visibility are not verified yet.


## Avatar verified in original shell

The explicit signedIn UI fixture sets hasChatGptToken=true as simulated display state only; getAuthStatus still supplies no token. Three identity tests pass. Build-DemoHost accepts a new output directory; Install-DemoHost installs its separately hashed package into the stopped test runtime and updates the integrity reference/inventory. Version 2 package SHA256 01628806043463781e232de4a19672c0b289b424eba564d31719573e255f35c2.

Runtime88008 reached onboarding; using the original Skip button opened the shell and the original mode menu selected Codex. Initially the profile shimmered while failed queries retried. It then resolved to Demo plus the original rounded avatar img: complete=true, natural100x100, rendered18x18, data scheme, object-fit:cover. Native capture evidence/original-demo-profile.png and profile-host-startup.json retain the result. No replacement profile component was written. The shown image is the explicitly synthetic packaged atlas asset, not the user's private portrait.

The current shell is a different original navigation variant (no narrow rail), and workspace settings failure disables sending. Avatar completion does not prove full rail fidelity. A source investigation of gate.electron accounts-check identifies a required same-account map for that gated route; that is not proof every shell route blocks, since this runtime reached the main shell despite those failed requests. Implement the missing account/settings/capability scenarios next.

## Version 5 original rail runtime verification

Runtime PID79532 reaches the original shell at 1280x820, DPI96. The missing entitlement fixture fix removes the observed startup error boundary. Native capture state/demo-profile-host-v1/rail-v5.png shows the narrow rail, original Space/Sites icons, original rounded frame/composer and profile image. DOM image is complete, natural100x100, rendered24x24. It is an explicitly synthetic packaged image, not the owner portrait.

Original Explore exposes Projects and Pull requests. Both were pinned through original controls using the scoped Demo-Controls pin-destination operation; subsequent DOM lists both in the rail. Persistence across restart is not yet verified. The later PrintWindow capture evidence/original-rail-v5.png retained an older-looking frame and is not proof of the pinning visual result. Security, destination order and Images visibility still differ from the requested reference. No Rust changes.

## v6 sidebar persistence verified end-to-end

Original Explore pin controls persisted Pull requests and Projects. After stopping demo PID52980, new process PID71012 restored both rail controls without repinning. See evidence/sidebar-persistence-runtime.json. This supersedes the earlier persistence-pending observation; unpin/reorder and full visual parity remain unverified.

## Queue integrated with thread transactions

All six thread/queue methods are routed through demo_thread_queue.py. Queue changes live in the thread JSON under demoQueues. Start stages a turn and removal, persists the original user input/clientId in that same commit, and only then returns events. Invalid/failed starts preserve the pending entry; disk failure returns an explicit transport error. 56 existing/unit tests passed; an additional real loopback WebSocket test confirms queue/start produces multiple delta events, queue/changed, completed turn and persistent empty queue. Renderer gate2120612410 is not enabled in the current v6 package; original UI queue controls and send-now steering remain pending.
