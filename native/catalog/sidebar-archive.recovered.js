function Azo(e) {
  let t = (0, i0.c)(12),
    { onArchive: n, archiveAriaLabel: r, useStableTrailingRail: i } = e,
    a;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((a = ng(
        o0,
        `pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-visible:pointer-events-auto group-focus-visible:opacity-100 group-has-[:focus-visible]:pointer-events-auto group-has-[:focus-visible]:opacity-100`,
      )),
      (t[0] = a))
    : (a = t[0]);
  let o;
  t[1] === i
    ? (o = t[2])
    : ((o = i ? { insetInlineEnd: `var(--task-row-trailing-inset)` } : void 0),
      (t[1] = i),
      (t[2] = o));
  let s;
  t[3] === n
    ? (s = t[4])
    : ((s = (e) => {
        (e.stopPropagation(), n());
      }),
      (t[3] = n),
      (t[4] = s));
  let c;
  t[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((c = (0, a0.jsx)(cp, { "aria-hidden": !1, asset: sre })), (t[5] = c))
    : (c = t[5]);
  let l;
  t[6] !== r || t[7] !== s
    ? ((l = (0, a0.jsx)(Wa, {
        color: `secondary`,
        variant: `transparent`,
        size: `3xs`,
        uniform: !0,
        onPointerDown: Mzo,
        onKeyDown: jzo,
        onClick: s,
        "aria-label": r,
        children: c,
      })),
      (t[6] = r),
      (t[7] = s),
      (t[8] = l))
    : (l = t[8]);
  let u;
  return (
    t[9] !== o || t[10] !== l
      ? ((u = (0, a0.jsx)(`div`, { className: a, style: o, children: l })),
        (t[9] = o),
        (t[10] = l),
        (t[11] = u))
      : (u = t[11]),
    u
  );
}
function jzo(e) {
  (e.key === `Enter` || e.key === ` `) && e.stopPropagation();
}
function Mzo(e) {
  return e.stopPropagation();
}
