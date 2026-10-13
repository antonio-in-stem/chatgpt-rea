// Production frontend consumer; not original TypeScript or backend source.
function B9t(e, { conversationId: t, conversationState: n, rollbackResponse: r }, i) {
  let a = _8t(r, {
    workspaceRoots: n.cwd ? [n.cwd] : [],
    fallbackCwd: n.cwd ?? null,
    model: n.latestModel,
    reasoningEffort: n.latestReasoningEffort,
  });
  (e.updateConversationState(t, (e) => {
    (delete e.lastInjectedPassiveContextKey,
      nh(e, a, !0),
      (e.turnsPagination = {
        olderCursor: null,
        oldestLoadedTurnId: null,
        isLoadingOlder: !1,
        hasLoadedOldest: !0,
      }),
      (e.requests = []),
      (e.resumeState = `resumed`),
      (e.sessionId = r.thread.sessionId),
      (e.rolloutPath = r.thread.path ?? e.rolloutPath),
      (e.cwd = r.thread.cwd || e.cwd),
      (e.originator = r.thread.originator ?? e.originator),
      (e.source = r.thread.source),
      (e.agentNickname = r.thread.agentNickname),
      (e.forkedFromId = r.thread.forkedFromId == null ? null : Y(r.thread.forkedFromId)),
      (e.gitInfo = r.thread.gitInfo),
      (e.threadRuntimeStatus = r.thread.status),
      (e.hasUnreadTurn = !1));
    let t = r.thread.updatedAt * 1e3;
    Number.isFinite(t) && (e.updatedAt = t);
  }),
    i(r.thread.turns));
}
