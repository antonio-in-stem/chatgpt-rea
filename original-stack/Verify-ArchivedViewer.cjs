const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const read=()=>control('inspect-demo-archived-viewer');
async function wait(predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(x.ready&&predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,500));}while(Date.now()<deadline);throw Error('Archived viewer state timed out');}
const loaded=x=>!x.failure&&x.title&&x.userMessage&&x.assistantMessage;
async function check(name,predicate){await wait(predicate);results.push(name);console.log('PASS '+name);}
(async()=>{
await wait(x=>x.buttons.some(e=>e.text==='Home'));
await control('activate-navigation-button','Home');await wait(x=>!x.userMessage&&!x.assistantMessage);
await control('open-demo-archived-viewer');
await check('original cloud viewer renders archived title and synthetic conversation',loaded);
await control('click','Back');await check('original Back leaves archived viewer',x=>!x.userMessage&&!x.assistantMessage);
await control('click','Forward');await check('original Forward returns to archived conversation',loaded);
await control('reload-demo');await wait(x=>x.buttons.some(e=>e.text==='Home'));
await control('open-demo-archived-viewer');await check('archived conversation reopens after reload',loaded);
fs.writeFileSync(path.join(__dirname,'state',profile,'archived-viewer-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,entry:'simulated-original-host-message',sidebarPreviewVerified:false,messageSent:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
