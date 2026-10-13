}
function iPo(e) {
  let t = (0, sPo.c)(139),
    n;
  t[0] === e ? (n = t[1]) : ((n = e === void 0 ? {} : e), (t[0] = e), (t[1] = n));
  let { compact: r, defaultOpen: i, hideUsage: a } = n,
    o = r !== void 0 && r,
    s = i !== void 0 && i,
    c = a !== void 0 && a,
    l = zd(),
    u = e_(),
    [, d] = (0, cPo.useState)(null),
    f = Cc(),
    p = G(CC),
    m = gp(),
    {
      accountId: h,
      accountStructureAtLogin: g,
      authMethod: _,
      email: v,
      isLoading: y,
      nameAtLogin: b,
      profilePictureUrlAtLogin: x,
      requiresAuth: S,
      userId: C,
    } = m,
    w = Zs(!o && !c ? v$a : null, m)?.data.profile_subtext ?? null,
    T = _ != null,
    E;
  t[2] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((E = { hostId: as }), (t[2] = E))
    : (E = t[2]);
  let { data: D } = Zs(MG, E),
    O;
  t[3] !== _ || t[4] !== D
    ? ((O = _ === `chatgpt` ? null : UNo(D)), (t[3] = _), (t[4] = D), (t[5] = O))
    : (O = t[5]);
  let k = O,
    A = T || k != null || !0,
    j = _ !== `chatgpt` && (T || k != null),
    M = _ == null && !y && !S,
    { data: N, isError: P } = PB(),
    { data: F } = Cqe(),
    I = h ?? F?.accountId ?? null,
    L = C ?? F?.userId ?? null,
    R;
  t[6] !== I || t[7] !== L
    ? ((R = { accountId: I, userId: L }), (t[6] = I), (t[7] = L), (t[8] = R))
    : (R = t[8]);
  let { data: z, isPending: B } = Zs(vMo, R),
    V;
  t[9] !== N?.structure || t[10] !== g
    ? ((V = (N?.structure ?? g)?.toLowerCase()), (t[9] = N?.structure), (t[10] = g), (t[11] = V))
    : (V = t[11]);
  let H = V,
    ee = H === `personal`,
    U = H === `workspace`,
    te = _ === `chatgpt` && I != null && L != null,
    { isProfileVisible: ne, isProfileVisibilityLoading: re } = H9i(),
    ie = te && ne,
    ae;
  t[12] !== I || t[13] !== L || t[14] !== ie
    ? ((ae = Q7i({ accountId: I, enabled: ie, userId: L })),
      (t[12] = I),
      (t[13] = L),
      (t[14] = ie),
      (t[15] = ae))
    : (ae = t[15]);
  let { data: oe, isPending: se } = Cp(ae),
    ce = !1;
  _ === `chatgpt` && U ? (ce = N == null && !P) : te && (ce = B || (se && (re || ne)));
  let le;
  t[16] !== z || t[17] !== x
    ? ((le = (z == null && x?.trim()) || null), (t[16] = z), (t[17] = x), (t[18] = le))
    : (le = t[18]);
  let ue = le,
    de;
  t[19] !== N?.profile_picture_url ||
  t[20] !== z?.picture ||
  t[21] !== ee ||
  t[22] !== oe?.profile_details.profile_picture_url ||
  t[23] !== ue
    ? ((de =
        (oe?.profile_details.profile_picture_url?.trim() || null) ??
        z?.picture ??
        (ee ? N?.profile_picture_url : null) ??
        ue),
      (t[19] = N?.profile_picture_url),
      (t[20] = z?.picture),
      (t[21] = ee),
      (t[22] = oe?.profile_details.profile_picture_url),
      (t[23] = ue),
      (t[24] = de))
    : (de = t[24]);
  let fe = de,
    pe = T && U ? N?.profile_picture_url : fe,
    { src: me, isError: he } = Uco(pe),
    ge = ce || (pe != null && me == null && !he);
  if (!A && !M) {
    let e;
    return (
      t[25] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((e = (0, A1.jsx)(A1.Fragment, {})), (t[25] = e))
        : (e = t[25]),
      e
    );
  }
  let _e;
  t[26] === l
    ? (_e = t[27])
    : ((_e = l.formatMessage({
        id: `codex.profileFooter.settingsFallback`,
        defaultMessage: `Settings`,
        description: `Footer label shown when no profile identity is available`,
      })),
      (t[26] = l),
      (t[27] = _e));
  let ve = _e,
    ye;
  t[28] === b ? (ye = t[29]) : ((ye = b?.trim() || null), (t[28] = b), (t[29] = ye));
  let be = ye,
    xe;
  t[30] === N?.name
    ? (xe = t[31])
    : ((xe = N?.name?.trim() || null), (t[30] = N?.name), (t[31] = xe));
  let Se = xe,
    Ce;
  t[32] === oe?.profile_details.display_name
    ? (Ce = t[33])
    : ((Ce = oe?.profile_details.display_name?.trim() || null),
      (t[32] = oe?.profile_details.display_name),
      (t[33] = Ce));
  let we = Ce,
    Te = z?.name ?? be ?? z?.email ?? (ee ? Se : null) ?? v ?? F?.email,
    Ee;
  t[34] !== _ ||
  t[35] !== Te ||
  t[36] !== l ||
  t[37] !== oe?.profile_details ||
  t[38] !== we ||
  t[39] !== fe
    ? ((Ee =
        _ === `chatgpt`
          ? {
              displayName:
                we ??
                Te ??
                l.formatMessage({
                  id: `codex.profileDropdown.profile`,
                  defaultMessage: `Profile`,
                  description: `Menu item to open the profile page`,
                }),
              isProfileAvailable: we != null,
              profileImageUrl: fe,
              username: oe?.profile_details.username?.trim() || null,
            }
          : null),
      (t[34] = _),
      (t[35] = Te),
      (t[36] = l),
      (t[37] = oe?.profile_details),
      (t[38] = we),
      (t[39] = fe),
      (t[40] = Ee))
    : (Ee = t[40]);
  let De = Ee,
    Oe;
  t[41] !== N?.profile_picture_url ||
  t[42] !== Se ||
  t[43] !== l ||
  t[44] !== T ||
  t[45] !== U ||
  t[46] !== k ||
  t[47] !== De
    ? ((Oe =
        k == null
          ? De != null && !U
            ? De
            : T && U
              ? {
                  displayName:
                    Se ??
                    l.formatMessage({
                      id: `codex.profileFooter.workspaceFallback`,
                      defaultMessage: `Workspace`,
                      description: `Footer label while the selected workspace's name is loading`,
                    }),
                  profileImageUrl: N?.profile_picture_url ?? null,
                }
              : null
          : { displayName: k, profileImageUrl: null }),
      (t[41] = N?.profile_picture_url),
      (t[42] = Se),
      (t[43] = l),
      (t[44] = T),
      (t[45] = U),
      (t[46] = k),
      (t[47] = De),
      (t[48] = Oe))
    : (Oe = t[48]);
  let ke = Oe,
    Ae = ke?.displayName ?? ve,
    je;
  t[49] !== A || t[50] !== l
    ? ((je = A
        ? l.formatMessage({
            id: `codex.profileFooter.openProfileMenu`,
            defaultMessage: `Open profile menu`,
            description: `Accessible label for opening the profile menu`,
          })
        : l.formatMessage({
            id: `codex.profileFooter.openSettings`,
            defaultMessage: `Open settings`,
            description: `Accessible label for opening settings`,
          })),
      (t[49] = A),
      (t[50] = l),
      (t[51] = je))
    : (je = t[51]);
  let Me = je,
    Ne;
  t[52] !== Ae || t[53] !== ce || t[54] !== U || t[55] !== be
    ? ((Ne =
        ce && (U || be == null)
          ? (0, A1.jsx)(iC, { as: `span`, widthPercent: 50 })
          : (0, A1.jsx)(`span`, { className: `min-w-0 flex-1 truncate`, children: Ae })),
      (t[52] = Ae),
      (t[53] = ce),
      (t[54] = U),
      (t[55] = be),
      (t[56] = Ne))
    : (Ne = t[56]);
  let Pe = Ne,
    Fe;
  t[58] === !1 ? (Fe = t[59]) : ((Fe = void 0), (t[58] = !1), (t[59] = Fe));
  let Ie = Fe,
    Le = o ? `size-6` : `icon-sm`,
    Re;
  t[60] === Le
    ? (Re = t[61])
    : ((Re = ng(`shrink-0 rounded-full bg-text-tertiary/80 browser:size-6`, Le)),
      (t[60] = Le),
      (t[61] = Re));
  let ze;
  t[62] === Re
    ? (ze = t[63])
    : ((ze = (0, A1.jsx)(`span`, { "aria-hidden": !0, className: Re })),
      (t[62] = Re),
      (t[63] = ze));
  let Be = ze,
    Ve;
  t[64] !== Ae ||
  t[65] !== Be ||
  t[66] !== o ||
  t[67] !== ke ||
  t[68] !== me ||
  t[69] !== ge ||
  t[70] !== ce ||
  t[71] !== j ||
  t[72] !== U ||
  t[73] !== I ||
  t[74] !== L ||
  t[75] !== !1
    ? ((Ve =
        ke == null || j
          ? (0, A1.jsx)(cp, { className: `shrink-0`, "aria-hidden": !1, asset: o ? Qde : _he })
          : (0, A1.jsxs)(`span`, {
              className: ng(`relative isolate inline-flex shrink-0`, !1),
              children: [
                null,
                null,
                (0, A1.jsx)(A1.Fragment, {
                  children: (0, A1.jsx)($Mo, {
                    alt: ``,
                    colorKey: (U ? I : L) ?? void 0,
                    name: Ae,
                    size: o ? `sm` : `xs`,
                    src: ce ? null : me,
                    fallback: ge ? Be : void 0,
                    loadingFallback: Be,
                  }),
                }),
              ],
            })),
      (t[64] = Ae),
      (t[65] = Be),
      (t[66] = o),
