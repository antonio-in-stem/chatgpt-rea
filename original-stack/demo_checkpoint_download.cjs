// Local host seam for immutable original-format demo snapshots. No network fallback.
function demoCheckpointDownload(rawUrl,settingsPath,fs,path){
 const url=new URL(rawUrl);
 if(url.origin!=='https://rea-demo.invalid'||url.username||url.password||url.search||url.hash)throw Error('Not a local demo checkpoint');
 const match=url.pathname.match(/^\/checkpoints\/(rea-page-[1-9][0-9]*)\/(demo-checkpoint-[1-9][0-9]*)$/);
 if(!match||!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo checkpoint required');
 const directory=path.dirname(settingsPath),pages=JSON.parse(fs.readFileSync(path.join(directory,'demo-pages.json'),'utf8'));
 if(!pages.items.some(x=>x.metadata.page_id===match[1]&&!x.permanentlyDeleted&&!x.metadata.deleted_at))throw Error('Unavailable demo page');
 const state=JSON.parse(fs.readFileSync(path.join(directory,match[1]+'-document.json'),'utf8'));
 const checkpoint=state.checkpoints?.find(x=>x.checkpoint_id===match[2]);if(!checkpoint)throw Error('Unknown demo checkpoint');
 const envelope=JSON.parse(checkpoint.envelope);
 if(envelope.format!=='openai.page.yjs'||envelope.page_id!==match[1]||envelope.stream_kind!=='content'||envelope.through_sequence!==checkpoint.through_sequence)throw Error('Invalid demo checkpoint envelope');
 return Uint8Array.from(Buffer.from(checkpoint.envelope,'utf8'));
}
module.exports={demoCheckpointDownload};
