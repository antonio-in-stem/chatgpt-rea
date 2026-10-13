# Reusable UI extraction

This package begins the reusable library. It does not import the app host, account, network or demo backend. `createReaUI` takes React, a compatible `motion.span`, an optional class merger (the recovered concatenation behavior is the default) and an optional animation-frame scheduler. Component names are inferred; provenance records the recovered production module and its digest.

## Available components

- `Button`: shared app control with 62 color variants, 84 size variants and five explicit radius overrides. Preserves loading/disabled, native button events, focus variants, stable sizing labels and disabled-link behavior. Use `as="a"` for anchors; inject `renderLink(props)` for your router.
- `Spinner`: original circle paths and animation-start synchronization. Rays SVG output matches execution of the original paint/optical/accessibility pipeline for this asset; screenshot and animation timing comparison remain pending.

- `SidebarSection`, `SidebarSectionToggle`, `SidebarList`, `SidebarSections`: original section/list layout, collapsible heading, grouped/rail spacing and hover/focus actions. Collapsible sections require `AnimatePresence` and `MotionConfig` alongside `motion`. A `menuRef` requires an injected original-compatible `ContextMenu`; the menu implementation is still pending.
- `SidebarItem`: original folder/thread row composition with label, leading icon/disclosure, trailing status, actions, indentation and injected drag listeners. Its parent owns navigation and drag state.
- `MarqueeText`: measured overflow, original CSS masks and easing, stop-at-end/loop modes and group hover. Factory `motionPreference` accepts `on` (reduce), `off`, or `system`; `visualScale` defaults to 1 and represents application scale, not device pixel ratio. Native ResizeObserver replaces the app provider.
- `SidebarRowSurface`: original selectable row surface; active/highlighted/disabled, inverse tone, multiline/table variants and nested navigation-link behavior. Handles Enter/Space and preserves cancellation by consumer handlers. Full sidebar groups and rail assembly are still pending.
- `SidebarIndent`: original nesting wrappers, one per indent level.
- `SidebarStatus`: original priority of unread count, working spinner and unread dot. Counts above 99 display `99+`.
- `StatusPill`: approval/alternate tone and inline/container width, retaining original truncation classes.
- `SearchField`: controlled query with nine original variants, responsive search icons, optional clear button, input ref and trailing control. Clearing restores focus before emitting an empty query. Supply `formatMessage` to `createReaUI` for localization, or `clearLabel` per field.
- `MenuInput`: editable input for menus. Stops key propagation; Ctrl/Meta+A selects the input text and suppresses menu handling. Other keys reach the supplied handler. Autofocus defaults to true and can be overridden. It does not include a menu or navigation controller.
- `ChoiceButton`: native button props; full-width pill classes; optional action runs after two animation frames, as in the recovered source. Disabled behavior remains native. The callback does not receive a click event.
- `ChoiceGroup`: one/two-column choice layout; an odd last choice spans two columns.
- `SegmentedControl`: controlled `selectedId`, `options: {id,label,ariaLabel?}[]`, `onSelect(id)`, group accessibility, pressed buttons, default/compact variants and shared-layout spring (0.28 seconds, zero bounce). It does not invent radio-group arrow-key behavior.

`examples/DecisionFlow.js` connects selection, review, back and confirmation. It is an authored composition demonstrating reuse, not a reconstructed original screen.

## Current limitations

Original utility classes are retained verbatim. Import `@rea/ui/styles.css` for the byte-identical original CSS baseline and its local font dependencies (65 files, about 2.8 MB). This baseline includes global resets and app-specific selectors; it is not yet a minimal isolated theme. Root/theme requirements are documented below; matched original visual comparison remains pending. No generic replacement theme is supplied. Rust remains deferred.

## Next extraction order

1. Mount and compare components with the recovered class utility and CSS baseline; document theme/root requirements and narrow style dependencies.
2. Menus, popovers, dialogs, inputs, chips, tooltips and their keyboard/focus behavior.
3. Rail/sidebar, conversation layout and composer as reusable patterns with injected data/actions.
4. Connected flows and state scenarios, including loading, empty and error states.

Use the shipped frontend as the visual/behavior reference. Keep app services behind consumer-provided callbacks; add demo responses only where needed to exercise a flow.

Regenerate the styles with `node scripts/extract-styles.mjs <extracted-webview-assets>`. Existing differing output is rejected. `styles/manifest.json` records each source digest. Preserve original third-party notices; this package does not relicense the extracted assets.

## Run the connected example

From `ui-library`, run `npm ci --ignore-scripts`, `npm run build:example`, then `npm run dev`. Open the loopback URL printed by the server. The example loads no original app host and needs no account or synthetic backend. It is a new composition using recovered components, not a clone of an original screen.

React/ReactDOM 19.2.7 match the version string observed in the shipped renderer. Framer Motion 12.43.0 is pinned for this example; matching it to the bundled animation runtime and visual/timing comparison remain pending. Dependencies and the build output are excluded from Git; the lockfile is tracked.

## Theme environment

The original CSS switches themes through `data-theme="dark"` or `data-theme="light"` on the root. A `dark` class alone does not initialize the Lightning CSS theme variables. The Windows example also sets `data-codex-os="win32"` and `data-codex-window-type="electron"`, matching the reference environment. These attributes describe the style scenario, not an actual Electron host connection.

The standalone browser check recovered the segmented control colors after adding those attributes. The source `ChoiceButton` references `interactive-button`, `interactive-button-secondary` and `interactive-outline-secondary`, which have no definition located in the recovered CSS baseline. Its behavior is extracted, but its visual dependency closure remains incomplete. Do not treat this as a polished production button yet or add guessed styles to fill the gap.

## Shared button example

```js
const {Button, SegmentedControl} = createReaUI({React, motion});
React.createElement(Button, {
  color: 'primary', size: 'dialogAction', loading: saving,
  sizingLabels: ['Save', 'Saving'], onClick: save
}, saving ? 'Saving' : 'Save');
```

The connected example now uses this shared Button. Its primary pill resolves to the original CSS colors and 36px dialog-action height in the Windows style scenario. Nineteen tests pass, including differential execution against the shipped Jbi function for variant classes, loading, sizing labels and focus contracts. This is functional and structural evidence, not proof of pixel parity for every variant. Source-comparison tests require the local recovered source tree; `npm run build:example` does not.

`examples/SearchFlow.js` demonstrates filtering, empty results, clearing and choosing a result using the recovered SearchField and Button. It is an authored integration example, not an original project screen. SearchField does not implement filtering or fetch data itself.

`examples/SidebarFlow.js` exercises active selection, unread clearing and a working indicator, including Tab/Enter navigation. It is an authored composition of row surfaces; it does not claim to reproduce the full sidebar layout. In the Windows dark CSS scenario, row surfaces resolve to 29px height and 12.5px radius. These are observed example metrics, not yet matched against the original at the same viewport.

The sidebar example now closes/reopens Projects, moves the unread indicator into the collapsed heading, and restores keyboard access on expansion. Section exit uses original height/opacity targets and 300ms easing; its wrapper becomes inert and aria-hidden while collapsed. Reduced motion sets duration to zero.
