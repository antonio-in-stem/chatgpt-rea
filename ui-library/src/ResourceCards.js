// Generated original resource surfaces. See resource-cards-manifest.json.
import {classNames as ng} from './classNames.js';
export function createResourceCards({React,CompactIcon,Link,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!CompactIcon)throw new TypeError('Resource cards require React compiler runtime and original CompactIcon');
 const uk=compilerRuntime,gxn=uk,bxn=uk,wxn=uk,Oxn=uk;
 const dk={jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},_xn=dk,xxn=dk,fk=dk,pk=dk;
 const sk=Link??(()=>{throw new TypeError('ResourceCardAction href requires an explicit Link adapter')});
 const dxn={default:'px-[var(--resource-card-row-padding-x)] py-3',compact:'p-1.5'},fxn={default:'py-3 pe-10 ps-[var(--resource-card-row-padding-x)]',compact:'py-1.5 pe-6 ps-1.5'};
 const t=fn=>fn,o=()=>{},Q=()=>{},K=()=>dk,Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 let bMi,xMi,$Ni;
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
function ePi() {
  return (ePi = t(() => {
    (Q(),
      ($Ni = Z({
        name: `xmark-md-light-12`,
        canvas: {
          width: 12,
          height: 12,
          viewBox: `0 0 12 12`,
          frame: { x: 0, y: 0, width: 12, height: 12 },
          inkBounds: { x: 3.099609, y: 3.099609, width: 5.80072, height: 5.800659 },
          visualBounds: { x: 3.099609, y: 3.099609, width: 5.80072, height: 5.800659 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 3.099609, y: 3.099609, width: 5.80072, height: 5.800659 },
          center: { x: 5.999969, y: 5.999939 },
          insets: { top: 3.099609, right: 3.099671, bottom: 3.099732, left: 3.099609 },
          anchors: {
            frame: { x: 6, y: 6 },
            ink: { x: 5.999969, y: 5.999939 },
            foreground: { x: 5.999969, y: 5.999939 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M8.21677 3.21677C8.37298 3.06056 8.62696 3.06056 8.78317 3.21677C8.93935 3.37298 8.93937 3.62697 8.78317 3.78317L6.56638 5.99997L8.78317 8.21677C8.93935 8.37298 8.93937 8.62697 8.78317 8.78317C8.62697 8.93937 8.37298 8.93935 8.21677 8.78317L5.99997 6.56638L3.78317 8.78317C3.62697 8.93937 3.37298 8.93935 3.21677 8.78317C3.06056 8.62696 3.06056 8.37298 3.21677 8.21677L5.43356 5.99997L3.21677 3.78317C3.06056 3.62696 3.06056 3.37298 3.21677 3.21677C3.37298 3.06056 3.62696 3.06056 3.78317 3.21677L5.99997 5.43356L8.21677 3.21677Z" fill="currentColor"/>`,
      })));
  }))();
}
 SMi();ePi();const Zc=xMi,IPe=$Ni,cp=CompactIcon;
function nxn(e) {
  let t = (0, uk.c)(18),
    { className: n, as: r, children: i, variant: a } = e,
    o = r === void 0 ? `div` : r,
    s = a === void 0 ? `default` : a,
    c = s === `composer-attachment` || s === `thread-attachment`,
    l =
      s === `artifact-list` &&
      `rounded-2xl border border-default bg-surface-elevated [--resource-card-row-padding-x:1rem]`,
    u =
      s === `file-tile` &&
      `w-50 shrink-0 rounded-2xl bg-surface-elevated ring-1 ring-border ring-inset md:w-80`,
    d =
      s !== `artifact-list` &&
      s !== `file-tile` &&
      `electron:elevation-stroke extension:border extension:border-default extension:bg-background-primary-soft/50 extension:shadow-sm`,
    f = s !== `artifact-list` && s !== `file-tile` && !c && `bg-surface-elevated-secondary/50`,
    p =
      c &&
      `composer-attachment-surface group/resource-card relative max-w-64 flex-shrink-0 bg-primary-soft`,
    m = s === `composer-attachment` && `w-fit rounded-lg`,
    h = s === `thread-attachment` && `w-50 rounded-2xl`,
    g = s === "default" && `rounded-lg`,
    _ = s === `attachment` && `rounded-2xl`,
    v = s === `link-preview` && `w-90 rounded-2xl`,
    y;
  t[0] !== n ||
  t[1] !== g ||
  t[2] !== _ ||
  t[3] !== v ||
  t[4] !== l ||
  t[5] !== u ||
  t[6] !== d ||
  t[7] !== f ||
  t[8] !== p ||
  t[9] !== m ||
  t[10] !== h
    ? ((y = ng(
        `flex max-w-[min(100%,var(--resource-card-max-width,100%))] flex-col overflow-hidden font-sans text-default [--resource-card-row-padding-x:0.75rem]`,
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
        n,
      )),
      (t[0] = n),
      (t[1] = g),
      (t[2] = _),
      (t[3] = v),
      (t[4] = l),
      (t[5] = u),
      (t[6] = d),
      (t[7] = f),
      (t[8] = p),
      (t[9] = m),
      (t[10] = h),
      (t[11] = y))
    : (y = t[11]);
  let b = y;
  if (o === `span`) {
    let e;
    return (
      t[12] !== i || t[13] !== b
        ? ((e = (0, dk.jsx)(`span`, { className: b, children: i })),
          (t[12] = i),
          (t[13] = b),
          (t[14] = e))
        : (e = t[14]),
      e
    );
  }
  let x;
  return (
    t[15] !== i || t[16] !== b
      ? ((x = (0, dk.jsx)(`div`, { className: b, children: i })),
        (t[15] = i),
        (t[16] = b),
        (t[17] = x))
      : (x = t[17]),
    x
  );
}
function rxn(e) {
  let t = (0, uk.c)(8),
    n = e.children == null ? `absolute inset-0` : `relative w-full`,
    r;
  t[0] === n
    ? (r = t[1])
    : ((r = ng(
        `peer/resource-card cursor-interaction bg-transparent group-hover/resource-card:bg-background-primary-ghost-hover/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset`,
        n,
      )),
      (t[0] = n),
      (t[1] = r));
  let i = r;
  if (`href` in e) {
    let n;
    return (
      t[2] !== i || t[3] !== e
        ? ((n = (0, dk.jsx)(sk, { ...e, className: i })), (t[2] = i), (t[3] = e), (t[4] = n))
        : (n = t[4]),
      n
    );
  }
  let a;
  return (
    t[5] !== i || t[6] !== e
      ? ((a = (0, dk.jsx)(`button`, { ...e, type: `button`, className: i })),
        (t[5] = i),
        (t[6] = e),
        (t[7] = a))
      : (a = t[7]),
    a
  );
}
function ixn(e) {
  let t = (0, uk.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, dk.jsx)(`span`, {
          className: `flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-secondary/92 text-secondary`,
          children: n,
        })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function axn(e) {
  let t = (0, uk.c)(2),
    { src: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, dk.jsx)(`img`, {
          className: `h-12 w-20 shrink-0 rounded-lg object-cover`,
          src: n,
          alt: ``,
        })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function oxn(e) {
  let t = (0, uk.c)(34),
    {
      className: n,
      icon: r,
      padding: i,
      reserveTrailingSpace: a,
      subtitle: o,
      title: s,
      titleTooltip: c,
      trailing: l,
      variant: u,
    } = e,
    d = i === void 0 ? `default` : i,
    f = a !== void 0 && a,
    p = u === void 0 ? `default` : u,
    m = p === `artifact-list`,
    h = p === `file-tile`,
    g = p === `attachment`,
    _ = p === `link-preview`,
    v = g || _ ? `compact` : d,
    y = m && l != null,
    b = (g || _) && `pointer-events-none relative z-10 h-full`,
    x = m && `relative gap-3`,
    S = h && `gap-2`,
    C = !m && !h && `gap-2.5`,
    w = h && `p-2.5`,
    T = !f && !y && !h && dxn[v],
    E = f && !m && fxn[v],
    D = m && (f || y) && `py-3 pe-14 ps-[var(--resource-card-row-padding-x)]`,
    O;
  t[0] !== n ||
  t[1] !== E ||
  t[2] !== D ||
  t[3] !== b ||
  t[4] !== x ||
  t[5] !== S ||
  t[6] !== C ||
  t[7] !== w ||
  t[8] !== T
    ? ((O = ng(`flex min-w-0 items-center text-start`, b, x, S, C, w, T, E, D, n)),
      (t[0] = n),
      (t[1] = E),
      (t[2] = D),
      (t[3] = b),
      (t[4] = x),
      (t[5] = S),
      (t[6] = C),
      (t[7] = w),
      (t[8] = T),
      (t[9] = O))
    : (O = t[9]);
  let k = g && (f ? `max-w-36` : `max-w-32`),
    A = h && `text-sm font-semibold`,
    j = m && `text-sm font-medium`,
    M = !h && !m && `text-size-chat font-medium`,
    N;
  t[10] !== k || t[11] !== A || t[12] !== j || t[13] !== M
    ? ((N = ng(`truncate text-default`, k, A, j, M)),
      (t[10] = k),
      (t[11] = A),
      (t[12] = j),
      (t[13] = M),
      (t[14] = N))
    : (N = t[14]);
  let P;
  t[15] !== N || t[16] !== s || t[17] !== c
    ? ((P = (0, dk.jsx)(`span`, { className: N, title: c, children: s })),
      (t[15] = N),
      (t[16] = s),
      (t[17] = c),
      (t[18] = P))
    : (P = t[18]);
  let F;
  t[19] !== m || t[20] !== h || t[21] !== o
    ? ((F =
        o == null
          ? null
          : (0, dk.jsx)(`span`, {
              className: ng(
                `truncate text-secondary`,
                h && `text-sm`,
                m && `text-xs`,
                !h && !m && `text-size-chat-sm`,
              ),
              children: o,
            })),
      (t[19] = m),
      (t[20] = h),
      (t[21] = o),
      (t[22] = F))
    : (F = t[22]);
  let I;
  t[23] !== P || t[24] !== F
    ? ((I = (0, dk.jsxs)(`span`, { className: `flex min-w-0 flex-1 flex-col`, children: [P, F] })),
      (t[23] = P),
      (t[24] = F),
      (t[25] = I))
    : (I = t[25]);
  let L;
  t[26] !== y || t[27] !== l
    ? ((L = y
        ? (0, dk.jsx)(`span`, { className: `absolute end-3 top-1/2 -translate-y-1/2`, children: l })
        : l),
      (t[26] = y),
      (t[27] = l),
      (t[28] = L))
    : (L = t[28]);
  let R;
  return (
    t[29] !== r || t[30] !== O || t[31] !== I || t[32] !== L
      ? ((R = (0, dk.jsxs)(`span`, { className: O, children: [r, I, L] })),
        (t[29] = r),
        (t[30] = O),
        (t[31] = I),
        (t[32] = L),
        (t[33] = R))
      : (R = t[33]),
    R
  );
}
function mxn(e) {
  let t = (0, gxn.c)(12),
    { ariaLabel: n, className: r, onRemove: i, size: a } = e,
    o = r === void 0 ? `top-1 right-1` : r,
    s = a === void 0 ? `default` : a,
    c =
      s === `composer` &&
      `pointer-events-none opacity-0 ring-2 ring-surface group-focus-visible/composer-attachment:pointer-events-auto group-focus-visible/composer-attachment:opacity-100 group-hover/composer-attachment:pointer-events-auto group-hover/composer-attachment:opacity-100 group-has-focus-visible/composer-attachment:pointer-events-auto group-has-focus-visible/composer-attachment:opacity-100 hover:bg-text/80 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring`,
    l;
  t[0] !== o || t[1] !== c
    ? ((l = ng(
        `absolute flex size-4 cursor-interaction items-center justify-center rounded-full bg-primary-solid text-primary-solid shadow-sm`,
        c,
        o,
      )),
      (t[0] = o),
      (t[1] = c),
      (t[2] = l))
    : (l = t[2]);
  let u;
  t[3] === i
    ? (u = t[4])
    : ((u = (e) => {
        (e.preventDefault(), e.stopPropagation(), i());
      }),
      (t[3] = i),
      (t[4] = u));
  let d;
  t[5] === s
    ? (d = t[6])
    : ((d =
        s === `composer`
          ? (0, _xn.jsx)(cp, { asset: IPe })
          : (0, _xn.jsx)(Zc, { className: `icon-xxs` })),
      (t[5] = s),
      (t[6] = d));
  let f;
  return (
    t[7] !== n || t[8] !== l || t[9] !== u || t[10] !== d
      ? ((f = (0, _xn.jsx)(`button`, {
          type: `button`,
          className: l,
          onPointerDown: hxn,
          onClick: u,
          "aria-label": n,
          children: d,
        })),
        (t[7] = n),
        (t[8] = l),
        (t[9] = u),
        (t[10] = d),
        (t[11] = f))
      : (f = t[11]),
    f
  );
}
function hxn(e) {
  (e.preventDefault(), e.stopPropagation());
}
function yxn(e) {
  let t = (0, bxn.c)(18),
    {
      title: n,
      subtitle: r,
      icon: i,
      onClick: a,
      onRemove: o,
      onRemoveAriaLabel: s,
      variant: c,
    } = e,
    l = (c === void 0 ? `composer` : c) === `thread` ? `thread-attachment` : `composer-attachment`,
    u;
  t[0] !== a || t[1] !== n
    ? ((u = a ? (0, xxn.jsx)(rxn, { onClick: a, "aria-label": n }) : null),
      (t[0] = a),
      (t[1] = n),
      (t[2] = u))
    : (u = t[2]);
  let d;
  t[3] === i ? (d = t[4]) : ((d = (0, xxn.jsx)(ixn, { children: i })), (t[3] = i), (t[4] = d));
  let f = o != null,
    p;
  t[5] !== r || t[6] !== d || t[7] !== f || t[8] !== n
    ? ((p = (0, xxn.jsx)(oxn, {
        icon: d,
        variant: `attachment`,
        reserveTrailingSpace: f,
        title: n,
        subtitle: r,
      })),
      (t[5] = r),
      (t[6] = d),
      (t[7] = f),
      (t[8] = n),
      (t[9] = p))
    : (p = t[9]);
  let m;
  t[10] !== o || t[11] !== s
    ? ((m = o
        ? (0, xxn.jsx)(mxn, { className: `top-1 right-1 z-20`, ariaLabel: s, onRemove: o })
        : null),
      (t[10] = o),
      (t[11] = s),
      (t[12] = m))
    : (m = t[12]);
  let h;
  return (
    t[13] !== l || t[14] !== u || t[15] !== p || t[16] !== m
      ? ((h = (0, xxn.jsxs)(nxn, { as: `span`, variant: l, children: [u, p, m] })),
        (t[13] = l),
        (t[14] = u),
        (t[15] = p),
        (t[16] = m),
        (t[17] = h))
      : (h = t[17]),
    h
  );
}
function Cxn(e) {
  let t = (0, wxn.c)(46),
    n,
    r,
    i,
    a,
    o,
    s,
    c,
    l,
    u,
    d;
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
      (d = t[10]))
    : (({
        Icon: n,
        icon: a,
        children: r,
        onRemove: s,
        onRemoveAriaLabel: c,
        onClick: o,
        layout: d,
        className: i,
        ref: u,
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
      (t[9] = u),
      (t[10] = d));
  let f = (d === void 0 ? `pill` : d) === `card`,
    p;
  t[11] === s
    ? (p = t[12])
    : ((p = (e) => {
        (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), e.stopPropagation(), s?.());
      }),
      (t[11] = s),
      (t[12] = p));
  let m = p,
    h = f
      ? `border-default inline-flex w-fit max-w-64 flex-shrink-0 items-center gap-2.5 overflow-visible rounded-lg border bg-primary-soft p-3 pe-8 text-start shadow-sm`
      : `bg-surface-elevated-secondary border-default hover:bg-surface-elevated inline-flex max-w-[320px] items-center gap-1 rounded-full border px-2 py-1.5 text-sm`,
    g = o && `cursor-interaction`,
    _ = !o && `cursor-default`,
    v;
  t[13] !== i || t[14] !== h || t[15] !== g || t[16] !== _
    ? ((v = ng(
        `composer-attachment-surface text-default group relative transition-colors duration-basic focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0`,
        h,
        g,
        _,
        i,
      )),
      (t[13] = i),
      (t[14] = h),
      (t[15] = g),
      (t[16] = _),
      (t[17] = v))
    : (v = t[17]);
  let y = o == null ? -1 : void 0,
    b = f
      ? `flex size-10 items-center justify-center rounded-lg bg-surface-secondary/92 text-secondary`
      : `text-tertiary`,
    x;
  t[18] === b ? (x = t[19]) : ((x = ng(`flex-shrink-0`, b)), (t[18] = b), (t[19] = x));
  let S;
  t[20] !== n || t[21] !== a || t[22] !== f
    ? ((S = a ?? (n == null ? null : (0, fk.jsx)(n, { className: ng(f ? `size-6` : `icon-2xs`) }))),
      (t[20] = n),
      (t[21] = a),
      (t[22] = f),
      (t[23] = S))
    : (S = t[23]);
  let C;
  t[24] !== S || t[25] !== x
    ? ((C = (0, fk.jsx)(`div`, { className: x, children: S })),
      (t[24] = S),
      (t[25] = x),
      (t[26] = C))
    : (C = t[26]);
  let w = f
      ? `text-size-chat truncate font-medium text-default`
      : `truncate pe-1 text-sm font-medium`,
    T;
  t[27] === w ? (T = t[28]) : ((T = ng(`relative min-w-0 flex-1`, w)), (t[27] = w), (t[28] = T));
  let E;
  t[29] !== r || t[30] !== T
    ? ((E = (0, fk.jsx)(`div`, { className: T, children: r })),
      (t[29] = r),
      (t[30] = T),
      (t[31] = E))
    : (E = t[31]);
  let D;
  t[32] !== m || t[33] !== f || t[34] !== s || t[35] !== c
    ? ((D =
        s &&
        (0, fk.jsx)(`div`, {
          role: `button`,
          tabIndex: 0,
          onClick: (e) => {
            (e.stopPropagation(), s());
          },
          onKeyDown: m,
          className: ng(
            `group/remove flex cursor-interaction items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0`,
            f
              ? `absolute top-2 right-2 size-4 rounded-full`
              : `pointer-events-none absolute top-1/2 right-1 size-5 -translate-y-1/2 rounded-full opacity-0 before:pointer-events-none before:absolute before:inset-y-0 before:-left-8 before:right-0 before:bg-linear-to-r before:from-transparent before:via-surface-elevated-secondary before:to-surface-elevated-secondary before:content-[''] group-hover:pointer-events-auto group-hover:opacity-100 group-hover:before:via-surface-elevated group-hover:before:to-surface-elevated focus-visible:pointer-events-auto focus-visible:opacity-100`,
          ),
          "aria-label": c,
          children: (0, fk.jsx)(`span`, {
            className: ng(
              `relative flex items-center justify-center rounded-full`,
              f
                ? `size-4 bg-primary-solid text-primary-solid shadow-sm`
                : `size-5 border border-default bg-surface-elevated group-hover/remove:bg-[color-mix(in_srgb,var(--color-surface-elevated)_88%,var(--color-text))] group-focus-visible/remove:bg-[color-mix(in_srgb,var(--color-surface-elevated)_88%,var(--color-text))]`,
            ),
            children: (0, fk.jsx)(Zc, { className: f ? `icon-xxs` : `icon-2xs text-default` }),
          }),
        })),
      (t[32] = m),
      (t[33] = f),
      (t[34] = s),
      (t[35] = c),
      (t[36] = D))
    : (D = t[36]);
  let O;
  return (
    t[37] !== o ||
    t[38] !== l ||
    t[39] !== u ||
    t[40] !== C ||
    t[41] !== E ||
    t[42] !== D ||
    t[43] !== v ||
    t[44] !== y
      ? ((O = (0, fk.jsxs)(`button`, {
          ref: u,
          "data-composer-attachment-pill": !0,
          type: `button`,
          className: v,
          onClick: o,
          tabIndex: y,
          ...l,
          children: [C, E, D],
        })),
        (t[37] = o),
        (t[38] = l),
        (t[39] = u),
        (t[40] = C),
        (t[41] = E),
        (t[42] = D),
        (t[43] = v),
        (t[44] = y),
        (t[45] = O))
      : (O = t[45]),
    O
  );
}
function Exn(e) {
  let t = (0, Oxn.c)(34),
    n,
    r,
    i,
    a,
    o,
    s,
    c,
    l;
  t[0] === e
    ? ((n = t[1]),
      (r = t[2]),
      (i = t[3]),
      (a = t[4]),
      (o = t[5]),
      (s = t[6]),
      (c = t[7]),
      (l = t[8]))
    : (({
        filename: r,
        icon: i,
        preview: s,
        onClick: a,
        onRemove: o,
        removeAriaLabel: l,
        ref: c,
        ...n
      } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = i),
      (t[4] = a),
      (t[5] = o),
      (t[6] = s),
      (t[7] = c),
      (t[8] = l));
  let u;
  t[9] === s
    ? (u = t[10])
    : ((u = (0, pk.jsx)(`span`, {
        className: `pointer-events-none flex h-22.5 shrink-0 items-center justify-center overflow-hidden`,
        children: s,
      })),
      (t[9] = s),
      (t[10] = u));
  let d;
  t[11] !== r || t[12] !== i
    ? ((d = (0, pk.jsx)(Dxn, { filename: r, icon: i })), (t[11] = r), (t[12] = i), (t[13] = d))
    : (d = t[13]);
  let f =
      a &&
      `group-hover/composer-attachment:ring-border-strong group-has-focus-visible/composer-attachment:ring-border-strong`,
    p;
  t[14] === f
    ? (p = t[15])
    : ((p = ng(
        `composer-attachment-surface pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-border group-hover/composer-attachment:bg-text/5`,
        f,
      )),
      (t[14] = f),
      (t[15] = p));
  let m;
  t[16] === p
    ? (m = t[17])
    : ((m = (0, pk.jsx)(`span`, { className: p, "aria-hidden": !0 })), (t[16] = p), (t[17] = m));
  let h;
  t[18] !== n || t[19] !== r || t[20] !== a || t[21] !== c
    ? ((h = a
        ? (0, pk.jsx)(`button`, {
            ...n,
            ref: c,
            className: `composer-attachment-surface absolute inset-0 cursor-interaction rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset`,
            type: `button`,
            "aria-label": r,
            onClick: a,
          })
        : null),
      (t[18] = n),
      (t[19] = r),
      (t[20] = a),
      (t[21] = c),
      (t[22] = h))
    : (h = t[22]);
  let g;
  t[23] !== u || t[24] !== d || t[25] !== m || t[26] !== h
    ? ((g = (0, pk.jsxs)(`span`, {
        className: `composer-attachment-surface flex size-full flex-col overflow-hidden rounded-2xl bg-surface-secondary text-default`,
        children: [u, d, m, h],
      })),
      (t[23] = u),
      (t[24] = d),
      (t[25] = m),
      (t[26] = h),
      (t[27] = g))
    : (g = t[27]);
  let _;
  t[28] !== o || t[29] !== l
    ? ((_ = o
        ? (0, pk.jsx)(mxn, {
            className: `-top-0.5 -right-0.5`,
            ariaLabel: l,
            onRemove: o,
            size: `composer`,
          })
        : null),
      (t[28] = o),
      (t[29] = l),
      (t[30] = _))
    : (_ = t[30]);
  let v;
  return (
    t[31] !== g || t[32] !== _
      ? ((v = (0, pk.jsxs)(`span`, {
          className: `group/composer-attachment relative block h-30.5 w-40 shrink-0 select-none`,
          children: [g, _],
        })),
        (t[31] = g),
        (t[32] = _),
        (t[33] = v))
      : (v = t[33]),
    v
  );
}
function Dxn(e) {
  let t = (0, Oxn.c)(5),
    { filename: n, icon: r } = e,
    i;
  t[0] === n
    ? (i = t[1])
    : ((i = (0, pk.jsx)(`span`, { className: `truncate`, children: n })), (t[0] = n), (t[1] = i));
  let a;
  return (
    t[2] !== r || t[3] !== i
      ? ((a = (0, pk.jsxs)(`span`, {
          className: `pointer-events-none flex h-8 min-w-0 shrink-0 items-center gap-1 bg-surface px-2 text-xs leading-4`,
          children: [r, i],
        })),
        (t[2] = r),
        (t[3] = i),
        (t[4] = a))
      : (a = t[4]),
    a
  );
}
 return {ResourceCard:nxn,ResourceCardAction:rxn,ResourceCardIcon:ixn,ResourceCardThumbnail:axn,ResourceCardRow:oxn,AttachmentRemoveButton:mxn,AttachmentCard:yxn,AttachmentPill:Cxn,AttachmentPreviewCard:Exn,AttachmentPreviewCaption:Dxn};
}
