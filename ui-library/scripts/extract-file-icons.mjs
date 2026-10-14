import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8');
const begin=source.indexOf('(ROi = {'),finish=source.indexOf('}));',begin)+1;
const table=source.slice(begin+'(ROi = '.length,finish);
const symbols=[...new Set([...table.matchAll(/(?:16|20): ([\w$]+)/g)].map(m=>m[1]))];
// Original text icon uses the separate POi table.
for(const n of ['OOi','h$'])symbols.push(n);
const defs=symbols.map(symbol=>{const assignment=source.indexOf('('+symbol+' = Z({');if(assignment<0)throw Error('Missing asset '+symbol);const start=source.lastIndexOf('function ',assignment),end=start+source.slice(start).search(/^}\r?$/m)+1;return {symbol,name:source.slice(start).match(/^function ([\w$]+)/)[1],body:source.slice(start,end)};});
const output=`// Original file glyph presets and lookup table; full branded renderer remains separate.
import {classNames} from './classNames.js';
const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
let ${symbols.join(',')};
${defs.map(d=>d.body).join('\n')}
${defs.map(d=>d.name+'();').join('')}
export const fileIconAssets=${table};
export const textFileIconAssets={16:OOi,20:h$};
// Adapter for the recovered 16px branded / 16-20px monochrome branches only.
export function createFileTypeGlyph({React,AssetIcon}){
 return function FileTypeGlyph({iconKey,size=16,variant='branded',className,...props}){
  if(size!==16&&size!==20)throw new RangeError('Extracted glyph sizes are 16 and 20');
  if(variant!=='branded'&&variant!=='monochrome')throw new RangeError('Unknown file glyph variant');
  if(size===20&&variant==='branded'&&iconKey!=='text')throw new RangeError('20px branded files require the separate original artwork renderer');
  const entry=iconKey==='text'?{assets:textFileIconAssets,className:'text-file-document'}:fileIconAssets[iconKey];
  if(!entry)return null;
  return React.createElement(AssetIcon,{...props,className:classNames(variant==='branded'&&entry.className,className),asset:entry.assets[size]});
 };
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/FileTypeGlyph.js'),output);
fs.writeFileSync(path.join(root,'file-icons-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),tableSha256:createHash('sha256').update(table).digest('hex'),assets:defs.map(({symbol,name,body})=>({symbol,initializer:name,bodySha256:createHash('sha256').update(body).digest('hex')})),transformation:'Original preset initializer bodies and ROi lookup copied. Trusted fixed assets normalized; thin adapter exposes supported source branches explicitly.',limits:['Full branded/provider artwork renderer pending','Unsupported keys render no invented fallback','Demo explicitly uses original 16px branded variant']},null,2)+'\n');
