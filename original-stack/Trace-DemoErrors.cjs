const fs=require('node:fs'),path=require('node:path');
(async()=>{
 const stateName=process.argv[2];if(!/^demo-[a-zA-Z0-9_-]+$/.test(stateName||''))throw Error('Demo profile required');
 const state=path.join(__dirname,'state',stateName);if(fs.existsSync(path.join(state,'codex-home/auth.json')))throw Error('Credentials present');
 const port=fs.readFileSync(path.join(state,'profile/DevToolsActivePort'),'utf8').split(/\r?\n/)[0];
 if(!/^\d+$/.test(port))throw Error('Invalid port');
 const target=(await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t=>t.type==='page'&&t.url==='app://-/index.html');
 const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
 let seq=0;const pending=new Map(),events=[],jobs=[];
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 async function detail(arg){
  const entry={description:arg.description||arg.value||arg.type};
  if(arg.objectId&&/AggregateError/.test(arg.description||'')){
   const props=await send('Runtime.getProperties',{objectId:arg.objectId,ownProperties:true});
   const errors=props.result?.find(p=>p.name==='errors')?.value;
   if(errors?.objectId){const nested=await send('Runtime.getProperties',{objectId:errors.objectId,ownProperties:true});entry.errors=nested.result?.filter(p=>/^\d+$/.test(p.name)).map(p=>p.value?.description);}
  }
  return entry;
 }
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);return;}
 if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error'&&events.length<30){const record={kind:'console-error',args:[]};events.push(record);jobs.push(Promise.all(m.params.args.map(detail)).then(args=>record.args=args));}
 if(m.method==='Runtime.exceptionThrown'&&events.length<30){const record={kind:'exception'};events.push(record);jobs.push(detail(m.params.exceptionDetails.exception||{}).then(e=>record.error=e));}
 };
 await send('Runtime.enable');console.log('Listening for original renderer errors');
 await new Promise(r=>setTimeout(r,20000));await Promise.allSettled(jobs);
 fs.writeFileSync(path.join(state,'renderer-errors.json'),JSON.stringify(events,null,2));console.log(JSON.stringify(events));ws.close();
})().catch(e=>{console.error(e.message);process.exitCode=1});
