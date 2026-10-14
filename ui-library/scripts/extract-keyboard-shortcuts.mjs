import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const base=process.argv[2];if(!base)throw Error('Pass readable assets directory');
const names={initial:'app-initial-b8e1c8014bb4.js',shared:'app-shared-737655e1fb23.js',dialog:'keyboard-shortcuts-dialog-ba16436f11ce.js'};
const s=Object.fromEntries(Object.entries(names).map(([k,f])=>[k,fs.readFileSync(path.join(base,f),'utf8')]));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),hash=s=>createHash('sha256').update(s).digest('hex');
const runtime=`const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};`;
const fuzzy=s.initial.slice(s.initial.indexOf('function k2('),s.initial.indexOf('function m4o('));
fs.writeFileSync(path.join(root,'src/ShortcutMatching.js'),`// Original fuzzy search engine; no service or command registry dependency.
const e=fn=>fn;
${fuzzy}
j2();
export {k2 as shortcutMatchScore};
`);
const groupSymbols=['b6s','w6s','T6s','E6s'],rowSymbols=['tVi','dxi','nVi','eVi','sVi','uVi','dVi','XBi','ZBi','QBi','$Bi','K6n'];
fs.writeFileSync(path.join(root,'src/SettingsSurfaces.js'),`// Original settings group and label/value row presentation.
import {classNames as q} from './classNames.js';
import {createAssetIcon} from './AssetIcon.js';
export function createSettingsSurfaces({React,AssetIcon=createAssetIcon(React),compilerRuntime=React.__COMPILER_RUNTIME}){
${runtime}
const ng=q,D6s=compilerRuntime,x6s=compilerRuntime,x9=compilerRuntime,fxi=compilerRuntime,I8=runtime,S6s=runtime,S9=runtime,pxi=runtime,fVi=compilerRuntime,pVi=runtime,t=fn=>fn;
const rVi=React,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
let aVi,oVi,cVi,lVi,G6n;
${groupSymbols.map(n=>def(s.initial,n)).join('\n')}
${rowSymbols.map(n=>def(s.shared,n)).join('\n')}
sVi();uVi();K6n();const b$=AssetIcon.fromPreset(G6n);
return {SettingsControlRow:XBi,SettingsRadioRow:$Bi,SettingsMutedValue:ZBi,SettingsHint:QBi,SettingsLabel:nVi,SettingsActionRow:eVi,SettingsPanel:dVi,SettingsGroup:Object.assign(w6s,{Header:T6s,Content:E6s,Footer:b6s}),SettingsValueRow:tVi,ShortcutBadge:dxi};
}
`);
const symbols=['Oe','Pe','Fe','J','Ie','Le'];
fs.writeFileSync(path.join(root,'src/KeyboardShortcuts.js'),`// Original dialog content with caller-supplied active command descriptors.
import {shortcutMatchScore as z} from './ShortcutMatching.js';
export function createKeyboardShortcuts({React,dialog,layout,SettingsGroup:W,SettingsValueRow:C,ShortcutBadge:k,ShortcutSearchInput:Se,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!dialog?.Dialog||!layout?.DialogFormRow||!W?.Header||!C||!k||!Se)throw new TypeError('Keyboard shortcuts requires original dialog, settings, badge and search components');
${runtime}
const Y=compilerRuntime,X=React,Z=runtime,j=message=>formatMessage(message),{DialogBody:m,DialogHeader:n,DialogSection:T,DialogFormRow:d}=layout,{DialogTitle:N}=dialog;
const K=['thread','navigation','panels','workspace','skills','configure','app','general'];
${symbols.map(n=>def(s.dialog,n)).join('\n')}
// Host capability/keymap controller je is deliberately replaced by this data boundary.
function KeyboardShortcutsDialog({items,onOpenChange}){return h(dialog.Dialog,{open:true,onOpenChange,size:'wide'},h(Pe,{items}));}
return {KeyboardShortcutsDialog,KeyboardShortcutsContent:Pe,KeyboardShortcutSectionTitle:Le,groupKeyboardShortcuts:Oe};
}
`);
fs.writeFileSync(path.join(root,'keyboard-shortcuts-manifest.json'),JSON.stringify({sources:Object.entries(names).map(([k,file])=>({file,sha256:hash(s[k]),symbols:k==='initial'?groupSymbols:k==='shared'?rowSymbols:symbols})),fuzzy:{start:'function k2(',endBefore:'function m4o(',sha256:hash(fuzzy)},sectionOrder:['thread','navigation','panels','workspace','skills','configure','app','general'],limits:['Original Pe/Fe/J/Ie/Le/Oe and fuzzy matcher retained','je host capability/keymap command discovery is not recovered; items supplied by caller','Work-mode ChatGPT settings dialog is a different branch and remains pending','No installed-app screenshot parity claim']},null,2)+'\n');
