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
test('archive, restore and permanent deletion preserve document bytes and isolate unavailable pages',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-page-lifecycle-'));
 const settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  call('POST','/pages',{destination:'personal_file_drive',idempotency_key:'lifecycle',title:'Lifecycle',initial_blocks:[]});
  const document=JSON.stringify({sequence:4,title:'Recovered title',update:'canonical bytes'});
  const docFile=path.join(dir,'rea-page-1-document.json');fs.writeFileSync(docFile,document);
  assert.throws(()=>call('POST','/pages/rea-page-1/delete-forever',{}),/Only trashed/);
  fs.writeFileSync(path.join(dir,'demo-pages.json.pending'),'foreign');
  assert.throws(()=>call('POST','/pages/rea-page-1/archive',{}));
  assert.equal(call('GET','/pages').items.length,1);
  fs.unlinkSync(path.join(dir,'demo-pages.json.pending'));
  call('POST','/pages/rea-page-1/archive',{});
  assert.equal(call('GET','/pages').items.length,0);
  assert.equal(call('GET','/pages/catalog').items.length,0);
  const archived=call('GET','/pages/archived').items[0];
  assert.equal(archived.title,'Recovered title');assert.equal(archived.access.can_write,false);
  assert.ok(archived.deleted_at);
  assert.equal(call('POST','/files/library',{include_pages:true}).items.length,0);
  assert.equal(call('POST','/files/library',{include_pages:true,trashed_only:true}).items[0].id,'rea-page-1');
  assert.throws(()=>call('POST','/pages/rea-page-1/realtime-token',{}),/Unavailable/);
  call('POST','/pages/rea-page-1/restore',{});
  assert.equal(call('GET','/pages').items[0].current_sequence,4);
  assert.equal(call('GET','/pages/archived').items.length,0);
  const operation=call('POST','/pages/rea-page-1/archive-operations',{operation_id:'__proto__'});
  assert.equal(operation.status,'completed');assert.equal(operation.completed_pages,1);
  assert.deepEqual(call('GET','/pages/rea-page-1/archive-operations/__proto__'),operation);
  call('POST','/pages/rea-page-1/restore',{});
  assert.deepEqual(call('POST','/pages/rea-page-1/archive-operations',{operation_id:'__proto__'}),operation);
  assert.equal(call('GET','/pages').items.length,1,'replayed archive operation must not archive a restored page again');
  call('POST','/pages/rea-page-1/archive',{});
  call('POST','/pages/rea-page-1/delete-forever',{});
  assert.equal(call('GET','/pages/archived').items.length,0);
  assert.equal(call('POST','/files/library',{include_pages:true,trashed_only:true}).items.length,0);
  assert.throws(()=>call('GET','/pages/rea-page-1'),/Unknown/);
  assert.throws(()=>call('POST','/pages/rea-page-1/restore',{}),/Unknown/);
  assert.equal(fs.readFileSync(docFile,'utf8'),document);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('original parent creation and move contracts preserve an acyclic recoverable tree',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-page-tree-'));
 const settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 const create=(key,parent)=>call('POST','/pages',{idempotency_key:key,title:key,initial_blocks:[],...(parent?{parent_page_id:parent}:{destination:'personal_file_drive'})});
 try{
  create('parent');create('child','rea-page-1');create('grandchild','rea-page-2');create('separately-trashed','rea-page-1');
  assert.equal(call('GET','/pages/rea-page-1').metadata.has_children,true);
  assert.deepEqual(call('GET','/pages?parent_page_id=rea-page-1').items.map(x=>x.title).sort(),['child','separately-trashed']);
  assert.equal(call('GET','/pages/rea-page-2').metadata.parent.page_id,'rea-page-1');
  assert.equal(call('POST','/pages/rea-page-1/personal-move-admission',{parent_page_id:'rea-page-3'}).allowed,false);
  assert.throws(()=>call('PATCH','/pages/rea-page-1/metadata',{parent_page_id:'rea-page-3'}),/cycle/);
  assert.equal(call('POST','/pages/rea-page-3/personal-move-admission',{parent_page_id:'rea-page-1'}).allowed,true);
  const moved=call('PATCH','/pages/rea-page-3/metadata',{parent_page_id:'rea-page-1',position:10});
  assert.equal(moved.metadata.parent.page_id,'rea-page-1');assert.equal(moved.metadata.position,10);
  assert.equal(call('GET','/pages/rea-page-2').metadata.has_children,false);
  assert.equal(call('GET','/pages?parent_page_id=rea-page-1').items[0].page_id,'rea-page-3');
  assert.throws(()=>call('PATCH','/pages/rea-page-2/metadata',{position:1.5}),/position/);
  call('POST','/pages/rea-page-4/archive',{});
  const result=call('POST','/pages/rea-page-1/archive-operations',{operation_id:'tree-delete'});
  assert.equal(result.completed_pages,4);assert.equal(call('GET','/pages').items.length,0);
  assert.throws(()=>create('unavailable-child','rea-page-1'),/Unavailable parent/);
  call('POST','/pages/rea-page-1/restore',{});
  assert.equal(call('GET','/pages').items.length,3);
  assert.equal(call('GET','/pages/archived').items[0].page_id,'rea-page-4','independently trashed child remains trashed');
  call('POST','/pages/rea-page-1/archive',{});
  call('POST','/pages/rea-page-3/restore',{});
  assert.equal(call('GET','/pages/rea-page-3').metadata.parent,null,'restoring under unavailable parent returns to root');
  call('POST','/pages/rea-page-1/delete-forever',{});
  assert.throws(()=>call('GET','/pages/rea-page-2'),/Unknown/);
  assert.equal(call('GET','/pages').items[0].page_id,'rea-page-3');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('library nodes and files lists paginate original shapes and view reports preserve documents',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-page-library-'));
 const settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  for(let i=1;i<=3;i++)call('POST','/pages',{destination:'personal_file_drive',idempotency_key:'page-'+i,title:'Title '+i,initial_blocks:[]});
  const first=call('GET','/files/library/nodes?include_pages=true&limit=2');
  assert.equal(first.items.length,2);assert.equal(first.cursor,'offset:2');
  assert.equal(first.items[0].kind,'file');assert.equal(first.items[0].access_kind,'owned');assert.equal(first.items[0].name,'Title 3');
  assert.equal(call('GET','/files/library/nodes?include_pages=true&limit=2&cursor=offset:2').items[0].page_metadata.page_id,'rea-page-1');
  assert.equal(call('GET','/files/library/nodes?include_pages=true&q=Title%202').items.length,1);
  assert.equal(call('GET','/files/library/nodes?include_pages=true&parent_directory_id=library:collection:shared-with-me').items.length,0);
  assert.equal(call('GET','/files/library/nodes?include_pages=false').items.length,0);
  assert.throws(()=>call('GET','/files/library/nodes?include_pages=true&cursor=unknown'),/cursor/);
  const recent=call('POST','/files/library',{include_pages:true,limit:2});assert.equal(recent.cursor,'offset:2');
  assert.equal(call('POST','/files/library',{include_pages:true,limit:2,cursor:recent.cursor}).items.length,1);
  assert.throws(()=>call('POST','/pages/rea-page-1/views',{observed_sequence:1}),/sequence/);
  call('POST','/pages/rea-page-1/views',{observed_sequence:0});
  const stored=JSON.parse(fs.readFileSync(path.join(dir,'demo-pages.json'),'utf8')).items.find(x=>x.metadata.page_id==='rea-page-1');
  assert.ok(stored.lastUsedAt);assert.equal(stored.metadata.current_sequence,0);
  assert.equal(call('GET','/pages/catalog').items.find(x=>x.id==='rea-page-1').last_used_at,stored.lastUsedAt);
  assert.equal(fs.existsSync(path.join(dir,'rea-page-1-document.json')),false);
  call('POST','/pages/rea-page-1/archive',{});
  assert.equal(call('GET','/files/library/nodes?include_pages=true').items.length,2);
  assert.throws(()=>call('POST','/pages/rea-page-1/views',{observed_sequence:0}),/Unavailable/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('page pins persist with original metadata and preserve document state',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-page-pins-'));
 const settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  call('POST','/pages',{destination:'personal_file_drive',idempotency_key:'pin',title:'Pinned demo',initial_blocks:[]});
  assert.deepEqual(call('GET','/pins/pages?include_metadata=true'),[]);
  call('POST','/pins/pages/rea-page-1');
  const first=call('GET','/pins/pages');assert.equal(first[0].item.id,'rea-page-1');assert.equal(first[0].metadata.title,'Pinned demo');
  call('POST','/pins/pages/rea-page-1');assert.deepEqual(call('GET','/pins/pages'),first);
  fs.writeFileSync(path.join(dir,'demo-pages.json.pending'),'foreign');
  assert.throws(()=>call('DELETE','/pins/pages/rea-page-1'));
  assert.equal(call('GET','/pins/pages').length,1);
  fs.unlinkSync(path.join(dir,'demo-pages.json.pending'));
  call('POST','/pages/rea-page-1/archive',{});assert.deepEqual(call('GET','/pins/pages'),[]);
  assert.throws(()=>call('POST','/pins/pages/rea-page-1'),/Unavailable/);
  call('POST','/pages/rea-page-1/restore',{});assert.equal(call('GET','/pins/pages').length,1);
  call('DELETE','/pins/pages/rea-page-1');assert.deepEqual(call('GET','/pins/pages'),[]);
  assert.equal(call('GET','/pages/rea-page-1').metadata.title,'Pinned demo');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('canonical document symbol projects consistently into page, catalog, nodes and pins',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-page-symbol-'));
 const settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  call('POST','/pages',{destination:'personal_file_drive',idempotency_key:'symbol',title:'Symbol demo',initial_blocks:[]});
  const file=path.join(dir,'rea-page-1-document.json');
  const symbol={kind:'icon',value:'rocket',color:'blue'};
  fs.writeFileSync(file,JSON.stringify({sequence:5,title:'Symbol demo',symbol}));
  const page=call('GET','/pages/rea-page-1');assert.deepEqual(page.metadata.symbol,symbol);assert.equal(page.metadata.projection_through_sequence,5);
  assert.deepEqual(call('GET','/pages/catalog').items[0].symbol,symbol);
  assert.deepEqual(call('GET','/files/library/nodes?include_pages=true').items[0].page_metadata.symbol,symbol);
  assert.deepEqual(call('POST','/files/library',{include_pages:true}).items[0].page_metadata.symbol,symbol);
  call('POST','/pins/pages/rea-page-1');assert.deepEqual(call('GET','/pins/pages')[0].metadata.symbol,symbol);
  fs.writeFileSync(file,JSON.stringify({sequence:6,title:'Symbol demo',symbol:{kind:'none'}}));
  assert.deepEqual(call('GET','/pages/rea-page-1').metadata.symbol,{kind:'none'});
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('detail attribution projection is opt-in and preserves recorded block actors',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-attribution-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  call('POST','/pages',{destination:'personal_file_drive',idempotency_key:'attribution',title:'Page',initial_blocks:[]});
  assert.deepEqual(call('GET','/pages/rea-page-1?include_block_attributions=true').block_attributions,{});
  const block_attributions={block1:{actor:{actor_type:'user',account_user_id:'rea-demo-user'},changed_at:'2026-10-13T12:00:00Z'}};
  fs.writeFileSync(path.join(dir,'rea-page-1-document.json'),JSON.stringify({sequence:1,title:'Page',block_attributions}));
  assert.equal(call('GET','/pages/rea-page-1').block_attributions,undefined);
  const projected=call('GET','/pages/rea-page-1?include_block_attributions=true&include_content=false');
  assert.deepEqual(projected.block_attributions,block_attributions);
  assert.deepEqual(projected.actor_displays,[{account_user_id:'rea-demo-user',display_name:'Demo'}]);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
