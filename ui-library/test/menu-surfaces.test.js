import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createMenuSurfaces} from '../src/MenuSurfaces.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/MenuSurfaces.js'),manifest=JSON.parse(read('../menu-surfaces-manifest.json'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);},h=React.createElement;
function setup(){let item,content,tooltip,checkbox,radio;const pass=p=>p.children;const ui=createMenuSurfaces({React,primitives:{Trigger:pass,Group:pass,CheckboxItem:p=>{checkbox=p;return p.children;},RadioItem:p=>{radio=p;return p.children;},RadioGroup:pass,ItemIndicator:pass,Item:p=>{item=p;return React.cloneElement(p.children,{className:p.className});},Content:p=>{content=p;return h('div',{className:p.className},p.children);}},Tooltip:p=>{tooltip=p;return p.children;},AssetIcon:()=>h('svg'),ScrollArea:pass});return {ui,render:(name,props,children='Title')=>renderToStaticMarkup(h(ui[name],props,children)),get:()=>({item,content,tooltip,checkbox,radio})};}
test('menu bodies and tooltip/style initializer remain identical to source',()=>{for(const n of manifest.symbols)assert.equal(def(out,n),def(source,n));const start=source.indexOf('(eMi = (e) =>'),end=source.indexOf('      (y7 = {',start),slice=source.slice(start,end).trim().replace(/,$/,';');assert(out.includes(slice));assert.equal(createHash('sha256').update(slice).digest('hex'),manifest.initializerSha256);});
test('destructive, disabled and display items retain original action suppression',()=>{
 const a=setup();let clicks=0,selections=0,prevented=0;const event={preventDefault:()=>prevented++};a.render('MenuItem',{tone:'destructive',onClick:()=>clicks++,onSelect:()=>selections++});assert.match(a.get().item.className,/hover:bg-danger-soft-alpha/);a.get().item.onClick(event);a.get().item.onSelect(event);assert.equal(clicks,1);assert.equal(selections,1);
 a.render('MenuItem',{disabled:true,focusableWhenDisabled:true,onClick:()=>clicks++,onSelect:()=>selections++});assert.equal(a.get().item.disabled,false);assert.equal(a.get().item['aria-disabled'],true);a.get().item.onClick(event);a.get().item.onSelect(event);assert.equal(clicks,1);assert.equal(selections,1);assert.equal(prevented,1);
 a.render('MenuItem',{variant:'display',onClick:()=>clicks++});a.get().item.onClick(event);assert.equal(clicks,1);assert.equal(prevented,2);
});
test('row subtitles, shortcut, icon and overflow presentation are retained',()=>{
 const a=setup();const html=a.render('MenuItem',{SubText:'Description',keyboardShortcut:'Ctrl+K',leftIcon:h('svg'),rightText:'Local',textOverflow:'fade',tooltipOpenWhen:'trigger-overflows'});assert.match(html,/Description/);assert.match(html,/Ctrl\+K/);assert.match(html,/Local/);assert.match(html,/text-fade-truncate/);assert.match(html,/data-tooltip-overflow-target=""/);
 a.render('MenuItem',{tooltipText:'Details',tooltipVariant:'description',tooltipInteractive:true});assert.equal(a.get().tooltip.sideOffset,16);assert.equal(a.get().tooltip.keyboardNavigation,true);assert.equal(a.get().tooltip.closeOnTriggerBlur,false);
});
test('panel variants retain original classes and content bounds',()=>{
 const a=setup();a.render('MenuContent',{surface:'chatgpt',size:'descriptive',rowLayout:'single-line'});const p=a.get().content;assert.match(p.className,/rounded-3xl/);assert.match(p.className,/_descriptiveRows_14z1j_2/);assert.match(p.className,/_singleLineRows_14z1j_2/);assert.match(p.style.maxWidth,/--container-xs/);assert.equal(p.collisionPadding,6);assert.equal(p.sideOffset,1);
 a.render('MenuContent',{surface:'panel',maxWidth:'wide'});assert.match(a.get().content.className,/rounded-2xl/);assert.match(a.get().content.style.maxWidth,/--container-sm/);
});
test('sections and status messages retain styling and caller semantics',()=>{const a=setup();assert.match(a.render('MenuSectionLabel',{}),/data-menu-section-label="true"/);assert.match(a.render('MenuSeparator',{variant:'chatgpt'}),/bg-border-subtle/);assert.match(a.render('MenuMessage',{tone:'error',role:'alert',variant:'inset'}),/role="alert"/);assert.match(a.render('MenuSection',{size:'five-rows'}),/_fixedSection_1ebbz_26/);});

test('checkbox default keeps menu open, closeOnSelect and links preserve source choices',()=>{const a=setup();let prevented=0,selected=0;const e={preventDefault:()=>prevented++};a.render('MenuCheckboxItem',{checked:true,onSelect:()=>selected++});a.get().checkbox.onSelect(e);assert.equal(prevented,1);assert.equal(selected,1);a.render('MenuCheckboxItem',{closeOnSelect:true});a.get().checkbox.onSelect(e);assert.equal(prevented,1);a.render('MenuCheckboxItem',{href:'#local'});a.get().checkbox.onSelect(e);assert.equal(prevented,1);assert.equal(a.get().checkbox.asChild,true);});
test('checkbox switch and radio variants preserve indicators and disabled styles',()=>{const a=setup();assert.match(a.render('MenuCheckboxItem',{indicator:'switch',checked:true}),/data-state="checked"/);for(const variant of ['default','descriptive','icon','swatch'])a.render('MenuRadioItem',{variant,value:'one',disabled:true});assert.equal(a.get().radio.disabled,true);assert.match(a.get().radio.className,/rounded-full/);});
