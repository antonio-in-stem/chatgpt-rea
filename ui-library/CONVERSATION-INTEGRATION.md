# Conversation screen integration gate

## Decision

Do not turn the current gallery composition into a claimed original full-window screen. Retain the running original demo as the functional reference. Before implementing a reusable full conversation screen, prove that its original shell/provider boundary can be supplied by the consumer without replacing original state behavior.

This gate is incomplete; it is not a claim that separation is impossible. No new shell or component was authored during this audit.

## Observed source

- `examples/ConversationFlow.js` explicitly identifies itself as an authored local flow. It uses local arrays and a textarea; it is not the production conversation controller or editor.
- `examples/main.js` mounts examples in `mx-auto max-w-xl p-6`. Expanding that container would not supply the original shell or editor.
- `src/ConversationLayout.js` is a semantic reconstruction of GIn/KIn, not the complete original conversation screen.
- `src/NavigationRail.js` is layout-only D2o extraction plus the original footer. It is not the full rail controller.
- Original readable bundle: `original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js` (local artifact, source SHA pinned by existing recovery manifests).

| Original symbol | Observed role | Integration evidence |
| --- | --- | --- |
| sDs | Composes cDs around lDs | Passes contextualNavigation; no named export found in final export block. |
| cDs / export hN | Outer shell orchestration | Reads route, UIn layout mode and multiple state selectors; constructs leftPanelSlot and uses eii/ZEs. |
| lDs / export gN | Content shell orchestration | Reads workspace/global state and composes header actions, content and panel slots through GIi. |
| eii | Navigation shell layout | 650 lines in readable function; store, panel widths, refs and state. No named export found. |
| GIi | Main/panel layout | 1118 lines in readable function; consumes Bir context and throws `NavigationShell is missing` when absent. No named export found. |
| ZEs | Sidebar composition | 59 lines in readable function; context/state dependent. |

Line counts describe inspected function bodies, not effort estimates or completion percentages. No transitive dependency closure has been established. Export aliases alone do not make a standalone API; initialization and provider requirements remain unproven.

## Bounded next experiment

1. Identify the original Bir provider and its immediate owner/inputs; reuse source already on disk.
2. Check whether exported hN/gN can be consumed through that original provider with explicit demo state. Do not inject fake selector values to conceal missing dependencies.
3. Success requires a rendered consumer containing the original shell, with functioning navigation/panels and the conversation editor boundary accounted for. Static imports or component counts do not satisfy it.
4. Stop this integration investigation at 67% account usage if there is still no viable mount/provider boundary. Report evidence and tradeoff; do not launch an unbounded chain of function extractions or substitute an authored shell.

The separate standalone library is still a required deliverable. Embedding the entire demo app or exposing a launcher is useful runtime reuse, but must not be described as a reusable React component library. Rust remains deferred.
