const {test}=require('node:test'),assert=require('node:assert/strict');
const {demoPluginHttp}=require('./demo_plugin_http.cjs');
const get=route=>demoPluginHttp('GET',new URL('https://chatgpt.com'+route));
test('personal remote catalog and detail agree without executable capabilities',()=>{
 for(const limit of [9,50]){
  const page=get('/ps/plugins/list?scope=USER&limit='+limit);
  assert.deepEqual(page.pagination,{limit,next_page_token:null});assert.equal(page.plugins.length,1);
  const entry=page.plugins[0];assert.deepEqual(get('/ps/plugins/'+entry.id),entry);
  assert.equal(entry.scope,'USER');assert.equal(entry.release.display_name,'REA Catalog Demo');
  assert.deepEqual(entry.release.skills,[]);assert.deepEqual(entry.release.mcp_servers,[]);assert.deepEqual(entry.release.app_ids,[]);
  assert.equal(Object.hasOwn(entry,'enabled'),false); // Original H2 uses presence to mark installed.
 }
 const first=get('/ps/plugins/list?scope=USER');first.plugins[0].release.display_name='changed';
 assert.equal(get('/ps/plugins/list?scope=USER').plugins[0].release.display_name,'REA Catalog Demo');
});
test('remote installed dependency is explicitly empty and respects pagination',()=>{
 assert.deepEqual(get('/ps/plugins/installed?limit=1000&includeExtensions=true'),{plugins:[],pagination:{limit:1000,next_page_token:null}});
});
test('remote reads preserve origin method identity and pagination boundaries',()=>{
 assert.equal(demoPluginHttp('POST',new URL('https://chatgpt.com/ps/plugins/list?scope=USER')),null);
 assert.equal(demoPluginHttp('GET',new URL('https://example.invalid/ps/plugins/list?scope=USER')),null);
 assert.equal(get('/ps/plugins/plugin_unknown'),null);
 for(const query of ['scope=WORKSPACE','scope=USER&limit=0','scope=USER&limit=101','scope=USER&pageToken=unknown'])assert.throws(()=>get('/ps/plugins/list?'+query));
 assert.throws(()=>get('/ps/plugins/installed?limit=1001'));assert.throws(()=>get('/ps/plugins/installed?pageToken=unknown'));
});
