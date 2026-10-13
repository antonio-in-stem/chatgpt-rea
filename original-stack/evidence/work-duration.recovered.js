// Source: app-primary-19fe57fd8c00.js
function D7e(e) {
  let t = (0, RW.c)(7),
    { status: n, startedAtMs: r, completedAtMs: i } = e,
    a = fp(),
    [o, s] = (0, k7e.useState)(O7e),
    c;
  (t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((c = () => {
        s(Date.now());
      }),
      (t[0] = c))
    : (c = t[0]),
    ID(c, n === `working` && i == null ? 1e3 : null));
  let l = Math.max((i ?? o) - r, 0),
    u;
  t[1] !== l || t[2] !== a.locale
    ? ((u = r_e(l, a.locale)), (t[1] = l), (t[2] = a.locale), (t[3] = u))
    : (u = t[3]);
  let d;
  return (
    t[4] !== l || t[5] !== u
      ? ((d = { timeLabel: u, elapsedMs: l }), (t[4] = l), (t[5] = u), (t[6] = d))
      : (d = t[6]),
    d
  );
}

// Source: app-shared-737655e1fb23.js
function Cwr({ items: e, status: t, workStartedAtMs: n, finalAssistantStartedAtMs: r }) {
  let i = wwr(e, t);
  if (i < 0) return e;
  let a = nxr({
    status: t,
    hasStartedWork: Ewr(e, i),
    workStartedAtMs: n,
    workedCompletedAtMs: Owr({ items: e, status: t, finalAssistantStartedAtMs: r }),
  });
  if (a == null) return e;
  let o = t === `complete` ? i : Twr(e);
  return [...e.slice(0, o), a, ...e.slice(o)];
}
function wwr(e, t) {
  if (t === `in_progress`) {
    for (let [t, n] of e.entries())
      if (
        n.type === `assistant-message` &&
        n.phase === `final_answer` &&
        n.delivery !== `async` &&
        n.requestUserInputAsync == null
      )
        return t;
    return e.length;
  }
  if (t === `cancelled`) return e.length;
  for (let t = e.length - 1; t >= 0; --t) if (e[t]?.type === `assistant-message`) return t;
  return -1;
}
function Twr(e) {
  for (let [t, n] of e.entries()) if (!Dwr(n)) return t;
  return e.length;
}
function Ewr(e, t) {
  for (let n = 0; n < t; n += 1) if (!Dwr(e[n])) return !0;
  return !1;
}
function Dwr(e) {
  return (
    e == null ||
    e.type === `user-message` ||
    e.type === `external-event` ||
    e.type === `realtime-transcript` ||
    e.type === `worktree-init`
  );
}
function Owr({ items: e, status: t, finalAssistantStartedAtMs: n }) {
  if (t !== `in_progress`) return n;
  if (n == null) return null;
  for (let t of e) if (t.type === `assistant-message` && D0n(t)) return n;
  return null;
}

// Source: app-shared-737655e1fb23.js
function nxr({ status: e, hasStartedWork: t, workStartedAtMs: n, workedCompletedAtMs: r }) {
  return !t || n == null
    ? null
    : e === `cancelled`
      ? { type: `worked-for`, status: `unknown`, startedAtMs: n, completedAtMs: null }
      : r == null
        ? e === `in_progress`
          ? { type: `worked-for`, status: `working`, startedAtMs: n, completedAtMs: null }
          : null
        : { type: `worked-for`, status: `worked`, startedAtMs: n, completedAtMs: r };
}
