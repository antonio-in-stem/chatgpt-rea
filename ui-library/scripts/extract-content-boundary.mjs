import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const base=process.argv[2];if(!base)throw Error('Pass readable assets directory');const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),files=['app-initial-b8e1c8014bb4.js','app-shared-737655e1fb23.js'],symbols=['iDi','pCi'];
const records=files.map((file,index)=>{const source=fs.readFileSync(path.join(base,file),'utf8'),symbol=symbols[index],start=source.indexOf('function '+symbol+'(');if(start<0)throw Error(symbol);return {file,symbol,sha256:createHash('sha256').update(source).digest('hex'),body:source.slice(start,start+source.slice(start).search(/^}\r?$/m)+1)};});
fs.writeFileSync(path.join(root,'src/ContentBoundary.js'),`// Original content bounds lifecycle and ref merger. The host owns storage of bounds.
export function createContentBoundary({React,motion:Kl,useStore,reportBounds:rve,useStableCallback:Dd,compilerRuntime=React.__COMPILER_RUNTIME}){
for(const [name,value] of Object.entries({useStore,reportBounds:rve,useStableCallback:Dd}))if(typeof value!=='function')throw new TypeError(name+' adapter required');
if(!Kl?.div)throw new TypeError('motion.div required');
const sDi=compilerRuntime,pW=React,mW={jsx:(type,props)=>React.createElement(type,props)},q=Symbol('bounds-store'),Di=()=>useStore(),t=fn=>fn;let M5;
${records[1].body}
pCi();const Fd=M5;
${records[0].body}
return iDi;
}
`);
fs.writeFileSync(path.join(root,'content-boundary-manifest.json'),JSON.stringify({sources:records.map(({body,...r})=>({...r,bodySha256:createHash('sha256').update(body).digest('hex')})),limits:['Bounds store and reportBounds effect are explicit host adapters','Stable-callback hook and original motion runtime supplied by caller','ResizeObserver branch reports when observer fires; fallback reports immediately, as distributed','No complete app-shell integration or screenshot parity claim']},null,2)+'\n');
