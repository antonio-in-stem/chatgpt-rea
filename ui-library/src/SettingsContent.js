// Original settings content layout, navigation target effects and page header.
import {classNames as ng} from './classNames.js';
export function createSettingsContent({React,motion:Kl,useTransform:Vi,useLayoutEnvironment:Qa,TitleBarContext,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!Kl?.div||typeof Vi!=='function'||typeof Qa!=='function')throw new TypeError('SettingsContent requires motion, useTransform and the host layout subscription adapter');
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const HMs=compilerRuntime,YMs=compilerRuntime,tYa=compilerRuntime,lYa=compilerRuntime,XMs=React,nYa=React,D6=runtime,O6=runtime,SZ=runtime,wZ=runtime,e=fn=>fn,t=e;
const GMs=React.createContext(null),lC=TitleBarContext??React.createContext(null),KRt=Symbol('host layout subscription'),ru=[0.23,1,0.32,1];
// In qMs the kG header path is guarded by `let k = O && !1` in the shipped body.
const kG={};
let RJa,zJa,BJa,VJa,HJa,UJa,WJa,GJa,KJa,qJa,JJa,YJa,XJa,xZ,M5;
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
function VMs(e) {
  let t = (0, HMs.c)(30),
    { actions: n, asset: r, subtitle: i, subtitleClassName: a, title: o, variant: s } = e,
    c = s === void 0 ? `default` : s,
    l;
  t[0] === r
    ? (l = t[1])
    : ((l = r == null ? null : (0, D6.jsx)(`div`, { className: `flex`, children: r })),
      (t[0] = r),
      (t[1] = l));
  let u = c === `page` ? `flex-nowrap` : `flex-wrap`,
    d;
  t[2] === u
    ? (d = t[3])
    : ((d = ng(`flex min-w-0 items-start justify-between gap-4`, u)), (t[2] = u), (t[3] = d));
  let f = c === `settingsCompact` ? `gap-1.25` : `gap-1.5`,
    p;
  t[4] === f
    ? (p = t[5])
    : ((p = ng(`flex min-w-0 flex-1 basis-64 flex-col`, f)), (t[4] = f), (t[5] = p));
  let m = c === `settings` && `heading-lg font-normal`,
    h = c === `settingsCompact` && `heading-lg font-semibold leading-7`,
    g = c === `page` && `heading-lg electron:heading-xl`,
    _ = c === "default" && `heading-base electron:heading-lg`,
    v;
  t[6] !== _ || t[7] !== m || t[8] !== h || t[9] !== g
    ? ((v = ng(`min-w-0 break-words text-default`, m, h, g, _)),
      (t[6] = _),
      (t[7] = m),
      (t[8] = h),
      (t[9] = g),
      (t[10] = v))
    : (v = t[10]);
  let y;
  t[11] !== v || t[12] !== o
    ? ((y = (0, D6.jsx)(`h1`, { className: v, children: o })),
      (t[11] = v),
      (t[12] = o),
      (t[13] = y))
    : (y = t[13]);
  let b;
  t[14] !== i || t[15] !== a
    ? ((b =
        i == null
          ? null
          : (0, D6.jsx)(`div`, { className: ng(`text-base text-secondary`, a), children: i })),
      (t[14] = i),
      (t[15] = a),
      (t[16] = b))
    : (b = t[16]);
  let x;
  t[17] !== y || t[18] !== b || t[19] !== p
    ? ((x = (0, D6.jsxs)(`div`, { className: p, children: [y, b] })),
      (t[17] = y),
      (t[18] = b),
      (t[19] = p),
      (t[20] = x))
    : (x = t[20]);
  let S;
  t[21] === n
    ? (S = t[22])
    : ((S =
        n == null
          ? null
          : (0, D6.jsx)(`div`, {
              className: `flex max-w-full shrink-0 items-center gap-2`,
              children: n,
            })),
      (t[21] = n),
      (t[22] = S));
  let C;
  t[23] !== x || t[24] !== S || t[25] !== d
    ? ((C = (0, D6.jsxs)(`div`, { className: d, children: [x, S] })),
      (t[23] = x),
      (t[24] = S),
      (t[25] = d),
      (t[26] = C))
    : (C = t[26]);
  let w;
  return (
    t[27] !== C || t[28] !== l
      ? ((w = (0, D6.jsxs)(`header`, {
          className: `flex flex-col gap-4 px-[var(--detail-page-inline-inset,0px)]`,
          children: [l, C],
        })),
        (t[27] = C),
        (t[28] = l),
        (t[29] = w))
      : (w = t[29]),
    w
  );
}
function qMs(e) {
  let t = (0, YMs.c)(115),
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
    y;
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
      (y = t[18]))
    : (({
        title: v,
        asset: r,
        backSlot: i,
        subtitle: m,
        children: a,
        fullWidth: g,
        contentClassName: s,
        subtitleClassName: h,
        action: n,
        toolbarActions: y,
        stickyControls: p,
        footer: l,
        embedded: _,
        density: c,
        scrollResetKey: f,
        ref: u,
        className: o,
        ...d
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
      (t[18] = y));
  let b = g !== void 0 && g,
    x = _ !== void 0 && _,
    S = c ?? `default`,
    C = (0, XMs.useRef)(null),
    w = (0, XMs.useRef)(null),
    [T, E] = (0, XMs.useState)(!1),
    D = (0, XMs.useContext)(GMs),
    O = !!D?.slateLayout && !x;
  Qa(KRt);
  let k = O && !1,
    A = D?.targetId ?? null,
    j = D?.targetText ?? null,
    M = D?.navigationKey ?? null,
    N,
    P;
  (t[19] === f
    ? ((N = t[20]), (P = t[21]))
    : ((N = () => {
        f != null && w.current != null && (w.current.scrollTop = 0);
      }),
      (P = [f]),
      (t[19] = f),
      (t[20] = N),
      (t[21] = P)),
    (0, XMs.useLayoutEffect)(N, P));
  let F;
  t[22] !== A || t[23] !== j
    ? ((F = () => {
        if (A == null && j == null) return;
        let e = C.current;
        if (e == null) return;
        let t = () => {
            if (j == null) return A == null ? null : document.getElementById(A);
            let t = j.trim().toLocaleLowerCase(),
              n = t.split(/\s+/u),
              r = null;
            for (let i of e.querySelectorAll(`*`)) {
              let e = (i.getAttribute(`placeholder`) ?? i.textContent)?.trim().toLocaleLowerCase();
              if (
                e == null ||
                !n.every((t) => e.includes(t)) ||
                i.closest(`[hidden], [aria-hidden="true"]`) != null
              )
                continue;
              let a = e.includes(t);
              (r == null ||
                (a && !r.isContiguous) ||
                (a === r.isContiguous && e.length <= r.text.length)) &&
                (r = { element: i, isContiguous: a, text: e });
            }
            return r?.element ?? null;
          },
          n,
          r = (t) => {
            if ((t.scrollIntoView?.({ block: `center` }), j == null)) return;
            let r = document.documentElement.dataset.reducedMotion === `true`,
              i = t.closest(`button`),
              a = i?.parentElement ?? t;
            if (i == null) {
              let n = t.closest(`section`);
              for (let r = t.parentElement; r != null && r !== n && r !== e; r = r.parentElement)
                if (
                  Array.from(r.children).some(
                    (e) =>
                      !e.contains(t) &&
                      (e.matches(
                        `button, input, select, textarea, [role="switch"], [role="checkbox"], [role="combobox"]`,
                      ) ||
                        e.querySelector(
                          `button, input, select, textarea, [role="switch"], [role="checkbox"], [role="combobox"]`,
                        ) != null),
                  )
                ) {
                  a = r;
                  break;
                }
            }
            n = a.animate?.(
              r
                ? [
                    { backgroundColor: `var(--color-background-primary-ghost-hover)` },
                    { backgroundColor: `var(--color-background-primary-ghost-hover)` },
                  ]
                : [
                    { backgroundColor: `var(--color-background-primary-ghost-hover)` },
                    {
                      backgroundColor: `var(--color-background-primary-ghost-hover)`,
                      offset: 0.35,
                    },
                    { backgroundColor: `transparent` },
                  ],
              { duration: 450, easing: `cubic-bezier(${ru.join(`, `)})` },
            );
          },
          i,
          a =
            j == null
              ? new ResizeObserver(() => {
                  let e = t();
                  e != null && r(e);
                })
              : null,
          o = () => {
            (i?.disconnect(), a?.disconnect());
            for (let t of [`wheel`, `pointerdown`, `keydown`])
              e.ownerDocument.removeEventListener(t, o);
          };
        if (a != null) {
          a.observe(e);
          for (let t of [`wheel`, `pointerdown`, `keydown`])
            e.ownerDocument.addEventListener(t, o, { passive: !0 });
        }
        let s = t();
        return (
          s == null
            ? ((i = new MutationObserver(() => {
                let e = t();
                e != null && (r(e), i?.disconnect());
              })),
              i.observe(j == null ? document.body : e, { childList: !0, subtree: !0 }))
            : r(s),
          () => {
            (o(), n?.cancel());
          }
        );
      }),
      (t[22] = A),
      (t[23] = j),
      (t[24] = F))
    : (F = t[24]);
  let I;
  (t[25] !== M || t[26] !== A || t[27] !== j
    ? ((I = [M, A, j]), (t[25] = M), (t[26] = A), (t[27] = j), (t[28] = I))
    : (I = t[28]),
    (0, XMs.useLayoutEffect)(F, I));
  let L;
  t[29] === y
    ? (L = t[30])
    : ((L =
        y == null
          ? null
          : (0, O6.jsx)(`div`, {
              className: `ms-auto flex min-w-0 items-center justify-end gap-2 no-drag`,
              children: y,
            })),
      (t[29] = y),
      (t[30] = L));
  let R;
  t[31] !== i || t[32] !== L
    ? ((R = (0, O6.jsxs)(O6.Fragment, { children: [i, L] })), (t[31] = i), (t[32] = L), (t[33] = R))
    : (R = t[33]);
  let z = R,
    B = x ? `default` : `settings`;
  S === `compact` && (B = `settingsCompact`);
  let V = c === `compact` && `[--settings-section-gap:--spacing(5.5)]`,
    H =
      c === "default" &&
      (x && !b
        ? `[--settings-section-gap:var(--padding-panel)]`
        : `[--settings-section-gap:--spacing(10)]`),
    ee = b
      ? null
      : x
        ? `max-w-2xl`
        : `max-w-3xl electron:min-w-[min(100%,calc(320px*var(--codex-window-zoom)))]`,
    U;
  t[34] !== s || t[35] !== p || t[36] !== H || t[37] !== ee || t[38] !== V || t[39] !== O
    ? ((U = ng(
        `group/settings mx-auto flex w-full flex-col`,
        V,
        H,
        ee,
        O && [`px-panel pb-panel`, p == null && `pt-panel`],
        s,
      )),
      (t[34] = s),
      (t[35] = p),
      (t[36] = H),
      (t[37] = ee),
      (t[38] = V),
      (t[39] = O),
      (t[40] = U))
    : (U = t[40]);
  let te;
  t[41] !== n ||
  t[42] !== r ||
  t[43] !== S ||
  t[44] !== x ||
  t[45] !== B ||
  t[46] !== m ||
  t[47] !== h ||
  t[48] !== v ||
  t[49] !== O
    ? ((te =
        v == null || O
          ? null
          : (0, O6.jsx)(`div`, {
              className: ng(
                S === `compact` && `pb-5.5`,
                S === "default" && (x ? `pb-panel` : `pb-8`),
              ),
              children: (0, O6.jsx)(VMs, {
                actions: n,
                asset: r,
                subtitle: m,
                subtitleClassName: ng(`text-balance`, h),
                title: v,
                variant: B,
              }),
            })),
      (t[41] = n),
      (t[42] = r),
      (t[43] = S),
      (t[44] = x),
      (t[45] = B),
      (t[46] = m),
      (t[47] = h),
      (t[48] = v),
      (t[49] = O),
      (t[50] = te))
    : (te = t[50]);
  let ne;
  t[51] === p
    ? (ne = t[52])
    : ((ne =
        p == null ? null : (0, O6.jsx)(sYa, { className: `top-0 pt-panel pb-2`, children: p })),
      (t[51] = p),
      (t[52] = ne));
  let re =
      x && !b
        ? `gap-[var(--settings-section-gap,var(--padding-panel))]`
        : `gap-[var(--settings-section-gap,--spacing(10))]`,
    ie = p != null && `pt-5`,
    ae;
  t[53] !== re || t[54] !== ie
    ? ((ae = ng(`flex flex-col`, re, ie)), (t[53] = re), (t[54] = ie), (t[55] = ae))
    : (ae = t[55]);
  let oe;
  t[56] !== a || t[57] !== ae
    ? ((oe = (0, O6.jsx)(`div`, { className: ae, children: a })),
      (t[56] = a),
      (t[57] = ae),
      (t[58] = oe))
    : (oe = t[58]);
  let se;
  t[59] !== S || t[60] !== U || t[61] !== te || t[62] !== ne || t[63] !== oe
    ? ((se = (0, O6.jsxs)(`div`, {
        ref: C,
        className: U,
        "data-density": S,
        children: [te, ne, oe],
      })),
      (t[59] = S),
      (t[60] = U),
      (t[61] = te),
      (t[62] = ne),
      (t[63] = oe),
      (t[64] = se))
    : (se = t[64]);
  let ce = se;
  if (x) {
    let e;
    t[65] === o ? (e = t[66]) : ((e = ng(`flex min-h-0 flex-col`, o)), (t[65] = o), (t[66] = e));
    let n;
    t[67] !== i || t[68] !== z || t[69] !== y
      ? ((n =
          i != null || y != null
            ? (0, O6.jsx)(`div`, { className: `flex items-center pb-panel`, children: z })
            : null),
        (t[67] = i),
        (t[68] = z),
        (t[69] = y),
        (t[70] = n))
      : (n = t[70]);
    let r;
    return (
      t[71] !== ce || t[72] !== u || t[73] !== d || t[74] !== e || t[75] !== n
        ? ((r = (0, O6.jsxs)(`div`, { ref: u, className: e, ...d, children: [n, ce] })),
          (t[71] = ce),
          (t[72] = u),
          (t[73] = d),
          (t[74] = e),
          (t[75] = n),
          (t[76] = r))
        : (r = t[76]),
      r
    );
  }
  let le;
  t[77] === o
    ? (le = t[78])
    : ((le = ng(
        `flex h-full min-h-0 flex-col electron:overflow-hidden electron:bg-surface windows:rounded-tl-lg`,
        o,
      )),
      (t[77] = o),
      (t[78] = le));
  let ue;
  t[79] !== v || t[80] !== k
    ? ((ue = k
        ? (0, O6.jsx)(kG.Header, {
            divider: !1,
            children: (0, O6.jsx)(kG.HeaderToolbar, {
              children: (0, O6.jsx)(`h1`, {
                className: `min-w-0 truncate text-lg font-medium text-default select-none`,
                children: v,
              }),
            }),
          })
        : null),
      (t[79] = v),
      (t[80] = k),
      (t[81] = ue))
    : (ue = t[81]);
  let de;
  t[82] === z
    ? (de = t[83])
    : ((de = (0, O6.jsx)(O6.Fragment, {
        children: (0, O6.jsx)(`div`, {
          className: `flex items-center px-panel draggable electron:h-toolbar extension:h-toolbar-sm`,
          children: z,
        }),
      })),
      (t[82] = z),
      (t[83] = de));
  let fe = k ? T : void 0,
    pe = k || void 0,
    me;
  t[84] === k
    ? (me = t[85])
    : ((me = k ? (e) => E(e.currentTarget.scrollTop > 0) : void 0), (t[84] = k), (t[85] = me));
  let he = !O && `p-panel`,
    ge;
  t[86] === he
    ? (ge = t[87])
    : ((ge = ng(`flex-1 scrollbar-stable overflow-y-auto`, he)), (t[86] = he), (t[87] = ge));
  let _e;
  t[88] !== n ||
  t[89] !== r ||
  t[90] !== S ||
  t[91] !== b ||
  t[92] !== m ||
  t[93] !== h ||
  t[94] !== v ||
  t[95] !== k ||
  t[96] !== O
    ? ((_e =
        v == null || !O || k
          ? null
          : (0, O6.jsx)(QJa, {
              className: b ? void 0 : `max-w-3xl`,
              showDivider: !1,
              sticky: !1,
              title: (0, O6.jsxs)(O6.Fragment, {
                children: [
                  r == null ? null : (0, O6.jsx)(`div`, { className: `flex`, children: r }),
                  (0, O6.jsx)(`h1`, {
                    className: ng(`text-default`, S === `compact` ? `heading-lg` : `heading-xl`),
                    children: v,
                  }),
                  m == null
                    ? null
                    : (0, O6.jsx)(`div`, {
                        className: ng(`text-base leading-6 text-balance text-secondary`, h),
                        children: m,
                      }),
                ],
              }),
              actions: n == null ? null : (0, O6.jsx)(eYa, { search: null, actions: n }),
            })),
      (t[88] = n),
      (t[89] = r),
      (t[90] = S),
      (t[91] = b),
      (t[92] = m),
      (t[93] = h),
      (t[94] = v),
      (t[95] = k),
      (t[96] = O),
      (t[97] = _e))
    : (_e = t[97]);
  let ve;
  t[98] !== ce || t[99] !== fe || t[100] !== pe || t[101] !== me || t[102] !== ge || t[103] !== _e
    ? ((ve = (0, O6.jsxs)(`div`, {
        ref: w,
        "data-app-shell-page-scrolled": fe,
        "data-settings-mobile-header": pe,
        onScroll: me,
        className: ge,
        children: [_e, ce],
      })),
      (t[98] = ce),
      (t[99] = fe),
      (t[100] = pe),
      (t[101] = me),
      (t[102] = ge),
      (t[103] = _e),
      (t[104] = ve))
    : (ve = t[104]);
  let ye;
  t[105] === l
    ? (ye = t[106])
    : ((ye =
        l != null &&
        (0, O6.jsx)(`div`, {
          className: `flex flex-wrap items-center justify-end gap-2 border-t border-primary-outline bg-surface px-panel py-3`,
          children: l,
        })),
      (t[105] = l),
      (t[106] = ye));
  let be;
  return (
    t[107] !== u ||
    t[108] !== d ||
    t[109] !== le ||
    t[110] !== ue ||
    t[111] !== de ||
    t[112] !== ve ||
    t[113] !== ye
      ? ((be = (0, O6.jsxs)(`div`, { ref: u, className: le, ...d, children: [ue, de, ve, ye] })),
        (t[107] = u),
        (t[108] = d),
        (t[109] = le),
        (t[110] = ue),
        (t[111] = de),
        (t[112] = ve),
        (t[113] = ye),
        (t[114] = be))
      : (be = t[114]),
    be
  );
}
function JMs(e) {
  let t = (0, YMs.c)(8),
    { children: n, navigationKey: r, slateLayout: i, targetId: a, targetText: o } = e,
    s = i !== void 0 && i,
    c = o === void 0 ? null : o,
    l;
  t[0] !== r || t[1] !== s || t[2] !== a || t[3] !== c
    ? ((l =
        a == null && c == null && !s
          ? null
          : { navigationKey: r, slateLayout: s, targetId: a, targetText: c }),
      (t[0] = r),
      (t[1] = s),
      (t[2] = a),
      (t[3] = c),
      (t[4] = l))
    : (l = t[4]);
  let u;
  return (
    t[5] !== n || t[6] !== l
      ? ((u = (0, O6.jsx)(GMs.Provider, { value: l, children: n })),
        (t[5] = n),
        (t[6] = l),
        (t[7] = u))
      : (u = t[7]),
    u
  );
}
function ZJa() {
  return (ZJa = e(() => {
    ((RJa = `_shell_bomwa_2`),
      (zJa = `_content_bomwa_2`),
      (BJa = `_headerRow_bomwa_2`),
      (VJa = `_title_bomwa_2`),
      (HJa = `_titleContent_bomwa_2`),
      (UJa = `_actions_bomwa_2`),
      (WJa = `_search_bomwa_2`),
      (GJa = `_navigation_bomwa_2`),
      (KJa = `_toolbar_bomwa_2`),
      (qJa = `_filterTags_bomwa_2`),
      (JJa = `_filterTagsContent_bomwa_2`),
      (YJa = `_viewControls_bomwa_2`),
      (XJa = `_pageActions_bomwa_2`),
      (xZ = {
        shell: RJa,
        content: zJa,
        headerRow: BJa,
        title: VJa,
        titleContent: HJa,
        actions: UJa,
        search: WJa,
        navigation: GJa,
        toolbar: KJa,
        filterTags: qJa,
        filterTagsContent: JJa,
        viewControls: YJa,
        pageActions: XJa,
      }));
  }))();
}
function QJa(e) {
  let t = (0, tYa.c)(34),
    {
      ref: n,
      className: r,
      horizontalPaddingClassName: i,
      collapseOnScroll: a,
      expandSearchWhenWrapped: o,
      showDivider: s,
      sticky: c,
      wrapActionsAtNarrowWidth: l,
      title: u,
      actions: d,
      navigation: f,
    } = e,
    p = i === void 0 ? `px-panel` : i,
    m = a !== void 0 && a,
    h = o !== void 0 && o,
    g = c === void 0 || c,
    _ = (0, nYa.useRef)(null),
    v;
  t[0] === n ? (v = t[1]) : ((v = Fd(_, n)), (t[0] = n), (t[1] = v));
  let y = v,
    b = (0, nYa.useRef)(null),
    x,
    S;
  (t[2] === m
    ? ((x = t[3]), (S = t[4]))
    : ((x = () => {
        let e = _.current,
          t = b.current;
        if (!e || !t) return;
        let n = new ResizeObserver(() => {
            let n = t.offsetLeft + parseFloat(getComputedStyle(t).paddingInlineStart);
            e.style.setProperty(`--header-content-start`, `${n}px`);
            let r = t.querySelector(`.${xZ.toolbar}`);
            if (!m || r == null) {
              e.removeAttribute(`data-collapsible`);
              return;
            }
            let i = t.querySelector(`.${xZ.titleContent}`);
            if (i == null) return;
            let a = i.parentElement;
            (e.style.setProperty(
              `--header-collapse-offset`,
              `${(a?.offsetHeight ?? 0) + parseFloat(getComputedStyle(e).paddingTop)}px`,
            ),
              e.toggleAttribute(`data-collapsible`, !0));
          }),
          r = () => {
            n.disconnect();
            let e = [t, ...t.querySelectorAll(`.${xZ.title}`)];
            for (let t of e) n.observe(t);
          },
          i = new MutationObserver(r);
        return (
          i.observe(t, { childList: !0, characterData: !0, subtree: !0 }),
          r(),
          () => {
            (n.disconnect(), i.disconnect());
          }
        );
      }),
      (S = [m]),
      (t[2] = m),
      (t[3] = x),
      (t[4] = S)),
    (0, nYa.useLayoutEffect)(x, S));
  let C = m || void 0,
    w = h || void 0,
    T = s || void 0,
    E = g || void 0,
    D = l || void 0,
    O = s ? `border-subtle` : `border-transparent`,
    k;
  t[5] === O ? (k = t[6]) : ((k = ng(xZ.shell, O)), (t[5] = O), (t[6] = k));
  let A;
  t[7] !== T || t[8] !== E || t[9] !== D || t[10] !== k || t[11] !== C || t[12] !== w
    ? ((A = {
        "data-scroll-collapse": C,
        "data-expand-search": w,
        "data-scrolled": T,
        "data-sticky": E,
        "data-wrap-actions": D,
        className: k,
      }),
      (t[7] = T),
      (t[8] = E),
      (t[9] = D),
      (t[10] = k),
      (t[11] = C),
      (t[12] = w),
      (t[13] = A))
    : (A = t[13]);
  let j = A,
    M;
  t[14] !== r || t[15] !== p
    ? ((M = ng(xZ.content, `mx-auto w-full`, p, r)), (t[14] = r), (t[15] = p), (t[16] = M))
    : (M = t[16]);
  let N;
  t[17] === u
    ? (N = t[18])
    : ((N =
        u == null
          ? null
          : (0, SZ.jsx)(`div`, {
              className: xZ.title,
              children: (0, SZ.jsx)(`div`, { className: xZ.titleContent, children: u }),
            })),
      (t[17] = u),
      (t[18] = N));
  let P;
  t[19] === d
    ? (P = t[20])
    : ((P = (0, SZ.jsx)(`div`, { className: xZ.actions, children: d })), (t[19] = d), (t[20] = P));
  let F;
  t[21] !== N || t[22] !== P
    ? ((F = (0, SZ.jsxs)(`div`, { className: xZ.headerRow, children: [N, P] })),
      (t[21] = N),
      (t[22] = P),
      (t[23] = F))
    : (F = t[23]);
  let I;
  t[24] === f
    ? (I = t[25])
    : ((I = (0, SZ.jsx)(`div`, { className: xZ.navigation, children: f })),
      (t[24] = f),
      (t[25] = I));
  let L;
  t[26] !== M || t[27] !== F || t[28] !== I
    ? ((L = (0, SZ.jsxs)(`div`, { ref: b, className: M, children: [F, I] })),
      (t[26] = M),
      (t[27] = F),
      (t[28] = I),
      (t[29] = L))
    : (L = t[29]);
  let R = L,
    z;
  return (
    t[30] !== R || t[31] !== j || t[32] !== y
      ? ((z = (0, SZ.jsxs)(SZ.Fragment, {
          children: [
            (0, SZ.jsx)(SZ.Fragment, { children: (0, SZ.jsx)($Ja, { ref: y, ...j, children: R }) }),
            null,
          ],
        })),
        (t[30] = R),
        (t[31] = j),
        (t[32] = y),
        (t[33] = z))
      : (z = t[33]),
    z
  );
}
function $Ja(e) {
  let t = (0, tYa.c)(7),
    n = (0, nYa.useContext)(lC),
    r;
  t[0] === n?.titleBarLeftInset
    ? (r = t[1])
    : ((r = () => `${n?.titleBarLeftInset.get() ?? 0}px`),
      (t[0] = n?.titleBarLeftInset),
      (t[1] = r));
  let i = Vi(r),
    a;
  t[2] === i
    ? (a = t[3])
    : ((a = { "--app-shell-titlebar-left-inset": i }), (t[2] = i), (t[3] = a));
  let o = a,
    s;
  return (
    t[4] !== e || t[5] !== o
      ? ((s = (0, SZ.jsx)(Kl.div, { ...e, style: o })), (t[4] = e), (t[5] = o), (t[6] = s))
      : (s = t[6]),
    s
  );
}
function eYa(e) {
  let t = (0, tYa.c)(14),
    { filterTags: n, controls: r, search: i, actions: a, fixedSearchWidth: o } = e,
    s;
  t[0] === n
    ? (s = t[1])
    : ((s = (0, SZ.jsx)(`div`, {
        className: xZ.filterTags,
        children: (0, SZ.jsx)(`div`, { className: xZ.filterTagsContent, children: n }),
      })),
      (t[0] = n),
      (t[1] = s));
  let c;
  t[2] === r
    ? (c = t[3])
    : ((c = (0, SZ.jsx)(`div`, { className: xZ.viewControls, children: r })),
      (t[2] = r),
      (t[3] = c));
  let l;
  t[4] !== o || t[5] !== i
    ? ((l =
        i != null &&
        (0, SZ.jsx)(`div`, { className: xZ.search, "data-fixed-width": o || void 0, children: i })),
      (t[4] = o),
      (t[5] = i),
      (t[6] = l))
    : (l = t[6]);
  let u;
  t[7] === a
    ? (u = t[8])
    : ((u = (0, SZ.jsx)(`div`, { className: xZ.pageActions, children: a })),
      (t[7] = a),
      (t[8] = u));
  let d;
  return (
    t[9] !== s || t[10] !== c || t[11] !== l || t[12] !== u
      ? ((d = (0, SZ.jsxs)(`div`, { className: xZ.toolbar, children: [s, c, l, u] })),
        (t[9] = s),
        (t[10] = c),
        (t[11] = l),
        (t[12] = u),
        (t[13] = d))
      : (d = t[13]),
    d
  );
}
function sYa(e) {
  let t = (0, lYa.c)(8),
    { children: n, className: r, fadeSize: i, showScrollFade: a, sticky: o } = e,
    s = i === void 0 ? `default` : i,
    c = a === void 0 || a,
    l = o === void 0 || o,
    u =
      l &&
      `sticky z-30 after:pointer-events-none after:absolute after:top-full after:right-0 after:left-0 after:bg-linear-to-b after:from-surface after:to-transparent after:content-['']`,
    d = l && (s === `compact` ? `after:h-2` : `after:h-8`),
    f = l && !c && `after:hidden`,
    p;
  t[0] !== r || t[1] !== u || t[2] !== d || t[3] !== f
    ? ((p = ng(`bg-surface`, u, d, f, r)),
      (t[0] = r),
      (t[1] = u),
      (t[2] = d),
      (t[3] = f),
      (t[4] = p))
    : (p = t[4]);
  let m;
  return (
    t[5] !== n || t[6] !== p
      ? ((m = (0, wZ.jsx)(`div`, { className: p, children: n })),
        (t[5] = n),
        (t[6] = p),
        (t[7] = m))
      : (m = t[7]),
    m
  );
}
ZJa();
return {SettingsContent:qMs,SettingsNavigationTarget:JMs,SettingsPageHeading:VMs,PageHeader:QJa,PageToolbar:eYa,StickyControls:sYa};
}
