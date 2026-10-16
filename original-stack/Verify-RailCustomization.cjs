const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:15000,maxBuffer:1048576});return JSON.parse(stdout);}
async function wait(fn,predicate,ms=45000){const until=Date.now()+ms;do{try{const x=await fn();if(predicate(x))return x;}catch{}await new Promise(r=>setTimeout(r,500));}while(Date.now()<until);throw Error('Expected rail state did not arrive');}
const read=()=>control('inspect-rail'),names=x=>x.items.map(i=>i.text).filter(Boolean);
async function check(name,predicate){await wait(read,predicate);results.push(name);console.log('PASS '+name);}
async function explore(open){const elements=await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Explore'));const item=elements.find(e=>e.text==='Explore');if((item.expanded==='true')!==open)await control('click','Explore');}
(async()=>{
 await explore(false);const baseline=names(await read());
 if(!baseline.includes('Sites')||!baseline.includes('Pull requests'))throw Error('Fixture requires pinned Sites and Pull requests');
 await check('original avatar image visible',x=>x.profileImage);
 await explore(true);await control('unpin-destination','Sites');await explore(false);
 await check('Sites removed from rail',x=>!names(x).includes('Sites'));
 await control('reload-demo');await check('unpin survives reload',x=>names(x).includes('Explore')&&!names(x).includes('Sites'));
 await explore(true);await control('pin-destination','Sites');await explore(false);
 await check('repin restores destination',x=>names(x).includes('Sites'));
 const before=names(await read());const first=before.indexOf('Sites')<before.indexOf('Pull requests')?'Sites':'Pull requests',second=first==='Sites'?'Pull requests':'Sites';
 await control('drag-rail-item',second,first);
 await check('drag changes rail order',x=>names(x).indexOf(second)<names(x).indexOf(first));
 const reordered=names(await read());await control('reload-demo');
 await check('drag order survives reload',x=>JSON.stringify(names(x))===JSON.stringify(reordered));
 // Diagnostic stability delay; this did not resolve the restoration failure.
 await new Promise(r=>setTimeout(r,2000));
 await check('reloaded order remains stable',x=>JSON.stringify(names(x))===JSON.stringify(reordered));
 await control('drag-rail-item',first,second);
 await check('original order restored',x=>JSON.stringify(names(x))===JSON.stringify(baseline));
 await control('reload-demo');await check('restored order persists with avatar',x=>x.profileImage&&JSON.stringify(names(x))===JSON.stringify(baseline));
 fs.writeFileSync(path.join(__dirname,'state',profile,'rail-customization-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{fs.writeFileSync(path.join(__dirname,'state',profile,'rail-customization-ui-check.json'),JSON.stringify({passed:false,results,error:e.message},null,2)+'\n');console.error(e.message);process.exitCode=1;});
