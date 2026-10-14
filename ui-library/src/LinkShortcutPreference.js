// Original browser-link shortcut preference; persistence and localization supplied by caller.
export function createLinkShortcutPreference({React,settings,menu,Button:s,AssetIcon,usePreferenceStore,saveShortcut,formatMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!settings?.SettingsControlRow||!menu?.Dropdown||!AssetIcon?.fromPreset||typeof usePreferenceStore!=='function'||typeof saveShortcut!=='function'||typeof formatMessage!=='function')throw new TypeError('Link shortcut preference requires original surfaces, localization and promise persistence adapters');
const h=React.createElement,Z={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Mt=compilerRuntime,Nt=React,e=fn=>fn,F=()=>{},ge=x=>x,R=m=>formatMessage(m,m.values),j=settings.SettingsControlRow,u=menu.Dropdown,L={RadioGroup:menu.MenuRadioGroup,RadioItem:menu.MenuRadioItem};
const d=Symbol('local preference store'),he={externalBrowserLinkShortcut:Symbol('externalBrowserLinkShortcut')},l=()=>usePreferenceStore(),ye=(store,_setting,value)=>saveShortcut(store,value),ae=['unassigned','primary','alt','primary-shift'];
let X;
function At() {
  return (At = e(() => {
    (F(),
      (X = ge({
        title: {
          id: `settings.keyboardShortcuts.externalBrowserLinkShortcut.title`,
          defaultMessage: `Open web link in default browser`,
          description: `Title of the modifier-click shortcut setting for opening a web link in the operating system's default browser`,
        },
        description: {
          id: `settings.keyboardShortcuts.externalBrowserLinkShortcut.description`,
          defaultMessage: `Hold the assigned keys while clicking a web link to open it in your default system browser`,
          description: `Explanation of the shortcut that opens web links in the operating system's default browser when the selected keyboard modifiers are held while clicking`,
        },
        unassigned: {
          id: `settings.keyboardShortcuts.externalBrowserLinkShortcut.unassigned`,
          defaultMessage: `Unassigned`,
          description: `Option for not assigning a modifier-click shortcut to open web links in the system browser`,
        },
        primary: {
          id: `settings.keyboardShortcuts.externalBrowserLinkShortcut.primary`,
          defaultMessage: `{platform, select, macOS {⌘+Click} other {Ctrl+Click}}`,
          description: `Option for opening web links in the system browser by holding Command on macOS or Control on Windows and Linux while clicking`,
        },
        alt: {
          id: `settings.keyboardShortcuts.externalBrowserLinkShortcut.alt`,
          defaultMessage: `{platform, select, macOS {⌥+Click} other {Alt+Click}}`,
          description: `Option for opening web links in the system browser by holding Option on macOS or Alt on Windows and Linux while clicking`,
        },
        "primary-shift": {
          id: `settings.keyboardShortcuts.externalBrowserLinkShortcut.primaryShift`,
          defaultMessage: `{platform, select, macOS {⇧⌘+Click} other {Ctrl+Shift+Click}}`,
          description: `Option for opening web links in the system browser by holding Command and Shift on macOS or Control and Shift on Windows and Linux while clicking`,
        },
      })));
  }))();
}
At();
const O=(()=>{const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let t8n;
function n8n() {
  return (n8n = t(() => {
    (Q(),
      (t8n = Z({
        name: `chevron-down-md-light-12`,
        canvas: {
          width: 12,
          height: 12,
          viewBox: `0 0 12 12`,
          frame: { x: 0, y: 0, width: 12, height: 12 },
          inkBounds: { x: 2.599609, y: 4.599609, width: 6.800781, height: 3.697266 },
          visualBounds: { x: 2.599609, y: 4.599609, width: 6.800781, height: 3.697266 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 2.599609, y: 4.599609, width: 6.800781, height: 3.697266 },
          center: { x: 5.999999, y: 6.448242 },
          insets: { top: 4.599609, right: 2.59961, bottom: 3.703125, left: 2.599609 },
          anchors: {
            frame: { x: 6, y: 6 },
            ink: { x: 5.999999, y: 6.448242 },
            foreground: { x: 5.999999, y: 6.448242 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M8.71677 4.71677C8.87298 4.56056 9.12696 4.56056 9.28317 4.71677C9.43938 4.87298 9.43938 5.12696 9.28317 5.28317L6.45993 8.10642C6.20609 8.36023 5.79384 8.36023 5.54001 8.10642L2.71677 5.28317C2.56056 5.12696 2.56056 4.87298 2.71677 4.71677C2.87298 4.56056 3.12696 4.56056 3.28317 4.71677L5.99997 7.43356L8.71677 4.71677Z" fill="currentColor"/>`,
      })));
  }))();
}
n8n();return AssetIcon.fromPreset(t8n);})();
function jt(e) {
  let t = (0, Mt.c)(15),
    { platform: n, shortcut: r } = e,
    i = l(d),
    a = (0, Nt.useId)(),
    [o, c] = (0, Nt.useState)(!1),
    [f, p] = (0, Nt.useState)(!1),
    m,
    h;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = (0, Z.jsx)(R, { ...X.title })),
      (h = (0, Z.jsx)(R, { ...X.description })),
      (t[0] = m),
      (t[1] = h))
    : ((m = t[0]), (h = t[1]));
  let g;
  t[2] === f
    ? (g = t[3])
    : ((g = f
        ? (0, Z.jsx)(`span`, {
            className: `block text-danger`,
            role: `alert`,
            children: (0, Z.jsx)(R, {
              id: `settings.keyboardShortcuts.externalBrowserLinkShortcut.error`,
              defaultMessage: `Could not save shortcut preference`,
              description: `Error when saving the modifier-click shortcut for opening web links in the system browser fails`,
            }),
          })
        : null),
      (t[2] = f),
      (t[3] = g));
  let _;
  t[4] === g
    ? (_ = t[5])
    : ((_ = (0, Z.jsxs)(Z.Fragment, { children: [h, g] })), (t[4] = g), (t[5] = _));
  let v;
  t[6] !== n || t[7] !== o || t[8] !== i || t[9] !== r || t[10] !== a
    ? ((v = (e) =>
        (0, Z.jsx)(`div`, {
          className: `flex w-96 max-w-full @max-xl/keyboard-shortcuts:w-full`,
          children: (0, Z.jsx)(u, {
            align: `end`,
            triggerButton: (0, Z.jsxs)(s, {
              ...e,
              className: `-ms-[calc(var(--spacing-button-toolbar-inline)+1px)]`,
              "aria-labelledby": [e[`aria-labelledby`], a].join(` `),
              color: `ghostSecondary`,
              disabled: o,
              radius: `large`,
              size: `toolbar`,
              children: [
                (0, Z.jsx)(`span`, {
                  id: a,
                  children: (0, Z.jsx)(R, { ...X[r], values: { platform: n } }),
                }),
                (0, Z.jsx)(O, { className: `text-tertiary` }),
              ],
            }),
            children: (0, Z.jsx)(L.RadioGroup, {
              value: r,
              children: ae.map((e) =>
                (0, Z.jsx)(
                  L.RadioItem,
                  {
                    value: e,
                    onSelect: () => {
                      e !== r &&
                        (c(!0),
                        p(!1),
                        ye(i, he.externalBrowserLinkShortcut, e)
                          .catch(() => p(!0))
                          .finally(() => c(!1)));
                    },
                    children: (0, Z.jsx)(R, { ...X[e], values: { platform: n } }),
                  },
                  e,
                ),
              ),
            }),
          }),
        })),
      (t[6] = n),
      (t[7] = o),
      (t[8] = i),
      (t[9] = r),
      (t[10] = a),
      (t[11] = v))
    : (v = t[11]);
  let y;
  return (
    t[12] !== _ || t[13] !== v
      ? ((y = (0, Z.jsx)(j, {
          className: `select-none @max-xl/keyboard-shortcuts:flex-col @max-xl/keyboard-shortcuts:items-stretch @max-xl/keyboard-shortcuts:gap-2`,
          label: m,
          description: _,
          control: v,
        })),
        (t[12] = _),
        (t[13] = v),
        (t[14] = y))
      : (y = t[14]),
    y
  );
}
return {LinkShortcutPreference:jt,linkShortcutMessages:X};
}
