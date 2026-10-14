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
 const ui=createResourceCards({React,AssetIcon:()=>null}),h=React.createElement;
 for(const [variant,classes] of [['composer-attachment','w-fit rounded-lg'],['thread-attachment','w-50 rounded-2xl'],['file-tile','w-50 shrink-0 rounded-2xl'],['artifact-list','rounded-2xl border']])assert(renderToStaticMarkup(h(ui.ResourceCard,{variant},'Title')).includes(classes));
 const card=renderToStaticMarkup(h(ui.AttachmentCard,{title:'report.txt',subtitle:'Text',onClick:()=>{},onRemove:()=>{},onRemoveAriaLabel:'Remove report.txt'}));
 assert(card.includes('aria-label="report.txt"'));assert(card.includes('aria-label="Remove report.txt"'));assert(card.includes('pe-6 ps-1.5'));assert(card.includes('viewBox="0 0 21 21"'));
 const preview=renderToStaticMarkup(h(ui.AttachmentPreviewCard,{filename:'image.png',preview:h('img',{src:'fixture.png',alt:''}),onRemove:()=>{},removeAriaLabel:'Remove image.png'}));
 assert(preview.includes('h-30.5 w-40'));assert(preview.includes('group-hover/composer-attachment:opacity-100'));
});
test('removal isolates events and preserves pill keyboard activation',()=>{
 const calls=[],R={createElement:(type,props,...children)=>({type,props:children.length?{...props,children}:props})};
 const ui=createResourceCards({React:R,AssetIcon:'Icon',compilerRuntime:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))}});
 const event=key=>({key,preventDefault:()=>calls.push('prevent'),stopPropagation:()=>calls.push('stop')});
 const remove=ui.AttachmentRemoveButton({onRemove:()=>calls.push('remove')});
 remove.props.onPointerDown(event());remove.props.onClick(event());assert.deepEqual(calls,['prevent','stop','prevent','stop','remove']);calls.length=0;
 const pill=ui.AttachmentPill({children:'File',onRemove:()=>calls.push('remove')});assert.equal(pill.props.tabIndex,-1);
 const control=pill.props.children[2];control.props.onKeyDown(event('Escape'));assert.deepEqual(calls,[]);
 control.props.onKeyDown(event('Enter'));control.props.onKeyDown(event(' '));assert.deepEqual(calls,['prevent','stop','remove','prevent','stop','remove']);
});


test('progress ring clamps invalid percentages and preserves motion and geometry',()=>{
 const ui=createResourceCards({React,AssetIcon:()=>null}),h=React.createElement;
 for(const [percent,offset,opacity] of [[-1,100,0],[NaN,100,0],[Infinity,100,0],[0,100,0],[25,75,1],[100,0,1],[101,0,1]]){
  const markup=renderToStaticMarkup(h(ui.ProgressRing,{percent,size:24,strokeWidth:2}));
  assert(markup.includes('stroke-dashoffset="'+offset+'"'));assert(markup.includes('opacity="'+opacity+'"'));assert(markup.includes('r="11"'));assert(markup.includes('stroke-dashoffset 120ms ease-out'));
 }
 const animated=renderToStaticMarkup(h(ui.ProgressRing,{percent:60,animateOnMount:true,animateOnMountDelayMs:90}));
 assert(animated.includes('_fillOnMount_77ve5_1'));assert(animated.includes('animation-delay:90ms'));
 const reduced=renderToStaticMarkup(h(ui.ProgressRing,{percent:60,animateOnMount:true,reducedMotion:true}));
 assert(!reduced.includes('_fillOnMount_77ve5_1'));assert(reduced.includes('transition:none'));
});
test('attachment upload overlay retains determinate and indeterminate accessibility',()=>{
 const ui=createResourceCards({React,AssetIcon:()=>null}),h=React.createElement;
 for(const percentage of [undefined,0,45,100]){
  const markup=renderToStaticMarkup(h(ui.AttachmentUploadProgress,{label:'Processing preview',percentage}));
  assert(markup.includes('role="progressbar"'));assert(markup.includes('aria-label="Processing preview"'));
  assert.equal(markup.includes('aria-valuenow='),percentage!==undefined&&percentage!==0);
  assert.equal(markup.includes('motion-safe:animate-spin'),percentage===undefined||percentage===0);
  assert(markup.includes('backdrop-blur-xs'));
 }
});
