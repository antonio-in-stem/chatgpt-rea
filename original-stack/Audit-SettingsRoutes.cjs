// Read-only route-opening smoke audit against a running isolated demo.
// Does not prove preference writes or complete flow coverage.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const run=promisify(execFile),profile=process.argv[2];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const sections=['General','Notifications','Profile','Appearance','Account','Archived chats','Parental controls','Voice','Storage','Configuration','Personalization','Mini & Pets','Keyboard shortcuts','Usage & billing','Data controls','Plugins','Computer use','Browser','Cloud computer','Hooks','Cloud preferences','Code Review','Git','Environments','Worktrees'];
const results=[];
async function control(operation,...args){const {stdout}=await run(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,operation,...args],{windowsHide:true,timeout:15000,maxBuffer:1024*1024});return JSON.parse(stdout);}
function classify(section,sample){
 if(sample.alerts?.length||sample.failures?.length)return 'error';
 if(sample.loadingText)return 'loading';
 if(!sample.headings?.length)return 'unconfirmed';
 if(section!=='Profile'&&!sample.headings.includes(section))return 'unconfirmed';
 return 'opened';
}
(async()=>{for(const section of sections){
 try{
  await control('activate-settings-section',section);
  const deadline=Date.now()+10000;let sample,state;
  do{await new Promise(r=>setTimeout(r,500));sample=await control('inspect-flow-surface');state=classify(section,sample);if(state==='opened'||state==='error')break;}while(Date.now()<deadline);
  results.push({section,state,...sample,scope:'route-opening-only'});console.log(JSON.stringify({section,state,controls:sample.controlCount,loading:sample.loadingText,alerts:sample.alerts?.length}));
 }catch{results.push({section,state:'automation-error',scope:'route-opening-only'});console.log(JSON.stringify({section,state:'automation-error'}));}
}
const counts=results.reduce((a,r)=>(a[r.state]=(a[r.state]||0)+1,a),{});
fs.writeFileSync(path.join(__dirname,'state',profile,'settings-routes-audit.json'),JSON.stringify({checkedAt:new Date().toISOString(),scope:'Read-only opening smoke; not full flows',counts,results},null,2)+'\n');console.log(JSON.stringify({counts,total:results.length,fullFlowCompletion:false}));
if(results.some(r=>r.state!=='opened'))process.exitCode=1;
})().catch(()=>{console.error('Settings route audit failed');process.exitCode=1;});
