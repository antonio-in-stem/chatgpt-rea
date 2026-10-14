import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass unsaved settings dialog source');
const source=fs.readFileSync(input,'utf8'),start=source.indexOf('function g('),body=source.slice(start,start+source.slice(start).search(/^}\r?$/m)+1),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/UnsavedSettingsDialog.js'),`// Original confirmation: clear pending state before executing its captured navigation.
export function createUnsavedSettingsDialog({React,dialog,layout,Button:i,formatMessage=m=>m.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
if(!dialog?.Dialog||!layout?.DialogBody||!i)throw new TypeError('Unsaved settings requires original modal/layout/button');
const hCreate=React.createElement,_=compilerRuntime,v={jsx:(type,props,key)=>hCreate(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>hCreate(type,key===undefined?props:{...props,key},...props.children)},m=message=>formatMessage(message);
const {Dialog:a,DialogTitle:h,DialogDescription:l}=dialog,{DialogBody:s,DialogSection:d,DialogHeader:t,DialogFooter:f}=layout;
${body}
return g;
}
`);
fs.writeFileSync(path.join(root,'unsaved-settings-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),symbols:['g'],bodySha256:createHash('sha256').update(body).digest('hex'),limits:['Caller owns dirty-state detection and pending navigation callback','Original shell route blocker is not included','No installed-app screenshot parity verification']},null,2)+'\n');
