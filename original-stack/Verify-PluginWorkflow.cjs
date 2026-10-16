// Verify installed synthetic plugin state and original Try now composer navigation.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const items=()=>control('inspect'),row=()=>control('inspect-demo-plugin-settings');
async function wait(read,predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,400));}while(Date.now()<deadline);throw Error('Plugin state timed out');}
async function open(){const ready=await wait(items,x=>x.some(e=>e.label==='Appearance'||e.label==='Open profile menu'));if(!ready.some(e=>e.label==='Appearance')){await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Appearance'));}await control('activate-settings-section','Plugins');return wait(row,x=>x.ready);}
async function check(name,read,predicate){await wait(read,predicate);results.push(name);console.log('PASS '+name);}
(async()=>{
const initial=await open();if(!initial.enabled)throw Error('Scenario requires initially enabled inert Rea Demo plugin');
try{
await control('toggle-demo-plugin');await check('original switch disables demo plugin',row,x=>x.ready&&!x.enabled&&!x.disabled);
await control('reload-demo');await open();await check('disabled state persists reload',row,x=>x.ready&&!x.enabled);
await control('open-demo-plugin');await check('disabled detail offers Enable',items,x=>x.some(e=>e.text==='Enable'&&!e.disabled)&&!x.some(e=>e.text==='Try now'));
await open();await control('toggle-demo-plugin');await check('original switch re-enables demo plugin',row,x=>x.ready&&x.enabled&&!x.disabled);
await control('reload-demo');await open();await check('enabled state persists reload',row,x=>x.ready&&x.enabled);
await control('open-demo-plugin');await check('enabled detail offers Try now',items,x=>x.some(e=>e.text==='Try now'&&!e.disabled));await control('click','Try now');
await check('Try now prepares new composer with structured plugin mention',()=>control('inspect-demo-plugin-draft'),x=>x.ready&&x.landing&&x.pluginReferences.length===1&&x.pluginReferences[0].path==='plugin://rea-demo@rea-local');
}catch(e){await open();if(!(await row()).enabled)await control('toggle-demo-plugin');await wait(row,x=>x.enabled);throw e;}
fs.writeFileSync(path.join(__dirname,'state',profile,'plugin-workflow-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,pluginCodeExecuted:false,messageSent:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
