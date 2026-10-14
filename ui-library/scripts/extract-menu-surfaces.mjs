import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const symbols=['s7','bji','DAi','QAi','$Ai','Nji','Lji','Eji','Tji','wji','xji','Sji','Cji','Rji','zji','Bji','Kji','Jji','qji','Dji','Aji','Oji','kji','jji','Mji','dji','i7','K6n','Wji','Gji','pAi','pCi','OAi','a7','ASi','FSi','ISi','Pji','Fji','Iji','Txi','wxi','EAi'];
const arrowInitializers=['d8n','_8n','$er'].map(name=>{const i=source.indexOf('('+name+' = Z({');if(i<0)throw Error(name);return source.slice(source.lastIndexOf('function ',i)).match(/^function ([\w$]+)/)[1];});
symbols.push(...arrowInitializers);
const body=symbols.map(def).join('\n');
const start=source.indexOf('(eMi = (e) =>'),end=source.indexOf('      (y7 = {',start);
if(start<0||end<0)throw Error('Missing original menu initializer');
const initializer=source.slice(start,end).trim().replace(/,$/,';');
const switchStart=source.indexOf('(pji ='),switchEnd=source.indexOf('));',switchStart);
const switchConstants=source.slice(switchStart,switchEnd+1)+';';
const output=`// Original menu surfaces and rows; underlying interaction primitives injected explicitly.
import {classNames as q} from './classNames.js';
export function createMenuSurfaces({React,primitives,Tooltip:w5,AssetIcon:t5,ScrollArea:sji,TooltipOverlayContext,PortalContainerContext,motion,AnimatePresence,formatMessage=message=>message.defaultMessage,visualScale=1,compilerRuntime=React.__COMPILER_RUNTIME}){
 for(const name of ['Trigger','Content','Item','Group'])if(!primitives?.[name])throw new TypeError('Missing menu primitive '+name);
 if(!w5||!t5||!sji||!compilerRuntime?.c)throw new TypeError('Menu surfaces require original tooltip, asset icon, scroll area and compiler runtime');
 const {Trigger:mb,Content:gb,Item:_b,Group:fNe,CheckboxItem:vb,RadioItem:bb,RadioGroup:yb,ItemIndicator:xb,SubTrigger:Sb,SubContent:Cb,Portal:hb}=primitives;
 const t=fn=>fn,o=()=>React,c=()=>compilerRuntime,Uf=()=>{},x5=()=>{},Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false}),m7=compilerRuntime,tji=compilerRuntime,h7=React,v5=TooltipOverlayContext??React.createContext(undefined);
 const g7={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},c7=g7,K=()=>g7,d7=g7,fji=compilerRuntime,c5=compilerRuntime,l5=g7,LSi=compilerRuntime,RSi=React;
 const Qji=PortalContainerContext??React.createContext(undefined),d5=()=>visualScale,HMe=primitives,Yji=200,pS=message=>formatMessage(message);
 const missingMotion=()=>{throw new TypeError('Inline submenu requires motion and AnimatePresence');},$w=motion??{div:missingMotion},M1e=AnimatePresence??missingMotion;
 const uCi={duration:300/1e3,ease:[0.19,1,0.22,1]};
 const _7={maxWidth:'min(var(--radix-dropdown-menu-content-available-width), calc(100vw - 16px))',maxHeight:'min(var(--radix-dropdown-menu-content-available-height), calc(100vh - 16px))'};
 const Sxi={CompactSource:'_CompactSource_ym4jk_2',LeadingSource:'_LeadingSource_ym4jk_6'};
 const $ji={..._7,maxHeight:'calc(100vh - 16px)'};
 let MAi,NAi,PAi,FAi,M5,jSi,MSi,NSi,PSi,dAi,fAi,d8n,_8n,$er,wAi,TAi;
 let IAi,LAi,RAi,zAi,BAi,VAi,HAi,UAi,WAi,GAi,KAi,qAi,JAi,YAi,XAi,ZAi,o7,gji,_ji,vji,yji,f7,eMi,v7,tMi,nMi,uAi,r7,G6n,pji,mji;
${body}
 s7();bji();i7();K6n();pAi();pCi();a7();FSi();EAi();${arrowInitializers.map(n=>n+'();').join('')}
 const Bdr=t5.fromPreset?.(d8n),Udr=t5.fromPreset?.(_8n),Jpr=t5.fromPreset?.($er);
 ${switchConstants}
 const b$=props=>{if(!t5.fromPreset)throw new TypeError('Original preset icon factory required');return g7.jsx(Checkmark,props);};
 const Checkmark=t5.fromPreset?.(G6n);
 ${initializer}
 return {MenuInput:Pji,MenuSearchInput:Fji,focusMenuItem:Iji,MenuSubmenuItem:Wji,MenuFlyoutSubmenuItem:Gji,MenuCheckboxItem:Dji,MenuRadioItem:Aji,MenuRadioGroup:yb,MenuTrigger:xji,MenuContent:Sji,MenuItem:Cji,MenuItemIcon:Nji,MenuSeparator:Rji,MenuSectionLabel:zji,MenuMessage:Bji,MenuTitle:Kji,MenuGroup:Jji,MenuSection:qji,MenuRow:QAi,followingEnabledItems:Lji};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/MenuSurfaces.js'),output);
fs.writeFileSync(path.join(root,'menu-surfaces-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols,bodySha256:createHash('sha256').update(body).digest('hex'),initializerSha256:createHash('sha256').update(initializer).digest('hex'),transformation:'Original functions and menu tooltip/style initializer retained; only terminating comma changed to semicolon in initializer slice. React/compiler and original interaction/scroll/tooltip/icon dependencies explicitly injected.',limits:['Requires underlying menu primitives and scroll-area extraction','Profile-specific menu content pending','No full menu runtime or screenshot parity claim']},null,2)+'\n');
