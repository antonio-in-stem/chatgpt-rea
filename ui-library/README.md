# Reusable UI extraction

This package begins the reusable library. It does not import the app host, account, network or demo backend. `createReaUI` takes React, a compatible `motion.span`, an optional class merger (the recovered concatenation behavior is the default) and an optional animation-frame scheduler. Component names are inferred; provenance records the recovered production module and its digest.

## Available components

- `Button`: shared app control with 62 color variants, 84 size variants and five explicit radius overrides. Preserves loading/disabled, native button events, focus variants, stable sizing labels and disabled-link behavior. Use `as="a"` for anchors; inject `renderLink(props)` for your router.
- `Spinner`: original circle paths and animation-start synchronization. Rays SVG output matches execution of the original paint/optical/accessibility pipeline for this asset; screenshot and animation timing comparison remain pending.

- `NavigationItem`: source VF destination control, including hidden label, summary/description, thumbnail, unread description, active/accent/inverse tones, and independent trailing actions. Supports component/element icons. Specialized `Link` and `AnimatedIcon` adapters must be supplied when their variants are used. The factory now supplies the recovered responsive icon selector; asset and themed artwork variants require the dependencies documented below. The factory provides the recovered DisclosureIcon by default; an override remains available.
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

The connected example now uses this shared Button. Its primary pill resolves to the original CSS colors and 36px dialog-action height in the Windows style scenario. Sixty-seven tests pass, including differential execution against the shipped Jbi function for variant classes, loading, sizing labels and focus contracts. This is functional and structural evidence, not proof of pixel parity for every variant. Source-comparison tests require the local recovered source tree; `npm run build:example` does not.

`examples/SearchFlow.js` demonstrates filtering, empty results, clearing and choosing a result using the recovered SearchField and Button. It is an authored integration example, not an original project screen. SearchField does not implement filtering or fetch data itself.

`examples/SidebarFlow.js` exercises active selection, unread clearing and a working indicator, including Tab/Enter navigation. It is an authored composition of row surfaces; it does not claim to reproduce the full sidebar layout. In the Windows dark CSS scenario, row surfaces resolve to 29px height and 12.5px radius. These are observed example metrics, not yet matched against the original at the same viewport.

The sidebar example now closes/reopens Projects, moves the unread indicator into the collapsed heading, and restores keyboard access on expansion. Section exit uses original height/opacity targets and 300ms easing; its wrapper becomes inert and aria-hidden while collapsed. Reduced motion sets duration to zero.

## Sidebar ordering

`useSidebarOrder({keys,onOrderChange,getSelectedKeys,decodeDragId})` owns transient order and drop-target state. Supply unique keys and `onOrderChange({keys,nextKeys}) => Promise`; the consumer updates canonical keys. Returned `controller.moveItem(key, offset)` supports explicit movement. Drag methods accept the recovered event shape (`active.rect.current.translated`, `active.id`, `over.id`, `over.rect`) and require a consumer ID decoder. Multiple selected keys retain their displayed order.

The controller exposes the persistence promise so consumers can handle rejection. It clears only its own pending operation; canonical list changes invalidate stale provisional order. Pure helpers are exported for drop placement and batch movement. The example's Move up/Move down buttons are authored controls to exercise this behavior, not recovered menu UI. Pointer/keyboard drag sensors, overlays and announcements are still pending; this is not a claim of working drag-and-drop.

## Original animated artwork

`@rea/ui/animations` exposes 12 recovered Lottie animation objects (hello, loader, memory, finances, images, library, more, new chat, plugins, projects, search and tasks). `animations/manifest.json` records the exact source hashes and timing. The shipped Lottie **5.13.0** runtime and its React adapter are retained; only module dependency boundaries change. No replacement animation engine was installed.

In a browser, `createSvgLottie(React)` from `@rea/ui/SvgLottie` produces the recovered `SvgLottie` wrapper. Pass `animationData`, `autoplay`, `loop`, `onComplete`, and `onDOMLoaded` through to the original `useLottie` hook. Clone the exported animation object before handing it to Lottie, since playback may mutate animation data. This is the low-level renderer, not yet the complete navigation animation component.

The original navigation wrapper waits 300 ms after mouse entry, starts immediately on visible keyboard focus, resets on leave/blur/completion, and suppresses animation for reduced motion. The trigger wrapper is now extracted as `createAnimatedNavigationIcon`. The exact fallback glyph registry and inherited-color handling are included in the connected renderer. Asset and runtime differential checks pass. Search-icon browser playback is verified; matched original visual checks remain pending.

Reproduce this extraction with `node scripts/extract-animations.mjs ../original-stack/state/recovered-all/readable/assets`. It rejects changed existing outputs. Source-comparison tests need that local recovered source directory.

### Navigation animation activation

`createAnimatedNavigationIcon({React, AnimatedIcon, fallbackIcons, motionPreference})` returns the `par` navigation wrapper. Supply the original-compatible animation renderer, then pass the returned component as `AnimatedIcon` to `createReaUI`. The default fallback registry contains the seven recovered SVGs; `fallbackIcons` is an optional consumer override. The lower-level `SvgLottie` is not a drop-in renderer: the color observer, animation-name lookup and readiness/fallback handling belong to `createAnimatedArtwork`.

The wrapper accepts `{animation, Icon, staticIcon, className}`. It finds the enclosing button/menuitem, preserves the original idle/loading/ready visibility, and cancels timers and event listeners on cleanup. Tests execute both this extraction and the recovered `par` with identical states/events: mouse-only 300 ms delay, focus-visible gating, blur/leave, ready/completion, missing target and reduced motion. These are controlled structural/event comparisons. Browser activation, keyboard action and reduced-motion checks are recorded below; matched visual parity remains unverified.

`createNavigationFallbackIcons(React)` also exposes those seven SVG components independently. Their 20×20 geometry, currentColor paint, and original prop precedence are preserved. `navigation-icons-manifest.json` records their symbols and source hash. This registry is the one used by animation fallback rendering; it is not a complete catalog of rail icons. Regenerate using `node scripts/extract-navigation-icons.mjs ../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js`.

### Animation color helpers

`createAnimationColorReader()` preserves the original canvas-based CSS color conversion and normalized RGBA output. `recolorAnimation(data, color)` copies a recovered JSON animation before remapping its fill/stroke colors, including nested shape groups and asset layers. It uses structuredClone in place of the bundled cloneDeep for the recovered JSON-only data contract. `observeAnimationColor(element, onColor, reader)` performs the initial read, watches root/element class and style mutations, deduplicates values and returns cleanup. These helpers are connected by `createAnimatedArtwork`. Canvas-call tests use a controlled context, not a browser color-accuracy measurement.

### Connected animated navigation

`createAnimatedArtwork({React, motionPreference})` now connects the recovered data, color helpers and shipped Lottie runtime. Pass its result to `createAnimatedNavigationIcon`, then supply that wrapper as `AnimatedIcon` to `createReaUI`. The example search navigation control uses this chain and retains its focus-search action.

The renderer uses the original wrapper classes, autoplay/loop defaults, color observer, reduced-motion gate, completion and DOM-ready callbacks. The recovered lazy-component contract now supplies Suspense, prefetch and one 200ms load retry. Error reporting is a consumer callback; no app telemetry is imported. Non-navigation artwork requires an explicit fallback icon, since those additional default glyphs have not been extracted. The example bundles code in one file, so lazy activation does not imply separate network chunks. The shipped expression engine causes esbuild's direct-eval warning; its original code is retained.

Browser verification of the search control observed the static icon at 100 ms, animated SVG after the 300 ms gate, changing path geometry, return to the static icon on completion, and immediate cleanup on pointer leave. This does not establish full original screenshot parity or coverage of every animation. 

The repeatable Playwright check `scripts/check-animated-navigation.js` verifies Tab/focus-visible animation, Enter focusing the search field, static-only rendering under reduced motion, and resumed hover animation after restoring the media preference. Navigate to the running example and execute that file with `browser_run_code`. It restores the media override in cleanup. This is a browser interaction check, separate from `npm test` and screenshot fidelity verification.

`createDisclosureIcon(React, mergeClasses)` exposes the original 16px right-chevron used by navigation disclosure. Its geometry, authored alignment, currentColor, CSS module class, label/role rules and prop precedence are compared against the recovered icon pipeline. `createReaUI` supplies it automatically to NavigationItem. This completes that icon dependency, not the surrounding destination screen.

### Responsive icon selection

`createResponsiveIcons({React, AssetIcon, useDarkTheme, mergeClasses})` returns `ResponsiveIcon`, `ResponsiveIconPair` and `CompactIcon`. They preserve s5/wxi/Txi/Exi: leading pairs use original CSS classes to select compact/leading sources, inline picks 20px, secondary picks 16px, and legacy component classes retain their original defaults. The themed-artwork branch selects dark only when the supplied hook returns true and falls back to light when no dark artwork exists.

`createReaUI` exposes these components and supplies ResponsiveIcon to NavigationItem unless overridden. `createReaUI` now supplies the recovered AssetIcon renderer by default. The factory also supplies the recovered root theme observer. `useDarkTheme` remains an optional override. Differential tests compare branches, prop forwarding and theme selection against the recovered functions; actual breakpoint screenshots remain pending.

### Asset rendering

`createAssetIcon(React)` returns the recovered t5/rlr renderer. It accepts `asset`, `alignment`, `idPrefix`, `label` and SVG properties. Original helpers handle inline/sprite sources, optical alignment, overflow, layered paint and wide-gamut styles, local ID rewriting and accessibility. `createReaUI` exposes AssetIcon and uses it for responsive assets by default.

This consumes trusted recovered preset objects; it is not an SVG sanitizer. The preset constructor/validator Z is outside this extraction, and referenced sprite resources must be supplied. Original function bodies are retained with injected React and fresh compiler-cache arrays per render, preserving output while omitting the original memo optimization. Reproduce with `scripts/extract-asset-renderer.mjs` and the recovered shared module. Tests cover two shipped presets, wrapped inline/sprite variants, optical alignment, labels, isolated clip-path IDs and capability errors. Rendered screenshot comparison remains pending.

### Root theme observation

`createDarkThemeHook(React)` preserves hxi/gxi/_xi/vxi: it observes only `data-theme` on the document root, reports true for dark, false for other present values, and null for missing/SSR state. `createReaUI` exposes `useDarkTheme` and supplies it to responsive artwork automatically. This reads the theme; it does not recreate account preference storage or system-theme selection.

The authored example's toggle changes that attribute and demonstrates live subscription updates. Browser verification observed dark text rgb(223,223,223), light text rgb(26,28,31), and restoration to dark without reload. The example toggle is not the original settings screen; themed asset pixel comparison remains pending.

### Deferred component loading

`createLazyComponentFactory({React, reportLoadError?, schedule?})` produces the recovered `oxi` loader. Each component shares its in-flight request, clears a rejected request for retry, retries once after 200ms, supports `fallback`, `errorFallback`, `propagateLoadError` and `suspendToParent`, and exposes `prefetch()`. Prefetch is deduplicated and allows newly mounted instances to use the loaded component immediately. The original behavior is preserved even when prefetch fails: its promise stays cached while a later lazy mount can retry the cleared load.

AnimatedArtwork uses this loader. Differential tests compare success/retry/failure/propagation/prefetch branches with the shipped function. The keyboard and reduced-motion browser regression also passes after integration. Errors during component rendering are not converted into load failures by this loader, matching the source boundary.

### Switches, badges and viewer surfaces

- `Switch` / `SwitchTrack`: recovered uji/dji, controlled checked state, normal/small sizes and accent/neutral tones. Click handlers run before onChange; preventDefault and disabled state suppress the change. Original focus, RTL and transition classes are retained.
- `ShortcutBadge`: recovered dxi key labels with default, button, tooltip and tooltipInline variants. It displays a key combination; it does not register shortcuts.
- `Badge`: all 15 original iKi/sKi variants, including unread, outlinePill, identity, neutral, success, warning, danger and internal. The unread variant keeps its text-cap-trim child. Like the source, Badge does not forward arbitrary props.
- `ViewerCapsule`, `ViewerControlGroup`, `ViewerDivider`: recovered TRi/ERi/DRi toolbar containers with default/input capsules and default/joined/zoom groups. They use the original viewer CSS module, already present in the baseline. Viewer actions and content are separate components and remain pending.

The authored example uses Switch to change root theme, ShortcutBadge to describe native keyboard navigation, and Badge to show the connected confirmation result. Browser checks confirmed click/Space updates, 32×20px default switch track and the success badge after review/confirm. These checks do not claim a replica of the settings screen or complete viewer toolbar.

### Viewer action controls

`ViewerButton` preserves c9's default/primary/selected/dropdown/zoom/label/avatarGroup variants around the shared Button. `ViewerControl` preserves CRi's ghostActive/full-radius defaults. Shared button interaction and loading/disabled semantics remain available; caller prop precedence matches the recovered wrappers.

`examples/ViewerFlow.js` connects these controls to an authored 50–200% text preview with reset. The range, step and preview content are demonstration choices, not recovered viewer business logic. Browser checks confirmed increment, both disabled boundaries, Enter reset to 100%, a 36px capsule and 32px inner buttons in the current example. Original viewer content, compound actions and matched screenshot fidelity remain pending.


### Conversation surfaces

`ConversationLayout` preserves GIn's header/banner/body hierarchy, `containerRef`, caller attributes, floating-panel padding and reduced-motion classes. Pass `floatingPanelWidth` in pixels; the responsive rule requires the original named `app-shell-main-content` container. `ComposerBackdrop` preserves KIn's combined (omitted part), `fade` and `surface` branches, including ancestor-state selectors. It needs the original positioned layout context.

`UserMessageBubble` extracts Ft's non-editing visual subtree. Inputs are already-resolved `alignment`, `accentColor`, `compact`, `otherUser`, `temporary`, `hasText`, and rendered `children`. Its original lazy stylesheet is now included byte-for-byte. No account, telemetry or backend service is required. This is a surface, not the complete message controller: editing, copying, reactions, sender identity, attachments and markdown remain separate work.

`examples/ConversationFlow.js` connects the shell and bubbles to local message submission and variant toggles. Its form and composition are authored demonstrations, not the original composer or conversation screen. Browser checks observed normal radius 22px/padding 10px 16px and compact radius 16px/padding 8px 12px; temporary mode draws the original dashed SVG outline. Enter appends a message, clears the field and keeps focus. The current CSS cascade computes corner-shape superellipse(1.5) for normal/compact and superellipse(1) for temporary; exact original-context visual comparison remains pending. Differential tests cover 64 resolved bubble variants plus shell/backdrop structure and refs.


### Original composer layout family

`createComposerLayout({React, motion, useMotionValue, useDarkTheme})` returns `ComposerLayout` plus the original environment, presentation and layout contexts. Supply React 19 and the motion runtime; the example uses framer-motion and the recovered root-theme hook. The root exposes `ModeSurface`, `AnimateLayout`, `Attachments`, `Body`, `Footer`, `FooterAction`, `FooterActions`, `FooterControls`, `FooterDivider`, `FooterExpandingControls`, `FooterInlineControls`, `FooterLabel`, `Input`, `ReplyContext` and `Editor`.

The original function bodies are retained, including layout data attributes, dictation-related input layout, single-line/multiline variants, drag callbacks, background-click editor focus, footer pointer containment and radius clamping through ResizeObserver. CSS already exists in the recovered initial stylesheet. Reproduce with `scripts/extract-composer.mjs <recovered-initial> <recovered-shared>`; provenance and body hashes are in `composer-manifest.json`. ComposerLayout now retains the original memo cache through React.__COMPILER_RUNTIME (or an explicit compilerRuntime).

The demo now uses this family around a local textarea. `Editor` is the original layout wrapper, not ProseMirror itself; rich-text editing and original action controls are still pending. AdaptiveFooter, UtilityBarSlot and layout transition providers are covered below. The authored textarea handles Enter/Shift+Enter and composition-aware submission. Browser verification passed local submission, field clearing/focus and a 22px-radius multiline surface with no page errors. This does not establish whole-screen or animation parity with the original app.


### Adaptive composer and transitions

The composer family now also exposes `AdaptiveFooter`, `UtilityBarSlot`, `LayoutTransition` and `ComposerTransition`. Pass `MotionConfig`, `LayoutGroup`, `AnimatePresence` and `useIsPresent` from the motion runtime when using these. Optional `motionPreference` (on/off/system) and `visualScale` (default 1) replace the app-level preference/scale dependencies. The original transition is 300ms with easing [0.23, 1, 0.32, 1]; the media-query hook is retained from shared ASi/ISi, including subscription cleanup.

`AdaptiveFooter` accepts input, leading/trailing controls, layout, spacing and dictation slots. It preserves the 40rem responsive boundary, document/voice branches, dictation transcript visibility, DOM order and guarded focus restoration through `ComposerFocusTarget` (provide an object with focus()). `UtilityBarSlot` preserves visible/hidden/inert states, above/below placement and AnimatePresence behavior. These are recovered presentation behaviors; dictation input and recording services are not implemented.

The connected example now uses the original adaptive footer and layout transition provider. A single-line toggle exercises the responsive layout: at viewport 1100px the input sits between leading/trailing controls; at 500px it is first in the DOM and the controls move below it. Multiline uses stacked rows. Local Enter submission still succeeds with no page errors. These checks do not establish complete original screenshot parity.


### Composer primary action and icon morphing

`createComposerActions({React, motion, Spinner, ResponsiveIcon, AssetIcon, Tooltip?, morphingEnabled?, motionPreference?})` returns `ComposerPrimaryAction`, `ComposerSendIcon`, `ComposerStopIcon`, `ComposerVoiceIcon` and `ComposerMorphingIcon`. The action retains nRt's button/submit variants, busy/disabled states, keyboard label, icon source, blocked-reason behavior and tooltip contracts. In particular, blocked reasons can keep a disabled action focusable while its click handler prevents submission; native disabled and aria-disabled are distinct in the original implementation.

The shipped send/stop SVGs, voice preset, morph geometry, transition presets and compiler cache are preserved. `ComposerMorphingIcon` accepts state send/stop/voice, isLoading and className. The runtime feature flag is an explicit `morphingEnabled` option; motion preference uses the library adapter. Tooltip-bearing branches (including the morph-enabled action wrapper) require a compatible Tooltip implementation. They fail explicitly if none is supplied; no native-title substitute is introduced. The recovered tooltip factory below now supplies that implementation.

The example uses the original static send action for local submission. Browser verification observed its 28×28px button and 16px displayed icon (20×20 viewBox) in the current theme, successful click submission and restored input focus, without page errors. These measurements describe this example's token context, not a universal size or verified original-screen match. Unit checks compare disabled/blocked/tooltip branches and exact morph path/transition output, including reduced motion. Real animation timing and full screen parity remain pending.


### Original tooltip and positioning engine

`createTooltip({React, ReactDOM, ShortcutBadge, visualScale?, compilerRuntime?})` returns `Tooltip`, `TooltipProvider`, `TooltipOverlayContext` and `dismissTooltips`. Mount TooltipProvider above consumers, supply the recovered ShortcutBadge, and pass Tooltip to createComposerActions. ReactDOM must expose createPortal/flushSync. This module preserves the shipped React compiler cache through React.__COMPILER_RUNTIME by default, plus its internal stable-callback guard; use the existing React 19 runtime.

Recovered bodies include the tooltip controller, shared delay/dismissal provider, portal lifecycle, pointer handoff geometry and the complete local floating-positioning block with offset, flip, shift, size and arrow middleware. There is no newly substituted positioning dependency. Original variants include tooltip, rich, entityPreview, coachmark and floating-navigation-rail. Props preserve controlled/uncontrolled state, default 200ms opening delay, grouped 300ms skip-delay behavior, keyboard navigation, overflow/visibility conditions and interactive content handling. Source bodies and extraction hashes are recorded in tooltip-manifest.json; regenerate using scripts/extract-tooltip.mjs.

The example connects draft state to an authored empty-message reason and now supplies the recovered Tooltip to the primary action. Browser verification passed hover opening, Escape dismissal, Tab focus opening, matching aria-describedby/id, keyboard submission, closing after submission and focus restoration, with no page or console errors. The blocked action remains natively focusable and aria-disabled, matching its source contract. The observed tooltip was 30px high with a 20px radius in this demo context. Rich/coachmark/interactive configurations and zoom cases still need runtime coverage; full original-screen screenshot parity remains unverified.

The JSX adapters for Tooltip, ComposerLayout and ComposerActions now preserve static child arrays through variadic createElement arguments, avoiding development key warnings introduced by the earlier adapter.


### Context/add-files control

`createComposerContextAction({React, Button, Tooltip, ShortcutBadge, ResponsiveIcon, AssetIcon, formatMessage?, onAnalytics?, compilerRuntime?})` returns `ComposerContextAction`, `ComposerPlus16` and `ComposerPlus20`. The original eIt/tIt bodies retain active/compact/disabled/highlighted-tooltip variants, aria-expanded/data-state, native button behavior, responsive plus artwork and prevention of mouse focus theft. `onOpen` is the consumer action. With no onOpen the button is disabled. Translation and analytics are optional callbacks; no telemetry service is contacted. The original compiler cache is retained.

The example delegates onOpen to a local file picker. Multiple filenames appear in recovered attachment containers using Badge/Button; each can be removed. Sending a text message clears the draft attachments and preserves their names in the local message. These filename rows and the direct picker flow are authored demonstrations, not recovered attachment cards or the complete original context menu. Files are held in memory and no upload service is called. This demo requires message text for submission.

Browser verification exercised picker opening by click and Enter, two generated text fixtures, removal of one file, local submission of the other, attachment clearing and input focus restoration. The control rendered the original 16px/20px SVG viewBoxes and closed/aria-expanded=false state. No console errors were observed. Original context menu contents, attachment cards and whole-screen parity remain pending.


ComposerLayout and ComposerActions now require the React compiler runtime (defaults to React.__COMPILER_RUNTIME). Their original memo slots persist across renders, matching the recovered functions instead of allocating fresh slots. Contract tests verify reuse of unchanged footer/action elements and handlers, and invalidation when inputs change. Browser regression preserved the draft across single-line, bubble and theme toggles; tooltip keyboard navigation and submission still worked without page/console errors. Older non-composer factories with fresh memo arrays remain separately documented.


### Resource and attachment surfaces

`createResourceCards({React, AssetIcon: ui.AssetIcon, Link?})` exports ResourceCard, ResourceCardAction, ResourceCardIcon, ResourceCardThumbnail, ResourceCardRow, AttachmentRemoveButton, AttachmentCard, AttachmentPill, AttachmentPreviewCard and AttachmentPreviewCaption. Original compiler caches, classes, close artwork and event isolation are retained. ResourceCard accepts the original default, attachment, composer-attachment, thread-attachment, artifact-list, file-tile and link-preview variants. The href action requires an explicit Link adapter.

AttachmentCard accepts title/subtitle/icon, onClick, onRemove/onRemoveAriaLabel and composer/thread variant. AttachmentPill accepts pill/card layout and preserves Enter/Space removal. AttachmentPreviewCard accepts filename/icon/preview, onClick and onRemove/removeAriaLabel; preview generation is not included. The local conversation example now uses AttachmentCard instead of generic filename rows. File type icons, thumbnail generation and upload-status controllers remain separate extraction work. No full-screen visual equivalence is claimed.


`createResourceCards` also exports `ProgressRing` (shared aPi/iPi) and `AttachmentUploadProgress` (initial Axn). The ring retains the original 0..100 clamping, 120ms default transition, optional fill-on-mount animation/delay and reduced-motion behavior. The overlay accepts label/percentage, preserves progressbar attributes and uses the original 25% spinning arc when percentage is absent or zero. Pass motionPreference (on/off/system) through the existing preference adapter. Uploads and thumbnail generation are not implemented by these visual components. Verification: original body identity, SSR geometry/ARIA and transition branches; browser animation comparison remains pending.


### Thumbnail presentation

`createAttachmentThumbnail({React, AttachmentUploadProgress, useThumbnailQuery, useAccountId, formatMessage?})` exports the original AttachmentThumbnail view (Ixn) and thumbnailMountedAt helper. Query input is `{source, importKind}` and its result is `{data: {dataUrl, byteLength} | undefined, isError}`. File sources retain the original accountId guard. The view waits for image onLoad before revealing a preview, handles onError/query fallback, and restores loading on changed URLs. It preserves original fit classes, progress overlay and performance measurement.

The example uses an authored local Blob URL provider for images, revokes URLs on replacement/unmount and retains names on local submit. It is not the portable PDF/office thumbnail worker. Browser verified valid image ready, invalid image fallback, keyboard removal, successive selection, submission and both URLs revoked. ResourceCards now correctly requires AssetIcon (original shared t5), not CompactIcon; the previous preview-only adapter crash is fixed.


### File classification

`describeFile({fileName, mimeType, kind?, isNote?, sourceUrl?})` and `fileExtension(name)` preserve the complete shared B5..qwi block and its tables. Results include key, label, iconKey, category and isImageLike. MIME/provider precedence, hidden/extensionless files and Windows paths follow shipped behavior. The example uses the returned label as card subtitle and isImageLike for preview selection. The original file artwork renderer remains separate work; iconKey is not a rendered SVG. Three tests cover block identity, path cases and 760 differential combinations.


### File glyph presets

`createFileTypeGlyph({React, AssetIcon: ui.AssetIcon})` exposes the recovered ROi table's 16px branded and 16/20px monochrome branches, plus text glyphs. Props: iconKey, size (16 default), variant (branded default), className and SVG props. Original preset bodies, optical metadata and color classes are preserved. Unsupported keys return null; 20px branded file artwork explicitly requires the still-pending full renderer instead of silently substituting a different glyph. `fileIconAssets` and `textFileIconAssets` are also exported. Browser verified PDF/CSV/code viewBoxes and colors; 2 new tests verify every initializer and render every key/size through real AssetIcon.


### File/provider icon selection

`resolveFileIcon({fileName, fileExtension?, mimeType?, sourceMimeType?, sourceUrl?, libraryProvider?, mountedLibraryFileId?})` returns the original document/iconKey or brand/provider decision. `resolveFileProvider` and `describeFileArtwork` are also exported. The full original mounted-ID parsing block and URL/MIME rules are retained, including provider mismatch rejection and Figma/Office special cases. This is a resolver, not a replacement artwork renderer; provider brands still require their original artwork extraction. The example now routes local keys through this resolver. Tests compare 432 combinations against the recovered source and check invalid IDs/provider conflicts.


### Provider artwork

`createProviderArtwork({React, AssetIcon: ui.AssetIcon, useDarkTheme: ui.useDarkTheme})` exports ProviderArtwork, FigmaDocumentArtwork and providerArtworkAssets. Original keys box/dropbox/google_drive/ms-office-document/onedrive/sharepoint/sites provide 12/16/20/24/32px presets. figma-document uses original light/dark 24px SVG geometry scaled by the original wrapper. ProviderArtwork defaults to size24; callers must use supported original keys/sizes. All 35 asset initializers, theme components, lookup table and gradient detection preserve recovered bodies; the runtime retains compiler caches. Tests cover each preset's real AssetIcon rendering and repeated gradient ID isolation. Demo Figma/Office 16px attachment icons and Figma theme change verified in browser, no errors. The full generic legacy file artwork renderer remains separate.


### Unified original FileIcon

`createFileIcon({React, AssetIcon: ui.AssetIcon, useDarkTheme: ui.useDarkTheme})` exports FileIcon (original IOi) and legacyFileArtwork. FileIcon accepts fileName/fileExtension, mimeType/sourceMimeType, sourceUrl, libraryProvider/mountedLibraryFileId, libraryArtifactType, size, variant (branded/monochrome), className and SVG props. Its original branch order connects provider resolution, provider artwork, small glyphs, all five text sizes and the 20-entry legacy SVG family. Compiler caches and original classes, colors, geometry and prop precedence remain intact. The demo uses FileIcon directly instead of its prior partial resolver. Tests render 160 format/size/variant combinations plus provider, Google MIME and artifact cases. Browser verified PDF/Figma/Google document attachment removal and submit, no page errors. Full suite: 89 tests pass. Whole-app visual fidelity remains unverified.


### Navigation rail presentation and profile footer

`createNavigationRail({React, SidebarList: ui.SidebarList})` exports NavigationRail and ProfileFooter. NavigationRail is a semantic extraction of the D2o presentation subtree with original classes/DOM order: header, scrollable destination list, footer; codex selects the original surface/border variant. Supply header/children/footer, ariaLabel and railRef. It does not implement the original D2o state controller, destination visibility, drag sensors, menus or width-store reporting. ProfileFooter retains the complete original y2o body and compiler cache: compact arranges trailing controls above leading profile content; expanded arranges profile first, with the original optional divider. Supply actual identity content; neither component invents an avatar or settings fallback. Three structural/source tests pass; whole rail integration and visual comparison are pending.
