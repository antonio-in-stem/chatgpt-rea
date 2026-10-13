import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createAnimatedNavigationIcon} from '../src/AnimatedNavigationIcon.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js',import.meta.url),'utf8');
const code=source.slice(source.indexOf('function par('),source.indexOf('var _ar, yar, bar,'));
const element=(type,props)=>({type,props});
function harness(original,{reduced=false,state='idle',hasTarget=true,animation='sidebar-search',staticIcon}={}){
 const handlers=new Map(),timers=new Map(),effects=[],transitions=[],delays=[];
 let next=0,visible=true,current=state;
 const target={matches:()=>visible,addEventListener:(key,fn)=>handlers.set(key,fn),removeEventListener:(key,fn)=>{assert.equal(handlers.get(key),fn);handlers.delete(key);}};
 const ref={current:{closest:selector=>{assert.equal(selector,'button, [role="menuitem"]');return hasTarget ? target : null;}}};
 const React={useRef:()=>ref,useState:()=>[state,value=>{current=typeof value==='function' ? value(current) : value;transitions.push(current);}],useCallback:fn=>fn,useEffect:fn=>effects.push(fn),useSyncExternalStore:(_subscribe,snapshot)=>snapshot(),createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
 const window={setTimeout:(fn,delay)=>{delays.push(delay);timers.set(++next,fn);return next;},clearTimeout:id=>timers.delete(id)};
 const props={animation,Icon:'provided-icon',staticIcon,className:'icon-xs'};
 let tree;
 if(original){const context={_ar:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},yar:React,ft:()=>reduced,Dd:fn=>fn,ng:classNames,bar:{jsx:element,jsxs:element},Sar:{'sidebar-search':'original-search'},Car:'renderer',xar:300,window};vm.createContext(context);vm.runInContext(code,context);tree=context.par(props);}
 else {globalThis.window=window;tree=createAnimatedNavigationIcon({React,AnimatedIcon:'renderer',fallbackIcons:{'sidebar-search':'original-search'},motionPreference:reduced ? 'on' : 'off'})(props);}
 const cleanups=effects.map(fn=>fn());
 return {tree,transitions,delays,handlers,timers,window,fire:(name,event={})=>{globalThis.window=window;handlers.get(name)?.(event);},visible:value=>visible=value,flush:()=>{globalThis.window=window;for(const [id,fn] of [...timers]){timers.delete(id);fn();}},cleanup:()=>{globalThis.window=window;cleanups.forEach(fn=>fn?.());}};
}
const plain=value=>JSON.parse(JSON.stringify(value,(key,v)=>key==='ref' ? '[ref]' : typeof v==='function' ? '[callback]' : v));
test('navigation animation DOM and visibility match recovered par across states',()=>{
 try{for(const reduced of [false,true])for(const state of ['idle','loading','ready'])for(const staticIcon of [undefined,'static-artwork']){
  const flags={reduced,state,staticIcon},a=harness(true,flags),b=harness(false,flags);
  assert.deepEqual(plain(b.tree),plain(a.tree));a.cleanup();b.cleanup();
 }}finally{delete globalThis.window;}
});
test('mouse delay, focus gating, ready/completion and cancellation match recovered event behavior',()=>{
 const exercise=h=>{
  h.fire('pointerenter',{pointerType:'touch'});assert.equal(h.timers.size,0);
  h.fire('pointerenter',{pointerType:'mouse'});h.fire('pointerenter',{pointerType:'mouse'});assert.equal(h.timers.size,1);
  h.fire('pointerleave');assert.equal(h.timers.size,0);
  h.visible(false);h.fire('focus');h.visible(true);h.fire('focus');
  const animation=h.tree.props.children[1];animation?.props.onReady();animation?.props.onComplete();
  h.fire('pointerenter',{pointerType:'mouse'});h.flush();h.fire('blur');
  h.fire('pointerenter',{pointerType:'mouse'});h.cleanup();assert.equal(h.handlers.size,0);assert.equal(h.timers.size,0);
  return {transitions:h.transitions,delays:h.delays};
 };
 try{assert.deepEqual(exercise(harness(false,{state:'loading'})),exercise(harness(true,{state:'loading'})));
 for(const flags of [{reduced:true},{hasTarget:false},{animation:null}]){
  const a=harness(true,flags),b=harness(false,flags);assert.equal(a.handlers.size,0);assert.equal(b.handlers.size,0);a.cleanup();b.cleanup();
 }}finally{delete globalThis.window;}
});

