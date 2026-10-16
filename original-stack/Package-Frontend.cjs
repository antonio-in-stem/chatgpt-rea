// Package existing extraction; verify each webview member against the pinned ASAR.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const [archiveArg,sourceArg,outputArg]=process.argv.slice(2);
if(!archiveArg||!sourceArg||!outputArg)throw Error('Usage: node Package-Frontend.cjs pristine.asar extracted/webview new-output');
const source=fs.realpathSync(sourceArg),output=path.resolve(outputArg);
if(fs.existsSync(output)||output===source||output.startsWith(source+path.sep)||source.startsWith(output+path.sep))throw Error('Output must be new and separate');
const fd=fs.openSync(archiveArg,'r'),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function read(offset,size){const b=Buffer.alloc(size);let done=0;while(done<size){const n=fs.readSync(fd,b,done,size-done,offset+done);if(!n)throw Error('Truncated ASAR');done+=n;}return b;}
try{
 const digest=crypto.createHash('sha256'),block=Buffer.alloc(8*1024*1024);let offset=0,n;
 while((n=fs.readSync(fd,block,0,block.length,offset))>0){digest.update(block.subarray(0,n));offset+=n;}
 const archiveHash=digest.digest('hex');
 if(archiveHash!=='c5fdef328cfa2ad9095786f9c3a7aaa447e68834d31299d6ef2592da02029038')throw Error('Unrecognized original ASAR');
 const prefix=read(0,16),header=JSON.parse(read(16,prefix.readUInt32LE(12))),dataStart=8+prefix.readUInt32LE(4),members=[];
 function walk(node,parent=''){for(const [name,item] of Object.entries(node.files)){if(!name||name==='.'||name==='..'||/[\\/:]/.test(name))throw Error('Unsafe member name');const relative=parent+name;if(item.files)walk(item,relative+'/');else{if(item.link||item.unpacked)throw Error('External member: '+relative);members.push({relative,item});}}}
 if(!header.files.webview?.files)throw Error('Original webview missing');walk(header.files.webview);
 const extracted=[];
 function inspect(dir,relative=''){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const name=relative+ent.name;if(ent.isSymbolicLink())throw Error('Symlink in source');if(ent.isDirectory())inspect(path.join(dir,ent.name),name+'/');else if(ent.isFile())extracted.push(name);else throw Error('Unexpected source entry');}}
 inspect(source);
 if(JSON.stringify(extracted.sort())!==JSON.stringify(members.map(m=>m.relative).sort()))throw Error('Extracted file set differs from original webview');
 fs.mkdirSync(path.join(output,'webview'),{recursive:true});const manifest=[];
 for(const {relative,item} of members){const bytes=fs.readFileSync(path.join(source,...relative.split('/')));if(!bytes.equals(read(dataStart+Number(item.offset),item.size)))throw Error('Member differs: '+relative);const target=path.join(output,'webview',...relative.split('/'));fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,bytes,{flag:'wx'});manifest.push({path:relative,bytes:bytes.length,sha256:hash(bytes)});}
 for(const entry of ['index.html','detached-window.html'])if(!manifest.some(m=>m.path===entry))throw Error('Missing original entry');
 fs.writeFileSync(path.join(output,'package.json'),JSON.stringify({name:'@rea/original-frontend',version:'0.1.0',private:true,type:'module',description:'Unmodified frontend payload; original host/bootstrap required',exports:{'.':'./index.mjs','./manifest.json':'./manifest.json','./webview/*':'./webview/*'},files:['index.mjs','manifest.json','webview/','README.md']},null,2)+'\n');
 fs.writeFileSync(path.join(output,'index.mjs'),"export const frontendRoot = new URL('./webview/', import.meta.url);\nexport const entryHtml = new URL('index.html', frontendRoot);\nexport const detachedEntryHtml = new URL('detached-window.html', frontendRoot);\nexport const manifestUrl = new URL('./manifest.json', import.meta.url);\n");
 fs.writeFileSync(path.join(output,'manifest.json'),JSON.stringify({sourceArchiveSha256:archiveHash,rendererModified:false,files:manifest},null,2)+'\n');
 fs.writeFileSync(path.join(output,'README.md'),'# Original frontend dependency payload\n\nEvery webview file retains its original bytes and path. Distributed JavaScript, not original TypeScript. No profiles or demo state.\n\nImport frontendRoot, entryHtml and manifestUrl from @rea/original-frontend in a Node/Electron integration. Serve the tree using the original app protocol and provide its host/bootstrap contracts. Opening entryHtml directly is not a supported standalone mount. This payload is not a React component API. Full-screen consumer integration and visual parity remain pending.\n');
 console.log(JSON.stringify({output,files:manifest.length,bytes:manifest.reduce((s,m)=>s+m.bytes,0),rendererModified:false,standaloneMountVerified:false}));
}finally{fs.closeSync(fd);}
