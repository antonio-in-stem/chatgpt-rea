// Original complete sidebar controller body. Service and host operations are explicit adapters.
import {settingsSectionGroups,settingsSectionOrder} from './SettingsSections.js';
import {shortcutMatchScore as It} from './ShortcutMatching.js';
export function createSettingsSidebar({React,components,labels,search,useListNavigation,useSnapshot,usePluginViews,useQuery,useSearchTargets,pluginRoutes,prefetchSection,openExternal,openExternalEvent,securitySettings,icons,mergeClasses,formatMessage,defaultHostId,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,Jr=compilerRuntime,Xr=React,Q={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},B=props=>formatMessage(props,props.values),intl={formatMessage},ye=()=>intl;
const ee=()=>useSnapshot().store,te=null,c=()=>useSnapshot().embedded,se=null,Ae=()=>({platform:useSnapshot().platform}),Te=()=>({authMethod:useSnapshot().authMethod}),ie=(_,host)=>usePluginViews(host),mt=null,re=defaultHostId,Ee=useQuery,yr=useSearchTargets;
const {hosted:Ye,plugin:Ge,isRemoteServer:pe,resolveSource:kt,source:Yt,resolved:zt}=pluginRoutes;
const {searchSettings:Qn,resolveSettingsDestination:lr}=search,{getSectionMessage:et,SettingsNavigationLabel:ut,creatorMicroMessage}=labels,Tt={creatorMicro:creatorMicroMessage};
const {NavigationItem:vt,ResponsiveIcon:Ne,Tooltip:s,NavigationHeader:Ze,NavigationHeaderRow:qe,NavigationHeading:lt,NavigationSection:tt,SettingsSearchField:Ur,SettingsSearchResults:Wr,SecuritySettingsItem:Vr,TeamList:qn,Button:u}=components;
const {getSectionIcon:gn,Back16:Pe,Back20:De,External:ct,ActivePet:zn,Expand:Gn,Collapse:Hn}=icons;
const rn=prefetchSection,Qe=openExternal,_t=openExternalEvent,hn={securitySettings},Ve=mergeClasses,$t=useListNavigation,$r=settingsSectionOrder,ei=settingsSectionGroups;
const Zr={back:{id:'settings.nav.back',defaultMessage:'Back to app'},collapseSidebar:{id:'settings.nav.collapseSidebar',defaultMessage:'Collapse settings navigation'},expandSidebar:{id:'settings.nav.expandSidebar',defaultMessage:'Expand settings navigation'}},ti={collapsed:{icon:Gn,message:Zr.expandSidebar},expanded:{icon:Hn,message:Zr.collapseSidebar}};
// Equivalent uniqBy adapter: original call sites deduplicate by path or panel slug.
const Yr={default:(items,key)=>{const seen=new Set();return items.filter(item=>{const id=typeof key==='function'?key(item):item[key];if(seen.has(id))return false;seen.add(id);return true;});}};
function Or(e) {
  let t = (0, Jr.c)(149),
    {
      onSelectPlugin: n,
      settingsSections: r,
      searchableSections: i,
      activeSection: a,
      onSelect: o,
      className: l,
      onBack: d,
      canCollapse: f,
      groupSettingsSections: p,
      onClearHostFilter: m,
      onSelectTeam: h,
      searchHostId: g,
      searchTargets: _,
      sidebarHostSelector: v,
      codexMicroDeviceModel: y,
      showEnterpriseUsageLabel: ne,
      securitySettingsEnabled: b,
    } = e,
    x = i === void 0 ? r : i,
    S = f !== void 0 && f,
    C = p !== void 0 && p,
    w = g === void 0 ? re : g,
    T = y === void 0 ? null : y,
    E = ne !== void 0 && ne,
    D = ee(te),
    O = ye(),
    ae = c(se),
    [oe, k] = (0, Xr.useState)(!1),
    { platform: ce } = Ae(),
    [A, le] = (0, Xr.useState)(``),
    j = S && oe,
    M = C && !j,
    ue;
  t[0] !== A || t[1] !== M
    ? ((ue = M && A.trim().length > 0), (t[0] = A), (t[1] = M), (t[2] = ue))
    : (ue = t[2]);
  let N = ue,
    de = ie(mt, w),
    fe;
  if (t[3] !== N || t[4] !== A || t[5] !== de) {
    let e;
    (t[7] !== N || t[8] !== A
      ? ((e = (e) => {
          let t = [
            e.title,
            ...(e.entrypoint.type === `settings`
              ? (e.entrypoint.searchTerms?.slice(0, 10).filter(Br) ?? [])
              : []),
          ];
          return N && t.some((e) => It(e, A) > 0);
        }),
        (t[7] = N),
        (t[8] = A),
        (t[9] = e))
      : (e = t[9]),
      (fe = de.filter(e)),
      (t[3] = N),
      (t[4] = A),
      (t[5] = de),
      (t[6] = fe));
  } else fe = t[6];
  let P = fe,
    me;
  t[10] !== P || t[11] !== w
    ? ((me = [`plugin-settings-search`, w, P]), (t[10] = P), (t[11] = w), (t[12] = me))
    : (me = t[12]);
  let he = N && P.length > 0,
    ge;
  t[13] !== P || t[14] !== D
    ? ((ge = async () => {
        let e = await Promise.all(
          P.map(async (e) => {
            if (`readTool` in e && e.transport.type === `hosted` && e.pluginId != null)
              return {
                view: e,
                path: Ye(e.pluginId, ...(e.connectorId == null ? [] : [`apps`, e.connectorId])),
              };
            let t =
              e.pluginId == null
                ? null
                : Ge({ hostId: e.hostId, pluginId: e.pluginId, breadcrumb: `settings` });
            if (e.pluginId === void 0 || pe(e.server)) {
              let n = await kt(D, { cwd: null, source: Yt(e) });
              t =
                n == null || n === `unavailable`
                  ? null
                  : zt(n, { hostId: e.hostId, breadcrumb: `settings` });
            }
            return t == null ? null : { view: e, path: t };
          }),
        );
        return (0, Yr.default)(e.filter(zr), `path`);
      }),
      (t[13] = P),
      (t[14] = D),
      (t[15] = ge))
    : (ge = t[15]);
  let _e;
  t[16] !== he || t[17] !== ge || t[18] !== me
    ? ((_e = { queryKey: me, enabled: he, staleTime: 0, queryFn: ge }),
      (t[16] = he),
      (t[17] = ge),
      (t[18] = me),
      (t[19] = _e))
    : (_e = t[19]);
  let { data: F } = Ee(_e),
    { authMethod: ve } = Te(),
    I = ve === `chatgpt` || ve === `chatgptAuthTokens`,
    be;
  t[20] !== N || t[21] !== w || t[22] !== A
    ? ((be = { enabled: N, query: A, selectedHostId: w }),
      (t[20] = N),
      (t[21] = w),
      (t[22] = A),
      (t[23] = be))
    : (be = t[23]);
  let xe = yr(be),
    Se;
  if (
    t[24] !== T ||
    t[25] !== xe ||
    t[26] !== O ||
    t[27] !== n ||
    t[28] !== F ||
    t[29] !== A ||
    t[30] !== _ ||
    t[31] !== x ||
    t[32] !== b ||
    t[33] !== r ||
    t[34] !== I ||
    t[35] !== E
  ) {
    let e = Qn({
        codexMicroDeviceModel: T,
        intl: O,
        query: A,
        showChatGptSettingsLabels: !1,
        showChatGptDataControlsLabel: I,
        showEnterpriseUsageLabel: E,
        targets: _ ?? xe,
        visibleSectionSlugs: x.flatMap(Rr),
      }),
      i = O.formatMessage(hn.securitySettings.message),
      a;
    (t[37] !== O || t[38] !== A || t[39] !== r || t[40] !== E
      ? ((a = (e) => {
          let { sectionSlug: t } = lr(e.sectionSlug, r);
          return {
            ...e,
            id: `section:${t}`,
            kind: `section`,
            panelSlug: t,
            panelLabel: t === e.sectionSlug ? e.panelLabel : O.formatMessage(et(t, E, !1)),
            scrollText: e.label === e.panelLabel && It(e.panelLabel, A) === 0 ? A : e.label,
          };
        }),
        (t[37] = O),
        (t[38] = A),
        (t[39] = r),
        (t[40] = E),
        (t[41] = a))
      : (a = t[41]),
      (Se = [
        ...(0, Yr.default)(e.map(a), Lr),
        ...((n == null ? void 0 : F)?.map(Ir) ?? []),
        ...(b && It(i, A) > 0
          ? [
              {
                href: hn.securitySettings.href,
                id: `external:security-settings`,
                kind: `external`,
                label: i,
              },
            ]
          : []),
      ]),
      (t[24] = T),
      (t[25] = xe),
      (t[26] = O),
      (t[27] = n),
      (t[28] = F),
      (t[29] = A),
      (t[30] = _),
      (t[31] = x),
      (t[32] = b),
      (t[33] = r),
      (t[34] = I),
      (t[35] = E),
      (t[36] = Se));
  } else Se = t[36];
  let L = Se,
    Ce;
  t[42] === L ? (Ce = t[43]) : ((Ce = L.map(Fr)), (t[42] = L), (t[43] = Ce));
  let we = Ce.join(`\0`),
    Oe;
  t[44] === we
    ? (Oe = t[45])
    : ((Oe = we.length === 0 ? [] : we.split(`\0`)), (t[44] = we), (t[45] = Oe));
  let ke = Oe,
    je;
  t[46] !== o || t[47] !== n
    ? ((je = (e) => {
        e.kind === `plugin`
          ? n?.(e.path)
          : e.path == null
            ? o(e.sectionSlug, e.scrollText)
            : o(e.sectionSlug, e.scrollText, e.path);
      }),
      (t[46] = o),
      (t[47] = n),
      (t[48] = je))
    : (je = t[48]);
  let R = je,
    Me = M && A.length > 0,
    z;
  t[49] !== R || t[50] !== L
    ? ((z = (e, t) => {
        let n = L[t];
        n != null &&
          (n.kind === `external`
            ? Qe({
                href: n.href,
                initiator: `open_in_browser_bridge`,
                openTarget: `external-browser`,
              })
            : R(n));
      }),
      (t[49] = R),
      (t[50] = L),
      (t[51] = z))
    : (z = t[51]);
  let Fe;
  t[52] === L
    ? (Fe = t[53])
    : ((Fe = (e, t) => {
        let n = L[t];
        n?.kind === `section` && rn(n.panelSlug).catch(Pr);
      }),
      (t[52] = L),
      (t[53] = Fe));
  let Ie;
  t[54] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Ie = () => {
        le(``);
      }),
      (t[54] = Ie))
    : (Ie = t[54]);
  let Le;
  t[55] !== ke || t[56] !== Me || t[57] !== z || t[58] !== Fe
    ? ((Le = {
        items: ke,
        isActive: Me,
        autoHighlightFirst: !1,
        onSelect: z,
        onHighlight: Fe,
        onEscape: Ie,
      }),
      (t[55] = ke),
      (t[56] = Me),
      (t[57] = z),
      (t[58] = Fe),
      (t[59] = Le))
    : (Le = t[59]);
  let V = $t(Le),
    Re;
  t[60] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Re = (0, Q.jsx)(B, {
        id: `settings.nav.notImplemented`,
        defaultMessage: `[alpha] Not available in Alpha`,
        description: `Tooltip shown for settings sections that are not available in the alpha build`,
      })),
      (t[60] = Re))
    : (Re = t[60]);
  let ze = Re,
    Be;
  t[61] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((Be = (0, Q.jsx)(B, {
        id: `settings.nav.externalTooltip`,
        defaultMessage: `[alpha] Opens in browser`,
        description: `Tooltip for settings items that open externally during alpha`,
      })),
      (t[61] = Be))
    : (Be = t[61]);
  let He = Be,
    H = j ? ti.collapsed : ti.expanded,
    Ue;
  t[62] !== H.message || t[63] !== O
    ? ((Ue = O.formatMessage(H.message)), (t[62] = H.message), (t[63] = O), (t[64] = Ue))
    : (Ue = t[64]);
  let We = Ue,
    Ke = H.icon,
    U,
    Je,
    Xe,
    W,
    G,
    K,
    q,
    J;
  if (
    t[65] !== Ke ||
    t[66] !== a ||
    t[67] !== S ||
    t[68] !== l ||
    t[69] !== T ||
    t[70] !== We ||
    t[71] !== H.message ||
    t[72] !== ae ||
    t[73] !== C ||
    t[74] !== R ||
    t[75] !== j ||
    t[76] !== O ||
    t[77] !== N ||
    t[78] !== d ||
    t[79] !== o ||
    t[80] !== h ||
    t[81] !== ce ||
    t[82] !== V ||
    t[83] !== A ||
    t[84] !== L ||
    t[85] !== r ||
    t[86] !== I ||
    t[87] !== E ||
    t[88] !== M ||
    t[89] !== v
  ) {
    let e = r.some(Nr) ? r.filter(Mr) : r.filter(jr),
      n = [{ key: `settings`, heading: null, sections: qr(e, $r) }];
    if (C) {
      let r;
      (t[98] === I
        ? (r = t[99])
        : ((r = (e) =>
            !I || e.key !== `personal`
              ? e
              : {
                  ...e,
                  slugs: [
                    ...e.slugs.filter((e) => e !== `agreements` && e !== `data-controls`),
                    `data-controls`,
                    `agreements`,
                  ],
                }),
          (t[98] = I),
          (t[99] = r)),
        (n = Kr(e, ei.map(r))));
    }
    let i;
    t[100] !== S || t[101] !== ae || t[102] !== j || t[103] !== d
      ? ((i =
          !ae && d
            ? (0, Q.jsx)(vt, {
                className: `mb-2`,
                role: `link`,
                tabIndex: 0,
                icon: (0, Q.jsx)(Ne, { icon: { 16: Pe, 20: De } }),
                hideLabel: S ? j : void 0,
                onClick: d,
                label: (0, Q.jsx)(B, { ...Zr.back }),
              })
            : null),
        (t[100] = S),
        (t[101] = ae),
        (t[102] = j),
        (t[103] = d),
        (t[104] = i))
      : (i = t[104]);
    let c = i,
      u = !M && `px-row-x`;
    (t[105] !== l || t[106] !== u
      ? ((K = Ve(`sidebar-navigation flex min-h-0 flex-1 flex-col select-none`, u, l)),
        (t[105] = l),
        (t[106] = u),
        (t[107] = K))
      : (K = t[107]),
      t[108] === O
        ? (q = t[109])
        : ((q = O.formatMessage({
            id: `settings.nav.ariaLabel`,
            defaultMessage: `Settings`,
            description: `Aria label for settings navigation`,
          })),
          (t[108] = O),
          (t[109] = q)),
      t[110] === C
        ? (J = t[111])
        : ((J = (e) => {
            if (!C || (e.key !== `ArrowDown` && e.key !== `ArrowUp`)) return;
            let t =
              e.target instanceof Element ? e.target.closest(`[data-settings-panel-slug]`) : null;
            if (t == null) return;
            e.preventDefault();
            let n = Array.from(e.currentTarget.querySelectorAll(`[data-settings-panel-slug]`)),
              r = n[n.indexOf(t) + (e.key === `ArrowDown` ? 1 : -1)];
            (r?.focus(), r?.click());
          }),
          (t[110] = C),
          (t[111] = J)),
      (Xe = `flex min-h-0 flex-1 flex-col`),
      t[112] !== Ke || t[113] !== S || t[114] !== We || t[115] !== H.message
        ? ((W = S
            ? (0, Q.jsx)(`div`, {
                className: `mb-2 shrink-0`,
                children: (0, Q.jsx)(s, {
                  tooltipContent: (0, Q.jsx)(B, { ...H.message }),
                  children: (0, Q.jsx)(vt, {
                    "aria-label": We,
                    fullWidth: !1,
                    icon: Ke,
                    hideLabel: !0,
                    label: (0, Q.jsx)(B, { ...H.message }),
                    title: We,
                    onClick: () => {
                      k(Ar);
                    },
                  }),
                }),
              })
            : null),
          (t[112] = Ke),
          (t[113] = S),
          (t[114] = We),
          (t[115] = H.message),
          (t[116] = W))
        : (W = t[116]),
      t[117] !== c || t[118] !== ae || t[119] !== V || t[120] !== A || t[121] !== M || t[122] !== v
        ? ((G = M
            ? (0, Q.jsxs)(Ze, {
                children: [
                  ae
                    ? (0, Q.jsxs)(qe, {
                        children: [
                          (0, Q.jsx)(lt, {
                            children: (0, Q.jsx)(B, {
                              id: `settings.nav.title`,
                              defaultMessage: `Settings`,
                              description: `Title of the Settings sidebar`,
                            }),
                          }),
                          v,
                          null,
                        ],
                      })
                    : c,
                  (0, Q.jsxs)(`div`, {
                    className: `flex items-center gap-2`,
                    children: [
                      (0, Q.jsx)(Ur, {
                        onKeyDown: V.getInputProps().onKeyDown,
                        searchQuery: A,
                        onQueryChange: (e) => {
                          (V.setHighlightedIndex(-1), le(e));
                        },
                      }),
                      ae ? null : v,
                    ],
                  }),
                ],
              })
            : c),
          (t[117] = c),
          (t[118] = ae),
          (t[119] = V),
          (t[120] = A),
          (t[121] = M),
          (t[122] = v),
          (t[123] = G))
        : (G = t[123]));
    let f = M && `px-row-x pt-(--sidebar-scroll-content-top-padding)`,
      p = j ? `flex flex-col gap-2` : `flex flex-col gap-4`;
    (t[124] !== f || t[125] !== p
      ? ((U = Ve(`min-h-0 flex-1 overflow-y-auto pb-2`, f, p)),
        (t[124] = f),
        (t[125] = p),
        (t[126] = U))
      : (U = t[126]),
      (Je = N
        ? (0, Q.jsx)(Wr, {
            intl: O,
            highlightedIndex: V.highlightedIndex,
            listRef: V.listRef,
            onSelectResult: R,
            onSelectTeam: h,
            searchResults: L,
          })
        : n.map((e) =>
            (0, Q.jsxs)(
              tt,
              {
                title: j || e.heading == null ? null : (0, Q.jsx)(B, { ...e.heading }),
                children: [
                  e.sections.map((e) => {
                    if (e.slug === `teams` && h != null)
                      return (0, Q.jsx)(qn, { onSelectTeam: h }, e.slug);
                    let t = e.slug === `data-controls` && I,
                      n = e.slug === a,
                      r = !!e.disabled,
                      i = gn(e.slug, ce),
                      c = n && e.slug === `pets`,
                      l = c ? zn : i.component,
                      u = et(e.slug, E, t),
                      d =
                        e.slug === `codex-micro` && T === `creator-micro-v2`
                          ? O.formatMessage(Tt.creatorMicro)
                          : O.formatMessage(u, u.values),
                      f = () => {
                        r || o(e.slug);
                      },
                      p = () => {
                        r || e.appRoute != null || rn(e.slug).catch(kr);
                      },
                      m = j
                        ? (0, Q.jsx)(ut, {
                            codexMicroDeviceModel: T,
                            showChatGptDataControlsLabel: t,
                            showEnterpriseUsageLabel: E,
                            slug: e.slug,
                          })
                        : ze;
                    return (0, Q.jsx)(
                      s,
                      {
                        tooltipContent: m,
                        side: `right`,
                        sideOffset: 12,
                        disabled: !j && !r,
                        children: (0, Q.jsx)(vt, {
                          "aria-label": d,
                          icon:
                            16 in l
                              ? (0, Q.jsx)(Ne, {
                                  className: n ? `text-codex-icon-active` : void 0,
                                  icon: l,
                                })
                              : l,
                          iconAssetSource: c ? void 0 : i.navigation,
                          isActive: n,
                          disabled: r,
                          "data-settings-panel-slug": C && !r ? e.slug : void 0,
                          hideLabel: S ? j : void 0,
                          onClick: f,
                          onFocus: p,
                          onPointerEnter: p,
                          weightClassName: `font-normal`,
                          label: (0, Q.jsx)(ut, {
                            codexMicroDeviceModel: T,
                            showChatGptDataControlsLabel: t,
                            showEnterpriseUsageLabel: E,
                            slug: e.slug,
                          }),
                          trailing:
                            !j && e.appRoute != null
                              ? (0, Q.jsx)(ct, { className: `icon-xs text-secondary opacity-50` })
                              : void 0,
                        }),
                      },
                      e.slug,
                    );
                  }),
                  null,
                ],
              },
              e.key,
            ),
          )),
      (t[65] = Ke),
      (t[66] = a),
      (t[67] = S),
      (t[68] = l),
      (t[69] = T),
      (t[70] = We),
      (t[71] = H.message),
      (t[72] = ae),
      (t[73] = C),
      (t[74] = R),
      (t[75] = j),
      (t[76] = O),
      (t[77] = N),
      (t[78] = d),
      (t[79] = o),
      (t[80] = h),
      (t[81] = ce),
      (t[82] = V),
      (t[83] = A),
      (t[84] = L),
      (t[85] = r),
      (t[86] = I),
      (t[87] = E),
      (t[88] = M),
      (t[89] = v),
      (t[90] = U),
      (t[91] = Je),
      (t[92] = Xe),
      (t[93] = W),
      (t[94] = G),
      (t[95] = K),
      (t[96] = q),
      (t[97] = J));
  } else
    ((U = t[90]),
      (Je = t[91]),
      (Xe = t[92]),
      (W = t[93]),
      (G = t[94]),
      (K = t[95]),
      (q = t[96]),
      (J = t[97]));
  let Y;
  t[127] !== S || t[128] !== j || t[129] !== N || t[130] !== b
    ? ((Y =
        !N && b ? (0, Q.jsx)(Vr, { canCollapse: S, externalTooltip: He, hideLabels: j }) : null),
      (t[127] = S),
      (t[128] = j),
      (t[129] = N),
      (t[130] = b),
      (t[131] = Y))
    : (Y = t[131]);
  let X;
  t[132] === m
    ? (X = t[133])
    : ((X =
        m == null
          ? null
          : (0, Q.jsxs)(`div`, {
              className: `shrink-0 px-row-x pb-2 text-sm text-secondary`,
              children: [
                (0, Q.jsx)(u, {
                  className: `me-1 inline-flex underline underline-offset-2`,
                  color: `ghostMuted`,
                  onClick: m,
                  size: `inline`,
                  children: (0, Q.jsx)(B, {
                    id: `settings.nav.clearHostFilter`,
                    defaultMessage: `Clear filter`,
                    description: `Button to show all settings by clearing the selected remote host`,
                  }),
                }),
                (0, Q.jsx)(B, {
                  id: `settings.nav.clearHostFilterDescription`,
                  defaultMessage: `to view all settings`,
                  description: `Text explaining that clearing the selected remote host shows all settings`,
                }),
              ],
            })),
      (t[132] = m),
      (t[133] = X));
  let $e;
  t[134] !== U || t[135] !== Je || t[136] !== Y || t[137] !== X
    ? (($e = (0, Q.jsxs)(`div`, { className: U, children: [Je, Y, X] })),
      (t[134] = U),
      (t[135] = Je),
      (t[136] = Y),
      (t[137] = X),
      (t[138] = $e))
    : ($e = t[138]);
  let nt;
  t[139] !== Xe || t[140] !== W || t[141] !== G || t[142] !== $e
    ? ((nt = (0, Q.jsxs)(`div`, { className: Xe, children: [W, G, $e] })),
      (t[139] = Xe),
      (t[140] = W),
      (t[141] = G),
      (t[142] = $e),
      (t[143] = nt))
    : (nt = t[143]);
  let rt;
  return (
    t[144] !== K || t[145] !== q || t[146] !== J || t[147] !== nt
      ? ((rt = (0, Q.jsx)(`nav`, { className: K, "aria-label": q, onKeyDown: J, children: nt })),
        (t[144] = K),
        (t[145] = q),
        (t[146] = J),
        (t[147] = nt),
        (t[148] = rt))
      : (rt = t[148]),
    rt
  );
}
function kr() {}
function Ar(e) {
  return !e;
}
function Ar(e) {
  return !e;
}
function jr(e) {
  let { slug: t } = e;
  return t !== `age` && t !== `work-settings`;
}
function Mr(e) {
  let { slug: t } = e;
  return (
    t !== `age` &&
    t !== `work-settings` &&
    t !== `analytics` &&
    t !== `consumer-view` &&
    t !== `usage-code-review`
  );
}
function Nr(e) {
  let { slug: t } = e;
  return t === `usage`;
}
function Pr() {}
function Fr(e) {
  return e.id;
}
function Fr(e) {
  return e.id;
}
function Ir(e) {
  let { view: t, path: n } = e;
  return {
    id: `plugin:${n}`,
    kind: `plugin`,
    label: t.title,
    panelLabel: t.title,
    path: n,
    sectionSlug: `plugins-settings`,
  };
}
function Lr(e) {
  return e.panelSlug;
}
function Rr(e) {
  return e.disabled || e.appRoute != null ? [] : [e.slug];
}
function zr(e) {
  return e != null;
}
function Br(e) {
  return e.length <= 50;
}
function Gr() {}
function Kr(e, t, n) {
  let r = new Map(e.map((e) => [e.slug, e])),
    i = new Set(),
    a = t.map((e) => ({
      ...e,
      sections: e.slugs.flatMap((e) => {
        let t = r.get(e);
        return t == null ? [] : (i.add(e), [t]);
      }),
    })),
    o = e.filter(({ slug: e }) => !i.has(e));
  return (
    o.length > 0 && a[a.length - 1]?.sections.push(...o),
    a.filter((e) => e.sections.length > 0 || e.key === n)
  );
}
function Kr(e, t, n) {
  let r = new Map(e.map((e) => [e.slug, e])),
    i = new Set(),
    a = t.map((e) => ({
      ...e,
      sections: e.slugs.flatMap((e) => {
        let t = r.get(e);
        return t == null ? [] : (i.add(e), [t]);
      }),
    })),
    o = e.filter(({ slug: e }) => !i.has(e));
  return (
    o.length > 0 && a[a.length - 1]?.sections.push(...o),
    a.filter((e) => e.sections.length > 0 || e.key === n)
  );
}
function qr(e, t) {
  let n = new Map(e.map((e) => [e.slug, e]));
  return [
    ...t.flatMap((e) => {
      let t = n.get(e);
      return t == null ? [] : (n.delete(e), [t]);
    }),
    ...n.values(),
  ];
}
return Or;
}
