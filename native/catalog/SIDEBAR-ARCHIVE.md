# Sidebar archive affordance

Recovered app-initial Azo uses a transparent secondary 3xs uniform button and cp asset sre, with propagation stopped for pointer, click and Enter/Space. The trailing action appears on row hover, row focus-visible or descendant focus-visible. Non-hover devices expose it persistently. Its o0/Fzo wrapper is positioned at the trailing edge and supports a stable trailing-rail inset. Exact function retained in sidebar-archive.recovered.js. Icon binding and SHA256 are in sidebar-archive-icon.json.

Native checkpoint: Codex-mode conversation rows expose a 20px hover archive button with the original 16px archive-light-16 vector. Pointer down/click are isolated from the containing navigation row. Archiving resolves the originating conversation and saves without switching the active conversation. A real hover/click test verifies target isolation and saved state. Existing65 workspace tests also pass.

Remaining parity work: focus-visible reveal and keyboard reachability, touch/non-hover visibility, stable trailing-rail variants, row-title masking/spacing, busy status, source archive confirmation variants and context-specific permissions. The native hover position is provisional; this checkpoint does not prove complete row visual parity. ChatGPT-mode conversation affordances require their separate source contract.
