import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createDialogSurfaces} from '../src/DialogSurfaces.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),manifest=JSON.parse(read('../dialog-surfaces-manifest.json')),source=read('../../original-stack/state/recovered-all/readable/assets/'+manifest.source),output=read('../src/DialogSurfaces.js'),h=React.createElement;
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
function setup(){const calls=[];function Button(p){calls.push(p);return h('button',{'data-size':p.size,className:p.className},p.children);}return {calls,Button,ui:createDialogSurfaces({React,Button})};}
test('dialog layout and CSS initializer bodies remain identical to distributed source',()=>{for(const n of manifest.symbols)assert.equal(def(output,n),def(source,n));});
test('dialog body preserves form semantics and confirmation/scroll/viewport layout',()=>{const {ui}=setup();const form=renderToStaticMarkup(h(ui.DialogBody,{as:'form',id:'form',variant:'confirmation',size:'viewport'},'Content'));assert.match(form,/<form id="form"/);assert.match(form,/gap-6 p-8/);assert.match(form,/overflow-y-auto/);assert.match(renderToStaticMarkup(h(ui.DialogBody,{variant:'chatgptConfirmation'},'Content')),/_chatgptConfirmationBody_1rxrl_2/);assert.match(ui.dialogBodySizeClass('scrollable'),/85dvh/);});
test('header and section retain title sizing, subtitle tones and confirmation typography',()=>{const {ui}=setup();assert.match(renderToStaticMarkup(h(ui.DialogHeader,{title:'Title',subtitle:'Description',titleSize:'sm',subtitleTone:'secondary'})),/heading-sm/);assert.match(renderToStaticMarkup(h(ui.DialogHeader,{title:'Title',variant:'chatgptConfirmation'})),/_chatgptConfirmationHeaderTitle_1rxrl_2/);assert.match(renderToStaticMarkup(h(ui.DialogSection,{spacing:'large'},'Content')),/_largeSection_1rxrl_2/);});
test('footer expands one original button, keeps explicit sizes and ignores unrelated elements',()=>{const a=setup();renderToStaticMarkup(h(a.ui.DialogFooter,null,h(a.Button,null,'Save'),h('span',null,'Note')));assert.equal(a.calls[0].size,'medium');assert.match(a.calls[0].className,/w-full justify-center/);const b=setup();renderToStaticMarkup(h(b.ui.DialogFooter,null,h(b.Button,{size:'small'},'Cancel'),h(b.Button,null,'Save')));assert.equal(b.calls[0].size,'small');assert.doesNotMatch(b.calls[1].className??'',/w-full/);});
