// Verify the original exported theme string through its real import form.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const items=()=>control('inspect'),values=()=>control('inspect-appearance-values');
async function wait(read,predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,400));}while(Date.now()<deadline);throw Error('Theme import state timed out');}
async function open(){const ready=await wait(items,x=>x.some(e=>e.label==='Appearance'||e.label==='Open profile menu'));if(!ready.some(e=>e.label==='Appearance')){await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Appearance'));}await control('activate-settings-section','Appearance');return wait(values,x=>x.pickers.length>0);}
let label,trigger;
async function form(){if(!(await items()).some(e=>e.label===label))await control('click',trigger);return wait(items,x=>x.some(e=>e.label===label));}
async function importString(s){await form();await control('fill',label,s);await wait(items,x=>x.some(e=>e.text==='Import theme'&&e.type==='submit'&&!e.disabled));await control('click','Import theme');await wait(items,x=>!x.some(e=>e.label===label));}
const field=(x,label)=>x.fields.find(f=>f.label===label)?.value;
async function check(name,read,predicate){await wait(read,predicate);results.push(name);console.log('PASS '+name);}
(async()=>{
const existing=await items();if(existing.some(e=>/theme share string$/.test(e.label||'')))await control('click','Cancel');
const initial=await open(),bg=initial.fields.find(f=>f.label.endsWith('background color')),ink=initial.fields.find(f=>f.label.endsWith('ink color'));if(!bg||!ink)throw Error('Theme color fields missing');const variant=bg.label.split(' ')[0];label=variant+' theme share string';trigger='Import '+variant+' theme';
const original=(await form()).find(e=>e.label===label).placeholder,prefix='codex-theme-v1:';if(!original.startsWith(prefix))throw Error('Original theme export missing');const changed=JSON.parse(original.slice(prefix.length));changed.theme.surface='#20242a';changed.theme.ink='#e6eaf0';
try{
await check('empty import is disabled',items,x=>x.some(e=>e.type==='submit'&&e.text==='Import theme'&&e.disabled));
await control('fill',label,'invalid-demo-theme');await check('invalid import is disabled',items,x=>x.some(e=>e.type==='submit'&&e.text==='Import theme'&&e.disabled));
await importString(prefix+JSON.stringify(changed));await check('imported theme applies surface and ink',values,x=>field(x,bg.label)==='#20242A'&&field(x,ink.label)==='#E6EAF0');
await control('reload-demo');await open();await check('imported theme persists after reload',values,x=>field(x,bg.label)==='#20242A'&&field(x,ink.label)==='#E6EAF0');
}finally{await importString(original);await check('original theme colors restored',values,x=>field(x,bg.label)===bg.value&&field(x,ink.label)===ink.value);}
await control('reload-demo');await open();const restored=(await form()).find(e=>e.label===label).placeholder;await control('click','Cancel');if(restored!==original)throw Error('Restored export differs from initial export');results.push('entire exported theme restored after reload');console.log('PASS entire exported theme restored after reload');
fs.writeFileSync(path.join(__dirname,'state',profile,'appearance-theme-import-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
