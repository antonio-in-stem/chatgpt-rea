import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass readable assets directory');const file='app-initial-b8e1c8014bb4.js',source=fs.readFileSync(path.join(dir,file),'utf8'),shared=fs.readFileSync(path.join(dir,'app-shared-737655e1fb23.js'),'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const symbols=['sNs','lNs','fNs','mNs','k6','gNs','_Ns'];const bodies=symbols.map(n=>{const i=source.indexOf('function '+n+'(');return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);});
const title=shared.match(/title: (\{\s+id: `settings\.teams\.title`,[\s\S]*?\n        \})/)[1];
fs.writeFileSync(path.join(root,'src/SettingsLabels.js'),`// Original settings label descriptors and context-dependent selector.
export function createSettingsLabels({React,getBrowserMetadata:P_e,formatMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(typeof P_e!=='function'||typeof formatMessage!=='function')throw new TypeError('Settings labels require browser metadata and localization');
const e=fn=>fn,qp=()=>{},rr=()=>{},Khe=()=>{},Fh=x=>x,Td=x=>x,RMe={title:${title}},vNs=compilerRuntime,h=React.createElement,j6={jsx:(type,props)=>h(type,props)},$=props=>formatMessage(props,props.values);
let oNs,cNs,uNs,dNs,pNs,A6;
${bodies.join('\n')}
sNs();mNs();
return {getSectionMessage:k6,SettingsNavigationLabel:gNs,SettingsSectionTitle:_Ns,creatorMicroMessage:oNs.creatorMicro,messages:A6};
}
`);
fs.writeFileSync(path.join(root,'settings-labels-manifest.json'),JSON.stringify({source:file,sha256:createHash('sha256').update(source).digest('hex'),symbols,teamTitleSource:'app-shared-737655e1fb23.js',limits:['Localization formatter and browser metadata are caller supplied','Navigation and page titles recovered; complete destination content remains pending']},null,2)+'\n');
