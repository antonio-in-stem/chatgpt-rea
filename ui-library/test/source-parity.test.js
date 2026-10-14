import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {classNames} from '../src/classNames.js';
test('class utility agrees with recovered production functions',()=>{
 const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
 const start=source.indexOf('function Vde('),end=source.indexOf('function yh()',start);
 assert(start>=0&&end>start);
 const context={};vm.runInNewContext(source.slice(start,end),context);
 for(const args of [[],['a',false,'b'],[['a',['b',0,3]],{c:true,d:false}],['px-2','px-4'],[null,undefined,0,1],['same','same']])assert.equal(classNames(...args),context.q(...args));
});
test('shipped stylesheet closure remains byte-identical to recorded source hashes',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('../styles/manifest.json',import.meta.url)));
 assert.deepEqual(manifest.entrypoints,['app-shared-9a94b907ed47.css','app-initial-99e8b4b455fa.css','app-primary-6a01c6b721a4.css','user-message-f152e09d34c3.css']);
 for(const record of manifest.files){
  const bytes=fs.readFileSync(new URL('../styles/original/'+record.file,import.meta.url));
  assert.equal(bytes.length,record.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),record.sha256);
 }
});
