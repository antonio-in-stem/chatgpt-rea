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
const React={createContext:value=>({value}),useContext:c=>c.value,useRef:current=>({current}),useLayoutEffect:()=>{},createElement:(type,props)=>({type,props})};
const motion={div:'motion.div'},useMotionValue=value=>({value,set(){}}),useDarkTheme=()=>true;
const ui=createComposerLayout({React,motion,useMotionValue,useDarkTheme}),C=ui.ComposerLayout;
const context={YS:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},XS:React,OLt:React,ZS:{jsx:React.createElement,jsxs:React.createElement},Kl:motion,Lm:useMotionValue,Vd:useDarkTheme,QS:ui.ComposerLayoutContext,KS:ui.ComposerEnvironment,FIt:ui.ComposerPresentation,ng:classNames,e:fn=>fn,t:fn=>fn};
context.DLt=context.YS;context.kLt=context.ZS;
vm.createContext(context);
vm.runInContext('var JS,HIt,UIt,WIt,GIt,KIt,qIt,JIt,YIt,XIt,ZIt,QIt,$It,eLt;'+definition(source,'tLt')+';tLt();'+manifest.symbols.map(n=>definition(source,n)).join('\n'),context);
const shared=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js');
vm.runInContext('var M5;'+definition(shared,'pCi')+';pCi();const Fd=M5;',context);
const plain=x=>JSON.parse(JSON.stringify(x));
test('composer keeps original function bodies and reference merger byte-for-byte',()=>{
 for(const name of manifest.symbols)assert.equal(definition(generated,name),definition(source,name));
 assert.equal(definition(generated,'pCi'),definition(shared,'pCi'));
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
