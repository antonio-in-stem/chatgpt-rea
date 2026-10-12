# Personal conversation sharing — source trace and native port

## Recovered branch

`chatgpt-conversation-share-dialog-5203c8f4ed87.js:413` is K. Plain conversations have no image/prompt/message/widget selection, so I=false and L=false (:500–511). This is the non-social thread dialog; other sharing surfaces remain required and unported. Title falls back to thread-dialog `Share {threadTitle}` / `Share chat`. Description and audience strings come from Y.description and Y.publicLinkAudience. H (:532) detects a changed shared current_node_id; Create/Copy/Update labels are chosen at625–626. Ht (:843–887) creates/copies, then closes the non-social dialog on success. Failure, blocked, busy, attribution and workspace branches are not interchangeable.

`thread-dialog-37f1e77f5d2c.js` delegates to dialog-shell. Default modal width is520px (app-shared YMi fallback w130); share640 applies to L=true, not this branch. DialogBody default padding20. Radius24, heading Electron18/28 semibold, subtitle gap4; shell header mb8/pr32. Ifs app-initial409893 composes header, scrollable body py20, footer; footer gap12/right alignment/margin-top20. Source surface elevated-secondary and ring0.5px remain incompletely bound in the native theme.

`thread-preview-72f0de3b8542.js`: normal preview min-height224, aspect1200/630, radius8, border and surface, inert descendants, bottom64px fade. Share preview Ne uses padding16/gap16 and user max77%, radius16, px12/py8. Generated-image transcript changes to auto-height and has separate rendering; not covered by the text fixture.

## Implemented

Share now opens a focused native dialog, retaining a conversation snapshot for preview. It does not copy JSON or change the clipboard on open. Escape/outside/close dismiss without publishing. Confirm copies an explicit `chatgpt-demo.invalid` URL and closes, displaying a demo notice. Created snapshot data remain in memory; Copy retains the same message snapshot and Update replaces it when the last message ID changes. Draft text is excluded from snapshots. The demo disclosure in the dialog is an intentional addition, so its pixels are not asserted identical to production. There is no network publication or real public link service.

Native rendering uses traced dimensions, heading, user bubble layout, cropped Markdown preview and64px native GPU gradient. The existing Markdown renderer is not the complete original preview renderer. Focus trap/return use the app's existing dialog controller.

## Remaining parity work

Preparation-fetch retry variant (separate from create failure); exact source toast; source link glyph/button typography; complete preview accessibility/inert subtree semantics; exact backdrop/surface/border; metadata-conditioned privacy notices; generated images, prompt/response/widget/social/workspace variants; shared-link recipient frontend. Local fixture persistence is intentionally separate from source backend behavior.

## Verification

35 native-app tests passed, including real Share open/escape/commit, no clipboard write on open, width520, snapshot preservation and unchanged chat/draft. Windows workspace build passed. Captured only the owned preview HWND and inspected `qa/native-share-dialog-6.png`: dialog, text preview, crop and fade render. This is not a pixel comparison against the installed app.

## Async states and recovery checkpoint

Native flow now waits300ms through a local fixture transport; this delay is a demo latency, not a recovered server timing. Creating shows button loading and hides close; Escape and outside dismissal are blocked. The callback checks dialog identity/generation and discards abandoned work. Comparison of last message ID maps the source current_node_id Update rule to the local message model. Snapshots exclude unsent drafts.

Fixture outcome is selectable before launch through `NATIVE_SHARE_DEMO_OUTCOME`: `create-failed`, `copy-failed`, `blocked`, or default success. A configured failure is consumed once, so retry can succeed. Create failure leaves the dialog/error intact; copy failure retains a readonly selectable Share link field; blocked replaces preview with the source error and Close. These are simulated outcomes, not a claim that GPUI reports OS clipboard failure (its clipboard write API returns no result).

Preview text selection is disabled and a native hit-test shield blocks pointer activation of rich descendants. A GPUI test clicks an actual Markdown link and verifies no URL is opened. Complete accessibility subtree inertness remains unverified.

Verification:37 native-app tests pass. Tests cover async close lock, absence of close control, update after a new message, unchanged private draft, all fixture errors/retry, readonly field, link hit testing and abandoning pending work. Windows build passed; `qa/native-share-copy-failed-7.png` inspected, including error and recovery URL. No original-app pixel comparison.
