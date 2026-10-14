// Original navigation grouping, ordering and search eligibility rules.
const _e=descriptor=>descriptor;let Qr,$r,ei;
((Qr = _e({
        id: `settings.nav.heading.integrations`,
        defaultMessage: `Integrations`,
        description: `Heading for integration settings in the settings navigation`,
      })),
      ($r =
        `general-settings.notifications.import.profile.security.account.parental-controls.trusted-contact.safety.appearance.voice.storage.chronicle.appshots.agent.personalization.pets.usage.billing.analytics.consumer-view.usage-code-review.debug.keyboard-shortcuts.codex-micro.mcp-settings.hooks-settings.connections.cloud-settings.codex-cloud.cloud-environments.code-review.git-settings.local-environments.worktrees.browser-use.cloud-computer.passwords.extension.computer-use.data-controls.archived-chats.agreements.ads-controls`.split(
          `.`,
        )),
      (ei = [
        {
          key: `personal`,
          heading: _e({
            id: `settings.nav.heading.personal`,
            defaultMessage: `Personal`,
            description: `Heading for personal settings in the settings navigation`,
          }),
          slugs:
            `general-settings.notifications.import.profile.appearance.security.account.data-controls.archived-chats.ads-controls.parental-controls.trusted-contact.safety.voice.storage.agent.personalization.pets.keyboard-shortcuts.usage.billing.analytics.consumer-view.usage-code-review.debug.agreements`.split(
              `.`,
            ),
        },
        { key: `teams`, heading: null, slugs: [`teams`] },
        {
          key: `integrations`,
          heading: Qr,
          slugs: [
            `plugins-settings`,
            `file-type-handlers`,
            `passwords`,
            `computer-use`,
            `chronicle`,
            `appshots`,
            `codex-micro`,
            `mcp-settings`,
            `skills-settings`,
            `browser-use`,
            `cloud-computer`,
            `extension`,
          ],
        },
        {
          key: `coding`,
          heading: _e({
            id: `settings.nav.heading.coding`,
            defaultMessage: `Coding`,
            description: `Heading for coding settings in the settings navigation`,
          }),
          slugs: [
            `hooks-settings`,
            `connections`,
            `cloud-settings`,
            `codex-cloud`,
            `cloud-environments`,
            `code-review`,
            `git-settings`,
            `local-environments`,
            `environments`,
            `worktrees`,
          ],
        },
      ]),
      void 0);
function jr(e) {
  let { slug: t } = e;
  return t !== `age` && t !== `work-settings`;
}
function Mr(e) {
  let { slug: t } = e;
  return (
    t !== `age` &&
    t !== `work-settings` &&
    t !== `analytics` &&
    t !== `consumer-view` &&
    t !== `usage-code-review`
  );
}
function Nr(e) {
  let { slug: t } = e;
  return t === `usage`;
}
function Ir(e) {
  let { view: t, path: n } = e;
  return {
    id: `plugin:${n}`,
    kind: `plugin`,
    label: t.title,
    panelLabel: t.title,
    path: n,
    sectionSlug: `plugins-settings`,
  };
}
function Rr(e) {
  return e.disabled || e.appRoute != null ? [] : [e.slug];
}
function Br(e) {
  return e.length <= 50;
}
function Kr(e, t, n) {
  let r = new Map(e.map((e) => [e.slug, e])),
    i = new Set(),
    a = t.map((e) => ({
      ...e,
      sections: e.slugs.flatMap((e) => {
        let t = r.get(e);
        return t == null ? [] : (i.add(e), [t]);
      }),
    })),
    o = e.filter(({ slug: e }) => !i.has(e));
  return (
    o.length > 0 && a[a.length - 1]?.sections.push(...o),
    a.filter((e) => e.sections.length > 0 || e.key === n)
  );
}
function qr(e, t) {
  let n = new Map(e.map((e) => [e.slug, e]));
  return [
    ...t.flatMap((e) => {
      let t = n.get(e);
      return t == null ? [] : (n.delete(e), [t]);
    }),
    ...n.values(),
  ];
}
export {jr as isPlainNavigationSection,Mr as isGroupedNavigationSection,Nr as isUsageSection,Ir as createPluginSearchResult,Rr as searchableSectionSlugs,Br as isAllowedPluginSearchTerm,Kr as groupSettingsSections,qr as orderSettingsSections,ei as settingsSectionGroups,$r as settingsSectionOrder};
