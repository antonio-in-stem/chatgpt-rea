import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createSidebarRow,createSidebarIndent} from '../src/SidebarRow.js';
import {createSidebarStatus} from '../src/SidebarStatus.js';
import {classNames} from '../src/classNames.js';
const element=(type,props)=>({type,props});
const React={createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const Row=createSidebarRow(React,classNames),Indent=createSidebarIndent(React),status=createSidebarStatus({React,Spinner:'spinner',mergeClasses:classNames});
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');assert.ok(start>=0);return source.slice(start,source.indexOf('\n}',start)+2);};
class MockNode {contains(node){return node===this || node.parent===this;}}
const context={Node:MockNode,ng:classNames,ei:'spinner',zd:()=>({formatMessage:m=>m.defaultMessage})};
for(const name of ['kRo','RRo','BRo'])context[name]={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))};
for(const name of ['ARo','NRo','$1','VRo'])context[name]={jsx:element,jsxs:element};
vm.createContext(context);vm.runInContext(['fYa','ERo','ORo','MRo','Q1','FRo','IRo','LRo','zRo'].map(definition).join('\n'),context);
const plain=value=>JSON.parse(JSON.stringify(value,(_,v)=>typeof v==='function' ? '[handler]' : v));
const expand=node=>{if(node==null)return node;if(typeof node.type==='function')return expand(node.type(node.props));if(node.props?.children!==undefined)return {...node,props:{...node.props,children:Array.isArray(node.props.children)?node.props.children.map(expand):expand(node.props.children)}};return node;};
test('row surface variants, hierarchy and status priority match shipped output',()=>{
 for(const flags of [{},{isActive:true},{isDisabled:true},{isHighlighted:true},{tone:'inverse'},{variant:'tableRow'},{hasNavigationLink:true},{multiline:true}])assert.deepEqual(plain(Row({...flags,children:'Row'})),plain(context.ORo({...flags,children:'Row'})));
 for(const indentLevel of [0,1,3])assert.deepEqual(plain(Indent({indentLevel,children:'Row'})),plain(context.MRo({indentLevel,children:'Row'})));
 for(const statusState of [{},{unread:true},{type:'loading'},{unreadCount:4,type:'loading'},{unreadCount:100},{unreadCount:0,unread:true}])for(const size of ['compact','large'])assert.deepEqual(plain(expand(status.SidebarStatus({statusState,size}))),plain(expand(context.Q1({statusState,size}))));
 for(const tone of ['approval','other'])for(const maxWidth of ['inline','container'])assert.deepEqual(plain(status.StatusPill({label:'Pending',tone,maxWidth})),plain(context.zRo({label:'Pending',tone,maxWidth})));
});
test('row event routing preserves child handling, disabled state and modified links',()=>{
 const previous=globalThis.Node;globalThis.Node=MockNode;
 try{for(const flags of [{},{isDisabled:true},{hasNavigationLink:true}])for(const eventFlags of [{button:0},{button:1},{button:0,ctrlKey:true},{key:'Enter'},{key:' '},{key:'Escape'},{key:'Enter',child:true},{button:0,cancel:true}]){
  const execute=Component=>{const log=[],root=new MockNode(),child=new MockNode();child.parent=root;
   const props={...flags,onPress:()=>log.push('press'),onClick:e=>{log.push('click');if(eventFlags.cancel)e.preventDefault();},onKeyDown:()=>log.push('key')};
   const tree=Component(props),event={...eventFlags,currentTarget:root,target:eventFlags.child ? child : root,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;log.push('prevent');}};
   tree.props[eventFlags.key ? 'onKeyDown' : 'onClick'](event);return log;};
  assert.deepEqual(execute(Row),execute(context.ORo),JSON.stringify({flags,eventFlags}));
 }}finally{globalThis.Node=previous;}
});
