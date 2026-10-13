import { n as e } from "./rolldown-runtime-2d059c5e81f4.js";
import {
  Agn as t,
  BO as n,
  Ck as r,
  NCn as i,
  TE as a,
  Tk as o,
  VO as s,
  nfn as c,
  sfn as l,
  vgn as u,
  wE as d,
  ygn as f,
} from "./app-shared-737655e1fb23.js";
import { Nf as p, Pf as m } from "./app-initial-b8e1c8014bb4.js";
import { gd as h, hd as g } from "./app-primary-19fe57fd8c00.js";
import {
  o as _,
  t as v,
} from "./automatic-approval-review-details-fb8cc584bff0.js";
function y(e) {
  let t = (0, x.c)(17),
    {
      collapsedMessageCount: n,
      workedDurationMs: r,
      workedForItem: i,
      className: a,
    } = e;
  if (i != null) {
    let e;
    return (
      t[0] !== a ||
      t[1] !== i.completedAtMs ||
      t[2] !== i.startedAtMs ||
      t[3] !== i.status
        ? ((e = (0, S.jsx)(g, {
            className: a,
            status: i.status,
            startedAtMs: i.startedAtMs,
            completedAtMs: i.completedAtMs,
          })),
          (t[0] = a),
          (t[1] = i.completedAtMs),
          (t[2] = i.startedAtMs),
          (t[3] = i.status),
          (t[4] = e))
        : (e = t[4]),
      e
    );
  }
  if (r != null) {
    let e = a ?? `text-tertiary`,
      n;
    t[5] === r ? (n = t[6]) : ((n = p(r)), (t[5] = r), (t[6] = n));
    let i;
    t[7] === n
      ? (i = t[8])
      : ((i = (0, S.jsx)(l, {
          id: `localConversation.workedFor`,
          defaultMessage: `Worked for {time}`,
          description: `Divider shown between agent activity and the final assistant response in a completed turn`,
          values: { time: n },
        })),
        (t[7] = n),
        (t[8] = i));
    let o;
    return (
      t[9] !== e || t[10] !== i
        ? ((o = (0, S.jsx)(`span`, { className: e, children: i })),
          (t[9] = e),
          (t[10] = i),
          (t[11] = o))
        : (o = t[11]),
      o
    );
  }
  let o = a ?? `text-tertiary`,
    s;
  t[12] === n
    ? (s = t[13])
    : ((s = (0, S.jsx)(l, {
        id: `localConversation.previousMessagesSummary`,
        defaultMessage: `{count, plural, one {# previous message} other {# previous messages}}`,
        description: `Summary shown in collapsed turns when no worked-for duration is available`,
        values: { count: n },
      })),
      (t[12] = n),
      (t[13] = s));
  let c;
  return (
    t[14] !== o || t[15] !== s
      ? ((c = (0, S.jsx)(`span`, { className: o, children: s })),
        (t[14] = o),
        (t[15] = s),
        (t[16] = c))
      : (c = t[16]),
    c
  );
}
function b(e) {
  let t = (0, x.c)(29),
    {
      label: i,
      collapsedMessageCount: a,
      deniedActionCount: o,
      workedDurationMs: s,
      workedForItem: c,
      isCollapsed: f,
      onFocus: p,
      onBlur: m,
      onPointerEnter: h,
      onPointerLeave: g,
      onToggle: _,
    } = e,
    b = o === void 0 ? 0 : o,
    C = b > 0 && `w-full`,
    w;
  t[0] === C
    ? (w = t[1])
    : ((w = u(`inline-flex max-w-full flex-wrap text-size-chat`, C)),
      (t[0] = C),
      (t[1] = w));
  let T = !f,
    E;
  t[2] !== a || t[3] !== i || t[4] !== s || t[5] !== c
    ? ((E =
        i ??
        (0, S.jsx)(y, {
          className: `text-inherit`,
          collapsedMessageCount: a,
          workedDurationMs: s,
          workedForItem: c,
        })),
      (t[2] = a),
      (t[3] = i),
      (t[4] = s),
      (t[5] = c),
      (t[6] = E))
    : (E = t[6]);
  let D;
  t[7] === E
    ? (D = t[8])
    : ((D = (0, S.jsx)(`span`, { children: E })), (t[7] = E), (t[8] = D));
  let O = f ? `rotate-0` : `rotate-90`,
    k;
  t[9] === O
    ? (k = t[10])
    : ((k = u(`icon-2xs transition-transform duration-basic`, O)),
      (t[9] = O),
      (t[10] = k));
  let A;
  t[11] === k
    ? (A = t[12])
    : ((A = (0, S.jsx)(d, { className: k })), (t[11] = k), (t[12] = A));
  let j;
  t[13] === b
    ? (j = t[14])
    : ((j =
        b > 0
          ? (0, S.jsx)(n, {
              closeOnTriggerClick: !0,
              tooltipContent: (0, S.jsx)(l, {
                id: `localConversation.deniedActionsTooltip`,
                defaultMessage: `{count, plural, one {Auto-review denied # action. View the action and why it was denied.} other {Auto-review denied # actions. View the actions and why they were denied.}}`,
                description: `Tooltip for the denied-action count beside Worked for. Clicking this part of the disclosure opens or closes the turn's activity, where denial details can be viewed.`,
                values: { count: b },
              }),
              children: (0, S.jsxs)(`span`, {
                className: `ms-auto inline-flex items-center gap-1 text-secondary`,
                "data-denied-action-count": !0,
                children: [
                  (0, S.jsx)(v, {}),
                  (0, S.jsx)(l, {
                    id: `localConversation.deniedActionsCount`,
                    defaultMessage: `{count, plural, one {# denied action} other {# denied actions}}`,
                    description: `Historical number of actions denied by auto-review in this turn, shown beside Worked for. Approving a retry does not remove a past denial from this count.`,
                    values: { count: b },
                  }),
                ],
              }),
            })
          : null),
      (t[13] = b),
      (t[14] = j));
  let M;
  t[15] !== m ||
  t[16] !== p ||
  t[17] !== h ||
  t[18] !== g ||
  t[19] !== _ ||
  t[20] !== j ||
  t[21] !== w ||
  t[22] !== T ||
  t[23] !== D ||
  t[24] !== A
    ? ((M = (0, S.jsx)(`div`, {
        className: `text-size-chat text-secondary`,
        children: (0, S.jsxs)(r, {
          className: w,
          color: `ghostTertiary`,
          radius: `small`,
          size: `inline`,
          "aria-expanded": T,
          onFocus: p,
          onBlur: m,
          onPointerEnter: h,
          onPointerLeave: g,
          onClick: _,
          children: [D, A, j],
        }),
      })),
      (t[15] = m),
      (t[16] = p),
      (t[17] = h),
      (t[18] = g),
      (t[19] = _),
      (t[20] = j),
      (t[21] = w),
      (t[22] = T),
      (t[23] = D),
      (t[24] = A),
      (t[25] = M))
    : (M = t[25]);
  let N;
  t[26] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((N = (0, S.jsx)(`div`, {
        className: `pt-1 text-size-chat text-secondary`,
        children: (0, S.jsx)(`div`, {
          className: `w-full border-t border-default`,
        }),
      })),
      (t[26] = N))
    : (N = t[26]);
  let P;
  return (
    t[27] === M
      ? (P = t[28])
      : ((P = (0, S.jsxs)(S.Fragment, { children: [M, N] })),
        (t[27] = M),
        (t[28] = P)),
    P
  );
}
var x, S;
function C() {
  return (C = e(() => {
    ((x = i()), f(), c(), o(), s(), a(), _(), m(), h(), (S = t()));
  }))();
}
export { C as n, b as t };
//# sourceMappingURL=collapsed-turn-disclosure-6c80f2bfc0d8.js.map
