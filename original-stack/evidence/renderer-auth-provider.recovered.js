    ? (a = t[1])
    : ((a = () => {
        yUs(i);
      }),
      (t[0] = i),
      (t[1] = a));
  let o = a,
    s;
  t[2] === o ? (s = t[3]) : ((s = { onLogout: o }), (t[2] = o), (t[3] = s));
  let c = BYe(as, s),
    { openAIAuth: l, authMethod: u, requiresAuth: d } = c,
    f = u === `chatgpt` || u === `chatgptAuthTokens`,
    p;
  t[4] === f ? (p = t[5]) : ((p = { enabled: f }), (t[4] = f), (t[5] = p));
  let m = OUe(p),
    h;
  t[6] !== m || t[7] !== f
    ? ((h = (e) => {
        let { hostId: t } = e;
        t === `local` && f && m.refetch();
      }),
      (t[6] = m),
      (t[7] = f),
      (t[8] = h))
    : (h = t[8]);
  let g;
  (t[9] !== m.refetch || t[10] !== f
    ? ((g = [m.refetch, f]), (t[9] = m.refetch), (t[10] = f), (t[11] = g))
    : (g = t[11]),
    xs(`chatgpt-auth-token-unavailable`, h, g));
  let _ = f ? m.data : void 0,
    v = f || (u === `personalAccessToken` && !0);
  (_?.userId, _?.accountId, _?.email, _?.plan, _?.computeResidency, _?.hasChatGptToken);
  let y = f ? (_?.userId ?? null) : null,
    b = f ? (_?.accountId ?? null) : null,
    x = v ? (c.email ?? _?.email ?? null) : null,
    S = v ? (_?.plan ?? c.planAtLogin ?? null) : null,
    C = f ? (_?.computeResidency ?? null) : null,
    w = f ? !r && _?.hasChatGptToken : void 0,
    T;
  t[12] !== c.isCopilotApiAvailable ||
  t[13] !== c.isLoading ||
  t[14] !== u ||
  t[15] !== l ||
  t[16] !== d ||
  t[17] !== C ||
  t[18] !== w ||
  t[19] !== y ||
  t[20] !== b ||
  t[21] !== x ||
  t[22] !== S
    ? ((T = {
        isLoading: c.isLoading,
        openAIAuth: l,
        isCopilotApiAvailable: c.isCopilotApiAvailable,
        authMethod: u,
        requiresAuth: d,
        userId: y,
        accountId: b,
        email: x,
        planAtLogin: S,
        computeResidency: C,
        hasChatGptToken: w,
      }),
      (t[12] = c.isCopilotApiAvailable),
      (t[13] = c.isLoading),
      (t[14] = u),
      (t[15] = l),
      (t[16] = d),
      (t[17] = C),
      (t[18] = w),
      (t[19] = y),
      (t[20] = b),
      (t[21] = x),
      (t[22] = S),
      (t[23] = T))
    : (T = t[23]);
  let E = T,
    D;
  t[24] !== m || t[25] !== E
    ? ((D = (0, Q6.jsx)(Q6.Fragment, {
        children: (0, Q6.jsx)(uHs, { accountInfoQuery: m, auth: E }),
      })),
      (t[24] = m),
      (t[25] = E),
      (t[26] = D))
    : (D = t[26]);
  let O;
  t[27] !== _ || t[28] !== m.isError || t[29] !== m.isLoading || t[30] !== E
    ? ((O = (0, Q6.jsx)(Q6.Fragment, {
        children: (0, Q6.jsx)(SHs, {
          accountInfo: _,
          accountInfoError: m.isError,
          accountInfoLoading: m.isLoading,
          auth: E,
        }),
      })),
      (t[27] = _),
      (t[28] = m.isError),
      (t[29] = m.isLoading),
      (t[30] = E),
      (t[31] = O))
    : (O = t[31]);
  let k;
  return (
    t[32] !== n || t[33] !== D || t[34] !== O || t[35] !== E
      ? ((k = (0, Q6.jsxs)(_1e.Provider, { value: E, children: [D, O, n] })),
        (t[32] = n),
        (t[33] = D),
        (t[34] = O),
        (t[35] = E),
        (t[36] = k))
      : (k = t[36]),
    k
  );
