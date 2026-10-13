const {test}=require('node:test'),assert=require('node:assert/strict');
const {demoAutomationHttp:call}=require('./demo_automation_http.cjs');
test('scheduled listing supports original pagination and filters only',()=>{
 for(const filter of ['scheduled','finished','paused'])assert.deepEqual(call('GET',new URL('https://chatgpt.com/automations?filter='+filter+'&limit=25')),{items:[],cursor:null});
 assert.deepEqual(call('GET',new URL('https://chatgpt.com/automations?limit=100')),{items:[],cursor:null});
 for(const query of ['limit=-1','limit=101','cursor=unknown','filter=unknown'])assert.throws(()=>call('GET',new URL('https://chatgpt.com/automations?'+query)));
 assert.equal(call('POST',new URL('https://chatgpt.com/automations')),null);
 assert.equal(call('GET',new URL('https://example.invalid/automations')),null);
});
