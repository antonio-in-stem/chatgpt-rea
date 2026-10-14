import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass recovered shared module');
const source=fs.readFileSync(process.argv[2],'utf8'),start=source.indexOf('function B5('),init=source.indexOf('function qwi(',start),end=init+source.slice(init).search(/^}\r?$/m)+1;
if(start<0||init<0||end<=init)throw Error('Missing descriptor boundaries');
const body=source.slice(start,end);
const output=`// Generated original filename/MIME classification. See file-descriptor-manifest.json.
const t=fn=>fn;
${body}
qwi();
export {pwi as describeFile,B5 as fileExtension};
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/fileDescriptor.js'),output);
fs.writeFileSync(path.join(root,'file-descriptor-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),startSymbol:'B5',endSymbol:'qwi',bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Entire original classification block, tables and initializer unchanged; bundle initializer wrapper adapted, semantic exports added.',limits:['Describes icon keys; original artwork renderer is separate','Labels are original type labels, not invented localized display names']},null,2)+'\n');
