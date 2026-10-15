# Parental controls: recovered invitation contract

Original modules: `settings-bf811805d1dd.js`, `queries-14beb19c1d1a.js`, `invitations-1c36863b7cb3.js`, `shared-ba28a2b5a3aa.js`, `member-settings-d0bcd40c2d00.js` (local recovered assets).

The demo adapter uses `/amphora` for current membership and family creation; `/amphora/{id}/members` for list/invitation; `/members/resend` and `/remove` for invitation management. Membership persists in the explicit demo profile. The initial state has no family. Creating as parent maps to owner; creating as teen maps to member_role. Pending invitations remain pending; they do not link accounts. Only synthetic example.invalid addresses are accepted. No mail, SMS or account service is invoked.

Current-member, list, pending-invitation detail, confirmation dialogs and navigation are original renderer components. The service returns source-shaped fixture data rather than replacing those components.

Important recovery boundary: member-settings renders pages/sections/items obtained from GET /amphora/settings_layout. Labels, descriptions, navigation and setting identifiers are server data. The executable supplies generic controls (toggles, multi-select, quiet/study schedules), but does not by itself establish the exact current server layout. This change deliberately does not claim to recover that layout. Accepted-member configuration, accepting incoming invitations and safety notifications remain pending. Empty notifications represent the initial demo state only.

Four contract tests cover create/invite/reload/resend/cancel, duplicate invitation, failed writes, role constraints, synthetic address validation and origin/profile isolation. UI verification is recorded in CURRENT-STATUS.md after running the copied application.
