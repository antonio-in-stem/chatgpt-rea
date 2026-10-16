// Verify the packed payload from an isolated offline npm consumer, not the source tree.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process');
const [input,outputArg]=process.argv.slice(2);if(!input||!outputArg)throw Error('Pass package directory and new consumer directory');
const source=path.resolve(input),consumer=path.resolve(outputArg);
if(fs.existsSync(consumer)||source===consumer||consumer.startsWith(source+path.sep))throw Error('Consumer must be new and separate');
const npm=path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
fs.mkdirSync(consumer,{recursive:true});
const run=(args,cwd)=>execFileSync(process.execPath,[npm,...args],{cwd,encoding:'utf8',windowsHide:true,maxBuffer:16*1024*1024});
const [packed]=JSON.parse(run(['pack','--ignore-scripts','--json','--pack-destination',consumer],source));
fs.writeFileSync(path.join(consumer,'package.json'),JSON.stringify({name:'rea-original-payload-consumer',private:true,type:'module'}));
run(['install','--offline','--ignore-scripts','--no-audit','--no-fund',path.join(consumer,packed.filename)],consumer);
const probe=`import {frontendRoot,entryHtml,manifestUrl} from '@rea/original-frontend';
import fs from 'node:fs';import crypto from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync(manifestUrl,'utf8'));
for(const item of manifest.files){const file=new URL(item.path.split('/').map(encodeURIComponent).join('/'),frontendRoot),bytes=fs.readFileSync(file);if(bytes.length!==item.bytes||crypto.createHash('sha256').update(bytes).digest('hex')!==item.sha256)throw Error('Packed member mismatch: '+item.path);}
if(!fs.readFileSync(entryHtml,'utf8').includes('<!doctype html>'))throw Error('Missing original HTML');
console.log(JSON.stringify({filesVerified:manifest.files.length,sourceArchiveSha256:manifest.sourceArchiveSha256,standaloneMountVerified:false}));`;
fs.writeFileSync(path.join(consumer,'verify.mjs'),probe);
const result=JSON.parse(execFileSync(process.execPath,['verify.mjs'],{cwd:consumer,encoding:'utf8',windowsHide:true}));
fs.writeFileSync(path.join(consumer,'verification.json'),JSON.stringify({...result,tarball:packed.filename,packageIntegrity:packed.integrity},null,2)+'\n');
console.log(JSON.stringify({...result,consumer,tarball:packed.filename}));
