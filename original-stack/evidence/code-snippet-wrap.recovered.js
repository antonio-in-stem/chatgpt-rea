function Mqi(e) {
  let t = (0, q9.c)(70),
    {
      ref: n,
      wrapperClassName: r,
      actionButtons: i,
      trailingActionButtons: a,
      alternateContent: o,
      previewContent: s,
      isShowingPreview: c,
      codeClassName: l,
      clipboardContent: u,
      codeCopyText: d,
      language: f,
      renderSvgAsImage: p,
      content: m,
      shouldWrapCode: h,
      removeTopBorderRadius: g,
      showActionBar: _,
      showStickyRightContent: v,
      showCopyButton: y,
      stickyHeader: b,
      codeContainerClassName: x,
      title: S,
      copyButtonText: C,
      onCopyCode: w,
      onToggleWrapCode: T,
      deferEnhancementsUntilVisible: E,
      variant: D,
    } = e,
    O = c !== void 0 && c,
    k = p === void 0 || p,
    A = h !== void 0 && h,
    j = _ === void 0 || _,
    M = v === void 0 || v,
    N = y === void 0 || y,
    P = b !== void 0 && b,
    F = E !== void 0 && E,
    ee = D === void 0 ? `default` : D,
    te = (0, J9.useRef)(null),
    [ne, re] = (0, J9.useState)(!1),
    I = !F || ne,
    L,
    R;
  (t[0] === I
    ? ((L = t[1]), (R = t[2]))
    : ((L = () => {
        if (I) return;
        let e = te.current;
        if (e == null) return;
        if (typeof IntersectionObserver > `u`) {
          let e = setTimeout(() => {
            re(!0);
          }, 0);
          return () => {
            clearTimeout(e);
          };
        }
        let t = new IntersectionObserver(
          (e) => {
            e.some(Pqi) && (re(!0), t.disconnect());
          },
          { rootMargin: `600px 0px` },
        );
        return (
          t.observe(e),
          () => {
            t.disconnect();
          }
        );
      }),
      (R = [I]),
      (t[0] = I),
      (t[1] = L),
      (t[2] = R)),
    (0, J9.useEffect)(L, R));
  let ie = Nqi,
    ae;
  t[3] !== u || t[4] !== m || t[5] !== w
    ? ((ae = (e) => {
        (ONi(u ?? m, e), w?.());
      }),
      (t[3] = u),
      (t[4] = m),
      (t[5] = w),
      (t[6] = ae))
    : (ae = t[6]);
  let oe = ae,
    se = cS(),
    ce;
  t[7] !== se || t[8] !== A
    ? ((ce = A
        ? se.formatMessage({
            id: `codeSnippet.wrap.disable`,
            defaultMessage: `Disable word wrap`,
            description: `Button to disable word wrap for a code snippet`,
          })
        : se.formatMessage({
            id: `codeSnippet.wrap.enable`,
            defaultMessage: `Enable word wrap`,
            description: `Button to enable word wrap for a code snippet`,
          })),
      (t[7] = se),
      (t[8] = A),
      (t[9] = ce))
    : (ce = t[9]);
  let le = ce,
    ue = A ? Cqi : bqi,
    [de, fe] = (0, J9.useState)(null),
    pe;
  t[10] !== m || t[11] !== f
    ? ((pe = {
        disposed: !1,
        latestContent: m,
        latestLanguage: f,
        lastStartedAtMs: null,
        timeoutHandle: null,
      }),
      (t[10] = m),
      (t[11] = f),
      (t[12] = pe))
    : (pe = t[12]);
  let me = (0, J9.useRef)(pe),
    he;
  t[13] === f ? (he = t[14]) : ((he = f?.trim().toLowerCase()), (t[13] = f), (t[14] = he));
  let ge = he === `plaintext`,
    _e = I && o == null && !(O && s != null) && !ge,
    ve,
    ye;
  (t[15] !== m || t[16] !== f || t[17] !== _e
    ? ((ve = () => {
        let e = me.current;
        if (((e.latestContent = m), (e.latestLanguage = f), !_e || e.timeoutHandle != null)) return;
        let t = performance.now(),
          n = e.lastStartedAtMs == null ? Bqi : t - e.lastStartedAtMs,
          r = Math.max(0, Bqi - n),
          i = () => {
            if (((e.timeoutHandle = null), e.disposed)) return;
            let t = e.latestContent,
              n = e.latestLanguage;
            ((e.lastStartedAtMs = performance.now()),
              Rqi().then((r) => {
                e.disposed || r == null || fe(r.highlightCode(t, n));
              }));
          };
        if (r === 0) {
          i();
          return;
        }
        e.timeoutHandle = setTimeout(i, r);
      }),
      (ye = [m, f, _e]),
      (t[15] = m),
      (t[16] = f),
      (t[17] = _e),
      (t[18] = ve),
      (t[19] = ye))
    : ((ve = t[18]), (ye = t[19])),
    (0, J9.useEffect)(ve, ye));
  let be, xe;
  (t[20] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((be = () => {
        let e = me.current;
        return (
          (e.disposed = !1),
          () => {
            ((e.disposed = !0),
              e.timeoutHandle != null && (clearTimeout(e.timeoutHandle), (e.timeoutHandle = null)));
          }
        );
      }),
      (xe = []),
      (t[20] = be),
      (t[21] = xe))
    : ((be = t[20]), (xe = t[21])),
    (0, J9.useEffect)(be, xe));
  let Se;
  t[22] !== m || t[23] !== f || t[24] !== k
    ? ((Se = k && Tqi(m, f)), (t[22] = m), (t[23] = f), (t[24] = k), (t[25] = Se))
    : (Se = t[25]);
  let Ce = Se,
    we;
  t[26] !== m || t[27] !== de || t[28] !== ge
    ? ((we = !ge && de != null && m.startsWith(de.code) ? de : null),
      (t[26] = m),
      (t[27] = de),
      (t[28] = ge),
      (t[29] = we))
    : (we = t[29]);
  let Te = we,
    Ee;
  if (t[30] !== m || t[31] !== se || t[32] !== I || t[33] !== ge || t[34] !== Te || t[35] !== Ce) {
    let e =
        ge && I
          ? m.split(`
`)
          : Te?.html.split(`
`),
      n;
    t[37] !== m || t[38] !== Te
      ? ((n = Te == null ? m : m.slice(Te.code.length)), (t[37] = m), (t[38] = Te), (t[39] = n))
      : (n = t[39]);
    let r = n;
    ((Ee = Ce
      ? (0, Y9.jsx)(PEi, {
          className: `max-h-96 w-full`,
          alt: se.formatMessage({
            id: `codex.codeSnippet.svgImageAlt`,
            defaultMessage: `Image generated by the assistant`,
            description: `Accessible description for an SVG preview inside a code snippet`,
          }),
          svgString: m,
        })
      : e == null
        ? (0, Y9.jsx)(`span`, { children: m })
        : (0, Y9.jsxs)(`span`, {
            children: [
              e.map((t, n) =>
                (0, Y9.jsxs)(
                  J9.Fragment,
                  {
                    children: [
                      ge ? (0, Y9.jsx)(`span`, { children: t }) : (0, Y9.jsx)(Vqi, { html: t }),
                      n < e.length - 1 ? zqi : null,
                    ],
                  },
                  n,
                ),
              ),
              !ge && r ? (0, Y9.jsx)(`span`, { children: r }) : null,
            ],
          })),
      (t[30] = m),
      (t[31] = se),
      (t[32] = I),
      (t[33] = ge),
      (t[34] = Te),
      (t[35] = Ce),
      (t[36] = Ee));
  } else Ee = t[36];
  let De = Ee,
    Oe = S ?? f,
    ke = d ?? (Ce ? m : void 0),
    Ae;
  t[40] !== ue ||
  t[41] !== i ||
  t[42] !== C ||
  t[43] !== oe ||
  t[44] !== se ||
  t[45] !== T ||
  t[46] !== A ||
  t[47] !== N ||
  t[48] !== M ||
  t[49] !== a ||
  t[50] !== ee ||
  t[51] !== le
    ? ((Ae =
        M &&
        (0, Y9.jsxs)(`div`, {
          className: q(
            `flex items-center gap-px print:hidden`,
            ee === "default" && `flex-wrap justify-end`,
            ee === `preview` &&
              `opacity-0 group-hover/code-snippet:opacity-100 group-focus-within/code-snippet:opacity-100`,
          ),
          children: [
            ee === "default" ? null : i,
            T == null
              ? null
              : (0, Y9.jsx)(w5, {
                  tooltipContent: le,
                  children: (0, Y9.jsx)(r5, {
                    "aria-label": le,
                    "aria-pressed": A,
                    color: ee === "default" ? `ghostActive` : `ghost`,
                    size: ee === "default" ? `imageToolbar` : `icon`,
                    uniform: ee === "default",
                    className: A ? `hover:text-default` : void 0,
                    onClick: T,
                    children:
                      ee === "default"
                        ? (0, Y9.jsxs)(Y9.Fragment, {
                            children: [
                              null,
                              (0, Y9.jsx)(Y9.Fragment, {
                                children: A ? (0, Y9.jsx)(Pfr, {}) : (0, Y9.jsx)(Nfr, {}),
                              }),
                            ],
                          })
                        : (0, Y9.jsx)(ue, { className: `icon-2xs` }),
                  }),
                }),
            ee === "default" ? i : null,
            N
              ? (0, Y9.jsx)(jGi, {
                  variant: ee === "default" ? `toolbar` : `default`,
                  ariaLabel: C,
                  iconClassName: `icon-xs`,
                  iconOnly: !0,
                  buttonText:
                    C ??
                    se.formatMessage({
                      id: `copyButton.copyCode`,
                      defaultMessage: `Copy code`,
                      description: `Button to copy the contents of the code snippet to the clipboard`,
                    }),
                  onCopy: oe,
                })
              : null,
            a,
          ],
        })),
      (t[40] = ue),
      (t[41] = i),
      (t[42] = C),
      (t[43] = oe),
      (t[44] = se),
      (t[45] = T),
      (t[46] = A),
      (t[47] = N),
      (t[48] = M),
      (t[49] = a),
      (t[50] = ee),
      (t[51] = le),
      (t[52] = Ae))
    : (Ae = t[52]);
  let je;
  return (
    t[53] !== o ||
    t[54] !== De ||
    t[55] !== l ||
    t[56] !== x ||
    t[57] !== O ||
    t[58] !== s ||
    t[59] !== g ||
    t[60] !== A ||
    t[61] !== j ||
    t[62] !== P ||
    t[63] !== Oe ||
    t[64] !== ke ||
    t[65] !== Ae ||
    t[66] !== ee ||
    t[67] !== r ||
    t[68] !== n
      ? ((je = (0, Y9.jsx)(Fqi, {
          ref: te,
          wrapperRef: n,
          title: Oe,
          codeCopyText: ke,
          shouldWrapCode: A,
          alternateContent: o,
          previewContent: s,
          isShowingPreview: O,
          stickyTitleRightContent: Ae,
          codeClassName: l,
          codeContainerClassName: x,
          onCopy: ie,
          className: r,
          removeTopBorderRadius: g,
          showActionBar: j,
          stickyHeader: P,
          variant: ee,
          children: De,
        })),
        (t[53] = o),
        (t[54] = De),
        (t[55] = l),
        (t[56] = x),
        (t[57] = O),
        (t[58] = s),
        (t[59] = g),
        (t[60] = A),
        (t[61] = j),
        (t[62] = P),
        (t[63] = Oe),
        (t[64] = ke),
        (t[65] = Ae),
        (t[66] = ee),
        (t[67] = r),
        (t[68] = n),
        (t[69] = je))
      : (je = t[69]),
    je
  );
}
function Nqi(e) {
  if (e.defaultPrevented) return;
  (e.preventDefault(), e.stopPropagation());
  let t = window.getSelection()?.toString();
  t && ONi(t, e);
}
function Pqi(e) {
  return e.isIntersecting;
}
function Fqi(e) {
  let t = (0, q9.c)(36),
    {
      wrapperRef: n,
      children: r,
      alternateContent: i,
      previewContent: a,
      isShowingPreview: o,
      title: s,
      codeCopyText: c,
      stickyTitleRightContent: l,
      shouldWrapCode: u,
      className: d,
      codeContainerClassName: f,
      codeClassName: p,
      onCopy: m,
      ref: h,
      removeTopBorderRadius: g,
      showActionBar: _,
      stickyHeader: v,
      variant: y,
    } = e,
    b = u !== void 0 && u,
    x = _ === void 0 || _,
    S = hxi(),
    C =
      y === `hover`
        ? `w-auto overflow-visible bg-transparent`
        : `w-full min-w-0 overflow-clip contain-inline-size`,
    w =
      y === `preview` &&
      `group/code-snippet rounded-lg border border-default bg-surface text-default`,
    T = y === "default" && `rounded-(--radius-3xl-base) border border-subtle text-default`,
    E = y === "default" && (o ? `bg-transparent` : K9.CodeSurface),
    D = y === "default" && K9.Surface,
    O = S ? `dark` : `light`,
    k;
  t[0] !== d || t[1] !== C || t[2] !== w || t[3] !== T || t[4] !== E || t[5] !== D || t[6] !== O
    ? ((k = q(`relative`, C, w, T, E, D, O, d)),
      (t[0] = d),
      (t[1] = C),
      (t[2] = w),
      (t[3] = T),
      (t[4] = E),
      (t[5] = D),
      (t[6] = O),
      (t[7] = k))
    : (k = t[7]);
  let A = S ? `dark` : `light`,
    j;
  t[8] !== o ||
  t[9] !== g ||
  t[10] !== x ||
  t[11] !== v ||
  t[12] !== l ||
  t[13] !== s ||
  t[14] !== y
    ? ((j =
        x &&
        (0, Y9.jsxs)(Iqi, {
          removeTopBorderRadius: g,
          sticky: v && !o,
          variant: y,
          children: [
            y === "default" && s != null ? (0, Y9.jsx)(x$, {}) : null,
            (0, Y9.jsx)(`div`, {
              className: q(
                `min-w-0 flex-1 truncate`,
                y === `preview` && `flex h-token-button-composer-sm items-center`,
              ),
              children: s,
            }),
            (0, Y9.jsx)(`div`, {
              className: q(
                `ms-auto flex items-center`,
                y === "default" ? `min-w-0 max-w-full` : `shrink-0`,
              ),
              children: l,
            }),
          ],
        })),
      (t[8] = o),
      (t[9] = g),
      (t[10] = x),
      (t[11] = v),
      (t[12] = l),
      (t[13] = s),
      (t[14] = y),
      (t[15] = j))
    : (j = t[15]);
  let M;
  t[16] !== i ||
  t[17] !== r ||
  t[18] !== p ||
  t[19] !== f ||
  t[20] !== o ||
  t[21] !== m ||
  t[22] !== a ||
  t[23] !== h ||
  t[24] !== b ||
  t[25] !== x ||
  t[26] !== y
    ? ((M =
        o && a != null
          ? null
          : (i ??
            (0, Y9.jsx)(Hqi, {
              ref: h,
              className: q(
                y === `hover` && `p-0`,
                y === "default" && (x ? `px-4 pt-0 pb-3 md:px-5` : `p-4 md:px-5`),
                y === `preview` && `max-h-[calc(15lh+var(--spacing)*4)] p-2`,
                f,
              ),
              tabIndex: y === `preview` ? 0 : void 0,
              children: (0, Y9.jsx)(Lqi, {
                shouldWrap: b,
                className: q(
                  y === "default" && `block text-size-code`,
                  y === "default" && K9.CodeContent,
                  y === `hover` && `text-xs`,
                  p,
                ),
                onCopy: m,
                children: r,
              }),
            }))),
      (t[16] = i),
      (t[17] = r),
      (t[18] = p),
      (t[19] = f),
      (t[20] = o),
      (t[21] = m),
      (t[22] = a),
      (t[23] = h),
      (t[24] = b),
      (t[25] = x),
      (t[26] = y),
      (t[27] = M))
    : (M = t[27]);
  let N;
  return (
    t[28] !== c ||
    t[29] !== a ||
    t[30] !== A ||
    t[31] !== j ||
    t[32] !== M ||
    t[33] !== k ||
    t[34] !== n
      ? ((N = (0, Y9.jsxs)(`div`, {
          ref: n,
          "data-markdown-copy": `code-block`,
          "data-markdown-copy-text": c,
          className: k,
          "data-theme": A,
          children: [j, M, a],
        })),
        (t[28] = c),
        (t[29] = a),
        (t[30] = A),
        (t[31] = j),
        (t[32] = M),
        (t[33] = k),
        (t[34] = n),
        (t[35] = N))
      : (N = t[35]),
    N
  );
}
function Iqi(e) {
  let t = (0, q9.c)(16),
    n,
    r,
    i,
    a,
    o;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]), (a = t[4]), (o = t[5]))
    : (({ className: n, removeTopBorderRadius: i, sticky: a, variant: o, ...r } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = i),
      (t[4] = a),
      (t[5] = o));
  let s = i !== void 0 && i,
    c = a !== void 0 && a,
    l =
      o === "default"
        ? `min-h-12 gap-2 py-1.5 ps-4 pe-1.5 font-medium text-default md:ps-5`
        : `px-2 py-1 text-codex-description`,
    u = c && `sticky z-10`,
    d = c && o !== "default" && `border-b border-default`,
    f = c && K9.StickyActionBar,
    p = !s && o !== "default" && `rounded-t-lg`,
    m;
  t[6] !== n || t[7] !== l || t[8] !== u || t[9] !== d || t[10] !== f || t[11] !== p
    ? ((m = q(`flex items-center font-sans text-sm select-none`, l, u, d, f, p, n)),
      (t[6] = n),
      (t[7] = l),
      (t[8] = u),
      (t[9] = d),
      (t[10] = f),
      (t[11] = p),
      (t[12] = m))
    : (m = t[12]);
  let h;
  return (
    t[13] !== r || t[14] !== m
      ? ((h = (0, Y9.jsx)(`div`, { "data-markdown-copy": `exclude`, className: m, ...r })),
        (t[13] = r),
        (t[14] = m),
        (t[15] = h))
      : (h = t[15]),
    h
  );
}
function Lqi(e) {
  let t = (0, q9.c)(10),
    n,
    r,
    i;
  t[0] === e
    ? ((n = t[1]), (r = t[2]), (i = t[3]))
    : (({ className: n, shouldWrap: i, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = i));
  let a = i ? `whitespace-pre-wrap!` : `whitespace-pre!`,
    o;
  t[4] !== n || t[5] !== a ? ((o = q(a, n)), (t[4] = n), (t[5] = a), (t[6] = o)) : (o = t[6]);
  let s;
  return (
    t[7] !== r || t[8] !== o
      ? ((s = (0, Y9.jsx)(`code`, { className: o, ...r })), (t[7] = r), (t[8] = o), (t[9] = s))
      : (s = t[9]),
    s
  );
}
