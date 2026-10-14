// Original browser-account-switcher presentation. Session/network controller is separate.
import {classNames} from './classNames.js';
export function createAccountSurfaces({React,menu,Avatar:Pe,AssetIcon,useImageSource:Ie,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!menu?.MenuRow||!menu?.MenuFlyoutSubmenuItem||!Pe||!AssetIcon?.fromPreset||!Ie||!compilerRuntime?.c)throw new TypeError('AccountSurfaces requires original menu/avatar/icons, image-source hook and compiler runtime');
 const h=React.createElement,$={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Z=compilerRuntime,H=message=>formatMessage(message),ce=menu.MenuRow,V={Item:menu.MenuItem,FlyoutSubmenuItem:menu.MenuFlyoutSubmenuItem};
 const artwork=(()=>{const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let _8n,WZi,KZi;
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
function GZi() {
  return (GZi = t(() => {
    (Q(),
      (WZi = Z({
        name: `diamond-sparkle-fill-regular-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 0.507324, y: 1.916992, width: 14.984879, height: 12.557129 },
          visualBounds: { x: 0.507324, y: 1.916992, width: 14.984879, height: 12.557129 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 0.507324, y: 1.916992, width: 14.984879, height: 12.557129 },
          center: { x: 7.999763, y: 8.195557 },
          insets: { top: 1.916992, right: 0.507797, bottom: 1.525879, left: 0.507324 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.999763, y: 8.195557 },
            foreground: { x: 7.999763, y: 8.195557 },
          },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M10.479 1.91699C11.0025 1.91714 11.5074 2.11462 11.8921 2.46973L14.8217 5.1748C15.6911 5.97737 15.7189 7.34203 14.8823 8.17871L9.00143 14.0596C8.44831 14.6125 7.55171 14.6123 6.9985 14.0596L1.11764 8.17871C0.281029 7.3421 0.307981 5.97741 1.17721 5.1748L4.10788 2.46973C4.49267 2.11456 4.99731 1.91703 5.52096 1.91699H10.479ZM6.32956 4.41309C6.16988 4.41303 6.03536 4.53276 6.01706 4.69141C5.90276 5.68219 5.34369 6.24108 4.35299 6.35547C4.19444 6.37376 4.07475 6.50841 4.07467 6.66797C4.07484 6.82763 4.1944 6.96235 4.35299 6.98047C5.32988 7.09112 5.92799 7.64502 6.01608 8.63672C6.03049 8.79894 6.16673 8.92291 6.32956 8.92285C6.49249 8.92267 6.62898 8.79807 6.64303 8.63574C6.72775 7.65824 7.31975 7.06607 8.29733 6.98145C8.4595 6.9674 8.58402 6.83167 8.58444 6.66895C8.58462 6.50612 8.46044 6.37004 8.29831 6.35547C7.30675 6.26739 6.75282 5.66903 6.64206 4.69238C6.62407 4.53363 6.48933 4.41325 6.32956 4.41309Z" fill="currentColor"/>`,
      })));
  }))();
}
function qZi() {
  return (qZi = t(() => {
    (Q(),
      (KZi = Z({
        name: `diamond-sparkle-fill-regular-32`,
        canvas: {
          width: 32,
          height: 32,
          viewBox: `0 0 32 32`,
          frame: { x: 0, y: 0, width: 32, height: 32 },
          inkBounds: { x: 1.265137, y: 4.083496, width: 29.46994, height: 24.61377 },
          visualBounds: { x: 1.265137, y: 4.083496, width: 29.46994, height: 24.61377 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.265137, y: 4.083496, width: 29.46994, height: 24.61377 },
          center: { x: 16.000107, y: 16.390381 },
          insets: { top: 4.083496, right: 1.264923, bottom: 3.302734, left: 1.265137 },
          anchors: {
            frame: { x: 16, y: 16 },
            ink: { x: 16.000107, y: 16.390381 },
            foreground: { x: 16.000107, y: 16.390381 },
          },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M20.9574 4.0835C21.9419 4.08358 22.8902 4.4548 23.6137 5.12256L29.475 10.5327C31.1093 12.0415 31.161 14.6073 29.5883 16.1802L17.8266 27.9409C16.8178 28.9497 15.1821 28.9496 14.1732 27.9409L2.41249 16.1802C0.839585 14.6073 0.890426 12.0416 2.52479 10.5327L8.38612 5.12256C9.10952 4.45489 10.058 4.08357 11.0424 4.0835H20.9574ZM12.6596 8.82666C12.3402 8.8264 12.0713 9.06513 12.0346 9.38232C11.806 11.3642 10.6873 12.4828 8.70546 12.7114C8.38819 12.748 8.14873 13.0171 8.14882 13.3364C8.14914 13.6558 8.38912 13.9243 8.70643 13.9604C10.6601 14.1817 11.8563 15.2898 12.0326 17.2729C12.0614 17.5975 12.3338 17.8465 12.6596 17.8462C12.9854 17.8458 13.2574 17.5966 13.2855 17.272C13.4548 15.3166 14.6398 14.1317 16.5951 13.9624C16.9194 13.9341 17.1687 13.663 17.1693 13.3374C17.1697 13.0115 16.9207 12.7393 16.5961 12.7104C14.6128 12.5343 13.505 11.3379 13.2836 9.38428C13.2476 9.06677 12.9791 8.82699 12.6596 8.82666Z" fill="currentColor"/>`,
      })));
  }))();
}
v8n();
GZi();
qZi();
return {_:AssetIcon.fromPreset(_8n),a:WZi,o:KZi};})();
 const _=artwork._;
 const plan=(()=>{const t=fn=>fn;let fW,hAn;
function bbn() {
  return (bbn = t(() => {
    fW = (function (e) {
      return (
        (e.FREE = `free`),
        (e.GO = `go`),
        (e.PLUS = `plus`),
        (e.PRO = `pro`),
        (e.PROMAX = `promax`),
        (e.PROLITE = `prolite`),
        (e.FREE_WORKSPACE = `free_workspace`),
        (e.SELF_SERVE_BUSINESS = `team`),
        (e.SELF_SERVE_BUSINESS_PROLITE = `self_serve_business_prolite`),
        (e.SCI = `sci`),
        (e.ENTERPRISE_CBP = `business`),
        (e.SELF_SERVE_BUSINESS_USAGE_BASED = `self_serve_business_usage_based`),
        (e.ENTERPRISE_CBP_USAGE_BASED = `enterprise_cbp_usage_based`),
        (e.ENTERPRISE_CBP_AUTOMATION = `enterprise_cbp_automation`),
        (e.ENTERPRISE_CBP_TRIAL = `enterprise_cbp_trial`),
        (e.ENTERPRISE_CBP_VIEW_ONLY = `enterprise_cbp_view_only`),
        (e.FINSERV = `finserv`),
        (e.LAW = `law`),
        (e.ENT26 = `ent26`),
        (e.EDUCATION_CBP = `education`),
        (e.EDU_PLUS = `edu_plus`),
        (e.EDU_PRO = `edu_pro`),
        (e.QUORUM = `quorum`),
        (e.DEPRECATED_ENTERPRISE = `enterprise`),
        (e.HC = `hc`),
        (e.DEPRECATED_ENTERPRISE_2 = `deprecated_enterprise`),
        (e.DEPRECATED_EDU = `edu`),
        (e.DEPRECATED_EDU_2 = `deprecated_edu`),
        (e.K12 = `k12`),
        e
      );
    })({});
  }))();
}
function JK() {
  return (JK = t(() => {
    hAn = [
      `business`,
      `enterprise`,
      `enterprise_cbp_usage_based`,
      `enterprise_cbp_automation`,
      `enterprise_cbp_trial`,
      `enterprise_cbp_view_only`,
      `deprecated_enterprise`,
      `hc`,
      `finserv`,
      `law`,
      `ent26`,
      `education`,
      `edu_plus`,
      `edu_pro`,
      `edu`,
      `deprecated_edu`,
      `k12`,
      `quorum`,
    ];
  }))();
}
function qK(e) {
  return e != null && hAn.includes(e);
}
function YK(e) {
  return (
    e === fW.SELF_SERVE_BUSINESS ||
    e === fW.SELF_SERVE_BUSINESS_PROLITE ||
    e === fW.SELF_SERVE_BUSINESS_USAGE_BASED
  );
}
function _An(e) {
  return (
    e === fW.EDUCATION_CBP ||
    e === fW.EDU_PLUS ||
    e === fW.EDU_PRO ||
    e === fW.DEPRECATED_EDU ||
    e === fW.DEPRECATED_EDU_2 ||
    e === fW.K12
  );
}
 bbn();JK();return {enterprise:qK,business:YK,education:_An};})();
 const types=(()=>{const e=fn=>fn,i=()=>{},a=value=>value,n=()=>{},t=plan.enterprise,r=plan.business,o=plan.education;let s,u;
function c() {
  return (c = e(() => {
    (i(),
      (s = a({
        free: {
          id: `pricingPlanConstants.free.name`,
          defaultMessage: `Free`,
          description: `Name of the free pricing plan`,
        },
        plus: {
          id: `pricingPlanConstants.plus.name`,
          defaultMessage: `Plus`,
          description: `Name of the ChatGPT Plus pricing plan`,
        },
        go: {
          id: `pricingPlanConstants.go.name`,
          defaultMessage: `Go`,
          description: `Name of the Go pricing plan`,
        },
        team: {
          id: `pricingPlanConstants.teams.teamPlanName`,
          description: `Business plan title message`,
          defaultMessage: `Business`,
        },
        pro: {
          id: `pricingPlanConstants.pro.name`,
          defaultMessage: `Pro`,
          description: `Name of the pro pricing plan`,
        },
      })));
  }))();
}
function l(e) {
  if (e.structure.toLowerCase() !== `workspace`) return null;
  let n = e.plan_type;
  switch (n) {
    case `quorum`:
      return u.clinicians;
    case `sci`:
      return u.academicResearchers;
    case `free_workspace`:
      return u.businessFree;
    case `k12`:
      return u.k12;
  }
  return o(n) ? u.education : t(n) ? u.enterprise : r(n) ? s.team : null;
}
function d() {
  return (d = e(() => {
    (i(),
      n(),
      c(),
      (u = a({
        clinicians: {
          id: `navigation.cfcLabel`,
          defaultMessage: `ChatGPT for Clinicians`,
          description: `ChatGPT for Clinicians label shown for workspace account in the profile dropdown.`,
        },
        academicResearchers: {
          id: `navigation.academicResearchersLabel`,
          defaultMessage: `Academic Researchers`,
          description: `Short Academic Researchers plan label shown beneath the name of a Science workspace in the ChatGPT sidebar profile and account-switcher dropdown. Keep this audience-specific label concise because it appears on a single line in narrow sidebars.`,
        },
        businessFree: {
          id: `useWorkspaces.freeWorkspacePlanName`,
          defaultMessage: `Business Free`,
          description: `Label for the Business Free workspace tier shown in workspace settings and membership screens.`,
        },
        k12: {
          id: `useWorkspaces.k12PlanName`,
          defaultMessage: `ChatGPT for Teachers`,
          description: `label for K12 tier account`,
        },
        education: {
          id: `navigation.eduLabel`,
          defaultMessage: `EDU`,
          description: `EDU label shown for workspace account in the profile dropdown.`,
        },
        enterprise: {
          id: `navigation.enterpriseLabel`,
          defaultMessage: `Enterprise`,
          description: `Enterprise label shown for workspace account in the profile dropdown.`,
        },
      })));
  }))();
}
 d();return {personal:s,workspace:l};})();
 const lt=types.personal,ut=types.workspace;
 const ot=(()=>{const f=compilerRuntime,p=$,l=classNames,c=AssetIcon,a=artwork.a,o=artwork.o;
function d(e) {
  let t = (0, f.c)(9),
    { size: n } = e,
    r = n === `response` && `size-5`,
    i = n === `sm` && `size-6`,
    s = n === `picker` && `size-12`,
    u;
  t[0] !== r || t[1] !== i || t[2] !== s
    ? ((u = l(
        `flex shrink-0 items-center justify-center rounded-full bg-purple text-avatar-foreground`,
        r,
        i,
        s,
      )),
      (t[0] = r),
      (t[1] = i),
      (t[2] = s),
      (t[3] = u))
    : (u = t[3]);
  let d = n === `picker` ? o : a,
    m;
  t[4] === d ? (m = t[5]) : ((m = (0, p.jsx)(c, { asset: d })), (t[4] = d), (t[5] = m));
  let h;
  return (
    t[6] !== u || t[7] !== m
      ? ((h = (0, p.jsx)(`span`, { className: u, children: m })),
        (t[6] = u),
        (t[7] = m),
        (t[8] = h))
      : (h = t[8]),
    h
  );
}
 return d;})();
function At(e) {
  let t = (0, Z.c)(23),
    { children: n, disabled: r, open: i, onOpenChange: a, workspaceIdentity: o } = e;
  if (r !== void 0 && r) {
    let e;
    t[0] === o.subtitle
      ? (e = t[1])
      : ((e = (0, $.jsx)($.Fragment, { children: o.subtitle })), (t[0] = o.subtitle), (t[1] = e));
    let n;
    return (
      t[2] !== e || t[3] !== o.icon || t[4] !== o.label
        ? ((n = (0, $.jsx)(V.Item, {
            className: `opacity-100`,
            disabled: !0,
            leftIcon: o.icon,
            SubText: e,
            children: o.label,
          })),
          (t[2] = e),
          (t[3] = o.icon),
          (t[4] = o.label),
          (t[5] = n))
        : (n = t[5]),
      n
    );
  }
  let s;
  t[6] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((s = (0, $.jsx)(_, { className: `text-tertiary`, "data-rtl-flip": `` })), (t[6] = s))
    : (s = t[6]);
  let c;
  t[7] === o.label
    ? (c = t[8])
    : ((c = (0, $.jsx)(`span`, { className: `truncate`, children: o.label })),
      (t[7] = o.label),
      (t[8] = c));
  let l;
  t[9] === o.subtitle
    ? (l = t[10])
    : ((l = (0, $.jsx)(`span`, {
        className: `min-w-0 truncate text-xs leading-dense text-tertiary`,
        children: o.subtitle,
      })),
      (t[9] = o.subtitle),
      (t[10] = l));
  let u;
  t[11] !== c || t[12] !== l
    ? ((u = (0, $.jsxs)(`span`, {
        className: `flex min-w-0 flex-1 flex-col`,
        "data-testid": `workspace-switcher-trigger`,
        children: [c, l],
      })),
      (t[11] = c),
      (t[12] = l),
      (t[13] = u))
    : (u = t[13]);
  let d;
  t[14] !== u || t[15] !== o.icon
    ? ((d = (0, $.jsx)(ce, { leftIcon: o.icon, trailingContent: s, children: u })),
      (t[14] = u),
      (t[15] = o.icon),
      (t[16] = d))
    : (d = t[16]);
  let f;
  return (
    t[17] !== n || t[18] !== a || t[19] !== i || t[20] !== d || t[21] !== o.label
      ? ((f = (0, $.jsx)(V.FlyoutSubmenuItem, {
          align: `end`,
          contentSurface: `opaque`,
          contentWidth: `panel`,
          label: o.label,
          open: i,
          triggerContent: d,
          onOpenChange: a,
          children: n,
        })),
        (t[17] = n),
        (t[18] = a),
        (t[19] = i),
        (t[20] = d),
        (t[21] = o.label),
        (t[22] = f))
      : (f = t[22]),
    f
  );
}
function jt(e) {
  let t = (0, Z.c)(9),
    { account: n, hasMultipleWorkspaces: r } = e;
  if (n == null) return null;
  if (n.structure.toLowerCase() === `personal`) {
    if (r) {
      let e;
      return (
        t[0] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, $.jsx)(H, {
              id: `navigation.switchAccounts.personalAccountWorkspaceName`,
              defaultMessage: `Personal account`,
              description: `Label shown for personal account rows in the switch accounts workspace list`,
            })),
            (t[0] = e))
          : (e = t[0]),
        e
      );
    }
    switch (n.plan_type) {
      case `free`: {
        let e;
        return (
          t[1] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((e = (0, $.jsx)(H, { ...lt.free })), (t[1] = e))
            : (e = t[1]),
          e
        );
      }
      case `go`: {
        let e;
        return (
          t[2] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((e = (0, $.jsx)(H, { ...lt.go })), (t[2] = e))
            : (e = t[2]),
          e
        );
      }
      case `plus`: {
        let e;
        return (
          t[3] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((e = (0, $.jsx)(H, { ...lt.plus })), (t[3] = e))
            : (e = t[3]),
          e
        );
      }
      case `pro`:
      case `promax`:
      case `prolite`: {
        let e;
        return (
          t[4] === Symbol.for(`react.memo_cache_sentinel`)
            ? ((e = (0, $.jsx)(H, { ...lt.pro })), (t[4] = e))
            : (e = t[4]),
          e
        );
      }
      default:
        return null;
    }
  }
  let i;
  t[5] === n ? (i = t[6]) : ((i = ut(n)), (t[5] = n), (t[6] = i));
  let a = i,
    o;
  return (
    t[7] === a
      ? (o = t[8])
      : ((o = a == null ? null : (0, $.jsx)(H, { ...a })), (t[7] = a), (t[8] = o)),
    o
  );
}
function Mt(e) {
  let t = (0, Z.c)(7),
    { colorKey: n, imageUrl: r, isPersonalWorkspace: i, name: a } = e,
    o = Ie(r),
    s;
  t[0] === i
    ? (s = t[1])
    : ((s = i ? void 0 : (0, $.jsx)(ot, { size: `response` })), (t[0] = i), (t[1] = s));
  let c;
  return (
    t[2] !== n || t[3] !== a || t[4] !== o || t[5] !== s
      ? ((c = (0, $.jsx)(Pe, {
          alt: ``,
          colorKey: n,
          fallback: s,
          name: a,
          referrerPolicy: `no-referrer`,
          size: `response`,
          src: o,
        })),
        (t[2] = n),
        (t[3] = a),
        (t[4] = o),
        (t[5] = s),
        (t[6] = c))
      : (c = t[6]),
    c
  );
}
 return {WorkspaceFlyout:At,WorkspaceSubtitle:jt,WorkspaceAvatar:Mt,WorkspaceAvatarFallback:ot,workspaceTypeMessage:ut};
}
