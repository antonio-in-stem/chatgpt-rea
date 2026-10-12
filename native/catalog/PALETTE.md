# Native neutral palette: evidence and approximation

The application uses gpui-kit 0.7.3 and its gpui-component theme. Settings applies mode first using Theme::change, then edits Theme.colors and font size inside Theme::update. The inspected kit implementation reconciles changed legacy color fields with semantic tokens and refreshes windows. Direct global mutation is not used.

## Original shipped evidence

Source: extracted/webview/assets/app-shared-9a94b907ed47.css.

- gray-fixed-0 = #ffffff; gray-fixed-50 = #f9f9f9; gray-fixed-100 = #ededed.
- gray-fixed-150 = #dfdfdf; gray-fixed-300 = #afafaf; gray-fixed-500 = #5d5d5d.
- gray-fixed-600 = #414141; gray-fixed-700 = #303030; gray-fixed-800 = #212121; gray-fixed-900 = #181818.
- app-color-text-foreground resolves to #1a1c1f in light mode and gray-fixed-150 in dark mode.
- color-token-foreground aliases app-color-text-foreground.
- color-token-side-bar-background aliases app-color-background-surface-under.
- color-token-main-surface-primary aliases app-color-background-surface.
- Text-secondary includes a 65% foreground mixture; borders also use foreground mixtures. Native solid colors below approximate these composited roles.

## Chosen native mapping

| Role | Light | Dark |
|---|---|---|
| Main background | #ffffff | #212121 |
| Foreground | #1a1c1f | #dfdfdf |
| Sidebar | #f9f9f9 | #181818 |
| Muted/secondary background | #f9f9f9 | #303030 |
| Muted foreground | #5d5d5d | #afafaf |
| Border/input outline | #dfdfdf | #414141 |
| Primary control | #212121 | #ededed |
| Primary foreground | #ffffff | #181818 |
| Secondary hover/accent | #ededed | #414141 |

The constants come from observed neutral tokens. Their assignment to GPUI roles is an intentional approximation. In particular, the original shared CSS base dark surface uses gray-fixed-900 and its under-surface can be black; this native demo uses gray-fixed-800 for the main content and gray-fixed-900 for sidebar separation. Original runtime overrides, compositing, material effects and exact control states have not been reproduced or verified.

No logos, proprietary font files, brand images or other extracted assets are copied by this change. Existing system fonts remain in use. Success/danger/link semantic colors retain kit defaults so state distinctions are preserved. Native views should consume theme roles instead of retaining independent fixed palettes.

## Verification

Source field names were checked against gpui-component 0.7.3 ThemeColor. Theme::update token reconciliation was inspected in theme/mod.rs. Rust syntax is checked separately; no visual or contrast audit, runtime inspection, build or parity test is claimed here.
