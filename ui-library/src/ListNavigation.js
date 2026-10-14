// Original list keyboard/highlight hook. Platform and stable-callback hooks are explicit adapters.
export function createListNavigation({React,isMac:Qh,useStableCallback:Dd,compilerRuntime=React.__COMPILER_RUNTIME}){
if(typeof Qh!=='function'||typeof Dd!=='function'||!React.useEffectEvent)throw new TypeError('List navigation requires platform, stable callback and React effect-event support');
const pps=compilerRuntime,o3=React;
function ups(e, t) {
  if (t <= 0) return -1;
  let n = e % t;
  return n < 0 ? n + t : n;
}
function dps(e) {
  let t = (0, pps.c)(70),
    {
      items: n,
      isActive: r,
      getItemKey: i,
      onSelect: a,
      onHighlight: o,
      onEscape: s,
      autoHighlightFirst: c,
      clearHighlightOnMouseLeave: l,
      captureWindowKeydown: u,
      keyboardEventTarget: d,
      keyboardVariant: f,
      selectOnSpace: p,
      preserveHighlightOnItemsChange: m,
      numberShortcutCount: h,
      selectOnTab: g,
      shouldHandleKeyDown: _,
      highlightResetKey: v,
    } = e,
    y = c === void 0 || c,
    b = l !== void 0 && l,
    x = u !== void 0 && u,
    S = f === void 0 ? `default` : f,
    C = m !== void 0 && m,
    w = h === void 0 ? 0 : h,
    T = g !== void 0 && g,
    E;
  t[0] === Symbol.for(`react.memo_cache_sentinel`) ? ((E = Qh()), (t[0] = E)) : (E = t[0]);
  let D = E,
    O = (0, o3.useRef)(null),
    k = (0, o3.useRef)(null),
    A = (0, o3.useRef)(null),
    j = n == null ? 0 : n.length,
    [M, N] = (0, o3.useState)(y && j > 0 ? 0 : -1),
    P = r && M >= 0 && M < j ? (n?.[M] ?? null) : null,
    F;
  t[1] !== i || t[2] !== P
    ? ((F = P == null ? null : (i?.(P) ?? P)), (t[1] = i), (t[2] = P), (t[3] = F))
    : (F = t[3]);
  let I = F,
    L;
  t[4] !== n || t[5] !== o
    ? ((L = (e) => {
        o?.(n?.[e] ?? null, e);
      }),
      (t[4] = n),
      (t[5] = o),
      (t[6] = L))
    : (L = t[6]);
  let R = (0, o3.useEffectEvent)(L),
    z,
    B;
  (t[7] !== y ||
  t[8] !== i ||
  t[9] !== v ||
  t[10] !== M ||
  t[11] !== r ||
  t[12] !== n ||
  t[13] !== j ||
  t[14] !== C
    ? ((z = () => {
        let e = A.current?.items,
          t =
            v == null
              ? e != null && (n == null || e.length !== j || e.some((e, t) => e !== n[t]))
              : A.current != null && A.current.highlightResetKey !== v;
        if (((A.current = { items: n, highlightResetKey: v }), !r || j === 0)) {
          M !== -1 && N(-1);
          return;
        }
        if (M >= 0 && M < j && ((C && i == null) || !t)) return;
        let a = e?.[M],
          o = C && i != null && a != null ? (n?.findIndex((e) => i(e) === i(a)) ?? -1) : -1,
          s = y ? 0 : -1;
        (o >= 0 && (s = o), M !== s && N(s));
      }),
      (B = [y, i, v, M, r, n, j, C]),
      (t[7] = y),
      (t[8] = i),
      (t[9] = v),
      (t[10] = M),
      (t[11] = r),
      (t[12] = n),
      (t[13] = j),
      (t[14] = C),
      (t[15] = z),
      (t[16] = B))
    : ((z = t[15]), (B = t[16])),
    (0, o3.useEffect)(z, B));
  let V;
  t[17] !== M || t[18] !== I || t[19] !== R
    ? ((V = () => {
        if (I == null) {
          R(-1);
          return;
        }
        R(M);
      }),
      (t[17] = M),
      (t[18] = I),
      (t[19] = R),
      (t[20] = V))
    : (V = t[20]);
  let H;
  (t[21] !== M || t[22] !== I ? ((H = [M, I]), (t[21] = M), (t[22] = I), (t[23] = H)) : (H = t[23]),
    (0, o3.useEffect)(V, H));
  let ee, U;
  (t[24] !== M || t[25] !== r || t[26] !== j
    ? ((ee = () => {
        let e = k.current === M;
        if (((k.current = null), !r || e || M < 0 || M >= j)) return;
        let t = O.current;
        t &&
          t
            .querySelectorAll(`[data-list-navigation-item="true"]`)
            .item(M)
            ?.scrollIntoView({ block: `nearest` });
      }),
      (U = [M, r, j]),
      (t[24] = M),
      (t[25] = r),
      (t[26] = j),
      (t[27] = ee),
      (t[28] = U))
    : ((ee = t[27]), (U = t[28])),
    (0, o3.useEffect)(ee, U));
  let te;
  t[29] !== n || t[30] !== j || t[31] !== a
    ? ((te = (e) => {
        let t = n != null && e >= 0 && e < j ? n[e] : void 0;
        t && (N(e), a(t, e));
      }),
      (t[29] = n),
      (t[30] = j),
      (t[31] = a),
      (t[32] = te))
    : (te = t[32]);
  let ne = Dd(te),
    re;
  t[33] !== M || t[34] !== r || t[35] !== j
    ? ((re = (e) => {
        r && e >= 0 && e < j && e !== M && ((k.current = e), N(e));
      }),
      (t[33] = M),
      (t[34] = r),
      (t[35] = j),
      (t[36] = re))
    : (re = t[36]);
  let ie = Dd(re),
    ae;
  t[37] === j
    ? (ae = t[38])
    : ((ae = (e) => {
        ((k.current = null),
          N((t) => (j === 0 ? -1 : t < 0 ? (e >= 0 ? 0 : j - 1) : ups(t + e, j))));
      }),
      (t[37] = j),
      (t[38] = ae));
  let oe = ae,
    se = fps,
    ce;
  t[39] !== y ||
  t[40] !== M ||
  t[41] !== P ||
  t[42] !== r ||
  t[43] !== j ||
  t[44] !== S ||
  t[45] !== oe ||
  t[46] !== w ||
  t[47] !== s ||
  t[48] !== ne ||
  t[49] !== p ||
  t[50] !== T ||
  t[51] !== _
    ? ((ce = (e) => {
        if (!r) return !1;
        let t = `nativeEvent` in e ? e.nativeEvent : e;
        if (_?.(t) === !1 || t.isComposing || t.keyCode === 229) return !1;
        let { key: n } = e;
        if (j === 0) return n === `Escape` && s ? (s(), se(e), !0) : !1;
        if (n === `ArrowDown` || (D && e.ctrlKey && n === `n`)) return (oe(1), se(e), !0);
        if (n === `ArrowUp` || (D && e.ctrlKey && n === `p`)) return (oe(-1), se(e), !0);
        if (
          w > 0 &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          /^[1-3]$/.test(n) &&
          Number(n) <= Math.min(w, j)
        )
          return (ne(Number(n) - 1), se(e), !0);
        if (
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey &&
          (n === `Enter` ||
            ((T || S === `chatgpt`) && n === `Tab`) ||
            (S === `chatgpt` && n === ` ` && P != null && p?.(P)))
        ) {
          let t = M >= 0 ? M : y ? 0 : -1;
          return t >= 0 && t < j && (ne(t), se(e), !0);
        }
        return n === `Escape` && s ? (s(), se(e), !0) : !1;
      }),
      (t[39] = y),
      (t[40] = M),
      (t[41] = P),
      (t[42] = r),
      (t[43] = j),
      (t[44] = S),
      (t[45] = oe),
      (t[46] = w),
      (t[47] = s),
      (t[48] = ne),
      (t[49] = p),
      (t[50] = T),
      (t[51] = _),
      (t[52] = ce))
    : (ce = t[52]);
  let le = ce,
    ue,
    de;
  (t[53] !== x || t[54] !== le || t[55] !== r || t[56] !== d
    ? ((ue = () => {
        if (!x || !r) return;
        let e = (e) => {
            le(e);
          },
          t = d ?? window;
        return (
          t.addEventListener(`keydown`, e, !0),
          () => {
            t.removeEventListener(`keydown`, e, !0);
          }
        );
      }),
      (de = [x, le, r, d]),
      (t[53] = x),
      (t[54] = le),
      (t[55] = r),
      (t[56] = d),
      (t[57] = ue),
      (t[58] = de))
    : ((ue = t[57]), (de = t[58])),
    (0, o3.useEffect)(ue, de));
  let fe;
  t[59] === le
    ? (fe = t[60])
    : ((fe = (e) => {
        let t = e === void 0 ? {} : e;
        return {
          onKeyDown: (e) => {
            le(e) || t.onKeyDown?.(e);
          },
        };
      }),
      (t[59] = le),
      (t[60] = fe));
  let pe = fe,
    me;
  t[61] !== b || t[62] !== ie || t[63] !== ne
    ? ((me = (e, t) => {
        let n = t === void 0 ? {} : t;
        return {
          onClick: (t) => {
            (ne(e), n.onClick?.(t));
          },
          onMouseMove: (t) => {
            (ie(e), n.onMouseMove?.(t));
          },
          onMouseLeave: () => {
            b && N(-1);
          },
          "data-list-navigation-item": `true`,
        };
      }),
      (t[61] = b),
      (t[62] = ie),
      (t[63] = ne),
      (t[64] = me))
    : (me = t[64]);
  let he = me,
    ge;
  return (
    t[65] !== pe || t[66] !== he || t[67] !== le || t[68] !== M
      ? ((ge = {
          highlightedIndex: M,
          setHighlightedIndex: N,
          listRef: O,
          handleKeyDown: le,
          getInputProps: pe,
          getItemProps: he,
        }),
        (t[65] = pe),
        (t[66] = he),
        (t[67] = le),
        (t[68] = M),
        (t[69] = ge))
      : (ge = t[69]),
    ge
  );
}
function fps(e) {
  (typeof e.preventDefault == `function` && e.preventDefault(),
    typeof e.stopPropagation == `function` && e.stopPropagation());
}
return dps;
}
