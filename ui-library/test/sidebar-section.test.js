import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createSidebarSections} from '../src/SidebarSection.js';
import {classNames} from '../src/classNames.js';
let reduced=false;
const element=(type,props)=>({type,props});
const React={useSyncExternalStore:()=>reduced,createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const parts=createSidebarSections({React,mergeClasses:classNames,motion:{div:'motion.div'},AnimatePresence:'presence',MotionConfig:'config',ContextMenu:'menu',visualScale:2});
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');return source.slice(start,source.indexOf('\n}',start)+2);};
const context={ng:classNames,ft:()=>reduced,Ef:()=>2,au:'Chevron',wi:{sidebarSectionToggle:{'data-app-action-sidebar-section-toggle':''}},Kl:{div:'motion.div'},Yp:'presence',Ege:'config',jc:'menu',hWe:{duration:0.3,ease:[0.19,1,0.22,1]}};
for(const name of ['Ear','F1o'])context[name]={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))};
for(const name of ['WF','I1o'])context[name]={jsx:element,jsxs:element};
vm.createContext(context);vm.runInContext(['UF','HF','Tar','P1o'].map(definition).join('\n'),context);
const plain=value=>JSON.parse(JSON.stringify(value,(_,v)=>typeof v==='function' ? v===context.HF || v===parts.SidebarList ? 'List' : v.name==='Chevron' ? 'Chevron' : '[handler]' : v));
test('section lists, headers, inert state and animation props match shipped functions',()=>{
 for(const appearance of ['plain','grouped'])for(const itemSpacing of ['default','rail'])assert.deepEqual(plain(parts.SidebarList({children:'rows',appearance,itemSpacing})),plain(context.HF({children:'rows',appearance,itemSpacing})));
 for(reduced of [false,true])for(const collapsed of [undefined,false,true])for(const flags of [{},{title:'Projects'},{title:'Projects',titleActions:'action',titleActionsOnHover:true,titleActionsLayout:'row',titleTrailing:'status'},{title:'Projects',menuRef:{current:null},appearance:'grouped'}]){
  const props={children:'rows',collapsed,...flags};assert.deepEqual(plain(parts.SidebarSection(props)),plain(context.UF(props)));
 }
 reduced=false;
});
test('section toggle preserves native disabled, drag props, expanded state and chevron',()=>{
 for(const collapsed of [false,true])for(const disabled of [false,true])for(const showCollapsedChevron of [false,true]){
  const props={children:'Projects',collapsed,disabled,showCollapsedChevron,dragHandleAttributes:{'aria-label':'Projects'},onToggle:()=>{}};
  assert.deepEqual(plain(parts.SidebarSectionToggle(props)),plain(context.P1o(props)));
 }
});
test('context menu callback adapter and coordinate transform preserve source contract',()=>{
 const log=[],menuRef={current:{getContextMenuItems:()=>['item'],onBeforeOpen:()=>log.push('before')}};
 const tree=parts.SidebarSection({title:'Title',menuRef,collapsed:false,children:'Rows'});
 const menu=tree.props.children[0];assert.equal(menu.props.awaitBeforeOpen,false);assert.equal(menu.props.preserveBrowserContextMenu,true);assert.deepEqual(menu.props.getItems(),['item']);menu.props.onBeforeOpen();assert.deepEqual(log,['before']);
 const config=tree.props.children[1].props.children;assert.deepEqual(config.props.transformPagePoint({x:20,y:40}),{x:10,y:20});
 const closed=parts.SidebarSection({collapsed:true,children:'Rows'});assert.equal(closed.props.children[1].props.inert,true);assert.equal(closed.props.children[1].props['aria-hidden'],true);
});
