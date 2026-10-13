const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {demoLocalAutomations}=require('./demo_local_automations.cjs');
test('local task lifecycle persists only inert JSON and preserves failed writes',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-local-task-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const call=(m,p={})=>demoLocalAutomations(m,p,settings,fs,path);
 try{
  const input={kind:'heartbeat',name:'Demo',prompt:'Synthetic only',rrule:'RRULE:FREQ=DAILY',targetThreadId:'demo-thread',status:'ACTIVE'};
  const {item}=call('create',input);assert.equal(call('list').items[0].id,item.id);
  assert.equal(call('update',{...input,id:item.id,status:'PAUSED'}).item.nextRunAt,null);
  const file=path.join(dir,'demo-local-automations.json'),pending=file+'.pending';fs.writeFileSync(pending,'other writer');
  assert.throws(()=>call('delete',{id:item.id}));assert.equal(fs.readFileSync(pending,'utf8'),'other writer');fs.unlinkSync(pending);
  assert.equal(call('list').items[0].status,'PAUSED');
  assert.equal(call('delete',{id:item.id}).status,'deleted');assert.equal(call('list').items.length,0);
  assert.equal(call('delete',{id:item.id}).status,'not_found');
  assert.throws(()=>call('update',{...input,id:'unknown'}));
  assert.deepEqual(fs.readdirSync(dir),['demo-local-automations.json']);
 }finally{for(const f of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,f));fs.rmdirSync(dir);}
});
