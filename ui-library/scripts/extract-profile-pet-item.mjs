import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[3])throw Error('Pass profile-items and shared sources');
const source=fs.readFileSync(process.argv[2],'utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const symbols=['Gi','vi'],body=symbols.map(n=>def(source,n)).join('\n'),artwork=def(shared,'h6i');
const output=`// Original Pet/Mini menu branch and artwork with explicit resolved-state inputs.
export function createProfilePetMenuItem({React,MenuItem:H,useStateSnapshot,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!H||!useStateSnapshot||!compilerRuntime?.c)throw new TypeError('ProfilePetMenuItem requires MenuItem, state snapshot hook and compiler runtime');
 const h=React.createElement,Q={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Ki=compilerRuntime,J=message=>formatMessage(message);
 const e=fn=>fn,t=fn=>fn,se=()=>{},r=()=>Q;
 const F={petVisible:'petVisible'},Cr='miniOverrideEnabled',Ln='hasOrbitAgent';
 const at=()=>useStateSnapshot().petVisible,ce=()=>useStateSnapshot().miniFeatureEnabled,s=key=>useStateSnapshot()[key];
 let gi,_i;
 const v=(()=>{const Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let m6i;
${artwork}
 h6i();return m6i;})();
${body}
 vi();return {ProfilePetMenuItem:Gi,MiniIcon:_i};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),hash=s=>createHash('sha256').update(s).digest('hex');
fs.writeFileSync(path.join(root,'src/ProfilePetMenuItem.js'),output);
fs.writeFileSync(path.join(root,'profile-pet-item-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sha256:hash(source),shared:path.basename(process.argv[3]),sharedSha256:hash(shared),symbols,sharedSymbols:['h6i'],bodySha256:hash(body),artworkSha256:hash(artwork),stateMapping:{petVisible:'at(F.petVisible)',miniFeatureEnabled:'ce(1532120159)',miniOverrideEnabled:'s(Cr) / CWs',hasOrbitAgent:'s(Ln) / PEs'},limits:['Inputs are resolved states; feature/atom derivation not reproduced','Overlay and pet rendering are not part of this menu item','Full-window screenshot parity unverified']},null,2)+'\n');
