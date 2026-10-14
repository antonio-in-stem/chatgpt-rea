// Original hNs settings dropdown button and QNi chevron.
import {classNames as ng} from './classNames.js';
export function createSettingsDropdownButton({React,Button:Ir,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const vNs=compilerRuntime,j6=runtime,t=fn=>fn,o=()=>{},K=()=>runtime;let XNi,ZNi;
function QNi() {
  return (QNi = t(() => {
    (o(),
      (XNi = K()),
      (ZNi = (e) =>
        (0, XNi.jsx)(`svg`, {
          width: 20,
          height: 21,
          viewBox: `0 0 20 21`,
          fill: `none`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: (0, XNi.jsx)(`path`, {
            d: `M15.2793 7.71101C15.539 7.45131 15.961 7.45131 16.2207 7.71101C16.4804 7.97071 16.4804 8.39272 16.2207 8.65242L10.4707 14.4024C10.211 14.6621 9.78902 14.6621 9.52932 14.4024L3.77932 8.65242L3.69436 8.54792C3.52385 8.28979 3.55205 7.93828 3.77932 7.71101C4.00659 7.48374 4.3581 7.45554 4.61623 7.62605L4.72073 7.71101L10 12.9903L15.2793 7.71101Z`,
            fill: `currentColor`,
            stroke: `currentColor`,
            strokeWidth: 0.6,
          }),
        })));
  }))();
}
QNi();const au=ZNi;
function hNs(e) {
  let t = (0, vNs.c)(29),
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
        children: r,
        className: i,
        contentClassName: a,
        chevronClassName: n,
        leadingVisual: o,
        color: c,
        size: l,
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
      (t[8] = l));
  let u = c === void 0 ? `outline` : c,
    d = l === void 0 ? `toolbar` : l,
    f =
      d === `toolbar` &&
      (o == null
        ? `px-3`
        : `pe-3 ps-[calc((var(--spacing-token-button-composer)-var(--spacing)*5)/2-1px)]`),
    p;
  t[9] !== i || t[10] !== f
    ? ((p = ng(`max-w-full justify-between`, f, i)), (t[9] = i), (t[10] = f), (t[11] = p))
    : (p = t[11]);
  let m;
  t[12] === a
    ? (m = t[13])
    : ((m = ng(`flex min-w-0 flex-1 items-center gap-1.5`, a)), (t[12] = a), (t[13] = m));
  let h;
  t[14] !== r || t[15] !== o || t[16] !== m
    ? ((h = (0, j6.jsxs)(`span`, { className: m, children: [o, r] })),
      (t[14] = r),
      (t[15] = o),
      (t[16] = m),
      (t[17] = h))
    : (h = t[17]);
  let g;
  t[18] === n
    ? (g = t[19])
    : ((g = ng(`icon-2xs shrink-0 text-tertiary`, n)), (t[18] = n), (t[19] = g));
  let _;
  t[20] === g ? (_ = t[21]) : ((_ = (0, j6.jsx)(au, { className: g })), (t[20] = g), (t[21] = _));
  let v;
  return (
    t[22] !== u || t[23] !== s || t[24] !== d || t[25] !== p || t[26] !== h || t[27] !== _
      ? ((v = (0, j6.jsxs)(Ir, { color: u, size: d, className: p, ...s, children: [h, _] })),
        (t[22] = u),
        (t[23] = s),
        (t[24] = d),
        (t[25] = p),
        (t[26] = h),
        (t[27] = _),
        (t[28] = v))
      : (v = t[28]),
    v
  );
}
return hNs;
}
