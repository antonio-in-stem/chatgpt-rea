// Observe the original file-open entry in the credential-free demo only.
'use strict';
const fs=require('node:fs'),path=require('node:path');
(async()=>{
 const stateName=process.argv[2];if(!/^demo-[a-zA-Z0-9_-]+$/.test(stateName||''))throw Error('Explicit demo profile required');
 const state=path.join(__dirname,'state',stateName);if(fs.existsSync(path.join(state,'codex-home/auth.json')))throw Error('Credentials present');
 const source=fs.readFileSync(path.resolve(__dirname,'../../../extracted/webview/assets/app-initial-b8e1c8014bb4.js'),'utf8');
 const marker='function JG(e){';
 const offset=source.indexOf(marker);if(offset<0||source.indexOf(marker,offset+1)>=0)throw Error('Original guard not unique');
 const point=offset+marker.length,lineNumber=source.slice(0,point).split('\n').length-1,columnNumber=point-source.lastIndexOf('\n',point)-1;
 const port=fs.readFileSync(path.join(state,'profile/DevToolsActivePort'),'utf8').split(/\r?\n/)[0];if(!/^\d+$/.test(port))throw Error('Invalid CDP port');
 const target=(await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t=>t.type==='page'&&t.url==='app://-/index.html');if(!target)throw Error('Original demo renderer absent');
 const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
 let seq=0;const pending=new Map();let resolvePaused;const paused=new Promise(r=>resolvePaused=r);
 ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.method==='Debugger.paused')resolvePaused(m.params);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result)}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 let timer,bp;
 try{
  await send('Debugger.enable');
  bp=await send('Debugger.setBreakpointByUrl',{url:'app://-/assets/app-initial-b8e1c8014bb4.js',lineNumber,columnNumber});
  if(!bp.locations.length)throw Error('Original script breakpoint unresolved');
  const trigger=send('Runtime.evaluate',{expression:`(()=>{const b=[...document.querySelectorAll('button')].filter(e=>e.innerText.trim()==='rea-demo-note.csv'&&e.getBoundingClientRect().width>0);if(b.length!==1)throw Error('Expected one CSV chip');b[0].click();return true})()`,returnByValue:true});
  trigger.catch(()=>{});
  const hit=await Promise.race([paused,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('File open entry not reached in 15 seconds')),15000)})]);
  const frame=hit.callFrames.find(f=>f.location.scriptId===bp.locations[0].scriptId);if(!frame)throw Error('Unexpected pause');
  const result=await send('Debugger.evaluateOnCallFrame',{callFrameId:frame.callFrameId,expression:'({openInSidePanel:e.openInSidePanel,isAttachmentPreview:e.isAttachmentPreview,hostId:e.hostId,hasScope:e.scope!=null,path:e.path})',returnByValue:true,throwOnSideEffect:true});
  if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||'Guard observation failed');
  const report={source:'app-initial-b8e1c8014bb4.js',lineNumber,columnNumber,observed:result.result.value,method:'Breakpoint at original file-open entry; read-only expression; resumed unchanged'};
  fs.writeFileSync(path.join(state,'file-open-entry.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
  await send('Debugger.resume');await trigger;
 }finally{clearTimeout(timer);if(bp)await send('Debugger.removeBreakpoint',{breakpointId:bp.breakpointId}).catch(()=>{});await send('Debugger.resume').catch(()=>{});await send('Debugger.disable').catch(()=>{});ws.close()}
})().catch(e=>{console.error(e.message);process.exitCode=1});
