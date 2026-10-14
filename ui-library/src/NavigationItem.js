// Original VF implementation. Router and artwork remain caller-owned adapters.
export function createNavigationItem({React,mergeClasses,Link,ResponsiveIcon,AnimatedIcon,DisclosureIcon,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,Ear=compilerRuntime,ng=mergeClasses,WF={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children),Fragment:React.Fragment};
const Dar=React,ih=Link,rm=ResponsiveIcon,par=AnimatedIcon,dle=DisclosureIcon,$=props=>formatMessage(props),Oar=`focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-[-2px]`;
function VF(e) {
  let t = (0, Ear.c)(155),
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
    y,
    b,
    x,
    S,
    C,
    w,
    T,
    E;
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
      (y = t[18]),
      (b = t[19]),
      (x = t[20]),
      (S = t[21]),
      (C = t[22]),
      (w = t[23]),
      (T = t[24]),
      (E = t[25]))
    : (({
        animatedIcon: n,
        icon: o,
        iconAssetSource: s,
        thumbnail: w,
        label: u,
        labelTrailing: d,
        layout: p,
        description: i,
        wrapDescription: g,
        hideLabel: a,
        fullWidth: _,
        hoverBackground: v,
        isActive: y,
        activeVariant: b,
        tone: x,
        disabled: S,
        className: r,
        weightClassName: E,
        iconClassName: c,
        trailing: T,
        interactiveTrailing: l,
        disclosure: C,
        unread: m,
        interactive: h,
        ...f
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
      (t[18] = y),
      (t[19] = b),
      (t[20] = x),
      (t[21] = S),
      (t[22] = C),
      (t[23] = w),
      (t[24] = T),
      (t[25] = E));
  let D = p === void 0 ? `default` : p,
    O = g !== void 0 && g,
    k = _ === void 0 || _,
    A = v === void 0 || v,
    j = y !== void 0 && y,
    M = b === void 0 ? `default` : b,
    N = x === void 0 ? `default` : x,
    P = S !== void 0 && S,
    F = C !== void 0 && C,
    I = m !== void 0 && m,
    L = h === void 0 || h,
    R = (0, Dar.useId)(),
    z;
  t[26] !== f || t[27] !== I || t[28] !== R
    ? ((z = I ? [f[`aria-describedby`], R].filter(Boolean).join(` `) : f[`aria-describedby`]),
      (t[26] = f),
      (t[27] = I),
      (t[28] = R),
      (t[29] = z))
    : (z = t[29]);
  let B = z,
    V = !a && i != null,
    H = P || f[`aria-disabled`] === !0 || f[`aria-disabled`] === `true`,
    ee,
    U,
    te;
  if (
    t[30] !== M ||
    t[31] !== n ||
    t[32] !== r ||
    t[33] !== i ||
    t[34] !== k ||
    t[35] !== V ||
    t[36] !== a ||
    t[37] !== A ||
    t[38] !== o ||
    t[39] !== s ||
    t[40] !== c ||
    t[41] !== L ||
    t[42] !== l ||
    t[43] !== j ||
    t[44] !== H ||
    t[45] !== u ||
    t[46] !== d ||
    t[47] !== D ||
    t[48] !== w ||
    t[49] !== N ||
    t[50] !== E ||
    t[51] !== O
  ) {
    let e;
    e =
      M === `accent`
        ? ng(
            N === `inverse` ? `before:bg-text-info/10` : `bg-text-info/10`,
            !H && (N === `inverse` ? `hover:before:bg-text-info/15` : `hover:bg-text-info/15`),
          )
        : N === `inverse`
          ? `before:bg-primary-ghost-hover`
          : `bg-primary-ghost-hover`;
    let f = M === `accent` ? `text-info` : `text-emphasis`,
      p = M === `accent` ? `text-info` : `text-codex-icon-active`;
    ee = ng(
      `group-data-[appearance=grouped]/nav-list:rounded-none group-data-[appearance=grouped]/nav-list:after:pointer-events-none group-data-[appearance=grouped]/nav-list:after:absolute group-data-[appearance=grouped]/nav-list:after:inset-x-0 group-data-[appearance=grouped]/nav-list:after:bottom-0 group-data-[appearance=grouped]/nav-list:after:ms-[calc(var(--padding-row-cell-x,var(--padding-row-x))+var(--icon-leading-size)+var(--spacing-nav-row-content))] group-data-[appearance=grouped]/nav-list:after:border-b-hairline group-data-[appearance=grouped]/nav-list:after:border-default group-data-[appearance=grouped]/nav-list:last:after:hidden`,
      `sidebar-item relative shrink-0 items-center overflow-hidden text-start text-sm disabled:cursor-default disabled:opacity-50 aria-disabled:cursor-default aria-disabled:opacity-50`,
      L && `cursor-interaction`,
      V ? `min-h-[var(--height-token-row)]` : `h-[var(--nav-item-height,var(--height-token-row))]`,
      k ? `flex w-full` : `inline-flex w-auto`,
      l == null
        ? [
            D === `summary`
              ? `gap-2 px-2 py-1`
              : `gap-2 px-[var(--padding-row-cell-x,var(--padding-row-x))] py-row-y`,
            V && `group-data-[appearance=grouped]/nav-list:py-1.25`,
          ]
        : `pe-[var(--padding-row-cell-x,var(--padding-row-x))]`,
      j
        ? e
        : !H &&
            L &&
            A &&
            (N === `inverse`
              ? `hover:before:bg-primary-ghost-hover data-[state=open]:before:bg-primary-ghost-hover`
              : `hover:bg-primary-ghost-hover data-[state=open]:bg-primary-ghost-hover`),
      E,
      N === `inverse` &&
        `isolate bg-surface-elevated-secondary text-default before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]`,
      r,
    );
    let m = null;
    if (s != null) {
      let e = j && p,
        r;
      t[55] !== c || t[56] !== e
        ? ((r = ng(c, e)), (t[55] = c), (t[56] = e), (t[57] = r))
        : (r = t[57]);
      let i;
      t[58] !== s || t[59] !== r
        ? ((i = (0, WF.jsx)(rm, { className: r, icon: s })), (t[58] = s), (t[59] = r), (t[60] = i))
        : (i = t[60]);
      let a = i,
        l;
      (t[61] !== p || t[62] !== n || t[63] !== o || t[64] !== c || t[65] !== j || t[66] !== a
        ? ((l =
            n != null && o != null && !(0, Dar.isValidElement)(o)
              ? (0, WF.jsx)(par, { animation: n, className: ng(c, j && p), Icon: o, staticIcon: a })
              : a),
          (t[61] = p),
          (t[62] = n),
          (t[63] = o),
          (t[64] = c),
          (t[65] = j),
          (t[66] = a),
          (t[67] = l))
        : (l = t[67]),
        (m = l));
    } else if (n != null && o != null && !(0, Dar.isValidElement)(o)) {
      let e = c ?? `icon-xs browser:icon-base`,
        r = j && p,
        i;
      t[68] !== e || t[69] !== r
        ? ((i = ng(e, r)), (t[68] = e), (t[69] = r), (t[70] = i))
        : (i = t[70]);
      let a;
      (t[71] !== n || t[72] !== o || t[73] !== i
        ? ((a = (0, WF.jsx)(par, { animation: n, className: i, Icon: o })),
          (t[71] = n),
          (t[72] = o),
          (t[73] = i),
          (t[74] = a))
        : (a = t[74]),
        (m = a));
    } else if ((0, Dar.isValidElement)(o)) m = o;
    else if (o != null) {
      let e;
      (t[75] !== p || t[76] !== o || t[77] !== c || t[78] !== j
        ? ((e = (0, Dar.createElement)(o, {
            className: ng(c ?? `icon-xs browser:icon-base`, j && p),
          })),
          (t[75] = p),
          (t[76] = o),
          (t[77] = c),
          (t[78] = j),
          (t[79] = e))
        : (e = t[79]),
        (m = e));
    }
    let h;
    if (a) {
      let e;
      (t[80] === u
        ? (e = t[81])
        : ((e = (0, WF.jsx)(`span`, { className: `sr-only`, children: u })),
          (t[80] = u),
          (t[81] = e)),
        (h = e));
    } else if (D === `summary`) {
      let e;
      t[82] === u
        ? (e = t[83])
        : ((e = (0, WF.jsx)(`span`, {
            className: `line-clamp-2 min-w-0 flex-1 text-base leading-5 wrap-anywhere`,
            children: u,
          })),
          (t[82] = u),
          (t[83] = e));
      let n;
      t[84] !== d || t[85] !== e
        ? ((n = (0, WF.jsxs)(`span`, {
            className: `flex min-w-0 flex-1 items-start gap-2`,
            children: [e, d],
          })),
          (t[84] = d),
          (t[85] = e),
          (t[86] = n))
        : (n = t[86]);
      let r;
      t[87] !== i || t[88] !== V
        ? ((r = V
            ? (0, WF.jsx)(`span`, {
                className: `mt-1 flex min-w-0 items-center gap-1 text-xs leading-5 text-tertiary`,
                children: i,
              })
            : null),
          (t[87] = i),
          (t[88] = V),
          (t[89] = r))
        : (r = t[89]);
      let a;
      (t[90] !== n || t[91] !== r
        ? ((a = (0, WF.jsxs)(`span`, {
            className: `flex min-w-0 flex-1 flex-col text-default`,
            children: [n, r],
          })),
          (t[90] = n),
          (t[91] = r),
          (t[92] = a))
        : (a = t[92]),
        (h = a));
    } else if (V || d != null) {
      let e = V && `pb-0.5 group-data-[appearance=grouped]/nav-list:pb-0`,
        n;
      t[93] === e
        ? (n = t[94])
        : ((n = ng(
            `flex min-w-0 flex-1 flex-col gap-0.5 group-data-[appearance=grouped]/nav-list:gap-0`,
            e,
          )),
          (t[93] = e),
          (t[94] = n));
      let r;
      t[95] === u
        ? (r = t[96])
        : ((r = (0, WF.jsx)(`span`, { className: `text-fade-truncate flex-1`, children: u })),
          (t[95] = u),
          (t[96] = r));
      let a;
      t[97] !== d || t[98] !== r
        ? ((a = (0, WF.jsxs)(`span`, {
            className: `flex min-h-6 min-w-0 items-center gap-2 leading-6 group-data-[appearance=grouped]/nav-list:min-h-5 group-data-[appearance=grouped]/nav-list:leading-5`,
            children: [r, d],
          })),
          (t[97] = d),
          (t[98] = r),
          (t[99] = a))
        : (a = t[99]);
      let o;
      t[100] !== i || t[101] !== V || t[102] !== O
        ? ((o = V
            ? (0, WF.jsx)(`span`, {
                className: ng(
                  `min-w-0 text-xs leading-4 text-tertiary group-data-[appearance=grouped]/nav-list:text-[12px] group-data-[appearance=grouped]/nav-list:leading-4.5 group-data-[appearance=grouped]/nav-list:tracking-[-0.18px]`,
                  O
                    ? `whitespace-normal break-words`
                    : `flex h-4 items-center gap-1.5 group-data-[appearance=grouped]/nav-list:h-4.5`,
                ),
                children: i,
              })
            : null),
          (t[100] = i),
          (t[101] = V),
          (t[102] = O),
          (t[103] = o))
        : (o = t[103]);
      let s;
      (t[104] !== n || t[105] !== a || t[106] !== o
        ? ((s = (0, WF.jsxs)(`span`, { className: n, children: [a, o] })),
          (t[104] = n),
          (t[105] = a),
          (t[106] = o),
          (t[107] = s))
        : (s = t[107]),
        (h = s));
    } else {
      let e;
      (t[108] === u
        ? (e = t[109])
        : ((e = (0, WF.jsx)(`span`, { className: `text-fade-truncate`, children: u })),
          (t[108] = u),
          (t[109] = e)),
        (h = e));
    }
    let g = k && `flex-1`,
      _ = a !== void 0 && `min-h-6`,
      v = j ? f : `text-default`,
      y;
    t[110] !== g || t[111] !== _ || t[112] !== v
      ? ((y = ng(
          `flex min-w-0 items-center gap-nav-row-content text-base group-data-[appearance=grouped]/nav-list:font-normal group-data-[appearance=grouped]/nav-list:leading-5 group-data-[appearance=grouped]/nav-list:tracking-[-0.14px]`,
          g,
          _,
          v,
        )),
        (t[110] = g),
        (t[111] = _),
        (t[112] = v),
        (t[113] = y))
      : (y = t[113]);
    let b;
    t[114] !== V || t[115] !== m || t[116] !== w
      ? ((b =
          w ??
          (m == null
            ? null
            : (0, WF.jsx)(`span`, {
                className: ng(
                  `flex icon-leading-slot min-w-[var(--icon-leading-size)] shrink-0 items-center justify-center`,
                  V &&
                    `h-6 self-start group-data-[appearance=grouped]/nav-list:h-auto group-data-[appearance=grouped]/nav-list:self-auto`,
                ),
                children: m,
              }))),
        (t[114] = V),
        (t[115] = m),
        (t[116] = w),
        (t[117] = b))
      : (b = t[117]);
    let x;
    (t[118] !== h || t[119] !== y || t[120] !== b
      ? ((x = (0, WF.jsxs)(`div`, { className: y, children: [b, h] })),
        (t[118] = h),
        (t[119] = y),
        (t[120] = b),
        (t[121] = x))
      : (x = t[121]),
      (U = x),
      (te = ng(
        Oar,
        l == null
          ? ee
          : [
              `sidebar-item flex h-full min-w-0 flex-1 items-center ps-[var(--padding-row-cell-x,var(--padding-row-x))] pe-2 text-start disabled:cursor-default`,
              V && `py-row-y group-data-[appearance=grouped]/nav-list:py-1.25`,
              L && `cursor-interaction`,
            ],
      )),
      (t[30] = M),
      (t[31] = n),
      (t[32] = r),
      (t[33] = i),
      (t[34] = k),
      (t[35] = V),
      (t[36] = a),
      (t[37] = A),
      (t[38] = o),
      (t[39] = s),
      (t[40] = c),
      (t[41] = L),
      (t[42] = l),
      (t[43] = j),
      (t[44] = H),
      (t[45] = u),
      (t[46] = d),
      (t[47] = D),
      (t[48] = w),
      (t[49] = N),
      (t[50] = E),
      (t[51] = O),
      (t[52] = ee),
      (t[53] = U),
      (t[54] = te));
  } else ((ee = t[52]), (U = t[53]), (te = t[54]));
  let ne = te,
    re = l == null ? T : null,
    ie;
  t[122] !== I || t[123] !== R
    ? ((ie = I
        ? (0, WF.jsxs)(WF.Fragment, {
            children: [
              (0, WF.jsx)(`span`, {
                "aria-hidden": !0,
                className: `h-1.5 w-1.5 shrink-0 rounded-full bg-blue`,
              }),
              (0, WF.jsx)(`span`, {
                id: R,
                className: `sr-only`,
                children: (0, WF.jsx)($, {
                  id: `sidebar.navItem.unread`,
                  defaultMessage: `Unread updates`,
                  description: `Accessible description for a navigation item with unread updates`,
                }),
              }),
            ],
          })
        : null),
      (t[122] = I),
      (t[123] = R),
      (t[124] = ie))
    : (ie = t[124]);
  let ae;
  t[125] === F
    ? (ae = t[126])
    : ((ae = F ? (0, WF.jsx)(dle, { className: `text-tertiary` }) : null),
      (t[125] = F),
      (t[126] = ae));
  let oe;
  t[127] !== U || t[128] !== re || t[129] !== ie || t[130] !== ae
    ? ((oe = (0, WF.jsxs)(WF.Fragment, { children: [U, re, ie, ae] })),
      (t[127] = U),
      (t[128] = re),
      (t[129] = ie),
      (t[130] = ae),
      (t[131] = oe))
    : (oe = t[131]);
  let se = oe,
    ce;
  if (!L) {
    let e;
    (t[132] !== ne || t[133] !== se
      ? ((e = (0, WF.jsx)(`div`, { className: ne, children: se })),
        (t[132] = ne),
        (t[133] = se),
        (t[134] = e))
      : (e = t[134]),
      (ce = e));
  } else if (f.to != null) {
    let e = l == null && N === `inverse` ? `dark` : void 0,
      n = j ? `page` : void 0,
      r;
    (t[135] !== B || t[136] !== ne || t[137] !== se || t[138] !== f || t[139] !== e || t[140] !== n
      ? ((r = (0, WF.jsx)(ih, {
          className: ne,
          "data-theme": e,
          "aria-current": n,
          ...f,
          "aria-describedby": B,
          children: se,
        })),
        (t[135] = B),
        (t[136] = ne),
        (t[137] = se),
        (t[138] = f),
        (t[139] = e),
        (t[140] = n),
        (t[141] = r))
      : (r = t[141]),
      (ce = r));
  } else {
    let e = l == null && N === `inverse` ? `dark` : void 0,
      n = j ? `page` : void 0,
      r;
    (t[142] !== B ||
    t[143] !== P ||
    t[144] !== ne ||
    t[145] !== se ||
    t[146] !== f ||
    t[147] !== e ||
    t[148] !== n
      ? ((r = (0, WF.jsx)(`button`, {
          type: `button`,
          className: ne,
          "data-theme": e,
          "aria-current": n,
          disabled: P,
          ...f,
          "aria-describedby": B,
          children: se,
        })),
        (t[142] = B),
        (t[143] = P),
        (t[144] = ne),
        (t[145] = se),
        (t[146] = f),
        (t[147] = e),
        (t[148] = n),
        (t[149] = r))
      : (r = t[149]),
      (ce = r));
  }
  let le;
  return (
    t[150] !== ee || t[151] !== l || t[152] !== ce || t[153] !== N
      ? ((le =
          l == null
            ? ce
            : (0, WF.jsxs)(`div`, {
                className: ee,
                "data-theme": N === `inverse` ? `dark` : void 0,
                children: [
                  ce,
                  (0, WF.jsx)(`div`, { className: `flex items-center gap-1`, children: l }),
                ],
              })),
        (t[150] = ee),
        (t[151] = l),
        (t[152] = ce),
        (t[153] = N),
        (t[154] = le))
      : (le = t[154]),
    le
  );
}
return function NavigationItem(props){
if(props.to!=null&&props.interactive!==false&&!Link)throw Error('NavigationItem requires Link');
if(props.iconAssetSource!=null&&!ResponsiveIcon)throw Error('NavigationItem requires ResponsiveIcon');
if(props.animatedIcon!=null&&props.icon!=null&&!React.isValidElement(props.icon)&&!AnimatedIcon)throw Error('NavigationItem requires AnimatedIcon');
if(props.disclosure&&!DisclosureIcon)throw Error('NavigationItem requires DisclosureIcon');
return VF(props);
};
}
export function createNavigationList({React,mergeClasses,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,Ear=compilerRuntime,ng=mergeClasses,WF={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children),Fragment:React.Fragment};
function HF(e) {
  let t = (0, Ear.c)(8),
    { children: n, className: r, itemSpacing: i, appearance: a } = e,
    o = i === void 0 ? `default` : i,
    s = a === void 0 ? `plain` : a,
    c;
  t[0] !== s || t[1] !== r || t[2] !== o
    ? ((c = ng(
        `group/nav-list flex flex-col`,
        s === `grouped`
          ? `gap-0 overflow-hidden rounded-2xl border-hairline border-default [--height-token-row:calc(var(--spacing)*10)] [--nav-item-height:var(--height-token-row)] [--padding-row-cell-x:calc(var(--spacing)*3)] [--icon-leading-size:calc(var(--spacing)*5)] [--display-icon-compact:none] [--display-icon-leading:contents]`
          : [
              o === `rail` ? `gap-2 browser:gap-px` : `gap-px`,
              `browser:not-empty:pb-px browser:[--nav-item-height:calc(var(--height-token-row)-1px)]`,
            ],
        r,
      )),
      (t[0] = s),
      (t[1] = r),
      (t[2] = o),
      (t[3] = c))
    : (c = t[3]);
  let l;
  return (
    t[4] !== s || t[5] !== n || t[6] !== c
      ? ((l = (0, WF.jsx)(`div`, { "data-appearance": s, className: c, children: n })),
        (t[4] = s),
        (t[5] = n),
        (t[6] = c),
        (t[7] = l))
      : (l = t[7]),
    l
  );
}
return HF;
}
