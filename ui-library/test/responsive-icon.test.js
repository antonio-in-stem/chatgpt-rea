import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createResponsiveIcons} from '../src/ResponsiveIcon.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const element=(type,props)=>({type,props});
const React={Fragment:'fragment',createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const definition=name=>{const start=source.indexOf('function '+name+'(');return source.slice(start,source.indexOf('\n}',start)+2);};
const expand=node=>{if(node==null || typeof node!=='object')return node;if(Array.isArray(node))return node.map(expand);if(typeof node.type==='function')return expand(node.type(node.props));return {...node,props:{...node.props,children:expand(node.props.children)}};};
const plain=node=>JSON.parse(JSON.stringify(expand(node)));
test('responsive icon variants and prop boundaries match recovered adapters',()=>{
 const Legacy=props=>element('legacy',props),Small=props=>element('small',props),Large=props=>element('large',props);
 for(const dark of [false,true]){
  const context={c5:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},l5:{jsx:element,jsxs:element,Fragment:'fragment'},q:classNames,t5:'asset',hxi:()=>dark,Sxi:{CompactSource:'_CompactSource_ym4jk_2',LeadingSource:'_LeadingSource_ym4jk_6'}};
  vm.createContext(context);vm.runInContext(['s5','wxi','Txi','Exi'].map(definition).join('\n'),context);
  const ui=createResponsiveIcons({React,AssetIcon:'asset',useDarkTheme:()=>dark});
  for(const icon of [Legacy,{16:Small,20:Large},{assets:{16:'asset16',20:'asset20'},ariaHidden:false},{artwork:{light:Legacy,dark:Large}},{artwork:{light:Legacy},secondary:Small}])for(const size of ['leading','inline','secondary']){
   const props={icon,size,className:'custom','aria-hidden':false,'data-example':'pass-or-omit-as-source'};
   assert.deepEqual(plain(ui.ResponsiveIcon(props)),plain(context.s5(props)));
  }
  for(const asset16 of [undefined,'asset16']){const props={asset16,icon16:Small,legacyIcon:Legacy,className:'custom','aria-hidden':false};assert.deepEqual(plain(ui.CompactIcon(props)),plain(context.Txi(props)));}
 }
});
