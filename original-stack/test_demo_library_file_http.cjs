'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {demoLibraryFileHttp}=require('./demo_library_file_http.cjs'),{demoPagesHttp}=require('./demo_pages_http.cjs');
async function fixture(run){const root=fs.mkdtempSync(path.join(os.tmpdir(),'rea-library-upload-')),settings=path.join(root,'demo-sidebar-settings.json');const call=(method,url,body,progress,signal)=>demoLibraryFileHttp(method,new URL(url.startsWith('/')?'https://chatgpt.com'+url:url),typeof body==='object'&&!ArrayBuffer.isView(body)&&!(body instanceof ArrayBuffer)?JSON.stringify(body):body,settings,fs,path,progress,signal);const pages=(method,route,body)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),body==null?undefined:JSON.stringify(body),settings,fs,path);try{await run({root,call,pages});}finally{fs.rmSync(root,{recursive:true,force:true});}}
const create=(bytes)=>({entry_surface:'codex_library_upload',file_name:'demo.txt',file_size:bytes.length,mime_type:'text/plain',use_case:'my_files',store_in_library:true,library_persistence_mode:'required'});
const finish=(file,directory_id)=>({entry_surface:'codex_library_upload',file_id:file.file_id,file_name:'demo.txt',mime_type:'text/plain',use_case:'my_files',metadata:{store_in_library:true},library_persistence_mode:'required',directory_id});
test('original upload stages preserve bytes, finalize once and populate nested browse and preview',()=>fixture(async({root,call,pages})=>{
 const folder=pages('POST','/files/library/directories',{name:'Uploads'}),bytes=Buffer.from('Original text preview\nUnicode: café\n<script>plain text</script>\n');
 const reservation=await call('POST','/files',create(bytes)).json();assert.deepEqual(pages('GET','/files/library/nodes?parent_directory_id='+folder.id).items,[]);
 const progress=[];assert.equal(call('PUT',reservation.upload_url,bytes,v=>progress.push(v)).status,200);assert.deepEqual(progress,[{loaded:bytes.length,total:bytes.length}]);
 const response=call('POST','/files/process_upload_stream',finish(reservation,folder.id)),events=(await response.text()).trim().split('\n').map(JSON.parse);
 assert.equal(events[1].event,'file.processing.completed');const id=events[1].extra.metadata_object_id;assert.match(id,/^libfile[-_][A-Za-z0-9_-]+$/);assert.equal(events[1].extra.library_persistence_result,undefined);
 const node=pages('GET','/files/library/nodes?include_files=true&parent_directory_id='+folder.id).items[0];assert.equal(node.id,id);assert.equal(node.file_size_bytes,bytes.length);assert.equal(pages('GET','/files/library/directories/'+folder.id).item_count,1);
 assert.deepEqual(pages('GET','/files/library/nodes?include_files=false&parent_directory_id='+folder.id).items,[]);assert.deepEqual(pages('GET','/files/library/nodes?categories=pages&parent_directory_id='+folder.id).items,[]);
 assert.equal((await call('GET','/files/library/files/'+id).json()).name,'demo.txt');assert.equal((await call('GET','/files/library/files/'+id+'/content_url').json()).content_url,'https://chatgpt.com/api/library/files/'+id+'/content');
 assert.deepEqual(Buffer.from(await call('GET','/files/library/files/'+id+'/content_redirect').arrayBuffer()),bytes);
 assert.equal((await call('GET','/files/download/'+reservation.file_id+'?inline=true').json()).download_url,'https://chatgpt.com/api/library/files/'+id+'/content');
 call('POST','/files/process_upload_stream',finish(reservation,folder.id));assert.equal(pages('GET','/files/library/nodes?parent_directory_id='+folder.id).items.length,1);
 pages('DELETE','/files/library/directories/'+folder.id);assert.throws(()=>call('GET','/files/library/files/'+id+'/content_redirect'),/Unavailable/);
}));
test('upload validates sizes, destination, retries, cancellation and atomic failures',()=>fixture(async({root,call,pages})=>{
 const bytes=Buffer.from('bytes'),file=await call('POST','/files',create(bytes)).json(),catalog=path.join(root,'demo-pages.json'),stored=path.join(root,file.file_id+'.bin');
 assert.throws(()=>call('POST','/files/process_upload_stream',finish(file)),/missing/);assert.throws(()=>call('PUT',file.upload_url,Buffer.from('wrong-length')),/length/);
 fs.writeFileSync(stored+'.pending','foreign');assert.throws(()=>call('PUT',file.upload_url,bytes));assert.equal(fs.readFileSync(stored+'.pending','utf8'),'foreign');assert.equal(fs.existsSync(stored),false);fs.unlinkSync(stored+'.pending');
 call('PUT',file.upload_url,bytes);assert.throws(()=>call('PUT',file.upload_url,Buffer.from('other')),/differ/);
 const before=fs.readFileSync(catalog);assert.throws(()=>call('POST','/files/process_upload_stream',finish(file,'rea-directory-99')),/directory/);assert.deepEqual(fs.readFileSync(catalog),before);
 fs.writeFileSync(catalog+'.pending','foreign');assert.throws(()=>call('POST','/files/process_upload_stream',finish(file)));assert.deepEqual(fs.readFileSync(catalog),before);fs.unlinkSync(catalog+'.pending');
 const abort=new AbortController();abort.abort();assert.throws(()=>call('POST','/files/process_upload_stream',finish(file),null,abort.signal));assert.deepEqual(fs.readFileSync(catalog),before);
 call('POST','/files/process_upload_stream',finish(file));assert.equal(pages('GET','/files/library/nodes').items.length,1);
 assert.equal(call('POST','https://example.invalid/files',create(bytes)),null);
}));
