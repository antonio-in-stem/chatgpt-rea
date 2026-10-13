function jas(e, t, n, r) {
  let i = t7o(e, H2(e, t, n, !1)),
    a = e.get(Dp),
    o = e.get(ym);
  if (i == null || a == null || o.status !== `loaded`) return [];
  let s = i.conversation.gizmo_id ?? null,
    c = s == null ? void 0 : e.get(UO, s),
    l = c?.data,
    u = s != null && l == null;
  if (l?.gizmo.gizmo_snorlax_type != null) return [];
  let { data: d, isPending: f, isError: p } = e.get(BO),
    { data: m, isPending: h, isError: g } = e.get($z),
    _ = o.structure === `workspace`,
    v = _ ? e.get(Ao, a) : void 0,
    y =
      F1r({
        isCurrentAccountLoading: !1,
        isWorkspaceAccount: _,
        isWorkspaceSettingsError: v?.isError ?? !1,
        isWorkspaceSettingsLoading: v?.isLoading ?? !1,
        shouldCheckWorkspaceSettings: _,
        workspacePermissions: v?.data?.permissions,
      }) === `allowed`,
    b = (0, Pas.default)(
      [
        ...(m ?? []).map((e) => e.item),
        ...(d?.pages.flatMap((e) => e.items.map((e) => e.gizmo)) ?? []),
      ].filter(SO),
      (e) => e.gizmo.id,
    ).filter((e) => e.gizmo.id !== s && e.gizmo.gizmo_snorlax_type == null),
    x = [];
  y &&
    (x.push({
      id: `create-project-and-move-chatgpt-conversation`,
      message: Td({
        id: `chatgptProjectHome.chats.projectActions.newProject`,
        defaultMessage: `New project`,
        description: `Action in the Move to project submenu that creates a new cloud project and then moves the chat into it`,
      }),
      icon: OVe,
      enabled: !u,
      selectAfterClose: !0,
      onSelect: () => {
        e.get(Dp) === a &&
          hji(e, r, {
            allowLocalProjectCreation: !1,
            conversationToMove: i.conversation,
            forceGlobalMemory: i.isWorkConversation,
          });
      },
    }),
    b.length > 0 && x.push({ id: `new-project-separator`, type: `separator` }));
  for (let n of b) {
    let r = i.isWorkConversation && (xO(n) !== `open-default` || !bO(n)) ? Oas(kmn(n)) : void 0;
    x.push({
      id: `move-chatgpt-conversation-to-project:${n.gizmo.id}`,
      message: Fas.projectName,
      messageValues: { projectName: n.gizmo.display.name },
      icon: am,
      enabled: r == null && !u,
      tooltipMessage: r,
      onSelect: () => {
        e.get(Dp) === a && Nas(e, t.id, n.gizmo.id);
      },
    });
  }
  p || g || c?.isError
    ? x.push({
        id: `chatgpt-projects-status`,
        message: Td({
          id: `chatgptProjectHome.chats.projectActions.destinationsFailed`,
          defaultMessage: `Couldn’t load projects. Try again`,
          description: `Retry action in the Move to project submenu when project destinations fail to load; already loaded destinations remain available`,
        }),
        onSelect: () => {
          Mas(e, t);
        },
      })
    : f || h || u
      ? x.push({
          id: `chatgpt-projects-status`,
          message: Td({
            id: `chatgptConversations.projects.loadingMenu`,
            defaultMessage: `Loading projects…`,
            description: `Disabled menu item while project destinations load`,
          }),
          enabled: !1,
        })
      : x.length === 0 &&
        x.push({
          id: `chatgpt-projects-empty`,
          message: Td({
            id: `chatgptProjectHome.chats.projectActions.noDestinations`,
            defaultMessage: `No other projects`,
            description: `Empty state in the Move to project submenu when no destination projects are available and project creation is not allowed`,
          }),
          enabled: !1,
        });
  let S = i.isMemoryBlocked ? Nz.projectOnlyMoveUnavailable : void 0,
    C = l ?? e.get(aB, s),
    w = [];
  return (
    C != null &&
      w.push({
        id: `chatgpt-current-project`,
        type: `label`,
        message: Fas.projectName,
        messageValues: { projectName: C.gizmo.display.name },
      }),
    w.push({
      id: `move-chatgpt-conversation-to-project`,
      message: Fas.moveToProject,
      icon: s == null ? am : kBe,
      submenu: x,
      enabled: !i.isMemoryBlocked,
      tooltipMessage: S,
    }),
    vO(s) &&
      w.push({
        id: `remove-chatgpt-conversation-from-project`,
        message: Td({
          id: `chatgptProjectHome.chats.projectActions.remove`,
          defaultMessage: `Remove from project`,
          description: `Action in a conversation menu that moves the chat back to general history`,
        }),
        icon: aIe,
        enabled: !i.isMemoryBlocked && !u,
        tooltipMessage: S,
        onSelect: () => {
          e.get(Dp) === a && Nas(e, t.id, null);
        },
      }),
    w
  );
}
async function Mas(e, t) {
  let n = e.get(Dp),
    r = e.get(ym);
  if (n == null || r.status !== `loaded`) return;
  let i = H2(e, t) != null;
  await Promise.allSettled([
    i ? e.query.getOrFetch(BO) : void 0,
    i ? e.query.getOrFetch($z) : void 0,
    t != null && vO(t.gizmo_id) ? e.query.getOrFetch(UO, t.gizmo_id) : void 0,
    r.structure === `workspace` ? e.query.getOrFetch(GBe, n) : void 0,
    i && r.structure === `workspace` ? e.query.getOrFetch(Ao, n) : void 0,
  ]);
}
async function Nas(e, t, n) {
  try {
    return (await yPr({ scope: e, conversationId: t, projectId: n }), !0);
  } catch {
    return (
      e
        .get(lc)
        .danger(e.get(Kd).formatMessage(Fas.projectUpdateFailed), {
          errorAnalytics: { toastId: `move_conversation_to_snorlax_error` },
        }),
      !1
    );
  }
}
var Pas, Fas;
