import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass readable assets directory');const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),page='settings-page-6c4c55bd9144.js',initial='app-initial-b8e1c8014bb4.js',a=fs.readFileSync(path.join(dir,page),'utf8'),b=fs.readFileSync(path.join(dir,initial),'utf8');
function body(s,n){const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);}
fs.writeFileSync(path.join(root,'src/SecuritySettingsItem.js'),`// Original security navigation item and browser destination indicator.
export function createExternalDestinationIndicator({React,useOpenTarget:vbn,ExternalIcon:ibn,BrowserIcon:Ko,compilerRuntime=React.__COMPILER_RUNTIME}){
const Sbn=compilerRuntime,h=React.createElement,Cbn={jsx:(type,props)=>h(type,props)};
${body(b,'xbn')}
return xbn;
}
export function createSecuritySettingsItem({React,NavigationItem:vt,Tooltip:s,ExternalLink:Bt,ExternalIcon:ct,securitySettings,openExternalEvent:_t,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,Jr=compilerRuntime,Q={jsx:(type,props)=>h(type,props)},B=props=>formatMessage(props),intl={formatMessage},ye=()=>intl,hn={securitySettings};
${body(a,'Vr')}
${body(a,'Hr')}
return Vr;
}
export function createSettingsExternalIcon(React){const e=fn=>fn,us=()=>{},W=()=>({jsx:(type,props)=>React.createElement(type,props)});let YVc,XVc;
${body(b,'ZVc')}
ZVc();return XVc;
}
`);
fs.writeFileSync(path.join(root,'security-settings-item-manifest.json'),JSON.stringify({sources:[{file:page,sha256:createHash('sha256').update(a).digest('hex'),symbols:['Vr','Hr']},{file:initial,sha256:createHash('sha256').update(b).digest('hex'),symbols:['xbn','ZVc']}],limits:['Destination policy and external open operation remain caller adapters','No account security settings are changed']},null,2)+'\n');
