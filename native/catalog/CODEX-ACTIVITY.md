# Codex turn activity port

Source chain: local-conversation-turn -> sites-end-resource hk/mk/vk/uk ->
collapsed-turn-disclosure b/y -> app-primary LW/E7e/D7e. Six newly formatted
modules live in activity-source; manifest.json records original SHA256 and
Babel AST equivalence (ignoring source positions/comments/raw formatting).
No original target code was executed. Existing recovered-frontend manifest is
not modified; this is a separate supplementary corpus.

Source mk permits collapsing rendered activity once a final answer starts and
the turn is not cancelled (with additional activity-mode/override gates).
The native demo models ordinary completed/working/stopped turns: completed
activity defaults collapsed, the user choice persists per message, working and
stopped turns remain expanded. Source disclosure uses inline ghost-tertiary
button, small radius, chat text size, 12 px chevron, 4 px spacing before the divider.
Native row dimensions/colors are partly provisional. Duration labels/statuses
come from LW; English narrow units trim zero units like _Gc. Live elapsed time
in the demo is accumulated chunk delay, not provider timing.

ChatMessage.activity is optional/defaulted for existing storage. Entries hold
commentary and command/output demo strings; nothing executes those strings.
The first fixture and new Codex responses provide demo activity. Reduced-motion
responses receive a completed activity directly. ChatGPT mode omits this view.
Remaining: actual per-command disclosure, correct command output chrome,
loading skeleton, aria-expanded, collapse animation/reduced-motion transition,
denied counts/details, persistent MCP content, subagents, intermediate grouping,
per-turn scroll anchoring and all other original activity entry types.

Validation: 58 workspace tests pass; 11 core tests pass. Dedicated window test
checks expansion, persistence, switching chats and stopped-turn visibility.
The first real Windows launch revealed main-thread stack overflow in expanded
rich layout. MSVC binary now reserves 8 MiB instead of its 1 MiB default (reserve,
not upfront commit). Real launch/capture then succeeded. This is runtime evidence
for this fixture, not proof against arbitrarily deep future content.

Final inspected capture: qa/native-activity-18-final.png, PID 76660. Initial
successful capture exposed centered disclosure text; final capture verifies left
alignment. Build/package SHA256:
1feb5f44f97394ae4ceec5d73d2191eaad7b5710bb9c32efed9d0d12852fc8f3.
The full requested frontend clone is still incomplete.


## Command disclosure checkpoint — 2026-10-13 UTC
Source sC (sites-end-resource:9380 onward) initializes commands collapsed and
supplies disclosure to its timeline row. Body resolves to user-message-attachments
vn/un/yn, exported as l: 8 px radius/border, command prefixed with $, raw output,
144 px maximum output viewport, separate copy actions, right-aligned Success or
Exit code footer. timeline-activity-body default adds top8/bottom4/gap8.
Both additional modules are retained with original digests and AST equivalence
in activity-source/manifest.json (now eight modules).

Native commands now expand independently (session-local message ID + entry index),
show literal output rather than fenced Markdown, bound output height to144px and
copy command/output independently. No command execution. Footer handles success
and nonzero exit. Current data model only has completed commands; running,
interrupted, unknown exit, cwd, ANSI output, gradient fades, hover-only copy and
animation are pending. Colors and font remain partly provisional. Existing note
about generic Markdown command chrome is superseded by this checkpoint.

58-test workspace suite passed; expanded focused test also passes copy byte-for-
byte for markup-like output, output-height limit and toggling. Build/package SHA:
538a26b796494f82adde6d7d5e4513bcff4174e8b1c84d478fdc69d7f98b340e.
Inspected real compact-state capture qa/native-command-19.png, PID46296.
Expanded body verified by native UI test, not a new real-window screenshot.
Full frontend parity remains incomplete.


## Command lifecycle checkpoint — 2026-10-13 UTC
Ported the state distinction observed in sC/OC and user-message-attachments yn:
Running / Completed / Stopped, with optional exit code. While running, footer
reserves its source padding with no success text. Stopped has Stopped; completed
zero has Success; nonzero/missing has Exit code N/unknown. Row labels follow the
state. This supersedes the prior completed-only data-model limitation.

New Codex demo activity starts with a running command; completion/stopping only
transitions entries still running, preserving already completed results. These
are local frontend transitions; commands are never executed. Old numeric exit
codes and absent status deserialize as completed, preserving existing saved data.

Validation: 59 workspace tests and 12 core tests pass, including legacy deserialize,
missing exit-code roundtrips and stop/finish transitions preserving prior failures.
Build/package SHA256 cd99280eb420937426bead8dde88584d657b94e4c2dc1ed8b2d9d76fc94afa7a.
Preview PID46296 stopped after verifying its executable path. No new real-window
capture this checkpoint. Remaining: visual state matrix, ANSI/cwd, hover-only
copy controls, fades, animation, accessibility expanded state and broader shell
fidelity. Full frontend clone remains incomplete.
