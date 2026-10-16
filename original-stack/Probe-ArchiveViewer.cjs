// Historical diagnostic: current shipped Explore explicitly excludes Archive. Do not use as an acceptance runner.
// Bounded original navigation probe; reports do not claim viewer completion.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:15000,maxBuffer:1048576});return JSON.parse(stdout);}
async function wait(predicate){const end=Date.now()+180000;do{try{const x=await control('inspect');if(predicate(x))return x;}catch{}await new Promise(r=>setTimeout(r,750));}while(Date.now()<end);throw Error('Original Archive navigation not ready');}
(async()=>{
 await wait(x=>x.some(e=>e.text==='Explore'));await control('click','Explore');await wait(x=>x.some(e=>e.text==='Archive'));await control('click','Archive');
 const x=await wait(x=>x.some(e=>e.label==='REA archived demo 2'));
 const fields=x.filter(e=>e.tag==='INPUT').map(e=>({label:e.label,placeholder:e.placeholder}));console.log(JSON.stringify({archiveSidebar:true,fields}));
 await control('click','REA archived demo 2');await new Promise(r=>setTimeout(r,1500));
 const surface=await control('inspect-flow-surface');fs.writeFileSync(path.join(__dirname,'state',profile,'archive-viewer-probe.json'),JSON.stringify({archiveSidebar:true,fields,surface,viewerVerified:false},null,2)+'\n');console.log(JSON.stringify(surface));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
