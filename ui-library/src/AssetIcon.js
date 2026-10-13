// Generated original asset renderer. See asset-renderer-manifest.json.
export function createAssetIcon(React){
const m2n=/^[A-Za-z_:][A-Za-z0-9_.:-]*$/,h2n=new Set(['icon','mask','clipPath']);
const ilr={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},Ibi=ilr,alr=React;
const olr={jsx:(type,props)=>React.createElement(type,props)},Lbi=olr;
function t2n(e) {
  return e.replace(/[.*+?^$(){}|[\]\\]/g, `\\$&`);
}
function n2n(e) {
  if (typeof e != `string` || !m2n.test(e))
    throw TypeError(`icon idPrefix must be a non-empty SVG identifier prefix`);
}
function r2n(e, t) {
  let n = new Set(
    [...e.matchAll(/(?:^|[\s<])id\s*=\s*(["'])([^"']+)\1/g)]
      .map((e) => e[2])
      .filter((e) => e != null),
  );
  if (t == null) {
    if (n.size > 0)
      throw TypeError(`icon idPrefix is required when the SVG body contains local IDs`);
    return e;
  }
  n2n(t);
  let r = e;
  for (let e of n) {
    let n = t + `-` + e,
      i = t2n(e);
    r = r
      .replace(
        RegExp(`((?:^|[\\s<])id\\s*=\\s*)(["'])` + i + `\\2`, `g`),
        (e, t, r) => t + r + n + r,
      )
      .replace(
        RegExp(`(url\\(\\s*)(["']?)#` + i + `\\2(\\s*\\))`, `g`),
        (e, t, r, i) => t + r + `#` + n + r + i,
      )
      .replace(
        RegExp(`((?:^|[\\s<])(?:xlink:)?href\\s*=\\s*)(["'])#` + i + `\\2`, `g`),
        (e, t, r) => t + r + `#` + n + r,
      );
  }
  return r;
}
function l2n(e, t) {
  if (!h2n.has(t)) throw TypeError(`unsupported icon capability ${t}`);
  if (!e.capabilities.includes(t))
    throw TypeError(`${e.name} does not support the ${t} capability`);
}
function u2n(e) {
  let t = e.frame,
    n = e.visualBounds;
  return (
    t != null &&
    n != null &&
    (n.x < t.x || n.y < t.y || n.x + n.width > t.x + t.width || n.y + n.height > t.y + t.height)
  );
}
function d2n(e) {
  return e.token != null || e.foundationToken != null
    ? (e.token ?? e.foundationToken)
    : (e.role === `brand` || e.role === `fixed`) &&
        e.wideGamut != null &&
        /^#[\da-f]{6}$/iu.test(e.color)
      ? `authored-` + e.color.slice(1).toLowerCase()
      : void 0;
}
function f2n(e) {
  if (e.paint.kind === `monochrome`) return {};
  let t = {};
  for (let n of e.paint.layers) {
    let e = d2n(n);
    if (e == null) continue;
    let r = e.replace(/^--/u, ``),
      i =
        n.foundationToken == null
          ? n.color
          : `var(--` + n.foundationToken.replace(/^--/u, ``) + `, ` + n.color + `)`,
      a =
        (n.role !== `brand` && n.role !== `fixed`) ||
        (n.wideGamut == null && n.wideGamutToken == null)
          ? i
          : `var(--icon-p3-` + r + `, ` + i + `)`;
    t[`--icon-` + r] = n.token == null ? a : `var(--` + r + `, ` + a + `)`;
  }
  return t;
}
function p2n(e) {
  if (e.paint.kind === `monochrome`) return e.body;
  let t = e.body,
    n = new Set(
      e.paint.layers
        .filter((e) => e.role === `foreground` || e.role === `accent`)
        .map((e) => e.color.toLowerCase()),
    ),
    r = [];
  for (let i of e.paint.layers) {
    let e = d2n(i);
    if (e == null) continue;
    let a = e.replace(/^--/u, ``);
    ((t = t.replaceAll(
      RegExp(
        `\\b(` +
          (i.role === `brand` || i.role === `fixed`
            ? n.has(i.color.toLowerCase())
              ? `stop-color`
              : `fill|stroke|stop-color`
            : `fill|stroke`) +
          `)=(["'])` +
          i.color.replace(/[.*+?^${}()|[\]\\]/gu, `\\$&`) +
          `\\2`,
        `giu`,
      ),
      `$1="var(--icon-` + a + `, ` + i.color + `)"`,
    )),
      (i.role === `brand` || i.role === `fixed`) &&
        i.wideGamut != null &&
        r.push(
          `--icon-p3-` +
            a +
            `:` +
            (i.wideGamutToken == null
              ? i.wideGamut
              : `var(--` + i.wideGamutToken.replace(/^--/u, ``) + `,` + i.wideGamut + `)`),
        ));
  }
  return r.length === 0
    ? t
    : `<style>@supports (color:color(display-p3 1 1 1)){@media (color-gamut:p3){svg[data-icon-p3="` +
        e.name +
        `"]{` +
        r.join(`;`) +
        `}}}</style>` +
        t;
}
function tlr(e, t) {
  let n = u2n(e.canvas);
  if (t == null) return { x: 0, y: 0, overflows: n };
  let r = e.canvas.frame ?? { x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
    i = { x: r.x + r.width / 2, y: r.y + r.height / 2 },
    a =
      t === `composite`
        ? (e.optical.anchors?.ink ?? e.optical.center ?? i)
        : (e.optical.anchors?.foreground ?? e.optical.anchors?.ink ?? e.optical.center ?? i),
    o = Number((i.x - a.x).toFixed(6)),
    s = Number((i.y - a.y).toFixed(6));
  if (o === 0 && s === 0) return { x: o, y: s, overflows: n };
  let c = e.canvas.visualBounds;
  return {
    x: o,
    y: s,
    overflows:
      n ||
      c == null ||
      c.x + o < r.x ||
      c.y + s < r.y ||
      c.x + o + c.width > r.x + r.width ||
      c.y + s + c.height > r.y + r.height,
  };
}
function llr(e) {
  return `kind` in e && e.kind === `inline` ? e.preset : e;
}
function mlr(e, t) {
  if (`kind` in e) {
    let n = e.alignment[t ?? `authored`];
    return {
      kind: `sprite`,
      href: e.href,
      transform: n.x === 0 && n.y === 0 ? void 0 : `translate(${n.x} ${n.y})`,
      style: { ...e.style, ...(n.overflows ? { overflow: `visible` } : {}) },
      supportsWideGamut: !1,
    };
  }
  return { kind: `inline`, ...hlr(e, t) };
}
function hlr(e, t) {
  let { x: n, y: r, overflows: i } = tlr(e, t),
    a = p2n(e);
  return {
    body: n === 0 && r === 0 ? a : `<g transform="translate(${n} ${r})">${a}</g>`,
    style: { ...f2n(e), ...(i ? { overflow: `visible` } : {}) },
    supportsWideGamut:
      e.paint.kind === `multicolor` &&
      e.paint.layers.some((e) => (e.role === `brand` || e.role === `fixed`) && e.wideGamut != null),
  };
}
function rlr(e) {
  let t = (0, ilr.c)(34),
    { preset: n, icon: r, svgProps: i, idPrefix: a, label: o } = e,
    s,
    c,
    l,
    u,
    d,
    f,
    p,
    m;
  t[0] === i
    ? ((s = t[1]),
      (c = t[2]),
      (l = t[3]),
      (u = t[4]),
      (d = t[5]),
      (f = t[6]),
      (p = t[7]),
      (m = t[8]))
    : (({
        "aria-hidden": s,
        className: u,
        focusable: d,
        role: p,
        style: m,
        "aria-label": c,
        "aria-labelledby": l,
        ...f
      } = i),
      (t[0] = i),
      (t[1] = s),
      (t[2] = c),
      (t[3] = l),
      (t[4] = u),
      (t[5] = d),
      (t[6] = f),
      (t[7] = p),
      (t[8] = m));
  let h = (0, alr.useId)(),
    g = c ?? (o == null || o === `` ? void 0 : o),
    _ = (g != null && g !== ``) || (l != null && l !== ``),
    v;
  t[9] !== r.body ||
  t[10] !== r.href ||
  t[11] !== r.kind ||
  t[12] !== r.transform ||
  t[13] !== a ||
  t[14] !== h ||
  t[15] !== n.name
    ? ((v =
        r.kind === `sprite`
          ? {
              children: (0, olr.jsx)(`use`, {
                href: r.href,
                fill: `currentColor`,
                transform: r.transform,
              }),
            }
          : { dangerouslySetInnerHTML: { __html: r2n(r.body, a ?? `${n.name}-${h}`) } }),
      (t[9] = r.body),
      (t[10] = r.href),
      (t[11] = r.kind),
      (t[12] = r.transform),
      (t[13] = a),
      (t[14] = h),
      (t[15] = n.name),
      (t[16] = v))
    : (v = t[16]);
  let y = v,
    b = s ?? (!_ || void 0),
    x = r.supportsWideGamut ? n.name : void 0,
    S = p ?? (_ ? `img` : void 0),
    C;
  t[17] !== r.style || t[18] !== m
    ? ((C = { ...r.style, ...m }), (t[17] = r.style), (t[18] = m), (t[19] = C))
    : (C = t[19]);
  let w;
  return (
    t[20] !== g ||
    t[21] !== l ||
    t[22] !== u ||
    t[23] !== y ||
    t[24] !== d ||
    t[25] !== n.canvas.height ||
    t[26] !== n.canvas.viewBox ||
    t[27] !== n.canvas.width ||
    t[28] !== f ||
    t[29] !== b ||
    t[30] !== x ||
    t[31] !== S ||
    t[32] !== C
      ? ((w = (0, olr.jsx)(`svg`, {
          ...f,
          "aria-hidden": b,
          "aria-label": g,
          "aria-labelledby": l,
          className: u,
          "data-icon-p3": x,
          focusable: d,
          height: n.canvas.height,
          role: S,
          style: C,
          viewBox: n.canvas.viewBox,
          width: n.canvas.width,
          xmlns: `http://www.w3.org/2000/svg`,
          ...y,
        })),
        (t[20] = g),
        (t[21] = l),
        (t[22] = u),
        (t[23] = y),
        (t[24] = d),
        (t[25] = n.canvas.height),
        (t[26] = n.canvas.viewBox),
        (t[27] = n.canvas.width),
        (t[28] = f),
        (t[29] = b),
        (t[30] = x),
        (t[31] = S),
        (t[32] = C),
        (t[33] = w))
      : (w = t[33]),
    w
  );
}
function t5(e) {
  let t = (0, Ibi.c)(18),
    n,
    r,
    i,
    a,
    o;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]), (a = t[4]), (o = t[5]))
    : (({ asset: r, alignment: n, idPrefix: i, label: a, ...o } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = i),
      (t[4] = a),
      (t[5] = o));
  let s, c, l;
  if (t[6] !== n || t[7] !== r) {
    let e = llr(r);
    (`kind` in e || l2n(e, `icon`),
      (s = rlr),
      (c = e),
      (l = mlr(e, n)),
      (t[6] = n),
      (t[7] = r),
      (t[8] = s),
      (t[9] = c),
      (t[10] = l));
  } else ((s = t[8]), (c = t[9]), (l = t[10]));
  let u;
  return (
    t[11] !== s || t[12] !== i || t[13] !== a || t[14] !== o || t[15] !== c || t[16] !== l
      ? ((u = (0, Lbi.jsx)(s, { preset: c, icon: l, svgProps: o, idPrefix: i, label: a })),
        (t[11] = s),
        (t[12] = i),
        (t[13] = a),
        (t[14] = o),
        (t[15] = c),
        (t[16] = l),
        (t[17] = u))
      : (u = t[17]),
    u
  );
}
return t5;
}
