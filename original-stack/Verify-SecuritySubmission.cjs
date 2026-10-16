const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:15000,maxBuffer:1048576});return JSON.parse(stdout);}
const read=()=>control('inspect-security-flow');
async function wait(fn,predicate,ms=45000){const until=Date.now()+ms;do{try{const x=await fn();if(predicate(x))return x;}catch{}await new Promise(r=>setTimeout(r,750));}while(Date.now()<until);throw Error('Expected Security UI state did not arrive');}
async function check(name,predicate){await wait(read,x=>x.ready&&!x.errors.length&&predicate(x));results.push(name);console.log('PASS '+name);}
async function open(){await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Explore'),180000);await control('click','Explore');await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Security'));await control('click','Security');await wait(read,x=>x.ready&&x.controls.some(c=>c.text==='Scans'));await control('click','Scans');await check('scan list',x=>x.scan);}

(async()=>{await open();await control('click','Repositories');await check('repository listed',x=>x.repository);let row=(await read()).controls.find(c=>(c.label||c.text).includes('REA synthetic repository'));if(!row)throw Error('Synthetic repository control missing');await control('click',row.label||row.text);await wait(read,x=>x.controls.some(c=>c.label==='Close repository detail'));await control('start-demo-repository-scan');await check('target setup enabled',x=>x.headings.includes('New scan')&&x.controls.some(c=>c.text==='Start scan'&&!c.disabled));
 const statePath=path.join(__dirname,'state',profile,'demo-security.json'),before=fs.existsSync(statePath)?JSON.parse(fs.readFileSync(statePath,'utf8')).runs||{}:{};
 await control('click','Start scan');
 const created=await wait(async()=>JSON.parse(fs.readFileSync(statePath,'utf8')),x=>Object.entries(x.runs||{}).some(([id,r])=>!before[id]&&r.continuationThreadId&&r.progress.status==='complete'),60000);
 const entry=Object.entries(created.runs).find(([id,r])=>!before[id]&&r.continuationThreadId);if(!entry)throw Error('New attached demo report missing');results.push('new demo report linked to conversation');
 await wait(read,x=>!x.headings.includes('New scan')&&!x.errors.length);results.push('setup exited after submission');
 await control('click','Scans');await wait(read,x=>x.controls.some(c=>c.label===entry[1].name||c.text===entry[1].name));results.push('created report listed');
 await control('reload-demo');await open();await wait(read,x=>x.controls.some(c=>c.label===entry[1].name||c.text===entry[1].name));results.push('created report persists after reload');
 await control('click',entry[1].name);await wait(read,x=>x.headings.includes(entry[1].name)&&!x.errors.length);results.push('created report detail');await control('click','View activity');await wait(()=>control('inspect-content'),text=>text.includes(entry[0])&&text.includes('Demo message received.')&&text.includes('no model or tools were invoked'));results.push('linked original conversation and demo response visible');
 fs.writeFileSync(path.join(__dirname,'state',profile,'security-submission-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,simulated:true},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{fs.writeFileSync(path.join(__dirname,'state',profile,'security-submission-ui-check.json'),JSON.stringify({passed:false,results,error:e.message},null,2)+'\n');console.error(e.message);process.exitCode=1;});
