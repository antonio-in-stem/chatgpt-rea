import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[5])throw Error('Pass account-switcher, shared, workspace-label and workspace-avatar sources');
const sources=process.argv.slice(2,6).map(p=>fs.readFileSync(p,'utf8')),[account,shared,labels,avatar]=sources;
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const records=[{"alias": "_", "asset": "_8n", "function": "v8n", "preset": true}, {"alias": "a", "asset": "WZi", "function": "GZi", "preset": false}, {"alias": "o", "asset": "KZi", "function": "qZi", "preset": false}],accountSymbols=['At','jt','Mt'],sharedSymbols=['bbn','JK','qK','YK','_An'],labelSymbols=['c','l','d'],avatarSymbols=['d'];
const output=`// Original browser-account-switcher presentation. Session/network controller is separate.
import {classNames} from './classNames.js';
export function createAccountSurfaces({React,menu,Avatar:Pe,AssetIcon,useImageSource:Ie,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!menu?.MenuRow||!menu?.MenuFlyoutSubmenuItem||!Pe||!AssetIcon?.fromPreset||!Ie||!compilerRuntime?.c)throw new TypeError('AccountSurfaces requires original menu/avatar/icons, image-source hook and compiler runtime');
 const h=React.createElement,$={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Z=compilerRuntime,H=message=>formatMessage(message),ce=menu.MenuRow,V={Item:menu.MenuItem,FlyoutSubmenuItem:menu.MenuFlyoutSubmenuItem};
 const artwork=(()=>{const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let ${records.map(r=>r.asset).join(',')};
${records.map(r=>def(shared,r.function)).join('\n')}
${records.map(r=>r.function+'();').join('\n')}
return {${records.map(r=>r.alias+':'+(r.preset?'AssetIcon.fromPreset('+r.asset+')':r.asset)).join(',')}};})();
 const _=artwork._;
 const plan=(()=>{const t=fn=>fn;let fW,hAn;
${sharedSymbols.map(n=>def(shared,n)).join('\n')}
 bbn();JK();return {enterprise:qK,business:YK,education:_An};})();
 const types=(()=>{const e=fn=>fn,i=()=>{},a=value=>value,n=()=>{},t=plan.enterprise,r=plan.business,o=plan.education;let s,u;
${labelSymbols.map(n=>def(labels,n)).join('\n')}
 d();return {personal:s,workspace:l};})();
 const lt=types.personal,ut=types.workspace;
 const ot=(()=>{const f=compilerRuntime,p=$,l=classNames,c=AssetIcon,a=artwork.a,o=artwork.o;
${def(avatar,'d')}
 return d;})();
${accountSymbols.map(n=>def(account,n)).join('\n')}
 return {WorkspaceFlyout:At,WorkspaceSubtitle:jt,WorkspaceAvatar:Mt,WorkspaceAvatarFallback:ot,workspaceTypeMessage:ut};
}
`;
const hash=s=>createHash('sha256').update(s).digest('hex'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/AccountSurfaces.js'),output);
fs.writeFileSync(path.join(root,'account-surfaces-manifest.json'),JSON.stringify({sources:process.argv.slice(2,6).map((p,i)=>({name:path.basename(p),sha256:hash(sources[i])})),accountSymbols,sharedSymbols,labelSymbols,avatarSymbols,artwork:records,limits:['These surfaces belong to the browser account switcher; the installed profile Yi leaves accountSwitcher null','Session storage/switching/logout controller bt/Nt not included','No account credentials or real session calls used','Full-window parity unverified']},null,2)+'\n');
