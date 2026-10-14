// Original dropdown controller. Required primitives remain a separate extraction boundary.
import {classNames as q} from './classNames.js';
export function createDropdownController({React,primitives,eventBridge,TooltipOverlayContext,visualScale=1,compilerRuntime=React.__COMPILER_RUNTIME}){
 for(const name of ['Root','Trigger','Content','Portal','Layer','ModalLayer'])if(!primitives?.[name])throw new TypeError('Missing dropdown primitive '+name);
 if(!eventBridge?.subscribe||!compilerRuntime?.c)throw new TypeError('Dropdown requires event subscription and compiler runtime');
 const {Root:pb,Trigger,Content,Portal:Vji,Layer:hb,ModalLayer:Hji}=primitives,y7={Trigger,Content},Hf=eventBridge;
 const t=fn=>{let initialized=false;return()=>{if(!initialized){initialized=true;fn();}};},c=()=>compilerRuntime,o=()=>React,Uf=()=>{},x5=()=>{};
 const m7=compilerRuntime,h7=React,v5=TooltipOverlayContext??React.createContext(undefined),d5=()=>visualScale;
 const g7={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
 const Yji=200,Xji=100,Zji={top:'bottom',right:'left',bottom:'top',left:'right'},C5=8,b5='codex:dismiss-tooltips';
 const _7={maxWidth:'min(var(--radix-dropdown-menu-content-available-width), calc(100vw - 16px))',maxHeight:'min(var(--radix-dropdown-menu-content-available-height), calc(100vh - 16px))'};
 let MAi,NAi,PAi,FAi,M5;
function OAi(e) {
  return e == null ? void 0 : PAi[e];
}
function kAi(e, t) {
  if (e != null) return `min(${FAi[e]}, ${t}, calc(100vh - 16px))`;
}
function jAi(e, t, n) {
  let r = (0, MAi.c)(18),
    i;
  r[0] === n ? (i = r[1]) : ((i = n === void 0 ? {} : n), (r[0] = n), (r[1] = i));
  let { disabled: a, dismissOnWindowBlur: o } = i,
    s = a !== void 0 && a,
    c = o === void 0 || o,
    [l, u] = (0, NAi.useState)(!1);
  s && l && u(!1);
  let d = !s && (e ?? l),
    f;
  r[2] !== e || r[3] !== s || r[4] !== t
    ? ((f = (n) => {
        (s && n) || (n && qxi(), e === void 0 && u(n), t?.(n));
      }),
      (r[2] = e),
      (r[3] = s),
      (r[4] = t),
      (r[5] = f))
    : (f = r[5]);
  let p = f,
    m;
  r[6] === p
    ? (m = r[7])
    : ((m = () => {
        p(!1);
      }),
      (r[6] = p),
      (r[7] = m));
  let h = (0, NAi.useEffectEvent)(m),
    g;
  r[8] !== c || r[9] !== h || r[10] !== d
    ? ((g = () => {
        if (!d) return;
        let e = () => {
          h();
        };
        window.innerWidth;
        let t = Hf.subscribe(`browser-sidebar-web-contents-pointer-down`, e);
        return (
          c && window.addEventListener(`blur`, e),
          () => {
            (t(), window.removeEventListener(`blur`, e));
          }
        );
      }),
      (r[8] = c),
      (r[9] = h),
      (r[10] = d),
      (r[11] = g))
    : (g = r[11]);
  let _;
  (r[12] !== c || r[13] !== d ? ((_ = [c, d]), (r[12] = c), (r[13] = d), (r[14] = _)) : (_ = r[14]),
    (0, NAi.useEffect)(g, _));
  let v;
  return (
    r[15] !== p || r[16] !== d
      ? ((v = { handleOpenChange: p, open: d }), (r[15] = p), (r[16] = d), (r[17] = v))
      : (v = r[17]),
    v
  );
}
function AAi(e) {
  let t = e?.closest(`[data-dropdown-overlay-side]`)?.getAttribute(`data-dropdown-overlay-side`);
  return t === `bottom` || t === `top` ? t : void 0;
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
function qxi() {
  typeof window > `u` || window.dispatchEvent(new Event(b5));
}
function $xi({
  destinationElement: e,
  destinationSide: t,
  onEnterDestination: n,
  onMoveInsideTriangle: r,
  onMoveOutsideTriangle: i,
  pointer: a,
  sourceElement: o,
}) {
  if (rSi(e.getBoundingClientRect()) || (o != null && rSi(o.getBoundingClientRect()))) return null;
  let s = e.ownerDocument,
    c = (s) => {
      let c = s.composedPath();
      if (c.includes(e) || (o != null && c.includes(o))) {
        n();
        return;
      }
      let l = { x: s.clientX, y: s.clientY },
        u = eSi({
          destinationRect: e.getBoundingClientRect(),
          destinationSide: t,
          pointer: a,
          sourceRect: o?.getBoundingClientRect(),
        });
      if (u != null && tSi(l, u)) {
        r(l);
        return;
      }
      i();
    };
  return (
    s.addEventListener(`pointermove`, c, !0),
    () => {
      s.removeEventListener(`pointermove`, c, !0);
    }
  );
}
function eSi({ destinationRect: e, destinationSide: t, pointer: n, sourceRect: r }) {
  if (rSi(e) || (r != null && rSi(r))) return null;
  if (t === `left` || t === `right`) {
    let r = t === `right` ? e.left : e.right;
    return { start: n, endA: { x: r, y: e.top - C5 }, endB: { x: r, y: e.bottom + C5 } };
  }
  let i = t === `bottom` ? e.top : e.bottom;
  return { start: n, endA: { x: e.left - C5, y: i }, endB: { x: e.right + C5, y: i } };
}
function tSi(e, t) {
  let n = nSi(e, t.start, t.endA),
    r = nSi(e, t.endA, t.endB),
    i = nSi(e, t.endB, t.start);
  return !((n < 0 || r < 0 || i < 0) && (n > 0 || r > 0 || i > 0));
}
function nSi(e, t, n) {
  return (e.x - n.x) * (t.y - n.y) - (t.x - n.x) * (e.y - n.y);
}
function rSi(e) {
  return e.width <= 0 || e.height <= 0;
}
function Uji(e) {
  let t = (0, m7.c)(12),
    { content: n, loadingContent: r, open: i } = e,
    a = (0, h7.useRef)(i),
    o,
    s;
  (t[0] === i
    ? ((o = t[1]), (s = t[2]))
    : ((o = () => {
        a.current = i;
      }),
      (s = [i]),
      (t[0] = i),
      (t[1] = o),
      (t[2] = s)),
    (0, h7.useLayoutEffect)(o, s));
  let c;
  t[3] === n.props
    ? (c = t[4])
    : ((c = (e) => {
        a.current ? e.preventDefault() : n.props.onCloseAutoFocus?.(e);
      }),
      (t[3] = n.props),
      (t[4] = c));
  let l;
  t[5] !== n.props || t[6] !== r || t[7] !== c
    ? ((l = (0, g7.jsx)(y7.Content, { ...n.props, onCloseAutoFocus: c, children: r })),
      (t[5] = n.props),
      (t[6] = r),
      (t[7] = c),
      (t[8] = l))
    : (l = t[8]);
  let u;
  return (
    t[9] !== n || t[10] !== l
      ? ((u = (0, g7.jsx)(h7.Suspense, { fallback: l, children: n })),
        (t[9] = n),
        (t[10] = l),
        (t[11] = u))
      : (u = t[11]),
    u
  );
}
function p7(e) {
  "use forget";
  let t = (0, m7.c)(137),
    {
      triggerButton: n,
      disabled: r,
      children: i,
      loadingContent: a,
      modal: o,
      open: s,
      openOnHover: c,
      onOpenChange: l,
      dir: u,
      side: d,
      align: f,
      sideOffset: p,
      getPlacement: m,
      alignOffset: h,
      contentRef: g,
      contentRole: _,
      contentAriaLabelledBy: v,
      scrollFade: y,
      scrollPeek: b,
      onContentFocus: x,
      onContentKeyDownCapture: S,
      onContentPointerDownCapture: C,
      onContentPointerEnter: w,
      onContentPointerLeave: T,
      onOpenAutoFocus: E,
      onCloseAutoFocus: D,
      onEscapeKeyDown: O,
      onInteractOutside: k,
      contentClassName: A,
      contentVariant: j,
      contentStyle: M,
      size: N,
      rowLayout: P,
      surface: F,
      contentWidth: ee,
      contentMaxWidth: te,
      matchTriggerWidth: ne,
      contentMaxHeight: re,
      portalContainer: I,
    } = e,
    L = o !== void 0 && o,
    R = c !== void 0 && c,
    ie = _ === void 0 ? `menu` : _,
    ae = F === void 0 ? `menu` : F,
    oe = ne !== void 0 && ne,
    se = d5(),
    ce = `calc(var(--radix-dropdown-menu-trigger-width) / ${se})`,
    le = (0, h7.useRef)(null),
    [ue, de] = (0, h7.useState)(null),
    fe = (0, h7.useRef)(null),
    pe = (0, h7.useRef)(void 0),
    me = (0, h7.useRef)(null),
    he = (0, h7.useRef)(!1),
    ge = m == null ? void 0 : de,
    _e;
  t[0] !== g || t[1] !== ge
    ? ((_e = M5(g, ge)), (t[0] = g), (t[1] = ge), (t[2] = _e))
    : (_e = t[2]);
  let ve = _e,
    [ye, be] = (0, h7.useState)(),
    xe = ye?.alignOffset ?? h,
    [Se, Ce] = (0, h7.useState)(),
    we;
  t[3] === r
    ? (we = t[4])
    : ((we = { disabled: r, dismissOnWindowBlur: !1 }), (t[3] = r), (t[4] = we));
  let { handleOpenChange: Te, open: Ee } = jAi(s, l, we),
    De = (0, h7.useContext)(v5)?.registerOpen,
    Oe,
    ke;
  (t[5] !== Ee || t[6] !== De
    ? ((ke = () => {
        if (Ee) return De?.();
      }),
      (Oe = [Ee, De]),
      (t[5] = Ee),
      (t[6] = De),
      (t[7] = Oe),
      (t[8] = ke))
    : ((Oe = t[7]), (ke = t[8])),
    (0, h7.useLayoutEffect)(ke, Oe),
    !Ee && ye != null && be(void 0));
  let Ae;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ae = function () {
        (window.clearTimeout(pe.current), me.current?.(), (me.current = null));
      }),
      (t[9] = Ae))
    : (Ae = t[9]);
  let je = Ae,
    Me;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Me = function () {
        (je(), (he.current = !1));
      }),
      (t[10] = Me))
    : (Me = t[10]);
  let Ne = Me,
    Pe;
  t[11] === Te
    ? (Pe = t[12])
    : ((Pe = function (e) {
        (je(), e && (he.current = !1), Te(e));
      }),
      (t[11] = Te),
      (t[12] = Pe));
  let Fe = Pe,
    Ie = (0, h7.useEffectEvent)(je),
    Le;
  t[13] === Ie ? (Le = t[14]) : ((Le = () => () => Ie()), (t[13] = Ie), (t[14] = Le));
  let Re;
  (t[15] !== r || t[16] !== Ee || t[17] !== R
    ? ((Re = [r, Ee, R]), (t[15] = r), (t[16] = Ee), (t[17] = R), (t[18] = Re))
    : (Re = t[18]),
    (0, h7.useEffect)(Le, Re));
  let ze;
  t[19] !== Te || t[20] !== Ee || t[21] !== R
    ? ((ze = function (e) {
        if (!R || e.pointerType !== `mouse` || (je(), !Ee || !he.current)) return;
        let t = () => {
            (je(), Te(!1));
          },
          n = () => {
            (window.clearTimeout(pe.current), (pe.current = window.setTimeout(t, Xji)));
          },
          r = e.currentTarget === le.current,
          i = r ? fe.current : le.current,
          a = fe.current?.dataset.side;
        (i != null &&
          (a === `top` || a === `right` || a === `bottom` || a === `left`) &&
          (me.current = $xi({
            sourceElement: e.currentTarget,
            destinationElement: i,
            destinationSide: r ? a : Zji[a],
            pointer: { x: e.clientX, y: e.clientY },
            onEnterDestination: je,
            onMoveInsideTriangle: n,
            onMoveOutsideTriangle: t,
          })),
          n());
      }),
      (t[19] = Te),
      (t[20] = Ee),
      (t[21] = R),
      (t[22] = ze))
    : (ze = t[22]);
  let Be = ze,
    Ve,
    He;
  (t[23] !== ue || t[24] !== m || t[25] !== Ee || t[26] !== se
    ? ((Ve = () => {
        let e = le.current;
        if (!Ee || m == null || e == null) return;
        let t = () => {
          let t = m(e, se, ue?.offsetWidth);
          be((e) =>
            e?.side === t.side &&
            e?.align === t.align &&
            e?.sideOffset === t.sideOffset &&
            e?.alignOffset === t.alignOffset
              ? e
              : t,
          );
        };
        t();
        let n = ue == null ? null : new ResizeObserver(t);
        return (
          ue != null && n?.observe(ue),
          e.ownerDocument.defaultView?.addEventListener(`resize`, t),
          () => {
            (n?.disconnect(), e.ownerDocument.defaultView?.removeEventListener(`resize`, t));
          }
        );
      }),
      (He = [ue, m, Ee, se]),
      (t[23] = ue),
      (t[24] = m),
      (t[25] = Ee),
      (t[26] = se),
      (t[27] = Ve),
      (t[28] = He))
    : ((Ve = t[27]), (He = t[28])),
    (0, h7.useLayoutEffect)(Ve, He));
  let Ue;
  t[29] !== g || t[30] !== m || t[31] !== ve || t[32] !== R
    ? ((Ue =
        m == null && !R
          ? g
          : (e) => {
              fe.current = e;
              let t = ve(e);
              return () => {
                ((fe.current = null), t?.());
              };
            }),
      (t[29] = g),
      (t[30] = m),
      (t[31] = ve),
      (t[32] = R),
      (t[33] = Ue))
    : (Ue = t[33]);
  let We;
  t[34] === v
    ? (We = t[35])
    : ((We = v == null ? {} : { "aria-labelledby": v }), (t[34] = v), (t[35] = We));
  let Ge = Se ?? ye?.side ?? d,
    Ke = ye?.align ?? f,
    qe = ye?.sideOffset ?? p,
    Je;
  t[36] === S
    ? (Je = t[37])
    : ((Je = (e) => {
        (Ne(), S?.(e));
      }),
      (t[36] = S),
      (t[37] = Je));
  let Ye;
  t[38] === C
    ? (Ye = t[39])
    : ((Ye = (e) => {
        (Ne(), C?.(e));
      }),
      (t[38] = C),
      (t[39] = Ye));
  let Xe;
  t[40] === w
    ? (Xe = t[41])
    : ((Xe = (e) => {
        (je(), w?.(e));
      }),
      (t[40] = w),
      (t[41] = Xe));
  let Ze;
  t[42] !== Be || t[43] !== T
    ? ((Ze = (e) => {
        (T?.(e), e.defaultPrevented || Be(e));
      }),
      (t[42] = Be),
      (t[43] = T),
      (t[44] = Ze))
    : (Ze = t[44]);
  let Qe;
  t[45] === E
    ? (Qe = t[46])
    : ((Qe = (e) => {
        (he.current && e.preventDefault(), E?.(e));
      }),
      (t[45] = E),
      (t[46] = Qe));
  let $e;
  t[47] === D
    ? ($e = t[48])
    : (($e = (e) => {
        (he.current && e.preventDefault(), D?.(e), (he.current = !1));
      }),
      (t[47] = D),
      (t[48] = $e));
  let et;
  t[49] !== k || t[50] !== R
    ? ((et = (e) => {
        (R && e.target instanceof Node && le.current?.contains(e.target) && e.preventDefault(),
          k?.(e));
      }),
      (t[49] = k),
      (t[50] = R),
      (t[51] = et))
    : (et = t[51]);
  let tt;
  t[52] !== A || t[53] !== ee
    ? ((tt = q(OAi(ee), A)), (t[52] = A), (t[53] = ee), (t[54] = tt))
    : (tt = t[54]);
  let nt;
  t[55] !== oe || t[56] !== ce
    ? ((nt = oe ? { width: ce, minWidth: ce } : null), (t[55] = oe), (t[56] = ce), (t[57] = nt))
    : (nt = t[57]);
  let rt;
  t[58] === re
    ? (rt = t[59])
    : ((rt = kAi(re, `var(--radix-dropdown-menu-content-available-height)`) ?? _7.maxHeight),
      (t[58] = re),
      (t[59] = rt));
  let it = I == null && se !== 1 ? se : void 0,
    at;
  t[60] !== M || t[61] !== nt || t[62] !== rt || t[63] !== it
    ? ((at = { ...M, ...nt, maxHeight: rt, zoom: it }),
      (t[60] = M),
      (t[61] = nt),
      (t[62] = rt),
      (t[63] = it),
      (t[64] = at))
    : (at = t[64]);
  let ot;
  t[65] !== xe ||
  t[66] !== i ||
  t[67] !== te ||
  t[68] !== ie ||
  t[69] !== j ||
  t[70] !== x ||
  t[71] !== O ||
  t[72] !== P ||
  t[73] !== y ||
  t[74] !== b ||
  t[75] !== N ||
  t[76] !== ae ||
  t[77] !== Ue ||
  t[78] !== We ||
  t[79] !== Ge ||
  t[80] !== Ke ||
  t[81] !== qe ||
  t[82] !== Je ||
  t[83] !== Ye ||
  t[84] !== Xe ||
  t[85] !== Ze ||
  t[86] !== Qe ||
  t[87] !== $e ||
  t[88] !== et ||
  t[89] !== tt ||
  t[90] !== at
    ? ((ot = (0, g7.jsx)(y7.Content, {
        ref: Ue,
        role: ie,
        ...We,
        scrollFade: y,
        scrollPeek: b,
        side: Ge,
        align: Ke,
        sideOffset: qe,
        alignOffset: xe,
        onFocus: x,
        onKeyDownCapture: Je,
        onPointerDownCapture: Ye,
        onPointerEnter: Xe,
        onPointerLeave: Ze,
        onOpenAutoFocus: Qe,
        onCloseAutoFocus: $e,
        onEscapeKeyDown: O,
        onInteractOutside: et,
        size: N,
        maxWidth: te,
        rowLayout: P,
        surface: ae,
        variant: j,
        className: tt,
        style: at,
        children: i,
      })),
      (t[65] = xe),
      (t[66] = i),
      (t[67] = te),
      (t[68] = ie),
      (t[69] = j),
      (t[70] = x),
      (t[71] = O),
      (t[72] = P),
      (t[73] = y),
      (t[74] = b),
      (t[75] = N),
      (t[76] = ae),
      (t[77] = Ue),
      (t[78] = We),
      (t[79] = Ge),
      (t[80] = Ke),
      (t[81] = qe),
      (t[82] = Je),
      (t[83] = Ye),
      (t[84] = Xe),
      (t[85] = Ze),
      (t[86] = Qe),
      (t[87] = $e),
      (t[88] = et),
      (t[89] = tt),
      (t[90] = at),
      (t[91] = ot))
    : (ot = t[91]);
  let st = ot,
    ct;
  t[92] === Ee
    ? (ct = t[93])
    : ((ct = (e) => {
        ((le.current = e), e != null && Ee && Ce(AAi(e)));
      }),
      (t[92] = Ee),
      (t[93] = ct));
  let lt;
  t[94] !== r || t[95] !== Te || t[96] !== Ee || t[97] !== R
    ? ((lt = (e) => {
        !R ||
          r ||
          e.defaultPrevented ||
          e.pointerType !== `mouse` ||
          (je(),
          Ee ||
            (pe.current = window.setTimeout(() => {
              ((he.current = !0), Te(!0));
            }, Yji)));
      }),
      (t[94] = r),
      (t[95] = Te),
      (t[96] = Ee),
      (t[97] = R),
      (t[98] = lt))
    : (lt = t[98]);
  let ut;
  t[99] === R
    ? (ut = t[100])
    : ((ut = (e) => {
        R && !e.defaultPrevented && e.button === 0 && !e.ctrlKey && (je(), e.preventDefault());
      }),
      (t[99] = R),
      (t[100] = ut));
  let dt;
  t[101] !== Fe || t[102] !== r || t[103] !== Ee || t[104] !== R
    ? ((dt = (e) => {
        if (R && !r && !e.defaultPrevented && e.button === 0 && !e.ctrlKey && e.detail !== 0) {
          let e = !Ee || he.current;
          (Fe(e), e && fe.current?.focus({ preventScroll: !0 }));
        }
      }),
      (t[101] = Fe),
      (t[102] = r),
      (t[103] = Ee),
      (t[104] = R),
      (t[105] = dt))
    : (dt = t[105]);
  let ft;
  t[106] !== Ee || t[107] !== R
    ? ((ft = (e) => {
        if (
          R &&
          !e.defaultPrevented &&
          (Ne(), Ee && [`Enter`, ` `, `ArrowDown`, `ArrowUp`].includes(e.key))
        ) {
          e.preventDefault();
          let t = fe.current?.querySelectorAll(`[role^="menuitem"]:not([data-disabled])`);
          (e.key === `ArrowUp` ? t?.[t.length - 1] : t?.[0])?.focus();
        }
      }),
      (t[106] = Ee),
      (t[107] = R),
      (t[108] = ft))
    : (ft = t[108]);
  let pt;
  t[109] !== r ||
  t[110] !== Be ||
  t[111] !== ct ||
  t[112] !== lt ||
  t[113] !== ut ||
  t[114] !== dt ||
  t[115] !== ft ||
  t[116] !== n
    ? ((pt = (0, g7.jsx)(y7.Trigger, {
        ref: ct,
        asChild: !0,
        disabled: r,
        onPointerEnter: lt,
        onPointerLeave: Be,
        onPointerDown: ut,
        onClick: dt,
        onKeyDown: ft,
        children: n,
      })),
      (t[109] = r),
      (t[110] = Be),
      (t[111] = ct),
      (t[112] = lt),
      (t[113] = ut),
      (t[114] = dt),
      (t[115] = ft),
      (t[116] = n),
      (t[117] = pt))
    : (pt = t[117]);
  let mt;
  t[118] !== r || t[119] !== L || t[120] !== Ee || t[121] !== I
    ? ((mt =
        !r && L && Ee
          ? (0, g7.jsx)(hb, {
              container: I ?? void 0,
              children: (0, g7.jsx)(Hji, {
                container: I ?? void 0,
                children: (0, g7.jsx)(`div`, {
                  "aria-hidden": !0,
                  className: `pointer-events-auto fixed inset-0`,
                }),
              }),
            })
          : null),
      (t[118] = r),
      (t[119] = L),
      (t[120] = Ee),
      (t[121] = I),
      (t[122] = mt))
    : (mt = t[122]);
  let ht;
  t[123] !== st || t[124] !== r || t[125] !== a || t[126] !== Ee || t[127] !== I
    ? ((ht =
        !r &&
        (0, g7.jsx)(Vji, {
          container: I ?? void 0,
          children:
            a === void 0 ? st : (0, g7.jsx)(Uji, { content: st, loadingContent: a, open: Ee }),
        })),
      (t[123] = st),
      (t[124] = r),
      (t[125] = a),
      (t[126] = Ee),
      (t[127] = I),
      (t[128] = ht))
    : (ht = t[128]);
  let gt;
  return (
    t[129] !== Fe ||
    t[130] !== u ||
    t[131] !== L ||
    t[132] !== Ee ||
    t[133] !== pt ||
    t[134] !== mt ||
    t[135] !== ht
      ? ((gt = (0, g7.jsxs)(pb, {
          dir: u,
          modal: L,
          open: Ee,
          onOpenChange: Fe,
          children: [pt, mt, ht],
        })),
        (t[129] = Fe),
        (t[130] = u),
        (t[131] = L),
        (t[132] = Ee),
        (t[133] = pt),
        (t[134] = mt),
        (t[135] = ht),
        (t[136] = gt))
      : (gt = t[136]),
    gt
  );
}
 a7();pCi();
 return {Dropdown:p7,useDropdownState:jAi,DropdownSuspense:Uji,menuWidthClass:OAi,menuMaxHeight:kAi,overlaySide:AAi};
}
