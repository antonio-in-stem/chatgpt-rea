import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const base=process.argv[2];if(!base)throw Error('Pass readable assets');
const names=['keyboard-shortcuts-settings-c347e431e5b9.js','app-initial-b8e1c8014bb4.js','app-shared-737655e1fb23.js'],sources=names.map(n=>fs.readFileSync(path.join(base,n),'utf8'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const runtime=`const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};`;
fs.writeFileSync(path.join(root,'src/SettingsDropdownButton.js'),`// Original hNs settings dropdown button and QNi chevron.
import {classNames as ng} from './classNames.js';
export function createSettingsDropdownButton({React,Button:Ir,compilerRuntime=React.__COMPILER_RUNTIME}){
${runtime}
const vNs=compilerRuntime,j6=runtime,t=fn=>fn,o=()=>{},K=()=>runtime;let XNi,ZNi;
${def(sources[2],'QNi')}
QNi();const au=ZNi;
${def(sources[1],'hNs')}
return hNs;
}
`);
fs.writeFileSync(path.join(root,'src/NumberShortcutPreference.js'),`// Original number shortcut preference; runtime keymap/store are explicit caller boundaries.
export function createNumberShortcutPreference({React,settings,menu,DropdownButton:Ne,useStateSnapshot,saveTarget,hasNumberConflicts:rt,formatMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!settings?.SettingsControlRow||!menu?.Dropdown||!Ne||typeof useStateSnapshot!=='function'||typeof saveTarget!=='function'||typeof rt!=='function'||typeof formatMessage!=='function')throw new TypeError('Number preference requires original surfaces and snapshot/save/conflict/locale adapters');
${runtime}
const Rt=compilerRuntime,zt=React,Q=runtime,e=fn=>fn,F=()=>{},ge=x=>x,R=m=>formatMessage(m,m.values),j=settings.SettingsControlRow,u=menu.Dropdown,L={RadioGroup:menu.MenuRadioGroup,RadioItem:menu.MenuRadioItem};
const d=Symbol('store'),Ye=Symbol('keymap'),he={primaryNumberShortcutTarget:Symbol('primaryNumberShortcutTarget')},l=()=>useStateSnapshot().store,pe=()=>({platform:useStateSnapshot().platform}),de=()=>useStateSnapshot().target,o=()=>({data:useStateSnapshot().keymapState}),ye=(store,_setting,value)=>saveTarget(store,value);
let Ft;
${def(sources[0],'It')}
It();
${def(sources[0],'Lt')}
return {NumberShortcutPreference:Lt,numberShortcutMessages:Ft};
}
`);
fs.writeFileSync(path.join(root,'number-shortcut-preference-manifest.json'),JSON.stringify({sources:names.map((file,i)=>({file,sha256:createHash('sha256').update(sources[i]).digest('hex'),symbols:[['It','Lt'],['hNs'],['QNi']][i]})),limits:['Caller supplies runtime platform, selected target, keymap query and store','Conflict detection remains a required external adapter; original keymap resolver not extracted here','Promise save adapter must update target state after success','No system hotkey registration or complete settings router','No installed-app screenshot comparison']},null,2)+'\n');
