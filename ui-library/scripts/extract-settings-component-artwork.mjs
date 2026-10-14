import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass readable assets directory');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),m=JSON.parse(fs.readFileSync(path.join(root,'settings-artwork-manifest.json'))),pending=JSON.parse(fs.readFileSync(path.join(root,'settings-shared-artwork-manifest.json'))).pending,cache=new Map(),records=[];
function expression(s,start){let depth=0,quote=null;for(let i=start;i<s.length;i++){let c=s[i];if(quote){if(c==='\\'){i++;continue;}if(c===quote)quote=null;continue;}if(c==='`'||c==='"'||c==="'"){quote=c;continue;}if('([{'.includes(c))depth++;else if(')]}'.includes(c)){if(depth===0)return s.slice(start,i);depth--;}else if((c===','||c===';')&&depth===0)return s.slice(start,i);}throw Error('Unclosed expression');}
m.requiredBindings.hi={module:"./browser-d7147f673b1a.js",export:"t"};
for(const alias of [...pending,"hi"]){const b=m.requiredBindings[alias];if(!b.module)continue;let source=cache.get(b.module);if(!source){source=fs.readFileSync(path.join(dir,b.module),'utf8');cache.set(b.module,source);}const exports=new Map([...source.slice(source.lastIndexOf('export {')).matchAll(/([\w$]+) as ([\w$]+)/g)].map(x=>[x[2],x[1]])),symbol=exports.get(b.export);if(!symbol)throw Error('Missing '+alias);const prefix=symbol+' = ',i=source.indexOf(prefix);if(i<0)throw Error('No assignment '+symbol);const code=expression(source,i+prefix.length);if(!code.startsWith('(e) =>')||!code.includes('`svg`'))throw Error('Not simple SVG '+alias);const runtime=[...new Set([...code.matchAll(/\(0, ([\w$]+)\.jsx[s]?\)/g)].map(x=>x[1]))];records.push({alias,symbol,module:b.module,runtime,code});}
fs.writeFileSync(path.join(root,'src/SettingsComponentArtwork.js'),`// Original SVG component expressions; only their bundle JSX runtimes are rebound.
export function createSettingsComponentArtwork(React){
const h=React.createElement,runtime={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
${records.map(r=>`const ${r.alias}=(()=>{const ${r.runtime.map(n=>n+'=runtime').join(',')};return ${r.code};})();`).join('\n')}
return {${records.map(r=>r.alias).join(',')}};
}
`);
fs.writeFileSync(path.join(root,'settings-component-artwork-manifest.json'),JSON.stringify({sources:[...cache].map(([file,s])=>({file,sha256:createHash('sha256').update(s).digest('hex')})),records:records.map(({code,...r})=>({...r,sha256:createHash('sha256').update(code).digest('hex')})),pending:[],extension:{symbol:'na',source:m.source,adapter:'getBrowserMetadata'},limits:['Browser metadata remains caller-owned','SVG expression identity does not prove complete screen parity']},null,2)+'\n');
const original=fs.readFileSync(path.join(dir,m.source),'utf8'),start=original.indexOf('function na('),body=original.slice(start,start+original.slice(start).search(/^}\r?$/m)+1);
fs.writeFileSync(path.join(root,'src/SettingsExtensionArtwork.js'),`// Original browser extension image/fallback selection.
import {createSettingsComponentArtwork} from './SettingsComponentArtwork.js';
export function createSettingsExtensionArtwork({React,getBrowserMetadata:Ke,compilerRuntime=React.__COMPILER_RUNTIME}){
if(typeof Ke!=='function')throw new TypeError('Browser metadata provider required');
const ra=compilerRuntime,h=React.createElement,ia={jsx:(type,props)=>h(type,props)},hi=createSettingsComponentArtwork(React).hi;
${body}
return na;
}
`);
console.log(records.length);
