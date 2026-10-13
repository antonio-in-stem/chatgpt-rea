# Windows application menus

Source: extracted/.vite/build/main-BklS_2Y2.js
SHA256: 5cf1544463be9497b85b69051aa5ad32320f9ebdca063ec2ab41abb75b6cadf7
Retained bZe character range [3394256, 3396969) in windows-edit-menu.original.js.
Static extraction only; original code was not executed.

Windows Edit has Undo, Redo, separator, Cut, Copy, Paste, Delete, separator,
Select All. macOS additions are gated by isMacOS and intentionally absent.
Native Edit dispatches editing actions to the previously focused field.
Popup dimensions are provisional, not recovered Windows native-menu metrics.
Correction after inspecting CZe: the seven base editing roles are not the entire
Windows menu. CZe appends a separator and Settings after Menu.buildFromTemplate.
That eighth visible action is now ported and routes to the native Settings screen.

## Full host menu extraction

`windows-app-menu.original.js` retains CZe from the same parent file at character
range [3397032,3417853). `windows-app-menu.readable.js` is formatted for inspection.
Babel AST equivalence was checked, ignoring coordinates, raw syntax and comments.
No target code was executed.

`windows-menu-map.json` resolves all 35 N(commandId) references against the shipped
src-BJv5Mk7n.js registry (its SHA256 is stored in the map). It retains the source
expressions, registry definitions, feature/platform conditions and hidden flags.
This is a static syntax map, not proof of the installed runtime feature flags.

File visible ordering from Kt mutations: New Window (multiWindow gate), New Chat,
New Temporary Chat (enabled gate), New Project (enabled gate), separator,
Open Folder (access gate), separator, Close, separator, Log Out, Quit.
The projectless/new-task secondary shortcuts and close-window secondary shortcut
are hidden entries and must not be shown as duplicate menu rows.

View includes gated sidebar and panels, browser submenu, Find, previous/next chat,
back/forward, gated reload, zoom/actual size, gated Developer submenu and full screen.
Several secondary accelerators, find-next/previous and workspace-layout entries
are hidden. Respect the retained expressions before implementing the visible list.

Help includes Documentation, Keyboard Shortcuts, What's New, Troubleshooting,
System Status, Send Feedback, Task Manager, performance/update gated controls and
About. External destinations are preserved in source. Demo implementations remain
pending for the diagnostic and feedback flows.

File, View and Help rendering remains incomplete; this map is their implementation
contract, not a claim that those menus already work.
