import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const base=process.argv[2];if(!base)throw Error('Pass readable assets');
const names=['settings-row-disclosure-6b4fdbc87e7d.js','keyboard-shortcuts-settings-c347e431e5b9.js','app-shared-737655e1fb23.js'];
const sources=names.map(n=>fs.readFileSync(path.join(base,n),'utf8'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),symbols=[['a'],['Et'],['sVi','i8n','v8n']];
fs.writeFileSync(path.join(root,'src/SettingsDisclosure.js'),`// Original controlled disclosure and dictation shortcut advanced group.
export function createSettingsDisclosure({React,settings,Button:s,AssetIcon,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!settings?.SettingsControlRow||!s||!AssetIcon?.fromPreset)throw new TypeError('SettingsDisclosure requires original settings, Button and AssetIcon');
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const o=compilerRuntime,Dt=compilerRuntime,Ot=React,Y=runtime,t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false}),R=m=>formatMessage(m);
let aVi,oVi,r8n,_8n;
${symbols[2].map(n=>def(sources[2],n)).join('\n')}
sVi();i8n();v8n();
const r=aVi,we=AssetIcon.fromPreset(r8n),chevronRight=AssetIcon.fromPreset(_8n),{SettingsControlRow:j,SettingsPanel:fe,SettingsGroup:it}=settings;
// Keep distinct original module aliases inside their own scopes.
const Tt=(()=>{const s=runtime;
${def(sources[0],'a')}
return a;})();
const AdvancedShortcutGroup=(()=>{const h=chevronRight;
${def(sources[1],'Et')}
return Et;})();
return {SettingsRowDisclosure:Tt,AdvancedShortcutGroup};
}
`);
fs.writeFileSync(path.join(root,'settings-disclosure-manifest.json'),JSON.stringify({sources:names.map((file,i)=>({file,sha256:createHash('sha256').update(sources[i]).digest('hex'),symbols:symbols[i]})),limits:['Disclosure caller owns trigger state; original Et owns its advanced state','Shortcut nodes supplied by caller; no dictation or hotkey registration','Original search branch exposes single-tap content directly','No installed-app screenshot parity verification']},null,2)+'\n');
