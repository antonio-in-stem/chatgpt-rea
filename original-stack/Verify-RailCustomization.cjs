const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[],trace=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:15000,maxBuffer:1048576});return JSON.parse(stdout);}
async function wait(fn,predicate,ms=45000){const until=Date.now()+ms;do{try{const x=await fn();if(predicate(x))return x;}catch{}await new Promise(r=>setTimeout(r,500));}while(Date.now()<until);throw Error('Expected rail state did not arrive');}
const read=()=>control('inspect-rail'),names=x=>x.items.map(i=>i.text).filter(Boolean);
async function check(name,predicate){await wait(read,predicate);results.push(name);console.log('PASS '+name);}
async function explore(open){const elements=await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Explore'));const item=elements.find(e=>e.text==='Explore');if((item.expanded==='true')!==open)await control('click','Explore');}
(async()=>{
 await explore(false);const baseline=names(await read());trace.push({stage:'baseline',order:baseline});
 if(!baseline.includes('Sites')||!baseline.includes('Pull requests'))throw Error('Fixture requires pinned Sites and Pull requests');
 await check('original avatar image visible',x=>x.profileImage);
 await explore(true);await control('unpin-destination','Sites');await explore(false);
 await check('Sites removed from rail',x=>!names(x).includes('Sites'));
 await control('reload-demo');await check('unpin survives reload',x=>names(x).includes('Explore')&&!names(x).includes('Sites'));
 await explore(true);await control('pin-destination','Sites');await explore(false);
 await check('repin restores destination',x=>names(x).includes('Sites'));
 const before=names(await read());const first=before.indexOf('Sites')<before.indexOf('Pull requests')?'Sites':'Pull requests',second=first==='Sites'?'Pull requests':'Sites';
 trace.push({stage:'before-drag',order:before,first,second});console.log(JSON.stringify(trace));
 trace.push({stage:'forward',gesture:await control('drag-rail-item',second,first)});
 await check('drag changes rail order',x=>names(x).indexOf(second)<names(x).indexOf(first));
 const reordered=names(await read());await control('reload-demo');
 await check('drag order survives reload',x=>JSON.stringify(names(x))===JSON.stringify(reordered));
 trace.push({stage:'reloaded',order:names(await read())});
 trace.push({stage:'inverse',gesture:await control('drag-rail-item',first,second)});
 trace.push({stage:'after-inverse',order:names(await read())});console.log(JSON.stringify(trace));
 const inverseOrder=reordered.filter(name=>name!==first);inverseOrder.splice(inverseOrder.indexOf(second),0,first);
 await check('inverse drag moves item before target',x=>JSON.stringify(names(x))===JSON.stringify(inverseOrder));
 for(let i=0;i<baseline.length;i++){const current=names(await read());if(current[i]===baseline[i])continue;if(!['Sites','Pull requests','Projects'].includes(baseline[i]))throw Error('Unexpected fixed rail order');const expected=current.filter(name=>name!==baseline[i]);expected.splice(expected.indexOf(current[i]),0,baseline[i]);await control('drag-rail-item',baseline[i],current[i]);await check('restore '+baseline[i],x=>JSON.stringify(names(x))===JSON.stringify(expected));}
 await check('original order restored',x=>JSON.stringify(names(x))===JSON.stringify(baseline));
 await control('reload-demo');await check('restored order persists with avatar',x=>x.profileImage&&JSON.stringify(names(x))===JSON.stringify(baseline));
 fs.writeFileSync(path.join(__dirname,'state',profile,'rail-customization-ui-check.json'),JSON.stringify({passed:true,results,trace,rendererModified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{fs.writeFileSync(path.join(__dirname,'state',profile,'rail-customization-ui-check.json'),JSON.stringify({passed:false,results,trace,error:e.message},null,2)+'\n');console.error(e.message);process.exitCode=1;});
