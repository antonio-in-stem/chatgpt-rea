import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {describeFile,fileExtension} from '../src/fileDescriptor.js';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const source=read('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),out=read('../src/fileDescriptor.js');
const start=source.indexOf('function B5('),init=source.indexOf('function qwi(',start),end=init+source.slice(init).search(/^}\r?$/m)+1,body=source.slice(start,end);
const context={t:fn=>fn};vm.createContext(context);vm.runInContext(body+';qwi();',context);
test('complete descriptor block and lookup tables are preserved',()=>assert(out.includes(body)));
test('extension parsing handles hidden files, Windows paths and extensionless build files',()=>{
 for(const [name,expected] of [['C:\\folder\\REPORT.PDF','pdf'],['.gitignore','gitignore'],['Makefile','makefile'],['Dockerfile','dockerfile'],['dir.with.dot/file',null],['file.',null],['  a.JpG  ','jpg'],['',null]])assert.equal(fileExtension(name),expected);
});
test('classification matches shipped source across MIME, extension, note and provider combinations',()=>{
 const names=['report.pdf','data.csv','data.tsv','book.xlsx','slide.pptx','slide.key','letter.docx','index.html','main.rs','.env','Makefile','archive.zip','audio.mp3','video.mp4','photo.png','photo.heic','mesh.glb','unknown.foo','plain'];
 const mimes=[undefined,'','text/plain','application/pdf','application/vnd.google-apps.document','application/vnd.google-apps.spreadsheet','video/mp4','image/jpeg','text/html; charset=utf-8','application/octet-stream'];
 for(const fileName of names)for(const mimeType of mimes)for(const isNote of [false,true])for(const sourceUrl of [undefined,'https://docs.google.com/spreadsheets/d/demo']){
  const args={fileName,mimeType,isNote,sourceUrl};assert.deepEqual(describeFile(args),JSON.parse(JSON.stringify(context.pwi(args))));
 }
 assert.equal(describeFile({fileName:'sample.txt'}).label,'TXT');assert.equal(describeFile({fileName:'photo.PNG'}).isImageLike,true);assert.equal(describeFile({fileName:'mesh.glb'}).iconKey,'three-d');
});
