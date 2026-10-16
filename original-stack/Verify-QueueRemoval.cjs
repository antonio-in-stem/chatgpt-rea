const {execFile}=require('node:child_process'),{promisify}=require('node:util'),fs=require('node:fs'),path=require('node:path');
const exec=promisify(execFile),profile=process.argv[2],title='REA queue deletion demo',pendingText='REA pending delete only',results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const file=path.join(__dirname,'state',profile,'demo-threads.json');
function record(){const state=JSON.parse(fs.readFileSync(file)),entries=Object.entries(state.threads).filter(([,v])=>v.thread.name===title);if(entries.length!==1)throw Error('One exact synthetic queue conversation required');const [id,v]=entries[0];return {id,turns:v.thread.turns,queue:state.demoQueues?.[id]||[]};}
const sentPending=r=>r.turns.some(t=>t.items.some(i=>i.type==='userMessage'&&i.content?.some(e=>e.text?.trim()===pendingText)));
async function c(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000});return JSON.parse(stdout);}
async function wait(op,p){const end=Date.now()+25000;do{try{const x=await c(op);if(p(x))return x;}catch(e){if(!String(e.stderr).includes('Original renderer missing'))throw e}await new Promise(r=>setTimeout(r,200));}while(Date.now()<end);throw Error('Queue state timed out: '+op);}
const pass=n=>{results.push(n);console.log('PASS '+n)};
(async()=>{
await c('show-demo-window');const before=record();if(before.queue.length!==1||before.queue[0].input?.length!==1||before.queue[0].input[0].text.trim()!==pendingText||sentPending(before))throw Error('Exact unsent demo queue entry required');
await wait('inspect',x=>x.some(e=>e.label==='Delete queued message')&&x.some(e=>e.label==='Queued message actions'));pass('Original queued message exposes removal and actions');
await c('capture-demo-window');await c('click','Delete queued message');await wait('inspect',x=>!x.some(e=>e.label==='Delete queued message'));if(record().queue.length)throw Error('Queue removal not durable');pass('Original Delete removes pending entry from UI and durable queue');
if(record().turns.length!==before.turns.length||sentPending(record()))throw Error('Delete unexpectedly submitted content');pass('Delete does not submit the pending message');
await c('reload-demo');await wait('inspect',x=>x.some(e=>e.label===title));await c('show-demo-window');await c('activate-row',title);await wait('inspect',x=>x.some(e=>e.label==='Chat actions')&&!x.some(e=>e.label==='Delete queued message'));
const after=record();if(after.queue.length||after.turns.length!==before.turns.length||sentPending(after))throw Error('Reload changed deleted queue state');pass('Reload and reopen retain empty queue with no sent pending turn');
fs.writeFileSync(path.join(__dirname,'state',profile,'queue-removal-ui-check.json'),JSON.stringify({passed:true,results,turnCountBefore:before.turns.length,turnCountAfter:after.turns.length,queueCountAfter:after.queue.length,rendererModified:false,queuedMessageSubmitted:false,automaticAdvanceVerified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
