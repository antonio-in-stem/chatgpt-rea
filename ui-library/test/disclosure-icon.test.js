import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createDisclosureIcon} from '../src/DisclosureIcon.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');assert.ok(start>=0);return source.slice(start,source.indexOf('\n}',start)+2);};
const element=(type,props)=>({type,props});
const context={t:fn=>fn,Q:()=>{},Z:x=>x,ilr:{c:()=>[]},alr:{useId:()=> 'test'},olr:{jsx:element},r2n:body=>{assert.doesNotMatch(body,/\bid=/);return body;}};
vm.createContext(context);vm.runInContext(['v8n','tlr','u2n','d2n','f2n','p2n','hlr','rlr'].map(definition).join('\n')+'\nv8n();',context);
const plain=value=>JSON.parse(JSON.stringify(value));
test('disclosure SVG preserves original paint, accessibility, size and prop precedence',()=>{
 const Icon=createDisclosureIcon({createElement:element},classNames);
 for(const props of [{},{className:'text-tertiary'},{'aria-label':'Open'},{'aria-labelledby':'label',focusable:'true'},{'aria-hidden':false,role:'presentation',style:{color:'red'}},{width:99,height:30,viewBox:'0 0 99 99',style:{'--icon-black':'blue'}}]){
  const preset=context._8n;
  const expected=context.rlr({preset,icon:context.hlr(preset),svgProps:{...props,className:classNames('_Icon_uttcz_1',props.className),focusable:props.focusable ?? 'false'}});
  assert.deepEqual(plain(Icon(props)),plain(expected));
 }
});
