import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass app-initial source');const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),symbols=['ups','dps','fps'];
const body=symbols.map(n=>{const i=source.indexOf('function '+n+'(');return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);}).join('\n');
fs.writeFileSync(path.join(root,'src/ListNavigation.js'),`// Original list keyboard/highlight hook. Platform and stable-callback hooks are explicit adapters.
export function createListNavigation({React,isMac:Qh,useStableCallback:Dd,compilerRuntime=React.__COMPILER_RUNTIME}){
if(typeof Qh!=='function'||typeof Dd!=='function'||!React.useEffectEvent)throw new TypeError('List navigation requires platform, stable callback and React effect-event support');
const pps=compilerRuntime,o3=React;
${body}
return dps;
}
`);
fs.writeFileSync(path.join(root,'list-navigation-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),symbols,adapters:['Platform predicate','Stable callback hook','React compiler runtime'],limits:['Complete settings sidebar remains pending','No whole-screen visual parity claim']},null,2)+'\n');
