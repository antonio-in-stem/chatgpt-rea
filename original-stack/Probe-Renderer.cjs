const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const stateName=process.argv[2];
 if(stateName&&!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(stateName))throw Error('Invalid state name');
 const state=stateName?path.join(__dirname,'state',stateName):path.join(__dirname,'state');
 const profile=path.join(state,'profile');
 const port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split(/\r?\n/)[0];
 if(!/^\d+$/.test(port))throw Error('Invalid local CDP port');
 const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
 const target=targets.find(t=>t.type==='page'&&t.url==='app://-/index.html');
 if(!target)throw Error('Original main renderer not found');
 const ws=new WebSocket(target.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 let sequence=0;const pending=new Map();
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 const timer=setTimeout(()=>{ws.close();process.exitCode=1;},15000);
 try{
  const result=await send('Runtime.evaluate',{returnByValue:true,expression:`(()=>{const s=getComputedStyle(document.body);return {url:location.href,windowType:window.codexWindowType,bridgeMethods:Object.keys(window.electronBridge||{}),bodyStyle:{fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,backgroundColor:s.backgroundColor},loginVisible:document.body.innerText.includes('Iniciar sesiÃ³n en ChatGPT'),composerPresent:!!document.querySelector('[contenteditable="true"]'),rootDataset:{codexWindowType:document.documentElement.dataset.codexWindowType,codexOs:document.documentElement.dataset.codexOs}}})()`});
  if(result.exceptionDetails)throw Error('Renderer probe failed');
  const report={capturedUtc:new Date().toISOString(),targetId:target.id,method:'read-only CDP Runtime.evaluate on isolated app:// renderer',result:result.result.value};
  fs.writeFileSync(path.join(state,'renderer-bootstrap-observation.json'),JSON.stringify(report,null,2)+'\n');
  const screenshot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
  fs.writeFileSync(path.join(state,'original-renderer.png'),Buffer.from(screenshot.data,'base64'));
  console.log(JSON.stringify(report,null,2));
 }finally{clearTimeout(timer);ws.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
