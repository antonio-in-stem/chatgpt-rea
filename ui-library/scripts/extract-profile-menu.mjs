import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[3])throw Error('Pass recovered initial and shared sources');
const source=fs.readFileSync(process.argv[2],'utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const iconStart=shared.indexOf('function Bki('),iconBody=shared.slice(iconStart,iconStart+shared.slice(iconStart).search(/^}\r?$/m)+1);
const def=name=>{const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const symbols=['Lli','QNo'],body=symbols.map(def).join('\n');
const start=source.indexOf('nPo = (0, k1.jsx)(Pm.Message,'),end=source.indexOf('\n      }))',start)+9;
if(start<0||end<start)throw Error('Missing original loading initializer');
const loading=source.slice(start,end);
const output=`// Recovered profile dropdown controller. Menu items and data access are explicit boundaries.
export function createProfileMenu({React,Dropdown:Bi,Button:Ir,Tooltip:Pn,MenuMessage,ProfileMenuItems,prefetchItems,formatMessage=message=>message.defaultMessage,onOpen=()=>{},compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!Bi||!Ir||!Pn||!MenuMessage||!ProfileMenuItems||typeof prefetchItems!=='function'||!compilerRuntime?.c)throw new TypeError('ProfileMenu requires original visual components, items/prefetch adapters and compiler runtime');
 const h=React.createElement,k1={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},ePo=compilerRuntime,tPo=React;
 const t=fn=>fn,o=()=>{},K=()=>k1;let Rki,zki;
${iconBody}
 Bki();const X1e=zki;
 const Context=React.createContext(null),empty=Object.freeze({}),queryEmpty=Object.freeze({data:undefined});
 const read=()=>{const snapshot=React.useContext(Context);if(!snapshot)throw Error('ProfileMenu requires ProfileMenuProvider with a snapshot');return snapshot;};
 const q='local',k='profile-menu-open',v$a='usage',Di=()=>read(),e_=()=>read().enabled===true,gp=()=>read().auth??empty,PB=()=>read().accountQuery??queryEmpty,Zs=key=>{const s=read();return key===null?undefined:s.usage;};
 const Ap=(snapshot,event,details)=>onOpen(details,snapshot),$=message=>formatMessage(message),Pm={Message:MenuMessage};
 function YNo(props){return h(ProfileMenuItems,props);}YNo.prefetch=prefetchItems;
 let ${loading};
${body}
 function ProfileMenuProvider({snapshot,children}){if(!snapshot)throw new TypeError('ProfileMenuProvider requires a snapshot');return h(Context.Provider,{value:snapshot},children);}
 return {ProfileMenu:QNo,ProfileMenuProvider,isCurrentAccountUsage:Lli};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),hash=s=>createHash('sha256').update(s).digest('hex');
fs.writeFileSync(path.join(root,'src/ProfileMenu.js'),output);
fs.writeFileSync(path.join(root,'profile-menu-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sha256:hash(source),symbols,shared:path.basename(process.argv[3]),sharedSha256:hash(shared),sharedSymbols:['Bki'],iconSha256:hash(iconBody),bodySha256:hash(body),loadingInitializerSha256:hash(loading),transformation:'QNo and Lli bodies and nPo loading markup unchanged. React, menu and snapshot hooks injected. Focus/hover invoke required caller prefetch; telemetry is local onOpen callback.',limits:['ProfileDropdownItems Yi contents are not yet recovered into this module','ZNo account prefetch wrapper is not included; local snapshots supply data','Lazy item loading/error recovery must be supplied by consumer adapter','Full-window visual parity not established']},null,2)+'\n');
