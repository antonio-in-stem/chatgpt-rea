const {test}=require('node:test'),assert=require('node:assert/strict');
const {demoAutomationHttp:call}=require('./demo_automation_http.cjs');
test('scheduled listing supports original pagination and filters only',()=>{
 for(const filter of ['scheduled','finished','paused'])assert.deepEqual(call('GET',new URL('https://chatgpt.com/automations?filter='+filter+'&limit=25')),{items:[],cursor:null});
 assert.deepEqual(call('GET',new URL('https://chatgpt.com/automations?limit=100')),{items:[],cursor:null});
 for(const query of ['limit=-1','limit=101','cursor=unknown','filter=unknown'])assert.throws(()=>call('GET',new URL('https://chatgpt.com/automations?'+query)));
 assert.equal(call('POST',new URL('https://chatgpt.com/automations')),null);
 assert.equal(call('GET',new URL('https://example.invalid/automations')),null);
});
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
test('demo tasks persist edits, filtering, pagination and removal without scheduler',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-task-test-')),settings=path.join(dir,'demo-sidebar-settings.json');
 const invoke=(method,route,body)=>call(method,new URL('https://chatgpt.com'+route),body===undefined?undefined:JSON.stringify(body),settings,fs,path);
 const payload={title:'Synthetic task',prompt:'Display demo only',schedule:'RRULE:FREQ=DAILY;BYHOUR=9;BYMINUTE=30',default_timezone:'America/Mexico_City',is_enabled:true,timing_mode:0};
 try{
  const first=invoke('POST','/automations/save',payload),second=invoke('POST','/automations/save',{...payload,title:'Second'});
  assert.notEqual(first.id,second.id);
  assert.equal(first.schedule_components.by_hour,9);
  const page=invoke('GET','/automations?filter=scheduled&limit=1');assert.equal(page.cursor,'1');
  assert.equal(invoke('GET','/automations?filter=scheduled&limit=1&cursor=1').items[0].id,first.id);
  const edited=invoke('POST','/automations/save',{...payload,jawbone_id:first.id,title:'Edited'});assert.equal(edited.id,first.id);
  invoke('POST','/automations/set_status',{jawbone_id:first.id,is_enabled:false});
  assert.equal(invoke('GET','/automations?filter=paused').items[0].title,'Edited');
  const pending=path.join(dir,'demo-automations.json.pending');fs.writeFileSync(pending,'other writer');
  assert.throws(()=>invoke('POST','/automations/remove',{automation_id:first.id}));
  assert.equal(fs.readFileSync(pending,'utf8'),'other writer');fs.unlinkSync(pending);
  assert.equal(invoke('GET','/automations?filter=paused').items.length,1);
  invoke('POST','/automations/remove',{automation_id:first.id});
  assert.equal(invoke('GET','/automations?filter=paused').items.length,0);
  assert.throws(()=>invoke('POST','/automations/set_status',{jawbone_id:'real-task',is_enabled:true}));
  assert.deepEqual(fs.readdirSync(dir),['demo-automations.json']);
 }finally{for(const name of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,name));fs.rmdirSync(dir);}
});
