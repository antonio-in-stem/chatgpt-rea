import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[3])throw Error('Pass initial and shared sources');
const initial=fs.readFileSync(process.argv[2],'utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const def=(s,name)=>{const i=s.indexOf('function '+name+'(');if(i<0)throw Error(name);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const symbols=['HNo','UNo','hNo','DNo','xRt','CRt','iC','iPo','aPo','oPo'],sharedSymbols=['u9n','f9n'];
const body=symbols.map(n=>def(initial,n)).join('\n'),artwork=sharedSymbols.map(n=>def(shared,n)).join('\n');
const output=`// Original profile controller with explicit local snapshot/menu boundaries.
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
export function createProfileControl({React,LegacyButton:Wa,Avatar:$Mo,AssetIcon:cp,ProfileMenu:ZNo,useImageSource:Uco,formatMessage=message=>message.defaultMessage,DebugControl=()=>null,DeviceControl=()=>null,motionPreference,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!Wa||!$Mo||!cp||!ZNo||!Uco||!compilerRuntime?.c)throw new TypeError('ProfileControl requires original renderers, a menu adapter, image-source hook and compiler runtime');
 const h=React.createElement,runtime={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
 const sPo=compilerRuntime,ONo=compilerRuntime,gNo=compilerRuntime,wRt=compilerRuntime,cPo=React,A1=runtime,kNo=runtime,_No=runtime,ERt=runtime,ft=createMotionPreference(React,motionPreference);
 const e=fn=>fn,t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 let gRt,_Rt,vRt,yRt,bRt,l9n,d9n;
${artwork}
 u9n();f9n();const Qde=d9n,_he=l9n;
 const Context=React.createContext(null),read=()=>{const s=React.useContext(Context);if(!s)throw Error('Missing ProfileControl snapshot');return s;};
 const empty=Object.freeze({}),queryEmpty=Object.freeze({data:undefined,isPending:false}),intl={formatMessage};
 const MG='modelProvider',vMo='user',v$a='usage',CC='sidebarWidth',as='local';
 const zd=()=>intl,e_=()=>read().ambientUsageEnabled===true,gp=()=>read().auth??empty;
 const Cc=()=>read().navigate,G=()=>read().sidebarWidth;
 const Zs=key=>{const s=read();return key===null?undefined:key===v$a?s.queries?.[key]:(s.queries?.[key]??queryEmpty);};
 const PB=()=>read().accountQuery??queryEmpty,Cqe=()=>read().sessionQuery??queryEmpty;
 const H9i=()=>read().profileVisibility??{isProfileVisible:false,isProfileVisibilityLoading:false};
 const Q7i=options=>options,Cp=()=>read().profileQuery??queryEmpty;
 const $=message=>formatMessage(message),mWa='general-settings';
 const NNo=()=>h(DebugControl,{snapshot:read()}),kMo=()=>h(DeviceControl,{snapshot:read()});
${body}
 xRt();
 function ProfileControl({snapshot,...props}){if(!snapshot)throw new TypeError('ProfileControl requires a snapshot');return h(Context.Provider,{value:snapshot},h(iPo,props));}
 return {ProfileControl,ProfileTrigger:aPo,ProfileLabel:DNo,ProfileSubtext:hNo,LoadingShimmer:iC,providerDisplayName:UNo};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/ProfileControl.js'),output);
fs.writeFileSync(path.join(root,'profile-control-manifest.json'),JSON.stringify({initial:path.basename(process.argv[2]),initialSha256:createHash('sha256').update(initial).digest('hex'),shared:path.basename(process.argv[3]),sharedSha256:createHash('sha256').update(shared).digest('hex'),symbols,sharedSymbols,bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original full iPo controller, trigger, text, shimmer and settings artwork bodies. Data hooks resolve explicit snapshot query results through React context. Menu/image proxy/debug/device boundaries are caller adapters, not recovered implementations.',limits:['Original ZNo menu contents pending','Debug and device controllers are explicit optional slots','Image proxy replaced by caller image-source hook','Full-window visual parity unverified']},null,2)+'\n');
