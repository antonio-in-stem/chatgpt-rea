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


## Native permissions checkpoint
The Codex composer now opens a native permissions menu. DemoPermissions is stored per conversation (serde default Ask preserves old workspaces). Ask/Guardian selections commit and dismiss; FullAccess opens a confirmation and commits only from its Confirm button. Escape, Go back and conversation changes abandon pending confirmation. The field is presentation-only and never changes OS/backend permissions.
The primary source labels/descriptions and confirmation flow were ported. Current360px menu/520px confirmation, row styling and offsets are provisional native geometry; source-exact primitive tokens/icons are still pending. Conditional custom profiles, policy-disabled/loading states, Learn more destination, responsive label collapse, detailed confirmation icons/risk variants and original focus behavior are not complete.
Own-window capture qa/native-codex-14.png (PID24468 HWND3672576) was inspected. It confirms the Codex label, placeholder, leading permission choice and trailing model/microphone/send. It also clearly shows incomplete transcript, sidebar inventory and model/effort presentation. It is not a parity proof.


## Model and effort checkpoint
DW (app-primary44088) resolves a backend-driven model catalog and per-thread model/effort; eF/tF13868 filters supported efforts and resolves a compatible selection. Reasoning labels JH39460 use Light/Medium/High/Extra High/Max/Ultra. The DW trigger450xx combines model and effort; R5e45198 is end-aligned and supports simple/advanced menu views.
Native Codex now has per-conversation serialized CodexModel/ReasoningEffort, defaults Astra/Medium, separate from the legacy ChatGPT Auto/Fast/Thinking fixture. The local catalog Astra/Sol/Luna and six effort levels is explicit DEMO data, not recovered live server availability. The trigger shows both labels; its popup is end-anchored, allows model choice and a native stepped effort slider. Arrow keys/Home/End work when the effort control is focused. Chat changes restore the saved selection/slider. Programmatic slider synchronization does not emit user changes.
This is a functional initial port, not exact R5e rendering: the flat model rows plus slider are provisional. Pending simple/advanced selection views, model metadata compatibility/fallback variants, service tiers, loading/error/locked states, exact popup/slider tokens, release-versus-drag persistence semantics and trigger-relative anchoring under every size. Effort currently saves on each native change; model selection leaves the menu open.


### Composer frame checkpoint (2026-10-12)
Recovered `app-initial-99e8b4b455fa.css:414,446,548` and
`app-shared-9a94b907ed47.css:48025-48031`: default multiline empty attachment
spacer totals 14 px, editor wrapper inline padding 12 px, input/footer gap 4 px,
footer inline padding and bottom margin 8 px. Codex mode now uses these wrapper
measurements instead of uniform outer padding. ChatGPT mode retains its prior layout.
Dark Codex no longer uses the generic large exterior shadow; the original inset
1 px white shadow remains unported. Source radius remains 22 px for this shell.

Verification: 55 workspace tests passed; the existing mode-switch test now checks
real rendered top/gap/bottom/leading-control bounds and passes. Windows debug build
and package succeeded. Executable SHA256:
`58eff718bab4a35525ea3641d7a919717da947ab2ab08d486f9beaa222fbca22`.
Own-app capture `qa/native-composer-16-visible.png` was inspected. Initial hidden
capture `qa/native-composer-16.png` is black and is not visual evidence.

Remaining: native Textarea internal inset/placeholder baseline, attachment layout,
source inset shadow, screenshot background color discrepancy, Codex transcript
activity/tool rows, full rail/sidebar inventories, titlebar menus and home layout.
This checkpoint does not establish visual parity.
