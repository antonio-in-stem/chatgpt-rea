import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {resolveDisplayedOrder,resolveDropTarget,moveItemBefore,moveSelectionBefore,dropPlacement} from '../src/sidebarOrder.js';
import {createUseSidebarOrder} from '../src/useSidebarOrder.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');return source.slice(start,source.indexOf('\n}',start)+2);};
const context={};vm.createContext(context);vm.runInContext(['b9r','x9r','S9r','C9r','V4','k9r'].map(definition).join('\n'),context);
const plain=x=>JSON.parse(JSON.stringify(x));
test('ordering and multiselection agree with original across drop positions and no-ops',()=>{
 for(const keys of [['a','b','c'],['c','a','b'],[]])for(const activeKey of ['a','b','c','external',null])for(const overKey of ['a','b','c',null])for(const placement of ['before','after']){
  const result=resolveDropTarget({keys,activeKey,overKey,placement}),original=context.x9r({visibleThreadKeys:keys,activeThreadKey:activeKey,overThreadKey:overKey,placement});
  assert.deepEqual(plain(result),original==null ? null : {beforeKey:original.beforeThreadKey});
 }
 const keys=['a','b','c'];for(const beforeKey of ['a','b','c',null,'missing']){
  assert.deepEqual(plain(moveItemBefore({keys,activeKey:'b',beforeKey})),plain(context.S9r({visibleThreadKeys:keys,activeThreadKey:'b',beforeThreadKey:beforeKey})));
  for(let mask=0;mask<8;mask++){const selectedKeys=new Set(keys.filter((_,i)=>mask & (1<<i)));assert.deepEqual(plain(moveSelectionBefore({keys,selectedKeys,beforeKey})),plain(context.C9r({visibleThreadKeys:keys,selectedThreadKeys:selectedKeys,beforeThreadKey:beforeKey})));}
 }
 assert.deepEqual(keys,['a','b','c']);
});
test('pending order cannot override changed membership or a newer canonical order',()=>{
 const keys=['a','b','c'];for(const nextKeys of [['c','a','b'],['a','b'],['a','b','external']])for(const previousKeys of [keys,['b','a','c']]){
  assert.deepEqual(plain(resolveDisplayedOrder({keys,pending:{previousKeys,nextKeys}})),plain(context.b9r({visibleThreadKeys:keys,pendingVisibleThreadOrder:{previousVisibleThreadKeys:previousKeys,nextVisibleThreadKeys:nextKeys}})));
 }
 assert.equal(dropPlacement({activeRect:{top:0,bottom:10},targetRect:{top:0,bottom:20}}),'before');
 assert.equal(dropPlacement({activeRect:{top:0,bottom:10},pointerY:10,targetRect:{top:0,bottom:20}}),'after');
});
test('async controller preserves newer pending operation and clears failure without changing canonical keys',async()=>{
 const state=[];let cursor=0;const React={useState:initial=>{const slot=cursor++;if(!(slot in state))state[slot]=initial;return [state[slot],next=>state[slot]=typeof next==='function' ? next(state[slot]) : next];}};
 const useOrder=createUseSidebarOrder(React),operations=[];
 let keys=['a','b','c'];const props=()=>({keys,onOrderChange:request=>new Promise((resolve,reject)=>operations.push({request,resolve,reject}))});
 const render=()=>{cursor=0;return useOrder(props());};
 const first=render().controller.moveItem('c',-1);assert.deepEqual(render().displayedKeys,['a','c','b']);
 const second=render().controller.moveItem('c',-1);assert.deepEqual(render().displayedKeys,['c','a','b']);
 operations[0].resolve();await first;assert.deepEqual(render().displayedKeys,['c','a','b']);
 operations[1].reject(new Error('save failed'));await assert.rejects(second,/save failed/);assert.deepEqual(render().displayedKeys,keys);
 assert.equal(render().controller.moveItem('a',-1),undefined);assert.equal(operations.length,2);
});
