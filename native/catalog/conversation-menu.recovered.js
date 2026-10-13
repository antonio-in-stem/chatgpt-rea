function Kas(e, t) {
  let n = ZVo({
      rename:
        t.onRename == null ? void 0 : { id: `rename-chatgpt-conversation`, onSelect: t.onRename },
      pin: t.hideShareAndPin
        ? void 0
        : {
            id: t.isPinned ? `unpin-chatgpt-conversation` : `pin-chatgpt-conversation`,
            message: t.isPinned ? Nz.unpin : Nz.pin,
            icon: t.isPinned ? Jas.unpin : Jas.pin,
            enabled: t.onTogglePin != null,
            onSelect: t.onTogglePin,
            selectAfterClose: t.selectPinAfterClose,
          },
    }),
    r =
      t.projectItems ??
      (t.surface === `sidebar` && t.conversation != null
        ? jas(e, t.conversation, t.isPinned, t.onProjectCreated)
        : []),
    i;
  t.onUnarchive == null
    ? t.onArchive != null && (i = { id: `archive-chatgpt-conversation`, onSelect: t.onArchive })
    : (i = {
        id: `unarchive-chatgpt-conversation`,
        icon: ITe,
        message: T4o.unarchive,
        onSelect: t.onUnarchive,
      });
  let a = [
    ...ZVo({ archive: i }),
    ...(t.onDelete == null
      ? []
      : [
          {
            id: `delete-chatgpt-conversation`,
            message: Td({
              id: `chatgptConversations.sidebar.deleteMenuItem`,
              defaultMessage: `Delete`,
              description: `Destructive action in a chat menu that opens confirmation before permanently deleting the chat`,
            }),
            onSelect: t.onDelete,
          },
        ]),
  ];
  n.push(
    ...(t.organizationItems ??
      (t.surface === `sidebar` && t.conversationId != null
        ? h0(e, po(t.conversationId), {
            isPinned: t.isPinned,
            onUnpin:
              t.onUnpin ??
              (() =>
                wPr({
                  scope: e,
                  conversation: {
                    id: t.conversationId ?? ``,
                    title: t.title,
                    gizmo_id: t.projectId,
                    is_starred: t.isPinned,
                  },
                })
                  .then(() => !0)
                  .catch(() => !1)),
          })
        : [])),
  );
  let o = e.get(ym),
    s =
      t.projectId == null
        ? null
        : Las(e.get(Ras), t.conversation, e.query.getData(UO, t.projectId)),
    c = Nz.share;
  s?.type === `unavailable`
    ? (c = Td({
        id: `chatgptConversations.projectShareUnavailable`,
        defaultMessage: `Sharing is unavailable for this chat`,
        description: `Tooltip on a disabled project chat Share action when account, project, or chat permissions prevent sharing`,
      }))
    : o.status === `loaded` &&
      (s == null || s.type === `snapshot`) &&
      (c = o.structure === `workspace` ? Nz.shareWorkspaceTooltip : Nz.sharePublicTooltip);
  let l =
      t.hideShareAndPin ||
      t.surface === `header` ||
      t.conversationId == null ||
      (CT(e.get(FT, t.stateConversationId ?? aa(t.conversationId))) &&
        e.get(iYi, t.stateConversationId ?? aa(t.conversationId)) == null)
        ? []
        : [
            {
              id: `share-chatgpt-conversation`,
              message: Nz.share,
              tooltipMessage: c,
              enabled: s?.type !== `unavailable`,
              onSelect: () => {
                s?.type !== `unavailable` &&
                  Was(
                    e,
                    t.conversationId ?? ``,
                    t.title ?? ``,
                    t.projectId,
                    void 0,
                    void 0,
                    t.conversation,
                  );
              },
            },
          ],
    { continuationItems: u, navigationItems: d } = qas(e, t);
  return [
    { id: `organization`, items: n },
    { id: `continue`, items: u },
    { id: `sharing`, items: [...l, ...(t.sharingItems ?? [])] },
    { id: `navigation`, items: [...(t.viewItems ?? []), ...d] },
    { id: `preferences`, items: t.preferenceItems ?? [] },
    { id: `finish`, items: a },
    { id: `project`, items: r },
  ]
    .filter(({ items: e }) => e.length > 0)
    .flatMap(({ id: e, items: t }, n) =>
      n === 0 ? t : [{ id: `${e}-separator`, type: `separator` }, ...t],
    )
    .map((t) => _0(e, t));
}
