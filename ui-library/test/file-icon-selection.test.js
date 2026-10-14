import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {resolveFileIcon,resolveFileProvider,describeFileArtwork} from '../src/fileIconSelection.js';
import {describeFile,fileExtension,fileMimeOverride} from '../src/fileDescriptor.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/fileIconSelection.js'),manifest=JSON.parse(read('../file-icon-selection-manifest.json'));
const def=n=>{const i=source.indexOf('function '+n+'(');return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const block=source.slice(source.indexOf('function MTi('),source.indexOf('function wEi(')+def('wEi').length),body=block+'\n'+manifest.symbols.map(def).join('\n');
const ctx={t:f=>f,qwi:()=>{},pwi:describeFile,B5:fileExtension,fwi:fileMimeOverride,URL,TextEncoder,atob,btoa};vm.createContext(ctx);vm.runInContext('let GEi,XEi,ZEi;'+body+';QEi();',ctx);
test('provider parser and resolver bodies remain byte-identical',()=>assert(out.includes(body)));
test('provider resolution retains identifier validation and mismatched provider rejection',()=>{
 assert.equal(resolveFileProvider({mountedLibraryFileId:'external-gdrive:file:abcde'}),'google_drive');
 assert.equal(resolveFileProvider({mountedLibraryFileId:'external-gdrive:file:abcde',libraryProvider:'box'}),null);
 assert.equal(resolveFileProvider({mountedLibraryFileId:'external-box:file:12345'}),'box');
 assert.equal(resolveFileProvider({mountedLibraryFileId:'external-box:file:0123'}),null);
 assert.equal(resolveFileProvider({mountedLibraryFileId:'external-dropbox:file:id:abc_123'}),'dropbox');
});
test('icon resolution matches recovered precedence across file, source MIME and provider cases',()=>{
 for(const fileName of ['a.pdf','a.gdoc','a.boxnote','a.fig','a.pages','a.unknown','a.txt','a.docx'])for(const libraryProvider of [undefined,'google_drive','box','dropbox','sharepoint','onedrive'])for(const sourceMimeType of [undefined,'text/plain','application/pdf'])for(const sourceUrl of [undefined,'https://docs.google.com/document/d/abcde','https://docs.google.com.evil.invalid/document/d/a']){
  const args={fileName,libraryProvider,sourceMimeType,sourceUrl};assert.deepEqual(resolveFileIcon(args),JSON.parse(JSON.stringify(ctx.qEi(args))));
 }
 assert.equal(resolveFileIcon({libraryProvider:'google_drive',sourceUrl:'https://docs.google.com/document/d/abcde'}).iconKey,'google-docs');
 assert.equal(resolveFileIcon({libraryProvider:'box',fileName:'file.unknown'}).kind,'brand');
 assert.equal(describeFileArtwork({fileName:'design.fig'}).iconKey,'figma-document');
});
