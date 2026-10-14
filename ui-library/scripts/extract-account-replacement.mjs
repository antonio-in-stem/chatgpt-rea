import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[3])throw Error('Pass account-switcher and shared sources');
const account=fs.readFileSync(process.argv[2],'utf8'),shared=fs.readFileSync(process.argv[3],'utf8');
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');if(i<0)throw Error(n);return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const symbols=['Nt','on','sn','$t'],body=symbols.map(n=>def(account,n)).join('\n'),artwork=def(shared,'K6n');
const output=`// Original account replacement dialog; logout/redirect is an explicit caller operation.
export function createAccountReplacementDialog({React,dialog,layout,Button:l,AssetIcon,logoutAndContinue:Ft,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!dialog?.Dialog||!layout?.DialogBody||!l||!AssetIcon?.fromPreset||typeof Ft!=='function'||!compilerRuntime?.c)throw new TypeError('AccountReplacementDialog requires original dialog/layout/button/icons and a promise-returning local operation');
 const h=React.createElement,$={Fragment:React.Fragment,jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Z=compilerRuntime,Q=React,H=message=>formatMessage(message);
 const {Dialog:ne,DialogTitle:Oe,DialogDescription:N}=dialog,{DialogBody:T,DialogHeader:n,DialogSection:he,DialogFooter:R}=layout;
 const S=(()=>{const t=fn=>fn,Q=()=>{},Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});let G6n;
${artwork}
 K6n();return AssetIcon.fromPreset(G6n);})();
${body}
 return {AccountReplacementDialog:Nt,accountDisplayName:on,maskedPhone:sn,accountIdentityKey:$t};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),hash=s=>createHash('sha256').update(s).digest('hex');
fs.writeFileSync(path.join(root,'src/AccountReplacementDialog.js'),output);
fs.writeFileSync(path.join(root,'account-replacement-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sha256:hash(account),shared:path.basename(process.argv[3]),sharedSha256:hash(shared),symbols,sharedSymbols:['K6n'],bodySha256:hash(body),limits:['Ft real logout/redirect replaced by required promise-returning adapter','Caller owns successful close/navigation; original Nt stays busy after resolution','Session controller and storage not included','No full-app visual parity claim']},null,2)+'\n');
