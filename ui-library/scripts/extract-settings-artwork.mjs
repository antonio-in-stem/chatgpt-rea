import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass use-visible-settings-sections source');
const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function body(name){const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);}
const initializers=['Ii','zi','Hi','Wi','qi','Xi','Qi','ta','ca'];
const bodies=initializers.map(body);
const vars=[...new Set(bodies.flatMap(b=>[...b.matchAll(/\(([\w$]+) = /g)].map(m=>m[1])))];
const start=source.indexOf('ua = {'),end=source.indexOf('}));',start)+1,registry=source.slice(start,end);
const local=['Fi','Ri','Vi','Ui','Ki','Yi','Zi','ea','sa'];
const refs=[...new Set([...registry.matchAll(/:\s*([A-Za-z_$][\w$]*)\b/g)].map(m=>m[1]).filter(n=>!local.includes(n)))];
for(const extra of ['H','lt','o','E'])if(!refs.includes(extra))refs.push(extra);
fs.writeFileSync(path.join(root,'src/SettingsArtwork.js'),`// Original local SVG initializers and section/platform registry. No substitute artwork.
export function createSettingsLocalArtwork(React){
const e=fn=>fn,D=()=>{},h=React.createElement,a=()=>({jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)});
let ${vars.filter(n=>!initializers.includes(n)).join(',')};
${bodies.join('\n')}
${initializers.map(n=>n+'();').join('\n')}
return {${local.join(',')}};
}
export function createSettingsArtworkRegistry({React,sharedArtwork}){
const required=${JSON.stringify(refs)};
for(const key of required)if(sharedArtwork?.[key]==null)throw new TypeError('Missing original settings artwork: '+key);
const {${refs.join(',')}}=sharedArtwork;
const {${local.join(',')}}=createSettingsLocalArtwork(React);
let ua;
${registry};
${body('la')}
return {getSectionIcon:la,sections:ua};
}
`);
const imports={};for(const m of source.matchAll(/import \{([\s\S]*?)\} from ["']([^"']+)["'];/g))for(const b of m[1].matchAll(/([\w$]+) as ([\w$]+)/g))imports[b[2]]={export:b[1],module:m[2]};
fs.writeFileSync(path.join(root,'settings-artwork-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),initializers,localSymbols:local,requiredSharedSymbols:refs,requiredBindings:Object.fromEntries(refs.map(n=>[n,imports[n]??{localFunction:n,pending:true}])),registrySha256:createHash('sha256').update(registry).digest('hex'),limits:['Shared artwork aliases must be resolved from original imports before full registry integration','Local SVGs and registry recovered; full original settings sidebar remains pending','No screenshot parity claim']},null,2)+'\n');
