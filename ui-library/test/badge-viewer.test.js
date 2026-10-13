import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createBadge,badgeVariants} from '../src/Badge.js';
import {createViewerSurfaces} from '../src/ViewerSurfaces.js';
import {classNames} from '../src/classNames.js';
const root=new URL('../../original-stack/state/recovered-all/readable/assets/',import.meta.url);
const initial=fs.readFileSync(new URL('app-initial-b8e1c8014bb4.js',root),'utf8'),shared=fs.readFileSync(new URL('app-shared-737655e1fb23.js',root),'utf8');
const definition=(source,name)=>{const start=source.indexOf('function '+name+'(');return source.slice(start,source.indexOf('\n}',start)+2);};
const element=(type,props)=>({type,props}),React={createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const cache={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},jsx={jsx:element};
const context={e:fn=>fn,t:fn=>fn,J:()=>cache,Hg:()=>{},W:()=>jsx,l9:cache,u9:jsx,q:classNames,ng:classNames};
vm.createContext(context);vm.runInContext(['iKi','sK'].map(n=>definition(initial,n)).join('\n')+';sK();'+['SRi','TRi','ERi','DRi'].map(n=>definition(shared,n)).join('\n')+';SRi();',context);
const expand=node=>{if(node==null || typeof node!=='object')return node;if(typeof node.type==='function')return expand(node.type(node.props));return {...node,props:{...node.props,children:expand(node.props.children)}};};
const plain=node=>JSON.parse(JSON.stringify(expand(node)));
test('all 15 badges match original variants and unread wrapper',()=>{
 const Badge=createBadge(React,classNames);assert.equal(Object.keys(badgeVariants).length,15);
 for(const variant of Object.keys(badgeVariants)){const props={variant,children:'12',className:'custom',ref:'ref'};assert.deepEqual(plain(Badge(props)),plain(context.iKi(props)));}
});
test('viewer capsules, groups and divider retain recovered container contracts',()=>{
 const ui=createViewerSurfaces(React,classNames);
 for(const variant of ['default','input']){const props={variant,className:'custom',children:'controls',id:'viewer'};assert.deepEqual(plain(ui.ViewerCapsule(props)),plain(context.TRi(props)));}
 for(const variant of ['default','joined','zoom'])for(const shrink of [true,false])for(const hideWhenEmpty of [true,false]){const props={variant,shrink,hideWhenEmpty,label:'Viewer tools',children:'controls'};assert.deepEqual(plain(ui.ViewerControlGroup(props)),plain(context.ERi(props)));}
 assert.deepEqual(plain(ui.ViewerDivider()),plain(context.DRi()));
});
