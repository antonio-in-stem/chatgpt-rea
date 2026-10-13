// Bounded logpoint on a recovered selector, only in a credential-free demo renderer.
const fs=require('node:fs'),path=require('node:path');
(async()=>{
 const name=process.argv[2];if(!/^demo-[a-zA-Z0-9_-]+$/.test(name||''))throw Error('Explicit demo required');
 const state=path.join(__dirname,'state',name);if(fs.existsSync(path.join(state,'codex-home/auth.json')))throw Error('Credentials present');
 const port=fs.readFileSync(path.join(state,'profile/DevToolsActivePort'),'utf8').split(/\r?\n/)[0];if(!/^\d+$/.test(port))throw Error('Invalid port');
 const target=(await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(x=>x.type==='page'&&x.url==='app://-/index.html');if(!target)throw Error('Missing renderer');
 const source=fs.readFileSync(path.resolve(__dirname,'../../../extracted/webview/assets/app-initial-b8e1c8014bb4.js'),'utf8');
 const needle='jD=Tu(q,({get:e})=>{';const index=source.indexOf(needle);if(index<0||source.indexOf(needle,index+1)>=0)throw Error('Nonunique selector');
 const offset=index+needle.length,prefix=source.slice(0,offset);const lineNumber=prefix.split('\n').length-1,columnNumber=offset-(prefix.lastIndexOf('\n')+1);
 const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise((ok,no)=>{ws.onopen=ok;ws.onerror=no});
 let next=0;const pending=new Map(),observations=[];
 ws.onmessage=event=>{const m=JSON.parse(event.data);if(pending.has(m.id)){const cb=pending.get(m.id);pending.delete(m.id);m.error?cb.reject(Error(JSON.stringify(m.error))):cb.resolve(m.result);}
 if(m.method==='Runtime.consoleAPICalled'&&m.params.args?.[0]?.value==='REA_LIBRARY_AVAILABILITY'){const v=m.params.args[1]?.value;if(typeof v==='string')observations.push(JSON.parse(v));}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 let breakpoint;
 try{
  await send('Runtime.enable');await send('Debugger.enable');
  const condition="(()=>{const client=e(Ii);console.debug('REA_LIBRARY_AVAILABILITY',JSON.stringify({permission:e(zu).status,authReady:e(nu),accountPresent:e(Dp)!=null,userPresent:e(zg)!=null,accountMatches:e(zs)===e(Dp),clientPresent:client!=null,clientLoading:e(Mm),gate:client?.checkGate('224248639'),settingsPending:e(Sh).isPending,settingsError:e(Sh).isError,settingsPresent:e(Sh).data!=null,country:e(Sh).data?.fileLibraryEnabledForRegistrationCountry}));return false})()";
  breakpoint=(await send('Debugger.setBreakpointByUrl',{url:'app://-/assets/app-initial-b8e1c8014bb4.js',lineNumber,columnNumber,condition})).breakpointId;
  console.log('Selector logpoint active for 40 seconds');await new Promise(ok=>setTimeout(ok,40000));
 }finally{if(breakpoint)await send('Debugger.removeBreakpoint',{breakpointId:breakpoint});await send('Debugger.disable');ws.close();}
 fs.writeFileSync(path.join(state,'library-availability-observation.json'),JSON.stringify(observations,null,2));console.log(JSON.stringify(observations));
})().catch(e=>{console.error(e.message);process.exitCode=1});
