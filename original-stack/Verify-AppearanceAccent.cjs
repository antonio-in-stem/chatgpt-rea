// Verify the original account-accent menu, persistence and restoration.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const items=()=>control('inspect'),values=()=>control('inspect-appearance-values');
async function wait(read,predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,400));}while(Date.now()<deadline);throw Error('Accent state timed out');}
async function open(){const ready=await wait(items,x=>x.some(e=>e.label==='Appearance'||e.label==='Open profile menu'));if(!ready.some(e=>e.label==='Appearance')){await wait(items,x=>x.some(e=>e.label==='Open profile menu'));await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Appearance'));}await control('activate-settings-section','Appearance');return wait(values,x=>x.pickers.some(p=>p.label.endsWith('accent color')));}
async function select(label,value){await control('click',label);await wait(items,x=>x.some(e=>e.role==='menuitemradio'&&e.text===value));await control('click',value);}
async function check(name,label,value){await wait(values,x=>x.pickers.some(p=>p.label===label&&p.text===value)&&!x.alerts.some(a=>/could not update|failed/i.test(a)));results.push(name);console.log('PASS '+name);}
(async()=>{const initial=await open(),picker=initial.pickers.find(p=>p.label.endsWith('accent color'));if(!['Default','Blue','Green','Yellow','Pink','Orange','Purple','White','Black'].includes(picker.text))throw Error('Preset initial accent required');const target=picker.text==='Blue'?'Green':'Blue';
 try{await select(picker.label,target);await check('preset accent saved',picker.label,target);await control('reload-demo');await open();await check('preset accent persists after reload',picker.label,target);}
 finally{await open();await select(picker.label,picker.text);await check('initial accent restored',picker.label,picker.text);}
 await control('reload-demo');await open();await check('initial accent persists after restoration',picker.label,picker.text);
 fs.writeFileSync(path.join(__dirname,'state',profile,'appearance-accent-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,initialAccent:picker.text},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
