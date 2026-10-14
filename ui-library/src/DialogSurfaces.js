// Original dialog layout surfaces; overlay/content controller is not replaced here.
import {classNames as q} from './classNames.js';
export function createDialogSurfaces({React,Button:r5,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!r5||!compilerRuntime?.c)throw new TypeError('DialogSurfaces requires original Button and React compiler runtime');
 const h=React.createElement,F7={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},N7=compilerRuntime,P7=React,t=fn=>fn;
 const CNi='codex.debug.dialogLayout',I7='relative rounded-lg border border-chart-blue/40',TNi='absolute -top-2 left-2 rounded bg-chart-blue/15 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-chart-blue';
 let cNi,lNi,uNi,dNi,fNi,pNi,A7;
function mNi() {
  return (mNi = t(() => {
    ((cNi = `_body_1rxrl_2`),
      (lNi = `_section_1rxrl_2`),
      (uNi = `_largeSection_1rxrl_2`),
      (dNi = `_footer_1rxrl_2`),
      (fNi = `_chatgptConfirmationBody_1rxrl_2`),
      (pNi = `_chatgptConfirmationHeaderTitle_1rxrl_2`),
      (A7 = {
        body: cNi,
        section: lNi,
        largeSection: uNi,
        footer: dNi,
        chatgptConfirmationBody: fNi,
        chatgptConfirmationHeaderTitle: pNi,
      }));
  }))();
}
function hNi(e) {
  if (e === `scrollable`)
    return `max-h-[min(calc(85dvh/var(--codex-window-zoom)),calc(var(--spacing)*176))] overflow-hidden`;
  if (e === `viewport`) return `max-h-[calc(100dvh/var(--codex-window-zoom)-2rem)] overflow-y-auto`;
  if (e === `full`) return `h-full min-h-0`;
  if (e === `tall`) return `min-h-[520px] max-h-[560px]`;
}
function j7() {
  return typeof window > `u` ||
    window.localStorage == null ||
    typeof window.localStorage.getItem != `function`
    ? !1
    : window.localStorage.getItem(CNi) === `1`;
}
function M7(e) {
  let t = (0, N7.c)(2),
    { name: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, F7.jsx)(`span`, { className: TNi, children: n })), (t[0] = n), (t[1] = r)),
    r
  );
}
function _Ni(e) {
  "use forget";
  let t = (0, N7.c)(23),
    { children: n, className: r, size: i, variant: a } = e,
    o = a === void 0 ? `default` : a,
    s,
    c;
  if (t[0] !== r || t[1] !== i || t[2] !== o) {
    s = j7();
    let e = hNi(i);
    ((c = q(
      `flex flex-col text-base leading-normal tracking-normal`,
      o === `confirmation` ? `gap-6 p-8` : `gap-0`,
      o === "default" && A7.body,
      o === `chatgptConfirmation` && A7.chatgptConfirmationBody,
      s && I7,
      e,
      r,
    )),
      (t[0] = r),
      (t[1] = i),
      (t[2] = o),
      (t[3] = s),
      (t[4] = c));
  } else ((s = t[3]), (c = t[4]));
  let l = c;
  if (e.as === `form`) {
    let r;
    if (t[5] !== e) {
      let { as: n, children: i, className: a, size: o, variant: s, ...c } = e;
      ((r = c), (t[5] = e), (t[6] = r));
    } else r = t[6];
    let i;
    t[7] === s
      ? (i = t[8])
      : ((i = s ? (0, F7.jsx)(M7, { name: `DialogBody` }) : null), (t[7] = s), (t[8] = i));
    let a;
    return (
      t[9] !== n || t[10] !== l || t[11] !== r || t[12] !== i
        ? ((a = (0, F7.jsxs)(`form`, { ...r, className: l, children: [i, n] })),
          (t[9] = n),
          (t[10] = l),
          (t[11] = r),
          (t[12] = i),
          (t[13] = a))
        : (a = t[13]),
      a
    );
  }
  let u;
  if (t[14] !== e) {
    let { as: n, children: r, className: i, size: a, variant: o, ...s } = e;
    ((u = s), (t[14] = e), (t[15] = u));
  } else u = t[15];
  let d;
  t[16] === s
    ? (d = t[17])
    : ((d = s ? (0, F7.jsx)(M7, { name: `DialogBody` }) : null), (t[16] = s), (t[17] = d));
  let f;
  return (
    t[18] !== n || t[19] !== l || t[20] !== u || t[21] !== d
      ? ((f = (0, F7.jsxs)(`div`, { ...u, className: l, children: [d, n] })),
        (t[18] = n),
        (t[19] = l),
        (t[20] = u),
        (t[21] = d),
        (t[22] = f))
      : (f = t[22]),
    f
  );
}
function gNi(e) {
  let t = (0, N7.c)(33),
    {
      icon: n,
      title: r,
      subtitle: i,
      className: a,
      iconClassName: o,
      iconBackgroundClassName: s,
      titleSize: c,
      titleClassName: l,
      subtitleSize: u,
      subtitleTone: d,
      subtitleClassName: f,
      variant: p,
    } = e,
    m = c === void 0 ? `dialog` : c,
    h = u === void 0 ? `base` : u,
    g = d === void 0 ? `tertiary` : d,
    _ = p === void 0 ? `default` : p,
    v,
    y,
    b,
    x,
    S;
  t[0] !== a || t[1] !== h || t[2] !== m || t[3] !== _
    ? ((y = j7()),
      (v = _ === `chatgptConfirmation`),
      (S =
        m === `lg`
          ? `heading-lg`
          : m === `base`
            ? `heading-base`
            : m === `sm`
              ? `heading-sm`
              : `heading-dialog`),
      (b =
        h === `base`
          ? `text-base leading-normal tracking-normal`
          : `text-sm leading-normal tracking-normal`),
      (x = q(`flex flex-col items-start gap-3`, y && I7, a)),
      (t[0] = a),
      (t[1] = h),
      (t[2] = m),
      (t[3] = _),
      (t[4] = v),
      (t[5] = y),
      (t[6] = b),
      (t[7] = x),
      (t[8] = S))
    : ((v = t[4]), (y = t[5]), (b = t[6]), (x = t[7]), (S = t[8]));
  let C;
  t[9] === y
    ? (C = t[10])
    : ((C = y ? (0, F7.jsx)(M7, { name: `DialogHeader` }) : null), (t[9] = y), (t[10] = C));
  let w;
  t[11] !== n || t[12] !== s || t[13] !== o
    ? ((w = n
        ? (0, F7.jsx)(`span`, {
            className: q(
              `flex h-9 w-9 shrink-0 items-center justify-center rounded-xl p-2`,
              s ?? `bg-text/5`,
              o,
            ),
            children: n,
          })
        : null),
      (t[11] = n),
      (t[12] = s),
      (t[13] = o),
      (t[14] = w))
    : (w = t[14]);
  let T;
  t[15] !== v || t[16] !== r || t[17] !== l || t[18] !== S
    ? ((T = r
        ? (0, F7.jsx)(`div`, {
            className: q(
              !v && S,
              v && A7.chatgptConfirmationHeaderTitle,
              `min-w-0`,
              !v && `font-semibold`,
              l,
            ),
            children: r,
          })
        : null),
      (t[15] = v),
      (t[16] = r),
      (t[17] = l),
      (t[18] = S),
      (t[19] = T))
    : (T = t[19]);
  let E;
  t[20] !== i || t[21] !== f || t[22] !== b || t[23] !== g
    ? ((E = i
        ? (0, F7.jsx)(`div`, {
            className: q(
              {
                default: `text-default`,
                secondary: `text-secondary`,
                tertiary: `text-codex-description`,
              }[g],
              b,
              f,
            ),
            children: i,
          })
        : null),
      (t[20] = i),
      (t[21] = f),
      (t[22] = b),
      (t[23] = g),
      (t[24] = E))
    : (E = t[24]);
  let D;
  t[25] !== T || t[26] !== E
    ? ((D = (0, F7.jsxs)(`div`, {
        className: `flex min-w-0 flex-1 flex-col gap-1 self-stretch`,
        children: [T, E],
      })),
      (t[25] = T),
      (t[26] = E),
      (t[27] = D))
    : (D = t[27]);
  let O;
  return (
    t[28] !== D || t[29] !== x || t[30] !== C || t[31] !== w
      ? ((O = (0, F7.jsxs)(`div`, { className: x, children: [C, w, D] })),
        (t[28] = D),
        (t[29] = x),
        (t[30] = C),
        (t[31] = w),
        (t[32] = O))
      : (O = t[32]),
    O
  );
}
function bNi(e) {
  let t = (0, N7.c)(10),
    { children: n, className: r, spacing: i } = e,
    a = i === void 0 ? `default` : i,
    o,
    s;
  t[0] !== r || t[1] !== a
    ? ((o = j7()),
      (s = q(`flex w-full flex-col`, A7.section, a === `large` && A7.largeSection, o && I7, r)),
      (t[0] = r),
      (t[1] = a),
      (t[2] = o),
      (t[3] = s))
    : ((o = t[2]), (s = t[3]));
  let c;
  t[4] === o
    ? (c = t[5])
    : ((c = o ? (0, F7.jsx)(M7, { name: `DialogSection` }) : null), (t[4] = o), (t[5] = c));
  let l;
  return (
    t[6] !== n || t[7] !== s || t[8] !== c
      ? ((l = (0, F7.jsxs)(`div`, { className: s, children: [c, n] })),
        (t[6] = n),
        (t[7] = s),
        (t[8] = c),
        (t[9] = l))
      : (l = t[9]),
    l
  );
}
function vNi(e) {
  let t = (0, N7.c)(15),
    { children: n, className: r, expandSingleButton: i, variant: a } = e,
    o = i === void 0 || i,
    s = a === void 0 ? `default` : a,
    c,
    l,
    u;
  if (t[0] !== n || t[1] !== r || t[2] !== o || t[3] !== s) {
    let e = j7(),
      i = P7.Children.toArray(n),
      a = i.reduce(yNi, 0);
    ((l = q(
      `flex w-full flex-wrap items-center justify-end`,
      s === `chatgptConfirmation` ? `gap-2` : `gap-3`,
      A7.footer,
      e && I7,
      r,
    )),
      t[7] === e
        ? (u = t[8])
        : ((u = e ? (0, F7.jsx)(M7, { name: `DialogFooter` }) : null), (t[7] = e), (t[8] = u)),
      (c = ((e) =>
        i.map((t) => {
          if (!P7.isValidElement(t) || t.type !== r5) return t;
          let n = o && a === 1 ? `w-full justify-center` : void 0;
          return P7.cloneElement(t, {
            size: t.props.size ?? e,
            className: q(t.props.className, n),
          });
        }))(`medium`)),
      (t[0] = n),
      (t[1] = r),
      (t[2] = o),
      (t[3] = s),
      (t[4] = c),
      (t[5] = l),
      (t[6] = u));
  } else ((c = t[4]), (l = t[5]), (u = t[6]));
  let d;
  t[9] === c
    ? (d = t[10])
    : ((d = (0, F7.jsx)(F7.Fragment, { children: c })), (t[9] = c), (t[10] = d));
  let f;
  return (
    t[11] !== l || t[12] !== u || t[13] !== d
      ? ((f = (0, F7.jsxs)(`div`, { className: l, children: [u, d, null] })),
        (t[11] = l),
        (t[12] = u),
        (t[13] = d),
        (t[14] = f))
      : (f = t[14]),
    f
  );
}
function yNi(e, t) {
  return !P7.isValidElement(t) || t.type !== r5 ? e : e + 1;
}
function xNi(e) {
  let t = (0, N7.c)(9),
    { children: n, className: r } = e,
    i,
    a;
  t[0] === r
    ? ((i = t[1]), (a = t[2]))
    : ((i = j7()),
      (a = q(`relative flex items-center gap-2`, i && I7, r)),
      (t[0] = r),
      (t[1] = i),
      (t[2] = a));
  let o;
  t[3] === i
    ? (o = t[4])
    : ((o = i ? (0, F7.jsx)(M7, { name: `FormRow` }) : null), (t[3] = i), (t[4] = o));
  let s;
  return (
    t[5] !== n || t[6] !== a || t[7] !== o
      ? ((s = (0, F7.jsxs)(`div`, { className: a, children: [o, n] })),
        (t[5] = n),
        (t[6] = a),
        (t[7] = o),
        (t[8] = s))
      : (s = t[8]),
    s
  );
}
 mNi();return {DialogBody:_Ni,DialogHeader:gNi,DialogSection:bNi,DialogFooter:vNi,DialogFormRow:xNi,dialogBodySizeClass:hNi};
}
