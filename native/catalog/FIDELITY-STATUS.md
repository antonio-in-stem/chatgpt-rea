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
- All source routes and feature-gated frontend states, account/workspace switching, full brand/profile menu capability variants, project localized timestamps/locale-perfect sorting/sticky headers, complete library providers/folders/favorites/trash/selection and full source filter popover variants (basic file-type multiselect is now ported).
- Every message/content/attachment state, context menu, keyboard and accessibility variant; rich editors and tool screens still contain prototype compositions and are not visually matched. Some retained tool entities require source-correct navigation integration after removing the generic tool gallery.
- Theme alpha/backdrop cascade, transparent versus opaque Electron frame behavior, exact font configuration, all DPI/compact layouts, overlay positions and complete animation inventory.
- Per-screen Windows rendered comparison with source/reference evidence, interaction coverage at the corresponding scope, and the complete reusable component/public API mapping.

Passing behavioral tests, a successful executable launch or a single improved home screenshot cannot close these requirements. Keep the goal active until each original surface and state has been implemented and verified.

## Latest partial coverage

Native brand/profile/help popups now preserve focus and support keyboard navigation; Help opens the retained keyboard settings section. Scheduled routes to the retained automation surface. Plus/model popups, native file picker and in-chat Library selection are implemented with local fixtures. Library includes file-type multiselect, removable tags and source-derived column breakpoints. Alpha theme tokens are partially bound; Mica composition remains absent. See COMPOSER-MENUS.md for model power and Library picker gaps. Verified checkpoint: 83 tests and a Windows build, with owned-window screenshots; exact visual parity remains unproven.

Library picker now includes source-derived list/grid layouts, shipped view-toggle glyphs, conditional selection footer and clear-without-close behavior. App suite34 passed and Windows build/captures verified; full picker parity remains open as detailed in COMPOSER-MENUS.md.

Personal conversation Share now opens the recovered non-social dialog composition instead of copying JSON. Local snapshot and explicit demo link flow implemented; loading/errors/update and other sharing variants remain open. See SHARE-DIALOG.md. App tests35 passed and Windows capture inspected.

Personal Share now has local async create/copy/update, busy dismissal lock, blocked/create/copy failures, retry and readonly URL recovery. App tests37 passed and Windows copy-failure capture inspected. Remaining share scope is updated in SHARE-DIALOG.md; whole-app parity remains incomplete.

Projects now retain independent manual expansion for multiple rows. Child-title search forces only matching rows open and filters their child list, preserving manual state when cleared. Name-only matches stay collapsed unless manually expanded. Sorting, sticky layout and project-detail route remain unfinished.

Project Name/Updated headers now toggle source default directions, reorder rows and retain expansion. Updated uses persisted local modification timestamps; legacy files preserve missing dates and use the source fallback. The source sort arrow is embedded. NLS collation is a Windows approximation to Intl.Collator and remains an explicit fidelity gap.

## Current priority: supplied Windows shell screenshot

See SHELL-REFERENCE.md. Native rail/contextual sidebar/frame are now separated; source SVGs and screenshot-calibrated shell geometry are implemented. Sidebar project groups collapse and retain navigation; full original rail/sidebar/canvas/composer behavior remains incomplete. Source default and screenshot measurements differ; do not mark this exact.

Conversation canvas now has functional user-message navigation markers and independent Alt+Up/Down. Geometry/hover/click/hidden-rail keyboard tested; preview/scrub/focus/animations and other source interactions remain pending in SHELL-REFERENCE.md.


## User-bubble surface contour correction

The original renderer measurement records radius 22 px and corner-shape superellipse(1.5) for the regular user bubble (original-stack/evidence contains the measured source contract). The native user bubble previously used GPUI rounded(22), whose Windows quad shader implements circular corner distance. It now paints a filled superellipse path as its first absolute child; pixels outside the contour remain transparent instead of being covered with a guessed parent color. The existing rail/sidebar cutout helper is unchanged.

The contour uses 64 line segments per quadrant and therefore remains a tessellated approximation, not verified Chromium raster equivalence. This change does not add arbitrary child clipping, backdrop blur, shadow contours or correct remaining typography/color differences. cargo check -p native-workspace --locked --offline passed (existing unused Action variants warning). No new executable or pixel comparison was produced in this change; the packaged executable still predates this source update. Visual acceptance remains pending.


### Executable verification of bubble contour

The native-workspace executable subsequently built successfully with locked offline dependencies into S:/rea-native-build (existing unused Action warning only). The prior and new binaries were opened using the same isolated LOCALAPPDATA profile and fixed transcript. Both captures are 1456x948; the user-bubble region [780,100,1280,175] differs by 264 RGB pixels. The new surface and text are visible without corner overpainting. Evidence: original-stack/evidence/native-bubble-{before,after}.png, native-bubble-fixture.json, native-bubble-build-observation.json and native-bubble-pixel-observation.json.

This is an applied-change comparison, not original-renderer parity: the reference viewport differs and visible layout, table styling, color and text differences remain. The compiled app was copied into native/target/debug and repackaged into native/dist/windows with its existing unchanged native-web-host companion. The package manifest records their hashes.


### Matched client viewport and dark bubble material

Capture scripts now optionally resize the verified demo window to a requested client area, check the result and report DPI. Original and native captures were made at 1090x760 client pixels / 96 DPI. Their non-client frame dimensions still differ. The native comparison fixture now correctly uses sidebar_width=340 (combined rail/sidebar), rather than 288 (original sidebar alone). The earlier before/after fixture remains preserved separately. Sidebar contents and locale are not matched, so this is not a whole-screen pixel comparison.

Measured original normal bubble: radius 22, superellipse(1.5), neutral #dfdfdf at 5% alpha, text Segoe UI 14 px / weight 430 / line-height 22.75 px. Native dark normal user bubbles now use that translucent material, weight and line-height; light material is unchanged/unverified. The compiled capture native-bubble-measured-style.png visibly retains the text and shows dominant fill RGB(34,34,34), replacing the prior opaque RGB(48,48,48). The original has a dominant RGB(34,34,34) in the sampled region but also a gradient of other gray values; this is not proof of equivalent compositing. Vertical placement and surrounding content styling remain different.

Locked offline cargo build passed, and native/dist/windows was repackaged. Evidence includes bubble-matched-viewport-observation.json, native-bubble-matched-fixture.json, original-bubble-matched-viewport.png, native-bubble-matched-viewport.png and native-bubble-measured-style.png.


## Scroll-state correction before vertical layout port

The equal-viewport original capture was at the bottom of a column-reverse scroller, not the start of history. The scroller is 660 px high with 737 px scrollHeight: scrollTop=0 at the bottom, -77 at the top. A real upward wheel event moved the same bubble from y=103 to y=180, preserving its 42.75 px height. Therefore the apparent 14 px offset against the native screenshot cannot be corrected as a fixed margin.

The newly measured ancestor children identify a 52 px date/time separator before the first user message, plus the original 32 px content top inset. At the top: scroller y=96, separator y=128 and bubble y=180. The original timestamp-separator module confirms normal py-4 (16+16) and leading-5 (20); compact variants use py-2, and nonfinite timestamps render nothing. Native chat_view currently has 24 px transcript padding and no timestamp separator, and places its composer outside the message scroller. These are structural differences still to port, not pixel offsets to guess.

Evidence: thread-scroll-top-observation.json and original-thread-scroll-top.png. Demo-Controls scroll-thread sends a bounded wheel event to the demo scroller; Measure-Renderer now captures user-message ancestor child geometry. Native layout was deliberately not adjusted from the invalid earlier comparison.


## Timestamp selection model port

The pending native-core timestamp model now has direct differential verification against recovered production JavaScript. Generate-TimestampOracle.cjs hash-pins timestamps-85bd12c0e1b2.js, extracts only its pure t/n selection functions and their original o/s constants, and runs them in a Node VM with explicit time inputs. Its deterministic 384 cases contain 1,511 groups, 227 missing-history groups and 148 positive separator results across user/assistant/system roles. Rust agrees with every expected result. Six focused unit tests additionally cover strict one-hour/ten-minute boundaries, adjacency breaks, missing timestamps, first-match group selection and legacy persistence. This finite corpus is evidence of selection equivalence on those inputs, not a universal proof.

ChatMessage now retains optional sent_at_ms; newly appended messages receive the current time, while old workspaces keep None without fabricated dates. This change does not render separators yet. Group construction from production turn data, localized date/time formatting, timezone behavior, the 52 px separator view and conversation scroll/composer structure remain pending. The original runtime remains the visual baseline.

Validation: native-core has 18 passing unit tests plus the 384-case differential integration test. The generated fixture covers finite integer milliseconds only; JavaScript nonfinite/fractional timestamps are outside the Rust model contract. No updated native executable or screenshot is claimed for this model-only change.
`cargo check -p native-workspace --locked --offline` also passed; the existing unused Theme/Fixture action warning remains.


## Original local-turn timestamp projection

Recovered local-conversation-thread-turn-entries-a91ee5eaba74.js lines 481-491 feeds the selector one group per eligible rendered local turn. Non-turn rows, Aeon turns, server-preserved messages and missing turns produce null groups. Nonempty params.input contributes a user item with turnStartedAtMs; presence of an agentMessage contributes an assistant item with finalAssistantStartedAtMs. Activity-only turns can therefore yield an empty group, distinct from an excluded/null group. Multiple agentMessage items do not create multiple timestamp items.

Native-core now exposes LocalTimestampEntry (Excluded or Turn) and LocalTimestampTurn to reproduce this projection before selection. Generate-TimestampOracle hash-pins the original local module and runs its exact B.map expression, followed by original timestamp selection, for another 384 deterministic cases. The original N predicate is supplied as normalized eligibility: classification of voice/history rows itself is not covered. Both differential tests pass (768 total cases) alongside 18 unit tests. The extracted expression is retained in original-stack/evidence/local-timestamp-projection.recovered.js.

The existing native conversation model remains a flat message list, so this new function is not yet wired to chat_view. Real turn identity and final-assistant timing must be retained before integration; grouping arbitrary adjacent messages would change the original behavior. Date formatting, separator rendering and scroll layout remain pending. No UI parity or newly packaged executable is claimed.


## Explicit native turn identity storage

Conversation now accepts optional persisted turns containing an ID, ordered message membership, turn start and final-assistant start. Older workspaces deserialize with no turns; no historical grouping or dates are fabricated. record_turn validates a candidate snapshot before replacing live state. Missing, repeated, overlapping, noncontiguous and out-of-order membership is rejected, as is an assistant timestamp without an assistant member. Empty/activity-only turns require a future representation and are not claimed supported by this storage API.

Branching remaps both turn IDs and message references, removes turns outside the retained history and clears the final-assistant time for a truncated turn. Complete retained turns preserve timing. These are native storage decisions needed for independent branches, not claims of recovering the original backend persistence format. Three integration tests verify roundtrip/legacy loading, atomic rejection and full/partial branches; 18 unit tests and both 384-case timestamp differential tests also pass. The full native-workspace cargo check passes with the pre-existing unused action warning.

The demo response lifecycle still needs to supply these explicit turn snapshots, and chat_view still lacks timestamp rendering. This turn changes the persistent model and branch integrity only; it does not establish visual parity or an updated packaged executable.


## Persisted turns connected to timestamp selection

Conversation::timestamp_separators now projects validated explicit turn membership into the recovered local selector and returns one optional separator at each message position. A selected separator attaches only to the first member of its turn. Unassociated legacy messages create excluded groups, breaking adjacency rather than fabricating a turn from adjacent roles. Invalid message/turn references return an error before indexing.

Two additional integration tests cover first-turn placement, a strict gap after a completed assistant, unknown history before/between explicit turns and malformed membership. The native-core suite passes with 18 unit tests, five turn-storage/selection integration tests and two differential tests covering 768 original-JavaScript cases. This connects persisted data to selection only: the response lifecycle must still populate explicit turns, and the view still needs localized formatting and separator rendering.


## Native demo response lifecycle records turns

Both streaming and reduced-motion response paths now use append_demo_response, which requires an explicit trailing user message and atomically appends the assistant plus its turn snapshot. A pre-existing partial branch turn is updated instead of duplicated. The final-assistant timestamp comes from creation of the demo answer (this demo has no separate reasoning-to-final transition). Legacy user time remains absent if unknown. This does not retroactively classify old conversations or support arbitrary multi-assistant/provider lifecycles.

Two additional core integration tests verify actual response creation, branch regeneration, preservation of the source conversation, invalid/empty response atomicity and legacy time absence. Native-core passes 18 unit tests, seven turn integration tests and both original-JavaScript differential tests (768 cases). cargo check -p native-workspace --locked --offline passes with the existing unused action warning. The app call paths are type-checked, not newly GUI-tested or packaged in this step. Localized separator presentation and matching conversation layout remain pending.
