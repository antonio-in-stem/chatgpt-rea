const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {demoPagesHttp}=require('./demo_pages_http.cjs');
test('personal page creation is idempotent, persistent, paged and explicit about missing bootstrap',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-pages-'));
 const settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  assert.deepEqual(call('GET','/pages'),{items:[],next_cursor:null});
  const input={destination:'personal_file_drive',idempotency_key:'local-page-test',title:'',initial_blocks:[]};
  const first=call('POST','/pages',input);
  assert.equal(first.metadata.page_id,'rea-page-1');assert.equal(first.document_bootstrap,null);assert.equal(first.content.markdown,'');
  assert.deepEqual(call('POST','/pages',input),first);
  assert.deepEqual(call('GET','/pages/rea-page-1'),first);
  assert.throws(()=>call('POST','/pages',{...input,title:'Conflicting'}),/Conflicting/);
  call('POST','/pages',{...input,idempotency_key:'second',title:'Second'});
  const listing=call('GET','/pages?limit=1');assert.equal(listing.items[0].title,'Second');assert.equal(listing.next_cursor,'offset:1');
  assert.equal(call('GET','/pages?limit=1&cursor=offset:1').items[0].page_id,'rea-page-1');
  assert.equal(call('GET','/pages/catalog').items[0].open.page_id,'rea-page-2');
  assert.equal(call('POST','/files/library',{include_pages:true}).items[0].file_name,'Second');
  assert.equal(call('POST','/files/library',{include_pages:true,q:'Second'}).items.length,1);
  assert.deepEqual(call('POST','/files/library',{include_pages:true,trashed_only:true}),{items:[],cursor:null});
  assert.throws(()=>call('GET','/pages?cursor=oops'));
  assert.throws(()=>call('POST','/pages',{...input,parent_page_id:'other'}));
  assert.throws(()=>call('POST','/pages',{...input,initial_blocks:[{}]}));
  fs.writeFileSync(path.join(dir,'demo-pages.json.pending'),'foreign lock');
  assert.throws(()=>call('POST','/pages',{...input,idempotency_key:'third'}));
  assert.equal(fs.readFileSync(path.join(dir,'demo-pages.json.pending'),'utf8'),'foreign lock');
  assert.equal(call('GET','/pages').items.length,2);
  fs.writeFileSync(path.join(dir,'demo-pages-runtime.json'),JSON.stringify({endpoint:'ws://127.0.0.1:12345',token:'x'.repeat(32)}));
  assert.equal(call('POST','/pages/rea-page-1/realtime-token',{}).endpoint,'ws://127.0.0.1:12345/demo-pages/rea-page-1');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
