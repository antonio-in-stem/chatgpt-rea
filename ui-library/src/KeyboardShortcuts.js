// Original dialog content with caller-supplied active command descriptors.
import {shortcutMatchScore as z} from './ShortcutMatching.js';
export function createKeyboardShortcuts({React,dialog,layout,SettingsGroup:W,SettingsValueRow:C,ShortcutBadge:k,ShortcutSearchInput:Se,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!dialog?.Dialog||!layout?.DialogFormRow||!W?.Header||!C||!k||!Se)throw new TypeError('Keyboard shortcuts requires original dialog, settings, badge and search components');
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const Y=compilerRuntime,X=React,Z=runtime,j=message=>formatMessage(message),{DialogBody:m,DialogHeader:n,DialogSection:T,DialogFormRow:d}=layout,{DialogTitle:N}=dialog;
const K=['thread','navigation','panels','workspace','skills','configure','app','general'];
function Oe(e, t) {
  let n = t.trim(),
    r = e.filter(
      (e) =>
        e.id !== `personalitySettings` &&
        (n.length === 0 || [e.id, e.title, e.description].some((e) => z(e, n) > 0)),
    );
  return K.flatMap((e) => {
    let t = r.filter((t) => t.sectionKey === e);
    return t.length === 0 ? [] : [{ key: e, items: t }];
  });
}
function Pe(e) {
  let t = (0, Y.c)(26),
    { items: r } = e,
    [i, a] = (0, X.useState)(``),
    o,
    s,
    c,
    l,
    u,
    d,
    f,
    p,
    h;
  if (t[0] !== r || t[1] !== i) {
    let e = r == null ? null : Oe(r, i);
    ((s = m),
      (f = `tall`),
      t[11] === Symbol.for(`react.memo_cache_sentinel`)
        ? ((p = (0, Z.jsx)(n, {
            title: (0, Z.jsx)(N, {
              children: (0, Z.jsx)(j, {
                id: `keyboardShortcutsDialog.title`,
                defaultMessage: `Keyboard shortcuts`,
                description: `Title for the active keyboard shortcuts dialog`,
              }),
            }),
          })),
          (t[11] = p))
        : (p = t[11]),
      (h =
        r == null
          ? null
          : (0, Z.jsx)(T, {
              className: `pb-3`,
              children: (0, Z.jsx)(Se, { autoFocus: !0, value: i, onValueChange: a }),
            })),
      (o = T),
      (c = `min-h-0 flex-1 overflow-y-auto pe-3 pt-0!`),
      t[12] === r
        ? (l = t[13])
        : ((l =
            r == null
              ? (0, Z.jsx)(`div`, {
                  className: `py-1 text-sm text-secondary`,
                  children: (0, Z.jsx)(j, {
                    id: `keyboardShortcutsDialog.loading`,
                    defaultMessage: `Loading shortcuts…`,
                    description: `Loading label while active keyboard shortcuts are being fetched`,
                  }),
                })
              : null),
          (t[12] = r),
          (t[13] = l)),
      (u =
        e?.length === 0
          ? (0, Z.jsx)(`div`, {
              className: `py-1 text-sm text-secondary`,
              children:
                i.trim().length === 0
                  ? (0, Z.jsx)(j, {
                      id: `keyboardShortcutsDialog.empty`,
                      defaultMessage: `No active shortcuts`,
                      description: `Empty state shown when no active shortcuts are available`,
                    })
                  : (0, Z.jsx)(j, {
                      id: `keyboardShortcutsDialog.noMatches`,
                      defaultMessage: `No matching shortcuts`,
                      description: `Empty state shown when active shortcut search has no matches`,
                    }),
            })
          : null),
      (d = e?.map(Fe)),
      (t[0] = r),
      (t[1] = i),
      (t[2] = o),
      (t[3] = s),
      (t[4] = c),
      (t[5] = l),
      (t[6] = u),
      (t[7] = d),
      (t[8] = f),
      (t[9] = p),
      (t[10] = h));
  } else
    ((o = t[2]),
      (s = t[3]),
      (c = t[4]),
      (l = t[5]),
      (u = t[6]),
      (d = t[7]),
      (f = t[8]),
      (p = t[9]),
      (h = t[10]));
  let g;
  t[14] !== o || t[15] !== c || t[16] !== l || t[17] !== u || t[18] !== d
    ? ((g = (0, Z.jsxs)(o, { className: c, children: [l, u, d] })),
      (t[14] = o),
      (t[15] = c),
      (t[16] = l),
      (t[17] = u),
      (t[18] = d),
      (t[19] = g))
    : (g = t[19]);
  let _;
  return (
    t[20] !== s || t[21] !== f || t[22] !== p || t[23] !== h || t[24] !== g
      ? ((_ = (0, Z.jsxs)(s, { size: f, children: [p, h, g] })),
        (t[20] = s),
        (t[21] = f),
        (t[22] = p),
        (t[23] = h),
        (t[24] = g),
        (t[25] = _))
      : (_ = t[25]),
    _
  );
}
function Fe(e) {
  return (0, Z.jsxs)(
    W,
    {
      children: [
        (0, Z.jsx)(W.Header, { title: (0, Z.jsx)(Le, { sectionKey: e.key }) }),
        (0, Z.jsx)(W.Content, { children: e.items.map(J) }),
      ],
    },
    e.key,
  );
}
function J(e) {
  return (0, Z.jsx)(
    C,
    {
      compactLabelInset: !1,
      label: e.title,
      variant: `compact`,
      children: (0, Z.jsx)(d, { children: e.shortcutLabels.map(Ie) }),
    },
    e.id,
  );
}
function Ie(e) {
  return (0, Z.jsx)(k, { keysLabel: e }, e);
}
function Le(e) {
  let t = (0, Y.c)(8),
    { sectionKey: n } = e;
  switch (n) {
    case `thread`: {
      let e;
      return (
        t[0] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, Z.jsx)(j, {
              id: `keyboardShortcutsDialog.section.thread`,
              defaultMessage: `Chat`,
              description: `Section title for active task keyboard shortcuts`,
            })),
            (t[0] = e))
          : (e = t[0]),
        e
      );
    }
    case `navigation`: {
      let e;
      return (
        t[1] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, Z.jsx)(j, {
              id: `keyboardShortcutsDialog.section.navigation`,
              defaultMessage: `Navigation`,
              description: `Section title for active navigation keyboard shortcuts`,
            })),
            (t[1] = e))
          : (e = t[1]),
        e
      );
    }
    case `panels`: {
      let e;
      return (
        t[2] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, Z.jsx)(j, {
              id: `keyboardShortcutsDialog.section.panels`,
              defaultMessage: `Panels`,
              description: `Section title for active panel keyboard shortcuts`,
            })),
            (t[2] = e))
          : (e = t[2]),
        e
      );
    }
    case `workspace`: {
      let e;
      return (
        t[3] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, Z.jsx)(j, {
              id: `keyboardShortcutsDialog.section.workspace`,
              defaultMessage: `Project`,
              description: `Section title for active project keyboard shortcuts`,
            })),
            (t[3] = e))
          : (e = t[3]),
        e
      );
    }
    case `skills`: {
      let e;
      return (
        t[4] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, Z.jsx)(j, {
              id: `keyboardShortcutsDialog.section.skills`,
              defaultMessage: `Skills`,
              description: `Section title for active skill keyboard shortcuts`,
            })),
            (t[4] = e))
          : (e = t[4]),
        e
      );
    }
    case `configure`: {
      let e;
      return (
        t[5] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, Z.jsx)(j, {
              id: `keyboardShortcutsDialog.section.configure`,
              defaultMessage: `Configure`,
              description: `Section title for active configuration keyboard shortcuts`,
            })),
            (t[5] = e))
          : (e = t[5]),
        e
      );
    }
    case `app`: {
      let e;
      return (
        t[6] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, Z.jsx)(j, {
              id: `keyboardShortcutsDialog.section.app`,
              defaultMessage: `App`,
              description: `Section title for active app keyboard shortcuts`,
            })),
            (t[6] = e))
          : (e = t[6]),
        e
      );
    }
    case `general`: {
      let e;
      return (
        t[7] === Symbol.for(`react.memo_cache_sentinel`)
          ? ((e = (0, Z.jsx)(j, {
              id: `keyboardShortcutsDialog.section.general`,
              defaultMessage: `General`,
              description: `Section title for general active keyboard shortcuts`,
            })),
            (t[7] = e))
          : (e = t[7]),
        e
      );
    }
  }
}
// Host capability/keymap controller je is deliberately replaced by this data boundary.
function KeyboardShortcutsDialog({items,onOpenChange}){return h(dialog.Dialog,{open:true,onOpenChange,size:'wide'},h(Pe,{items}));}
return {KeyboardShortcutsDialog,KeyboardShortcutsContent:Pe,KeyboardShortcutSectionTitle:Le,groupKeyboardShortcuts:Oe};
}
