// Copy authoritative CSS and its local URL dependencies without rewriting bytes.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const input=path.resolve(process.argv[2]||'');
if(!process.argv[2])throw Error('Pass the extracted webview/assets directory');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'styles','original');
const names=['app-shared-9a94b907ed47.css','app-initial-99e8b4b455fa.css','app-primary-6a01c6b721a4.css'];
const files=new Map();
for(const name of names){
 const bytes=fs.readFileSync(path.join(input,name));files.set(name,bytes);
 const css=bytes.toString('utf8');
 if(/@import\b/.test(css))throw Error('Unexpected nested CSS import: review before extraction');
 for(const match of css.matchAll(/url\(([^)]+)\)/g)){
  const url=match[1].trim().replace(/^['"]|['"]$/g,'');
  if(url.startsWith('data:')||url.startsWith('#'))continue;
  if(!/^\.\/[A-Za-z0-9_.-]+$/.test(url))throw Error('Unreviewed CSS URL '+url);
  const asset=url.slice(2);files.set(asset,fs.readFileSync(path.join(input,asset)));
 }
}
fs.mkdirSync(out,{recursive:true});
const records=[];
for(const [name,bytes] of files){
 const output=path.join(out,name);
 if(fs.existsSync(output)&&!fs.readFileSync(output).equals(bytes))throw Error('Refusing changed output '+name);
 fs.writeFileSync(output,bytes);
 records.push({file:name,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
fs.writeFileSync(path.join(root,'styles','original.css'),names.map(n=>`@import "./original/${n}";`).join('\n')+'\n');
fs.writeFileSync(path.join(root,'styles','manifest.json'),JSON.stringify({method:'Byte-identical shared CSS baseline plus local URL dependencies; not a minimal per-component CSS closure',entrypoints:names,files:records,limitations:['Global resets and app-specific selectors remain present','Theme/root attributes and component visual parity require browser verification','Preserve original notices; extraction does not grant a new license']},null,2)+'\n');
console.log(JSON.stringify({files:records.length,bytes:records.reduce((n,r)=>n+r.bytes,0)}));
