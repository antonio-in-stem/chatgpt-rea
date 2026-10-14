import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createFileIcon} from '../src/FileIcon.js';
import {createAssetIcon} from '../src/AssetIcon.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/FileIcon.js'),manifest=JSON.parse(read('../file-icon-manifest.json'));
const def=(s,n)=>{const i=s.indexOf('function '+n+'(');return s.slice(i,i+s.slice(i).search(/^}\r?$/m)+1);};
const {FileIcon,legacyFileArtwork}=createFileIcon({React,AssetIcon:createAssetIcon(React),useDarkTheme:()=>false});
const render=props=>renderToStaticMarkup(React.createElement(FileIcon,props));
test('full file renderer and legacy artwork bodies remain identical to source',()=>{for(const n of manifest.symbols)assert.equal(def(out,n),def(source,n));});
test('original file renderer covers formats, sizes and both visual variants',()=>{
 for(const fileName of ['a.pdf','a.csv','a.docx','a.rs','a.png','a.mp4','a.mp3','a.zip','a.glb','a.html','a.pptx','a.xlsx','a.key','a.txt','a.fig','unknown'])for(const size of [12,16,20,24,32])for(const variant of ['branded','monochrome']){
  const html=render({fileName,size,variant});assert(html.includes('<svg'),fileName+'/'+size+'/'+variant);assert(html.includes('<path'));
 }
 for(const libraryProvider of ['box','dropbox','google_drive','sharepoint','onedrive'])assert(render({fileName:'unknown',libraryProvider}).includes('<svg'));
 for(const mimeType of ['application/vnd.google-apps.document','application/vnd.google-apps.spreadsheet','application/vnd.google-apps.presentation'])assert(render({mimeType}).includes('<svg'));
 for(const libraryArtifactType of ['site_preview','deep_research_report','app_block','writing_block'])assert(render({fileName:'a.pdf',libraryArtifactType}).includes('<svg'));
});
test('legacy SVG family preserves overrides and complete key map',()=>{
 assert.equal(Object.keys(legacyFileArtwork).length,20);
 for(const {Icon} of Object.values(legacyFileArtwork)){
  const html=renderToStaticMarkup(React.createElement(Icon,{width:31,height:29,'aria-label':'File'}));assert(html.includes('width="31"'));assert(html.includes('height="29"'));assert(html.includes('aria-label="File"'));
 }
 const html=render({fileName:'a.pdf',style:{color:'purple'}});assert(html.includes('color:purple'));
 for(const size of [12,16,20,24,32])assert(render({fileName:'a.txt',size}).includes('width="'+size+'"'));
});
