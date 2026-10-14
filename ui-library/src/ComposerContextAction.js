// Generated original context action. See composer-context-manifest.json.
import {classNames as ng} from './classNames.js';
export function createComposerContextAction({React,Button,Tooltip,ShortcutBadge,ResponsiveIcon,AssetIcon,formatMessage=message=>message.defaultMessage,onAnalytics,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!Button||!Tooltip||!ShortcutBadge||!ResponsiveIcon||!AssetIcon)throw new TypeError('Composer context action requires compiler runtime and original component adapters');
 const rIt=compilerRuntime,VS={jsx:(type,props)=>React.createElement(type,props),jsxs:(type,props)=>React.createElement(type,props,...props.children)},K=()=>VS,o=()=>{},t=fn=>fn;
 const Ir=Button,Pn=Tooltip,IWe=ShortcutBadge,rm=ResponsiveIcon,$=props=>formatMessage(props),zd=()=>({formatMessage});
 const q=null,Di=()=>onAnalytics,WFt={$type:'protobuf_analytics_events.v1.ChatgptComposerPlusButtonClicked'},Ap=(callback,event,metadata)=>callback?.({event:event.$type,metadata});
 let hir,_ir,pyr,myr;const Q=()=>{},Z=p=>({...p,body:p.body.trim(),hasGradients:false});
function gir() {
  return (gir = t(() => {
    (Q(),
      (hir = Z({
        name: `plus-lg-regular-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.916504, y: 1.916504, width: 12.166992, height: 12.166992 },
          visualBounds: { x: 1.916504, y: 1.916504, width: 12.166992, height: 12.166992 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.916504, y: 1.916504, width: 12.166992, height: 12.166992 },
          center: { x: 8, y: 8 },
          insets: { top: 1.916504, right: 1.916504, bottom: 1.916504, left: 1.916504 },
          anchors: { frame: { x: 8, y: 8 }, ink: { x: 8, y: 8 }, foreground: { x: 8, y: 8 } },
        },
        capabilities: [`icon`],
        body: `<path d="M8.00049 1.9165C8.41448 1.91677 8.75049 2.25245 8.75049 2.6665V7.25049H13.3335C13.7476 7.25066 14.0835 7.58638 14.0835 8.00049C14.0832 8.41437 13.7474 8.75031 13.3335 8.75049H8.75049V13.3335C8.75031 13.7474 8.41437 14.0832 8.00049 14.0835C7.58638 14.0835 7.25066 13.7476 7.25049 13.3335V8.75049H2.6665C2.25245 8.75049 1.91677 8.41448 1.9165 8.00049C1.9165 7.58627 2.25229 7.25049 2.6665 7.25049H7.25049V2.6665C7.25049 2.25229 7.58627 1.9165 8.00049 1.9165Z" fill="currentColor"/>`,
      })));
  }))();
}
function vir() {
  return (vir = t(() => {
    (Q(),
      (_ir = Z({
        name: `plus-lg-regular-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 2.458496, y: 2.458496, width: 15.083008, height: 15.083008 },
          visualBounds: { x: 2.458496, y: 2.458496, width: 15.083008, height: 15.083008 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 2.458496, y: 2.458496, width: 15.083008, height: 15.083008 },
          center: { x: 10, y: 10 },
          insets: { top: 2.458496, right: 2.458496, bottom: 2.458496, left: 2.458496 },
          anchors: { frame: { x: 10, y: 10 }, ink: { x: 10, y: 10 }, foreground: { x: 10, y: 10 } },
        },
        capabilities: [`icon`],
        body: `<path d="M10.0005 2.4585C10.4835 2.45876 10.8755 2.85041 10.8755 3.3335V9.12549H16.6665C17.1498 9.12549 17.5415 9.51724 17.5415 10.0005C17.5412 10.4835 17.1496 10.8755 16.6665 10.8755H10.8755V16.6665C10.8755 17.1496 10.4835 17.5412 10.0005 17.5415C9.51724 17.5415 9.12549 17.1498 9.12549 16.6665V10.8755H3.3335C2.85041 10.8755 2.45876 10.4835 2.4585 10.0005C2.4585 9.51724 2.85025 9.12549 3.3335 9.12549H9.12549V3.3335C9.12549 2.85025 9.51724 2.4585 10.0005 2.4585Z" fill="currentColor"/>`,
      })));
  }))();
}
function hyr() {
  return (hyr = t(() => {
    (o(),
      (pyr = K()),
      (myr = (e) =>
        (0, pyr.jsx)(`svg`, {
          width: 21,
          height: 21,
          viewBox: `0 0 21 21`,
          fill: `none`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: (0, pyr.jsx)(`path`, {
            d: `M11.6475 18.3409C11.0975 18.3409 10.575 18.2364 10.08 18.0274C9.58502 17.8184 9.14502 17.5269 8.76002 17.1529C8.34202 17.2959 7.90751 17.3674 7.45651 17.3674C6.71951 17.3674 6.03751 17.1859 5.41051 16.8229C4.78351 16.4599 4.27751 15.9649 3.89251 15.3379C3.51851 14.7109 3.33151 14.0124 3.33151 13.2424C3.33151 12.9234 3.37551 12.5769 3.46351 12.2029C3.02351 11.7959 2.68251 11.3284 2.44051 10.8004C2.19851 10.2614 2.07751 9.70044 2.07751 9.11744C2.07751 8.52344 2.20401 7.95144 2.45701 7.40144C2.71001 6.85144 3.06201 6.37844 3.51301 5.98244C3.97501 5.57544 4.50851 5.29494 5.11351 5.14094C5.23451 4.51394 5.48751 3.95294 5.87251 3.45794C6.26851 2.95194 6.75252 2.55594 7.32452 2.26994C7.89652 1.98394 8.50702 1.84094 9.15602 1.84094C9.70602 1.84094 10.2285 1.94544 10.7235 2.15444C11.2185 2.36344 11.6585 2.65494 12.0435 3.02894C12.4615 2.88594 12.896 2.81444 13.347 2.81444C14.084 2.81444 14.766 2.99594 15.393 3.35894C16.02 3.72194 16.5205 4.21694 16.8945 4.84394C17.2795 5.47094 17.472 6.16944 17.472 6.93944C17.472 7.25844 17.428 7.60494 17.34 7.97894C17.78 8.38594 18.121 8.85894 18.363 9.39794C18.605 9.92594 18.726 10.4814 18.726 11.0644C18.726 11.6584 18.5995 12.2304 18.3465 12.7804C18.0935 13.3304 17.736 13.8089 17.274 14.2159C16.823 14.6119 16.295 14.8869 15.69 15.0409C15.569 15.6679 15.3105 16.2289 14.9145 16.7239C14.5295 17.2299 14.051 17.6259 13.479 17.9119C12.907 18.1979 12.2965 18.3409 11.6475 18.3409ZM7.57201 16.2784C8.12201 16.2784 8.60051 16.1629 9.00751 15.9319L12.1095 14.1499C12.2195 14.0729 12.2745 13.9684 12.2745 13.8364V12.4174L8.28152 14.7109C8.03952 14.8539 7.79751 14.8539 7.55552 14.7109L4.43701 12.9124C4.43701 12.9454 4.43151 12.9839 4.42051 13.0279C4.42051 13.0719 4.42051 13.1379 4.42051 13.2259C4.42051 13.7869 4.55252 14.3039 4.81651 14.7769C5.09152 15.2389 5.47101 15.6019 5.95501 15.8659C6.43901 16.1409 6.97801 16.2784 7.57201 16.2784ZM7.73701 13.5889C7.80301 13.6219 7.86351 13.6384 7.91851 13.6384C7.97351 13.6384 8.02852 13.6219 8.08352 13.5889L9.32101 12.8794L5.34451 10.5694C5.10251 10.4264 4.98151 10.2119 4.98151 9.92594V6.34544C4.43151 6.58744 3.99151 6.96144 3.66151 7.46744C3.33151 7.96244 3.16651 8.51244 3.16651 9.11744C3.16651 9.65644 3.30401 10.1734 3.57901 10.6684C3.85401 11.1634 4.21151 11.5374 4.65151 11.7904L7.73701 13.5889ZM11.6475 17.2519C12.2305 17.2519 12.7585 17.1199 13.2315 16.8559C13.7045 16.5919 14.0785 16.2289 14.3535 15.7669C14.6285 15.3049 14.766 14.7879 14.766 14.2159V10.6519C14.766 10.5199 14.711 10.4209 14.601 10.3549L13.347 9.62894V14.2324C13.347 14.5184 13.226 14.7329 12.984 14.8759L9.86551 16.6744C10.4045 17.0594 10.9985 17.2519 11.6475 17.2519ZM12.2745 11.2129V8.96894L10.41 7.91294L8.52902 8.96894V11.2129L10.41 12.2689L12.2745 11.2129ZM7.45651 5.94944C7.45651 5.66344 7.57752 5.44894 7.81952 5.30594L10.938 3.50744C10.399 3.12244 9.80502 2.92994 9.15602 2.92994C8.57302 2.92994 8.04501 3.06194 7.57201 3.32594C7.09902 3.58994 6.72502 3.95294 6.45002 4.41494C6.18602 4.87694 6.05401 5.39394 6.05401 5.96594V9.51344C6.05401 9.64544 6.10901 9.74994 6.21902 9.82694L7.45651 10.5529V5.94944ZM15.8385 13.8364C16.3885 13.5944 16.823 13.2204 17.142 12.7144C17.472 12.2084 17.637 11.6584 17.637 11.0644C17.637 10.5254 17.4995 10.0084 17.2245 9.51344C16.9495 9.01844 16.592 8.64444 16.152 8.39144L13.0665 6.60944C13.0005 6.56544 12.94 6.54894 12.885 6.55994C12.83 6.55994 12.775 6.57644 12.72 6.60944L11.4825 7.30244L15.4755 9.62894C15.5965 9.69494 15.6845 9.78294 15.7395 9.89294C15.8055 9.99194 15.8385 10.1129 15.8385 10.2559V13.8364ZM12.522 5.45444C12.764 5.30044 13.006 5.30044 13.248 5.45444L16.383 7.28594C16.383 7.20894 16.383 7.10994 16.383 6.98894C16.383 6.46094 16.251 5.96044 15.987 5.48744C15.734 5.00344 15.3655 4.61844 14.8815 4.33244C14.4085 4.04644 13.8585 3.90344 13.2315 3.90344C12.6815 3.90344 12.203 4.01894 11.796 4.24994L8.69402 6.03194C8.58402 6.10894 8.52902 6.21344 8.52902 6.34544V7.76444L12.522 5.45444Z`,
            fill: `currentColor`,
          }),
        })));
  }))();
}
 gir();vir();hyr();const lve=myr;
 const wrap=asset=>props=>React.createElement(AssetIcon,{...props,asset,className:ng('_Icon_uttcz_1',props.className),focusable:props.focusable??'false'}),Te=wrap(hir),LMe=wrap(_ir);
function eIt(e) {
  let t = (0, rIt.c)(21),
    { ref: n, active: r, compact: i, disabled: a, highlightTooltip: o, onOpen: s } = e,
    c = r !== void 0 && r,
    l = i !== void 0 && i,
    u = a !== void 0 && a,
    d = o !== void 0 && o,
    f = Di(q),
    p = zd();
  if (l) {
    let e;
    return (
      t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, VS.jsx)(`span`, {
            "aria-hidden": !0,
            className: `pointer-events-none flex aspect-square h-token-button-composer shrink-0 items-center justify-center`,
            children: (0, VS.jsx)(lve, { className: `icon-xs text-tertiary` }),
          })),
          (t[0] = e))
        : (e = t[0]),
      e
    );
  }
  let m = d && !c ? !0 : void 0,
    h;
  t[1] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((h = (0, VS.jsx)($, {
        id: `composer.contextButton.tooltip`,
        defaultMessage: `Add files and more`,
        description: `Tooltip for the button that opens contextual composer suggestions`,
      })),
      (t[1] = h))
    : (h = t[1]);
  let g;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, VS.jsxs)(`div`, {
        className: `flex items-center gap-2`,
        children: [
          h,
          (0, VS.jsx)(IWe, {
            keysLabel: (0, VS.jsx)($, {
              id: `composer.contextButton.keyboardEquivalent`,
              defaultMessage: `@`,
              description: `Keyboard equivalent shown in the contextual composer button tooltip`,
            }),
            variant: `tooltip`,
          }),
        ],
      })),
      (t[2] = g))
    : (g = t[2]);
  let _;
  t[3] === p
    ? (_ = t[4])
    : ((_ = p.formatMessage({
        id: `composer.contextButton.ariaLabel`,
        defaultMessage: `Add files and more`,
        description: `Accessible label for the button that opens contextual composer suggestions`,
      })),
      (t[3] = p),
      (t[4] = _));
  let v = c ? `ghostActive` : `ghost`,
    y = c ? `open` : `closed`,
    b = u || s == null,
    x;
  t[5] !== s || t[6] !== f
    ? ((x = () => {
        s != null && (Ap(f, WFt, { isUnifiedComposerMenuEnabled: !0 }), s());
      }),
      (t[5] = s),
      (t[6] = f),
      (t[7] = x))
    : (x = t[7]);
  let S;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = (0, VS.jsx)(rm, { className: `text-default`, icon: { 16: Te, 20: LMe } })), (t[8] = S))
    : (S = t[8]);
  let C;
  t[9] !== c ||
  t[10] !== n ||
  t[11] !== y ||
  t[12] !== b ||
  t[13] !== x ||
  t[14] !== _ ||
  t[15] !== v
    ? ((C = (0, VS.jsx)(Ir, {
        ref: n,
        "aria-label": _,
        "aria-expanded": c,
        color: v,
        "data-composer-navigation-target": `add-context`,
        "data-state": y,
        disabled: b,
        size: `composer`,
        uniform: !0,
        onMouseDown: tIt,
        onClick: x,
        children: S,
      })),
      (t[9] = c),
      (t[10] = n),
      (t[11] = y),
      (t[12] = b),
      (t[13] = x),
      (t[14] = _),
      (t[15] = v),
      (t[16] = C))
    : (C = t[16]);
  let w;
  return (
    t[17] !== c || t[18] !== C || t[19] !== m
      ? ((w = (0, VS.jsx)(Pn, {
          triggerPopupOpen: c,
          open: m,
          tooltipContent: g,
          align: `center`,
          sideOffset: 4,
          children: C,
        })),
        (t[17] = c),
        (t[18] = C),
        (t[19] = m),
        (t[20] = w))
      : (w = t[20]),
    w
  );
}
function tIt(e) {
  return e.preventDefault();
}
 return {ComposerContextAction:eIt,ComposerPlus16:Te,ComposerPlus20:LMe};
}
