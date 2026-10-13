// Original pko draft metadata and applyPageRead HTTP preview contract.
// This store does not acknowledge realtime edits: the sync protocol is separate.
function demoPagesHttp(method,url,body,settingsPath,fs,path){
 if(url.origin!=='https://chatgpt.com')return null;
 const route=url.pathname;
 const listing=method==='GET'&&(route==='/pages'||route==='/pages/catalog'||route==='/pages/archived');
 const detail=method==='GET'&&/^\/pages\/rea-page-[1-9][0-9]*$/.test(route);
 const create=method==='POST'&&route==='/pages';
 const treeRoute=route.match(/^\/pages\/(rea-page-[1-9][0-9]*)\/(metadata|personal-move-admission)$/);
 const tree=treeRoute&&((method==='PATCH'&&treeRoute[2]==='metadata')||(method==='POST'&&treeRoute[2]==='personal-move-admission'));
 const action=route.match(/^\/pages\/(rea-page-[1-9][0-9]*)\/(archive|restore|delete-forever|archive-operations)(?:\/([-a-zA-Z0-9_]{1,200}))?$/);
 const mutation=action&&((method==='POST'&&!action[3])||(method==='GET'&&action[2]==='archive-operations'&&action[3]));
 const library=method==='POST'&&route==='/files/library';
 const nodes=method==='GET'&&route==='/files/library/nodes';
 const pinId=route.match(/^\/pins\/pages\/(rea-page-[1-9][0-9]*)$/)?.[1];
 const pins=(method==='GET'&&route==='/pins/pages')||(pinId&&['POST','DELETE'].includes(method));
 const view=method==='POST'&&/^\/pages\/rea-page-[1-9][0-9]*\/views$/.test(route);
 const token=method==='POST'&&/^\/pages\/rea-page-[1-9][0-9]*\/realtime-token$/.test(route);
 if(!listing&&!detail&&!create&&!token&&!library&&!mutation&&!tree&&!nodes&&!view&&!pins)return null;
 if(!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo state required');
 const file=path.join(path.dirname(settingsPath),'demo-pages.json');
 const state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{version:1,sequence:0,items:[]};
 if(state.version!==1||!Array.isArray(state.items)||!Number.isSafeInteger(state.sequence))throw Error('Invalid demo page store');
 const persist=()=>{const temporary=file+'.pending';let owned=false;try{fs.writeFileSync(temporary,JSON.stringify(state),{flag:'wx'});owned=true;fs.renameSync(temporary,file);}finally{if(owned&&fs.existsSync(temporary))fs.unlinkSync(temporary);}};
 const live=x=>!x.permanentlyDeleted&&!x.metadata.deleted_at;
 const parentFor=(id,moving)=>{
  if(id==null)return null;
  const parent=state.items.find(x=>x.metadata.page_id===id&&live(x));if(!parent)throw Error('Unavailable parent page');
  const seen=new Set(moving?[moving]:[]);let current=parent;
  while(current){if(seen.has(current.metadata.page_id))throw Error('Page hierarchy cycle');seen.add(current.metadata.page_id);current=state.items.find(x=>x.metadata.page_id===current.metadata.parent?.page_id);}
  return parent;
 };
 const descendants=id=>{const ids=new Set([id]);let changed=true;while(changed){changed=false;for(const x of state.items)if(!x.permanentlyDeleted&&ids.has(x.metadata.parent?.page_id)&&!ids.has(x.metadata.page_id)){ids.add(x.metadata.page_id);changed=true;}}return state.items.filter(x=>ids.has(x.metadata.page_id)&&!x.permanentlyDeleted);};
 if(mutation){
  const item=state.items.find(x=>x.metadata.page_id===action[1]);if(!item||item.permanentlyDeleted)throw Error('Unknown demo page');
  if(method==='GET'){const operation=(Object.hasOwn(item.archiveOperations||{},action[3])?item.archiveOperations[action[3]]:undefined);if(!operation)throw Error('Unknown archive operation');return operation;}
  let operationId;
  if(action[2]==='archive-operations'){
   const input=JSON.parse(body||'{}');operationId=input.operation_id;
   if(typeof operationId!=='string'||!/^[-a-zA-Z0-9_]{1,200}$/.test(operationId))throw Error('Invalid archive operation');
   if(Object.hasOwn(item.archiveOperations||{},operationId))return item.archiveOperations[operationId];
  }
  const affected=descendants(item.metadata.page_id);
  if(action[2]==='delete-forever'){
   if(!item.metadata.deleted_at)throw Error('Only trashed demo pages may be deleted permanently');
   for(const x of affected)x.permanentlyDeleted=true;
  }else if(action[2]==='restore'){
   for(const x of affected)if(x===item||x.archivedBy===item.metadata.page_id){x.metadata.deleted_at=null;x.metadata.access.can_write=true;delete x.archivedBy;}
   if(item.metadata.parent&&!state.items.some(x=>x.metadata.page_id===item.metadata.parent.page_id&&live(x)))item.metadata.parent=null;
  }else{
   for(const x of affected)if(!x.metadata.deleted_at){x.metadata.deleted_at=new Date().toISOString();x.metadata.access.can_write=false;x.archivedBy=item.metadata.page_id;}
  }
  item.metadata.updated_at=new Date().toISOString();
  const result=operationId?{operation_id:operationId,status:'completed',completed_pages:affected.length}:{};
  if(operationId){item.archiveOperations??={};Object.defineProperty(item.archiveOperations,operationId,{value:result,enumerable:true,writable:true,configurable:true});}
  persist();return result;
 }
 const read=item=>{const docFile=path.join(path.dirname(settingsPath),item.metadata.page_id+'-document.json');const doc=fs.existsSync(docFile)?JSON.parse(fs.readFileSync(docFile,'utf8')):null;const parent=state.items.find(x=>x.metadata.page_id===item.metadata.parent?.page_id);const meta={...item.metadata,has_children:state.items.some(x=>live(x)&&x.metadata.parent?.page_id===item.metadata.page_id)};if(parent){const parentFile=path.join(path.dirname(settingsPath),parent.metadata.page_id+'-document.json');meta.parent={page_id:parent.metadata.page_id,title:fs.existsSync(parentFile)?JSON.parse(fs.readFileSync(parentFile,'utf8')).title??parent.metadata.title:parent.metadata.title};}return {metadata:doc?{...meta,title:doc.title??meta.title,current_sequence:doc.sequence}:meta,content:doc?null:item.content,document_bootstrap:null};};
 if(pins){
  if(method==='GET')return state.items.filter(x=>live(x)&&x.pinnedAt).sort((a,b)=>a.pinnedAt.localeCompare(b.pinnedAt)).map(x=>({item:{id:x.metadata.page_id},metadata:read(x).metadata}));
  const item=state.items.find(x=>x.metadata.page_id===pinId&&!x.permanentlyDeleted);if(!item)throw Error('Unknown demo page');
  if(method==='POST'){if(!live(item))throw Error('Unavailable demo page');item.pinnedAt??=new Date().toISOString();}else delete item.pinnedAt;
  persist();return {};
 }
 const pageSlice=(items,cursor,limit)=>{
  if(cursor!=null&&cursor!==''&&!/^offset:[0-9]+$/.test(cursor))throw Error('Invalid demo library cursor');
  const offset=cursor?Number(cursor.slice(7)):0;
  if(!Number.isSafeInteger(offset)||offset>items.length)throw Error('Unknown demo library cursor');
  if(!Number.isInteger(limit)||limit<1||limit>100)throw Error('Invalid demo library limit');
  return {items:items.slice(offset,offset+limit),cursor:offset+limit<items.length?'offset:'+(offset+limit):null};
 };
 if(view){
  const item=state.items.find(x=>x.metadata.page_id===route.split('/')[2]&&live(x));if(!item)throw Error('Unavailable demo page');
  const input=JSON.parse(body||'{}');if(!Number.isSafeInteger(input.observed_sequence)||input.observed_sequence<0||input.observed_sequence>read(item).metadata.current_sequence)throw Error('Invalid observed page sequence');
  item.lastUsedAt=new Date().toISOString();persist();return {};
 }
 if(nodes){
  const query=url.searchParams;
  const parent=query.get('parent_directory_id');
  const categories=query.getAll('categories').flatMap(x=>x.split(','));
  if(query.get('include_pages')!=='true'||parent||(categories.length&&!categories.includes('pages')))return {items:[],cursor:null};
  const needle=(query.get('q')||'').toLowerCase();
  const items=state.items.filter(live).map(x=>read(x).metadata).filter(x=>x.title.toLowerCase().includes(needle));
  return pageSlice(items.map(x=>({kind:'file',id:x.page_id,file_id:x.page_id,name:x.title,parent_directory_id:null,library_artifact_type:'page',access_kind:'owned',updated_at:x.updated_at,record_creation_time:x.created_at,page_metadata:{page_id:x.page_id,document_type:'page',symbol:null}})),query.get('cursor'),Number(query.get('limit')||50));
 }
 if(tree){
  const item=state.items.find(x=>x.metadata.page_id===treeRoute[1]&&live(x));if(!item)throw Error('Unavailable demo page');
  const input=JSON.parse(body||'{}');if(!input||Array.isArray(input)||typeof input!=='object')throw Error('Invalid metadata patch');
  if(Object.keys(input).some(k=>!['parent_page_id','position'].includes(k)))throw Error('Unsupported metadata field');
  const hasParent=Object.hasOwn(input,'parent_page_id');
  let parent;try{parent=hasParent?parentFor(input.parent_page_id,item.metadata.page_id):null;}catch(error){if(treeRoute[2]==='personal-move-admission')return {allowed:false};throw error;}
  if(treeRoute[2]==='personal-move-admission')return {allowed:true};
  if(Object.hasOwn(input,'position')&&!Number.isSafeInteger(input.position))throw Error('Invalid page position');
  if(hasParent)item.metadata.parent=parent?{page_id:parent.metadata.page_id,title:read(parent).metadata.title}:null;
  if(Object.hasOwn(input,'position'))item.metadata.position=input.position;
  item.metadata.updated_at=new Date().toISOString();persist();return read(item);
 }
 if(library){
  if(typeof body!=='string'||body.length>65536)throw Error('Expected library JSON');
  const input=JSON.parse(body);if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid library body');

  if(input.limit!=null&&(!Number.isInteger(input.limit)||input.limit<1||input.limit>100))throw Error('Invalid library limit');
  if(input.include_pages!==true||(input.categories?.length&&!input.categories.includes('pages')))return {items:[],cursor:null};
  const items=state.items.filter(x=>!x.permanentlyDeleted&&Boolean(x.metadata.deleted_at)===Boolean(input.trashed_only)).map(x=>read(x).metadata).filter(x=>!input.q||x.title.toLowerCase().includes(String(input.q).toLowerCase())).filter(x=>!input.allowlist_ids||input.allowlist_ids.includes(x.page_id));
  return pageSlice(items.map(x=>({id:x.page_id,file_id:x.page_id,file_name:x.title,directory_id:null,library_artifact_type:'page',updated_at:x.updated_at,record_creation_time:x.created_at,last_used_at:state.items.find(v=>v.metadata.page_id===x.page_id).lastUsedAt??x.updated_at,page_metadata:{page_id:x.page_id,document_type:'page',symbol:null}})),input.cursor,input.limit||50);
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
  const parentId=url.searchParams.get('parent_page_id');
  const available=state.items.filter(x=>!x.permanentlyDeleted&&Boolean(x.metadata.deleted_at)===(route==='/pages/archived')).filter(x=>parentId===null||x.metadata.parent?.page_id===parentId).sort((a,b)=>parentId!==null?a.metadata.position-b.metadata.position:route==='/pages/catalog'?Date.parse(b.lastUsedAt??b.metadata.updated_at)-Date.parse(a.lastUsedAt??a.metadata.updated_at):0);
  if(!Number.isSafeInteger(offset)||offset>available.length)throw Error('Unknown demo page cursor');
  const selected=available.slice(offset,offset+limit);
  const catalog=route==='/pages/catalog';
  const result={items:selected.map(stored=>{const x={...stored,metadata:read(stored).metadata};return catalog?{id:x.metadata.page_id,title:x.metadata.title,open:{kind:'page',page_id:x.metadata.page_id},access_kind:'owned',created_at:x.metadata.created_at,updated_at:x.metadata.updated_at,last_used_at:x.lastUsedAt??x.metadata.updated_at,symbol:null}:route==='/pages/archived'?{...x.metadata,archived_at:x.metadata.deleted_at,size_bytes:null}:x.metadata}),next_cursor:offset+limit<available.length?'offset:'+(offset+limit):null};
  if(catalog)result.order_by=url.searchParams.get('order_by')||'last_used_at';
  return result;
 }
 if(typeof body!=='string'||body.length>65536)throw Error('Expected page JSON body');
 const input=JSON.parse(body);
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid page body');
 if((input.parent_page_id==null?input.destination!=='personal_file_drive':input.destination!=null)||(input.document_type!=null&&input.document_type!=='page'))throw Error('Unsupported demo page destination');
 if(typeof input.idempotency_key!=='string'||!/^[-a-zA-Z0-9_]{1,200}$/.test(input.idempotency_key))throw Error('Invalid page idempotency key');
 if(typeof input.title!=='string'||input.title.length>4096||!Array.isArray(input.initial_blocks)||input.initial_blocks.length!==0)throw Error('Expected empty original page draft');
 const fingerprint=JSON.stringify({title:input.title,destination:input.destination,...(input.parent_page_id==null?{}:{parent_page_id:input.parent_page_id})});
 const previous=state.items.find(x=>x.key===input.idempotency_key);
 if(previous){if(previous.fingerprint!==fingerprint)throw Error('Conflicting demo page idempotency key');return read(previous);}
 const parent=parentFor(input.parent_page_id);
 const now=new Date().toISOString(),id='rea-page-'+(++state.sequence);
 const metadata={access:{can_delete:true,can_read:true,can_share:false,can_write:true},created_at:now,creator_account_user_id:'rea-demo-user',current_sequence:0,deleted_at:null,drive_space_id:null,drive_scope:'personal',owner_workspace_id:null,page_id:id,parent:parent?{page_id:parent.metadata.page_id,title:read(parent).metadata.title}:null,position:Date.parse(now)*1024,projection_through_sequence:0,title:input.title,updated_at:now,document_type:'page',has_children:false};
 const item={key:input.idempotency_key,fingerprint,metadata,content:{page_id:id,title:input.title,markdown:"",blocks:[],through_sequence:0}};
 state.items.unshift(item);
 persist();
 return read(item);
}
module.exports={demoPagesHttp};
