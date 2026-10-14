// Generated original avatar image/fallback/shape family.
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
export function createAvatar({React,animate,motionPreference,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!animate)throw new TypeError('Avatar requires original-compatible animate and React compiler runtime');
 const runtime={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
 const e=fn=>fn,J=()=>compilerRuntime,us=()=>React,W=()=>runtime,_0e=()=>{},ip=()=>{},dq=()=>{},Hg=()=>{},Qs=animate,ft=createMotionPreference(React,motionPreference);
 let w1,RMo,zMo,BMo,WMo,T1,GMo,JMo,XMo,ZMo,nNo,rNo,E1,iNo,aNo,oNo;
function M9i(e) {
  let t = e?.trim();
  return t == null || t.length === 0 ? null : t;
}
function t9i(e) {
  let t = M9i(e)?.split(/\s+/) ?? [],
    n = `${t[0]?.charAt(0) ?? ``}${t.length > 1 ? (t.at(-1)?.charAt(0) ?? ``) : ``}`.toUpperCase();
  return n.length > 0 ? n : `?`;
}
function FMo() {
  return (FMo = e(() => {
    w1 = {
      circle: {
        path: `M.5 0 A.5 .5 0 1 1 .5 1 A.5 .5 0 1 1 .5 0 Z`,
        transform: `matrix(1 0 0 1 0 0)`,
      },
      blossom: {
        path: `M27.7871 0C32.2803 0 36.3484 1.82053 39.2938 4.76436C40.6384 4.40475 42.0517 4.21282 43.5099 4.21282C52.4996 4.21282 59.7872 11.5004 59.7872 20.4901C59.7872 21.9482 59.5952 23.3615 59.2355 24.7062C62.1794 27.6516 64 31.7196 64 36.2129C64 43.7445 58.8846 50.0812 51.9386 51.9387C50.0811 58.8846 43.7445 64 36.2129 64C31.7197 64 27.6516 62.1793 24.7062 59.2355C23.3616 59.5952 21.9483 59.7872 20.4902 59.7872C11.5005 59.7872 4.2129 52.4995 4.21282 43.5098C4.21282 42.0517 4.40475 40.6383 4.76436 39.2937C1.82062 36.3483 0 32.2803 0 27.7871C0 20.2555 5.11526 13.9188 12.0612 12.0613C13.9187 5.11535 20.2554 0 27.7871 0Z`,
        transform: `matrix(0.015625 0 0 0.015625 0 0)`,
      },
      square: {
        path: `M.3 0 H.7 A.3 .3 0 0 1 1 .3 V.7 A.3 .3 0 0 1 .7 1 H.3 A.3 .3 0 0 1 0 .7 V.3 A.3 .3 0 0 1 .3 0 Z`,
        transform: `matrix(1 0 0 1 0 0)`,
      },
      oval: {
        path: `M.5 0 A.4 .5 0 1 1 .5 1 A.4 .5 0 1 1 .5 0 Z`,
        transform: `matrix(1 0 0 1 0 0)`,
      },
      scalloped: {
        path: `M26.5293 0C28.7234 0.000196771 30.5938 1.39236 31.3213 3.34766C32.2255 2.53648 33.4169 2.04297 34.7227 2.04297C37.5491 2.04301 39.8408 4.35261 39.8408 7.20117C39.8408 7.55849 39.804 7.90729 39.7354 8.24414C40.3321 7.99844 40.9855 7.8623 41.6699 7.8623C44.4962 7.86256 46.7871 10.172 46.7871 13.0205C46.7871 14.4484 46.2106 15.7399 45.2803 16.6738C45.6133 16.6051 45.9583 16.5693 46.3115 16.5693C49.1381 16.5693 51.4297 18.8789 51.4297 21.7275C51.4296 24.1537 49.7667 26.1862 47.5273 26.7363C47.5338 26.777 47.5396 26.8177 47.5459 26.8584C47.6758 26.8484 47.807 26.8418 47.9395 26.8418C50.766 26.8418 53.0576 29.1514 53.0576 32C53.0576 34.8486 50.766 37.1582 47.9395 37.1582C47.807 37.1582 47.6758 37.1506 47.5459 37.1406C47.5397 37.181 47.5337 37.2214 47.5273 37.2617C49.7669 37.8117 51.4297 39.8461 51.4297 42.2725C51.4296 45.121 49.138 47.4307 46.3115 47.4307C45.9583 47.4307 45.6134 47.3939 45.2803 47.3252L45.2881 47.333C46.2141 48.2663 46.787 49.5553 46.7871 50.9795C46.7871 53.828 44.4962 56.1374 41.6699 56.1377C40.9861 56.1377 40.3336 56.0011 39.7373 55.7559C39.8059 56.0927 39.8418 56.4415 39.8418 56.7988C39.8418 59.6473 37.5509 61.9568 34.7246 61.957C33.4179 61.957 32.2257 61.4626 31.3213 60.6504C30.5942 62.6065 28.724 63.9998 26.5293 64C24.335 64 22.4639 62.6077 21.7363 60.6523C20.8323 61.463 19.6422 61.957 18.3369 61.957C15.5104 61.957 13.2188 59.6474 13.2188 56.7988C13.2188 56.4413 13.2535 56.0919 13.3223 55.7549C12.7258 56.0003 12.0737 56.1377 11.3896 56.1377C8.56317 56.1376 6.27148 53.8281 6.27148 50.9795C6.27155 49.5522 6.84678 48.26 7.77637 47.3262C7.44416 47.3945 7.10028 47.4306 6.74805 47.4307C3.92151 47.4307 1.62988 45.1211 1.62988 42.2725C1.63 39.8471 3.29111 37.8136 5.5293 37.2627C5.52285 37.222 5.51607 37.1814 5.50977 37.1406C5.38045 37.1505 5.24998 37.1582 5.11816 37.1582C2.29163 37.1582 0 34.8486 0 32C3.47755e-05 29.1514 2.29165 26.8418 5.11816 26.8418C5.24995 26.8418 5.38048 26.8485 5.50977 26.8584C5.51606 26.8177 5.52188 26.777 5.52832 26.7363C3.29069 26.185 1.62994 24.1525 1.62988 21.7275C1.62988 18.8789 3.92151 16.5693 6.74805 16.5693C7.10093 16.5694 7.44554 16.6053 7.77832 16.6738C6.84803 15.7399 6.27148 14.4474 6.27148 13.0195C6.27173 10.1712 8.56332 7.86237 11.3896 7.8623C12.0735 7.8623 12.7259 7.99788 13.3223 8.24316C13.2538 7.9067 13.2188 7.55804 13.2188 7.20117C13.2188 4.35258 15.5104 2.04297 18.3369 2.04297C19.6419 2.04304 20.8324 2.53629 21.7363 3.34668C22.4641 1.39169 24.3353 0 26.5293 0Z`,
        transform: `matrix(0.015625 0 0 0.015625 0.0854875 0)`,
      },
    };
  }))();
}
function IMo(e) {
  let t = BMo.get(e);
  if (t) return t;
  let n = w1[e],
    r = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
  r.setAttribute(`d`, n.path);
  let i = new DOMMatrix(n.transform.replaceAll(` `, `, `)),
    a = r.getTotalLength(),
    o = Array.from({ length: zMo }, (e, t) => {
      let n = i.transformPoint(r.getPointAtLength((a * t) / zMo));
      return [n.x, n.y];
    }),
    s = Array.from({ length: RMo }, (e, t) => {
      let n = (t / RMo) * Math.PI * 2 - Math.PI / 2,
        r = Math.cos(n),
        i = Math.sin(n),
        a = 0;
      for (let e = 0; e < o.length; e++) {
        let t = o[e],
          n = o[(e + 1) % o.length],
          s = n[0] - t[0],
          c = n[1] - t[1],
          l = r * c - i * s;
        if (Math.abs(l) < 1e-12) continue;
        let u = t[0] - 0.5,
          d = t[1] - 0.5,
          f = (u * c - d * s) / l,
          p = (u * i - d * r) / l;
        f >= 0 && p >= 0 && p <= 1 && (a = Math.max(a, f));
      }
      return [0.5 + r * a, 0.5 + i * a];
    });
  return (BMo.set(e, s), s);
}
function LMo(e) {
  return (
    e.map(([e, t], n) => `${n === 0 ? `M` : `L`}${e.toFixed(6)} ${t.toFixed(6)}`).join(``) + `Z`
  );
}
function HMo(e) {
  let t = (0, WMo.c)(27),
    { shape: n, children: r, animateShape: i, hovered: a } = e,
    o = i !== void 0 && i,
    s = a !== void 0 && a,
    c = (0, T1.useId)(),
    l = ft(),
    u = (0, T1.useRef)(null),
    d = (0, T1.useRef)(n),
    f = (0, T1.useRef)(null),
    p = (0, T1.useRef)(null),
    m,
    h;
  (t[0] !== o || t[1] !== l || t[2] !== n
    ? ((m = () => {
        let e = u.current;
        if (e == null) return;
        let t = d.current;
        ((d.current = n),
          p.current?.stop(),
          (p.current = null),
          u.current?.setAttribute(`transform`, w1[n].transform));
        let r = () => {
          (e.setAttribute(`d`, w1[n].path),
            e.setAttribute(`transform`, w1[n].transform),
            (f.current = null));
        };
        if (!o || l || (t === n && f.current == null)) {
          r();
          return;
        }
        let i = f.current ?? IMo(t),
          a = IMo(n);
        (e.removeAttribute(`transform`), e.setAttribute(`d`, LMo(i)));
        let s = Qs(0, 1, {
          duration: 0.32,
          ease: UMo,
          onUpdate: (t) => {
            let n = i.map((e, n) => [e[0] + (a[n][0] - e[0]) * t, e[1] + (a[n][1] - e[1]) * t]);
            ((f.current = n), e.setAttribute(`d`, LMo(n)));
          },
          onComplete: r,
        });
        return () => s.stop();
      }),
      (h = [n, o, l]),
      (t[0] = o),
      (t[1] = l),
      (t[2] = n),
      (t[3] = m),
      (t[4] = h))
    : ((m = t[3]), (h = t[4])),
    (0, T1.useLayoutEffect)(m, h));
  let g, _;
  (t[5] !== o || t[6] !== s || t[7] !== l || t[8] !== n
    ? ((g = () => {
        if (!s || !o || l || n !== `blossom`) return;
        let e = setTimeout(() => {
          p.current ??= Qs(0, 360, {
            type: `spring`,
            stiffness: 70,
            damping: 14,
            mass: 1,
            restDelta: 0.05,
            restSpeed: 1,
            onUpdate: (e) =>
              u.current?.setAttribute(`transform`, `rotate(${e} .5 .5) ${w1[n].transform}`),
            onComplete: () => {
              (u.current?.setAttribute(`transform`, w1[n].transform), (p.current = null));
            },
          });
        }, 1e3);
        return () => clearTimeout(e);
      }),
      (_ = [s, o, l, n]),
      (t[5] = o),
      (t[6] = s),
      (t[7] = l),
      (t[8] = n),
      (t[9] = g),
      (t[10] = _))
    : ((g = t[9]), (_ = t[10])),
    (0, T1.useEffect)(g, _));
  let v, y;
  (t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((v = () => () => p.current?.stop()), (y = []), (t[11] = v), (t[12] = y))
    : ((v = t[11]), (y = t[12])),
    (0, T1.useEffect)(v, y));
  let b = w1[n],
    x = w1[n],
    S;
  t[13] !== x.transform || t[14] !== b.path
    ? ((S = (0, GMo.jsx)(`path`, { ref: u, d: b.path, transform: x.transform })),
      (t[13] = x.transform),
      (t[14] = b.path),
      (t[15] = S))
    : (S = t[15]);
  let C;
  t[16] !== c || t[17] !== S
    ? ((C = (0, GMo.jsx)(`svg`, {
        "aria-hidden": !0,
        className: `absolute size-0`,
        focusable: `false`,
        children: (0, GMo.jsx)(`defs`, {
          children: (0, GMo.jsx)(`clipPath`, {
            id: c,
            clipPathUnits: `objectBoundingBox`,
            children: S,
          }),
        }),
      })),
      (t[16] = c),
      (t[17] = S),
      (t[18] = C))
    : (C = t[18]);
  let w = `url(#${c})`,
    T;
  t[19] === w ? (T = t[20]) : ((T = { clipPath: w }), (t[19] = w), (t[20] = T));
  let E;
  t[21] !== r || t[22] !== T
    ? ((E = (0, GMo.jsx)(`span`, { className: `relative inline-flex`, style: T, children: r })),
      (t[21] = r),
      (t[22] = T),
      (t[23] = E))
    : (E = t[23]);
  let D;
  return (
    t[24] !== C || t[25] !== E
      ? ((D = (0, GMo.jsxs)(`span`, {
          className: `relative inline-flex shrink-0`,
          children: [C, E],
        })),
        (t[24] = C),
        (t[25] = E),
        (t[26] = D))
      : (D = t[26]),
    D
  );
}
function UMo(e) {
  let t = (e) => 1 - Math.exp(-8 * e) * (Math.cos(10 * e) + 0.8 * Math.sin(10 * e));
  return t(e) / t(1);
}
function VMo() {
  return (VMo = e(() => {
    (FMo(), (RMo = 384), (zMo = 1536), (BMo = new Map()));
  }))();
}
function KMo() {
  return (KMo = e(() => {
    ((WMo = J()), _0e(), (T1 = us()), ip(), VMo(), (GMo = W()));
  }))();
}
function qMo(e, t = 0) {
  let n = 0;
  for (let t of e.split(`__`)[0]) n = (n * 31 + (t.codePointAt(0) ?? 0)) % JMo.length;
  return JMo[(n + t) % JMo.length];
}
function YMo() {
  return (YMo = e(() => {
    JMo = [`blue`, `purple`, `green`, `yellow`, `red`];
  }))();
}
function QMo() {
  return (QMo = e(() => {
    ((XMo = `_loaded_184qc_10`), (ZMo = { loaded: XMo, "image-loaded": `_image-loaded_184qc_22` }));
  }))();
}
function $Mo(e) {
  let t = (0, nNo.c)(8),
    n;
  t[0] === e
    ? (n = t[1])
    : ((n =
        e.src == null ? (0, E1.jsx)(tNo, { ...e }) : (0, E1.jsx)(eNo, { ...e, src: e.src }, e.src)),
      (t[0] = e),
      (t[1] = n));
  let r = n;
  if ((e.shape == null || e.shape === `circle`) && e.overlay == null && !e.animateShape) return r;
  let i = e.shape ?? `circle`,
    a;
  return (
    t[2] !== r || t[3] !== e.animateShape || t[4] !== e.hovered || t[5] !== e.overlay || t[6] !== i
      ? ((a = (0, E1.jsxs)(HMo, {
          shape: i,
          animateShape: e.animateShape,
          hovered: e.hovered,
          children: [r, e.overlay],
        })),
        (t[2] = r),
        (t[3] = e.animateShape),
        (t[4] = e.hovered),
        (t[5] = e.overlay),
        (t[6] = i),
        (t[7] = a))
      : (a = t[7]),
    a
  );
}
function eNo(e) {
  let t = (0, nNo.c)(26),
    [n, r] = (0, rNo.useState)(`loading`);
  if (n !== `error`) {
    let i;
    t[0] !== e.fadeIn || t[1] !== e.loadingFallback
      ? ((i =
          e.loadingFallback == null && !e.fadeIn
            ? void 0
            : (e) => {
                e?.complete && r(e.naturalWidth > 0 ? `loaded` : `error`);
              }),
        (t[0] = e.fadeIn),
        (t[1] = e.loadingFallback),
        (t[2] = i))
      : (i = t[2]);
    let a = e.alt,
      o = e.fadeIn && (n === `loaded` ? ZMo.loaded : `opacity-0`),
      s = !e.animateShape && (e.shape == null || e.shape === `circle`) && `rounded-full`,
      c = iNo[e.size ?? `sm`],
      l;
    t[3] !== o || t[4] !== s || t[5] !== c
      ? ((l = ng(`shrink-0 object-cover`, o, s, c)), (t[3] = o), (t[4] = s), (t[5] = c), (t[6] = l))
      : (l = t[6]);
    let u = n === `loading` && e.loadingFallback != null,
      d;
    t[7] !== e.fadeIn || t[8] !== e.loadingFallback
      ? ((d = e.loadingFallback == null && !e.fadeIn ? void 0 : () => r(`loaded`)),
        (t[7] = e.fadeIn),
        (t[8] = e.loadingFallback),
        (t[9] = d))
      : (d = t[9]);
    let f;
    t[10] === e
      ? (f = t[11])
      : ((f = () => {
          (r(`error`), e.onImageError?.());
        }),
        (t[10] = e),
        (t[11] = f));
    let p;
    t[12] !== e.alt ||
    t[13] !== e.referrerPolicy ||
    t[14] !== e.src ||
    t[15] !== i ||
    t[16] !== l ||
    t[17] !== u ||
    t[18] !== d ||
    t[19] !== f
      ? ((p = (0, E1.jsx)(`img`, {
          ref: i,
          alt: a,
          className: l,
          draggable: !1,
          hidden: u,
          referrerPolicy: e.referrerPolicy,
          src: e.src,
          onLoad: d,
          onError: f,
        })),
        (t[12] = e.alt),
        (t[13] = e.referrerPolicy),
        (t[14] = e.src),
        (t[15] = i),
        (t[16] = l),
        (t[17] = u),
        (t[18] = d),
        (t[19] = f),
        (t[20] = p))
      : (p = t[20]);
    let m = n === `loading` ? e.loadingFallback : null,
      h;
    return (
      t[21] !== m || t[22] !== p
        ? ((h = (0, E1.jsxs)(E1.Fragment, { children: [p, m] })),
          (t[21] = m),
          (t[22] = p),
          (t[23] = h))
        : (h = t[23]),
      h
    );
  }
  let i;
  return (
    t[24] === e ? (i = t[25]) : ((i = (0, E1.jsx)(tNo, { ...e })), (t[24] = e), (t[25] = i)),
    i
  );
}
function tNo(e) {
  let t = (0, nNo.c)(18),
    {
      alt: n,
      colorKey: r,
      fallback: i,
      fallbackIcon: a,
      name: o,
      size: s,
      shape: c,
      animateShape: l,
    } = e,
    u = s === void 0 ? `sm` : s,
    d = c === void 0 ? `circle` : c,
    f = l !== void 0 && l;
  if (i != null) return i;
  let p;
  if (t[0] !== o || t[1] !== u) {
    let e = t9i(o);
    ((p = u === `badge` || u === `inline` || u === `xs` ? Array.from(e)[0] : e),
      (t[0] = o),
      (t[1] = u),
      (t[2] = p));
  } else p = t[2];
  let m = p,
    h = r || o?.trim(),
    g = h ? oNo[qMo(h)] : `bg-avatar-gray`,
    _ = !n || void 0,
    v = n || void 0,
    y = !f && d === `circle` && `rounded-full`,
    b = iNo[u],
    x = aNo[u],
    S;
  t[3] !== g || t[4] !== y || t[5] !== b || t[6] !== x
    ? ((S = ng(
        `flex shrink-0 items-center justify-center font-normal text-avatar-foreground select-none`,
        y,
        g,
        b,
        x,
      )),
      (t[3] = g),
      (t[4] = y),
      (t[5] = b),
      (t[6] = x),
      (t[7] = S))
    : (S = t[7]);
  let C = n ? `img` : void 0,
    w;
  t[8] !== a || t[9] !== m || t[10] !== u
    ? ((w =
        a ??
        (u === `badge` || u === `inline`
          ? (0, E1.jsx)(`svg`, {
              "aria-hidden": !0,
              className: `size-full`,
              viewBox: `0 0 12 12`,
              children: (0, E1.jsx)(`text`, {
                x: `6`,
                y: `6`,
                dominantBaseline: `central`,
                textAnchor: `middle`,
                fill: `currentColor`,
                children: m,
              }),
            })
          : m)),
      (t[8] = a),
      (t[9] = m),
      (t[10] = u),
      (t[11] = w))
    : (w = t[11]);
  let T;
  return (
    t[12] !== S || t[13] !== C || t[14] !== w || t[15] !== _ || t[16] !== v
      ? ((T = (0, E1.jsx)(`span`, {
          "aria-hidden": _,
          "aria-label": v,
          className: S,
          role: C,
          children: w,
        })),
        (t[12] = S),
        (t[13] = C),
        (t[14] = w),
        (t[15] = _),
        (t[16] = v),
        (t[17] = T))
      : (T = t[17]),
    T
  );
}
function D1() {
  return (D1 = e(() => {
    ((nNo = J()),
      dq(),
      Hg(),
      (rNo = us()),
      KMo(),
      YMo(),
      QMo(),
      (E1 = W()),
      (iNo = {
        badge: `size-3`,
        inline: `size-4`,
        xs: `icon-sm`,
        response: `size-5`,
        sm: `size-6`,
        group: `size-7`,
        md: `size-8`,
        row: `size-10`,
        picker: `size-12`,
        lg: `size-20`,
        profile: `size-28`,
        xl: `size-32`,
        preview: `size-48`,
        fill: `size-full`,
      }),
      (aNo = {
        badge: `text-[6px] leading-none`,
        inline: `text-[6px] leading-none`,
        xs: `text-[10px] leading-none`,
        response: `text-[10px] leading-none`,
        sm: `text-xs`,
        group: `text-xs`,
        md: `text-sm`,
        row: `text-sm`,
        picker: `text-lg`,
        lg: `text-[28px]`,
        profile: `text-[40px]`,
        xl: `text-[40px]`,
        preview: `text-5xl`,
        fill: `text-5xl`,
      }),
      (oNo = {
        blue: `bg-avatar-blue`,
        purple: `bg-avatar-purple`,
        green: `bg-avatar-green`,
        yellow: `bg-avatar-yellow`,
        red: `bg-avatar-red`,
      }));
  }))();
}
 D1();
 return {Avatar:$Mo,AvatarFallback:tNo,AvatarImage:eNo,AvatarShape:HMo,avatarInitials:t9i,avatarColorKey:qMo,avatarShapes:w1};
}
