# Consume the current component package

This package contains the recovered/adapted component factories already present in `src`, original stylesheet assets, animations and provenance. It is a partial library, not the entire application or a standalone original conversation screen. Some components are semantic reconstructions; consult their source comments and provenance before claiming exact extraction. Packaging does not strengthen their fidelity evidence.

## Pack and install

From `ui-library` with Node/npm available:

```powershell
npm pack --ignore-scripts
```

In your own application:

```powershell
npm install C:/path/to/rea-ui-0.1.0.tgz
```

The package remains private; these commands create/install a local tarball and do not publish to npm. Do not copy the repository's profiles or account data into a consumer.

```js
import React from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { createReaUI } from '@rea/ui';
import '@rea/ui/styles.css';

const ui = createReaUI({ React, motion, AnimatePresence, MotionConfig });
export function SaveAction({ onSave, disabled }) {
  return React.createElement(ui.Button, { onClick: onSave, disabled }, 'Save');
}
```

Use a bundler that resolves CSS imports and relative font URLs. The original CSS is global and expects the original theme/platform attributes (for example `data-theme="dark"`, `data-codex-os="win32"` on the HTML element). It is not automatically isolated from your application's styles. Preserve the CSS and fonts when assessing fidelity.

Public exports are `@rea/ui`, `@rea/ui/styles.css`, `@rea/ui/animations`, and `@rea/ui/SvgLottie`. Factory-specific dependencies remain explicit arguments; providing an approximate menu/router/provider changes behavior. See `CONVERSATION-INTEGRATION.md` for the unresolved full-screen boundary.

## Reproduce the packaging check

```powershell
npm run verify:package
```

The verifier packs this directory, installs the tarball into a fresh temporary consumer using npm offline mode, imports the public JavaScript exports, server-renders an existing Button and follows local stylesheet/font references. Dependency tarballs must already be available in the npm cache for the offline install. It preserves the temporary consumer and prints its path for inspection; it never uploads artifacts. The verification does not open a browser, test interaction or establish full-window visual fidelity. Source-tracing tests remain separate and can require the ignored recovered artifacts.

Observed on Windows: 244 package files, 5 stylesheets and 66 local resource references resolved. The original demo app continues to use `original-stack/Start-Demo.ps1`; it is not launched by this package.

## Complete original dependency payload

For integration that retains the original internal bundles, see [original-stack/FRONTEND-PACKAGE.md](../original-stack/FRONTEND-PACKAGE.md). The separate private `@rea/original-frontend` payload preserves the entire original webview tree. It is not included in this component tarball and does not by itself provide an independent React screen.
