import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createDropdownController} from '../src/DropdownController.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/DropdownController.js'),manifest=JSON.parse(read('../dropdown-controller-manifest.json'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
// Spies inspect the controller/primitive boundary; they are not substitute menu implementations.
function setup(){let root,content,trigger;const pass=p=>p.children;const ui=createDropdownController({React,visualScale:1.25,eventBridge:{subscribe:()=>()=>{}},primitives:{Root:p=>{root=p;return p.children;},Content:p=>{content=p;return p.children;},Trigger:p=>{trigger=p;return p.children;},Portal:pass,Layer:pass,ModalLayer:pass}});return {ui,render:p=>renderToStaticMarkup(React.createElement(ui.Dropdown,{triggerButton:React.createElement('button',null,'Menu'),...p},'Items')),get:()=>({root,content,trigger})};}
test('dropdown controller and helpers preserve shipped bodies',()=>{for(const n of manifest.symbols)assert.equal(def(out,n),def(source,n));});
test('menu dimensions and placement retain source presets',()=>{const {ui}=setup();assert.equal(ui.menuWidthClass('railMenu'),'w-57');assert.equal(ui.menuWidthClass('panel'),'w-[280px]');assert.equal(ui.menuMaxHeight('list','available'),'min(250px, available, calc(100vh - 16px))');assert.equal(ui.overlaySide({closest:()=>({getAttribute:()=> 'left'})}),undefined);assert.equal(ui.overlaySide({closest:()=>({getAttribute:()=> 'top'})}),'top');});
test('controller forwards exact alignment, zoom, width and event boundaries',()=>{const a=setup();a.render({open:true,contentWidth:'railMenu',side:'right',align:'end',alignOffset:-4,sideOffset:4,matchTriggerWidth:true});const {content,root}=a.get();assert.equal(root.open,true);assert.equal(content.side,'right');assert.equal(content.alignOffset,-4);assert.equal(content.style.zoom,1.25);assert.equal(content.style.width,'calc(var(--radix-dropdown-menu-trigger-width) / 1.25)');assert.equal(content.className,'w-57');assert.equal(content.role,'menu');});
test('disabled controller suppresses open state and content',()=>{const a=setup();const html=a.render({disabled:true,open:true});assert.equal(a.get().root.open,false);assert.equal(a.get().trigger.disabled,true);assert.doesNotMatch(html,/Items/);});
test('missing menu primitives fail explicitly instead of approximating behavior',()=>{assert.throws(()=>createDropdownController({React}),/Missing dropdown primitive Root/);});
