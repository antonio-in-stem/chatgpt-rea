# Native frontend fidelity — active work, not completion

The required end state remains an exact Windows frontend clone with demo backend behavior and reusable native Rust components. WebView2 is limited to web content. The previous generic functional demo does not meet that requirement.

## Evidence boundary

The installed ChatGPT.exe belongs to OpenAI.Codex_26.1007.2314.0 and hosts the combined ChatGPT/Work frontend. Native startup pseudocode and recovered shipped JavaScript/CSS are retained in the parent repository. No original TypeScript or source maps were recovered. Source-level layout and behavior can be traced; feature entitlement and final composited pixels require runtime evidence.

## Implemented source-derived changes

- Shared native SVG renderer exposes original vector assets and the recovered ChatGPT wordmark. Windows executable embeds the shipped dark app icon. The dark icon is currently static; system light/dark icon switching is still absent.
- Electron shell uses a 46px toolbar with custom Windows caption controls, 30px sidebar rows, 10px row corners and 340px initial sidebar. Sidebar drag clamps to 240..520px while reserving 240px for content; saved width is backward compatible with existing local storage.
- Plain ChatGPT mode omits the conversation title in the toolbar. Share and More group the existing conversation actions. Page-surface/Work/agent header variants remain incomplete.
- Home/chat use 768px content width, 32/38px normal-weight headline, 22px composer/bubble radii, shipped vectors and retained hover/focus message actions. Headline motion uses the source 200ms cubic-bezier(.42,0,.58,1), bypassed for reduced motion.
- Settings use source-derived section, row and control geometry. Projects use a table and a focused modal editor. Library uses named files with search, categories and grid/list views, instead of a component catalogue. See PROJECTS-LIBRARY-VISUAL.md and native-settings/VISUAL-SPEC.md for exact scope and remaining differences.

## Explicitly unfinished acceptance areas

- Original-window capture: PrintWindow returned blank surfaces; two HWND-scoped WGC attempts produced no frames despite successful session creation. See ignored qa/wgc-reference-result.json. No pixel comparison has passed.
- All source routes and feature-gated frontend states, account/workspace switching, app brand menu, full profile menu, project sorting/multiple expansion/sticky headers, complete library providers/folders/favorites/trash/selection and source filter popovers.
- Every message/content/attachment state, context menu, keyboard and accessibility variant; rich editors and tool screens still contain prototype compositions and are not visually matched. Some retained tool entities require source-correct navigation integration after removing the generic tool gallery.
- Theme alpha/backdrop cascade, transparent versus opaque Electron frame behavior, exact font configuration, all DPI/compact layouts, overlay positions and complete animation inventory.
- Per-screen Windows rendered comparison with source/reference evidence, interaction coverage at the corresponding scope, and the complete reusable component/public API mapping.

Passing behavioral tests, a successful executable launch or a single improved home screenshot cannot close these requirements. Keep the goal active until each original surface and state has been implemented and verified.
