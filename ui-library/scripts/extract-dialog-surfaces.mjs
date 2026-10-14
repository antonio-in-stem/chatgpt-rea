import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8'),def=n=>{const i=source.indexOf('function '+n+'(');if(i<0)throw Error(n);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const symbols=['mNi','hNi','j7','M7','_Ni','gNi','bNi','vNi','yNi'],body=symbols.map(def).join('\n');
const output=`// Original dialog layout surfaces; overlay/content controller is not replaced here.
import {classNames as q} from './classNames.js';
export function createDialogSurfaces({React,Button:r5,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!r5||!compilerRuntime?.c)throw new TypeError('DialogSurfaces requires original Button and React compiler runtime');
 const h=React.createElement,F7={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},N7=compilerRuntime,P7=React,t=fn=>fn;
 const CNi='codex.debug.dialogLayout',I7='relative rounded-lg border border-chart-blue/40',TNi='absolute -top-2 left-2 rounded bg-chart-blue/15 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-chart-blue';
 let cNi,lNi,uNi,dNi,fNi,pNi,A7;
${body}
 mNi();return {DialogBody:_Ni,DialogHeader:gNi,DialogSection:bNi,DialogFooter:vNi,dialogBodySizeClass:hNi};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),hash=s=>createHash('sha256').update(s).digest('hex');
fs.writeFileSync(path.join(root,'src/DialogSurfaces.js'),output);
fs.writeFileSync(path.join(root,'dialog-surfaces-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sha256:hash(source),symbols,bodySha256:hash(body),limits:['Dialog layout only; XMi/tNi styled content controller pending','Use engine.Dialog for original modal primitives; layout alone does not manage focus','Full-window visual parity unverified']},null,2)+'\n');
