import { n as e, o as t } from "./rolldown-runtime-2d059c5e81f4.js";
import {
  VHt as n,
  VPt as r,
  cLt as i,
  dRt as ee,
  mvn as a,
  pRt as o,
  xI as s,
} from "./app-shared-737655e1fb23.js";
import {
  _S as c,
  gS as te,
  qh as l,
  vS as ne,
} from "./app-initial-b8e1c8014bb4.js";
import { n as u, r as d, t as f } from "./agent-activity-item-3c3ce36a628c.js";
function p(e, t, r, i, a) {
  let o = null,
    c = null,
    l = [],
    u = null,
    p = null,
    y = null,
    C = null,
    E = [],
    D = [],
    O = new Set(),
    k = [],
    A = [],
    j = [],
    M = [],
    N = [],
    P = [],
    F = [],
    I = [],
    L = [],
    R = [],
    z = [],
    B = !1,
    V = !1,
    H = null,
    U = new Set(),
    W = new Set(),
    G = null;
  for (let n of e) {
    let e = n.type === `subagent-activity` && !n.isMessage,
      i = e && !V;
    if (((V = e), n.type === `user-message` && n.heartbeatTrigger != null)) {
      l.push(n);
      continue;
    }
    if (!B && n.type === `user-message`) {
      l.push(n);
      continue;
    }
    if (((B ||= n.type !== `worktree-init`), r === `latest`)) {
      if (
        n.type === `dynamic-tool-call` &&
        ne(n.namespace, n.tool) &&
        n.completed &&
        n.success === !0
      ) {
        let e = te(n.arguments);
        e !== void 0 &&
          ((G = e == null ? null : { type: `up-next-status`, content: e }),
          (H = null));
      }
      if (n.type === `assistant-message`) {
        let e =
          n.content.trim().length > 0 ||
          n.isSkippedCompletion === !0 ||
          n.structuredOutput != null;
        if (
          n.phase === `commentary` &&
          n.delivery !== `async` &&
          n.requestUserInputAsync == null
        ) {
          (k.push(n), U.add(n), (!n.completed || e) && (H = n));
          continue;
        }
        (n.delivery === `async` ||
          n.requestUserInputAsync != null ||
          (n.phase === `final_answer` && e)) &&
          (H = null);
      } else
        ((n.type === `user-message` &&
          n.deliveryStatus !== `not-sent` &&
          n.hookFeedback !== !0 &&
          n.heartbeatTrigger == null &&
          n.codexDelegation == null) ||
          (n.type === `realtime-transcript` &&
            n.entries.some(({ role: e }) => e === `user`))) &&
          ((G = null), (H = null));
    }
    if (
      (n.type === `turn-diff` && (u = n),
      n.type === `todo-list` && (p = n),
      n.type === `proposed-plan`)
    ) {
      y = n;
      continue;
    }
    if (
      (n.type === `remote-task-created` && P.push(n),
      n.type === `personality-changed` && F.push(n),
      n.type === `forked-from-conversation` && I.push(n),
      n.type === `model-changed`)
    ) {
      L.push(n);
      continue;
    }
    if (n.type === `model-rerouted`) {
      R.push(n);
      continue;
    }
    if (n.type === `plan-implementation`) {
      C = n;
      continue;
    }
    if (n.type === `mcp-server-elicitation`) {
      if (n.completed === !0) {
        n.elicitation.kind !== `unsupportedOpenAIForm` && k.push(n);
        continue;
      }
      let e = w(n);
      (e != null && O.add(e), E.push(n));
      continue;
    }
    if (n.type === `permission-request`) {
      D.push(n);
      continue;
    }
    let s = re(n),
      d = !s && v(n);
    if (s || d) {
      o = n;
      continue;
    }
    if (n.type === `userInput` && n.completed !== !0) {
      c = n;
      continue;
    }
    if (n.type === `user-message`) {
      k.push(n);
      continue;
    }
    if (n.type === `generated-image`) {
      let e = b(n);
      (e || M.push(n), (t === `in_progress` || e) && k.push(n));
      continue;
    }
    if (a != null && n.type === `mcp-tool-call`) {
      let e = ee(n, a);
      if (e?.type === `chatgpt-automation`) {
        j.push({ callId: n.callId, automation: e });
        continue;
      }
    }
    if (n.type === `automation-update`) {
      A.push(n);
      continue;
    }
    if (n.type === `auto-review-interruption-warning`) {
      N.push(n);
      continue;
    }
    if (n.type === `subagent-activity`) {
      n.isMessage
        ? k.push(n)
        : i
          ? (k.push(n), z.push([n]))
          : z.at(-1)?.push(n);
      continue;
    }
    (n.type === `reasoning` ||
      n.type === `automatic-approval-review` ||
      f(n) != null) &&
      k.push(n);
  }
  let K = S(k),
    q = r === `latest` ? [] : x(K),
    J = !1,
    Y =
      r === `latest` || O.size > 0
        ? K.filter((e, t) =>
            U.has(e)
              ? ((J = !0), e === H)
              : e.type === `mcp-tool-call` &&
                  !e.completed &&
                  O.has(e.invocation.server)
                ? !1
                : (J &&
                    f(e)?.grouping === `groupable` &&
                    !d(e, K[t + 1]) &&
                    (W.add(e), (J = !1)),
                  !0),
          )
        : K;
  r === `latest` && q.push(...x(Y));
  let X = Y.length - 1;
  for (; Y[X]?.type === `mcp-server-elicitation`; ) --X;
  if (!m(Y[X], i)) {
    let e = X;
    for (;;) {
      let n = Y[e];
      if (
        n?.type !== `mcp-server-elicitation` &&
        n?.type !== `subagent-activity` &&
        (n?.type !== `user-message` ||
          n.steeringStatus !== `accepted` ||
          n.codexDelegation == null) &&
        !b(n) &&
        (n?.type !== `reasoning` || !n.completed) &&
        (n?.type !== `exec` || t !== `complete` || !n.parsedCmd.isFinished) &&
        (n?.type !== `dynamic-tool-call` || t !== `complete` || !n.completed)
      )
        break;
      --e;
    }
    let n = Y[e];
    m(n, i) && n.phase === `final_answer` && (X = e);
  }
  let Z = Y[X],
    Q = m(Z, i) ? Z : null,
    ie =
      (Q?.content?.trim().length ?? 0) > 0 ||
      Q?.isSkippedCompletion === !0 ||
      !!Q?.structuredOutput;
  if (Q) {
    for (let e of Y.splice(X + 1))
      e.type === `user-message` ? N.push(e) : Y.push(e);
    Y.splice(X, 1);
    let e = Y[X - 1];
    (Q.phase === `final_answer` &&
      e?.type === `assistant-message` &&
      e.phase === `final_answer` &&
      e.searchItemId != null &&
      e.searchItemId === Q.searchItemId &&
      (0, h.default)(e, Q) &&
      Y.splice(X - 1, 1),
      N.push(...q));
  } else Y.push(...q);
  if (N.length > 1) {
    let t = new Set(N);
    N = e.filter((e) => t.has(e));
  }
  let ae = Y[Y.length - 1],
    oe = t !== `in_progress` && !ie && T(ae) ? ae : null;
  oe && Y.pop();
  let $ = (0, g.default)(
      [...A].reverse(),
      (e) => e.result?.automationId ?? e.arguments.id ?? e.callId,
    ).reverse(),
    se =
      Q != null && Q.completed && $.length > 0
        ? { ...Q, automationCitations: $ }
        : Q;
  return {
    userItems: l,
    agentItems: Y,
    toolGroupStartItems: W,
    upNextStatusItem: r === `latest` && t === `in_progress` ? G : null,
    automationUpdateItems: Q == null ? $ : [],
    cloudAutomationItems: j,
    assistantItem: se,
    currentCommentaryItem: H === Q ? se : H,
    toolOutputItems: M,
    postAssistantItems: N,
    systemEventItem: oe,
    unifiedDiffItem: u,
    remoteTaskCreatedItems: P,
    personalityChangedItems: F,
    forkedFromConversationItems: I,
    modelChangedItems: L,
    modelReroutedItems: R,
    subagentActivityItemGroups: z,
    todoListItem: p,
    proposedPlanItem: y,
    planImplementationItem: C,
    mcpServerElicitationItems: (0, _.default)(
      E,
      (e, t) =>
        (s(e.elicitation) && s(t.elicitation) && e.requestId === t.requestId) ||
        (e.elicitation.kind === `connectorAuth` &&
          t.elicitation.kind === `connectorAuth` &&
          n(e.elicitation.connector, t.elicitation.connector)),
    ),
    permissionRequestItems: D,
    approvalItem: o,
    userInputItem: c,
  };
}
function m(e, t) {
  return (
    y(e) &&
    e.delivery !== `async` &&
    e.requestUserInputAsync == null &&
    t?.(e) !== !0
  );
}
var h, g, _, re, v, y, b, x, S, C, w, T;
function E() {
  return (E = e(() => {
    ((h = t(a(), 1)),
      (g = t(r(), 1)),
      (_ = t(l(), 1)),
      i(),
      c(),
      o(),
      u(),
      (re = (e) =>
        e.type === `patch` && e.approvalRequestId != null && e.success == null),
      (v = (e) =>
        e.type === `exec` &&
        e.approvalRequestId != null &&
        e.output?.exitCode === void 0),
      (y = (e) => e?.type === `assistant-message`),
      (b = (e) =>
        e?.type === `generated-image` &&
        e.failure?.type === `usageLimitExceeded` &&
        e.failure.limitId === `image_gen`),
      (x = (e) => {
        let t = [];
        for (;;) {
          let n = e[e.length - 1];
          if (n?.type !== `automatic-approval-review`) break;
          (e.pop(), t.push(n));
        }
        return t.reverse();
      }),
      (S = (e) => {
        let t = new Map(),
          n = new Set(),
          r = new Map();
        for (let t of e) {
          if (
            t.type !== `exec` &&
            t.type !== `patch` &&
            t.type !== `mcp-tool-call`
          )
            continue;
          let e = C(t);
          e != null && r.set(e, t.type);
        }
        for (let i of e) {
          let e =
            i.type === `automatic-approval-review` && i.targetItemId != null
              ? r.get(i.targetItemId)
              : void 0;
          if (
            i.type === `automatic-approval-review` &&
            i.targetItemId != null &&
            e != null &&
            (i.status !== `denied` || e !== `mcp-tool-call`)
          ) {
            n.add(i.id);
            let e = t.get(i.targetItemId);
            if (e == null) {
              t.set(i.targetItemId, [i]);
              continue;
            }
            e.push(i);
          }
        }
        return e.flatMap((e) => {
          if (e.type === `automatic-approval-review` && n.has(e.id)) return [];
          let r = C(e),
            i = r == null ? null : (t.get(r) ?? null);
          return i == null ? [e] : [{ ...e, automaticApprovalReviews: i }];
        });
      }),
      (C = (e) =>
        e.type === `exec` || e.type === `patch` || e.type === `mcp-tool-call`
          ? e.type === `exec`
            ? (e.commandExecutionItemId ?? e.callId)
            : e.callId
          : null),
      (w = (e) => {
        switch (e.elicitation.kind) {
          case `userVerification`:
          case `browserAuth`:
          case `formElicitation`:
          case `openaiForm`:
          case `legacyOpenAIForm`:
          case `generic`:
          case `urlAction`:
            return e.elicitation.serverName.trim() || null;
          case `mcpToolCall`:
            return e.elicitation.approval.connector_id;
          case `connectorAuth`:
            return e.elicitation.connector.connector_id;
          case `toolSuggestion`:
          case `unsupportedOpenAIForm`:
            return null;
        }
      }),
      (T = (e) => e?.type === `system-error`));
  }))();
}
export { p as n, E as t };
//# sourceMappingURL=split-items-into-render-groups-d45e0db37b65.js.map
