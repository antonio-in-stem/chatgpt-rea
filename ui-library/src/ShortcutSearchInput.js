// Original shortcut search wrapper; capture handler supplied by the caller.
export function createShortcutSearchInput({React,SearchField:o,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!o||!compilerRuntime?.c)throw new TypeError('Shortcut search requires SearchField and compiler runtime');
const h=React.createElement,runtime={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const l=compilerRuntime,u=React,d=runtime,intl={formatMessage},i=()=>intl;
function c(e) {
  let t = (0, l.c)(27),
    {
      autoFocus: n,
      ariaLabel: r,
      isSearchingByKeystrokes: a,
      placeholder: s,
      trailingContent: c,
      onKeyDown: f,
      value: p,
      onValueChange: m,
    } = e,
    h = a !== void 0 && a,
    g = (0, u.useId)(),
    _ = i(),
    v;
  t[0] !== r || t[1] !== _ || t[2] !== h
    ? ((v = h
        ? _.formatMessage({
            id: `settings.keyboardShortcuts.keystrokeSearch.ariaLabel`,
            defaultMessage: `Keystroke search capture`,
            description: `Accessible label for the input that captures keyboard shortcuts to search`,
          })
        : (r ??
          _.formatMessage({
            id: `settings.keyboardShortcuts.search.ariaLabel`,
            defaultMessage: `Search keyboard shortcuts`,
            description: `Accessible label for the keyboard shortcuts search input`,
          }))),
      (t[0] = r),
      (t[1] = _),
      (t[2] = h),
      (t[3] = v))
    : (v = t[3]);
  let y = v,
    b;
  t[4] !== _ || t[5] !== h || t[6] !== s
    ? ((b = h
        ? _.formatMessage({
            id: `settings.keyboardShortcuts.keystrokeSearch.placeholder`,
            defaultMessage: `Press shortcut to search`,
            description: `Placeholder shown while capturing a keyboard shortcut to search`,
          })
        : (s ??
          _.formatMessage({
            id: `settings.keyboardShortcuts.search.placeholder`,
            defaultMessage: `Search shortcuts`,
            description: `Placeholder for the keyboard shortcuts search input`,
          }))),
      (t[4] = _),
      (t[5] = h),
      (t[6] = s),
      (t[7] = b))
    : (b = t[7]);
  let x = b,
    S = h || void 0,
    C = h ? `keystrokes` : `text`,
    w = !h,
    T;
  t[8] !== f || t[9] !== m || t[10] !== p
    ? ((T = (e) => {
        (f?.(e),
          !e.defaultPrevented &&
            e.key === `Escape` &&
            p !== `` &&
            (e.preventDefault(), e.stopPropagation(), m(``)));
      }),
      (t[8] = f),
      (t[9] = m),
      (t[10] = p),
      (t[11] = T))
    : (T = t[11]);
  let E;
  t[12] !== n ||
  t[13] !== g ||
  t[14] !== x ||
  t[15] !== h ||
  t[16] !== y ||
  t[17] !== m ||
  t[18] !== C ||
  t[19] !== w ||
  t[20] !== T ||
  t[21] !== c ||
  t[22] !== p
    ? ((E = (0, d.jsx)(o, {
        id: g,
        autoFocus: n,
        inputKey: C,
        isClearable: w,
        label: y,
        placeholder: x,
        readOnly: h,
        searchQuery: p,
        trailingControl: c,
        onKeyDown: T,
        onSearchQueryChange: m,
      })),
      (t[12] = n),
      (t[13] = g),
      (t[14] = x),
      (t[15] = h),
      (t[16] = y),
      (t[17] = m),
      (t[18] = C),
      (t[19] = w),
      (t[20] = T),
      (t[21] = c),
      (t[22] = p),
      (t[23] = E))
    : (E = t[23]);
  let D;
  return (
    t[24] !== S || t[25] !== E
      ? ((D = (0, d.jsx)(`div`, { "data-codex-shortcut-capture": S, children: E })),
        (t[24] = S),
        (t[25] = E),
        (t[26] = D))
      : (D = t[26]),
    D
  );
}
return c;
}
