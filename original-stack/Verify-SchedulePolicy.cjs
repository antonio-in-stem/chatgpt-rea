const fs=require('node:fs'),path=require('node:path'),{execFile}=require('node:child_process'),{promisify}=require('node:util');
const profile=process.argv[2],exec=promisify(execFile),results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const root=path.join(__dirname,'state',profile),file=path.join(root,'demo-automations.json');
if(fs.existsSync(path.join(root,'codex-home','auth.json')))throw Error('Credential-free profile required');
const item=()=>{const s=JSON.parse(fs.readFileSync(file,'utf8'));if(s.items.length!==1||s.items[0].title!=='REA cloud task demo'||!s.items[0].id.startsWith('rea-demo-task-'))throw Error('One exact synthetic task required');return s.items[0];};
async function c(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
async function wait(fn,p){const end=Date.now()+45000;do{try{const v=await fn();if(p(v))return v;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,500));}while(Date.now()<end);throw Error('Schedule UI timeout');}
const body=()=>c('inspect-content'),controls=()=>c('inspect');
const pass=s=>{results.push(s);console.log('PASS '+s);};
async function open(){await wait(controls,x=>x.some(e=>e.text==='Scheduled'));await c('show-demo-window');await c('activate-navigation-button','Scheduled');await wait(body,x=>x.includes('REA cloud task demo'));await c('click','More task actions');await wait(controls,x=>x.some(e=>e.role==='menuitem'&&e.text==='Edit'));await c('activate-popup-item','Edit');await wait(body,x=>x.includes('Edit task')&&x.includes('End repeat'));}
(async()=>{
 const id=item().id;if(!item().schedule.includes('FREQ=MINUTELY;INTERVAL=15'))throw Error('Prepared15-minute original UI state required');
 await open();let b=await body();if(b.includes("Couldn't load schedule options"))throw Error('Policy still fails');await wait(controls,x=>x.some(e=>e.label==='Interval duration'&&e.text==='15')&&x.some(e=>e.label==='Interval unit'&&e.text==='minutes'));pass('15-minute selection survives reload in original editor without policy error');
 await c('click-dialog','Interval duration');const opts=await wait(controls,x=>x.some(e=>e.role?.startsWith('menuitem')&&e.text==='30'));const values=opts.filter(e=>e.role?.startsWith('menuitem')&&/^\d+$/.test(e.text)).map(e=>Number(e.text));if(![15,30,45].every(x=>values.includes(x))||values.some(x=>x<15))throw Error('Unexpected minute-policy choices');pass('original minute menu enforces15-minute minimum');
 await c('click','30');await c('click-dialog','Save');await wait(async()=>item(),x=>x.id===id&&x.schedule.includes('FREQ=MINUTELY;INTERVAL=30'));pass('original minute selection saves30-minute RRULE');
 await c('reload-demo');await open();await wait(controls,x=>x.some(e=>e.label==='Interval duration'&&e.text==='30'));pass('30-minute choice persists reload');
 await c('capture-demo-window');await c('click-dialog','Interval');await c('click','Daily');await c('click-dialog','Save');await wait(async()=>item(),x=>x.schedule.includes('FREQ=DAILY'));pass('original selector returns task to daily schedule');
 fs.writeFileSync(path.join(root,'schedule-policy-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,policy:{minute_schedule_available:true,max_iterations_per_hour:4},realScheduling:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.stderr||e.message);process.exitCode=1});
