import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {createComposerLayout} from '../src/ComposerLayout.js';
import {classNames} from '../src/classNames.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const source=read('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js'),generated=read('../src/ComposerLayout.js'),manifest=JSON.parse(read('../composer-manifest.json'));
const definition=(text,name)=>{const start=text.indexOf('function '+name+'(');return text.slice(start,text.indexOf('\n}',start)+2);};
const React={__COMPILER_RUNTIME:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},Fragment:'fragment',useId:()=> 'id',useState:init=>[typeof init==='function'?init():init,()=>{}],useEffect:()=>{},useEffectEvent:fn=>fn,useSyncExternalStore:(subscribe,snapshot)=>snapshot(),createContext:value=>({value}),useContext:c=>c.value,useRef:current=>({current}),useLayoutEffect:()=>{},createElement:(type,props)=>({type,props})};
const motion={div:'motion.div'},useMotionValue=value=>({value,set(){}}),useDarkTheme=()=>true;
const adapters={MotionConfig:'MotionConfig',LayoutGroup:'LayoutGroup',AnimatePresence:'AnimatePresence',useIsPresent:()=>true};
const ui=createComposerLayout({React,motion,useMotionValue,useDarkTheme,...adapters}),C=ui.ComposerLayout;
const context={YS:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},XS:React,OLt:React,ZS:{Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key})},Kl:motion,Lm:useMotionValue,Vd:useDarkTheme,QS:ui.ComposerLayoutContext,KS:ui.ComposerEnvironment,FIt:ui.ComposerPresentation,ng:classNames,e:fn=>fn,t:fn=>fn};
Object.assign(context,{BIt:ui.ComposerFocusTarget,Qa:()=>false,ft:()=>false,Ef:()=>1,TLt:{duration:0.3,ease:[0.23,1,0.32,1]},Ege:adapters.MotionConfig,BMe:adapters.LayoutGroup,Yp:adapters.AnimatePresence,EOe:adapters.useIsPresent});
context.DLt=context.YS;context.kLt=context.ZS;
vm.createContext(context);
vm.runInContext('var JS,HIt,UIt,WIt,GIt,KIt,qIt,JIt,YIt,XIt,ZIt,QIt,$It,eLt;'+definition(source,'tLt')+';tLt();'+manifest.symbols.map(n=>definition(source,n)).join('\n'),context);
const shared=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js');
vm.runInContext('var M5;'+definition(shared,'pCi')+';pCi();const Fd=M5;',context);
const plain=x=>JSON.parse(JSON.stringify(x));
test('composer keeps original function bodies and reference merger byte-for-byte',()=>{
 for(const name of manifest.symbols)assert.equal(definition(generated,name),definition(source,name));
 for(const name of ['pCi','ASi','ISi'])assert.equal(definition(generated,name),definition(shared,name));
 assert.equal(createHash('sha256').update(manifest.symbols.map(n=>definition(source,n)).join('\n')).digest('hex'),manifest.bodySha256);
});
test('composer surfaces preserve original context, attributes, variants and motion contracts',()=>{
 const pairs=[[C,'cLt'],[C.ModeSurface,'nLt'],[C.AnimateLayout,'iLt'],[C.Attachments,'uLt'],[C.Body,'CLt'],[C.Footer,'mLt'],[C.FooterAction,'hLt'],[C.FooterActions,'_Lt'],[C.FooterControls,'vLt'],[C.FooterDivider,'xLt'],[C.FooterExpandingControls,'bLt'],[C.FooterInlineControls,'yLt'],[C.FooterLabel,'SLt'],[C.Input,'dLt'],[C.ReplyContext,'lLt'],[C.Editor,'ELt']];
 for(const layout of ['single-line','multiline'])for(const isHome of [false,true])for(const surface of [false,true]){
  ui.ComposerLayoutContext.value={isHome,isInline:surface,canStackSingleLine:true,animateLayout:isHome,expansion:isHome?{state:'expanded'}:undefined,homeMode:isHome?'demo':undefined,isDictating:surface};
  ui.ComposerEnvironment.value={hasComposerSurface:surface,shouldAnimate:!surface,quickChatComposerPresentation:{isCompact:surface}};
  for(const [component,name] of pairs)for(const props of [{},{children:'Content',layout,singleLine:layout==='single-line',animateHeight:true,animateRadius:true,dictationEnabled:true,responsive:true,rows:2,hasVisibleAttachments:true,placeholderContent:'Hint',gap:'normal',spacing:'compact',variant:'form',minHeight:'3rem',hideWhenNarrow:false,width:120}]){
   assert.deepEqual(plain(component(props)),plain(context[name](props)),name);
  }
 }
});
test('composer surface focuses editor only for noninteractive primary-button background clicks',()=>{
 class Element{closest(){return this.interactive ? this : null;}}
 const previous=globalThis.Element;globalThis.Element=Element;context.Element=Element;
 context.LIt="a[href], button, input, select, textarea, [contenteditable='true'], [draggable='true'], [role='button'], [role='link'], [role='menuitem'], [role='option'], [tabindex]:not([tabindex='-1'])";
 try{for(const handler of [C({}).props.children.props.onMouseDown,context.IIt])for(const kind of ['background','interactive','editor','outside','secondary','prevented']){
  const calls=[],target=new Element();target.interactive=kind==='interactive';const editor={contains:()=>kind==='editor',focus:()=>calls.push('focus')};
  const currentTarget={querySelector:()=>editor,contains:node=>node!==null && kind!=='outside'};
  handler({button:kind==='secondary'?2:0,defaultPrevented:kind==='prevented',target,currentTarget,preventDefault:()=>calls.push('prevent')});
  assert.deepEqual(calls,kind==='background'?['prevent','focus']:[]);
 }}finally{globalThis.Element=previous;}
});

test('home surface clamps radius to geometry and cleans up its resize observer',()=>{
 const oldObserver=globalThis.ResizeObserver,oldStyle=globalThis.getComputedStyle;
 try{
  for(const original of [false,true]){
   const values=[],events=[];let notify;
   class Observer{constructor(callback){notify=callback;}observe(node,options){events.push(options.box);}disconnect(){events.push('disconnect');}}
   const style=()=>({getPropertyValue:()=> '22px'});
   globalThis.ResizeObserver=Observer;globalThis.getComputedStyle=style;context.ResizeObserver=Observer;context.getComputedStyle=style;
   const node={offsetWidth:10,offsetHeight:20},value={set:n=>values.push(n)};
   if(original){const cleanup=context.wLt(node,value);node.offsetWidth=60;notify();cleanup();}
   else{
    const local=createComposerLayout({React,motion,useMotionValue:()=>value,useDarkTheme});
    local.ComposerLayoutContext.value={isHome:true};
    const cleanup=local.ComposerLayout.Body({}).props.ref(node);node.offsetWidth=60;notify();cleanup();
   }
   assert.deepEqual(values,[5,10]);assert.deepEqual(events,['border-box','disconnect']);
  }
 }finally{globalThis.ResizeObserver=oldObserver;globalThis.getComputedStyle=oldStyle;}
});

test('adaptive footer preserves responsive ordering, dictation, document and voice branches',()=>{
 const previous=globalThis.window;
 try{for(const narrow of [false,true])for(const layout of ['single-line','multiline'])for(const dictation of [undefined,{showTranscript:false,controls:'Waveform'},{showTranscript:true,controls:'Transcript'}])for(const mode of ['normal','document','voice']){
  globalThis.window={matchMedia:query=>({matches:query==='(width < 40rem)' && narrow})};context.Qa=()=>narrow;
  ui.ComposerLayoutContext.value={canStackSingleLine:true,isDocument:mode==='document'};
  const props={input:'Input',leadingControls:'Leading',trailingControls:'Trailing',layout,dictation,isVoiceLayout:mode==='voice'};
  assert.deepEqual(plain(C.AdaptiveFooter(props)),plain(context.oLt(props)));
 }}finally{globalThis.window=previous;}
});
test('composer transition and utility slots preserve original motion and presence contracts',()=>{
 context.Qa=()=>false;ui.ComposerLayoutContext.value={isHome:true};ui.ComposerEnvironment.value={shouldAnimate:true};
 assert.deepEqual(plain(C.LayoutTransition({children:'Child'})),plain(context.rLt({children:'Child'})));
 for(const kind of ['home','thread'])assert.deepEqual(plain(C.ComposerTransition({placement:{kind,mode:'search'},children:'Child'})),plain(context.aLt({placement:{kind,mode:'search'},children:'Child'})));
 for(const variant of ['home','thread'])for(const isVisible of [true,false])for(const isHidden of [true,false])for(const position of ['above','below']){
  const props={variant,isVisible,isHidden,position,children:'Utility'};
  const actual=C.UtilityBarSlot(props),original=context.fLt(props);
  assert.deepEqual(plain(actual),plain(original));
  if(variant==='home'&&isVisible){const nested=actual.props.children;assert.deepEqual(plain(nested.type(nested.props)),plain(context.pLt(original.props.children.props)));}
 }
});

test('dictation exit restores editor focus only when the original focus guard allows it',()=>{
 const oldRef=React.useRef,oldEffect=React.useEffect;
 try{for(const original of [false,true])for(const focusState of ['body','inside','outside','unfocused']){
  const refs=[],effects=[],calls=[];let cursor=0;
  React.useRef=initial=>refs[cursor++]??(refs[cursor-1]={current:initial});React.useEffect=fn=>effects.push(fn);
  ui.ComposerLayoutContext.value={canStackSingleLine:true};ui.ComposerFocusTarget.value={focus:()=>calls.push('focus')};
  const body={},inside={},outside={},doc={body,hasFocus:()=>focusState!=='unfocused',activeElement:focusState==='body'?body:focusState==='inside'?inside:outside};
  const node={ownerDocument:doc,contains:e=>e===inside};
  const render=original?context.oLt:C.AdaptiveFooter;
  const first=render({layout:'single-line',dictation:{showTranscript:false}});first.props.ref(node);effects.splice(0).forEach(fn=>fn());
  cursor=0;render({layout:'single-line'});effects.splice(0).forEach(fn=>fn());
  assert.deepEqual(calls,['body','inside'].includes(focusState)?['focus']:[]);
 }}finally{React.useRef=oldRef;React.useEffect=oldEffect;}
});

test('composer memo cache survives renders and invalidates on changed footer props',()=>{
 let slots;const compilerRuntime={c:n=>slots??=Array(n).fill(Symbol.for('react.memo_cache_sentinel'))};
 const {ComposerLayout}=createComposerLayout({React,motion,useMotionValue,useDarkTheme,...adapters,compilerRuntime});
 const first=ComposerLayout.Footer({children:'same',layout:'multiline'}),second=ComposerLayout.Footer({children:'same',layout:'multiline'});
 assert.equal(first,second);
 const changed=ComposerLayout.Footer({children:'changed',layout:'single-line'});assert.notEqual(changed,first);assert.equal(changed.props['data-composer-layout'],'single-line');assert.equal(changed.props.children,'changed');
});
