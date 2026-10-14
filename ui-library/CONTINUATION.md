# Current extraction scope

Updated 2026-10-13. Continue extracting the original Electron frontend into reusable components and connected demo flows. Rust is explicitly deferred by the user. Do not treat the legacy goal wording as permission to start the Rust port.

The user authorized 15 additional percentage points of quota after the pause at 49% consumed. Current ceiling: 64% consumed (retain margin). Check account limits before sustained work. Do not reset quota.

Latest additions: Switch/SwitchTrack, ShortcutBadge, 15 Badge variants, viewer capsule/group/divider. Source parity is covered; exact screenshot parity is not established. Viewer control buttons c9/CRi are now extracted with an authored zoom flow; menus/dialogs and complete rail/composer remain unfinished. Keep original classes and actual interaction semantics. Avoid filling missing source with invented visual approximations.

ConversationLayout (GIn), ComposerBackdrop (KIn) and the non-editing UserMessageBubble visual branch (Ft) are now extracted. Original user-message CSS added to the baseline (66 files). Connected demo supports local messages and compact/temporary variants; full message controller, original composer and matched screenshots still pending. Latest observed usage: 50% consumed.

ComposerLayout root plus 15 subcomponents are generated from original function bodies, with reusable explicit contexts and React/motion dependencies. Composer Editor is only a layout wrapper; example uses a local textarea. Next: AdaptiveFooter/UtilityBarSlot/transition providers, original control artwork and text editor. Source functions around initial lines 66474-67780. Consumption still 50%.
