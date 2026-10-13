// Native Library upload protocol backed by the isolated demo store and local bytes.
function demoLibraryFileHttp(method,url,body,settingsPath,fs,path,onProgress,signal){
 const metadata=url.origin==='https://chatgpt.com'&&url.pathname.match(/^\/files\/library\/files\/(libfile-rea-[1-9][0-9]*)(?:\/(node|content_url|download_url|content_redirect|download_redirect|thumbnail|move|restore))?$/);
 const rawDownload=url.origin==='https://chatgpt.com'&&url.pathname.match(/^\/files\/download\/(file-rea-upload-[1-9][0-9]*)$/);
 const upload=url.origin==='https://rea-demo-upload.invalid'&&url.pathname.match(/^\/upload\/(file-rea-upload-[1-9][0-9]*)$/);
 const create=url.origin==='https://chatgpt.com'&&url.pathname==='/files'&&method==='POST';
 const finish=url.origin==='https://chatgpt.com'&&url.pathname==='/files/process_upload_stream'&&method==='POST';
 const batch=url.origin==='https://chatgpt.com'&&url.pathname==='/files/library/files/delete-batch'&&method==='POST';
 const emptyTrash=url.origin==='https://chatgpt.com'&&url.pathname==='/files/library/trash'&&method==='DELETE';
 if(!upload&&!create&&!finish&&!metadata&&!rawDownload&&!batch&&!emptyTrash)return null;
 if(!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo state required');
 signal?.throwIfAborted();
 const root=path.dirname(settingsPath),catalog=path.join(root,'demo-pages.json');
 const state=fs.existsSync(catalog)?JSON.parse(fs.readFileSync(catalog,'utf8')):{version:1,sequence:0,items:[]};
 if(state.version!==1||!Array.isArray(state.items))throw Error('Invalid demo catalog');
 const atomic=(file,data)=>{const pending=file+'.pending';let owned=false;try{signal?.throwIfAborted();fs.writeFileSync(pending,data,{flag:'wx'});owned=true;signal?.throwIfAborted();fs.renameSync(pending,file);}finally{if(owned&&fs.existsSync(pending))fs.unlinkSync(pending);}};
 const persist=()=>atomic(catalog,JSON.stringify(state));
 const json=value=>new Response(JSON.stringify(value),{status:200,headers:{'content-type':'application/json'}});
 const parse=()=>{if(typeof body!=='string'||body.length>65536)throw Error('Expected upload JSON');const input=JSON.parse(body);if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid upload body');return input;};
 const findFile=id=>{const file=state.libraryFiles?.find(f=>f.id===id&&!f.permanentlyDeleted);if(!file)throw Error('Unavailable demo Library file');return file;};
 const validateName=name=>{if(typeof name!=='string'||!name.trim()||name.startsWith('.')||name.length>255)throw Error('Invalid Library file name');return name;};
 const dto=file=>({...file,library_file_category:file.mime_type==='application/pdf'?'pdf':file.library_file_category,file_name:file.name,directory_id:file.parent_directory_id,trashed_at:file.deleted_at??null});
 const parentExists=id=>id==null||state.directories?.some(d=>d.id===id);
 if(emptyTrash){
  const files=(state.libraryFiles??[]).filter(f=>!f.permanentlyDeleted&&f.deleted_at);
  const now=new Date().toISOString();for(const file of files){file.permanentlyDeleted=true;file.updated_at=now;}if(files.length)persist();
  return json({deleted_count:files.length,failed_count:0});
 }
 if(batch){
  const input=parse();if(!Array.isArray(input.files)||!input.files.length||input.files.length>25)throw Error('Invalid Library delete batch');
  const files=input.files.map(row=>{const file=findFile(row.library_file_id);if(row.file_id!==file.file_id||row.file_name!==file.name||row.parent_directory_id!==file.parent_directory_id)throw Error('Stale file deletion');return file;});
  const now=new Date().toISOString();for(const file of files){file.deleted_at??=now;file.updated_at=now;}persist();return json({files:files.map(file=>({library_file_id:file.id,success:true}))});
 }
 if(metadata&&method!=='GET'){
  const file=findFile(metadata[1]),part=metadata[2],now=new Date().toISOString();
  if(part==='restore'&&method==='POST'){
   if(!parentExists(file.parent_directory_id))throw Error('Original file directory unavailable');
   delete file.deleted_at;file.updated_at=now;persist();return json({success:true});
  }
  if(method==='DELETE'&&!part){
   const soft=url.searchParams.get('soft_delete');if(!['true','false'].includes(soft))throw Error('Explicit deletion mode required');
   if(url.searchParams.get('file_id')!==file.file_id||url.searchParams.get('file_name')!==file.name||(url.searchParams.get('parent_directory_id')||null)!==file.parent_directory_id)throw Error('Stale file deletion');
   if(soft==='true')file.deleted_at??=now;else file.permanentlyDeleted=true;file.updated_at=now;persist();return json({success:true});
  }
  if(file.deleted_at)throw Error('Unavailable demo Library file');
  if(method==='PATCH'&&!part){const input=parse();file.name=validateName(input.file_name);file.updated_at=now;persist();return json(dto(file));}
  if(method==='PATCH'&&part==='move'){
   const input=parse();if(!Object.hasOwn(input,'directory_id'))throw Error('File destination required');const parent=input.directory_id==='rea-directory-root'?null:input.directory_id;
   if(!parentExists(parent))throw Error('Unknown file directory');file.parent_directory_id=parent;file.updated_at=now;persist();return json({success:true});
  }
  throw Error('Unsupported file mutation');
 }
 if(metadata||rawDownload){
  if(method!=='GET')throw Error('Unsupported file read method');
  const file=state.libraryFiles?.find(f=>metadata?f.id===metadata[1]:f.file_id===rawDownload[1]);
  if(!file||file.permanentlyDeleted||file.deleted_at)throw Error('Unavailable demo Library file');
  const part=metadata?.[2];
  const publicUrl=kind=>'https://chatgpt.com/api/library/files/'+file.id+'/'+kind;
  if(rawDownload)return json({status:'success',download_url:publicUrl(url.searchParams.get('inline')==='true'?'content':'download')});
  if(part==='content_url')return json({content_url:publicUrl('content')});
  if(part==='download_url')return json({download_url:publicUrl('download')});
  if(part==='thumbnail')return json({thumbnail_url:null});
  if(part==='content_redirect'||part==='download_redirect'){
   if(!/^file-rea-upload-[1-9][0-9]*$/.test(file.file_id))throw Error('Invalid stored file ID');
   const bytesPath=path.join(root,file.file_id+'.bin');if(fs.lstatSync(bytesPath).isSymbolicLink())throw Error('Unexpected upload link');
   const bytes=fs.readFileSync(bytesPath);if(bytes.length!==file.file_size_bytes)throw Error('Stored upload size mismatch');
   return new Response(bytes,{status:200,headers:{'content-type':file.mime_type,'content-length':String(bytes.length)}});
  }
  return json(dto(file));
 }
 if(create){
  const input=parse();
  if(input.entry_surface!=='codex_library_upload'||input.use_case!=='my_files'||input.store_in_library!==true||input.library_persistence_mode!=='required')throw Error('Only native demo Library upload supported');
  if(typeof input.file_name!=='string'||!input.file_name.trim()||input.file_name.startsWith('.')||input.file_name.length>255)throw Error('Invalid upload name');
  if(!Number.isSafeInteger(input.file_size)||input.file_size<0||input.file_size>512*1024*1024)throw Error('Invalid upload size');
  const mime=input.mime_type||input.client_resolved_mime_type||'application/octet-stream';if(typeof mime!=='string'||mime.length>255||/[\r\n]/.test(mime))throw Error('Invalid upload MIME');
  const sequence=(state.uploadSequence??0)+1;if(!Number.isSafeInteger(sequence))throw Error('Upload sequence overflow');
  const item={file_id:'file-rea-upload-'+sequence,name:input.file_name,size:input.file_size,mime_type:mime,status:'reserved',created_at:new Date().toISOString()};
  state.uploadSequence=sequence;state.uploads=[...(state.uploads??[]),item];persist();
  return json({file_id:item.file_id,upload_url:'https://rea-demo-upload.invalid/upload/'+item.file_id,upload_headers:{}});
 }
 const input=finish?parse():null,id=finish?input.file_id:upload[1];
 const item=state.uploads?.find(x=>x.file_id===id);if(!item||!/^file-rea-upload-[1-9][0-9]*$/.test(id))throw Error('Unknown demo upload');
 const byteFile=path.join(root,id+'.bin');
 if(fs.existsSync(byteFile)&&fs.lstatSync(byteFile).isSymbolicLink())throw Error('Unexpected upload link');
 if(upload){
  if(method!=='PUT')throw Error('Unsupported upload method');
  const bytes=ArrayBuffer.isView(body)?Buffer.from(body.buffer,body.byteOffset,body.byteLength):body instanceof ArrayBuffer?Buffer.from(body):null;
  if(!bytes||bytes.byteLength!==item.size)throw Error('Upload byte length mismatch');
  if(fs.existsSync(byteFile)){if(!fs.readFileSync(byteFile).equals(bytes))throw Error('Upload bytes already differ');}else atomic(byteFile,bytes);
  if(item.status!=='ready'){item.status='uploaded';persist();}onProgress?.({loaded:item.size,total:item.size});return new Response(null,{status:200});
 }
 if(input.file_name!==item.name||input.mime_type!==item.mime_type||input.entry_surface!=='codex_library_upload'||input.use_case!=='my_files'||input.library_persistence_mode!=='required'||input.metadata?.store_in_library!==true)throw Error('Upload finalization mismatch');
 if(!fs.existsSync(byteFile)||fs.statSync(byteFile).size!==item.size)throw Error('Upload bytes missing');
 const parent=input.directory_id==null||input.directory_id==='rea-directory-root'?null:input.directory_id;
 if(parent!=null&&!state.directories?.some(d=>d.id===parent))throw Error('Unknown upload directory');
 let file=state.libraryFiles?.find(x=>x.file_id===id);
 if(file){if(file.parent_directory_id!==parent||file.permanentlyDeleted)throw Error('Upload already finalized elsewhere');}
 else{
  const now=new Date().toISOString(),extension=item.name.includes('.')?item.name.split('.').pop().toLowerCase():'';
  file={id:'libfile-rea-'+id.slice('file-rea-upload-'.length),file_id:id,kind:'file',name:item.name,parent_directory_id:parent,mime_type:item.mime_type,file_size_bytes:item.size,file_extension:extension,file_upload_time:now,record_creation_time:now,updated_at:now,library_file_category:item.mime_type.startsWith('image/')?'image':item.mime_type==='application/pdf'?'pdf':'document',state:'ready',access_kind:'owned',thumbnail_url:null};
  state.libraryFiles=[...(state.libraryFiles??[]),file];item.status='ready';persist();
 }
 const events=['file.processing.file_ready','file.processing.completed'].map(event=>({event,file_id:id,progress:100,extra:{metadata_object_id:file.id,library_file_name:file.name,mime_type:file.mime_type}}));
 return new Response(events.map(e=>JSON.stringify(e)).join('\n')+'\n',{status:200,headers:{'content-type':'application/x-ndjson'}});
}
module.exports={demoLibraryFileHttp};
