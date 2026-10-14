import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const base=process.argv[2];if(!base)throw Error('Pass readable assets');
const names=['keyboard-shortcuts-settings-c347e431e5b9.js','app-shared-737655e1fb23.js'],sources=names.map(n=>fs.readFileSync(path.join(base,n),'utf8'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/LinkShortcutPreference.js'),`// Original browser-link shortcut preference; persistence and localization supplied by caller.
export function createLinkShortcutPreference({React,settings,menu,Button:s,AssetIcon,usePreferenceStore,saveShortcut,formatMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!settings?.SettingsControlRow||!menu?.Dropdown||!AssetIcon?.fromPreset||typeof usePreferenceStore!=='function'||typeof saveShortcut!=='function'||typeof formatMessage!=='function')throw new TypeError('Link shortcut preference requires original surfaces, localization and promise persistence adapters');
const h=React.createElement,Z={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Mt=compilerRuntime,Nt=React,e=fn=>fn,F=()=>{},ge=x=>x,R=m=>formatMessage(m,m.values),j=settings.SettingsControlRow,u=menu.Dropdown,L={RadioGroup:menu.MenuRadioGroup,RadioItem:menu.MenuRadioItem};
const d=Symbol('local preference store'),he={externalBrowserLinkShortcut:Symbol('externalBrowserLinkShortcut')},l=()=>usePreferenceStore(),ye=(store,_setting,value)=>saveShortcut(store,value),ae=['unassigned','primary','alt','primary-shift'];
let X;
${def(sources[0],'At')}
At();
const O=(()=>{const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let t8n;
${def(sources[1],'n8n')}
n8n();return AssetIcon.fromPreset(t8n);})();
${def(sources[0],'jt')}
return {LinkShortcutPreference:jt,linkShortcutMessages:X};
}
`);
fs.writeFileSync(path.join(root,'link-shortcut-preference-manifest.json'),JSON.stringify({sources:names.map((file,i)=>({file,sha256:createHash('sha256').update(sources[i]).digest('hex'),symbols:i===0?['At','jt']:['n8n']})),options:['unassigned','primary','alt','primary-shift'],limits:['Preference atom/store and save operation replaced by explicit adapters','Caller must update shortcut prop after a successful save','Locale-aware formatter is caller-supplied; message descriptors remain original','No browser launch or global modifier handling included','No installed-app screenshot comparison']},null,2)+'\n');
