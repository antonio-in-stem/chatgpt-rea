# Shell reconstruction from the supplied Windows screenshot

Status: partial; exact visual parity is NOT achieved. The screenshot supplied on 2026-10-12 shows the Codex surface in the combined desktop app. The user's priority is now the global rail, contextual sidebar, conversation canvas and composer. Continue these before secondary pages.

## Authoritative source

Recovered app-initial-b8e1c8014bb4.js: D2o381074/381610 renders the global destination nav; Y0o379996 destination state/tooltip; k0o379536 native-size button; Vts394723 configures the modern rail. Shared CSS188/4688/4709 =>36px buttons and20px icons. Source rail padding8 =>52px default, measured at runtime by clientWidth381101.

Ec is the new page-surface gate, imported from shared Dei241696 (gate3085093835 plus compatible authentication). It also supplies data-new-slate-layout: app-initial298067/298846. Combined left panel contains rail and contextual sidebar at432808–432889; minimum combined width290 at433875–433879; persisted default340. Collapsing sidebar retains rail.

CSS app-initial-99e8b4b455fa.css3916–3940 supplies the default page-surface titlebar44px, end/bottom4px gutters, radius12px and contextual header52px. Application-menu and titlebar-placement exceptions occur4111–4124; actual installed feature/zoom state remains unknown. Do not call any one branch universal.

## Screenshot calibration vs source defaults

The supplied screenshot measures rail48, combined left area356, outer top40, panel top corners approximately16. Native shell uses48/40/16 with6px right and2px bottom inset to approach that reference; these are explicit screenshot adjustments, NOT verified source default tokens. Dark shell #1a202f and sidebar #191b21 approximate sampled screenshot pixels; real Electron Mica and alpha layering remain unresolved. Default saved combined width stays340; isolated capture fixture uses356.

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
