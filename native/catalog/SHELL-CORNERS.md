# Windows shell corners

Source: recovered-frontend/readable/assets/app-initial-99e8b4b455fa.css, selectors `_PageSurface_yl8z4_2`, `_PageSurfaceLayout_yl8z4_2`, `_ApplicationMenuPageSurfaceLayout_yl8z4_2`, sidebar-navigation; shared CSS app-shared-9a94b907ed47.css tokens at lines 3681 and 47800.

Observed static contract: circular unscaled radius-xl-base=0.75rem (12px); Windows application-menu layout overrides bottom-right to radius-xs-base=0.125rem (2px). Right/bottom page insets use spacing=4px. Sidebar left corners round; interior sidebar/conversation join stays square. The CSS superellipse(1.5) support rule applies selected utility classes, not these shell selectors. Do not apply its 1.25 scale to the shell.

Native implementation: four corner cutouts painted after descendants, with one overlaid border. This is needed because GPUI rectangular overflow does not round descendant backgrounds. Circular quadrants use 32 segments, an approximation of the CSS arc, not a superellipse implementation. No new hitboxes, so the paint layer cannot intercept sidebar or conversation controls.

Verified: native executable capture qa/native-corners-20.png, 59 existing workspace tests passing. The capture confirms bottom-left cutout and asymmetric bottom-right. Full visual parity is not established: component superellipse shapes, typography, icons, shell shadow and runtime-dependent window radius remain separate gaps. No original runtime CSS override was measured in this checkpoint.
