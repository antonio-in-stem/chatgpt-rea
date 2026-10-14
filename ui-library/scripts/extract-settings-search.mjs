import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass recovered readable assets directory');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const page='settings-page-6c4c55bd9144.js',documents='_virtual_settings-search-documents-ea4141d234e9.js';
const source=fs.readFileSync(path.join(dir,page),'utf8'),data=fs.readFileSync(path.join(dir,documents),'utf8');
const symbols=['Qn','$n','er','tr','nr','rr','ir','ar','lr'];
const bodies=symbols.map(name=>{const start=source.indexOf('function '+name+'(');if(start<0)throw Error(name);return source.slice(start,start+source.slice(start).search(/^}\r?$/m)+1);});
fs.writeFileSync(path.join(root,'src/SettingsSearch.js'),`// Recovered ranking and grouping. Host labels and routes are explicit adapters.
import {shortcutMatchScore as It} from './ShortcutMatching.js';
export function createSettingsSearch({getSectionMessage:et,getBrowserSubpage:On,buildSettingsPath:K,creatorMicroMessage}){
if([et,On,K].some(fn=>typeof fn!=='function')||!creatorMicroMessage)throw new TypeError('Settings search requires section labels, browser routes, settings routes and device label');
const sr=new WeakMap(),Tt={creatorMicro:creatorMicroMessage};
// Original lodash sum call receives only nonnegative numeric scores.
const or={default:values=>values.reduce((sum,value)=>sum+value,0)};
${bodies.join('\n')}
return {searchSettings:Qn,resolveSettingsDestination:lr};
}
`);
fs.writeFileSync(path.join(root,'src/SettingsSearchDocuments.js'),data.replace(/^import[^\n]*\n/,'// Original static message index; lazy bundle wrapper replaced with a local initializer.\nconst e=fn=>fn;\n'));
fs.writeFileSync(path.join(root,'settings-search-manifest.json'),JSON.stringify({sources:[page,documents].map((file,i)=>({file,sha256:createHash('sha256').update(i?data:source).digest('hex')})),symbols,adapters:['Host section label descriptors and feature flags','Browser subpage mapping and settings route construction','Creator Micro label descriptor','Numeric sum replaces lodash wrapper'],limits:['Search index is shipped text, not evidence of fully implemented screens','Sidebar controller and route registry are not included','No installed-app visual parity claim']},null,2)+'\n');
