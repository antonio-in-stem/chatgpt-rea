// Read-only route-opening smoke audit against a running isolated demo.
// Does not prove preference writes or complete flow coverage.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const run=promisify(execFile),profile=process.argv[2];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const sections=['General','Notifications','Profile','Appearance','Account','Archived chats','Parental controls','Voice','Storage','Configuration','Personalization','Mini & Pets','Keyboard shortcuts','Usage & billing','Data controls','Plugins','Computer use','Browser','Cloud computer','Hooks','Cloud preferences','Code Review','Git','Environments','Worktrees'];
const results=[];
async function control(operation,...args){const {stdout}=await run(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,operation,...args],{windowsHide:true,timeout:15000,maxBuffer:1024*1024});return JSON.parse(stdout);}
(async()=>{for(const section of sections){
 try{await control('activate-settings-section',section);await new Promise(r=>setTimeout(r,800));let sample=await control('inspect-flow-surface');if(!sample.headings.length){await new Promise(r=>setTimeout(r,1500));sample=await control('inspect-flow-surface');}results.push({section,...sample,scope:'route-opening-only'});console.log(JSON.stringify({section,...sample}));}
 catch{results.push({section,error:'UI operation or observation failed',scope:'route-opening-only'});console.log(JSON.stringify({section,error:'UI operation or observation failed'}));}
}fs.writeFileSync(path.join(__dirname,'state',profile,'settings-routes-audit.json'),JSON.stringify({checkedAt:new Date().toISOString(),scope:'Read-only opening smoke; not full flows',results},null,2)+'\n');
if(results.some(r=>r.error||r.alerts?.length||r.failures?.length||!r.headings?.length))process.exitCode=1;
})().catch(()=>{console.error('Settings route audit failed');process.exitCode=1;});
