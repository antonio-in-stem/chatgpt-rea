import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const symbols=['pCi','oji','sji','Vji','Hji'],body=symbols.map(def).join('\n');
const output=`// Original scroll area and menu overlay portal wrappers.
import {classNames as q} from './classNames.js';
export function createMenuInfrastructure({React,Layer:hb,OverlayPortal:h5,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!hb||!h5||!compilerRuntime?.c)throw new TypeError('Menu infrastructure requires original layer, overlay portal and compiler runtime');
 const t=fn=>fn,m7=compilerRuntime,cji=compilerRuntime,h7=React,l7=React,Qji=React.createContext(undefined);
 const g7={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},u7=g7;
 let M5,rji,iji,aji;
${body}
 pCi();oji();
 return {ScrollArea:sji,Portal:Vji,ModalLayer:Hji,PortalContainerContext:Qji};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/MenuInfrastructure.js'),output);
fs.writeFileSync(path.join(root,'menu-infrastructure-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols,bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original scroll/fade/peek measurement, observers, merged refs and portal wrappers retained; React, original layer and tooltip overlay portal injected.',limits:['Matched screenshot comparison pending','Nested submenu portal container integration pending']},null,2)+'\n');
