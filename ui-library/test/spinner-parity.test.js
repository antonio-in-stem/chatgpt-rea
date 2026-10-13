import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createSpinner} from '../src/Spinner.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');assert.ok(start>=0);return source.slice(start,source.indexOf('\n}',start)+2);};
const element=(type,props)=>({type,props});
const React={createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const Spinner=createSpinner(React,classNames);
const context={t:fn=>fn,Q:()=>{},Z:x=>x,ilr:{c:()=>[]},alr:{useId:()=> 'test'},olr:{jsx:element},r2n:body=>{assert.doesNotMatch(body,/\bid=/);return body;}};
vm.createContext(context);
vm.runInContext(['Mbi','tlr','u2n','d2n','f2n','p2n','hlr','rlr'].map(definition).join('\n')+'\nMbi();',context);
const plain=value=>JSON.parse(JSON.stringify(value));
test('rays SVG matches original paint, geometry, optical bounds and accessibility output',()=>{
 const tree=Spinner({variant:'rays',className:'custom'});
 const actual=tree.props.children;
 const preset=context.jbi;
 const expected=context.rlr({preset,icon:context.hlr(preset),svgProps:{className:'shrink-0 _rays_va20p_2 custom',focusable:'false'}});
 assert.deepEqual(plain(actual),plain(expected));
});
test('spinner animation starts synchronized and custom icons retain original ray class',()=>{
 const custom=Spinner({as:'span',variant:'rays',Icon:'custom-icon',className:'extra',containerClassName:'container'});
 assert.equal(custom.type,'span');assert.equal(custom.props.children.type,'custom-icon');
 assert.equal(custom.props.children.props.className,'_rays_va20p_2 extra');
 const animations=[{startTime:100},{startTime:200}];custom.props.onAnimationStart({currentTarget:{getAnimations:()=>animations}});
 assert.deepEqual(animations.map(a=>a.startTime),[0,0]);
});
