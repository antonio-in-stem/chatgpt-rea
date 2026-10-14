import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8'),start=source.indexOf('function zCe('),i=source.indexOf('function wb('),end=i+source.slice(i).search(/^}\r?$/m)+1,body=source.slice(start,end);
if(start<0||i<0||!body.includes('function eb()'))throw Error('Missing menu engine boundaries');
const runtime=fs.readFileSync(path.join(path.dirname(process.argv[2]),'rolldown-runtime-2d059c5e81f4.js'),'utf8');
const output=`// Original contiguous DOM interaction, positioning and dropdown engine.
import {a as e,n as t,o as n,r,t as i} from './BundleRuntime.js';
export function createMenuEngine({React,ReactDOM}){
 if(!ReactDOM?.createPortal||!ReactDOM?.flushSync)throw new TypeError('Menu engine requires ReactDOM');
 const o=()=>React,ph=()=>ReactDOM;
 const runtime={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},K=()=>runtime;
${body}
 wb();
 return {Root:pb,Trigger:mb,Portal:hb,Content:gb,Group:fNe,Label:pNe,Item:_b,CheckboxItem:vb,RadioGroup:yb,RadioItem:bb,ItemIndicator:xb,Separator:mNe,Arrow:hNe,Sub:gNe,SubTrigger:Sb,SubContent:Cb};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/MenuEngine.js'),output);fs.writeFileSync(path.join(root,'src/BundleRuntime.js'),runtime);
fs.writeFileSync(path.join(root,'menu-engine-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),startSymbol:'zCe',endSymbol:'wb',bodySha256:createHash('sha256').update(body).digest('hex'),bodyLength:body.length,runtimeSha256:createHash('sha256').update(runtime).digest('hex'),transformation:'Contiguous original source segment retained unchanged. React and ReactDOM module imports adapted; original Rolldown runtime retained.',limits:['Integration with menu surfaces pending','Basic keyboard/select/Escape/outside-click browser paths verified; checkbox/radio/submenu/modal paths pending','No screenshot parity claim']},null,2)+'\n');
