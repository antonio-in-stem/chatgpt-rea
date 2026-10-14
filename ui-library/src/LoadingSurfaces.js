// Original loading lines, deterministic width generation and content row.
import {t as r} from './BundleRuntime.js';
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
var sRt = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this,
          n = o();
        ((t.next = function () {
          var e = 2091639 * t.s0 + t.c * 23283064365386963e-26;
          return ((t.s0 = t.s1), (t.s1 = t.s2), (t.s2 = e - (t.c = e | 0)));
        }),
          (t.c = 1),
          (t.s0 = n(` `)),
          (t.s1 = n(` `)),
          (t.s2 = n(` `)),
          (t.s0 -= n(e)),
          t.s0 < 0 && (t.s0 += 1),
          (t.s1 -= n(e)),
          t.s1 < 0 && (t.s1 += 1),
          (t.s2 -= n(e)),
          t.s2 < 0 && (t.s2 += 1),
          (n = null));
      }
      function i(e, t) {
        return ((t.c = e.c), (t.s0 = e.s0), (t.s1 = e.s1), (t.s2 = e.s2), t);
      }
      function a(e, t) {
        var n = new r(e),
          a = t && t.state,
          o = n.next;
        return (
          (o.int32 = function () {
            return (n.next() * 4294967296) | 0;
          }),
          (o.double = function () {
            return o() + ((o() * 2097152) | 0) * 11102230246251565e-32;
          }),
          (o.quick = o),
          a &&
            (typeof a == `object` && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      function o() {
        var e = 4022871197;
        return function (t) {
          t = String(t);
          for (var n = 0; n < t.length; n++) {
            e += t.charCodeAt(n);
            var r = 0.02519603282416938 * e;
            ((e = r >>> 0), (r -= e), (r *= e), (e = r >>> 0), (r -= e), (e += r * 4294967296));
          }
          return (e >>> 0) * 23283064365386963e-26;
        };
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.alea = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  cRt = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this,
          n = ``;
        ((t.x = 0),
          (t.y = 0),
          (t.z = 0),
          (t.w = 0),
          (t.next = function () {
            var e = t.x ^ (t.x << 11);
            return ((t.x = t.y), (t.y = t.z), (t.z = t.w), (t.w ^= (t.w >>> 19) ^ e ^ (e >>> 8)));
          }),
          e === (e | 0) ? (t.x = e) : (n += e));
        for (var r = 0; r < n.length + 64; r++) ((t.x ^= n.charCodeAt(r) | 0), t.next());
      }
      function i(e, t) {
        return ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t);
      }
      function a(e, t) {
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (typeof a == `object` && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.xor128 = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  lRt = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this,
          n = ``;
        ((t.next = function () {
          var e = t.x ^ (t.x >>> 2);
          return (
            (t.x = t.y),
            (t.y = t.z),
            (t.z = t.w),
            (t.w = t.v),
            ((t.d = (t.d + 362437) | 0) + (t.v = t.v ^ (t.v << 4) ^ (e ^ (e << 1)))) | 0
          );
        }),
          (t.x = 0),
          (t.y = 0),
          (t.z = 0),
          (t.w = 0),
          (t.v = 0),
          e === (e | 0) ? (t.x = e) : (n += e));
        for (var r = 0; r < n.length + 64; r++)
          ((t.x ^= n.charCodeAt(r) | 0),
            r == n.length && (t.d = (t.x << 10) ^ (t.x >>> 4)),
            t.next());
      }
      function i(e, t) {
        return ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), (t.v = e.v), (t.d = e.d), t);
      }
      function a(e, t) {
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (typeof a == `object` && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.xorwow = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  uRt = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this;
        t.next = function () {
          var e = t.x,
            n = t.i,
            r = e[n],
            i;
          return (
            (r ^= r >>> 7),
            (i = r ^ (r << 24)),
            (r = e[(n + 1) & 7]),
            (i ^= r ^ (r >>> 10)),
            (r = e[(n + 3) & 7]),
            (i ^= r ^ (r >>> 3)),
            (r = e[(n + 4) & 7]),
            (i ^= r ^ (r << 7)),
            (r = e[(n + 7) & 7]),
            (r ^= r << 13),
            (i ^= r ^ (r << 9)),
            (e[n] = i),
            (t.i = (n + 1) & 7),
            i
          );
        };
        function n(e, t) {
          var n,
            r = [];
          if (t === (t | 0)) r[0] = t;
          else
            for (t = `` + t, n = 0; n < t.length; ++n)
              r[n & 7] = (r[n & 7] << 15) ^ ((t.charCodeAt(n) + r[(n + 1) & 7]) << 13);
          for (; r.length < 8; ) r.push(0);
          for (n = 0; n < 8 && r[n] === 0; ++n);
          for (n == 8 ? (r[7] = -1) : r[n], e.x = r, e.i = 0, n = 256; n > 0; --n) e.next();
        }
        n(t, e);
      }
      function i(e, t) {
        return ((t.x = e.x.slice()), (t.i = e.i), t);
      }
      function a(e, t) {
        e ??= +new Date();
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (a.x && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.xorshift7 = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  dRt = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this;
        t.next = function () {
          var e = t.w,
            n = t.X,
            r = t.i,
            i,
            a;
          return (
            (t.w = e = (e + 1640531527) | 0),
            (a = n[(r + 34) & 127]),
            (i = n[(r = (r + 1) & 127)]),
            (a ^= a << 13),
            (i ^= i << 17),
            (a ^= a >>> 15),
            (i ^= i >>> 12),
            (a = n[r] = a ^ i),
            (t.i = r),
            (a + (e ^ (e >>> 16))) | 0
          );
        };
        function n(e, t) {
          var n,
            r,
            i,
            a,
            o,
            s = [],
            c = 128;
          for (
            t === (t | 0)
              ? ((r = t), (t = null))
              : ((t += `\0`), (r = 0), (c = Math.max(c, t.length))),
              i = 0,
              a = -32;
            a < c;
            ++a
          )
            (t && (r ^= t.charCodeAt((a + 32) % t.length)),
              a === 0 && (o = r),
              (r ^= r << 10),
              (r ^= r >>> 15),
              (r ^= r << 4),
              (r ^= r >>> 13),
              a >= 0 &&
                ((o = (o + 1640531527) | 0), (n = s[a & 127] ^= r + o), (i = n == 0 ? i + 1 : 0)));
          for (i >= 128 && (s[((t && t.length) || 0) & 127] = -1), i = 127, a = 512; a > 0; --a)
            ((r = s[(i + 34) & 127]),
              (n = s[(i = (i + 1) & 127)]),
              (r ^= r << 13),
              (n ^= n << 17),
              (r ^= r >>> 15),
              (n ^= n >>> 12),
              (s[i] = r ^ n));
          ((e.w = o), (e.X = s), (e.i = i));
        }
        n(t, e);
      }
      function i(e, t) {
        return ((t.i = e.i), (t.w = e.w), (t.X = e.X.slice()), t);
      }
      function a(e, t) {
        e ??= +new Date();
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (a.X && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.xor4096 = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  fRt = r((e, t) => {
    (function (e, t, n) {
      function r(e) {
        var t = this,
          n = ``;
        ((t.next = function () {
          var e = t.b,
            n = t.c,
            r = t.d,
            i = t.a;
          return (
            (e = (e << 25) ^ (e >>> 7) ^ n),
            (n = (n - r) | 0),
            (r = (r << 24) ^ (r >>> 8) ^ i),
            (i = (i - e) | 0),
            (t.b = e = (e << 20) ^ (e >>> 12) ^ n),
            (t.c = n = (n - r) | 0),
            (t.d = (r << 16) ^ (n >>> 16) ^ i),
            (t.a = (i - e) | 0)
          );
        }),
          (t.a = 0),
          (t.b = 0),
          (t.c = -1640531527),
          (t.d = 1367130551),
          e === Math.floor(e) ? ((t.a = (e / 4294967296) | 0), (t.b = e | 0)) : (n += e));
        for (var r = 0; r < n.length + 20; r++) ((t.b ^= n.charCodeAt(r) | 0), t.next());
      }
      function i(e, t) {
        return ((t.a = e.a), (t.b = e.b), (t.c = e.c), (t.d = e.d), t);
      }
      function a(e, t) {
        var n = new r(e),
          a = t && t.state,
          o = function () {
            return (n.next() >>> 0) / 4294967296;
          };
        return (
          (o.double = function () {
            do var e = ((n.next() >>> 11) + (n.next() >>> 0) / 4294967296) / (1 << 21);
            while (e === 0);
            return e;
          }),
          (o.int32 = n.next),
          (o.quick = o),
          a &&
            (typeof a == `object` && i(a, n),
            (o.state = function () {
              return i(n, {});
            })),
          o
        );
      }
      t && t.exports
        ? (t.exports = a)
        : n && n.amd
          ? n(function () {
              return a;
            })
          : (this.tychei = a);
    })(e, typeof t == `object` && t, typeof define == `function` && define);
  }),
  pRt = r((e, t) => {
    t.exports = {};
  }),
  mRt = r((e, t) => {
    (function (e, n, r) {
      var i = 256,
        a = 6,
        o = 52,
        s = `random`,
        c = r.pow(i, a),
        l = r.pow(2, o),
        u = l * 2,
        d = i - 1,
        f;
      function p(e, t, o) {
        var d = [];
        t = t == 1 ? { entropy: !0 } : t || {};
        var f = _(g(t.entropy ? [e, y(n)] : (e ?? v()), 3), d),
          p = new m(d),
          b = function () {
            for (var e = p.g(a), t = c, n = 0; e < l; ) ((e = (e + n) * i), (t *= i), (n = p.g(1)));
            for (; e >= u; ) ((e /= 2), (t /= 2), (n >>>= 1));
            return (e + n) / t;
          };
        return (
          (b.int32 = function () {
            return p.g(4) | 0;
          }),
          (b.quick = function () {
            return p.g(4) / 4294967296;
          }),
          (b.double = b),
          _(y(p.S), n),
          (
            t.pass ||
            o ||
            function (e, t, n, i) {
              return (
                i &&
                  (i.S && h(i, p),
                  (e.state = function () {
                    return h(p, {});
                  })),
                n ? ((r[s] = e), t) : e
              );
            }
          )(b, f, `global` in t ? t.global : this == r, t.state)
        );
      }
      function m(e) {
        var t,
          n = e.length,
          r = this,
          a = 0,
          o = (r.i = r.j = 0),
          s = (r.S = []);
        for (n || (e = [n++]); a < i; ) s[a] = a++;
        for (a = 0; a < i; a++) ((s[a] = s[(o = d & (o + e[a % n] + (t = s[a])))]), (s[o] = t));
        (r.g = function (e) {
          for (var t, n = 0, a = r.i, o = r.j, s = r.S; e--; )
            ((t = s[(a = d & (a + 1))]),
              (n = n * i + s[d & ((s[a] = s[(o = d & (o + t))]) + (s[o] = t))]));
          return ((r.i = a), (r.j = o), n);
        })(i);
      }
      function h(e, t) {
        return ((t.i = e.i), (t.j = e.j), (t.S = e.S.slice()), t);
      }
      function g(e, t) {
        var n = [],
          r = typeof e,
          i;
        if (t && r == `object`)
          for (i in e)
            try {
              n.push(g(e[i], t - 1));
            } catch {}
        return n.length ? n : r == `string` ? e : e + `\0`;
      }
      function _(e, t) {
        for (var n = e + ``, r, i = 0; i < n.length; )
          t[d & i] = d & ((r ^= t[d & i] * 19) + n.charCodeAt(i++));
        return y(t);
      }
      function v() {
        try {
          var t;
          return (
            f && (t = f.randomBytes)
              ? (t = t(i))
              : ((t = new Uint8Array(i)), (e.crypto || e.msCrypto).getRandomValues(t)),
            y(t)
          );
        } catch {
          var r = e.navigator,
            a = r && r.plugins;
          return [+new Date(), e, a, e.screen, y(n)];
        }
      }
      function y(e) {
        return String.fromCharCode.apply(0, e);
      }
      if ((_(r.random(), n), typeof t == `object` && t.exports)) {
        t.exports = p;
        try {
          f = pRt();
        } catch {}
      } else
        typeof define == `function` && define.amd
          ? define(function () {
              return p;
            })
          : (r[`seed` + s] = p);
    })(typeof self < `u` ? self : e, [], Math);
  }),
  hRt = r((e, t) => {
    var n = sRt(),
      r = cRt(),
      i = lRt(),
      a = uRt(),
      o = dRt(),
      s = fRt(),
      c = mRt();
    ((c.alea = n),
      (c.xor128 = r),
      (c.xorwow = i),
      (c.xorshift7 = a),
      (c.xor4096 = o),
      (c.tychei = s),
      (t.exports = c));
  });
export function createLoadingSurfaces({React,motionPreference,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c)throw new TypeError('LoadingSurfaces requires the React compiler runtime');
 const h=React.createElement,ERt={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key})},KFc=ERt,wRt=compilerRuntime,GFc=compilerRuntime,ft=createMotionPreference(React,motionPreference),TRt={default:hRt()},DRt=120,e=fn=>fn;
 const E7i=()=>{};let Xws;
 let gRt,_Rt,vRt,yRt,bRt;
function rC(e) {
  "use forget";
  let t = (0, wRt.c)(21),
    {
      className: n,
      animate: r,
      lineClassName: i,
      lines: a,
      maxWidth: o,
      minWidth: s,
      seed: c,
      size: l,
      variant: u,
    } = e,
    d = r === void 0 || r,
    f = a === void 0 ? 3 : a,
    p = o === void 0 ? 100 : o,
    m = s === void 0 ? 55 : s,
    h = c === void 0 ? `shimmer-lines` : c,
    g = l === void 0 ? `md` : l,
    _;
  t[0] !== f || t[1] !== p || t[2] !== m || t[3] !== h
    ? ((_ = SRt({ count: f, maxWidth: p, minWidth: m, seed: h })),
      (t[0] = f),
      (t[1] = p),
      (t[2] = m),
      (t[3] = h),
      (t[4] = _))
    : (_ = t[4]);
  let v = _,
    y;
  t[5] === n
    ? (y = t[6])
    : ((y = ng(`flex w-full flex-col items-start gap-2`, n)), (t[5] = n), (t[6] = y));
  let b;
  if (t[7] !== d || t[8] !== i || t[9] !== v || t[10] !== g || t[11] !== u) {
    let e;
    (t[13] !== d || t[14] !== i || t[15] !== g || t[16] !== u
      ? ((e = (e, t) =>
          (0, ERt.jsx)(
            iC,
            { className: i, animate: d, delayMs: -t * DRt, size: g, variant: u, widthPercent: e },
            t,
          )),
        (t[13] = d),
        (t[14] = i),
        (t[15] = g),
        (t[16] = u),
        (t[17] = e))
      : (e = t[17]),
      (b = v.map(e)),
      (t[7] = d),
      (t[8] = i),
      (t[9] = v),
      (t[10] = g),
      (t[11] = u),
      (t[12] = b));
  } else b = t[12];
  let x;
  return (
    t[18] !== y || t[19] !== b
      ? ((x = (0, ERt.jsx)(`div`, { className: y, children: b })),
        (t[18] = y),
        (t[19] = b),
        (t[20] = x))
      : (x = t[20]),
    x
  );
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
function SRt({ count: e, maxWidth: t, minWidth: n, seed: r }) {
  let i = CRt(Math.min(n, t)),
    a = CRt(Math.max(n, t)),
    o = a - i,
    s = (0, TRt.default)(`${r}:${e}:${i}:${a}`);
  return Array.from({ length: Math.max(0, e) }, () => i + s() * o);
}
function CRt(e) {
  return Math.max(1, Math.min(100, e));
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
function WFc(e) {
  let t = (0, GFc.c)(8),
    { children: n, className: r, padding: i } = e,
    a = i === void 0 ? `default` : i,
    o,
    s;
  if (t[0] !== n || t[1] !== r || t[2] !== a) {
    s = Symbol.for(`react.early_return_sentinel`);
    bb0: {
      let e = ng(`min-w-0 text-size-chat`, r);
      if (a === `offset`) {
        s = (0, KFc.jsx)(`div`, {
          className: ng(e, `relative overflow-visible py-0`),
          children: n,
        });
        break bb0;
      }
      o = ng(e, `py-0`);
    }
    ((t[0] = n), (t[1] = r), (t[2] = a), (t[3] = o), (t[4] = s));
  } else ((o = t[3]), (s = t[4]));
  if (s !== Symbol.for(`react.early_return_sentinel`)) return s;
  let c;
  return (
    t[5] !== n || t[6] !== o
      ? ((c = (0, KFc.jsx)(`div`, { className: o, children: n })),
        (t[5] = n),
        (t[6] = o),
        (t[7] = c))
      : (c = t[7]),
    c
  );
}
function Bws(e) {
  return Jws(e)?.releaseFamily ?? null;
}
function Wws(e, t) {
  let n = Jws(e),
    r = Jws(t);
  return n == null || r == null
    ? !1
    : n.major > r.major || (n.major === r.major && n.minor > r.minor);
}
function Hws({ isLocaleInfoLoaded: e, locale: t }) {
  return e && uq(t);
}
function Jws(e) {
  let t = e?.trim().match(Xws),
    n = t?.groups?.major,
    r = t?.groups?.minor;
  if (n == null || r == null) return null;
  let i = Yws(n),
    a = Yws(r);
  return { major: Number(i), minor: Number(a), releaseFamily: `${i}.${a}` };
}
function Yws(e) {
  return e.replace(/^0+(?=\d)/, ``);
}
function Zws() {
  return (Zws = e(() => {
    (E7i(), (Xws = /^(?<major>\d+)\.(?<minor>\d+)(?:\.\d+)*(?:[-+][0-9A-Za-z.-]+)?$/));
  }))();
}
function uq(e) {
  let t = lq(e);
  return t == null ? !1 : t === `en` || t.startsWith(`en-`);
}
function lq(e) {
  if (!e) return null;
  let t = e.trim();
  return t ? t.replace(/_/g, `-`).toLowerCase() : null;
}
 xRt();Zws();return {ShimmerLines:rC,LoadingShimmer:iC,ContentRow:WFc,shimmerWidths:SRt,isFeedEnabled:Hws,parseVersion:Bws,isNewVersion:Wws};
}
