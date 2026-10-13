const {test}=require('node:test'),assert=require('node:assert/strict');
const {demoPluginHttp}=require('./demo_plugin_http.cjs');
test('personal catalog dependency preserves requested pagination and route boundaries',()=>{
 for(const limit of [9,50])assert.deepEqual(demoPluginHttp('GET',new URL('https://chatgpt.com/ps/plugins/list?scope=USER&limit='+limit)),{plugins:[],pagination:{limit,next_page_token:null}});
 assert.equal(demoPluginHttp('POST',new URL('https://chatgpt.com/ps/plugins/list?scope=USER')),null);
 assert.equal(demoPluginHttp('GET',new URL('https://example.invalid/ps/plugins/list?scope=USER')),null);
 for(const query of ['scope=WORKSPACE','scope=USER&limit=0','scope=USER&limit=101','scope=USER&pageToken=unknown'])assert.throws(()=>demoPluginHttp('GET',new URL('https://chatgpt.com/ps/plugins/list?'+query)));
});
