import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createProviderArtwork} from '../src/ProviderArtwork.js';
import {createAssetIcon} from '../src/AssetIcon.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/ProviderArtwork.js'),manifest=JSON.parse(read('../provider-artwork-manifest.json'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
test('provider artwork components, SVG initializers and gradient detection retain original bodies',()=>{
 for(const n of manifest.symbols)assert.equal(def(out,n),def(source,n));
 const i=source.indexOf('(wOi = {');assert(out.includes(source.slice(i+7,source.indexOf('}));',i)+1)));
});
test('all provider presets render through real AssetIcon with requested geometry',()=>{
 const {ProviderArtwork,providerArtworkAssets}=createProviderArtwork({React,AssetIcon:createAssetIcon(React),useDarkTheme:()=>false});
 for(const [artwork,sizes] of Object.entries(providerArtworkAssets))for(const [size,asset] of Object.entries(sizes)){
  const markup=renderToStaticMarkup(React.createElement(ProviderArtwork,{artwork,size:Number(size)}));
  assert(markup.includes('viewBox="'+asset.canvas.viewBox+'"'));assert(markup.includes('width="'+size+'"'));assert(markup.includes('<path'));
 }
});
test('Figma follows supplied theme and forwards size/style',()=>{
 const render=dark=>{const {ProviderArtwork}=createProviderArtwork({React,AssetIcon:createAssetIcon(React),useDarkTheme:()=>dark});return renderToStaticMarkup(React.createElement(ProviderArtwork,{artwork:'figma-document',size:32,style:{opacity:0.5}}));};
 const light=render(false),dark=render(true);assert.notEqual(light,dark);for(const html of [light,dark]){assert(html.includes('width="32"'));assert(html.includes('opacity:0.5'));assert(html.includes('viewBox="0 0 24 24"'));}
});
test('repeated gradient artwork isolates IDs and keeps its URL references valid',()=>{
 const {ProviderArtwork,providerArtworkAssets}=createProviderArtwork({React,AssetIcon:createAssetIcon(React),useDarkTheme:()=>false});
 const entry=Object.entries(providerArtworkAssets).find(([,sizes])=>sizes[24].hasGradients);assert(entry,'gradient fixture exists');
 const html=renderToStaticMarkup(React.createElement('div',null,React.createElement(ProviderArtwork,{artwork:entry[0]}),React.createElement(ProviderArtwork,{artwork:entry[0]})));
 const ids=[...html.matchAll(/ id="([^"]+)"/g)].map(m=>m[1]);assert(ids.length>0);assert.equal(new Set(ids).size,ids.length);
 for(const m of html.matchAll(/url\(#([^)]*)\)/g))assert(ids.includes(m[1]),m[1]);
});
