// Original navigation section and header surfaces.
import {createNavigationList} from './NavigationItem.js';
export function createNavigationSurfaces({React,mergeClasses:ng,motion:Kl,AnimatePresence:Yp,MotionConfig:Ege,ContextMenu:jc,useReducedMotion:ft,useVisualScale:Ef,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!Kl?.div||!Yp||!Ege||!ft||!Ef)throw new TypeError('Navigation surfaces require motion and preference hooks');
const h=React.createElement,Ear=compilerRuntime,Lar=compilerRuntime,WF={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Rar=WF,HF=createNavigationList({React,mergeClasses:ng,compilerRuntime}),Aar={header:'_header_cpwja_2'},hWe={ duration: 300 / 1e3, ease: [0.19, 1, 0.22, 1] };
function UF(e) {
  let t = (0, Ear.c)(24),
    {
      children: n,
      className: r,
      collapsed: i,
      menuRef: a,
      title: o,
      titleActions: s,
      titleActionsLayout: c,
      titleActionsOnHover: l,
      titleTrailing: u,
      titleClassName: d,
      appearance: f,
    } = e,
    p = l !== void 0 && l,
    m = f === void 0 ? `plain` : f,
    h = ft(),
    g = Ef(),
    _;
  t[0] !== o || t[1] !== s || t[2] !== c || t[3] !== p || t[4] !== d || t[5] !== u
    ? ((_ = o
        ? (0, WF.jsxs)(`div`, {
            className: `group/nav-section-title flex min-h-[var(--height-token-row)] items-center justify-between gap-2 ps-2 pe-1.5 browser:ps-2.5`,
            children: [
              (0, WF.jsx)(`div`, {
                className: ng(
                  `min-w-0 flex-1`,
                  d ?? `text-base font-medium text-tertiary browser:leading-4.5`,
                ),
                children: o,
              }),
              s != null || u != null
                ? (0, WF.jsxs)(`div`, {
                    className: `flex shrink-0 items-center gap-1`,
                    children: [
                      s == null
                        ? null
                        : (0, WF.jsx)(`div`, {
                            className: ng(
                              `shrink-0`,
                              c === `row` && `flex items-center gap-1`,
                              p &&
                                `pointer-events-none w-0 overflow-hidden opacity-0 group-focus-within/nav-section-title:pointer-events-auto group-focus-within/nav-section-title:w-auto group-focus-within/nav-section-title:overflow-visible group-focus-within/nav-section-title:opacity-100 group-hover/nav-section-title:pointer-events-auto group-hover/nav-section-title:w-auto group-hover/nav-section-title:overflow-visible group-hover/nav-section-title:opacity-100 has-[[data-state=open]]:pointer-events-auto has-[[data-state=open]]:w-auto has-[[data-state=open]]:overflow-visible has-[[data-state=open]]:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:w-auto [@media(hover:none)]:overflow-visible [@media(hover:none)]:opacity-100`,
                            ),
                            children: s,
                          }),
                      u == null
                        ? null
                        : (0, WF.jsx)(`div`, { className: `me-0.5 shrink-0`, children: u }),
                    ],
                  })
                : null,
            ],
          })
        : null),
      (t[0] = o),
      (t[1] = s),
      (t[2] = c),
      (t[3] = p),
      (t[4] = d),
      (t[5] = u),
      (t[6] = _))
    : (_ = t[6]);
  let v = _,
    y = i == null && `gap-1`,
    b;
  t[7] !== r || t[8] !== y
    ? ((b = ng(`group/nav-section flex flex-col`, y, r)), (t[7] = r), (t[8] = y), (t[9] = b))
    : (b = t[9]);
  let x;
  t[10] !== a || t[11] !== v
    ? ((x =
        v != null && a != null
          ? (0, WF.jsx)(jc, {
              awaitBeforeOpen: !1,
              getItems: () => a.current?.getContextMenuItems() ?? [],
              onBeforeOpen: () => a.current?.onBeforeOpen?.(),
              preserveBrowserContextMenu: !0,
              children: v,
            })
          : v),
      (t[10] = a),
      (t[11] = v),
      (t[12] = x))
    : (x = t[12]);
  let S;
  t[13] !== m || t[14] !== n || t[15] !== i || t[16] !== h || t[17] !== o || t[18] !== g
    ? ((S =
        i == null
          ? (0, WF.jsx)(HF, { appearance: m, children: n })
          : (0, WF.jsx)(`div`, {
              inert: i,
              "aria-hidden": i,
              children: (0, WF.jsx)(Ege, {
                transformPagePoint: (e) => {
                  let { x: t, y: n } = e;
                  return { x: t / g, y: n / g };
                },
                children: (0, WF.jsx)(Yp, {
                  initial: !1,
                  children: i
                    ? null
                    : (0, WF.jsx)(Kl.div, {
                        initial: { height: 0, opacity: 0 },
                        animate: {
                          height: `auto`,
                          opacity: 1,
                          transitionEnd: { overflow: `visible` },
                        },
                        exit: { height: 0, opacity: 0, overflow: `hidden` },
                        transition: h ? { duration: 0 } : hWe,
                        className: `overflow-hidden`,
                        children: (0, WF.jsx)(HF, {
                          appearance: m,
                          className: ng(!!o && `pt-1`),
                          children: n,
                        }),
                      }),
                }),
              }),
            })),
      (t[13] = m),
      (t[14] = n),
      (t[15] = i),
      (t[16] = h),
      (t[17] = o),
      (t[18] = g),
      (t[19] = S))
    : (S = t[19]);
  let C;
  return (
    t[20] !== b || t[21] !== x || t[22] !== S
      ? ((C = (0, WF.jsxs)(`div`, { className: b, children: [x, S] })),
        (t[20] = b),
        (t[21] = x),
        (t[22] = S),
        (t[23] = C))
      : (C = t[23]),
    C
  );
}
function Mar(e) {
  let t = (0, Lar.c)(8),
    { children: n, scrolled: r, surface: i } = e,
    a = r !== void 0 && r,
    o = !a && `browser:pb-0`,
    s = i === `elevated` ? `bg-surface-elevated-secondary` : `browser:pt-2`,
    c = i === `content` && `bg-surface`,
    l =
      a &&
      `after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[0.5px] after:bg-text/10 after:content-['']`,
    u;
  t[0] !== o || t[1] !== s || t[2] !== c || t[3] !== l
    ? ((u = ng(
        Aar.header,
        `relative z-10 -mb-(--sidebar-scroll-header-spacing) flex shrink-0 flex-col gap-(--sidebar-navigation-header-gap) px-row-x pb-(--sidebar-scroll-header-spacing)`,
        o,
        s,
        c,
        l,
      )),
      (t[0] = o),
      (t[1] = s),
      (t[2] = c),
      (t[3] = l),
      (t[4] = u))
    : (u = t[4]);
  let d;
  return (
    t[5] !== n || t[6] !== u
      ? ((d = (0, Rar.jsx)(`div`, { className: u, children: n })),
        (t[5] = n),
        (t[6] = u),
        (t[7] = d))
      : (d = t[7]),
    d
  );
}
function Nar(e) {
  let t = (0, Lar.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, Rar.jsx)(`div`, {
          className: `@container/navigation-header ms-2 flex h-[var(--sidebar-navigation-header-height,calc(var(--spacing)*8))] items-center pe-1 browser:ms-2.5 browser:h-9`,
          children: n,
        })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function Par(e) {
  let t = (0, Lar.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, Rar.jsx)(`div`, {
          className: `flex shrink-0 items-center gap-1 [--side-tooltip:bottom]`,
          children: n,
        })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function Far(e) {
  let t = (0, Lar.c)(3),
    { as: n, children: r } = e,
    i = n === void 0 ? `h1` : n,
    a;
  return (
    t[0] !== i || t[1] !== r
      ? ((a = (0, Rar.jsx)(i, {
          className: `min-w-0 flex-1 truncate font-openai-sans text-heading-sm leading-6 font-semibold text-default [font-synthesis-weight:auto] browser:text-[17px]`,
          children: r,
        })),
        (t[0] = i),
        (t[1] = r),
        (t[2] = a))
      : (a = t[2]),
    a
  );
}
return {NavigationSection:UF,NavigationHeader:Mar,NavigationHeaderRow:Nar,NavigationHeaderActions:Par,NavigationHeading:Far};
}
