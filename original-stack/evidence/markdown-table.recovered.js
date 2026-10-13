function gnl(e) {
  let t = (0, _nl.c)(57),
    {
      allowWideBlocks: n,
      children: r,
      className: i,
      getCopyContent: a,
      markdownSource: o,
      onCopy: s,
    } = e,
    c = zd(),
    [l, u] = (0, vnl.useState)(!1),
    [d, f] = (0, vnl.useState)(!1),
    p = (0, vnl.useRef)(null),
    m;
  t[0] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((m = () => {
        let e = p.current;
        e != null && f(e.scrollWidth > e.clientWidth);
      }),
      (t[0] = m))
    : (m = t[0]);
  let h = m,
    g = Qm(h),
    _ = Qm(h),
    v;
  t[1] === c
    ? (v = t[2])
    : ((v = c.formatMessage({
        id: `markdown.scrollTable`,
        defaultMessage: `Scrollable table`,
        description: `Accessible label for a horizontally scrollable Markdown table`,
      })),
      (t[1] = c),
      (t[2] = v));
  let y = v,
    b;
  t[3] === c
    ? (b = t[4])
    : ((b = c.formatMessage({
        id: `markdown.copyTable`,
        defaultMessage: `Copy table`,
        description: `Tooltip and accessible label for copying a Markdown table`,
      })),
      (t[3] = c),
      (t[4] = b));
  let x = b,
    S;
  t[5] === c
    ? (S = t[6])
    : ((S = c.formatMessage({
        id: `markdown.expandTable`,
        defaultMessage: `Expand table`,
        description: `Tooltip and accessible label for opening a Markdown table preview`,
      })),
      (t[5] = c),
      (t[6] = S));
  let C = S,
    w;
  t[7] === c
    ? (w = t[8])
    : ((w = c.formatMessage({
        id: `markdown.tablePreview`,
        defaultMessage: `Table preview`,
        description: `Accessible label for the Markdown table preview dialog`,
      })),
      (t[7] = c),
      (t[8] = w));
  let T = w,
    E;
  t[9] === c
    ? (E = t[10])
    : ((E = c.formatMessage({
        id: `markdown.closeTablePreview`,
        defaultMessage: `Close table preview`,
        description: `Accessible label for closing the Markdown table preview`,
      })),
      (t[9] = c),
      (t[10] = E));
  let D = E,
    O;
  t[11] !== a || t[12] !== o || t[13] !== s
    ? ((O = (e) => {
        if ((s?.(), a != null)) return bc(a(o), e);
        let t = e.currentTarget
          .closest(`[data-markdown-table]`)
          ?.querySelector(`table`)?.parentElement;
        if (t == null) return !1;
        let n = TBr(t);
        return n != null && bc({ "text/plain": o, "text/html": n.htmlText }, e);
      }),
      (t[11] = a),
      (t[12] = o),
      (t[13] = s),
      (t[14] = O))
    : (O = t[14]);
  let k = O,
    A;
  t[15] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = ng(
        `group/app-widget pointer-coarse:pt-11 [@media(hover:none)]:pt-11`,
        E7.TableContainer,
      )),
      (t[15] = A))
    : (A = t[15]);
  let j = n ? `` : void 0,
    M;
  t[16] === g ? (M = t[17]) : ((M = Fd(p, g)), (t[16] = g), (t[17] = M));
  let N = d && `horizontal-scroll-fade-mask`,
    P;
  t[18] === N ? (P = t[19]) : ((P = ng(E7.TableScroller, N)), (t[18] = N), (t[19] = P));
  let F = d ? y : void 0,
    I = d ? `region` : void 0,
    L = d ? 0 : void 0,
    R;
  t[20] !== r || t[21] !== i
    ? ((R = (0, Z7.jsx)(k6c, { className: i, children: r })), (t[20] = r), (t[21] = i), (t[22] = R))
    : (R = t[22]);
  let z;
  t[23] !== _ || t[24] !== R
    ? ((z = (0, Z7.jsx)(`div`, { ref: _, className: E7.TableWrapper, children: R })),
      (t[23] = _),
      (t[24] = R),
      (t[25] = z))
    : (z = t[25]);
  let B;
  t[26] !== M || t[27] !== P || t[28] !== F || t[29] !== I || t[30] !== L || t[31] !== z
    ? ((B = (0, Z7.jsx)(`div`, {
        ref: M,
        className: P,
        "aria-label": F,
        role: I,
        tabIndex: L,
        children: z,
      })),
      (t[26] = M),
      (t[27] = P),
      (t[28] = F),
      (t[29] = I),
      (t[30] = L),
      (t[31] = z),
      (t[32] = B))
    : (B = t[32]);
  let V;
  t[33] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((V = (e) => {
        let t = p.current;
        e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          (e.altKey && !Qh()) ||
          (e.key !== `ArrowLeft` && e.key !== `ArrowRight`) ||
          t == null ||
          t.scrollWidth <= t.clientWidth ||
          (e.preventDefault(),
          t.scrollBy({ left: (e.key === `ArrowLeft` ? -1 : 1) * (e.altKey ? t.clientWidth : 40) }));
      }),
      (t[33] = V))
    : (V = t[33]);
  let H;
  t[34] !== x || t[35] !== k
    ? ((H = (0, Z7.jsx)(I0e, {
        ariaLabel: x,
        buttonText: x,
        iconOnly: !0,
        variant: `blockAction`,
        onCopy: k,
        onKeyDown: V,
      })),
      (t[34] = x),
      (t[35] = k),
      (t[36] = H))
    : (H = t[36]);
  let ee;
  t[37] !== n || t[38] !== C || t[39] !== d || t[40] !== l
    ? ((ee =
        n || d
          ? (0, Z7.jsx)(Z7.Fragment, {
              children: (0, Z7.jsx)(Pn, {
                tooltipContent: C,
                delayOpen: !0,
                children: (0, Z7.jsx)(Ir, {
                  "aria-label": C,
                  "aria-expanded": l,
                  "aria-haspopup": `dialog`,
                  color: `blockAction`,
                  radius: `full`,
                  size: `inputIcon`,
                  onClick: () => u(!0),
                  children: (0, Z7.jsx)(rm, { icon: { 16: MRe, 20: Ue } }),
                }),
              }),
            })
          : null),
      (t[37] = n),
      (t[38] = C),
      (t[39] = d),
      (t[40] = l),
      (t[41] = ee))
    : (ee = t[41]);
  let U;
  t[42] !== H || t[43] !== ee
    ? ((U = (0, Z7.jsxs)(fnl, { "data-markdown-copy": `exclude`, children: [H, ee] })),
      (t[42] = H),
      (t[43] = ee),
      (t[44] = U))
    : (U = t[44]);
  let te;
  t[45] !== r || t[46] !== i || t[47] !== D || t[48] !== l || t[49] !== y || t[50] !== T
    ? ((te = l
        ? (0, Z7.jsx)(xel, {
            src: ``,
            alt: T,
            open: !0,
            closeAriaLabel: D,
            dialogAriaLabel: T,
            previewContent: (0, Z7.jsx)(`div`, {
              className: ng(E7.MarkdownRoot, E7.MarkdownTablePreview),
              children: (0, Z7.jsxs)(`div`, {
                className: ng(
                  E7.TableScroller,
                  `flex min-h-0 min-w-0 flex-1 overflow-auto bg-inherit`,
                ),
                "aria-label": y,
                role: `region`,
                tabIndex: 0,
                children: [
                  (0, Z7.jsxs)(`div`, {
                    className: `flex w-fit flex-col bg-inherit`,
                    children: [
                      (0, Z7.jsx)(k6c, { className: i, children: r }),
                      (0, Z7.jsx)(`div`, {
                        "aria-hidden": !0,
                        className: `pointer-events-none sticky bottom-0 h-2 w-full shrink-0 bg-inherit`,
                      }),
                    ],
                  }),
                  (0, Z7.jsx)(`div`, {
                    "aria-hidden": !0,
                    className: `pointer-events-none sticky end-0 top-0 h-full w-2 shrink-0 bg-inherit`,
                  }),
                ],
              }),
            }),
            showDownload: !1,
            showZoomControls: !1,
            onOpenChange: u,
          })
        : null),
      (t[45] = r),
      (t[46] = i),
      (t[47] = D),
      (t[48] = l),
      (t[49] = y),
      (t[50] = T),
      (t[51] = te))
    : (te = t[51]);
  let ne;
  return (
    t[52] !== B || t[53] !== U || t[54] !== te || t[55] !== j
      ? ((ne = (0, Z7.jsxs)(`div`, {
          className: A,
          "data-markdown-table": !0,
          "data-wide-block": j,
          tabIndex: -1,
          children: [B, U, te],
        })),
        (t[52] = B),
        (t[53] = U),
        (t[54] = te),
        (t[55] = j),
        (t[56] = ne))
      : (ne = t[56]),
    ne
  );
}
