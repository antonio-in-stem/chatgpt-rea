import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createComposerContextAction} from '../src/ComposerContextAction.js';
import {classNames} from '../src/classNames.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const initial=read('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js'),shared=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),generated=read('../src/ComposerContextAction.js'),manifest=JSON.parse(read('../composer-context-manifest.json'));
const def=(text,name)=>{const start=text.indexOf('function '+name+'(');assert(start>=0,name);const end=text.slice(start).search(/^}\r?$/m);return text.slice(start,start+end+1);};
const compilerRuntime={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},React={createElement:(type,props,...children)=>({type,props:children.length?{...props,children}:props})};
const adapters={React,compilerRuntime,Button:'Button',Tooltip:'Tooltip',ShortcutBadge:'ShortcutBadge',ResponsiveIcon:'ResponsiveIcon',AssetIcon:'AssetIcon'};
const ui=createComposerContextAction(adapters),element=React.createElement,runtime={jsx:element,jsxs:(type,props)=>element(type,props,...props.children)};
const context={rIt:compilerRuntime,VS:runtime,Ir:'Button',Pn:'Tooltip',IWe:'ShortcutBadge',rm:'ResponsiveIcon',lve:'CompactIcon',Te:'Plus16',LMe:'Plus20',q:null,Di:()=>null,zd:()=>({formatMessage:m=>m.defaultMessage}),$:m=>m.defaultMessage,Ap:()=>{},WFt:{}};
vm.createContext(context);vm.runInContext(manifest.symbols.map(n=>def(initial,n)).join('\n'),context);
const plain=x=>JSON.parse(JSON.stringify(x));
function normalize(node){if(!node||typeof node!=='object')return node;if(Array.isArray(node))return node.map(normalize);let type=node.type;if(typeof type==='function')type=type===ui.ComposerPlus16?'Plus16':type===ui.ComposerPlus20?'Plus20':'CompactIcon';return {...node,type,props:node.props?Object.fromEntries(Object.entries(node.props).map(([k,v])=>[k,k==='icon'?{'16':'Plus16','20':'Plus20'}:k==='children'?normalize(v):v])):node.props};}
test('context action and icon bodies remain identical to recovered source',()=>{
 for(const n of manifest.symbols)assert.equal(def(generated,n),def(initial,n));
 for(const n of manifest.sharedSymbols)assert.equal(def(generated,n),def(shared,n));
});
test('context action retains active, compact, disabled and highlighted tooltip branches',()=>{
 for(const active of [false,true])for(const compact of [false,true])for(const disabled of [false,true])for(const highlightTooltip of [false,true])for(const onOpen of [undefined,()=>{}]){
  const props={active,compact,disabled,highlightTooltip,onOpen};
  assert.deepEqual(plain(normalize(ui.ComposerContextAction(props))),plain(normalize(context.eIt(props))));
 }
});
test('context action prevents mouse focus theft and invokes optional analytics before opening',()=>{
 const calls=[],local=createComposerContextAction({...adapters,onAnalytics:event=>calls.push(event)});
 const tree=local.ComposerContextAction({onOpen:()=>calls.push('open')}),button=tree.props.children;
 button.props.onMouseDown({preventDefault:()=>calls.push('prevent')});button.props.onClick();
 assert.deepEqual(calls,['prevent',{event:'protobuf_analytics_events.v1.ChatgptComposerPlusButtonClicked',metadata:{isUnifiedComposerMenuEnabled:true}},'open']);
 const unavailable=local.ComposerContextAction({}).props.children;assert.equal(unavailable.props.disabled,true);unavailable.props.onClick();assert.equal(calls.length,3);
});
