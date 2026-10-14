import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass readable assets directory');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const names=['settings-page-6c4c55bd9144.js','app-initial-b8e1c8014bb4.js','browser-site-settings-subpages-8af74e646e3e.js','app-shared-737655e1fb23.js'];
const sources=names.map(n=>fs.readFileSync(path.join(dir,n),'utf8'));
const body=(source,name)=>{const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const base=sources[3].match(/pSt = (`[^`]+`)/)?.[1];if(!base)throw Error('Missing browser route');
fs.writeFileSync(path.join(root,'src/SettingsRoutes.js'),`// Original URL construction, permission aliases and browser breadcrumb descriptors.
const e=fn=>fn,r=value=>value,n=()=>{},i=()=>{},t=${base};
var s,FNs;
${['a','o','c'].map(n=>body(sources[2],n)).join('\n')}
${['PNs','INs'].map(n=>body(sources[1],n)).join('\n')}
c();INs();
export {a as getBrowserPermissionMessage,o as getBrowserSubpage,PNs as buildSettingsPath,s as browserPermissionMessages};
`);
fs.writeFileSync(path.join(root,'src/SettingsSearchField.js'),`// Original settings search input; caller owns application shortcut registration.
export function createSettingsSearchField({React,SearchField:st,useAccelerator:Ut,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!st||typeof Ut!=='function')throw new TypeError('Settings search requires SearchField and shortcut hook');
const Jr=compilerRuntime,Xr=React,intl={formatMessage},ye=()=>intl,h=React.createElement,Q={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key})};
${body(sources[0],'Ur')}
return Ur;
}
`);
fs.writeFileSync(path.join(root,'settings-navigation-manifest.json'),JSON.stringify({sources:names.map((file,i)=>({file,sha256:createHash('sha256').update(sources[i]).digest('hex')})),symbols:{SettingsRoutes:['a','o','c','PNs','INs'],SettingsSearchField:['Ur']},adapters:['Lazy initialization and defineMessages identity','Caller supplied application accelerator hook and localization'],limits:['No Electron permissions are changed','Settings sidebar controller and visual parity remain pending']},null,2)+'\n');
