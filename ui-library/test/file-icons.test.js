import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createFileTypeGlyph,fileIconAssets,textFileIconAssets} from '../src/FileTypeGlyph.js';
import {createAssetIcon} from '../src/AssetIcon.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/FileTypeGlyph.js'),manifest=JSON.parse(read('../file-icons-manifest.json'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
test('all file icon initializer bodies and source lookup table are retained',()=>{
 for(const item of manifest.assets)assert.equal(def(out,item.initializer),def(source,item.initializer));
 const i=source.indexOf('(ROi = {');assert(out.includes(source.slice(i+7,source.indexOf('}));',i)+1)));
});
test('all recovered file glyphs render through real AssetIcon at source sizes',()=>{
 const Glyph=createFileTypeGlyph({React,AssetIcon:createAssetIcon(React)});
 for(const [key,entry] of Object.entries({...fileIconAssets,text:{assets:textFileIconAssets}}))for(const size of [16,20]){
  const markup=renderToStaticMarkup(React.createElement(Glyph,{iconKey:key,size,variant:'monochrome'}));
  assert(markup.includes('viewBox="'+entry.assets[size].canvas.viewBox+'"'));assert(markup.includes('<path'));assert(markup.includes('width="'+size+'"'));
 }
 const branded=renderToStaticMarkup(React.createElement(Glyph,{iconKey:'pdf'}));assert(branded.includes('text-file-pdf'));
 assert.throws(()=>renderToStaticMarkup(React.createElement(Glyph,{iconKey:'pdf',size:20})),/separate original artwork/);
 assert.equal(renderToStaticMarkup(React.createElement(Glyph,{iconKey:'unknown-provider'})),'');
});
