import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass readable shared source');const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),defs=[...source.matchAll(/^function ([\w$]+)\(/gm)],exports=new Map([...source.slice(source.lastIndexOf('export {')).matchAll(/([\w$]+) as ([\w$]+)/g)].map(x=>[x[2],x[1]]));
const entries=[],records=[];
for(const [alias,exportName] of Object.entries({Icon16:'Dtt',Icon20:'Ott',FilterIcon:'Xet',SelectedAsset:'vpt'})){const symbol=exports.get(exportName),isAsset=alias==='SelectedAsset',i=source.indexOf(symbol+' = $('),preset=isAsset?symbol:source.slice(i+symbol.length+5).split(')')[0],pos=source.indexOf(preset+' = Z({');if(pos<0)throw Error('Missing '+alias);const def=defs.findLast(d=>d.index<pos),body=source.slice(def.index,source.indexOf('\n}',def.index)+2);entries.push({preset,initializer:def[1],body});records.push({alias,exportName,symbol,preset,isAsset});}
const n=exports.get('OD'),start=source.indexOf(n+' = ')+n.length+3;let end=start,depth=0,quote=null;
for(;end<source.length;end++){const c=source[end];if(quote){if(c==='\\'){end++;continue;}if(c===quote)quote=null;continue;}if('`"\''.includes(c)){quote=c;continue;}if('([{'.includes(c))depth++;else if(')]}'.includes(c)){if(depth===0)break;depth--;}else if((c===','||c===';')&&depth===0)break;}
const svg=source.slice(start,end);if(!svg.startsWith('(e) =>'))throw Error('Unexpected default SVG');
fs.writeFileSync(path.join(root,'src/SettingsHostSharedArtwork.js'),`// Exact shared asset initializers and default remote-host SVG.
export function createSettingsHostSharedArtwork({React,AssetIcon}){
const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false}),TEi={jsx:(type,props)=>React.createElement(type,props),jsxs:(type,props)=>React.createElement(type,props,...props.children)};
let ${entries.map(e=>e.preset).join(',')};
${entries.map(e=>e.body).join('\n')}
${entries.map(e=>e.initializer+'();').join('\n')}
const DefaultIcon=${svg};
return {DefaultIcon,${records.map(r=>r.alias+':'+(r.isAsset?r.preset:'AssetIcon.fromPreset('+r.preset+')')).join(',')}};
}
`);
fs.writeFileSync(path.join(root,'settings-host-shared-artwork-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),records,initializers:entries.map(({body,...e})=>({...e,sha256:createHash('sha256').update(body).digest('hex')})),defaultIcon:{symbol:n,sha256:createHash('sha256').update(svg).digest('hex')},limits:['Asset descriptor normalization uses the existing recovered AssetIcon adapter','No full-screen visual parity claim']},null,2)+'\n');
