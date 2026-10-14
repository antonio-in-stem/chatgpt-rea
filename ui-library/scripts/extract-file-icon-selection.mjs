import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const start=source.indexOf('function '+name+'(');if(start<0)throw Error(name);return source.slice(start,start+source.slice(start).search(/^}\r?$/m)+1);};
const start=source.indexOf('function MTi('),end=source.indexOf('function wEi(')+def('wEi').length;
const providerBlock=source.slice(start,end),symbols=['UEi','WEi','KEi','qEi','YEi','JEi','QEi'];
const body=providerBlock+'\n'+symbols.map(def).join('\n');
const output=`// Original provider/file icon resolution. Artwork rendering is separate.
import {describeFile as pwi,fileExtension as B5,fileMimeOverride as fwi} from './fileDescriptor.js';
const t=fn=>fn,qwi=()=>{};
let GEi,XEi,ZEi;
${body}
QEi();
export {qEi as resolveFileIcon,YEi as describeFileArtwork,VTi as resolveFileProvider};
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/fileIconSelection.js'),output);
fs.writeFileSync(path.join(root,'file-icon-selection-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),providerStart:'MTi',providerEnd:'wEi',symbols,bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original provider parsing block and icon resolver bodies, original initializers; shared classification imported from prior extraction.',limits:['Resolver returns document or provider brand selection; full artwork renderer remains separate','No cloud connection or account synchronization implemented']},null,2)+'\n');
