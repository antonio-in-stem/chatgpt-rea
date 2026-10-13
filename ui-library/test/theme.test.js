import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createDarkThemeHook} from '../src/theme.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
test('theme hook preserves root attribute, unknown/SSR state and subscription cleanup',()=>{
 let actual,expected,callback,observed,disconnected=false;
 const React={useSyncExternalStore:(subscribe,snapshot,serverSnapshot)=>{actual={subscribe,snapshot,serverSnapshot};}};
 const root={dataset:{}};
 const Observer=class{constructor(fn){callback=fn;}observe(...args){observed=args;}disconnect(){disconnected=true;}};
 const context={document:{documentElement:root},MutationObserver:Observer,yxi:{useSyncExternalStore:(subscribe,snapshot,serverSnapshot)=>{expected={subscribe,snapshot,serverSnapshot};}}};
 vm.createContext(context);const start=source.indexOf('function hxi(');vm.runInContext(source.slice(start,source.indexOf('var yxi;',start)),context);context.hxi();
 try{
  globalThis.document=context.document;globalThis.MutationObserver=Observer;createDarkThemeHook(React)();
  for(const theme of [undefined,'dark','light','system','']){root.dataset.theme=theme;assert.equal(actual.snapshot(),expected.snapshot());}
  assert.equal(actual.serverSnapshot(),expected.serverSnapshot());assert.equal(actual.serverSnapshot(),null);
  let calls=0;const stop=actual.subscribe(()=>calls++);callback();assert.equal(calls,1);assert.equal(observed[0],root);assert.deepEqual(observed[1],{attributes:true,attributeFilter:['data-theme']});stop();assert.equal(disconnected,true);
 }finally{delete globalThis.document;delete globalThis.MutationObserver;}
});
