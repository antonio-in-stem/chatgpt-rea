# Settings visual implementation contract

Source target: installed Windows Electron desktop settings route from the recovered application, not an assumed standalone ChatGPT web modal. This crate preserves the existing local preference model while replacing its generic stacked form layout with the recovered shared settings presentation. It does not claim full original settings coverage.

## Recovered evidence and native mapping

| Evidence relative to extraction/recovery root | Observed source | Native mapping |
| --- | --- | --- |
| `extracted/webview/assets/app-initial-b8e1c8014bb4.js`, functions `qMs`, `VMs` | Full-height settings page; centered `max-w-3xl`; heading-lg normal; default header padding-bottom32px; body section gap40px; Windows top-left rounding; optional footer | Centered 768px content; 24px normal title,32px title-to-form spacing (12px title padding +20px column gap); scrollable content. Parent owns outer window chrome. No modal is fabricated. |
| `extracted/webview/assets/app-shared-737655e1fb23.js`, `XBi`, `nVi` | Standard row `px-4 py-3 gap-6`; label `text-sm font-medium`; description `text-xs`; label-description gap0.5; control minimum160px | 16px horizontal/12px vertical inset;24px label-control gap;13px medium labels and12px muted descriptions;2px label gap;160px control width. |
| Same bundle, `dVi`, `sVi` | Default groups rounded-2xl with border; inner dividers inset16px | 16px group radius and inset horizontal separators. |
| `recovered-frontend/readable/assets/settings-page-6c4c55bd9144.js` | Settings navigation with keyboard arrow/Home/End behavior and source section slugs including appearance, notifications, voice, personalization, keyboard-shortcuts | Native radio navigation preserves arrow wrap/Home/End and tab focus. Caption is now Keyboard shortcuts. |
| `extracted/webview/assets/app-shared-9a94b907ed47.css` | Electron text-sm13px/text-xs12px, heading-lg24px; navigation rows30px, radius10px, padding8px; host panel base20px | Explicit logical-pixel text/row/radius/inset values;20px content padding. Semantic theme colors remain owned by application theme. |
| `recovered-frontend/readable/assets/general-settings-161845fad443.js` | Appearance includes Theme, UI font size, Reduce motion | Reduce motion moved from invented standalone Accessibility route into Appearance; persisted field/event behavior remains unchanged. |

## Native adaptations and exactness limits

- Seven supported local sections are retained: General, Appearance, Personalization, Notifications, Voice, Connections, Keyboard shortcuts. This is a supported subset, not the source's conditional account/integration/coding navigation tree.
- Sidebar width220px and fixed160px control width are explicit native fitting choices. Source control sizing is container-relative and the original sidebar width is not proven by this patch.
- Native toolkit select/switch/input geometry remains native; original React dropdown/menu and theme thumbnail internals are not reproduced here. Light/Dark persisted choices remain unchanged; System is not offered because it would add unsupported behavior.
- Source has separate conditional compact/slate/embedded layout variants. Implemented presentation matches the nonembedded default settings page, not all variants.
- Existing local Save changes/Reload saved/Reset draft actions remain because the model uses an explicit persisted draft. Their exact combination is not asserted as original source parity.
- General profile fields, provider fixtures and preview actions preserve existing demo state. They are not a claim of original account, OAuth, notification, or audio integration. Voice preview explicitly remains simulated.
- Settings palette application is unchanged in this presentation patch; parent shell owns final global token mapping and window composition.

## IPO and verification

Input: persisted Settings JSON and native pointer/keyboard edits. Process: existing draft collection, validation, persistence, theme update and SettingsChanged emission. Output: source-derived settings presentation plus saved local settings. No network or service mutation.

Run centrally (do not overlap builds): `cargo test -p native-settings --features ui-tests --lib`.

Existing UI tests cover radio keyboard navigation, theme/font apply and persistence, shortcut editing/duplicate rejection, corrupt file recovery. Updated keyboard section index6 reflects removal of Accessibility. Added `reduce_motion_is_in_appearance_and_retains_saved_preference` drives the actual switch and save button, navigates away/back, and verifies persisted value. `cargo fmt -p native-settings` completed; this patch has not independently compiled or run tests.