// Original PJa body; host localization and recovered icon components are explicit dependencies.
export function createSearchField({React,mergeClasses:ng,icons,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,runtime={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const FJa=compilerRuntime,IJa=React,bZ=runtime,intl={formatMessage},zd=()=>intl;
const {Search16:qve,Search20:Bee,LegacySearch:SPe,ClearSearch:Pke,SidebarIcon:vZ,ResponsiveSearch:rm}=icons;
function PJa(e) {
  let t = (0, FJa.c)(57),
    {
      id: n,
      inputRef: r,
      className: i,
      autoFocus: a,
      clearLabel: o,
      disabled: s,
      inputKey: c,
      inputRole: l,
      isClearable: u,
      label: d,
      maxLength: f,
      onFocus: p,
      onKeyDown: m,
      onSearchQueryChange: h,
      placeholder: g,
      readOnly: _,
      searchQuery: v,
      trailingControl: y,
      variant: b,
    } = e,
    x = u === void 0 || u,
    S = b === void 0 ? `default` : b,
    C = zd(),
    w = (0, IJa.useRef)(null),
    T = r ?? w,
    E = S === `toolbar` || S === `toolbar-action` || S === `toolbar-compact`,
    D =
      (S === "default" || S === `settings`) &&
      `h-page-search gap-2 border border-primary-outline bg-page-search px-2.5`,
    O = S === "default" && `rounded-full`,
    k = S === `settings` && `rounded-button-toolbar`,
    A =
      E && `gap-2 rounded-full border border-primary-outline bg-transparent px-3 text-sm leading-5`,
    j = S === `toolbar` && `h-9`,
    M = S === `toolbar-action` && `h-token-button-composer`,
    N = S === `toolbar-compact` && `h-8 browser:h-9`,
    P =
      S === `sidebar` &&
      `sidebar-item h-[var(--height-token-row)] bg-background-secondary-soft-alpha pe-[var(--padding-row-cell-x,var(--padding-row-x))]`,
    F =
      S === `sidebar-header` &&
      `h-9 shrink-0 gap-2 rounded-full bg-background-secondary-soft-alpha px-3`,
    I = S === `catalog` && `h-14 gap-3 rounded-xl border border-primary-outline bg-surface px-5`,
    L =
      S === `catalog-filter` &&
      `h-12 gap-3 rounded-xl border border-primary-outline bg-surface-secondary px-4`,
    R;
  t[0] !== i ||
  t[1] !== P ||
  t[2] !== F ||
  t[3] !== I ||
  t[4] !== L ||
  t[5] !== D ||
  t[6] !== O ||
  t[7] !== k ||
  t[8] !== A ||
  t[9] !== j ||
  t[10] !== M ||
  t[11] !== N
    ? ((R = ng(
        `no-drag flex items-center py-0 text-base leading-[18px]`,
        D,
        O,
        k,
        A,
        j,
        M,
        N,
        P,
        F,
        I,
        L,
        i,
      )),
      (t[0] = i),
      (t[1] = P),
      (t[2] = F),
      (t[3] = I),
      (t[4] = L),
      (t[5] = D),
      (t[6] = O),
      (t[7] = k),
      (t[8] = A),
      (t[9] = j),
      (t[10] = M),
      (t[11] = N),
      (t[12] = R))
    : (R = t[12]);
  let z = S === `sidebar-header` || void 0,
    B;
  t[13] !== E || t[14] !== S
    ? ((B =
        S === `sidebar`
          ? (0, bZ.jsx)(vZ, { icon: (0, bZ.jsx)(SPe, { className: `icon-sm text-secondary` }) })
          : (0, bZ.jsxs)(`span`, {
              className: `flex shrink-0 items-center justify-center`,
              children: [
                E && (0, bZ.jsx)(rm, { icon: { 16: qve, 20: Bee }, className: `text-secondary` }),
                !E &&
                  (S === `sidebar-header`
                    ? (0, bZ.jsx)(qve, { className: `text-secondary` })
                    : (0, bZ.jsx)(SPe, { className: `icon-sm text-secondary` })),
              ],
            })),
      (t[13] = E),
      (t[14] = S),
      (t[15] = B))
    : (B = t[15]);
  let V;
  t[16] !== n || t[17] !== d
    ? ((V = (0, bZ.jsx)(`label`, { className: `sr-only`, htmlFor: n, children: d })),
      (t[16] = n),
      (t[17] = d),
      (t[18] = V))
    : (V = t[18]);
  let H = E ? `text-sm leading-5` : `text-base leading-[18px]`,
    ee;
  t[19] === H
    ? (ee = t[20])
    : ((ee = ng(
        `min-w-0 flex-1 bg-transparent text-default outline-none select-text placeholder:text-tertiary [&::placeholder]:select-none`,
        H,
      )),
      (t[19] = H),
      (t[20] = ee));
  let U;
  t[21] === h
    ? (U = t[22])
    : ((U = (e) => {
        h(e.target.value);
      }),
      (t[21] = h),
      (t[22] = U));
  let te;
  t[23] !== a ||
  t[24] !== s ||
  t[25] !== n ||
  t[26] !== c ||
  t[27] !== l ||
  t[28] !== f ||
  t[29] !== p ||
  t[30] !== m ||
  t[31] !== g ||
  t[32] !== _ ||
  t[33] !== T ||
  t[34] !== v ||
  t[35] !== ee ||
  t[36] !== U
    ? ((te = (0, bZ.jsx)(
        `input`,
        {
          autoFocus: a,
          id: n,
          ref: T,
          className: ee,
          autoComplete: `off`,
          disabled: s,
          maxLength: f,
          readOnly: _,
          role: l,
          type: `text`,
          value: v,
          onChange: U,
          onFocus: p,
          onKeyDown: m,
          placeholder: g,
        },
        c,
      )),
      (t[23] = a),
      (t[24] = s),
      (t[25] = n),
      (t[26] = c),
      (t[27] = l),
      (t[28] = f),
      (t[29] = p),
      (t[30] = m),
      (t[31] = g),
      (t[32] = _),
      (t[33] = T),
      (t[34] = v),
      (t[35] = ee),
      (t[36] = U),
      (t[37] = te))
    : (te = t[37]);
  let ne;
  t[38] !== o ||
  t[39] !== s ||
  t[40] !== C ||
  t[41] !== x ||
  t[42] !== h ||
  t[43] !== T ||
  t[44] !== v ||
  t[45] !== S
    ? ((ne =
        x && v.length > 0
          ? (0, bZ.jsx)(`button`, {
              disabled: s,
              "aria-label":
                o ??
                C.formatMessage({
                  id: `skills.pageSearchInput.clear`,
                  defaultMessage: `Clear search`,
                  description: `Accessible label for clearing a search field`,
                }),
              className: ng(
                `flex shrink-0 cursor-interaction items-center justify-center text-secondary hover:text-default`,
                S === `sidebar` && `size-6`,
              ),
              type: `button`,
              onClick: () => {
                (T.current?.focus(), h(``));
              },
              children: (0, bZ.jsx)(Pke, {}),
            })
          : null),
      (t[38] = o),
      (t[39] = s),
      (t[40] = C),
      (t[41] = x),
      (t[42] = h),
      (t[43] = T),
      (t[44] = v),
      (t[45] = S),
      (t[46] = ne))
    : (ne = t[46]);
  let re;
  t[47] === y
    ? (re = t[48])
    : ((re =
        y == null
          ? null
          : (0, bZ.jsx)(`div`, { className: `flex shrink-0 items-center`, children: y })),
      (t[47] = y),
      (t[48] = re));
  let ie;
  return (
    t[49] !== R ||
    t[50] !== z ||
    t[51] !== B ||
    t[52] !== V ||
    t[53] !== te ||
    t[54] !== ne ||
    t[55] !== re
      ? ((ie = (0, bZ.jsxs)(`div`, {
          className: R,
          "data-sidebar-header-search": z,
          children: [B, V, te, ne, re],
        })),
        (t[49] = R),
        (t[50] = z),
        (t[51] = B),
        (t[52] = V),
        (t[53] = te),
        (t[54] = ne),
        (t[55] = re),
        (t[56] = ie))
      : (ie = t[56]),
    ie
  );
}
return PJa;
}
