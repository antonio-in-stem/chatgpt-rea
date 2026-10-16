const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const state=path.join(__dirname,'state',profile);
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
async function wait(read,test){const until=Date.now()+60000;do{const x=await read();if(test(x))return x;await new Promise(r=>setTimeout(r,400));}while(Date.now()<until);throw Error('Appearance state timed out');}
const items=()=>control('inspect'),theme=()=>control('inspect-theme');
async function open(){let controls=await items();if(!controls.some(x=>x.label==='Appearance')){await wait(items,x=>x.some(e=>e.label==='Open profile menu'));await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Appearance'));}await control('activate-settings-section','Appearance');return wait(theme,x=>x.choices.length===3);}
async function check(name,label,effective){const x=await wait(theme,x=>x.choices.some(c=>c.label===label&&c.checked)&&(!effective||x.theme===effective));results.push(name);console.log('PASS '+name);return x;}
async function capture(name){const x=await control('capture-demo-window');if(x.captureMode!=='view')throw Error('View capture required');fs.copyFileSync(x.file,path.join(state,name+'.png'));}
(async()=>{await open();const before=await theme(),initial=before.choices.find(c=>c.checked)?.label;if(!initial)throw Error('Missing initial preference');
 try{
  await control('choose-theme','Light');await check('Light updates effective theme','Light','light');await capture('appearance-light');
  await control('choose-theme','Dark');await check('Dark updates effective theme','Dark','dark');await capture('appearance-dark');
  await control('choose-theme','Light');await check('Light selected before reload','Light','light');
  await control('reload-demo');await open();await check('Light persists after reload','Light','light');
 }finally{await open();await control('choose-theme',initial);await check('initial preference restored',initial,before.theme);}
 await control('reload-demo');await open();await check('restored preference persists',initial,before.theme);
 fs.writeFileSync(path.join(state,'appearance-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,initialPreference:initial},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
