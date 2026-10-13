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
  const tlsEndpoint='wss://pages-realtime.gateway.rea-demo.api.openai.com:12345/ws';
  fs.writeFileSync(path.join(dir,'demo-pages-runtime.json'),JSON.stringify({endpoint:tlsEndpoint,token:'x'.repeat(32)}));
  assert.equal(call('POST','/pages/rea-page-1/realtime-token',{}).endpoint,tlsEndpoint);
  fs.writeFileSync(path.join(dir,'demo-pages-runtime.json'),JSON.stringify({endpoint:tlsEndpoint.replace('rea-demo','other'),token:'x'.repeat(32)}));
  assert.throws(()=>call('POST','/pages/rea-page-1/realtime-token',{}),/Invalid/);

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

test('versions paginate immutable metadata and bootstrap hashes exact envelope bytes',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-versions-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  call('POST','/pages',{destination:'personal_file_drive',idempotency_key:'versions',title:'Page',initial_blocks:[]});
  assert.deepEqual(call('GET','/pages/rea-page-1/versions').items,[]);
  assert.deepEqual(call('GET','/pages/rea-page-1/versions').current_editor_summary,{editor_summary_version:1,actor_summaries:[]});
  const checkpoints=[1,2].map(n=>({checkpoint_id:'demo-checkpoint-'+n,through_sequence:n,created_at:'2026-10-13T12:00:00Z',editor_summary_version:1,actor_summaries:[],envelope:JSON.stringify({format:'openai.page.yjs',schema_version:2,page_id:'rea-page-1',stream_kind:'content',through_sequence:n,yjs_state_update_base64:'AAA=',state_vector_base64:'AA=='})}));
  fs.writeFileSync(path.join(dir,'rea-page-1-document.json'),JSON.stringify({sequence:3,title:'Page',checkpoints}));
  const listing=call('GET','/pages/rea-page-1/versions?limit=1&stream_kind=content');
  assert.equal(listing.current_editor_summary,undefined); // Head 3 is newer than checkpoint 2: unknown actor interval.
  assert.equal(listing.items[0].checkpoint_id,'demo-checkpoint-2');assert.equal(listing.items[0].envelope,undefined);assert.equal(listing.next_cursor,'offset:1');
  assert.equal(call('GET','/pages/rea-page-1/versions?limit=1&cursor=offset:1').items[0].checkpoint_id,'demo-checkpoint-1');
  const descriptor=call('GET','/pages/rea-page-1/versions/demo-checkpoint-1/checkpoint-bootstrap?stream_kind=content&prefer_lite_checkpoint=true').checkpoint;
  assert.equal(descriptor.representation,'full');assert.equal(descriptor.observed_head_sequence,3);assert.equal(descriptor.through_sequence,1);
  assert.equal(descriptor.byte_size,Buffer.byteLength(checkpoints[0].envelope));assert.equal(descriptor.content_hash,require('node:crypto').createHash('sha256').update(checkpoints[0].envelope).digest('hex'));
  assert.throws(()=>call('GET','/pages/rea-page-1/versions/demo-checkpoint-3/checkpoint-bootstrap'),/Unknown/);
  assert.throws(()=>call('GET','/pages/rea-page-1/versions?stream_kind=scratch'),/Unsupported/);
  fs.writeFileSync(path.join(dir,'rea-page-1-document.json'),JSON.stringify({sequence:2,title:'Page',checkpoints}));
  assert.deepEqual(call('GET','/pages/rea-page-1/versions').current_editor_summary,{editor_summary_version:1,actor_summaries:[]});
  fs.writeFileSync(path.join(dir,'rea-page-1-document.json'),JSON.stringify({sequence:7,title:'Legacy page'}));
  assert.equal(call('GET','/pages/rea-page-1/versions').current_editor_summary,undefined);
  call('POST','/pages/rea-page-1/archive',{});assert.throws(()=>call('GET','/pages/rea-page-1/versions'),/Unavailable/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('spaces create root atomically and project canonical title through list/detail',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-spaces-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  assert.deepEqual(call('GET','/spaces/v2').items,[]);
  fs.writeFileSync(path.join(dir,'demo-pages.json.pending'),'foreign');
  assert.throws(()=>call('POST','/spaces/v2',{name:'Rejected'}));assert.equal(fs.existsSync(path.join(dir,'demo-pages.json')),false);fs.unlinkSync(path.join(dir,'demo-pages.json.pending'));
  const space=call('POST','/spaces/v2',{name:'  Original Space  '});
  assert.equal(space.id,'rea-space-1');assert.equal(space.name,'Original Space');assert.equal(space.backing_type,'drive');
  assert.equal(space.root_page_id,'rea-page-1');assert.equal(space.root_page.metadata.drive_space_id,space.id);assert.equal(space.root_page_metadata.page_id,space.root_page_id);assert.equal(space.root_page_metadata.access.can_write,true);
  assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'demo-pages.json'))).items[0].seedTitle,'Original Space');
  assert.equal(call('GET','/pages/'+space.root_page_id).metadata.title,'Original Space');
  const other=call('POST','/spaces/v2',{name:'Second'});assert.notEqual(other.root_page_id,space.root_page_id);
  assert.equal(call('GET','/spaces/v2?limit=1').next_cursor,'offset:1');assert.equal(call('GET','/spaces/v2?limit=1&cursor=offset:1').items[0].id,space.id);
  fs.writeFileSync(path.join(dir,'rea-page-1-document.json'),JSON.stringify({sequence:1,title:'Renamed root',symbol:{kind:'emoji',value:'X'}}));
  assert.equal(call('GET','/spaces/v2/rea-space-1?include_root_page_metadata=true').name,'Renamed root');
  assert.equal(call('GET','/spaces/v2').items.find(x=>x.id===space.id).symbol.value,'X');
  assert.throws(()=>call('POST','/spaces/v2',{name:' '}),/Invalid/);assert.throws(()=>call('POST','/spaces/v2',{name:'x'.repeat(51)}),/Invalid/);
  assert.throws(()=>call('POST','/spaces/v2',{name:'No',make_workspace_default:true}),/not supported/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('space pages inherit membership, paginate and filter without leaking other spaces',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-space-pages-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  const a=call('POST','/spaces/v2',{name:'First'}),b=call('POST','/spaces/v2',{name:'Second'});
  const create=(key,parent,title)=>call('POST','/pages',{idempotency_key:key,parent_page_id:parent,title,initial_blocks:[]});
  const child=create('child',a.root_page_id,'Child'),nested=create('nested',child.metadata.page_id,'Nested');
  create('other',b.root_page_id,'Other');
  assert.equal(child.metadata.drive_space_id,a.id);assert.equal(nested.metadata.drive_space_id,a.id);
  assert.equal(child.metadata.drive_scope,undefined);
  const route='/spaces/'+a.id+'/pages';
  const list=call('GET',route+'?limit=1');assert.equal(list.next_cursor,'offset:1');
  const all=call('GET',route).items;assert.equal(all.length,3);assert.ok(all.every(x=>x.drive_space_id===a.id));
  assert.deepEqual(call('GET',route+'?parent_page_id='+a.root_page_id).items.map(x=>x.page_id),[child.metadata.page_id]);
  fs.writeFileSync(path.join(dir,nested.metadata.page_id+'-document.json'),JSON.stringify({sequence:2,title:'Renamed'}));
  assert.equal(call('GET',route+'?query=RENAMED').items[0].page_id,nested.metadata.page_id);
  assert.throws(()=>call('GET',route+'?parent_page_id='+b.root_page_id),/mismatch/);
  assert.throws(()=>call('GET','/spaces/rea-space-999/pages'),/Unavailable/);
  assert.throws(()=>call('GET',route+'?limit=101'),/limit/);
  call('POST','/pages/'+child.metadata.page_id+'/archive',{});
  assert.equal(call('GET',route).items.length,1);
  call('POST','/pages/'+a.root_page_id+'/archive',{});
  assert.throws(()=>call('GET',route),/Unavailable/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('space archive and restore are atomic and preserve prior page trash and document bytes',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-space-trash-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  const space=call('POST','/spaces/v2',{name:'Archive space'});
  const create=key=>call('POST','/pages',{idempotency_key:key,parent_page_id:space.root_page_id,title:key,initial_blocks:[]}).metadata.page_id;
  const child=create('child'),previouslyTrashed=create('already-trashed');
  call('POST','/pages/'+previouslyTrashed+'/archive',{});
  const document=path.join(dir,child+'-document.json');fs.writeFileSync(document,JSON.stringify({sequence:1,title:'Saved title',comments:'preserved'}));
  const beforeDoc=fs.readFileSync(document),store=path.join(dir,'demo-pages.json'),beforeStore=fs.readFileSync(store);
  fs.writeFileSync(store+'.pending','foreign');assert.throws(()=>call('DELETE','/spaces/'+space.id));assert.deepEqual(fs.readFileSync(store),beforeStore);fs.unlinkSync(store+'.pending');
  call('DELETE','/spaces/'+space.id);call('DELETE','/spaces/'+space.id);
  assert.equal(call('GET','/spaces/v2').items.length,0);
  const archived=call('GET','/spaces/v2?status=archived').items;assert.equal(archived.length,1);assert.ok(archived[0].deleted_at);assert.ok(archived[0].root_page_metadata.deleted_at);
  assert.equal(call('GET','/pages/'+child).metadata.access.can_write,false);
  assert.equal(call('GET','/pages/'+child).metadata.access.can_share,false);
  assert.throws(()=>call('GET','/spaces/'+space.id+'/pages'),/Unavailable/);
  assert.throws(()=>call('POST','/pages/'+child+'/restore',{}),/Restore the space/);
  assert.throws(()=>call('POST','/pages/'+space.root_page_id+'/delete-forever',{}),/Restore the space/);
  const archivedStore=fs.readFileSync(store);fs.writeFileSync(store+'.pending','foreign');assert.throws(()=>call('POST','/spaces/'+space.id+'/restore'));assert.deepEqual(fs.readFileSync(store),archivedStore);fs.unlinkSync(store+'.pending');
  call('POST','/spaces/'+space.id+'/restore');call('POST','/spaces/'+space.id+'/restore');
  assert.equal(call('GET','/spaces/v2?status=archived').items.length,0);assert.equal(call('GET','/spaces/v2').items.length,1);
  assert.equal(call('GET','/pages/'+child).metadata.deleted_at,null);assert.equal(call('GET','/pages/'+child).metadata.access.can_write,true);
  assert.ok(call('GET','/pages/'+previouslyTrashed).metadata.deleted_at);
  assert.deepEqual(fs.readFileSync(document),beforeDoc);
  assert.throws(()=>call('GET','/spaces/v2?status=unknown'),/Unsupported/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('canonical edit time projects to page and library without overriding later lifecycle time',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-page-time-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  const page=call('POST','/pages',{destination:'personal_file_drive',idempotency_key:'time',title:'Page',initial_blocks:[]});
  const file=path.join(dir,'demo-pages.json'),state=JSON.parse(fs.readFileSync(file));state.items[0].metadata.updated_at='2025-01-01T00:00:00Z';fs.writeFileSync(file,JSON.stringify(state));
  const doc=path.join(dir,page.metadata.page_id+'-document.json');fs.writeFileSync(doc,JSON.stringify({sequence:1,title:'Edited',updated_at:'2025-01-02T00:00:00Z'}));
  assert.equal(call('GET','/pages/'+page.metadata.page_id).metadata.updated_at,'2025-01-02T00:00:00Z');
  assert.equal(call('POST','/files/library',{include_pages:true}).items[0].updated_at,'2025-01-02T00:00:00Z');
  assert.equal(call('GET','/pages/catalog').items[0].updated_at,'2025-01-02T00:00:00Z');
  state.items[0].metadata.updated_at='2025-01-03T00:00:00Z';fs.writeFileSync(file,JSON.stringify(state));
  assert.equal(call('GET','/pages/'+page.metadata.page_id).metadata.updated_at,'2025-01-03T00:00:00Z');
  fs.writeFileSync(doc,JSON.stringify({sequence:1,title:'Legacy'}));assert.equal(call('GET','/pages/'+page.metadata.page_id).metadata.updated_at,'2025-01-03T00:00:00Z');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('catalog orders by the returned last-used value before pagination',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-page-order-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  for(const key of ['first','second'])call('POST','/pages',{destination:'personal_file_drive',idempotency_key:key,title:key,initial_blocks:[]});
  const file=path.join(dir,'demo-pages.json'),state=JSON.parse(fs.readFileSync(file));
  for(const x of state.items)x.metadata.updated_at='2025-01-01T00:00:00Z';fs.writeFileSync(file,JSON.stringify(state));
  fs.writeFileSync(path.join(dir,'rea-page-1-document.json'),JSON.stringify({sequence:1,title:'Edited first',updated_at:'2025-01-03T00:00:00Z'}));
  let page=call('GET','/pages/catalog?order_by=last_used_at&limit=1');assert.equal(page.items[0].id,'rea-page-1');assert.equal(page.next_cursor,'offset:1');assert.equal(page.items[0].last_used_at,'2025-01-03T00:00:00Z');
  assert.equal(call('GET','/pages/catalog?limit=1&cursor=offset:1').items[0].id,'rea-page-2');
  state.items.find(x=>x.metadata.page_id==='rea-page-2').lastUsedAt='2025-01-04T00:00:00Z';fs.writeFileSync(file,JSON.stringify(state));
  assert.equal(call('GET','/pages/catalog?limit=1').items[0].id,'rea-page-2');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('original sharing read contract resolves page and space roots without external principals',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-sharing-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  const space=call('POST','/spaces/v2',{name:'Sharing fixture'});
  const route='/spaces/v2/'+space.id+'/shares';
  const sharing=call('GET',route+'?limit=100&include_inherited_access=true');
  assert.deepEqual(sharing.shares,[]);assert.equal(sharing.next_cursor,null);
  assert.equal(sharing.owner.principal_id,'rea-demo-user');assert.equal(sharing.owner_display_name,'Demo');
  assert.ok(sharing.caller_permissions.includes('library_folder.write'));assert.equal(sharing.allowed_roles.length,3);
  assert.deepEqual(sharing.inherited_access,{complete:true,sources:[]});assert.equal(sharing.workspace_id,null);
  assert.equal(call('GET','/pages/'+space.root_page_id+'/shares').inherited_access,undefined);
  assert.throws(()=>call('GET',route+'?cursor=offset:1'),/cursor/);
  assert.throws(()=>call('GET','/pages/rea-page-999/shares'),/Unavailable/);
  call('DELETE','/spaces/'+space.id);assert.throws(()=>call('GET',route),/Unavailable/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('synthetic sharing persists role changes and inherited space access atomically',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-share-write-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  const space=call('POST','/spaces/v2',{name:'Shared demo'}),route='/spaces/v2/'+space.id+'/shares';
  const child=call('POST','/pages',{parent_page_id:space.root_page_id,idempotency_key:'shared-child',title:'Child',initial_blocks:[]}).metadata.page_id;
  const search=query=>call('POST','/pages/sharing/recipients',{space_id:space.id,query,limit:10});
  assert.equal(search('collaborator').items[0].id,'rea-demo-collaborator');assert.deepEqual(search('other@example.invalid').items,[]);
  const recipient={recipient_type:'principal',principal_type:'user',principal_id:'rea-demo-collaborator'},input={recipient,role_id:'role-library-folder-viewer'};
  const store=path.join(dir,'demo-pages.json'),before=fs.readFileSync(store);fs.writeFileSync(store+'.pending','foreign');assert.throws(()=>call('POST',route,input));assert.deepEqual(fs.readFileSync(store),before);fs.unlinkSync(store+'.pending');
  const grant=call('POST',route,input);assert.equal(grant.status,'pending');assert.deepEqual(call('POST',route,input),grant);
  assert.equal(call('GET',route).shares.length,1);
  const inherited=()=>call('GET','/pages/'+child+'/shares?include_inherited_access=true').inherited_access;
  assert.deepEqual(inherited(),{complete:true,sources:[{source:{kind:'space',id:space.id},recipient,role:'viewer'}]});
  const changed=call('PATCH',route+'/'+grant.share_id,{role_id:'role-library-folder-editor'});assert.equal(changed.role_id,'role-library-folder-editor');assert.equal(inherited().sources[0].role,'editor');
  assert.throws(()=>call('POST',route,{...input,recipient:{...recipient,principal_id:'rea-demo-user'}}),/synthetic/);
  assert.throws(()=>call('PATCH',route+'/'+grant.share_id,{role_id:'owner'}),/role/);
  const isolated=call('POST','/pages',{destination:'personal_file_drive',idempotency_key:'isolated',title:'Private',initial_blocks:[]}).metadata.page_id;
  assert.throws(()=>call('PATCH','/pages/'+isolated+'/shares/'+grant.share_id,{role_id:'role-library-folder-viewer'}),/Unknown/);
  const current=fs.readFileSync(store);fs.writeFileSync(store+'.pending','foreign');assert.throws(()=>call('DELETE',route+'/'+grant.share_id));assert.deepEqual(fs.readFileSync(store),current);fs.unlinkSync(store+'.pending');
  call('DELETE',route+'/'+grant.share_id);assert.deepEqual(call('GET',route).shares,[]);assert.deepEqual(inherited().sources,[]);
  call('DELETE','/spaces/'+space.id);assert.throws(()=>search('demo'),/Unavailable/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('directories persist hierarchy, breadcrumbs and merged node pagination without page leakage',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-directories-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  const root=call('GET','/files/library/directories/path').items[0];assert.equal(root.is_root,true);
  const parent=call('POST','/files/library/directories',{name:' Parent ',parent_directory_id:root.id});
  const child=call('POST','/files/library/directories',{name:'Child',parent_directory_id:parent.id});
  assert.equal(parent.name,'Parent');assert.equal(parent.kind,'directory');
  assert.deepEqual(call('GET','/files/library/directories/path?directory_id='+child.id).items.map(d=>d.id),[root.id,parent.id,child.id]);
  call('POST','/pages',{idempotency_key:'directory-page',title:'Page',initial_blocks:[],destination:'personal_file_drive'});
  const first=call('GET','/files/library/nodes?include_pages=true&limit=1');assert.equal(first.items[0].id,parent.id);assert.equal(first.cursor,'offset:1');
  assert.equal(call('GET','/files/library/nodes?include_pages=true&limit=1&cursor=offset:1').items[0].library_artifact_type,'page');
  assert.deepEqual(call('GET','/files/library/nodes?include_pages=true&parent_directory_id='+parent.id).items.map(d=>d.id),[child.id]);
  assert.equal(call('GET','/files/library/nodes?include_pages=true&categories=pages').items.length,1);
  assert.equal(call('GET','/files/library/directories/'+parent.id).folder_count,1);
  call('PATCH','/files/library/directories/'+child.id,{name:'Renamed',parent_directory_id:null});
  assert.equal(call('GET','/files/library/directories/'+child.id).name,'Renamed');assert.equal(call('GET','/files/library/directories/'+parent.id).folder_count,0);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('directory rejected mutations and failed writes preserve previous store',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-directory-errors-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  const a=call('POST','/files/library/directories',{name:'A'}),b=call('POST','/files/library/directories',{name:'B',parent_directory_id:a.id});
  const file=path.join(dir,'demo-pages.json'),before=fs.readFileSync(file,'utf8');
  assert.throws(()=>call('PATCH','/files/library/directories/'+a.id,{parent_directory_id:b.id}),/cycle/);
  assert.throws(()=>call('POST','/files/library/directories',{name:'A'}),/conflict/);
  assert.throws(()=>call('POST','/files/library/directories',{name:'.hidden'}),/name/);
  assert.throws(()=>call('POST','/files/library/directories',{name:'Bad',parent_directory_id:'rea-directory-99'}),/Unknown/);
  assert.equal(fs.readFileSync(file,'utf8'),before);
  fs.writeFileSync(file+'.pending','foreign');assert.throws(()=>call('PATCH','/files/library/directories/'+a.id,{name:'Changed'}));
  assert.equal(fs.readFileSync(file,'utf8'),before);assert.equal(fs.readFileSync(file+'.pending','utf8'),'foreign');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('directory deletion removes only its subtree and remains atomic on failure',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-directory-delete-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);
 try{
  const create=(name,parent_directory_id)=>call('POST','/files/library/directories',{name,parent_directory_id});
  const a=create('A'),b=create('B',a.id),c=create('C',b.id),other=create('Other');
  const page=call('POST','/pages',{idempotency_key:'independent',title:'Page',initial_blocks:[],destination:'personal_file_drive'});
  const file=path.join(dir,'demo-pages.json'),before=fs.readFileSync(file);
  fs.writeFileSync(file+'.pending','foreign');assert.throws(()=>call('DELETE','/files/library/directories/'+a.id));
  assert.deepEqual(fs.readFileSync(file),before);assert.equal(fs.readFileSync(file+'.pending','utf8'),'foreign');fs.unlinkSync(file+'.pending');
  assert.deepEqual(call('DELETE','/files/library/directories/'+a.id),{success:true});
  for(const node of [a,b,c])assert.throws(()=>call('GET','/files/library/directories/'+node.id),/Unknown/);
  assert.equal(call('GET','/files/library/directories/'+other.id).name,'Other');
  assert.equal(call('GET','/pages/'+page.metadata.page_id).metadata.title,'Page');
  const after=fs.readFileSync(file);assert.throws(()=>call('DELETE','/files/library/directories/'+a.id),/Unknown/);assert.deepEqual(fs.readFileSync(file),after);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
