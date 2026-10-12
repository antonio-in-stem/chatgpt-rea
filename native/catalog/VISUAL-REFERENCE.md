# Visual reference from the installed ChatGPT route

This document is a static shipped-source specification. It is not a screenshot comparison, pixel-parity report or claim that the existing Rust demo matches the reference. No Rust implementation was changed for this investigation. Character offsets below are zero-based positions in UTF-8-decoded source; minified bundles make line numbers insufficient. All relative source paths begin at extracted/webview/assets.

## Target identity must remain explicit

The extracted artifact contains a real ChatGPT conversation route: chatgpt-conversation-page-3672edf8a24d.js exports ChatGptConversationPage and ChatGptSharedConversationPage from chatgpt-conversation-page-d6ceb517cb3b.js. Its home strings identify themselves as the Chat home page **in Codex Desktop**. The CSS explicitly branches on data-codex-window-type=electron, browser, chrome-extension and extension. Therefore the evidence supports the installed combined application's ChatGPT surface, not an independently verified classic chatgpt.com website or a separate legacy ChatGPT Windows shell.

Use mode=chat, the ChatGPT conversation route and its home hero/composer as the reference. Do not copy mode=work's headline or the code/task review sidebar. sidebar-2098b6d835ba.js contains code-review-sidebar-search; sidebar-4060f446ed48.js contains scheduled-sidebar-search. Those are not evidence for the ChatGPT chat-history sidebar. composer-799927120e76.js is a generic discussion/author-avatar composer, and composer-host-4dcabd6e5506.js is a Sketch composer; neither is sufficient proof of the chat composer layout.

## Home and conversation composition

- Chat home placeholder is **Ask ChatGPT**, not an invented Ask anything placeholder. app-primary contains chatgptConversations.composer.placeholder and describes the same accessible label on home and in conversations.
- The non-personalized headline rotates among Ready when you are., What's on your mind today?, What's on the agenda today?, and Where should we begin?. Personalized alternatives include a nickname link opening /settings/personalization?instructions=nickname. Temporary chat and custom GPT have separate compositions. Do not present all headings simultaneously.
- mode=work explicitly uses What should we work on?; this is not the default ChatGPT headline.
- Hero wrapper: mx-auto w-[min(100%,var(--thread-content-max-width))] min-w-0 px-panel. Its headline wrapper is relative w-full min-w-0 text-center select-none. Actual heading uses heading-xl font-normal whitespace-pre-wrap text-default; an invisible inert duplicate preserves layout. Browser adds min-height 10.5 spacing units.
- heading-xl resolves to 2rem size, 2.375rem line-height and tracking-tight. The hero's font-normal overrides the token's semibold weight. With a 16px root, the derived size/line-height is 32/38px. Root size and font metrics still require runtime confirmation.
- Hero transition explicitly animates opacity and y from -4 to 0 over 0.2s easeInOut. Exit y=-4 has zero-duration transition. A native implementation must match this state change rather than add unrelated panel animations.
- Thread body is centered with max width computed as content width plus twice the inline padding. Shared host body defines content max width 48rem (derived 768px at 16px root). Browser has a separate compact width 40rem (640px); do not apply that browser-only breakpoint rule blindly to Electron.
- Source composition also places suggestions absolute below their anchor: inset-x-[var(--composer-suggestion-inline-inset)] top-full mt-8 min-w-0. Their visibility and exact active fixture depend on account/feature state; no fixed screenshot position has been measured.

## Desktop composer dimensions and spacing

The base spacing token is .25rem. The following are exact formulas observed in the shipped CSS, followed by values derived at a 16px root. Selector specificity matters: later :root rules do not override a more-specific browser body selector.

| Desktop/shared token | Exact value | Derived baseline |
|---|---|---|
| composer-radius | calc(var(--spacing) * 5.5) | 22px, round |
| composer-inline-overhang | calc(var(--spacing) * 6) | 24px |
| home-composer-inline-inset | calc(var(--spacing) * 3.25) | 13px |
| line-height-composer | calc(var(--spacing) * 5) | 20px |
| min-height-composer | calc(var(--spacing) * 11) | 44px |
| min-rows-composer-work-home | 1 | Work-specific, do not infer chat rows |
| padding-composer-input | 0 calc(var(--spacing) * 3) | 0 12px |
| spacing-composer-input-footer | var(--spacing) | 4px |
| padding-composer-empty-attachments | 2 / 2 / 1.5 spacing units | 8px 8px 6px |
| spacing-composer-footer-bottom | 2 spacing units | 8px |
| opacity-composer-placeholder | .5 | 50% |
| spacing-composer-single-line-controls | 1.25 spacing units | 5px |
| padding-composer-single-line-footer-block | 1 spacing unit | 4px |
| padding-toolbar | 4 spacing units | 16px |
| conversation-item-gap | 16px | 16px |
| conversation-grouped-item-gap | 4px | 4px |

Browser-only override: radius 7 spacing units (28px) with superellipse(1.1); input padding 3.75/4.5/4 units (15px 18px 16px); placeholder opacity 1; footer 2.25 units (9px); single-line controls 2 units (8px). These are **not Electron values**. Composer shadow tokens include an inset dark edge and layered light shadows; the active theme selector and containing surface must be resolved before copying a shadow.

Do not turn 44px minimum editor height into a universal total composer height: attachments, controls, multiline input and host state add layout. The current generic demo's arbitrary cards/gutters do not constitute an exact reconstruction.

## Sidebar specification established so far

The shared .sidebar-navigation class explicitly defines 30px nav rows, 32px mode switch, 8px row padding/cell padding and 10px row radius. Its browser-specific rule changes row height to 36px, cell padding to 10px, row padding to 6px, and header gap to 8px (at 16px root). Shared header JSX uses ms-2 and a default height of 8 spacing units (32px); browser overrides margin-start to 2.5 units and height to 36px.

.sidebar-row-focus changes action opacity from 0 to 1 on :focus-visible, hides the leading icon, expands menu width from 0 to auto, sets action width to 5 spacing units, and hides the indicator. This is a concrete focus interaction, not simply a selected background.

**Not established:** final ChatGPT sidebar item order, expanded width, collapsed rail width, active-row colors, avatar/account footer geometry, platform titlebar inset and feature-gated sections. The generic sidebar names found above are unrelated task/review lists. Shared classes are source-backed constraints, but cannot establish a complete ChatGPT sidebar screenshot. Do not fill these gaps with invented 260px/280px widths or a Codex project/worktree navigation tree.

## Fonts and color evidence

OpenAI Sans Regular 400, Medium 500 and Semibold 600 are bundled as WOFF2 and registered with font-display:swap. OpenAI Serif Light is also present as an asset; its presence does not prove the chat hero uses it. The default sans stack in this build is initially -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif. Browser explicitly changes to a longer system stack. Electron sets text-sm=13px, text-xs=12px, medium=500 and font-ui-weight=430. Base text-base is 14px; browser sets it to 1rem. OpenAI Sans availability is **not proof it is the active Windows UI face**: font-ui-family and runtime typography settings need resolved computed-style evidence.

Base app surface is white in light mode and gray-fixed-900 (#181818) in dark mode; foreground is #1a1c1f / gray-fixed-150 (#dfdfdf). The Electron shell surface rule applies surface-tertiary and, when supported, mixes it at 70% with transparent. Consequently flat #212121 everywhere is not an exact token reconstruction. CSS includes separate surface/background/text/composer tokens and platform transparency; inspect resolved values on the target route rather than copying a single palette from another host.

## Icons are source assets, not emoji

Sidebar new-chat, search and project files contain 20x20 CGPT-authored Lottie geometry. Search declares frame rate 60, frames 0–40; project paths include 1.33 stroke width. animated-icon-1526fd61ba39.js imports these specific files through its lazy dependency map. Names also include Images, Library, Plugins, Tasks, Finances and More. Presence does not prove every item is enabled in the ChatGPT sidebar.

Preserve the intended 20x20 geometry, baseline, stroke and interaction state. Emoji substitutions or arbitrary Lucide icons are visibly different and cannot pass a clone claim. Exact runtime animation triggers/reduced-motion frames still need tracing in the animated-icon renderer or observation. No brand/font/icon assets were copied into Rust by this research.

## Implementation acceptance before claiming a visual clone

1. Pin the reference to this installed ChatGPT route and host=electron, or obtain separate source/runtime evidence for whichever ChatGPT website/legacy shell is actually desired.
2. Resolve the full sidebar component, fonts, theme variables, titlebar and root font size on that route. Preserve selector specificity and host differences.
3. Capture matched reference/native states at the same viewport, DPI, theme, content and expanded/collapsed navigation state. Compare home, empty/filled/multiline composer, attachment, conversation and focus states.
4. Record measured differences in layout, glyph metrics, icon paths, borders, shadows and motion. No screenshot parity has been established by this static document.

## Source-linked anchors

### route exports

[chatgpt-conversation-page-3672edf8a24d.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/chatgpt-conversation-page-3672edf8a24d.js) — character offset 297.

```text
export{t as ChatGptConversationPage,n as ChatGptSharedConversationPage};
```

### Chat placeholder

[app-primary-19fe57fd8c00.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-primary-19fe57fd8c00.js) — character offset 919696.

```text
id:`chatgptConversations.composer.placeholder`,defaultMessage:`Ask ChatGPT`,description:`Placeholder and accessible label for the empty Chat composer on the home screen and in conversations in the browser and desktop app. Invites the user to ask ChatGPT a question or give it a task.`}):e.formatMessage({id:`workspaceAgents.detail.composerPlaceholder`,defaultMessage:`Ask {agentName}`,description:`Placeholder in the composer on a Workspace Agent page`},{agent
```

### Home identity

[app-primary-19fe57fd8c00.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-primary-19fe57fd8c00.js) — character offset 2274872.

```text
id:`chatgptConversations.home.hero.shouldWeBegin`,defaultMessage:`Where should we begin?`,description:`One of four rotating headlines on the Chat home page in Codex Desktop. It invites an end user to begin a chat and should remain a short, friendly single-line headline.`}})})))()}function RLt(e){let t=(0,zLt.c)(24),{getHeadline:n,locationKey:r}=e,i=fp(),a=(0,d9.useId)(),o=Ln(),{name:s,ready:c,options:l,userId:u}=q(BLt),d=l.enabled&&s&&s.length<=l.nameCharL
```

### Hero wrapper

[app-primary-19fe57fd8c00.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-primary-19fe57fd8c00.js) — character offset 2279114.

```text
mx-auto w-[min(100%,var(--thread-content-max-width))] min-w-0 px-panel`,"data-feature":p,children:m}),t[18]=p,t[19]=m,t[20]=h):h=t[20],h}function qLt(e){let t=(0,h9.c)(4),{getHeadline:n,locationKey:r}=e,{data:i}=rS(),{planAtLogin:a}=gm();if(!Zae(i?.plan_type??a)){let e;return t[0]!==n||t[1]!==r?(e=(0,g9.jsx)(RLt,{getHeadline:n,locationKey:r}),t[0]=n,t[1]=r,t[2]=e):e=t[2],e}let o;return t[3]===Symbol.for(`react.memo_cache_sentinel`)?(o=(0,g9.jsx)($,{...l9.c
```

### Hero actual headline

[app-primary-19fe57fd8c00.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-primary-19fe57fd8c00.js) — character offset 2282795.

```text
className:`heading-xl font-normal whitespace-pre-wrap text-default browser:min-h-10.5`,children:(0,g9.jsxs)(`div`,{className:Sg(`relative inline-block max-w-full`,a!=null&&`browser:inline-flex browser:min-h-10.5 browser:items-baseline`),children:[a,(0,g9.jsx)(`h1`,{className:`inline`,children:r})]})})},`chat-home-headline`)}),t[3]=n,t[4]=r,t[5]=i,t[6]=a,t[7]=c):c=t[7];let l;return t[8]!==s||t[9]!==c?(l=(0,g9.jsxs)(`div`,{className:`relative w-full min-w-0
```

### Thread body geometry

[app-initial-b8e1c8014bb4.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-initial-b8e1c8014bb4.js) — character offset 2420410.

```text
[--thread-body-max-width:calc(var(--thread-content-max-width)+var(--thread-body-inline-padding,0px)*2)]`,`mx-auto w-full max-w-(--thread-body-max-width)`,JIn)})))()}var ZIn,QIn,$In,eLn;function tLn(){return(tLn=e((()=>{ZIn=`_composer_hs61p_1`,QIn=`_paused_hs61p_13`,$In=`_uploads_hs61p_18`,eLn={composer:ZIn,paused:QIn,uploads:$In}})))()}var nLn,rLn;function iLn(){return(iLn=e((()=>{nLn=`_shell_151xi_3`,rLn={shell:nLn}})))()}function aLn(){return(aLn=e((()=>
```

### Sidebar header

[app-initial-b8e1c8014bb4.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-initial-b8e1c8014bb4.js) — character offset 2940084.

```text
@container/navigation-header ms-2 flex h-[var(--sidebar-navigation-header-height,calc(var(--spacing)*8))] items-center pe-1 browser:ms-2.5 browser:h-9`,children:n}),t[0]=n,t[1]=r),r}function Par(e){let t=(0,Lar.c)(2),{children:n}=e,r;return t[0]===n?r=t[1]:(r=(0,Rar.jsx)(`div`,{className:`flex shrink-0 items-center gap-1 [--side-tooltip:bottom]`,children:n}),t[0]=n,t[1]=r),r}function KF(e){let t=(0,Lar.c)(19),n,r,i,a,o,s;t[0]===e?(n=t[1],r=t[2],i=t[3],a=t[
```

### Sidebar dimensions

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 654399.

```text
.sidebar-navigation{--sidebar-navigation-header-gap:0px;--sidebar-scroll-content-top-padding:var(--spacing);--sidebar-scroll-header-spacing:0px;--height-token-mode-switch:32px;--height-token-nav-row:30px;--height-token-row:var(--height-token-nav-row);--padding-row-cell-x:8px;--padding-row-x:8px;--radius-token-row:10px}.sidebar-navigation:where([data-codex-window-type=browser] .sidebar-navigation){--sidebar-navigation-header-gap:calc(var(--spacing) * 2);--h
```

### Sidebar focus

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 655030.

```text
.sidebar-row-focus{--sidebar-row-action-opacity:0;--sidebar-row-icon-opacity:1;--sidebar-row-menu-width:0px;--sidebar-row-action-width:auto;--sidebar-row-menu-overflow:hidden;--sidebar-row-indicator-visibility:visible}.sidebar-row-focus:has(:focus-visible){--sidebar-row-action-opacity:1;--sidebar-row-icon-opacity:0;--sidebar-row-menu-width:auto;--sidebar-row-action-width:calc(var(--spacing) * 5);--sidebar-row-menu-overflow:visible;--sidebar-row-indicator-v
```

### Heading tokens

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 161284.

```text
--font-heading-xl-size:2rem;--font-heading-xl-line-height:2.375rem;--font-heading-xl-weight:var(--font-weight-semibold);--font-heading-xl-tracking:var(--tracking-tight);--font-heading-lg-size:1.5rem;--font-heading-lg-line-height:1.75rem;--font-heading-lg-weight:var(--font-weight-semibold);--font-heading-lg-tracking:var(--tracking-normal);--font-heading-md-size:1.25rem;--font-heading-md-line-height:1.625rem;--font-heading-md-weight:var(--font-weight-semibol
```

### Desktop text override

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 1250780.

```text
[data-codex-window-type=electron]{--image-viewer-transparent-backdrop-filter:blur(var(--blur-xs));--text-sm:13px;--text-xs:12px;--font-weight-medium:500;--font-ui-weight:430;background:0 0;overflow:hidden}:is([data-codex-window-type=browser],[data-codex-window-type=chrome-extension],[data-codex-window-type=electron]) body{--padding-row-y:calc(var(--spacing) * 1.25);--height-token-nav-row:calc(var(--text-base) * 1.5 + var(--padding-row-y) * 2);--padding-pan
```

### Host thread width

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 669239.

```text
--thread-content-max-width:48rem}.\[--thread-content-max-width\:100\%\]{--thread-content-max-width:100%}.\[--thread-content-max-width\:480px\]{--thread-content-max-width:480px}.\[--thread-content-max-width\:500px\]{--thread-content-max-width:500px}.\[--thread-content-max-width\:var\(--thread-content-responsive-max-width\,inherit\)\]{--thread-content-max-width:var(--thread-content-responsive-max-width,inherit)}.\[--thread-content-responsive-max-width\:var\(
```

### Composer exact tokens

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 1258456.

```text
--composer-inline-overhang:calc(var(--spacing) * 6);--home-composer-inline-inset:calc(var(--spacing) * 3.25);--composer-adjacent-max-width:100%;--line-height-composer:calc(var(--spacing) * 5);--min-height-composer:calc(var(--spacing) * 11);--min-rows-composer-work-home:1;--padding-composer-input:0 calc(var(--spacing) * 3);--spacing-composer-input-footer:var(--spacing);--padding-composer-empty-attachments:calc(var(--spacing) * 2) calc(var(--spacing) * 2) ca
```

### Base composer radius

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 201090.

```text
--composer-radius:calc(var(--spacing) * 5.5);--composer-corner-shape:round;--thread-composer-bottom-inset:calc(var(--spacing) * 4);--color-text-composer-primary:var(--color-text-primary-solid);--color-text-composer-reference:var(--color-text-info);--color-text-user-message:var(--color-text);--color-text-secondary-solid:var(--app-color-text-foreground-secondary);--color-text-info-solid:var(--app-color-text-on-accent,var(--app-color-text-button-primary));--c
```

### Browser composer override

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 1250606.

```text
:root[data-codex-window-type=browser],:root[data-codex-window-type=browser] [data-theme]{--composer-radius:calc(var(--spacing) * 7);--composer-corner-shape:superellipse(1.1)}[data-codex-window-type=electron]{--image-viewer-transparent-backdrop-filter:blur(var(--blur-xs));--text-sm:13px;--text-xs:12px;--font-weight-medium:500;--font-ui-weight:430;background:0 0;overflow:hidden}:is([data-codex-window-type=browser],[data-codex-window-type=chrome-extension],[d
```

### Font registration

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 1243001.

```text
@font-face{font-family:OpenAI Sans;src:url(./OpenAISans-Regular-c56711d328c4.woff2)format("woff2");font-style:normal;font-weight:400;font-display:swap}@font-face{font-family:OpenAI Sans;src:url(./OpenAISans-Medium-7b9c963f9063.woff2)format("woff2");font-style:normal;font-weight:500;font-display:swap}@font-face{font-family:OpenAI Sans;src:url(./OpenAISans-Semibold-e259229c5327.woff2)format("woff2");font-style:normal;font-weight:600;font-display:swap}:root,:
```

### Base palette

[app-shared-9a94b907ed47.css](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/app-shared-9a94b907ed47.css) — character offset 182968.

```text
--app-color-background-surface:var(--lightningcss-light,var(--gray-fixed-0))var(--lightningcss-dark,var(--gray-fixed-900));--app-color-background-surface-under:var(--lightningcss-light,var(--gray-fixed-50))var(--lightningcss-dark,black);--app-color-background-application-menu:var(--lightningcss-light,var(--gray-fixed-50))var(--lightningcss-dark,var(--gray-fixed-800));--app-color-foreground-application-menu:var(--lightningcss-light,var(--app-color-text-fore
```

### Pencil geometry

[sidebar-new-chat-icon-cbd5d32d0c8e.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/sidebar-new-chat-icon-cbd5d32d0c8e.js) — character offset 114.

```text
260625_CGPT_Icon_NewChatPencil_PJ_20x20`,n=20,r=20,i={g:`@lottiefiles/toolkit-js 0.71.10`,tc:`#ffffff`},a=[{ty:4,nm:`Pencil`,sr:1,st:0,op:40,ip:0,ln:`3674`,hasMask:!1,ao:0,ks:{a:{a:0,k:[-3.252,3.227]},s:{a:0,k:[100,100]},p:{a:1,k:[{o:{x:.167,y:.167},i:{x:.833,y:.833},s:[46.797,53.176],t:0,ti:[.004,.006,0],to:[0,0,0]},{o:{x:.167,y:.167},i:{x:.833,y:.833},s:[46.792,53.167],t:1,ti:[.007,.012,0],to:[-.004,-.006,0]},{o:{x:.167,y:.167},i:{x:.833,y:.833},s:[46.77
```

### Search geometry

[sidebar-search-icon-dee5b5ecb91c.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/sidebar-search-icon-dee5b5ecb91c.js) — character offset 114.

```text
260625_CGPT_Icon_Search_PJ_20x20`,n=20,r=20,i={g:`@lottiefiles/toolkit-js 0.71.10`,tc:`#ffffff`},a=[{ty:4,nm:`circle 2`,sr:1,st:0,op:40,ip:0,ln:`5523`,hasMask:!1,ao:0,ks:{a:{a:0,k:[-12.631,-12.631]},s:{a:0,k:[12.125,12.125]},p:{a:0,k:[9.172,9.082]},r:{a:0,k:-45},sa:{a:0,k:0},o:{a:0,k:100}},shapes:[{ty:`gr`,nm:`Ellipse 1`,it:[{ty:`el`,nm:`Ellipse Path 1`,d:1,p:{a:0,k:[0,0]},s:{a:1,k:[{o:{x:1,y:0},i:{x:1,y:1},s:[100,100],t:0},{o:{x:0,y:0},i:{x:0,y:1},s:[1,10
```

### Project geometry

[sidebar-projects-icon-55225a1c26e6.js](C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets/sidebar-projects-icon-55225a1c26e6.js) — character offset 114.

```text
260625_CGPT_Icon_ProjectsFolder_PJ_20x20`,n=20,r=20,i={g:`@lottiefiles/toolkit-js 0.71.10`,tc:`#ffffff`},a=[{ty:4,nm:`vector 1`,sr:1,st:0,op:40,ip:0,ln:`4113`,hasMask:!1,ao:0,ks:{a:{a:0,k:[0,0]},s:{a:0,k:[100,100]},p:{a:0,k:[10.434,12.504]},r:{a:0,k:0},sa:{a:0,k:0},o:{a:0,k:100}},shapes:[{ty:`gr`,nm:`vector`,it:[{ty:`sh`,nm:`Path 1`,d:1,ks:{a:1,k:[{o:{x:.333,y:0},i:{x:0,y:1},s:[{c:!0,i:[[-.053,0],[0,0],[.014,-.692],[0,0],[1.194,0],[0,0],[0,1.301],[0,0]],o:
```

## Artifact hashes

- app-initial-b8e1c8014bb4.js: SHA-256 799331dde54905c4df5e360f23a9621141759e2c0acb230aeab909f9904b646f
- app-primary-19fe57fd8c00.js: SHA-256 15ded0579fb738e12f0e39076d78e8d137848d3ffa78aac1019b0290ae78262e
- app-shared-9a94b907ed47.css: SHA-256 69f929f71947824fed18365d54c8aa0c975a856649339e585a50f6f547e215d7
- chatgpt-conversation-page-3672edf8a24d.js: SHA-256 ed41e5855aed24de2ddc79c138ee4cf957121dbc5ab3c3bf3d214675faf20120
- sidebar-new-chat-icon-cbd5d32d0c8e.js: SHA-256 4cb0aa43d787326b650f4b28064e06ffbb349e1f6df6fc07307250bc058134a8
- sidebar-projects-icon-55225a1c26e6.js: SHA-256 026f6a1981207c19911c7940a3988a527b4ad66d6ab9bc69049239308f4d0e8b
- sidebar-search-icon-dee5b5ecb91c.js: SHA-256 278337b7214ac263bcb2b26b56ad9714c470977199d95c5d7cd5309c5f19361a
