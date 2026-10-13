const {test}=require('node:test'),assert=require('node:assert/strict');
const {demoSpaceHttp:call}=require('./demo_space_http.cjs');
test('original space queries receive distinct empty pagination shapes',()=>{
 for(const route of ['/spaces/v2','/pages','/pages/mentions/inbox'])assert.deepEqual(call('GET',new URL('https://chatgpt.com'+route+'?limit=50')),{items:[],next_cursor:null});
 assert.deepEqual(call('GET',new URL('https://chatgpt.com/pages/catalog?order_by=last_used_at')),{items:[],next_cursor:null,order_by:'last_used_at'});
 assert.deepEqual(call('GET',new URL('https://chatgpt.com/pins/pages')),[]);
 assert.deepEqual(call('POST',new URL('https://chatgpt.com/files/library'),JSON.stringify({limit:50,cursor:null,include_pages:true})),{items:[],cursor:null});
 assert.equal(call('POST',new URL('https://chatgpt.com/pages'),'{}'),null);
 assert.equal(call('GET',new URL('https://example.invalid/pages')),null);
 assert.throws(()=>call('GET',new URL('https://chatgpt.com/spaces/v2?cursor=unknown')));
 assert.throws(()=>call('POST',new URL('https://chatgpt.com/files/library'),'{"limit":0}'));
});
