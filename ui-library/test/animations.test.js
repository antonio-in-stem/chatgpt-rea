import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {animations,createOriginalLottieRuntime} from '../animations/index.js';
const root=new URL('../../original-stack/state/recovered-all/readable/assets/',import.meta.url);
const manifest=JSON.parse(fs.readFileSync(new URL('../animations/manifest.json',import.meta.url),'utf8'));
const hash=x=>createHash('sha256').update(x).digest('hex');
test('all 12 animation objects equal execution of the recovered modules',()=>{
 assert.equal(Object.keys(animations).length,12);
 for(const row of manifest.animations){
  const bytes=fs.readFileSync(new URL(row.source,root)),source=bytes.toString('utf8');
  assert.equal(hash(bytes),row.sourceSha256);
  const block=source.match(/export \{([\s\S]*?)\};/),symbol=block[1].match(/(\w+) as default/)[1];
  const code=source.replace(/^import .*;\r?\n/,'').replace(block[0],'').replace(/\/\/# sourceMappingURL=.*$/m,'');
  const original=vm.runInNewContext(code+';'+symbol,{e:fn=>fn},{timeout:1000});
  const json=JSON.stringify(animations[row.key]);
  assert.equal(json,JSON.stringify(original),row.key);
  assert.equal(hash(json),row.dataSha256,row.key);
 }
});
test('shipped Lottie runtime body is unchanged apart from recorded module boundaries',()=>{
 const bytes=fs.readFileSync(new URL(manifest.runtime.source,root));
 assert.equal(hash(bytes),manifest.runtime.sourceSha256);
 const body=bytes.toString('utf8').replace(/^import .*;\r?\nimport .*;\r?\n/,'').replace('export { require_index_umd as t };','').replace(/\/\/# sourceMappingURL=.*$/m,'');
 assert.equal(hash(body),manifest.runtime.bodySha256);
 const extracted=fs.readFileSync(new URL('../animations/runtime.js',import.meta.url),'utf8');
 assert.ok(extracted.includes(body));
 assert.equal(typeof createOriginalLottieRuntime({}).useLottie,'function');
});
