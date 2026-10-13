# Reusable UI extraction

This package begins the reusable library. It does not import the app host, account, network or demo backend. `createReaUI` takes React, a compatible `motion.span`, an optional class merger (the recovered concatenation behavior is the default) and an optional animation-frame scheduler. Component names are inferred; provenance records the recovered production module and its digest.

## Available components

- `Button`: shared app control with 62 color variants, 84 size variants and five explicit radius overrides. Preserves loading/disabled, native button events, focus variants, stable sizing labels and disabled-link behavior. Use `as="a"` for anchors; inject `renderLink(props)` for your router.
- `Spinner`: original circle paths and animation-start synchronization. Rays SVG output matches execution of the original paint/optical/accessibility pipeline for this asset; screenshot and animation timing comparison remain pending.

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

The connected example now uses this shared Button. Its primary pill resolves to the original CSS colors and 36px dialog-action height in the Windows style scenario. Nine tests pass, including differential execution against the shipped Jbi function for variant classes, loading, sizing labels and focus contracts. This is functional and structural evidence, not proof of pixel parity for every variant. Source-comparison tests require the local recovered source tree; `npm run build:example` does not.
