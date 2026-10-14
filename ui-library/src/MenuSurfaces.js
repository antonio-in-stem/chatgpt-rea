// Original menu surfaces and rows; underlying interaction primitives injected explicitly.
import {classNames as q} from './classNames.js';
export function createMenuSurfaces({React,primitives,Tooltip:w5,AssetIcon:t5,ScrollArea:sji,TooltipOverlayContext,compilerRuntime=React.__COMPILER_RUNTIME}){
 for(const name of ['Trigger','Content','Item','Group'])if(!primitives?.[name])throw new TypeError('Missing menu primitive '+name);
 if(!w5||!t5||!sji||!compilerRuntime?.c)throw new TypeError('Menu surfaces require original tooltip, asset icon, scroll area and compiler runtime');
 const {Trigger:mb,Content:gb,Item:_b,Group:fNe}=primitives;
 const t=fn=>fn,m7=compilerRuntime,tji=compilerRuntime,h7=React,v5=TooltipOverlayContext??React.createContext(undefined);
 const g7={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},c7=g7;
 const _7={maxWidth:'min(var(--radix-dropdown-menu-content-available-width), calc(100vw - 16px))',maxHeight:'min(var(--radix-dropdown-menu-content-available-height), calc(100vh - 16px))'};
 let IAi,LAi,RAi,zAi,BAi,VAi,HAi,UAi,WAi,GAi,KAi,qAi,JAi,YAi,XAi,ZAi,o7,gji,_ji,vji,yji,f7,eMi,v7,tMi,nMi;
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
 s7();bji();
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
 return {MenuTrigger:xji,MenuContent:Sji,MenuItem:Cji,MenuItemIcon:Nji,MenuSeparator:Rji,MenuSectionLabel:zji,MenuMessage:Bji,MenuTitle:Kji,MenuGroup:Jji,MenuSection:qji,MenuRow:QAi,followingEnabledItems:Lji};
}
