const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:15000,maxBuffer:1048576});return JSON.parse(stdout);}
const read=()=>control('inspect-security-flow');
async function wait(fn,predicate,ms=45000){const until=Date.now()+ms;do{try{const x=await fn();if(predicate(x))return x;}catch{}await new Promise(r=>setTimeout(r,750));}while(Date.now()<until);throw Error('Expected Security UI state did not arrive');}
async function check(name,predicate){await wait(read,x=>x.ready&&!x.errors.length&&predicate(x));results.push(name);console.log('PASS '+name);}
async function open(){await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Explore'),180000);await control('click','Explore');await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Security'));await control('click','Security');await wait(read,x=>x.ready&&x.controls.some(c=>c.text==='Scans'));await control('click','Scans');await check('scan list',x=>x.scan||x.renamed);}
async function rename(oldName,newName,key='Enter'){await control('rename-security-scan',oldName);await wait(read,x=>x.controls.some(c=>c.label==='Scan name'));await control('fill','Scan name',newName);await control('security-name-key',key);}
const has=(x,text)=>x.controls.some(c=>c.text===text&&!c.disabled);
(async()=>{
 await open();
 await rename('Synthetic UI report','REA canceled report','Escape');await check('rename cancel preserves original',x=>x.scan&&!x.renamed);
 await rename('Synthetic UI report','REA renamed report');await check('rename saved',x=>x.renamed);
 await control('reload-demo');await open();await check('rename persisted',x=>x.renamed);
 await rename('REA renamed report','Synthetic UI report');await check('name restored',x=>x.scan&&!x.renamed);
 await control('click','Findings');await check('finding ready',x=>x.finding);
 let row=(await read()).controls.find(c=>c.text.startsWith('Synthetic finding for frontend inspection'));await control('click',row.text);await check('detail ready',x=>x.detail&&has(x,'Close finding'));
 await control('click','Close finding');await wait(read,x=>x.dialogOpen);await control('click-dialog','Cancel');await check('close canceled',x=>!x.dialogOpen&&has(x,'Close finding'));
 await control('click','Close finding');await wait(read,x=>x.dialogOpen);await control('click-dialog',"Won't fix");await check('context required',x=>x.dialogOpen&&x.controls.some(c=>c.text==='Close finding'&&c.disabled));
 await control('fill','Explain why this finding will not be fixed','Synthetic demonstration only.');await control('click-dialog','Close finding');await check('finding closed',x=>!x.dialogOpen&&has(x,'Reopen finding'));
 await control('click','Reopen finding');await check('finding reopened',x=>has(x,'Close finding'));
 await control('reload-demo');await open();await control('click','Findings');await check('reopened finding persisted',x=>x.finding);
 fs.writeFileSync(path.join(__dirname,'state',profile,'security-mutations-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{fs.writeFileSync(path.join(__dirname,'state',profile,'security-mutations-ui-check.json'),JSON.stringify({passed:false,results,error:e.message},null,2)+'\n');console.error(e.message);process.exitCode=1;});
