// Extracted production frontend function; no original TypeScript recovered.
function $rn(e, t, n, r) {
  let i = n.readTokenBudgetThread(t.sourceHostId ?? e.getHostId(), t.sourceConversationId);
  return {
    trace:
      n.beginTrace?.({
        ephemeral: t.ephemeral ?? !1,
        sideConversation: t.sideConversation ?? !1,
      }) ?? null,
    fallbackCwd: t.workspaceRoots?.[0] ?? null,
    sideConversationBoundaryItems:
      t.sideConversation === !0
        ? [{ type: `message`, role: `user`, content: [{ type: `input_text`, text: Srn }] }]
        : null,
    copyThreadMetadata(e, t) {
      let r = n.readThreadReferences(e);
      (r !== void 0 && n.writeThreadReferences(t, r), i && n.writeTokenBudgetThread(t));
    },
    mapForkResponseToTurns: (e, t) => r.mapThreadTurns(g8t(e, t)),
    resumeForkedConversation: (n) => e.resumeConversationForUnavailableOwner(n, t.readResumeInputs),
    async commitAcceptedPlacement(e, t, r) {
      (r?.prependToManualProject && t != null && (await n.prependProjectThread(t, e)),
        r?.customSection != null && (await n.moveThreadToSection(e, r.customSection)));
    },
    async prepareRequest() {
      let r = t.placement?.customSection;
      if (
        n.accountId != null &&
        r != null &&
        (r.accountId !== n.accountId || r.sourceThreadId !== t.sourceConversationId)
      )
        throw Error(`Fork placement identity does not match its receiving owner`);
      let a = { status: `ready`, placement: null };
      if (
        (!t.ephemeral &&
          !t.sideConversation &&
          (a =
            t.placement == null
              ? n.readPlacement(t.sourceConversationId)
              : { status: `ready`, placement: t.placement }),
        a.status === `not-ready`)
      )
        return a;
      let o = await n.readConfig(t.cwd ?? e.getConversation(t.sourceConversationId)?.cwd ?? null),
        s = t.config == null ? o : { ...o, ...t.config },
        c =
          t.sourceHostId == null || t.sourceHostId === e.getHostId()
            ? e.getConversation(t.sourceConversationId)
            : null;
      (c?.searchMcpContext != null &&
        (s = {
          ...s,
          web_search: (0, tin.default)(t.config, `web_search`) ?? c.searchMcpContext.mode,
          "tools.web_search.allowed_domains":
            (0, tin.default)(t.config, `tools.web_search.allowed_domains`) ??
            c.searchMcpContext.allowed_domains,
        }),
        i && (s = Drn(s, e.requestClient.getAppServerVersion())),
        t.ephemeral === !0 && n.isLocalExecutionHost && (s = wV(s)));
      let l = {
          threadId: t.sourceConversationId,
          ...(t.lastTurnId == null ? {} : { lastTurnId: t.lastTurnId }),
          ...(t.beforeTurnId == null ? {} : { beforeTurnId: t.beforeTurnId }),
          path: t.rolloutPath ?? null,
          cwd: t.cwd,
          runtimeWorkspaceRoots: t.workspaceRoots,
          threadSource: t.threadSource ?? `user`,
          model: t.model ?? void 0,
          config:
            t.reasoningEffort == null
              ? (s ?? void 0)
              : { ...s, model_reasoning_effort: t.reasoningEffort },
          developerInstructions: t.developerInstructions,
          ...(t.sideConversation || !t.ephemeral ? { excludeTurns: !0 } : {}),
          ...(t.ephemeral ? { ephemeral: !0 } : {}),
        },
        u;
      if (n.isLocalExecutionHost && !n.isBrowserRuntime) {
        let t = await Grn(l, n.readDefaultFeatureOverrides()?.search_mcp, e.requestClient);
        ((l.config = t.config), (u = t.searchMcpContext));
      }
      return { ...a, request: l, searchMcpContext: u };
    },
  };
}
