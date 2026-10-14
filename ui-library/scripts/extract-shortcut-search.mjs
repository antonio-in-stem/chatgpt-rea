import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const base=process.argv[2];if(!base)throw Error('Pass readable assets directory');
const files=['app-initial-b8e1c8014bb4.js','keyboard-shortcuts-search-input-bd702cb80586.js'],sources=files.map(f=>fs.readFileSync(path.join(base,f),'utf8'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const runtime=`const h=React.createElement,runtime={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};`;
fs.writeFileSync(path.join(root,'src/SearchField.js'),`// Original PJa body; host localization and recovered icon components are explicit dependencies.
export function createSearchField({React,mergeClasses:ng,icons,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
${runtime}
const FJa=compilerRuntime,IJa=React,bZ=runtime,intl={formatMessage},zd=()=>intl;
const {Search16:qve,Search20:Bee,LegacySearch:SPe,ClearSearch:Pke,SidebarIcon:vZ,ResponsiveSearch:rm}=icons;
${def(sources[0],'PJa')}
return PJa;
}
`);
fs.writeFileSync(path.join(root,'src/ShortcutSearchInput.js'),`// Original shortcut search wrapper; capture handler supplied by the caller.
export function createShortcutSearchInput({React,SearchField:o,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!o||!compilerRuntime?.c)throw new TypeError('Shortcut search requires SearchField and compiler runtime');
${runtime}
const l=compilerRuntime,u=React,d=runtime,intl={formatMessage},i=()=>intl;
${def(sources[1],'c')}
return c;
}
`);
fs.writeFileSync(path.join(root,'shortcut-search-manifest.json'),JSON.stringify({sources:files.map((file,i)=>({file,sha256:createHash('sha256').update(sources[i]).digest('hex'),symbols:[i===0?'PJa':'c']})),limits:['Icon dependencies reuse recovered SearchIcons','Keystroke recording is supplied by caller; wrapper only preserves capture presentation and key handling']},null,2)+'\n');
