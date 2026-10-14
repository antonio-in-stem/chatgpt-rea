import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2]||!process.argv[3])throw Error('Pass recovered initial and shared modules');
const initial=fs.readFileSync(process.argv[2],'utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const def=(s,name)=>{const start=s.indexOf('function '+name+'(');if(start<0)throw Error(name);const end=s.slice(start).search(/^}\r?$/m);return s.slice(start,start+end+1);};
const names=['eIt','tIt'],helpers=['gir','vir','hyr'];
const body=names.map(n=>def(initial,n)).join('\n'),sharedBody=helpers.map(n=>def(shared,n)).join('\n');
const output=`// Generated original context action. See composer-context-manifest.json.
import {classNames as ng} from './classNames.js';
export function createComposerContextAction({React,Button,Tooltip,ShortcutBadge,ResponsiveIcon,AssetIcon,formatMessage=message=>message.defaultMessage,onAnalytics,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!Button||!Tooltip||!ShortcutBadge||!ResponsiveIcon||!AssetIcon)throw new TypeError('Composer context action requires compiler runtime and original component adapters');
 const rIt=compilerRuntime,VS={jsx:(type,props)=>React.createElement(type,props),jsxs:(type,props)=>React.createElement(type,props,...props.children)},K=()=>VS,o=()=>{},t=fn=>fn;
 const Ir=Button,Pn=Tooltip,IWe=ShortcutBadge,rm=ResponsiveIcon,$=props=>formatMessage(props),zd=()=>({formatMessage});
 const q=null,Di=()=>onAnalytics,WFt={$type:'protobuf_analytics_events.v1.ChatgptComposerPlusButtonClicked'},Ap=(callback,event,metadata)=>callback?.({event:event.$type,metadata});
 let hir,_ir,pyr,myr;const Q=()=>{},Z=p=>({...p,body:p.body.trim(),hasGradients:false});
${sharedBody}
 gir();vir();hyr();const lve=myr;
 const wrap=asset=>props=>React.createElement(AssetIcon,{...props,asset,className:ng('_Icon_uttcz_1',props.className),focusable:props.focusable??'false'}),Te=wrap(hir),LMe=wrap(_ir);
${body}
 return {ComposerContextAction:eIt,ComposerPlus16:Te,ComposerPlus20:LMe};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/ComposerContextAction.js'),output);
fs.writeFileSync(path.join(root,'composer-context-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(initial).digest('hex'),symbols:names,bodySha256:createHash('sha256').update(body).digest('hex'),sharedSource:path.basename(process.argv[3]),sharedSymbols:helpers,sharedBodySha256:createHash('sha256').update(sharedBody).digest('hex'),transformation:'Original control and artwork bodies; React compiler cache retained. App translation and analytics are explicit callbacks. Trusted fixed plus presets normalized without generic validation/freezing.',limits:['Action delegates onOpen; original context menu contents are separate','Demo file selection is authored local behavior','Original matched screen comparison pending']},null,2)+'\n');
