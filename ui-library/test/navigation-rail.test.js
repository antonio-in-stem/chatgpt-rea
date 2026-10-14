import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createNavigationRail,navigationRailClasses} from '../src/NavigationRail.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js'),out=read('../src/NavigationRail.js');
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const h=React.createElement,{NavigationRail,ProfileFooter}=createNavigationRail({React,SidebarList:({children,className,itemSpacing})=>h('div',{className,'data-spacing':itemSpacing},children)});
test('rail uses original layout class strings and exact profile-footer body',()=>{
 assert.equal(def(out,'y2o'),def(source,'y2o'));for(const value of Object.values(navigationRailClasses))assert(def(source,'D2o').includes('`'+value+'`'));
});
test('rail separates fixed header/footer from scroll list and preserves codex border variant',()=>{
 for(const codex of [false,true]){
  const html=renderToStaticMarkup(h(NavigationRail,{codex,header:'HEADER',footer:'PROFILE',ariaLabel:'App navigation'},'DESTINATIONS'));
  assert(html.includes('data-app-navigation-rail="true"'));assert(html.indexOf('HEADER')<html.indexOf('DESTINATIONS'));assert(html.indexOf('DESTINATIONS')<html.indexOf('PROFILE'));
  assert(html.includes('data-spacing="rail"'));assert(html.includes('overflow-y-auto'));assert.equal(html.includes('electron:hidden'),codex);
 }
 assert(!renderToStaticMarkup(h(NavigationRail,null)).includes('Settings'));
});
test('profile footer keeps compact profile last and expanded profile first with optional divider',()=>{
 const compact=renderToStaticMarkup(h(ProfileFooter,{compact:true,leading:'PROFILE',trailing:'CONTROLS'}));assert(compact.indexOf('CONTROLS')<compact.indexOf('PROFILE'));assert(compact.includes('w-9'));assert(!compact.includes('border-t-hairline'));
 const expanded=renderToStaticMarkup(h(ProfileFooter,{leading:'PROFILE',trailing:'CONTROLS'}));assert(expanded.indexOf('PROFILE')<expanded.indexOf('CONTROLS'));assert(expanded.includes('border-t-hairline'));assert(expanded.includes('border-default'));
 assert(!renderToStaticMarkup(h(ProfileFooter,{showProfileDivider:false})).includes('border-t-hairline'));
 assert(renderToStaticMarkup(h(ProfileFooter,{showProfileDivider:true})).includes('border-token-border-heavy'));
});
