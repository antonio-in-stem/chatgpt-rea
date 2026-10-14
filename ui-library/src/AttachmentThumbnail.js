// Generated thumbnail presentation; query/account are explicit adapters.
import {classNames as ng} from './classNames.js';
export function createAttachmentThumbnail({React,AttachmentUploadProgress,useThumbnailQuery,useAccountId,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!AttachmentUploadProgress||!useThumbnailQuery||!useAccountId)throw new TypeError('Thumbnail requires original progress, query and account hook adapters');
 const zxn=compilerRuntime,Bxn=React,Axn=AttachmentUploadProgress,translator={formatMessage},zd=()=>translator,Dp=Symbol('account'),Uxn=Symbol('thumbnail-query'),G=()=>useAccountId(),Zs=(_query,options)=>useThumbnailQuery(options);
 const mk={jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
function Ixn(e) {
  let t = (0, zxn.c)(27),
    { fallback: n, source: r, imageFit: i, importKind: a, mountedAt: o, uploadingLabel: s } = e,
    c = zd(),
    [l, u] = (0, Bxn.useState)(),
    d = G(`file` in r ? Dp : null),
    f;
  t[0] !== a || t[1] !== r
    ? ((f = { source: r, importKind: a }), (t[0] = a), (t[1] = r), (t[2] = f))
    : (f = t[2]);
  let { data: p, isError: m } = Zs(Uxn, f);
  if (`file` in r && d !== r.file.accountId) return n;
  let h = `loading`;
  p?.dataUrl == null
    ? (p != null || m) && (h = `fallback`)
    : l?.dataUrl === p.dataUrl && (h = l.status === `ready` ? `ready` : `fallback`);
  let g = null;
  if (h === `fallback`) g = n;
  else if (p?.dataUrl != null) {
    let e = i === `scale-down` ? `object-scale-down` : `object-cover object-left-top`,
      n = h === `loading` && `invisible`,
      r;
    t[3] !== e || t[4] !== n
      ? ((r = ng(`size-full`, e, n)), (t[3] = e), (t[4] = n), (t[5] = r))
      : (r = t[5]);
    let s;
    t[6] !== a || t[7] !== o || t[8] !== p.byteLength || t[9] !== p.dataUrl
      ? ((s = () => {
          (u({ dataUrl: p.dataUrl, status: `ready` }), Rxn(`visible`, o, Lxn(a), p.byteLength));
        }),
        (t[6] = a),
        (t[7] = o),
        (t[8] = p.byteLength),
        (t[9] = p.dataUrl),
        (t[10] = s))
      : (s = t[10]);
    let c;
    t[11] === p.dataUrl
      ? (c = t[12])
      : ((c = () => u({ dataUrl: p.dataUrl, status: `error` })), (t[11] = p.dataUrl), (t[12] = c));
    let l;
    (t[13] !== h || t[14] !== r || t[15] !== s || t[16] !== c || t[17] !== p.dataUrl
      ? ((l = (0, mk.jsx)(`img`, {
          alt: ``,
          className: r,
          "data-attachment-thumbnail-source": `workspace`,
          "data-attachment-thumbnail-state": h,
          onLoad: s,
          onError: c,
          src: p.dataUrl,
        })),
        (t[13] = h),
        (t[14] = r),
        (t[15] = s),
        (t[16] = c),
        (t[17] = p.dataUrl),
        (t[18] = l))
      : (l = t[18]),
      (g = l));
  }
  let _;
  t[19] !== c || t[20] !== h || t[21] !== s
    ? ((_ =
        (s != null || h === `loading`) &&
        (0, mk.jsx)(Axn, {
          label:
            s ??
            c.formatMessage({
              id: `fileAttachment.loadingPreviewAriaLabel`,
              defaultMessage: `Loading preview`,
              description: `Screen-reader label for the spinner while a file attachment thumbnail is being generated or its image is loading in the composer`,
            }),
        })),
      (t[19] = c),
      (t[20] = h),
      (t[21] = s),
      (t[22] = _))
    : (_ = t[22]);
  let v;
  return (
    t[23] !== g || t[24] !== h || t[25] !== _
      ? ((v = (0, mk.jsxs)(`span`, {
          className: `contents`,
          "data-attachment-thumbnail-source": `workspace`,
          "data-attachment-thumbnail-state": h,
          children: [g, _],
        })),
        (t[23] = g),
        (t[24] = h),
        (t[25] = _),
        (t[26] = v))
      : (v = t[26]),
    v
  );
}
function Fxn() {
  return performance.now();
}
function Lxn(e) {
  return e === `docx` || e === `pdf` || e === `pptx` || e === `xlsx` ? e : `other`;
}
function Rxn(e, t, n, r) {
  performance.measure(`codex:composer-attachment-thumbnail:${e}`, {
    detail: { byteLength: r, format: n },
    end: performance.now(),
    start: t,
  });
}
 return {AttachmentThumbnail:Ixn,thumbnailMountedAt:Fxn};
}
