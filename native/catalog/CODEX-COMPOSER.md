# Codex composer reconstruction contract
Status: source traced, native integration pending. This is the high-priority composer shown in the supplied screenshot. Existing Rust chat_composer_view renders the simpler ChatGPT composer and is not equivalent.

## Provenance
Untouched shipped permissions-mode-dropdown-7bfb50f8e130.js SHA2566fc4519756720d0ef951d99c6b26dbfc5c4a2ea63c3f9f2a5313d5754020f5d7. Recovered readable copy has2628lines and SHA256bca6a67d9804afddd4401ae6b4a321153e5cb486e919abf029261445a8dc4dc8. Babel AST equality verified ignoring only locations/comments/format metadata. No target code executed. Recovery added to the extraction manifest.
REA analysis of the isolated49KB module failed at transport:98013992-byte response exceeded67108864-byte IPC limit. No complete Evidence object was received; do not cite that attempt as successful semantic analysis. Do not repeat identical call.

## Integration chain
app-initial551208 loads PermissionsModeDropdown dynamically; export Rll as ar571760. app-primary3454 imports ar as SC. X7e46177 composes editor and actions; M_e imported as On2899 is its rendering layer. It passes leadingActions, modelControl, secondaryActions, primaryAction and voice to M_e at47243. Follow the On export before changing frame spacing.
app-primary49465 supplies Work with Codex placeholder.75571 enables permissions for an existing thread or work-home. The current native Ask ChatGPT placeholder and left-side model arrangement must not be treated as this mode.

## Visibility and layout state
X7e distinguishes single-line/multiline, home/thread, compact, cloud, Aeon, active voice, interaction-blocked and hidden controls. Its floating quick-chat narrow threshold is40rem (46294); this is not a universal composer breakpoint.
46862 renders permissions when enabled, not Aeon/cloud, and multiline or floating narrow. Leading context button precedes these controls. The model picker is independently gated at47119. Voice/dictation states render distinct controls at46750. Input is inert when blocked. These conditional branches must remain explicit in the port rather than merging all controls into every mode.

## Permissions selector
Readable permission module2297–2332: ghost trigger, accessibility label Change permissions, data-navigation-target permissions. Icon-only variant uses composerAuxiliary; labeled variant composerPermissions, selected-value max-w-40, no dropdown indicator. Loading state shimmers; unavailable trigger is disabled.
Menu is start-aligned (2334), title How should ChatGPT actions be approved?, with Learn more link. Options:
- Ask for approval: always ask to edit external files and use the internet.
- Approve for me: only ask for detected potentially unsafe actions; unavailable reason when default sandbox permissions are absent.
- Full access: unrestricted internet/files, can be disabled by requirements.toml.
- Custom/config profiles: conditional, with config.toml label and disabled reasons.
Source2210 labels guardian-approvals as Approve for me. Do not invent backend effects for these demo selections.
2253–2278: ordinary/guardian/custom selection closes the menu; Full access opens a confirmation and commits only in onConfirm. Port this confirmation as UI behavior, without modifying real host permissions. Cancel must retain previous selection.

## Native implementation boundary
Introduce an explicit surface/mode before integrating Codex-only controls, keeping existing ChatGPT demo behavior. Render permissions/model/effort/dictation/submit using recovered component tokens, and retain a per-thread demo state. Drafts, stop/submit, popup dismissal and focus restoration must remain functional.
Pending source tracing: M_e frame/footer tokens; model/effort combined menu; permission confirmation geometry/icons; goal above-composer strip; single-line transitions; reply/tool rows. No visual parity claim is supported yet.


## Native mode integration checkpoint
Settings now retains a backward-compatible codex_surface flag, selectable by pointer or keyboard from the existing brand menu. Dns source395810 supplies Codex/Build, debug, and ship; ChatGPT retains its description. Changing mode updates the brand and placeholder (Work with Codex vs Ask ChatGPT), preserves the active conversation and flushes the current draft before persistence.
Fdl is the M_e renderer (app-initial export569316, function553344). FooterControls vLt67457 uses min-w-0/justify-end; FooterExpandingControls bLt67495 uses flex-1/justify-end. The native Codex variant places the model in trailing controls and uses the microphone vector; ChatGPT keeps its existing arrangement.
This is initial mode integration, NOT full Codex parity. Permissions, model+effort catalog/menu, frame tokens, goal strip, actual inline dictation-demo states and transcript tool/approval rendering remain incomplete. Microphone currently opens the existing voice demo surface; model names still use the existing local catalog. All conversations currently share a mode; original mode-specific navigation inventories remain pending.
