// Original settings search input; caller owns application shortcut registration.
export function createSettingsSearchField({React,SearchField:st,useAccelerator:Ut,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!st||typeof Ut!=='function')throw new TypeError('Settings search requires SearchField and shortcut hook');
const Jr=compilerRuntime,Xr=React,intl={formatMessage},ye=()=>intl,h=React.createElement,Q={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key})};
function Ur(e) {
  let t = (0, Jr.c)(14),
    { onKeyDown: n, searchQuery: r, onQueryChange: i } = e,
    a = ye(),
    o = (0, Xr.useRef)(null),
    s;
  (t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = {
        accelerator: `CmdOrCtrl+F`,
        onKeyDown: (e) => {
          (e.preventDefault(), o.current?.focus(), o.current?.select());
        },
      }),
      (t[0] = s))
    : (s = t[0]),
    Ut(s));
  let c;
  t[1] === a
    ? (c = t[2])
    : ((c = a.formatMessage({
        id: `settings.search.clear`,
        defaultMessage: `Clear settings search`,
        description: `Button label to clear settings search input`,
      })),
      (t[1] = a),
      (t[2] = c));
  let l;
  t[3] === a
    ? (l = t[4])
    : ((l = a.formatMessage({
        id: `settings.search.label`,
        defaultMessage: `Search settings`,
        description: `Accessible label for the settings search input`,
      })),
      (t[3] = a),
      (t[4] = l));
  let u;
  t[5] === a
    ? (u = t[6])
    : ((u = a.formatMessage({
        id: `settings.search.placeholder`,
        defaultMessage: `Search`,
        description: `Placeholder text for the settings search input`,
      })),
      (t[5] = a),
      (t[6] = u));
  let d;
  return (
    t[7] !== n || t[8] !== i || t[9] !== r || t[10] !== c || t[11] !== l || t[12] !== u
      ? ((d = (0, Q.jsx)(st, {
          id: `settings-search`,
          className: `min-w-0 flex-1`,
          inputRef: o,
          autoFocus: !0,
          clearLabel: c,
          label: l,
          onKeyDown: n,
          onSearchQueryChange: i,
          placeholder: u,
          inputRole: `searchbox`,
          searchQuery: r,
          variant: `sidebar-header`,
        })),
        (t[7] = n),
        (t[8] = i),
        (t[9] = r),
        (t[10] = c),
        (t[11] = l),
        (t[12] = u),
        (t[13] = d))
      : (d = t[13]),
    d
  );
}
return Ur;
}
