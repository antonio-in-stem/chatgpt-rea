# Windows application menus

Source: extracted/.vite/build/main-BklS_2Y2.js
SHA256: 5cf1544463be9497b85b69051aa5ad32320f9ebdca063ec2ab41abb75b6cadf7
Retained bZe character range [3394256, 3396969) in windows-edit-menu.original.js.
Static extraction only; original code was not executed.

Windows Edit has Undo, Redo, separator, Cut, Copy, Paste, Delete, separator,
Select All. macOS additions are gated by isMacOS and intentionally absent.
Native Edit dispatches editing actions to the previously focused field.
Popup dimensions are provisional, not recovered Windows native-menu metrics.
File, View and Help remain incomplete.
