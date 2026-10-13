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

test('file lifecycle preserves bytes, distinguishes trash and permanent removal, and rejects stale mutations',()=>fixture(async({root,call,pages})=>{
 const bytes=Buffer.from('demo'),reservation=await call('POST','/files',create(bytes)).json();call('PUT',reservation.upload_url,bytes);const events=(await call('POST','/files/process_upload_stream',finish(reservation)).text()).trim().split('\n').map(JSON.parse),id=events[1].extra.metadata_object_id,route='/files/library/files/'+id;
 const folder=pages('POST','/files/library/directories',{name:'Destination'}),catalog=path.join(root,'demo-pages.json');
 const before=fs.readFileSync(catalog);fs.writeFileSync(catalog+'.pending','foreign');assert.throws(()=>call('PATCH',route,{file_name:'new.txt'}));assert.deepEqual(fs.readFileSync(catalog),before);fs.unlinkSync(catalog+'.pending');
 const renamed=await call('PATCH',route,{file_name:'renamed.txt'}).json();assert.equal(renamed.file_name,'renamed.txt');assert.equal(renamed.file_id,reservation.file_id);assert.equal(renamed.directory_id,null);
 assert.throws(()=>call('PATCH',route+'/move',{directory_id:'unknown'}),/directory/);call('PATCH',route+'/move',{directory_id:folder.id});
 assert.equal(pages('GET','/files/library/nodes?parent_directory_id='+folder.id).items[0].id,id);
 assert.equal(pages('POST','/files/library',{q:'renamed',include_uploaded_files:true}).items[0].directory_id,folder.id);
 assert.equal(pages('POST','/files/library',{include_uploaded_files:false}).items.length,0);
 const row={library_file_id:id,file_id:reservation.file_id,parent_directory_id:folder.id,file_name:'renamed.txt'};
 assert.throws(()=>call('POST','/files/library/files/delete-batch',{files:[row,{...row,library_file_id:'unknown'}]}),/Unavailable/);
 assert.equal(pages('POST','/files/library',{trashed_only:true}).items.length,0);
 const result=await call('POST','/files/library/files/delete-batch',{files:[row]}).json();assert.equal(result.files[0].success,true);
 assert.equal(pages('POST','/files/library',{}).items.length,0);const trash=pages('POST','/files/library',{trashed_only:true}).items;assert.equal(trash.length,1);assert.ok(trash[0].trashed_at);assert.throws(()=>call('GET',route+'/content_redirect'),/Unavailable/);
 call('POST',route+'/restore');assert.deepEqual(Buffer.from(await call('GET',route+'/content_redirect').arrayBuffer()),bytes);
 const query=new URLSearchParams({file_id:row.file_id,parent_directory_id:folder.id,file_name:row.file_name,soft_delete:'true'});call('DELETE',route+'?'+query);assert.equal(pages('POST','/files/library',{trashed_only:true}).items.length,1);
 query.set('soft_delete','false');call('DELETE',route+'?'+query);assert.equal(pages('POST','/files/library',{trashed_only:true}).items.length,0);assert.throws(()=>call('POST',route+'/restore'),/Unavailable/);
 assert.deepEqual(fs.readFileSync(path.join(root,row.file_id+'.bin')),bytes);
}));

test('empty file trash is atomic, idempotent and preserves live files and page trash',()=>fixture(async({root,call,pages})=>{
 const bytes=Buffer.from('demo');let ids=[];
 for(let n=0;n<2;n++){const file=await call('POST','/files',create(bytes)).json();call('PUT',file.upload_url,bytes);const events=(await call('POST','/files/process_upload_stream',finish(file)).text()).trim().split('\n').map(JSON.parse);ids.push(events[1].extra.metadata_object_id);}
 const catalog=path.join(root,'demo-pages.json'),state=JSON.parse(fs.readFileSync(catalog));state.libraryFiles[0].deleted_at=new Date().toISOString();state.items.push({metadata:{page_id:'rea-page-test',deleted_at:'2026-01-01T00:00:00Z'}});fs.writeFileSync(catalog,JSON.stringify(state));
 const before=fs.readFileSync(catalog);fs.writeFileSync(catalog+'.pending','foreign');assert.throws(()=>call('DELETE','/files/library/trash'));assert.deepEqual(fs.readFileSync(catalog),before);fs.unlinkSync(catalog+'.pending');
 assert.deepEqual(await call('DELETE','/files/library/trash').json(),{deleted_count:1,failed_count:0});assert.deepEqual(await call('DELETE','/files/library/trash').json(),{deleted_count:0,failed_count:0});
 assert.throws(()=>call('POST','/files/library/files/'+ids[0]+'/restore'),/Unavailable/);assert.equal((await call('GET','/files/library/files/'+ids[1]).json()).id,ids[1]);assert.deepEqual(JSON.parse(fs.readFileSync(catalog)).items,state.items);
}));

test('original PNG and PDF fixtures retain bytes and expose MIME-specific Library categories',()=>fixture(async({root,call,pages})=>{
 const {libraryFixture}=require('./demo_library_fixtures.cjs');
 for(const [kind,mime,category] of [['png','image/png','image'],['pdf','application/pdf','pdf']]){
  const fixture=libraryFixture(kind),input={...create(fixture.bytes),file_name:fixture.name,mime_type:mime},reservation=await call('POST','/files',input).json();call('PUT',reservation.upload_url,fixture.bytes);
  const events=(await call('POST','/files/process_upload_stream',{...finish(reservation),file_name:fixture.name,mime_type:mime}).text()).trim().split('\n').map(JSON.parse),id=events[1].extra.metadata_object_id;
  assert.equal(pages('GET','/files/library/nodes?categories='+category).items[0].id,id);assert.equal(pages('POST','/files/library',{categories:[category]}).items[0].id,id);
  const response=call('GET','/files/library/files/'+id+'/content_redirect');assert.equal(response.headers.get('content-type'),mime);assert.deepEqual(Buffer.from(await response.arrayBuffer()),fixture.bytes);
  if(kind==='pdf'){const file=path.join(root,'demo-pages.json'),state=JSON.parse(fs.readFileSync(file));state.libraryFiles.find(f=>f.id===id).library_file_category='document';fs.writeFileSync(file,JSON.stringify(state));assert.equal((await call('GET','/files/library/files/'+id).json()).library_file_category,'pdf');assert.equal(pages('GET','/files/library/nodes?categories=pdf').items[0].id,id);assert.equal(pages('POST','/files/library',{categories:['pdfs']}).items[0].id,id);assert.equal(pages('GET','/files/library/nodes?categories=pdfs').items[0].id,id);}
 }
}));

test('source filters use artifact type and keep incoming-share collection isolated before pagination',()=>fixture(async({root,call,pages})=>{
 const page=pages('POST','/pages',{destination:'personal_file_drive',idempotency_key:'source-demo',title:'Generated page',initial_blocks:[]});
 const bytes=Buffer.from('upload'),reservation=await call('POST','/files',create(bytes)).json();call('PUT',reservation.upload_url,bytes);const events=(await call('POST','/files/process_upload_stream',finish(reservation)).text()).trim().split('\n').map(JSON.parse),id=events[1].extra.metadata_object_id;
 assert.deepEqual(pages('POST','/files/library',{include_pages:true,source:'uploaded',limit:1}).items.map(x=>x.id),[id]);
 assert.deepEqual(pages('POST','/files/library',{include_pages:true,source:'generated',limit:1}).items.map(x=>x.id),[page.metadata.page_id]);
 assert.deepEqual(pages('GET','/files/library/nodes?include_pages=true&source=generated&limit=1').items.map(x=>x.id),[page.metadata.page_id]);
 assert.deepEqual(pages('GET','/files/library/nodes?include_pages=true&source=uploaded&limit=1').items.map(x=>x.id),[id]);
 for(const source of ['uploaded','generated'])assert.deepEqual(pages('GET','/files/library/nodes?parent_directory_id=library%3Acollection%3Ashared-with-me&include_pages=true&source='+source),{items:[],cursor:null});
 const catalog=path.join(root,'demo-pages.json'),state=JSON.parse(fs.readFileSync(catalog));state.libraryFiles[0].library_artifact_type='writing_block';fs.writeFileSync(catalog,JSON.stringify(state));
 assert.equal(pages('POST','/files/library',{source:'uploaded'}).items.length,0);assert.equal(pages('POST','/files/library',{source:'generated'}).items[0].id,id);
}));


test('spreadsheet filters preserve original MIME precedence and CSV/TSV key distinction',()=>fixture(async({root,pages})=>{
 const samples=[['table.csv','text/csv',true],['TABLE.XLSX','application/octet-stream',true],['table.bin','application/vnd.ms-excel',true],['table.tsv','text/tab-separated-values',false],['table.csv','application/pdf',false],['table.csv','application/vnd.google-apps.document',false],['table.pdf','application/vnd.google-apps.spreadsheet',true],['notes.txt','text/plain',false]];
 const files=samples.map(([name,mime],i)=>({id:'libfile-rea-'+(i+1),name,mime_type:mime,parent_directory_id:null,library_file_category:'document',record_creation_time:'2026-01-01T00:00:00Z'}));
 fs.writeFileSync(path.join(root,'demo-pages.json'),JSON.stringify({version:1,sequence:0,items:[],libraryFiles:files}));
 const expected=files.filter((f,i)=>samples[i][2]).map(f=>f.id).sort();
 assert.deepEqual(pages('GET','/files/library/nodes?categories=spreadsheets').items.map(f=>f.id).sort(),expected);
 assert.deepEqual(pages('POST','/files/library',{categories:['spreadsheets']}).items.map(f=>f.id).sort(),expected);
 assert.ok(!pages('GET','/files/library/nodes?categories=documents').items.some(f=>f.name==='table.csv'&&f.mime_type==='text/csv'));
}));
