import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass readable assets directory');const file='app-initial-b8e1c8014bb4.js',source=fs.readFileSync(path.join(dir,file),'utf8'),shared=fs.readFileSync(path.join(dir,'app-shared-737655e1fb23.js'),'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),symbols=['UF','Mar','Nar','Par','Far'];
const bodies=symbols.map(n=>{const i=source.indexOf('function '+n+'(');return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);});const transition=shared.match(/uCi = (\{ duration: [^}]+\})/)[1];
fs.writeFileSync(path.join(root,'src/NavigationSurfaces.js'),`// Original navigation section and header surfaces.
import {createNavigationList} from './NavigationItem.js';
export function createNavigationSurfaces({React,mergeClasses:ng,motion:Kl,AnimatePresence:Yp,MotionConfig:Ege,ContextMenu:jc,useReducedMotion:ft,useVisualScale:Ef,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!Kl?.div||!Yp||!Ege||!ft||!Ef)throw new TypeError('Navigation surfaces require motion and preference hooks');
const h=React.createElement,Ear=compilerRuntime,Lar=compilerRuntime,WF={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Rar=WF,HF=createNavigationList({React,mergeClasses:ng,compilerRuntime}),Aar={header:'_header_cpwja_2'},hWe=${transition};
${bodies.join('\n')}
return {NavigationSection:UF,NavigationHeader:Mar,NavigationHeaderRow:Nar,NavigationHeaderActions:Par,NavigationHeading:Far};
}
`);
fs.writeFileSync(path.join(root,'navigation-surfaces-manifest.json'),JSON.stringify({source:file,sha256:createHash('sha256').update(source).digest('hex'),symbols,transition:{source:'app-shared-737655e1fb23.js',symbol:'uCi',literal:transition},limits:['Context menu adapter required when menuRef is supplied','Host motion/scale preferences remain explicit hooks','Complete settings sidebar not included']},null,2)+'\n');
