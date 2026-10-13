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
