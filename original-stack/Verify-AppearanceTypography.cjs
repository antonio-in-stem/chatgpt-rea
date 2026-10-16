// Exercise shipped advanced typography inputs without replacing renderer behavior.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const items=()=>control('inspect'),values=()=>control('inspect-appearance-values');
async function wait(read,predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,400));}while(Date.now()<deadline);throw Error('Advanced typography state timed out');}
async function open(){const ready=await wait(items,x=>x.some(e=>e.label==='Appearance'||e.label==='Open profile menu'));if(!ready.some(e=>e.label==='Appearance')){await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Appearance'));}await control('activate-settings-section','Appearance');await wait(values,x=>x.pickers.length>0);if(!(await values()).fields.some(f=>f.label==='Sans font size'))await control('click','Advanced');return wait(values,x=>x.fields.some(f=>f.label==='Sans font size'));}
const field=(x,label)=>x.fields.find(f=>f.label===label)?.value;
async function check(name,predicate){await wait(values,x=>predicate(x)&&!x.alerts.some(a=>/failed|could not/i.test(a)));results.push(name);console.log('PASS '+name);}
async function edit(label,value){await control('focus-appearance-field',label);await control('fill',label,value);await control('appearance-size-key','Enter');}
(async()=>{const initial=await open(),fields=['Sans font size','Content font size','Code font size'].map(label=>initial.fields.find(f=>f.label===label));if(fields.some(f=>!f||!f.min||!f.max))throw Error('Original input bounds required');const targets=fields.map(f=>String(Number(f.value)<Number(f.max)?Number(f.value)+1:Number(f.value)-1));
try{
for(let i=0;i<fields.length;i++){const f=fields[i];await edit(f.label,String(Number(f.max)+100));await check(f.label+' rejects out-of-range value on Enter',x=>field(x,f.label)===f.value);await edit(f.label,targets[i]);await check(f.label+' accepts valid value',x=>field(x,f.label)===targets[i]);}
await control('reload-demo');await open();await check('three font sizes persist after reload',x=>fields.every((f,i)=>field(x,f.label)===targets[i]));
}finally{await open();for(const f of fields)await edit(f.label,f.value);await check('original font sizes restored',x=>fields.every(f=>field(x,f.label)===f.value));}
await control('reload-demo');await open();await check('restored font sizes persist',x=>fields.every(f=>field(x,f.label)===f.value));
fs.writeFileSync(path.join(__dirname,'state',profile,'appearance-typography-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
