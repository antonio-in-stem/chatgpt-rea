// Original scroll area and menu overlay portal wrappers.
import {classNames as q} from './classNames.js';
export function createMenuInfrastructure({React,Layer:hb,OverlayPortal:h5,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!hb||!h5||!compilerRuntime?.c)throw new TypeError('Menu infrastructure requires original layer, overlay portal and compiler runtime');
 const t=fn=>fn,m7=compilerRuntime,cji=compilerRuntime,h7=React,l7=React,Qji=React.createContext(undefined);
 const g7={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},u7=g7;
 let M5,rji,iji,aji;
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
function oji() {
  return (oji = t(() => {
    ((rji = `_Mask_g5dvy_1`), (iji = `_Root_g5dvy_14`), (aji = { Mask: rji, Root: iji }));
  }))();
}
function sji(e) {
  let t = (0, cji.c)(35),
    {
      children: n,
      className: r,
      fade: i,
      fadeClassName: a,
      peekMenuItems: o,
      onOverflowChange: s,
      scrollClassName: c,
      scrollProps: l,
    } = e,
    u = i === void 0 ? `overlay` : i,
    d = o !== void 0 && o,
    f = (0, l7.useRef)(null),
    p = (0, l7.useRef)(null),
    m = (0, l7.useRef)(null),
    h;
  t[0] === s
    ? (h = t[1])
    : ((h = (e) => {
        s?.(e);
      }),
      (t[0] = s),
      (t[1] = h));
  let g = (0, l7.useEffectEvent)(h),
    _;
  t[2] !== u || t[3] !== g || t[4] !== d
    ? ((_ = () => {
        let e = f.current,
          t = p.current,
          n = m.current;
        if (e == null || t == null || n == null) return;
        let r = () => {
            let r = (u === `overlay` ? n : t).scrollHeight > t.clientHeight + 1,
              i = t.scrollTop + t.clientHeight < t.scrollHeight - 1;
            (g(r),
              (e.dataset.hasOverflow = r ? `true` : `false`),
              (e.dataset.canScrollUp = t.scrollTop > 1 ? `true` : `false`),
              (e.dataset.canScrollDown = r && i ? `true` : `false`));
          },
          i = t.style.maxHeight,
          a,
          o = () => {
            if (d) {
              let e = t.scrollTop;
              ((t.style.maxHeight = i), (a = void 0));
              let r = t.clientHeight;
              if (t.scrollHeight > r + 1) {
                let e = t.getBoundingClientRect(),
                  i = e.height / t.offsetHeight,
                  o = 0;
                if (i > 0)
                  for (let a of n.querySelectorAll(
                    `[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]`,
                  )) {
                    let n = a.getBoundingClientRect(),
                      s = (n.top - e.top + n.height / 2) / i - t.clientTop + t.scrollTop;
                    n.height > 0 && s <= r && (o = Math.max(o, s));
                  }
                o > 0 && ((a = `${o}px`), (t.style.maxHeight = a));
              }
              t.scrollTop = e;
            }
            r();
          };
        (o(), t.addEventListener(`scroll`, r, { passive: !0 }));
        let s = typeof ResizeObserver > `u` ? void 0 : new ResizeObserver(o);
        (s?.observe(t), s?.observe(n));
        let c = d ? new MutationObserver(o) : void 0;
        return (
          c?.observe(n, { childList: !0, characterData: !0, subtree: !0 }),
          d && window.addEventListener(`resize`, o),
          () => {
            (t.removeEventListener(`scroll`, r),
              s?.disconnect(),
              c?.disconnect(),
              window.removeEventListener(`resize`, o),
              t.style.maxHeight === a && (t.style.maxHeight = i));
          }
        );
      }),
      (t[2] = u),
      (t[3] = g),
      (t[4] = d),
      (t[5] = _))
    : (_ = t[5]);
  let v = l?.style?.maxHeight,
    y;
  (t[6] !== u || t[7] !== d || t[8] !== v
    ? ((y = [u, d, v]), (t[6] = u), (t[7] = d), (t[8] = v), (t[9] = y))
    : (y = t[9]),
    (0, l7.useLayoutEffect)(_, y));
  let b;
  t[10] === r ? (b = t[11]) : ((b = q(`group`, aji.Root, r)), (t[10] = r), (t[11] = b));
  let x = l?.ref,
    S;
  t[12] === x ? (S = t[13]) : ((S = M5(p, x)), (t[12] = x), (t[13] = S));
  let C = u === `mask` && aji.Mask,
    w = l?.className,
    T;
  t[14] !== c || t[15] !== C || t[16] !== w
    ? ((T = q(C, c, w)), (t[14] = c), (t[15] = C), (t[16] = w), (t[17] = T))
    : (T = t[17]);
  let E;
  t[18] === n
    ? (E = t[19])
    : ((E = (0, u7.jsx)(`div`, { ref: m, children: n })), (t[18] = n), (t[19] = E));
  let D;
  t[20] !== l || t[21] !== T || t[22] !== E || t[23] !== S
    ? ((D = (0, u7.jsx)(`div`, { ...l, ref: S, className: T, children: E })),
      (t[20] = l),
      (t[21] = T),
      (t[22] = E),
      (t[23] = S),
      (t[24] = D))
    : (D = t[24]);
  let O;
  t[25] === u
    ? (O = t[26])
    : ((O =
        u === `divider` &&
        (0, u7.jsxs)(u7.Fragment, {
          children: [
            (0, u7.jsx)(`div`, {
              "aria-hidden": !0,
              className: `pointer-events-none absolute inset-x-0 top-0 hidden border-t border-subtle group-data-[can-scroll-up=true]:block`,
            }),
            (0, u7.jsx)(`div`, {
              "aria-hidden": !0,
              className: `pointer-events-none absolute inset-x-0 bottom-0 hidden border-t border-subtle group-data-[can-scroll-down=true]:block`,
            }),
          ],
        })),
      (t[25] = u),
      (t[26] = O));
  let k;
  t[27] !== u || t[28] !== a
    ? ((k =
        u === `overlay` &&
        (0, u7.jsx)(`div`, {
          className: q(
            `pointer-events-none absolute bottom-0 hidden h-10 bg-gradient-to-b from-transparent to-surface-elevated-secondary/90 group-data-[can-scroll-down=true]:block`,
            a,
          ),
        })),
      (t[27] = u),
      (t[28] = a),
      (t[29] = k))
    : (k = t[29]);
  let A;
  return (
    t[30] !== D || t[31] !== O || t[32] !== k || t[33] !== b
      ? ((A = (0, u7.jsxs)(`div`, {
          ref: f,
          "data-can-scroll-down": `false`,
          "data-can-scroll-up": `false`,
          "data-has-overflow": `false`,
          className: b,
          children: [D, O, k],
        })),
        (t[30] = D),
        (t[31] = O),
        (t[32] = k),
        (t[33] = b),
        (t[34] = A))
      : (A = t[34]),
    A
  );
}
function Vji(e) {
  let t = (0, m7.c)(12),
    { children: n, container: r } = e,
    [i, a] = (0, h7.useState)(null),
    o = r == null ? i : void 0,
    s;
  t[0] !== n || t[1] !== r
    ? ((s = r == null ? (0, g7.jsx)(`div`, { ref: a, className: `contents`, children: n }) : n),
      (t[0] = n),
      (t[1] = r),
      (t[2] = s))
    : (s = t[2]);
  let c;
  t[3] !== r || t[4] !== s
    ? ((c = (0, g7.jsx)(Hji, { container: r, children: s })), (t[3] = r), (t[4] = s), (t[5] = c))
    : (c = t[5]);
  let l;
  t[6] !== r || t[7] !== c
    ? ((l = (0, g7.jsx)(hb, { container: r, children: c })), (t[6] = r), (t[7] = c), (t[8] = l))
    : (l = t[8]);
  let u;
  return (
    t[9] !== o || t[10] !== l
      ? ((u = (0, g7.jsx)(Qji, { value: o, children: l })), (t[9] = o), (t[10] = l), (t[11] = u))
      : (u = t[11]),
    u
  );
}
function Hji(e) {
  let t = (0, m7.c)(3),
    { children: n, container: r } = e,
    i = r ?? document.body,
    a;
  return (
    t[0] !== n || t[1] !== i
      ? ((a = (0, g7.jsx)(h5, { container: i, children: n })), (t[0] = n), (t[1] = i), (t[2] = a))
      : (a = t[2]),
    a
  );
}
 pCi();oji();
 return {ScrollArea:sji,Portal:Vji,ModalLayer:Hji,PortalContainerContext:Qji};
}
