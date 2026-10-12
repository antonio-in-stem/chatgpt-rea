# Personal conversation sharing — source trace and native port

## Recovered branch

`chatgpt-conversation-share-dialog-5203c8f4ed87.js:413` is K. Plain conversations have no image/prompt/message/widget selection, so I=false and L=false (:500–511). This is the non-social thread dialog; other sharing surfaces remain required and unported. Title falls back to thread-dialog `Share {threadTitle}` / `Share chat`. Description and audience strings come from Y.description and Y.publicLinkAudience. H (:532) detects a changed shared current_node_id; Create/Copy/Update labels are chosen at625–626. Ht (:843–887) creates/copies, then closes the non-social dialog on success. Failure, blocked, busy, attribution and workspace branches are not interchangeable.

`thread-dialog-37f1e77f5d2c.js` delegates to dialog-shell. Default modal width is520px (app-shared YMi fallback w130); share640 applies to L=true, not this branch. DialogBody default padding20. Radius24, heading Electron18/28 semibold, subtitle gap4; shell header mb8/pr32. Ifs app-initial409893 composes header, scrollable body py20, footer; footer gap12/right alignment/margin-top20. Source surface elevated-secondary and ring0.5px remain incompletely bound in the native theme.

`thread-preview-72f0de3b8542.js`: normal preview min-height224, aspect1200/630, radius8, border and surface, inert descendants, bottom64px fade. Share preview Ne uses padding16/gap16 and user max77%, radius16, px12/py8. Generated-image transcript changes to auto-height and has separate rendering; not covered by the text fixture.

## Implemented

Share now opens a focused native dialog, retaining a conversation snapshot for preview. It does not copy JSON or change the clipboard on open. Escape/outside/close dismiss without publishing. Confirm copies an explicit `chatgpt-demo.invalid` URL and closes, displaying a demo notice. Created snapshot data remain in memory; subsequent copy does not change the retained snapshot. The demo disclosure in the dialog is an intentional addition, so its pixels are not asserted identical to production. There is no network publication or real public link service.

Native rendering uses traced dimensions, heading, user bubble layout, cropped Markdown preview and64px native GPU gradient. The existing Markdown renderer is not the complete original preview renderer. Focus trap/return use the app's existing dialog controller.

## Remaining parity work

Update-link behavior when the shared node changes; source loading/close lock; preparation/copy failure and retry/read-only URL; exact source toast; source link glyph/button typography; preview inertness/accessibility; exact backdrop/surface/border; metadata-conditioned privacy notices; generated images, prompt/response/widget/social/workspace variants; shared-link recipient frontend. Local fixture persistence is intentionally separate from source backend behavior.

## Verification

35 native-app tests passed, including real Share open/escape/commit, no clipboard write on open, width520, snapshot preservation and unchanged chat/draft. Windows workspace build passed. Captured only the owned preview HWND and inspected `qa/native-share-dialog-6.png`: dialog, text preview, crop and fade render. This is not a pixel comparison against the installed app.
