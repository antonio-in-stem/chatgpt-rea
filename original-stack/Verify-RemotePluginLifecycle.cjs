const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const state=path.join(__dirname,'state',profile),installed=()=>JSON.parse(fs.readFileSync(path.join(state,'demo-plugins.json'),'utf8'));
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const read=()=>control('inspect-demo-remote-plugin');
async function wait(predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(x.failure)throw Error('Original plugin detail load failed');if(x.ready!==false&&predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,500));}while(Date.now()<deadline);throw Error('Remote plugin lifecycle timed out');}
async function check(name,predicate){await wait(predicate);results.push(name);console.log('PASS '+name);}
const action=(x,name)=>x.buttons?.some(e=>e.text===name&&!e.disabled);
async function reopen(){await control('reload-demo');await wait(x=>action(x,'Plugins'));await control('activate-navigation-button','Plugins');await wait(x=>x.search);await control('activate-tab','Personal');await wait(x=>x.cards.length===1);await control('open-demo-remote-plugin');}
(async()=>{
const baseline=installed();if(baseline.remoteInstalled)throw Error('Scenario requires remote demo initially uninstalled');
const start=await wait(x=>x.search||action(x,'Plugins'));if(!start.search)await control('activate-navigation-button','Plugins');
await wait(x=>x.search);await control('activate-tab','Personal');await wait(x=>x.cards.length===1);await control('open-demo-remote-plugin');await wait(x=>action(x,'Install plugin'));
await control('click','Install plugin');await check('original install completes and offers Try now',x=>x.description&&action(x,'Try now')&&!action(x,'Install plugin'));
if(!installed().remoteInstalled||installed().installed!==baseline.installed)throw Error('Remote install failed persistence or changed local plugin');results.push('installation persists without changing local plugin');
await reopen();await check('installed remote detail reopens after reload',x=>x.description&&action(x,'Try now'));
await control('plugin-details-menu');await control('activate-popup-item','Uninstall');
await check('original uninstall restores Install plugin',x=>x.description&&action(x,'Install plugin')&&!action(x,'Try now'));
if(installed().remoteInstalled||installed().installed!==baseline.installed)throw Error('Remote uninstall failed persistence or changed local plugin');results.push('uninstallation persists without changing local plugin');
await reopen();await check('uninstalled remote detail reopens after reload',x=>x.description&&action(x,'Install plugin'));
fs.writeFileSync(path.join(state,'remote-plugin-lifecycle-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,pluginCodeExecuted:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
