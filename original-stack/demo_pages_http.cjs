// Original pko draft metadata and applyPageRead HTTP preview contract.
// This store does not acknowledge realtime edits: the sync protocol is separate.
function demoPagesHttp(method,url,body,settingsPath,fs,path){
 if(url.origin!=='https://chatgpt.com')return null;
 const route=url.pathname;
 const listing=method==='GET'&&(route==='/pages'||route==='/pages/catalog'||route==='/pages/archived');
 const detail=method==='GET'&&/^\/pages\/rea-page-[1-9][0-9]*$/.test(route);
 const create=method==='POST'&&route==='/pages';
 const action=route.match(/^\/pages\/(rea-page-[1-9][0-9]*)\/(archive|restore|delete-forever|archive-operations)(?:\/([-a-zA-Z0-9_]{1,200}))?$/);
 const mutation=action&&((method==='POST'&&!action[3])||(method==='GET'&&action[2]==='archive-operations'&&action[3]));
 const library=method==='POST'&&route==='/files/library';
 const token=method==='POST'&&/^\/pages\/rea-page-[1-9][0-9]*\/realtime-token$/.test(route);
 if(!listing&&!detail&&!create&&!token&&!library&&!mutation)return null;
 if(!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo state required');
 const file=path.join(path.dirname(settingsPath),'demo-pages.json');
 const state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{version:1,sequence:0,items:[]};
 if(state.version!==1||!Array.isArray(state.items)||!Number.isSafeInteger(state.sequence))throw Error('Invalid demo page store');
 const persist=()=>{const temporary=file+'.pending';let owned=false;try{fs.writeFileSync(temporary,JSON.stringify(state),{flag:'wx'});owned=true;fs.renameSync(temporary,file);}finally{if(owned&&fs.existsSync(temporary))fs.unlinkSync(temporary);}};
 if(mutation){
  const item=state.items.find(x=>x.metadata.page_id===action[1]);if(!item||item.permanentlyDeleted)throw Error('Unknown demo page');
  if(method==='GET'){const operation=(Object.hasOwn(item.archiveOperations||{},action[3])?item.archiveOperations[action[3]]:undefined);if(!operation)throw Error('Unknown archive operation');return operation;}
  let operationId;
  if(action[2]==='archive-operations'){
   const input=JSON.parse(body||'{}');operationId=input.operation_id;
   if(typeof operationId!=='string'||!/^[-a-zA-Z0-9_]{1,200}$/.test(operationId))throw Error('Invalid archive operation');
   if(Object.hasOwn(item.archiveOperations||{},operationId))return item.archiveOperations[operationId];
  }
  if(action[2]==='delete-forever'){
   if(!item.metadata.deleted_at)throw Error('Only trashed demo pages may be deleted permanently');
   item.permanentlyDeleted=true;
  }else if(action[2]==='restore'){
   item.metadata.deleted_at=null;item.metadata.access.can_write=true;
  }else{
   item.metadata.deleted_at=item.metadata.deleted_at||new Date().toISOString();item.metadata.access.can_write=false;
  }
  item.metadata.updated_at=new Date().toISOString();
  const result=operationId?{operation_id:operationId,status:'completed',completed_pages:1}:{};
  if(operationId){item.archiveOperations??={};Object.defineProperty(item.archiveOperations,operationId,{value:result,enumerable:true,writable:true,configurable:true});}
  persist();return result;
 }
 const read=item=>{const docFile=path.join(path.dirname(settingsPath),item.metadata.page_id+'-document.json');const doc=fs.existsSync(docFile)?JSON.parse(fs.readFileSync(docFile,'utf8')):null;return {metadata:doc?{...item.metadata,title:doc.title??item.metadata.title,current_sequence:doc.sequence}:item.metadata,content:doc?null:item.content,document_bootstrap:null};};
 if(library){
  if(typeof body!=='string'||body.length>65536)throw Error('Expected library JSON');
  const input=JSON.parse(body);if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid library body');
  if(input.cursor)throw Error('Unknown demo library cursor');
  if(input.limit!=null&&(!Number.isInteger(input.limit)||input.limit<1||input.limit>100))throw Error('Invalid library limit');
  if(input.include_pages!==true||(input.categories?.length&&!input.categories.includes('pages')))return {items:[],cursor:null};
  const items=state.items.filter(x=>!x.permanentlyDeleted&&Boolean(x.metadata.deleted_at)===Boolean(input.trashed_only)).map(x=>read(x).metadata).filter(x=>!input.q||x.title.toLowerCase().includes(String(input.q).toLowerCase())).filter(x=>!input.allowlist_ids||input.allowlist_ids.includes(x.page_id));
  if(items.length>(input.limit||50))throw Error('Demo library pagination not implemented');
  return {items:items.map(x=>({id:x.page_id,file_id:x.page_id,file_name:x.title,directory_id:null,library_artifact_type:'page',updated_at:x.updated_at,record_creation_time:x.created_at,last_used_at:x.updated_at,page_metadata:{page_id:x.page_id,document_type:'page',symbol:null}})),cursor:null};
 }
 if(token){
  const item=state.items.find(x=>x.metadata.page_id===route.split('/')[2]);if(!item||item.permanentlyDeleted||item.metadata.deleted_at)throw Error('Unavailable demo page');
  const runtime=JSON.parse(fs.readFileSync(path.join(path.dirname(settingsPath),'demo-pages-runtime.json'),'utf8'));
  if(!/^ws:\/\/127\.0\.0\.1:[1-9][0-9]*$/.test(runtime.endpoint)||typeof runtime.token!=='string'||runtime.token.length<32)throw Error('Invalid demo realtime endpoint');
  return {document_type:'page',stream_kind:'content',endpoint:runtime.endpoint+'/demo-pages/'+item.metadata.page_id,token:runtime.token,granted_scope:'write',page_metadata:{page_id:item.metadata.page_id,document_type:'page',title:read(item).metadata.title,access:{can_read:true,can_write:true}}};
 }
 if(detail){const item=state.items.find(x=>x.metadata.page_id===route.slice(7)&&!x.permanentlyDeleted);if(!item)throw Error('Unknown demo page');return read(item);}
 if(listing){
  const cursor=url.searchParams.get('cursor'),rawLimit=url.searchParams.get('limit');
  if(cursor&&!/^offset:[0-9]+$/.test(cursor))throw Error('Invalid demo page cursor');
  if(rawLimit!==null&&(!/^[1-9][0-9]*$/.test(rawLimit)||Number(rawLimit)>100))throw Error('Invalid demo page limit');
  const offset=cursor?Number(cursor.slice(7)):0,limit=Number(rawLimit||50);
  const available=state.items.filter(x=>!x.permanentlyDeleted&&Boolean(x.metadata.deleted_at)===(route==='/pages/archived'));
  if(!Number.isSafeInteger(offset)||offset>available.length)throw Error('Unknown demo page cursor');
  const selected=available.slice(offset,offset+limit);
  const catalog=route==='/pages/catalog';
  const result={items:selected.map(stored=>{const x={...stored,metadata:read(stored).metadata};return catalog?{id:x.metadata.page_id,title:x.metadata.title,open:{kind:'page',page_id:x.metadata.page_id},access_kind:'owned',created_at:x.metadata.created_at,updated_at:x.metadata.updated_at,last_used_at:x.metadata.updated_at,symbol:null}:route==='/pages/archived'?{...x.metadata,archived_at:x.metadata.deleted_at,size_bytes:null}:x.metadata}),next_cursor:offset+limit<available.length?'offset:'+(offset+limit):null};
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
 persist();
 return read(item);
}
module.exports={demoPagesHttp};
