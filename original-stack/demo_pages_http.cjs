// Original pko draft metadata and applyPageRead HTTP preview contract.
// This store does not acknowledge realtime edits: the sync protocol is separate.
function demoPagesHttp(method,url,body,settingsPath,fs,path){
 if(url.origin!=='https://chatgpt.com')return null;
 const route=url.pathname;
 const listing=method==='GET'&&(route==='/pages'||route==='/pages/catalog');
 const detail=method==='GET'&&/^\/pages\/rea-page-[1-9][0-9]*$/.test(route);
 const create=method==='POST'&&route==='/pages';
 const token=method==='POST'&&/^\/pages\/rea-page-[1-9][0-9]*\/realtime-token$/.test(route);
 if(!listing&&!detail&&!create&&!token)return null;
 if(!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo state required');
 const file=path.join(path.dirname(settingsPath),'demo-pages.json');
 const state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{version:1,sequence:0,items:[]};
 if(state.version!==1||!Array.isArray(state.items)||!Number.isSafeInteger(state.sequence))throw Error('Invalid demo page store');
 const read=item=>{const docFile=path.join(path.dirname(settingsPath),item.metadata.page_id+'-document.json');const doc=fs.existsSync(docFile)?JSON.parse(fs.readFileSync(docFile,'utf8')):null;return {metadata:doc?{...item.metadata,title:doc.title??item.metadata.title,current_sequence:doc.sequence}:item.metadata,content:doc?null:item.content,document_bootstrap:null};};
 if(token){
  const item=state.items.find(x=>x.metadata.page_id===route.split('/')[2]);if(!item)throw Error('Unknown demo page');
  const runtime=JSON.parse(fs.readFileSync(path.join(path.dirname(settingsPath),'demo-pages-runtime.json'),'utf8'));
  if(!/^ws:\/\/127\.0\.0\.1:[1-9][0-9]*$/.test(runtime.endpoint)||typeof runtime.token!=='string'||runtime.token.length<32)throw Error('Invalid demo realtime endpoint');
  return {document_type:'page',stream_kind:'content',endpoint:runtime.endpoint+'/demo-pages/'+item.metadata.page_id,token:runtime.token,granted_scope:'write',page_metadata:{page_id:item.metadata.page_id,document_type:'page',title:read(item).metadata.title,access:{can_read:true,can_write:true}}};
 }
 if(detail){const item=state.items.find(x=>x.metadata.page_id===route.slice(7));if(!item)throw Error('Unknown demo page');return read(item);}
 if(listing){
  const cursor=url.searchParams.get('cursor'),rawLimit=url.searchParams.get('limit');
  if(cursor&&!/^offset:[0-9]+$/.test(cursor))throw Error('Invalid demo page cursor');
  if(rawLimit!==null&&(!/^[1-9][0-9]*$/.test(rawLimit)||Number(rawLimit)>100))throw Error('Invalid demo page limit');
  const offset=cursor?Number(cursor.slice(7)):0,limit=Number(rawLimit||50);
  if(!Number.isSafeInteger(offset)||offset>state.items.length)throw Error('Unknown demo page cursor');
  const selected=state.items.slice(offset,offset+limit);
  const catalog=route==='/pages/catalog';
  const result={items:selected.map(stored=>{const x={...stored,metadata:read(stored).metadata};return catalog?{id:x.metadata.page_id,title:x.metadata.title,open:{kind:'page',page_id:x.metadata.page_id},access_kind:'owned',created_at:x.metadata.created_at,updated_at:x.metadata.updated_at,last_used_at:x.metadata.updated_at,symbol:null}:x.metadata}),next_cursor:offset+limit<state.items.length?'offset:'+(offset+limit):null};
  if(catalog)result.order_by=url.searchParams.get('order_by')||'last_used_at';
  return result;
 }
 if(typeof body!=='string'||body.length>65536)throw Error('Expected page JSON body');
 const input=JSON.parse(body);
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid page body');
 if(input.destination!=='personal_file_drive'||input.parent_page_id!=null||(input.document_type!=null&&input.document_type!=='page'))throw Error('Unsupported demo page destination');
 if(typeof input.idempotency_key!=='string'||!/^[-a-zA-Z0-9_]{1,200}$/.test(input.idempotency_key))throw Error('Invalid page idempotency key');
 if(typeof input.title!=='string'||input.title.length>4096||!Array.isArray(input.initial_blocks)||input.initial_blocks.length!==0)throw Error('Expected empty original page draft');
 const fingerprint=JSON.stringify({title:input.title,destination:input.destination});
 const previous=state.items.find(x=>x.key===input.idempotency_key);
 if(previous){if(previous.fingerprint!==fingerprint)throw Error('Conflicting demo page idempotency key');return read(previous);}
 const now=new Date().toISOString(),id='rea-page-'+(++state.sequence);
 const metadata={access:{can_delete:true,can_read:true,can_share:false,can_write:true},created_at:now,creator_account_user_id:'rea-demo-user',current_sequence:0,deleted_at:null,drive_space_id:null,drive_scope:'personal',owner_workspace_id:null,page_id:id,parent:null,position:Date.parse(now)*1024,projection_through_sequence:0,title:input.title,updated_at:now,document_type:'page',has_children:false};
 const item={key:input.idempotency_key,fingerprint,metadata,content:{page_id:id,title:input.title,markdown:"",blocks:[],through_sequence:0}};
 state.items.unshift(item);
 const temporary=file+'.pending';let owned=false;
 try{fs.writeFileSync(temporary,JSON.stringify(state),{flag:'wx'});owned=true;fs.renameSync(temporary,file);}finally{if(owned&&fs.existsSync(temporary))fs.unlinkSync(temporary);}
 return read(item);
}
module.exports={demoPagesHttp};
