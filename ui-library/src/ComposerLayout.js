import {classNames as ng} from './classNames.js';
// Generated from shipped functions. See composer-manifest.json.
export function createComposerLayout({React,motion,useMotionValue,useDarkTheme}){
if(!React.createContext||!motion?.div||!useMotionValue||!useDarkTheme)throw new TypeError('React, motion.div, useMotionValue and useDarkTheme are required');
const XS=React,OLt=React,YS={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},DLt=YS;
const ZS={jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key})},kLt=ZS;
const Kl=motion,Lm=useMotionValue,Vd=useDarkTheme;
const QS=React.createContext({isHome:false,isInline:false,canStackSingleLine:false});
const KS=React.createContext({activeBrowserTabId:null,isInsideOverlay:false,onAttachmentAdded:()=>{},shouldAnimate:true}),FIt=React.createContext('default');
const JS={
        ComposerLayoutRoot: "_ComposerLayoutRoot_boifs_2",
        ComposerLayoutFooter: "_ComposerLayoutFooter_boifs_2",
        ComposerLayoutAttachments: "_ComposerLayoutAttachments_boifs_2",
        ComposerLayoutReplyContext: "_ComposerLayoutReplyContext_boifs_2",
        ComposerLayoutBody: "_ComposerLayoutBody_boifs_2",
        animatedHomeSurface: "_animatedHomeSurface_boifs_2",
        AdaptiveFooterInput: "_AdaptiveFooterInput_boifs_2",
        ComposerLayoutInput: "_ComposerLayoutInput_boifs_2",
        ComposerAttachmentsScrollContainer: "_ComposerAttachmentsScrollContainer_boifs_2",
        SingleLineDictation: "_SingleLineDictation_boifs_2",
        DocumentComposerControls: "_DocumentComposerControls_boifs_2",
        ComposerLayoutFooterLabel: "_ComposerLayoutFooterLabel_boifs_2",
        ComposerModeSurface: "_ComposerModeSurface_boifs_2",
      };
const LIt="a[href], button, input, select, textarea, [contenteditable='true'], [draggable='true'], [role='button'], [role='link'], [role='menuitem'], [role='option'], [tabindex]:not([tabindex='-1'])";
let M5;const t=fn=>fn;
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
pCi();const Fd=M5;
function nLt(e) {
  let t = (0, YS.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, ZS.jsx)(`div`, { className: JS.ComposerModeSurface, children: n })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function iLt(e) {
  let t = (0, YS.c)(5),
    { children: n } = e,
    r = (0, XS.useContext)(QS),
    i;
  t[0] === r ? (i = t[1]) : ((i = { ...r, animateLayout: !0 }), (t[0] = r), (t[1] = i));
  let a;
  return (
    t[2] !== n || t[3] !== i
      ? ((a = (0, ZS.jsx)(QS, { value: i, children: n })), (t[2] = n), (t[3] = i), (t[4] = a))
      : (a = t[4]),
    a
  );
}
function cLt(e) {
  let t = (0, YS.c)(45),
    {
      children: n,
      className: r,
      animateRadius: i,
      utilityBarVariant: a,
      inert: o,
      isDragActive: s,
      layout: c,
      paddingVariant: l,
      radiusVariant: u,
      density: d,
      surfaceOverflow: f,
      surfaceVariant: p,
      onDragEnter: m,
      onDragLeave: h,
      onDragOver: g,
      onDrop: _,
    } = e,
    v = i !== void 0 && i,
    y = a === void 0 ? `default` : a,
    b = s !== void 0 && s,
    x = c === void 0 ? `multiline` : c,
    S = l === void 0 ? `none` : l,
    C = d === void 0 ? `default` : d,
    w = f === void 0 ? `auto` : f,
    T = (0, XS.useContext)(FIt),
    { hasComposerSurface: E, quickChatComposerPresentation: D } = (0, XS.useContext)(KS),
    O = p ?? (E ? `inline` : `default`),
    k = u ?? (E && D?.isCompact ? `compact` : `default`),
    { animateLayout: A, expansion: j, homeMode: M } = (0, XS.useContext)(QS),
    N = j != null && y !== `home`,
    P = (0, XS.useRef)(null),
    F = Lm(`var(--composer-surface-border-radius)`),
    I;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((I = () => {
        let e = P.current;
        if (e != null)
          for (let t of e.getAnimations({ subtree: !0 }))
            t instanceof CSSTransition &&
              [`padding-top`, `padding-bottom`, `margin-bottom`].includes(t.transitionProperty) &&
              t.finish();
      }),
      (t[0] = I))
    : (I = t[0]);
  let L;
  (t[1] === x ? (L = t[2]) : ((L = [x]), (t[1] = x), (t[2] = L)), (0, XS.useLayoutEffect)(I, L));
  let R = Vd(),
    z = y === `home`,
    B = O === `inline`,
    V = p === `document`,
    H = y === `home` && T === "default" ? M : void 0,
    ee = k === "default" && O === "default" && T === "default",
    U;
  t[3] !== A || t[4] !== j || t[5] !== z || t[6] !== B || t[7] !== V || t[8] !== H || t[9] !== ee
    ? ((U = {
        isHome: z,
        animateLayout: A,
        isInline: B,
        isDocument: V,
        expansion: j,
        homeMode: H,
        canStackSingleLine: ee,
      }),
      (t[3] = A),
      (t[4] = j),
      (t[5] = z),
      (t[6] = B),
      (t[7] = V),
      (t[8] = H),
      (t[9] = ee),
      (t[10] = U))
    : (U = t[10]);
  let te;
  t[11] !== N || t[12] !== F
    ? ((te = (e) => {
        if (((P.current = e), e != null && N)) return wLt(e, F);
      }),
      (t[11] = N),
      (t[12] = F),
      (t[13] = te))
    : (te = t[13]);
  let ne = v && `transition-[border-radius] duration-relaxed ease-enter-snappy`,
    re;
  t[14] !== r || t[15] !== ne
    ? ((re = ng(JS.ComposerLayoutRoot, ne, r)), (t[14] = r), (t[15] = ne), (t[16] = re))
    : (re = t[16]);
  let ie;
  t[17] !== N || t[18] !== F
    ? ((ie = N ? { borderRadius: F } : void 0), (t[17] = N), (t[18] = F), (t[19] = ie))
    : (ie = t[19]);
  let ae = A ? `root` : void 0,
    oe = A || N,
    se = A ? x : j?.state === `expanded`,
    ce = R ? `` : void 0,
    le = b ? `` : void 0,
    ue = p === `document` ? `visible` : w,
    de;
  t[20] !== n ||
  t[21] !== C ||
  t[22] !== k ||
  t[23] !== O ||
  t[24] !== o ||
  t[25] !== x ||
  t[26] !== m ||
  t[27] !== h ||
  t[28] !== g ||
  t[29] !== _ ||
  t[30] !== S ||
  t[31] !== te ||
  t[32] !== re ||
  t[33] !== ie ||
  t[34] !== ae ||
  t[35] !== oe ||
  t[36] !== se ||
  t[37] !== ce ||
  t[38] !== le ||
  t[39] !== ue ||
  t[40] !== y
    ? ((de = (0, ZS.jsx)(Kl.div, {
        ref: te,
        className: re,
        inert: o,
        style: ie,
        layoutId: ae,
        layoutCrossfade: !1,
        layout: oe,
        layoutDependency: se,
        "data-composer-dark": ce,
        "data-composer-drag-active": le,
        "data-composer-layout": x,
        "data-composer-padding-variant": S,
        "data-composer-radius-variant": k,
        "data-composer-density": C,
        "data-composer-surface-overflow": ue,
        "data-composer-surface-variant": O,
        "data-composer-utility-bar-variant": y,
        role: `presentation`,
        onMouseDown: IIt,
        onDragEnter: m,
        onDragOver: g,
        onDragLeave: h,
        onDrop: _,
        children: n,
      })),
      (t[20] = n),
      (t[21] = C),
      (t[22] = k),
      (t[23] = O),
      (t[24] = o),
      (t[25] = x),
      (t[26] = m),
      (t[27] = h),
      (t[28] = g),
      (t[29] = _),
      (t[30] = S),
      (t[31] = te),
      (t[32] = re),
      (t[33] = ie),
      (t[34] = ae),
      (t[35] = oe),
      (t[36] = se),
      (t[37] = ce),
      (t[38] = le),
      (t[39] = ue),
      (t[40] = y),
      (t[41] = de))
    : (de = t[41]);
  let fe;
  return (
    t[42] !== U || t[43] !== de
      ? ((fe = (0, ZS.jsx)(QS, { value: U, children: de })),
        (t[42] = U),
        (t[43] = de),
        (t[44] = fe))
      : (fe = t[44]),
    fe
  );
}
function lLt(e) {
  let t = (0, YS.c)(4),
    { children: n } = e,
    { expansion: r } = (0, XS.useContext)(QS),
    i = r != null && `position`,
    a = r?.state === `expanded`,
    o;
  return (
    t[0] !== n || t[1] !== i || t[2] !== a
      ? ((o = (0, ZS.jsx)(Kl.div, {
          className: JS.ComposerLayoutReplyContext,
          layout: i,
          layoutDependency: a,
          children: n,
        })),
        (t[0] = n),
        (t[1] = i),
        (t[2] = a),
        (t[3] = o))
      : (o = t[3]),
    o
  );
}
function uLt(e) {
  let t = (0, YS.c)(10),
    { children: n, hasVisibleAttachments: r, hidden: i, ref: a, spacing: o } = e,
    s = r !== void 0 && r,
    c = o === void 0 ? `default` : o,
    { expansion: l, isInline: u } = (0, XS.useContext)(QS),
    { hasComposerSurface: d } = (0, XS.useContext)(KS),
    f = u && !d ? `` : void 0,
    p = u && d ? `` : void 0,
    m = !i && s ? `` : void 0,
    h = l != null && `position`,
    g = l?.state === `expanded`,
    _;
  return (
    t[0] !== n ||
    t[1] !== i ||
    t[2] !== a ||
    t[3] !== c ||
    t[4] !== f ||
    t[5] !== p ||
    t[6] !== m ||
    t[7] !== h ||
    t[8] !== g
      ? ((_ = (0, ZS.jsx)(Kl.div, {
          ref: a,
          className: JS.ComposerLayoutAttachments,
          "data-composer-attachments": ``,
          "data-composer-inline": f,
          "data-composer-floating-surface": p,
          "data-composer-spacing": c,
          "data-visible-attachments": m,
          hidden: i,
          layout: h,
          layoutDependency: g,
          children: n,
        })),
        (t[0] = n),
        (t[1] = i),
        (t[2] = a),
        (t[3] = c),
        (t[4] = f),
        (t[5] = p),
        (t[6] = m),
        (t[7] = h),
        (t[8] = g),
        (t[9] = _))
      : (_ = t[9]),
    _
  );
}
function dLt(e) {
  "use forget";
  let t = (0, YS.c)(17),
    {
      children: n,
      hidden: r,
      inert: i,
      layout: a,
      placeholderContent: o,
      ref: s,
      spacing: c,
      variant: l,
    } = e,
    u = a === void 0 ? `multiline` : a,
    d = c === void 0 ? `default` : c,
    f = l === void 0 ? `default` : l,
    { homeMode: p, isDictating: m } = (0, XS.useContext)(QS),
    { quickChatComposerPresentation: h } = (0, XS.useContext)(KS),
    g = m ? `multiline` : u,
    _ = o != null && `relative`,
    v = g === `single-line` ? `min-w-0` : `flex-grow overflow-y-auto`,
    y =
      g === `single-line` &&
      h?.isCompact &&
      `has-[[data-placeholder]]:not-has-[[contenteditable=false]]:max-w-64`,
    b;
  t[0] !== _ || t[1] !== v || t[2] !== y
    ? ((b = ng(JS.ComposerLayoutInput, _, v, y)), (t[0] = _), (t[1] = v), (t[2] = y), (t[3] = b))
    : (b = t[3]);
  let x = p == null ? void 0 : ``,
    S;
  t[4] === o
    ? (S = t[5])
    : ((S =
        o == null
          ? null
          : (0, ZS.jsx)(`div`, {
              className: `pointer-events-none absolute inset-0 flex min-w-0 flex-col justify-center select-none`,
              "aria-hidden": !0,
              children: o,
            })),
      (t[4] = o),
      (t[5] = S));
  let C;
  return (
    t[6] !== n ||
    t[7] !== r ||
    t[8] !== i ||
    t[9] !== g ||
    t[10] !== s ||
    t[11] !== d ||
    t[12] !== b ||
    t[13] !== x ||
    t[14] !== S ||
    t[15] !== f
      ? ((C = (0, ZS.jsxs)(`div`, {
          ref: s,
          className: b,
          "data-composer-layout": g,
          "data-composer-spacing": d,
          "data-composer-input-variant": f,
          "data-composer-input": ``,
          "data-composer-animate-layout": x,
          hidden: r,
          inert: i,
          children: [n, S],
        })),
        (t[6] = n),
        (t[7] = r),
        (t[8] = i),
        (t[9] = g),
        (t[10] = s),
        (t[11] = d),
        (t[12] = b),
        (t[13] = x),
        (t[14] = S),
        (t[15] = f),
        (t[16] = C))
      : (C = t[16]),
    C
  );
}
function mLt(e) {
  let t = (0, YS.c)(9),
    {
      children: n,
      dictationView: r,
      dictationEnabled: i,
      layout: a,
      ref: o,
      responsive: s,
      rows: c,
      spacing: l,
    } = e,
    u = a === void 0 ? `multiline` : a,
    d = s !== void 0 && s,
    f = l === void 0 ? `default` : l,
    p = i ? `` : void 0,
    m = d ? `` : void 0,
    h;
  return (
    t[0] !== n ||
    t[1] !== r ||
    t[2] !== u ||
    t[3] !== o ||
    t[4] !== c ||
    t[5] !== f ||
    t[6] !== p ||
    t[7] !== m
      ? ((h = (0, ZS.jsx)(`div`, {
          ref: o,
          className: JS.ComposerLayoutFooter,
          "data-dictation-view": r,
          "data-dictation-enabled": p,
          "data-composer-footer-responsive": m,
          "data-composer-layout": u,
          "data-composer-rows": c,
          "data-composer-spacing": f,
          children: n,
        })),
        (t[0] = n),
        (t[1] = r),
        (t[2] = u),
        (t[3] = o),
        (t[4] = c),
        (t[5] = f),
        (t[6] = p),
        (t[7] = m),
        (t[8] = h))
      : (h = t[8]),
    h
  );
}
function hLt(e) {
  let t = (0, YS.c)(3),
    { children: n, ref: r } = e,
    i;
  return (
    t[0] !== n || t[1] !== r
      ? ((i = (0, ZS.jsx)(`div`, {
          ref: r,
          className: `flex items-center`,
          onPointerDown: gLt,
          children: n,
        })),
        (t[0] = n),
        (t[1] = r),
        (t[2] = i))
      : (i = t[2]),
    i
  );
}
function gLt(e) {
  e.target instanceof Node && e.currentTarget.contains(e.target) && e.stopPropagation();
}
function _Lt(e) {
  let t = (0, YS.c)(6),
    { children: n, ref: r, spacing: i } = e,
    a = (i === void 0 ? `normal` : i) === `normal` && `gap-2`,
    o;
  t[0] === a ? (o = t[1]) : ((o = ng(`flex shrink-0 items-center`, a)), (t[0] = a), (t[1] = o));
  let s;
  return (
    t[2] !== n || t[3] !== r || t[4] !== o
      ? ((s = (0, ZS.jsx)(`div`, { ref: r, className: o, children: n })),
        (t[2] = n),
        (t[3] = r),
        (t[4] = o),
        (t[5] = s))
      : (s = t[5]),
    s
  );
}
function vLt(e) {
  let t = (0, YS.c)(6),
    { children: n, layout: r, ref: i } = e,
    a = (r === void 0 ? `multiline` : r) === `multiline` ? `w-full` : `shrink-0`,
    o;
  t[0] === a
    ? (o = t[1])
    : ((o = ng(`flex min-w-0 items-center justify-end`, a)), (t[0] = a), (t[1] = o));
  let s;
  return (
    t[2] !== n || t[3] !== i || t[4] !== o
      ? ((s = (0, ZS.jsx)(`div`, { ref: i, className: o, children: n })),
        (t[2] = n),
        (t[3] = i),
        (t[4] = o),
        (t[5] = s))
      : (s = t[5]),
    s
  );
}
function yLt(e) {
  let t = (0, YS.c)(6),
    { children: n, gap: r, ref: i } = e,
    a = (r === void 0 ? `compact` : r) === `compact` ? `gap-1` : `gap-[5px]`,
    o;
  t[0] === a ? (o = t[1]) : ((o = ng(`flex min-w-0 items-center`, a)), (t[0] = a), (t[1] = o));
  let s;
  return (
    t[2] !== n || t[3] !== i || t[4] !== o
      ? ((s = (0, ZS.jsx)(`div`, { ref: i, className: o, children: n })),
        (t[2] = n),
        (t[3] = i),
        (t[4] = o),
        (t[5] = s))
      : (s = t[5]),
    s
  );
}
function bLt(e) {
  let t = (0, YS.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, ZS.jsx)(`div`, { className: `flex min-w-0 flex-1 justify-end`, children: n })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function xLt() {
  let e = (0, YS.c)(1),
    t;
  return (
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((t = (0, ZS.jsx)(`div`, { className: `h-4 w-px bg-border/70` })), (e[0] = t))
      : (t = e[0]),
    t
  );
}
function SLt(e) {
  let t = (0, YS.c)(4),
    { children: n, hideWhenNarrow: r, width: i } = e,
    a = r === void 0 || r ? `` : void 0,
    o;
  return (
    t[0] !== n || t[1] !== a || t[2] !== i
      ? ((o = (0, ZS.jsx)(`span`, {
          className: JS.ComposerLayoutFooterLabel,
          "data-composer-footer-label-responsive": a,
          "data-composer-footer-label-width": i,
          children: n,
        })),
        (t[0] = n),
        (t[1] = a),
        (t[2] = i),
        (t[3] = o))
      : (o = t[3]),
    o
  );
}
function CLt(e) {
  let t = (0, YS.c)(26),
    { animateHeight: n, children: r, layout: i, ref: a } = e,
    o = n !== void 0 && n,
    s = i === void 0 ? `multiline` : i,
    { shouldAnimate: c } = (0, XS.useContext)(KS),
    { animateLayout: l, expansion: u, homeMode: d, isHome: f } = (0, XS.useContext)(QS),
    p = Lm(`var(--composer-surface-border-radius)`),
    m;
  t[0] !== p || t[1] !== f
    ? ((m = (e) => {
        if (e != null && f) return wLt(e, p);
      }),
      (t[0] = p),
      (t[1] = f),
      (t[2] = m))
    : (m = t[2]);
  let h;
  t[3] !== a || t[4] !== m ? ((h = Fd(a, m)), (t[3] = a), (t[4] = m), (t[5] = h)) : (h = t[5]);
  let g = o && `overflow-hidden`,
    _ =
      o &&
      c &&
      `transition-[height] duration-basic ease-enter-snappy motion-reduce:transition-none`,
    v = o && JS.animatedHomeSurface,
    y = o && s === `single-line` && `min-h-11`,
    b = o && s === `multiline` && `h-auto`,
    x;
  t[6] !== g || t[7] !== _ || t[8] !== v || t[9] !== y || t[10] !== b
    ? ((x = ng(JS.ComposerLayoutBody, g, _, v, y, b)),
      (t[6] = g),
      (t[7] = _),
      (t[8] = v),
      (t[9] = y),
      (t[10] = b),
      (t[11] = x))
    : (x = t[11]);
  let S;
  t[12] !== p || t[13] !== u || t[14] !== d || t[15] !== f
    ? ((S = f && (d != null || u != null) ? { borderRadius: p } : void 0),
      (t[12] = p),
      (t[13] = u),
      (t[14] = d),
      (t[15] = f),
      (t[16] = S))
    : (S = t[16]);
  let C = l || ((d != null || u != null) && (f ? !0 : `position`)),
    w = l || d != null ? `surface` : void 0,
    T = l ? s : `${d}-${u?.state === `expanded`}`,
    E;
  return (
    t[17] !== r ||
    t[18] !== s ||
    t[19] !== x ||
    t[20] !== S ||
    t[21] !== C ||
    t[22] !== w ||
    t[23] !== T ||
    t[24] !== h
      ? ((E = (0, ZS.jsx)(Kl.div, {
          ref: h,
          className: x,
          "data-composer-layout": s,
          "data-composer-body": ``,
          style: S,
          layout: C,
          layoutId: w,
          layoutDependency: T,
          layoutCrossfade: !1,
          children: r,
        })),
        (t[17] = r),
        (t[18] = s),
        (t[19] = x),
        (t[20] = S),
        (t[21] = C),
        (t[22] = w),
        (t[23] = T),
        (t[24] = h),
        (t[25] = E))
      : (E = t[25]),
    E
  );
}
function wLt(e, t) {
  let n = () => {
    t.set(
      Math.min(
        parseFloat(getComputedStyle(e).getPropertyValue(`--composer-surface-border-radius`)),
        e.offsetWidth / 2,
        e.offsetHeight / 2,
      ),
    );
  };
  n();
  let r = new ResizeObserver(n);
  return (r.observe(e, { box: `border-box` }), () => r.disconnect());
}
function ELt(e) {
  let t = (0, DLt.c)(25),
    n,
    r,
    i,
    a,
    o,
    s;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]), (a = t[4]), (o = t[5]), (s = t[6]))
    : (({ className: n, minHeight: r, singleLine: o, variant: s, style: a, ...i } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = i),
      (t[4] = a),
      (t[5] = o),
      (t[6] = s));
  let c = o !== void 0 && o,
    l = s === void 0 ? `default` : s,
    { animateLayout: u, expansion: d, homeMode: f, isDictating: p } = (0, OLt.useContext)(QS),
    m = c && !p,
    h;
  t[7] !== r || t[8] !== a
    ? ((h = { ...a, "--composer-editor-min-height": r }), (t[7] = r), (t[8] = a), (t[9] = h))
    : (h = t[9]);
  let g = h,
    _;
  t[10] !== n || t[11] !== f || t[12] !== r || t[13] !== m || t[14] !== l
    ? ((_ = ng(
        `text-size-chat *:text-size-chat`,
        `in-[[data-composer-body]:has([data-composer-expand-toggle])]:pe-10 in-[[data-composer-body]:has([data-expanded-composer])]:box-border in-[[data-composer-body]:has([data-expanded-composer])]:h-full in-[[data-composer-body]:has([data-expanded-composer])]:max-h-none`,
        m
          ? `flex overflow-hidden leading-[var(--composer-editor-line-height,calc(var(--spacing)*5))] *:box-border *:h-full! *:min-h-0! *:min-w-0 *:flex-1 *:overflow-hidden`
          : [
              `box-content h-auto overflow-y-auto p-[var(--composer-editor-padding,0px)] leading-[var(--composer-editor-line-height,1.35)] *:min-h-[var(--composer-editor-min-height,2.5rem)]`,
              l === `form`
                ? `max-h-[min(25dvh,7lh)]`
                : `max-h-[min(25dvh,var(--composer-editor-max-height,25dvh))]`,
            ],
        m &&
          (f == null
            ? `h-[var(--composer-editor-single-line-height,calc(var(--spacing)*9))] *:py-[calc((var(--composer-editor-single-line-height,calc(var(--spacing)*9))-1lh)/2)]`
            : `my-[calc((var(--composer-editor-single-line-height,calc(var(--spacing)*9))-1lh)/2)] h-[1lh]`),
        r === void 0 ? !m && `min-h-[var(--composer-editor-min-height,2.5rem)]` : `min-h-0`,
        n,
      )),
      (t[10] = n),
      (t[11] = f),
      (t[12] = r),
      (t[13] = m),
      (t[14] = l),
      (t[15] = _))
    : (_ = t[15]);
  let v = m ? `single-line` : `multiline`,
    y = (u || f != null || d != null) && `position`,
    b = u || f != null ? `editor` : void 0,
    x = u ? m : `${f}-${d?.state === `expanded`}`,
    S;
  return (
    t[16] !== g ||
    t[17] !== i ||
    t[18] !== _ ||
    t[19] !== v ||
    t[20] !== y ||
    t[21] !== b ||
    t[22] !== x ||
    t[23] !== l
      ? ((S = (0, kLt.jsx)(Kl.div, {
          ...i,
          className: _,
          style: g,
          "data-composer-input-layout": v,
          "data-composer-input-variant": l,
          layout: y,
          layoutId: b,
          layoutDependency: x,
          layoutCrossfade: !1,
        })),
        (t[16] = g),
        (t[17] = i),
        (t[18] = _),
        (t[19] = v),
        (t[20] = y),
        (t[21] = b),
        (t[22] = x),
        (t[23] = l),
        (t[24] = S))
      : (S = t[24]),
    S
  );
}
function IIt(e) {
  if (
    e.button !== 0 ||
    e.defaultPrevented ||
    !(e.target instanceof Element) ||
    !e.currentTarget.contains(e.target)
  )
    return;
  let t = e.currentTarget.querySelector(`.ProseMirror`);
  t == null ||
    t.contains(e.target) ||
    e.currentTarget.contains(e.target.closest(LIt)) ||
    (e.preventDefault(), t.focus());
}
return {ComposerLayout:Object.assign(cLt,{ModeSurface:nLt,AnimateLayout:iLt,Attachments:uLt,Body:CLt,Footer:mLt,FooterAction:hLt,FooterActions:_Lt,FooterControls:vLt,FooterDivider:xLt,FooterExpandingControls:bLt,FooterInlineControls:yLt,FooterLabel:SLt,Input:dLt,ReplyContext:lLt,Editor:ELt}),ComposerEnvironment:KS,ComposerPresentation:FIt,ComposerLayoutContext:QS};
}
