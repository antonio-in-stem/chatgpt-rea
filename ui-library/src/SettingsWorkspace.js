// Original settings workspace composition and new-tab action. Layout slots and host services are explicit dependencies.
export function createSettingsWorkspace({React,useWorkspace,useBrowserCapability,useNewTabEnabled,NavigationContext:Lni,slots:kG,WorkspaceShell:sDs,ContentBoundary:iDi,WorkspaceRegistration:CDs,WorkspaceTabs:yDs,workspace:AMs,TabFallback:_Ms,TabActionContainer:bMs,TabButton:DDs,PlusIcon:Jl,Tooltip:Pn,dispatchCommand:Mw,openNewTab:Jfa,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
for(const [name,value] of Object.entries({useWorkspace,useBrowserCapability,useNewTabEnabled,dispatchCommand:Mw,openNewTab:Jfa}))if(typeof value!=='function')throw new TypeError(name+' adapter required');
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},IMs=compilerRuntime,NMs=compilerRuntime,DMs=compilerRuntime,LMs=React,E6=runtime,T6=runtime,OMs=runtime,ws=Symbol('workspace'),Bo=Symbol('browser-capability'),wS=Symbol('new-tab-enabled'),Di=()=>useWorkspace(),Zs=(_selector,options)=>useBrowserCapability(options),G=()=>useNewTabEnabled(),intl={formatMessage},zd=()=>intl;
function FMs(e) {
  let t = (0, IMs.c)(22),
    { children: n, legacyContentRef: r, requestNavigation: i, sidebar: a } = e,
    o = Di(ws),
    s = (0, LMs.useContext)(Lni),
    c = i ?? s,
    l;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((l = (0, E6.jsx)(E6.Fragment, {
        children: (0, E6.jsx)(kG.MainContentLayout, { layout: `full-bleed` }),
      })),
      (t[9] = l))
    : (l = t[9]);
  let u;
  t[10] === o.value.persistentWorkspace?.key
    ? (u = t[11])
    : ((u = o.value.persistentWorkspace?.key === `/settings` ? (0, E6.jsx)(MMs, {}) : null),
      (t[10] = o.value.persistentWorkspace?.key),
      (t[11] = u));
  let d;
  t[12] !== n || t[13] !== r
    ? ((d = (0, E6.jsx)(iDi, {
        ref: r,
        className: `relative isolate flex h-full min-h-0 min-w-0 flex-col overflow-visible`,
        "data-codex-history-swipe-page": !0,
        children: n,
      })),
      (t[12] = n),
      (t[13] = r),
      (t[14] = d))
    : (d = t[14]);
  let f;
  t[15] !== a || t[16] !== u || t[17] !== d
    ? ((f = (0, E6.jsxs)(sDs, { contextualNavigation: a, children: [null, l, u, d] })),
      (t[15] = a),
      (t[16] = u),
      (t[17] = d),
      (t[18] = f))
    : (f = t[18]);
  let p;
  return (
    t[19] !== c || t[20] !== f
      ? ((p = (0, E6.jsx)(Lni, { value: c, children: f })), (t[19] = c), (t[20] = f), (t[21] = p))
      : (p = t[21]),
    p
  );
}
function MMs() {
  let e = (0, NMs.c)(4),
    t,
    n;
  e[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((t = (0, T6.jsx)(CDs, { workspace: AMs })),
      (n = (0, T6.jsx)(yDs, {})),
      (e[0] = t),
      (e[1] = n))
    : ((t = e[0]), (n = e[1]));
  let r;
  e[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((r = (0, T6.jsx)(kG.RightPanelTabListAfterSticky, { children: (0, T6.jsx)(EMs, {}) })),
      (e[2] = r))
    : (r = e[2]);
  let i;
  return (
    e[3] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((i = (0, T6.jsxs)(T6.Fragment, {
          children: [
            t,
            n,
            r,
            (0, T6.jsx)(kG.RightPanelOutlet, { children: (0, T6.jsx)(kG.RightPanelTabs, {}) }),
          ],
        })),
        (e[3] = i))
      : (i = e[3]),
    i
  );
}
function EMs(e) {
  let t = (0, DMs.c)(15),
    { menuTitle: n } = e,
    r = Di(ws),
    i = zd(),
    a;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((a = { name: `browser.in-app` }), (t[0] = a))
    : (a = t[0]);
  let o = Zs(Bo, a).isCapable,
    s = G(wS),
    c;
  t[1] === i
    ? (c = t[2])
    : ((c = i.formatMessage({
        id: `thread.sidePanel.openNewTab`,
        defaultMessage: `New tab`,
        description: `Button label for opening the unified New Tab page`,
      })),
      (t[1] = i),
      (t[2] = c));
  let l = c;
  if (r.value.routeKind === `other` && r.value.persistentWorkspace == null) return null;
  if (!o && !s) {
    let e = n ?? l,
      r;
    return (
      t[3] === e
        ? (r = t[4])
        : ((r = (0, OMs.jsx)(_Ms, { showWhenEmpty: !0, target: `right`, title: e })),
          (t[3] = e),
          (t[4] = r)),
      r
    );
  }
  let u = n ?? l,
    d;
  t[5] !== o || t[6] !== r
    ? ((d = () => {
        o ? Mw(`openBrowserTab`, `side_panel_menu`) : Jfa(r, { initiator: `side_panel_menu` });
      }),
      (t[5] = o),
      (t[6] = r),
      (t[7] = d))
    : (d = t[7]);
  let f;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((f = (0, OMs.jsx)(Jl, {})), (t[8] = f))
    : (f = t[8]);
  let p;
  t[9] !== l || t[10] !== d
    ? ((p = (0, OMs.jsx)(bMs, {
        children: (0, OMs.jsx)(DDs, {
          "aria-label": l,
          color: `ghost`,
          uniform: !0,
          onClick: d,
          children: f,
        }),
      })),
      (t[9] = l),
      (t[10] = d),
      (t[11] = p))
    : (p = t[11]);
  let m;
  return (
    t[12] !== u || t[13] !== p
      ? ((m = (0, OMs.jsx)(Pn, { tooltipContent: u, delayOpen: !0, children: p })),
        (t[12] = u),
        (t[13] = p),
        (t[14] = m))
      : (m = t[14]),
    m
  );
}
return {SettingsWorkspace:FMs,SettingsWorkspacePanels:MMs,WorkspaceNewTabAction:EMs};
}
