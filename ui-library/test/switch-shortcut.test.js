import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createSwitches} from '../src/Switch.js';
import {createShortcutBadge} from '../src/ShortcutBadge.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');return source.slice(start,source.indexOf('\n}',start)+2);};
const element=(type,props)=>({type,props}),React={createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const cache={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},jsx={jsx:element};
const context={t:fn=>fn,c:()=>cache,yh:()=>{},K:()=>jsx,q:classNames,fxi:cache,pxi:jsx};
vm.createContext(context);vm.runInContext(['uji','dji','hji','dxi'].map(definition).join('\n')+';hji();',context);
const {Switch}=createSwitches(React,classNames),Badge=createShortcutBadge(React,classNames);
const expand=node=>{if(node==null || typeof node!=='object')return node;if(typeof node.type==='function')return expand(node.type(node.props));return {...node,props:{...node.props,children:expand(node.props.children)}};};
const plain=node=>JSON.parse(JSON.stringify(expand(node),(_,value)=>typeof value==='function' ? '[callback]' : value));
test('switch and shortcut variants match recovered visual and accessibility contracts',()=>{
 for(const checked of [true,false])for(const size of ['default','sm'])for(const tone of ['accent','neutral'])for(const disabled of [true,false]){
  const props={checked,size,tone,disabled,ariaLabel:'Setting',className:'custom',trackClassName:'track',thumbClassName:'thumb',onChange:()=>{}};assert.deepEqual(plain(Switch(props)),plain(context.uji(props)));
 }
 for(const variant of ['default','button','tooltip','tooltipInline'])assert.deepEqual(plain(Badge({variant,keysLabel:'Ctrl+K',className:'custom'})),plain(context.dxi({variant,keysLabel:'Ctrl+K',className:'custom'})));
});
test('switch remains controlled and respects click cancellation and disabled state',()=>{
 for(const checked of [true,false])for(const disabled of [true,false])for(const prevent of [true,false]){
  const run=render=>{const calls=[];const tree=render({checked,disabled,onClick:event=>{calls.push('click');if(prevent)event.defaultPrevented=true;},onChange:value=>calls.push(value)});tree.props.onClick({defaultPrevented:false});return calls;};
  assert.deepEqual(run(Switch),run(context.uji));
 }
});
