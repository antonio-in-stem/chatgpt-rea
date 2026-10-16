const {execFile}=require('node:child_process'),{promisify}=require('node:util'),fs=require('node:fs'),path=require('node:path');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const root=path.join(__dirname,'state',profile),file=path.join(root,'demo-automations.json');
if(fs.existsSync(path.join(root,'codex-home','auth.json')))throw Error('Credential-free demo required');
const items=()=>JSON.parse(fs.readFileSync(file,'utf8')).items;
const initial=items();
if(initial.length!==1||!/^rea-demo-task-\d+$/.test(initial[0].id)||!['REA cloud task demo','REA cloud task edited'].includes(initial[0].title)||!initial[0].is_enabled)throw Error('Exactly one active synthetic cloud task required');
const id=initial[0].id,originalSchedule=initial[0].schedule;
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
async function wait(fn,pred){const deadline=Date.now()+45000;do{try{const x=await fn();if(pred(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,500));}while(Date.now()<deadline);throw Error('Cloud task state timeout');}
const body=()=>control('inspect-content');
function pass(s){results.push(s);console.log('PASS '+s);}
async function open(){await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Scheduled'));await control('show-demo-window');await control('activate-navigation-button','Scheduled');await wait(body,x=>x.includes('New task')&&!x.includes('Loading scheduled tasks'));}
async function menu(label){await control('click','More task actions');await wait(()=>control('inspect'),x=>x.some(e=>e.role==='menuitem'&&e.text===label));await control('activate-popup-item',label);}
(async()=>{
 await open();await wait(body,x=>x.includes(initial[0].title));pass('cloud fixture appears in original scheduled sidebar');
 await menu('Edit');await wait(body,x=>x.includes('Edit task'));const editor=await body();const scheduleOptionsUnavailable=editor.includes("Couldn't load schedule options");
 await control('focus-dialog-field','Name');await control('replace-focused','REA cloud lifecycle verified');await control('click-dialog','Save');
 await wait(async()=>items(),x=>x.length===1&&x[0].id===id&&x[0].title==='REA cloud lifecycle verified'&&x[0].schedule===originalSchedule);
 await wait(body,x=>x.includes('REA cloud lifecycle verified')&&!x.includes('Edit task'));pass('original Edit saves cloud name without changing schedule');
 await menu('Pause');await wait(async()=>items(),x=>x[0].is_enabled===false);await wait(body,x=>x.includes('Paused·Daily'));pass('Pause updates cloud store and original row');
 await control('reload-demo');await open();await wait(body,x=>x.includes('REA cloud lifecycle verified')&&x.includes('Paused·Daily'));pass('edited name and paused status survive reload');
 await menu('Resume');await wait(async()=>items(),x=>x[0].is_enabled===true);await wait(body,x=>x.includes('REA cloud lifecycle verified')&&!x.includes('Paused·Daily'));pass('Resume restores active original row');
 await menu('Delete');await wait(body,x=>x.includes('Delete scheduled task'));await control('click-dialog','Delete scheduled task');
 await wait(async()=>items(),x=>x.length===0);await wait(body,x=>x.includes('No scheduled tasks'));pass('original delete confirmation removes only the synthetic cloud task');
 await control('reload-demo');await open();await wait(body,x=>x.includes('No scheduled tasks'));pass('cloud removal survives reload');
 const report={passed:true,results,rendererModified:false,schedulerRegistered:false,cloudCreationObserved:false,scheduleOptionsUnavailable,limitations:['Cloud task initially supplied through demo fixture, not original create flow','Schedule policy endpoint remains unsupported; editor displays schedule-options error','Run now, sharing and advanced states not covered']};
 fs.writeFileSync(path.join(root,'cloud-task-ui-check.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length,scheduleOptionsUnavailable}));
})().catch(e=>{console.error(e.stderr||e.message);process.exitCode=1});
