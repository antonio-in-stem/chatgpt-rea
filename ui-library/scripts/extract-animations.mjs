// Reproducible extraction from the already recovered/formatted production modules.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
if(!process.argv[2])throw Error('Pass recovered readable/assets');
const input=path.resolve(process.argv[2]);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'animations');
const names={hello:'hello-32885a5730fb.js',loader:'loader-b7cf9a60c18f.js',memory:'memory-footnote-icon-aabfb86bd7e0.js','sidebar-finances':'sidebar-finances-icon-60f11149b77a.js','sidebar-images':'sidebar-images-icon-515d5207fd58.js','sidebar-library':'sidebar-library-icon-a6e81a086025.js','sidebar-more':'sidebar-more-icon-d710071877e6.js','sidebar-new-chat':'sidebar-new-chat-icon-cbd5d32d0c8e.js','sidebar-plugins':'sidebar-plugins-icon-8d185e42c466.js','sidebar-projects':'sidebar-projects-icon-55225a1c26e6.js','sidebar-search':'sidebar-search-icon-dee5b5ecb91c.js','sidebar-tasks':'sidebar-tasks-icon-a5050e1add74.js'};
const hash=x=>createHash('sha256').update(x).digest('hex');
const records=[],outputs=new Map();
for(const [key,file] of Object.entries(names)){
 const bytes=fs.readFileSync(path.join(input,file)),source=bytes.toString('utf8');
 const header=/^import \{ n as e \} from "\.\/rolldown-runtime-2d059c5e81f4\.js";\r?\n/;
 if(!header.test(source))throw Error('Unexpected imports '+file);
 const match=source.match(/export \{([\s\S]*?)\};/);
 const symbol=match?.[1].match(/(\w+) as default/)?.[1];
 if(!symbol)throw Error('Missing default '+file);
 const body=source.replace(header,'').replace(match[0],'').replace(/\/\/# sourceMappingURL=.*$/m,'');
 // Reviewed data-only generated modules; no filesystem, network, process or require in this context.
 const value=vm.runInNewContext(body+';'+symbol,{e:fn=>fn},{timeout:1000});
 const json=JSON.stringify(value);
 outputs.set(key+'.js','// Recovered animation data; see manifest.json for source and digest.\nexport default '+json+';\n');
 records.push({key,source:file,sourceSha256:hash(bytes),dataSha256:hash(json),width:value.w,height:value.h,frameRate:value.fr,inPoint:value.ip,outPoint:value.op});
}
const file='index.umd-9aa69e0b1a1a.js',bytes=fs.readFileSync(path.join(input,file));
let body=bytes.toString('utf8');
const imports=/^import \{ t as __commonJSMin \} from "\.\/rolldown-runtime-2d059c5e81f4\.js";\r?\nimport \{ PCn as require_react \} from "\.\/app-shared-737655e1fb23\.js";\r?\n/;
if(!imports.test(body)||!body.includes('export { require_index_umd as t };'))throw Error('Runtime boundary changed');
body=body.replace(imports,'').replace('export { require_index_umd as t };','').replace(/\/\/# sourceMappingURL=.*$/m,'');
outputs.set('runtime.js',`// Shipped Lottie 5.13.0 and React adapter; only module boundaries replaced.\n// Extracted code retains its original ownership; see manifest.json.\nexport function createOriginalLottieRuntime(React){\nconst require_react=()=>React;\nconst __commonJSMin=(e,t)=>()=> (t || (e((t={exports:{}}).exports,t),e=null),t.exports);\n${body}\nreturn require_index_umd();\n}\n`);
outputs.set('index.js',Object.keys(names).map((key,i)=>`import a${i} from './${key}.js';`).join('\n')+'\nexport {createOriginalLottieRuntime} from \'./runtime.js\';\nexport const animations={'+Object.keys(names).map((key,i)=>JSON.stringify(key)+':a'+i).join(',')+'};\n');
const manifest={source:'Recovered production assets from OpenAI.Codex_26.1007.2314.0',animations:records,runtime:{source:file,sourceSha256:hash(bytes),bodySha256:hash(body),engineVersion:'5.13.0',transformation:'Original formatted body retained. React injected into a factory; CommonJS helper copied from rolldown runtime. Imports, export and unavailable source-map comment removed.'},limits:['Runtime requires a browser DOM for playback','Navigation hover/focus wrapper and fallback glyph registry still require extraction','Data/runtime recovery does not establish rendered pixel parity','No new license granted by extraction']};
outputs.set('manifest.json',JSON.stringify(manifest,null,2)+'\n');
fs.mkdirSync(out,{recursive:true});
// Validate every existing output before changing any file.
for(const [file,body] of outputs){const target=path.join(out,file);if(fs.existsSync(target)&&fs.readFileSync(target,'utf8')!==body)throw Error('Refusing changed output '+file);}
for(const [file,body] of outputs)fs.writeFileSync(path.join(out,file),body);
console.log(JSON.stringify({animations:records.length,engine:manifest.runtime.engineVersion}));
