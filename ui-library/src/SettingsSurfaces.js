// Original settings group and label/value row presentation.
import {classNames as q} from './classNames.js';
export function createSettingsSurfaces({React,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const ng=q,D6s=compilerRuntime,x6s=compilerRuntime,x9=compilerRuntime,fxi=compilerRuntime,I8=runtime,S6s=runtime,S9=runtime,pxi=runtime;
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
return {SettingsGroup:Object.assign(w6s,{Header:T6s,Content:E6s,Footer:b6s}),SettingsValueRow:tVi,ShortcutBadge:dxi};
}
