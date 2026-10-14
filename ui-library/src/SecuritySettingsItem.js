// Original security navigation item and browser destination indicator.
export function createExternalDestinationIndicator({React,useOpenTarget:vbn,ExternalIcon:ibn,BrowserIcon:Ko,compilerRuntime=React.__COMPILER_RUNTIME}){
const Sbn=compilerRuntime,h=React.createElement,Cbn={jsx:(type,props)=>h(type,props)};
function xbn(e) {
  let t = (0, Sbn.c)(9),
    {
      className: n,
      ExternalIcon: r,
      href: i,
      isBrowserEnabled: a,
      openTarget: o,
      useExternalBrowser: s,
    } = e,
    c = r === void 0 ? ibn : r,
    l;
  t[0] !== i || t[1] !== a || t[2] !== o || t[3] !== s
    ? ((l = { href: i, isBrowserEnabled: a, openTarget: o, useExternalBrowser: s }),
      (t[0] = i),
      (t[1] = a),
      (t[2] = o),
      (t[3] = s),
      (t[4] = l))
    : (l = t[4]);
  let u = vbn(l),
    d;
  return (
    t[5] !== c || t[6] !== n || t[7] !== u
      ? ((d =
          u === `in-app-browser`
            ? (0, Cbn.jsx)(Ko, { "aria-hidden": !0, className: n })
            : (0, Cbn.jsx)(c, { "aria-hidden": !0, className: n })),
        (t[5] = c),
        (t[6] = n),
        (t[7] = u),
        (t[8] = d))
      : (d = t[8]),
    d
  );
}
return xbn;
}
export function createSecuritySettingsItem({React,NavigationItem:vt,Tooltip:s,ExternalLink:Bt,ExternalIcon:ct,securitySettings,openExternalEvent:_t,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,Jr=compilerRuntime,Q={jsx:(type,props)=>h(type,props)},B=props=>formatMessage(props),intl={formatMessage},ye=()=>intl,hn={securitySettings};
function Vr(e) {
  let t = (0, Jr.c)(15),
    { canCollapse: n, externalTooltip: r, hideLabels: i } = e,
    a = ye(),
    o;
  t[0] !== r || t[1] !== i
    ? ((o = i ? (0, Q.jsx)(B, { ...hn.securitySettings.message }) : r),
      (t[0] = r),
      (t[1] = i),
      (t[2] = o))
    : (o = t[2]);
  let c;
  t[3] === a
    ? (c = t[4])
    : ((c = a.formatMessage(hn.securitySettings.message)), (t[3] = a), (t[4] = c));
  let l = n ? i : void 0,
    u;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((u = (0, Q.jsx)(B, { ...hn.securitySettings.message })), (t[5] = u))
    : (u = t[5]);
  let d;
  t[6] === i
    ? (d = t[7])
    : ((d = i
        ? void 0
        : (0, Q.jsx)(Bt, {
            className: `icon-xs text-secondary opacity-50`,
            ExternalIcon: ct,
            href: hn.securitySettings.href,
            openTarget: `external-browser`,
          })),
      (t[6] = i),
      (t[7] = d));
  let f;
  t[8] !== c || t[9] !== l || t[10] !== d
    ? ((f = (0, Q.jsx)(vt, {
        "aria-label": c,
        icon: hn.securitySettings.icon,
        hideLabel: l,
        label: u,
        onClick: Hr,
        trailing: d,
        weightClassName: `font-normal`,
      })),
      (t[8] = c),
      (t[9] = l),
      (t[10] = d),
      (t[11] = f))
    : (f = t[11]);
  let p;
  return (
    t[12] !== o || t[13] !== f
      ? ((p = (0, Q.jsx)(s, { tooltipContent: o, side: `right`, sideOffset: 12, children: f })),
        (t[12] = o),
        (t[13] = f),
        (t[14] = p))
      : (p = t[14]),
    p
  );
}
function Hr(e) {
  _t({
    event: e,
    href: hn.securitySettings.href,
    initiator: `open_in_browser_bridge`,
    openTarget: `external-browser`,
  });
}
return Vr;
}
export function createSettingsExternalIcon(React){const e=fn=>fn,us=()=>{},W=()=>({jsx:(type,props)=>React.createElement(type,props)});let YVc,XVc;
function ZVc() {
  return (ZVc = e(() => {
    (us(),
      (YVc = W()),
      (XVc = (e) =>
        (0, YVc.jsx)(`svg`, {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          fill: `none`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: (0, YVc.jsx)(`path`, {
            d: `M14.3349 13.3301V6.60645L5.47065 15.4707C5.21095 15.7304 4.78895 15.7304 4.52925 15.4707C4.26955 15.211 4.26955 14.789 4.52925 14.5293L13.3935 5.66504H6.66011C6.29284 5.66504 5.99507 5.36727 5.99507 5C5.99507 4.63273 6.29284 4.33496 6.66011 4.33496H14.9999L15.1337 4.34863C15.4369 4.41057 15.665 4.67857 15.665 5V13.3301C15.6649 13.6973 15.3672 13.9951 14.9999 13.9951C14.6327 13.9951 14.335 13.6973 14.3349 13.3301Z`,
            fill: `currentColor`,
          }),
        })));
  }))();
}
ZVc();return XVc;
}
