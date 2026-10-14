import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {createTooltip} from '../src/Tooltip.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),generated=read('../src/Tooltip.js'),manifest=JSON.parse(read('../tooltip-manifest.json'));
const definition=(text,name)=>{const start=text.indexOf('function '+name+'(');assert(start>=0,name);const end=text.slice(start).search(/^}\r?$/m);return text.slice(start,start+end+1);};
const React={Fragment:'fragment',createElement:(type,props,...children)=>({type,props:children.length?{...props,children}:props}),cloneElement:(e,p)=>({type:e.type,props:{...e.props,...p}}),isValidElement:e=>Boolean(e?.type),createContext:value=>({value}),useContext:c=>c.value,useId:()=> 'tooltip-id',useRef:current=>({current}),useCallback:fn=>fn,useState:init=>[typeof init==='function'?init():init,()=>{}],useEffect:()=>{},useLayoutEffect:()=>{},useInsertionEffect:()=>{},useEffectEvent:fn=>fn,__COMPILER_RUNTIME:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))}};
const ReactDOM={createPortal:()=>{},flushSync:fn=>fn()};
test('tooltip, provider, portal and floating engine retain exact recovered bodies',()=>{
 for(const name of manifest.symbols)assert.equal(definition(generated,name),definition(source,name));
 const originalFloating=source.slice(source.indexOf('function _Oe('),source.indexOf('var fAe, pAe, mAe, hAe, gAe, _Ae;'));
 assert.ok(generated.includes(originalFloating));
 assert.equal(createHash('sha256').update(originalFloating).digest('hex'),manifest.floatingBodySha256);
 assert.equal(createHash('sha256').update(manifest.symbols.map(n=>definition(source,n)).join('\n')).digest('hex'),manifest.bodySha256);
});
test('tooltip skips disabled/missing content and preserves caller trigger semantics',()=>{
 const {Tooltip}=createTooltip({React,ReactDOM,ShortcutBadge:'kbd'}),child=React.createElement('button',{className:'original',style:{color:'red'},'aria-describedby':'existing',children:'Action'});
 assert.equal(Tooltip({children:child,disabled:true,tooltipContent:'Hint'}).props.children,child);
 assert.equal(Tooltip({children:child}).props.children,child);
 const wrapper=Tooltip({children:child,tooltipContent:'Hint',open:true,className:'extra',style:{color:'blue',padding:2}});
 const result=wrapper.type(wrapper.props),trigger=result.props.children[0];
 assert.equal(trigger.props.className,'original extra');assert.equal(trigger.props['aria-describedby'],'existing tooltip-id');assert.deepEqual(trigger.props.style,{color:'red',padding:2});
});
test('tooltip delays pointer opening, honors cancellation, and closes with Escape',()=>{
 const oldWindow=globalThis.window,oldNode=globalThis.Node;
 class Node{ownerDocument={defaultView:{Node}};contains(node){return node===this;}matches(){return true;}}
 globalThis.Node=Node;
 try{
  let callback,delay;const cleared=[];globalThis.window={setTimeout:(fn,ms)=>{callback=fn;delay=ms;return 1;},clearTimeout:id=>cleared.push(id)};
  const {Tooltip}=createTooltip({React,ReactDOM,ShortcutBadge:'kbd'}),events=[],node=new Node();
  const wrapper=Tooltip({children:React.createElement('button',{}),tooltipContent:'Hint',onOpenChange:open=>events.push(open)}),result=wrapper.type(wrapper.props),trigger=result.props.children[0];
  trigger.props.ref(node);trigger.props.onPointerEnter({target:node,pointerType:'mouse'});assert.equal(delay,200);assert.deepEqual(events,[]);
  callback();assert.deepEqual(events,[true]);trigger.props.onKeyDown({key:'Escape'});assert.deepEqual(events,[true,false]);
  const blocked=Tooltip({children:React.createElement('button',{}),tooltipContent:'Hint',onBeforeOpen:()=>false,onOpenChange:open=>events.push(open)});const blockedTrigger=blocked.type(blocked.props).props.children[0];blockedTrigger.props.ref(node);blockedTrigger.props.onPointerEnter({target:node,pointerType:'mouse'});callback();assert.deepEqual(events,[true,false]);
 }finally{globalThis.window=oldWindow;globalThis.Node=oldNode;}
});
