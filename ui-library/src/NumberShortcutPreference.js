// Original number shortcut preference; runtime keymap/store are explicit caller boundaries.
export function createNumberShortcutPreference({React,settings,menu,DropdownButton:Ne,useStateSnapshot,saveTarget,hasNumberConflicts:rt,formatMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!settings?.SettingsControlRow||!menu?.Dropdown||!Ne||typeof useStateSnapshot!=='function'||typeof saveTarget!=='function'||typeof rt!=='function'||typeof formatMessage!=='function')throw new TypeError('Number preference requires original surfaces and snapshot/save/conflict/locale adapters');
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const Rt=compilerRuntime,zt=React,Q=runtime,e=fn=>fn,F=()=>{},ge=x=>x,R=m=>formatMessage(m,m.values),j=settings.SettingsControlRow,u=menu.Dropdown,L={RadioGroup:menu.MenuRadioGroup,RadioItem:menu.MenuRadioItem};
const d=Symbol('store'),Ye=Symbol('keymap'),he={primaryNumberShortcutTarget:Symbol('primaryNumberShortcutTarget')},l=()=>useStateSnapshot().store,pe=()=>({platform:useStateSnapshot().platform}),de=()=>useStateSnapshot().target,o=()=>({data:useStateSnapshot().keymapState}),ye=(store,_setting,value)=>saveTarget(store,value);
let Ft;
function It() {
  return (It = e(() => {
    (F(),
      (Ft = ge({
        title: {
          id: `settings.keyboardShortcuts.numberTarget.title`,
          defaultMessage: `Number shortcuts`,
          description: `Label for the setting that swaps number-key shortcuts between chats and tabs`,
        },
        sidebar: {
          id: `settings.keyboardShortcuts.numberTarget.sidebarWithShortcut`,
          defaultMessage: `{primary}1-9 for Chats`,
          description: `Option for using primary number shortcuts to select chats in the sidebar; primary is the Command symbol on macOS or Ctrl+ elsewhere`,
        },
        tabs: {
          id: `settings.keyboardShortcuts.numberTarget.tabsWithShortcut`,
          defaultMessage: `{primary}1-9 for Tabs`,
          description: `Option for using primary number shortcuts to select tabs in the current chat; primary is the Command symbol on macOS or Ctrl+ elsewhere`,
        },
        chatsPrimary: {
          id: `settings.keyboardShortcuts.numberTarget.chatsPrimary`,
          defaultMessage: `Use {primary}1–9 to switch chats and {secondary}1–9 to switch tabs`,
          description: `Explanation when primary number shortcuts select sidebar chats; primary is Command on macOS or Control elsewhere, secondary is Control on macOS or Alt elsewhere`,
        },
        tabsPrimary: {
          id: `settings.keyboardShortcuts.numberTarget.tabsPrimary`,
          defaultMessage: `Use {primary}1–9 to switch tabs and {secondary}1–9 to switch chats`,
          description: `Explanation when primary number shortcuts select tabs in the current chat; primary is Command on macOS or Control elsewhere, secondary is Control on macOS or Alt elsewhere`,
        },
      })));
  }))();
}
It();
function Lt() {
  let e = (0, Rt.c)(25),
    t = l(d),
    { platform: n } = pe(),
    r = n === `macOS` ? `⌘` : `Ctrl+`,
    i = de(he.primaryNumberShortcutTarget),
    { data: a } = o(Ye),
    [s, c] = (0, zt.useState)(!1),
    [f, p] = (0, zt.useState)(!1),
    m;
  e[0] !== a || e[1] !== n || e[2] !== i
    ? ((m =
        a != null &&
        rt({ keymapState: { ...a, primaryNumberShortcutTarget: i }, isMacOS: n === `macOS` })),
      (e[0] = a),
      (e[1] = n),
      (e[2] = i),
      (e[3] = m))
    : (m = e[3]);
  let h = m,
    g;
  e[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, Q.jsx)(R, { ...Ft.title })), (e[4] = g))
    : (g = e[4]);
  let _;
  e[5] === f
    ? (_ = e[6])
    : ((_ = f
        ? (0, Q.jsx)(`span`, {
            className: `block text-danger`,
            role: `alert`,
            children: (0, Q.jsx)(R, {
              id: `settings.keyboardShortcuts.numberTarget.error`,
              defaultMessage: `Could not save shortcut preference`,
              description: `Error when saving the numbered navigation shortcut preference fails`,
            }),
          })
        : null),
      (e[5] = f),
      (e[6] = _));
  let v;
  e[7] !== n || e[8] !== r || e[9] !== i
    ? ((v =
        i === `sidebar`
          ? (0, Q.jsx)(R, {
              ...Ft.chatsPrimary,
              values: { primary: r, secondary: n === `macOS` ? `⌃` : `Alt+` },
            })
          : (0, Q.jsx)(R, {
              ...Ft.tabsPrimary,
              values: { primary: r, secondary: n === `macOS` ? `⌃` : `Alt+` },
            })),
      (e[7] = n),
      (e[8] = r),
      (e[9] = i),
      (e[10] = v))
    : (v = e[10]);
  let y;
  e[11] === h
    ? (y = e[12])
    : ((y = h
        ? (0, Q.jsx)(`span`, {
            className: `block`,
            children: (0, Q.jsx)(R, {
              id: `settings.keyboardShortcuts.numberTarget.conflict`,
              defaultMessage: `Some number shortcuts are already assigned to other actions`,
              description: `Notice shown only when existing custom shortcuts override one or more chat or tab number shortcuts in the selected layout`,
            }),
          })
        : null),
      (e[11] = h),
      (e[12] = y));
  let b;
  e[13] !== _ || e[14] !== v || e[15] !== y
    ? ((b = (0, Q.jsxs)(Q.Fragment, { children: [_, v, ` `, y] })),
      (e[13] = _),
      (e[14] = v),
      (e[15] = y),
      (e[16] = b))
    : (b = e[16]);
  let x;
  e[17] !== r || e[18] !== s || e[19] !== t || e[20] !== i
    ? ((x = (e) =>
        (0, Q.jsx)(u, {
          align: `end`,
          triggerButton: (0, Q.jsx)(Ne, {
            ...e,
            disabled: s,
            children: (0, Q.jsx)(R, { ...Ft[i], values: { primary: r } }),
          }),
          children: (0, Q.jsx)(L.RadioGroup, {
            value: i,
            children: [`tabs`, `sidebar`].map((e) =>
              (0, Q.jsx)(
                L.RadioItem,
                {
                  value: e,
                  onSelect: () => {
                    (c(!0),
                      p(!1),
                      ye(t, he.primaryNumberShortcutTarget, e)
                        .catch(() => p(!0))
                        .finally(() => c(!1)));
                  },
                  children: (0, Q.jsx)(R, { ...Ft[e], values: { primary: r } }),
                },
                e,
              ),
            ),
          }),
        })),
      (e[17] = r),
      (e[18] = s),
      (e[19] = t),
      (e[20] = i),
      (e[21] = x))
    : (x = e[21]);
  let S;
  return (
    e[22] !== b || e[23] !== x
      ? ((S = (0, Q.jsx)(j, { label: g, description: b, control: x })),
        (e[22] = b),
        (e[23] = x),
        (e[24] = S))
      : (S = e[24]),
    S
  );
}
return {NumberShortcutPreference:Lt,numberShortcutMessages:Ft};
}
