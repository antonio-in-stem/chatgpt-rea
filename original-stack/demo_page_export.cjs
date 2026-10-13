// Serialize only canonical demo snapshots through the shipped renderer's serializer.
async function demoPageExport(method,url,result,settingsPath,fs,path,serialize){
 if(method!=='GET'||url.origin!=='https://chatgpt.com'||!/^\/pages\/rea-page-[1-9][0-9]*$/.test(url.pathname)||url.searchParams.get('include_content')!=='true'||result?.content!=null)return result;
 if(!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo export state required');
 const id=url.pathname.split('/').pop(),file=path.join(path.dirname(settingsPath),id+'-document.json');
 if(!fs.existsSync(file))return result;
 const raw=fs.readFileSync(file,'utf8'),doc=JSON.parse(raw),snapshot=doc.export_blocks;
 if(!snapshot||snapshot.sequence!==doc.sequence||result?.metadata?.current_sequence!==doc.sequence||!Array.isArray(snapshot.blocks))throw Error('Current demo export projection unavailable');
 if(snapshot.blocks.some(b=>!b||typeof b.id!=='string'||!['markdown','agent_instructions'].includes(b.kind)||typeof b.markdown!=='string')||new Set(snapshot.blocks.map(b=>b.id)).size!==snapshot.blocks.length)throw Error('Invalid demo export blocks');
 const markdown=await serialize(snapshot.blocks);
 if(typeof markdown!=='string')throw Error('Original serializer returned invalid Markdown');
 if(fs.readFileSync(file,'utf8')!==raw)throw Error('Demo document changed during export; retry');
 const pages=JSON.parse(fs.readFileSync(path.join(path.dirname(settingsPath),'demo-pages.json'),'utf8'));
 if(!pages.items.some(x=>x.metadata.page_id===id&&!x.permanentlyDeleted&&!x.metadata.deleted_at))throw Error('Page no longer available for export');
 return {...result,content:{page_id:id,title:doc.title??result.metadata.title,through_sequence:doc.sequence,blocks:snapshot.blocks,markdown}};
}
module.exports={demoPageExport};
