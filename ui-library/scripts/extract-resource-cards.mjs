import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const [initialPath,sharedPath]=process.argv.slice(2);
if(!initialPath||!sharedPath)throw Error('Pass recovered initial and shared modules');
const initial=fs.readFileSync(initialPath,'utf8'),shared=fs.readFileSync(sharedPath,'utf8');
const def=(s,name)=>{const start=s.indexOf('function '+name+'(');if(start<0)throw Error(name);const end=s.slice(start).search(/^}\r?$/m);return s.slice(start,start+end+1);};
const symbols=['nxn','rxn','ixn','axn','oxn','mxn','hxn','yxn','Cxn','Exn','Dxn','Axn'];
const sharedSymbols=['SMi','ePi','rPi','iPi','aPi'];
const body=symbols.map(n=>def(initial,n)).join('\n'),art=sharedSymbols.map(n=>def(shared,n)).join('\n');
const output=`// Generated original resource surfaces. See resource-cards-manifest.json.
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
export function createResourceCards({React,AssetIcon,Link,motionPreference,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!AssetIcon)throw new TypeError('Resource cards require React compiler runtime and original AssetIcon');
 const uk=compilerRuntime,gxn=uk,bxn=uk,wxn=uk,Oxn=uk,jxn=uk,oPi=uk;
 const dk={jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},_xn=dk,xxn=dk,fk=dk,pk=dk,Mxn=dk,sPi=dk;
 const q=ng,ft=createMotionPreference(React,motionPreference),cPi=12,lPi=120,uPi=0,L7=100;
 const sk=Link??(()=>{throw new TypeError('ResourceCardAction href requires an explicit Link adapter')});
 const dxn={default:'px-[var(--resource-card-row-padding-x)] py-3',compact:'p-1.5'},fxn={default:'py-3 pe-10 ps-[var(--resource-card-row-padding-x)]',compact:'py-1.5 pe-6 ps-1.5'};
 const t=fn=>fn,o=()=>{},Q=()=>{},K=()=>dk,Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 let bMi,xMi,$Ni,tPi,nPi;
${art}
 SMi();ePi();rPi();const Zc=xMi,IPe=$Ni,cp=AssetIcon,xWe=aPi;
${body}
 return {ProgressRing:aPi,AttachmentUploadProgress:Axn,ResourceCard:nxn,ResourceCardAction:rxn,ResourceCardIcon:ixn,ResourceCardThumbnail:axn,ResourceCardRow:oxn,AttachmentRemoveButton:mxn,AttachmentCard:yxn,AttachmentPill:Cxn,AttachmentPreviewCard:Exn,AttachmentPreviewCaption:Dxn};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/ResourceCards.js'),output);
fs.writeFileSync(path.join(root,'resource-cards-manifest.json'),JSON.stringify({source:path.basename(initialPath),sourceSha256:createHash('sha256').update(initial).digest('hex'),symbols,bodySha256:createHash('sha256').update(body).digest('hex'),sharedSource:path.basename(sharedPath),sharedSymbols,sharedBodySha256:createHash('sha256').update(art).digest('hex'),transformation:'Literal recovered function bodies, React compiler cache retained; original JSX interop and fixed initialization adapted. Link and AssetIcon explicit adapters. Fixed asset normalization only.',limits:['Preview and icon are caller slots; thumbnail generation and upload status controller are separate','Demo file selection and message submission remain authored local behavior','Matched original full-screen comparison pending']},null,2)+'\n');
