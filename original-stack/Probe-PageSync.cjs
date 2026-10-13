// Observe only Pages websocket frame types in a credential-free local demo.
const fs=require('node:fs'),path=require('node:path');
(async()=>{
 const stateName=process.argv[2];if(!/^demo-[a-zA-Z0-9_-]+$/.test(stateName||''))throw Error('Demo required');
 const state=path.join(__dirname,'state',stateName);if(fs.existsSync(path.join(state,'codex-home/auth.json')))throw Error('Credentials present');
 const port=fs.readFileSync(path.join(state,'profile/DevToolsActivePort'),'utf8').split(/\r?\n/)[0];if(!/^\d+$/.test(port))throw Error('Invalid port');
 const target=(await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(x=>x.type==='page'&&x.url==='app://-/index.html');if(!target)throw Error('Renderer missing');
 const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise((ok,no)=>{ws.onopen=ok;ws.onerror=no});
 const ids=new Set(),events=[];
 ws.onmessage=e=>{const m=JSON.parse(e.data),p=m.params;if(m.method==='Network.webSocketCreated'&&new URL(p.url).pathname.startsWith('/demo-pages/')){ids.add(p.requestId);events.push({event:'created',path:new URL(p.url).pathname});}
 if(p&&ids.has(p.requestId)&&['Network.webSocketFrameSent','Network.webSocketFrameReceived'].includes(m.method)){try{const value=JSON.parse(p.response.payloadData);events.push({event:m.method,type:value.type,sequence:value.sequence,committed_sequence:value.committed_sequence,code:value.code});}catch{}}
 if(p&&ids.has(p.requestId)&&m.method==='Network.webSocketFrameError')events.push({event:'frameError',error:p.errorMessage});};
 ws.send(JSON.stringify({id:1,method:'Network.enable'}));
 await new Promise(ok=>setTimeout(ok,45000));ws.close();fs.writeFileSync(path.join(state,'page-sync-observation.json'),JSON.stringify(events,null,2));console.log(JSON.stringify(events));
})().catch(e=>{console.error(e.message);process.exitCode=1});
