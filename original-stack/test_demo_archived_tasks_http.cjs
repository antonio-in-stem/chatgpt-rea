const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {demoArchivedTasksHttp:handle}=require('./demo_archived_tasks_http.cjs');
function fixture(t){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-archive-'));t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));return (method,route,io=fs)=>handle(method,new URL(route,'https://chatgpt.com'),undefined,path.join(dir,'settings'),io);}
const list='/wham/tasks/list?task_filter=archived';
test('list, recover and archive persist across reads',t=>{const call=fixture(t);assert.equal(call('GET',list).items.length,2);call('POST','/wham/tasks/rea-demo-archived-1/recover');assert.equal(call('GET',list).items.length,1);call('POST','/wham/tasks/rea-demo-archived-1/recover');assert.equal(call('GET',list).items.length,1);call('POST','/wham/tasks/rea-demo-archived-1/archive');assert.equal(call('GET',list).items.length,2);assert.equal(call('GET',list+'&cursor=end').items.length,0);});
test('failed writes preserve archive state and unrelated task routes are not claimed',t=>{const call=fixture(t),failing=Object.create(fs);failing.renameSync=()=>{throw Error('disk error');};assert.throws(()=>call('POST','/wham/tasks/rea-demo-archived-1/recover',failing));assert.equal(call('GET',list).items.length,2);assert.throws(()=>call('GET','/wham/tasks/rea-demo-archived-1/recover'));assert.equal(call('GET','/wham/tasks/list'),null);assert.equal(call('POST','/wham/tasks/foreign/recover'),null);assert.equal(handle('GET',new URL('https://example.com'+list)),null);});

test('search follows original query/cursor contract and retains archive metadata',t=>{const call=fixture(t);assert.equal(call('GET','/wham/tasks/search?query=REA%20ARCHIVED%20DEMO%202').items[0].id,'rea-demo-archived-2');assert.equal(call('GET','/wham/tasks/search?query=absent').items.length,0);assert.equal(call('GET','/wham/tasks/search?query=demo&cursor=end').items.length,0);call('POST','/wham/tasks/rea-demo-archived-2/recover');assert.equal(call('GET','/wham/tasks/search?query=demo%202').items[0].archived,false);assert.throws(()=>call('POST','/wham/tasks/search?query=demo'));});

test('empty ChatGPT archive contract preserves pagination and route boundaries',t=>{const call=fixture(t);assert.deepEqual(call('GET','/conversations?is_archived=true&offset=0&limit=20'),{items:[],offset:0,limit:20,total:0});assert.deepEqual(call('GET','/conversations?is_archived=true&offset=20&limit=5'),{items:[],offset:20,limit:5,total:0});for(const query of ['offset=-1','offset=NaN','limit=0','limit=101','limit=1.5'])assert.throws(()=>call('GET','/conversations?is_archived=true&'+query));assert.throws(()=>call('POST','/conversations?is_archived=true'));assert.equal(call('GET','/conversations'),null);assert.equal(call('GET','/conversations?is_archived=false'),null);assert.equal(handle('GET',new URL('https://example.com/conversations?is_archived=true')),null);assert.equal(call('GET',list).items.length,2);});

test('completed archived viewer links synthetic turns and follows durable archive state',t=>{
 const call=fixture(t),route='/wham/tasks/rea-demo-archived-2';
 const detail=call('GET',route),turns=call('GET',route+'/turns');
 assert.equal(detail.task.archived,true);assert.equal(detail.task.has_unread_turn,false);
 assert.equal(detail.current_assistant_turn.turn_status,'completed');
 assert.equal(detail.current_assistant_turn.previous_turn_id,detail.current_user_turn.id);
 for(const turn of [detail.current_user_turn,detail.current_assistant_turn]){
  assert.deepEqual(turns.turn_mapping[turn.id].turn,turn);
  assert.deepEqual(call('GET',route+'/turns/'+turn.id),{turn});
 }
 call('POST',route+'/recover');assert.equal(call('GET',route).task.archived,false);
 assert.throws(()=>call('POST',route));assert.throws(()=>call('GET',route+'/turns/rea-archive-assistant-1'));
 assert.equal(call('GET','/wham/tasks/not-a-demo-task'),null);
});
