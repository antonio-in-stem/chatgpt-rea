import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createResourceCards} from '../src/ResourceCards.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const initial=read('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js'),shared=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),generated=read('../src/ResourceCards.js'),manifest=JSON.parse(read('../resource-cards-manifest.json'));
const def=(s,n)=>{const start=s.indexOf('function '+n+'(');return s.slice(start,start+s.slice(start).search(/^}\r?$/m)+1);};
test('resource surfaces and close artwork preserve recovered function bodies',()=>{
 for(const n of manifest.symbols)assert.equal(def(generated,n),def(initial,n));
 for(const n of manifest.sharedSymbols)assert.equal(def(generated,n),def(shared,n));
});
test('resource variants retain geometry and preview/remove semantics under React',()=>{
 const ui=createResourceCards({React,CompactIcon:()=>null}),h=React.createElement;
 for(const [variant,classes] of [['composer-attachment','w-fit rounded-lg'],['thread-attachment','w-50 rounded-2xl'],['file-tile','w-50 shrink-0 rounded-2xl'],['artifact-list','rounded-2xl border']])assert(renderToStaticMarkup(h(ui.ResourceCard,{variant},'Title')).includes(classes));
 const card=renderToStaticMarkup(h(ui.AttachmentCard,{title:'report.txt',subtitle:'Text',onClick:()=>{},onRemove:()=>{},onRemoveAriaLabel:'Remove report.txt'}));
 assert(card.includes('aria-label="report.txt"'));assert(card.includes('aria-label="Remove report.txt"'));assert(card.includes('pe-6 ps-1.5'));assert(card.includes('viewBox="0 0 21 21"'));
 const preview=renderToStaticMarkup(h(ui.AttachmentPreviewCard,{filename:'image.png',preview:h('img',{src:'fixture.png',alt:''}),onRemove:()=>{},removeAriaLabel:'Remove image.png'}));
 assert(preview.includes('h-30.5 w-40'));assert(preview.includes('group-hover/composer-attachment:opacity-100'));
});
test('removal isolates events and preserves pill keyboard activation',()=>{
 const calls=[],R={createElement:(type,props,...children)=>({type,props:children.length?{...props,children}:props})};
 const ui=createResourceCards({React:R,CompactIcon:'Icon',compilerRuntime:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))}});
 const event=key=>({key,preventDefault:()=>calls.push('prevent'),stopPropagation:()=>calls.push('stop')});
 const remove=ui.AttachmentRemoveButton({onRemove:()=>calls.push('remove')});
 remove.props.onPointerDown(event());remove.props.onClick(event());assert.deepEqual(calls,['prevent','stop','prevent','stop','remove']);calls.length=0;
 const pill=ui.AttachmentPill({children:'File',onRemove:()=>calls.push('remove')});assert.equal(pill.props.tabIndex,-1);
 const control=pill.props.children[2];control.props.onKeyDown(event('Escape'));assert.deepEqual(calls,[]);
 control.props.onKeyDown(event('Enter'));control.props.onKeyDown(event(' '));assert.deepEqual(calls,['prevent','stop','remove','prevent','stop','remove']);
});
