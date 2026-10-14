import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createViewerControls} from '../src/ViewerControls.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');return source.slice(start,source.indexOf('\n}',start)+2);};
const element=(type,props)=>({type,props}),React={createElement:element};
const context={t:fn=>fn,l9:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},u9:{jsx:element},q:classNames,r5:'button'};
vm.createContext(context);vm.runInContext(['SRi','c9','CRi'].map(definition).join('\n')+';SRi();',context);
const ui=createViewerControls({React,Button:'button',mergeClasses:classNames});
const plain=x=>JSON.parse(JSON.stringify(x));
test('viewer buttons retain variants and shared button prop precedence',()=>{
 for(const variant of ['default','primary','selected','dropdown','zoom','label','avatarGroup'])for(const uniform of [undefined,true,false]){
  const props={variant,uniform,className:'extra',disabled:true,children:'Action'};assert.deepEqual(plain(ui.ViewerButton(props)),plain(context.c9(props)));
 }
 for(const props of [{},{color:'secondary',uniform:true},{radius:'small',unstyled:true,className:'extra'}])assert.deepEqual(plain(ui.ViewerControl(props)),plain(context.CRi(props)));
});
