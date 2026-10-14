import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass readable assets directory');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),manifest=JSON.parse(fs.readFileSync(path.join(root,'settings-artwork-manifest.json'),'utf8'));
const file='app-shared-737655e1fb23.js',source=fs.readFileSync(path.join(dir,file),'utf8');
const exports=new Map([...source.matchAll(/^  ([\w$]+) as ([\w$]+),?$/gm)].map(m=>[m[2],m[1]]));
const defs=[...source.matchAll(/^function ([\w$]+)\(/gm)];
const records=[],presets=new Map();
function add(symbol){const i=source.indexOf(symbol+' = Z({');if(i<0)return false;const def=defs.findLast(d=>d.index<i),end=source.indexOf('\n}',def.index)+2,body=source.slice(def.index,end);if(!body.includes('Q()'))throw Error('Unexpected asset initializer '+symbol);presets.set(symbol,{symbol,initializer:def[1],body});return true;}
for(const [alias,binding] of Object.entries(manifest.requiredBindings)){
if(binding.module!=='./'+file)continue;
const symbol=exports.get(binding.export);if(!symbol)throw Error('Missing export '+binding.export);
if(add(symbol)){records.push({alias,symbol,kind:'preset'});continue;}
const i=source.indexOf(symbol+' = $(');if(i>=0){const preset=source.slice(i+symbol.length+5).split(')')[0];if(add(preset))records.push({alias,symbol,preset,kind:'component'});}
}
const entries=[...presets.values()];
fs.writeFileSync(path.join(root,'src/SettingsSharedArtwork.js'),`// Original shared asset initializers used by settings; remaining component-only SVGs are separate.
export function createSettingsSharedArtwork(AssetIcon){
if(!AssetIcon?.fromPreset)throw new TypeError('Original AssetIcon renderer required');
const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
let ${entries.map(r=>r.symbol).join(',')};
${entries.map(r=>r.body).join('\n')}
${entries.map(r=>r.initializer+'();').join('\n')}
return {${records.map(r=>r.alias+':'+(r.kind==='preset'?r.symbol:'AssetIcon.fromPreset('+r.preset+')')).join(',')}};
}
`);
fs.writeFileSync(path.join(root,'settings-shared-artwork-manifest.json'),JSON.stringify({source:file,sha256:createHash('sha256').update(source).digest('hex'),records,initializers:entries.map(({body,...r})=>({...r,sha256:createHash('sha256').update(body).digest('hex')})),pending:manifest.requiredSharedSymbols.filter(a=>!records.some(r=>r.alias===a)),limits:['Only asset-backed bindings recovered in this pass','Original component-only SVGs and extension selector remain pending','Asset descriptor normalization matches prior recovered artwork adapters; no screenshot parity claim']},null,2)+'\n');
console.log(JSON.stringify({bindings:records.length,presets:entries.length}));
