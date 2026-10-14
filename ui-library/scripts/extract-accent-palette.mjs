import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass readable app-initial source');const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),names=['BUr','VUr','HUr','$B'];
const records=names.map(symbol=>{const start=source.indexOf('function '+symbol+'(');if(start<0)throw Error('Missing '+symbol);return {symbol,body:source.slice(start,start+source.slice(start).search(/^}\r?$/m)+1)};});
fs.writeFileSync(path.join(root,'src/AccentPalette.js'),`// Distributed accent normalization, palette and theme resolution; bodies unchanged.
const e=fn=>fn;
let UUr,WUr,GUr,KUr;
${records.map(r=>r.body).join('\n')}
$B();
export {BUr as normalizeAccent,VUr as serializeAccent,HUr as resolveAccent,UUr as accentClasses,WUr as accentOrder,GUr as accentColors,KUr as legacyAccentColors};
`);
fs.writeFileSync(path.join(root,'accent-palette-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),records:records.map(({symbol,body})=>({symbol,sha256:createHash('sha256').update(body).digest('hex')})),limits:['Pure distributed palette logic; callers supply the current resolved light/dark theme','serializeAccent expects a normalized palette name, matching the original contract','No full-screen visual parity claim']},null,2)+'\n');
