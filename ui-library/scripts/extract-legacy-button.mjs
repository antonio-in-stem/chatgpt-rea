import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const symbols=['Eg','Og','MSe','NSe','FSe','zSe','HSe','USe','QSe','aCe','oCe','sCe','cCe','lCe','pCe','gCe','Lg','wCe','DCe'];
const body=symbols.map(def).join('\n');
const output=`// Generated original legacy Button, loader and TransitionGroup family.
import {classNames as q} from './classNames.js';
export function createLegacyButton({React,config={}}){
 const runtime={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
 const t=fn=>{let initialized=false;return()=>{if(!initialized){initialized=true;fn();}};},o=()=>React,n=value=>value,K=()=>runtime,yh=()=>{};
 // Explicit app-config adapter; original shipped defaults, no account dependency.
 const wg={pill:true,squircle:false,pressable:false,pressableScaleMultiplier:1,...config},pSe=()=>{};
 const Ag=React,eCe=typeof window==='undefined'?React.useEffect:React.useLayoutEffect,rCe=()=>{};
 let mSe,hSe,gSe,Tg,_Se,vSe,ySe,bSe,xSe,SSe,CSe,wSe,TSe,ESe,DSe,OSe,Dg,kSe,ASe,jSe;
 let kg,PSe,ISe,LSe,RSe,BSe,VSe,iCe,jg,Mg,Ng,Pg,uCe,dCe,fCe,mCe,hCe,Fg,Ig,_Ce,vCe,yCe,bCe,xCe,SCe,CCe,TCe,Rg,ECe;
${body}
 DCe();
 return {LegacyButton:ECe,LoadingIndicator:VSe,TransitionGroup:yCe};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/LegacyButton.js'),output);
fs.writeFileSync(path.join(root,'legacy-button-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols,bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original function/initializer bodies retained, including transition reconciliation, interruption, delayed mount, frame scheduling and loading state. React imports and app configuration explicitly adapted. Timer hook uses original environment-dependent layout effect; unrelated resize/debounce hook omitted.',limits:['Profile menu controller not extracted','No matched screenshot comparison against installed app','Original shared CSS required']},null,2)+'\n');
