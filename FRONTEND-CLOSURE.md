# Frontend closure ledger — 2026-10-15

Scope: original shipped Windows renderer, demo data and reusable packaging with original dependencies retained. Rust and real generation, account services, email delivery and voice processing are excluded. UI flows for those services remain in scope where present in the shipped frontend. This ledger does not claim exhaustive route or state coverage yet.

## Evidence reconciliation

| Surface | Established evidence | Remaining acceptance |
| --- | --- | --- |
| Shell/conversation | Verify-ConversationFlow.cjs; sidebar-persistence-runtime.json; Verify-Profile.cjs | Rail reorder/unpin and conditional destinations; integrated menu/state coverage; matched visual audit |
| Queue | queue-v7-runtime.json: enqueue, steer, edit and interruption observed | Automatic advance, resume and reorder through UI; source guard/gate eligibility unresolved; do not bypass renderer |
| Attachments | attachment-native-picker-runtime.json; text-attachment-runtime.json | Folder/images-only selection, duplicates, stale/error states |
| Plugins | plugin-catalog-progress.json: original install/uninstall/reinstall/reload observed | Try now, toggles, remote catalog and error states |
| Skills | skills-contract-progress.json lifecycleImplementation: uninstall/search/install/refresh/reload observed | Remaining catalog/error variants; authoring result stays demo |
| Scheduled tasks | automations-contract-progress.json localRuntimeVerification: create/edit/pause/resume/delete/reload observed | Cloud lifecycle and advanced states; run-now UI result demo; no real scheduler required |
| Pages/Spaces | pages-lifecycle.json, pages-hierarchy.json, pages-comments.json, pages-activity.json, spaces-create-contract.json, spaces-lifecycle-contract.json | Additional artifact types, shared workspace variants and unverified state transitions; earlier v17 missing-create notes are superseded |
| Sharing | sharing-contract.json and library-file/folder-sharing-contract.json | Incoming collaborators, effective-access variants and failure states; real collaboration service excluded |
| Library | library-file-lifecycle-contract.json, library-nontext-preview-contract.json, library-csv-preview-contract.json | Spreadsheet editing/office formats and browse variants; old non-text-preview pending entry is superseded by later preview evidence |
| Sketch | sketch-runtime-contract.json: pen, rectangle, erasure, text, undo/redo, export/reopen observed | Other shapes, transforms, text editing/resize/formatting, thickness, cancel and editable restart persistence |
| Activity | mentions-inbox-contract.json | Deep block/comment targets, incoming events, loading/error states |
| Security | security-provider-contract.json | Original UI provider discovery/schema/read validation; demo mutation states |
| Settings | current-flow-coverage.json: 25 destinations opened | Opening is not interaction coverage; each destination needs its own scenario inventory |
| Profile/Account | Verify-Profile.cjs and account opening evidence | Photo upload, profile variants, account form confirmations and demo outcomes |
| Archived | Verify-ArchivedTasks.cjs | Cloud viewer/search, ChatGPT deletion, reconcile existing local archive/restore captures before retesting local lifecycle |
| Family | Verify-FamilyInvitations.cjs | Incoming/accepted members and settings layout supplied by server; exact server labels are not recovered from executable |
| Notifications | Verify-Notifications.cjs | Rollback/error UI, safety/contact variants; category inventory is server supplied |
| Code Review | Verify-CodeReview.cjs | Repository trigger variants, security/funding/GitLab UI; actual review service excluded |
| Reusable delivery | ui-library/CONVERSATION-INTEGRATION.md | Original-dependency package, documented consumer and reproducible launch; isolated authored gallery is not full original screen |
| Visual fidelity | windows-capture-contract.json plus original renderer preservation | Same viewport/DPI/theme/data/state comparisons of integrated surfaces; unchanged CSS alone does not prove parity |

All evidence names above are relative to original-stack/evidence unless they name a runner in original-stack or an explicit path. Historical observations are evidence, not a claim that all scenarios pass on the current package. No private screenshots/profile data are republished by this ledger.

## Inventory gate (active)

Input: pinned recovered router ZIs and existing evidence. Output: source-linked route destinations, deduplicated screen families and acceptance states. Current lexical inventory: 145 entries, 85 literal paths, 60 unresolved expressions. These are route entries, not unique screens. Resolve expressions and parent/child composition before any global completion percentage. Map destinations without matching evidence as unverified; route resolution alone is not UI verification. Non-route dialogs, menus, hover/focus, loading/empty/error and persistence states must also be inventoried.

Next bounded work: resolve the 60 router expressions from the existing readable bundle/imports, then map settings actions and remaining screen families. Do not re-extract the package, restart provider recursion, or repeat completed lifecycle work because an older report says pending.

## Budget

Latest human authorization: 45 additional percentage points, baseline 6% used, absolute maximum 51% used in the current shared account window. Inventory allocation at most 3 points (stop at 9%); implementation allocation up to 32 more (stop new changes at 41%); reserve remaining 10 points for integration, visual verification and delivery. These are ceilings, not a guaranteed completion estimate. Do not consume resets. Reassess feasibility after the inventory; stop an unproductive approach after two failed hypotheses.

## First bounded route pass

route-literal-bindings.json records 13 unique literal assignments with source hash/lines, including maps for a composed route. These identify candidate destinations for 12 direct expressions plus one composed prefix. Short reused symbols (e, s, Be, wr, ur, Sn) were excluded because global text matches do not establish lexical binding. Parent routes, imported symbols and initializer reachability remain unresolved; the original 60 unresolved-expression count is not reduced by this non-AST lookup. Newly identified candidate families include Images, GPT creation, Maps, Health, business profiles and browser handoff, which were missing from the settings-focused checklist. They require source/eligibility and UI coverage classification, not automatic gate enabling.
