const fs=require('node:fs'),path=require('node:path'),{execFile}=require('node:child_process'),{promisify}=require('node:util');
const profile=process.argv[2],exec=promisify(execFile),results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const root=path.join(__dirname,'state',profile),file=path.join(root,'demo-automations.json');
if(fs.existsSync(path.join(root,'codex-home','auth.json')))throw Error('Credential-free profile required');
const items=()=>JSON.parse(fs.readFileSync(file,'utf8')).items;
const fixture=items();if(fixture.length!==1||fixture[0].title!=='REA completed task demo'||fixture[0].next_run_times.length||!fixture[0].is_enabled)throw Error('Exact completed synthetic task required');
async function c(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
async function wait(fn,p){const end=Date.now()+45000;do{const v=await fn();if(p(v))return v;await new Promise(r=>setTimeout(r,500));}while(Date.now()<end);throw Error('Completed filter timeout');}
const controls=()=>c('inspect'),body=()=>c('inspect-content'),pass=s=>{results.push(s);console.log('PASS '+s);};
async function filter(selected){let x=await controls();if(!x.some(e=>e.role==='menuitemcheckbox'&&e.text==='Active'))await c('click','Filter tasks');for(const label of ['Active','Paused','Completed']){x=await controls();const row=x.find(e=>e.role==='menuitemcheckbox'&&e.text===label);if(!row)throw Error('Original checkbox filter missing');if((row.checked==='true')!==selected.includes(label))await c('click',label);}await c('click','Filter tasks');}
(async()=>{
 await c('show-demo-window');await filter(['Active']);await wait(body,x=>!x.includes('REA completed task demo'));pass('Active filter excludes exhausted cloud task even when is_enabled is true');
 await filter(['Completed']);await wait(body,x=>x.includes('REA completed task demo')&&x.includes('Completed·'));pass('Completed filter shows original completed row');await c('capture-demo-window');
 await filter(['Paused']);await wait(body,x=>!x.includes('REA completed task demo'));pass('Paused filter excludes completed task');
 await filter(['Active','Paused','Completed']);await wait(body,x=>x.includes('REA completed task demo'));await c('click','More task actions');await wait(controls,x=>x.some(e=>e.role==='menuitem'&&e.text==='Delete'));await c('activate-popup-item','Delete');await wait(body,x=>x.includes('Delete scheduled task'));await c('click-dialog','Delete scheduled task');await wait(async()=>items(),x=>x.length===0);pass('completed task deletes through original confirmation; all filters restored');
 fs.writeFileSync(path.join(root,'completed-task-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,realScheduling:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.stderr||e.message);process.exitCode=1});
