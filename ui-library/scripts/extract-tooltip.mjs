import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass recovered shared module');
const source=fs.readFileSync(process.argv[2],'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');if(start<0)throw Error(name);const end=source.slice(start).search(/^}\r?$/m);if(end<0)throw Error('Missing end '+name);return source.slice(start,start+end+1);};
const names=['p5','Axi','Pxi','h5','Lxi','Rxi','qxi','Jxi','$xi','eSi','tSi','nSi','rSi','w5','cSi','lSi','uSi','dSi','fSi','pSi','mSi','hSi','T5','gSi','_Si','vSi','ySi','bSi','xSi','SSi'];
const body=names.map(definition).join('\n');
const floating=source.slice(source.indexOf('function _Oe('),source.indexOf('var fAe, pAe, mAe, hAe, gAe, _Ae;'));
if(!floating.includes('function ay()'))throw Error('Floating boundaries missing');
const output=`// Generated original tooltip, provider, portal and floating-positioning engine.
// See tooltip-manifest.json. React compiler cache is retained through its runtime.
import {classNames as q} from './classNames.js';
export function createTooltip({React,ReactDOM,ShortcutBadge,visualScale=1,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!ReactDOM?.createPortal||!ReactDOM?.flushSync)throw new TypeError('React compiler runtime and ReactDOM portal/flushSync are required');
 const t=fn=>fn,n=value=>value,o=()=>React,ph=()=>ReactDOM;
${floating}
 ay();
 const E5=React,S5=React,Ixi=React,Bxi=React,Vxi=ReactDOM;
 const CSi=compilerRuntime,Yxi=compilerRuntime,Fxi=compilerRuntime,zxi=compilerRuntime;
 const D5={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},Xxi=D5,g5=D5;
 const Mxi=React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
 const Gxi=React.createContext(null),Wxi=React.createContext(null),v5=React.createContext(undefined);
 const d5=()=>visualScale,dxi=ShortcutBadge,oSi={textTheme:'_textTheme_8iuk0_2'};
 const wSi='default',TSi=100,ESi=12,DSi='[data-tooltip-overflow-target]',OSi='[data-tooltip-visibility-target]',C5=8,Zxi=300,b5='codex:dismiss-tooltips';
 const kSi={bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0,toJSON(){return {};}};
${body}
 return {Tooltip:w5,TooltipProvider:Jxi,TooltipOverlayContext:v5,OverlayPortal:h5,dismissTooltips:qxi};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/Tooltip.js'),output);
fs.writeFileSync(path.join(root,'tooltip-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols:names,bodySha256:createHash('sha256').update(body).digest('hex'),floatingBodySha256:createHash('sha256').update(floating).digest('hex'),transformation:'Original tooltip/provider/portal/positioning function bodies. React, ReactDOM, shortcut label and visual scale injected. Original compiler cache retained through React compiler runtime; bundle module boundaries replaced.',limits:['React 19 compiler/internal stable callback dependency retained','Default/blocked/keyboard browser flow verified; advanced variants and zoom runtime cases pending','Original matched screenshot comparison pending']},null,2)+'\n');
