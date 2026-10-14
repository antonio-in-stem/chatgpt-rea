// Original browser extension image/fallback selection.
import {createSettingsComponentArtwork} from './SettingsComponentArtwork.js';
export function createSettingsExtensionArtwork({React,getBrowserMetadata:Ke,compilerRuntime=React.__COMPILER_RUNTIME}){
if(typeof Ke!=='function')throw new TypeError('Browser metadata provider required');
const ra=compilerRuntime,h=React.createElement,ia={jsx:(type,props)=>h(type,props)},hi=createSettingsComponentArtwork(React).hi;
function na(e) {
  let t = (0, ra.c)(3),
    { className: n } = e,
    r;
  t[0] === Symbol.for(`react.memo_cache_sentinel`) ? ((r = Ke()), (t[0] = r)) : (r = t[0]);
  let ee = r,
    i;
  return (
    t[1] === n
      ? (i = t[2])
      : ((i =
          ee == null
            ? (0, ia.jsx)(hi, { className: n, "aria-hidden": !0 })
            : (0, ia.jsx)(`img`, { className: n, alt: ``, src: ee.iconUrl })),
        (t[1] = n),
        (t[2] = i)),
    i
  );
}
return na;
}
