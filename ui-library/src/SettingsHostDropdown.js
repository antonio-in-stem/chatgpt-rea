// Original host dropdown and connected indicator; caller supplies resolved connections.
export function createSettingsHostDropdown({React,Dropdown:a,menu:h,Tooltip:n,Button:r,DropdownButton:x,LocalIcon:S,RemoteHostIcon:C,FilterIcon:f,SelectedAsset:_,localHostId:c='local',formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
const O=compilerRuntime,hCreate=React.createElement,k={jsx:(type,props,key)=>hCreate(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>hCreate(type,key===undefined?props:{...props,key},...props.children)},intl={formatMessage},p=()=>intl,g=props=>formatMessage(props);
function T(e) {
  let t = (0, O.c)(34),
    {
      connectedRemoteConnections: n,
      disabled: i,
      includeLocalHost: o,
      onSelectHost: s,
      selectedHostId: l,
      align: u,
      contentWidth: d,
      localIcon: m,
      localLabel: v,
      showConnectedIndicator: y,
      triggerVariant: b,
    } = e,
    w = i !== void 0 && i,
    T = o === void 0 || o,
    A = m === void 0 ? S : m,
    j = y !== void 0 && y,
    M = b === void 0 ? `selected-host` : b,
    N = p(),
    P;
  t[0] !== n || t[1] !== l
    ? ((P = n.find((e) => e.hostId === l) ?? null), (t[0] = n), (t[1] = l), (t[2] = P))
    : (P = t[2]);
  let F = P,
    I;
  t[3] !== N || t[4] !== v
    ? ((I =
        v ??
        N.formatMessage({
          id: `settings.hostDropdown.local`,
          defaultMessage: `Local`,
          description: `Label for the local host in settings connection dropdowns`,
        })),
      (t[3] = N),
      (t[4] = v),
      (t[5] = I))
    : (I = t[5]);
  let L = I,
    R = F?.displayName ?? L,
    z;
  t[6] !== T || t[7] !== L
    ? ((z = T ? [{ hostId: c, displayName: L }] : []), (t[6] = T), (t[7] = L), (t[8] = z))
    : (z = t[8]);
  let B;
  t[9] !== n || t[10] !== z
    ? ((B = [...z, ...n]), (t[9] = n), (t[10] = z), (t[11] = B))
    : (B = t[11]);
  let V = B,
    H;
  t[12] === N
    ? (H = t[13])
    : ((H = N.formatMessage({
        id: `settings.hostDropdown.filter`,
        defaultMessage: `Filter settings by host`,
        description: `Tooltip and accessible label for the settings host filter dropdown button`,
      })),
      (t[12] = N),
      (t[13] = H));
  let U = H,
    W;
  t[14] !== A ||
  t[15] !== w ||
  t[16] !== U ||
  t[17] !== R ||
  t[18] !== F ||
  t[19] !== j ||
  t[20] !== M
    ? ((W =
        M === `filter`
          ? (0, k.jsx)(E, {
              cloneCustomTrigger: !0,
              disabled: w,
              tooltipContent: U,
              children: (0, k.jsx)(r, {
                className: `sidebar-icon-button sidebar-hover-icon-button-tint`,
                "aria-label": U,
                color: `ghostMuted`,
                disabled: w,
                size: `compact`,
                uniform: !0,
                children: (0, k.jsx)(f, {}),
              }),
            })
          : (0, k.jsxs)(x, {
              disabled: w,
              chevronClassName: w ? `hidden` : void 0,
              children: [
                F == null
                  ? (0, k.jsx)(A, { className: `icon-xs shrink-0 text-default` })
                  : (0, k.jsx)(C, { className: `icon-xs shrink-0`, hostId: F.hostId }),
                (0, k.jsx)(`span`, { className: `truncate text-start text-default`, children: R }),
                F != null && j ? (0, k.jsx)(D, {}) : null,
              ],
            })),
      (t[14] = A),
      (t[15] = w),
      (t[16] = U),
      (t[17] = R),
      (t[18] = F),
      (t[19] = j),
      (t[20] = M),
      (t[21] = W))
    : (W = t[21]);
  let G = W;
  if (w) return G;
  let K = u ?? `end`,
    q = d ?? `menuWide`,
    J;
  t[22] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((J = (0, k.jsx)(h.Title, {
        children: (0, k.jsx)(g, {
          id: `settings.hostDropdown.title`,
          defaultMessage: `Host`,
          description: `Title for the Host dropdown shown in settings pages`,
        }),
      })),
      (t[22] = J))
    : (J = t[22]);
  let Y;
  t[23] !== A || t[24] !== V || t[25] !== s || t[26] !== l || t[27] !== j
    ? ((Y = (0, k.jsx)(h.Section, {
        className: `max-h-40 overflow-y-auto`,
        children: V.map((e) =>
          (0, k.jsx)(
            h.Item,
            {
              rightIconAsset: e.hostId === l ? _ : void 0,
              onSelect: () => {
                s(e.hostId);
              },
              children: (0, k.jsxs)(`span`, {
                className: `flex min-w-0 items-center gap-2`,
                children: [
                  e.hostId === `local`
                    ? (0, k.jsx)(A, { className: `icon-xs shrink-0` })
                    : (0, k.jsx)(C, { className: `icon-xs shrink-0`, hostId: e.hostId }),
                  (0, k.jsx)(`span`, { className: `truncate`, children: e.displayName }),
                  e.hostId !== `local` && j ? (0, k.jsx)(D, {}) : null,
                ],
              }),
            },
            e.hostId,
          ),
        ),
      })),
      (t[23] = A),
      (t[24] = V),
      (t[25] = s),
      (t[26] = l),
      (t[27] = j),
      (t[28] = Y))
    : (Y = t[28]);
  let X;
  return (
    t[29] !== K || t[30] !== q || t[31] !== Y || t[32] !== G
      ? ((X = (0, k.jsxs)(a, { align: K, contentWidth: q, triggerButton: G, children: [J, Y] })),
        (t[29] = K),
        (t[30] = q),
        (t[31] = Y),
        (t[32] = G),
        (t[33] = X))
      : (X = t[33]),
    X
  );
}
function E(e) {
  let t = (0, O.c)(3),
    r = e[`aria-expanded`] === !0,
    i;
  return (
    t[0] !== e || t[1] !== r
      ? ((i = (0, k.jsx)(n, { ...e, triggerPopupOpen: r })), (t[0] = e), (t[1] = r), (t[2] = i))
      : (i = t[2]),
    i
  );
}
function D() {
  let e = (0, O.c)(1),
    t;
  return (
    e[0] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((t = (0, k.jsx)(`span`, {
          "aria-hidden": !0,
          className: `block size-2 shrink-0 rounded-full bg-green-500`,
        })),
        (e[0] = t))
      : (t = e[0]),
    t
  );
}
return {SettingsHostDropdown:T,HostFilterTooltip:E,ConnectedIndicator:D};
}
