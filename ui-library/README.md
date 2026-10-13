# Reusable UI extraction

This package begins the reusable library. It does not import the app host, account, network or demo backend. `createReaUI` takes React, a compatible `motion.span`, an optional class merger (the recovered concatenation behavior is the default) and an optional animation-frame scheduler. Component names are inferred; provenance records the recovered production module and its digest.

## Available components

- `ChoiceButton`: native button props; full-width pill classes; optional action runs after two animation frames, as in the recovered source. Disabled behavior remains native. The callback does not receive a click event.
- `ChoiceGroup`: one/two-column choice layout; an odd last choice spans two columns.
- `SegmentedControl`: controlled `selectedId`, `options: {id,label,ariaLabel?}[]`, `onSelect(id)`, group accessibility, pressed buttons, default/compact variants and shared-layout spring (0.28 seconds, zero bounce). It does not invent radio-group arrow-key behavior.

`examples/DecisionFlow.js` connects selection, review, back and confirmation. It is an authored composition demonstrating reuse, not a reconstructed original screen.

## Current limitations

Original utility classes are retained verbatim. Import `@rea/ui/styles.css` for the byte-identical original CSS baseline and its local font dependencies (65 files, about 2.8 MB). This baseline includes global resets and app-specific selectors; it is not yet a minimal isolated theme. Browser visual comparison and root/theme configuration remain pending. No generic replacement theme is supplied. Rust remains deferred.

## Next extraction order

1. Mount and compare components with the recovered class utility and CSS baseline; document theme/root requirements and narrow style dependencies.
2. Menus, popovers, dialogs, inputs, chips, tooltips and their keyboard/focus behavior.
3. Rail/sidebar, conversation layout and composer as reusable patterns with injected data/actions.
4. Connected flows and state scenarios, including loading, empty and error states.

Use the shipped frontend as the visual/behavior reference. Keep app services behind consumer-provided callbacks; add demo responses only where needed to exercise a flow.

Regenerate the styles with `node scripts/extract-styles.mjs <extracted-webview-assets>`. Existing differing output is rejected. `styles/manifest.json` records each source digest. Preserve original third-party notices; this package does not relicense the extracted assets.
