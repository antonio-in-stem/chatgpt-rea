B.map((e) => {
        if (!N(e) || e.isAeonThread || e.preserveServerUserMessages || e.turn == null) return null;
        let { turn: t } = e,
          n = [];
        return (
          t.params.input.length > 0 && n.push({ role: `user`, sentAtMs: t.turnStartedAtMs }),
          t.items.some((e) => e.type === `agentMessage`) &&
            n.push({ role: `assistant`, sentAtMs: t.finalAssistantStartedAtMs }),
          n
        );
      })
