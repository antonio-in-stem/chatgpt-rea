import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createConversationLayout} from '../src/ConversationLayout.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');return source.slice(start,source.indexOf('\n}',start)+2);};
const element=(type,props)=>({type,props});
const React={createElement:(type,props,...children)=>element(type,children.length ? {...props,children:children.length===1 ? children[0] : children} : props),useRef:current=>({current}),useInsertionEffect:fn=>fn(),useCallback:fn=>fn};
const context={qIn:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},cj:{jsx:element,jsxs:element},ng:classNames,Dd:fn=>fn,Fd:ref=>node=>{if(typeof ref==='function')return ref(node);if(ref)ref.current=node;}};
vm.createContext(context);vm.runInContext(['GIn','KIn'].map(definition).join('\n'),context);
const ui=createConversationLayout(React,classNames),plain=x=>JSON.parse(JSON.stringify(x));
test('conversation shell preserves exact DOM, floating-panel branches and caller prop precedence',()=>{
 for(const floatingPanelWidth of [undefined,null,0,240,400]){
  const props={floatingPanelWidth,header:'Header',banner:'Banner',children:'Content',className:'extra',bodyClassName:'body',style:{color:'red','--thread-floating-panel-width':'old'},tabIndex:-1,'data-test':'forwarded'};
  assert.deepEqual(plain(ui.ConversationLayout(props)),plain(context.GIn(props)));
 }
 assert.deepEqual(plain(ui.ConversationLayout({})),plain(context.GIn({})));
 const override=()=>{};assert.equal(ui.ConversationLayout({ref:override}).props.ref,override);
});
test('conversation container refs attach and detach without returning cleanup, matching GIn',()=>{
 for(const render of [ui.ConversationLayout,context.GIn]){
  const events=[],cleanup=()=>events.push('cleanup');
  const callback=render({containerRef:node=>{events.push(node);return cleanup;}}).props.ref;
  assert.equal(callback('node'),undefined);callback(null);assert.deepEqual(events,['node',null]);
  const object={current:null},ref=render({containerRef:object}).props.ref;ref('node');assert.equal(object.current,'node');ref(null);assert.equal(object.current,null);
 }
});
test('composer backdrop preserves combined, fade and surface classes and hidden semantics',()=>{
 for(const part of [undefined,null,'fade','surface','unknown'])assert.deepEqual(plain(ui.ComposerBackdrop({part})),plain(context.KIn({part})));
});
