# Recovered chat context menus

Static source: app-initial-b8e1c8014bb4.js. This is a partial map, not a claim of runtime-enabled item coverage.

- `_0` (360885) decorates entries recursively: accelerator lookup, short label map, explicit/fallback SVG, danger tone for delete-*.
- `ZVo` preserves Rename, Pin, read-state, Archive order when supplied.
- `aHo` (361039) builds cloud task groups: organization (pin/section), copy link, window, notifications, finish (archive). Empty groups disappear; separators join retained groups. This is not the ChatGPT conversation menu.
- `Kas` (400097) builds ChatGPT conversation groups: organization (rename/pin/section), continue, sharing, navigation, preferences, finish (archive/unarchive/delete), project. Share is omitted in header/hideShareAndPin/no-ID/unavailable loading branches; project policy can disable sharing. Delete opens a confirmation callback.
- `Jas` (400323) binds UVo/YVo to distinct pin/unpin vectors.

Ported now: four exact SVG template literals (rename/pin/unpin/delete), referenced by the native menu with per-file SHA256 and binding evidence in chat-menu-icons.json. Delete text and icon now use the native danger token. This is exact vector data but not yet exact color-token/rasterization parity.

Remaining: native menu still has five provisional actions and a single variant. Source-specific groups, separators, conditional entries, project submenu, copy/share/read-state/window/preferences actions and accelerator display need full porting. Do not infer that the current local menu is complete from these icon corrections.
