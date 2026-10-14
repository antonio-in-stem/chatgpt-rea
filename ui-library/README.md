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

`createNavigationFallbackIcons(React)` also exposes those seven SVG components independently. Their 20Ãƒâ€”20 geometry, currentColor paint, and original prop precedence are preserved. `navigation-icons-manifest.json` records their symbols and source hash. This registry is the one used by animation fallback rendering; it is not a complete catalog of rail icons. Regenerate using `node scripts/extract-navigation-icons.mjs ../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js`.

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

The authored example uses Switch to change root theme, ShortcutBadge to describe native keyboard navigation, and Badge to show the connected confirmation result. Browser checks confirmed click/Space updates, 32Ãƒâ€”20px default switch track and the success badge after review/confirm. These checks do not claim a replica of the settings screen or complete viewer toolbar.

### Viewer action controls

`ViewerButton` preserves c9's default/primary/selected/dropdown/zoom/label/avatarGroup variants around the shared Button. `ViewerControl` preserves CRi's ghostActive/full-radius defaults. Shared button interaction and loading/disabled semantics remain available; caller prop precedence matches the recovered wrappers.

`examples/ViewerFlow.js` connects these controls to an authored 50Ã¢â‚¬â€œ200% text preview with reset. The range, step and preview content are demonstration choices, not recovered viewer business logic. Browser checks confirmed increment, both disabled boundaries, Enter reset to 100%, a 36px capsule and 32px inner buttons in the current example. Original viewer content, compound actions and matched screenshot fidelity remain pending.


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

The example uses the original static send action for local submission. Browser verification observed its 28Ãƒâ€”28px button and 16px displayed icon (20Ãƒâ€”20 viewBox) in the current theme, successful click submission and restored input focus, without page errors. These measurements describe this example's token context, not a universal size or verified original-screen match. Unit checks compare disabled/blocked/tooltip branches and exact morph path/transition output, including reduced motion. Real animation timing and full screen parity remain pending.


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


### Original avatar family

`createAvatar({React, animate, motionPreference?, compilerRuntime?})` exports Avatar, AvatarFallback, AvatarImage, AvatarShape, avatarInitials, avatarColorKey and avatarShapes. Supply the compatible framer-motion animate function. All original image/fallback state, 14 size classes, initials and color hashing, five clip shapes, sampling/easing, hover animation and initialization bodies are retained. Existing original CSS contains image fade styles. Avatar accepts src/name/colorKey/alt, size, loadingFallback/fallback/fallbackIcon, fadeIn, onImageError, shape/animateShape/hovered/overlay and referrerPolicy. Tests cover identity, all sizes/shapes through SSR, cached-image completion and image error state. Browser shape animation and the actual profile/account menu integration remain pending; this is not the full iPo profile controller.


AvatarFlow is an authored local photo-edit demo, not the shipped account menu. It connects the recovered Avatar and compact ProfileFooter, allows replacing/removing an in-memory selected photo, and choosing original shapes. Browser verified circle-to-blossom reaches original path/transform, a32px SVG loads, broken image falls back to DU, remove clears the photo, zero page errors. This is runtime evidence, not matched visual animation parity. Original profile trigger aPo delegates to shared legacy Wa (Kmn), not the already extracted Button family; do not substitute these when recovering iPo/ZNo.

### Legacy button and transition family

`createLegacyButton({React, config})` exports `LegacyButton`, `LoadingIndicator`, and `TransitionGroup` from original shared ECe/VSe/yCe. The configuration adapter retains shipped pill/squircle/pressable defaults. Original keyed enter/exit, delayed mounting, interruption, reduced-motion branch and loading/inert semantics remain. See `legacy-button-manifest.json`. This is a different original family from the existing `Button`.

The style entrypoint now includes the exact startup layer order recovered from `webview/index.html`, before the byte-identical CSS imports. Omitting it lets the reset layer override component styles, including button corners. Consumers should load this entrypoint before other Tailwind layer declarations. Browser state checks are recorded; full visual comparison remains pending.

### Profile controller

`createProfileControl({React, LegacyButton, Avatar, AssetIcon, ProfileMenu, useImageSource, formatMessage?, DebugControl?, DeviceControl?, motionPreference?})` exposes `ProfileControl`, `ProfileTrigger`, `ProfileLabel`, `ProfileSubtext`, `LoadingShimmer`, and `providerDisplayName`.

`ProfileControl` accepts `snapshot`, `compact`, `defaultOpen`, and `hideUsage`. Its original iPo body and compiler caches are retained. The snapshot adapter replaces account/network stores:

```js
const snapshot = {
  auth: {authMethod: 'chatgpt', accountId: 'local', userId: 'user', nameAtLogin: 'Demo User'},
  accountQuery: {data: {structure: 'personal', name: 'Demo User'}},
  queries: {
    user: {data: {name: 'Demo User', picture: 'local-photo.png'}, isPending: false},
    usage: {data: {profile_subtext: 'Local workspace'}} // optional; omit when unavailable
  },
  profileVisibility: {isProfileVisible: false, isProfileVisibilityLoading: false},
  sidebarWidth: 308
};
```

Additional optional inputs are `sessionQuery` (data accountId/userId/email), `profileQuery` (data.profile_details with display_name/profile_picture_url/username and isPending), `queries.modelProvider`, `ambientUsageEnabled`, and `navigate`. Workspace accounts use their own name/photo; the source's personal-image priority and loading branches remain intact. `useImageSource(url)` returns `{src, isError}`; local consumers can resolve local URLs directly. `ProfileMenu` receives `triggerButton`, `defaultOpen`, `hideUsage`, `hasAmbientUsageSubtext`, and `sidebarFooter` identity/width metadata. It must preserve trigger props when attaching its interaction.

The original dropdown contents ZNo remain pending. Debug/process-memory and device controllers are explicit optional slots, not recovered here. Browser verification mounted the original controller/avatar/footer together: keyboard activation, 36px compact trigger with 10px radius, loading-to-photo update, and compact-to-expanded workspace identity. Its test-only menu adapter verifies trigger behavior, not original menu fidelity.

### Dropdown controller (dependency extraction in progress)

`createDropdownController` retains original p7, its state hook, size presets, hover safe-triangle geometry, ref cleanup and loading-content focus handling. Inputs include React, compiler runtime, visualScale, TooltipOverlayContext, an eventBridge with `subscribe`, and required menu primitives. It exposes Dropdown, useDropdownState, DropdownSuspense and dimension helpers.

This is currently a controller extraction, **not a standalone menu**. Root/Trigger/Content/Portal/Layer/ModalLayer must be supplied; missing primitives throw instead of silently falling back to approximate DOM. Original lower-level primitive extraction is pending. Its tests check source identity and the controller-to-primitive contract, not real menu keyboard behavior or visual parity.

### Original menu surfaces

`createMenuSurfaces({React, primitives, Tooltip, AssetIcon, ScrollArea, TooltipOverlayContext?, compilerRuntime?})` exports MenuTrigger, MenuContent, MenuItem, MenuItemIcon, MenuSeparator, MenuSectionLabel, MenuMessage, MenuTitle, MenuGroup, MenuSection and MenuRow. Original function bodies/cache remain, including destructive tones, disabled-but-focusable rows, display/label/detail variants, link suppression, subtext, shortcuts, wrapping/fade and tooltip settings.

This layer requires original-compatible Trigger/Content/Item/Group interaction primitives and the original scroll-area component. Those dependencies are still being extracted. It supplies the recovered presentation to the dropdown controller; it does not replace the underlying focus, positioning or dismissal engine. Tests verify the presentation and handler boundary only. Full menu runtime, checkboxes/radios/submenus and screenshot parity remain pending.

### Original menu engine

`createMenuEngine({React, ReactDOM})` now exports the recovered Root, Trigger, Portal, Content, Group, Label, Item, CheckboxItem, RadioGroup, RadioItem, ItemIndicator, Separator, Arrow, Sub, SubTrigger and SubContent. It preserves the entire 190,931-character source segment from zCe through wb and the shipped bundler runtime. No replacement Radix package is installed.

Real browser checks on these primitives verified ArrowDown opening, skipping a disabled item, Enter selection/closing/focus return, Escape, outside click, Home and End. These are engine checks, not visual parity checks. Integration with MenuSurfaces/DropdownController, the app overlay portal and scroll-area dependencies remain next. Modal/submenu/radio/checkbox cases still need browser validation.

### Integrated original menu (current entrypoint)

Use `createMenu({React, ReactDOM, tooltip, AssetIcon, eventBridge, visualScale?})`, passing the full result of `createTooltip` and an event bridge exposing `subscribe(name, callback) -> unsubscribe`. It composes the recovered engine, controller, surfaces, original overlay wrappers and original scroll area. It exports Dropdown, all recovered menu surfaces, and ScrollArea. Earlier extraction notes about missing base primitives/scroll infrastructure are superseded for this entrypoint.

The local SidebarFlow now uses this menu for reordering and mark-as-read actions. Those choices are authored demo actions; the visual/interaction components are recovered. Browser verified 220px menu/20px radius, disabled-item skipping, reorder/close/focus return, and a 30-item scroll-fade panel capped at200px. Overflow indicators switch correctly at the bottom. The original menu body was not restyled. Profile-specific menu contents, checkbox/radio/submenu presentation and full-window screenshot comparison remain pending.

### Menu selection variants

`createMenu` now also exports MenuCheckboxItem, MenuRadioGroup and MenuRadioItem from original Dji/Aji. Checkbox `indicator` supports the original checkmark/switch paths, remains open by default, and accepts `closeOnSelect`. Radio variants include default, descriptive, icon, swatch and chatgpt. The chatgpt indicator uses the original16px preset through the recovered `$` preset factory (`AssetIcon.fromPreset`); other rows retain the17px original mark.

Browser verified checkbox toggle without dismissal and exclusive radio selection surviving close/reopen with the selected SVG. The sidebar demo checkbox controls status visibility. Submenus/search and profile-specific menu contents are still pending.

### Submenus

`createMenu` also exports original MenuSubmenuItem (inline expansion, props trigger/children/isDefaultOpen/onOpenChange) and MenuFlyoutSubmenuItem (lateral panel with label/children and original controlled-state/placement/tooltip options). Pass `motion` and `AnimatePresence` for inline transitions; missing animation dependencies fail explicitly when that path is rendered. The flyout uses the original shared portal context, media-query hook,200ms hover timer, arrows and focus engine.

Browser verified ArrowRight enters the nested item, ArrowLeft returns focus to its parent, nested selection executes, and inline expansion/selection executes. Sidebar ordering actions now use the original flyout component. RTL, hover cancellation, parent-bottom alignment and zoom cases remain unverified. The recovered compact-mode query is literally `not all`; it has been preserved.

### Menu search/input

`createMenu` exposes original MenuInput (Pji), MenuSearchInput (Fji) and focusMenuItem (Iji). Search keeps sticky/inset variants, caller trailing content and original compact/leading SVG artwork. It controls no dataset itself: the demo supplies local project filtering and selection. Ctrl+A remains inside the input, ArrowDown enters the first enabled result, and ArrowUp from the first result returns to the input via the original MenuContent handler.

Browser verified filtering/selecting Component library, Ctrl+A, both focus transitions, no-results status and Escape. Original profile-specific menu contents and full-screen fidelity remain pending.

### Profile menu controller

`createProfileMenu({React, Dropdown, Button, Tooltip, MenuMessage, ProfileMenuItems, prefetchItems, formatMessage?, onOpen?})` returns ProfileMenu, ProfileMenuProvider and isCurrentAccountUsage. Wrap ProfileMenu in ProfileMenuProvider with an explicit snapshot: `{enabled, auth:{accountId,userId}, accountQuery:{data,isLoading,isError}, usage:{usage}}`. `enabled` must be true. The original QNo controller and Lli identity guard remain unchanged, as do the original loading markup and20px settings artwork. The required prefetch adapter runs after existing trigger focus/hover handlers; `onOpen(details,snapshot)` replaces application telemetry locally.

ProfileMenu accepts the original triggerButton, sidebarFooter, hideUsage, hasAmbientUsageSubtext and defaultOpen props. The caller-supplied ProfileMenuItems receives sidebarFooter, ambientUsage, hideUsage, open and onClose. The original account-specific Yi items, ZNo account-data prefetch wrapper and lazy import/error boundary are still pending. This module does not claim to recover those contents. Use createProfileControl for the original avatar trigger and pass this ProfileMenu as its menu dependency; both providers should receive consistent account snapshots.

Browser verified the compact rail menu at228px wide on the right, expanded308px sidebar menu at292px wide above the trigger, and20px radius. ArrowDown opens, Enter selects/closes, focus returns and Escape closes. The demo's Profile menu section uses authored photo-edit/layout actions through these recovered components. Uploading and removing a local SVG updates the real avatar trigger. Those action labels are not the original account-menu contents. Full-window screenshot parity remains unverified.

### Profile menu composition

`createProfileMenuLayout({React,menu,AssetIcon,ResponsiveIcon,HelpMenu,PetMenuItem,useProviderQuery,providerDisplayName,parseProviderInfo,formatMessage?})` exports the original Wi composition as ProfileMenuLayout and ci as ProfileAnalyticsItem. Original function bodies and ten artwork initializers are retained, including workspace/profile/analytics presets and settings/log-out assets. The original CSS icon class is preserved.

The layout accepts accountIcon, accountSwitcher, displayName, personalPlanLabel, identityItems, usageItems, additionalItems and original action callbacks (onOpenProfile, onCopyUserId, onOpenWorkspaceSettings, onOpenChatGptAnalytics, onOpenSettings, onTogglePet, onLogOut). It preserves section order, disabled workspace states, identity versus account-switcher branches, provider/region subtitles, Alt-click cancellation, shortcuts and conditional rows. HelpMenu and PetMenuItem are explicit component dependencies; provider query, display naming and safeParse-compatible validation are explicit data dependencies. No replacement provider schema is claimed. The Yi controller that selects these props based on account/feature state remains pending.

The example uses Wi with local identity/photo/settings/logout callbacks and explicitly omits pending Help/pet slots. Settings/logout report a local action; no real settings screen or authentication mutation is implied. Browser verified original menu surfaces/icons,228px width/20px radius, Alt-click retaining the menu, and normal action dismissal. Unit checks compare each recovered body/asset to its shipped source and cover workspace, account-switcher, provider/region and identity interaction branches.

### Pet/Mini profile item

`createProfilePetMenuItem({React,MenuItem,useStateSnapshot,formatMessage?})` exports ProfilePetMenuItem and MiniIcon. It retains Gi, vi and the pet-egg artwork initializer. `useStateSnapshot()` provides resolved `{petVisible,miniFeatureEnabled,miniOverrideEnabled,hasOrbitAgent}` values. These correspond to original at(F.petVisible), feature1532120159, Cr/CWs and Ln/PEs; feature/atom resolution is outside this component. The item accepts isOverlayOpen, onTogglePet and petShortcut, preserves Pet-versus-Mini precedence, hides the shortcut while open and invokes the supplied action.

The example connects local overlay state and a local variant selector. Browser verified Show Pet -> Hide Pet, switching to Hide Mini -> Show Mini, both original icons and Escape dismissal without console errors. This recovers the menu item only; no floating window or pet implementation is claimed. ProfileMenuLayout can now receive this original component as PetMenuItem instead of a placeholder. Help, account switching and the Yi feature/account controller remain pending.

### Help and What's New

`createProfileHelpMenu` exports ProfileHelpMenu (original Pi setup availability), HelpSubmenu (ki) and WhatsNewItems (wi). Inputs: React, menu, AssetIcon, ResponsiveIcon, motion, AnimatePresence, useStateSnapshot, isFeedEnabled, parseVersion, isNewVersion, onSelectPost, navigate, dispatchCommand, openDebug, and explicit DemoBuildItem/ExternalLinkIndicator/Skeleton/Row renderers. The original six function bodies and ten unique artwork initializers are preserved. allowDebugMenu is a resolved build capability, not an inferred authorization to operate internal services.

The snapshot provides auth, mobileSetupAvailable, mobileSetupQuery, features keyed by original feature IDs, capabilities, debugShortcut, intl, localeQuery, postsQuery, lastSeenVersion and reducedMotion. isFeedEnabled receives the original locale-loaded/locale input. Provider/query fetching, feed eligibility/version parsing and optional renderer dependencies remain caller-owned. ProfileHelpMenu accepts onOpenDocs/onOpenPrivacyCenter/onOpenWhatsNew/privacyCenterHref. External link dispatch/telemetry Fi has been replaced by those explicit callbacks; no links are fetched by extraction or tests.

Help retains the original opaque flyout, parent-bottom alignment, conditional setup actions, keyboard command and hidden privacy/debug/demo-build branches. Mobile setup changes to remote setup only after a completed setup result; pending, unavailable and non-ChatGPT states hide both. The news component keeps the simple link and three-entry feed, UTC dates, read markers,150ms/reduced-motion transitions, loading skeleton widths80/50/65 and selected-post callback.

Browser verified Help keyboard opening, original visible options, mobile route `/codex-mobile`, keyboard command `showKeyboardShortcuts`, dismissal and zero console errors. Unit tests cover source identity, gates, row order, destinations, feed cap/dates/post selection and loading transition contracts. The demo enables the simple changelog branch; feed skeleton/row, external-link indicator and internal demo-build dependencies deliberately fail if used before integration. Rich-feed visual parity and destination screens remain pending.

### Loading surfaces and integrated news feed

`createLoadingSurfaces({React,motionPreference?})` exports original ShimmerLines (rC), LoadingShimmer (iC), ContentRow (WFc), shimmerWidths, isFeedEnabled, parseVersion and isNewVersion. The complete shipped seedrandom closure remains intact; seeded line widths, clamping,120ms line offsets and reduced-motion attributes are preserved. ContentRow retains default/offset geometry. The changelog helpers retain original locale normalization/English eligibility and major/minor release-family parsing/comparison, including invalid and prerelease handling.

ProfileMenuFlow now supplies these original renderers/helpers to Help and uses three explicit local sample posts. This supersedes the earlier simple-link-only demo limitation. A demo checkbox switches the original feed between loading and loaded states. Browser verified three UTC date elements, one newer-version marker, selected-post callback, six shimmer elements across three disabled loading rows and restoration to three posts, with zero console errors. No feed network service or release-details modal is claimed. External-link indicator and internal demo-build dependencies remain pending; screenshot comparison with the installed app remains pending.

### Browser account/workspace surfaces

`createAccountSurfaces({React,menu,Avatar,AssetIcon,useImageSource,formatMessage?})` exports original WorkspaceFlyout (At), WorkspaceSubtitle (jt), WorkspaceAvatar (Mt), WorkspaceAvatarFallback and workspaceTypeMessage. The image-source hook returns a URL or null. Original plan enums/predicates/message descriptors, personal-versus-workspace fallback behavior, referrer policy, response/sm/picker icon sizes and flyout trigger markup remain intact. WorkspaceFlyout accepts workspaceIdentity `{label,subtitle,icon}`, disabled, open, onOpenChange and children.

Correction to earlier pending-selector notes: profile-dropdown-items Yi initializes its local Pn/accountSwitcher to null and never assigns an active component in this shipped build. Wi supports the slot but that does not prove an active profile account selector. The extracted At/jt/Mt surfaces instead come from browser-account-switcher-menu-item. The demo therefore shows a separate browser workspace example; it does not insert this option into the original profile.

The demo combines the original flyout/avatar/label components with recovered radio rows and local sample selection. That composition is authored; original bt session controller and Nt replacement/logout dialog remain pending. Browser verified280px panel width, keyboard opening, workspace selection, updated trigger label and selection retained on reopening, with no console errors after correcting the demo radio icon prop. Tests cover all retained source bodies, account-plan labels, disabled trigger contract and per-workspace avatar identity. No real sessions or credential storage are used.

### Dialog primitives and layout

`createMenuEngine({React,ReactDOM}).Dialog` now exposes the original dialog namespace already present in the retained engine segment: Root/Trigger/Portal/Overlay/Content/Title/Description/Close and the original scoped aliases. JDe initializes the original implementation; no replacement dialog package is installed. The namespace manages modal focus, outside-pointer handling, dismissal and return to trigger.

`createDialogSurfaces({React,Button})` exports original DialogBody, DialogHeader, DialogSection, DialogFooter and dialogBodySizeClass. Body preserves form attributes and confirmation/scroll/viewport variants; Header retains optional icon, title/subtitle sizing and tones; Footer identifies the original Button component, supplies default medium size and expands a sole button. Source debug layout classes/localStorage flag remain intact.

Browser primitive harness verified initial input focus, Tab to close, Tab wrap, Escape returning focus and outside-overlay dismissal without errors. The harness uses test-only outer positioning and is not a recovered modal appearance. Seven focused layout/engine tests pass. The styled XMi/tNi controller, account-replacement dialog and full-window visual parity remain pending. These surfaces alone are not a complete styled dialog.

### Complete styled dialog

`createDialog({React,primitives,tooltip,AssetIcon,visualScale?,formatMessage?,IntlContext?})` now exports original Dialog (XMi), DialogContent (tNi), DialogTrigger, DialogTitle, DialogDescription, DialogOverlay, DialogClose and dialogWidthClass. Supply `createMenuEngine(...).Dialog` and the full createTooltip result. All eleven controller/helper bodies, CSS-map initializer and four close-icon initializers remain unchanged. This supersedes the earlier XMi/tNi pending status.

The controller preserves size/surface/radius/position variants, explicit width and viewport/zoom calculations, portal containers, tooltip dismissal/overlay registration, close-button variants, outside-click cancellation, pointer isolation and ResizeObserver-driven height transitions/cleanup. Main demo DialogFlow now uses the recovered outer shell, with authored local text and expand/collapse state.

Browser verified narrow width380px, computed radius25px, initial206px height changing to269px after content expansion, close-button focus return and Escape dismissal without console errors. Four focused source/variant/sizing/event tests pass. These measurements describe this local rendered case; installed-app screenshot equality, every responsive/zoom/modal combination and account replacement integration remain pending.

### Account replacement dialog

`createAccountReplacementDialog({React,dialog,layout,Button,AssetIcon,logoutAndContinue,formatMessage?})` exports original AccountReplacementDialog (Nt), accountDisplayName, maskedPhone and accountIdentityKey. Use createDialog/createDialogSurfaces results. Original selection/checkmark, confirmation form, disabled pending controls, close guard, error alert, name priority and phone masking are retained. The component accepts accounts, currentSessionToken, onClose, onSessionsChanged, returnHref and screenHint.

`logoutAndContinue({currentSessionToken,session,returnHref,screenHint})` must return a promise. Failure refreshes the caller's session view, displays the original error and reenables controls. Success remains pending in original Nt because original Ft navigates away; the adapter owns success navigation or local unmount. The demo uses fake identifiers and a700ms local promise, fails once, then closes locally after retry. It does not access or modify actual accounts.

Browser verified selecting the second account, disabled confirm/cancel/selection while waiting, Escape ignored while pending, original failure text, reenabling, successful retry with the same selected account and idle Cancel dismissal, without console errors. Four targeted source/data/initial-contract tests pass. The broader browser account session controller and full-app screenshot parity remain pending.


### Keyboard shortcuts and reusable settings surfaces

`createSettingsSurfaces({React})` exposes original SettingsGroup (with Header/Content/Footer), SettingsValueRow and ShortcutBadge bodies. `createDialogSurfaces` additionally exposes DialogFormRow. These retain the shipped compact row geometry, label alignment and key capsule styles.

`createShortcutSearchInput({React,SearchField,formatMessage?})` exposes original shortcut search wrapper c. SearchField now retains the original PJa body including compiler memoization; existing recovered icon adapters remain dependencies. The wrapper preserves localized labels, clear button, capture-mode read-only input/remount key and caller-first key handling. Recording a shortcut is a caller responsibility.

`createKeyboardShortcuts({React,dialog,layout,SettingsGroup,SettingsValueRow,ShortcutBadge,ShortcutSearchInput,formatMessage?})` exposes KeyboardShortcutsDialog, KeyboardShortcutsContent, KeyboardShortcutSectionTitle and groupKeyboardShortcuts. The six original presentation/grouping functions and complete original fuzzy matcher are retained. Pass items `{id,title,description,sectionKey,shortcutLabels}`; null means loading and an empty array means no active shortcuts. Section ordering, exclusion of personalitySettings, search by ID/title/description and no-match state are unchanged. The small dialog wrapper accepts items/onOpenChange and replaces the original host capability/keymap discovery boundary, not the presentation. This is the Codex branch; the separate Work/ChatGPT shortcut settings editor remains pending.

Profile demo Help > Keyboard shortcuts now opens this screen with four explicitly local command descriptors. These labels do not imply registered global hotkeys. Browser verified autofocus, one result for project search, no-match state, clear restoring four rows/focus and Escape dismissal, with a600px dialog width and25px radius. Important observed ordering: the input's own Escape handler clears a nonempty query in isolation, but the original dialog engine captures Escape at document level first and dismisses this modal even with a query. Both source paths are preserved; no inferred clear-first modal behavior is claimed. No installed-app screenshot equality or complete frontend coverage is established.

Validation after this extraction:165 tests pass; example builds; browser console has no errors.


### Settings panels, descriptions and action rows

`createSettingsSurfaces` additionally exposes original SettingsLabel (nVi), SettingsActionRow (eVi) and SettingsPanel (dVi), including original divider and daybreak-decoration initializers. All bodies are kept unchanged. Panel supports default/metered/secondary/muted/form/outlined/flat/input/recommendation treatments, divider suppression and visible overflow. Label retains icon, explicit label/description IDs, sizing, weight and alignment. ActionRow retains native button/ref/event semantics, first/last corner treatment, default/nested/empty/recommendation presentation, independent trailing/actions regions and disabled suppression of auxiliary actions.

Profile demo Settings now opens a local preference composition using these surfaces and the recovered dialog. Theme switch changes the example root immediately; the keyboard action replaces preferences with the existing shortcut screen. This is explicitly an authored local composition, not the installed complete settings navigation/router or a claim that all settings features are recovered.

Eight focused tests pass (including retained source identity). Example build succeeds. Browser verified theme true-to-false updates the root to light, and opening keyboard shortcuts leaves exactly one dialog with four local command rows. No console errors. Screenshot parity with the installed app remains unverified.


### Settings control and radio rows

`createSettingsSurfaces` additionally exposes SettingsControlRow (XBi), SettingsRadioRow ($Bi), SettingsMutedValue (ZBi) and SettingsHint (QBi). The original selected-checkmark initializer K6n is retained and rendered through AssetIcon.fromPreset; the existing recovered icon renderer is the default.

SettingsControlRow accepts a control node or render function. A function receives generated aria-labelledby/aria-describedby pointing to the actual label/description. Split, stacked, nested, featured and recommendation layouts and control sizing are preserved. SettingsRadioRow retains native radio grouping, selection highlight, default/form/inline variants, full-row label hit target and radio/checkmark indicators. The original radio component has no disabled prop; do not infer one from the action row API.

The local preferences demo uses the original control row for its switch and checkmark radio rows for light/dark. Browser verified ArrowDown selects dark, deselects light, updates root theme and synchronizes the switch; its accessible description resolves to the displayed text. Eleven focused tests pass; example builds; zero browser console errors. This remains a local composition, not the complete installed settings page or verified screenshot parity.


### Settings disclosure and advanced shortcut group

`createSettingsDisclosure({React,settings,Button,AssetIcon,formatMessage?})` exposes SettingsRowDisclosure (original a) and AdvancedShortcutGroup (original Et). Supply createSettingsSurfaces results and recovered button/icon components. Disclosure accepts children, content, contentId and expanded; collapsed content is unmounted. The original divider classes and both 16px chevron presets are retained.

AdvancedShortcutGroup accepts shortcut, singleTapShortcut and searching. Its original state hides the secondary shortcut initially, expands through the Advanced button and binds aria-controls/aria-expanded to the disclosed content. During search, the secondary content is shown directly and the toggle disappears. No secondary shortcut means no toggle. Original dictation hint text is retained; this component does not implement dictation, recording or system hotkeys. The demo labels its supplied rows as local previews.

Three focused tests pass, including exact source bodies and search/collapse branches. Browser verified Enter expands, the controlled ID exists, Space collapses and removes content, with no console errors. Build succeeds. Full keyboard shortcut editing and installed-app screenshot comparison remain pending.


### External browser-link shortcut preference

`createLinkShortcutPreference({React,settings,menu,Button,AssetIcon,usePreferenceStore,saveShortcut,formatMessage})` exposes the original LinkShortcutPreference (jt) and message descriptors (At). Pass platform and shortcut props. Original four options, option order, selected radio, responsive trigger/row classes, pending disable, unchanged-selection guard and error alert remain intact. `saveShortcut(store,value)` must return a promise and the caller must update the shortcut prop after success. The preference atom/backend boundary is replaced explicitly; this does not register modifiers or open a browser. The supplied formatter must handle the retained ICU descriptors. The local example supplies explicit Windows/macOS labels and a700ms in-memory save with optional simulated failure.

Nested overlays must share a single recovered engine instance. `createMenu` now exposes `DialogPrimitives` from its existing engine; pass that to createDialog for dialogs containing menus from that instance. The local SettingsFlow now does so. Separate instances previously caused this menu to close immediately when opened inside a modal; no source engine code was changed.

Browser verified four menu choices, disabled trigger during save, original error text on rejection, unchanged previous choice after failure, reenabling, successful retry to Alt+Click, selected radio on reopening and Escape closing only the menu while the dialog stays open. No console errors; build succeeds. Original jt/At/icon bodies and no-op selection/save adapter are tested. Full settings router, actual browser integration and installed-app screenshot comparison remain pending.


### Numbered navigation preference and settings dropdown

`createSettingsDropdownButton({React,Button})` returns original hNs, retaining original QNi chevron, default outline/toolbar styles, leading visual, content alignment, overrides and forwarded attributes.

`createNumberShortcutPreference({React,settings,menu,DropdownButton,useStateSnapshot,saveTarget,hasNumberConflicts,formatMessage})` exposes original Lt and It message descriptors. Snapshot contains store, platform, target (sidebar/tabs) and keymapState (or null while unavailable). The original component overrides keymapState.primaryNumberShortcutTarget with the current target before calling the required conflict checker; that checker is not recovered here. saveTarget(store,value) returns a promise and must update snapshot target on success. Original pending disable, error state, modifier labels, descriptions, conflict notice and tabs/sidebar option ordering are retained. Unlike the link preference, this original row saves even when the current option is selected.

The local example uses an in-memory target,500ms save and an explicit demo conflict flag. Browser verified switching to tabs and back to chats, changed description, selected radio on reopening, disabled trigger while saving, and conflict notice shown/removed. Four source/contract tests pass; build succeeds; no browser console errors. Native keymap resolution/registration, the entire settings route and installed-app screenshot comparison remain pending.


### Settings content layout and navigation targets

`createSettingsContent({React,motion,useTransform,useLayoutEnvironment,TitleBarContext?})` exposes original SettingsContent (qMs), SettingsNavigationTarget (JMs), SettingsPageHeading (VMs), PageHeader (QJa), PageToolbar (eYa) and StickyControls (sYa). Original CSS map, header wrapper and merged ref cleanup are retained. Pass Framer Motion's useTransform; optional TitleBarContext provides titleBarLeftInset motion value. The host layout subscription is an explicit adapter; qMs does not use its return value, and the standalone demo supplies a no-op.

SettingsContent preserves embedded/fullWidth/density variants, page/compact heading treatments, toolbar/back slots, sticky control fades, scroll area, optional footer and scrollResetKey. SettingsNavigationTarget supplies navigationKey, slateLayout, targetId and targetText. Original effects reset scroll on section change, locate requested text/ID, wait for delayed content through mutation/resize observers, scroll into view, highlight for450ms with reduced-motion handling and clean up observers/animation/listeners. The original alternate shell-header branch is statically disabled by `k = O && !1`; no replacement branch is introduced.

The main demo includes a bounded settings content example with local rows and navigation buttons. Browser verified text navigation scrollTop956 in a325px viewport, one active highlight animation, section change resetting scrollTop0 and updating the title, and header observer writing its inset variable. Four source/layout tests pass and the example builds with zero browser console errors. The complete outer workspace shell, settings sidebar with search/visibility rules and route controller remain pending; this extraction does not claim whole-window screenshot parity.


### Unsaved settings confirmation

`createUnsavedSettingsDialog({React,dialog,layout,Button,formatMessage?})` returns original g from settings-unsaved-changes-dialog. Pass pendingNavigation (callback or null) and onClearPendingNavigation. It opens only for a pending callback, preserves compact modal layout without the corner close button, original title/description and secondary Keep editing versus danger Discard changes actions. Form submission prevents default, captures the callback, clears pending state first, then invokes the captured callback. Keep editing/Escape/dismissal only clear pending state.

The settings-content demo now has an explicit local draft/save state and uses this original dialog before its local section transition. Browser verified cancel retaining draft and section, discard restoring saved value and navigating, Escape retaining draft, and a saved draft navigating without confirmation. Three source/order/contract tests pass, build succeeds and browser console reports no errors. The dirty-state detection is authored demo logic; the complete installed router blocker and screenshot parity remain pending.
