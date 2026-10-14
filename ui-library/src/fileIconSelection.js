// Original provider/file icon resolution. Artwork rendering is separate.
import {describeFile as pwi,fileExtension as B5,fileMimeOverride as fwi} from './fileDescriptor.js';
const t=fn=>fn,qwi=()=>{};
let GEi,XEi,ZEi;
function MTi(e) {
  return e === `sharepoint` || e === `onedrive`;
}
function NTi(e) {
  return encodeURIComponent(e).replace(
    /[!'()*]/gu,
    (e) => `%` + e.charCodeAt(0).toString(16).toUpperCase(),
  );
}
function PTi(e, t) {
  if (e.length === 0 || e.length > yEi) return !1;
  try {
    let n = decodeURIComponent(e);
    return (
      n.length > 0 &&
      (t ? !/^\p{White_Space}|\p{White_Space}$/u.test(n) : n === n.trim()) &&
      !/[\u0000-\u001F\u007F]/u.test(n) &&
      new TextEncoder().encode(n).length <= 512 &&
      NTi(n) === e
    );
  } catch {
    return !1;
  }
}
function FTi(e) {
  if (e != null)
    try {
      return PTi(NTi(e), !0) ? e : void 0;
    } catch {
      return;
    }
}
function ITi(e, t) {
  return t == null ? !0 : e === `gdrive` ? cEi.test(t) : PTi(t, bEi.has(e));
}
function W5(e) {
  if (e == null) return null;
  let t = iEi.exec(e);
  return t == null ||
    t[1] == null ||
    !ITi(t[1], t[2]) ||
    (t[2] != null && t[1] !== `gdrive` && !bEi.has(t[1]) && t[3] !== `file`) ||
    (t[2] != null &&
      bEi.has(t[1]) &&
      (e.length > SEi ||
        new TextEncoder().encode(e).length > SEi ||
        (t[3] === `file` &&
          t[4] != null &&
          (new TextEncoder().encode(t[4]).length > xEi ||
            Array.from(t[4]).some((e) => {
              let t = e.codePointAt(0) ?? 0;
              return t < 32 || t === 127;
            })))))
    ? null
    : { providerSlug: t[1], encodedAccountKey: t[2], kind: t[3] ?? `root`, nativeId: t[4] };
}
function LTi(e) {
  if (e == null) return null;
  if (e.startsWith(aEi)) {
    let t = e.slice(21);
    return G5.test(t) ? { driveFileId: t } : null;
  }
  if (!e.startsWith(oEi)) return null;
  let t = e.slice(24),
    n = t.indexOf(sEi);
  if (n <= 0) return null;
  let r = t.slice(0, n),
    i = t.slice(n + 6);
  return !/^[A-Za-z0-9_-]+$/u.test(r) || !G5.test(i)
    ? null
    : { driveFileId: i, externalAccountKey: r };
}
function RTi(e) {
  if (!fEi.test(e)) return !1;
  try {
    let t = e.replaceAll(`-`, `+`).replaceAll(`_`, `/`),
      n = atob(t + `=`.repeat((4 - (t.length % 4)) % 4));
    return (
      pEi.test(n) && btoa(n).replaceAll(`+`, `-`).replaceAll(`/`, `_`).replace(/=+$/, ``) === e
    );
  } catch {
    return !1;
  }
}
function zTi(e) {
  if (!mEi.test(e)) return !1;
  try {
    let t = e.replaceAll(`-`, `+`).replaceAll(`_`, `/`),
      n = atob(t + `=`.repeat((4 - (t.length % 4)) % 4)),
      [r, i, a, ...o] = n.split(`,`);
    return (
      r != null &&
      r.length <= 253 &&
      r.split(`.`).every((e) => hEi.test(e)) &&
      i != null &&
      gEi.test(i) &&
      a != null &&
      gEi.test(a) &&
      o.length === 0 &&
      btoa(n).replaceAll(`+`, `-`).replaceAll(`/`, `_`).replace(/=+$/, ``) === e
    );
  } catch {
    return !1;
  }
}
function BTi(e) {
  switch (e) {
    case `box`:
    case `dropbox`:
    case `google_drive`:
    case `sharepoint`:
    case `onedrive`:
      return e;
    default:
      return null;
  }
}
function VTi({ libraryProvider: e, mountedLibraryFileId: t }) {
  let n = t?.startsWith(`file-library:`) ? t.slice(13) : t;
  if (n?.startsWith(`external-`)) {
    let t = UTi(n);
    if (MTi(t)) return YTi(n) && (e == null || e === t) ? t : null;
    let r = WTi(n),
      i = r == null ? null : CEi[r];
    return e == null || e === i ? i : null;
  }
  return BTi(e);
}
function HTi(e, t) {
  let n = W5(e);
  return n == null
    ? !1
    : n.encodedAccountKey != null && n.kind === `root`
      ? t === `folder`
      : n.kind === t;
}
function UTi(e) {
  return e == null
    ? null
    : LTi(e)?.externalAccountKey == null
      ? (W5(e)?.providerSlug ?? null)
      : `gdrive`;
}
function WTi(e) {
  if (e == null) return null;
  let t = LTi(e);
  if (t?.externalAccountKey != null)
    return t.driveFileId.length <= _Ei && G5.test(t.driveFileId) ? `gdrive` : null;
  let n = W5(e),
    r = n?.nativeId;
  if (n == null || n.kind !== `file` || r == null || r.length > _Ei) return null;
  switch (n.providerSlug) {
    case `gdrive`:
      return G5.test(r) ? `gdrive` : null;
    case `box`:
      return lEi.test(r) ? `box` : null;
    case `dropbox`:
      return r.length <= vEi && uEi.test(r) ? `dropbox` : null;
    default:
      return null;
  }
}
function GTi(e) {
  return HTi(e, `root`);
}
function KTi(e) {
  let t = W5(e);
  return t?.kind === `root` && t.encodedAccountKey != null;
}
function qTi(e) {
  return HTi(e, `file`) || LTi(e)?.externalAccountKey != null;
}
function JTi(e) {
  let t = W5(e),
    n = t?.nativeId;
  if (t?.providerSlug !== `sharepoint` || t.kind !== `file` || n == null || !n.startsWith(dEi))
    return !1;
  let r = n.slice(8).split(`:`);
  return r.length === 2 && r.every(RTi);
}
function YTi(e) {
  return e?.startsWith(`external-onedrive:file:v3:`) ? nEi(e, `file`) != null : JTi(e);
}
function XTi(...e) {
  let t;
  for (let n of e) {
    let e = n?.startsWith(`file-library:`) ? n.slice(13) : n;
    if (e?.startsWith(`external-`)) {
      if (!qTi(e) || (t != null && t !== e)) return;
      t = e;
    }
  }
  return t;
}
function ZTi(e) {
  return HTi(e, `folder`);
}
function QTi(e) {
  return HTi(e, `collection`);
}
function $Ti(e) {
  return GTi(e) || ZTi(e) || QTi(e);
}
function eEi(e) {
  let t = W5(e)?.encodedAccountKey;
  return t == null ? null : decodeURIComponent(t);
}
function tEi(e) {
  let t = W5(e);
  if (t?.providerSlug === `sharepoint` && t.encodedAccountKey != null)
    return tEi(`external-sharepoint:${t.kind}${t.nativeId == null ? `` : `:${t.nativeId}`}`);
  let n = UTi(e);
  if (!MTi(n)) return !1;
  if (e === `external-${n}:root`) return !0;
  if (e.startsWith(`external-onedrive:folder:v3:`)) return nEi(e, `folder`) != null;
  if (n !== `sharepoint` || !$Ti(e)) return !1;
  let [r, i, a, o, ...s] = e.split(`:`),
    c = a === `v2` || o === `site`,
    l =
      a === `v1` && o === `site`
        ? 0
        : (a === `v1` || a === `v2`) && o === `drive`
          ? 1
          : (a === `v1` || a === `v2`) && o === `item`
            ? 2
            : -1;
  return r !== `external-${n}` ||
    i !== `folder` ||
    l < 0 ||
    s.length !== l + Number(c) ||
    (c && !zTi(s[0] ?? ``))
    ? !1
    : (c ? s.slice(1) : s).every(RTi);
}
function nEi(e, t) {
  if (e.length > 2100) return null;
  let [n, r, i, a, ...o] = e.split(`:`);
  if (
    n !== `external-onedrive` ||
    r !== t ||
    i !== `v3` ||
    (a !== `personal` && a !== `business`) ||
    (o.length !== 3 && (t !== `folder` || o.length !== 2)) ||
    !o.every(RTi)
  )
    return null;
  let [s, c, l] = o.map((e) =>
    atob(e.replaceAll(`-`, `+`).replaceAll(`_`, `/`) + `=`.repeat((4 - (e.length % 4)) % 4)),
  );
  return s == null || c == null
    ? null
    : { driveType: a, externalAccountKey: s, driveId: c, ...(l == null ? {} : { itemId: l }) };
}
function rEi(e) {
  let t = W5(e);
  if (t?.providerSlug !== `sharepoint` || !tEi(e)) return !1;
  let n = t.nativeId?.split(`:`)[1];
  return n === `drive` || n === `item`;
}
var iEi,
  aEi,
  oEi,
  sEi,
  cEi,
  G5,
  lEi,
  uEi,
  dEi,
  fEi,
  pEi,
  mEi,
  hEi,
  gEi,
  _Ei,
  vEi,
  yEi,
  bEi,
  xEi,
  SEi,
  CEi;
function wEi() {
  return (wEi = t(() => {
    ((iEi =
      /^external-([a-z0-9][a-z0-9-]*):(?:account:((?:[A-Za-z0-9._~-]|%[0-9A-F]{2})+):)?(?:(file|folder|collection):(\S+)|root)$/),
      (aEi = `external-gdrive:file:`),
      (oEi = `external-gdrive:account:`),
      (sEi = `:file:`),
      (cEi = /^[A-Za-z0-9_-]+$/u),
      (G5 = /^[A-Za-z0-9_-]{5,512}$/u),
      (lEi = /^[1-9][0-9]*$/u),
      (uEi = /^id:[A-Za-z0-9_:-]+$/u),
      (dEi = `v1:item:`),
      (fEi = /^[A-Za-z0-9_-]{1,683}$/),
      (pEi = /^[A-Za-z0-9._!~:-]{1,512}$/),
      (mEi = /^[A-Za-z0-9_-]{1,436}$/),
      (hEi = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/),
      (gEi = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/),
      (_Ei = 512),
      (vEi = 256),
      (yEi = 1536),
      (bEi = new Set([`box`, `dropbox`, `sharepoint`])),
      (xEi = 2048),
      (SEi = 4096),
      (CEi = { box: `box`, dropbox: `dropbox`, gdrive: `google_drive` }));
  }))();
}
function UEi(e) {
  if (e !== e.trim() || e.includes(`\\`) || /\s/u.test(e)) return null;
  let t;
  try {
    t = new URL(e);
  } catch {
    return null;
  }
  if (
    t.protocol !== `https:` ||
    !GEi.has(t.hostname) ||
    t.username !== `` ||
    t.password !== `` ||
    t.port !== ``
  )
    return null;
  let n = WEi(t);
  return n == null ? null : { resourceKind: n, url: t };
}
function WEi(e) {
  return e.hostname === `docs.google.com`
    ? e.pathname.startsWith(`/document/`)
      ? `document`
      : e.pathname.startsWith(`/spreadsheets/`)
        ? `spreadsheet`
        : e.pathname.startsWith(`/presentation/`)
          ? `presentation`
          : null
    : e.hostname === `sheets.google.com`
      ? `spreadsheet`
      : e.hostname === `slides.google.com`
        ? `presentation`
        : e.hostname === `drive.google.com`
          ? `drive`
          : null;
}
function KEi() {
  return (KEi = t(() => {
    GEi = new Set([
      `docs.google.com`,
      `drive.google.com`,
      `sheets.google.com`,
      `slides.google.com`,
    ]);
  }))();
}
function qEi({
  fileExtension: e,
  fileName: t,
  mimeType: n,
  sourceMimeType: r,
  sourceUrl: i,
  ...a
}) {
  let o = JEi(t, e),
    s = VTi(a);
  if (s === `google_drive` && !r && !fwi(n) && i) {
    let e = UEi(i),
      t = e && ZEi[e.resourceKind];
    if (t) return { kind: `document`, provider: s, iconKey: t };
  }
  let c = r ? YEi({ mimeType: r }) : void 0,
    l = c != null && c.iconKey !== `file`,
    u = B5(o),
    d = s === `box` && !l && u != null ? XEi[u] : void 0,
    f = d == null ? void 0 : (fwi(n) ?? YEi({ fileName: o, mimeType: d })),
    p = r?.split(`;`)[0]?.trim().toLowerCase(),
    m = n?.split(`;`)[0]?.trim().toLowerCase(),
    h =
      l && (p !== `text/plain` || (m && m !== p))
        ? c
        : (f ?? YEi({ fileName: o, mimeType: r || n }));
  return s != null && h.iconKey === `file`
    ? { kind: `brand`, provider: s, brand: s }
    : { kind: `document`, provider: s, iconKey: h.iconKey };
}
function YEi(e) {
  let t = fwi(e.mimeType);
  if (t) return t;
  let n = B5(e.fileName),
    r = (e.mimeType ?? ``).toLowerCase();
  if (n === `fig` || r.includes(`figma`))
    return {
      key: `fig`,
      label: `FIG`,
      iconKey: `figma-document`,
      category: `file`,
      isImageLike: !1,
    };
  let i = pwi(e);
  return (r.includes(`officedocument`) || r.includes(`ms-office`)) &&
    i.category !== `document` &&
    i.category !== `presentation` &&
    i.category !== `spreadsheet`
    ? {
        ...i,
        key: n ?? `office`,
        label: n?.toUpperCase() ?? `OFFICE`,
        iconKey: `ms-office-document`,
      }
    : i;
}
function JEi(e, t) {
  let n = t?.trim().replace(/^\.+/u, ``);
  if (!n) return e;
  let r = e || `file`;
  return B5(r) === n.toLowerCase() ? r : `${r}.${n}`;
}
function QEi() {
  return (QEi = t(() => {
    (qwi(),
      KEi(),
      wEi(),
      (XEi = {
        gdoc: `application/vnd.google-apps.document`,
        gsheet: `application/vnd.google-apps.spreadsheet`,
        gslides: `application/vnd.google-apps.presentation`,
        boxnote: `application/vnd.box.note`,
        pages: `application/vnd.apple.pages`,
      }),
      (ZEi = {
        document: `google-docs`,
        spreadsheet: `google-sheets`,
        presentation: `google-slides`,
        drive: void 0,
      }));
  }))();
}
QEi();
export {qEi as resolveFileIcon,YEi as describeFileArtwork,VTi as resolveFileProvider};
