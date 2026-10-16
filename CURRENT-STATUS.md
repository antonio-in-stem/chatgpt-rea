# Current handoff — 2026-10-15

## Scope and budget
Original shipped Windows frontend, original renderer/CSS/assets, navigable demo flows and reusable delivery with original internal dependencies retained. Rust is deferred by the human. Real generation, speech processing, authentication and production services are excluded; their frontend flows remain in scope. Full completion is NOT established.
Quota last verified17% used; absolute ceiling50%. Stop new implementation40%, reserve through50% for verification/delivery. No reset credits. AGENTS.md, METHOD.md and FRONTEND-CLOSURE.md apply. Historical states are available in Git history, not active instructions.

## Current milestone and next action
Appearance theme serialization/import round trip verified in installed original frontend consumer. Verify-AppearanceThemeImport.cjs passed6 checks: empty and malformed values disable submit; valid edited original export applies surface/ink; persists reload; original colors restored; entire exported theme string exactly restored after another reload. UI uses original general-settings:2733 exampleValue=exportThemeString(), and its original validator/submit handler. No clipboard read or renderer/adapter change. Copy-to-clipboard delivery is NOT verified by this test.
Next bounded acceptance: original immediate advanced-appearance reset and restoration. Source Jo:4479 applies immediately; there is no reset confirmation/cancel flow. Inspect existing source and actual UI before modifying anything. Remaining advanced appearance controls include font styles, motion, split modes and contrast. Do not interpret completed Appearance checks as completion of all Settings or frontend flows.

## Live demo / reproducible launch
Process check this turn confirmed demo169216 (S:/rea-profile-runtime-v1/ChatGPT.exe) and adapter138336; launcher session95146 from preceding work. Revalidate before using IDs; never start another instance based only on an observation timeout.
Profile demo-profile-host-v1; saved session original-stack/state/demo-profile-host-v1/demo-session.json; CDP app://-/index.html. Installed host package5235f4fddd10054dd6754bb745090a4d560dc85a1c45b17bacbf11ded542e0d7 from S:/rea-accent-package-v1.
Frontend root S:/rea-original-frontend-consumer-v1/node_modules/@rea/original-frontend.
Launch only after verifying existing instance is stopped:
`./original-stack/Start-Demo.ps1 -StateName demo-profile-host-v1 -DemoHost -InspectRuntime -DemoPagesTls -FrontendPackageRoot 'S:/rea-original-frontend-consumer-v1/node_modules/@rea/original-frontend'`
Startup/build is slow: original root currently validates20119 installed files twice. No duplicate launches or unneeded rebuilds. Build to a new directory, stop only verified demo and wait launcher exit before installation.

## Delivered package boundary
Package-Frontend.cjs preserves exact original webview members from pristine ASAR hash c5fdef328cfa2ad9095786f9c3a7aaa447e68834d31299d6ef2592da02029038.20119 files/545939185 bytes; private npm @rea/original-frontend in S:/rea-original-frontend-package-v1. Verify-FrontendPackage.cjs packed, offline-installed and checked every installed hash. Tarball217050853 bytes remains local.
Original protocol root optionally selects that verified installed tree; original host/bootstrap still required. Verify-ConversationFlow.cjs passed13 scenarios against installed consumer. FRONTEND-PACKAGE.md documents consumption. Not original TypeScript, independent React API, or fresh-machine portable delivery. Partial @rea/ui package remains a subset, not the full original app.

## Recent Appearance acceptance
- Verify-Appearance.cjs:6 mode/effective-theme/reload/restoration checks.
- Verify-AppearanceAccent.cjs:4 selection/reload/restoration checks; typed chat_theme contract repaired in demo_sidebar_settings.cjs,4 adapter tests pass. Original default restored.
- Verify-AppearanceColors.cjs:8 draft/valid-color/UI-font/reload/restoration checks. UI font is separate from heading font; heading stays OpenAI Sans. No renderer changes.
- Verify-AppearanceTypography.cjs:9 numeric validation/acceptance/reload/restoration checks. Programmatic blur attempt failed; native Enter passed. Blur acceptance not claimed. Initial sizes14/14/13 restored.
- Verify-AppearanceThemeImport.cjs:6 round-trip checks as above. Exact initial serialized theme restored; import dialog closed.
Current expected dark values #181818/#FFFFFF, System UI font, default accent, System theme choice. Inspect actual state before further actions.
Evidence JSONs in original-stack/evidence/appearance-*.json; detailed generated check files under ignored demo state. These checks do not establish typography rendering in Pages/code views or visual parity across all states.

## Known tooling lessons
Use Demo-Controls.cjs only with explicit credential-free demo profile. Reload may temporarily remove CDP target; runners wait for readiness and tolerate only Original renderer missing. Menus can contain menuitemradio: generic click supports it; activate-popup-item supports menuitem only. Settings must finish loading before section activation.
Capture original demo with capture-demo-window using fromSurface:false. Default surface capture caused black rail/white Home artifacts; view capture resolves them without CSS edits. Original window inspected locally; matched-state full visual parity remains unproven. Do not publish screenshots, raw runtime data, profiles or original tarballs.

## Remaining breadth
FRONTEND-CLOSURE.md is the family ledger.145 lexical route entries have textual path candidates; eligibility, composition and state coverage remain partial. No more global provider recursion/inventory expansion by default. Broad gaps include queue eligibility/advance, attachment edge states, plugin/skill variants, cloud scheduling, artifact/workspace variants, sharing/access, spreadsheet/office editing, Sketch transforms/editing, incoming activity, remaining Security/account/settings states, archive preview/deletion, server-defined Family/notification variants and reproducible portable delivery. No completion percentage is justified by current evidence.
Archive /archive read/filter acceptance already passed6 checks with demo-only durable transport and explicit empty ChatGPT archive catalog. Explore excludes its built-in archive entry; do not force that guard. Preview/detail navigation remains unverified.

## Repository
Branch codex/native-windows; authorized push HEAD:main to antonio-in-stem/chatgpt-rea. Publish only source/adapters/docs/sanitized evidence. Existing extraction stays local and reused. No new subagents by default; at most one bounded read-only audit if directly needed.

Preset lifecycle verified: Verify-AppearancePreset.cjs passed6 checks: submenu opens, Dracula selected through native keyboard, serialized identity changes, picker and entire export persist reload, original export restored exactly after reload. Original account accent also restored to Default. Two pointer attempts failed (obscured/moved then missing item); local view capture showed left-opening submenu. Native ArrowRight/ArrowDown/Enter entered and selected successfully; pointer path remains unverified. First keyboard run caught incomplete restoration: import restored codex identity/colors but account accent remained Pink. Source app-initial:460950-461050 separates account accent from theme import. Extended restoration through original accent picker; rerun passed. Renderer/adapter unchanged. Quota17%, Rust deferred.
