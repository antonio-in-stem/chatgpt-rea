// Generated original tooltip, provider, portal and floating-positioning engine.
// See tooltip-manifest.json. React compiler cache is retained through its runtime.
import {classNames as q} from './classNames.js';
export function createTooltip({React,ReactDOM,ShortcutBadge,visualScale=1,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!ReactDOM?.createPortal||!ReactDOM?.flushSync)throw new TypeError('React compiler runtime and ReactDOM portal/flushSync are required');
 const t=fn=>fn,n=value=>value,o=()=>React,ph=()=>ReactDOM;
function _Oe(e, t, n) {
  return Bv(e, zv(t, n));
}
function Fv(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function Iv(e) {
  return e.split(`-`)[0];
}
function Lv(e) {
  return e.split(`-`)[1];
}
function vOe(e) {
  return e === `x` ? `y` : `x`;
}
function yOe(e) {
  return e === `y` ? `height` : `width`;
}
function Rv(e) {
  let t = e[0];
  return t === `t` || t === `b` ? `y` : `x`;
}
function bOe(e) {
  return vOe(Rv(e));
}
function xOe(e, t, n) {
  n === void 0 && (n = !1);
  let r = Lv(e),
    i = bOe(e),
    a = yOe(i),
    o =
      i === `x`
        ? r === (n ? `end` : `start`)
          ? `right`
          : `left`
        : r === `start`
          ? `bottom`
          : `top`;
  return (t.reference[a] > t.floating[a] && (o = EOe(o)), [o, EOe(o)]);
}
function SOe(e) {
  let t = EOe(e);
  return [COe(e), t, COe(t)];
}
function COe(e) {
  return e.includes(`start`) ? e.replace(`start`, `end`) : e.replace(`end`, `start`);
}
function wOe(e, t, n) {
  switch (e) {
    case `top`:
    case `bottom`:
      return n ? (t ? NOe : MOe) : t ? MOe : NOe;
    case `left`:
    case `right`:
      return t ? POe : FOe;
    default:
      return [];
  }
}
function TOe(e, t, n, r) {
  let i = Lv(e),
    a = wOe(Iv(e), n === `start`, r);
  return (i && ((a = a.map((e) => e + `-` + i)), t && (a = a.concat(a.map(COe)))), a);
}
function EOe(e) {
  let t = Iv(e);
  return jOe[t] + e.slice(t.length);
}
function DOe(e) {
  return { top: e.top ?? 0, right: e.right ?? 0, bottom: e.bottom ?? 0, left: e.left ?? 0 };
}
function OOe(e) {
  return typeof e == `number` ? { top: e, right: e, bottom: e, left: e } : DOe(e);
}
function kOe(e) {
  let { x: t, y: n, width: r, height: i } = e;
  return { width: r, height: i, top: n, left: t, right: t + r, bottom: n + i, x: t, y: n };
}
var AOe, zv, Bv, Vv, Hv, Uv, jOe, MOe, NOe, POe, FOe;
function IOe() {
  return (IOe = t(() => {
    ((AOe = [`top`, `right`, `bottom`, `left`]),
      (zv = Math.min),
      (Bv = Math.max),
      (Vv = Math.round),
      (Hv = Math.floor),
      (Uv = (e) => ({ x: e, y: e })),
      (jOe = { left: `right`, right: `left`, bottom: `top`, top: `bottom` }),
      (MOe = [`left`, `right`]),
      (NOe = [`right`, `left`]),
      (POe = [`top`, `bottom`]),
      (FOe = [`bottom`, `top`]));
  }))();
}
function LOe(e, t, n) {
  let { reference: r, floating: i } = e,
    a = Rv(t),
    o = bOe(t),
    s = yOe(o),
    c = Iv(t),
    l = a === `y`,
    u = r.x + r.width / 2 - i.width / 2,
    d = r.y + r.height / 2 - i.height / 2,
    f = r[s] / 2 - i[s] / 2,
    p;
  switch (c) {
    case `top`:
      p = { x: u, y: r.y - i.height };
      break;
    case `bottom`:
      p = { x: u, y: r.y + r.height };
      break;
    case `right`:
      p = { x: r.x + r.width, y: d };
      break;
    case `left`:
      p = { x: r.x - i.width, y: d };
      break;
    default:
      p = { x: r.x, y: r.y };
  }
  let m = Lv(t);
  return (m && (p[o] += f * (m === `end` ? 1 : -1) * (n && l ? -1 : 1)), p);
}
async function ROe(e, t) {
  t === void 0 && (t = {});
  let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e,
    {
      boundary: c = `clippingAncestors`,
      rootBoundary: l = `viewport`,
      elementContext: u = `floating`,
      altBoundary: d = !1,
      padding: f = 0,
    } = Fv(t, e),
    p = OOe(f),
    m = o[d ? (u === `floating` ? `reference` : `floating`) : u],
    h = kOe(
      await i.getClippingRect({
        element:
          ((await (i.isElement == null ? void 0 : i.isElement(m))) ?? !0)
            ? m
            : m.contextElement ||
              (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating))),
        boundary: c,
        rootBoundary: l,
        strategy: s,
      }),
    ),
    g =
      u === `floating`
        ? { x: n, y: r, width: a.floating.width, height: a.floating.height }
        : a.reference,
    _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)),
    v = ((await (i.isElement == null ? void 0 : i.isElement(_))) &&
      (await (i.getScale == null ? void 0 : i.getScale(_)))) || { x: 1, y: 1 },
    y = kOe(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: o,
            rect: g,
            offsetParent: _,
            strategy: s,
          })
        : g,
    );
  return {
    top: (h.top - y.top + p.top) / v.y,
    bottom: (y.bottom - h.bottom + p.bottom) / v.y,
    left: (h.left - y.left + p.left) / v.x,
    right: (y.right - h.right + p.right) / v.x,
  };
}
function zOe(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function BOe(e) {
  return AOe.some((t) => e[t] >= 0);
}
async function VOe(e, t) {
  let { placement: n, platform: r, elements: i } = e,
    a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    o = Iv(n),
    s = Lv(n),
    c = Rv(n) === `y`,
    l = qOe.has(o) ? -1 : 1,
    u = a && c ? -1 : 1,
    d = Fv(t, e),
    {
      mainAxis: f,
      crossAxis: p,
      alignmentAxis: m,
    } = typeof d == `number`
      ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
      : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis };
  return (
    s && typeof m == `number` && (p = s === `end` ? m * -1 : m),
    c ? { x: p * u, y: f * l } : { x: f * l, y: p * u }
  );
}
var HOe, UOe, WOe, GOe, KOe, qOe, JOe, YOe, XOe, ZOe;
function QOe() {
  return (QOe = t(() => {
    (IOe(),
      (HOe = 50),
      (UOe = async (e, t, n) => {
        let {
            placement: r = `bottom`,
            strategy: i = `absolute`,
            middleware: a = [],
            platform: o,
          } = n,
          s = o.detectOverflow ? o : { ...o, detectOverflow: ROe },
          c = await (o.isRTL == null ? void 0 : o.isRTL(t)),
          l = await o.getElementRects({ reference: e, floating: t, strategy: i }),
          { x: u, y: d } = LOe(l, r, c),
          f = r,
          p = 0,
          m = {};
        for (let n = 0; n < a.length; n++) {
          let h = a[n];
          if (!h) continue;
          let { name: g, fn: _ } = h,
            {
              x: v,
              y,
              data: b,
              reset: x,
            } = await _({
              x: u,
              y: d,
              initialPlacement: r,
              placement: f,
              strategy: i,
              middlewareData: m,
              rects: l,
              platform: s,
              elements: { reference: e, floating: t },
            });
          ((u = v ?? u),
            (d = y ?? d),
            (m[g] = { ...m[g], ...b }),
            x &&
              p < HOe &&
              (p++,
              typeof x == `object` &&
                (x.placement && (f = x.placement),
                x.rects &&
                  (l =
                    x.rects === !0
                      ? await o.getElementRects({ reference: e, floating: t, strategy: i })
                      : x.rects),
                ({ x: u, y: d } = LOe(l, f, c))),
              (n = -1)));
        }
        return { x: u, y: d, placement: f, strategy: i, middlewareData: m };
      }),
      (WOe = (e) => ({
        name: `arrow`,
        options: e,
        async fn(t) {
          let {
              x: n,
              y: r,
              placement: i,
              rects: a,
              platform: o,
              elements: s,
              middlewareData: c,
            } = t,
            { element: l, padding: u = 0 } = Fv(e, t) || {};
          if (l == null) return {};
          let d = OOe(u),
            f = { x: n, y: r },
            p = bOe(i),
            m = yOe(p),
            h = await o.getDimensions(l),
            g = p === `y`,
            _ = g ? `top` : `left`,
            v = g ? `bottom` : `right`,
            y = g ? `clientHeight` : `clientWidth`,
            b = a.reference[m] + a.reference[p] - f[p] - a.floating[m],
            x = f[p] - a.reference[p],
            S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)),
            C = S ? S[y] : 0;
          (!C || !(await (o.isElement == null ? void 0 : o.isElement(S)))) &&
            (C = s.floating[y] || a.floating[m]);
          let w = b / 2 - x / 2,
            T = C / 2 - h[m] / 2 - 1,
            E = zv(d[_], T),
            D = zv(d[v], T),
            O = C - h[m] - D,
            k = C / 2 - h[m] / 2 + w,
            A = _Oe(E, k, O),
            j =
              !c.arrow &&
              Lv(i) != null &&
              k !== A &&
              a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0,
            M = j ? (k < E ? k - E : k - O) : 0;
          return {
            [p]: f[p] + M,
            data: { [p]: A, centerOffset: k - A - M, ...(j && { alignmentOffset: M }) },
            reset: j,
          };
        },
      })),
      (GOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            name: `flip`,
            options: e,
            async fn(t) {
              var n;
              let {
                  placement: r,
                  middlewareData: i,
                  rects: a,
                  initialPlacement: o,
                  platform: s,
                  elements: c,
                } = t,
                {
                  mainAxis: l = !0,
                  crossAxis: u = !0,
                  fallbackPlacements: d,
                  fallbackStrategy: f = `bestFit`,
                  fallbackAxisSideDirection: p = `none`,
                  flipAlignment: m = !0,
                  ...h
                } = Fv(e, t);
              if ((n = i.arrow) != null && n.alignmentOffset) return {};
              let g = Iv(r),
                _ = Rv(o),
                v = Iv(o) === o,
                y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)),
                b = d || (v || !m ? [EOe(o)] : SOe(o)),
                x = p !== `none`;
              !d && x && b.push(...TOe(o, m, p, y));
              let S = [o, ...b],
                C = await s.detectOverflow(t, h),
                w = [],
                T = i.flip?.overflows || [];
              if ((l && w.push(C[g]), u)) {
                let e = xOe(r, a, y);
                w.push(C[e[0]], C[e[1]]);
              }
              if (((T = [...T, { placement: r, overflows: w }]), !w.every((e) => e <= 0))) {
                let e = (i.flip?.index || 0) + 1,
                  t = S[e];
                if (
                  t &&
                  (u !== `alignment` ||
                    _ === Rv(t) ||
                    T.every((e) => Rv(e.placement) !== _ || e.overflows[0] > 0))
                )
                  return { data: { index: e, overflows: T }, reset: { placement: t } };
                let n = T.filter((e) => e.overflows[0] <= 0).sort(
                  (e, t) => e.overflows[1] - t.overflows[1],
                )[0]?.placement;
                if (!n)
                  switch (f) {
                    case `bestFit`: {
                      let e = T.filter((e) => {
                        if (x) {
                          let t = Rv(e.placement);
                          return t === _ || t === `y`;
                        }
                        return !0;
                      })
                        .map((e) => [
                          e.placement,
                          e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0),
                        ])
                        .sort((e, t) => e[1] - t[1])[0]?.[0];
                      e && (n = e);
                      break;
                    }
                    case `initialPlacement`:
                      n = o;
                  }
                if (r !== n) return { reset: { placement: n } };
              }
              return {};
            },
          }
        );
      }),
      (KOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            name: `hide`,
            options: e,
            async fn(t) {
              let { rects: n, platform: r } = t,
                { strategy: i = `referenceHidden`, ...a } = Fv(e, t);
              switch (i) {
                case `referenceHidden`: {
                  let e = zOe(
                    await r.detectOverflow(t, { ...a, elementContext: `reference` }),
                    n.reference,
                  );
                  return { data: { referenceHiddenOffsets: e, referenceHidden: BOe(e) } };
                }
                case `escaped`: {
                  let e = zOe(await r.detectOverflow(t, { ...a, altBoundary: !0 }), n.floating);
                  return { data: { escapedOffsets: e, escaped: BOe(e) } };
                }
                default:
                  return {};
              }
            },
          }
        );
      }),
      (qOe = new Set([`left`, `top`])),
      (JOe = function (e) {
        return (
          e === void 0 && (e = 0),
          {
            name: `offset`,
            options: e,
            async fn(t) {
              var n;
              let { x: r, y: i, placement: a, middlewareData: o } = t,
                s = await VOe(t, e);
              return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset
                ? {}
                : { x: r + s.x, y: i + s.y, data: { ...s, placement: a } };
            },
          }
        );
      }),
      (YOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            name: `shift`,
            options: e,
            async fn(t) {
              let { x: n, y: r, placement: i, platform: a } = t,
                {
                  mainAxis: o = !0,
                  crossAxis: s = !1,
                  limiter: c = {
                    fn: (e) => {
                      let { x: t, y: n } = e;
                      return { x: t, y: n };
                    },
                  },
                  ...l
                } = Fv(e, t),
                u = { x: n, y: r },
                d = await a.detectOverflow(t, l),
                f = Rv(i),
                p = vOe(f),
                m = u[p],
                h = u[f],
                g = (e, t) =>
                  _Oe(t + d[e === `y` ? `top` : `left`], t, t - d[e === `y` ? `bottom` : `right`]);
              (o && (m = g(p, m)), s && (h = g(f, h)));
              let _ = c.fn({ ...t, [p]: m, [f]: h });
              return { ..._, data: { x: _.x - n, y: _.y - r, enabled: { [p]: o, [f]: s } } };
            },
          }
        );
      }),
      (XOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            options: e,
            fn(t) {
              let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t,
                { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Fv(e, t),
                u = { x: n, y: r },
                d = Rv(i),
                f = vOe(d),
                p = u[f],
                m = u[d],
                h = Fv(s, t),
                g =
                  typeof h == `number`
                    ? { mainAxis: h, crossAxis: 0 }
                    : { mainAxis: h.mainAxis ?? 0, crossAxis: h.crossAxis ?? 0 };
              if (c) {
                let e = f === `y` ? `height` : `width`,
                  t = a.reference[f] - a.floating[e] + g.mainAxis,
                  n = a.reference[f] + a.reference[e] - g.mainAxis;
                p < t ? (p = t) : p > n && (p = n);
              }
              if (l) {
                let e = f === `y` ? `width` : `height`,
                  t = qOe.has(Iv(i)),
                  n =
                    a.reference[d] -
                    a.floating[e] +
                    ((t && o.offset?.[d]) || 0) +
                    (t ? 0 : g.crossAxis),
                  r =
                    a.reference[d] +
                    a.reference[e] +
                    (t ? 0 : o.offset?.[d] || 0) -
                    (t ? g.crossAxis : 0);
                m < n ? (m = n) : m > r && (m = r);
              }
              return { [f]: p, [d]: m };
            },
          }
        );
      }),
      (ZOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            name: `size`,
            options: e,
            async fn(t) {
              let { placement: n, rects: r, platform: i, elements: a } = t,
                { apply: o = () => {}, ...s } = Fv(e, t),
                c = await i.detectOverflow(t, s),
                l = Iv(n),
                u = Lv(n),
                d = Rv(n) === `y`,
                { width: f, height: p } = r.floating,
                m,
                h;
              l === `top` || l === `bottom`
                ? ((m = l),
                  (h =
                    u ===
                    ((await (i.isRTL == null ? void 0 : i.isRTL(a.floating))) ? `start` : `end`)
                      ? `left`
                      : `right`))
                : ((h = l), (m = u === `end` ? `top` : `bottom`));
              let g = p - c.top - c.bottom,
                _ = f - c.left - c.right,
                v = zv(p - c[m], g),
                y = zv(f - c[h], _),
                b = t.middlewareData.shift,
                x = !b,
                S = v,
                C = y;
              (b != null && b.enabled.x && (C = _),
                b != null && b.enabled.y && (S = g),
                x &&
                  !u &&
                  (d ? (C = f - 2 * Bv(c.left, c.right)) : (S = p - 2 * Bv(c.top, c.bottom))),
                await o({ ...t, availableWidth: C, availableHeight: S }));
              let w = await i.getDimensions(a.floating);
              return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
            },
          }
        );
      }));
  }))();
}
function $Oe() {
  return typeof window < `u`;
}
function Wv(e) {
  return eke(e) ? (e.nodeName || ``).toLowerCase() : `#document`;
}
function Gv(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Kv(e) {
  return ((eke(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function eke(e) {
  return $Oe() ? e instanceof Node || e instanceof Gv(e).Node : !1;
}
function qv(e) {
  return $Oe() ? e instanceof Element || e instanceof Gv(e).Element : !1;
}
function Jv(e) {
  return $Oe() ? e instanceof HTMLElement || e instanceof Gv(e).HTMLElement : !1;
}
function tke(e) {
  return !$Oe() || typeof ShadowRoot > `u`
    ? !1
    : e instanceof ShadowRoot || e instanceof Gv(e).ShadowRoot;
}
function nke(e) {
  let { overflow: t, overflowX: n, overflowY: r, display: i } = Xv(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== `inline` && i !== `contents`;
}
function rke(e) {
  return /^(table|td|th)$/.test(Wv(e));
}
function ike(e) {
  try {
    if (e.matches(`:popover-open`)) return !0;
  } catch {}
  try {
    return e.matches(`:modal`);
  } catch {
    return !1;
  }
}
function ake(e) {
  let t = qv(e) ? Xv(e) : e;
  return (
    $v(t.transform) ||
    $v(t.translate) ||
    $v(t.scale) ||
    $v(t.rotate) ||
    $v(t.perspective) ||
    (!ske() && ($v(t.backdropFilter) || $v(t.filter))) ||
    dke.test(t.willChange || ``) ||
    fke.test(t.contain || ``)
  );
}
function oke(e) {
  let t = Zv(e);
  for (; Jv(t) && !Yv(t); ) {
    if (ake(t)) return t;
    if (ike(t)) return null;
    t = Zv(t);
  }
  return null;
}
function ske() {
  return (
    (pke ??= typeof CSS < `u` && CSS.supports && CSS.supports(`-webkit-backdrop-filter`, `none`)),
    pke
  );
}
function Yv(e) {
  return /^(html|body|#document)$/.test(Wv(e));
}
function Xv(e) {
  return Gv(e).getComputedStyle(e);
}
function cke(e) {
  return qv(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Zv(e) {
  if (Wv(e) === `html`) return e;
  let t = e.assignedSlot || e.parentNode || (tke(e) && e.host) || Kv(e);
  return tke(t) ? t.host : t;
}
function lke(e) {
  let t = Zv(e);
  return Yv(t) ? (e.ownerDocument || e).body : Jv(t) && nke(t) ? t : lke(t);
}
function Qv(e, t, n) {
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  let r = lke(e),
    i = r === e.ownerDocument?.body,
    a = Gv(r);
  if (i) {
    let e = uke(a);
    return t.concat(a, a.visualViewport || [], nke(r) ? r : [], e && n ? Qv(e) : []);
  }
  return t.concat(r, Qv(r, [], n));
}
function uke(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
var dke, fke, $v, pke;
function mke() {
  return (mke = t(() => {
    ((dke = /transform|translate|scale|rotate|perspective|filter/),
      (fke = /paint|layout|strict|content/),
      ($v = (e) => !!e && e !== `none`));
  }))();
}
function hke(e) {
  let t = Xv(e),
    n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0,
    i = Jv(e),
    a = i ? e.offsetWidth : n,
    o = i ? e.offsetHeight : r,
    s = Vv(n) !== a || Vv(r) !== o;
  return (s && ((n = a), (r = o)), { width: n, height: r, $: s });
}
function gke(e) {
  return qv(e) ? e : e.contextElement;
}
function ey(e) {
  let t = gke(e);
  if (!Jv(t)) return Uv(1);
  let n = t.getBoundingClientRect(),
    { width: r, height: i, $: a } = hke(t),
    o = (a ? Vv(n.width) : n.width) / r,
    s = (a ? Vv(n.height) : n.height) / i;
  return (
    (!o || !Number.isFinite(o)) && (o = 1),
    (!s || !Number.isFinite(s)) && (s = 1),
    { x: o, y: s }
  );
}
function _ke(e) {
  let t = Gv(e);
  return !ske() || !t.visualViewport
    ? Lke
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function vke(e, t, n) {
  return (t === void 0 && (t = !1), !!n && t && n === Gv(e));
}
function ty(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  let i = e.getBoundingClientRect(),
    a = gke(e),
    o = Uv(1);
  t && (r ? qv(r) && (o = ey(r)) : (o = ey(e)));
  let s = vke(a, n, r) ? _ke(a) : Uv(0),
    c = (i.left + s.x) / o.x,
    l = (i.top + s.y) / o.y,
    u = i.width / o.x,
    d = i.height / o.y;
  if (a && r) {
    let e = Gv(a),
      t = qv(r) ? Gv(r) : r,
      n = e,
      i = uke(n);
    for (; i && t !== n; ) {
      let e = ey(i),
        t = i.getBoundingClientRect(),
        r = Xv(i),
        a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
        o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
      ((c *= e.x),
        (l *= e.y),
        (u *= e.x),
        (d *= e.y),
        (c += a),
        (l += o),
        (n = Gv(i)),
        (i = uke(n)));
    }
  }
  return kOe({ width: u, height: d, x: c, y: l });
}
function yke(e, t) {
  let n = cke(e).scrollLeft;
  return t ? t.left + n : ty(Kv(e)).left + n;
}
function bke(e, t) {
  let n = e.getBoundingClientRect();
  return { x: n.left + t.scrollLeft - yke(e, n), y: n.top + t.scrollTop };
}
function xke(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e,
    a = i === `fixed`,
    o = Kv(r),
    s = t ? ike(t.floating) : !1;
  if (r === o || (s && a)) return n;
  let c = { scrollLeft: 0, scrollTop: 0 },
    l = Uv(1),
    u = Uv(0),
    d = Jv(r);
  if ((d || !a) && ((Wv(r) !== `body` || nke(o)) && (c = cke(r)), d)) {
    let e = ty(r);
    ((l = ey(r)), (u.x = e.x + r.clientLeft), (u.y = e.y + r.clientTop));
  }
  let f = o && !d && !a ? bke(o, c) : Uv(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y,
  };
}
function Ske(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Cke(e) {
  let t = cke(e),
    n = e.ownerDocument.body,
    r = Bv(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth),
    i = Bv(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight),
    a = -t.scrollLeft + yke(e),
    o = -t.scrollTop;
  return (
    Xv(n).direction === `rtl` && (a += Bv(e.clientWidth, n.clientWidth) - r),
    { width: r, height: i, x: a, y: o }
  );
}
function wke(e, t, n) {
  n === void 0 && (n = `viewport`);
  let r = n === `layoutViewport`,
    i = Gv(e),
    a = Kv(e),
    o = i.visualViewport,
    s = a.clientWidth,
    c = a.clientHeight,
    l = 0,
    u = 0;
  if (o) {
    let e = !ske() || t === `fixed`;
    r
      ? e || ((l = -o.offsetLeft), (u = -o.offsetTop))
      : ((s = o.width), (c = o.height), e && ((l = o.offsetLeft), (u = o.offsetTop)));
  }
  if (yke(a) <= 0) {
    let e = a.ownerDocument,
      t = e.body,
      n = getComputedStyle(t),
      r =
        (e.compatMode === `CSS1Compat` && parseFloat(n.marginLeft) + parseFloat(n.marginRight)) ||
        0,
      i = Math.abs(a.clientWidth - t.clientWidth - r),
      o = getComputedStyle(a).scrollbarGutter === `stable both-edges` ? i / 2 : i;
    o <= Rke && (s -= o);
  }
  return { width: s, height: c, x: l, y: u };
}
function Tke(e, t) {
  let n = ty(e, !0, t === `fixed`),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    a = ey(e);
  return { width: e.clientWidth * a.x, height: e.clientHeight * a.y, x: i * a.x, y: r * a.y };
}
function Eke(e, t, n) {
  let r;
  if (t === `viewport` || t === `layoutViewport`) r = wke(e, n, t);
  else if (t === `document`) r = Cke(Kv(e));
  else if (qv(t)) r = Tke(t, n);
  else {
    let n = _ke(e);
    r = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
  }
  return kOe(r);
}
function Dke(e, t) {
  let n = t.get(e);
  if (n) return n;
  let r = Qv(e, [], !1).filter((e) => qv(e) && Wv(e) !== `body`),
    i = null,
    a = Xv(e).position === `fixed`,
    o = a ? Zv(e) : e;
  for (; qv(o) && !Yv(o); ) {
    let e = Xv(o),
      t = ake(o),
      n = i ? i.position : a ? `fixed` : ``;
    (!t && (n === `fixed` || (n === `absolute` && e.position === `static`))
      ? (r = r.filter((e) => e !== o))
      : (i = e),
      (o = Zv(o)));
  }
  return (t.set(e, r), r);
}
function Oke(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e,
    a = [...(n === `clippingAncestors` ? (ike(t) ? [] : Dke(t, this._c)) : [].concat(n)), r],
    o = Eke(t, a[0], i),
    s = o.top,
    c = o.right,
    l = o.bottom,
    u = o.left;
  for (let e = 1; e < a.length; e++) {
    let n = Eke(t, a[e], i);
    ((s = Bv(n.top, s)), (c = zv(n.right, c)), (l = zv(n.bottom, l)), (u = Bv(n.left, u)));
  }
  return { width: c - u, height: l - s, x: u, y: s };
}
function kke(e) {
  let { width: t, height: n } = hke(e);
  return { width: t, height: n };
}
function Ake(e, t, n) {
  let r = Jv(t),
    i = Kv(t),
    a = n === `fixed`,
    o = ty(e, !0, a, t),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = Uv(0);
  if ((r || !a) && ((Wv(t) !== `body` || nke(i)) && (s = cke(t)), r)) {
    let e = ty(t, !0, a, t);
    ((c.x = e.x + t.clientLeft), (c.y = e.y + t.clientTop));
  }
  !r && i && (c.x = yke(i));
  let l = i && !r && !a ? bke(i, s) : Uv(0);
  return {
    x: o.left + s.scrollLeft - c.x - l.x,
    y: o.top + s.scrollTop - c.y - l.y,
    width: o.width,
    height: o.height,
  };
}
function jke(e) {
  return Xv(e).position === `static`;
}
function Mke(e, t) {
  if (!Jv(e) || Xv(e).position === `fixed`) return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (Kv(e) === n && (n = n.ownerDocument.body), n);
}
function Nke(e, t) {
  let n = Gv(e);
  if (ike(e)) return n;
  if (!Jv(e)) {
    let t = Zv(e);
    for (; t && !Yv(t); ) {
      if (qv(t) && !jke(t)) return t;
      t = Zv(t);
    }
    return n;
  }
  let r = Mke(e, t);
  for (; r && rke(r) && jke(r); ) r = Mke(r, t);
  return r && Yv(r) && jke(r) && !ake(r) ? n : r || oke(e) || n;
}
function Pke(e) {
  return Xv(e).direction === `rtl`;
}
function Fke(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ike(e, t, n) {
  let r = null,
    i,
    a = Kv(e);
  function o() {
    var e;
    (clearTimeout(i), (e = r) == null || e.disconnect(), (r = null));
  }
  function s(n, c) {
    (n === void 0 && (n = !1), c === void 0 && (c = 1), o());
    let l = e.getBoundingClientRect(),
      { left: u, top: d, width: f, height: p } = l;
    if ((n || t(), !f || !p)) return;
    let m = Hv(d),
      h = Hv(a.clientWidth - (u + f)),
      g = Hv(a.clientHeight - (d + p)),
      _ = Hv(u),
      v = {
        rootMargin: -m + `px ` + -h + `px ` + -g + `px ` + -_ + `px`,
        threshold: Bv(0, zv(1, c)) || 1,
      },
      y = !0;
    function b(t) {
      let n = t[0].intersectionRatio;
      if (!Fke(l, e.getBoundingClientRect())) return s();
      if (n !== c) {
        if (!y) return s();
        n
          ? s(!1, n)
          : (i = setTimeout(() => {
              s(!1, 1e-7);
            }, 1e3));
      }
      y = !1;
    }
    try {
      r = new IntersectionObserver(b, { ...v, root: a.ownerDocument });
    } catch {
      r = new IntersectionObserver(b, v);
    }
    r.observe(e);
  }
  let c = Gv(e),
    l = () => s(n);
  return (
    c.addEventListener(`resize`, l),
    s(!0),
    () => {
      (c.removeEventListener(`resize`, l), o());
    }
  );
}
function ny(e, t, n, r) {
  r === void 0 && (r = {});
  let {
      ancestorScroll: i = !0,
      ancestorResize: a = !0,
      elementResize: o = typeof ResizeObserver == `function`,
      layoutShift: s = typeof IntersectionObserver == `function`,
      animationFrame: c = !1,
    } = r,
    l = gke(e),
    u = i || a ? [...(l ? Qv(l) : []), ...(t ? Qv(t) : [])] : [];
  u.forEach((e) => {
    (i && e.addEventListener(`scroll`, n), a && e.addEventListener(`resize`, n));
  });
  let d = l && s ? Ike(l, n, a) : null,
    f = -1,
    p = null;
  o &&
    ((p = new ResizeObserver((e) => {
      let [r] = e;
      (r &&
        r.target === l &&
        p &&
        t &&
        (p.unobserve(t),
        cancelAnimationFrame(f),
        (f = requestAnimationFrame(() => {
          var e;
          (e = p) == null || e.observe(t);
        }))),
        n());
    })),
    l && !c && p.observe(l),
    t && p.observe(t));
  let m,
    h = c ? ty(e) : null;
  c && g();
  function g() {
    let t = ty(e);
    (h && !Fke(h, t) && n(), (h = t), (m = requestAnimationFrame(g)));
  }
  return (
    n(),
    () => {
      var e;
      (u.forEach((e) => {
        (i && e.removeEventListener(`scroll`, n), a && e.removeEventListener(`resize`, n));
      }),
        d?.(),
        (e = p) == null || e.disconnect(),
        (p = null),
        c && cancelAnimationFrame(m));
    }
  );
}
var Lke, Rke, zke, Bke, Vke, Hke, Uke, Wke, Gke, Kke, qke, Jke, Yke;
function Xke() {
  return (Xke = t(() => {
    (QOe(),
      IOe(),
      mke(),
      (Lke = Uv(0)),
      (Rke = 25),
      (zke = async function (e) {
        let t = this.getOffsetParent || Nke,
          n = this.getDimensions,
          r = await n(e.floating);
        return {
          reference: Ake(e.reference, await t(e.floating), e.strategy),
          floating: { x: 0, y: 0, width: r.width, height: r.height },
        };
      }),
      (Bke = {
        convertOffsetParentRelativeRectToViewportRelativeRect: xke,
        getDocumentElement: Kv,
        getClippingRect: Oke,
        getOffsetParent: Nke,
        getElementRects: zke,
        getClientRects: Ske,
        getDimensions: kke,
        getScale: ey,
        isElement: qv,
        isRTL: Pke,
      }),
      (Vke = ROe),
      (Hke = JOe),
      (Uke = YOe),
      (Wke = GOe),
      (Gke = ZOe),
      (Kke = KOe),
      (qke = WOe),
      (Jke = XOe),
      (Yke = (e, t, n) => {
        let r = new Map(),
          i = n ?? {},
          a = { ...Bke, ...i.platform, _c: r };
        return UOe(e, t, { ...i, platform: a });
      }));
  }))();
}
function Zke(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == `function` && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && typeof e == `object`) {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!Zke(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; r-- !== 0; ) {
      let n = i[r];
      if (!(n === `_owner` && e.$$typeof) && !Zke(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Qke(e) {
  return typeof window > `u` ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function $ke(e, t) {
  let n = Qke(e);
  return Math.round(t * n) / n;
}
function eAe(e) {
  let t = ry.useRef(e);
  return (
    iy(() => {
      t.current = e;
    }),
    t
  );
}
function tAe(e) {
  e === void 0 && (e = {});
  let {
      placement: t = `bottom`,
      strategy: n = `absolute`,
      middleware: r = [],
      platform: i,
      elements: { reference: a, floating: o } = {},
      transform: s = !0,
      whileElementsMounted: c,
      open: l,
    } = e,
    [u, d] = ry.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [f, p] = ry.useState(r);
  Zke(f, r) || p(r);
  let [m, h] = ry.useState(null),
    [g, _] = ry.useState(null),
    v = ry.useCallback((e) => {
      e !== S.current && ((S.current = e), h(e));
    }, []),
    y = ry.useCallback((e) => {
      e !== C.current && ((C.current = e), _(e));
    }, []),
    b = a || m,
    x = o || g,
    S = ry.useRef(null),
    C = ry.useRef(null),
    w = ry.useRef(u),
    T = c != null,
    E = eAe(c),
    D = eAe(i),
    O = eAe(l),
    k = ry.useCallback(() => {
      if (!S.current || !C.current) return;
      let e = { placement: t, strategy: n, middleware: f };
      (D.current && (e.platform = D.current),
        Yke(S.current, C.current, e).then((e) => {
          let t = { ...e, isPositioned: O.current !== !1 };
          A.current &&
            !Zke(w.current, t) &&
            ((w.current = t),
            rAe.flushSync(() => {
              d(t);
            }));
        }));
    }, [f, t, n, D, O]);
  iy(() => {
    l === !1 &&
      w.current.isPositioned &&
      ((w.current.isPositioned = !1), d((e) => ({ ...e, isPositioned: !1 })));
  }, [l]);
  let A = ry.useRef(!1);
  (iy(
    () => (
      (A.current = !0),
      () => {
        A.current = !1;
      }
    ),
    [],
  ),
    iy(() => {
      if ((b && (S.current = b), x && (C.current = x), b && x)) {
        if (E.current) return E.current(b, x, k);
        k();
      }
    }, [b, x, k, E, T]));
  let j = ry.useMemo(
      () => ({ reference: S, floating: C, setReference: v, setFloating: y }),
      [v, y],
    ),
    M = ry.useMemo(() => ({ reference: b, floating: x }), [b, x]),
    N = ry.useMemo(() => {
      let e = { position: n, left: 0, top: 0 };
      if (!M.floating) return e;
      let t = $ke(M.floating, u.x),
        r = $ke(M.floating, u.y);
      return s
        ? {
            ...e,
            transform: `translate(` + t + `px, ` + r + `px)`,
            ...(Qke(M.floating) >= 1.5 && { willChange: `transform` }),
          }
        : { position: n, left: t, top: r };
    }, [n, s, M.floating, u.x, u.y]);
  return ry.useMemo(
    () => ({ ...u, update: k, refs: j, elements: M, floatingStyles: N }),
    [u, k, j, M, N],
  );
}
var ry, nAe, rAe, iy, iAe, aAe, oAe, sAe, cAe, lAe, uAe, dAe;
function ay() {
  return (ay = t(() => {
    (Xke(),
      (ry = n(o(), 1)),
      (nAe = o()),
      (rAe = n(ph(), 1)),
      (iy = typeof document < `u` ? nAe.useLayoutEffect : function () {}),
      (iAe = (e) => {
        function t(e) {
          return {}.hasOwnProperty.call(e, `current`);
        }
        return {
          name: `arrow`,
          options: e,
          fn(n) {
            let { element: r, padding: i } = typeof e == `function` ? e(n) : e;
            return r && t(r)
              ? r.current == null
                ? {}
                : qke({ element: r.current, padding: i }).fn(n)
              : r
                ? qke({ element: r, padding: i }).fn(n)
                : {};
          },
        };
      }),
      (aAe = (e, t) => {
        let n = Hke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (oAe = (e, t) => {
        let n = Uke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (sAe = (e, t) => ({ fn: Jke(e).fn, options: [e, t] })),
      (cAe = (e, t) => {
        let n = Wke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (lAe = (e, t) => {
        let n = Gke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (uAe = (e, t) => {
        let n = Kke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (dAe = (e, t) => {
        let n = iAe(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }));
  }))();
}

 ay();
 const E5=React,S5=React,Ixi=React,Bxi=React,Vxi=ReactDOM;
 const CSi=compilerRuntime,Yxi=compilerRuntime,Fxi=compilerRuntime,zxi=compilerRuntime;
 const D5={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},Xxi=D5,g5=D5;
 const Mxi=React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
 const Gxi=React.createContext(null),Wxi=React.createContext(null),v5=React.createContext(undefined);
 const d5=()=>visualScale,dxi=ShortcutBadge,oSi={textTheme:'_textTheme_8iuk0_2'};
 const wSi='default',TSi=100,ESi=12,DSi='[data-tooltip-overflow-target]',OSi='[data-tooltip-visibility-target]',C5=8,Zxi=300,b5='codex:dismiss-tooltips';
 const kSi={bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0,toJSON(){return {};}};
function p5(e) {
  let t = (0, Fxi.c)(4),
    n = (0, Ixi.useRef)(e),
    r,
    i;
  (t[0] === e
    ? ((r = t[1]), (i = t[2]))
    : ((r = () => {
        n.current = e;
      }),
      (i = [e]),
      (t[0] = e),
      (t[1] = r),
      (t[2] = i)),
    (0, Ixi.useInsertionEffect)(r, i));
  let a;
  return (
    t[3] === Symbol.for(`react.memo_cache_sentinel`)
      ? ((a = (...e) => {
          let t = e;
          Axi() && Pxi();
          let { current: r } = n;
          return r(...t);
        }),
        (t[3] = a))
      : (a = t[3]),
    a
  );
}
function Axi() {
  let e = Mxi?.H;
  return e != null && e.useState !== e.useReducer;
}
function Pxi() {
  throw Error(`A function wrapped in useStableCallback can't be called during rendering.`);
}
function h5(e) {
  let t = (0, zxi.c)(14),
    { children: n, container: r } = e,
    i;
  t[0] === r.ownerDocument
    ? (i = t[1])
    : ((i = () => {
        let e = r.ownerDocument.createElement(`div`);
        return ((e.className = `contents`), e);
      }),
      (t[0] = r.ownerDocument),
      (t[1] = i));
  let [a] = (0, Bxi.useState)(i),
    o;
  t[2] !== r || t[3] !== a
    ? ((o = (0, g5.jsx)(Lxi, { container: r, element: a })), (t[2] = r), (t[3] = a), (t[4] = o))
    : (o = t[4]);
  let s;
  t[5] === a ? (s = t[6]) : ((s = (0, g5.jsx)(Rxi, { element: a })), (t[5] = a), (t[6] = s));
  let c;
  t[7] !== n || t[8] !== o || t[9] !== s
    ? ((c = (0, g5.jsxs)(g5.Fragment, { children: [o, n, s] })),
      (t[7] = n),
      (t[8] = o),
      (t[9] = s),
      (t[10] = c))
    : (c = t[10]);
  let l;
  return (
    t[11] !== a || t[12] !== c
      ? ((l = (0, Vxi.createPortal)(c, a)), (t[11] = a), (t[12] = c), (t[13] = l))
      : (l = t[13]),
    l
  );
}
function Lxi(e) {
  let t = (0, zxi.c)(4),
    { container: n, element: r } = e,
    i,
    a;
  return (
    t[0] !== n || t[1] !== r
      ? ((i = () => {
          n.appendChild(r);
        }),
        (a = [n, r]),
        (t[0] = n),
        (t[1] = r),
        (t[2] = i),
        (t[3] = a))
      : ((i = t[2]), (a = t[3])),
    (0, Bxi.useLayoutEffect)(i, a),
    null
  );
}
function Rxi(e) {
  let t = (0, zxi.c)(3),
    { element: n } = e,
    r,
    i;
  return (
    t[0] === n
      ? ((r = t[1]), (i = t[2]))
      : ((r = () => () => n.remove()), (i = [n]), (t[0] = n), (t[1] = r), (t[2] = i)),
    (0, Bxi.useLayoutEffect)(r, i),
    null
  );
}
function qxi() {
  typeof window > `u` || window.dispatchEvent(new Event(b5));
}
function Jxi(e) {
  let t = (0, Yxi.c)(26),
    { delayDuration: n, skipDelayDuration: r, children: i } = e,
    a = n === void 0 ? 200 : n,
    o = r === void 0 ? Zxi : r,
    s = (0, S5.useRef)(null),
    c = (0, S5.useRef)(null),
    l = (0, S5.useRef)(null),
    u = (0, S5.useRef)(!0),
    d;
  t[0] === Symbol.for(`react.memo_cache_sentinel`) ? ((d = new Map()), (t[0] = d)) : (d = t[0]);
  let f = (0, S5.useRef)(d),
    p;
  t[1] === Symbol.for(`react.memo_cache_sentinel`) ? ((p = new Map()), (t[1] = p)) : (p = t[1]);
  let m = (0, S5.useRef)(p),
    h = (0, S5.useRef)(!1),
    g = (0, S5.useRef)(null),
    _;
  t[2] === o ? (_ = t[3]) : ((_ = () => o), (t[2] = o), (t[3] = _));
  let v = p5(_),
    y;
  t[4] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((y = () => {
        g.current == null ||
          typeof window > `u` ||
          (window.clearTimeout(g.current), (g.current = null));
      }),
      (t[4] = y))
    : (y = t[4]);
  let b = y,
    x;
  t[5] === v
    ? (x = t[6])
    : ((x = (e) => {
        if ((f.current.delete(e), s.current !== e)) return;
        ((s.current = null), (l.current = null), b());
        let t = v();
        if (!u.current || t === 0 || typeof window > `u`) {
          ((c.current = null), (h.current = !1));
          return;
        }
        g.current = window.setTimeout(() => {
          ((g.current = null), (c.current = null), (h.current = !1));
        }, t);
      }),
      (t[5] = v),
      (t[6] = x));
  let S = x,
    C;
  t[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((C = (e, t, n) => (
        f.current.set(e, { close: n, variant: t }),
        () => {
          f.current.delete(e);
        }
      )),
      (t[7] = C))
    : (C = t[7]);
  let w = C,
    T;
  t[8] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((T = (e, t, n) => (
        m.current.set(e, { dismiss: t, closeOnWindowBlur: n }),
        () => {
          m.current.delete(e);
        }
      )),
      (t[8] = T))
    : (T = t[8]);
  let E = T,
    D;
  t[9] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((D = (e, t, n, r) => {
        for (let [t, r] of f.current)
          t === e || (r.variant !== `tooltip` && n === `tooltip`) || r.close();
        ((s.current = e),
          l.current !== e && (l.current = null),
          f.current.set(e, { close: r, variant: n }),
          b(),
          (c.current = t),
          (h.current = !0));
      }),
      (t[9] = D))
    : (D = t[9]);
  let O = D,
    k;
  t[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((k = (e, t) => (h.current && c.current === e ? 0 : t)), (t[10] = k))
    : (k = t[10]);
  let A = k,
    j;
  t[11] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((j = () => {
        let e = Array.from(m.current.values());
        (f.current.clear(),
          (s.current = null),
          (c.current = null),
          (l.current = null),
          (h.current = !1),
          b());
        for (let { dismiss: t } of e) t();
      }),
      (t[11] = j))
    : (j = t[11]);
  let M = j,
    N;
  t[12] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = () => {
        for (let { dismiss: e, closeOnWindowBlur: t } of Array.from(m.current.values())) t && e();
        ((c.current = null), (l.current = null), (h.current = !1), b());
      }),
      (t[12] = N))
    : (N = t[12]);
  let P = N,
    F;
  t[13] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((F = (e) => {
        l.current === e && (l.current = null);
      }),
      (t[13] = F))
    : (F = t[13]);
  let ee = F,
    te;
  t[14] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((te = (e) => l.current != null && l.current !== e), (t[14] = te))
    : (te = t[14]);
  let ne = te,
    re;
  t[15] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((re = (e) => {
        l.current = e;
      }),
      (t[15] = re))
    : (re = t[15]);
  let I = re,
    L;
  t[16] === S
    ? (L = t[17])
    : ((L = {
        activateTooltip: O,
        clearHoverHandoffLock: ee,
        deactivateTooltip: S,
        getOpenDelay: A,
        isHoverOpenBlocked: ne,
        registerOpenTooltip: w,
        registerTooltipDismissHandler: E,
        setHoverHandoffLockTooltipId: I,
      }),
      (t[16] = S),
      (t[17] = L));
  let R = L,
    ie,
    ae;
  (t[18] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((ie = () => {
        if (typeof window > `u`) return;
        u.current = !0;
        let e = f.current,
          t = m.current,
          n = (e) => {
            e.key === `Escape` &&
              !(
                e.target instanceof Element &&
                e.target.closest(`[data-tooltip-keyboard-navigation]`)
              ) &&
              queueMicrotask(M);
          };
        return (
          window.addEventListener(b5, M),
          window.addEventListener(`blur`, P),
          window.addEventListener(`keydown`, n, !0),
          () => {
            ((u.current = !1),
              window.removeEventListener(b5, M),
              window.removeEventListener(`blur`, P),
              window.removeEventListener(`keydown`, n, !0),
              b(),
              e.clear(),
              t.clear());
          }
        );
      }),
      (ae = [b, M, P]),
      (t[18] = ie),
      (t[19] = ae))
    : ((ie = t[18]), (ae = t[19])),
    (0, S5.useEffect)(ie, ae));
  let oe;
  t[20] !== R || t[21] !== i
    ? ((oe = (0, Xxi.jsx)(Gxi.Provider, { value: R, children: i })),
      (t[20] = R),
      (t[21] = i),
      (t[22] = oe))
    : (oe = t[22]);
  let se;
  return (
    t[23] !== a || t[24] !== oe
      ? ((se = (0, Xxi.jsx)(Wxi.Provider, { value: a, children: oe })),
        (t[23] = a),
        (t[24] = oe),
        (t[25] = se))
      : (se = t[25]),
    se
  );
}
function $xi({
  destinationElement: e,
  destinationSide: t,
  onEnterDestination: n,
  onMoveInsideTriangle: r,
  onMoveOutsideTriangle: i,
  pointer: a,
  sourceElement: o,
}) {
  if (rSi(e.getBoundingClientRect()) || (o != null && rSi(o.getBoundingClientRect()))) return null;
  let s = e.ownerDocument,
    c = (s) => {
      let c = s.composedPath();
      if (c.includes(e) || (o != null && c.includes(o))) {
        n();
        return;
      }
      let l = { x: s.clientX, y: s.clientY },
        u = eSi({
          destinationRect: e.getBoundingClientRect(),
          destinationSide: t,
          pointer: a,
          sourceRect: o?.getBoundingClientRect(),
        });
      if (u != null && tSi(l, u)) {
        r(l);
        return;
      }
      i();
    };
  return (
    s.addEventListener(`pointermove`, c, !0),
    () => {
      s.removeEventListener(`pointermove`, c, !0);
    }
  );
}
function eSi({ destinationRect: e, destinationSide: t, pointer: n, sourceRect: r }) {
  if (rSi(e) || (r != null && rSi(r))) return null;
  if (t === `left` || t === `right`) {
    let r = t === `right` ? e.left : e.right;
    return { start: n, endA: { x: r, y: e.top - C5 }, endB: { x: r, y: e.bottom + C5 } };
  }
  let i = t === `bottom` ? e.top : e.bottom;
  return { start: n, endA: { x: e.left - C5, y: i }, endB: { x: e.right + C5, y: i } };
}
function tSi(e, t) {
  let n = nSi(e, t.start, t.endA),
    r = nSi(e, t.endA, t.endB),
    i = nSi(e, t.endB, t.start);
  return !((n < 0 || r < 0 || i < 0) && (n > 0 || r > 0 || i > 0));
}
function nSi(e, t, n) {
  return (e.x - n.x) * (t.y - n.y) - (t.x - n.x) * (e.y - n.y);
}
function rSi(e) {
  return e.width <= 0 || e.height <= 0;
}
function w5(e) {
  let t = (0, CSi.c)(7);
  (0, E5.useContext)(Gxi);
  let n = (0, E5.useContext)(Wxi);
  if (e.disabled || e.tooltipContent == null) {
    let n;
    return (
      t[2] === e.children
        ? (n = t[3])
        : ((n = (0, D5.jsx)(D5.Fragment, { children: e.children })),
          (t[2] = e.children),
          (t[3] = n)),
      n
    );
  }
  let r = e.delayDuration ?? n ?? 200,
    i;
  return (
    t[4] !== e || t[5] !== r
      ? ((i = (0, D5.jsx)(cSi, { ...e, delayDuration: r })), (t[4] = e), (t[5] = r), (t[6] = i))
      : (i = t[6]),
    i
  );
}
function cSi({
  children: e,
  delayOpen: t,
  open: n,
  triggerPopupOpen: r = !1,
  defaultOpen: i,
  disableHoverOpen: a = !1,
  onOpenChange: o,
  onBeforeOpen: s,
  tooltipContent: c,
  shortcut: l,
  sideOffset: u,
  side: d,
  variant: f = `tooltip`,
  coachmarkArrow: p = `default`,
  align: m = `center`,
  alignOffset: h,
  flipAlignment: g = !0,
  disablePadding: _ = !1,
  disabled: v,
  forceMount: y = !1,
  triggerAsChild: b = !0,
  cloneCustomTrigger: x = !1,
  triggerRef: S,
  closeOnTriggerClick: C,
  openOnClick: w = !1,
  dialogLabel: T,
  openOnFocusWithin: E = !1,
  closeOnTriggerBlur: D = !0,
  closeOnPointerLeave: O = !0,
  closeOnWindowBlur: k = !0,
  delayDuration: A,
  getDelayDuration: j,
  selectable: M = !1,
  scrollable: N = !1,
  interactive: P = M,
  followPointer: F = !1,
  keyboardNavigation: ee = !1,
  scaleAvailableSizeWithZoom: te = !1,
  color: ne = `default`,
  tooltipClassName: re,
  tooltipBodyClassName: I,
  tooltipId: L,
  tooltipMaxWidth: R,
  skipDelayKey: ie = wSi,
  openWhen: ae = `always`,
  portalContainer: oe,
  positioningElement: se,
  triggerElement: ce,
  className: le,
  ref: ue,
  ...de
}) {
  let fe = (0, E5.useId)(),
    pe = L ?? fe,
    [me, he] = (0, E5.useState)(i === !0),
    ge = n !== void 0,
    _e = f === `tooltip` && !P && !ge,
    ve = C ?? _e,
    ye = (F === !0 || (F === `desktop` && !0)) && !P && f === `tooltip`,
    be = r && _e && ve;
  be && me && he(!1);
  let xe = (0, E5.useRef)(ce ?? null),
    Se = (0, E5.useRef)(null),
    Ce = (0, E5.useRef)(d ?? `top`),
    we = (0, E5.useRef)(null),
    Te = (0, E5.useRef)(null),
    Ee = (0, E5.useRef)(null),
    De = (0, E5.useRef)(null),
    Oe = (0, E5.useRef)(!1),
    ke = (0, E5.useRef)(null),
    Ae = (0, E5.useContext)(Gxi),
    je = !be && (n ?? me),
    Me = (0, E5.useRef)(je),
    Ne = (0, E5.useCallback)(() => {
      (ke.current?.(), (ke.current = null));
    }, []),
    Pe = (0, E5.useCallback)(() => {
      Ee.current == null ||
        typeof window > `u` ||
        (window.clearTimeout(Ee.current), (Ee.current = null));
    }, []),
    Fe = (0, E5.useCallback)(() => {
      De.current == null ||
        typeof window > `u` ||
        (window.clearTimeout(De.current), (De.current = null));
    }, []),
    Ie = (0, E5.useCallback)(() => {
      (Pe(), Fe(), Ne());
      let e = Me.current || (ge && je);
      ((Me.current = !1), Ae?.deactivateTooltip(pe), e && (ge || he(!1), o?.(!1)));
    }, [Ae, Fe, Pe, Ne, ge, je, o, pe]),
    Le = (0, E5.useCallback)(
      (e) => {
        (Me.current !== e || (ge && je !== e)) &&
          ((e && s?.() === !1) ||
            ((Me.current = e),
            e
              ? Ae?.activateTooltip(pe, ie, f, Ie)
              : (Ae?.clearHoverHandoffLock(pe), Ae?.deactivateTooltip(pe)),
            ge || he(e),
            o?.(e)));
      },
      [Ae, Ie, ge, je, s, o, ie, pe, f],
    );
  ((0, E5.useLayoutEffect)(() => {
    ((Me.current = je),
      Pe(),
      !je && (Fe(), Ne(), Ae?.clearHoverHandoffLock(pe), Ae?.deactivateTooltip(pe)));
  }, [Ae, Fe, Pe, Ne, a, ge, je, be, pe]),
    (0, E5.useEffect)(
      () => () => {
        (Pe(), Fe(), Ne(), Ae?.clearHoverHandoffLock(pe), Ae?.deactivateTooltip(pe));
      },
      [Ae, Fe, Pe, Ne, pe],
    ),
    (0, E5.useEffect)(() => Ae?.registerTooltipDismissHandler(pe, Ie, k), [Ae, Ie, k, pe]),
    (0, E5.useEffect)(() => {
      if (je) return Ae?.registerOpenTooltip(pe, f, Ie);
    }, [Ae, Ie, je, pe, f]));
  let Re = (e) => {
      if ((Fe(), Ne(), !(be || je || Me.current))) {
        if (Ee.current != null) {
          if (e !== 0) return;
          Pe();
        }
        if (vSi(xe.current, ae)) {
          if (e === 0 || typeof window > `u`) {
            Le(!0);
            return;
          }
          Ee.current = window.setTimeout(() => {
            ((Ee.current = null), vSi(xe.current, ae) && Le(!0));
          }, e);
        }
      }
    },
    ze = (0, E5.useCallback)(() => {
      (Pe(), Fe(), Ne(), Le(!1));
    }, [Fe, Pe, Ne, Le]),
    Be = () => {
      (Ae?.clearHoverHandoffLock(pe), Fe(), Ne());
    },
    Ve = () => {
      let e = Se.current;
      if (ee && P && e?.contains(e.ownerDocument.activeElement)) return;
      let t = M ? e?.ownerDocument.getSelection() : null;
      (t?.isCollapsed !== !1 || (!e?.contains(t.anchorNode) && !e?.contains(t.focusNode))) && ze();
    },
    He = (e, t = `content`) => {
      if ((Pe(), Fe(), Ne(), typeof window > `u`)) {
        ze();
        return;
      }
      let n = (e) => {
          (Fe(),
            (De.current = window.setTimeout(() => {
              De.current = null;
              let t = xe.current,
                n = Se.current,
                r = t?.ownerDocument,
                i =
                  r != null && typeof r.elementFromPoint == `function`
                    ? r.elementFromPoint(e.x, e.y)
                    : null;
              if (t?.contains(i) === !0 || n?.contains(i) === !0) {
                ke.current == null ? Be() : Ae?.clearHoverHandoffLock(pe);
                return;
              }
              Ve();
            }, TSi)));
        },
        r = Se.current,
        i = xe.current,
        a = { x: e.clientX, y: e.clientY };
      if (r == null || i == null) {
        n(a);
        return;
      }
      let o = t === `reference`,
        s = $xi({
          destinationElement: o ? i : r,
          destinationSide: o ? pSi(Ce.current) : Ce.current,
          onEnterDestination: Be,
          onMoveInsideTriangle: n,
          onMoveOutsideTriangle: Ve,
          pointer: a,
          sourceElement: o ? r : i,
        });
      (s != null && (Ae?.setHoverHandoffLockTooltipId(pe), (ke.current = s)), n(a));
    },
    Ue = (e) => {
      if (
        a ||
        !T5(xe.current, e.target) ||
        (ve && Oe.current) ||
        e.pointerType === `touch` ||
        Ae?.isHoverOpenBlocked(pe) === !0
      )
        return;
      (ye &&
        (e.pointerType === `mouse`
          ? ((we.current = new DOMRect(e.clientX, e.clientY)), Te.current?.())
          : we.current != null && ((we.current = null), Te.current?.())),
        Ae?.clearHoverHandoffLock(pe));
      let n = A ?? 0;
      (t && (n = 250), (n = Ae?.getOpenDelay(ie, n) ?? n), (n = j?.(e, n) ?? n), Re(n));
    },
    We = (e) => {
      T5(e.currentTarget, e.relatedTarget) || T5(xe.current, e.relatedTarget) || ze();
    },
    Ge = (e) => {
      if (!ee) {
        e.key === `Escape` && ze();
        return;
      }
      if (e.defaultPrevented) return;
      let t = Se.current,
        n = xe.current,
        r = n == null || n.tabIndex >= 0 ? n : hSi(n)[0],
        i = T5(t, e.target);
      if (e.key === `Escape`) {
        (P &&
          i &&
          T5(t, t?.ownerDocument.activeElement ?? null) &&
          (e.preventDefault(), e.stopPropagation(), r?.focus({ preventScroll: !0 })),
          ze());
        return;
      }
      if (
        e.key !== `Tab` ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        !P ||
        !je ||
        t == null ||
        n == null
      )
        return;
      let a = hSi(t),
        o;
      if (!i && !e.shiftKey) o = a[0];
      else if (i && e.shiftKey && e.target === a[0]) o = r ?? void 0;
      else if (i && !e.shiftKey && e.target === a.at(-1)) {
        let e = hSi(n.ownerDocument.body).filter((e) => !t.contains(e)),
          i = e.findIndex((e) => e === r);
        ((o = i < 0 ? void 0 : e[i + 1]), o != null && D && ze());
      }
      o != null && (e.preventDefault(), o.focus({ preventScroll: !0 }));
    },
    Ke = je ? `delayed-open` : `closed`,
    qe = {
      "aria-describedby": je && T == null ? pe : void 0,
      ...(T == null
        ? {}
        : { "aria-controls": je ? pe : void 0, "aria-haspopup": `dialog`, "aria-expanded": je }),
      "data-state": Ke,
      onClick(e) {
        if (w && !e.defaultPrevented) {
          Re(0);
          return;
        }
        ve && T5(xe.current, e.target) && ((Oe.current = !0), ze());
      },
      onBlur(e) {
        D && ((P && T5(Se.current, e.relatedTarget)) || ze());
      },
      onContextMenu() {
        (Pe(), ze());
      },
      onFocus(e) {
        let t = `nativeEvent` in e ? e.currentTarget : (ce ?? null);
        if (
          (ve && (t = xe.current),
          E && e.target instanceof HTMLElement && (t = e.target),
          ve && e.defaultPrevented)
        ) {
          ((Oe.current = !0), ze());
          return;
        }
        !e.defaultPrevented &&
          (!ve || T5(xe.current, e.target)) &&
          mSi(t) &&
          ((Oe.current = !1), we.current != null && ((we.current = null), Te.current?.()), Re(0));
      },
      onKeyDown: Ge,
      onPointerEnter(e) {
        (T5(xe.current, e.target) && ((Oe.current = !1), ee && P && je && Be()), Ue(e));
      },
      onPointerLeave(e) {
        if ((Pe(), O)) {
          if (P) {
            He(e);
            return;
          }
          (ze(), we.current != null && ((we.current = null), Te.current?.()));
        }
      },
      onPointerMove: Ue,
    },
    Je = (0, E5.useEffectEvent)(() => qe);
  ((0, E5.useEffect)(() => {
    if (!ee || !P || !je) return;
    let e = (e) => {
      e.key === `Escape` && T5(Se.current, e.target) && Je().onKeyDown(e);
    };
    return (
      window.addEventListener(`keydown`, e, !0),
      () => window.removeEventListener(`keydown`, e, !0)
    );
  }, [P, je, ee]),
    (0, E5.useEffect)(() => {
      if (ce == null) return;
      xe.current = ce;
      let e = new AbortController(),
        t = (t, n) => {
          ce.addEventListener(t, n, { signal: e.signal });
        };
      return (
        t(`click`, (e) => Je().onClick(e)),
        t(`focusout`, (e) => Je().onBlur(e)),
        t(`focusin`, (e) => Je().onFocus(e)),
        t(`contextmenu`, () => Je().onContextMenu()),
        t(`keydown`, (e) => Je().onKeyDown(e)),
        t(`pointerover`, (e) => {
          T5(ce, e.relatedTarget) || Je().onPointerEnter(e);
        }),
        t(`pointerout`, (e) => {
          T5(ce, e.relatedTarget) || Je().onPointerLeave(e);
        }),
        t(`pointermove`, (e) => Je().onPointerMove(e)),
        () => {
          (e.abort(), Pe(), Fe(), Ne(), Ae?.clearHoverHandoffLock(pe));
        }
      );
    }, [Ae, Fe, Pe, Ne, pe, ce]));
  let Ye = {
      ...qe,
      ...de,
      className: le,
      onClick:
        ve || w
          ? (e) => {
              (de.onClick?.(e), qe.onClick(e));
            }
          : de.onClick,
      onBlur(e) {
        (de.onBlur?.(e), qe.onBlur?.(e));
      },
      onContextMenu(e) {
        (de.onContextMenu?.(e), qe.onContextMenu?.());
      },
      onFocus(e) {
        (de.onFocus?.(e), qe.onFocus?.(e));
      },
      onKeyDown(e) {
        (de.onKeyDown?.(e), qe.onKeyDown?.(e));
      },
      onPointerEnter(e) {
        (de.onPointerEnter?.(e), qe.onPointerEnter?.(e));
      },
      onPointerLeave(e) {
        (de.onPointerLeave?.(e), qe.onPointerLeave?.(e));
      },
      onPointerMove(e) {
        (de.onPointerMove?.(e), qe.onPointerMove?.(e));
      },
    },
    Xe = (e) => {
      ((xe.current = e), ySi(ue, e));
    },
    Ze = (0, E5.isValidElement)(e) ? e.props.ref : void 0,
    Qe = (0, E5.useCallback)(
      (e) => {
        ((xe.current = e), ySi(ue, e), ySi(Ze, e), bSi(S, e));
      },
      [Ze, ue, S],
    ),
    $e;
  return (
    ($e =
      ce == null
        ? b
          ? (0, E5.isValidElement)(e)
            ? typeof e.type != `string` && !x
              ? (0, D5.jsx)(`span`, {
                  ref: (e) => {
                    let t = e?.firstElementChild ?? null;
                    Xe(xSi(t) ? t : e);
                  },
                  ...Ye,
                  className: q(`contents`, le),
                  children: e,
                })
              : uSi(e, Ye, qe[`aria-describedby`], ve || w, Qe)
            : (0, D5.jsx)(`span`, { ref: Xe, ...Ye, children: e })
          : (0, D5.jsx)(`button`, {
              ref: (e) => {
                (Xe(e), bSi(S, e));
              },
              type: `button`,
              ...Ye,
              children: e,
            })
        : e),
    (0, D5.jsxs)(D5.Fragment, {
      children: [
        $e,
        je || y
          ? (0, D5.jsx)(lSi, {
              id: pe,
              className: re,
              align: m,
              alignOffset: h,
              flipAlignment: g,
              contentRef: Se,
              disablePadding: _,
              dialogLabel: T,
              color: ne,
              coachmarkArrow: p,
              followPointer: ye,
              keyboardNavigation: ee && P,
              maxWidth: R,
              open: je,
              onBlur: P && D ? We : void 0,
              onKeyDown: P ? Ge : void 0,
              onPointerEnter: P ? Be : void 0,
              onPointerLeave:
                P && O
                  ? (e) => {
                      He(e, `reference`);
                    }
                  : void 0,
              placementSideRef: Ce,
              portalContainer: oe,
              pointerAnchorRef: we,
              positioningElement: se ?? ce,
              referenceElementRef: xe,
              scaleAvailableSizeWithZoom: te,
              selectable: M,
              scrollable: N,
              side: d,
              sideOffset: u,
              updatePositionRef: ye ? Te : void 0,
              variant: f,
              children: (0, D5.jsxs)(`div`, {
                className: q(
                  `flex gap-2`,
                  f === `tooltip` ? `items-center` : `items-stretch`,
                  f !== `tooltip` && `min-h-0 flex-1`,
                ),
                children: [
                  (0, D5.jsx)(`div`, {
                    className: q(
                      `min-w-0`,
                      f !== `tooltip` && `flex min-h-0 w-full`,
                      f === `coachmark` && `overflow-y-auto`,
                      f === `coachmark` && !_ && `px-4 py-3`,
                      I,
                    ),
                    children: c,
                  }),
                  l
                    ? (0, D5.jsx)(dxi, {
                        keysLabel: l,
                        variant: f === `tooltip` && ne === "default" ? `tooltip` : `default`,
                      })
                    : null,
                ],
              }),
            })
          : null,
      ],
    })
  );
}
function lSi({
  align: e,
  alignOffset: t,
  flipAlignment: n,
  children: r,
  className: i,
  color: a,
  coachmarkArrow: o,
  contentRef: s,
  disablePadding: c,
  dialogLabel: l,
  followPointer: u,
  id: d,
  keyboardNavigation: f,
  maxWidth: p,
  open: m,
  onBlur: h,
  onKeyDown: g,
  onPointerEnter: _,
  onPointerLeave: v,
  placementSideRef: y,
  portalContainer: b,
  pointerAnchorRef: x,
  positioningElement: S,
  referenceElementRef: C,
  scaleAvailableSizeWithZoom: w,
  selectable: T,
  scrollable: E,
  side: D,
  sideOffset: O,
  updatePositionRef: k,
  variant: A,
}) {
  let j = (0, E5.useContext)(v5),
    M = d5(),
    N = (0, E5.useRef)(S),
    [P, F] = (0, E5.useState)(null),
    [ee, te] = (0, E5.useState)(`top`),
    ne = D == null && A === `tooltip` && (a === "default" || a === `classicLight`),
    [re] = (0, E5.useState)(() => ({
      get contextElement() {
        return N.current ?? C.current ?? void 0;
      },
      getBoundingClientRect() {
        return (
          x.current ??
          N.current?.getBoundingClientRect() ??
          C.current?.getBoundingClientRect() ??
          kSi
        );
      },
    }));
  (0, E5.useLayoutEffect)(() => {
    ((N.current = S), u || (x.current = null));
  }, [u, x, S]);
  let I = b == null && M !== 1,
    L = I ? M : 1,
    R = A === `coachmark` ? L : 1,
    ie = w || A === `rich` ? L : R,
    ae = a === `surface` || a === `inverse` ? `px-2 py-1.5` : `px-3 py-1.25`,
    oe = o === `curved`,
    se = D === `left` || D === `right`,
    ce = ESi,
    le = ESi;
  oe && ((ce = se ? 14 : 36), (le = se ? 36 : 14));
  let ue = p5(() => u && x.current != null),
    de = tAe({
      elements: { reference: u ? re : (S ?? re) },
      open: !0,
      placement: dSi(D ?? (ne ? ee : `top`), e),
      middleware: [
        aAe(({ placement: e }) => {
          let n = O ?? 2;
          return (ue() && O == null && (n = 12), { mainAxis: n * R, crossAxis: (t ?? 0) * R });
        }),
        cAe({
          padding: 8,
          flipAlignment: n,
          crossAxis: n,
          fallbackAxisSideDirection: A === `rich` ? `end` : `none`,
        }),
        oAe({ padding: 8 }),
        lAe({
          padding: 8,
          apply({ availableWidth: e, availableHeight: t, elements: n, rects: r }) {
            (n.floating.style.setProperty(
              `--radix-tooltip-trigger-width`,
              `${Math.max(0, r.reference.width)}px`,
            ),
              n.floating.style.setProperty(
                `--radix-tooltip-content-available-width`,
                `${Math.max(0, e) / ie}px`,
              ),
              n.floating.style.setProperty(
                `--radix-tooltip-content-available-height`,
                `${Math.max(0, t) / ie}px`,
              ));
          },
        }),
        A === `coachmark` && dAe({ element: P, padding: 16 * R }),
      ],
      whileElementsMounted(e, t, n) {
        return ny(e, t, () => {
          let e = C.current;
          (ne &&
            e != null &&
            te(
              getComputedStyle(e).getPropertyValue(`--side-tooltip`).trim() === `bottom`
                ? `bottom`
                : `top`,
            ),
            n());
        });
      },
    });
  (0, E5.useLayoutEffect)(() => {
    if (k != null)
      return (
        (k.current = de.update),
        () => {
          k.current = null;
        }
      );
  }, [de.update, k]);
  let fe = fSi(de.placement),
    pe = de.refs.setFloating,
    me = (0, E5.useCallback)(
      (e) => {
        (I || pe(e), ySi(s, e), e != null && (y.current = fe));
      },
      [s, fe, y, pe, I],
    );
  if (typeof document > `u`) return null;
  let he =
      A === `coachmark`
        ? (0, D5.jsx)(`div`, {
            ref: F,
            className: q(
              `pointer-events-none absolute`,
              !oe && [
                `rotate-45 rounded-2xs`,
                a === `surface` ? `bg-surface-elevated-secondary` : `bg-coachmark`,
              ],
            ),
            style: {
              width: ce * R,
              height: le * R,
              left: de.middlewareData.arrow?.x,
              top: de.middlewareData.arrow?.y,
              [pSi(fe)]: -(oe ? 14 : ESi / 2) * R,
            },
            children:
              oe &&
              (0, D5.jsx)(`svg`, {
                className: se ? void 0 : `rtl:-scale-x-100`,
                "aria-hidden": `true`,
                width: `100%`,
                height: `100%`,
                viewBox: `0 0 ${ce} ${le}`,
                fill:
                  a === `surface`
                    ? `var(--color-surface-elevated-secondary)`
                    : `var(--color-background-coachmark)`,
                children: (0, D5.jsx)(`path`, {
                  d: `M0 0C4 0 6.5 1.2963 8 4.40741C9.5 7.77778 9 10.8889 11 12.7037C12.25 13.7407 13.75 13.7407 15 12.4444C19.25 7.51852 25.5 2.59259 32 0.777778C33.75 0.259259 34.75 0 36 0H0Z`,
                  transform: {
                    top: void 0,
                    bottom: `translate(0 14) scale(1 -1)`,
                    left: `matrix(0 -1 1 0 0 36)`,
                    right: `matrix(0 1 -1 0 14 0)`,
                  }[fe],
                }),
              }),
          })
        : null,
    ge = (0, D5.jsxs)(`div`, {
      id: d,
      ref: me,
      "data-overlay-owner": j?.id,
      "data-side": fe,
      "data-tooltip-keyboard-navigation": f ? `` : void 0,
      "aria-hidden": m ? void 0 : `true`,
      hidden: !m && A !== `unstyled`,
      role: l == null ? `tooltip` : `dialog`,
      "aria-label": l,
      className: q(
        `w-fit text-sm whitespace-normal break-words`,
        A === `tooltip` && !E && `min-h-min`,
        E && `overflow-y-auto`,
        T ? `select-text` : `select-none`,
        A === `floating-navigation-rail`
          ? `z-20 flex flex-col`
          : q(
              `z-50`,
              A !== `tooltip` && `flex flex-col`,
              A !== `tooltip` && A !== `coachmark` && `m-px`,
            ),
        (A === `rich` || A === `entityPreview`) &&
          `bg-surface-elevated-secondary text-default ring-border shadow-xl-spread ring-[0.5px]`,
        A === `rich` && `rounded-xl`,
        A === `entityPreview` && `rounded-3xl`,
        A === `coachmark` &&
          q(
            `relative rounded-2xl shadow-lg`,
            a === `surface`
              ? `bg-surface-elevated-secondary text-default`
              : `bg-coachmark text-coachmark`,
          ),
        A === `tooltip` && a === "default" && [oSi.textTheme, `text-center`],
        A === `tooltip` && a === `classicLight` && `text-center`,
        A === `tooltip` &&
          a === `surface` &&
          `rounded-md bg-surface-elevated-secondary text-secondary ring-border shadow-xl-spread ring-[0.5px]`,
        A === `tooltip` &&
          a === `classicLight` &&
          `rounded-full border border-(color:--color-border-tooltip-classic) bg-(--color-background-tooltip-classic) text-(color:--color-text-tooltip-classic) text-[14px] leading-[18px] font-semibold tracking-(--tracking-tooltip) shadow-(--shadow-tooltip)`,
        A === `tooltip` &&
          a !== `surface` &&
          a !== `classicLight` &&
          (a === `inverse`
            ? `border-text bg-primary-solid text-primary-solid rounded-2xl border`
            : `rounded-2xl border border-(color:--color-border-tooltip) bg-(--color-background-tooltip) text-(color:--color-text-tooltip) leading-4.5 font-(weight:--tooltip-compact-font-weight) tracking-(--tracking-tooltip) shadow-(--shadow-tooltip)`),
        A === `tooltip` && !c && ae,
        !m || (_ == null && v == null) ? `pointer-events-none` : `pointer-events-auto`,
        i,
      ),
      style: {
        ...(I ? void 0 : de.floatingStyles),
        zoom: I ? M : void 0,
        maxWidth:
          p ?? `min(20rem, var(--radix-tooltip-content-available-width), calc(100vw - 16px))`,
        maxHeight: `min(var(--radix-tooltip-content-available-height), calc(100vh - 16px))`,
      },
      onBlur: h,
      onKeyDown: g,
      onPointerEnter: _,
      onPointerLeave: v,
      children: [r, !I && he],
    });
  return (0, D5.jsx)(h5, {
    container: b ?? document.body,
    children: I
      ? (0, D5.jsxs)(`div`, {
          ref: pe,
          className: `pointer-events-none z-50`,
          "data-overlay-owner": j?.id,
          style: de.floatingStyles,
          children: [ge, he],
        })
      : ge,
  });
}
function uSi(e, t, n, r, i) {
  return (0, E5.cloneElement)(e, {
    ...t,
    "aria-describedby": gSi(e.props[`aria-describedby`], n),
    className: q(e.props.className, t.className),
    style: { ...t.style, ...e.props.style },
    ref: i,
    onClick: r
      ? (n) => {
          (e.props.onClick?.(n), t.onClick?.(n));
        }
      : (t.onClick ?? e.props.onClick),
    onBlur: (n) => {
      (e.props.onBlur?.(n), t.onBlur?.(n));
    },
    onContextMenu: (n) => {
      (e.props.onContextMenu?.(n), t.onContextMenu?.(n));
    },
    onFocus: (n) => {
      (e.props.onFocus?.(n), t.onFocus?.(n));
    },
    onKeyDown: (n) => {
      (e.props.onKeyDown?.(n), t.onKeyDown?.(n));
    },
    onPointerEnter: (n) => {
      (e.props.onPointerEnter?.(n), t.onPointerEnter?.(n));
    },
    onPointerLeave: (n) => {
      (e.props.onPointerLeave?.(n), t.onPointerLeave?.(n));
    },
    onPointerMove: (n) => {
      (e.props.onPointerMove?.(n), t.onPointerMove?.(n));
    },
  });
}
function dSi(e, t) {
  return t == null || t === `center` ? e : `${e}-${t}`;
}
function fSi(e) {
  return e === `top` || e.startsWith(`top-`)
    ? `top`
    : e === `right` || e.startsWith(`right-`)
      ? `right`
      : e === `bottom` || e.startsWith(`bottom-`)
        ? `bottom`
        : `left`;
}
function pSi(e) {
  switch (e) {
    case `top`:
      return `bottom`;
    case `right`:
      return `left`;
    case `bottom`:
      return `top`;
    case `left`:
      return `right`;
  }
}
function mSi(e) {
  try {
    return e?.matches(`:focus-visible`) === !0;
  } catch {
    return !1;
  }
}
function hSi(e) {
  return Array.from(
    e.querySelectorAll(`a[href], button, input, select, textarea, [tabindex], [contenteditable]`),
  )
    .filter((e) => {
      if (
        (e.tabIndex < 0 &&
          (e.hasAttribute(`tabindex`) ||
            !e.matches(
              `[contenteditable="true"], [contenteditable=""], [contenteditable="plaintext-only"]`,
            ))) ||
        e.matches(`:disabled`) ||
        e.closest(`[inert], [hidden]`) != null ||
        getComputedStyle(e).visibility === `hidden`
      )
        return !1;
      for (let t = e; t; t = t.parentElement) if (getComputedStyle(t).display === `none`) return !1;
      return !0;
    })
    .sort((e, t) => (e.tabIndex > 0 ? e.tabIndex : 1 / 0) - (t.tabIndex > 0 ? t.tabIndex : 1 / 0));
}
function T5(e, t) {
  return t instanceof (e?.ownerDocument.defaultView?.Node ?? Node) && e?.contains(t) === !0;
}
function gSi(e, t) {
  return e == null ? t : t == null ? e : `${e} ${t}`;
}
function _Si(e) {
  let t = e?.querySelector(DSi) ?? e;
  return t != null && (t.scrollWidth > t.clientWidth || t.scrollHeight > t.clientHeight);
}
function vSi(e, t) {
  switch (t) {
    case `always`:
      return !0;
    case `trigger-overflows`:
      return _Si(e);
    case `visibility-target-hidden`: {
      let t = e?.querySelector(OSi);
      return t != null && getComputedStyle(t).display === `none`;
    }
  }
}
function ySi(e, t) {
  if (e != null) {
    if (typeof e == `function`) {
      e(t);
      return;
    }
    e.current = t;
  }
}
function bSi(e, t) {
  if (e != null && (t == null || SSi(t))) {
    if (typeof e == `function`) {
      e(t);
      return;
    }
    e.current = t;
  }
}
function xSi(e) {
  let t = e?.ownerDocument.defaultView;
  return t == null ? e instanceof HTMLElement : e instanceof t.HTMLElement;
}
function SSi(e) {
  let t = e?.ownerDocument.defaultView;
  return t == null ? e instanceof HTMLButtonElement : e instanceof t.HTMLButtonElement;
}
 return {Tooltip:w5,TooltipProvider:Jxi,TooltipOverlayContext:v5,dismissTooltips:qxi};
}
