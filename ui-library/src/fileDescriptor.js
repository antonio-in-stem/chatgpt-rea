// Generated original filename/MIME classification. See file-descriptor-manifest.json.
const t=fn=>fn;
function B5(e) {
  if (!e) return null;
  let t = e.trim();
  if (t.length === 0) return null;
  let n = Math.max(t.lastIndexOf(`/`), t.lastIndexOf(`\\`)),
    r = t.slice(n + 1),
    i = r.lastIndexOf(`.`);
  if (i === 0 && r.length > 1) return r.slice(1).toLowerCase();
  if (i === -1) {
    let e = r.toLowerCase();
    return Lwi.has(e) || Pwi.has(e) ? e : null;
  }
  return i === r.length - 1 ? null : r.slice(i + 1).toLowerCase();
}
function fwi(e, t) {
  let n = e?.split(`;`)[0]?.trim().toLowerCase();
  if (n) return Gwi[n];
  let r = Kwi.find(([e]) => t?.startsWith(e))?.[1];
  return r == null ? void 0 : Gwi[r];
}
function pwi({ kind: e, isNote: t, fileName: n, mimeType: r, sourceUrl: i }) {
  let a = fwi(r, i);
  if (a) return a;
  let o = B5(n),
    s = (r ?? ``).toLowerCase(),
    c = o ? o.toUpperCase() : null;
  if (o === `pdf` || s.includes(`pdf`))
    return { key: `pdf`, label: `PDF`, iconKey: `pdf`, category: `pdf`, isImageLike: !1 };
  if (o === `csv` || o === `tsv` || s.includes(`csv`))
    return {
      key: o ?? `csv`,
      label: c ?? `CSV`,
      iconKey: `csv`,
      category: `spreadsheet`,
      isImageLike: !1,
    };
  if (gwi(o, s))
    return {
      key: `sheet`,
      label: c ?? `SHEET`,
      iconKey: `xls`,
      category: `spreadsheet`,
      isImageLike: !1,
    };
  if (hwi(o, s))
    return {
      key: `sheet`,
      label: c ?? `SHEET`,
      iconKey: `csv`,
      category: `spreadsheet`,
      isImageLike: !1,
    };
  if (_wi(o, s))
    return {
      key: o ?? `ppt`,
      label: c ?? `PPT`,
      iconKey: `ppt`,
      category: `presentation`,
      isImageLike: !1,
    };
  if (vwi(o, s))
    return {
      key: o ?? `slides`,
      label: c ?? `SLIDES`,
      iconKey: `slides`,
      category: `presentation`,
      isImageLike: !1,
    };
  if (ywi(o, s))
    return {
      key: `doc`,
      label: c ?? `DOC`,
      iconKey: `document`,
      category: `document`,
      isImageLike: !1,
    };
  if (wwi(o, s))
    return {
      key: o ?? `3d`,
      label: c ?? `3D`,
      iconKey: `three-d`,
      category: `file`,
      isImageLike: !1,
    };
  let l = mwi(o, s);
  return l
    ? {
        key: o ?? l.key,
        label: c ?? `CODE`,
        iconKey: l.iconKey,
        category: l.iconKey === `html` ? `html` : `code`,
        isImageLike: !1,
      }
    : xwi(o, s)
      ? { key: o ?? `code`, label: c ?? `CODE`, iconKey: `code`, category: `code`, isImageLike: !1 }
      : bwi(t === !0 || e === `note`, o, s)
        ? { key: `doc`, label: c ?? `TEXT`, iconKey: `text`, category: `document`, isImageLike: !1 }
        : Swi(o, s)
          ? { key: `zip`, label: `ZIP`, iconKey: `zip`, category: `file`, isImageLike: !1 }
          : Cwi(o, s)
            ? {
                key: o ?? `audio`,
                label: c ?? `AUDIO`,
                iconKey: `audio`,
                category: `audio`,
                isImageLike: !1,
              }
            : Twi(o, s)
              ? {
                  key: `mp4`,
                  label: `MP4`,
                  iconKey: `file-video`,
                  category: `file`,
                  isImageLike: !1,
                }
              : Ewi(o, s)
                ? {
                    key: o ?? `video`,
                    label: c ?? `VIDEO`,
                    iconKey: `file-video`,
                    category: `file`,
                    isImageLike: !1,
                  }
                : Dwi(o, s)
                  ? {
                      key: o ?? `jpg`,
                      label: c ?? `JPG`,
                      iconKey: `photo`,
                      category: `image`,
                      isImageLike: !0,
                    }
                  : Owi(o, s)
                    ? {
                        key: o ?? `png`,
                        label: c ?? `PNG`,
                        iconKey: `photo`,
                        category: `image`,
                        isImageLike: !0,
                      }
                    : kwi(o, s)
                      ? {
                          key: o ?? `image`,
                          label: c ?? `IMAGE`,
                          iconKey: `photo`,
                          category: `image`,
                          isImageLike: !0,
                        }
                      : o
                        ? {
                            key: o,
                            label: c ?? o.toUpperCase(),
                            iconKey: `file`,
                            category: `file`,
                            isImageLike: !1,
                          }
                        : {
                            key: `file`,
                            label: `FILE`,
                            iconKey: `file`,
                            category: `file`,
                            isImageLike: !1,
                          };
}
function mwi(e, t) {
  if (e) {
    let t = Uwi[e];
    if (t) return t;
  }
  return Wwi.find(({ substring: e }) => t.includes(e))?.info ?? null;
}
function hwi(e, t) {
  return (e ? Mwi.has(e) : !1) || t.includes(`spreadsheet`) || t.includes(`csv`);
}
function gwi(e, t) {
  return (
    e === `xls` ||
    e === `xlsm` ||
    e === `xlsx` ||
    t.includes(`excel`) ||
    t.includes(`spreadsheetml`)
  );
}
function _wi(e, t) {
  return (e ? jwi.has(e) : !1) || t.includes(`powerpoint`) || t.includes(`presentationml`);
}
function vwi(e, t) {
  return (e ? Awi.has(e) : !1) || t.includes(`presentation`);
}
function ywi(e, t) {
  return (
    (e ? Nwi.has(e) : !1) ||
    t.includes(`word`) ||
    t.includes(`officedocument.wordprocessingml.document`)
  );
}
function bwi(e, t, n) {
  return e === !0 || (t ? Pwi.has(t) : !1) || n.startsWith(`text/`);
}
function xwi(e, t) {
  return (
    (e ? Lwi.has(e) : !1) ||
    t.includes(`javascript`) ||
    t.includes(`typescript`) ||
    t.includes(`python`) ||
    t.includes(`json`) ||
    t.includes(`xml`)
  );
}
function Swi(e, t) {
  return (
    (e ? Rwi.has(e) : !1) ||
    t === `application/zip` ||
    t === `application/gzip` ||
    t === `application/x-gzip` ||
    t === `application/x-tar` ||
    t === `application/x-zip` ||
    t === `application/x-zip-compressed` ||
    t === `multipart/x-zip`
  );
}
function Cwi(e, t) {
  return (e ? Fwi.has(e) : !1) || t.startsWith(`audio/`);
}
function wwi(e, t) {
  return (
    (e ? Iwi.has(e) : !1) ||
    t.startsWith(`model/`) ||
    t.includes(`x-3ds`) ||
    t.includes(`x-blender`) ||
    t.includes(`wavefront`)
  );
}
function Twi(e, t) {
  return e === `mp4` || t.startsWith(`video/mp4`);
}
function Ewi(e, t) {
  return (e ? Hwi.has(e) : !1) || t.startsWith(`video/`);
}
function Dwi(e, t) {
  return (e ? zwi.has(e) : !1) || t === `image/jpeg`;
}
function Owi(e, t) {
  return (e ? Bwi.has(e) : !1) || t === `image/png`;
}
function kwi(e, t) {
  return (e ? Vwi.has(e) : !1) || t.startsWith(`image/`);
}
var Awi, jwi, Mwi, Nwi, Pwi, Fwi, Iwi, Lwi, Rwi, zwi, Bwi, Vwi, Hwi, Uwi, Wwi, Gwi, Kwi;
function qwi() {
  return (qwi = t(() => {
    ((Awi = new Set([`key`])),
      (jwi = new Set([`ppt`, `pptx`])),
      (Mwi = new Set([`csv`, `tsv`, `xls`, `xlsm`, `xlsx`])),
      (Nwi = new Set([`doc`, `docx`])),
      (Pwi = new Set([
        `dotenv`,
        `env`,
        `gitignore`,
        `lock`,
        `markdown`,
        `md`,
        `mdown`,
        `mdx`,
        `mkd`,
        `rtf`,
        `txt`,
      ])),
      (Fwi = new Set([
        `aac`,
        `aif`,
        `aiff`,
        `flac`,
        `m4a`,
        `mp3`,
        `oga`,
        `ogg`,
        `opus`,
        `wav`,
        `weba`,
        `wma`,
      ])),
      (Iwi = new Set([`3ds`, `blend`, `dae`, `fbx`, `glb`, `gltf`, `obj`, `ply`, `stl`, `usdz`])),
      (Lwi = new Set(
        `bash.bazel.build.bzl.c.cc.cpp.cs.css.cxx.dockerfile.fish.gradle.go.h.hh.hpp.html.htm.ini.ipynb.java.js.jsonc.json.jsx.kt.less.lua.m.makefile.mjs.mk.mm.ninja.php.pl.ps1.py.rb.rs.scss.sass.sh.sql.swift.toml.ts.tsx.vue.xml.yaml.yml.zsh`.split(
          `.`,
        ),
      )),
      (Rwi = new Set([`gz`, `tar`, `tgz`, `zip`])),
      (zwi = new Set([`jfif`, `jpeg`, `jpg`])),
      (Bwi = new Set([`png`])),
      (Vwi = new Set([
        `avif`,
        `bmp`,
        `gif`,
        `heic`,
        `heif`,
        `jpg`,
        `jpeg`,
        `jfif`,
        `png`,
        `svg`,
        `tif`,
        `tiff`,
        `webp`,
      ])),
      (Hwi = new Set([`3gp`, `avi`, `m4v`, `mkv`, `mov`, `mp4`, `mpeg`, `mpg`, `webm`, `wmv`])),
      (Uwi = {
        ts: { key: `typescript`, iconKey: `code` },
        tsx: { key: `react`, iconKey: `code` },
        jsx: { key: `react`, iconKey: `code` },
        js: { key: `javascript`, iconKey: `code` },
        py: { key: `python`, iconKey: `code` },
        java: { key: `java`, iconKey: `code` },
        rs: { key: `rust`, iconKey: `code` },
        php: { key: `php`, iconKey: `code` },
        html: { key: `html`, iconKey: `html` },
        htm: { key: `html`, iconKey: `html` },
        json: { key: `json`, iconKey: `code` },
        c: { key: `cplusplus`, iconKey: `code` },
        cc: { key: `cplusplus`, iconKey: `code` },
        cpp: { key: `cplusplus`, iconKey: `code` },
        h: { key: `cplusplus`, iconKey: `code` },
        hpp: { key: `cplusplus`, iconKey: `code` },
      }),
      (Wwi = [
        { substring: `typescript`, info: { key: `typescript`, iconKey: `code` } },
        { substring: `javascript`, info: { key: `javascript`, iconKey: `code` } },
        { substring: `python`, info: { key: `python`, iconKey: `code` } },
        { substring: `json`, info: { key: `json`, iconKey: `code` } },
        { substring: `html`, info: { key: `html`, iconKey: `html` } },
      ]),
      (Gwi = {
        "application/vnd.google-apps.document": {
          key: `doc`,
          label: `DOC`,
          iconKey: `google-docs`,
          category: `document`,
          isImageLike: !1,
        },
        "application/vnd.google-apps.spreadsheet": {
          key: `sheet`,
          label: `SHEET`,
          iconKey: `google-sheets`,
          category: `spreadsheet`,
          isImageLike: !1,
        },
        "application/vnd.google-apps.presentation": {
          key: `slides`,
          label: `SLIDES`,
          iconKey: `google-slides`,
          category: `presentation`,
          isImageLike: !1,
        },
      }),
      (Kwi = [
        [`https://docs.google.com/document`, `application/vnd.google-apps.document`],
        [`https://docs.google.com/presentation`, `application/vnd.google-apps.presentation`],
        [`https://docs.google.com/spreadsheets`, `application/vnd.google-apps.spreadsheet`],
      ]));
  }))();
}
qwi();
export {pwi as describeFile,B5 as fileExtension,fwi as fileMimeOverride};
