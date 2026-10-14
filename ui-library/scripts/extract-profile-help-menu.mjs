import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[3])throw Error('Pass profile-items and shared sources');
const source=fs.readFileSync(process.argv[2],'utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const records=JSON.parse(fs.readFileSync(new URL('./profile-help-artwork.json',import.meta.url),'utf8')),unique=[...new Map(records.map(r=>[r.asset,r])).values()],symbols=['ki','Ai','Pi','si','wi','Ti'],body=symbols.map(n=>def(source,n)).join('\n'),artwork=unique.map(r=>def(shared,r.function)).join('\n');
const output=`// Original Help and What's New components with explicit local data/action boundaries.
export function createProfileHelpMenu({React,menu,AssetIcon,ResponsiveIcon:Ct,DemoBuildItem:yi,ExternalLinkIndicator:dr,Skeleton:Sn,Row:fr,motion:Oe,AnimatePresence:xt,useStateSnapshot,isFeedEnabled:yn,parseVersion:qn,isNewVersion:Sr,onSelectPost,navigate,dispatchCommand,openDebug,allowDebugMenu=false,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!menu?.MenuFlyoutSubmenuItem||!AssetIcon?.fromPreset||!Ct||!yi||!dr||!Sn||!fr||!Oe?.div||!xt||!useStateSnapshot||!yn||!qn||!Sr||!onSelectPost||!navigate||!dispatchCommand||!openDebug||!compilerRuntime?.c)throw new TypeError('ProfileHelpMenu requires original renderers, resolved state and action callbacks');
 const h=React.createElement,Z={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},zi=Z,X=Z,ji=compilerRuntime,Ri=compilerRuntime,Ei=compilerRuntime,J=message=>formatMessage(message);
 const e=fn=>fn,read=useStateSnapshot,C='local',y=()=>read(),be=()=>navigate,ce=id=>read().features?.[id]===true,hr='shortcuts',pe=()=>read().debugShortcut,Mi=allowDebugMenu,Wn=snapshot=>openDebug(snapshot),Zt=dispatchCommand;
 const q={Item:menu.MenuItem,Separator:menu.MenuSeparator,FlyoutSubmenuItem:menu.MenuFlyoutSubmenuItem,SectionLabel:menu.MenuSectionLabel,ItemIcon:menu.MenuItemIcon},ct=()=>read().auth??{},Vr=()=>read().mobileSetupAvailable===true,T={CODEX_MOBILE_SETUP_COMPLETED:'mobileSetupCompleted'},Qe=()=>read().mobileSetupQuery??{data:undefined,isLoading:true};
 const Qt='localeQuery',pn='postsQuery',Hn='lastSeenVersion',s=key=>read()[key],Je=()=>read().intl,n=()=>read().reducedMotion===true,Di=[80,50,65],ke=[0.23,1,0.32,1],_n='open-post',tt=(snapshot,action,{post})=>onSelectPost(post,snapshot),ot=AssetIcon;
 function gn({name,children}){return read().capabilities?.[name]===true?children:null;}
 const LinksContext=React.createContext(null);
 function Fi(props){const links=React.useContext(LinksContext);if(!links)throw Error('HelpMenu requires link callbacks');return h(ki,{...links,...props});}
 const artwork=(()=>{const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let ${unique.map(r=>r.asset).join(',')};
${artwork}
${unique.map(r=>r.function+'();').join('\n')}
return {${records.map(r=>r.alias+':'+(r.preset?'AssetIcon.fromPreset('+r.asset+')':r.asset)).join(',')}};})();
 const {${records.map(r=>r.alias).join(',')}}=artwork;let ai,oi;
${body}
 si();
 function ProfileHelpMenu({onOpenDocs,onOpenPrivacyCenter,onOpenWhatsNew,privacyCenterHref}){return h(LinksContext.Provider,{value:{onOpenDocs,onOpenPrivacyCenter,onOpenWhatsNew,privacyCenterHref}},h(Pi));}
 return {ProfileHelpMenu,HelpSubmenu:ki,WhatsNewItems:wi};
}
`;
const hash=s=>createHash('sha256').update(s).digest('hex'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/ProfileHelpMenu.js'),output);
fs.writeFileSync(path.join(root,'profile-help-menu-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sha256:hash(source),shared:path.basename(process.argv[3]),sharedSha256:hash(shared),symbols,artwork:unique,bodySha256:hash(body),artworkSha256:hash(artwork),limits:['Fi link/telemetry wrapper replaced by explicit link callbacks','Demo-build, external-link-indicator, skeleton and row renderers are required dependencies','Feed eligibility/version helpers are explicit caller dependencies','Feature/capability/query inputs are resolved snapshots','Destination screens not part of this extraction']},null,2)+'\n');
