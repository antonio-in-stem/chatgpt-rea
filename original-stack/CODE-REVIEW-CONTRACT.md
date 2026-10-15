# Code Review: recovered contracts and demo coverage

Source: `state/recovered-all/readable/assets/settings-9cb776a9f000.js` (`Rt`, `zt`, `Bt`, `Vt`, personal preferences) and `app-initial-b8e1c8014bb4.js` (`gBt`, `OGt`). Source assets remain unchanged.

The local host adapter serves a synthetic GitHub connection and two synthetic repositories. It supports repository search, detail, automatic review scope, trigger and exhaustive review preferences. Updates are bounded, validated and atomically persisted beside the explicit demo profile. Unknown repositories, unsupported fields and stale funding generations are rejected. No real GitHub service is called.

Personal preferences reuse `/wham/settings/user`: automatic review, trigger, exhaustive review and the conditional credits preference. Existing cloud-preference files receive defaults without losing branch or diff settings.

Contract verification: nine tests pass across the cloud and repository adapters, covering migration, persistence, failed writes, invalid values, search, detail and origin isolation.

Limitations: synthetic fixtures do not expose security-review configuration or real funding/installation flows. GitLab and the external AGENTS.md link are not implemented by this change. Passing contracts is not evidence that every original UI flow works. Original UI verification is recorded separately in CURRENT-STATUS.md.
