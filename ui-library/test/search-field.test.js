import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createSearchField} from '../src/SearchField.js';
import {classNames} from '../src/classNames.js';
const ref={current:null};
const element=(type,props,key)=>({type,props,key});
const React={useRef:()=>ref,createElement:(type,props,...children)=>{const {key,...rest}=props ?? {};return element(type,{...rest,...(children.length ? {children:children.length===1 ? children[0] : children} : {})},key);}};
const icons={Search16:'search16',ClearSearch:'clear',LegacySearch:'legacy',ResponsiveSearch:'responsive',SidebarIcon:'sidebar'};
const Field=createSearchField({React,mergeClasses:classNames,icons});
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js',import.meta.url),'utf8');
const start=source.indexOf('function PJa('),end=source.indexOf('\nvar FJa,',start);
const context={FJa:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},IJa:React,bZ:{jsx:element,jsxs:element},ng:classNames,zd:()=>({formatMessage:m=>m.defaultMessage}),vZ:'sidebar',SPe:'legacy',rm:'responsive',qve:'search16',Bee:'search20',Pke:'clear'};
vm.createContext(context);vm.runInContext(source.slice(start,end),context);
const plain=value=>JSON.parse(JSON.stringify(value,(_,v)=>typeof v==='function' ? '[handler]' : v));
test('search field variants and input/clear contracts agree with the shipped function',()=>{
 for(const variant of ['default','settings','toolbar','toolbar-action','toolbar-compact','sidebar','sidebar-header','catalog','catalog-filter'])for(const flags of [{},{disabled:true},{readOnly:true},{isClearable:false},{searchQuery:''}]){
 const props={id:'search',label:'Search',searchQuery:'test',onSearchQueryChange:()=>{},variant,...flags};
 const actual=Field(props),expected=context.PJa(props);
 assert.equal(actual.props.className,expected.props.className,variant);
 assert.deepEqual(plain(actual.props.children.slice(1)),plain(expected.props.children.slice(1)),variant);
 }
});
test('clear focuses input before changing controlled query; typing reports unchanged text',()=>{
 const log=[];const inputRef={current:{focus:()=>log.push('focus')}};
 const tree=Field({id:'s',label:'Search',searchQuery:'old',inputRef,onSearchQueryChange:value=>log.push(value)});
 tree.props.children[2].props.onChange({target:{value:'café'}});tree.props.children[3].props.onClick();
 assert.deepEqual(log,['café','focus','']);assert.equal(tree.props.children[2].props.value,'old');
});
