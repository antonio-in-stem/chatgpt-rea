import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const base=process.argv[2];if(!base)throw Error('Pass readable assets');
const names=['app-initial-b8e1c8014bb4.js','app-shared-737655e1fb23.js'],sources=names.map(n=>fs.readFileSync(path.join(base,n),'utf8'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const symbols=['VMs','qMs','JMs','ZJa','QJa','$Ja','eYa','sYa'];
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/SettingsContent.js'),`// Original settings content layout, navigation target effects and page header.
import {classNames as ng} from './classNames.js';
export function createSettingsContent({React,motion:Kl,useTransform:Vi,useLayoutEnvironment:Qa,TitleBarContext,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!Kl?.div||typeof Vi!=='function'||typeof Qa!=='function')throw new TypeError('SettingsContent requires motion, useTransform and the host layout subscription adapter');
const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
const HMs=compilerRuntime,YMs=compilerRuntime,tYa=compilerRuntime,lYa=compilerRuntime,XMs=React,nYa=React,D6=runtime,O6=runtime,SZ=runtime,wZ=runtime,e=fn=>fn,t=e;
const GMs=React.createContext(null),lC=TitleBarContext??React.createContext(null),KRt=Symbol('host layout subscription'),ru=[0.23,1,0.32,1];
// In qMs the kG header path is guarded by ` + '`let k = O && !1`' + ` in the shipped body.
const kG={};
let RJa,zJa,BJa,VJa,HJa,UJa,WJa,GJa,KJa,qJa,JJa,YJa,XJa,xZ,M5;
${def(sources[1],'pCi')}
pCi();const Fd=M5;
${symbols.map(n=>def(sources[0],n)).join('\n')}
ZJa();
return {SettingsContent:qMs,SettingsNavigationTarget:JMs,SettingsPageHeading:VMs,PageHeader:QJa,PageToolbar:eYa,StickyControls:sYa};
}
`);
fs.writeFileSync(path.join(root,'settings-content-manifest.json'),JSON.stringify({sources:names.map((file,i)=>({file,sha256:createHash('sha256').update(sources[i]).digest('hex'),symbols:i===0?symbols:['pCi']})),limits:['Host layout subscription supplied as explicit adapter; returned value unused in qMs','Settings sidebar/navigation controller and outer workspace shell not included','Motion runtime and optional titlebar inset context supplied by caller','No whole-window screenshot parity claim']},null,2)+'\n');
