const {test}=require('node:test'),assert=require('node:assert/strict');
const {demoPageCsp}=require('./demo_page_csp.cjs');
test('only explicit demo index adds its current loopback endpoint to connect-src',async()=>{
 const html='<meta content="default-src &#39;none&#39;; connect-src &#39;self&#39;;">';
 const fs={readFileSync:()=>JSON.stringify({endpoint:'ws://127.0.0.1:1234'})},path=require('node:path');
 const res=await demoPageCsp('app://-/index.html',new Response(html),'C:/demo/demo-sidebar-settings.json',fs,path);
 assert.equal(await res.text(),html.replace('connect-src &#39;self&#39;','connect-src &#39;self&#39; ws://127.0.0.1:1234/demo-pages/'));
 const original=new Response(html);assert.equal(await demoPageCsp('app://-/other.html',original,'C:/demo/demo-sidebar-settings.json',fs,path),original);
 await assert.rejects(()=>demoPageCsp('app://-/index.html',new Response(html),'C:/demo/demo-sidebar-settings.json',{readFileSync:()=>JSON.stringify({endpoint:'wss://example.com'})},path));
});

test('TLS demo CSP accepts only the fixed isolated hostname and websocket path',async()=>{
 const html='connect-src &#39;self&#39;',path=require('node:path');
 const endpoint='wss://pages-realtime.gateway.rea-demo.api.openai.com:1234/ws';
 const invoke=value=>demoPageCsp('app://-/index.html',new Response(html),'C:/demo/demo-sidebar-settings.json',{readFileSync:()=>JSON.stringify({endpoint:value})},path);
 assert.equal(await (await invoke(endpoint)).text(),html+' '+endpoint);
 for(const bad of [endpoint+'/extra',endpoint.replace('rea-demo','production'),endpoint+'?token=x'])await assert.rejects(()=>invoke(bad));
});
