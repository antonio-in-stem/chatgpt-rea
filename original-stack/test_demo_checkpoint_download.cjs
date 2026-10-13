const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {demoCheckpointDownload}=require('./demo_checkpoint_download.cjs');
test('local checkpoint download returns exact immutable bytes and rejects foreign URLs or unavailable pages',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-download-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const url='https://rea-demo.invalid/checkpoints/rea-page-1/demo-checkpoint-1';
 const page={metadata:{page_id:'rea-page-1'}};
 const envelope=JSON.stringify({format:'openai.page.yjs',page_id:'rea-page-1',stream_kind:'content',through_sequence:1,schema_version:2,yjs_state_update_base64:'AAA=',state_vector_base64:'AA=='});
 try{
  fs.writeFileSync(path.join(dir,'demo-pages.json'),JSON.stringify({items:[page]}));
  fs.writeFileSync(path.join(dir,'rea-page-1-document.json'),JSON.stringify({checkpoints:[{checkpoint_id:'demo-checkpoint-1',through_sequence:1,envelope}]}));
  assert.deepEqual(Buffer.from(demoCheckpointDownload(url,settings,fs,path)),Buffer.from(envelope));
  for(const bad of [url.replace('rea-demo.invalid','example.com'),url+'?x=1',url+'#x',url.replace('https://','https://user@'),url.replace('demo-checkpoint-1','demo-checkpoint-2')])assert.throws(()=>demoCheckpointDownload(bad,settings,fs,path));
  page.metadata.deleted_at='2026-10-13';fs.writeFileSync(path.join(dir,'demo-pages.json'),JSON.stringify({items:[page]}));
  assert.throws(()=>demoCheckpointDownload(url,settings,fs,path),/Unavailable/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
