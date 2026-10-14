import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import * as ReactDOM from 'react-dom';
import {renderToStaticMarkup} from 'react-dom/server';
import {createMenu} from '../src/Menu.js';
import {createTooltip} from '../src/Tooltip.js';
import {createAssetIcon} from '../src/AssetIcon.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
test('scroll observers, merged refs and overlay wrappers retain original bodies',()=>{const source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/MenuInfrastructure.js'),manifest=JSON.parse(read('../menu-infrastructure-manifest.json'));const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};for(const n of manifest.symbols)assert.equal(def(out,n),def(source,n));});
test('full original menu composition creates closed accessible trigger',()=>{const tooltip=createTooltip({React,ReactDOM}),m=createMenu({React,ReactDOM,tooltip,AssetIcon:createAssetIcon(React),eventBridge:{subscribe:()=>()=>{}}}),h=React.createElement;const html=renderToStaticMarkup(h(m.Dropdown,{triggerButton:h('button',null,'Actions')},h(m.MenuItem,{onSelect:()=>{}},'Action')));assert.match(html,/aria-haspopup="menu"/);assert.match(html,/aria-expanded="false"/);assert.doesNotMatch(html,/role="menuitem"/);});

test('original preset factory renders selected radio artwork through real SVG pipeline',()=>{const Icon=createAssetIcon(React).fromPreset({name:'fixture',canvas:{width:16,height:16,viewBox:'0 0 16 16'},paint:{kind:'monochrome'},capabilities:['icon'],body:'<path d="M0 0h1v1z"/>',hasGradients:false});const html=renderToStaticMarkup(React.createElement(Icon));assert.match(html,/_Icon_uttcz_1/);assert.match(html,/viewBox="0 0 16 16"/);});

test('menu search preserves original input, responsive artwork and sticky shell',()=>{const tooltip=createTooltip({React,ReactDOM}),m=createMenu({React,ReactDOM,tooltip,AssetIcon:createAssetIcon(React),eventBridge:{subscribe:()=>()=>{}}}),h=React.createElement;const html=renderToStaticMarkup(h(m.MenuSearchInput,{'aria-label':'Search',sticky:true,variant:'inset',defaultValue:'Text'}));assert.match(html,/sticky top-0/);assert.match(html,/border-primary-outline/);assert.match(html,/autofocus=""/);assert.match(html,/_CompactSource_ym4jk_2/);assert.match(html,/_LeadingSource_ym4jk_6/);assert.match(html,/value="Text"/);});
