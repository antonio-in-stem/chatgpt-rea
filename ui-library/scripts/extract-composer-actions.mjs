import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2]||!process.argv[3])throw Error('Pass recovered initial and shared modules');
const initial=fs.readFileSync(process.argv[2],'utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const definition=(text,name)=>{const start=text.indexOf('function '+name+'(');if(start<0)throw Error(name);return text.slice(start,text.indexOf('\n}',start)+2);};
const names=['NLt','PLt','RLt','zLt','BLt','VLt','HLt','ULt','WLt','XLt','ZLt','QLt','nRt'];
const helpers=['gCi','QSi','Ecr'];
const body=names.map(n=>definition(initial,n)).join('\n'),sharedBody=helpers.map(n=>definition(shared,n)).join('\n');
const output=`// Generated original composer action and morph geometry. See composer-actions-manifest.json.
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
export function createComposerActions({React,motion,Spinner,ResponsiveIcon,AssetIcon,Tooltip,morphingEnabled=false,motionPreference}){
 const e=fn=>fn,t=e,us=()=>{},o=us;
 const runtime={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key})},W=()=>runtime,K=W;
 const rRt={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},FLt=rRt,$Lt=rRt,iRt=React,eRt=React,nC=runtime,ILt=runtime,tC=runtime,Kl=motion;
 const ft=createMotionPreference(React,motionPreference),fs=key=>Boolean(key && morphingEnabled),ei=Spinner,rm=ResponsiveIcon;
 function missingTooltip(){throw new Error('Composer action tooltips require a recovered-compatible Tooltip adapter');}
 const Pn=Tooltip??missingTooltip;
 const aRt={default:'bg-composer-primary p-0.5 focus-visible:outline-background-composer-primary',voiceEnd:'bg-codex-icon p-0.5 focus-visible:outline-codex-icon'};
 let mCi,hCi,jLt,MLt,GLt,KLt,qLt,JLt,YLt,k5,A5,j5,YSi,XSi,ZSi,Tcr;
 const Q=()=>{},Z=preset=>({...preset,body:preset.body.trim(),hasGradients:false});
${sharedBody}
 gCi();QSi();Ecr();const rBe=hCi,xte=ZSi;
 const VWe=props=>React.createElement(AssetIcon,{...props,asset:Tcr,className:ng('_Icon_uttcz_1',props.className),focusable:props.focusable??'false'});
${body}
 NLt();XLt();
 return {ComposerPrimaryAction:nRt,ComposerSendIcon:rBe,ComposerStopIcon:MLt,ComposerVoiceIcon:PLt,ComposerMorphingIcon:ZLt};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/ComposerActions.js'),output);
fs.writeFileSync(path.join(root,'composer-actions-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(initial).digest('hex'),symbols:names,bodySha256:createHash('sha256').update(body).digest('hex'),sharedSource:path.basename(process.argv[3]),sharedSha256:createHash('sha256').update(shared).digest('hex'),sharedSymbols:helpers,sharedBodySha256:createHash('sha256').update(sharedBody).digest('hex'),transformation:'Original function bodies; compiler memo optimization removed. Runtime feature flag becomes explicit morphingEnabled. Shipped voice preset uses trusted static normalization without generic validator/freezing; no gradients in this preset. Tooltip integration is explicit.',limits:['Tooltip implementation not included; required for tooltip/blocked/morphing wrapper branches','Matched original screenshot and animation timing comparison pending','No dictation or generation backend']},null,2)+'\n');
