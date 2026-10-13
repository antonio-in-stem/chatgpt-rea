import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {createNavigationFallbackIcons} from '../src/NavigationFallbackIcons.js';
const manifest=JSON.parse(fs.readFileSync(new URL('../navigation-icons-manifest.json',import.meta.url),'utf8'));
const hash=x=>createHash('sha256').update(x).digest('hex');
test('all navigation fallback SVGs match original geometry and prop precedence',()=>{
 const bytes=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/'+manifest.source,import.meta.url));
 assert.equal(hash(bytes),manifest.sourceSha256);
 const source=bytes.toString('utf8'),start=source.indexOf('var Kir, qir;'),body=source.slice(start,source.indexOf('function par(',start));
 assert.equal(hash(body),manifest.bodySha256);
 const element=(type,props)=>({type,props});
 const context={e:fn=>fn,us:()=>{},W:()=>({jsx:element,jsxs:element})};
 vm.createContext(context);vm.runInContext(body+';Jir();Zir();ear();rar();oar();lar();far();',context);
 const icons=createNavigationFallbackIcons({createElement:element});
 const plain=x=>JSON.parse(JSON.stringify(x));
 assert.equal(Object.keys(icons).length,7);
 for(const [key,symbol] of Object.entries(manifest.registry))for(const props of [{},{className:'icon-xs',width:16,height:16,'aria-hidden':true},{fill:'red',viewBox:'0 0 30 30',children:'cannot override original paths'}]){
  assert.deepEqual(plain(icons[key](props)),plain(context[symbol](props)),key);
 }
});
