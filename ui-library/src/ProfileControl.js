// Original profile controller with explicit local snapshot/menu boundaries.
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
export function createProfileControl({React,LegacyButton:Wa,Avatar:$Mo,AssetIcon:cp,ProfileMenu:ZNo,useImageSource:Uco,formatMessage=message=>message.defaultMessage,DebugControl=()=>null,DeviceControl=()=>null,motionPreference,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!Wa||!$Mo||!cp||!ZNo||!Uco||!compilerRuntime?.c)throw new TypeError('ProfileControl requires original renderers, a menu adapter, image-source hook and compiler runtime');
 const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
 const sPo=compilerRuntime,ONo=compilerRuntime,gNo=compilerRuntime,wRt=compilerRuntime,cPo=React,A1=runtime,kNo=runtime,_No=runtime,ERt=runtime,ft=createMotionPreference(React,motionPreference);
 const e=fn=>fn,t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 let gRt,_Rt,vRt,yRt,bRt,l9n,d9n;
function u9n() {
  return (u9n = t(() => {
    (Q(),
      (l9n = Z({
        name: `gear-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 1.691895, y: 1.240234, width: 12.617004, height: 13.518555 },
          visualBounds: { x: 1.691895, y: 1.240234, width: 12.617004, height: 13.518555 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 1.691895, y: 1.240234, width: 12.617004, height: 13.518555 },
          center: { x: 8.000397, y: 7.999512 },
          insets: { top: 1.240234, right: 1.691101, bottom: 1.241211, left: 1.691895 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 8.000397, y: 7.999512 },
            foreground: { x: 8.000397, y: 7.999512 },
          },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00062 5.27979C9.50689 5.27979 10.7289 6.50112 10.7291 8.00733C10.7289 9.51359 9.50693 10.7358 8.00062 10.7358C6.49463 10.7355 5.27328 9.51337 5.27308 8.00733C5.27335 6.50135 6.49467 5.28016 8.00062 5.27979ZM8.00062 6.33057C7.07457 6.33094 6.32413 7.08125 6.32386 8.00733C6.32406 8.93347 7.07453 9.6847 8.00062 9.68506C8.92703 9.68506 9.67816 8.9337 9.67836 8.00733C9.67809 7.08102 8.92699 6.33057 8.00062 6.33057Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59633 1.24073C9.07592 1.2409 9.51987 1.49692 9.75941 1.91358C9.97218 2.28401 10.2906 2.83827 10.5465 3.28272C10.5982 3.37225 10.694 3.42724 10.7985 3.42725L12.3795 3.42823C12.8587 3.42842 13.3021 3.68417 13.5416 4.09913L14.1295 5.11768C14.3672 5.52975 14.3684 6.03702 14.1334 6.45069L13.2536 8.00147L14.1334 9.54835C14.3685 9.96221 14.3675 10.4711 14.1295 10.8833L13.5416 11.9019C13.302 12.3167 12.8586 12.5726 12.3795 12.5728L10.7975 12.5718C10.6934 12.572 10.5981 12.6281 10.5465 12.7173C10.2906 13.1618 9.97118 13.716 9.75844 14.0864C9.51881 14.5032 9.07511 14.7593 8.59535 14.7593C8.17471 14.7593 7.8383 14.7583 7.40492 14.7583C6.92515 14.7583 6.48146 14.5032 6.24183 14.0864C6.02905 13.716 5.70972 13.1619 5.45375 12.7173C5.40213 12.6278 5.3062 12.5718 5.20179 12.5718H3.62172C3.14243 12.5718 2.69927 12.3159 2.45961 11.9009L1.87172 10.8823C1.63401 10.4703 1.63199 9.963 1.86683 9.54932L2.74769 7.99952L1.86683 6.45069C1.63181 6.03685 1.63375 5.52887 1.87172 5.1167L2.45961 4.09913C2.69922 3.68437 3.14176 3.42844 3.62074 3.42823H5.20179C5.30622 3.42823 5.4021 3.37221 5.45375 3.28272C5.70967 2.83823 6.0281 2.28399 6.24086 1.91358C6.48037 1.49684 6.92432 1.24093 7.40394 1.24073C7.83772 1.24072 8.1753 1.24072 8.59633 1.24073ZM7.40492 2.29053C7.2999 2.29053 7.20281 2.34685 7.15101 2.43702C6.93819 2.80754 6.62008 3.36219 6.3639 3.80713C6.12441 4.2228 5.6814 4.47781 5.20277 4.47803H3.62172C3.51764 4.47803 3.42093 4.53349 3.36879 4.62354L2.7809 5.6421C2.72924 5.7316 2.72899 5.84223 2.77992 5.93213L3.80629 7.73975C3.84008 7.79927 3.86295 7.86466 3.87172 7.93213L3.87562 7.99952C3.87565 8.06812 3.86231 8.13662 3.83656 8.19971L3.80629 8.26026L2.77894 10.0679C2.72805 10.1578 2.72924 10.2684 2.7809 10.3579L3.36879 11.3765C3.42092 11.4666 3.51761 11.522 3.62172 11.522H5.20179C5.68071 11.522 6.12432 11.777 6.3639 12.1929C6.62013 12.6379 6.93914 13.1924 7.15199 13.563C7.20372 13.6529 7.29923 13.7093 7.40394 13.7095C7.83771 13.7095 8.17531 13.7085 8.59633 13.7085C8.70115 13.7083 8.79754 13.653 8.84926 13.563C9.06202 13.1926 9.38023 12.6387 9.63636 12.1939C9.87592 11.7778 10.3195 11.522 10.7985 11.522H12.3795C12.4834 11.5218 12.5794 11.4663 12.6315 11.3765L13.2194 10.3579C13.271 10.2684 13.2714 10.1578 13.2203 10.0679L12.193 8.26026C12.1481 8.18098 12.1256 8.0906 12.1256 7.99952C12.1257 7.90839 12.149 7.818 12.194 7.73878L13.2203 5.93213C13.2712 5.84235 13.2708 5.73252 13.2194 5.64307L12.6315 4.62452C12.5794 4.53428 12.4828 4.47803 12.3786 4.47803L10.7985 4.47901C10.3197 4.47901 9.87697 4.22287 9.63734 3.80713C9.38106 3.36201 9.0621 2.80661 8.84926 2.43604C8.79741 2.34609 8.70021 2.29053 8.59535 2.29053C8.17471 2.29053 7.8383 2.29053 7.40492 2.29053Z" fill="currentColor"/>`,
      })));
  }))();
}
function f9n() {
  return (f9n = t(() => {
    (Q(),
      (d9n = Z({
        name: `gear-light-20`,
        canvas: {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          frame: { x: 0, y: 0, width: 20, height: 20 },
          inkBounds: { x: 2.057617, y: 1.489258, width: 15.884598, height: 17.020508 },
          visualBounds: { x: 2.057617, y: 1.489258, width: 15.884598, height: 17.020508 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 2.057617, y: 1.489258, width: 15.884598, height: 17.020508 },
          center: { x: 9.999916, y: 9.999512 },
          insets: { top: 1.489258, right: 2.057785, bottom: 1.490234, left: 2.057617 },
          anchors: {
            frame: { x: 10, y: 10 },
            ink: { x: 9.999916, y: 9.999512 },
            foreground: { x: 9.999916, y: 9.999512 },
          },
        },
        capabilities: [`icon`],
        body: `<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99994 6.58741C11.8866 6.58741 13.4167 8.11684 13.4169 10.0034C13.4169 11.8902 11.8867 13.4204 9.99994 13.4204C8.11346 13.4201 6.58392 11.89 6.58392 10.0034C6.58415 8.11706 8.1136 6.58776 9.99994 6.58741ZM9.99994 7.91749C8.84814 7.91784 7.91423 8.8516 7.914 10.0034C7.914 11.1554 8.84799 12.09 9.99994 12.0903C11.1522 12.0903 12.0869 11.1557 12.0869 10.0034C12.0866 8.85138 11.152 7.91749 9.99994 7.91749Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.746 1.48975C11.3535 1.48978 11.9164 1.81358 12.2197 2.34132C12.487 2.80674 12.8848 3.50127 13.206 4.05909C13.2711 4.17222 13.3924 4.24261 13.5244 4.24268H15.5068C16.1135 4.24268 16.6751 4.56591 16.9785 5.09132L17.7148 6.36768C18.0159 6.88943 18.0182 7.53236 17.7206 8.05616L16.6161 10.0005L17.7206 11.9448C18.018 12.4685 18.0158 13.1107 17.7148 13.6323L16.9785 14.9087C16.6751 15.4341 16.1135 15.7583 15.5068 15.7583H13.5244C13.3924 15.7584 13.2712 15.8278 13.206 15.9409C12.8848 16.4988 12.486 17.1932 12.2187 17.6587C11.9154 18.1864 11.3534 18.5103 10.746 18.5103C10.2189 18.5103 9.79593 18.5103 9.25287 18.5103C8.64561 18.51 8.0843 18.1854 7.78119 17.6577C7.51383 17.1922 7.11402 16.4987 6.79291 15.9409C6.72766 15.828 6.60731 15.7583 6.47552 15.7583H4.4931C3.88642 15.7583 3.32478 15.4341 3.02142 14.9087L2.28509 13.6333C1.9839 13.1116 1.98183 12.4687 2.27923 11.9448L3.3847 10.0005L2.27923 8.05616C1.98165 7.53232 1.98392 6.88946 2.28509 6.36768L3.0224 5.09132C3.32583 4.5661 3.88651 4.24171 4.4931 4.24171L6.47552 4.24268C6.60747 4.24265 6.72872 4.17225 6.79388 4.05909C7.11509 3.5012 7.51385 2.80675 7.78119 2.34132C8.08449 1.81366 8.64649 1.48976 9.25384 1.48975C9.79678 1.48974 10.219 1.48974 10.746 1.48975ZM9.25384 2.81983C9.12132 2.81992 8.9989 2.89059 8.93353 3.0044C8.66615 3.46991 8.2677 4.1648 7.94623 4.72315C7.64294 5.24954 7.08168 5.57273 6.47552 5.57276H4.4931C4.3616 5.57276 4.23959 5.64253 4.17376 5.75635L3.43744 7.03272C3.3722 7.1458 3.37108 7.28539 3.43548 7.39893L4.7265 9.66944C4.76927 9.74474 4.7964 9.82825 4.80755 9.91358L4.81341 10.0005C4.81335 10.116 4.78355 10.2301 4.7265 10.3306L3.43548 12.6021C3.3712 12.7156 3.37219 12.8553 3.43744 12.9683L4.17376 14.2437C4.23959 14.3575 4.3616 14.4282 4.4931 14.4282H6.47552C7.0818 14.4283 7.643 14.7512 7.94623 15.2778C8.26778 15.8363 8.66715 16.5311 8.93451 16.9966C8.99997 17.1101 9.12148 17.1811 9.25384 17.1812C9.79674 17.1812 10.219 17.1812 10.746 17.1812C10.8785 17.1812 11.0009 17.1104 11.0663 16.9966C11.3337 16.5311 11.7321 15.8363 12.0536 15.2778C12.3569 14.7512 12.918 14.4283 13.5244 14.4282H15.5068C15.6381 14.4282 15.7603 14.3573 15.8261 14.2437L16.5624 12.9683C16.6278 12.8551 16.6289 12.7147 16.5644 12.6011L15.2734 10.3306C15.2163 10.2301 15.1865 10.116 15.1865 10.0005C15.1865 9.88497 15.2164 9.77089 15.2734 9.67042L16.5644 7.39893C16.6288 7.28546 16.6285 7.14576 16.5634 7.03272L15.8261 5.75635C15.7603 5.64258 15.6382 5.57279 15.5068 5.57276H13.5244C12.9182 5.57274 12.3569 5.2496 12.0536 4.72315C11.7322 4.16477 11.3337 3.46992 11.0663 3.0044C11.001 2.89069 10.8794 2.82006 10.747 2.81983C10.2199 2.81982 9.7968 2.81982 9.25384 2.81983Z" fill="currentColor"/>`,
      })));
  }))();
}
 u9n();f9n();const Qde=d9n,_he=l9n;
 const Context=React.createContext(null),read=()=>{const s=React.useContext(Context);if(!s)throw Error('Missing ProfileControl snapshot');return s;};
 const empty=Object.freeze({}),queryEmpty=Object.freeze({data:undefined,isPending:false}),intl={formatMessage};
 const MG='modelProvider',vMo='user',v$a='usage',CC='sidebarWidth',as='local';
 const zd=()=>intl,e_=()=>read().ambientUsageEnabled===true,gp=()=>read().auth??empty;
 const Cc=()=>read().navigate,G=()=>read().sidebarWidth;
 const Zs=key=>{const s=read();return key===null?undefined:key===v$a?s.queries?.[key]:(s.queries?.[key]??queryEmpty);};
 const PB=()=>read().accountQuery??queryEmpty,Cqe=()=>read().sessionQuery??queryEmpty;
 const H9i=()=>read().profileVisibility??{isProfileVisible:false,isProfileVisibilityLoading:false};
 const Q7i=options=>options,Cp=()=>read().profileQuery??queryEmpty;
 const $=message=>formatMessage(message),mWa='general-settings';
 const NNo=()=>h(DebugControl,{snapshot:read()}),kMo=()=>h(DeviceControl,{snapshot:read()});
function HNo(e) {
  return typeof e == `object` && !!e && !Array.isArray(e);
}
function UNo(e) {
  if (e == null) return null;
  let t = e.model_provider;
  if (t == null || t.length === 0) return null;
  let n = e.model_providers;
  if (!HNo(n)) return t;
  let r = n[t];
  return HNo(r) && typeof r.name == `string` && r.name.length > 0 ? r.name : t;
}
function hNo(e) {
  let t = (0, gNo.c)(2),
    { text: n } = e;
  if (n == null) return null;
  let r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, _No.jsx)(`span`, {
          className: `min-w-0 truncate text-xs leading-dense text-tertiary select-none`,
          children: n,
        })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function DNo(e) {
  let t = (0, ONo.c)(5),
    { children: n, text: r } = e;
  if (r == null) return n;
  let i;
  t[0] === r ? (i = t[1]) : ((i = (0, kNo.jsx)(hNo, { text: r })), (t[0] = r), (t[1] = i));
  let a;
  return (
    t[2] !== n || t[3] !== i
      ? ((a = (0, kNo.jsxs)(`span`, {
          className: `flex min-w-0 flex-1 flex-col py-2`,
          "data-ambient-usage-label": !0,
          children: [n, i],
        })),
        (t[2] = n),
        (t[3] = i),
        (t[4] = a))
      : (a = t[4]),
    a
  );
}
function xRt() {
  return (xRt = e(() => {
    ((gRt = `_LoadingResultsShimmer_1a4hf_2`),
      (_Rt = `_loadingResultsShimmer_1a4hf_2`),
      (vRt = `_chatGptLoadingResultsShimmer_1a4hf_2`),
      (yRt = `_chatGptProjectSkeleton_1a4hf_2`),
      (bRt = {
        LoadingResultsShimmer: gRt,
        loadingResultsShimmer: _Rt,
        chatGptLoadingResultsShimmer: vRt,
        chatGptProjectSkeleton: yRt,
      }));
  }))();
}
function CRt(e) {
  return Math.max(1, Math.min(100, e));
}
function iC(e) {
  "use forget";
  let t = (0, wRt.c)(14),
    { className: n, animate: r, as: i, delayMs: a, size: o, variant: s, widthPercent: c } = e,
    l = r === void 0 || r,
    u = i === void 0 ? `div` : i,
    d = o === void 0 ? `md` : o,
    f = ft(),
    p;
  t[0] === c ? (p = t[1]) : ((p = c == null ? void 0 : `${CRt(c)}%`), (t[0] = c), (t[1] = p));
  let m = a == null ? void 0 : `${a}ms`,
    h;
  t[2] !== p || t[3] !== m
    ? ((h = { width: p, "--loading-results-shimmer-delay": m }), (t[2] = p), (t[3] = m), (t[4] = h))
    : (h = t[4]);
  let g = h,
    _;
  t[5] === n ? (_ = t[6]) : ((_ = ng(bRt.LoadingResultsShimmer, n)), (t[5] = n), (t[6] = _));
  let v = !l || f || void 0,
    y;
  return (
    t[7] !== u || t[8] !== d || t[9] !== g || t[10] !== _ || t[11] !== v || t[12] !== s
      ? ((y = (0, ERt.jsx)(u, {
          className: _,
          "aria-hidden": !0,
          "data-reduced-motion": v,
          "data-size": d,
          "data-variant": s,
          style: g,
        })),
        (t[7] = u),
        (t[8] = d),
        (t[9] = g),
        (t[10] = _),
        (t[11] = v),
        (t[12] = s),
        (t[13] = y))
      : (y = t[13]),
    y
  );
}
function iPo(e) {
  let t = (0, sPo.c)(139),
    n;
  t[0] === e ? (n = t[1]) : ((n = e === void 0 ? {} : e), (t[0] = e), (t[1] = n));
  let { compact: r, defaultOpen: i, hideUsage: a } = n,
    o = r !== void 0 && r,
    s = i !== void 0 && i,
    c = a !== void 0 && a,
    l = zd(),
    u = e_(),
    [, d] = (0, cPo.useState)(null),
    f = Cc(),
    p = G(CC),
    m = gp(),
    {
      accountId: h,
      accountStructureAtLogin: g,
      authMethod: _,
      email: v,
      isLoading: y,
      nameAtLogin: b,
      profilePictureUrlAtLogin: x,
      requiresAuth: S,
      userId: C,
    } = m,
    w = Zs(!o && !c ? v$a : null, m)?.data.profile_subtext ?? null,
    T = _ != null,
    E;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((E = { hostId: as }), (t[2] = E))
    : (E = t[2]);
  let { data: D } = Zs(MG, E),
    O;
  t[3] !== _ || t[4] !== D
    ? ((O = _ === `chatgpt` ? null : UNo(D)), (t[3] = _), (t[4] = D), (t[5] = O))
    : (O = t[5]);
  let k = O,
    A = T || k != null || !0,
    j = _ !== `chatgpt` && (T || k != null),
    M = _ == null && !y && !S,
    { data: N, isError: P } = PB(),
    { data: F } = Cqe(),
    I = h ?? F?.accountId ?? null,
    L = C ?? F?.userId ?? null,
    R;
  t[6] !== I || t[7] !== L
    ? ((R = { accountId: I, userId: L }), (t[6] = I), (t[7] = L), (t[8] = R))
    : (R = t[8]);
  let { data: z, isPending: B } = Zs(vMo, R),
    V;
  t[9] !== N?.structure || t[10] !== g
    ? ((V = (N?.structure ?? g)?.toLowerCase()), (t[9] = N?.structure), (t[10] = g), (t[11] = V))
    : (V = t[11]);
  let H = V,
    ee = H === `personal`,
    U = H === `workspace`,
    te = _ === `chatgpt` && I != null && L != null,
    { isProfileVisible: ne, isProfileVisibilityLoading: re } = H9i(),
    ie = te && ne,
    ae;
  t[12] !== I || t[13] !== L || t[14] !== ie
    ? ((ae = Q7i({ accountId: I, enabled: ie, userId: L })),
      (t[12] = I),
      (t[13] = L),
      (t[14] = ie),
      (t[15] = ae))
    : (ae = t[15]);
  let { data: oe, isPending: se } = Cp(ae),
    ce = !1;
  _ === `chatgpt` && U ? (ce = N == null && !P) : te && (ce = B || (se && (re || ne)));
  let le;
  t[16] !== z || t[17] !== x
    ? ((le = (z == null && x?.trim()) || null), (t[16] = z), (t[17] = x), (t[18] = le))
    : (le = t[18]);
  let ue = le,
    de;
  t[19] !== N?.profile_picture_url ||
  t[20] !== z?.picture ||
  t[21] !== ee ||
  t[22] !== oe?.profile_details.profile_picture_url ||
  t[23] !== ue
    ? ((de =
        (oe?.profile_details.profile_picture_url?.trim() || null) ??
        z?.picture ??
        (ee ? N?.profile_picture_url : null) ??
        ue),
      (t[19] = N?.profile_picture_url),
      (t[20] = z?.picture),
      (t[21] = ee),
      (t[22] = oe?.profile_details.profile_picture_url),
      (t[23] = ue),
      (t[24] = de))
    : (de = t[24]);
  let fe = de,
    pe = T && U ? N?.profile_picture_url : fe,
    { src: me, isError: he } = Uco(pe),
    ge = ce || (pe != null && me == null && !he);
  if (!A && !M) {
    let e;
    return (
      t[25] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, A1.jsx)(A1.Fragment, {})), (t[25] = e))
        : (e = t[25]),
      e
    );
  }
  let _e;
  t[26] === l
    ? (_e = t[27])
    : ((_e = l.formatMessage({
        id: `codex.profileFooter.settingsFallback`,
        defaultMessage: `Settings`,
        description: `Footer label shown when no profile identity is available`,
      })),
      (t[26] = l),
      (t[27] = _e));
  let ve = _e,
    ye;
  t[28] === b ? (ye = t[29]) : ((ye = b?.trim() || null), (t[28] = b), (t[29] = ye));
  let be = ye,
    xe;
  t[30] === N?.name
    ? (xe = t[31])
    : ((xe = N?.name?.trim() || null), (t[30] = N?.name), (t[31] = xe));
  let Se = xe,
    Ce;
  t[32] === oe?.profile_details.display_name
    ? (Ce = t[33])
    : ((Ce = oe?.profile_details.display_name?.trim() || null),
      (t[32] = oe?.profile_details.display_name),
      (t[33] = Ce));
  let we = Ce,
    Te = z?.name ?? be ?? z?.email ?? (ee ? Se : null) ?? v ?? F?.email,
    Ee;
  t[34] !== _ ||
  t[35] !== Te ||
  t[36] !== l ||
  t[37] !== oe?.profile_details ||
  t[38] !== we ||
  t[39] !== fe
    ? ((Ee =
        _ === `chatgpt`
          ? {
              displayName:
                we ??
                Te ??
                l.formatMessage({
                  id: `codex.profileDropdown.profile`,
                  defaultMessage: `Profile`,
                  description: `Menu item to open the profile page`,
                }),
              isProfileAvailable: we != null,
              profileImageUrl: fe,
              username: oe?.profile_details.username?.trim() || null,
            }
          : null),
      (t[34] = _),
      (t[35] = Te),
      (t[36] = l),
      (t[37] = oe?.profile_details),
      (t[38] = we),
      (t[39] = fe),
      (t[40] = Ee))
    : (Ee = t[40]);
  let De = Ee,
    Oe;
  t[41] !== N?.profile_picture_url ||
  t[42] !== Se ||
  t[43] !== l ||
  t[44] !== T ||
  t[45] !== U ||
  t[46] !== k ||
  t[47] !== De
    ? ((Oe =
        k == null
          ? De != null && !U
            ? De
            : T && U
              ? {
                  displayName:
                    Se ??
                    l.formatMessage({
                      id: `codex.profileFooter.workspaceFallback`,
                      defaultMessage: `Workspace`,
                      description: `Footer label while the selected workspace's name is loading`,
                    }),
                  profileImageUrl: N?.profile_picture_url ?? null,
                }
              : null
          : { displayName: k, profileImageUrl: null }),
      (t[41] = N?.profile_picture_url),
      (t[42] = Se),
      (t[43] = l),
      (t[44] = T),
      (t[45] = U),
      (t[46] = k),
      (t[47] = De),
      (t[48] = Oe))
    : (Oe = t[48]);
  let ke = Oe,
    Ae = ke?.displayName ?? ve,
    je;
  t[49] !== A || t[50] !== l
    ? ((je = A
        ? l.formatMessage({
            id: `codex.profileFooter.openProfileMenu`,
            defaultMessage: `Open profile menu`,
            description: `Accessible label for opening the profile menu`,
          })
        : l.formatMessage({
            id: `codex.profileFooter.openSettings`,
            defaultMessage: `Open settings`,
            description: `Accessible label for opening settings`,
          })),
      (t[49] = A),
      (t[50] = l),
      (t[51] = je))
    : (je = t[51]);
  let Me = je,
    Ne;
  t[52] !== Ae || t[53] !== ce || t[54] !== U || t[55] !== be
    ? ((Ne =
        ce && (U || be == null)
          ? (0, A1.jsx)(iC, { as: `span`, widthPercent: 50 })
          : (0, A1.jsx)(`span`, { className: `min-w-0 flex-1 truncate`, children: Ae })),
      (t[52] = Ae),
      (t[53] = ce),
      (t[54] = U),
      (t[55] = be),
      (t[56] = Ne))
    : (Ne = t[56]);
  let Pe = Ne,
    Fe;
  t[58] === !1 ? (Fe = t[59]) : ((Fe = void 0), (t[58] = !1), (t[59] = Fe));
  let Ie = Fe,
    Le = o ? `size-6` : `icon-sm`,
    Re;
  t[60] === Le
    ? (Re = t[61])
    : ((Re = ng(`shrink-0 rounded-full bg-text-tertiary/80 browser:size-6`, Le)),
      (t[60] = Le),
      (t[61] = Re));
  let ze;
  t[62] === Re
    ? (ze = t[63])
    : ((ze = (0, A1.jsx)(`span`, { "aria-hidden": !0, className: Re })),
      (t[62] = Re),
      (t[63] = ze));
  let Be = ze,
    Ve;
  t[64] !== Ae ||
  t[65] !== Be ||
  t[66] !== o ||
  t[67] !== ke ||
  t[68] !== me ||
  t[69] !== ge ||
  t[70] !== ce ||
  t[71] !== j ||
  t[72] !== U ||
  t[73] !== I ||
  t[74] !== L ||
  t[75] !== !1
    ? ((Ve =
        ke == null || j
          ? (0, A1.jsx)(cp, { className: `shrink-0`, "aria-hidden": !1, asset: o ? Qde : _he })
          : (0, A1.jsxs)(`span`, {
              className: ng(`relative isolate inline-flex shrink-0`, !1),
              children: [
                null,
                null,
                (0, A1.jsx)(A1.Fragment, {
                  children: (0, A1.jsx)($Mo, {
                    alt: ``,
                    colorKey: (U ? I : L) ?? void 0,
                    name: Ae,
                    size: o ? `sm` : `xs`,
                    src: ce ? null : me,
                    fallback: ge ? Be : void 0,
                    loadingFallback: Be,
                  }),
                }),
              ],
            })),
      (t[64] = Ae),
      (t[65] = Be),
      (t[66] = o),
      (t[67] = ke),
      (t[68] = me),
      (t[69] = ge),
      (t[70] = ce),
      (t[71] = j),
      (t[72] = U),
      (t[73] = I),
      (t[74] = L),
      (t[75] = !1),
      (t[76] = Ve))
    : (Ve = t[76]);
  let He = Ve,
    Ue;
  t[77] === ge
    ? (Ue = t[78])
    : ((Ue = ge
        ? (0, A1.jsx)(`span`, {
            className: `sr-only`,
            role: `status`,
            children: (0, A1.jsx)($, {
              id: `codex.profileFooter.loadingProfile`,
              defaultMessage: `Loading profile`,
              description: `Accessible status while the account name and avatar load in the sidebar footer`,
            }),
          })
        : null),
      (t[77] = ge),
      (t[78] = Ue));
  let We = Ue,
    Ge;
  t[79] === !1
    ? (Ge = t[80])
    : ((Ge = ng(
        `has-[[data-ambient-usage-label]]:h-auto has-[[data-ambient-usage-label]]:min-h-8`,
        !1,
      )),
      (t[79] = !1),
      (t[80] = Ge));
  let Ke = o ? `lg` : void 0,
    qe = !o,
    Je = ge || void 0,
    Ye;
  t[81] !== A || t[82] !== f
    ? ((Ye = A
        ? void 0
        : () => {
            f(`/settings/` + mWa);
          }),
      (t[81] = A),
      (t[82] = f),
      (t[83] = Ye))
    : (Ye = t[83]);
  let Xe;
  t[84] !== Ie || t[85] !== He
    ? ((Xe = Ie
        ? (0, A1.jsx)(`span`, { ref: d, className: `mb-2.5 inline-flex size-6 shrink-0` })
        : He),
      (t[84] = Ie),
      (t[85] = He),
      (t[86] = Xe))
    : (Xe = t[86]);
  let Ze;
  t[87] !== w || t[88] !== o || t[89] !== Pe
    ? ((Ze = o
        ? null
        : (0, A1.jsxs)(`span`, {
            className: `flex min-w-0 flex-1 text-start text-base`,
            children: [
              null,
              (0, A1.jsx)(A1.Fragment, { children: (0, A1.jsx)(DNo, { text: w, children: Pe }) }),
              null,
            ],
          })),
      (t[87] = w),
      (t[88] = o),
      (t[89] = Pe),
      (t[90] = Ze))
    : (Ze = t[90]);
  let Qe;
  t[91] !== o ||
  t[92] !== Me ||
  t[93] !== We ||
  t[94] !== Ge ||
  t[95] !== Ke ||
  t[96] !== qe ||
  t[97] !== Je ||
  t[98] !== Ye ||
  t[99] !== Xe ||
  t[100] !== Ze
    ? ((Qe = (0, A1.jsxs)(aPo, {
        className: Ge,
        compact: o,
        color: `secondary`,
        variant: `ghost`,
        pill: !1,
        iconSize: Ke,
        block: qe,
        uniform: o,
        "aria-label": Me,
        "aria-busy": Je,
        onClick: Ye,
        children: [We, Xe, Ze],
      })),
      (t[91] = o),
      (t[92] = Me),
      (t[93] = We),
      (t[94] = Ge),
      (t[95] = Ke),
      (t[96] = qe),
      (t[97] = Je),
      (t[98] = Ye),
      (t[99] = Xe),
      (t[100] = Ze),
      (t[101] = Qe))
    : (Qe = t[101]);
  let $e = Qe;
  if (
    u &&
    A &&
    _ === `chatgpt` &&
    !o &&
    N?.id === h &&
    N?.structure === `personal` &&
    N.plan_type !== `free`
  ) {
    let e = ge || void 0,
      n;
    t[102] !== Pe || t[103] !== We
      ? ((n = (0, A1.jsxs)(A1.Fragment, { children: [We, Pe] })),
        (t[102] = Pe),
        (t[103] = We),
        (t[104] = n))
      : (n = t[104]);
    let r;
    (t[105] !== Me || t[106] !== $e || t[107] !== He || t[108] !== e || t[109] !== n
      ? ((r = (0, A1.jsx)(oPo, {
          "aria-label": Me,
          "aria-busy": e,
          fallback: $e,
          icon: He,
          label: n,
        })),
        (t[105] = Me),
        (t[106] = $e),
        (t[107] = He),
        (t[108] = e),
        (t[109] = n),
        (t[110] = r))
      : (r = t[110]),
      ($e = r));
  }
  let et = o ? `justify-center` : `browser:grid browser:grid-cols-[minmax(0,1fr)_auto]`,
    tt;
  t[111] === et
    ? (tt = t[112])
    : ((tt = ng(`flex min-w-0 flex-1 items-center gap-0 sidebar-item`, et)),
      (t[111] = et),
      (t[112] = tt));
  let nt = !o && `browser:py-0.75`,
    rt;
  t[113] === nt
    ? (rt = t[114])
    : ((rt = ng(`flex min-w-0 flex-1 justify-center`, nt)), (t[113] = nt), (t[114] = rt));
  let it;
  t[115] !== w ||
  t[116] !== o ||
  t[117] !== s ||
  t[118] !== $e ||
  t[119] !== A ||
  t[120] !== c ||
  t[121] !== k ||
  t[122] !== De ||
  t[123] !== p
    ? ((it = A
        ? (0, A1.jsx)(ZNo, {
            defaultOpen: s,
            hideUsage: c,
            hasAmbientUsageSubtext: w != null,
            sidebarFooter: { modelProviderName: k, profileIdentity: De, width: o ? null : p },
            triggerButton: $e,
          })
        : $e),
      (t[115] = w),
      (t[116] = o),
      (t[117] = s),
      (t[118] = $e),
      (t[119] = A),
      (t[120] = c),
      (t[121] = k),
      (t[122] = De),
      (t[123] = p),
      (t[124] = it))
    : (it = t[124]);
  let at;
  t[125] !== rt || t[126] !== it
    ? ((at = (0, A1.jsx)(`div`, { className: rt, children: it })),
      (t[125] = rt),
      (t[126] = it),
      (t[127] = at))
    : (at = t[127]);
  let ot;
  t[128] !== Ie || t[129] !== He
    ? ((ot = null), (t[128] = Ie), (t[129] = He), (t[130] = ot))
    : (ot = t[130]);
  let st;
  t[131] === o
    ? (st = t[132])
    : ((st =
        !o &&
        (0, A1.jsxs)(A1.Fragment, { children: [(0, A1.jsx)(NNo, {}), (0, A1.jsx)(kMo, {})] })),
      (t[131] = o),
      (t[132] = st));
  let ct;
  return (
    t[133] !== tt || t[134] !== at || t[135] !== ot || t[136] !== null || t[137] !== st
      ? ((ct = (0, A1.jsxs)(`div`, { className: tt, children: [at, ot, null, st] })),
        (t[133] = tt),
        (t[134] = at),
        (t[135] = ot),
        (t[136] = null),
        (t[137] = st),
        (t[138] = ct))
      : (ct = t[138]),
    ct
  );
}
function aPo(e) {
  let t = (0, sPo.c)(8),
    n,
    r,
    i;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]))
    : (({ className: r, compact: i, ...n } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = i));
  let a = i ? `xl` : `lg`,
    o;
  return (
    t[4] !== n || t[5] !== r || t[6] !== a
      ? ((o = (0, A1.jsxs)(A1.Fragment, {
          children: [
            null,
            (0, A1.jsx)(A1.Fragment, {
              children: (0, A1.jsx)(Wa, { className: r, ...n, size: a }),
            }),
          ],
        })),
        (t[4] = n),
        (t[5] = r),
        (t[6] = a),
        (t[7] = o))
      : (o = t[7]),
    o
  );
}
function oPo(e) {
  let t = (0, sPo.c)(8),
    n,
    r;
  if (t[0] !== e) {
    let { fallback: i, icon: a, label: o, ...s } = e;
    ((r = null),
      (n = (0, cPo.cloneElement)(i, { ...s, className: ng(i.props.className, s.className) })),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r));
  } else ((n = t[1]), (r = t[2]));
  let i;
  t[3] === n
    ? (i = t[4])
    : ((i = (0, A1.jsx)(A1.Fragment, { children: n })), (t[3] = n), (t[4] = i));
  let a;
  return (
    t[5] !== r || t[6] !== i
      ? ((a = (0, A1.jsxs)(A1.Fragment, { children: [r, i] })), (t[5] = r), (t[6] = i), (t[7] = a))
      : (a = t[7]),
    a
  );
}
 xRt();
 function ProfileControl({snapshot,...props}){if(!snapshot)throw new TypeError('ProfileControl requires a snapshot');return h(Context.Provider,{value:snapshot},h(iPo,props));}
 return {ProfileControl,ProfileTrigger:aPo,ProfileLabel:DNo,ProfileSubtext:hNo,LoadingShimmer:iC,providerDisplayName:UNo};
}
