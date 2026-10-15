# Archived tasks: recovered contract and scope

Original source: `data-controls-8b478162a0ba.js` (`hn`, `un`) and `app-initial-b8e1c8014bb4.js` (`V4o`, `G4o`). The original screen merges local archived threads, archived cloud tasks and archived ChatGPT conversations. The failing cloud list is GET `/wham/tasks/list?task_filter=archived`, returning `{items,cursor}`. Restore posts `/wham/tasks/{task_id}/recover`; its success removes that item from the cached list and invalidates task queries.

The demo adapter supplies two explicit synthetic archived cloud task summaries. Restore and archive persist locally and do not claim unrelated task routes. Two contract tests verify persistence, idempotent restore, failed-write behavior and route/origin isolation. The renderer remains unchanged.

Scope limits: cloud task conversation/viewer, search, ChatGPT archived conversation deletion and the full local archive lifecycle are not established by this adapter. The View now action requires the separate cloud task viewer. The UI acceptance restores one remaining synthetic task and leaves that task restored; after both fixture tasks have been restored, it requires an explicit fixture reset rather than silently recreating archives. No personal chats are touched. Latest actual UI result is in CURRENT-STATUS.md.
