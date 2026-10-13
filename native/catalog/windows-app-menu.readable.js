function CZe({
  commandKeymapState: e = i.wt(),
  buildFlavor: t,
  isMacOS: n,
  allowDevtools: a,
  allowDebugMenu: o,
  allowWindowReload: s,
  enableUpdater: c,
  desktopFeatureAvailability: u,
  appUpdates: d,
  ensurePrimaryWindowVisible: f,
  createFreshWindow: m,
  getAuthenticatedUserId: h,
  queueCodexDeepLinkUrl: v,
  navigateToRoute: y,
  collapseHotkeyWindowToHome: b,
  getElectronMessageHandlerForWindow: x,
  windowManager: S,
  traceRecordingUploadOptions: C,
}) {
  let w = l.p(),
    T = `CmdOrCtrl+Shift+C`,
    E = n
      ? [`Command+F`, `Command+G`, `Command+Shift+G`]
      : [`Ctrl+F`, `Ctrl+G`, `Shift+F3`],
    D = new Set(E.map((e) => S7(e, n))),
    O = { codexLocal: u.codexLocalAccess, workLocal: u.workLocalAccess },
    k = (t) => i.Mt({ commandId: t, keymapState: e, isMacOS: n }),
    A = (e) => !e.includes(` `) && !i.Lt(e),
    j = (e) =>
      k(e).filter(
        (t) =>
          A(t) && (i.At(e)?.kind !== `webview` || yZe(t)) && !D.has(S7(t, n)),
      ),
    M = async () => {
      let e = _.BrowserWindow.getFocusedWindow();
      return e && !e.isDestroyed() ? e : f();
    },
    N = (e, t) => {
      let n = i.Pt({ commandId: e });
      if (n == null) throw Error(`Electron menu command '${e}' is not defined`);
      let r = i.At(e),
        a = r == null || i.Ft(r, O);
      return {
        label: w.formatMessage({
          messageId:
            r != null && `titleIntlId` in r
              ? r.titleIntlId
              : (b7[e] ?? n.menuTitleIntlId),
          defaultMessage: n.menuTitle,
        }),
        accelerator: a ? j(e)[t ?? 0] : void 0,
        visible: a ? void 0 : !1,
      };
    },
    ee = new Set(
      i.zt
        .filter(
          (e) =>
            `electron` in e &&
            e.electron != null &&
            `isOverridableByBrowserWebpage` in e.electron &&
            e.electron.isOverridableByBrowserWebpage === !0,
        )
        .map(({ id: e }) => e),
    ),
    P = new Set();
  for (let e of i.zt)
    if (
      !(
        ee.has(e.id) ||
        !i.Ft(e, O) ||
        (e.id === `showWorkspaceTabView` && !u.unifiedTabStrip) ||
        (e.id === `toggleSidebar` && !u.sidebarCollapsible) ||
        (e.id === `toggleDebugModal` && !o)
      )
    )
      for (let t of j(e.id)) P.add(S7(t, n));
  let F = (e) => e.filter((e) => A(e) && !P.has(S7(e, n))),
    te = (e) => F(k(e)),
    I = ({ accelerators: e, click: t, enabled: n, label: r }) =>
      e.map((e) => ({
        label: r,
        accelerator: e,
        acceleratorWorksWhenHidden: !0,
        enabled: n,
        visible: !1,
        click: t,
      })),
    L = {
      ...N(`settings`),
      click: async (e, t, n) => {
        let r = await f();
        if (r) {
          if (n?.triggeredByAccelerator === !0) {
            S.sendMessageToWindow(r, {
              type: `run-command`,
              id: `settings`,
              keyboardEvent: {
                altKey: n.altKey === !0,
                ctrlKey: n.ctrlKey === !0,
                key: e.accelerator?.split(`+`).at(-1) ?? ``,
                metaKey: n.metaKey === !0,
                repeat: !1,
                shiftKey: n.shiftKey === !0,
              },
            });
            return;
          }
          y(r, SZe);
        }
      },
    },
    R = {
      ...N(`newTask`),
      click: async (e, t, n) => {
        let r = await M();
        if (r) {
          if (S.isHotkeyWindowThread(r)) {
            await b?.();
            return;
          }
          (r.webContents.focus(),
            S.sendMessageToWindow(
              r,
              n?.triggeredByAccelerator === !0
                ? {
                    type: `run-command`,
                    id: `newTask`,
                    keyboardEvent: {
                      altKey: n.altKey === !0,
                      ctrlKey: n.ctrlKey === !0,
                      key: e.accelerator?.split(`+`).at(-1) ?? ``,
                      metaKey: n.metaKey === !0,
                      repeat: !1,
                      shiftKey: n.shiftKey === !0,
                    },
                  }
                : { type: `run-command`, id: `newTask` },
            ));
        }
      },
    },
    z = {
      ...N(`newTask`, 1),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: R.click,
    },
    ne = S.getPrimaryWindow?.() ?? _.BrowserWindow.getFocusedWindow(),
    B = {
      ...N(`temporaryChat`),
      enabled:
        ne != null &&
        S.getAppShellShortcutState?.(ne.webContents.id)
          ?.temporaryChatEnabled === !0,
      click: () => {
        ne == null ||
          ne.isDestroyed() ||
          S.sendMessageToWindow(ne, {
            type: `run-command`,
            id: `temporaryChat`,
          });
      },
    },
    re = {
      ...N(`newProjectlessTask`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: async () => {
        let e = await f();
        e &&
          S.sendMessageToWindow(e, {
            type: `run-command`,
            id: `newProjectlessTask`,
          });
      },
    },
    ie = {
      ...N(`newWindow`),
      click: async () => {
        let e = await m(xZe);
        e && (e.isMinimized() && e.restore(), e.show(), e.focus());
      },
    },
    ae = N(`closeWindow`),
    oe = (e, t) => {
      if (
        e != null &&
        i.St({ commandId: `closeTab`, isMacOS: n }).includes(e)
      ) {
        let e = _.webContents.getFocusedWebContents(),
          t = _.BrowserWindow.getFocusedWindow();
        if (t != null && !t.isDestroyed()) {
          let e = He(t);
          if (e != null) {
            S.sendMessageToWindow(t, e);
            return;
          }
        }
        if (e != null) {
          let n =
            t != null && !t.isDestroyed()
              ? [t]
              : _.BrowserWindow.getAllWindows();
          for (let t of n)
            if (!t.isDestroyed() && G(t)?.closeFocusedVisibleBrowserTab(t, e))
              return;
        }
        if (t != null && !t.isDestroyed()) {
          let e = FR(S.getAppShellShortcutState(t.webContents.id));
          if (e != null) {
            S.sendMessageToWindow(t, e);
            return;
          }
        }
      }
      let r = _.BrowserWindow.getFocusedWindow();
      r == null || r.isDestroyed() || S.requestCloseWindow(r, t);
    },
    se = {
      ...ae,
      click: (e, t, n) => {
        oe(ae.accelerator, n?.triggeredByAccelerator === !0);
      },
    },
    V = N(`closeWindow`, 1),
    ce = {
      ...V,
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: (e, t, n) => {
        oe(V.accelerator, n?.triggeredByAccelerator === !0);
      },
    },
    le = _.BrowserWindow.getFocusedWindow(),
    ue = le != null && !S.isHotkeyWindowThread(le) ? le : ne,
    de = {
      ...N(`newProject`),
      enabled:
        ue != null &&
        S.getAppShellShortcutState?.(ue.webContents.id)?.newProjectEnabled ===
          !0,
      label: w.formatMessage({
        messageId: `codex.commandMenuTitle.newProject`,
        defaultMessage: `New Project…`,
      }),
      click: async () => {
        let e = await M();
        (e && S.isHotkeyWindowThread(e) && (e = await f()),
          e &&
            S.sendMessageToWindow(e, {
              type: `run-command`,
              id: `newProject`,
            }));
      },
    },
    fe = {
      ...N(`openFolder`),
      click: async () => {
        let e = await M();
        if (!e) return;
        let t = x(e);
        t && (await t.createOrSelectProject(e.webContents));
      },
    },
    pe = {
      ...N(`logOut`),
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `run-command`, id: `logOut` });
      },
    },
    me = async (e) => {
      let t = await M();
      t && S.sendMessageToWindow(t, { type: `command-menu`, query: e });
    },
    he = async () => {
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `file-search-command-menu` });
    },
    ge = async () => {
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `chat-search-command-menu` });
    },
    _e = async (e, { allowAppShellTabShortcut: t = !1 } = {}) => {
      let n = await M();
      if (!n) return;
      let r =
          t &&
          ((e !== `nextThread` && e !== `previousThread`) ||
            S.getAppShellShortcutState(n.webContents.id)
              ?.threadNavigationShortcutLocked !== !0),
        i = e === `focusBrowserAddressBar` ? We(n) : null;
      S.sendMessageToWindow(n, {
        type: `run-command`,
        id: e,
        ...(r ? { allowAppShellTabShortcut: !0 } : {}),
        originPanel: i ?? void 0,
      });
    },
    ve = async () => {
      await _e(`feedback`);
    },
    ye = async () => {
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `copy-conversation-path` });
    },
    be = async () => {
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `toggle-thread-pin` });
    },
    xe = async () => {
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `rename-thread` });
    },
    Se = async () => {
      let e = await M();
      e &&
        S.sendMessageToWindow(e, {
          type: `archive-thread`,
          source: `native_accelerator`,
        });
    },
    H = async () => {
      if (
        Ne.accelerator != null &&
        S7(Ne.accelerator, n) === S7(T, n) &&
        Ve({ type: `copy-url` })
      )
        return;
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `copy-working-directory` });
    },
    Ce = async () => {
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `copy-deeplink` });
    },
    we = {
      ...N(`openCommandMenu`, 1),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: async () => {
        await me(``);
      },
    },
    Te = {
      ...N(`openCommandMenu`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: async () => {
        await me();
      },
    },
    Ee = {
      ...N(`searchFiles`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: he,
    },
    De = {
      ...N(`searchChats`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: ge,
    },
    Oe = i.Ot.map((e) => ({
      ...N(e),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: async () => {
        await _e(e);
      },
    })),
    ke = {
      ...N(`copyConversationPath`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: ye,
    },
    Ae = {
      ...N(`toggleThreadPin`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: be,
    },
    je = {
      ...N(`renameThread`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: xe,
    },
    Me = {
      ...N(`archiveThread`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: Se,
    },
    Ne = {
      ...N(`copyWorkingDirectory`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: H,
    },
    Pe = {
      ...N(`copyDeeplink`),
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: Ce,
    },
    Fe = {
      label: w.formatMessage({
        messageId: f7,
        defaultMessage: p7,
        values: { appName: _.app.getName() },
      }),
      click: (e, n) => {
        pZe({
          buildFlavor: t,
          parent: n instanceof _.BrowserWindow && !n.isDestroyed() ? n : null,
        });
      },
    },
    U = {
      ...N(`toggleSidebar`),
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `toggle-sidebar` });
      },
    },
    Ie = {
      ...N(`toggleBottomPanel`),
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `toggle-bottom-panel` });
      },
    },
    Le = {
      ...N(`togglePinnedSummary`),
      click: () => {
        _e(`togglePinnedSummary`);
      },
    },
    Re = {
      ...N(`toggleTerminal`),
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `toggle-terminal` });
      },
    },
    ze = {
      ...N(`toggleFileTreePanel`),
      click: () => {
        _e(`toggleFileTreePanel`);
      },
    },
    W = {
      label: u.unifiedTabStrip
        ? w.formatMessage({
            messageId: `codex.command.stepWorkspaceLayout`,
            defaultMessage: `Cycle workspace layout`,
          })
        : w.formatMessage({
            messageId: `codex.command.toggleBrowserPanel`,
            defaultMessage: `Toggle browser panel`,
          }),
      accelerator: j(`stepWorkspaceLayout`)[0],
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: () => {
        _e(`stepWorkspaceLayout`);
      },
    },
    Be = {
      ...N(`openBrowserTab`),
      click: async () => {
        let e = await M();
        e &&
          S.sendMessageToWindow(e, {
            type: `open-browser-tab`,
            source: `manual`,
            initiator: `app_menu`,
          });
      },
    },
    G = (e) => x(e)?.getBrowserHostManager?.(),
    Ve = (e) => {
      let t = _.webContents.getFocusedWebContents();
      if (t == null) return !1;
      let n = _.BrowserWindow.getFocusedWindow();
      return (
        n != null && !n.isDestroyed() ? [n] : _.BrowserWindow.getAllWindows()
      ).some(
        (n) =>
          !n.isDestroyed() &&
          G(n)?.runFocusedVisiblePageCommand(n, t, e) === !0,
      );
    },
    He = (e) => {
      let t = S.getAppShellShortcutState(e.webContents.id);
      return t?.focusArea === `main` ? null : FR(t);
    },
    Ue = {
      ...N(`focusBrowserAddressBar`),
      accelerator: void 0,
      click: async () => {
        await _e(`focusBrowserAddressBar`);
      },
    },
    We = (e) => {
      let t = S.getAppShellShortcutState(e.webContents.id);
      return t?.focusArea === `bottom-panel` &&
        t.bottomPanelBrowserTabId == null
        ? null
        : (G(e)?.getFocusedVisibleBrowserTabPanel(
            e,
            _.webContents.getFocusedWebContents(),
          ) ??
            null ??
            IR(t));
    },
    Ge = (e) =>
      e === `nextRecentThread` || e === `nextThread`
        ? `nextTab`
        : e === `previousRecentThread` || e === `previousThread`
          ? `previousTab`
          : null,
    Ke = (e, t) => {
      let r = Ge(e);
      return r != null && i.St({ commandId: r, isMacOS: n }).includes(t);
    },
    qe = (e, t, n) => n?.triggeredByAccelerator === !0 && t != null && Ke(e, t),
    Je = _.BrowserWindow.getFocusedWindow(),
    Ye = _.webContents.getFocusedWebContents(),
    Xe =
      Je != null &&
      !Je.isDestroyed() &&
      !!G(Je)?.canReloadActiveVisiblePage(Je, Ye),
    Ze = async (e = !1) => {
      let t = await M();
      if (!t) return;
      let n = G(t);
      if (n == null) return;
      let r = _.webContents.getFocusedWebContents();
      if (e) {
        n.reloadActiveVisiblePageWithOptions(t, { ignoreCache: !0 }, r);
        return;
      }
      n.reloadActiveVisiblePage(t, r);
    },
    Qe = {
      ...N(`reloadBrowserPage`),
      accelerator: te(`reloadBrowserPage`)[0],
      enabled: Xe,
      click: async () => {
        await Ze();
      },
    },
    $e = [
      Qe,
      ...I({
        accelerators: te(`reloadBrowserPage`).slice(1),
        click: () => Ze(),
        enabled: Xe,
        label: Qe.label ?? `Reload Browser Page`,
      }),
    ],
    et = {
      ...N(`hardReloadBrowserPage`),
      accelerator: te(`hardReloadBrowserPage`)[0],
      acceleratorWorksWhenHidden: !0,
      enabled: Xe,
      visible: !1,
      click: async () => {
        await Ze(!0);
      },
    },
    tt = [
      et,
      ...I({
        accelerators: te(`hardReloadBrowserPage`).slice(1),
        click: () => Ze(!0),
        enabled: Xe,
        label: et.label ?? `Force Reload Browser Page`,
      }),
    ],
    nt = {
      label: w.formatMessage({
        messageId: `electron.appMenu.view.reloadWindow`,
        defaultMessage: `Reload Window`,
      }),
      accelerator: `Command+Control+R`,
      click: async () => {
        let e = await M();
        e && e.reload();
      },
    },
    rt = {
      ...N(`toggleSidePanel`),
      click: async () => {
        if (u.unifiedTabStrip) {
          await _e(`toggleSidePanel`);
          return;
        }
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `toggle-diff-panel` });
      },
    };
  u.unifiedTabStrip &&
    (rt.label = w.formatMessage({
      messageId: `codex.command.toggleWorkspaceTabs`,
      defaultMessage: `Switch between Chat and tabs`,
    }));
  let it = uMe({
      allowDevtools: a,
      accelerator: N(`toggleTraceRecording`).accelerator,
      windowManager: S,
      traceRecordingUploadOptions: C,
    }),
    at = async () => {
      if ((await oZ(`open`)) || Ve({ type: `open-find` })) return;
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `find-in-thread` });
    },
    ot = { ...N(`findInThread`), accelerator: E[0], click: at },
    ct = {
      label: `Find Next`,
      accelerator: n ? `Command+G` : `Ctrl+G`,
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: async () => {
        if ((await oZ(`next`)) || Ve({ type: `find-next` })) return;
        let e = await M();
        e != null && S.sendMessageToWindow(e, { type: `find-next-in-thread` });
      },
    },
    lt = {
      label: `Find Previous`,
      accelerator: n ? `Command+Shift+G` : `Shift+F3`,
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: async () => {
        if ((await oZ(`previous`)) || Ve({ type: `find-previous` })) return;
        let e = await M();
        e != null &&
          S.sendMessageToWindow(e, { type: `find-previous-in-thread` });
      },
    },
    ut = N(`previousThread`),
    dt = {
      ...ut,
      click: async (e, t, n) => {
        await _e(`previousThread`, {
          allowAppShellTabShortcut: qe(`previousThread`, ut.accelerator, n),
        });
      },
    },
    ft = N(`previousThread`, 1),
    pt = {
      ...ft,
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: async (e, t, n) => {
        await _e(`previousThread`, {
          allowAppShellTabShortcut: qe(`previousThread`, ft.accelerator, n),
        });
      },
    },
    mt = N(`nextThread`),
    ht = {
      ...mt,
      click: async (e, t, n) => {
        await _e(`nextThread`, {
          allowAppShellTabShortcut: qe(`nextThread`, mt.accelerator, n),
        });
      },
    },
    gt = N(`nextThread`, 1),
    _t = {
      ...gt,
      acceleratorWorksWhenHidden: !0,
      visible: !1,
      click: async (e, t, n) => {
        await _e(`nextThread`, {
          allowAppShellTabShortcut: qe(`nextThread`, gt.accelerator, n),
        });
      },
    },
    vt = {
      label: w.formatMessage({
        messageId: `codex.command.toggleDebugModal`,
        defaultMessage: `Toggle Debug Panel`,
      }),
      accelerator: j(`toggleDebugModal`)[0],
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `toggle-debug-modal` });
      },
    },
    yt = {
      label: `Open Deeplink from Clipboard`,
      click: () => {
        v(_.clipboard.readText().trim()) ||
          _.dialog.showMessageBox({
            type: `info`,
            title: `Invalid Deeplink`,
            message: `Clipboard does not contain a valid codex:// deeplink.`,
            detail: `Copy a codex:// URL to the clipboard and try again.`,
          });
      },
    },
    bt = {
      label: `Copy User ID`,
      click: async () => {
        let e = await h();
        e != null && _.clipboard.writeText(e);
      },
    },
    xt = {
      label: w.formatMessage({
        messageId: `debug.sidebarRamUsageIndicator.toggle`,
        defaultMessage: `Show/Hide RAM Usage`,
      }),
      click: async () => {
        let e = await M();
        e != null &&
          S.sendMessageToWindow(e, { type: `toggle-ram-usage-indicator` });
      },
    },
    St = {
      label: `Toggle Query Devtools`,
      accelerator: `CmdOrCtrl+Alt+Y`,
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `toggle-query-devtools` });
      },
    },
    Ct = {
      label: `Toggle React Scan`,
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `toggle-react-scan` });
      },
    },
    wt = async (e) => {
      if (Ve({ type: `step-zoom`, delta: e })) return;
      let t = await M();
      t && S.sendMessageToWindow(t, { type: `step-window-zoom`, delta: e });
    },
    Tt = async () => {
      if (Ve({ type: `reset-zoom` })) return;
      let e = await M();
      e && S.sendMessageToWindow(e, { type: `reset-window-zoom` });
    },
    Et = () => {
      let e = _.BrowserWindow.getFocusedWindow();
      e && !e.isDestroyed() && e.setFullScreen(!e.isFullScreen());
    },
    Dt = {
      ...N(`navigateBack`),
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `navigate-back` });
      },
    },
    Ot = {
      ...N(`navigateForward`),
      accelerator: n ? j(`navigateForward`)[0] : void 0,
      click: async () => {
        let e = await M();
        e && S.sendMessageToWindow(e, { type: `navigate-forward` });
      },
    },
    kt = {
      label: w.formatMessage({
        messageId: `electron.appMenu.app.checkForUpdates`,
        defaultMessage: `Check for Updates…`,
      }),
      enabled: !0,
      click: () => {
        (x7().info(`Check for updates requested via menu.`),
          d.checkForUpdates().then(() => {
            if (d.hasUpdater()) return;
            let e = d.getUnavailableReason() ?? `unknown`;
            (x7().warning(`Desktop updater unavailable; init likely skipped.`, {
              safe: { reason: e },
              sensitive: {},
            }),
              _.dialog.showMessageBox({
                type: `info`,
                title: `Updates Unavailable`,
                message: `Automatic updates are unavailable right now.`,
                detail: `Updater initialization skipped: ${e}`,
              }));
          }));
      },
    },
    At = {
      label: w.formatMessage({
        messageId: `electron.appMenu.app.quit`,
        defaultMessage: `Quit {appName}`,
        values: { appName: _.app.getName() },
      }),
      role: `quit`,
    },
    jt = [
      Fe,
      { type: `separator` },
      L,
      ...(c ? [kt] : []),
      pe,
      { type: `separator` },
      {
        label: w.formatMessage({
          messageId: `electron.appMenu.app.services`,
          defaultMessage: `Services`,
        }),
        role: `services`,
      },
      { type: `separator` },
      {
        label: w.formatMessage({
          messageId: `electron.appMenu.app.hide`,
          defaultMessage: `Hide {appName}`,
          values: { appName: _.app.getName() },
        }),
        role: `hide`,
      },
      {
        label: w.formatMessage({
          messageId: `electron.appMenu.app.hideOthers`,
          defaultMessage: `Hide Others`,
        }),
        role: `hideOthers`,
      },
      {
        label: w.formatMessage({
          messageId: `electron.appMenu.app.showAll`,
          defaultMessage: `Show All`,
        }),
        role: `unhide`,
      },
      { type: `separator` },
      At,
    ],
    Mt = {
      label: w.formatMessage({
        messageId: `windowsMenuBar.file`,
        defaultMessage: `File`,
      }),
      id: st.file,
      submenu: [],
    },
    Nt = { role: `appMenu`, submenu: jt },
    Pt = {
      label: w.formatMessage({
        messageId: `windowsMenuBar.view`,
        defaultMessage: `View`,
      }),
      id: st.view,
      submenu: [],
    },
    Ft = [
      ...I({
        accelerators: te(`navigateBrowserBack`),
        click: () => {
          Ve({ type: `go-back` });
        },
        label: `Browser Back`,
      }),
      ...I({
        accelerators: te(`navigateBrowserForward`),
        click: () => {
          Ve({ type: `go-forward` });
        },
        label: `Browser Forward`,
      }),
    ],
    It = [
      ...(u.sidebarCollapsible
        ? [
            U,
            ...I({
              accelerators: j(`toggleSidebar`).slice(1),
              label: U.label ?? `Toggle Sidebar`,
              click: () => _e(`toggleSidebar`),
            }),
          ]
        : []),
      Ie,
      Le,
      Re,
      ze,
      ...(u.unifiedTabStrip
        ? I({
            accelerators: j(`showWorkspaceTabView`),
            label: w.formatMessage({
              messageId: `codex.command.showWorkspaceTabView`,
              defaultMessage: `Full view`,
            }),
            click: () => _e(`showWorkspaceTabView`),
          })
        : []),
      ...(u.browserPane || u.unifiedTabStrip ? [W] : []),
      rt,
      ...(u.browserPane
        ? [
            { type: `separator` },
            {
              label: w.formatMessage({
                messageId: `settings.nav.browser-use`,
                defaultMessage: `Browser`,
              }),
              submenu: [
                Be,
                Ue,
                ...$e,
                ...tt,
                ...I({
                  accelerators: F([T]),
                  click: () => {
                    Ve({ type: `copy-url` });
                  },
                  label: `Copy Browser URL`,
                }),
                ...Ft,
              ],
            },
          ]
        : []),
      { type: `separator` },
      ot,
      ct,
      lt,
      { type: `separator` },
      dt,
      pt,
      ht,
      _t,
      Dt,
      Ot,
      ...(s ? [nt] : []),
    ],
    Lt = [
      ...(o ? [bt, vt, yt, xt] : []),
      ...(a ? [{ role: `toggleDevTools` }] : []),
      ...(a && p.t.supportsReactScan(t) ? [Ct] : []),
      ...(r.It({ buildFlavor: t, isDev: !1 }) ? [St] : []),
    ],
    Rt = n
      ? []
      : [
          {
            label: `Zoom In`,
            accelerator: `Ctrl+=`,
            acceleratorWorksWhenHidden: !0,
            visible: !1,
            click: async () => {
              await wt(1);
            },
          },
        ],
    zt = [
      {
        label: w.formatMessage({
          messageId: `browserSidebar.zoomBanner.zoomIn`,
          defaultMessage: `Zoom In`,
        }),
        accelerator: `CmdOrCtrl+Plus`,
        click: async () => {
          await wt(1);
        },
      },
      ...Rt,
      {
        label: w.formatMessage({
          messageId: `browserSidebar.zoomBanner.zoomOut`,
          defaultMessage: `Zoom Out`,
        }),
        accelerator: `CmdOrCtrl+-`,
        click: async () => {
          await wt(-1);
        },
      },
      {
        label: w.formatMessage({
          messageId: `electron.appMenu.view.actualSize`,
          defaultMessage: `Actual Size`,
        }),
        accelerator: `CmdOrCtrl+0`,
        click: async () => {
          await Tt();
        },
      },
      ...I({
        accelerators: F([`CmdOrCtrl+numadd`]),
        click: () => {
          Ve({ type: `step-zoom`, delta: 1 });
        },
        label: `Zoom In`,
      }),
      ...I({
        accelerators: F([`CmdOrCtrl+numsub`]),
        click: () => {
          Ve({ type: `step-zoom`, delta: -1 });
        },
        label: `Zoom Out`,
      }),
      ...I({
        accelerators: F([`CmdOrCtrl+num0`]),
        click: () => {
          Ve({ type: `reset-zoom` });
        },
        label: `Actual Size`,
      }),
    ];
  (It.push({ type: `separator` }, ...zt),
    Lt.length > 0 &&
      It.push(
        { type: `separator` },
        {
          label: w.formatMessage({
            messageId: `plugins.detail.information.developer`,
            defaultMessage: `Developer`,
          }),
          submenu: Lt,
        },
      ),
    n
      ? It.push(
          { type: `separator` },
          {
            label: `Toggle Full Screen`,
            accelerator: `Command+Control+F`,
            visible: !1,
            acceleratorWorksWhenHidden: !0,
            click: Et,
          },
        )
      : It.push(
          { type: `separator` },
          {
            label: w.formatMessage({
              messageId: `electron.appMenu.view.toggleFullScreen`,
              defaultMessage: `Toggle Full Screen`,
            }),
            accelerator: `F11`,
            click: Et,
          },
        ),
    It.push(we, Te, De, Ee, ...Oe, ...(n ? [ke] : []), Ae, je, Me, Ne, Pe),
    (Pt.submenu = It));
  let Bt = [],
    { editMenu: Vt, windowMenu: Ht } = bZe({ nativeIntl: w, isMacOS: n }),
    Ut = [
      ...(n ? [Nt, Mt] : [Mt]),
      Vt,
      Pt,
      ...(n ? [Ht] : []),
      {
        label: w.formatMessage({
          messageId: `windowsMenuBar.help`,
          defaultMessage: `Help`,
        }),
        role: `help`,
        id: st.help,
        submenu: [
          {
            label: w.formatMessage({
              messageId: `loadingPage.documentationLink`,
              defaultMessage: `Documentation`,
            }),
            click: () => {
              _.shell.openExternal(`https://developers.openai.com/codex/app`);
            },
          },
          {
            ...N(`showKeyboardShortcuts`),
            click: async () => {
              await _e(`showKeyboardShortcuts`);
            },
          },
          {
            label: w.formatMessage({
              messageId: `sidebarHelp.whatsNew`,
              defaultMessage: `What's New`,
            }),
            click: () => {
              _.shell.openExternal(
                `https://developers.openai.com/codex/changelog`,
              );
            },
          },
          { type: `separator` },
          {
            label: w.formatMessage({
              messageId: `electron.appMenu.help.troubleshooting`,
              defaultMessage: `Troubleshooting`,
            }),
            click: () => {
              _.shell.openExternal(
                `https://developers.openai.com/codex/app/troubleshooting`,
              );
            },
          },
          {
            label: w.formatMessage({
              messageId: `electron.appMenu.help.systemStatus`,
              defaultMessage: `System Status`,
            }),
            click: () => {
              _.shell.openExternal(`https://status.openai.com`);
            },
          },
          {
            label: w.formatMessage({
              messageId: `artifactFeedback.button.label`,
              defaultMessage: `Send Feedback`,
            }),
            click: ve,
          },
          { type: `separator` },
          {
            label: w.formatMessage({
              messageId: `electron.appMenu.help.taskManager`,
              defaultMessage: `Task Manager`,
            }),
            click: () => _.app.showTaskManager(),
          },
          it,
          ...(p.t.supportsStartupPerformanceRecording(t)
            ? [
                {
                  id: `restart-record-startup`,
                  label: w.formatMessage({
                    messageId: `electron.appMenu.trace.restartStartup`,
                    defaultMessage: `Restart and Record Startup Performance`,
                  }),
                  enabled: !g.y() && mY() === `idle`,
                  click: () => {
                    !g.y() && mY() === `idle` && g.b();
                  },
                },
              ]
            : []),
          ...Bt,
          ...(n
            ? []
            : [
                { type: `separator` },
                ...(c && process.platform !== `linux` ? [kt] : []),
                Fe,
              ]),
        ],
      },
    ],
    Wt = _.Menu.buildFromTemplate(Ut),
    Gt = Wt.getMenuItemById(st.edit)?.submenu;
  if (n) {
    let e = Gt?.items.find(
      (e) => e.role?.toLowerCase() === `pasteandmatchstyle`,
    );
    Gt &&
      e &&
      ((e.visible = !1),
      Gt.insert(
        Gt.items.indexOf(e),
        new _.MenuItem({
          label: w.formatMessage({
            messageId: `electron.appMenu.edit.pasteAndMatchStyle`,
            defaultMessage: `Paste and Match Style`,
          }),
          role: `pasteAndMatchStyle`,
          accelerator: `Command+Shift+V`,
        }),
      ));
  } else
    process.platform === `win32` &&
      Gt &&
      (Gt.append(new _.MenuItem({ type: `separator` })),
      Gt.append(new _.MenuItem(L)));
  let Kt = Wt.getMenuItemById(st.file)?.submenu;
  if (Kt) {
    let e = 0;
    (u.multiWindow && Kt.insert(e++, new _.MenuItem(ie)),
      Kt.insert(e++, new _.MenuItem(R)),
      Kt.insert(e++, new _.MenuItem(B)),
      Kt.insert(e++, new _.MenuItem(de)),
      Kt.insert(e++, new _.MenuItem(re)),
      Kt.insert(e++, new _.MenuItem(z)),
      Kt.insert(e++, new _.MenuItem({ type: `separator` })),
      Kt.insert(e++, new _.MenuItem(fe)),
      Kt.insert(e++, new _.MenuItem({ type: `separator` })),
      Kt.insert(e++, new _.MenuItem(se)),
      ce.accelerator != null && Kt.insert(e++, new _.MenuItem(ce)),
      n ||
        (Kt.insert(e, new _.MenuItem({ type: `separator` })),
        process.platform !== `win32` &&
          (Kt.append(new _.MenuItem(L)),
          Kt.append(new _.MenuItem({ type: `separator` }))),
        Kt.append(new _.MenuItem(pe)),
        Kt.append(new _.MenuItem({ ...At, accelerator: `Ctrl+Q` }))));
  }
  (_.Menu.setApplicationMenu(Wt), uY(S));
}
