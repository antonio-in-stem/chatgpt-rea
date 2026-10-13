import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createButton} from '../src/Button.js';
import {classNames} from '../src/classNames.js';
import {buttonColors,buttonSizes,buttonRadii} from '../src/buttonVariants.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const element=(type,props={})=>({type,props});
const React={Fragment:'fragment',Children:{map:(items,fn)=>items.map(fn)},createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const context={Ybi:{c:()=>[]},i5:{jsx:element,jsxs:element,Fragment:'fragment'},Xbi:React,q:classNames,Vbi:'spinner'};
for(const key of ['kbi','Zbi','Qbi','$bi']) {
 const start=source.indexOf(key+' = {');
 // kbi uses different initializer indentation.
 const match=source.slice(start).match(/^[^=]+=(\s*\{[\s\S]*?\n\s*\})/);
 context[key]=vm.runInNewContext('('+match[1]+')');
}
const compiled=source.slice(source.indexOf('function Jbi('),source.indexOf('var Ybi, Xbi, i5, Zbi, Qbi, $bi;'));
vm.createContext(context);vm.runInContext(compiled,context);
const Button=createButton({React,mergeClasses:classNames,Spinner:'spinner'});
const comparable=value=>JSON.parse(JSON.stringify(value,(_,item)=>typeof item==='function' ? '[handler]' : item));
test('button extraction matches shipped function across colors, sizes and focus/loading contracts',()=>{
 const cases=[{},...Object.keys(buttonColors).map(color=>({color})),...Object.keys(buttonSizes).flatMap(size=>[{size},{size,uniform:true},{size,loading:true}] ),...Object.keys(buttonRadii).map(radius=>({radius})),...['surface','native','none','inset'].map(focusRing=>({focusRing})),{unstyled:true,uniformAtMobile:true,allowShrink:true},{sizingLabels:['Save','Saving'],loading:true},{disabled:true,disabledAppearance:'unchanged'},{contentLayout:'balanced'},{contentLayout:'dropdown'},{spinnerVariant:'rays',loading:true}];
 for(const input of cases){const props={...input,children:'Action'};assert.deepEqual(comparable(Button(props)),comparable(context.Jbi(props)),JSON.stringify(input));}
});
test('disabled and loading anchors suppress navigation, keyboard activation and custom router rendering',()=>{
 for(const flags of [{disabled:true},{loading:true},{}]) {
  let called=0,prevented=0,rendered=0;
  const props={as:'a',href:'/example',...flags,onClick:()=>called++,onAuxClick:()=>called++,onKeyDown:()=>called++,renderLink:p=>{rendered++;return element('router',p);}};
  const tree=Button(props);const inactive=flags.disabled || flags.loading;
  assert.equal(tree.type,inactive ? 'a' : 'router');assert.equal(rendered,inactive ? 0 : 1);
  for(const event of ['onClick','onAuxClick','onKeyDown'])tree.props[event]({key:'Enter',preventDefault:()=>prevented++});
  assert.equal(prevented,inactive ? 3 : 0);assert.equal(called,inactive ? 0 : 3);
  assert.equal(tree.props.href,inactive ? undefined : '/example');assert.equal(tree.props.tabIndex,inactive ? -1 : undefined);
 }
});
