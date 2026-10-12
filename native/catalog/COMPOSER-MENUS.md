# Composer menus: recovered bindings and local substitutions

Sources are retained unchanged in extracted/webview/assets and readable recovery.

- `app-primary-19fe57fd8c00.js` lines 42176–42496: shared S5e model flyout. D5e is 254 px and O5e is 8 px. ChatGPT delegates here at 103050–103072. Native popup uses these measurements; source aligns against trigger-label measurements while native currently anchors from composer bounds.
- ChatGPT selector 102165–103072 receives `models.versionOptions`, `options`, limits and thinking effort from runtime data. Auto/Fast/Thinking remain the explicit local fixture catalog. The native list does not claim recovered server model availability. Power/simple/advanced and internal model subviews are not yet ported.
- Plus items 99015–99250: Add photos & files, Add library files, Create image and Web search. Desktop/browser/Space, split photos/files and entitlement branches determine which items appear. This fixture uses combined desktop upload and local Library. Icons use shipped assets; exact import binding is verified for paperclip family, other alias matches are provisional.
- Native upload opens a real multi-file OS picker and only keeps display names in local attachment state; it never reads or uploads file content. Async selection is bound to the conversation that opened it. Preparation/failure/retry is fixture state.
- `library-file-picker-dialog-content-2f9fc6ac6d23.js`: Add from Library, Search Library, No matching files, No recent files yet, Add to chat; source size=xwide, inner h-[560px], gap-4, header px-5 pt-5. Native implements search, multiple selection, attachment commit and cancellation without leaving chat; 720 px width is provisional pending xwide token trace. Grid/list/provider filters/folder traversal and server pagination are not yet implemented. Data are local persisted documents.
- Plus menu width 254 px, row height 36 px, radius 12 px are native adaptation pending exact DS/UDe CSS binding, not measured original values.
- `app-shared` CSS 5703–5708 defines composer surface through elevated-primary-opaque; native token is dark #282828/light #fff. Composer chrome CSS16242 removes border for desktop and applies prominent shadow; native shadow_lg is a renderer approximation.

Keyboard list navigation supports arrows, Home/End, Enter/Space and first-character matching; Escape/outside click dismiss. Selected tool is kept per conversation and removable. Tool selection changes composer state only; no search or image backend is implied.

Picker xwide width resolved after initial implementation: app-shared-737655e1fb23.js272243–272244 maps xwide to680px. Native width is now680px; previous720px provisional value is superseded.

## Source reconciliation: inline Plus menu

Supersedes the provisional 254px Plus width: HKi in app-shared-737655e1fb23.js:286792–286811 derives width and left from inlineBounds. The native Plus popup now uses measured composer width/left and the desktop compact 4px gap (Sfl, app-initial:554427). Model retains 254px/8px. Normal ChatGPT omits Select model because showHeading is conditional on TPP. Upload and Library detail strings (app-primary:99110–99134) render inline, matching hYc (app-initial:519689–519699); they truncate as available width shrinks. Exact description color and row spacing still require full token binding.
