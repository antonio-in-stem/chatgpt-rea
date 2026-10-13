# Recovered chat context menus

Static source: app-initial-b8e1c8014bb4.js. This is a partial map, not a claim of runtime-enabled item coverage.

- `_0` (360885) decorates entries recursively: accelerator lookup, short label map, explicit/fallback SVG, danger tone for delete-*.
- `ZVo` preserves Rename, Pin, read-state, Archive order when supplied.
- `aHo` (361039) builds cloud task groups: organization (pin/section), copy link, window, notifications, finish (archive). Empty groups disappear; separators join retained groups. This is not the ChatGPT conversation menu.
- `Kas` (400097) builds ChatGPT conversation groups: organization (rename/pin/section), continue, sharing, navigation, preferences, finish (archive/unarchive/delete), project. Share is omitted in header/hideShareAndPin/no-ID/unavailable loading branches; project policy can disable sharing. Delete opens a confirmation callback.
- `Jas` (400323) binds UVo/YVo to distinct pin/unpin vectors.

Ported now: four exact SVG template literals (rename/pin/unpin/delete), referenced by the native menu with per-file SHA256 and binding evidence in chat-menu-icons.json. Delete text and icon now use the native danger token. This is exact vector data but not yet exact color-token/rasterization parity.

Remaining: native menu still has five provisional actions and a single variant. Source-specific groups, separators, conditional entries, project submenu, copy/share/read-state/window/preferences actions and accelerator display need full porting. Do not infer that the current local menu is complete from these icon corrections.


## Project destination contract (jas)
Exact formatted function excerpt retained in project-destinations.recovered.js; its containing menu builder is conversation-menu.recovered.js. Hashes/locations in project-menu-source.json.

Parent menu: optional current-project label, Move to project submenu, then Remove from project when the current project is removable. The submenu excludes the current project and special project types. New project appears first when creation is permitted; a separator follows only if destination projects exist. Choosing New project creates then moves the originating conversation, without first navigating to it. Existing destinations carry project-specific enabled/tooltip rules. Loaded destinations remain present alongside a retry row when a request fails. Loading/unknown current project produces a disabled loading row. No other projects is disabled and appears only if there are no destinations and creation is unavailable. Memory restrictions can disable the whole move entry.

Required native work: retain separate menu focus/index and viewport-aware nested anchor; preserve explicit chat target through create/save/cancel; exclude current project; render removal at parent level; keep demo loading/error states available without pretending to call the account backend. The existing Project dialog is not an equivalent implementation and remains pending replacement in the contextual path.


## Native project submenu checkpoint
Contextual Move to project now opens a nested native panel. New project precedes loaded destinations, current project is excluded, current-project name is shown in the parent, and Remove from project is a parent action only for assigned chats. Right/Enter open; arrows/Home/End select; Left/Escape return to the parent. New-project creation retains the originating chat target and current chat route; save assigns the newly created project, cancel clears intent without creating/moving. Existing non-contextual Project dialog remains for direct actions. Tests cover real pointer destination selection, keyboard nesting, exclusion, creation/move and cancellation;63 workspace tests pass.

Still incomplete: source group ordering/separators, hover-triggered opening and delayed closing, submenu viewport-height fitting at low positions, loading/retry/permission demo states, active-descendant accessibility and precise menu styling. This checkpoint does not establish visual parity.


Viewport follow-up: native parent and nested project panels now fit a4px viewport gutter, flip horizontally when needed, shift vertically and cap scroll height. Project rows preserve32px height and keyboard selection scrolls into view. Geometry tests cover four viewport sizes and edge origins; rendered700px-wide bottom-edge test verifies bounds and End scrolling.65 workspace tests pass. This is a native fitting implementation; dimensions/gutter and placement have not been proven identical to the original runtime positioning engine. Hover timing/loading states and source separator/order parity remain outstanding.
