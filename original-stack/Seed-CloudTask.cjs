// Supply one inert cloud task to an explicitly selected credential-free demo.
const fs=require('node:fs'),path=require('node:path');
const {demoAutomationHttp}=require('./demo_automation_http.cjs');
function seed(profile){
 if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
 const root=path.join(__dirname,'state',profile);
 if(!fs.existsSync(path.join(root,'demo-session.json'))||fs.existsSync(path.join(root,'codex-home','auth.json')))throw Error('Existing credential-free demo required');
 const file=path.join(root,'demo-automations.json');
 if(fs.existsSync(file)&&(fs.lstatSync(file).isSymbolicLink()||JSON.parse(fs.readFileSync(file,'utf8')).items.length))throw Error('Empty demo cloud task store required');
 return demoAutomationHttp('POST',new URL('https://chatgpt.com/automations/save'),JSON.stringify({title:'REA cloud task demo',prompt:'Display this inert demo task only.',schedule:'RRULE:FREQ=DAILY;BYHOUR=9;BYMINUTE=30',default_timezone:'America/Mexico_City',is_enabled:true,timing_mode:0,thread_mode:'new_chat'}),path.join(root,'demo-sidebar-settings.json'),fs,path);
}
module.exports={seed};
if(require.main===module){const item=seed(process.argv[2]);console.log(JSON.stringify({id:item.id,title:item.title,schedulerRegistered:false}));}
