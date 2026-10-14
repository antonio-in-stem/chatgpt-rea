import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass settings-host-dropdown source');const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),symbols=['T','E','D'];
const bodies=symbols.map(n=>{const i=source.indexOf('function '+n+'(');return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);});
fs.writeFileSync(path.join(root,'src/SettingsHostDropdown.js'),`// Original host dropdown and connected indicator; caller supplies resolved connections.
export function createSettingsHostDropdown({React,Dropdown:a,menu:h,Tooltip:n,Button:r,DropdownButton:x,LocalIcon:S,RemoteHostIcon:C,FilterIcon:f,SelectedAsset:_,localHostId:c='local',formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
const O=compilerRuntime,hCreate=React.createElement,k={jsx:(type,props,key)=>hCreate(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>hCreate(type,key===undefined?props:{...props,key},...props.children)},intl={formatMessage},p=()=>intl,g=props=>formatMessage(props);
${bodies.join('\n')}
return {SettingsHostDropdown:T,HostFilterTooltip:E,ConnectedIndicator:D};
}
`);
fs.writeFileSync(path.join(root,'settings-host-dropdown-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),symbols,limits:['Connection discovery and host selection side effects belong to caller','Local/remote/filter artwork and menu components are explicit dependencies','No runtime connectivity or complete host settings claim']},null,2)+'\n');
