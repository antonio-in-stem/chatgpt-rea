import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const symbols=['OAi','kAi','jAi','AAi','a7','pCi','qxi','$xi','eSi','tSi','nSi','rSi','Uji','p7'],body=symbols.map(def).join('\n');
const output=`// Original dropdown controller. Required primitives remain a separate extraction boundary.
import {classNames as q} from './classNames.js';
export function createDropdownController({React,primitives,eventBridge,TooltipOverlayContext,visualScale=1,compilerRuntime=React.__COMPILER_RUNTIME}){
 for(const name of ['Root','Trigger','Content','Portal','Layer','ModalLayer'])if(!primitives?.[name])throw new TypeError('Missing dropdown primitive '+name);
 if(!eventBridge?.subscribe||!compilerRuntime?.c)throw new TypeError('Dropdown requires event subscription and compiler runtime');
 const {Root:pb,Trigger,Content,Portal:Vji,Layer:hb,ModalLayer:Hji}=primitives,y7={Trigger,Content},Hf=eventBridge;
 const t=fn=>{let initialized=false;return()=>{if(!initialized){initialized=true;fn();}};},c=()=>compilerRuntime,o=()=>React,Uf=()=>{},x5=()=>{};
 const m7=compilerRuntime,h7=React,v5=TooltipOverlayContext??React.createContext(undefined),d5=()=>visualScale;
 const g7={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
 const Yji=200,Xji=100,Zji={top:'bottom',right:'left',bottom:'top',left:'right'},C5=8,b5='codex:dismiss-tooltips';
 const _7={maxWidth:'min(var(--radix-dropdown-menu-content-available-width), calc(100vw - 16px))',maxHeight:'min(var(--radix-dropdown-menu-content-available-height), calc(100vh - 16px))'};
 let MAi,NAi,PAi,FAi,M5;
${body}
 a7();pCi();
 return {Dropdown:p7,useDropdownState:jAi,DropdownSuspense:Uji,menuWidthClass:OAi,menuMaxHeight:kAi,overlaySide:AAi};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/DropdownController.js'),output);
fs.writeFileSync(path.join(root,'dropdown-controller-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols,bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original p7 controller, state hook, dimensions, ref cleanup, hover geometry and suspense bodies. React/compiler/event bridge/visual scale/overlay context explicit. Underlying original Root/Trigger/Content/Portal/Layer/ModalLayer still required, with no fallback substitutes.',limits:['Not a standalone dropdown yet: original menu primitives must be extracted','No menu interaction or visual parity claim from controller tests','Profile dropdown items lazy chunk remains pending']},null,2)+'\n');
