import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[3])throw Error('Pass original profile-items and shared source');
const source=fs.readFileSync(process.argv[2],'utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const records=[{"alias": "mt", "asset": "s6n", "function": "c6n", "preset": true}, {"alias": "Ze", "asset": "l6n", "function": "u6n", "preset": true}, {"alias": "Bt", "asset": "lrr", "function": "urr", "preset": true}, {"alias": "xe", "asset": "drr", "function": "frr", "preset": true}, {"alias": "le", "asset": "l9n", "function": "u9n", "preset": false}, {"alias": "te", "asset": "d9n", "function": "f9n", "preset": false}, {"alias": "Mt", "asset": "xnr", "function": "Snr", "preset": false}, {"alias": "We", "asset": "Ona", "function": "kna", "preset": false}, {"alias": "x", "asset": "p3n", "function": "m3n", "preset": true}, {"alias": "k", "asset": "h3n", "function": "g3n", "preset": true}];
const symbols=['Wi','ci','si'],body=symbols.map(n=>def(source,n)).join('\n'),artwork=records.map(r=>def(shared,r.function)).join('\n');
const output=`// Original profile menu composition with explicit provider/help/pet boundaries.
import {classNames as It} from './classNames.js';
export function createProfileMenuLayout({React,menu,AssetIcon,ResponsiveIcon:Ct,HelpMenu:Pi,PetMenuItem:Gi,useProviderQuery,providerDisplayName:Y,parseProviderInfo,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!menu?.MenuItem||!AssetIcon?.fromPreset||!Ct||!Pi||!Gi||!useProviderQuery||!Y||!parseProviderInfo||!compilerRuntime?.c)throw new TypeError('ProfileMenuLayout requires original menu/icons and provider/help/pet adapters');
 const h=React.createElement,Q={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},ui=Q,Ki=compilerRuntime,li=compilerRuntime;
 const H=menu.MenuItem,q={ItemIcon:menu.MenuItemIcon,Separator:menu.MenuSeparator},J=message=>formatMessage(message),oe='local',Jn='model-provider',pe=()=>useProviderQuery(),qi={safeParse:parseProviderInfo};
 const e=fn=>fn,t=fn=>fn,Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 // Artwork initializer Q is the original no-op dependency; rename only the local binding via a nested scope.
 const artwork=(()=>{const Q=()=>{};let ${records.map(r=>r.asset).join(',')};
${artwork}
${records.map(r=>r.function+'();').join('\n')}
return {${records.map(r=>r.alias+':'+(r.preset?'AssetIcon.fromPreset('+r.asset+')':r.asset)).join(',')}};})();
 const {${records.map(r=>r.alias).join(',')}}=artwork;
 let ai,oi;
${body}
 si();return {ProfileMenuLayout:Wi,ProfileAnalyticsItem:ci};
}
`;
const hash=s=>createHash('sha256').update(s).digest('hex'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/ProfileMenuLayout.js'),output);
fs.writeFileSync(path.join(root,'profile-menu-layout-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sha256:hash(source),shared:path.basename(process.argv[3]),sharedSha256:hash(shared),symbols,artwork:records,bodySha256:hash(body),artworkSha256:hash(artwork),limits:['Yi account and feature gating controller pending','Help and pet items require explicit adapters','Provider query/name/schema are caller boundaries','No full-window visual parity claim']},null,2)+'\n');
