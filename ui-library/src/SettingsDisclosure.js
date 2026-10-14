// Original controlled disclosure and dictation shortcut advanced group.
export function createSettingsDisclosure({React,settings,Button:s,AssetIcon,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!settings?.SettingsControlRow||!s||!AssetIcon?.fromPreset)throw new TypeError('SettingsDisclosure requires original settings, Button and AssetIcon');
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const o=compilerRuntime,Dt=compilerRuntime,Ot=React,Y=runtime,t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false}),R=m=>formatMessage(m);
let aVi,oVi,r8n,_8n;
function sVi() {
  return (sVi = t(() => {
    ((aVi = `flex flex-col [&>*:not(:last-child)]:relative [&>*:not(:last-child)]:after:pointer-events-none [&>*:not(:last-child)]:after:absolute [&>*:not(:last-child)]:after:inset-x-4 [&>*:not(:last-child)]:after:bottom-0 [&>*:not(:last-child)]:after:h-px [&>*:not(:last-child)]:after:bg-border [&>*:not(:last-child)]:after:content-['']`),
      (oVi = `flex flex-col [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border`));
  }))();
}
function i8n() {
  return (i8n = t(() => {
    (Q(),
      (r8n = Z({
        name: `chevron-down-md-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 3.475098, y: 6.141602, width: 9.049805, height: 4.911621 },
          visualBounds: { x: 3.475098, y: 6.141602, width: 9.049805, height: 4.911621 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 3.475098, y: 6.141602, width: 9.049805, height: 4.911621 },
          center: { x: 8, y: 8.597413 },
          insets: { top: 6.141602, right: 3.475097, bottom: 4.946777, left: 3.475098 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 8, y: 8.597413 },
            foreground: { x: 8, y: 8.597413 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M11.6289 6.29537C11.8339 6.09035 12.166 6.09035 12.3711 6.29537C12.5761 6.5004 12.5761 6.83253 12.3711 7.03756L8.60641 10.8022C8.27129 11.1369 7.72863 11.1369 7.39352 10.8022L3.62887 7.03756C3.42384 6.83253 3.42384 6.5004 3.62887 6.29537C3.83389 6.09035 4.16603 6.09035 4.37105 6.29537L7.99996 9.92428L11.6289 6.29537Z" fill="currentColor"/>`,
      })));
  }))();
}
function v8n() {
  return (v8n = t(() => {
    (Q(),
      (_8n = Z({
        name: `chevron-right-md-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 5.808594, y: 3.475098, width: 4.911621, height: 9.049805 },
          visualBounds: { x: 5.808594, y: 3.475098, width: 4.911621, height: 9.049805 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 5.808594, y: 3.475098, width: 4.911621, height: 9.049805 },
          center: { x: 8.264405, y: 8 },
          insets: { top: 3.475098, right: 5.279785, bottom: 3.475097, left: 5.808594 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 8.264405, y: 8 },
            foreground: { x: 8.264405, y: 8 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M5.96236 11.6289C5.75734 11.8339 5.75734 12.166 5.96236 12.3711C6.16739 12.5761 6.49953 12.5761 6.70455 12.3711L10.4692 8.60641C10.8039 8.27129 10.8039 7.72863 10.4692 7.39351L6.70455 3.62887C6.49952 3.42384 6.16739 3.42384 5.96236 3.62887C5.75734 3.83389 5.75734 4.16603 5.96236 4.37105L9.59127 7.99996L5.96236 11.6289Z" fill="currentColor"/>`,
      })));
  }))();
}
sVi();i8n();v8n();
const r=aVi,we=AssetIcon.fromPreset(r8n),chevronRight=AssetIcon.fromPreset(_8n),{SettingsControlRow:j,SettingsPanel:fe,SettingsGroup:it}=settings;
// Keep distinct original module aliases inside their own scopes.
const Tt=(()=>{const s=runtime;
function a(e) {
  let t = (0, o.c)(7),
    { children: n, content: i, contentId: a, expanded: c } = e,
    l;
  t[0] !== i || t[1] !== a || t[2] !== c
    ? ((l = c ? (0, s.jsx)(`div`, { id: a, className: r, children: i }) : null),
      (t[0] = i),
      (t[1] = a),
      (t[2] = c),
      (t[3] = l))
    : (l = t[3]);
  let u;
  return (
    t[4] !== n || t[5] !== l
      ? ((u = (0, s.jsxs)(`div`, { className: r, children: [n, l] })),
        (t[4] = n),
        (t[5] = l),
        (t[6] = u))
      : (u = t[6]),
    u
  );
}
return a;})();
const AdvancedShortcutGroup=(()=>{const h=chevronRight;
function Et(e) {
  let t = (0, Dt.c)(12),
    { shortcut: n, singleTapShortcut: r, searching: i } = e,
    [a, o] = (0, Ot.useState)(!1),
    c = (0, Ot.useId)(),
    l = i ? r : null,
    u;
  t[0] !== c || t[1] !== a || t[2] !== i || t[3] !== r
    ? ((u =
        r != null && !i
          ? (0, Y.jsx)(Tt, {
              content: r,
              contentId: c,
              expanded: a,
              children: (0, Y.jsx)(j, {
                control: null,
                size: `compact`,
                label: (0, Y.jsxs)(s, {
                  "aria-controls": c,
                  "aria-expanded": a,
                  color: `ghostTertiary`,
                  radius: `small`,
                  size: `inline`,
                  onClick: () => o(!a),
                  children: [
                    a ? (0, Y.jsx)(we, {}) : (0, Y.jsx)(h, {}),
                    (0, Y.jsx)(R, {
                      id: `settings.keyboardShortcuts.dictation.advanced`,
                      defaultMessage: `Advanced`,
                      description: `Expands the optional single-tap dictation shortcut in keyboard shortcut settings`,
                    }),
                  ],
                }),
              }),
            })
          : null),
      (t[0] = c),
      (t[1] = a),
      (t[2] = i),
      (t[3] = r),
      (t[4] = u))
    : (u = t[4]);
  let d;
  t[5] !== n || t[6] !== l || t[7] !== u
    ? ((d = (0, Y.jsxs)(fe, { children: [n, l, u] })),
      (t[5] = n),
      (t[6] = l),
      (t[7] = u),
      (t[8] = d))
    : (d = t[8]);
  let f;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = (0, Y.jsx)(it.Footer, {
        children: (0, Y.jsx)(R, {
          id: `settings.keyboardShortcuts.dictation.hint`,
          defaultMessage: `Works in any app. Press Esc to cancel a recording.`,
          description: `Explains that the dictation shortcuts work system-wide and Escape cancels recording`,
        }),
      })),
      (t[9] = f))
    : (f = t[9]);
  let p;
  return (
    t[10] === d
      ? (p = t[11])
      : ((p = (0, Y.jsxs)(it, { className: `select-none`, children: [d, f] })),
        (t[10] = d),
        (t[11] = p)),
    p
  );
}
return Et;})();
return {SettingsRowDisclosure:Tt,AdvancedShortcutGroup};
}
