import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass settings-page source');const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const names={jr:'isPlainNavigationSection',Mr:'isGroupedNavigationSection',Nr:'isUsageSection',Ir:'createPluginSearchResult',Rr:'searchableSectionSlugs',Br:'isAllowedPluginSearchTerm',Kr:'groupSettingsSections',qr:'orderSettingsSections'};
const bodies=Object.keys(names).map(n=>{const i=source.indexOf('function '+n+'(');return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);});
const start=source.indexOf('(Qr = _e({'),end=source.indexOf('(ti = {',start),constants=source.slice(start,end);
fs.writeFileSync(path.join(root,'src/SettingsSections.js'),`// Original navigation grouping, ordering and search eligibility rules.
const _e=descriptor=>descriptor;let Qr,$r,ei;
(${constants}void 0);
${bodies.join('\n')}
export {${Object.entries(names).map(([a,b])=>a+' as '+b).join(',')},ei as settingsSectionGroups,$r as settingsSectionOrder};
`);
fs.writeFileSync(path.join(root,'settings-sections-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),symbols:Object.keys(names),constantsSha256:createHash('sha256').update(constants).digest('hex'),limits:['Feature/auth/host visibility is resolved before these helpers','Complete sidebar renderer and query controller not included']},null,2)+'\n');
