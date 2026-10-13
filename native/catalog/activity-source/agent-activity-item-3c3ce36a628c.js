const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./result-card-11f81e323347.js",
      "./app-shared-737655e1fb23.js",
      "./rolldown-runtime-2d059c5e81f4.js",
      "./app-shared-9a94b907ed47.css",
      "./result-card-e503eecb3d23.js",
      "./app-initial-b8e1c8014bb4.js",
      "./app-initial-99e8b4b455fa.css",
      "./app-primary-19fe57fd8c00.js",
      "./app-primary-6a01c6b721a4.css",
      "./result-values-e874a88530ca.js",
    ]),
) => i.map((i) => d[i]);
import { n as e } from "./rolldown-runtime-2d059c5e81f4.js";
import {
  Af as t,
  Agn as n,
  Ak as r,
  Apt as i,
  Avn as a,
  Blt as o,
  Bxn as s,
  Df as c,
  Dot as l,
  Dxn as u,
  Fdt as d,
  Fft as f,
  Flt as p,
  GRt as m,
  JOt as h,
  Jft as g,
  Jg as _,
  KRt as v,
  Mvn as y,
  NCn as b,
  Nan as ee,
  Nvn as te,
  Of as ne,
  Oot as x,
  Oxn as S,
  Pdt as re,
  Pft as C,
  Plt as ie,
  Ran as ae,
  Rft as oe,
  SN as w,
  Tft as se,
  Tut as ce,
  Vlt as le,
  Vvn as T,
  X8 as ue,
  Y8 as de,
  YOt as fe,
  Yft as pe,
  Yg as me,
  _St as he,
  _Ut as ge,
  _st as _e,
  agt as ve,
  alt as ye,
  azt as be,
  bmt as xe,
  crn as Se,
  dRt as Ce,
  du as we,
  fUt as Te,
  fu as Ee,
  gMt as De,
  gUt as Oe,
  gk as ke,
  gst as Ae,
  hk as je,
  igt as Me,
  ilt as Ne,
  izt as Pe,
  jpt as Fe,
  kf as Ie,
  kk as E,
  kvn as Le,
  m2t as Re,
  nOt as ze,
  nfn as D,
  p2t as Be,
  pRt as Ve,
  qin as He,
  rOt as Ue,
  sfn as O,
  srn as We,
  tOt as Ge,
  tfn as Ke,
  vMt as qe,
  vSt as Je,
  vgn as k,
  w6t as Ye,
  wft as Xe,
  wut as Ze,
  x2t as Qe,
  xbn as $e,
  xmt as et,
  yN as A,
  ygn as j,
  zRt as tt,
  zft as nt,
  zxn as rt,
} from "./app-shared-737655e1fb23.js";
import {
  $S as it,
  AS as at,
  BS as ot,
  DC as st,
  EC as ct,
  GT as M,
  Hx as lt,
  LS as ut,
  MEn as dt,
  NS as ft,
  OC as pt,
  PEn as mt,
  PS as ht,
  QS as gt,
  RS as _t,
  US as vt,
  UT as N,
  Ux as yt,
  VS as bt,
  Vx as xt,
  XS as St,
  _4t as Ct,
  _S as wt,
  cS as Tt,
  g4t as Et,
  hS as Dt,
  jS as Ot,
  kS as kt,
  mS as At,
  qS as jt,
  sS as Mt,
  uS as Nt,
  zS as Pt,
} from "./app-initial-b8e1c8014bb4.js";
import {
  Bl as Ft,
  dh as P,
  eg as It,
  fh as F,
  ih as I,
  rh as L,
  tg as Lt,
  zl as Rt,
} from "./app-primary-19fe57fd8c00.js";
import {
  a as zt,
  c as R,
  d as Bt,
  f as Vt,
  h as Ht,
  i as Ut,
  m as Wt,
  p as Gt,
  u as z,
} from "./mcp-tool-activity-label-4bb7ebebac24.js";
import {
  a as Kt,
  c as qt,
  l as Jt,
  n as Yt,
  s as Xt,
  t as Zt,
} from "./skill-exploration-labels-364a24528438.js";
import {
  i as Qt,
  n as $t,
  r as en,
} from "./mcp-tool-call-approval-200fc3f9beb5.js";
function tn(e, t, n = !1) {
  let r = an.get(e);
  if (e === `manage_page_comment`) {
    let e = on.safeParse(t);
    e.success && e.data.action === `resolve`
      ? (r = Ie)
      : e.success && e.data.action === `react` && (r = Xe);
  }
  return r == null
    ? null
    : (0, rn.jsx)(E, { className: `shrink-0 text-text/60`, asset: n ? x : r });
}
function nn(e, t, n = !1) {
  let r = de({
      appContext: e.appContext,
      apps: t,
      functionName: e.functionName,
      serverName: e.invocation.server,
      toolName: e.invocation.tool,
    }),
    i = Ht({
      appContext: e.appContext,
      matchingApp: r,
      serverName: e.invocation.server,
      toolName: e.invocation.tool,
    });
  return i == null
    ? null
    : (tn(
        Ut({
          matchingApp: i,
          toolName: e.appContext?.actionName ?? e.invocation.tool,
        }),
        e.invocation.arguments,
        n,
      ) ?? (0, rn.jsx)(E, { className: `shrink-0 text-text/60`, asset: x }));
}
var rn, an, on;
function sn() {
  return (sn = e(() => {
    (et(),
      t(),
      Fe(),
      me(),
      nt(),
      f(),
      se(),
      d(),
      Ze(),
      o(),
      ie(),
      Ne(),
      c(),
      Ae(),
      T(),
      r(),
      l(),
      zt(),
      ue(),
      (rn = n()),
      (an = new Map([
        [`list_spaces`, x],
        [`get_space`, x],
        [`create_space`, ye],
        [`list_pages`, ne],
        [`find_pages`, ce],
        [`create_page`, oe],
        [`read_page`, _e],
        [`read_artifact`, C],
        [`connect_spaces_artifact`, C],
        [`read_page_reference`, C],
        [`read_page_transcript`, C],
        [`read_page_changes`, _],
        [`edit_page`, le],
        [`create_page_visualization`, xe],
        [`list_page_comments`, i],
        [`manage_page_comment`, i],
        [`search_sharing_recipients`, ce],
        [`get_page_sharing`, p],
        [`get_space_sharing`, p],
        [`update_page_sharing`, re],
        [`update_space_sharing`, re],
      ])),
      (on = S({ action: s() })));
  }))();
}
function cn({ item: e, mcpServerStatuses: t }) {
  if (e.isMcpAppWidgetSuperseded === !0 || (e.completed && e.result == null))
    return `not-mcp-app`;
  if (Ce(e)?.type === `chatgpt-automation`) return `mcp-app`;
  let n = e.result?.type === `success` ? e.result.raw : null;
  return e.mcpAppResourceUri != null ||
    tt({
      mcpServerStatuses: t,
      server: e.invocation.server,
      tool: e.invocation.tool,
      toolResult: n,
    }) != null
    ? `mcp-app`
    : n == null
      ? `not-mcp-app`
      : t == null
        ? `maybe-mcp-app`
        : `not-mcp-app`;
}
function ln({ item: e, mcpServerStatuses: t }) {
  return (
    cn({ item: e, mcpServerStatuses: t }) === `mcp-app` &&
    !v({ isCodexAppsServer: be(e.invocation.server), result: e.result })
  );
}
function un({ item: e, mcpServerStatuses: t }) {
  return (
    cn({ item: e, mcpServerStatuses: t }) !== `not-mcp-app` &&
    !v({ isCodexAppsServer: be(e.invocation.server), result: e.result })
  );
}
function dn(e) {
  return e.some((e) =>
    e.kind !== `item` || e.item.type !== `mcp-tool-call`
      ? !1
      : e.item.result?.type === `success` ||
        (!e.item.completed &&
          e.item.result == null &&
          e.item.mcpAppResourceUri == null),
  );
}
function fn() {
  return (fn = e(() => {
    (Pe(), Ve(), m());
  }))();
}
function pn(e, t, n) {
  let r = Oe.safeParse(e.arguments);
  if (!r.success) return null;
  if (t === `row` && e.completed && e.success !== !1)
    return (0, B.jsx)(mn, { details: r.data });
  let i;
  return (
    (i = e.completed
      ? e.success === !1
        ? (0, B.jsx)(O, {
            id: `restricted.environmentSetup.result.failed`,
            defaultMessage: `Couldn’t prepare environment draft`,
            description: `Activity shown when an environment draft could not be finalized`,
          })
        : (0, B.jsx)(O, {
            id: `restricted.environmentSetup.result.completed`,
            defaultMessage: `Prepared environment draft`,
            description: `Activity shown when an environment draft has been finalized`,
          })
      : (0, B.jsx)(O, {
          id: `restricted.environmentSetup.result.finalizing`,
          defaultMessage: `Preparing environment draft`,
          description: `Activity shown while an environment draft is being finalized`,
        })),
    (0, B.jsxs)(P, {
      className: k(
        `text-size-chat text-text/40`,
        t === `row`
          ? `group-hover:text-default`
          : `group-hover/activity-header:text-default`,
      ),
      children: [
        t === `summary-text`
          ? null
          : (n ??
            (0, B.jsx)(E, {
              className: `shrink-0 text-text/60`,
              "aria-hidden": !1,
              asset: g,
            })),
        (0, B.jsx)(N, { active: !e.completed, children: i }),
      ],
    })
  );
}
var B, mn, hn;
function gn() {
  return (gn = e(() => {
    (pe(),
      j(),
      w(),
      ge(),
      D(),
      r(),
      je(),
      M(),
      F(),
      (B = n()),
      a(),
      (mn = ke(() =>
        Le(
          () =>
            import(`./result-card-11f81e323347.js`).then(
              (e) => e.EnvironmentSetupPrototypeResultCard,
            ),
          __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
          import.meta.url,
        ),
      )),
      (hn = [A, null].map((e) => ({
        namespace: e,
        render: pn,
        renderAgentActivityIcon: () =>
          (0, B.jsx)(E, {
            className: `shrink-0 text-text/60`,
            "aria-hidden": !1,
            asset: g,
          }),
        persistentInCollapsedConversation: !0,
        standaloneInConversation: !0,
        tool: Te,
      }))));
  }))();
}
function _n(e, t) {
  let n;
  if (t.kind === `chatgpt`)
    n = De(`clientThreadId` in t ? t.clientThreadId : t.threadId);
  else if (`clientThreadId` in t) n = Se(t.clientThreadId);
  else {
    mt({
      event: e,
      href: `codex://threads/${encodeURIComponent(t.threadId)}`,
      initiator: `open_in_browser_bridge`,
      originHostId: t.hostId,
    });
    return;
  }
  te.dispatchHostMessage({ type: `navigate-to-route`, path: n });
}
function vn() {
  return (vn = e(() => {
    (Qe(), qe(), dt(), y());
  }))();
}
function yn(e) {
  let t = (0, V.c)(25),
    { agentActivityIcon: n, item: r, operation: i, variant: a } = e,
    o =
      r != null && r.completed && r.success === !0
        ? Sn(r.contentItems ?? null)
        : null,
    s = i == null ? (o?.operationId ?? r.callId) : i.id,
    c = ae(xt, s),
    l = i ?? c,
    u =
      l == null
        ? o == null
          ? (r?.completed ?? !1)
          : yt(o.status)
        : yt(l.status),
    d =
      l == null
        ? r?.success
        : l.status === `error`
          ? !1
          : l.status === `success` || l.status === `warning`,
    f = `running`;
  u && (f = d === !1 ? `failed` : `completed`);
  let p;
  t[0] === r
    ? (p = t[1])
    : ((p = r == null ? null : R(r)), (t[0] = r), (t[1] = p));
  let m = p,
    h;
  t[2] === m?.icon
    ? (h = t[3])
    : ((h =
        m?.icon ??
        (0, H.jsx)(Bt, { className: `icon-xs shrink-0 text-text/60` })),
      (t[2] = m?.icon),
      (t[3] = h));
  let g = h,
    _ = null;
  if (m != null) {
    let e;
    (t[4] !== m.message || t[5] !== m.values
      ? ((e = (0, H.jsx)(O, { ...m.message, values: m.values })),
        (t[4] = m.message),
        (t[5] = m.values),
        (t[6] = e))
      : (e = t[6]),
      (_ = e));
  } else if (i != null) {
    let e;
    (t[7] === i
      ? (e = t[8])
      : ((e = (0, H.jsx)(bn, { operation: i })), (t[7] = i), (t[8] = e)),
      (_ = e));
  }
  if (a !== `row`) {
    let e = a === `summary-text` ? null : g,
      n = r == null ? !u : !r.completed,
      i = a !== `summary-text` && `min-w-0 truncate`,
      o;
    t[9] === i ? (o = t[10]) : ((o = k(i)), (t[9] = i), (t[10] = o));
    let s;
    t[11] !== _ || t[12] !== n || t[13] !== o
      ? ((s = (0, H.jsx)(N, { active: n, className: o, children: _ })),
        (t[11] = _),
        (t[12] = n),
        (t[13] = o),
        (t[14] = s))
      : (s = t[14]);
    let c;
    return (
      t[15] !== e || t[16] !== s
        ? ((c = (0, H.jsxs)(P, {
            className: `text-size-chat text-text/40 group-hover/activity-header:text-default`,
            children: [e, s],
          })),
          (t[15] = e),
          (t[16] = s),
          (t[17] = c))
        : (c = t[17]),
      c
    );
  }
  let v = n ?? g,
    y;
  t[18] === l
    ? (y = t[19])
    : ((y = l?.steps.map((e) =>
        (0, H.jsx)(
          It,
          {
            compact: !0,
            direction: l.direction,
            localBranch: l.localBranch,
            sourceBranch: l.sourceBranch,
            step: e,
            worktreeBranch: l.worktreeBranch,
          },
          e.id,
        ),
      )),
      (t[18] = l),
      (t[19] = y));
  let b;
  return (
    t[20] !== f || t[21] !== _ || t[22] !== v || t[23] !== y
      ? ((b = (0, H.jsx)(en, {
          indentContent: !1,
          icon: v,
          status: f,
          summary: _,
          children: y,
        })),
        (t[20] = f),
        (t[21] = _),
        (t[22] = v),
        (t[23] = y),
        (t[24] = b))
      : (b = t[24]),
    b
  );
}
function bn(e) {
  let t = (0, V.c)(10),
    { operation: n } = e,
    r;
  t[0] === n
    ? (r = t[1])
    : ((r = (0, H.jsx)(xn, { operation: n })), (t[0] = n), (t[1] = r));
  let i = r;
  if (n.status === `queued` || n.status === `running`) {
    let e;
    return (
      t[2] === i
        ? (e = t[3])
        : ((e = (0, H.jsx)(O, {
            id: `localConversation.threadHandoff.inline.active`,
            defaultMessage: `Handing off to {destination}`,
            description: `In-progress label for handing the current task to another run location`,
            values: { destination: i },
          })),
          (t[2] = i),
          (t[3] = e)),
      e
    );
  }
  if (n.status === `error`) {
    let e;
    return (
      t[4] === i
        ? (e = t[5])
        : ((e = (0, H.jsx)(O, {
            id: `localConversation.threadHandoff.inline.failed`,
            defaultMessage: `Failed to hand off to {destination}`,
            description: `Failed label for handing the current task to another run location`,
            values: { destination: i },
          })),
          (t[4] = i),
          (t[5] = e)),
      e
    );
  }
  if (n.status === `warning`) {
    let e;
    return (
      t[6] === i
        ? (e = t[7])
        : ((e = (0, H.jsx)(O, {
            id: `localConversation.threadHandoff.inline.warning`,
            defaultMessage: `Handoff to {destination} needs attention`,
            description: `Warning label for handing the current task to another run location`,
            values: { destination: i },
          })),
          (t[6] = i),
          (t[7] = e)),
      e
    );
  }
  let a;
  return (
    t[8] === i
      ? (a = t[9])
      : ((a = (0, H.jsx)(O, {
          id: `localConversation.threadHandoff.inline.completed`,
          defaultMessage: `Handed off to {destination}`,
          description: `Completed label for handing the current task to another run location`,
          values: { destination: i },
        })),
        (t[8] = i),
        (t[9] = a)),
    a
  );
}
function xn(e) {
  let t = (0, V.c)(4),
    { operation: n } = e;
  if (n.direction === `to-local`) {
    let e;
    return (
      t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, H.jsx)(O, {
            id: `localConversation.threadHandoff.inline.destination.local`,
            defaultMessage: `local`,
            description: `Destination noun used in an inline task handoff status`,
          })),
          (t[0] = e))
        : (e = t[0]),
      e
    );
  }
  if (n.direction === `to-worktree`) {
    let e;
    return (
      t[1] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, H.jsx)(O, {
            id: `localConversation.threadHandoff.inline.destination.worktree`,
            defaultMessage: `worktree`,
            description: `Destination noun used in an inline task handoff status`,
          })),
          (t[1] = e))
        : (e = t[1]),
      e
    );
  }
  let r;
  return (
    t[2] === n.request.destinationLabel
      ? (r = t[3])
      : ((r = (0, H.jsx)(H.Fragment, { children: n.request.destinationLabel })),
        (t[2] = n.request.destinationLabel),
        (t[3] = r)),
    r
  );
}
function Sn(e) {
  let t = e?.find((e) => e.type === `inputText`)?.text;
  if (t == null) return null;
  try {
    let e = JSON.parse(t),
      n = Cn.safeParse(e);
    return n.success ? n.data : null;
  } catch {
    return null;
  }
}
var V, H, Cn;
function wn() {
  return (wn = e(() => {
    ((V = b()),
      j(),
      ee(),
      D(),
      T(),
      lt(),
      Lt(),
      Vt(),
      z(),
      M(),
      F(),
      Qt(),
      (H = n()),
      (Cn = S({
        destinationHostDisplayName: s().min(1),
        operationId: s().min(1),
        status: $e([`queued`, `running`, `success`, `warning`, `error`]),
        threadTitle: s().min(1),
      })));
  }))();
}
function Tn() {
  return (0, G.jsx)(E, { className: `shrink-0 text-text/60`, asset: we });
}
function U(e) {
  return R(e)?.icon ?? null;
}
function En(e, t, n) {
  return An.safeParse(e.arguments).success
    ? (0, G.jsx)(yn, { agentActivityIcon: n, item: e, variant: t })
    : null;
}
function Dn(e) {
  let t = An.safeParse(e.arguments);
  return t.success
    ? JSON.stringify([t.data.threadId, t.data.destinationHostId ?? null])
    : null;
}
function On(e) {
  let t = jn.safeParse(e.arguments);
  return t.success ? t.data.operationId : null;
}
function W(e, t, n, r = !0) {
  let i = R(e, r);
  if (i == null) return null;
  let a =
      e.tool === `create_thread` &&
      e.completed &&
      e.success === !0 &&
      t === `row`
        ? kn(e.contentItems ?? null)
        : null,
    o =
      t === `row` &&
      (e.tool === `read_thread` || e.tool === `send_message_to_thread`)
        ? Mn.safeParse(e.arguments)
        : null,
    s = o?.success === !0 ? o.data.threadId : null,
    c;
  a == null
    ? s != null &&
      (c = () => {
        let e = He(s);
        te.dispatchHostMessage({
          type: `navigate-to-route`,
          path: Je() ? We(e) : Se(e),
        });
      })
    : (c = (e) => _n(e, a));
  let l = t === `row` && n !== void 0,
    u = l ? `summary-text` : t,
    d = (0, G.jsxs)(P, {
      className: k(
        `text-size-chat`,
        u === `row`
          ? `text-text-tertiary/90`
          : `text-text/40 group-hover/activity-header:text-default`,
      ),
      children: [
        u === `summary-text` ? null : U(e),
        (0, G.jsx)(N, {
          active: !e.completed,
          className: k(
            u !== `summary-text` && `min-w-0 truncate`,
            c != null && `group-hover:!text-default`,
          ),
          children: (0, G.jsx)(O, { ...i.message, values: i.values }),
        }),
      ],
    }),
    f =
      c == null
        ? d
        : (0, G.jsx)(`button`, {
            type: `button`,
            className: `group max-w-full cursor-interaction rounded-md text-start focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`,
            onClick: c,
            children: d,
          });
  return l ? (0, G.jsx)(L, { icon: n, summary: f }) : f;
}
function kn(e) {
  let t = e?.find((e) => e.type === `inputText`)?.text;
  return t == null ? null : Ye(t);
}
var G, An, jn, Mn, Nn;
function Pn() {
  return (Pn = e(() => {
    (Ee(),
      j(),
      Qe(),
      w(),
      it(),
      Ot(),
      jt(),
      D(),
      T(),
      r(),
      he(),
      y(),
      I(),
      z(),
      vn(),
      M(),
      wn(),
      F(),
      (G = n()),
      (An = S({
        destinationHostId: s().min(1).optional(),
        threadId: s().min(1),
      })),
      (jn = S({ operationId: s().min(1) })),
      (Mn = S({ threadId: s().min(1) })),
      (Nn = [
        { namespace: A, render: W, renderAgentActivityIcon: U, tool: ht },
        { namespace: A, render: W, renderAgentActivityIcon: U, tool: ft },
        {
          getCompletedSummaryPartKey: Dn,
          namespace: A,
          render: En,
          renderAgentActivityIcon: U,
          standaloneInConversation: !0,
          tool: at,
        },
        {
          getCompletedSummaryPartKey: On,
          namespace: A,
          render: W,
          renderAgentActivityIcon: U,
          summaryOnlyInConversationGroup: !0,
          tool: kt,
        },
        {
          continuesLiveActivityBetweenCalls: !0,
          namespace: A,
          render: W,
          renderAgentActivityIcon: U,
          tool: ut,
        },
        {
          continuesLiveActivityBetweenCalls: !0,
          namespace: A,
          render: W,
          renderAgentActivityIcon: U,
          tool: _t,
        },
        { namespace: A, render: W, renderAgentActivityIcon: U, tool: Pt },
        { namespace: A, render: W, renderAgentActivityIcon: U, tool: bt },
        { namespace: A, render: W, renderAgentActivityIcon: U, tool: ot },
        { namespace: A, render: W, renderAgentActivityIcon: U, tool: vt },
        { namespace: A, renderAgentActivityIcon: Tn, tool: St },
        { namespace: A, renderAgentActivityIcon: Tn, tool: gt },
      ]));
  }))();
}
var Fn;
function In() {
  return (In = e(() => {
    (Pn(),
      (Fn = Nn.filter(({ tool: e }) => e === `create_thread`).map((e) => ({
        ...e,
        namespace: null,
      }))));
  }))();
}
var Ln;
function Rn() {
  return (Rn = e(() => {
    (w(),
      wt(),
      (Ln = [A, null].map((e) => ({
        namespace: e,
        tool: Dt,
        hiddenInConversation: !0,
      }))));
  }))();
}
var K, zn;
function Bn() {
  return (Bn = e(() => {
    (w(),
      At(),
      Tt(),
      Wt(),
      sn(),
      (K = {
        namespace: A,
        tool: Mt,
        getActivityMessage: (e, t) =>
          Gt({
            tool: e.tool,
            toolArguments: e.arguments,
            completed: e.completed,
            isLeadingSummaryPart: t,
          }),
        renderAgentActivityIcon: (e, t) => tn(e.tool, e.arguments, t),
        getCompletedSummaryPartKey: (e) =>
          Gt({ tool: e.tool, toolArguments: e.arguments, completed: !0 })?.id ??
          null,
      }),
      (zn = [K, { ...K, tool: Nt }, { ...K, tool: `read_artifact` }]));
  }))();
}
function Vn(e, t) {
  let n = e.favIconUrl?.trim();
  if (n == null || n.length === 0) return null;
  let r = (e.url ?? e.pendingUrl ?? ``).trim();
  if (r.length === 0 || t == null) return n;
  try {
    let e = new URL(t.getURL(`/_favicon/`));
    return (
      e.searchParams.set(`pageUrl`, r),
      e.searchParams.set(`size`, `32`),
      e.toString()
    );
  } catch {
    return n;
  }
}
function Hn() {
  return (Hn = e(() => {}))();
}
function Un(e) {
  let t = (0, q.c)(25),
    {
      item: n,
      isLeadingSummaryPart: r,
      tabId: i,
      variant: a,
      agentActivityIcon: o,
    } = e,
    s = r === void 0 || r,
    { data: c } = Gn(n, i),
    l = c?.faviconUrl ?? null,
    u = c?.title ?? null,
    d;
  if (u != null) {
    let e;
    (t[0] !== s || t[1] !== n.completed || t[2] !== u
      ? ((e = n.completed
          ? (0, J.jsx)(O, {
              ...(s ? Y.completedWithTitle : Y.completedWithTitleFollowing),
              values: { title: u },
            })
          : (0, J.jsx)(O, { ...Y.activeWithTitle, values: { title: u } })),
        (t[0] = s),
        (t[1] = n.completed),
        (t[2] = u),
        (t[3] = e))
      : (e = t[3]),
      (d = e));
  } else {
    let e;
    (t[4] !== s || t[5] !== n.completed
      ? ((e = n.completed
          ? (0, J.jsx)(O, { ...(s ? Y.completed : Y.completedFollowing) })
          : (0, J.jsx)(O, { ...Y.active })),
        (t[4] = s),
        (t[5] = n.completed),
        (t[6] = e))
      : (e = t[6]),
      (d = e));
  }
  let f = !n.completed,
    p = a !== `summary-text` && `min-w-0 truncate`,
    m;
  t[7] === p ? (m = t[8]) : ((m = k(p)), (t[7] = p), (t[8] = m));
  let h;
  t[9] !== d || t[10] !== f || t[11] !== m
    ? ((h = (0, J.jsx)(N, { active: f, className: m, children: d })),
      (t[9] = d),
      (t[10] = f),
      (t[11] = m),
      (t[12] = h))
    : (h = t[12]);
  let g = h;
  if (a === `row` && o !== void 0) {
    let e;
    return (
      t[13] !== o || t[14] !== g
        ? ((e = (0, J.jsx)(L, { icon: o, summary: g })),
          (t[13] = o),
          (t[14] = g),
          (t[15] = e))
        : (e = t[15]),
      e
    );
  }
  let _ =
      a === `row`
        ? `text-text-tertiary/90`
        : `text-text/40 group-hover/activity-header:text-default`,
    v;
  t[16] === _
    ? (v = t[17])
    : ((v = k(`text-size-chat`, _)), (t[16] = _), (t[17] = v));
  let y;
  t[18] !== l || t[19] !== a
    ? ((y =
        a !== `summary-text` && l != null
          ? (0, J.jsx)(Et, {
              src: l,
              className: `icon-xs text-tertiary`,
              showFallbackWhileLoading: !1,
            })
          : null),
      (t[18] = l),
      (t[19] = a),
      (t[20] = y))
    : (y = t[20]);
  let b;
  return (
    t[21] !== g || t[22] !== v || t[23] !== y
      ? ((b = (0, J.jsxs)(P, { className: v, children: [y, g] })),
        (t[21] = g),
        (t[22] = v),
        (t[23] = y),
        (t[24] = b))
      : (b = t[24]),
    b
  );
}
function Wn(e) {
  let t = (0, q.c)(2),
    { item: n, tabId: r } = e,
    { data: i } = Gn(n, r),
    a;
  return (
    t[0] === i
      ? (a = t[1])
      : ((a =
          i?.faviconUrl == null
            ? null
            : (0, J.jsx)(Et, {
                src: i.faviconUrl,
                className: `icon-xs text-tertiary`,
                showFallbackWhileLoading: !1,
              })),
        (t[0] = i),
        (t[1] = a)),
    a
  );
}
function Gn(e, t) {
  let n = (0, q.c)(9),
    r = !e.completed,
    i;
  n[0] === t ? (i = n[1]) : ((i = () => Kn(t)), (n[0] = t), (n[1] = i));
  let a;
  n[2] !== e.callId || n[3] !== t
    ? ((a = [`chrome-tab-context-tool-call-metadata`, e.callId, t]),
      (n[2] = e.callId),
      (n[3] = t),
      (n[4] = a))
    : (a = n[4]);
  let o;
  return (
    n[5] !== r || n[6] !== i || n[7] !== a
      ? ((o = { enabled: r, queryFn: i, queryKey: a, staleTime: 1 / 0 }),
        (n[5] = r),
        (n[6] = i),
        (n[7] = a),
        (n[8] = o))
      : (o = n[8]),
    Re(o)
  );
}
async function Kn(e) {
  let t = Ue();
  if (t?.tabs == null) return null;
  try {
    let n = await t.tabs.get(e);
    return { faviconUrl: Vn(n, t.runtime), title: n.title?.trim() || null };
  } catch {
    return null;
  }
}
var q, J, Y;
function qn() {
  return (qn = e(() => {
    ((q = b()),
      Be(),
      j(),
      D(),
      Hn(),
      Ct(),
      I(),
      M(),
      F(),
      (J = n()),
      (Y = Ke({
        completedWithTitle: {
          id: `localConversation.chromeExtensionToolCall.getTabContext.completedWithTitle`,
          defaultMessage: `Read "{title}"`,
          description: `Completed label for reading the contents of a Chrome tab with a known page title.`,
        },
        completedWithTitleFollowing: {
          id: `localConversation.chromeExtensionToolCall.getTabContext.completedWithTitle.following`,
          defaultMessage: `read "{title}"`,
          description: `Non-leading completed label for reading the contents of a Chrome tab with a known page title in an agent activity summary`,
        },
        activeWithTitle: {
          id: `localConversation.chromeExtensionToolCall.getTabContext.activeWithTitle`,
          defaultMessage: `Reading "{title}"`,
          description: `In-progress label for reading the contents of a Chrome tab with a known page title.`,
        },
        completed: {
          id: `localConversation.chromeExtensionToolCall.getTabContext.completed`,
          defaultMessage: `Read tab`,
          description: `Completed label for reading the contents of a Chrome tab.`,
        },
        completedFollowing: {
          id: `localConversation.chromeExtensionToolCall.getTabContext.completed.following`,
          defaultMessage: `read tab`,
          description: `Non-leading completed label for reading the contents of a Chrome tab in an agent activity summary`,
        },
        active: {
          id: `localConversation.chromeExtensionToolCall.getTabContext.active`,
          defaultMessage: `Reading tab`,
          description: `In-progress label for reading the contents of a Chrome tab.`,
        },
      })));
  }))();
}
function Jn(e) {
  let t = X.safeParse(e.arguments);
  return t.success ? (0, Zn.jsx)(Wn, { item: e, tabId: t.data.tabId }) : null;
}
function Yn(e, t, n, r = !0) {
  let i = X.safeParse(e.arguments);
  return i.success
    ? (0, Zn.jsx)(Un, {
        item: e,
        isLeadingSummaryPart: r,
        tabId: i.data.tabId,
        variant: t,
        agentActivityIcon: n,
      })
    : null;
}
function Xn(e) {
  return X.safeParse(e.arguments).success ? e.callId : null;
}
var Zn, X, Qn;
function $n() {
  return ($n = e(() => {
    (T(),
      fe(),
      ze(),
      qn(),
      (Zn = n()),
      (X = rt({ tabId: u().int().nonnegative() })),
      (Qn = [
        {
          getCompletedSummaryPartKey: Xn,
          namespace: h,
          render: Yn,
          renderAgentActivityIcon: Jn,
          tool: Ge,
        },
      ]));
  }))();
}
function er() {
  return (0, Z.jsx)(E, {
    className: `shrink-0 text-text/60`,
    "aria-hidden": !1,
    asset: re,
  });
}
function tr(e, t, n, r = !0) {
  let i = R(e, r);
  if (i == null) return null;
  let a =
    !e.completed &&
    e.tool === `write_settings` &&
    nr.safeParse(e.arguments).success
      ? (0, Z.jsx)(O, {
          id: `localConversation.settingsToolCall.write.waitingForApproval`,
          defaultMessage: `Waiting for approval`,
          description: `In-progress label while a Codex configuration change is waiting for user approval.`,
        })
      : (0, Z.jsx)(O, { ...i.message, values: i.values });
  return t === `row` && n !== void 0
    ? (0, Z.jsx)(L, {
        icon: n,
        summary: (0, Z.jsx)(N, {
          active: !e.completed,
          className: `min-w-0 truncate`,
          children: a,
        }),
      })
    : (0, Z.jsxs)(P, {
        className: k(
          `text-size-chat`,
          t === `row`
            ? `text-text-tertiary/90`
            : `text-text/40 group-hover/activity-header:text-default`,
        ),
        children: [
          t === `summary-text` ? null : er(),
          (0, Z.jsx)(N, {
            active: !e.completed,
            className: k(t !== `summary-text` && `min-w-0 truncate`),
            children: a,
          }),
        ],
      });
}
var Z, nr, rr;
function ir() {
  return (ir = e(() => {
    (d(),
      j(),
      w(),
      pt(),
      D(),
      T(),
      r(),
      I(),
      z(),
      M(),
      F(),
      (Z = n()),
      (nr = S({ config: S({}) })),
      (rr = [
        { namespace: A, render: tr, renderAgentActivityIcon: er, tool: ct },
        { namespace: A, render: tr, renderAgentActivityIcon: er, tool: st },
      ]));
  }))();
}
function Q(e) {
  return lr.find((t) => t.namespace === e.namespace && t.tool === e.tool);
}
function ar(e) {
  return Q(e)?.continuesLiveActivityBetweenCalls === !0;
}
function or(e) {
  return Q(e)?.persistentInCollapsedConversation === !0;
}
function sr(e) {
  return Q(e)?.summaryOnlyInConversationGroup === !0;
}
function cr(e) {
  let t = R(e),
    n = Q(e)?.getCompletedSummaryPartKey?.(e);
  return `${e.namespace}:${e.tool}:${n ?? ``}:${t?.key ?? ``}`;
}
var lr;
function ur() {
  return (ur = e(() => {
    (gn(),
      In(),
      Rn(),
      Bn(),
      $n(),
      z(),
      ir(),
      Pn(),
      (lr = [...Qn, ...Nn, ...Fn, ...hn, ...rr, ...Ln, ...zn]));
  }))();
}
function dr(
  e,
  {
    dynamicToolCallRenderer: t,
    includeGeneratedImages: n = !1,
    mcpServerStatuses: r,
  } = {},
) {
  switch (e.type) {
    case `external-event`:
      return $(e, `groupable`);
    case `exec`:
    case `patch`:
      return $(pr(e), Ft(e) ? `standalone` : `groupable`);
    case `mcp-tool-call`:
      return $(
        pr(e),
        $t(e) || ln({ item: e, mcpServerStatuses: r })
          ? `standalone`
          : `groupable`,
      );
    case `web-search`:
      return e.query.trim().length === 0 ? null : $(e, `groupable`);
    case `dynamic-tool-call`: {
      let n = t ?? Q(e);
      return n?.hiddenInConversation === !0
        ? null
        : $(e, n?.standaloneInConversation === !0 ? `standalone` : `groupable`);
    }
    case `generated-image`:
      return n ? $(e, `standalone`) : null;
    case `image-view`:
      return $(e, `standalone`);
    case `mcp-server-elicitation`:
      return !e.completed || e.elicitation.kind === `unsupportedOpenAIForm`
        ? null
        : $(
            e,
            e.elicitation.kind === `legacyOpenAIForm` &&
              Object.values(e.elicitation.schema.properties).some(ve)
              ? `groupable`
              : `standalone`,
          );
    case `automatic-approval-review`:
      switch (e.status) {
        case `approved`:
          return null;
        case `inProgress`:
          return $(e, `groupable`);
        case `aborted`:
        case `denied`:
        case `timedOut`:
          return $(e, `standalone`);
      }
    case `dil-reasoning`:
    case `assistant-message`:
    case `auto-review-interruption-warning`:
    case `context-compaction`:
    case `multi-agent-action`:
    case `realtime-transcript`:
    case `stream-error`:
    case `strict-review-notice`:
    case `subagent-activity`:
    case `system-error`:
    case `user-input-response`:
    case `user-message`:
    case `worked-for`:
    case `worktree-init`:
      return $(e, `standalone`);
    case `reasoning`:
    case `automation-update`:
    case `forked-from-conversation`:
    case `model-changed`:
    case `model-rerouted`:
    case `permission-request`:
    case `personality-changed`:
    case `plan-implementation`:
    case `proposed-plan`:
    case `remote-task-created`:
    case `todo-list`:
    case `turn-diff`:
    case `userInput`:
    case `steered`:
      return null;
  }
}
function fr(e, t) {
  return e.type === `exec` &&
    Jt(e.executionStatus) &&
    Kt(e.parsedCmd.cmd) != null &&
    t?.type === `patch` &&
    t.visualizationActivities != null &&
    t.visualizationActivities.length > 0
    ? !0
    : e.type === `exec` &&
        e.parsedCmd.type === `read` &&
        qt(Zt({ summary: e.parsedCmd, cwd: e.cwd }));
}
function $(e, t) {
  return { item: e, grouping: t };
}
function pr(e) {
  let t = e.automaticApprovalReviews;
  if (t == null) return e;
  let n = t.filter((e) => e.status !== `approved`);
  if (n.length > 0 && n.length === t.length) return e;
  let { automaticApprovalReviews: r, ...i } = e;
  return n.length === 0 ? i : { ...i, automaticApprovalReviews: n };
}
function mr() {
  return (mr = e(() => {
    (Me(), Xt(), Rt(), fn(), Yt(), ur());
  }))();
}
export {
  dn as _,
  cr as a,
  or as c,
  wn as d,
  vn as f,
  un as g,
  fn as h,
  ar as i,
  sr as l,
  ln as m,
  mr as n,
  Q as o,
  _n as p,
  fr as r,
  ur as s,
  dr as t,
  yn as u,
  nn as v,
  sn as y,
};
//# sourceMappingURL=agent-activity-item-3c3ce36a628c.js.map
