// Original confirmation: clear pending state before executing its captured navigation.
export function createUnsavedSettingsDialog({React,dialog,layout,Button:i,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!dialog?.Dialog||!layout?.DialogBody||!i)throw new TypeError('Unsaved settings requires original modal/layout/button');
const hCreate=React.createElement,_=compilerRuntime,v={jsx:(type,props,key)=>hCreate(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>hCreate(type,key===undefined?props:{...props,key},...props.children)},m=message=>formatMessage(message);
const {Dialog:a,DialogTitle:h,DialogDescription:l}=dialog,{DialogBody:s,DialogSection:d,DialogHeader:t,DialogFooter:f}=layout;
function g(e) {
  let n = (0, _.c)(20),
    { pendingNavigation: r, onClearPendingNavigation: o } = e,
    c = r != null,
    u;
  n[0] === o
    ? (u = n[1])
    : ((u = (e) => {
        e || o();
      }),
      (n[0] = o),
      (n[1] = u));
  let p;
  n[2] !== o || n[3] !== r
    ? ((p = (e) => {
        e.preventDefault();
        let t = r;
        (o(), t?.());
      }),
      (n[2] = o),
      (n[3] = r),
      (n[4] = p))
    : (p = n[4]);
  let g;
  n[5] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((g = (0, v.jsx)(h, {
        children: (0, v.jsx)(m, {
          id: `settings.unsavedChanges.discardTitle`,
          defaultMessage: `Discard changes?`,
          description: `Title for the confirmation dialog shown before leaving Settings with unsaved changes`,
        }),
      })),
      (n[5] = g))
    : (g = n[5]);
  let y;
  n[6] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((y = (0, v.jsx)(d, {
        children: (0, v.jsx)(t, {
          title: g,
          subtitle: (0, v.jsx)(l, {
            children: (0, v.jsx)(m, {
              id: `settings.unsavedChanges.discardDescription`,
              defaultMessage: `You have unsaved changes. If you leave now, your changes will be lost.`,
              description: `Description for the confirmation dialog shown before leaving Settings with unsaved changes`,
            }),
          }),
        }),
      })),
      (n[6] = y))
    : (y = n[6]);
  let b;
  n[7] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = (0, v.jsx)(m, {
        id: `settings.unsavedChanges.keepEditing`,
        defaultMessage: `Keep editing`,
        description: `Button label for returning to Settings instead of discarding unsaved changes`,
      })),
      (n[7] = b))
    : (b = n[7]);
  let x;
  n[8] === o
    ? (x = n[9])
    : ((x = (0, v.jsx)(i, { color: `secondary`, type: `button`, onClick: o, children: b })),
      (n[8] = o),
      (n[9] = x));
  let S;
  n[10] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((S = (0, v.jsx)(i, {
        color: `danger`,
        type: `submit`,
        children: (0, v.jsx)(m, {
          id: `settings.unsavedChanges.discard`,
          defaultMessage: `Discard changes`,
          description: `Button label for discarding unsaved Settings changes`,
        }),
      })),
      (n[10] = S))
    : (S = n[10]);
  let C;
  n[11] === x
    ? (C = n[12])
    : ((C = (0, v.jsx)(d, { children: (0, v.jsxs)(f, { children: [x, S] }) })),
      (n[11] = x),
      (n[12] = C));
  let w;
  n[13] !== p || n[14] !== C
    ? ((w = (0, v.jsxs)(s, { as: `form`, onSubmit: p, children: [y, C] })),
      (n[13] = p),
      (n[14] = C),
      (n[15] = w))
    : (w = n[15]);
  let T;
  return (
    n[16] !== c || n[17] !== w || n[18] !== u
      ? ((T = (0, v.jsx)(a, {
          open: c,
          showDialogClose: !1,
          size: `compact`,
          onOpenChange: u,
          children: w,
        })),
        (n[16] = c),
        (n[17] = w),
        (n[18] = u),
        (n[19] = T))
      : (T = n[19]),
    T
  );
}
return g;
}
