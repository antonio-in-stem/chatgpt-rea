# Native primitive coverage catalog

Evidence and acceptance targets for a functional Windows-native DEMO frontend with local fixture data. This catalog is not an implementation or parity claim. Every entry is native `not_implemented` and tests `not_run`; application work elsewhere is not assessed.

Actual dependency: **gpui-kit 0.7.3**, reexporting the inspected **gpui-component 0.7.3** as gpui_kit::component. Source modules and public declarations are present; matching behavior is unverified. JSON contains exact snippets and declaration paths/line numbers.

## Content-confirmed families

### theme

Observed: Semantic theme color variables and configurable font tokens.

- Proposed Rust: `theme::Theme`.
- Source: `webview/assets/app-shared-9a94b907ed47.css`; literal evidence `--color-token-text-primary`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: theme.
- Acceptance: Change semantic theme and verify all surfaces update.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### typography

Observed: OpenAI Sans font-face declarations regular medium semibold and system fallbacks.

- Proposed Rust: `text::TextStyle`.
- Source: `webview/assets/app-shared-9a94b907ed47.css`; literal evidence `OpenAISans-Regular-c56711d328c4.woff2`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: text.
- Acceptance: Render Unicode and font weights at three DPI levels.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### button

Observed: Busy pressed disabled and uniform icon button properties.

- Proposed Rust: `controls::Button`.
- Source: `webview/assets/button-52dfb42b12be.js`; literal evidence `aria-busy`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: button.
- Acceptance: Loading disabled and pressed states; pointer/key activation once.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### checkbox

Observed: Checked unchecked indeterminate states and form integration.

- Proposed Rust: `controls::Checkbox`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `indeterminate`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: checkbox.
- Acceptance: Represent unchecked checked mixed; disabled blocks change.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### switch

Observed: Switch role aria-checked accessible label and disabled click handling.

- Proposed Rust: `controls::Switch`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `role:`switch``.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: switch.
- Acceptance: Toggle checked state by keyboard and pointer.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### radio_group

Observed: Directional group item/group disabled required and label association.

- Proposed Rust: `controls::RadioGroup`.
- Source: `webview/assets/radio-group-434f5f94e777.js`; literal evidence `onValueChange`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: radio.
- Acceptance: Select single enabled option and retain labels.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### toggle_group

Observed: Single toggle activation and deactivation branches.

- Proposed Rust: `controls::ToggleGroup`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `__scopeToggleGroup`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: button.
- Acceptance: Activate/deactivate single option with one change event.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### segmented_control

Observed: Distinct control option and thumb styling parts.

- Proposed Rust: `controls::SegmentedControl`.
- Source: `webview/assets/SegmentedControl-23a4006850e2.js`; literal evidence `_SegmentedControlThumb_`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: button.
- Acceptance: Selected thumb aligns during resize.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### slider

Observed: Slider role range current value orientation and disabled properties.

- Proposed Rust: `controls::Slider`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `aria-valuemin`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: slider.
- Acceptance: Clamp current value to min/max and expose orientation.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### range_input

Observed: HTML range input with browser thumb styling.

- Proposed Rust: `controls::RangeInput`.
- Source: `webview/assets/range-slider-5c9566973ec1.js`; literal evidence `::-moz-range-thumb`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: slider.
- Acceptance: Keep thumb synchronized with endpoint values.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### number_input

Observed: Precision min/max step and local number-window calculations.

- Proposed Rust: `forms::NumberInput`.
- Source: `webview/assets/format-number-input-b026fe0339b2.js`; literal evidence `maxFractionDigits`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: input.
- Acceptance: Preserve partial decimal text and enforce precision on commit.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### text_input

Observed: Placeholder editable address input focus alignment and suggestion geometry tracking.

- Proposed Rust: `forms::TextInput`.
- Source: `webview/assets/input-474eb7f2698c.js`; literal evidence `placeholder`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: input.
- Acceptance: Support IME undo clipboard caret and demo suggestions.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### select

Observed: Pointer and arrow/space key interaction invalid loading disabled and size variants.

- Proposed Rust: `selection::Select`.
- Source: `webview/assets/select-c16e3005a3c5.js`; literal evidence `ArrowDown`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: select, combobox.
- Acceptance: Open using keyboard select clear disabled and loading options.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### popover

Observed: Controlled/uncontrolled nonmodal opening optional hover delay side alignment and focus policy.

- Proposed Rust: `overlay::Popover`.
- Source: `webview/assets/popover-27c4fbdc9c29.js`; literal evidence `hoverOpenDelay:r=150`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: popover, hover_card.
- Acceptance: Respect hover delay and restore focus after outside dismissal.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### tooltip

Observed: Tooltip provider delay and skip-delay settings with hoverability control.

- Proposed Rust: `overlay::Tooltip`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `TooltipProvider`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: tooltip.
- Acceptance: Show focused/hovered description with configured delay.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### dialog

Observed: Dialog size variant submit autofocus description and outside-dismiss policy.

- Proposed Rust: `overlay::Dialog`.
- Source: `webview/assets/dialog-shell-df796bfbc480.js`; literal evidence `shouldIgnoreClickOutside`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: dialog.
- Acceptance: Respect modal focus and outside dismissal policy.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### menu

Observed: Dropdown menu groups items checkable items and arrow exports.

- Proposed Rust: `menu::Menu`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `DropdownMenuCheckboxItem`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: menu, native_menu.
- Acceptance: Navigate checkable enabled entries and Escape closes.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### context_menu

Observed: Pointer anchor ContextMenu key Shift+F10 and restoration to trigger.

- Proposed Rust: `menu::ContextMenu`.
- Source: `webview/assets/context-menu-289f1a13127e.js`; literal evidence `ContextMenu`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: menu.
- Acceptance: Right-click and Shift+F10 open same demo action menu.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### command_palette

Observed: Grouped command results disabled-item filtering shortcuts and loading status.

- Proposed Rust: `command::CommandPalette`.
- Source: `webview/assets/command-menu-dialog-e1ab846c2043.js`; literal evidence `cmdk-item`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: command.
- Acceptance: Filter fixture actions then activate and show loading/empty state.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### tabs

Observed: Oriented tablist and disabled controlled/default tab triggers.

- Proposed Rust: `navigation::Tabs`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `TabsList`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: tab.
- Acceptance: Arrow navigation respects disabled tabs and inactive focus.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### breadcrumbs

Observed: Truncated action/link items and current-page semantics.

- Proposed Rust: `navigation::Breadcrumbs`.
- Source: `webview/assets/toolbar-breadcrumb-aeefda3b3d86.js`; literal evidence `aria-current`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: breadcrumb.
- Acceptance: Parent action changes local route while current page is marked.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### tree

Observed: Expanded paths selected path and scroll persistence plus treeitem semantics.

- Proposed Rust: `collection::TreeView`.
- Source: `webview/assets/base-file-tree-f18041e294eb.js`; literal evidence `expandedPaths`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: tree.
- Acceptance: Preserve expansion selection and scroll for fixture tree.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### reveal_selection

Observed: Active page reveal optional focus scroll padding and current-node observation.

- Proposed Rust: `collection::RevealSelection`.
- Source: `webview/assets/tree-scroll-36725f65cbb1.js`; literal evidence `scrollPaddingTop`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: tree, scroll.
- Acceptance: Reveal selected row without stealing focus.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### virtual_list

Observed: Entry geometry key-based scroll focus and status handling.

- Proposed Rust: `collection::VirtualList`.
- Source: `webview/assets/virtualized-turn-list-93f4162a687b.js`; literal evidence `scrollToKey`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: virtual_list.
- Acceptance: Scroll by stable key after variable-height changes.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### data_table

Observed: Scheduled product table search scope filtering and row action composition; generic table engine not established.

- Proposed Rust: `collection::DataTable`.
- Source: `webview/assets/table-b3a110ed96f1.js`; literal evidence `scheduled-table-search`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: table.
- Acceptance: Filter fixture rows and activate correct stable row identity.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### split_pane

Observed: Resizable column handle separator role min/max/current accessible label and animated width.

- Proposed Rust: `layout::SplitPane`.
- Source: `webview/assets/split-view-194f08a5d0cd.js`; literal evidence `Resize panels`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: resizable, dock.
- Acceptance: Pointer and keyboard resizing obey bounds at three DPI settings.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### color_palette

Observed: Selected/default swatch disabled option change callback and labeled group.

- Proposed Rust: `color::ColorPalette`.
- Source: `webview/assets/color-palette-d07808540f80.js`; literal evidence `onColorChange`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: color_picker.
- Acceptance: Choose labeled swatch and expose selected state.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### date_picker

Observed: Selected date bounds locale month/year labels and close-on-selection callback.

- Proposed Rust: `date::DatePicker`.
- Source: `webview/assets/DatePicker-2e79bee347a2.js`; literal evidence `selectedDate`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: time::date_picker, time::calendar.
- Acceptance: Select fixture date respecting leap day locale and bounds.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### toast

Observed: Toast subscribers IDs creation/update and list storage.

- Proposed Rust: `feedback::ToastManager`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `this.addToast`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: notification.
- Acceptance: Update toast ID without duplication and announce meaningful message.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### skeleton

Observed: Invisible text preserves geometry while decorative loading overlay is aria-hidden.

- Proposed Rust: `feedback::Skeleton`.
- Source: `webview/assets/loading-placeholder-8d41ffaba1ef.js`; literal evidence `aria-hidden`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: skeleton, shimmer.
- Acceptance: Toggle fixture loading without duplicate accessible text or layout shift.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### file_drag

Observed: Native file drag routed through Electron bridge with default prevention and drag marker.

- Proposed Rust: `desktop::FileDragSource`.
- Source: `webview/assets/file-drag-864118da8a34.js`; literal evidence `startFileDrag`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: No direct match established.
- Acceptance: Drag/cancel fixture file without network services.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### icons

Observed: Lazy icon mapping includes original SVG names and separate Lucide bundles.

- Proposed Rust: `icons::Icon`.
- Source: `webview/assets/SegmentedControl-23a4006850e2.js`; literal evidence `../Icon/svg/SquareCode.tsx`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: icon.
- Acceptance: Render fixture SVG with color bounds and decorative semantics.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### motion

Observed: Reduced-motion media query and Framer Motion integration.

- Proposed Rust: `motion::Transition`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `prefers-reduced-motion`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: No direct match established.
- Acceptance: Reduced motion removes nonessential effects without hiding state.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### rich_text

Observed: ProseMirror model and transaction dispatch events.

- Proposed Rust: `editor::RichTextEditor`.
- Source: `webview/assets/app-initial-b8e1c8014bb4.js`; literal evidence `prosemirrorDispatchTransaction`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: No direct match established.
- Acceptance: Edit fixture document with format undo redo paste and IME.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### code_editor

Observed: CodeMirror editor surface and language wrapping accessibility placeholder compartments.

- Proposed Rust: `editor::CodeEditor`.
- Source: `webview/assets/chatgpt-code-block-editor-ea44a9d2124a.js`; literal evidence `.cm-editor`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: input, highlighter.
- Acceptance: Edit fixture code with syntax wrapping undo and IME.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### math

Observed: KaTeX font-family rules and corresponding bundled font assets.

- Proposed Rust: `content::MathView`.
- Source: `webview/assets/app-shared-9a94b907ed47.css`; literal evidence `font-family:KaTeX_AMS`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: No direct match established.
- Acceptance: Render fixture math and accessible alternative.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### diagram

Observed: Mermaid runtime with diagram detectors.

- Proposed Rust: `content::DiagramView`.
- Source: `webview/assets/mermaid.core-cf33bb7e5cda.js`; literal evidence `mermaid version`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: No direct match established.
- Acceptance: Render fixture graph and show invalid-input error.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### a11y

Observed: Roles labels live-region handling and forced-color focus styles.

- Proposed Rust: `a11y::AccessibleNode`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `forced-colors`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: No direct match established.
- Acceptance: Expose Windows UIA role name state and action on demo screens.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### focus

Observed: Tabbable traversal focus scope and roving-focus group.

- Proposed Rust: `focus::FocusScope`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `RovingFocusGroup`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: No direct match established.
- Acceptance: Nested overlays restore intended focus and nonmodal content does not trap.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### overlay_foundation

Observed: Dismissable layer pointer-outside and focus-outside infrastructure.

- Proposed Rust: `overlay::OverlayHost`.
- Source: `webview/assets/app-shared-737655e1fb23.js`; literal evidence `DismissableLayer`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: popover, dialog.
- Acceptance: Nested layers dismiss correctly without click-through.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### input_foundation

Observed: Shortcut accelerators with editable-control dispatch policy.

- Proposed Rust: `input::Shortcut`.
- Source: `webview/assets/command-menu-dialog-e1ab846c2043.js`; literal evidence `allowWithinEditable`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: kbd, input.
- Acceptance: Shortcut dispatch respects editable controls.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### layout_foundation

Observed: Panel size constraints and separator value calculations.

- Proposed Rust: `layout::Constraints`.
- Source: `webview/assets/split-view-194f08a5d0cd.js`; literal evidence `aria-valuemax`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: resizable, scroll.
- Acceptance: Tiny/large window resize never yields negative constraints.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### form_foundation

Observed: Invalid/error description disabled and decimal field state.

- Proposed Rust: `forms::FieldState`.
- Source: `webview/assets/dialog-fields-70f615b1d3e5.js`; literal evidence `aria-invalid`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: form.
- Acceptance: Show linked validation error without discarding partial input.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

### i18n

Observed: Locale date formatting and message-catalog patterns.

- Proposed Rust: `i18n::MessageCatalog`.
- Source: `webview/assets/DatePicker-2e79bee347a2.js`; literal evidence `toLocaleString`.
- Shared dependencies: theme, focus, a11y, input, layout.
- gpui candidates: No direct match established.
- Acceptance: Change demo locale while preserving stored date value.
- Status: `content_confirmed`; native `not_implemented`; tests `not_run`.

## Unconfirmed candidates

These remain outside confirmed behavior coverage.

- **accordion** (name_only): `webview/assets/collapsible-user-message-content-d721b2c2952d.js`; candidate `accordion`; native `not_implemented`.
- **collapsible** (name_only): `webview/assets/collapsible-user-message-content-d721b2c2952d.js`; candidate `collapsible`; native `not_implemented`.
- **scroll_area** (inferred): original source not established; candidate `scroll`; native `not_implemented`.
- **pagination** (name_only): `webview/assets/plugin-listings-pagination-f51408b9ca41.js`; candidate `pagination`; native `not_implemented`.
- **avatar** (name_only): `webview/assets/avatar-345a4768b0bd.js`; candidate `avatar`; native `not_implemented`.
- **badge** (inferred): original source not established; candidate `badge`; native `not_implemented`.
- **progress** (name_only): `webview/assets/progress-d440a7a9d021.js`; candidate `progress`; native `not_implemented`.
- **spinner** (name_only): `webview/assets/authenticated-chatgpt-webview-spinner-d94616d0602a.js`; candidate `spinner`; native `not_implemented`.
- **file_upload** (name_only): `webview/assets/chatgpt-file-upload-2c230038b763.js`; candidate `attachment`; native `not_implemented`.
- **empty_state** (name_only): `webview/assets/space-empty-state-3ac08c16929c.js`; candidate `empty`; native `not_implemented`.

## Verification limits

Use actual UI state/actions over local demo fixtures, not services. WebView2 is for web content only. Validate mouse/keyboard, IME, loading/error/disabled states, DPI/resize, focus restoration, reduced motion and Windows UIA/Narrator. Screenshots, rendered galleries, declarations or compilation alone do not prove parity.
