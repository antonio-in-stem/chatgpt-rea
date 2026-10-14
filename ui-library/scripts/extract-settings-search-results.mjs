import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass settings-page source');
const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function body(name){const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);}
fs.writeFileSync(path.join(root,'src/SettingsSearchResults.js'),`// Original result composition; host-specific icon, team and route operations are explicit.
export function createSettingsSearchResults({React,NavigationItem:vt,NavigationList:X,usePlatform:platformHook,getSectionIcon:gn,ResponsiveIcon:Ne,prefetchSection:rn,openExternal:_t,ExternalLink:Bt,ExternalIcon:ct,securityIcon,TeamList:qn,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if([vt,X,platformHook,gn,Ne,rn,_t,Bt,ct,securityIcon,qn].some(x=>x==null))throw new TypeError('Settings results require navigation, platform, artwork, teams and destination adapters');
const Jr=compilerRuntime,Xr=React,h=React.createElement,Q={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},Ae=()=>({platform:platformHook()}),B=props=>formatMessage(props),hn={securitySettings:{icon:securityIcon}};
${body('Wr')}
${body('Gr')}
return Wr;
}
`);
fs.writeFileSync(path.join(root,'settings-search-results-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),symbols:['Wr','Gr'],limits:['Result ranking and keyboard controller belong to caller','Original platform icon registry and team controller are injected, not recovered here','No full sidebar or screenshot parity claim']},null,2)+'\n');
