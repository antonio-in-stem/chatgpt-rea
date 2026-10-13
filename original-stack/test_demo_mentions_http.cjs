const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {demoMentionsHttp}=require('./demo_mentions_http.cjs');
test('original inbox pages, read mutation and unread cursor remain stable across reads',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-mentions-')),settings=path.join(dir,'demo-sidebar-settings.json'),file=path.join(dir,'demo-mentions.json');
 const call=(method,route)=>demoMentionsHttp(method,new URL('https://chatgpt.com'+route),settings,fs,path);
 try{
  assert.deepEqual(call('GET','/pages/mentions/inbox'),{items:[],next_cursor:null});
  const items=[1,2,3].map(n=>({notification_id:'rea-mention-'+n,page_id:'rea-page-1',page_title:'Demo page',block_id:null,actor_account_user_id:'rea-demo-user',actor_display_name:'Demo',created_at:'2026-10-13T12:00:0'+n+'Z',read_at:null}));fs.writeFileSync(file,JSON.stringify({version:1,items}));
  const first=call('GET','/pages/mentions/inbox?unread_only=true&limit=1');assert.equal(first.items[0].notification_id,'rea-mention-3');
  call('POST','/pages/mentions/inbox/rea-mention-3/read');const bytes=fs.readFileSync(file);call('POST','/pages/mentions/inbox/rea-mention-3/read');assert.deepEqual(fs.readFileSync(file),bytes);
  const second=call('GET','/pages/mentions/inbox?unread_only=true&limit=1&cursor='+first.next_cursor);assert.equal(second.items[0].notification_id,'rea-mention-2');
  assert.equal(call('GET','/pages/mentions/inbox').items.length,3);assert.equal(call('GET','/pages/mentions/inbox?unread_only=true').items.length,2);
  fs.writeFileSync(file+'.pending','foreign');assert.throws(()=>call('POST','/pages/mentions/inbox/rea-mention-2/read'));assert.deepEqual(fs.readFileSync(file),bytes);fs.unlinkSync(file+'.pending');
  assert.throws(()=>call('POST','/pages/mentions/inbox/rea-mention-99/read'),/Unknown/);
  for(const query of ['limit=0','limit=101','unread_only=maybe','cursor=unknown','cursor=mention:false:rea-mention-99'])assert.throws(()=>call('GET','/pages/mentions/inbox?'+query));
  assert.equal(demoMentionsHttp('GET',new URL('https://example.invalid/pages/mentions/inbox'),settings,fs,path),null);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
