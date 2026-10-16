const fs=require('node:fs'),path=require('node:path'),{execFile}=require('node:child_process'),{promisify}=require('node:util');
const profile=process.argv[2],exec=promisify(execFile),results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const root=path.join(__dirname,'state',profile),file=path.join(root,'demo-automations.json'),local=path.join(root,'demo-local-automations.json'),prompt='REA cloud create verified: display this instruction only.';
if(fs.existsSync(path.join(root,'codex-home','auth.json')))throw Error('Credential-free profile required');
const localBefore=fs.existsSync(local)?fs.readFileSync(local,'utf8'):null;
const items=()=>fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')).items:[];
if(items().length)throw Error('Empty cloud task store required');
async function c(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
async function wait(fn,p){const end=Date.now()+60000;do{try{const x=await fn();if(p(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,500));}while(Date.now()<end);throw Error('Cloud create UI timeout');}
const controls=()=>c('inspect'),body=()=>c('inspect-content'),pass=s=>{results.push(s);console.log('PASS '+s);};
async function open(){await wait(controls,x=>x.some(e=>e.text==='Scheduled'));await c('show-demo-window');await c('activate-navigation-button','Scheduled');await wait(body,x=>x.includes('New task')&&!x.includes('Loading scheduled tasks'));}
(async()=>{
 await open();await c('click','New task');await wait(controls,x=>x.some(e=>e.text==='Close dialog'));await c('click-dialog','Advanced');await wait(controls,x=>x.some(e=>e.role==='switch'&&e.label==='Run on this computer'&&e.checked==='true'));pass('original create form defaults to local execution');
 await c('click-dialog','Run on this computer');await wait(controls,x=>x.some(e=>e.role==='switch'&&e.label==='Run on this computer'&&e.checked==='false'));await wait(controls,x=>x.some(e=>e.label==='Model'&&!e.disabled));if((await body()).includes('Couldn’t load models'))throw Error('Cloud catalog failed');pass('original local switch selects cloud and loads model catalog');
 await c('reveal-task-control','Model');await c('click-dialog','Model');await wait(body,x=>x.includes('Demo alternate'));await c('activate','Demo alternate');await c('reveal-task-control','Reasoning');await c('click-dialog','Reasoning');await wait(controls,x=>x.some(e=>e.text==='High'));await c('activate','High');await c('focus-dialog-field','Instructions…');await c('insert-focused',prompt);await c('click-dialog','Create');
 const created=await wait(async()=>items(),x=>x.length===1&&x[0].prompt===prompt&&x[0].model==='rea-demo-alternate'&&x[0].reasoning_effort==='high');const id=created[0].id;pass('original Create persists selected cloud model and effort');
 await wait(body,x=>x.includes(prompt)&&!x.includes('Close dialog'));pass('created task appears in original task UI');
 await c('reload-demo');await open();await wait(body,x=>x.includes(prompt));await c('click','More task actions');await wait(controls,x=>x.some(e=>e.role==='menuitem'&&e.text==='Edit'));await c('activate-popup-item','Edit');await wait(body,x=>x.includes('Edit task'));await c('click-dialog','Advanced');await wait(body,x=>x.includes('Demo alternate')&&x.includes('High'));if(items()[0].id!==id)throw Error('Task identity changed');pass('created task and model/effort survive reload and Edit');
 await c('click','Close dialog');await c('click','More task actions');await wait(controls,x=>x.some(e=>e.role==='menuitem'&&e.text==='Delete'));await c('activate-popup-item','Delete');await wait(body,x=>x.includes('Delete scheduled task'));await c('click-dialog','Delete scheduled task');await wait(async()=>items(),x=>x.length===0);pass('original deletion removes newly created cloud task');
 const localAfter=fs.existsSync(local)?fs.readFileSync(local,'utf8'):null;if(localAfter!==localBefore)throw Error('Cloud create altered local task store');pass('cloud flow leaves local tasks untouched');
 fs.writeFileSync(path.join(root,'cloud-create-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,realScheduling:false,fixtureSeeded:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.stderr||e.message);process.exitCode=1});
