// Original /archive route; does not claim the separate archive-preview sidebar.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:15000,maxBuffer:1048576});return JSON.parse(stdout);}
async function check(name,predicate){const end=Date.now()+45000;do{const x=await control('inspect-archive-flow');if(x.ready&&!x.failed&&!x.alerts.length&&predicate(x)){results.push(name);console.log('PASS '+name);return;}await new Promise(r=>setTimeout(r,500));}while(Date.now()<end);throw Error('Archive acceptance failed: '+name);}
(async()=>{
 await control('open-demo-archive-route');
 await check('original archive route loads without list error',x=>x.titles.includes('REA archived demo 2'));
 await control('fill','Search archived chats','no-such-demo-archive');
 await check('unmatched search hides archived demo',x=>x.titles.length===0);
 await control('fill','Search archived chats','REA archived demo 2');
 await check('matching search restores archived demo',x=>x.titles.length===1);
 await control('fill','Search archived chats','');
 await control('click','Filter archived chats');await control('activate-popup-item','Local');
 await check('local filter excludes cloud task',x=>!x.titles.includes('REA archived demo 2'));
 await control('click','Filter archived chats');await control('activate-popup-item','Cloud');
 await check('cloud filter includes cloud task',x=>x.titles.includes('REA archived demo 2'));
 await control('click','Filter archived chats');await control('activate-popup-item','All chats');
 await check('all chats filter restored without error',x=>x.titles.includes('REA archived demo 2'));
 fs.writeFileSync(path.join(__dirname,'state',profile,'archive-route-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,viewerVerified:false},null,2)+'\n');
 console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
