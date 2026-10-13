# Shell reconstruction from the supplied Windows screenshot

Status: partial; exact visual parity is NOT achieved. The screenshot supplied on 2026-10-12 shows the Codex surface in the combined desktop app. The user's priority is now the global rail, contextual sidebar, conversation canvas and composer. Continue these before secondary pages.

## Authoritative source

Recovered app-initial-b8e1c8014bb4.js: D2o381074/381610 renders the global destination nav; Y0o379996 destination state/tooltip; k0o379536 native-size button; Vts394723 configures the modern rail. Shared CSS188/4688/4709 =>36px buttons and20px icons. Source rail padding8 =>52px default, measured at runtime by clientWidth381101.

Ec is the new page-surface gate, imported from shared Dei241696 (gate3085093835 plus compatible authentication). It also supplies data-new-slate-layout: app-initial298067/298846. Combined left panel contains rail and contextual sidebar at432808–432889; minimum combined width290 at433875–433879; persisted default340. Collapsing sidebar retains rail.

CSS app-initial-99e8b4b455fa.css3916–3940 supplies the default page-surface titlebar44px, end/bottom4px gutters, radius12px and contextual header52px. Application-menu and titlebar-placement exceptions occur4111–4124; actual installed feature/zoom state remains unknown. Do not call any one branch universal.

## Screenshot calibration vs source defaults

The supplied screenshot measures rail48, combined left area356, outer top40, panel top corners approximately16. Native shell retains48/40 screenshot-calibrated rail/titlebar dimensions. The later SHELL-CORNERS.md checkpoint replaces guessed radii/insets with recovered Windows application-menu geometry:12px corners,2px bottom-right,4px right/bottom insets. Dark shell #1a202f and sidebar #191b21 approximate sampled screenshot pixels; real Electron Mica and alpha layering remain unresolved. Default saved combined width stays340; isolated capture fixture uses356.

## Implemented

Window controls now occupy the outer titlebar; global rail remains while contextual sidebar collapses. Main/sidebar share one rounded frame with a straight divider. Profile is at rail bottom. Home uses original selected/unselected vectors; Apps uses original plugin vector. Seven source SVGs are retained with descriptor bindings and hashes in native-ui/assets/manifest.json; security/activity/settings assets are recovered but not falsely presented as complete destinations.

Sidebar separates pinned/unassigned conversations and nested project conversations, with independently collapsible project groups. Scroll content uses an inner natural-height column, fixing the clipped Show more button. Source-derived minimum290 applies to combined rail/sidebar. Persisted width semantics include the rail. Current destinations are functional local routes, not complete original destination inventory.

Conversation header now shows the active nonempty conversation title. Segoe UI and Consolas explicitly implement Windows fallback font families. Composer, transcript and rich content still use the existing partial ChatGPT-style port: they do NOT yet reproduce the screenshot's Codex tools/goal/approval/model layout. Sidebar grouping state is session-local; user-defined sections/reordering, status badges and per-project pagination remain pending.

## REA conversation marker evidence

REA static analysis of untouched floating-navigation-rail-layout-64632a2f585a.js (2243bytes,808AST nodes,14findings,0parse failures), evidence ev_e124578f855657a761e319061237b22bba9c11e488e13ed114c6a84de8d37729. Scoped root SHA7bc2ff2688069127da2c7d4086eb9f5334371c070b6ff3130778b1d133a46d99. This is the conversation marker primitive, NOT the global destination rail. Imports unresolved outside the selected scope; no code executed. Summary retained in repository reports/rea-navigation-markers-summary.json; full graph not saved. Marker CSS uses26px line, hierarchy12/8/4, neighbor progress0.7/0.4/0.2,160ms transitions and reduced-motion override. Integration remains pending.

## Verification and limits

45 native-workspace tests and13 native-settings tests pass. New pointer/scroll tests cover persistent rail, combined width, sidebar hide/restore, project collapse/open-chat, header/table independent scroll, search visibility and create dialog. Existing popup geometry allows at most0.5px device rounding.

qa/native-shell-10.png is an inspected HWND-only capture of the shell before the explicit font-family update. It shows the new composition but is not an exact comparison. A later resized-window capture produced stale/clipped frames and is not accepted as visual verification. No desktop-wide screenshot was taken. Final binary builds and package succeeds; no claim of exact parity.

Remaining priority: native application menus and navigation history, complete rail destinations/context menus/badges, contextual sidebar sections, conversation navigation markers, transcript/tool rows, composer controls and precise screenshot-matched rendering across DPI/resize. Overall frontend clone goal remains incomplete.

## Next canvas implementation: exact navigation contract

Static source anchors (minified character offsets): local-conversation-thread-70abb87ab9c8.js @302376 mounts BookmarkedRail before the virtual list, within data-thread-find-target=conversation; enabled=ye||ot (complete history or full index). SA @280241 creates one marker per user-message including empty attachment prompts; CA retains unloaded historical items, wA voice timeline excludes trimmed-empty labels.

thread-user-message-navigation-rail-3ec85750addd.js yt/mt requires >=4 items and >=48px left content gutter, with zoom compensation, resize/mutation observers. Portal is scroll parent, position left16px in Electron/top50%/translateY-50%;36x10px buttons, maxheight min(70vh,640), inner scroll/fade40px. Visible interval uses intersection with16px top inset. Click k/wt smoothly aligns real message anchor at top; unloaded marker first reveals then jumps. Bubble/attachment highlight uses text14%→5%. Primary-pointer scrub navigates loaded markers instantly and suppresses its following click.

Preview fetch after150ms hover, immediate on focus; right-side anchor offset0, centered. Preview320px/maxviewport-16/radius12/padding8/ring0.5. Title,3-line answer,max2outputs+counter; loading/unavailable explicit. No active Markdown links/actions. Bookmark callback alone makes preview interactive. Neighbor widths20/14/10, active span, reduced-motion and160ms stroke transition are required.

bookmarked-thread-user-message-navigation-d11310593f6a.js C/E/D/O/k/A registers Alt+Up/Down before visual enabled gate: modifier-exact global navigation works even with hidden rail. Viewport target tolerance24px, correction350ms, reveal wait max1500ms. Bare arrows do not have a custom navigation handler. Implement against real stable message IDs and existing transcript scroll; do not draw decorative ticks with no navigation.

Pending verification:3→4 items,47→48px gutter, resize/zoom, attachment-only user prompts, click/Alt/focus, hover neighbors/preview, long scroll and reduced motion. Optional toys.audio-visualizer remains gated, not normal baseline.

## Native conversation navigation checkpoint

conversation_navigation.rs now builds stable-ID user-message markers (including empty content), gates the visual rail at4items/48px gutter, positions36x10px buttons16px from the canvas edge at viewport midpoint, caps inner scroll at min(70vh,640), and renders6/26px strokes with20/14/10px hover neighbors. Buttons have accessible message labels and standard activation. Clicking uses the real transcript item bounds; keyboard target selection ports E's24px viewport tolerance and stays independent of visual eligibility. Extra modifiers and open dialogs exclude the global shortcut. Manual wheel cancels ongoing navigation motion; switching conversations cancels it too. Reduced motion jumps immediately. Normal movement uses a native288ms cubic approximation, not verified Chromium smooth-scroll timing.

Source behavior still missing: delayed/focus preview, focus stroke states, pointer scrub/capture, edge fade,160ms spring marker transitions,150ms entrance, bookmarked markers, unloaded-history reveal,350ms target correction and bubble highlight. Active markers currently use individual user-row intersection rather than the complete original active-interval algorithm. Gutter follows known native shell/content geometry; runtime zoom is still absent. These are explicit gaps, not exactness claims.

47 native-workspace tests pass, including source target-selection boundaries and real UI tests for3→4messages, pointer jump alignment, hover state, Alt navigation with hidden rail, extra-modifier exclusion and gutter47.5→48 threshold via resize. Build/package succeeded: native-workspace.exe56154624bytes SHA25604d589f1fd507772f81c273a051015f6f17f34cb01543a873341b34d6c34896e. Inspected HWND-only qa/native-navigation-11.png confirms five visible marker strokes in the native canvas; full visual parity remains unproven.


## Navigation preview and pointer scrub checkpoint
The recovered thread-user-message-navigation-rail module specifies a 150 ms hover delay, immediate focus/pointer preview, and immediate navigation when dragging across markers. The native rail now follows these contracts for locally loaded messages. Its preview is 320 px wide, aligns to the marker right edge and vertical center, and shows a truncated prompt plus three answer lines. Pointer capture is an application overlay; release suppresses a duplicate smooth click. Conversation changes invalidate delayed previews and stale focus callbacks.

Verified using actual GPUI hover, Tab, drag and release events. This does not establish original-app visual parity. Remaining gaps include OS capture outside the window, scroll-edge fades, spring/entrance animations, bookmarks, unloaded history, answer Markdown/output cards, source interval highlighting and the 350 ms scroll correction. Browser smooth-scroll timing remains a native approximation.


## Header space allocation checkpoint
Recovered app-initial lines225466,225506–225552 define min-w-0/flex-1 title content and shrink-0 end actions. The native title now uses remaining header space instead of an arbitrary320px cap; end actions retain intrinsic width. The page-surface header uses52px, from CSS sidebar-navigation-header-height and its app-shell-header-height alias (4135), matching the screenshot's vertical center66px below a40px outer titlebar. No claim is made that this applies to every original mode.
49 workspace tests pass. A real-window geometry test checks1440/900/600px widths, title/action non-overlap and working chat menu. Missing original panel actions and the original Codex transcript/composer remain separate incomplete requirements.


## Independent sidebar pagination
The previous global take(30) wrongly clipped project children before grouping. Each project now selects its own unpinned children from the complete local catalog. Recents starts at10; project children start at5; expansion adds10 independently and survives group collapse/reopen during the session. Pinned chats are not consumed by the recents page.
Source: app-initial426580 recents maxItems10;422897 grouped thread maxItems=uxs;424285 uxs=5;377988 g1o forwards to kPo;352050–352420 kPo owns per-list expansion and10-item increment on the non-bounded branch. Local data has no backend paging.
Remaining: forced-visible active item, one-item tail handling, persisted expansion, bounded/infinite paging branches, list animations, sections/reorder and complete original row actions. These are not claimed complete.


## Active-row visibility and one-row tail
Recovered kPo at352158–352172 takes the initial page, appends the forced-visible key if outside it, then renders the complete list in original order when exactly one row remains and hasMore=false. The native fully loaded local catalog now implements this shared rule for recents and project children. Selection does not mutate page expansion. Show more depends on actual visible rows. This supersedes the prior checkpoint's forced-row and one-tail gaps.
52 native-workspace tests pass, including active-row navigation beyond a5-row project page and boundary cases for a single remaining row. Persisted expansion, source-specific active-key gates outside the chat route, remote loading, sections/reorder and full row actions remain incomplete.


### Native history and editor inset checkpoint (2026-10-13 UTC)
- Shipped source: app-initial-b8e1c8014bb4.js:75444-75449 dispatches
  navigate-back / navigate-forward host messages. Original arrow_left-40991fb9b16f.svg
  and arrow_right-7532e350d6ae.svg copied unchanged into native-ui.
- Titlebar now exposes working back/forward controls. Session-local route/chat
  history truncates the forward branch after new navigation, skips removed/archived
  chats, and flushes the outgoing editor draft before switching chats. It is a
  native demo implementation of the recovered command intent, not a recovered host
  history implementation. Scroll restoration, browser/panel history, cross-mode
  navigation and keyboard accelerators remain pending.
- GPUI component Input::render installs Medium internal padding (10 x, 8 y).
  Codex textarea now uses XSmall (4 x, 0 y) with an 8 px wrapper to obtain 12 px
  total inline inset and remove the unintended 8 px vertical inset. Text size and
  line height remain explicitly controlled. ChatGPT mode stays unchanged.
- 56 workspace tests passed, including real titlebar click traversal, drafts,
  forward-branch truncation and deleted destinations. Build/package successful.
  SHA256: 6484bd79f17b9ce6dabb151b779322be63de821970e511100085f2477c535f11.
- Inspected own-window capture qa/native-history-17-final.png; initial capture
  native-history-17.png exposed missing explicit SVG colors, fixed before packaging.
  Preview PID 37704. Menus and remaining Codex transcript/sidebar fidelity are
  incomplete; no exact-parity claim.


## Rail superellipse checkpoint
Recovered k0o (app-initial:379536) delegates to Wa with pill=false, size=xl. Shared ECe at38771 defaults squircle to !pill && wg.squircle; Qxe at37846 overrides the generic false default to true. CSS xl resolves control-radius-md, overridden to radius-lg; its 10px base scales globally by1.25, then the data-squircle rule scales by1.25 again (15.625px extent). corner-shape is superellipse(1.5), exponent2^1.5.

Native rail destination buttons now paint 64-segment corner cutouts over square button backgrounds. This reusable native-ui helper adds no event handlers or hitboxes; existing hover/selected paint and actions remain. It requires a solid known immediate backdrop and is not a general clip primitive for arbitrary transparency. Profile, sidebar rows and other controls are not yet migrated. Geometry test checks endpoints, bounds and the implicit superellipse equation. Own executable capture qa/native-rail-21.png inspected; 59 workspace tests and2 native-ui tests pass. No assertion of pixel-exact browser antialiasing.


## Sidebar row geometry checkpoint
app-initial356765 assigns sidebar-item to sidebar rows. Shared CSS15802 sets radius-lg and codex-corner-shape; this is 10px *1.25=12.5px with superellipse(1.5), without the rail button second multiplier. Sidebar-navigation at25475 retains30px height,8px cell padding and13px text-sm in Electron. Native chats, project rows, nested chats and Show more now use these corner cutouts. Padding lives inside row content, because the native Button content wrapper would otherwise inset the cutout layer; the actual executable capture caught this issue and the corrected qa/native-sidebar-22.png was inspected. Nested chat content retains32px indentation. Profile/mode menus and other controls remain pending. 59 workspace tests pass after the final composition change.
