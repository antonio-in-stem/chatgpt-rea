// Original menu surfaces and rows; underlying interaction primitives injected explicitly.
import {classNames as q} from './classNames.js';
export function createMenuSurfaces({React,primitives,Tooltip:w5,AssetIcon:t5,ScrollArea:sji,TooltipOverlayContext,PortalContainerContext,motion,AnimatePresence,formatMessage=message=>message.defaultMessage,visualScale=1,compilerRuntime=React.__COMPILER_RUNTIME}){
 for(const name of ['Trigger','Content','Item','Group'])if(!primitives?.[name])throw new TypeError('Missing menu primitive '+name);
 if(!w5||!t5||!sji||!compilerRuntime?.c)throw new TypeError('Menu surfaces require original tooltip, asset icon, scroll area and compiler runtime');
 const {Trigger:mb,Content:gb,Item:_b,Group:fNe,CheckboxItem:vb,RadioItem:bb,RadioGroup:yb,ItemIndicator:xb,SubTrigger:Sb,SubContent:Cb,Portal:hb}=primitives;
 const t=fn=>fn,o=()=>React,c=()=>compilerRuntime,Uf=()=>{},x5=()=>{},Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false}),m7=compilerRuntime,tji=compilerRuntime,h7=React,v5=TooltipOverlayContext??React.createContext(undefined);
 const g7={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},c7=g7,K=()=>g7,d7=g7,fji=compilerRuntime,LSi=compilerRuntime,RSi=React;
 const Qji=PortalContainerContext??React.createContext(undefined),d5=()=>visualScale,HMe=primitives,Yji=200,pS=message=>formatMessage(message);
 const missingMotion=()=>{throw new TypeError('Inline submenu requires motion and AnimatePresence');},$w=motion??{div:missingMotion},M1e=AnimatePresence??missingMotion;
 const uCi={duration:300/1e3,ease:[0.19,1,0.22,1]};
 const _7={maxWidth:'min(var(--radix-dropdown-menu-content-available-width), calc(100vw - 16px))',maxHeight:'min(var(--radix-dropdown-menu-content-available-height), calc(100vh - 16px))'};
 const $ji={..._7,maxHeight:'calc(100vh - 16px)'};
 let MAi,NAi,PAi,FAi,M5,jSi,MSi,NSi,PSi,dAi,fAi,d8n,_8n;
 let IAi,LAi,RAi,zAi,BAi,VAi,HAi,UAi,WAi,GAi,KAi,qAi,JAi,YAi,XAi,ZAi,o7,gji,_ji,vji,yji,f7,eMi,v7,tMi,nMi,uAi,r7,G6n,pji,mji;
function s7() {
  return (s7 = t(() => {
    ((IAi = `_itemBase_14z1j_2`),
      (LAi = `_itemInteractive_14z1j_2`),
      (RAi = `_leadingIcon_14z1j_2`),
      (zAi = `_singleLineRows_14z1j_2`),
      (BAi = `_miniIcon_14z1j_2`),
      (VAi = `_hintRow_14z1j_2`),
      (HAi = `_glassSurface_14z1j_2`),
      (UAi = `_glassSuggestionSurface_14z1j_2`),
      (WAi = `_comboboxRow_14z1j_2`),
      (GAi = `_suggestionMenu_14z1j_2`),
      (KAi = `_sectionLabel_14z1j_2`),
      (qAi = `_largeRows_14z1j_2`),
      (JAi = `_selectRows_14z1j_2`),
      (YAi = `_insetRows_14z1j_2`),
      (XAi = `_descriptiveRows_14z1j_2`),
      (ZAi = `_actionRows_14z1j_2`),
      (o7 = {
        itemBase: IAi,
        itemInteractive: LAi,
        leadingIcon: RAi,
        singleLineRows: zAi,
        miniIcon: BAi,
        hintRow: VAi,
        glassSurface: HAi,
        glassSuggestionSurface: UAi,
        comboboxRow: WAi,
        suggestionMenu: GAi,
        sectionLabel: KAi,
        largeRows: qAi,
        selectRows: JAi,
        insetRows: YAi,
        descriptiveRows: XAi,
        actionRows: ZAi,
      }));
  }))();
}
function bji() {
  return (bji = t(() => {
    ((gji = `_replacedContent_1ebbz_1`),
      (_ji = `_parentBottomAlignedContent_1ebbz_5`),
      (vji = `_scrollSection_1ebbz_12`),
      (yji = `_fixedSection_1ebbz_26`),
      (f7 = {
        replacedContent: gji,
        parentBottomAlignedContent: _ji,
        scrollSection: vji,
        fixedSection: yji,
      }));
  }))();
}
function DAi(e) {
  if (e === `chatgpt`)
    return `min-w-40 bg-surface-elevated-secondary text-default rounded-3xl py-2.5 shadow-(--shadow-dropdown-overlay)`;
  let t =
    e === `opaque`
      ? `bg-surface-elevated-secondary text-default shadow-(--shadow-dropdown-overlay)`
      : `bg-surface-elevated-secondary/90 text-default ring-(--color-border-overlay) ring-(length:--dropdown-overlay-ring-width) shadow-(--shadow-dropdown-overlay) backdrop-blur-sm`;
  return e === `panel`
    ? `${t} rounded-2xl p-4 shadow-2xl backdrop-blur-lg`
    : `${t} rounded-2xl p-[var(--app-menu-gutter,var(--spacing))]`;
}
function QAi(e) {
  let t = (0, tji.c)(17),
    {
      children: n,
      LeftIcon: r,
      leftIcon: i,
      iconSize: a,
      trailingContent: o,
      allowWrap: s,
      textOverflow: c,
      tooltipOverflowTarget: l,
    } = e,
    u = a === void 0 ? 16 : a,
    d = s !== void 0 && s,
    f = c === void 0 ? `ellipsis` : c,
    p = l !== void 0 && l,
    m;
  t[0] !== r || t[1] !== u || t[2] !== i
    ? ((m =
        i ??
        (r ? (0, c7.jsx)(r, { className: q(`shrink-0`, u === 20 ? `size-5` : `icon-xs`) }) : null)),
      (t[0] = r),
      (t[1] = u),
      (t[2] = i),
      (t[3] = m))
    : (m = t[3]);
  let h = m,
    g;
  t[4] === h
    ? (g = t[5])
    : ((g = h == null ? null : (0, c7.jsx)($Ai, { children: h })), (t[4] = h), (t[5] = g));
  let _ = p ? `` : void 0,
    v = d && `whitespace-normal`,
    y = !d && (f === `fade` ? `text-fade-truncate` : `truncate`),
    b;
  t[6] !== v || t[7] !== y
    ? ((b = q(`flex-1 min-w-0`, v, y)), (t[6] = v), (t[7] = y), (t[8] = b))
    : (b = t[8]);
  let x;
  t[9] !== n || t[10] !== b || t[11] !== _
    ? ((x = (0, c7.jsx)(`span`, { "data-tooltip-overflow-target": _, className: b, children: n })),
      (t[9] = n),
      (t[10] = b),
      (t[11] = _),
      (t[12] = x))
    : (x = t[12]);
  let S;
  return (
    t[13] !== x || t[14] !== g || t[15] !== o
      ? ((S = (0, c7.jsxs)(`div`, {
          "data-menu-row-content": !0,
          className: `flex w-full min-w-0 items-center gap-[var(--spacing-menu-item-content,calc(var(--spacing)*1.5))]`,
          children: [g, x, o],
        })),
        (t[13] = x),
        (t[14] = g),
        (t[15] = o),
        (t[16] = S))
      : (S = t[16]),
    S
  );
}
function $Ai(e) {
  let t = (0, tji.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, c7.jsx)(`span`, { className: o7.leadingIcon, children: n })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function Nji(e) {
  let t = (0, m7.c)(6),
    { children: n, className: r, size: i } = e,
    a = nMi[i === void 0 ? `sm` : i],
    o;
  t[0] !== r || t[1] !== a
    ? ((o = q(`inline-flex items-center justify-center leading-none`, a, v7.icon, r)),
      (t[0] = r),
      (t[1] = a),
      (t[2] = o))
    : (o = t[2]);
  let s;
  return (
    t[3] !== n || t[4] !== o
      ? ((s = (0, g7.jsx)(`span`, { className: o, children: n })),
        (t[3] = n),
        (t[4] = o),
        (t[5] = s))
      : (s = t[5]),
    s
  );
}
function Lji(e) {
  let t = e.closest(`[role="menu"]`);
  if (t == null) return [];
  let n = Array.from(
    t.querySelectorAll(
      `input, [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]`,
    ),
  );
  return n.slice(n.indexOf(e) + 1).filter((e) => {
    let t = e.getAttribute(`role`);
    return (
      (t === `menuitem` || t === `menuitemcheckbox` || t === `menuitemradio`) &&
      !e.hasAttribute(`data-disabled`) &&
      e.getAttribute(`aria-disabled`) !== `true`
    );
  });
}
function Eji(e) {
  return e.preventDefault();
}
function Tji(e) {
  return e.preventDefault();
}
function wji(e) {
  return e.preventDefault();
}
function xji(e) {
  let t = (0, m7.c)(14),
    n,
    r,
    i,
    a;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]), (a = t[4]))
    : (({ ref: i, disabled: r, className: n, ...a } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = i),
      (t[4] = a));
  let o = r || void 0,
    s = r ? `cursor-default opacity-25` : `cursor-interaction`,
    c;
  t[5] !== n || t[6] !== s
    ? ((c = q(`outline-hidden`, s, n)), (t[5] = n), (t[6] = s), (t[7] = c))
    : (c = t[7]);
  let l;
  return (
    t[8] !== r || t[9] !== i || t[10] !== a || t[11] !== o || t[12] !== c
      ? ((l = (0, g7.jsx)(mb, { ref: i, "aria-disabled": o, disabled: r, className: c, ...a })),
        (t[8] = r),
        (t[9] = i),
        (t[10] = a),
        (t[11] = o),
        (t[12] = c),
        (t[13] = l))
      : (l = t[13]),
    l
  );
}
function Sji(e) {
  "use forget";
  let t = (0, m7.c)(43),
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
    g;
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
      (g = t[15]))
    : (({
        children: r,
        className: i,
        align: n,
        maxWidth: u,
        onKeyDownCapture: a,
        sideOffset: d,
        size: f,
        rowLayout: c,
        surface: p,
        variant: m,
        scrollFade: h,
        scrollPeek: g,
        ref: o,
        style: l,
        ...s
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
      (t[15] = g));
  let _ = u === void 0 ? `default` : u,
    v = d === void 0 ? 1 : d,
    y = f === void 0 ? `default` : f,
    b = p === void 0 ? `menu` : p,
    x = m === void 0 ? `default` : m,
    S = h !== void 0 && h,
    C = g !== void 0 && g,
    w = (0, h7.useContext)(v5),
    T = _7.maxWidth;
  _ === `wide`
    ? (T = `min(var(--container-sm), var(--radix-dropdown-menu-content-available-width), calc(100vw - 16px))`)
    : b === `chatgpt` &&
      (T = `min(var(--container-xs), var(--radix-dropdown-menu-content-available-width), calc(100vw - 16px))`);
  let E = w?.id,
    D = S || C ? `overflow-hidden` : `overflow-y-auto`,
    O = x === `picker` ? `w-65 [--app-menu-gutter:0px]` : b === `panel` && `px-1 py-1`,
    k;
  t[16] !== i ||
  t[17] !== c ||
  t[18] !== y ||
  t[19] !== b ||
  t[20] !== O ||
  t[21] !== D ||
  t[22] !== x
    ? ((k = q(
        `no-drag z-50 m-px flex select-none flex-col`,
        D,
        O,
        DAi(b),
        x === `inset` && `px-2.5`,
        b === `glass` && o7.glassSurface,
        y === `large` && o7.largeRows,
        c === `single-line` && o7.singleLineRows,
        y === `descriptive` && o7.descriptiveRows,
        y === `select` && o7.selectRows,
        y === `inset` && o7.insetRows,
        y === `action` && o7.actionRows,
        i,
      )),
      (t[16] = i),
      (t[17] = c),
      (t[18] = y),
      (t[19] = b),
      (t[20] = O),
      (t[21] = D),
      (t[22] = x),
      (t[23] = k))
    : (k = t[23]);
  let A = n ?? `start`,
    j;
  t[24] === a
    ? (j = t[25])
    : ((j = (e) => {
        if (
          (a?.(e), e.defaultPrevented || (e.key !== `ArrowUp` && !(e.key === `Tab` && e.shiftKey)))
        )
          return;
        let t = e.currentTarget.querySelector(`input`),
          n = t == null ? void 0 : Lji(t)[0];
        e.target instanceof HTMLElement &&
          e.target.closest(
            `[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]`,
          ) === n &&
          (t?.focus(), e.preventDefault(), e.stopPropagation());
      }),
      (t[24] = a),
      (t[25] = j));
  let M;
  t[26] !== T || t[27] !== l
    ? ((M = { ..._7, maxWidth: T, ...l }), (t[26] = T), (t[27] = l), (t[28] = M))
    : (M = t[28]);
  let N;
  t[29] !== r || t[30] !== S || t[31] !== C
    ? ((N =
        S || C
          ? (0, g7.jsx)(sji, {
              className: `relative flex min-h-0 flex-col`,
              fade: C ? `none` : `overlay`,
              peekMenuItems: C,
              scrollClassName: `min-h-0 overflow-y-auto`,
              fadeClassName: `inset-x-0`,
              children: r,
            })
          : r),
      (t[29] = r),
      (t[30] = S),
      (t[31] = C),
      (t[32] = N))
    : (N = t[32]);
  let P;
  return (
    t[33] !== o ||
    t[34] !== s ||
    t[35] !== v ||
    t[36] !== k ||
    t[37] !== A ||
    t[38] !== j ||
    t[39] !== M ||
    t[40] !== N ||
    t[41] !== E
      ? ((P = (0, g7.jsx)(gb, {
          ref: o,
          "data-overlay-owner": E,
          className: k,
          align: A,
          collisionPadding: 6,
          onKeyDownCapture: j,
          sideOffset: v,
          style: M,
          ...s,
          children: N,
        })),
        (t[33] = o),
        (t[34] = s),
        (t[35] = v),
        (t[36] = k),
        (t[37] = A),
        (t[38] = j),
        (t[39] = M),
        (t[40] = N),
        (t[41] = E),
        (t[42] = P))
      : (P = t[42]),
    P
  );
}
function Cji(e) {
  "use forget";
  let t = (0, m7.c)(123),
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
    D,
    O,
    k,
    A,
    j,
    M,
    N,
    P,
    F,
    ee,
    te;
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
      (D = t[26]),
      (O = t[27]),
      (k = t[28]),
      (A = t[29]),
      (j = t[30]),
      (M = t[31]),
      (N = t[32]),
      (P = t[33]),
      (F = t[34]),
      (ee = t[35]),
      (te = t[36]))
    : (({
        asChild: a,
        children: o,
        LeftIcon: n,
        leftIconAsset: f,
        keyboardShortcut: u,
        leftIcon: d,
        leftIconClassName: p,
        RightIcon: r,
        rightIconAsset: v,
        rightIcon: _,
        rightIconClassName: y,
        rightText: b,
        className: s,
        onClick: m,
        onSelect: h,
        isActive: x,
        disabled: c,
        focusableWhenDisabled: S,
        href: l,
        SubText: i,
        tooltipText: F,
        tooltipOnBeforeOpen: j,
        tooltipVariant: te,
        tooltipDisabled: k,
        tooltipTextClassName: ee,
        tooltipInteractive: A,
        tooltipSide: N,
        tooltipSideOffset: P,
        tooltipAlign: O,
        tooltipOpenWhen: M,
        tone: C,
        variant: w,
        allowWrap: T,
        subTextAllowWrap: E,
        textOverflow: D,
        ...g
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
      (t[26] = D),
      (t[27] = O),
      (t[28] = k),
      (t[29] = A),
      (t[30] = j),
      (t[31] = M),
      (t[32] = N),
      (t[33] = P),
      (t[34] = F),
      (t[35] = ee),
      (t[36] = te));
  let ne = x !== void 0 && x,
    re = S !== void 0 && S,
    I = C === void 0 ? `default` : C,
    L = w === void 0 ? `default` : w,
    R = T !== void 0 && T,
    ie = E !== void 0 && E,
    ae = D === void 0 ? `ellipsis` : D,
    oe = I === `danger` || I === `destructive`,
    se = a && h7.isValidElement(o) ? o : null,
    ce = se?.props.href ?? l,
    le = ce ? `a` : `div`,
    ue = !!c && re,
    de = L === `display`,
    fe = de || L === `detail`,
    pe = L !== `label` && !de && !c && (!!ce || !!m || !!h),
    me = se == null ? o : se.props.children,
    he,
    ge;
  if (t[37] !== me) {
    let e = h7.Children.toArray(me);
    ((he = h7.isValidElement(e[0]) && e[0].type === Nji ? e[0] : null),
      (ge = he ? e.slice(1) : me),
      (t[37] = me),
      (t[38] = he),
      (t[39] = ge));
  } else ((he = t[38]), (ge = t[39]));
  let _e = ge,
    ve = i == null ? `icon-xs` : `icon-sm`,
    ye;
  t[40] !== n || t[41] !== ve || t[42] !== he || t[43] !== d || t[44] !== f || t[45] !== p
    ? ((ye =
        d ??
        he ??
        (f ? (0, g7.jsx)(t5, { className: q(p, v7.icon), "aria-hidden": !1, asset: f }) : null) ??
        (n ? (0, g7.jsx)(n, { className: q(p ?? ve, v7.icon) }) : null)),
      (t[40] = n),
      (t[41] = ve),
      (t[42] = he),
      (t[43] = d),
      (t[44] = f),
      (t[45] = p),
      (t[46] = ye))
    : (ye = t[46]);
  let be = ye,
    xe = y ?? `icon-xs`,
    Se;
  t[47] === xe ? (Se = t[48]) : ((Se = q(xe, v7.icon)), (t[47] = xe), (t[48] = Se));
  let Ce = Se,
    we;
  t[49] !== r || t[50] !== _ || t[51] !== v || t[52] !== y || t[53] !== Ce
    ? ((we =
        _ ??
        (v ? (0, g7.jsx)(t5, { className: q(y, v7.icon), "aria-hidden": !1, asset: v }) : null) ??
        (r ? (0, g7.jsx)(r, { className: Ce }) : null)),
      (t[49] = r),
      (t[50] = _),
      (t[51] = v),
      (t[52] = y),
      (t[53] = Ce),
      (t[54] = we))
    : (we = t[54]);
  let Te = we,
    Ee;
  t[55] !== u || t[56] !== Te || t[57] !== b
    ? ((Ee =
        u || Te || b != null
          ? (0, g7.jsxs)(g7.Fragment, {
              children: [
                u
                  ? (0, g7.jsx)(`span`, {
                      className: `ms-2 shrink-0 text-xs text-codex-description`,
                      children: u,
                    })
                  : null,
                b == null
                  ? null
                  : (0, g7.jsx)(`span`, { className: q(`shrink-0`, !Te && `pe-1`), children: b }),
                Te,
              ],
            })
          : null),
      (t[55] = u),
      (t[56] = Te),
      (t[57] = b),
      (t[58] = Ee))
    : (Ee = t[58]);
  let De = Ee,
    Oe;
  t[59] !== i ||
  t[60] !== R ||
  t[61] !== be ||
  t[62] !== _e ||
  t[63] !== ie ||
  t[64] !== ae ||
  t[65] !== M ||
  t[66] !== De
    ? ((Oe =
        i == null
          ? (0, g7.jsx)(QAi, {
              allowWrap: R,
              leftIcon: be,
              textOverflow: ae,
              tooltipOverflowTarget: M === `trigger-overflows`,
              trailingContent: De,
              children: _e,
            })
          : (0, g7.jsxs)(`div`, {
              "data-menu-row-content": !0,
              className: v7.content,
              children: [
                be == null
                  ? null
                  : (0, g7.jsx)(`span`, { className: o7.leadingIcon, children: be }),
                (0, g7.jsxs)(`div`, {
                  className: `flex min-w-0 flex-1 flex-col`,
                  children: [
                    (0, g7.jsx)(`span`, {
                      "data-tooltip-overflow-target": M === `trigger-overflows` ? `` : void 0,
                      className: q(
                        `min-w-0`,
                        R && `whitespace-normal`,
                        !R && (ae === `fade` ? `text-fade-truncate` : `truncate`),
                      ),
                      children: _e,
                    }),
                    (0, g7.jsx)(`span`, {
                      className: q(
                        `min-w-0 text-xs leading-dense text-tertiary`,
                        ie ? `whitespace-normal` : `truncate`,
                      ),
                      children: i,
                    }),
                  ],
                }),
                De,
              ],
            })),
      (t[59] = i),
      (t[60] = R),
      (t[61] = be),
      (t[62] = _e),
      (t[63] = ie),
      (t[64] = ae),
      (t[65] = M),
      (t[66] = De),
      (t[67] = Oe))
    : (Oe = t[67]);
  let ke = Oe,
    Ae = se?.props.className,
    je = L === "default" && ce && `focus:!outline-none`,
    Me;
  t[68] !== ce || t[69] !== oe || t[70] !== I || t[71] !== L
    ? ((Me = L === "default" &&
        ce && [
          oe && `!text-danger`,
          I === `warning` && `!text-warning`,
          I === "default" && `!text-default`,
        ]),
      (t[68] = ce),
      (t[69] = oe),
      (t[70] = I),
      (t[71] = L),
      (t[72] = Me))
    : (Me = t[72]);
  let Ne = (L === "default" || L === `hint`) && `flex flex-col`,
    Pe;
  t[73] !== Ae || t[74] !== je || t[75] !== Me || t[76] !== Ne
    ? ((Pe = q(Ae, je, Me, Ne)),
      (t[73] = Ae),
      (t[74] = je),
      (t[75] = Me),
      (t[76] = Ne),
      (t[77] = Pe))
    : (Pe = t[77]);
  let Fe;
  t[78] !== ke || t[79] !== Pe
    ? ((Fe = { className: Pe, children: ke }), (t[78] = ke), (t[79] = Pe), (t[80] = Fe))
    : (Fe = t[80]);
  let Ie = Fe,
    Le = fe ? `surface` : `default`,
    Re;
  t[81] !== s ||
  t[82] !== c ||
  t[83] !== ne ||
  t[84] !== oe ||
  t[85] !== fe ||
  t[86] !== pe ||
  t[87] !== I ||
  t[88] !== L
    ? ((Re = q(
        `no-drag`,
        L !== `unstyled` && [v7.itemBase, fe ? `rounded-md` : `rounded-xl`],
        L === `label` && `cursor-default select-text text-codex-description`,
        fe && [
          `select-none text-default`,
          pe ? `cursor-interaction` : `cursor-default`,
          !c && `hover:bg-primary-ghost-hover focus:bg-primary-ghost-hover`,
        ],
        (L === "default" || L === `hint`) && [
          oe && `text-danger`,
          I === `warning` && `text-warning`,
          I === "default" && (L === `hint` ? `text-tertiary` : `text-default`),
          ne && `bg-primary-ghost-hover`,
          c
            ? `cursor-default opacity-50`
            : pe &&
              (I === `destructive`
                ? `group hover:bg-danger-soft-alpha focus:bg-danger-soft-alpha cursor-interaction`
                : v7.itemInteractive),
        ],
        L === `hint` && [o7.hintRow, `select-none`],
        L === `unstyled` && (c ? `cursor-default` : pe && `group cursor-interaction`),
        s,
      )),
      (t[81] = s),
      (t[82] = c),
      (t[83] = ne),
      (t[84] = oe),
      (t[85] = fe),
      (t[86] = pe),
      (t[87] = I),
      (t[88] = L),
      (t[89] = Re))
    : (Re = t[89]);
  let ze = ne ? `true` : void 0,
    Be = c || de || void 0,
    Ve;
  t[90] !== c || t[91] !== de || t[92] !== m
    ? ((Ve = (e) => {
        if (de) {
          e.preventDefault();
          return;
        }
        c || m?.(e);
      }),
      (t[90] = c),
      (t[91] = de),
      (t[92] = m),
      (t[93] = Ve))
    : (Ve = t[93]);
  let He = ue || L === `label` || de ? Eji : c ? void 0 : h,
    Ue = c && !re,
    We;
  t[94] !== le || t[95] !== Ie || t[96] !== c || t[97] !== ce || t[98] !== de || t[99] !== se
    ? ((We =
        se == null
          ? (0, g7.jsx)(le, { href: ce, ...Ie })
          : h7.cloneElement(se, {
              ...Ie,
              onClick: c || de ? Tji : se.props.onClick,
              onAuxClick: c || de ? wji : se.props.onAuxClick,
            })),
      (t[94] = le),
      (t[95] = Ie),
      (t[96] = c),
      (t[97] = ce),
      (t[98] = de),
      (t[99] = se),
      (t[100] = We))
    : (We = t[100]);
  let Ge;
  t[101] !== g ||
  t[102] !== Re ||
  t[103] !== ze ||
  t[104] !== Be ||
  t[105] !== Ve ||
  t[106] !== He ||
  t[107] !== Ue ||
  t[108] !== We
    ? ((Ge = (0, g7.jsx)(_b, {
        asChild: !0,
        className: Re,
        "aria-current": ze,
        "aria-disabled": Be,
        onClick: Ve,
        onSelect: He,
        disabled: Ue,
        ...g,
        children: We,
      })),
      (t[101] = g),
      (t[102] = Re),
      (t[103] = ze),
      (t[104] = Be),
      (t[105] = Ve),
      (t[106] = He),
      (t[107] = Ue),
      (t[108] = We),
      (t[109] = Ge))
    : (Ge = t[109]);
  let Ke;
  return (
    t[110] !== Le ||
    t[111] !== Ge ||
    t[112] !== O ||
    t[113] !== k ||
    t[114] !== A ||
    t[115] !== j ||
    t[116] !== M ||
    t[117] !== N ||
    t[118] !== P ||
    t[119] !== F ||
    t[120] !== ee ||
    t[121] !== te
      ? ((Ke = (0, g7.jsx)(eMi, {
          color: Le,
          tooltipText: F,
          tooltipOnBeforeOpen: j,
          tooltipVariant: te,
          tooltipDisabled: k,
          tooltipTextClassName: ee,
          tooltipInteractive: A,
          tooltipSide: N,
          tooltipSideOffset: P,
          tooltipAlign: O,
          tooltipOpenWhen: M,
          children: Ge,
        })),
        (t[110] = Le),
        (t[111] = Ge),
        (t[112] = O),
        (t[113] = k),
        (t[114] = A),
        (t[115] = j),
        (t[116] = M),
        (t[117] = N),
        (t[118] = P),
        (t[119] = F),
        (t[120] = ee),
        (t[121] = te),
        (t[122] = Ke))
      : (Ke = t[122]),
    Ke
  );
}
function Rji(e) {
  "use forget";
  let t = (0, m7.c)(11),
    { className: n, paddingClassName: r, variant: i } = e,
    a = r === void 0 ? `py-[var(--app-menu-separator-gutter,var(--spacing))]` : r,
    o = i === void 0 ? `default` : i,
    s;
  t[0] !== n || t[1] !== a || t[2] !== o
    ? ((s = q(
        `w-full`,
        o === `chatgpt`
          ? `px-4 py-1`
          : [`px-[var(--app-menu-separator-inset,var(--padding-row-x))]`, a],
        n,
      )),
      (t[0] = n),
      (t[1] = a),
      (t[2] = o),
      (t[3] = s))
    : (s = t[3]);
  let c = o === `chatgpt` ? `bg-border-subtle` : `bg-border`,
    l;
  t[4] === c ? (l = t[5]) : ((l = q(`h-px w-full`, c)), (t[4] = c), (t[5] = l));
  let u;
  t[6] === l ? (u = t[7]) : ((u = (0, g7.jsx)(`div`, { className: l })), (t[6] = l), (t[7] = u));
  let d;
  return (
    t[8] !== s || t[9] !== u
      ? ((d = (0, g7.jsx)(`div`, { className: s, children: u })),
        (t[8] = s),
        (t[9] = u),
        (t[10] = d))
      : (d = t[10]),
    d
  );
}
function zji(e) {
  let t = (0, m7.c)(5),
    { children: n, className: r } = e,
    i;
  t[0] === r ? (i = t[1]) : ((i = q(o7.sectionLabel, r)), (t[0] = r), (t[1] = i));
  let a;
  return (
    t[2] !== n || t[3] !== i
      ? ((a = (0, g7.jsx)(`div`, { "data-menu-section-label": !0, className: i, children: n })),
        (t[2] = n),
        (t[3] = i),
        (t[4] = a))
      : (a = t[4]),
    a
  );
}
function Bji(e) {
  "use forget";
  let t = (0, m7.c)(12),
    { children: n, className: r, tone: i, compact: a, centered: o, role: s, variant: c } = e,
    l = i === void 0 ? `muted` : i,
    u = a !== void 0 && a,
    d = o !== void 0 && o,
    f = c === void 0 ? `default` : c,
    p =
      f === `inset` &&
      `m-1 flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-default p-3 text-center text-sm`,
    m = f === `chatgpt` && `mx-1.5 px-2.5 py-2.5 text-xs leading-4`,
    h;
  t[0] !== d || t[1] !== r || t[2] !== u || t[3] !== p || t[4] !== m || t[5] !== l || t[6] !== f
    ? ((h = q(
        p,
        m,
        f === "default" && [tMi.messageBase, u ? `py-2` : `py-3`],
        l === `error` && `text-danger`,
        l === `muted` && (f === `chatgpt` ? `text-tertiary` : `text-codex-description`),
        d && `self-center text-center`,
        r,
      )),
      (t[0] = d),
      (t[1] = r),
      (t[2] = u),
      (t[3] = p),
      (t[4] = m),
      (t[5] = l),
      (t[6] = f),
      (t[7] = h))
    : (h = t[7]);
  let g;
  return (
    t[8] !== n || t[9] !== s || t[10] !== h
      ? ((g = (0, g7.jsx)(`div`, { role: s, className: h, children: n })),
        (t[8] = n),
        (t[9] = s),
        (t[10] = h),
        (t[11] = g))
      : (g = t[11]),
    g
  );
}
function Kji(e) {
  let t = (0, m7.c)(5),
    { children: n, className: r } = e,
    i;
  t[0] === r
    ? (i = t[1])
    : ((i = q(
        `text-codex-description flex min-h-6 items-center truncate px-row-x py-row-y text-sm leading-4`,
        r,
      )),
      (t[0] = r),
      (t[1] = i));
  let a;
  return (
    t[2] !== n || t[3] !== i
      ? ((a = (0, g7.jsx)(`div`, { className: i, children: n })),
        (t[2] = n),
        (t[3] = i),
        (t[4] = a))
      : (a = t[4]),
    a
  );
}
function Jji(e) {
  "use forget";
  let t = (0, m7.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, g7.jsx)(fNe, {
          className: `before:mx-4 before:my-1 before:block before:h-px before:bg-border first:before:hidden empty:hidden [:not(:has(div:not([role=group])))]:hidden [&:nth-child(1_of_:has(div:not([role=group])))]:before:hidden`,
          children: n,
        })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function qji(e) {
  let t = (0, m7.c)(8),
    { children: n, className: r, size: i } = e,
    a = i != null && `flex min-h-0 flex-col overflow-y-auto text-sm`,
    o = i != null && f7.scrollSection,
    s = i === `five-rows` && f7.fixedSection,
    c;
  t[0] !== r || t[1] !== a || t[2] !== o || t[3] !== s
    ? ((c = q(a, o, s, r)), (t[0] = r), (t[1] = a), (t[2] = o), (t[3] = s), (t[4] = c))
    : (c = t[4]);
  let l;
  return (
    t[5] !== n || t[6] !== c
      ? ((l = (0, g7.jsx)(`div`, { className: c, children: n })),
        (t[5] = n),
        (t[6] = c),
        (t[7] = l))
      : (l = t[7]),
    l
  );
}
function Dji(e) {
  let t = (0, m7.c)(52),
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
    f;
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
      (f = t[11]))
    : (({
        children: i,
        closeOnSelect: d,
        checked: r,
        className: a,
        disabled: o,
        href: s,
        indicator: f,
        leftIcon: c,
        onSelect: l,
        SubText: n,
        ...u
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
      (t[11] = f));
  let p = d !== void 0 && d,
    m = f === void 0 ? `checkmark` : f,
    h,
    g;
  if (t[12] !== i) {
    let e = h7.Children.toArray(i);
    ((h = h7.isValidElement(e[0]) && e[0].type === Nji ? e[0] : null),
      (g = h ? e.slice(1) : i),
      (t[12] = i),
      (t[13] = h),
      (t[14] = g));
  } else ((h = t[13]), (g = t[14]));
  let _ = g,
    v;
  t[15] !== h || t[16] !== c
    ? ((v =
        c != null || h != null
          ? (0, g7.jsx)(`span`, { className: o7.leadingIcon, children: c ?? h })
          : null),
      (t[15] = h),
      (t[16] = c),
      (t[17] = v))
    : (v = t[17]);
  let y;
  t[18] === _
    ? (y = t[19])
    : ((y = (0, g7.jsx)(`span`, { className: `truncate`, children: _ })), (t[18] = _), (t[19] = y));
  let b;
  t[20] === n
    ? (b = t[21])
    : ((b =
        n == null
          ? null
          : (0, g7.jsx)(`span`, {
              className: `text-xs leading-dense whitespace-normal text-tertiary`,
              children: n,
            })),
      (t[20] = n),
      (t[21] = b));
  let x;
  t[22] !== y || t[23] !== b
    ? ((x = (0, g7.jsxs)(`div`, { className: `flex min-w-0 flex-1 flex-col`, children: [y, b] })),
      (t[22] = y),
      (t[23] = b),
      (t[24] = x))
    : (x = t[24]);
  let S;
  t[25] !== r || t[26] !== m
    ? ((S =
        m === `switch`
          ? (0, g7.jsx)(dji, { checked: r === !0, size: `sm` })
          : (0, g7.jsx)(`span`, {
              className: `icon-xs shrink-0`,
              children: (0, g7.jsx)(xb, { children: (0, g7.jsx)(r7, { className: `icon-xs` }) }),
            })),
      (t[25] = r),
      (t[26] = m),
      (t[27] = S))
    : (S = t[27]);
  let C;
  t[28] !== v || t[29] !== x || t[30] !== S
    ? ((C = (0, g7.jsxs)(`div`, {
        "data-menu-row-content": !0,
        className: v7.content,
        children: [v, x, S],
      })),
      (t[28] = v),
      (t[29] = x),
      (t[30] = S),
      (t[31] = C))
    : (C = t[31]);
  let w = C,
    T = s != null,
    E = s != null && `focus:!outline-none !text-default`,
    D = o ? `cursor-default opacity-50` : v7.itemInteractive,
    O;
  t[32] !== a || t[33] !== E || t[34] !== D
    ? ((O = q(`no-drag flex flex-col`, v7.itemBase, `rounded-xl text-default`, E, D, a)),
      (t[32] = a),
      (t[33] = E),
      (t[34] = D),
      (t[35] = O))
    : (O = t[35]);
  let k;
  t[36] !== p || t[37] !== s || t[38] !== l
    ? ((k = (e) => {
        (s == null && !p && e.preventDefault(), l?.(e));
      }),
      (t[36] = p),
      (t[37] = s),
      (t[38] = l),
      (t[39] = k))
    : (k = t[39]);
  let A;
  t[40] !== o || t[41] !== s || t[42] !== w
    ? ((A =
        s == null
          ? w
          : (0, g7.jsx)(`a`, {
              href: s,
              onAuxClick: o ? kji : void 0,
              onClick: o ? Oji : void 0,
              children: w,
            })),
      (t[40] = o),
      (t[41] = s),
      (t[42] = w),
      (t[43] = A))
    : (A = t[43]);
  let j;
  return (
    t[44] !== r ||
    t[45] !== o ||
    t[46] !== u ||
    t[47] !== T ||
    t[48] !== O ||
    t[49] !== k ||
    t[50] !== A
      ? ((j = (0, g7.jsx)(vb, {
          asChild: T,
          className: O,
          checked: r,
          disabled: o,
          onSelect: k,
          ...u,
          children: A,
        })),
        (t[44] = r),
        (t[45] = o),
        (t[46] = u),
        (t[47] = T),
        (t[48] = O),
        (t[49] = k),
        (t[50] = A),
        (t[51] = j))
      : (j = t[51]),
    j
  );
}
function Aji(e) {
  "use forget";
  let t = (0, m7.c)(35),
    n,
    r,
    i,
    a,
    o,
    s,
    c,
    l,
    u;
  t[0] === e
    ? ((n = t[1]),
      (r = t[2]),
      (i = t[3]),
      (a = t[4]),
      (o = t[5]),
      (s = t[6]),
      (c = t[7]),
      (l = t[8]),
      (u = t[9]))
    : (({
        asChild: r,
        children: i,
        className: a,
        disabled: o,
        href: s,
        icon: c,
        SubText: n,
        variant: u,
        ...l
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
      (t[9] = u));
  let d = u === void 0 ? `default` : u,
    f = d === `icon` || d === `swatch`,
    p;
  t[10] !== n || t[11] !== i || t[12] !== c || t[13] !== f || t[14] !== d
    ? ((p = f
        ? i
        : (0, g7.jsxs)(`div`, {
            className: d === `chatgpt` ? `flex items-center gap-1.5` : v7.content,
            children: [
              c,
              (0, g7.jsxs)(`div`, {
                className: q(`flex min-w-0 flex-1 flex-col`, d === "default" && `gap-1`),
                children: [
                  (0, g7.jsx)(`span`, {
                    className: q(`whitespace-normal`, d === "default" && `font-medium`),
                    children: i,
                  }),
                  n != null && d !== `descriptive`
                    ? (0, g7.jsx)(`span`, {
                        className: q(
                          `text-xs whitespace-normal`,
                          d === `chatgpt`
                            ? `leading-4 text-secondary`
                            : `leading-dense text-tertiary`,
                        ),
                        children: n,
                      })
                    : null,
                ],
              }),
              (0, g7.jsx)(`span`, {
                className: d === `chatgpt` ? `size-4 shrink-0` : `icon-sm shrink-0`,
                children: (0, g7.jsx)(xb, {
                  children:
                    d === `chatgpt`
                      ? (0, g7.jsx)(b$, {})
                      : (0, g7.jsx)(r7, { className: `icon-sm` }),
                }),
              }),
            ],
          })),
      (t[10] = n),
      (t[11] = i),
      (t[12] = c),
      (t[13] = f),
      (t[14] = d),
      (t[15] = p))
    : (p = t[15]);
  let m = p,
    h;
  t[16] !== n || t[17] !== m || t[18] !== d
    ? ((h =
        d === `descriptive`
          ? (0, g7.jsxs)(`div`, {
              className: `flex w-full min-w-0 flex-col gap-1`,
              children: [
                m,
                n != null &&
                  (0, g7.jsx)(`span`, {
                    className: `text-xs leading-dense whitespace-normal text-tertiary`,
                    children: n,
                  }),
              ],
            })
          : m),
      (t[16] = n),
      (t[17] = m),
      (t[18] = d),
      (t[19] = h))
    : (h = t[19]);
  let g = h,
    _;
  t[20] !== a || t[21] !== o || t[22] !== f || t[23] !== d
    ? ((_ = q(
        f
          ? [
              `no-drag flex size-9 items-center justify-center rounded-full p-0 text-default outline-hidden focus-visible:ring-2 focus-visible:ring-ring`,
              o ? `cursor-default opacity-50` : `cursor-interaction`,
              d === `icon` &&
                `data-highlighted:bg-primary-ghost-hover data-[state=checked]:bg-primary-ghost-hover data-[state=checked]:ring-1 data-[state=checked]:ring-border`,
            ]
          : [
              `no-drag`,
              d === `chatgpt`
                ? `mx-1.5 rounded-lg px-2.5 py-2 text-sm leading-5 outline-none`
                : [v7.itemBase, `rounded-xl`],
              `text-default`,
              o && `cursor-default opacity-50`,
              !o &&
                (d === `chatgpt`
                  ? `cursor-interaction data-[highlighted]:bg-primary-ghost-hover`
                  : v7.itemInteractive),
            ],
        a,
      )),
      (t[20] = a),
      (t[21] = o),
      (t[22] = f),
      (t[23] = d),
      (t[24] = _))
    : (_ = t[24]);
  let v = s != null || r,
    y;
  t[25] !== o || t[26] !== s || t[27] !== g
    ? ((y =
        s == null
          ? g
          : (0, g7.jsx)(`a`, {
              href: s,
              onAuxClick: o ? Mji : void 0,
              onClick: o ? jji : void 0,
              children: g,
            })),
      (t[25] = o),
      (t[26] = s),
      (t[27] = g),
      (t[28] = y))
    : (y = t[28]);
  let b;
  return (
    t[29] !== o || t[30] !== l || t[31] !== _ || t[32] !== v || t[33] !== y
      ? ((b = (0, g7.jsx)(bb, { className: _, disabled: o, ...l, asChild: v, children: y })),
        (t[29] = o),
        (t[30] = l),
        (t[31] = _),
        (t[32] = v),
        (t[33] = y),
        (t[34] = b))
      : (b = t[34]),
    b
  );
}
function Oji(e) {
  return e.preventDefault();
}
function kji(e) {
  return e.preventDefault();
}
function jji(e) {
  return e.preventDefault();
}
function Mji(e) {
  return e.preventDefault();
}
function dji(e) {
  let t = (0, fji.c)(16),
    { checked: n, size: r, tone: i, trackClassName: a, thumbClassName: o } = e,
    s = r === void 0 ? `default` : r,
    c = i === void 0 ? `accent` : i,
    l = n ? `checked` : `unchecked`,
    u = n && (c === `neutral` ? `bg-text` : `bg-chart-blue`),
    d = !n && `bg-text/10`,
    f = pji[s],
    p;
  t[0] !== u || t[1] !== d || t[2] !== f || t[3] !== a
    ? ((p = q(
        `relative inline-flex shrink-0 items-center rounded-full transition-colors duration-basic ease-out`,
        u,
        d,
        f,
        a,
      )),
      (t[0] = u),
      (t[1] = d),
      (t[2] = f),
      (t[3] = a),
      (t[4] = p))
    : (p = t[4]);
  let m =
      c === `neutral` && n
        ? `border-transparent bg-surface`
        : `border-control-thumb-on-accent bg-control-thumb-on-accent`,
    h = mji[s],
    g;
  t[5] !== m || t[6] !== h || t[7] !== o
    ? ((g = q(
        `rounded-full border shadow-sm transition-transform duration-basic ease-out data-[state=unchecked]:translate-x-0`,
        m,
        h,
        o,
      )),
      (t[5] = m),
      (t[6] = h),
      (t[7] = o),
      (t[8] = g))
    : (g = t[8]);
  let _;
  t[9] !== l || t[10] !== g
    ? ((_ = (0, d7.jsx)(`span`, { className: g, "data-state": l })),
      (t[9] = l),
      (t[10] = g),
      (t[11] = _))
    : (_ = t[11]);
  let v;
  return (
    t[12] !== l || t[13] !== _ || t[14] !== p
      ? ((v = (0, d7.jsx)(`span`, {
          "aria-hidden": !0,
          className: p,
          "data-state": l,
          children: _,
        })),
        (t[12] = l),
        (t[13] = _),
        (t[14] = p),
        (t[15] = v))
      : (v = t[15]),
    v
  );
}
function i7() {
  return (i7 = t(() => {
    (o(),
      (uAi = K()),
      (r7 = (e) =>
        (0, uAi.jsx)(`svg`, {
          width: 17,
          height: 17,
          viewBox: `0 0 17 17`,
          fill: `none`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: (0, uAi.jsx)(`path`, {
            d: `M12.8961 3.64101C13.1297 3.41418 13.4984 3.37523 13.7779 3.56581C14.0571 3.75635 14.1554 4.11331 14.0299 4.41347L13.9615 4.53847L7.71151 13.7045C7.59411 13.8767 7.4063 13.9877 7.19881 14.0072C6.99136 14.0267 6.78564 13.9533 6.63826 13.806L2.88826 10.056L2.79842 9.9457C2.6192 9.67407 2.64927 9.30496 2.88826 9.06581C3.12738 8.82669 3.49647 8.79676 3.76815 8.97597L3.8785 9.06581L7.03084 12.2182L12.8053 3.74941L12.8961 3.64101Z`,
            fill: `currentColor`,
          }),
        })));
  }))();
}
function K6n() {
  return (K6n = t(() => {
    (Q(),
      (G6n = Z({
        name: `checkmark-md-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 3.474655, y: 3.803467, width: 9.046768, height: 8.309814 },
          visualBounds: { x: 3.474655, y: 3.803467, width: 9.046768, height: 8.309814 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 3.474655, y: 3.803467, width: 9.046768, height: 8.309814 },
          center: { x: 7.998039, y: 7.958374 },
          insets: { top: 3.803467, right: 3.478577, bottom: 3.886719, left: 3.474655 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.998039, y: 7.958374 },
            foreground: { x: 7.998039, y: 7.958374 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M11.5624 4.0338C11.7255 3.79403 12.0522 3.73111 12.2919 3.89415C12.5314 4.05717 12.5933 4.38398 12.4306 4.62364L7.539 11.818C7.30083 12.1681 6.80219 12.215 6.50286 11.9156L3.62786 9.03478C3.4231 8.82953 3.42363 8.4964 3.62884 8.29161C3.8341 8.08683 4.16722 8.08733 4.372 8.29259L6.92474 10.8512L11.5624 4.0338Z" fill="currentColor"/>`,
      })));
  }))();
}
function Wji(e) {
  let t = (0, m7.c)(34),
    { trigger: n, children: r, isDefaultOpen: i, onOpenChange: a } = e,
    o = i !== void 0 && i,
    s = n.props.disabled ?? !1,
    [c, l] = (0, h7.useState)(!s && o),
    u = c && !s,
    d;
  if (t[0] !== s || t[1] !== u || t[2] !== a || t[3] !== n) {
    let e;
    t[5] !== s || t[6] !== u || t[7] !== a || t[8] !== n.props
      ? ((e = (e) => {
          (n.props.onSelect?.(e),
            !e.defaultPrevented &&
              (e.preventDefault(), e.stopPropagation(), !s && (l(!u), a?.(!u))));
        }),
        (t[5] = s),
        (t[6] = u),
        (t[7] = a),
        (t[8] = n.props),
        (t[9] = e))
      : (e = t[9]);
    let r = u && `rotate-90`,
      i;
    t[10] === r
      ? (i = t[11])
      : ((i = q(`inline-flex items-center justify-center text-tertiary`, r)),
        (t[10] = r),
        (t[11] = i));
    let o = n.props.rightIconClassName ?? `icon-xs`,
      c;
    t[12] === o ? (c = t[13]) : ((c = q(o, v7.icon)), (t[12] = o), (t[13] = c));
    let f;
    t[14] === c
      ? (f = t[15])
      : ((f = (0, g7.jsx)(fAi, { className: c })), (t[14] = c), (t[15] = f));
    let p;
    t[16] !== i || t[17] !== f
      ? ((p = (0, g7.jsx)(`span`, { "aria-hidden": !0, className: i, children: f })),
        (t[16] = i),
        (t[17] = f),
        (t[18] = p))
      : (p = t[18]);
    let m;
    (t[19] !== e || t[20] !== p
      ? ((m = { onSelect: e, rightIcon: p }), (t[19] = e), (t[20] = p), (t[21] = m))
      : (m = t[21]),
      (d = h7.cloneElement(n, m)),
      (t[0] = s),
      (t[1] = u),
      (t[2] = a),
      (t[3] = n),
      (t[4] = d));
  } else d = t[4];
  let f = d,
    p = u ? `open` : `closed`,
    m = u ? void 0 : `pointer-events-none invisible h-0 overflow-hidden`,
    h;
  t[22] !== r || t[23] !== u
    ? ((h =
        u &&
        (0, g7.jsx)(
          $w.div,
          {
            initial: !1,
            animate: { height: `auto`, opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: uCi,
            className: `overflow-hidden`,
            children: r,
          },
          `dropdown-submenu`,
        )),
      (t[22] = r),
      (t[23] = u),
      (t[24] = h))
    : (h = t[24]);
  let g;
  t[25] === h
    ? (g = t[26])
    : ((g = (0, g7.jsx)(M1e, { initial: !1, children: h })), (t[25] = h), (t[26] = g));
  let _;
  t[27] !== m || t[28] !== g
    ? ((_ = (0, g7.jsx)(`div`, { className: m, children: g })),
      (t[27] = m),
      (t[28] = g),
      (t[29] = _))
    : (_ = t[29]);
  let v;
  return (
    t[30] !== f || t[31] !== p || t[32] !== _
      ? ((v = (0, g7.jsxs)(`div`, {
          className: `flex flex-col`,
          "data-state": p,
          children: [f, _],
        })),
        (t[30] = f),
        (t[31] = p),
        (t[32] = _),
        (t[33] = v))
      : (v = t[33]),
    v
  );
}
function Gji(e) {
  "use forget";
  let t = (0, m7.c)(65),
    {
      ref: n,
      "aria-current": r,
      ariaLabel: i,
      label: a,
      allowWrap: o,
      children: s,
      LeftIcon: c,
      leftIcon: l,
      leftIconAsset: u,
      leftIconClassName: d,
      className: f,
      disabled: p,
      align: m,
      alignToParentBottom: h,
      contentClassName: g,
      contentWidth: _,
      contentSurface: v,
      onSelect: y,
      triggerContent: b,
      rightIcon: x,
      tooltipText: S,
      tooltipDisabled: C,
      tooltipTextClassName: w,
      tooltipSide: T,
      tooltipSideOffset: E,
      tooltipAlign: D,
      tooltipOpenWhen: O,
      open: k,
      onOpenChange: A,
      onEscapeKeyDown: j,
      variant: M,
    } = e,
    N = o !== void 0 && o,
    P = p !== void 0 && p,
    F = m === void 0 ? `start` : m,
    ee = v === void 0 ? `menu` : v,
    te = M === void 0 ? `default` : M,
    ne = h7.useContext(Qji),
    re = d5(),
    I = ISi(`not all`),
    L = (0, h7.useContext)(v5),
    [R, ie] = (0, h7.useState)(null),
    [ae, oe] = (0, h7.useState)(!1),
    se = !P && (k ?? ae),
    ce = (0, h7.useRef)(!1),
    le = (0, h7.useRef)(null),
    ue = (0, h7.useRef)(null),
    de;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((de = () => () => {
        (le.current != null && (clearTimeout(le.current), (le.current = null)),
          ue.current?.abort(),
          (ue.current = null));
      }),
      (t[0] = de))
    : (de = t[0]);
  let fe;
  (t[1] !== P || t[2] !== se ? ((fe = [P, se]), (t[1] = P), (t[2] = se), (t[3] = fe)) : (fe = t[3]),
    (0, h7.useEffect)(de, fe));
  let pe;
  t[4] !== c || t[5] !== l || t[6] !== u || t[7] !== d
    ? ((pe =
        l ??
        (u ? (0, g7.jsx)(t5, { className: q(d, v7.icon), "aria-hidden": !1, asset: u }) : null) ??
        (c ? (0, g7.jsx)(c, { className: q(d ?? `icon-xs`, v7.icon) }) : null)),
      (t[4] = c),
      (t[5] = l),
      (t[6] = u),
      (t[7] = d),
      (t[8] = pe))
    : (pe = t[8]);
  let me = pe,
    he = OAi(_),
    ge = q(
      `z-50 flex min-w-[180px] select-none flex-col overflow-y-auto`,
      ee === `bare` ? `m-0 p-0` : [`m-px`, DAi(ee)],
    ),
    [_e, ve] = (0, h7.useState)(0),
    [ye, be] = (0, h7.useState)(4),
    xe = (0, h7.useRef)(null),
    Se = h ? -4 : _e,
    Ce = h || te === `unstyled` ? 4 : ye,
    we;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((we = function () {
        (le.current != null && (clearTimeout(le.current), (le.current = null)),
          ue.current?.abort(),
          (ue.current = null));
      }),
      (t[9] = we))
    : (we = t[9]);
  let Te = we,
    Ee;
  t[10] !== P || t[11] !== A
    ? ((Ee = function (e) {
        if (!e || (!P && le.current == null)) {
          if ((Te(), e && ce.current)) {
            ce.current = !1;
            return;
          }
          ((ce.current = !e), oe(e), A?.(e));
        }
      }),
      (t[10] = P),
      (t[11] = A),
      (t[12] = Ee))
    : (Ee = t[12]);
  let De = Ee,
    Oe;
  t[13] !== h || t[14] !== I || t[15] !== re
    ? ((Oe = function (e) {
        if (e != null) {
          let t = getComputedStyle(e);
          if ((ve(-parseFloat(t.paddingTop) - parseFloat(t.marginTop)), !I)) {
            let e = xe.current,
              t = e?.closest(`[role="menu"]`);
            if (!h && e != null && t != null) {
              let n = e.getBoundingClientRect(),
                r = t.getBoundingClientRect();
              be(4 + Math.max(n.left - r.left, r.right - n.right, 0) / re);
            }
            return;
          }
          let n = e.ownerDocument.getElementById(e.getAttribute(`aria-labelledby`) ?? ``),
            r = n?.closest(`[role="menu"]`);
          if (!n || !r) return;
          let i = () => {
            let e = n.getBoundingClientRect(),
              i = r.getBoundingClientRect(),
              a =
                r.getAttribute(`data-side`) === `top` ||
                r.getAttribute(`data-compact-menu-align`) === `end`,
              o = {
                trigger: n,
                align: a ? `end` : `start`,
                sideOffset: t.direction === `rtl` ? e.left - i.right : i.left - e.right,
                alignOffset: a ? e.bottom - i.bottom : i.top - e.top,
                width: Math.min(i.width, window.innerWidth - 16) / re,
              };
            ie((e) =>
              e?.trigger === n &&
              e.align === o.align &&
              e.sideOffset === o.sideOffset &&
              e.alignOffset === o.alignOffset &&
              e.width === o.width
                ? e
                : o,
            );
          };
          (i(), r.classList.add(f7.replacedContent));
          let a = new ResizeObserver(i);
          return (
            a.observe(r),
            a.observe(n),
            r.addEventListener(`scroll`, i),
            window.addEventListener(`resize`, i),
            () => {
              (r.classList.remove(f7.replacedContent),
                a.disconnect(),
                r.removeEventListener(`scroll`, i),
                window.removeEventListener(`resize`, i));
            }
          );
        }
      }),
      (t[13] = h),
      (t[14] = I),
      (t[15] = re),
      (t[16] = Oe))
    : (Oe = t[16]);
  let ke = Oe,
    Ae;
  t[17] !== P || t[18] !== De || t[19] !== I || t[20] !== se
    ? ((Ae = function (e) {
        if (I) {
          e.preventDefault();
          return;
        }
        if (P || se || e.pointerType !== `mouse`) return;
        if (le.current == null) {
          let t = e.currentTarget,
            n = new AbortController();
          ((ue.current = n),
            t.ownerDocument.addEventListener(
              `keydown`,
              () => {
                (Te(), (ce.current = !0));
              },
              { capture: !0, signal: n.signal },
            ),
            (le.current = setTimeout(() => {
              (Te(), t.focus({ preventScroll: !0 }), (ce.current = !1), De(!0));
            }, Yji)));
        }
        let t = le.current;
        queueMicrotask(() => {
          e.defaultPrevented && le.current === t && (Te(), (ce.current = !0));
        });
      }),
      (t[17] = P),
      (t[18] = De),
      (t[19] = I),
      (t[20] = se),
      (t[21] = Ae))
    : (Ae = t[21]);
  let je = Ae,
    Me = HMe,
    Ne;
  t[22] === n ? (Ne = t[23]) : ((Ne = M5(n, xe)), (t[22] = n), (t[23] = Ne));
  let Pe;
  t[24] !== f || t[25] !== P || t[26] !== te
    ? ((Pe = q(
        te === "default"
          ? [v7.itemBase, `flex w-full items-center rounded-xl text-default`]
          : `no-drag outline-hidden`,
        P ? `cursor-default opacity-50` : `group cursor-interaction`,
        !P &&
          te === "default" &&
          `data-[highlighted]:bg-primary-ghost-hover data-[state=open]:bg-primary-ghost-hover focus-visible:bg-primary-ghost-hover`,
        f,
      )),
      (t[24] = f),
      (t[25] = P),
      (t[26] = te),
      (t[27] = Pe))
    : (Pe = t[27]);
  let Fe;
  t[28] === I
    ? (Fe = t[29])
    : ((Fe = (e) => {
        (Te(), I && e.preventDefault());
      }),
      (t[28] = I),
      (t[29] = Fe));
  let Ie;
  t[30] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ie = (e) => {
        (Te(), (ce.current = !0));
        let t =
          e.currentTarget.closest(`[role="menu"]`)?.getAttribute(`dir`) === `rtl`
            ? `ArrowLeft`
            : `ArrowRight`;
        (e.key === t || e.key === `Enter` || e.key === ` `) &&
          (e.key === ` ` &&
            queueMicrotask(() => {
              e.defaultPrevented || (ce.current = !0);
            }),
          (ce.current = !1));
      }),
      (t[30] = Ie))
    : (Ie = t[30]);
  let Le;
  t[31] !== P || t[32] !== y
    ? ((Le = (e) => {
        (Te(),
          (ce.current = !1),
          !(P || y == null) && (e.preventDefault(), e.stopPropagation(), (ce.current = !0), y()));
      }),
      (t[31] = P),
      (t[32] = y),
      (t[33] = Le))
    : (Le = t[33]);
  let Re;
  t[34] !== N || t[35] !== a || t[36] !== me || t[37] !== x || t[38] !== b
    ? ((Re =
        b ??
        (0, g7.jsxs)(`div`, {
          "data-menu-row-content": !0,
          className: v7.content,
          children: [
            me == null ? null : (0, g7.jsx)(`span`, { className: o7.leadingIcon, children: me }),
            (0, g7.jsx)(`span`, {
              className: q(`min-w-0 flex-1`, N ? `whitespace-normal` : `truncate`),
              children: a,
            }),
            x,
            (0, g7.jsx)(Udr, { className: `text-tertiary`, "data-rtl-flip": `` }),
          ],
        })),
      (t[34] = N),
      (t[35] = a),
      (t[36] = me),
      (t[37] = x),
      (t[38] = b),
      (t[39] = Re))
    : (Re = t[39]);
  let ze;
  t[40] !== r ||
  t[41] !== i ||
  t[42] !== P ||
  t[43] !== je ||
  t[44] !== Ne ||
  t[45] !== Pe ||
  t[46] !== Fe ||
  t[47] !== Le ||
  t[48] !== Re
    ? ((ze = (0, g7.jsx)(Sb, {
        ref: Ne,
        "aria-current": r,
        "aria-label": i,
        className: Pe,
        disabled: P,
        onPointerEnter: je,
        onPointerMove: je,
        onPointerLeave: Fe,
        onKeyDown: Ie,
        onClick: Le,
        children: Re,
      })),
      (t[40] = r),
      (t[41] = i),
      (t[42] = P),
      (t[43] = je),
      (t[44] = Ne),
      (t[45] = Pe),
      (t[46] = Fe),
      (t[47] = Le),
      (t[48] = Re),
      (t[49] = ze))
    : (ze = t[49]);
  let Be;
  t[50] !== ze ||
  t[51] !== D ||
  t[52] !== C ||
  t[53] !== O ||
  t[54] !== T ||
  t[55] !== E ||
  t[56] !== S ||
  t[57] !== w
    ? ((Be = (0, g7.jsx)(eMi, {
        tooltipText: S,
        tooltipDisabled: C,
        tooltipTextClassName: w,
        tooltipSide: T,
        tooltipSideOffset: E,
        tooltipAlign: D,
        tooltipOpenWhen: O,
        children: ze,
      })),
      (t[50] = ze),
      (t[51] = D),
      (t[52] = C),
      (t[53] = O),
      (t[54] = T),
      (t[55] = E),
      (t[56] = S),
      (t[57] = w),
      (t[58] = Be))
    : (Be = t[58]);
  let Ve =
      ne !== null &&
      (0, g7.jsx)(hb, {
        container: ne,
        children: (0, g7.jsxs)(Cb, {
          ref: ke,
          onEscapeKeyDown: j,
          "data-overlay-owner": L?.id,
          className: q(ge, he, h && !I && f7.parentBottomAlignedContent, g),
          align: I ? (R?.align ?? `start`) : F,
          "data-compact-menu-align": I ? R?.align : void 0,
          collisionPadding: 6,
          avoidCollisions: I || !h,
          sideOffset: I && R ? R.sideOffset : Ce,
          alignOffset: I && R ? R.alignOffset : Se,
          style: {
            ...(h ? $ji : _7),
            ...(I && R
              ? {
                  width: R.width,
                  minWidth: R.width,
                  maxWidth: R.width,
                  maxHeight: `calc((100dvh - 16px) / ${re})`,
                  margin: 0,
                }
              : {}),
            zoom: re === 1 ? void 0 : re,
          },
          children: [
            I &&
              (0, g7.jsx)(Cji, {
                leftIcon: (0, g7.jsx)(Bdr, { className: `rtl:-scale-x-100` }),
                onSelect: (e) => {
                  (e.preventDefault(),
                    De(!1),
                    R?.trigger.closest(`[role="menu"]`)?.classList.remove(f7.replacedContent),
                    R?.trigger.focus());
                },
                children: (0, g7.jsx)(pS, {
                  id: `dropdown.submenu.back`,
                  defaultMessage: `Back`,
                  description: `Menu action at the top of a submenu in a narrow window that returns to the parent menu without selecting an action or closing the entire menu`,
                }),
              }),
            (0, g7.jsx)(`div`, { children: s }),
          ],
        }),
      }),
    He;
  return (
    t[59] !== De || t[60] !== se || t[61] !== Me.Sub || t[62] !== Be || t[63] !== Ve
      ? ((He = (0, g7.jsxs)(Me.Sub, { open: se, onOpenChange: De, children: [Be, Ve] })),
        (t[59] = De),
        (t[60] = se),
        (t[61] = Me.Sub),
        (t[62] = Be),
        (t[63] = Ve),
        (t[64] = He))
      : (He = t[64]),
    He
  );
}
function pAi() {
  return (pAi = t(() => {
    (o(),
      (dAi = K()),
      (fAi = (e) =>
        (0, dAi.jsx)(`svg`, {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          fill: `none`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: (0, dAi.jsx)(`path`, {
            d: `M7.52925 3.7793C7.75652 3.55203 8.10803 3.52383 8.36616 3.69434L8.47065 3.7793L14.2207 9.5293C14.4804 9.789 14.4804 10.211 14.2207 10.4707L8.47065 16.2207C8.21095 16.4804 7.78895 16.4804 7.52925 16.2207C7.26955 15.961 7.26955 15.539 7.52925 15.2793L12.8085 10L7.52925 4.7207L7.44429 4.61621C7.27378 4.35808 7.30198 4.00657 7.52925 3.7793Z`,
            fill: `currentColor`,
          }),
        })));
  }))();
}
function pCi() {
  return (pCi = t(() => {
    M5 =
      (...e) =>
      (t) => {
        if (t == null) {
          e.forEach((e) => {
            if (typeof e == `function`) e(null);
            else if (e) {
              let t = e;
              t.current = null;
            }
          });
          return;
        }
        let n = [];
        if (
          (e.forEach((e) => {
            if (typeof e == `function`) {
              let r = e(t);
              typeof r == `function` ? n.push(r) : n.push(() => e(null));
            } else if (e) {
              let r = e;
              ((r.current = t),
                n.push(() => {
                  r.current = null;
                }));
            }
          }),
          n.length !== 0)
        )
          return () => {
            n.forEach((e) => e());
          };
      };
  }))();
}
function OAi(e) {
  return e == null ? void 0 : PAi[e];
}
function a7() {
  return (a7 = t(() => {
    ((MAi = c()),
      (NAi = o()),
      Uf(),
      x5(),
      (PAi = {
        icon: `min-w-[120px]`,
        xs: `min-w-[160px]`,
        sm: `min-w-[180px]`,
        menuNarrow: `w-52`,
        menu: `min-w-[var(--app-menu-min-width,220px)]`,
        menuFixed: `w-[220px]`,
        menuBounded: `min-w-[200px] max-w-[320px]`,
        menuWide: `w-[240px]`,
        railMenu: `w-57`,
        sidebar: `min-w-[172px] max-w-[240px]`,
        workspace: `min-w-[260px]`,
        panel: `w-[280px]`,
        panelWide: `w-[360px]`,
        panelExtraWide: `w-[408px]`,
      }),
      (FAi = {
        available: `calc(100vh - 16px)`,
        compact: `200px`,
        list: `250px`,
        tall: `350px`,
        composerPlugins: `var(--height-composer-plugins-menu, 250px)`,
      }));
  }))();
}
function ASi() {
  return (0, jSi.useSyncExternalStore)(MSi, NSi, PSi);
}
function FSi() {
  return (FSi = t(() => {
    ((jSi = o()), (MSi = () => () => {}), (NSi = () => !0), (PSi = () => !0));
  }))();
}
function ISi(e) {
  let t = (0, LSi.c)(5),
    n = ASi(),
    r;
  t[0] === e
    ? (r = t[1])
    : ((r = () =>
        typeof window > `u` || typeof window.matchMedia != `function`
          ? !1
          : window.matchMedia(e).matches),
      (t[0] = e),
      (t[1] = r));
  let [i, a] = (0, RSi.useState)(r),
    o,
    s;
  return (
    t[2] === e
      ? ((o = t[3]), (s = t[4]))
      : ((o = () => {
          if (typeof window > `u` || typeof window.matchMedia != `function`) return;
          let t = window.matchMedia(e);
          a(t.matches);
          let n = (e) => {
            a(e.matches);
          };
          return typeof t.addEventListener == `function`
            ? (t.addEventListener(`change`, n),
              () => {
                t.removeEventListener(`change`, n);
              })
            : (t.addListener(n),
              () => {
                t.removeListener(n);
              });
        }),
        (s = [e]),
        (t[2] = e),
        (t[3] = o),
        (t[4] = s)),
    (0, RSi.useEffect)(o, s),
    n && i
  );
}
function f8n() {
  return (f8n = t(() => {
    (Q(),
      (d8n = Z({
        name: `chevron-left-md-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 5.113281, y: 3.475098, width: 4.911621, height: 9.049805 },
          visualBounds: { x: 5.113281, y: 3.475098, width: 4.911621, height: 9.049805 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 5.113281, y: 3.475098, width: 4.911621, height: 9.049805 },
          center: { x: 7.569092, y: 8 },
          insets: { top: 3.475098, right: 5.975098, bottom: 3.475097, left: 5.113281 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.569092, y: 8 },
            foreground: { x: 7.569092, y: 8 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M9.87117 11.6289C10.0762 11.8339 10.0762 12.166 9.87117 12.3711C9.66614 12.5761 9.334 12.5761 9.12898 12.3711L5.36433 8.60641C5.0296 8.27129 5.0296 7.72863 5.36433 7.39351L9.12898 3.62887C9.334 3.42384 9.66614 3.42384 9.87117 3.62887C10.0762 3.83389 10.0762 4.16603 9.87117 4.37105L6.24226 7.99996L9.87117 11.6289Z" fill="currentColor"/>`,
      })));
  }))();
}
function v8n() {
  return (v8n = t(() => {
    (Q(),
      (_8n = Z({
        name: `chevron-right-md-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 5.808594, y: 3.475098, width: 4.911621, height: 9.049805 },
          visualBounds: { x: 5.808594, y: 3.475098, width: 4.911621, height: 9.049805 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 5.808594, y: 3.475098, width: 4.911621, height: 9.049805 },
          center: { x: 8.264405, y: 8 },
          insets: { top: 3.475098, right: 5.279785, bottom: 3.475097, left: 5.808594 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 8.264405, y: 8 },
            foreground: { x: 8.264405, y: 8 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M5.96236 11.6289C5.75734 11.8339 5.75734 12.166 5.96236 12.3711C6.16739 12.5761 6.49953 12.5761 6.70455 12.3711L10.4692 8.60641C10.8039 8.27129 10.8039 7.72863 10.4692 7.39351L6.70455 3.62887C6.49952 3.42384 6.16739 3.42384 5.96236 3.62887C5.75734 3.83389 5.75734 4.16603 5.96236 4.37105L9.59127 7.99996L5.96236 11.6289Z" fill="currentColor"/>`,
      })));
  }))();
}
 s7();bji();i7();K6n();pAi();pCi();a7();FSi();f8n();v8n();
 const Bdr=t5.fromPreset?.(d8n),Udr=t5.fromPreset?.(_8n);
 (pji = { default: `h-5 w-8`, sm: `h-4 w-7` }),
      (mji = {
        default: `h-4 w-4 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[14px] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[14px]`,
        sm: `h-3 w-3 data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[14px] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[14px]`,
      });
 const b$=props=>{if(!t5.fromPreset)throw new TypeError('Original preset icon factory required');return g7.jsx(Checkmark,props);};
 const Checkmark=t5.fromPreset?.(G6n);
 (eMi = (e) => {
        "use forget";
        let t = (0, m7.c)(20),
          {
            children: n,
            color: r,
            tooltipText: i,
            tooltipOnBeforeOpen: a,
            tooltipVariant: o,
            tooltipDisabled: s,
            tooltipTextClassName: c,
            tooltipInteractive: l,
            tooltipSide: u,
            tooltipSideOffset: d,
            tooltipAlign: f,
            tooltipOpenWhen: p,
          } = e,
          m = r === void 0 ? `default` : r;
        if (!i) {
          let e;
          return (
            t[0] === n
              ? (e = t[1])
              : ((e = (0, g7.jsx)(g7.Fragment, { children: n })), (t[0] = n), (t[1] = e)),
            e
          );
        }
        let h;
        o === `description` ? (h = 16) : m === `surface` && (h = 12);
        let g = o === `description` && `text-start`,
          _;
        t[2] !== g || t[3] !== c
          ? ((_ = q(`max-w-64 text-pretty`, g, c)), (t[2] = g), (t[3] = c), (t[4] = _))
          : (_ = t[4]);
        let v;
        t[5] !== _ || t[6] !== i
          ? ((v = (0, g7.jsx)(`div`, { className: _, children: i })),
            (t[5] = _),
            (t[6] = i),
            (t[7] = v))
          : (v = t[7]);
        let y = !l,
          b = u ?? `right`,
          x = d ?? h,
          S;
        return (
          t[8] !== n ||
          t[9] !== m ||
          t[10] !== v ||
          t[11] !== y ||
          t[12] !== b ||
          t[13] !== x ||
          t[14] !== f ||
          t[15] !== s ||
          t[16] !== l ||
          t[17] !== a ||
          t[18] !== p
            ? ((S = (0, g7.jsx)(w5, {
                cloneCustomTrigger: !0,
                color: m,
                disabled: s,
                onBeforeOpen: a,
                tooltipContent: v,
                closeOnTriggerBlur: y,
                interactive: l,
                keyboardNavigation: l,
                side: b,
                sideOffset: x,
                align: f,
                openWhen: p,
                children: n,
              })),
              (t[8] = n),
              (t[9] = m),
              (t[10] = v),
              (t[11] = y),
              (t[12] = b),
              (t[13] = x),
              (t[14] = f),
              (t[15] = s),
              (t[16] = l),
              (t[17] = a),
              (t[18] = p),
              (t[19] = S))
            : (S = t[19]),
          S
        );
      }),
      (v7 = {
        content: `flex w-full items-center gap-[var(--spacing-menu-item-content,calc(var(--spacing)*1.5))]`,
        icon: `shrink-0 opacity-75 group-focus:opacity-100 group-hover:opacity-100`,
        itemBase: o7.itemBase,
        itemInteractive: q(`group`, o7.itemInteractive),
      }),
      (tMi = { messageBase: `px-row-x text-sm` }),
      (nMi = { xs: `icon-xs`, sm: `icon-sm`, base: `icon-base`, md: `icon-md` });
 return {MenuSubmenuItem:Wji,MenuFlyoutSubmenuItem:Gji,MenuCheckboxItem:Dji,MenuRadioItem:Aji,MenuRadioGroup:yb,MenuTrigger:xji,MenuContent:Sji,MenuItem:Cji,MenuItemIcon:Nji,MenuSeparator:Rji,MenuSectionLabel:zji,MenuMessage:Bji,MenuTitle:Kji,MenuGroup:Jji,MenuSection:qji,MenuRow:QAi,followingEnabledItems:Lji};
}
