// Original result composition; host-specific icon, team and route operations are explicit.
export function createSettingsSearchResults({React,NavigationItem:vt,NavigationList:X,usePlatform:platformHook,getSectionIcon:gn,ResponsiveIcon:Ne,prefetchSection:rn,openExternal:_t,ExternalLink:Bt,ExternalIcon:ct,securityIcon,TeamList:qn,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if([vt,X,platformHook,gn,Ne,rn,_t,Bt,ct,securityIcon,qn].some(x=>x==null))throw new TypeError('Settings results require navigation, platform, artwork, teams and destination adapters');
const Jr=compilerRuntime,Xr=React,h=React.createElement,Q={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Ae=()=>({platform:platformHook()}),B=props=>formatMessage(props),hn={securitySettings:{icon:securityIcon}};
function Wr(e) {
  let t = (0, Jr.c)(19),
    {
      highlightedIndex: n,
      intl: r,
      listRef: i,
      onSelectResult: a,
      onSelectTeam: o,
      searchResults: s,
    } = e,
    { platform: c } = Ae();
  if (s.length === 0) {
    let e;
    return (
      t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, Q.jsx)(`div`, {
            className: `px-row-x pt-2 text-sm text-secondary`,
            children: (0, Q.jsx)(B, {
              id: `settings.search.noResults`,
              defaultMessage: `No results found`,
              description: `Empty state shown when settings search has no matching destinations`,
            }),
          })),
          (t[0] = e))
        : (e = t[0]),
      e
    );
  }
  let l;
  if (t[1] !== n || t[2] !== r || t[3] !== a || t[4] !== o || t[5] !== c || t[6] !== s) {
    let e;
    (t[8] !== n || t[9] !== r || t[10] !== a || t[11] !== o || t[12] !== c
      ? ((e = (e, t) => {
          if (e.kind === `external`)
            return (0, Q.jsx)(
              vt,
              {
                "aria-current": !1,
                "aria-label": e.label,
                "data-list-navigation-item": `true`,
                icon: hn.securitySettings.icon,
                isActive: t === n,
                label: e.label,
                onClick: (t) => {
                  _t({
                    event: t,
                    href: e.href,
                    initiator: `open_in_browser_bridge`,
                    openTarget: `external-browser`,
                  });
                },
                trailing: (0, Q.jsx)(Bt, {
                  className: `icon-xs text-secondary opacity-50`,
                  ExternalIcon: ct,
                  href: e.href,
                  openTarget: `external-browser`,
                }),
              },
              e.id,
            );
          let i = gn(e.kind === `section` ? e.panelSlug : e.sectionSlug, c),
            s = () => {
              e.kind === `section` && rn(e.panelSlug).catch(Gr);
            },
            l = e.label === e.panelLabel;
          return (0, Q.jsxs)(
            Xr.Fragment,
            {
              children: [
                (0, Q.jsx)(vt, {
                  "aria-current": !1,
                  "aria-label": l
                    ? e.label
                    : r.formatMessage(
                        {
                          id: `settings.search.result.ariaLabel`,
                          defaultMessage: `{destination}, {panel}`,
                          description: `Accessible label for a settings search result and its containing panel`,
                        },
                        { destination: e.label, panel: e.panelLabel },
                      ),
                  "data-list-navigation-item": `true`,
                  description: l ? void 0 : e.panelLabel,
                  icon: 16 in i.component ? (0, Q.jsx)(Ne, { icon: i.component }) : i.component,
                  iconAssetSource: i.navigation,
                  isActive: t === n,
                  label: e.label,
                  onClick: () => a(e),
                  onFocus: s,
                  onPointerEnter: s,
                }),
                e.kind === `section` && e.sectionSlug === `teams` && o != null
                  ? (0, Q.jsx)(qn, { hideTitle: !0, onSelectTeam: o })
                  : null,
              ],
            },
            e.id,
          );
        }),
        (t[8] = n),
        (t[9] = r),
        (t[10] = a),
        (t[11] = o),
        (t[12] = c),
        (t[13] = e))
      : (e = t[13]),
      (l = s.map(e)),
      (t[1] = n),
      (t[2] = r),
      (t[3] = a),
      (t[4] = o),
      (t[5] = c),
      (t[6] = s),
      (t[7] = l));
  } else l = t[7];
  let u;
  t[14] === l
    ? (u = t[15])
    : ((u = (0, Q.jsx)(X, { itemSpacing: `default`, children: l })), (t[14] = l), (t[15] = u));
  let d;
  return (
    t[16] !== i || t[17] !== u
      ? ((d = (0, Q.jsx)(`div`, { ref: i, children: u })), (t[16] = i), (t[17] = u), (t[18] = d))
      : (d = t[18]),
    d
  );
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
return Wr;
}
