// Original settings label descriptors and context-dependent selector.
export function createSettingsLabels({React,getBrowserMetadata:P_e,formatMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(typeof P_e!=='function'||typeof formatMessage!=='function')throw new TypeError('Settings labels require browser metadata and localization');
const e=fn=>fn,qp=()=>{},rr=()=>{},Khe=()=>{},Fh=x=>x,Td=x=>x,RMe={title:{
          id: `settings.teams.title`,
          defaultMessage: `Teams`,
          description: `Title of settings for teams in the current workspace`,
        }},vNs=compilerRuntime,h=React.createElement,j6={jsx:(type,props)=>h(type,props)},$=props=>formatMessage(props,props.values);
let oNs,cNs,uNs,dNs,pNs,A6;
function sNs() {
  return (sNs = e(() => {
    (qp(),
      (oNs = Fh({
        creatorMicro: {
          id: `codexMicro.deviceName.creatorMicro`,
          defaultMessage: `Creator Micro`,
          description: `Product name for the Creator Micro keyboard`,
        },
      })));
  }))();
}
function lNs() {
  return (lNs = e(() => {
    (qp(),
      (cNs = Fh({
        title: {
          id: `restricted.cloudComputer.title`,
          defaultMessage: `Cloud computer`,
          description: `Title of cloud computer settings`,
        },
        cookies: {
          id: `restricted.cloudComputer.cookies`,
          defaultMessage: `ChatGPT Work cookies`,
          description: `Cookies managed by ChatGPT Work, separate from the user’s dot’s cookies`,
        },
        cookiesDescription: {
          id: `restricted.cloudComputer.cookies.description`,
          defaultMessage: `Manage cookies used by ChatGPT Work`,
          description: `Description of the cookie manager for ChatGPT Work in the cloud`,
        },
        approvalsDescription: {
          id: `restricted.cloudComputer.approvals.description`,
          defaultMessage: `Choose whether ChatGPT Work asks before opening websites. Applies only to ChatGPT Work.`,
          description: `Explains that cloud website approval settings affect ChatGPT Work, not the user's dot`,
        },
        approvals: {
          id: `restricted.cloudComputer.approvals`,
          defaultMessage: `ChatGPT Work website approvals`,
          description: `Website approvals apply only to ChatGPT Work in the cloud`,
        },
      })));
  }))();
}
function fNs() {
  return (fNs = e(() => {
    (qp(),
      (uNs = `1675852838`),
      (dNs = Fh({
        title: {
          id: `restricted.passwords.title`,
          defaultMessage: `Passwords`,
          description: `Title of the settings section for saved website passwords, distinct from the user's ChatGPT login password`,
        },
        description: {
          id: `restricted.passwords.description`,
          defaultMessage: `Manage saved website logins`,
          description: `Description of the settings page for saved website logins`,
        },
        search: {
          id: `restricted.passwords.search`,
          defaultMessage: `Search passwords`,
          description: `Placeholder and accessible label for filtering saved passwords by website or account label`,
        },
      })));
  }))();
}
function mNs() {
  return (mNs = e(() => {
    (qp(),
      rr(),
      lNs(),
      fNs(),
      Khe(),
      (pNs = Td({
        id: `settings.nav.general-settings`,
        defaultMessage: `General`,
        description: `Title for general settings section`,
      })),
      (A6 = Fh({
        family: pNs,
        billing: {
          id: `settings.nav.billing`,
          defaultMessage: `Billing`,
          description: `Navigation title for personal ChatGPT subscription, payment methods, invoices, and wallet settings`,
        },
        agreements: {
          id: `workspaceAgreements.title`,
          defaultMessage: `Agreements`,
          description: `Title of the workspace agreements page`,
        },
        age: {
          id: `settings.chatGpt.age.title`,
          defaultMessage: `Age`,
          description: `Title of the Age detail page within ChatGPT Account settings`,
        },
        account: {
          id: `settings.nav.account`,
          defaultMessage: `Account`,
          description: `Title for ChatGPT account settings section`,
        },
        "parental-controls": {
          id: `settings.nav.parental-controls`,
          defaultMessage: `Parental controls`,
          description: `Title for ChatGPT settings showing family members linked through parental controls`,
        },
        "trusted-contact": {
          id: `settingsModal.trustedContacts.sectionTitle`,
          defaultMessage: `Trusted contact`,
          description: `Title for Trusted contact settings`,
        },
        safety: {
          id: `settings.nav.safetyAndWellbeing`,
          defaultMessage: `Safety & wellbeing`,
          description: `Title for ChatGPT safety and wellbeing settings, including time management`,
        },
        "time-management": {
          id: `settings.nav.time-management`,
          defaultMessage: `Time management`,
          description: `Title for ChatGPT time management settings, including the teen's Quiet Hours schedule`,
        },
        appearance: {
          id: `settings.nav.appearance`,
          defaultMessage: `Appearance`,
          description: `Title for appearance settings section`,
        },
        voice: {
          id: `settings.nav.voice`,
          defaultMessage: `Voice`,
          description: `Title for voice settings section`,
        },
        storage: {
          id: `settings.nav.storage`,
          defaultMessage: `Storage`,
          description: `Title for ChatGPT library storage settings section`,
        },
        pets: {
          id: `settings.nav.miniAndPets`,
          defaultMessage: `Mini & Pets`,
          description: `Title for settings for Mini, the floating compact panel, and its optional pets; use approved localized terminology`,
        },
        chatGptPets: {
          id: `settings.nav.pets.v2`,
          defaultMessage: `Pets`,
          description: `Title for ChatGPT Work settings for choosing, creating, or uploading a collectible pet character`,
        },
        "general-settings": pNs,
        notifications: {
          id: `settings.nav.notifications`,
          defaultMessage: `Notifications`,
          description: `Title for notifications settings section`,
        },
        import: {
          id: `settings.nav.import.v2`,
          defaultMessage: `Import`,
          description: `Title for the import settings section. In French, use the infinitive verb 'Importer', not the noun 'Importation'.`,
        },
        profile: {
          id: `settings.nav.profile`,
          defaultMessage: `Profile`,
          description: `Title for profile section`,
        },
        security: {
          id: `settings.nav.security`,
          defaultMessage: `Security`,
          description: `Title for ChatGPT security settings section`,
        },
        "keyboard-shortcuts": {
          id: `settings.nav.keyboard-shortcuts`,
          defaultMessage: `Keyboard shortcuts`,
          description: `Title for keyboard shortcuts settings section`,
        },
        "codex-micro": {
          id: `settings.nav.codex-micro`,
          defaultMessage: `Codex Micro`,
          description: `Title for Codex Micro settings section`,
        },
        appshots: {
          id: `settings.nav.appshots`,
          defaultMessage: `Appshots`,
          description: `Navigation title for settings that configure Appshots, Codex captures of the frontmost app window`,
        },
        agent: {
          id: `settings.nav.agent`,
          defaultMessage: `Configuration`,
          description: `Title for configuration settings section`,
        },
        "work-settings": {
          id: `settings.nav.workPreferences`,
          defaultMessage: `Work preferences`,
          description: `Navigation title for saved account preferences for Work`,
        },
        "git-settings": {
          id: `settings.nav.git-settings`,
          defaultMessage: `Git`,
          description: `Title for git settings section`,
        },
        "ads-controls": {
          id: `settings.nav.ads-controls`,
          defaultMessage: `Ads controls`,
          description: `Navigation title for ChatGPT advertising preferences and history`,
        },
        "archived-chats": {
          id: `settings.nav.archived-chats`,
          defaultMessage: `Archived chats`,
          description: `Title for archived chats settings section`,
        },
        "data-controls": {
          id: `settings.nav.chatGptDataControls`,
          defaultMessage: `Data controls`,
          description: `Title for shared data controls when ChatGPT settings are available`,
        },
        chatGptSecurity: {
          id: `settings.nav.chatGptSecurity`,
          defaultMessage: `Security and login`,
          description: `Title for ChatGPT security and login settings section`,
        },
        chatGptKeyboard: {
          id: `settings.nav.chatGptKeyboard`,
          defaultMessage: `Keyboard`,
          description: `Title for ChatGPT keyboard settings section`,
        },
        chatGptCloudBrowser: {
          id: `settings.nav.chatGptCloudBrowser`,
          defaultMessage: `Cloud browser`,
          description: `Title for ChatGPT cloud browser settings section`,
        },
        chatGptRemotes: {
          id: `settings.nav.chatGptRemotes`,
          defaultMessage: `Remotes`,
          description: `Title for ChatGPT remote computer settings section`,
        },
        chatGptInternalSettings: {
          id: `settings.nav.chatGptInternalSettings`,
          defaultMessage: `Employee Only`,
          description: `Title for employee-only ChatGPT settings section`,
        },
        "code-review": {
          id: `settings.nav.codeReview`,
          defaultMessage: `Code Review`,
          description: `Title for the Code Review plugin settings section`,
        },
        "usage-code-review": {
          id: `settings.nav.codeReviewAnalytics`,
          defaultMessage: `Code review analytics`,
          description: `Settings navigation and command menu label for code review usage analytics, distinct from code review configuration`,
        },
        "cloud-settings": {
          id: `settings.nav.cloudSettings`,
          defaultMessage: `Cloud preferences`,
          description: `Title for cloud settings section`,
        },
        "codex-cloud": {
          id: `settings.nav.codexCloud`,
          defaultMessage: `Codex Cloud`,
          description: `Settings for Codex Cloud environments and the personal vault`,
        },
        legacyCodexCloud: {
          id: `settings.nav.legacyCodexCloud`,
          defaultMessage: `Legacy Codex Cloud`,
          description: `Settings for the legacy Codex Cloud environment system`,
        },
        "cloud-environments": {
          id: `settings.nav.cloudEnvironments`,
          defaultMessage: `Cloud environments`,
          description: `Title for cloud environments settings section`,
        },
        personalization: {
          id: `settings.nav.personalization`,
          defaultMessage: `Personalization`,
          description: `Title for personalization settings section`,
        },
        chronicle: {
          id: `settings.nav.chronicle`,
          defaultMessage: `Computer history`,
          description: `Title for Computer history settings section`,
        },
        usage: {
          id: `settings.nav.usage`,
          defaultMessage: `Usage & billing`,
          description: `Title for usage and billing settings section`,
        },
        enterpriseUsage: {
          id: `settings.nav.enterpriseUsage`,
          defaultMessage: `Usage`,
          description: `Title for the enterprise usage settings section when analytics has its own section`,
        },
        analytics: {
          id: `settings.nav.analytics`,
          defaultMessage: `Analytics`,
          description: `Title for the usage analytics settings section`,
        },
        "consumer-view": {
          id: `settings.nav.consumerView`,
          defaultMessage: `Consumer analytics (internal)`,
          description: `Settings navigation label for a restricted consumer usage dashboard used solely for OpenAI internal testing`,
        },
        debug: {
          id: `settings.nav.debug`,
          defaultMessage: `Debug`,
          description: `Title for debug settings section`,
        },
        "computer-use": {
          id: `settings.nav.computer-use`,
          defaultMessage: `Computer use`,
          description: `Title for computer use settings section`,
        },
        "browser-use": {
          id: `settings.nav.browser-use`,
          defaultMessage: `Browser`,
          description: `Title for in-app browser settings section`,
        },
        extension: {
          id: `settings.nav.namedBrowserExtension`,
          defaultMessage: `{browserName} extension`,
          description: `Title for browser extension settings; browserName is the browser's brand name, such as Chrome, Edge, or Brave`,
        },
        browserExtension: {
          id: `settings.nav.browser-extension`,
          defaultMessage: `Browser extension`,
          description: `Title for browser extension settings when the current browser cannot be identified`,
        },
        "local-environments": {
          id: `settings.nav.local-environments`,
          defaultMessage: `Environments`,
          description: `Title for environments settings section`,
        },
        worktrees: {
          id: `settings.nav.worktrees.v2`,
          defaultMessage: `Worktrees`,
          description: `Title for worktrees settings section. Keep 'Worktrees' in English in all locales; it is a product term.`,
        },
        environments: {
          id: `settings.nav.environments`,
          defaultMessage: `Cloud Environments`,
          description: `Title for environments settings section`,
        },
        "mcp-settings": {
          id: `settings.nav.mcp-settings`,
          defaultMessage: `MCP servers`,
          description: `Title for MCP servers settings section`,
        },
        "hooks-settings": {
          id: `settings.nav.hooks-settings`,
          defaultMessage: `Hooks`,
          description: `Title for hooks settings section`,
        },
        connections: {
          id: `settings.nav.connections`,
          defaultMessage: `Connections`,
          description: `Title for connections settings section`,
        },
        "plugins-settings": {
          id: `settings.nav.plugins-settings`,
          defaultMessage: `Plugins`,
          description: `Title for plugins settings section`,
        },
        "file-type-handlers": {
          id: `settings.nav.file-type-handlers`,
          defaultMessage: `File type handlers`,
          description: `Title for file type handler settings`,
        },
        "skills-settings": {
          id: `settings.nav.skills-settings`,
          defaultMessage: `Skills`,
          description: `Title for skills settings section`,
        },
      })));
  }))();
}
function k6(e, t = !1, n = !1) {
  if (e === `extension`) {
    let e = P_e();
    return e == null ? A6.browserExtension : { ...A6.extension, values: { browserName: e.name } };
  }
  if (e === `usage` && t) return A6.enterpriseUsage;
  if (e === `passwords`) return dNs.title;
  if (e === `cloud-computer`) return cNs.title;
  if (e === `teams`) return RMe.title;
  if (n) {
    if (e === `usage`) return A6.enterpriseUsage;
    if (e === `browser-use`) return A6.chatGptCloudBrowser;
    if (e === `connections`) return A6.chatGptRemotes;
    if (e === `debug`) return A6.chatGptInternalSettings;
    if (e === `keyboard-shortcuts`) return A6.chatGptKeyboard;
    if (e === `security`) return A6.chatGptSecurity;
  }
  return e === `cloud-environments` ? A6.legacyCodexCloud : A6[e];
}
function gNs(e) {
  let t = (0, vNs.c)(7),
    {
      codexMicroDeviceModel: n,
      showChatGptDataControlsLabel: r,
      showEnterpriseUsageLabel: i,
      slug: a,
    } = e,
    o = n === void 0 ? null : n,
    s = r !== void 0 && r,
    c = i !== void 0 && i;
  if (a === `codex-micro` && o === `creator-micro-v2`) {
    let e;
    return (
      t[0] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, j6.jsx)($, { ...oNs.creatorMicro })), (t[0] = e))
        : (e = t[0]),
      e
    );
  }
  let l;
  t[1] !== s || t[2] !== c || t[3] !== a
    ? ((l = k6(a, c, s)), (t[1] = s), (t[2] = c), (t[3] = a), (t[4] = l))
    : (l = t[4]);
  let u;
  return (t[5] === l ? (u = t[6]) : ((u = (0, j6.jsx)($, { ...l })), (t[5] = l), (t[6] = u)), u);
}
function _Ns(e) {
  let t = (0, vNs.c)(61),
    { showChatGptDataControlsLabel: n, slug: r } = e;
  if (
    n !== void 0 &&
    n &&
    [
      `browser-use`,
      `connections`,
      `data-controls`,
      `debug`,
      `keyboard-shortcuts`,
      `security`,
      `usage`,
    ].includes(r)
  ) {
    let e;
    t[0] === r ? (e = t[1]) : ((e = k6(r, !1, !0)), (t[0] = r), (t[1] = e));
    let n;
    return (t[2] === e ? (n = t[3]) : ((n = (0, j6.jsx)($, { ...e })), (t[2] = e), (t[3] = n)), n);
  }
  switch (r) {
    case `passwords`:
    case `cloud-computer`:
    case `age`:
    case `agreements`:
    case `billing`:
    case `extension`: {
      let e;
      t[4] === r ? (e = t[5]) : ((e = k6(r)), (t[4] = r), (t[5] = e));
      let n;
      return (
        t[6] === e ? (n = t[7]) : ((n = (0, j6.jsx)($, { ...e })), (t[6] = e), (t[7] = n)),
        n
      );
    }
    case `account`: {
      let e;
      return (
        t[8] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.account`,
              defaultMessage: `Account`,
              description: `Title for ChatGPT account settings section`,
            })),
            (t[8] = e))
          : (e = t[8]),
        e
      );
    }
    case `appshots`: {
      let e;
      return (
        t[9] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.appshots`,
              defaultMessage: `Appshots`,
              description: `Page title for settings that configure Appshots, Codex captures of the frontmost app window`,
            })),
            (t[9] = e))
          : (e = t[9]),
        e
      );
    }
    case `appearance`: {
      let e;
      return (
        t[10] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.appearance`,
              defaultMessage: `Appearance`,
              description: `Title for appearance settings section`,
            })),
            (t[10] = e))
          : (e = t[10]),
        e
      );
    }
    case `voice`: {
      let e;
      return (
        t[11] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.voice`,
              defaultMessage: `Voice`,
              description: `Title for voice settings section`,
            })),
            (t[11] = e))
          : (e = t[11]),
        e
      );
    }
    case `storage`: {
      let e;
      return (
        t[12] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.storage`,
              defaultMessage: `Storage`,
              description: `Title for ChatGPT storage settings section`,
            })),
            (t[12] = e))
          : (e = t[12]),
        e
      );
    }
    case `family`:
    case `parental-controls`:
    case `trusted-contact`:
    case `safety`:
    case `time-management`:
    case `pets`: {
      let e;
      t[13] === r ? (e = t[14]) : ((e = k6(r)), (t[13] = r), (t[14] = e));
      let n;
      return (
        t[15] === e ? (n = t[16]) : ((n = (0, j6.jsx)($, { ...e })), (t[15] = e), (t[16] = n)),
        n
      );
    }
    case `general-settings`: {
      let e;
      return (
        t[17] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.general-settings`,
              defaultMessage: `General`,
              description: `Title for general settings section`,
            })),
            (t[17] = e))
          : (e = t[17]),
        e
      );
    }
    case `notifications`: {
      let e;
      return (
        t[18] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.notifications`,
              defaultMessage: `Notifications`,
              description: `Title for notifications settings section`,
            })),
            (t[18] = e))
          : (e = t[18]),
        e
      );
    }
    case `import`: {
      let e;
      return (
        t[19] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.import.v2`,
              defaultMessage: `Import`,
              description: `Title for the import settings section. In French, use the infinitive verb 'Importer', not the noun 'Importation'.`,
            })),
            (t[19] = e))
          : (e = t[19]),
        e
      );
    }
    case `profile`: {
      let e;
      return (
        t[20] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.profile`,
              defaultMessage: `Profile`,
              description: `Title for profile section`,
            })),
            (t[20] = e))
          : (e = t[20]),
        e
      );
    }
    case `security`: {
      let e;
      return (
        t[21] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.security`,
              defaultMessage: `Security and login`,
              description: `Title for ChatGPT security settings section`,
            })),
            (t[21] = e))
          : (e = t[21]),
        e
      );
    }
    case `keyboard-shortcuts`: {
      let e;
      return (
        t[22] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.keyboard-shortcuts`,
              defaultMessage: `Keyboard shortcuts`,
              description: `Title for keyboard shortcuts settings section`,
            })),
            (t[22] = e))
          : (e = t[22]),
        e
      );
    }
    case `codex-micro`: {
      let e;
      return (
        t[23] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.codex-micro`,
              defaultMessage: `Codex Micro`,
              description: `Title for Codex Micro settings section`,
            })),
            (t[23] = e))
          : (e = t[23]),
        e
      );
    }
    case `agent`: {
      let e;
      return (
        t[24] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.agent`,
              defaultMessage: `Configuration`,
              description: `Title for configuration settings section`,
            })),
            (t[24] = e))
          : (e = t[24]),
        e
      );
    }
    case `work-settings`: {
      let e;
      return (
        t[25] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)(gNs, { slug: `work-settings` })), (t[25] = e))
          : (e = t[25]),
        e
      );
    }
    case `git-settings`: {
      let e;
      return (
        t[26] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.git-settings`,
              defaultMessage: `Git`,
              description: `Title for git settings section`,
            })),
            (t[26] = e))
          : (e = t[26]),
        e
      );
    }
    case `ads-controls`: {
      let e;
      return (
        t[27] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)(gNs, { slug: `ads-controls` })), (t[27] = e))
          : (e = t[27]),
        e
      );
    }
    case `data-controls`:
    case `archived-chats`: {
      let e;
      return (
        t[28] === r ? (e = t[29]) : ((e = (0, j6.jsx)(gNs, { slug: r })), (t[28] = r), (t[29] = e)),
        e
      );
    }
    case `usage-code-review`: {
      let e;
      return (
        t[30] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.codeReview`,
              defaultMessage: `Code review`,
              description: `Title for code review settings section`,
            })),
            (t[30] = e))
          : (e = t[30]),
        e
      );
    }
    case `code-review`: {
      let e;
      return (
        t[31] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)(gNs, { slug: `code-review` })), (t[31] = e))
          : (e = t[31]),
        e
      );
    }
    case `cloud-settings`: {
      let e;
      return (
        t[32] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.cloudSettings`,
              defaultMessage: `Cloud preferences`,
              description: `Title for cloud settings section`,
            })),
            (t[32] = e))
          : (e = t[32]),
        e
      );
    }
    case `codex-cloud`:
    case `cloud-environments`: {
      let e;
      t[33] === r ? (e = t[34]) : ((e = k6(r)), (t[33] = r), (t[34] = e));
      let n;
      return (
        t[35] === e ? (n = t[36]) : ((n = (0, j6.jsx)($, { ...e })), (t[35] = e), (t[36] = n)),
        n
      );
    }
    case `personalization`: {
      let e;
      return (
        t[37] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.personalization`,
              defaultMessage: `Personalization`,
              description: `Title for personalization settings section`,
            })),
            (t[37] = e))
          : (e = t[37]),
        e
      );
    }
    case `chronicle`: {
      let e;
      return (
        t[38] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.chronicle`,
              defaultMessage: `Computer history`,
              description: `Title for Computer history settings section`,
            })),
            (t[38] = e))
          : (e = t[38]),
        e
      );
    }
    case `usage`: {
      let e;
      return (
        t[39] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.usage`,
              defaultMessage: `Usage & billing`,
              description: `Title for usage and billing settings section`,
            })),
            (t[39] = e))
          : (e = t[39]),
        e
      );
    }
    case `analytics`: {
      let e;
      return (
        t[40] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.analytics`,
              defaultMessage: `Analytics`,
              description: `Title for the usage analytics settings section`,
            })),
            (t[40] = e))
          : (e = t[40]),
        e
      );
    }
    case `consumer-view`: {
      let e;
      return (
        t[41] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.consumerView`,
              defaultMessage: `Consumer analytics (internal)`,
              description: `Page title for a restricted consumer usage dashboard used solely for OpenAI internal testing`,
            })),
            (t[41] = e))
          : (e = t[41]),
        e
      );
    }
    case `debug`: {
      let e;
      return (
        t[42] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.debug`,
              defaultMessage: `Debug`,
              description: `Title for debug settings section`,
            })),
            (t[42] = e))
          : (e = t[42]),
        e
      );
    }
    case `computer-use`: {
      let e;
      return (
        t[43] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `computerUse.label`,
              defaultMessage: `Computer use`,
              description: `Label for the Computer Use feature`,
            })),
            (t[43] = e))
          : (e = t[43]),
        e
      );
    }
    case `browser-use`: {
      let e;
      return (
        t[44] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.browser-use`,
              defaultMessage: `Browser`,
              description: `Title for in-app browser settings section`,
            })),
            (t[44] = e))
          : (e = t[44]),
        e
      );
    }
    case `local-environments`: {
      let e;
      return (
        t[45] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.local-environments`,
              defaultMessage: `Environments`,
              description: `Title for environments settings section`,
            })),
            (t[45] = e))
          : (e = t[45]),
        e
      );
    }
    case `worktrees`: {
      let e;
      return (
        t[46] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.worktrees.v2`,
              defaultMessage: `Worktrees`,
              description: `Title for worktrees settings section. Keep 'Worktrees' in English in all locales; it is a product term.`,
            })),
            (t[46] = e))
          : (e = t[46]),
        e
      );
    }
    case `environments`: {
      let e;
      return (
        t[47] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.environments`,
              defaultMessage: `Cloud Environments`,
              description: `Title for environments settings section`,
            })),
            (t[47] = e))
          : (e = t[47]),
        e
      );
    }
    case `mcp-settings`: {
      let e;
      return (
        t[48] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.mcp-settings`,
              defaultMessage: `MCP servers`,
              description: `Title for MCP servers settings section`,
            })),
            (t[48] = e))
          : (e = t[48]),
        e
      );
    }
    case `hooks-settings`: {
      let e;
      return (
        t[49] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.hooks-settings`,
              defaultMessage: `Hooks`,
              description: `Title for hooks settings section`,
            })),
            (t[49] = e))
          : (e = t[49]),
        e
      );
    }
    case `connections`: {
      let e;
      return (
        t[50] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.connections`,
              defaultMessage: `Connections`,
              description: `Title for connections settings section`,
            })),
            (t[50] = e))
          : (e = t[50]),
        e
      );
    }
    case `plugins-settings`: {
      let e;
      return (
        t[51] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.plugins-settings`,
              defaultMessage: `Plugins`,
              description: `Title for plugins settings section`,
            })),
            (t[51] = e))
          : (e = t[51]),
        e
      );
    }
    case `file-type-handlers`: {
      let e;
      t[52] === r ? (e = t[53]) : ((e = k6(r)), (t[52] = r), (t[53] = e));
      let n;
      return (
        t[54] === e ? (n = t[55]) : ((n = (0, j6.jsx)($, { ...e })), (t[54] = e), (t[55] = n)),
        n
      );
    }
    case `skills-settings`: {
      let e;
      return (
        t[56] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, j6.jsx)($, {
              id: `settings.section.skills-settings`,
              defaultMessage: `Skills`,
              description: `Title for skills settings section`,
            })),
            (t[56] = e))
          : (e = t[56]),
        e
      );
    }
    case `teams`: {
      let e;
      t[57] === r ? (e = t[58]) : ((e = k6(r)), (t[57] = r), (t[58] = e));
      let n;
      return (
        t[59] === e ? (n = t[60]) : ((n = (0, j6.jsx)($, { ...e })), (t[59] = e), (t[60] = n)),
        n
      );
    }
  }
}
sNs();mNs();
return {getSectionMessage:k6,SettingsNavigationLabel:gNs,SettingsSectionTitle:_Ns,creatorMicroMessage:oNs.creatorMicro,messages:A6};
}
