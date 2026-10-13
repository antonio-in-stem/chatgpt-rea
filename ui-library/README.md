# Reusable UI extraction

This package begins the reusable library. It does not import the app host, account, network or demo backend. `createReaUI` takes React, a compatible `motion.span`, the original-compatible class merger and an optional animation-frame scheduler. Component names are inferred; provenance records the recovered production module and its digest.

## Available components

- `ChoiceButton`: native button props; full-width pill classes; optional action runs after two animation frames, as in the recovered source. Disabled behavior remains native. The callback does not receive a click event.
- `ChoiceGroup`: one/two-column choice layout; an odd last choice spans two columns.
- `SegmentedControl`: controlled `selectedId`, `options: {id,label,ariaLabel?}[]`, `onSelect(id)`, group accessibility, pressed buttons, default/compact variants and shared-layout spring (0.28 seconds, zero bounce). It does not invent radio-group arrow-key behavior.

`examples/DecisionFlow.js` connects selection, review, back and confirmation. It is an authored composition demonstrating reuse, not a reconstructed original screen.

## Current limitations

Original utility classes are retained verbatim. The standalone theme/CSS extraction and browser visual comparison are pending. Do not claim this package already reproduces the original appearance outside its stylesheet environment. No generic replacement theme is supplied. Rust remains deferred.

## Next extraction order

1. Recover shared class-merging dependency and exact style/token dependency closure; mount and compare these components.
2. Menus, popovers, dialogs, inputs, chips, tooltips and their keyboard/focus behavior.
3. Rail/sidebar, conversation layout and composer as reusable patterns with injected data/actions.
4. Connected flows and state scenarios, including loading, empty and error states.

Use the shipped frontend as the visual/behavior reference. Keep app services behind consumer-provided callbacks; add demo responses only where needed to exercise a flow.
