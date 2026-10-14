// Original settings group and label/value row presentation.
import {classNames as q} from './classNames.js';
import {createAssetIcon} from './AssetIcon.js';
export function createSettingsSurfaces({React,AssetIcon=createAssetIcon(React),compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const ng=q,D6s=compilerRuntime,x6s=compilerRuntime,x9=compilerRuntime,fxi=compilerRuntime,I8=runtime,S6s=runtime,S9=runtime,pxi=runtime,fVi=compilerRuntime,pVi=runtime,t=fn=>fn;
const rVi=React,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
let aVi,oVi,cVi,lVi,G6n;
function b6s(e) {
  let t = (0, x6s.c)(6),
    { children: n, className: r, variant: i } = e,
    a =
      (i === void 0 ? `description` : i) === `action`
        ? `pt-4 text-sm leading-5`
        : `px-4 pt-1.5 text-xs leading-4`,
    o;
  t[0] !== r || t[1] !== a
    ? ((o = ng(`text-balance text-secondary`, a, r)), (t[0] = r), (t[1] = a), (t[2] = o))
    : (o = t[2]);
  let s;
  return (
    t[3] !== n || t[4] !== o
      ? ((s = (0, S6s.jsx)(`div`, { className: o, children: n })),
        (t[3] = n),
        (t[4] = o),
        (t[5] = s))
      : (s = t[5]),
    s
  );
}
function w6s(e) {
  let t = (0, D6s.c)(6),
    { children: n, id: r, className: i } = e,
    a;
  t[0] === i ? (a = t[1]) : ((a = ng(`flex flex-col`, i)), (t[0] = i), (t[1] = a));
  let o;
  return (
    t[2] !== n || t[3] !== r || t[4] !== a
      ? ((o = (0, I8.jsx)(`section`, { id: r, className: a, children: n })),
        (t[2] = n),
        (t[3] = r),
        (t[4] = a),
        (t[5] = o))
      : (o = t[5]),
    o
  );
}
function T6s(e) {
  let t = (0, D6s.c)(32),
    {
      title: n,
      subtitle: r,
      actions: i,
      actionsAlignment: a,
      className: o,
      size: s,
      titleGap: c,
      spacing: l,
      subtitlePlacement: u,
      subtitleWrap: d,
    } = e,
    f = s === void 0 ? `default` : s,
    p = c === void 0 ? `default` : c,
    m = l === void 0 ? `default` : l,
    h = u === void 0 ? `below-title` : u,
    g = d === void 0 ? `balance` : d,
    _ = n != null,
    v = r != null,
    y = i != null,
    b = f === `compact`,
    x;
  t[0] !== b || t[1] !== r || t[2] !== h || t[3] !== g
    ? ((x = r
        ? (0, I8.jsx)(`div`, {
            className: ng(
              `font-normal text-secondary group-data-[density=compact]/settings:text-wrap`,
              g === `balance` ? `text-balance` : `text-wrap`,
              b ? `text-xs leading-4` : `text-sm leading-[18px]`,
              h === `below-header` && `w-full`,
            ),
            children: r,
          })
        : null),
      (t[0] = b),
      (t[1] = r),
      (t[2] = h),
      (t[3] = g),
      (t[4] = x))
    : (x = t[4]);
  let S = x;
  if (!_ && !v && !y) {
    let e;
    return (
      t[5] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, I8.jsx)(I8.Fragment, {})), (t[5] = e))
        : (e = t[5]),
      e
    );
  }
  let C = h === `below-header` ? `flex-wrap gap-x-4 gap-y-0.5` : `gap-4`,
    w = v && m === `compact` && `pb-2`,
    T = v && m !== `compact` && `pb-3`,
    E;
  t[6] !== o || t[7] !== v || t[8] !== b || t[9] !== m || t[10] !== C || t[11] !== w || t[12] !== T
    ? ((E = ng(
        `flex justify-between group-data-[density=compact]/settings:min-h-0 group-data-[density=compact]/settings:pb-3`,
        C,
        w,
        T,
        !v && ng(`items-center pb-1.5`, m === `compact` ? `min-h-8` : `min-h-toolbar`),
        v && b && `items-center`,
        v && !b && `items-start`,
        o,
      )),
      (t[6] = o),
      (t[7] = v),
      (t[8] = b),
      (t[9] = m),
      (t[10] = C),
      (t[11] = w),
      (t[12] = T),
      (t[13] = E))
    : (E = t[13]);
  let D = p === `none` ? `gap-0` : `gap-0.5 group-data-[density=compact]/settings:gap-0.75`,
    O;
  t[14] === D
    ? (O = t[15])
    : ((O = ng(`flex min-w-0 flex-1 flex-col`, D)), (t[14] = D), (t[15] = O));
  let k;
  t[16] !== v || t[17] !== f || t[18] !== n
    ? ((k = n
        ? (0, I8.jsx)(`div`, {
            className: ng(
              `font-medium text-default group-data-[density=compact]/settings:text-lg group-data-[density=compact]/settings:leading-5`,
              f === `compact` && `text-sm leading-[18px]`,
              (f === `large` || (f === "default" && v)) && `text-lg`,
              (f === `base` || (f === "default" && !v)) && `text-base`,
            ),
            children: n,
          })
        : null),
      (t[16] = v),
      (t[17] = f),
      (t[18] = n),
      (t[19] = k))
    : (k = t[19]);
  let A = h === `below-title` ? S : null,
    j;
  t[20] !== O || t[21] !== k || t[22] !== A
    ? ((j = (0, I8.jsxs)(`div`, { className: O, children: [k, A] })),
      (t[20] = O),
      (t[21] = k),
      (t[22] = A),
      (t[23] = j))
    : (j = t[23]);
  let M;
  t[24] !== i || t[25] !== a
    ? ((M = i
        ? (0, I8.jsx)(`div`, {
            className: ng(`flex items-center gap-2`, a === `end` && `self-end`),
            children: i,
          })
        : null),
      (t[24] = i),
      (t[25] = a),
      (t[26] = M))
    : (M = t[26]);
  let N = h === `below-header` ? S : null,
    P;
  return (
    t[27] !== E || t[28] !== j || t[29] !== M || t[30] !== N
      ? ((P = (0, I8.jsxs)(`div`, { className: E, children: [j, M, N] })),
        (t[27] = E),
        (t[28] = j),
        (t[29] = M),
        (t[30] = N),
        (t[31] = P))
      : (P = t[31]),
    P
  );
}
function E6s(e) {
  let t = (0, D6s.c)(5),
    { children: n, className: r } = e,
    i;
  t[0] === r ? (i = t[1]) : ((i = ng(`flex flex-col gap-1.5`, r)), (t[0] = r), (t[1] = i));
  let a;
  return (
    t[2] !== n || t[3] !== i
      ? ((a = (0, I8.jsx)(`div`, { className: i, children: n })),
        (t[2] = n),
        (t[3] = i),
        (t[4] = a))
      : (a = t[4]),
    a
  );
}
function tVi(e) {
  let t = (0, x9.c)(18),
    { children: n, compactLabelInset: r, label: i, valueAlignment: a, variant: o } = e,
    s = r === void 0 || r,
    c = a === void 0 ? `start` : a,
    l = o === void 0 ? `default` : o,
    u =
      l === `compact`
        ? `h-[1.875rem] w-full grid-cols-[auto_minmax(0,1fr)] gap-x-6 overflow-x-hidden rounded-lg text-base leading-[18px] text-default electron:opacity-75`
        : `min-h-14 gap-1 px-4 py-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6`,
    d;
  t[0] === u ? (d = t[1]) : ((d = q(`grid items-center`, u)), (t[0] = u), (t[1] = d));
  let f;
  t[2] !== s || t[3] !== l
    ? ((f = q(
        `min-w-0`,
        l === `compact`
          ? q(`flex items-center pe-2 text-start`, s && `ps-1`)
          : `text-sm text-secondary`,
      )),
      (t[2] = s),
      (t[3] = l),
      (t[4] = f))
    : (f = t[4]);
  let p;
  t[5] !== i || t[6] !== f
    ? ((p = (0, S9.jsx)(`div`, { className: f, children: i })), (t[5] = i), (t[6] = f), (t[7] = p))
    : (p = t[7]);
  let m;
  t[8] !== c || t[9] !== l
    ? ((m = q(
        `min-w-0`,
        l === `compact`
          ? `flex items-center justify-end justify-self-stretch overflow-hidden`
          : q(`break-words whitespace-normal text-sm text-default`, c === `end` && `text-end`),
      )),
      (t[8] = c),
      (t[9] = l),
      (t[10] = m))
    : (m = t[10]);
  let h;
  t[11] !== n || t[12] !== m
    ? ((h = (0, S9.jsx)(`div`, { className: m, children: n })),
      (t[11] = n),
      (t[12] = m),
      (t[13] = h))
    : (h = t[13]);
  let g;
  return (
    t[14] !== d || t[15] !== p || t[16] !== h
      ? ((g = (0, S9.jsxs)(`div`, { className: d, children: [p, h] })),
        (t[14] = d),
        (t[15] = p),
        (t[16] = h),
        (t[17] = g))
      : (g = t[17]),
    g
  );
}
function dxi(e) {
  let t = (0, fxi.c)(8),
    { keysLabel: n, variant: r, className: i } = e,
    a = r === void 0 ? `default` : r,
    o =
      a === `tooltip` || a === `tooltipInline`
        ? `h-4.5 min-w-4 items-center justify-center rounded-lg !bg-[var(--color-background-tooltip-shortcut)] !px-1.5 !py-0 !text-sm !leading-4.5 !text-[var(--color-text-tooltip-shortcut)]`
        : `!rounded-md !bg-current/10 !text-xs !text-current`,
    s = a === `tooltip` && `-me-1.75`,
    c =
      a === `button`
        ? `h-4 min-w-4 items-center justify-center !px-1.5 !py-0 !leading-4`
        : a === "default" && `!px-1.5 !py-0.5 !leading-none`,
    l;
  t[0] !== i || t[1] !== o || t[2] !== s || t[3] !== c
    ? ((l = q(`inline-flex !border-0 !font-sans !shadow-none`, o, s, c, i)),
      (t[0] = i),
      (t[1] = o),
      (t[2] = s),
      (t[3] = c),
      (t[4] = l))
    : (l = t[4]);
  let u;
  return (
    t[5] !== n || t[6] !== l
      ? ((u = (0, pxi.jsx)(`kbd`, { className: l, children: n })),
        (t[5] = n),
        (t[6] = l),
        (t[7] = u))
      : (u = t[7]),
    u
  );
}
function nVi(e) {
  let t = (0, x9.c)(24),
    {
      label: n,
      labelId: r,
      labelSizing: i,
      labelWeight: a,
      description: o,
      descriptionId: s,
      icon: c,
      variant: l,
      verticalAlignment: u,
    } = e,
    d = i === void 0 ? `grow` : i,
    f = a === void 0 ? `medium` : a,
    p = u === `start` ? `items-start` : `items-center`,
    m = d === `grow` && `flex-1`,
    h;
  t[0] !== p || t[1] !== m
    ? ((h = q(`flex min-w-0 gap-3`, p, m)), (t[0] = p), (t[1] = m), (t[2] = h))
    : (h = t[2]);
  let g;
  t[3] === c
    ? (g = t[4])
    : ((g = c == null ? null : (0, S9.jsx)(`span`, { className: `flex shrink-0`, children: c })),
      (t[3] = c),
      (t[4] = g));
  let _ = l === `featured` && `text-base`,
    v = l === `recommendation` && `text-[13px] leading-[18.571429px]`,
    y = l !== `featured` && l !== `recommendation` && `text-sm`,
    b = l !== `nested` && f === `medium` && `font-medium`,
    x;
  t[5] !== b || t[6] !== _ || t[7] !== v || t[8] !== y
    ? ((x = q(
        `min-w-0 break-words text-default group-data-[density=compact]/settings:leading-4.5`,
        _,
        v,
        y,
        b,
      )),
      (t[5] = b),
      (t[6] = _),
      (t[7] = v),
      (t[8] = y),
      (t[9] = x))
    : (x = t[9]);
  let S;
  t[10] !== n || t[11] !== r || t[12] !== x
    ? ((S = (0, S9.jsx)(`div`, { id: r, className: x, children: n })),
      (t[10] = n),
      (t[11] = r),
      (t[12] = x),
      (t[13] = S))
    : (S = t[13]);
  let C;
  t[14] !== o || t[15] !== s
    ? ((C = o
        ? (0, S9.jsx)(`div`, {
            id: s,
            className: `min-w-0 text-xs leading-4 text-wrap break-words text-secondary`,
            children: o,
          })
        : null),
      (t[14] = o),
      (t[15] = s),
      (t[16] = C))
    : (C = t[16]);
  let w;
  t[17] !== S || t[18] !== C
    ? ((w = (0, S9.jsxs)(`div`, {
        className: `flex min-w-0 flex-1 flex-col gap-0.5`,
        children: [S, C],
      })),
      (t[17] = S),
      (t[18] = C),
      (t[19] = w))
    : (w = t[19]);
  let T;
  return (
    t[20] !== w || t[21] !== h || t[22] !== g
      ? ((T = (0, S9.jsxs)(`div`, { className: h, children: [g, w] })),
        (t[20] = w),
        (t[21] = h),
        (t[22] = g),
        (t[23] = T))
      : (T = t[23]),
    T
  );
}
function eVi(e) {
  let t = (0, x9.c)(32),
    {
      ref: n,
      actions: r,
      ariaLabel: i,
      className: a,
      description: o,
      disabled: s,
      edgeRounding: c,
      icon: l,
      label: u,
      onClick: d,
      onFocus: f,
      onPointerEnter: p,
      trailing: m,
      variant: h,
    } = e,
    g = c === void 0 ? `row` : c,
    _ = h === void 0 ? `default` : h,
    v = g === `row` && `first:rounded-t-2xl last:rounded-b-2xl`,
    y = _ === `recommendation` && `dark:bg-primary-ghost-hover`,
    b = !s && `hover:bg-primary-ghost-hover focus-within:bg-primary-ghost-hover`,
    x =
      !s &&
      _ === `recommendation` &&
      `dark:hover:bg-background-secondary-soft-alpha dark:focus-within:bg-background-secondary-soft-alpha`,
    S;
  t[0] !== v || t[1] !== y || t[2] !== b || t[3] !== x
    ? ((S = q(`group flex w-full items-center`, v, y, b, x)),
      (t[0] = v),
      (t[1] = y),
      (t[2] = b),
      (t[3] = x),
      (t[4] = S))
    : (S = t[4]);
  let C;
  t[5] !== a || t[6] !== _
    ? ((C = q(
        `flex min-w-0 flex-1 cursor-interaction items-center rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring disabled:cursor-default disabled:opacity-60`,
        _ === `empty`
          ? `flex-col justify-center gap-4 px-6 py-10 text-center text-base text-tertiary select-none`
          : q(`px-4 text-start`, _ === `nested` ? `min-h-10 gap-3 py-0.5` : `gap-6 py-3`),
        a,
      )),
      (t[5] = a),
      (t[6] = _),
      (t[7] = C))
    : (C = t[7]);
  let w;
  t[8] !== o || t[9] !== l || t[10] !== u || t[11] !== _
    ? ((w =
        _ === `empty`
          ? (0, S9.jsxs)(S9.Fragment, { children: [l, u] })
          : (0, S9.jsx)(nVi, {
              label: u,
              description: o,
              icon: l,
              variant: _,
              verticalAlignment: `center`,
            })),
      (t[8] = o),
      (t[9] = l),
      (t[10] = u),
      (t[11] = _),
      (t[12] = w))
    : (w = t[12]);
  let T;
  t[13] === m
    ? (T = t[14])
    : ((T =
        m == null
          ? null
          : (0, S9.jsx)(`div`, { className: `flex shrink-0 items-center gap-2`, children: m })),
      (t[13] = m),
      (t[14] = T));
  let E;
  t[15] !== i ||
  t[16] !== s ||
  t[17] !== d ||
  t[18] !== f ||
  t[19] !== p ||
  t[20] !== n ||
  t[21] !== T ||
  t[22] !== C ||
  t[23] !== w
    ? ((E = (0, S9.jsxs)(`button`, {
        ref: n,
        "aria-label": i,
        className: C,
        disabled: s,
        onClick: d,
        onFocus: f,
        onPointerEnter: p,
        type: `button`,
        children: [w, T],
      })),
      (t[15] = i),
      (t[16] = s),
      (t[17] = d),
      (t[18] = f),
      (t[19] = p),
      (t[20] = n),
      (t[21] = T),
      (t[22] = C),
      (t[23] = w),
      (t[24] = E))
    : (E = t[24]);
  let D;
  t[25] !== r || t[26] !== s
    ? ((D =
        !s && r != null
          ? (0, S9.jsx)(`div`, { className: `flex shrink-0 items-center gap-1 pe-4`, children: r })
          : null),
      (t[25] = r),
      (t[26] = s),
      (t[27] = D))
    : (D = t[27]);
  let O;
  return (
    t[28] !== E || t[29] !== D || t[30] !== S
      ? ((O = (0, S9.jsxs)(`div`, { className: S, children: [E, D] })),
        (t[28] = E),
        (t[29] = D),
        (t[30] = S),
        (t[31] = O))
      : (O = t[31]),
    O
  );
}
function sVi() {
  return (sVi = t(() => {
    ((aVi = `flex flex-col [&>*:not(:last-child)]:relative [&>*:not(:last-child)]:after:pointer-events-none [&>*:not(:last-child)]:after:absolute [&>*:not(:last-child)]:after:inset-x-4 [&>*:not(:last-child)]:after:bottom-0 [&>*:not(:last-child)]:after:h-px [&>*:not(:last-child)]:after:bg-border [&>*:not(:last-child)]:after:content-['']`),
      (oVi = `flex flex-col [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border`));
  }))();
}
function uVi() {
  return (uVi = t(() => {
    ((cVi = `_daybreak_vyuj8_1`), (lVi = { daybreak: cVi }));
  }))();
}
function dVi(e) {
  let t = (0, fVi.c)(22),
    { children: n, className: r, contentOverflow: i, dividers: a, variant: o, decoration: s } = e,
    c = i === void 0 ? `hidden` : i,
    l = a === void 0 || a,
    u = o === void 0 ? `default` : o,
    d = l ? (u === `flat` ? oVi : aVi) : `flex flex-col`,
    f = u === `recommendation` && `rounded-[20px]`,
    p = u !== `recommendation` && u !== `flat` && `rounded-2xl`,
    m = s === `daybreak` && lVi.daybreak,
    h = c === `visible` ? `overflow-visible` : `overflow-hidden`,
    g =
      u === "default" &&
      `border border-default group-data-[density=compact]/settings:border-0 group-data-[density=compact]/settings:ring-1 group-data-[density=compact]/settings:ring-inset group-data-[density=compact]/settings:ring-border`,
    _ = u === `metered` && `ring-1 ring-inset ring-border-subtle`,
    v = u === `secondary` && `bg-surface-secondary/92`,
    y = u === `muted` && `bg-(--color-background-primary-soft-alpha)/50 dark:bg-primary-soft-alpha`,
    b =
      u === `form` &&
      `border border-subtle bg-surface dark:bg-surface-secondary/92 group-data-[density=form]/settings:border-default group-data-[density=form]/settings:bg-transparent dark:group-data-[density=form]/settings:bg-transparent group-data-[density=form]/settings:[&>*:not(:last-child)]:after:inset-x-5 group-data-[density=form]/settings:[&>*:not(:last-child)]:after:h-px group-data-[density=form]/settings:[&>*:not(:last-child)]:after:bg-border-subtle`,
    x = u === `outlined` && `border border-subtle bg-transparent`,
    S =
      u === `flat` &&
      `relative bg-transparent before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-border after:content-['']`,
    C = u === `input` && `border border-primary-outline bg-primary-soft`,
    w = u === `recommendation` && `border border-default bg-secondary-soft dark:bg-transparent`,
    T;
  t[0] !== r ||
  t[1] !== _ ||
  t[2] !== v ||
  t[3] !== y ||
  t[4] !== b ||
  t[5] !== x ||
  t[6] !== S ||
  t[7] !== C ||
  t[8] !== w ||
  t[9] !== d ||
  t[10] !== f ||
  t[11] !== p ||
  t[12] !== m ||
  t[13] !== h ||
  t[14] !== g
    ? ((T = q(d, f, p, m, h, g, _, v, y, b, x, S, C, w, r)),
      (t[0] = r),
      (t[1] = _),
      (t[2] = v),
      (t[3] = y),
      (t[4] = b),
      (t[5] = x),
      (t[6] = S),
      (t[7] = C),
      (t[8] = w),
      (t[9] = d),
      (t[10] = f),
      (t[11] = p),
      (t[12] = m),
      (t[13] = h),
      (t[14] = g),
      (t[15] = T))
    : (T = t[15]);
  let E;
  t[16] === u
    ? (E = t[17])
    : ((E =
        u === "default" || u === `metered`
          ? {
              backgroundColor: `var(--color-background-panel, var(--color-background-primary-soft-alpha))`,
            }
          : void 0),
      (t[16] = u),
      (t[17] = E));
  let D;
  return (
    t[18] !== n || t[19] !== T || t[20] !== E
      ? ((D = (0, pVi.jsx)(`div`, { className: T, style: E, children: n })),
        (t[18] = n),
        (t[19] = T),
        (t[20] = E),
        (t[21] = D))
      : (D = t[21]),
    D
  );
}
function XBi(e) {
  let t = (0, x9.c)(39),
    {
      label: n,
      labelSizing: r,
      labelWeight: i,
      layout: a,
      description: o,
      control: s,
      controlSizing: c,
      icon: l,
      className: u,
      id: d,
      inset: f,
      size: p,
      variant: m,
      verticalAlignment: h,
    } = e,
    g = r === void 0 ? `grow` : r,
    _ = i === void 0 ? `medium` : i,
    v = a === void 0 ? `default` : a,
    y = c === void 0 ? `minimum` : c,
    b = f === void 0 || f,
    x = p === void 0 ? `default` : p,
    S = m === void 0 ? `default` : m,
    C = h === void 0 ? `center` : h,
    w = (0, rVi.useId)(),
    T = n != null || o != null || l != null,
    E = typeof s == `function`,
    D = E && n != null ? `${w}-label` : void 0,
    O = E && o ? `${w}-description` : void 0,
    k = b && (v !== `split` || S !== "default") && `px-4`,
    A = b && S === `nested` && `group-data-[density=form]/settings:px-5`,
    j =
      S === `stacked` &&
      `flex flex-col items-stretch gap-1 py-3 group-data-[density=compact]/settings:gap-0.5 group-data-[density=compact]/settings:py-2.5 group-data-[density=compact]/settings:first:pt-3.5 group-data-[density=compact]/settings:last:pb-4`,
    M =
      S === `nested` &&
      `flex min-h-10 justify-between gap-3 py-2 max-sm:min-h-0 max-sm:flex-col max-sm:items-stretch group-data-[density=form]/settings:min-h-12 sm:group-data-[density=form]/settings:py-0`,
    N = S !== `stacked` && (C === `start` ? `items-start` : `items-center`),
    P = v === `split` && S === "default" && `grid grid-cols-1 gap-2 px-0 py-4 sm:grid-cols-3`,
    F;
  t[0] !== u ||
  t[1] !== v ||
  t[2] !== x ||
  t[3] !== A ||
  t[4] !== j ||
  t[5] !== M ||
  t[6] !== N ||
  t[7] !== P ||
  t[8] !== k ||
  t[9] !== S
    ? ((F = q(
        `@container/settings-row`,
        k,
        A,
        j,
        M,
        N,
        P,
        v === "default" &&
          (S === "default" || S === `featured` || S === `recommendation`) &&
          q(
            `flex justify-between`,
            S === `featured` && q(`gap-6`, x === `compact` ? `min-h-11 py-2` : `py-4`),
            S !== `featured` && (x === `compact` ? `gap-4 py-2` : `gap-6 py-3`),
          ),
        S === `recommendation` && `dark:bg-primary-ghost-hover`,
        u,
      )),
      (t[0] = u),
      (t[1] = v),
      (t[2] = x),
      (t[3] = A),
      (t[4] = j),
      (t[5] = M),
      (t[6] = N),
      (t[7] = P),
      (t[8] = k),
      (t[9] = S),
      (t[10] = F))
    : (F = t[10]);
  let ee;
  t[11] !== o ||
  t[12] !== O ||
  t[13] !== T ||
  t[14] !== l ||
  t[15] !== n ||
  t[16] !== D ||
  t[17] !== g ||
  t[18] !== _ ||
  t[19] !== S ||
  t[20] !== C
    ? ((ee = T
        ? (0, S9.jsx)(nVi, {
            label: n,
            labelId: D,
            labelSizing: g,
            labelWeight: _,
            description: o,
            descriptionId: O,
            icon: l,
            variant: S,
            verticalAlignment: C,
          })
        : null),
      (t[11] = o),
      (t[12] = O),
      (t[13] = T),
      (t[14] = l),
      (t[15] = n),
      (t[16] = D),
      (t[17] = g),
      (t[18] = _),
      (t[19] = S),
      (t[20] = C),
      (t[21] = ee))
    : (ee = t[21]);
  let te;
  t[22] !== y || t[23] !== v || t[24] !== S
    ? ((te = q(
        S === `stacked` && `w-full`,
        S === `nested` && `flex min-w-0 flex-1 items-center justify-end max-sm:justify-stretch`,
        v === `split` &&
          S === "default" &&
          q(
            `flex min-w-0 max-w-full items-center justify-end gap-2`,
            `sm:col-span-2`,
            y === `grow` && `w-full`,
          ),
        v === "default" &&
          (S === "default" || S === `featured` || S === `recommendation`) &&
          q(
            `flex max-w-full items-center justify-end gap-2`,
            y === `grow` ? `min-w-0 flex-1` : `shrink-0`,
            y === `minimum` && `min-w-[min(--spacing(40),40cqw)] empty:min-w-0`,
          ),
      )),
      (t[22] = y),
      (t[23] = v),
      (t[24] = S),
      (t[25] = te))
    : (te = t[25]);
  let ne;
  t[26] !== s || t[27] !== O || t[28] !== E || t[29] !== D
    ? ((ne = E ? s({ "aria-labelledby": D, "aria-describedby": O }) : s),
      (t[26] = s),
      (t[27] = O),
      (t[28] = E),
      (t[29] = D),
      (t[30] = ne))
    : (ne = t[30]);
  let re;
  t[31] !== te || t[32] !== ne
    ? ((re = (0, S9.jsx)(`div`, { className: te, children: ne })),
      (t[31] = te),
      (t[32] = ne),
      (t[33] = re))
    : (re = t[33]);
  let I;
  return (
    t[34] !== d || t[35] !== F || t[36] !== ee || t[37] !== re
      ? ((I = (0, S9.jsxs)(`div`, { id: d, className: F, children: [ee, re] })),
        (t[34] = d),
        (t[35] = F),
        (t[36] = ee),
        (t[37] = re),
        (t[38] = I))
      : (I = t[38]),
    I
  );
}
function ZBi(e) {
  let t = (0, x9.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, S9.jsx)(`span`, { className: `text-tertiary`, children: n })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function QBi(e) {
  let t = (0, x9.c)(2),
    { children: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, S9.jsx)(`span`, { className: `text-xs text-secondary`, children: n })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function $Bi(e) {
  let t = (0, x9.c)(43),
    {
      id: n,
      ariaLabel: r,
      autoFocus: i,
      checked: a,
      description: o,
      highlightSelected: s,
      indicator: c,
      label: l,
      name: u,
      onChange: d,
      onClick: f,
      value: p,
      variant: m,
    } = e,
    h = s === void 0 || s,
    g = c === void 0 ? `radio` : c,
    _ = m === void 0 ? `default` : m,
    v;
  t[0] !== a || t[1] !== o || t[2] !== h || t[3] !== g || t[4] !== _
    ? ((v = q(
        `relative flex has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-2px] has-[:focus-visible]:outline-ring`,
        _ === "default" &&
          q(
            `gap-3 px-4 py-3 first:rounded-t-2xl last:rounded-b-2xl hover:bg-primary-ghost-hover`,
            o == null ? `items-center` : `min-h-16 items-start`,
          ),
        _ === "default" && a && h && g === `radio` && `bg-primary-soft-alpha`,
        _ === `form` && `items-center gap-4 px-4 py-4 hover:bg-primary-ghost-hover`,
        _ === `inline` && `items-center gap-2`,
        g === `checkmark` && `after:ms-7`,
      )),
      (t[0] = a),
      (t[1] = o),
      (t[2] = h),
      (t[3] = g),
      (t[4] = _),
      (t[5] = v))
    : (v = t[5]);
  let y;
  t[6] !== r || t[7] !== n
    ? ((y = (0, S9.jsx)(`label`, {
        className: `absolute inset-0 cursor-interaction`,
        "aria-label": r,
        htmlFor: n,
      })),
      (t[6] = r),
      (t[7] = n),
      (t[8] = y))
    : (y = t[8]);
  let b;
  t[9] !== g || t[10] !== _
    ? ((b = q(
        `z-10 cursor-interaction`,
        g === `checkmark`
          ? `absolute inset-0 size-full opacity-0`
          : q(
              `relative shrink-0 appearance-auto accent-current`,
              _ === "default" ? `mt-1 size-4` : `size-5`,
            ),
      )),
      (t[9] = g),
      (t[10] = _),
      (t[11] = b))
    : (b = t[11]);
  let x = o == null ? void 0 : `${n}-description`,
    S;
  t[12] !== r ||
  t[13] !== i ||
  t[14] !== a ||
  t[15] !== n ||
  t[16] !== u ||
  t[17] !== d ||
  t[18] !== f ||
  t[19] !== b ||
  t[20] !== x ||
  t[21] !== p
    ? ((S = (0, S9.jsx)(`input`, {
        id: n,
        className: b,
        "aria-label": r,
        "aria-describedby": x,
        autoFocus: i,
        type: `radio`,
        name: u,
        value: p,
        checked: a,
        onChange: d,
        onClick: f,
      })),
      (t[12] = r),
      (t[13] = i),
      (t[14] = a),
      (t[15] = n),
      (t[16] = u),
      (t[17] = d),
      (t[18] = f),
      (t[19] = b),
      (t[20] = x),
      (t[21] = p),
      (t[22] = S))
    : (S = t[22]);
  let C;
  t[23] !== a || t[24] !== g
    ? ((C = g === `checkmark` ? (0, S9.jsx)(b$, { className: q(!a && `invisible`) }) : null),
      (t[23] = a),
      (t[24] = g),
      (t[25] = C))
    : (C = t[25]);
  let w = _ === "default" ? `text-sm font-medium` : `text-base`,
    T;
  t[26] === w ? (T = t[27]) : ((T = q(`text-default`, w)), (t[26] = w), (t[27] = T));
  let E;
  t[28] !== l || t[29] !== T
    ? ((E = (0, S9.jsx)(`span`, { className: T, children: l })),
      (t[28] = l),
      (t[29] = T),
      (t[30] = E))
    : (E = t[30]);
  let D;
  t[31] !== o || t[32] !== n
    ? ((D =
        o == null
          ? null
          : (0, S9.jsx)(`span`, {
              id: `${n}-description`,
              className: `text-sm leading-5 text-secondary`,
              children: o,
            })),
      (t[31] = o),
      (t[32] = n),
      (t[33] = D))
    : (D = t[33]);
  let O;
  t[34] !== E || t[35] !== D
    ? ((O = (0, S9.jsxs)(`span`, {
        className: `pointer-events-none relative flex min-w-0 flex-col gap-0.5`,
        children: [E, D],
      })),
      (t[34] = E),
      (t[35] = D),
      (t[36] = O))
    : (O = t[36]);
  let k;
  return (
    t[37] !== O || t[38] !== v || t[39] !== y || t[40] !== S || t[41] !== C
      ? ((k = (0, S9.jsxs)(`div`, { className: v, children: [y, S, C, O] })),
        (t[37] = O),
        (t[38] = v),
        (t[39] = y),
        (t[40] = S),
        (t[41] = C),
        (t[42] = k))
      : (k = t[42]),
    k
  );
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
sVi();uVi();K6n();const b$=AssetIcon.fromPreset(G6n);
return {SettingsControlRow:XBi,SettingsRadioRow:$Bi,SettingsMutedValue:ZBi,SettingsHint:QBi,SettingsLabel:nVi,SettingsActionRow:eVi,SettingsPanel:dVi,SettingsGroup:Object.assign(w6s,{Header:T6s,Content:E6s,Footer:b6s}),SettingsValueRow:tVi,ShortcutBadge:dxi};
}
