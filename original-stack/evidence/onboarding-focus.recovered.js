// Readable original lines 448328-448338
  i,
) {
  let a = performance.now() - n,
    o = Date.now() - r,
    s = i == null || i < r ? a : Math.min(a, i - r + Math.max(0, a - o));
  t(eze, { focusIntervalId: e, focusedDurationMs: Ds(Math.max(0, Math.round(s))) });
}
function CBs(e, t) {
  (e.set(EP, t), t || n8n(e));
}
var wBs, TBs, EBs;
// Readable original lines 464267-464324
      (a3s = 600));
  }))();
}
function s3s(e) {
  let t = (0, u3s.c)(10),
    {
      durationSeconds: n,
      fadeIn: r,
      isSettingUpEnterpriseAccount: i,
      loading: a,
      loadingTimeoutSeconds: o,
      onComplete: s,
    } = e,
    c = n === void 0 ? 2 : n,
    l = r !== void 0 && r,
    u = i !== void 0 && i,
    d = a !== void 0 && a,
    f = G(EP) === !0,
    p = Bxe() === !0;
  if (s == null || !f) {
    let e;
    return (
      t[0] !== l || t[1] !== u
        ? ((e = (0, M8.jsx)(l3s, { fadeIn: l, isSettingUpEnterpriseAccount: u })),
          (t[0] = l),
          (t[1] = u),
          (t[2] = e))
        : (e = t[2]),
      e
    );
  }
  let m = p ? 0 : c,
    h;
  return (
    t[3] !== l || t[4] !== u || t[5] !== d || t[6] !== o || t[7] !== s || t[8] !== m
      ? ((h = (0, M8.jsx)(c3s, {
          durationSeconds: m,
          fadeIn: l,
          isSettingUpEnterpriseAccount: u,
          loading: d,
          loadingTimeoutSeconds: o,
          onComplete: s,
        })),
        (t[3] = l),
        (t[4] = u),
        (t[5] = d),
        (t[6] = o),
        (t[7] = s),
        (t[8] = m),
        (t[9] = h))
      : (h = t[9]),
    h
  );
}
function c3s(e) {
  let t = (0, u3s.c)(27),
    {
      durationSeconds: n,
