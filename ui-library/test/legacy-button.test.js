import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createLegacyButton} from '../src/LegacyButton.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/LegacyButton.js'),manifest=JSON.parse(read('../legacy-button-manifest.json'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const ui=createLegacyButton({React}),h=React.createElement,html=p=>renderToStaticMarkup(h(ui.LegacyButton,p,'Profile'));
test('legacy button and transition bodies are original',()=>{for(const n of manifest.symbols)assert.equal(def(out,n),def(source,n));});
test('button states preserve pill/squircle, selection, inert and loading contracts',()=>{
 assert.match(html({}),/data-pill=""/);assert.match(html({loading:true}),/disabled=""/);assert.match(html({loading:true}),/_LoadingIndicator_mlrw0_1/);
 assert.doesNotMatch(html({loading:true,inert:false}),/ disabled=""/);
 assert.match(html({selected:false}),/data-suppress-active-style=""/);
 const square=html({pill:false,squircle:true,size:'xl',disabled:true,disabledTone:'soft'});assert.match(square,/data-squircle=""/);assert.doesNotMatch(square,/data-pill/);assert.match(square,/tabindex="-1"/);assert.match(square,/data-disabled-tone="soft"/);
});
test('transition group enforces stable keys and loader preserves custom dimensions',()=>{
 assert.throws(()=>renderToStaticMarkup(h(ui.TransitionGroup,null,h('span',null,'Unkeyed'))),/must include a `key`/);
 assert.match(renderToStaticMarkup(h(ui.LoadingIndicator,{size:18,strokeWidth:2})),/--indicator-size:18px;--indicator-stroke:2px/);
});
