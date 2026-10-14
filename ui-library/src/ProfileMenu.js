// Recovered profile dropdown controller. Menu items and data access are explicit boundaries.
export function createProfileMenu({React,Dropdown:Bi,Button:Ir,Tooltip:Pn,MenuMessage,ProfileMenuItems,prefetchItems,formatMessage=message=>message.defaultMessage,onOpen=()=>{},compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!Bi||!Ir||!Pn||!MenuMessage||!ProfileMenuItems||typeof prefetchItems!=='function'||!compilerRuntime?.c)throw new TypeError('ProfileMenu requires original visual components, items/prefetch adapters and compiler runtime');
 const h=React.createElement,k1={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},ePo=compilerRuntime,tPo=React;
 const t=fn=>fn,o=()=>{},K=()=>k1;let Rki,zki;
function Bki() {
  return (Bki = t(() => {
    (o(),
      (Rki = K()),
      (zki = (e) =>
        (0, Rki.jsxs)(`svg`, {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          fill: `none`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: [
            (0, Rki.jsx)(`path`, {
              fillRule: `evenodd`,
              clipRule: `evenodd`,
              d: `M9.99944 7.24939C11.5169 7.2495 12.7473 8.47995 12.7475 9.99744C12.7475 11.5151 11.517 12.7454 9.99944 12.7455C8.48176 12.7455 7.2514 11.5151 7.2514 9.99744C7.25155 8.47988 8.48186 7.24939 9.99944 7.24939ZM9.99944 8.57947C9.2164 8.57947 8.58163 9.21442 8.58148 9.99744C8.58148 10.7806 9.2163 11.4154 9.99944 11.4154C10.7825 11.4153 11.4174 10.7805 11.4174 9.99744C11.4173 9.21449 10.7824 8.57958 9.99944 8.57947Z`,
              fill: `currentColor`,
            }),
            (0, Rki.jsx)(`path`, {
              fillRule: `evenodd`,
              clipRule: `evenodd`,
              d: `M10.6391 1.67517C11.2939 1.67532 11.8991 2.02577 12.226 2.59314L13.2485 4.36755H15.2963C15.9505 4.36758 16.555 4.71709 16.8823 5.28357L17.5219 6.39001C17.8489 6.95668 17.8481 7.65542 17.5209 8.22205L16.4975 9.99451L17.5239 11.7689C17.8519 12.3357 17.8521 13.0347 17.5248 13.6019L16.8862 14.7084C16.559 15.2747 15.9543 15.6243 15.3002 15.6244H13.2514L12.2299 17.3988C11.9029 17.9663 11.297 18.3168 10.642 18.3168L9.3637 18.3158C8.71064 18.3155 8.10718 17.9678 7.77972 17.4027L6.74847 15.6234L4.69964 15.6244C4.04558 15.6242 3.44087 15.2747 3.1137 14.7084L2.47503 13.6019C2.14791 13.0349 2.14836 12.3366 2.47601 11.7699L3.50237 9.99548L2.47894 8.22205C2.15175 7.65533 2.15174 6.95673 2.47894 6.39001L3.11761 5.28259C3.44458 4.71663 4.04894 4.36813 4.70257 4.36755L6.75042 4.36658L7.77581 2.59119C8.10301 2.02476 8.7076 1.67527 9.36175 1.67517H10.6391ZM9.36273 3.00623C9.1835 3.00623 9.01679 3.10199 8.92718 3.2572L7.82659 5.16345C7.63652 5.49253 7.28473 5.69529 6.90472 5.69568L4.70355 5.69763C4.52451 5.69782 4.3585 5.79355 4.26898 5.94861L3.6303 7.05505C3.54091 7.2102 3.54077 7.40192 3.6303 7.55701L4.73089 9.46326C4.92108 9.7929 4.92135 10.1992 4.73089 10.5287L3.62737 12.4359C3.5378 12.591 3.53792 12.7817 3.62737 12.9369L4.26605 14.0433C4.35567 14.1982 4.52067 14.2932 4.69964 14.2933L6.90276 14.2943C7.28242 14.2946 7.63335 14.497 7.82366 14.8256L8.93011 16.7357C9.01984 16.8905 9.18578 16.9857 9.36468 16.9857H10.642C10.8213 16.9857 10.987 16.89 11.0766 16.7347L12.1752 14.8275C12.3653 14.4975 12.7182 14.2943 13.0991 14.2943H15.3002C15.4794 14.2942 15.6452 14.1985 15.7348 14.0433L16.3725 12.9379C16.4621 12.7826 16.4621 12.5911 16.3725 12.4359L15.27 10.5287C15.1032 10.2404 15.0808 9.89331 15.2055 9.59021L15.269 9.46326L16.3696 7.55701C16.4591 7.40189 16.459 7.21022 16.3696 7.05505L15.7309 5.94861C15.6412 5.79363 15.4754 5.69863 15.2963 5.69861L13.0951 5.69763L12.9535 5.68884C12.6751 5.65158 12.4217 5.50519 12.2504 5.28259L12.1723 5.16443L11.0737 3.2572C10.9841 3.10175 10.8175 3.00525 10.6381 3.00525L9.36273 3.00623Z`,
              fill: `currentColor`,
            }),
          ],
        })));
  }))();
}
 Bki();const X1e=zki;
 const Context=React.createContext(null),empty=Object.freeze({}),queryEmpty=Object.freeze({data:undefined});
 const read=()=>{const snapshot=React.useContext(Context);if(!snapshot)throw Error('ProfileMenu requires ProfileMenuProvider with a snapshot');return snapshot;};
 const q='local',k='profile-menu-open',v$a='usage',Di=()=>read(),e_=()=>read().enabled===true,gp=()=>read().auth??empty,PB=()=>read().accountQuery??queryEmpty,Zs=key=>{const s=read();return key===null?undefined:s.usage;};
 const Ap=(snapshot,event,details)=>onOpen(details,snapshot),$=message=>formatMessage(message),Pm={Message:MenuMessage};
 function YNo(props){return h(ProfileMenuItems,props);}YNo.prefetch=prefetchItems;
 let nPo = (0, k1.jsx)(Pm.Message, {
        role: `status`,
        children: (0, k1.jsx)($, {
          id: `codex.profileDropdown.loadingMenu`,
          defaultMessage: `Loading profile menu…`,
          description: `Status shown while the profile menu loads after opening it`,
        }),
      });
function Lli({
  authAccountId: e,
  authUserId: t,
  currentAccountId: n,
  isCurrentAccountError: r,
  isCurrentAccountLoading: i,
  rateLimitStatus: a,
}) {
  return !i && e != null && t != null && a?.account_id === e && a.user_id === t && (r || n === e);
}
function QNo(e) {
  let t = (0, ePo.c)(43),
    {
      defaultOpen: n,
      hasAmbientUsageSubtext: r,
      hideUsage: i,
      sidebarFooter: a,
      triggerButton: o,
    } = e,
    s = n !== void 0 && n,
    c = r !== void 0 && r,
    l = i !== void 0 && i,
    u = Di(q),
    d = e_(),
    [f, p] = (0, tPo.useState)(s),
    m = gp(),
    { accountId: h, userId: g } = m,
    { data: _, isError: v, isLoading: y } = PB(),
    b = Zs(l ? null : v$a, m),
    x;
  t[0] !== _?.id || t[1] !== h || t[2] !== v || t[3] !== b?.usage || t[4] !== y || t[5] !== g
    ? ((x = Lli({
        authAccountId: h,
        authUserId: g,
        currentAccountId: _?.id ?? null,
        isCurrentAccountError: v,
        isCurrentAccountLoading: y,
        rateLimitStatus: b?.usage,
      })
        ? (b?.usage ?? null)
        : null),
      (t[0] = _?.id),
      (t[1] = h),
      (t[2] = v),
      (t[3] = b?.usage),
      (t[4] = y),
      (t[5] = g),
      (t[6] = x))
    : (x = t[6]);
  let S = x,
    C;
  t[7] !== S || t[8] !== c || t[9] !== f || t[10] !== u
    ? ((C = (e) => {
        (p(e), e && !f && Ap(u, k, { ambientUsageVisible: S != null, ambientSubtextVisible: c }));
      }),
      (t[7] = S),
      (t[8] = c),
      (t[9] = f),
      (t[10] = u),
      (t[11] = C))
    : (C = t[11]);
  let w = C,
    T;
  t[12] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = (0, k1.jsx)(Ir, {
        color: `ghost`,
        size: `icon`,
        children: (0, k1.jsx)(X1e, { className: `icon-xs` }),
      })),
      (t[12] = T))
    : (T = t[12]);
  let E = T,
    D;
  t[13] === o
    ? (D = t[14])
    : ((D =
        o ??
        (0, k1.jsx)(Pn, {
          tooltipContent: (0, k1.jsx)($, {
            id: `codex.header.settingsTooltip`,
            defaultMessage: `Settings`,
            description: `Tooltip text for opening settings`,
          }),
          children: E,
        })),
      (t[13] = o),
      (t[14] = D));
  let O = D,
    A;
  t[15] === O
    ? (A = t[16])
    : ((A = (0, tPo.cloneElement)(O, {
        onFocus(e) {
          (O.props.onFocus?.(e), YNo.prefetch());
        },
        onPointerEnter(e) {
          (O.props.onPointerEnter?.(e), YNo.prefetch());
        },
      })),
      (t[15] = O),
      (t[16] = A));
  let j = A,
    M;
  t[17] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((M = () => p(!1)), (t[17] = M))
    : (M = t[17]);
  let N;
  t[18] !== S || t[19] !== l || t[20] !== f || t[21] !== a
    ? ((N = (0, k1.jsx)(YNo, {
        sidebarFooter: a,
        ambientUsage: S,
        hideUsage: l,
        open: f,
        onClose: M,
      })),
      (t[18] = S),
      (t[19] = l),
      (t[20] = f),
      (t[21] = a),
      (t[22] = N))
    : (N = t[22]);
  let P = N;
  if (a != null) {
    let e = a.width == null,
      n = e ? `end` : `start`,
      r = !d,
      i = e ? -4 : void 0,
      o = e ? `railMenu` : void 0,
      s = e ? void 0 : `calc(${a.width}px - 2 * var(--padding-row-cell-x, var(--padding-row-x)))`,
      c;
    t[23] === s ? (c = t[24]) : ((c = { width: s }), (t[23] = s), (t[24] = c));
    let l = e ? `right` : `top`,
      u = e ? 4 : 6,
      p;
    return (
      t[25] !== P ||
      t[26] !== w ||
      t[27] !== f ||
      t[28] !== n ||
      t[29] !== r ||
      t[30] !== i ||
      t[31] !== o ||
      t[32] !== c ||
      t[33] !== l ||
      t[34] !== u ||
      t[35] !== j
        ? ((p = (0, k1.jsx)(Bi, {
            loadingContent: nPo,
            align: n,
            disabled: r,
            alignOffset: i,
            contentWidth: o,
            contentStyle: c,
            open: f,
            side: l,
            sideOffset: u,
            triggerButton: j,
            onOpenChange: w,
            children: P,
          })),
          (t[25] = P),
          (t[26] = w),
          (t[27] = f),
          (t[28] = n),
          (t[29] = r),
          (t[30] = i),
          (t[31] = o),
          (t[32] = c),
          (t[33] = l),
          (t[34] = u),
          (t[35] = j),
          (t[36] = p))
        : (p = t[36]),
      p
    );
  }
  let F = !d,
    I;
  return (
    t[37] !== P || t[38] !== w || t[39] !== f || t[40] !== F || t[41] !== j
      ? ((I = (0, k1.jsx)(Bi, {
          loadingContent: nPo,
          disabled: F,
          open: f,
          onOpenChange: w,
          contentWidth: `panel`,
          triggerButton: j,
          children: P,
        })),
        (t[37] = P),
        (t[38] = w),
        (t[39] = f),
        (t[40] = F),
        (t[41] = j),
        (t[42] = I))
      : (I = t[42]),
    I
  );
}
 function ProfileMenuProvider({snapshot,children}){if(!snapshot)throw new TypeError('ProfileMenuProvider requires a snapshot');return h(Context.Provider,{value:snapshot},children);}
 return {ProfileMenu:QNo,ProfileMenuProvider,isCurrentAccountUsage:Lli};
}
