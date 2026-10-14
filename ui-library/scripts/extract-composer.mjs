import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2]||!process.argv[3])throw Error('Pass recovered initial and shared modules');
const bytes=fs.readFileSync(process.argv[2]),source=bytes.toString('utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const definition=(text,name)=>{const start=text.indexOf('function '+name+'(');if(start<0)throw Error(name);return text.slice(start,text.indexOf('\n}',start)+2);};
const names=['rLt','aLt','oLt','sLt','fLt','pLt','nLt','iLt','cLt','lLt','uLt','dLt','mLt','hLt','gLt','_Lt','vLt','yLt','bLt','xLt','SLt','CLt','wLt','ELt','IIt'];
const body=names.map(name=>definition(source,name)).join('\n');
const styleInit=definition(source,'tLt'),variables=Object.fromEntries([...styleInit.matchAll(/([A-Za-z$]+) = `([^`]+)`/g)].map(m=>[m[1],m[2]]));
const mapStart=styleInit.indexOf('(JS = {'),map=styleInit.slice(mapStart+6,styleInit.indexOf('}',mapStart)+1).replace(/: ([A-Za-z$]+),/g,(_,name)=>': '+JSON.stringify(variables[name])+',');
const output=`// Generated from shipped functions. See composer-manifest.json.
export function createComposerLayout({React,motion,useMotionValue,useDarkTheme,MotionConfig,LayoutGroup,AnimatePresence,useIsPresent,motionPreference,visualScale=1}){
if(!React.createContext||!motion?.div||!useMotionValue||!useDarkTheme)throw new TypeError('React, motion.div, useMotionValue and useDarkTheme are required');
const XS=React,OLt=React,YS={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},DLt=YS;
const ZS={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},kLt=ZS;
const Kl=motion,Lm=useMotionValue,Vd=useDarkTheme;
const Ege=MotionConfig,BMe=LayoutGroup,Yp=AnimatePresence,EOe=useIsPresent;
const ft=createMotionPreference(React,motionPreference),Ef=()=>visualScale,TLt={duration:0.3,ease:[0.23,1,0.32,1]};
const LSi=YS,RSi=React,jSi=React,MSi=()=>()=>{},NSi=()=>true,PSi=()=>true;
${definition(shared,'ASi')}
${definition(shared,'ISi')}
const Qa=ISi,BIt=React.createContext(null);
const QS=React.createContext({isHome:false,isInline:false,canStackSingleLine:false});
const KS=React.createContext({activeBrowserTabId:null,isInsideOverlay:false,onAttachmentAdded:()=>{},shouldAnimate:true}),FIt=React.createContext('default');
const JS=${map};
const LIt="a[href], button, input, select, textarea, [contenteditable='true'], [draggable='true'], [role='button'], [role='link'], [role='menuitem'], [role='option'], [tabindex]:not([tabindex='-1'])";
let M5;const t=fn=>fn;
${definition(shared,'pCi')}
pCi();const Fd=M5;
${body}
return {ComposerLayout:Object.assign(cLt,{LayoutTransition:rLt,ComposerTransition:aLt,AdaptiveFooter:oLt,UtilityBarSlot:fLt,ModeSurface:nLt,AnimateLayout:iLt,Attachments:uLt,Body:CLt,Footer:mLt,FooterAction:hLt,FooterActions:_Lt,FooterControls:vLt,FooterDivider:xLt,FooterExpandingControls:bLt,FooterInlineControls:yLt,FooterLabel:SLt,Input:dLt,ReplyContext:lLt,Editor:ELt}),ComposerFocusTarget:BIt,ComposerEnvironment:KS,ComposerPresentation:FIt,ComposerLayoutContext:QS};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/ComposerLayout.js'),"import {classNames as ng} from './classNames.js';\nimport {createMotionPreference} from './motionPreference.js';\n"+output);
fs.writeFileSync(path.join(root,'composer-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(bytes).digest('hex'),symbols:names,bodySha256:createHash('sha256').update(body).digest('hex'),sharedHelpers:['pCi/M5','ASi','ISi'],sharedSha256:createHash('sha256').update(shared).digest('hex'),transformation:'Original function bodies with injected React/motion, original contexts and CSS map. Compiler cache recreated per render; memo optimization omitted.',limits:['Motion providers/useIsPresent are injected; app motion preference and visual scale are caller adapters','Editor is the original layout wrapper, not the ProseMirror editor implementation','Service/account state supplied by consuming application','Matched original screenshot and animation comparison pending']},null,2)+'\n');
