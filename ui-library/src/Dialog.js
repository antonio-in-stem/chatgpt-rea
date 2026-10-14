// Full original dialog controller, overlay, size variants and height observation.
import {classNames as q} from './classNames.js';
export function createDialog({React,primitives:EDe,tooltip,AssetIcon:t5,visualScale=1,formatMessage=message=>message.defaultMessage,IntlContext,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!EDe?.Content||!tooltip?.OverlayPortal||!tooltip?.TooltipOverlayContext||!t5?.fromPreset||!compilerRuntime?.c)throw new TypeError('Dialog requires recovered dialog primitives, tooltip infrastructure, icons and compiler runtime');
 const h=React.createElement,k7={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},D7=compilerRuntime,O7=React;
 const {Root:Cv,Trigger:wv,Content:BDe,Close:Av,Title:Ov,Description:kv,Portal:Tv,Overlay:Ev}=EDe;
 const h5=tooltip.OverlayPortal,v5=tooltip.TooltipOverlayContext,cHe=IntlContext??React.createContext({formatMessage}),d5=()=>visualScale,b5='codex:dismiss-tooltips';
 const t=fn=>fn,Q=()=>{},o=()=>React,K=()=>k7,Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 let CMi,wMi,TMi,EMi,DMi,OMi,kMi,AMi,jMi,MMi,NMi,PMi,FMi,IMi,LMi,RMi,zMi,BMi,VMi,HMi,UMi,WMi,GMi,KMi,qMi,E7,bMi,xMi,vMi,Ucr,Gcr;
function JMi() {
  return (JMi = t(() => {
    ((CMi = `_heightAnimated_1eyrb_2`),
      (wMi = `_beaconModalOverlay_1eyrb_2`),
      (TMi = `_catalogSurface_1eyrb_2`),
      (EMi = `_catalogCompact_1eyrb_2`),
      (DMi = `_creditCheckoutSurface_1eyrb_2`),
      (OMi = `_centeredTextSurface_1eyrb_2`),
      (kMi = `_centeredTextClose_1eyrb_2`),
      (AMi = `_promotionalTitle_1eyrb_2`),
      (jMi = `_dimmedOverlay_1eyrb_2`),
      (MMi = `_chatgptConfirmationSurface_1eyrb_2`),
      (NMi = `_chatgptConfirmationClose_1eyrb_2`),
      (PMi = `_chatgptConfirmationPosition_1eyrb_2`),
      (FMi = `_imageOverlay_1eyrb_2`),
      (IMi = `_topPosition_1eyrb_2`),
      (LMi = `_voicePickerSurface_1eyrb_2`),
      (RMi = `_voicePickerClose_1eyrb_2`),
      (zMi = `_voicePickerOverlay_1eyrb_2`),
      (BMi = `_responsiveSheet_1eyrb_2`),
      (VMi = `_promotionalSheet_1eyrb_2`),
      (HMi = `_promotionalSheetOverlay_1eyrb_2`),
      (UMi = `_promotionalSheetClose_1eyrb_2`),
      (WMi = `_expressiveBeaconSurface_1eyrb_2`),
      (GMi = `_expressiveBeaconTitle_1eyrb_2`),
      (KMi = `_responsiveExpressiveBeaconTitle_1eyrb_2`),
      (qMi = `_photoSetupPosition_1eyrb_2`),
      (E7 = {
        heightAnimated: CMi,
        beaconModalOverlay: wMi,
        catalogSurface: TMi,
        catalogCompact: EMi,
        creditCheckoutSurface: DMi,
        centeredTextSurface: OMi,
        centeredTextClose: kMi,
        promotionalTitle: AMi,
        dimmedOverlay: jMi,
        chatgptConfirmationSurface: MMi,
        chatgptConfirmationClose: NMi,
        chatgptConfirmationPosition: PMi,
        imageOverlay: FMi,
        topPosition: IMi,
        voicePickerSurface: LMi,
        voicePickerClose: RMi,
        voicePickerOverlay: zMi,
        responsiveSheet: BMi,
        promotionalSheet: VMi,
        promotionalSheetOverlay: HMi,
        promotionalSheetClose: UMi,
        expressiveBeaconSurface: WMi,
        expressiveBeaconTitle: GMi,
        responsiveExpressiveBeaconTitle: KMi,
        photoSetupPosition: qMi,
      }));
  }))();
}
function SMi() {
  return (SMi = t(() => {
    (o(),
      (bMi = K()),
      (xMi = (e) =>
        (0, bMi.jsx)(`svg`, {
          width: 21,
          height: 21,
          viewBox: `0 0 21 21`,
          fill: `none`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: (0, bMi.jsx)(`path`, {
            d: `M14.6549 5.57307C14.9283 5.2997 15.3718 5.2997 15.6451 5.57307C15.9185 5.84643 15.9185 6.28993 15.6451 6.5633L11.3903 10.8182L15.6451 15.0731L15.735 15.1834C15.9141 15.4551 15.8842 15.8242 15.6451 16.0633C15.4061 16.3024 15.0369 16.3322 14.7653 16.1531L14.6549 16.0633L10.4 11.8084L6.14515 16.0633C5.87178 16.3367 5.42828 16.3367 5.15492 16.0633C4.88155 15.7899 4.88155 15.3464 5.15492 15.0731L9.4098 10.8182L5.15492 6.5633L5.06507 6.45295C4.88597 6.18128 4.91584 5.81214 5.15492 5.57307C5.39399 5.33399 5.76313 5.30413 6.0348 5.48322L6.14515 5.57307L10.4 9.82795L14.6549 5.57307Z`,
            fill: `currentColor`,
          }),
        })));
  }))();
}
function yMi() {
  return (yMi = t(() => {
    (Q(),
      (vMi = Z({
        name: `xmark-lg-regular-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 3.874573, y: 3.874634, width: 12.25061, height: 12.25061 },
          visualBounds: { x: 3.874573, y: 3.874634, width: 12.25061, height: 12.25061 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 3.874573, y: 3.874634, width: 12.25061, height: 12.25061 },
          center: { x: 9.999878, y: 9.999939 },
          insets: { top: 3.874634, right: 3.874817, bottom: 3.874756, left: 3.874573 },
          anchors: {
            frame: { x: 10, y: 10 },
            ink: { x: 9.999878, y: 9.999939 },
            foreground: { x: 9.999878, y: 9.999939 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M14.6306 4.13058C14.9722 3.78902 15.5272 3.7893 15.8689 4.13058C16.2106 4.47229 16.2106 5.02715 15.8689 5.36886L11.2381 9.99972L15.8689 14.6306C16.2106 14.9723 16.2106 15.5272 15.8689 15.8689C15.5272 16.2106 14.9724 16.2106 14.6306 15.8689L9.99978 11.238L5.36892 15.8689C5.02722 16.2106 4.47235 16.2106 4.13064 15.8689C3.78936 15.5271 3.78908 14.9721 4.13064 14.6306L8.7615 9.99972L4.13064 5.36886C3.78936 5.02712 3.78908 4.47215 4.13064 4.13058C4.47221 3.78901 5.02718 3.7893 5.36892 4.13058L9.99978 8.76144L14.6306 4.13058Z" fill="currentColor"/>`,
      })));
  }))();
}
function Wcr() {
  return (Wcr = t(() => {
    (Q(),
      (Ucr = Z({
        name: `xmark-lg-light-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 4.084503, y: 4.084473, width: 11.830719, height: 11.830688 },
          visualBounds: { x: 4.084503, y: 4.084473, width: 11.830719, height: 11.830688 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 4.084503, y: 4.084473, width: 11.830719, height: 11.830688 },
          center: { x: 9.999862, y: 9.999817 },
          insets: { top: 4.084473, right: 4.084778, bottom: 4.084839, left: 4.084503 },
          anchors: {
            frame: { x: 10, y: 10 },
            ink: { x: 9.999862, y: 9.999817 },
            foreground: { x: 9.999862, y: 9.999817 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M14.779 4.27903C15.0386 4.01948 15.4607 4.01977 15.7204 4.27903C15.9801 4.53873 15.9801 4.96074 15.7204 5.22043L10.9411 9.99973L15.7204 14.779C15.9801 15.0387 15.9801 15.4607 15.7204 15.7204C15.4607 15.9801 15.0387 15.9801 14.779 15.7204L9.99973 10.9411L5.22043 15.7204C4.96073 15.9801 4.53872 15.9801 4.27903 15.7204C4.01977 15.4607 4.01948 15.0386 4.27903 14.779L9.05832 9.99973L4.27903 5.22043C4.01978 4.9607 4.01949 4.53858 4.27903 4.27903C4.53858 4.01948 4.9607 4.01978 5.22043 4.27903L9.99973 9.05832L14.779 4.27903Z" fill="currentColor"/>`,
      })));
  }))();
}
function Kcr() {
  return (Kcr = t(() => {
    (Q(),
      (Gcr = Z({
        name: `xmark-md-light-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 5.167847, y: 5.167847, width: 9.664551, height: 9.663696 },
          visualBounds: { x: 5.167847, y: 5.167847, width: 9.664551, height: 9.663696 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 5.167847, y: 5.167847, width: 9.664551, height: 9.663696 },
          center: { x: 10.000123, y: 9.999695 },
          insets: { top: 5.167847, right: 5.167602, bottom: 5.168457, left: 5.167847 },
          anchors: {
            frame: { x: 10, y: 10 },
            ink: { x: 10.000123, y: 9.999695 },
            foreground: { x: 10.000123, y: 9.999695 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M13.6964 5.36252C13.9561 5.10319 14.3782 5.10304 14.6378 5.36252C14.8974 5.62211 14.8972 6.0442 14.6378 6.30393L10.9405 10.0002L14.6368 13.6965C14.8964 13.9562 14.8965 14.3773 14.6368 14.6369C14.3772 14.8966 13.9561 14.8965 13.6964 14.6369L10.0001 10.9406L6.30381 14.6369C6.0441 14.8965 5.62302 14.8966 5.36338 14.6369C5.10384 14.3773 5.10388 13.9562 5.36338 13.6965L9.05869 10.0002L5.3624 6.30393C5.10314 6.0442 5.10285 5.62208 5.3624 5.36252C5.62195 5.10297 6.04407 5.10326 6.30381 5.36252L10.0001 9.05881L13.6964 5.36252Z" fill="currentColor"/>`,
      })));
  }))();
}
 JMi();SMi();yMi();Wcr();Kcr();const _gr=t5.fromPreset(Ucr),C$=t5.fromPreset(Gcr),oNi={id:'codex.dialog.closeButton',defaultMessage:'Close dialog',description:'Accessible label for the button that closes a dialog'};
function XMi(e) {
  "use forget";
  let t = (0, D7.c)(59),
    n,
    r,
    i,
    a,
    o,
    s,
    c,
    l,
    u,
    d,
    f,
    p,
    m,
    h,
    g,
    _,
    v,
    y,
    b,
    x,
    S,
    C,
    w,
    T,
    E,
    D;
  t[0] === e
    ? ((n = t[1]),
      (r = t[2]),
      (i = t[3]),
      (a = t[4]),
      (o = t[5]),
      (s = t[6]),
      (c = t[7]),
      (l = t[8]),
      (u = t[9]),
      (d = t[10]),
      (f = t[11]),
      (p = t[12]),
      (m = t[13]),
      (h = t[14]),
      (g = t[15]),
      (_ = t[16]),
      (v = t[17]),
      (y = t[18]),
      (b = t[19]),
      (x = t[20]),
      (S = t[21]),
      (C = t[22]),
      (w = t[23]),
      (T = t[24]),
      (E = t[25]),
      (D = t[26]))
    : (({
        children: r,
        modal: p,
        autoFocusCloseButton: n,
        triggerContent: T,
        triggerAsChild: m,
        triggerRef: E,
        contentClassName: a,
        contentOverflow: g,
        contentPosition: _,
        contentProps: o,
        dialogCloseClassName: s,
        closeButtonSize: i,
        dialogCloseLabel: c,
        headerActions: l,
        overlayClassName: u,
        transparentImage: w,
        portalContainer: d,
        radius: v,
        showDialogClose: y,
        shouldIgnoreClickOutside: b,
        unstyledContent: x,
        viewportSized: S,
        variant: C,
        size: h,
        widthHint: D,
        ...f
      } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = i),
      (t[4] = a),
      (t[5] = o),
      (t[6] = s),
      (t[7] = c),
      (t[8] = l),
      (t[9] = u),
      (t[10] = d),
      (t[11] = f),
      (t[12] = p),
      (t[13] = m),
      (t[14] = h),
      (t[15] = g),
      (t[16] = _),
      (t[17] = v),
      (t[18] = y),
      (t[19] = b),
      (t[20] = x),
      (t[21] = S),
      (t[22] = C),
      (t[23] = w),
      (t[24] = T),
      (t[25] = E),
      (t[26] = D));
  let O = p === void 0 || p,
    k = m === void 0 || m,
    A = g === void 0 ? `hidden` : g,
    j = _ === void 0 ? `centered` : _,
    M = v === void 0 ? `default` : v,
    N = y === void 0 || y,
    P = b !== void 0 && b,
    F = x !== void 0 && x,
    ee = S !== void 0 && S,
    te = C === void 0 ? `default` : C,
    ne = h === void 0 ? `default` : h,
    re;
  t[27] !== k || t[28] !== T || t[29] !== E
    ? ((re = T && (0, k7.jsx)(eNi, { asChild: k, triggerRef: E, children: T })),
      (t[27] = k),
      (t[28] = T),
      (t[29] = E),
      (t[30] = re))
    : (re = t[30]);
  let I;
  t[31] !== n ||
  t[32] !== r ||
  t[33] !== i ||
  t[34] !== a ||
  t[35] !== A ||
  t[36] !== j ||
  t[37] !== o ||
  t[38] !== s ||
  t[39] !== c ||
  t[40] !== l ||
  t[41] !== O ||
  t[42] !== u ||
  t[43] !== d ||
  t[44] !== M ||
  t[45] !== P ||
  t[46] !== N ||
  t[47] !== ne ||
  t[48] !== w ||
  t[49] !== F ||
  t[50] !== te ||
  t[51] !== ee ||
  t[52] !== D
    ? ((I = (0, k7.jsx)(tNi, {
        modal: O,
        autoFocusCloseButton: n,
        contentClassName: a,
        contentOverflow: A,
        contentPosition: j,
        closeButtonSize: i,
        dialogCloseClassName: s,
        dialogCloseLabel: c,
        headerActions: l,
        overlayClassName: u,
        transparentImage: w,
        portalContainer: d,
        radius: M,
        showDialogClose: N,
        shouldIgnoreClickOutside: P,
        unstyledContent: F,
        viewportSized: ee,
        variant: te,
        size: ne,
        widthHint: D,
        ...o,
        children: r,
      })),
      (t[31] = n),
      (t[32] = r),
      (t[33] = i),
      (t[34] = a),
      (t[35] = A),
      (t[36] = j),
      (t[37] = o),
      (t[38] = s),
      (t[39] = c),
      (t[40] = l),
      (t[41] = O),
      (t[42] = u),
      (t[43] = d),
      (t[44] = M),
      (t[45] = P),
      (t[46] = N),
      (t[47] = ne),
      (t[48] = w),
      (t[49] = F),
      (t[50] = te),
      (t[51] = ee),
      (t[52] = D),
      (t[53] = I))
    : (I = t[53]);
  let L;
  return (
    t[54] !== O || t[55] !== f || t[56] !== re || t[57] !== I
      ? ((L = (0, k7.jsxs)(Cv, { modal: O, ...f, children: [re, I] })),
        (t[54] = O),
        (t[55] = f),
        (t[56] = re),
        (t[57] = I),
        (t[58] = L))
      : (L = t[58]),
    L
  );
}
function eNi(e) {
  let t = (0, D7.c)(8),
    n,
    r,
    i;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]))
    : (({ asChild: r, triggerRef: i, ...n } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = i));
  let a = r === void 0 || r,
    o;
  return (
    t[4] !== a || t[5] !== n || t[6] !== i
      ? ((o = (0, k7.jsx)(wv, { ref: i, asChild: a, ...n })),
        (t[4] = a),
        (t[5] = n),
        (t[6] = i),
        (t[7] = o))
      : (o = t[7]),
    o
  );
}
function tNi(e) {
  "use forget";
  let t = (0, D7.c)(82),
    {
      children: n,
      modal: r,
      autoFocusCloseButton: i,
      contentClassName: a,
      contentOverflow: o,
      contentPosition: s,
      dialogCloseClassName: c,
      closeButtonSize: l,
      dialogCloseLabel: u,
      headerActions: d,
      overlayClassName: f,
      transparentImage: p,
      portalContainer: m,
      radius: h,
      showDialogClose: g,
      shouldIgnoreClickOutside: _,
      shouldStopPointerDownPropagation: v,
      unstyledContent: y,
      viewportSized: b,
      variant: x,
      size: S,
      widthHint: C,
      ...w
    } = e,
    T = l === void 0 ? `default` : l,
    E = h === void 0 ? `default` : h,
    D = g === void 0 || g,
    O = _ !== void 0 && _,
    k = v === void 0 || v,
    A = y !== void 0 && y,
    j = b !== void 0 && b,
    M = x === void 0 ? `default` : x,
    {
      asChild: N,
      className: P,
      onOpenAutoFocus: F,
      onPointerDown: ee,
      onPointerDownOutside: te,
      style: ne,
      ...re
    } = w,
    I = (0, O7.useContext)(cHe),
    L = (0, O7.useContext)(v5),
    R = d5(),
    ie = M === "default" || M === `opaque`,
    ae = M === `beacon` || M === `beaconModal` || M === `expressiveBeacon`,
    oe = M === `catalog` || M === `centeredText` || M === `confirmation`,
    se = M === `creditCheckout`,
    ce = M === `chatgptConfirmation` && s === `centered`,
    le = q(
      `codex-dialog z-50`,
      M !== `centeredText` && `outline-none`,
      S === `sheet` && `bottom-0 left-0`,
      s === `centered` &&
        !ce &&
        M !== `image` &&
        S !== `sheet` &&
        S !== `responsiveSheet` && [
          `left-1/2 -translate-x-1/2 -translate-y-1/2`,
          M === `photoSetup` ? E7.photoSetupPosition : `top-1/2`,
        ],
      s === `top` && [`left-1/2 -translate-x-1/2`, E7.topPosition],
      s === `scrollable` && `relative m-auto shrink-0 pointer-events-auto`,
      ce && `relative col-start-2 row-start-2 justify-self-center pointer-events-auto`,
      s !== `inline` && s !== `scrollable` && !ce && (m == null ? `fixed` : `absolute`),
    ),
    ue = q(
      M === "default" &&
        `bg-surface-elevated-secondary/90 text-default ring-border ring-[0.5px] ring-border shadow-lg backdrop-blur-xl`,
      (M === `chatgpt` || M === `photoSetup` || ae) && [
        `dark:bg-surface-tertiary text-default`,
        M === `chatgpt` && s === `anchored` && S !== `sheet` && S !== `responsiveSheet`
          ? `bg-surface-elevated bg-clip-padding md:border md:border-default md:shadow-2xl`
          : `bg-surface shadow-lg`,
      ],
      M === `expressiveBeacon` && [`border border-default`, E7.expressiveBeaconSurface],
      M === `voicePicker` && E7.voicePickerSurface,
      M === `chatgptConfirmation` && E7.chatgptConfirmationSurface,
      M === `onboarding` && `bg-surface-elevated text-default shadow-lg`,
      M === `mediaDetail` && `bg-surface text-default shadow-lg`,
      (M === `opaque` || M === `promotional`) &&
        `bg-surface-elevated-secondary text-default shadow-lg ring-[0.5px] ring-border`,
      M === `form` &&
        `rounded-form-dialog bg-surface-elevated-secondary text-default shadow-form-dialog ring-[0.5px] ring-border`,
      oe && [`bg-surface-elevated-secondary text-default`, E7.catalogSurface],
      M === `centeredText` && E7.centeredTextSurface,
      oe && E === `compact` && E7.catalogCompact,
      se && [`relative rounded-2xl bg-surface`, E7.creditCheckoutSurface],
      M !== `image` &&
        M !== `expressiveBeacon` &&
        M !== `form` &&
        M !== `voicePicker` &&
        !oe &&
        !se &&
        S !== `responsiveSheet` &&
        (E === `compact` || M === `chatgpt` || M === `chatgptConfirmation` || ae
          ? `rounded-2xl`
          : `rounded-3xl`),
      M !== `image` &&
        M !== `voicePicker` &&
        !se &&
        S !== `sheet` &&
        S !== `square` &&
        S !== `responsiveSheet` &&
        (s === `scrollable` || ce ? `max-w-full` : `max-w-[92vw]`),
      o === `visible` ? `overflow-visible` : `overflow-hidden`,
      ae && `max-h-[92dvh] overflow-y-auto`,
    ),
    de;
  t[0] !== s || t[1] !== m || t[2] !== S || t[3] !== R
    ? ((de = {}),
      S === `square`
        ? (de.width = `min(760px, calc(100vw / ${R} - 4rem), calc(100dvh / ${R} - 6rem))`)
        : S === `sheet`
          ? ((de.width = `calc(100vw / ${R})`),
            (de.height = `calc(70dvh / ${R})`),
            (de.maxHeight = `calc(100dvh / ${R} - 1rem)`))
          : S === `appLauncher` &&
            ((de.maxWidth = `calc(92vw / ${R})`), (de.maxHeight = `calc(90dvh / ${R})`)),
      s === `scrollable` && m == null && (de.maxWidth = `calc((100vw - 2rem) / ${R})`),
      (t[0] = s),
      (t[1] = m),
      (t[2] = S),
      (t[3] = R),
      (t[4] = de))
    : (de = t[4]);
  let fe = YMi(S);
  M === `image`
    ? (fe = `inset-0 flex h-full w-full flex-col`)
    : M === `chatgptConfirmation` && S === "default"
      ? (fe = `w-125`)
      : se && (fe = `max-w-125`);
  let [pe, me] = (0, O7.useState)(null),
    [he, ge] = (0, O7.useState)(null),
    _e =
      ne?.height != null ||
      /\bh-(?!auto\b)[^\s]+/.test(fe) ||
      /\bh-(?!auto\b)[^\s]+/.test(a ?? ``) ||
      /\bh-(?!auto\b)[^\s]+/.test(P ?? ``),
    ve =
      !N &&
      !A &&
      !j &&
      s !== `top` &&
      S !== `editor` &&
      S !== `square` &&
      S !== `sheet` &&
      S !== `responsiveSheet` &&
      S !== `xxxwideTall` &&
      !_e,
    ye;
  t[5] !== i ||
  t[6] !== T ||
  t[7] !== c ||
  t[8] !== u ||
  t[9] !== ie ||
  t[10] !== d ||
  t[11] !== I ||
  t[12] !== oe ||
  t[13] !== se ||
  t[14] !== D ||
  t[15] !== S ||
  t[16] !== M
    ? ((ye = D
        ? (0, k7.jsxs)(Av, {
            className: q(
              `no-drag cursor-interaction leading-none hover:bg-primary-ghost-hover`,
              M !== `voicePicker` &&
                `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0`,
              se && `flex size-9 items-center justify-center rounded-lg text-token-text-secondary`,
              !se &&
                M !== `form` &&
                (oe || M === `voicePicker` || M === `chatgptConfirmation`
                  ? `text-default`
                  : `text-text/80`),
              M === `form` && `text-tertiary hover:text-default`,
              M === `voicePicker` && `absolute flex items-center justify-center`,
              M !== `voicePicker` &&
                !se &&
                (!ie || T !== "default"
                  ? q(
                      `flex items-center justify-center`,
                      M === `chatgpt` || M === `chatgptConfirmation` || M === `photoSetup`
                        ? `rounded-lg`
                        : `rounded-full`,
                      T === `compact` && `size-7 bg-surface shadow-xs ring-[0.5px] ring-border`,
                      T !== `compact` &&
                        M !== `chatgptConfirmation` &&
                        (M === `centeredText` || M === `expressiveBeacon` || T === `large`
                          ? `size-9`
                          : `size-8`),
                    )
                  : `rounded p-1`),
              d == null && se && `absolute top-4 end-4`,
              d == null &&
                M !== `voicePicker` &&
                !se &&
                T === `large` &&
                `absolute top-4.5 end-4.5`,
              d == null &&
                M !== `voicePicker` &&
                !se &&
                T !== `large` &&
                M === `form` &&
                `absolute top-4 right-3.5`,
              d == null &&
                M !== `voicePicker` &&
                !se &&
                T !== `large` &&
                M !== `form` &&
                M !== `centeredText` && [
                  `absolute`,
                  M === `photoSetup` && `top-2 right-2`,
                  (M === `chatgpt` || M === `promotional`) && `top-3 right-3`,
                  M !== `photoSetup` &&
                    M !== `chatgpt` &&
                    M !== `chatgptConfirmation` &&
                    M !== `promotional` &&
                    `top-4 right-4`,
                ],
              M === `beacon` &&
                T !== `compact` &&
                `size-9 bg-surface/80 shadow-xs backdrop-blur-md`,
              M === `beaconModal` &&
                T !== `compact` &&
                `size-9 bg-surface/20 hover:bg-surface/30 active:bg-surface/80 dark:active:bg-surface/70 shadow-xs backdrop-blur-md transition-colors`,
              M === `centeredText` && E7.centeredTextClose,
              M === `voicePicker` && E7.voicePickerClose,
              M === `chatgptConfirmation` && E7.chatgptConfirmationClose,
              c,
              S === `responsiveSheet` && M === `promotional` && E7.promotionalSheetClose,
            ),
            autoFocus: i,
            onClick: nNi,
            children: [
              T !== "default" && (0, k7.jsx)(_gr, {}),
              T === "default" && oe && (0, k7.jsx)(t5, { asset: vMi }),
              T === "default" && M === `form` && (0, k7.jsx)(t5, { asset: Gcr }),
              T === "default" && !oe && !ie && M !== `form` && (0, k7.jsx)(C$, {}),
              T === "default" &&
                ie &&
                (0, k7.jsx)(xMi, { "aria-hidden": !0, className: `icon-xs` }),
              (0, k7.jsx)(`span`, {
                className: `sr-only`,
                children: u || I?.formatMessage(oNi) || oNi.defaultMessage,
              }),
            ],
          })
        : null),
      (t[5] = i),
      (t[6] = T),
      (t[7] = c),
      (t[8] = u),
      (t[9] = ie),
      (t[10] = d),
      (t[11] = I),
      (t[12] = oe),
      (t[13] = se),
      (t[14] = D),
      (t[15] = S),
      (t[16] = M),
      (t[17] = ye))
    : (ye = t[17]);
  let be = ye,
    xe;
  t[18] !== be || t[19] !== d
    ? ((xe =
        d == null
          ? be
          : (0, k7.jsxs)(`div`, {
              className: `absolute top-5 right-5 flex items-center gap-1 no-drag`,
              children: [d, be],
            })),
      (t[18] = be),
      (t[19] = d),
      (t[20] = xe))
    : (xe = t[20]);
  let Se = xe,
    Ce,
    we;
  (t[21] !== he || t[22] !== pe || t[23] !== ve
    ? ((Ce = () => {
        if (!ve || pe == null || he == null || typeof ResizeObserver > `u`) return;
        let e = null,
          t = null,
          n = -1,
          r = !1,
          i = (e) => {
            Number.isFinite(e) &&
              (Math.abs(e - n) < 0.5 ||
                ((n = e),
                pe.style.setProperty(`--dialog-content-height`, `${e}px`),
                (pe.style.height = `var(--dialog-content-height)`),
                r ||
                  (t != null && cancelAnimationFrame(t),
                  (t = requestAnimationFrame(() => {
                    ((r = !0), (pe.dataset.dialogHeightReady = `true`));
                  })))));
          },
          a = () => {
            let e = he.offsetHeight || he.scrollHeight;
            i(e);
          },
          o = () => {
            e ??= requestAnimationFrame(() => {
              ((e = null), a());
            });
          };
        o();
        let s = new ResizeObserver(o);
        return (
          s.observe(he),
          () => {
            (s.disconnect(),
              e != null && cancelAnimationFrame(e),
              t != null && cancelAnimationFrame(t),
              pe.style.removeProperty(`--dialog-content-height`),
              (pe.style.height = ``),
              delete pe.dataset.dialogHeightReady);
          }
        );
      }),
      (we = [he, pe, ve]),
      (t[21] = he),
      (t[22] = pe),
      (t[23] = ve),
      (t[24] = Ce),
      (t[25] = we))
    : ((Ce = t[24]), (we = t[25])),
    (0, O7.useLayoutEffect)(Ce, we));
  let Te = EDe,
    Ee = L?.id,
    De = q(
      le,
      !A && ue,
      !A && M !== `voicePicker` && fe,
      S === `responsiveSheet` && M === `promotional` && E7.promotionalSheet,
      ve && E7.heightAnimated,
      a,
      P,
    ),
    Oe = C != null && Number.isFinite(C) && C > 0 ? C : void 0,
    ke = s !== `inline` && m == null && R !== 1 ? R : void 0,
    Ae;
  t[26] !== m || t[27] !== j || t[28] !== R
    ? ((Ae =
        j && m == null ? { height: `calc(100dvh / ${R})`, width: `calc(100vw / ${R})` } : null),
      (t[26] = m),
      (t[27] = j),
      (t[28] = R),
      (t[29] = Ae))
    : (Ae = t[29]);
  let je;
  t[30] !== m || t[31] !== S || t[32] !== R
    ? ((je =
        S === `setup` && m == null
          ? {
              height: `min(600px, calc((100dvh - 2rem) / ${R}))`,
              maxWidth: `calc((100dvw - 2rem) / ${R})`,
            }
          : null),
      (t[30] = m),
      (t[31] = S),
      (t[32] = R),
      (t[33] = je))
    : (je = t[33]);
  let Me;
  t[34] !== de || t[35] !== ne || t[36] !== Oe || t[37] !== ke || t[38] !== Ae || t[39] !== je
    ? ((Me = { width: Oe, zoom: ke, ...de, ...Ae, ...je, ...ne }),
      (t[34] = de),
      (t[35] = ne),
      (t[36] = Oe),
      (t[37] = ke),
      (t[38] = Ae),
      (t[39] = je),
      (t[40] = Me))
    : (Me = t[40]);
  let Ne;
  t[41] !== te || t[42] !== O
    ? ((Ne = (e) => {
        (O && e.preventDefault(), te?.(e));
      }),
      (t[41] = te),
      (t[42] = O),
      (t[43] = Ne))
    : (Ne = t[43]);
  let Pe;
  t[44] !== ee || t[45] !== k
    ? ((Pe = (e) => {
        (k && e.stopPropagation(), ee?.(e));
      }),
      (t[44] = ee),
      (t[45] = k),
      (t[46] = Pe))
    : (Pe = t[46]);
  let Fe;
  t[47] === F
    ? (Fe = t[48])
    : ((Fe = (e) => {
        (qxi(), window.getSelection()?.removeAllRanges(), F?.(e));
      }),
      (t[47] = F),
      (t[48] = Fe));
  let Ie;
  t[49] !== N || t[50] !== n || t[51] !== Se || t[52] !== ge || t[53] !== ve
    ? ((Ie =
        N && (0, O7.isValidElement)(n)
          ? (0, O7.cloneElement)(
              n,
              void 0,
              (0, k7.jsx)(iNi, {}, `overlay-registration`),
              n.props.children,
              Se,
            )
          : (0, k7.jsxs)(k7.Fragment, {
              children: [
                (0, k7.jsx)(iNi, {}),
                ve ? (0, k7.jsx)(`div`, { ref: ge, children: n }) : n,
                Se,
              ],
            })),
      (t[49] = N),
      (t[50] = n),
      (t[51] = Se),
      (t[52] = ge),
      (t[53] = ve),
      (t[54] = Ie))
    : (Ie = t[54]);
  let Le;
  t[55] !== N ||
  t[56] !== re ||
  t[57] !== r ||
  t[58] !== me ||
  t[59] !== Te.Content ||
  t[60] !== Ee ||
  t[61] !== De ||
  t[62] !== Me ||
  t[63] !== Ne ||
  t[64] !== Pe ||
  t[65] !== Fe ||
  t[66] !== Ie
    ? ((Le = (0, k7.jsx)(Te.Content, {
        asChild: N,
        ref: me,
        "data-overlay-owner": Ee,
        className: De,
        "aria-modal": r,
        style: Me,
        onPointerDownOutside: Ne,
        onPointerDown: Pe,
        onOpenAutoFocus: Fe,
        ...re,
        children: Ie,
      })),
      (t[55] = N),
      (t[56] = re),
      (t[57] = r),
      (t[58] = me),
      (t[59] = Te.Content),
      (t[60] = Ee),
      (t[61] = De),
      (t[62] = Me),
      (t[63] = Ne),
      (t[64] = Pe),
      (t[65] = Fe),
      (t[66] = Ie),
      (t[67] = Le))
    : (Le = t[67]);
  let Re = Le,
    ze;
  t[68] !== Re ||
  t[69] !== s ||
  t[70] !== r ||
  t[71] !== f ||
  t[72] !== m ||
  t[73] !== S ||
  t[74] !== p ||
  t[75] !== ce ||
  t[76] !== M
    ? ((ze = (0, k7.jsx)(k7.Fragment, {
        children:
          s === `scrollable` && !r
            ? (0, k7.jsx)(`div`, {
                className: `pointer-events-none fixed inset-0 z-50 overflow-y-auto`,
                children: (0, k7.jsx)(`div`, { className: `flex min-h-full p-4`, children: Re }),
              })
            : (0, k7.jsxs)(k7.Fragment, {
                children: [
                  (0, k7.jsx)(Ev, {
                    asChild: !0,
                    children: (0, k7.jsx)($Mi, {
                      className: q(f, s === `scrollable` && `overflow-y-auto`),
                      variant: M,
                      transparentImage: p,
                      size: S,
                      position: M === `image` && m != null ? `absolute` : `fixed`,
                      children:
                        s === `scrollable`
                          ? (0, k7.jsx)(`div`, { className: `flex min-h-full p-4`, children: Re })
                          : null,
                    }),
                  }),
                  ce
                    ? (0, k7.jsx)(`div`, {
                        className: q(
                          `pointer-events-none inset-0 z-50`,
                          m == null ? `fixed` : `absolute`,
                          E7.chatgptConfirmationPosition,
                        ),
                        children: Re,
                      })
                    : null,
                  !ce && s !== `scrollable` ? Re : null,
                ],
              }),
      })),
      (t[68] = Re),
      (t[69] = s),
      (t[70] = r),
      (t[71] = f),
      (t[72] = m),
      (t[73] = S),
      (t[74] = p),
      (t[75] = ce),
      (t[76] = M),
      (t[77] = ze))
    : (ze = t[77]);
  let Be = ze,
    Ve;
  return (
    t[78] !== s || t[79] !== m || t[80] !== Be
      ? ((Ve =
          s === `inline`
            ? Be
            : (0, k7.jsx)(Tv, {
                container: m ?? void 0,
                children: (0, k7.jsx)(rNi, { container: m, children: Be }),
              })),
        (t[78] = s),
        (t[79] = m),
        (t[80] = Be),
        (t[81] = Ve))
      : (Ve = t[81]),
    Ve
  );
}
function YMi(e) {
  return e === `large`
    ? `w-lg`
    : e === `narrow`
      ? `w-[380px]`
      : e === `feature`
        ? `w-[400px]`
        : e === `setup`
          ? `h-[min(600px,calc(100dvh-2rem))] w-120`
          : e === `catalogDetail`
            ? `w-143.5`
            : e === `beacon`
              ? `w-120`
              : e === `compact`
                ? `w-105`
                : e === `medium`
                  ? `w-md`
                  : e === `wide`
                    ? `w-150`
                    : e === `wideTall`
                      ? `h-140 max-h-[calc(100dvh/var(--codex-window-zoom)-2rem)] w-150`
                      : e === `share`
                        ? `w-160`
                        : e === `feedback`
                          ? `w-xl`
                          : e === `xwide`
                            ? `w-[680px]`
                            : e === `xwideTall`
                              ? `h-[min(92vh,800px)] max-h-[min(92vh,800px)] w-[680px]`
                              : e === `xxwide`
                                ? `w-[800px]`
                                : e === `xxxwideTall`
                                  ? `h-[min(85vh,740px)] max-h-[min(85vh,740px)] w-[960px]`
                                  : e === `editor`
                                    ? `w-[600px] h-[720px] max-w-full max-h-full`
                                    : e === `appLauncher`
                                      ? `w-[750px] h-[720px]`
                                      : e === `square`
                                        ? `aspect-square`
                                        : e === `sheet`
                                          ? `rounded-b-none`
                                          : e === `responsiveSheet`
                                            ? E7.responsiveSheet
                                            : `w-130`;
}
function $Mi(e) {
  let t = (0, D7.c)(21),
    n,
    r,
    i,
    a,
    o,
    s;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]), (a = t[4]), (o = t[5]), (s = t[6]))
    : (({ className: n, transparentImage: s, variant: i, size: a, position: o, ...r } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = i),
      (t[4] = a),
      (t[5] = o),
      (t[6] = s));
  let c = i === void 0 ? `default` : i,
    l = a === void 0 ? `default` : a,
    u = o === void 0 ? `fixed` : o,
    d =
      (c === `beaconModal` ||
        c === `expressiveBeacon` ||
        (l === `responsiveSheet` && c !== `promotional`)) &&
      E7.beaconModalOverlay,
    f = l === `responsiveSheet` && c === `promotional` && E7.promotionalSheetOverlay,
    p =
      (c === `opaque` ||
        c === `form` ||
        c === `catalog` ||
        c === `confirmation` ||
        c === `chatgptConfirmation` ||
        c === `centeredText` ||
        c === `creditCheckout` ||
        c === `image`) &&
      E7.dimmedOverlay,
    m = c === `image` && E7.imageOverlay,
    h = c === `voicePicker` && E7.voicePickerOverlay,
    g = (c === `beacon` || c === `promotional`) && `bg-text/5 backdrop-blur-sm`,
    _ =
      (c === "default" || c === `chatgpt` || c === `photoSetup` || c === `mediaDetail`) &&
      l !== `responsiveSheet` &&
      `bg-(--color-dialog-overlay) codex-dialog-overlay fixed inset-0 z-50`,
    v;
  t[7] !== n ||
  t[8] !== u ||
  t[9] !== _ ||
  t[10] !== d ||
  t[11] !== f ||
  t[12] !== p ||
  t[13] !== m ||
  t[14] !== h ||
  t[15] !== g
    ? ((v = q(`codex-dialog-overlay inset-0 z-50 pointer-events-auto`, u, d, f, p, m, h, g, _, n)),
      (t[7] = n),
      (t[8] = u),
      (t[9] = _),
      (t[10] = d),
      (t[11] = f),
      (t[12] = p),
      (t[13] = m),
      (t[14] = h),
      (t[15] = g),
      (t[16] = v))
    : (v = t[16]);
  let y = c === `image` ? s : void 0,
    b;
  return (
    t[17] !== r || t[18] !== v || t[19] !== y
      ? ((b = (0, k7.jsx)(`div`, { className: v, "data-transparent": y, ...r })),
        (t[17] = r),
        (t[18] = v),
        (t[19] = y),
        (t[20] = b))
      : (b = t[20]),
    b
  );
}
function rNi(e) {
  let t = (0, D7.c)(3),
    { children: n, container: r } = e,
    i = r ?? document.body,
    a;
  return (
    t[0] !== n || t[1] !== i
      ? ((a = (0, k7.jsx)(h5, { container: i, children: n })), (t[0] = n), (t[1] = i), (t[2] = a))
      : (a = t[2]),
    a
  );
}
function iNi() {
  let e = (0, D7.c)(3),
    t = (0, O7.useContext)(v5)?.registerOpen,
    n,
    r;
  return (
    e[0] === t
      ? ((n = e[1]), (r = e[2]))
      : ((n = () => t?.()), (r = [t]), (e[0] = t), (e[1] = n), (e[2] = r)),
    (0, O7.useLayoutEffect)(n, r),
    null
  );
}
function nNi(e) {
  e.stopPropagation();
}
function ZMi(e) {
  let t = (0, D7.c)(13),
    n,
    r,
    i;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]))
    : (({ variant: i, className: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = i));
  let a = i === void 0 ? `default` : i,
    o = a === `promotional` && E7.promotionalTitle,
    s =
      a === `confirmation` &&
      `px-6 text-center text-heading-lg leading-7 font-semibold select-none`,
    c =
      (a === `expressiveBeacon` || a === `responsiveExpressiveBeacon`) && E7.expressiveBeaconTitle,
    l = a === `responsiveExpressiveBeacon` && E7.responsiveExpressiveBeaconTitle,
    u;
  t[4] !== n || t[5] !== o || t[6] !== s || t[7] !== c || t[8] !== l
    ? ((u = q(n, o, s, c, l)),
      (t[4] = n),
      (t[5] = o),
      (t[6] = s),
      (t[7] = c),
      (t[8] = l),
      (t[9] = u))
    : (u = t[9]);
  let d;
  return (
    t[10] !== r || t[11] !== u
      ? ((d = (0, k7.jsx)(Ov, { className: u, ...r })), (t[10] = r), (t[11] = u), (t[12] = d))
      : (d = t[12]),
    d
  );
}
function QMi(e) {
  let t = (0, D7.c)(2),
    n;
  return (t[0] === e ? (n = t[1]) : ((n = (0, k7.jsx)(kv, { ...e })), (t[0] = e), (t[1] = n)), n);
}
function qxi() {
  typeof window > `u` || window.dispatchEvent(new Event(b5));
}
 return {Dialog:XMi,DialogContent:tNi,DialogTrigger:eNi,DialogTitle:ZMi,DialogDescription:QMi,DialogOverlay:$Mi,DialogClose:Av,dialogWidthClass:YMi};
}
