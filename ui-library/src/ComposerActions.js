// Generated original composer action and morph geometry. See composer-actions-manifest.json.
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
export function createComposerActions({React,motion,Spinner,ResponsiveIcon,AssetIcon,Tooltip,morphingEnabled=false,motionPreference}){
 const e=fn=>fn,t=e,us=()=>{},o=us;
 const runtime={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},W=()=>runtime,K=W;
 const rRt={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},FLt=rRt,$Lt=rRt,iRt=React,eRt=React,nC=runtime,ILt=runtime,tC=runtime,Kl=motion;
 const ft=createMotionPreference(React,motionPreference),fs=key=>Boolean(key && morphingEnabled),ei=Spinner,rm=ResponsiveIcon;
 function missingTooltip(){throw new Error('Composer action tooltips require a recovered-compatible Tooltip adapter');}
 const Pn=Tooltip??missingTooltip;
 const aRt={default:'bg-composer-primary p-0.5 focus-visible:outline-background-composer-primary',voiceEnd:'bg-codex-icon p-0.5 focus-visible:outline-codex-icon'};
 let mCi,hCi,jLt,MLt,GLt,KLt,qLt,JLt,YLt,k5,A5,j5,YSi,XSi,ZSi,Tcr;
 const Q=()=>{},Z=preset=>({...preset,body:preset.body.trim(),hasGradients:false});
function gCi() {
  return (gCi = t(() => {
    (o(),
      (mCi = K()),
      (hCi = (e) =>
        (0, mCi.jsx)(`svg`, {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          fill: `none`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: (0, mCi.jsx)(`path`, {
            d: `M9.33467 16.6663V4.93978L4.6374 9.63704L4.1667 9.16634L3.69599 8.69661L9.52998 2.86263L9.63447 2.77767C9.8925 2.60753 10.2433 2.63564 10.4704 2.86263L16.3034 8.69661L16.3884 8.80111C16.5588 9.05922 16.5306 9.40982 16.3034 9.63704C16.0762 9.86414 15.7255 9.89242 15.4675 9.722L15.363 9.63704L10.6647 4.9388V16.6663C10.6647 17.0336 10.367 17.3314 9.99971 17.3314C9.63259 17.3312 9.33467 17.0335 9.33467 16.6663ZM4.6374 9.63704C4.3777 9.89674 3.95569 9.89674 3.69599 9.63704C3.43657 9.37744 3.43668 8.95628 3.69599 8.69661L4.6374 9.63704Z`,
            fill: `currentColor`,
          }),
        })));
  }))();
}
function QSi() {
  return (QSi = t(() => {
    ((k5 = [0.4, 0, 0.2, 1]),
      (A5 = { rotate: 0, y: 0, scale: 1 }),
      (j5 = { duration: 0.52, ease: k5, times: [0, 0.22, 0.72, 1] }),
      (YSi = {
        duration: 0.48,
        ease: k5,
        times: [0, 0.22, 0.78, 1],
        rotate: { duration: 0.48, ease: k5, times: [0, 0.78, 1] },
      }),
      (XSi = { duration: 0.34, delay: 0.055, ease: k5 }),
      (ZSi = {
        toVoice: {
          rest: A5,
          transform: {
            rotate: [null, 3, -1, 0],
            y: [null, -0.5, 0.4, 0],
            scale: [null, 0.9, 1.04, 1],
          },
          transformTransition: j5,
          pathTransition: { ...j5, times: [0, 0.43, 0.67, 1] },
        },
        voiceToSend: {
          rest: A5,
          transform: {
            rotate: [null, -3, 1, 0],
            y: [null, 0.5, -1.4, 0],
            scale: [null, 0.88, 1.055, 1],
          },
          transformTransition: j5,
          pathTransition: { ...j5, times: [0, 0.21, 0.43, 1] },
        },
        toStop: {
          rest: { ...A5, rotate: 90 },
          transform: {
            rotate: [null, 96, 90],
            y: [null, -2.5, 0.2, 0],
            scale: [null, 1.07, 0.96, 1],
          },
          transformTransition: YSi,
          pathTransition: XSi,
        },
        stopToSend: {
          rest: A5,
          transform: {
            rotate: [null, -6, 0],
            y: [null, 0.5, -0.8, 0],
            scale: [null, 0.94, 1.03, 1],
          },
          transformTransition: YSi,
          pathTransition: XSi,
        },
      }));
  }))();
}
function Ecr() {
  return (Ecr = t(() => {
    (Q(),
      (Tcr = Z({
        name: `voice-regular-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 2.25, y: 1.916748, width: 11.833984, height: 12.166992 },
          visualBounds: { x: 2.25, y: 1.916748, width: 11.833984, height: 12.166992 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 2.25, y: 1.916748, width: 11.833984, height: 12.166992 },
          center: { x: 8.166992, y: 8.000244 },
          insets: { top: 1.916748, right: 1.916016, bottom: 1.91626, left: 2.25 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 8.166992, y: 8.000244 },
            foreground: { x: 8.166992, y: 8.000244 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M6.44434 1.91675C6.85855 1.91675 7.19434 2.25253 7.19434 2.66675V13.3337C7.19412 13.7478 6.85841 14.0837 6.44434 14.0837C6.03037 14.0836 5.69455 13.7477 5.69434 13.3337V2.66675C5.69434 2.25262 6.03023 1.91688 6.44434 1.91675Z" fill="currentColor"/> <path d="M9.88867 3.74976C10.3028 3.74976 10.6385 4.08565 10.6387 4.49976V11.1667C10.6385 11.5808 10.3028 11.9167 9.88867 11.9167C9.47468 11.9166 9.13885 11.5807 9.13867 11.1667V4.49976C9.1388 4.08574 9.47465 3.74989 9.88867 3.74976Z" fill="currentColor"/> <path d="M3 5.41675C3.41421 5.41675 3.75 5.75253 3.75 6.16675V9.83374C3.74982 10.2478 3.41411 10.5837 3 10.5837C2.58589 10.5837 2.25018 10.2478 2.25 9.83374V6.16675C2.25 5.75253 2.58579 5.41675 3 5.41675Z" fill="currentColor"/> <path d="M13.334 5.91675C13.748 5.91701 14.084 6.2527 14.084 6.66675V9.33374C14.0838 9.74764 13.7479 10.0835 13.334 10.0837C12.9199 10.0837 12.5842 9.7478 12.584 9.33374V6.66675C12.584 6.25253 12.9198 5.91675 13.334 5.91675Z" fill="currentColor"/>`,
      })));
  }))();
}
 gCi();QSi();Ecr();const rBe=hCi,xte=ZSi;
 const VWe=props=>React.createElement(AssetIcon,{...props,asset:Tcr,className:ng('_Icon_uttcz_1',props.className),focusable:props.focusable??'false'});
function NLt() {
  return (NLt = e(() => {
    (us(),
      (jLt = W()),
      (MLt = (e) =>
        (0, jLt.jsx)(`svg`, {
          width: 20,
          height: 20,
          viewBox: `0 0 20 20`,
          fill: `currentColor`,
          xmlns: `http://www.w3.org/2000/svg`,
          ...e,
          children: (0, jLt.jsx)(`path`, {
            d: `M4.5 5.75C4.5 5.05964 5.05964 4.5 5.75 4.5H14.25C14.9404 4.5 15.5 5.05964 15.5 5.75V14.25C15.5 14.9404 14.9404 15.5 14.25 15.5H5.75C5.05964 15.5 4.5 14.9404 4.5 14.25V5.75Z`,
          }),
        })));
  }))();
}
function PLt(e) {
  let t = (0, FLt.c)(2),
    { className: n } = e,
    r;
  return (
    t[0] === n
      ? (r = t[1])
      : ((r = (0, ILt.jsxs)(ILt.Fragment, {
          children: [
            null,
            (0, ILt.jsx)(ILt.Fragment, { children: (0, ILt.jsx)(VWe, { className: n }) }),
          ],
        })),
        (t[0] = n),
        (t[1] = r)),
    r
  );
}
function RLt(e, t, n) {
  return n.map(([n, r, i]) => BLt([n * e, r * e], [n * e, i * e], t * e));
}
function zLt(e, t, n, r, i) {
  return VLt(
    [
      [e, t],
      [e + n, t],
      [e + n, t + r],
      [e, t + r],
    ],
    i,
  );
}
function BLt(e, t, n) {
  let r = Math.hypot(t[0] - e[0], t[1] - e[1]),
    i = [(((t[1] - e[1]) / r) * n) / 2, (((e[0] - t[0]) / r) * n) / 2],
    a = [-i[1], i[0]];
  return VLt(
    [
      [e[0] - i[0] - a[0], e[1] - i[1] - a[1]],
      [e[0] + i[0] - a[0], e[1] + i[1] - a[1]],
      [t[0] + i[0] + a[0], t[1] + i[1] + a[1]],
      [t[0] - i[0] + a[0], t[1] - i[1] + a[1]],
    ],
    n / 2,
  );
}
function VLt([e, t, n, r], i) {
  let a = [HLt(r, e, t, i), HLt(e, t, n, i), HLt(t, n, r, i), HLt(n, r, e, i)];
  return WLt(
    a[3].after,
    a.flatMap(({ before: e, after: t, vertex: n }) => [
      [e, e, e],
      [ULt(e, n, 0.552285), ULt(t, n, 0.552285), t],
    ]),
  );
}
function HLt(e, t, n, r) {
  return {
    before: ULt(t, e, r === 0 ? 0 : Math.min(0.5, r / Math.hypot(e[0] - t[0], e[1] - t[1]))),
    after: ULt(t, n, r === 0 ? 0 : Math.min(0.5, r / Math.hypot(n[0] - t[0], n[1] - t[1]))),
    vertex: t,
  };
}
function ULt(e, t, n) {
  return [e[0] + (t[0] - e[0]) * n, e[1] + (t[1] - e[1]) * n];
}
function WLt(e, t) {
  return `M${e.map((e) => e.toFixed(4)).join(` `)} ${t
    .map(
      (e) =>
        `C${e
          .flat()
          .map((e) => e.toFixed(4))
          .join(` `)}`,
    )
    .join(` `)} Z`;
}
function XLt() {
  return (XLt = e(() => {
    ((GLt = zLt(10, 10, 0, 0, 0)),
      (KLt = {
        send: [
          BLt([10, 4.5], [10, 16.667], 1.33),
          BLt([4.167, 9.167], [10, 3.333], 1.33),
          BLt([10, 3.333], [15.833, 9.167], 1.33),
          GLt,
        ],
        stop: [zLt(4.5, 4.5, 11, 11, 1.25), GLt, GLt, GLt],
      }),
      (qLt = {
        16: RLt(1.25, 1.5, [
          [6.44434, 2.66675, 13.3337],
          [3, 9.83374, 6.16675],
          [9.88867, 4.49976, 11.1667],
          [13.334, 6.66675, 9.33374],
        ]),
        20: RLt(1, 1.75, [
          [8.22266, 3.33325, 16.6663],
          [4, 12.1663, 7.83325],
          [12.4443, 5.50024, 13.8333],
          [16.667, 8.33325, 11.6663],
        ]),
      }),
      (JLt = RLt(1, 1.5, [
        [10, 4.25, 15.75],
        [7, 12.5, 7.5],
        [11.9, 6.5, 13.5],
        [13.6, 8.5, 11.5],
      ])),
      (YLt = [
        BLt([10, 3.333], [10, 16.667], 1.33),
        BLt([10, 9.167], [10, 3.333], 1.33),
        BLt([10, 3.333], [10, 9.167], 1.33),
        GLt,
      ]));
  }))();
}
function ZLt(e) {
  let t = (0, $Lt.c)(4),
    { className: n, isLoading: r, state: i } = e,
    a;
  return (
    t[0] !== n || t[1] !== r || t[2] !== i
      ? ((a = (0, tC.jsxs)(tC.Fragment, {
          children: [
            null,
            (0, tC.jsx)(tC.Fragment, {
              children: (0, tC.jsx)(QLt, {
                className: n,
                isLoading: r,
                state: i,
                voicePaths: qLt[16],
              }),
            }),
          ],
        })),
        (t[0] = n),
        (t[1] = r),
        (t[2] = i),
        (t[3] = a))
      : (a = t[3]),
    a
  );
}
function QLt(e) {
  let t = (0, $Lt.c)(27),
    { className: n, isLoading: r, state: i, voicePaths: a } = e,
    o = ft(),
    s;
  t[0] === i ? (s = t[1]) : ((s = { from: i, to: i }), (t[0] = i), (t[1] = s));
  let [c, l] = (0, eRt.useState)(s);
  c.to !== i && l({ from: c.to, to: i });
  let u = i === `voice` || (i === `send` && c.from === `voice`),
    d = i === `voice` ? a : KLt[i],
    f;
  t[2] !== u || t[3] !== i
    ? ((f =
        i === `voice`
          ? xte.toVoice
          : u
            ? xte.voiceToSend
            : i === `stop`
              ? xte.toStop
              : xte.stopToSend),
      (t[2] = u),
      (t[3] = i),
      (t[4] = f))
    : (f = t[4]);
  let p = r && !o && `animate-pulse`,
    m;
  t[5] !== n || t[6] !== p ? ((m = ng(n, p)), (t[5] = n), (t[6] = p), (t[7] = m)) : (m = t[7]);
  let h = o ? f.rest : f.transform,
    g;
  t[8] !== f.transformTransition || t[9] !== o
    ? ((g = o ? { duration: 0 } : f.transformTransition),
      (t[8] = f.transformTransition),
      (t[9] = o),
      (t[10] = g))
    : (g = t[10]);
  let _;
  if (t[11] !== u || t[12] !== f.pathTransition || t[13] !== d || t[14] !== o || t[15] !== i) {
    let e;
    (t[17] !== u || t[18] !== f.pathTransition || t[19] !== o || t[20] !== i
      ? ((e = (e, t) => {
          let n = e;
          return (
            !o && u && (n = i === `voice` ? [null, YLt[t], JLt[t], e] : [null, JLt[t], YLt[t], e]),
            (0, tC.jsx)(
              Kl.path,
              {
                initial: !1,
                animate: { d: n },
                transition: o ? { duration: 0 } : f.pathTransition,
              },
              t,
            )
          );
        }),
        (t[17] = u),
        (t[18] = f.pathTransition),
        (t[19] = o),
        (t[20] = i),
        (t[21] = e))
      : (e = t[21]),
      (_ = d.map(e)),
      (t[11] = u),
      (t[12] = f.pathTransition),
      (t[13] = d),
      (t[14] = o),
      (t[15] = i),
      (t[16] = _));
  } else _ = t[16];
  let v;
  return (
    t[22] !== m || t[23] !== h || t[24] !== g || t[25] !== _
      ? ((v = (0, tC.jsx)(Kl.svg, {
          className: m,
          "aria-hidden": `true`,
          focusable: `false`,
          viewBox: `0 0 20 20`,
          fill: `currentColor`,
          initial: !1,
          animate: h,
          transition: g,
          children: _,
        })),
        (t[22] = m),
        (t[23] = h),
        (t[24] = g),
        (t[25] = _),
        (t[26] = v))
      : (v = t[26]),
    v
  );
}
function nRt(e) {
  let t = (0, rRt.c)(48),
    {
      ref: n,
      className: r,
      isLoading: i,
      disabled: a,
      ariaLabel: o,
      ariaDescribedBy: s,
      fullBleedIcon: c,
      supportsMorphing: l,
      Icon: u,
      iconSource: d,
      keyboardShortcutLabel: f,
      blockedReason: p,
      blockedReasonOpenNonce: m,
      disableTooltip: h,
      tooltipContent: g,
      tooltipShortcut: _,
      type: v,
      variant: y,
      onClick: b,
    } = e,
    x = a !== void 0 && a,
    S = c !== void 0 && c,
    C = l !== void 0 && l,
    w = u === void 0 ? rBe : u,
    T = h !== void 0 && h,
    E = v === void 0 ? `button` : v,
    D = y === void 0 ? `default` : y,
    O = fs(C && `2718448475`),
    [k, A] = (0, iRt.useState)(!1);
  (g == null || T) && k && A(!1);
  let j = S && !i && f == null,
    M = j ? `size-full` : `icon-primary-action text-composer-primary`,
    N = m != null && p != null,
    P = i || x,
    F;
  if (O && f == null && (w === rBe || w === MLt || w === PLt)) {
    let e = `voice`;
    w === rBe ? (e = `send`) : w === MLt && (e = `stop`);
    let n;
    (t[0] !== M || t[1] !== i || t[2] !== e
      ? ((n = (0, nC.jsx)(ZLt, { className: M, isLoading: i, state: e })),
        (t[0] = M),
        (t[1] = i),
        (t[2] = e),
        (t[3] = n))
      : (n = t[3]),
      (F = n));
  } else if (i) {
    let e;
    (t[4] === M ? (e = t[5]) : ((e = (0, nC.jsx)(ei, { className: M })), (t[4] = M), (t[5] = e)),
      (F = e));
  } else if (f != null) {
    let e;
    (t[6] === f
      ? (e = t[7])
      : ((e = (0, nC.jsx)(`span`, {
          className: `text-xs text-composer-primary select-none`,
          children: f,
        })),
        (t[6] = f),
        (t[7] = e)),
      (F = e));
  } else if (d != null) {
    let e;
    (t[8] === d
      ? (e = t[9])
      : ((e = (0, nC.jsx)(rm, { className: `text-composer-primary`, icon: d })),
        (t[8] = d),
        (t[9] = e)),
      (F = e));
  } else {
    let e;
    (t[10] !== w || t[11] !== M
      ? ((e = (0, nC.jsx)(w, { className: M })), (t[10] = w), (t[11] = M), (t[12] = e))
      : (e = t[12]),
      (F = e));
  }
  let I = O && `shrink-0`,
    L = j ? `bg-transparent p-0 focus-visible:outline-background-composer-primary` : aRt[D],
    R = P && `cursor-default opacity-50`,
    z = !P && !!p && `opacity-50`,
    B;
  t[13] !== r || t[14] !== R || t[15] !== z || t[16] !== I || t[17] !== L
    ? ((B = ng(
        `cursor-interaction size-token-button-composer flex items-center justify-center rounded-full transition-opacity focus-visible:outline-2`,
        I,
        L,
        R,
        z,
        r,
      )),
      (t[13] = r),
      (t[14] = R),
      (t[15] = z),
      (t[16] = I),
      (t[17] = L),
      (t[18] = B))
    : (B = t[18]);
  let V = P || void 0,
    H = i || void 0,
    ee = i || (x && p == null),
    U;
  t[19] !== P || t[20] !== b
    ? ((U = (e) => {
        if (P) {
          e.preventDefault();
          return;
        }
        b?.(e);
      }),
      (t[19] = P),
      (t[20] = b),
      (t[21] = U))
    : (U = t[21]);
  let te;
  t[22] !== s ||
  t[23] !== o ||
  t[24] !== F ||
  t[25] !== n ||
  t[26] !== B ||
  t[27] !== V ||
  t[28] !== H ||
  t[29] !== ee ||
  t[30] !== U ||
  t[31] !== E
    ? ((te = (0, nC.jsx)(`button`, {
        ref: n,
        type: E,
        className: B,
        "aria-disabled": V,
        "aria-busy": H,
        "aria-label": o,
        "aria-describedby": s,
        disabled: ee,
        onClick: U,
        children: F,
      })),
      (t[22] = s),
      (t[23] = o),
      (t[24] = F),
      (t[25] = n),
      (t[26] = B),
      (t[27] = V),
      (t[28] = H),
      (t[29] = ee),
      (t[30] = U),
      (t[31] = E),
      (t[32] = te))
    : (te = t[32]);
  let ne = te;
  if (p == null || m === null || (!x && !N)) {
    if (!O && g == null) return ne;
    let e = g ?? ``,
      n = g != null && !T && k,
      r = g == null || T,
      i;
    t[33] !== T || t[34] !== g
      ? ((i = (e) => {
          A(g != null && !T && e);
        }),
        (t[33] = T),
        (t[34] = g),
        (t[35] = i))
      : (i = t[35]);
    let a;
    return (
      t[36] !== ne || t[37] !== e || t[38] !== n || t[39] !== r || t[40] !== i || t[41] !== _
        ? ((a = (0, nC.jsx)(Pn, {
            closeOnTriggerClick: !0,
            tooltipContent: e,
            shortcut: _,
            open: n,
            disableHoverOpen: r,
            onOpenChange: i,
            children: ne,
          })),
          (t[36] = ne),
          (t[37] = e),
          (t[38] = n),
          (t[39] = r),
          (t[40] = i),
          (t[41] = _),
          (t[42] = a))
        : (a = t[42]),
      a
    );
  }
  let re = N ? `forced-${m}` : `blocked`,
    ie;
  return (
    t[43] !== p || t[44] !== ne || t[45] !== N || t[46] !== re
      ? ((ie = (0, nC.jsx)(
          Pn,
          {
            defaultOpen: N,
            tooltipContent: p,
            tooltipClassName: `max-w-36`,
            tooltipBodyClassName: `text-center text-pretty`,
            children: ne,
          },
          re,
        )),
        (t[43] = p),
        (t[44] = ne),
        (t[45] = N),
        (t[46] = re),
        (t[47] = ie))
      : (ie = t[47]),
    ie
  );
}
 NLt();XLt();
 return {ComposerPrimaryAction:nRt,ComposerSendIcon:rBe,ComposerStopIcon:MLt,ComposerVoiceIcon:PLt,ComposerMorphingIcon:ZLt};
}
