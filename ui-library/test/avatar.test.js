import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createAvatar} from '../src/Avatar.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js'),out=read('../src/Avatar.js'),manifest=JSON.parse(read('../avatar-manifest.json'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const ui=createAvatar({React,animate:()=>{throw Error('Unexpected SSR animation')}}),h=React.createElement;
test('avatar family and geometry helpers retain original function bodies',()=>{for(const n of manifest.symbols)assert.equal(def(out,n),def(source,n));});
test('avatar initials, stable color and named sizes retain original fallback semantics',()=>{
 assert.equal(ui.avatarInitials(' Ada Lovelace '),'AL');assert.equal(ui.avatarInitials('  '),'?');assert.equal(ui.avatarColorKey('user__suffix'),ui.avatarColorKey('user'));
 for(const size of ['badge','inline','xs','response','sm','group','md','row','picker','lg','profile','xl','preview','fill']){
  const html=renderToStaticMarkup(h(ui.Avatar,{name:'Ada Lovelace',alt:'Ada',size}));assert(html.includes('aria-label="Ada"'));assert(html.includes('rounded-full'));assert(html.includes('bg-avatar-'));
 }
 assert.equal(renderToStaticMarkup(h(ui.Avatar,{fallback:h('span',null,'Custom fallback')})),'<span>Custom fallback</span>');
 for(const shape of Object.keys(ui.avatarShapes))assert(renderToStaticMarkup(h(ui.Avatar,{name:'Ada',shape,overlay:h('span',null,'Overlay')})).includes('clipPath'));
});
test('image loading, completed cache and error fallback preserve source events',()=>{
 let state='loading',errors=0;
 const R={createElement:(type,props,...children)=>({type,props:children.length?{...props,children}:props}),useState:()=>[state,v=>state=v],Fragment:'Fragment'};
 const local=createAvatar({React:R,animate:()=>{},compilerRuntime:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))}});
 const props={src:'image.png',name:'Ada',loadingFallback:'Loading',onImageError:()=>errors++};
 let tree=local.AvatarImage(props),image=tree.props.children[0];assert.equal(image.props.hidden,true);image.props.ref({complete:true,naturalWidth:20});assert.equal(state,'loaded');
 tree=local.AvatarImage(props);assert.equal(tree.props.children[0].props.hidden,false);assert.equal(tree.props.children[1],null);
 tree.props.children[0].props.onError();assert.equal(state,'error');assert.equal(errors,1);assert.equal(local.AvatarImage(props).type,local.AvatarFallback);
 state='loading';local.AvatarImage(props).props.children[0].props.ref({complete:true,naturalWidth:0});assert.equal(state,'error');
});
