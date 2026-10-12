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

**Updated by recovered component tracing below:** expanded width, conditional sidebar order, footer container, runtime font defaults, and titlebar conditions are now resolved from source. Final enabled account gates, rail width, avatar geometry and runtime compositing still need observation. The unrelated task/review sidebar chunks remain excluded.

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


## Recovered shared sidebar: implementation contract

The following links target formatted copies of the shipped files; symbol names and literal expressions are the evidence, line numbers are navigation aids. These resolve the earlier static gaps without claiming that every capability is enabled for the installed account.

- **Width:** [HRt/URt/dC](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:69049) loads persisted `sidebar-width`, defaults to **340px**, and clamps between 240 and min(520, viewport minus 240). Keep-visible layout can raise the minimum to 290. A forced layout width can override this. This is not evidence for a universal 250/260px sidebar.
- **Font cascade:** [runtime typography](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:449635) derives UI size from saved sansFontSize (default14), code size default12; it writes family/size on root and body. OVs scales text-base14, sm13, xs12, heading-sm18, heading-md20 by UI-size/default-size. `wVs` resolves false at449964; thus `h && g ? OpenAI Sans : null` does not automatically enable OpenAI Sans in this build. An explicit custom theme family still wins. Default Windows fallback is Segoe UI. Bundled brand and explicitly marked headings are separate from the UI stack.
- **Structure:** [iEs](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:432157) renders Chat history navigation: header; New chat block; scrolling destinations/sections; fixed bottom footer. Header [432544](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:432544) is brand `cEs` left and a right flex gap1 group: optional active-media NFo, optionally Activity Ies, Search CLo. NFo is not an always-present icon. `showSearchNavItem:false` means Search belongs in the header, not a duplicate full navigation row.
- **Brand:** [Dns](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:395531) uses ChatGPT SVG `_ns` for ChatGpt mode, Work SVG for work, Codex SVG for codex. SVG height1em/widthauto and an accessible brand label; normal typography text-heading-sm/line24/semibold. The enabled selector is ghost/squircle size-lg with a tertiary chevron `q1e`; disabled mode can render static text, and a home-link mode uses inline link. Do not substitute a logo emoji or assume a model dropdown.
- **New chat:** [oes/ses/les](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:391027) renders New chat with sidebar-new-chat animation and static xKe icon. Then optional monothread entry y7o, then leading content/destination, then optional search (disabled by root). Monothread chunk `navigation-item-impl-d2598a45e762.js` labels itself ChatGPT, describes an ongoing mobile-prototype conversation, and is feature gated. It is not Group chats.
- **Scrollable area:** [NCs](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:428578) uses a flex1/min-height0 vertical scroller, bottom margin equal to footer height, row-radius10, gap4 (browser gap5), hidden horizontal overflow and row padding. [BCs](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:428913) places priority and pinned groups before date-grouped recents when present; projects/connections/chats/custom sections follow configured ordering and collapsed state. Do not hardcode projects before recents without the fixture configuration.
- **Footer:** [VTs](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:431786) composes optional usage/onboarding/announcement/update notices then y2o with account iPo leading and optional update action trailing. Root places it absolute inset-x0/bottom0. [y2o](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:380919) gives noncompact footer toolbar height, gap2 and row-x padding; browser minheight64. Account data [iPo](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:351125) comes from nameAtLogin/profilePictureUrlAtLogin/email and profile_subtext. Use explicit demo identity, not a fabricated observed account.

### Destination order is state, not a single list

[Registry ljo](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:347738) discovers capability-gated destinations. [Njo](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:348493) then overrides visibility and ordering; [Y9o/ies](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:390401) renders the chosen visible list in order.

| Destination | Observed icon references | Availability/default evidence |
|---|---|---|
| Projects | am / large Iqe; sidebar-projects geometry | Descriptor prepended when project/sidebar layout permits |
| Images | dfe; Uye16 / zee20; sidebar-images | ChatGPT capability, chat mode and route gate; registry default true but Njo can hide |
| Library | XDe / iUe; sidebar-library | Desktop capability and library gate; replaces/competes with Space |
| Scheduled / Tasks | u6a / EKe; sidebar-tasks | Automation capability. MYa299529 experiment use_tasks_label chooses Tasks, otherwise Scheduled |
| Plugins / Skills | up / Yle; sidebar-plugins | Desktop/host capability determines Plugins versus Skills |
| Health | Hse / cde | Eligibility and feature gates |
| Finances | KMe / WJe; sidebar-finances | Account finance eligibility; registry hidden default |
| Maps | ume16 / xDe20 | ChatGPT and maps gates |
| Shopping | tre16 / _Qe20 | Feature gate; hidden default, optional New badge |
| GPTs | MWe / _Ve | Eligible plan/capability; hidden default |
| Sites | x0e / ar | Sites availability; hidden default |
| Agents | Oke / k$e | Workspace-agent gate |
| Archive | ITe / Hhe | Feature gate; hidden default |

New sidebar layout defaults only Projects, Library, builtin:space, builtin:orbit, except CME/missionControl/maps retain special logic. Legacy fallback Bjo is `[builtin:orbit, automations, library, cme, skills]`, intersected with available destinations. Account settings and browser settings can replace these defaults. A reproducible native fixture must declare layout variant, capabilities and saved destination list; merely enabling every registered item is not source parity.

## Conversation titlebar, not an inline action gallery

[Conversation route](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/chatgpt-conversation-page-d6ceb517cb3b.js:7211) registers MainContentLayout header with desktopPlacement titlebar and divider false. CSS toolbar is **46px desktop**, **52px browser**; toolbar-action gap is **6px desktop**, **8px browser** ([CSS](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-shared-9a94b907ed47.css:3699)). Caption safe insets are measured and divided by app zoom, with6px left addition ([shell](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-initial-b8e1c8014bb4.js:200743)); do not infer OS caption widths from a generic toolbar.

Header start is conditional. [5455](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/chatgpt-conversation-page-d6ceb517cb3b.js:5455) defines X as product tpp/flora, ln as layout hasPageSurface. [6292](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/chatgpt-conversation-page-d6ceb517cb3b.js:6292) sets `ki = X || ln ? Di : null`; Di includes thread icon and editable title max320px. A GPT replaces this with its own header; absent conversation/data conditions clear it. The `mf` wrapper is a business-agent header and returns the fallback without an agent; it is not a model picker. Thus ordinary chat outside page-surface has empty start, while page-surface can show title. Preserve this conditional fixture distinction.

End actions [D_](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/chatgpt-conversation-page-d6ceb517cb3b.js:6608) are **Share then More**, registered align=end/order100. Share is toolbar-size rounded-large and can disable for streaming/restricted/not-ready state ([z_](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/chatgpt-conversation-page-d6ceb517cb3b.js:8610)). More opens [Ti](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/chatgpt-conversation-page-d6ceb517cb3b.js:4072): rename, conditional pin, archive/unarchive, delete plus project/sharing/view/preferences/handoff options when applicable. Temporary/archived/shared states alter availability. These actions are not a row of permanent text buttons.

The `_l productExperience` header insertion is **NoPaymentTrialHeader**, traced through [B5](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-primary-19fe57fd8c00.js:119473) to header-bf604e776ceb.js. Do not mistake it for a model selector. Shared header identity layout [HPt](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-primary-19fe57fd8c00.js:118352) truncates start max320px and animates identity position300ms unless reduced motion.

## Theme cascade: tokens versus displayed pixel color

[Base palette](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-shared-9a94b907ed47.css:5120), modern color-mix overrides at5263 and semantic aliases around5693:

| Semantic role | Light | Dark |
|---|---|---|
| surface / main | #ffffff | #181818 |
| surface-under | gray-fixed50 | #000000 |
| editor-opaque / surface-tertiary | #ededed fallback; 40% in transparent modern override | #212121 |
| elevated-primary | white70% over transparent | #212121 at96% |
| elevated-primary-opaque | #ffffff | #282828 |
| foreground | #1a1c1f | #dfdfdf |
| secondary text | foreground70% | white70% |
| tertiary text | foreground50% | white50% |
| ghost secondary hover | foreground5% | white8% |
| secondary active | foreground4% | white12% |

**Do not flatten this table into a false screenshot claim.** [Electron rules](C:/Users/PC/Repositories/chatgpt-rea/recovered-frontend/readable/assets/app-shared-9a94b907ed47.css:47900) make normal body transparent and frame/non-content sidebar tertiary70% over transparent. Nested sidebar becomes transparent. Page-surface overrides dark to tertiary80% (light secondary85%). `.electron-opaque` body uses surface-under and changes elevated-primary to elevated-primary-opaque. Application-menu chrome is excluded from these selectors. The extension-only48070 override is not Electron. Consequently dark main #181818/sidebar #212121 are semantic choices, while actual visible sidebar/page pixels depend on frame nesting, backdrop and opaque state. Runtime DOM/computed-style or a valid capture is required to settle the final composition; reversing main/editor token names is not justified.


## Brand/profile menu reconstruction checkpoint

`Dns`395531/395670 in readable app-initial binds the ChatGPT wordmark to a ghost squircle trigger, leading optical alignment, small tertiary chevron; dropdown start alignment, offset4, padding6 and `menuWide`. `menuWide` resolves **240px** in readable app-shared-737655e1fb23.js267727 and275140. The ChatGPT row has py10 and14px base type with secondary description “Create, learn, and explore”; Codex row description is “Build, debug, and ship”, gated by codexAvailable. The native local fixture declares Codex unavailable and keeps the current chat when reselecting ChatGPT; this is not implementation of the Codex product mode.

`QNo`350980 in app-initial places the expanded profile dropdown above the footer, aligned start, offset6, width sidebar width minus twice row-cell/row padding. Compact rail variant instead places it to the right. `ZNo` lazily loads `profile-dropdown-items-a9739dde34e4.js`; y2o is only the footer container, not the source of menu item definitions. That chunk's ProfileDropdownItems export is Yi. Source includes identity/account switching, Profile, Settings, Usage, workspace administration/analytics, Help and Log out with account/capability gates. Help includes Keyboard shortcuts, User guide, What's new and gated setup/privacy/internal-debug entries.

Native implementation at this checkpoint: expanded profile identity from saved display_name, Personal account fixture, Settings, and Help submenu leading to the real Keyboard shortcuts settings section; sidebar Scheduled destination goes to existing Automations surface (Tool0), matching registry ej.automations, not an invented profile item. Scheduled is an explicitly enabled local capability fixture. Native brand/profile menus preserve focus trap and Escape/click-out dismissal. Menu glyph assets are shipped candidates; Help/Keyboard/Scheduled exact runtime icon bindings are not independently verified. The profile Appearance item was removed because it was not observed in this source dropdown.

**Still uncovered, not claimed gated-complete:** switching actual ChatGPT/Codex product modes; account switching/auth/sign-out flows; Profile surface; Usage; admin/analytics; release notes/help/setup/privacy surfaces; mini/pet/referral entries; compact rail profile placement. Backend-free UI fixtures for those interactions remain work. The expanded menu subset is not full profile parity. Popup shadow/radius and submenu collision behavior also require source/runtime comparison. Tests in shell_menu_tests.rs cover native pointer actions for brand selection/dismissal, profile Help navigation and Scheduled route; central test results must be recorded separately.

## Native alpha tokens (2026-10-12 continuation)

`native-ui::tokens` now preserves the source neutral alpha colors instead of substituting solid grays: border8%, heavy border dark16%/light12%, secondary background5%, secondary hover dark8%/light5%, secondary active dark12%/light4%, secondary/tertiary text70%/50%. The alpha ink is white for dark and foreground#1a1c1f for light. Evidence: readable app-shared-9a94b907ed47.css5283–5317,5343–5353,5447–5464. A color mixed only with transparent retains its color channels under premultiplication; this does not require guessing a backdrop. Settings maps these to corresponding toolkit roles; unrelated prototype roles remain approximations.

Composer opaque surface is gray-fixed750#282828 in dark and white in light (CSS3939,5138,5703). Actual composer class binding remains owned by the composer source trace. Electron opaque state is independently driven by the host event electron-window-opaque-surface-changed (app-initial449709), not inferred merely from Windows. Native OS backdrop/frame parity remains unverified.

Library filter geometry was recovered directly from the literal filter-light-20 descriptor body in app-shared-737655e1fb23.js70238 (duplicate196392), with no target execution. The native-ui manifest records its derived SVG hash and source location. Other newly copied SVG candidates remain labelled unproven per-control bindings until their import chain is traced.

## Windows backdrop host binding

New static host evidence: extracted/.vite/build/main-BklS_2Y2.js byte3750527 function L9 chooses transparent O9 plus backgroundMaterial mica for Windows non-exempt windows when opaqueWindowSurfaceEnabled is false; opaque mode uses solid dark/light r1e/i1e and material none. shouldAlwaysUseOpaqueWindowSurface byte3745218 incorporates settings/platform T1e and capability ML; runtime focus/display predicates also participate. applyWindowBackdrop emits electron-window-opaque-surface-changed to synchronize CSS. This establishes a Mica branch, not that it is enabled for the current account/window.

GPUI Windows already exposes WindowBackgroundAppearance::MicaBackdrop, but the toolkit WindowState root plugin paints theme.tokens.background opaquely (gpui-component0.7.3/root.rs449). The native port must make root/shell layering compatible before simply enabling Mica; doing only the window option would not reveal it. This host layer remains an explicit pending implementation, not a capture-proven match.


Menu follow-up: pointer tests exposed a submenu hit-test issue outside its parent bounds; the submenu now stops backdrop mouse-down locally. Brand/profile triggers own native stable focus handles and keyboard activation, allowing actual focus return on Escape (toolkit Button intentionally avoids focus on mouse-down). Chat More popup is now aligned to More's right edge using the current native caption group138px plus8px gap, right146/top46. This is a shell-geometry correction, not a measured upstream offset: route Jh delegates to Be/zh context-menu machinery; exact popup offset, default width (currently248px) and collision policy remain unverified. Brand menu240px width is separately source-confirmed.

## Electron dialog scrim correction

The shared CSS line 5688 defines `--color-dialog-overlay: #0002` (black, alpha 2/15). The dialog primitive consumes it at app-shared JS272559/273213. CSS6029–6034 overrides it only for the extension host, not Electron. All three native modal backdrops now use `native_ui::tokens::dialog_overlay()` instead of unrelated alpha 0x44/0x88 approximations. This corrects backdrop opacity only; panel surfaces, shadows and original-window pixel comparison remain separate verification work.

## Font preferences recovered from the Electron host

`app-shared-737655e1fb23.js:105389,105433,105440` defines UI 14px (11–16) and code 12px (8–24). Native settings now expose and persist both, updating Theme.font_size and mono_font_size; GPUI base text/node.rs consumes the synchronized mono_md token for code blocks. Legacy demo files without code_font_size normalize their formerly valid 12–24 UI range to 11–16 in memory only. Invalid data still requires explicit recovery.

Source app-initial:449756/449966 also scales UI tokens by round(base * UI / 14); many native explicit pixel sizes still bypass that scaling. Source step-font-size changes both preferences, and zoom is independent (0.5–3). Those behaviors and custom UI/content/code families remain unported. Default UI stack CSS3643 resolves Segoe UI on standard Windows; OpenAI Sans preference is gated off by wVs=false in this shipped build.

## UI typography scale wired to native renderers

`native-ui::typography::TextRole` evaluates the source formula `round(base * ui / 14)` for caption12, small13, body14, large16 and headings18/20/24/28. Shell/navigation, conversation controls, projects/library, composer menus, share dialog and settings use these roles for their corresponding existing text sizes. The 32px home headline and fixed leading/spacing/icon dimensions remain unchanged because they are not OVs font-size substitutions. Remaining unported typography includes custom font families, source font-step commands, independent window zoom and prototype rich/tool-specific styles. This is source-derived scaling, not pixel equivalence proof.
