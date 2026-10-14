// Original account replacement dialog; logout/redirect is an explicit caller operation.
export function createAccountReplacementDialog({React,dialog,layout,Button:l,AssetIcon,logoutAndContinue:Ft,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!dialog?.Dialog||!layout?.DialogBody||!l||!AssetIcon?.fromPreset||typeof Ft!=='function'||!compilerRuntime?.c)throw new TypeError('AccountReplacementDialog requires original dialog/layout/button/icons and a promise-returning local operation');
 const h=React.createElement,$={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Z=compilerRuntime,Q=React,H=message=>formatMessage(message);
 const {Dialog:ne,DialogTitle:Oe,DialogDescription:N}=dialog,{DialogBody:T,DialogHeader:n,DialogSection:he,DialogFooter:R}=layout;
 const S=(()=>{const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let G6n;
function K6n() {
  return (K6n = t(() => {
    (Q(),
      (G6n = Z({
        name: `checkmark-md-light-16`,
        canvas: {
          width: 16,
          height: 16,
          viewBox: `0 0 16 16`,
          frame: { x: 0, y: 0, width: 16, height: 16 },
          inkBounds: { x: 3.474655, y: 3.803467, width: 9.046768, height: 8.309814 },
          visualBounds: { x: 3.474655, y: 3.803467, width: 9.046768, height: 8.309814 },
        },
        paint: { kind: `monochrome` },
        optical: {
          shape: `non-circular`,
          bounds: { x: 3.474655, y: 3.803467, width: 9.046768, height: 8.309814 },
          center: { x: 7.998039, y: 7.958374 },
          insets: { top: 3.803467, right: 3.478577, bottom: 3.886719, left: 3.474655 },
          anchors: {
            frame: { x: 8, y: 8 },
            ink: { x: 7.998039, y: 7.958374 },
            foreground: { x: 7.998039, y: 7.958374 },
          },
        },
        capabilities: [`icon`],
        body: `<path d="M11.5624 4.0338C11.7255 3.79403 12.0522 3.73111 12.2919 3.89415C12.5314 4.05717 12.5933 4.38398 12.4306 4.62364L7.539 11.818C7.30083 12.1681 6.80219 12.215 6.50286 11.9156L3.62786 9.03478C3.4231 8.82953 3.42363 8.4964 3.62884 8.29161C3.8341 8.08683 4.16722 8.08733 4.372 8.29259L6.92474 10.8512L11.5624 4.0338Z" fill="currentColor"/>`,
      })));
  }))();
}
 K6n();return AssetIcon.fromPreset(G6n);})();
function Nt(e) {
  let t = (0, Z.c)(50),
    {
      accounts: r,
      currentSessionToken: i,
      onClose: a,
      onSessionsChanged: o,
      returnHref: s,
      screenHint: c,
    } = e,
    [u, d] = (0, Q.useState)(r[0]?.sessionToken ?? null),
    [f, p] = (0, Q.useState)(!1),
    [ee, m] = (0, Q.useState)(!1),
    te;
  if (t[0] !== r || t[1] !== u) {
    let e;
    (t[3] === u ? (e = t[4]) : ((e = (e) => e.sessionToken === u), (t[3] = u), (t[4] = e)),
      (te = r.find(e)),
      (t[0] = r),
      (t[1] = u),
      (t[2] = te));
  } else te = t[2];
  let h = te,
    g;
  t[5] !== i || t[6] !== f || t[7] !== o || t[8] !== s || t[9] !== c || t[10] !== h
    ? ((g = () =>
        h == null || f
          ? Promise.resolve()
          : (p(!0),
            m(!1),
            Ft({ currentSessionToken: i, session: h, returnHref: s, screenHint: c }).catch(() => {
              (o(), m(!0), p(!1));
            }))),
      (t[5] = i),
      (t[6] = f),
      (t[7] = o),
      (t[8] = s),
      (t[9] = c),
      (t[10] = h),
      (t[11] = g))
    : (g = t[11]);
  let _ = g,
    v;
  t[12] !== f || t[13] !== a
    ? ((v = (e) => {
        !e && !f && a();
      }),
      (t[12] = f),
      (t[13] = a),
      (t[14] = v))
    : (v = t[14]);
  let y;
  t[15] === _
    ? (y = t[16])
    : ((y = (e) => {
        (e.preventDefault(), _());
      }),
      (t[15] = _),
      (t[16] = y));
  let b;
  t[17] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((b = (0, $.jsx)(Oe, {
        asChild: !0,
        children: (0, $.jsx)(`span`, {
          children: (0, $.jsx)(H, {
            id: `codex.profileDropdown.accountSwitcherLogout.title`,
            defaultMessage: `Choose an account to log out`,
            description: `Title of the dialog shown when adding a third saved ChatGPT account`,
          }),
        }),
      })),
      (t[17] = b))
    : (b = t[17]);
  let x;
  t[18] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((x = (0, $.jsx)(he, {
        children: (0, $.jsx)(n, {
          title: b,
          subtitle: (0, $.jsx)(N, {
            children: (0, $.jsx)(H, {
              id: `codex.profileDropdown.accountSwitcherLogout.description`,
              defaultMessage: `You’re already logged in to two accounts. Log out of one to add a new account.`,
              description: `Description of the dialog shown when adding a third saved ChatGPT account`,
            }),
          }),
        }),
      })),
      (t[18] = x))
    : (x = t[18]);
  let C;
  if (t[19] !== r || t[20] !== f || t[21] !== u) {
    let e;
    (t[23] !== f || t[24] !== u
      ? ((e = (e) => {
          let t = e.sessionToken === u;
          return (0, $.jsxs)(
            l,
            {
              className: `w-full`,
              type: `button`,
              color: t ? `secondary` : `ghostActive`,
              size: `dialog`,
              "aria-pressed": t,
              disabled: f,
              onClick: () => {
                d(e.sessionToken);
              },
              children: [
                (0, $.jsx)(S, { className: t ? void 0 : `invisible` }),
                (0, $.jsx)(`span`, {
                  className: `min-w-0 truncate`,
                  children:
                    on(e) ??
                    (0, $.jsx)(H, {
                      id: `codex.profileDropdown.unnamedAccount`,
                      defaultMessage: `Account`,
                      description: `Fallback label for a saved ChatGPT account without an email address or display name`,
                    }),
                }),
              ],
            },
            $t(e),
          );
        }),
        (t[23] = f),
        (t[24] = u),
        (t[25] = e))
      : (e = t[25]),
      (C = r.map(e)),
      (t[19] = r),
      (t[20] = f),
      (t[21] = u),
      (t[22] = C));
  } else C = t[22];
  let w;
  t[26] === C
    ? (w = t[27])
    : ((w = (0, $.jsx)(`div`, { className: `flex flex-col gap-1`, children: C })),
      (t[26] = C),
      (t[27] = w));
  let E;
  t[28] === ee
    ? (E = t[29])
    : ((E = ee
        ? (0, $.jsx)(`p`, {
            role: `alert`,
            className: `mt-3 text-sm text-danger`,
            children: (0, $.jsx)(H, {
              id: `codex.profileDropdown.accountSwitcherLogout.failed`,
              defaultMessage: `Couldn’t log out this account. Try again`,
              description: `Error shown when the selected saved account cannot be logged out before adding another account`,
            }),
          })
        : null),
      (t[28] = ee),
      (t[29] = E));
  let D;
  t[30] !== w || t[31] !== E
    ? ((D = (0, $.jsxs)(he, { children: [w, E] })), (t[30] = w), (t[31] = E), (t[32] = D))
    : (D = t[32]);
  let O;
  t[33] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((O = (0, $.jsx)(H, {
        id: `codex.profileDropdown.accountSwitcherLogout.cancel`,
        defaultMessage: `Cancel`,
        description: `Button that closes the add-account replacement dialog`,
      })),
      (t[33] = O))
    : (O = t[33]);
  let k;
  t[34] !== f || t[35] !== a
    ? ((k = (0, $.jsx)(l, {
        color: `ghost`,
        type: `button`,
        disabled: f,
        onClick: a,
        children: O,
      })),
      (t[34] = f),
      (t[35] = a),
      (t[36] = k))
    : (k = t[36]);
  let re = f || h == null,
    A;
  t[37] === Symbol.for(`react.memo_cache_sentinel`)
    ? ((A = (0, $.jsx)(H, {
        id: `codex.profileDropdown.accountSwitcherLogout.confirm`,
        defaultMessage: `Log out and continue`,
        description: `Button that logs out the selected saved account before adding another account`,
      })),
      (t[37] = A))
    : (A = t[37]);
  let j;
  t[38] === re
    ? (j = t[39])
    : ((j = (0, $.jsx)(l, { color: `danger`, type: `submit`, disabled: re, children: A })),
      (t[38] = re),
      (t[39] = j));
  let M;
  t[40] !== k || t[41] !== j
    ? ((M = (0, $.jsx)(he, { children: (0, $.jsxs)(R, { children: [k, j] }) })),
      (t[40] = k),
      (t[41] = j),
      (t[42] = M))
    : (M = t[42]);
  let P;
  t[43] !== D || t[44] !== M || t[45] !== y
    ? ((P = (0, $.jsxs)(T, { as: `form`, onSubmit: y, children: [x, D, M] })),
      (t[43] = D),
      (t[44] = M),
      (t[45] = y),
      (t[46] = P))
    : (P = t[46]);
  let ie;
  return (
    t[47] !== P || t[48] !== v
      ? ((ie = (0, $.jsx)(ne, { open: !0, onOpenChange: v, size: `narrow`, children: P })),
        (t[47] = P),
        (t[48] = v),
        (t[49] = ie))
      : (ie = t[49]),
    ie
  );
}
function on(e) {
  if (e.email != null) return e.email;
  let t = sn(e.phoneNumber);
  return t == null ? e.name : e.name == null ? t : e.name + ` (` + t + `)`;
}
function sn(e) {
  if (e == null) return null;
  let t = e.replace(/\D/g, ``);
  return t.length === 0 ? null : `***` + t.slice(-4).padStart(4, `*`);
}
function $t(e) {
  return e.userId == null
    ? e.email == null
      ? `token:${e.sessionToken}`
      : `email:${e.email}`
    : `user:${e.userId}`;
}
 return {AccountReplacementDialog:Nt,accountDisplayName:on,maskedPhone:sn,accountIdentityKey:$t};
}
