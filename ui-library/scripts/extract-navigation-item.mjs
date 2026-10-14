import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass app-initial source');
const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function body(name){const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);}
const prelude=`const h=React.createElement,Ear=compilerRuntime,ng=mergeClasses,WF={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children),Fragment:React.Fragment};`;
const focus=source.match(/Oar = (`[^`]+`)/)?.[1];if(!focus)throw Error('Missing original focus classes');
fs.writeFileSync(path.join(root,'src/NavigationItem.js'),`// Original VF implementation. Router and artwork remain caller-owned adapters.
export function createNavigationItem({React,mergeClasses,Link,ResponsiveIcon,AnimatedIcon,DisclosureIcon,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
${prelude}
const Dar=React,ih=Link,rm=ResponsiveIcon,par=AnimatedIcon,dle=DisclosureIcon,$=props=>formatMessage(props),Oar=${focus};
${body('VF')}
return function NavigationItem(props){
if(props.to!=null&&props.interactive!==false&&!Link)throw Error('NavigationItem requires Link');
if(props.iconAssetSource!=null&&!ResponsiveIcon)throw Error('NavigationItem requires ResponsiveIcon');
if(props.animatedIcon!=null&&props.icon!=null&&!React.isValidElement(props.icon)&&!AnimatedIcon)throw Error('NavigationItem requires AnimatedIcon');
if(props.disclosure&&!DisclosureIcon)throw Error('NavigationItem requires DisclosureIcon');
return VF(props);
};
}
export function createNavigationList({React,mergeClasses,compilerRuntime=React.__COMPILER_RUNTIME}){
${prelude}
${body('HF')}
return HF;
}
`);
fs.writeFileSync(path.join(root,'navigation-item-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),symbols:['VF','HF'],adapters:['React/compiler runtime','Class merger','Router, responsive and animated artwork, disclosure icon','Localization'],limits:['Whole-window screenshot parity remains unverified']},null,2)+'\n');
