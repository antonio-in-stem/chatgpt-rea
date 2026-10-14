import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createUserMessageBubble} from '../src/UserMessageBubble.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/user-message-bd254db1d77f.js',import.meta.url),'utf8');
const start=source.indexOf('let e = A('),classes=source.slice(start+8,source.indexOf(',\n      n;',start));
const domStart=source.indexOf('? (0, $.jsxs)(`div`, {\n              "data-user-message-bubble"');
assert.ok(start>0 && domStart>0,'original visual branch located');
const dom=source.slice(domStart+2,source.indexOf('\n          : null),',domStart));
const qStart=source.indexOf('(Q = {'),q=source.slice(qStart+5,source.indexOf('}',qStart)+1);
const cssVariables=Object.fromEntries([...source.matchAll(/([A-Za-z]+) = `(_[A-Za-z0-9]+_11evq_\d+)`/g)].map(m=>[m[1],m[2]]));
const element=(type,props)=>({type,props}),React={createElement:(type,props,...children)=>element(type,children.length ? {...props,children:children.length===1 ? children[0] : children} : props)};
const Bubble=createUserMessageBubble(React,classNames),plain=x=>JSON.parse(JSON.stringify(x));
test('user bubble visual subtree matches shipped Ft across resolved appearance states',()=>{
 for(const compact of [false,true])for(const temporary of [false,true])for(const otherUser of [false,true])for(const hasText of [false,true])for(const alignment of ['start','end'])for(const accentColor of [undefined,'#ff0000']){
  const context={...cssVariables,A:classNames,$:{jsx:element,jsxs:element},s:accentColor,De:alignment,I:compact,L:otherUser,Re:temporary,H:hasText,dt:'Rendered content'};
  vm.createContext(context);vm.runInContext(`Q=${q}; e=${classes}; i={"--user-message-accent-color":s}; result=${dom};`,context);
  assert.deepEqual(plain(Bubble({compact,temporary,otherUser,hasText,alignment,accentColor,children:'Rendered content'})),plain(context.result));
 }
});
