import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8'),def=n=>{const i=source.indexOf('function '+n+'(');if(i<0)throw Error(n);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const symbols=['XMi','eNi','tNi','YMi','$Mi','rNi','iNi','nNi','ZMi','QMi','qxi'],initializers=['JMi','SMi','yMi','Wcr','Kcr'],body=symbols.map(def).join('\n'),initBody=initializers.map(def).join('\n');
const variables=[...new Set([...initBody.matchAll(/\(([\w$]+) =/g)].map(m=>m[1]))].filter(n=>!initializers.includes(n));
const output=`// Full original dialog controller, overlay, size variants and height observation.
import {classNames as q} from './classNames.js';
export function createDialog({React,primitives:EDe,tooltip,AssetIcon:t5,visualScale=1,formatMessage=message=>message.defaultMessage,IntlContext,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!EDe?.Content||!tooltip?.OverlayPortal||!tooltip?.TooltipOverlayContext||!t5?.fromPreset||!compilerRuntime?.c)throw new TypeError('Dialog requires recovered dialog primitives, tooltip infrastructure, icons and compiler runtime');
 const h=React.createElement,k7={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},D7=compilerRuntime,O7=React;
 const {Root:Cv,Trigger:wv,Content:BDe,Close:Av,Title:Ov,Description:kv,Portal:Tv,Overlay:Ev}=EDe;
 const h5=tooltip.OverlayPortal,v5=tooltip.TooltipOverlayContext,cHe=IntlContext??React.createContext({formatMessage}),d5=()=>visualScale,b5='codex:dismiss-tooltips';
 const t=fn=>fn,Q=()=>{},o=()=>React,K=()=>k7,Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 let ${variables.join(',')};
${initBody}
 ${initializers.map(n=>n+'();').join('')}const _gr=t5.fromPreset(Ucr),C$=t5.fromPreset(Gcr),oNi={id:'codex.dialog.closeButton',defaultMessage:'Close dialog',description:'Accessible label for the button that closes a dialog'};
${body}
 return {Dialog:XMi,DialogContent:tNi,DialogTrigger:eNi,DialogTitle:ZMi,DialogDescription:QMi,DialogOverlay:$Mi,DialogClose:Av,dialogWidthClass:YMi};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),hash=s=>createHash('sha256').update(s).digest('hex');
fs.writeFileSync(path.join(root,'src/Dialog.js'),output);
fs.writeFileSync(path.join(root,'dialog-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sha256:hash(source),symbols,initializers,bodySha256:hash(body),initializersSha256:hash(initBody),transformation:'Original function bodies, CSS map and all close icon variants retained; React/engine/tooltip/intl/scale supplied explicitly.',limits:['Not all size/variant/zoom/nested dialog combinations browser-verified','Full-window screenshot fidelity remains unverified']},null,2)+'\n');
