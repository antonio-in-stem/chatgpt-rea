import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import * as ReactDOM from 'react-dom';
import {renderToStaticMarkup} from 'react-dom/server';
import {createDialog} from '../src/Dialog.js';
import {createTooltip} from '../src/Tooltip.js';
import {createAssetIcon} from '../src/AssetIcon.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),manifest=JSON.parse(read('../dialog-manifest.json')),source=read('../../original-stack/state/recovered-all/readable/assets/'+manifest.source),output=read('../src/Dialog.js'),h=React.createElement;
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
function setup(visualScale=1){let content;const ui=createDialog({React,visualScale,tooltip:createTooltip({React,ReactDOM}),AssetIcon:createAssetIcon(React),primitives:{Content:p=>{content=p;return h('div',{className:p.className,style:p.style},p.children);},Close:p=>h('button',{className:p.className},p.children),Overlay:p=>p.children,Title:'h2',Description:'p'}});return {ui,content:()=>content,render:p=>renderToStaticMarkup(h(ui.DialogContent,{modal:false,contentPosition:'inline',...p},'Body'))};}
test('complete styled dialog controller, stylesheet map and icon initializers match original bodies',()=>{for(const n of [...manifest.symbols,...manifest.initializers])assert.equal(def(output,n),def(source,n));});
test('original default/compact/form/chatgpt styles and close accessibility are retained',()=>{const a=setup();assert.match(a.render({size:'narrow'}),/rounded-3xl/);assert.match(a.render({size:'narrow'}),/w-\[380px\]/);assert.match(a.render({radius:'compact'}),/rounded-2xl/);assert.match(a.render({variant:'form'}),/rounded-form-dialog/);assert.match(a.render({variant:'chatgpt'}),/dark:bg-surface-tertiary/);assert.match(a.render({dialogCloseLabel:'Dismiss local'}),/Dismiss local/);assert.doesNotMatch(a.render({showDialogClose:false}),/<button/);});
test('viewport sizing and caller style override retain original precedence',()=>{const a=setup(2);a.render({size:'sheet'});assert.equal(a.content().style.width,'calc(100vw / 2)');assert.equal(a.content().style.height,'calc(70dvh / 2)');a.render({widthHint:600,style:{width:700}});assert.equal(a.content().style.width,700);a.render({widthHint:-1});assert.equal(a.content().style.width,undefined);});
test('outside-click cancellation and pointer isolation preserve caller callbacks',()=>{let prevented=0,stopped=0,called=0;const a=setup();a.render({shouldIgnoreClickOutside:true,onPointerDownOutside:()=>called++,onPointerDown:()=>called++});a.content().onPointerDownOutside({preventDefault:()=>prevented++});a.content().onPointerDown({stopPropagation:()=>stopped++});assert.equal(prevented,1);assert.equal(stopped,1);assert.equal(called,2);});
