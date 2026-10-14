import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {createComposerActions} from '../src/ComposerActions.js';
import {classNames} from '../src/classNames.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const initial=read('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js'),shared=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),generated=read('../src/ComposerActions.js'),manifest=JSON.parse(read('../composer-actions-manifest.json'));
const def=(s,n)=>{const start=s.indexOf('function '+n+'(');assert(start>=0,n);return s.slice(start,s.indexOf('\n}',start)+2);};
const React={__COMPILER_RUNTIME:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},Fragment:'fragment',createElement:(type,props)=>({type,props}),useState:initial=>[initial,()=>{}],useSyncExternalStore:(subscribe,get)=>get()};
const runtime={Fragment:'fragment',jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key})};
const motion={svg:'motion.svg',path:'motion.path'},adapters={React,motion,Spinner:'Spinner',ResponsiveIcon:'ResponsiveIcon',AssetIcon:'AssetIcon',Tooltip:'Tooltip'};
const plain=x=>JSON.parse(JSON.stringify(x));
function expand(node){if(!node||typeof node!=='object')return node;if(Array.isArray(node))return node.map(expand);if(typeof node.type==='function')return expand(node.type(node.props));return {...node,props:{...node.props,children:expand(node.props?.children)}};}
function original(morphingEnabled=false,reduced=false){
 const c={e:fn=>fn,t:fn=>fn,us:()=>{},o:()=>{},W:()=>runtime,K:()=>runtime,rRt:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},iRt:React,eRt:React,nC:runtime,ILt:runtime,tC:runtime,Kl:motion,ft:()=>reduced,fs:key=>Boolean(key&&morphingEnabled),ei:'Spinner',rm:'ResponsiveIcon',Pn:'Tooltip',ng:classNames,Q:()=>{},Z:p=>({...p,hasGradients:false}),aRt:{default:'bg-composer-primary p-0.5 focus-visible:outline-background-composer-primary',voiceEnd:'bg-codex-icon p-0.5 focus-visible:outline-codex-icon'}};
 c.FLt=c.rRt;c.$Lt=c.rRt;
 vm.createContext(c);vm.runInContext('var mCi,hCi,jLt,MLt,GLt,KLt,qLt,JLt,YLt,k5,A5,j5,YSi,XSi,ZSi,Tcr;'+manifest.sharedSymbols.map(n=>def(shared,n)).join('\n')+';gCi();QSi();Ecr();const rBe=hCi,xte=ZSi;const VWe=props=>({type:"AssetIcon",props:{...props,asset:Tcr,className:ng("_Icon_uttcz_1",props.className),focusable:props.focusable??"false"}});'+manifest.symbols.map(n=>def(initial,n)).join('\n')+';NLt();XLt();',c);return c;
}
test('primary action and morph geometry retain shipped function bodies',()=>{
 for(const n of manifest.symbols)assert.equal(def(generated,n),def(initial,n));
 for(const n of manifest.sharedSymbols)assert.equal(def(generated,n),def(shared,n));
 assert.equal(createHash('sha256').update(manifest.symbols.map(n=>def(initial,n)).join('\n')).digest('hex'),manifest.bodySha256);
});
test('action variants preserve original disabled/loading, shortcut, blocked and tooltip contracts',()=>{
 for(const morphingEnabled of [false,true]){
  const ui=createComposerActions({...adapters,morphingEnabled}),source=original(morphingEnabled);
  for(const props of [{},{disabled:true},{isLoading:true},{disabled:true,blockedReason:'Blocked'},{blockedReason:'Blocked',blockedReasonOpenNonce:1},{disabled:true,blockedReason:'Blocked',blockedReasonOpenNonce:null},{tooltipContent:'Send',tooltipShortcut:'Enter'},{tooltipContent:'Send',disableTooltip:true},{fullBleedIcon:true},{keyboardShortcutLabel:'Enter'},{iconSource:{16:'small'}},{variant:'voiceEnd',type:'submit'},{supportsMorphing:true}]){
   assert.deepEqual(plain(expand(ui.ComposerPrimaryAction({...props,ariaLabel:'Send'}))),plain(expand(source.nRt({...props,ariaLabel:'Send'}))));
  }
 }
});
test('disabled/loading actions prevent clicks while normal actions call the supplied handler',()=>{
 for(const render of [createComposerActions(adapters).ComposerPrimaryAction,original().nRt])for(const props of [{},{disabled:true},{isLoading:true},{disabled:true,blockedReason:'Wait'}]){
  const calls=[],tree=render({...props,onClick:()=>calls.push('click')});const button=tree.type==='button'?tree:tree.props.children;
  button.props.onClick({preventDefault:()=>calls.push('prevent')});assert.deepEqual(calls,props.disabled||props.isLoading?['prevent']:['click']);
 }
});
test('morph states retain exact path geometry and reduced-motion transitions',()=>{
 for(const reduced of [false,true]){
  const ui=createComposerActions({...adapters,motionPreference:reduced?'on':'off'}),source=original(false,reduced);
  for(const state of ['send','stop','voice'])for(const isLoading of [false,true]){
   const props={state,isLoading,className:'icon'};assert.deepEqual(plain(expand(ui.ComposerMorphingIcon(props))),plain(expand(source.ZLt(props))));
  }
 }
});

test('missing tooltip adapter fails explicitly only when its branch is rendered',()=>{
 const ui=createComposerActions({...adapters,Tooltip:undefined});
 assert.equal(ui.ComposerPrimaryAction({}).type,'button');
 assert.throws(()=>expand(ui.ComposerPrimaryAction({tooltipContent:'Send'})),/Tooltip adapter/);
});

test('primary action retains memoized element/click handler until inputs change',()=>{
 let slots;const compilerRuntime={c:n=>slots??=Array(n).fill(Symbol.for('react.memo_cache_sentinel'))};
 const {ComposerPrimaryAction}=createComposerActions({...adapters,compilerRuntime}),onClick=()=>{};
 const first=ComposerPrimaryAction({ariaLabel:'Send',onClick}),second=ComposerPrimaryAction({ariaLabel:'Send',onClick});
 assert.equal(first,second);assert.equal(first.props.onClick,second.props.onClick);
 const changed=ComposerPrimaryAction({ariaLabel:'Send',onClick,disabled:true});assert.notEqual(changed,first);assert.equal(changed.props.disabled,true);assert.notEqual(changed.props.onClick,first.props.onClick);
});
