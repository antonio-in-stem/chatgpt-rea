// Original UI acceptance; only the isolated demo's cloud preferences are changed.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(operation,...args){try{const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,operation,...args],{windowsHide:true,timeout:15000,maxBuffer:1024*1024});return JSON.parse(stdout);}catch{throw Error('Control failed: '+operation);}}
const read=()=>control('inspect-cloud-preferences'),items=()=>control('inspect');
async function wait(read,predicate){const end=Date.now()+25000;do{try{const data=await read();if(predicate(data))return data;}catch{}await new Promise(r=>setTimeout(r,300));}while(Date.now()<end);throw Error('Expected UI state did not arrive');}
async function check(name,predicate){await wait(read,predicate);results.push(name);console.log('PASS '+name);}
async function open(){if((await read()).ready)return;let list=await items();if(!list.some(x=>x.label==='Cloud preferences')){await wait(items,x=>x.some(e=>e.label==='Open profile menu'));await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role?.startsWith('menuitem')&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Cloud preferences'));}await control('activate-settings-section','Cloud preferences');await wait(read,x=>x.ready);}
const selected=(x,value)=>x.diffChoices.some(e=>e.text===value&&e.pressed==='true');
(async()=>{
 await open();const before=await read();const oldMode=selected(before,'Split')?'Split':'Unified',mode=oldMode==='Split'?'Unified':'Split';const pattern=before.branchFormat==='rea/{task}'?'check/{task}':'rea/{task}';
 await control('fill','Branch format pattern','no-placeholder');await check('invalid pattern blocked',x=>x.validationError&&x.saveDisabled);
 await control('fill','Branch format pattern',pattern);await check('valid draft enabled',x=>!x.validationError&&!x.saveDisabled&&x.branchFormat===pattern);
 await control('click','Save');await check('saved pattern settled',x=>x.branchFormat===pattern&&x.saveDisabled);
 await control('click',mode);await check('diff mode changed',x=>selected(x,mode));
 await control('reload-demo');await wait(items,x=>x.some(e=>e.label==='Open profile menu'));await open();
 await check('pattern persisted after reload',x=>x.branchFormat===pattern&&x.saveDisabled);await check('diff mode persisted after reload',x=>selected(x,mode));
 await control('fill','Branch format pattern',before.branchFormat);await wait(read,x=>!x.saveDisabled);await control('click','Save');await check('original pattern restored',x=>x.branchFormat===before.branchFormat&&x.saveDisabled);
 await control('click',oldMode);await check('original diff mode restored',x=>selected(x,oldMode));
 const report={checkedAt:new Date().toISOString(),passed:true,results,rendererModified:false};fs.writeFileSync(path.join(__dirname,'state',profile,'cloud-preferences-ui-check.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(error=>{const report={checkedAt:new Date().toISOString(),passed:false,results,error:error.message};fs.writeFileSync(path.join(__dirname,'state',profile,'cloud-preferences-ui-check.json'),JSON.stringify(report,null,2)+'\n');console.error(error.message);process.exitCode=1;});
