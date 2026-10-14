import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass recovered initial module');
const source=fs.readFileSync(process.argv[2],'utf8');
const symbols=['Ixn','Fxn','Lxn','Rxn'];
const def=name=>{const start=source.indexOf('function '+name+'(');if(start<0)throw Error(name);return source.slice(start,start+source.slice(start).search(/^}\r?$/m)+1);};
const body=symbols.map(def).join('\n');
const output=`// Generated thumbnail presentation; query/account are explicit adapters.
import {classNames as ng} from './classNames.js';
export function createAttachmentThumbnail({React,AttachmentUploadProgress,useThumbnailQuery,useAccountId,formatMessage=message=>message.defaultMessage,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!AttachmentUploadProgress||!useThumbnailQuery||!useAccountId)throw new TypeError('Thumbnail requires original progress, query and account hook adapters');
 const zxn=compilerRuntime,Bxn=React,Axn=AttachmentUploadProgress,translator={formatMessage},zd=()=>translator,Dp=Symbol('account'),Uxn=Symbol('thumbnail-query'),G=()=>useAccountId(),Zs=(_query,options)=>useThumbnailQuery(options);
 const mk={jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
${body}
 return {AttachmentThumbnail:Ixn,thumbnailMountedAt:Fxn};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/AttachmentThumbnail.js'),output);
fs.writeFileSync(path.join(root,'attachment-thumbnail-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols,bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original view, image events and performance measurement bodies. React compiler cache retained. App query/account hooks and translation supplied explicitly.',limits:['Portable document worker and source-query controller not extracted','Demo uses local Blob URLs for image files only; original image presentation retained','Full-screen parity pending']},null,2)+'\n');
