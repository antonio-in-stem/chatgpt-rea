const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:15000,maxBuffer:1048576});return JSON.parse(stdout);}
const read=()=>control('inspect-security-flow');
async function wait(fn,predicate,ms=45000){const until=Date.now()+ms;do{try{const x=await fn();if(predicate(x))return x;}catch{}await new Promise(r=>setTimeout(r,750));}while(Date.now()<until);throw Error('Expected Security UI state did not arrive');}
async function check(name,predicate){await wait(read,x=>x.ready&&!x.errors.length&&predicate(x));results.push(name);console.log('PASS '+name);}
async function open(){await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Explore'),180000);await control('click','Explore');await wait(()=>control('inspect'),x=>x.some(e=>e.text==='Security'));await control('click','Security');await wait(read,x=>x.ready&&x.controls.some(c=>c.text==='Scans'));await control('click','Scans');await check('scan list',x=>x.scan);}

const field=(x,label)=>x.controls.find(c=>c.label===label||c.text===label||c.placeholder===label);
(async()=>{await open();await control('click','Scan');await check('new scan requires repository',x=>x.headings.includes('New scan')&&field(x,'Start scan')?.disabled&&field(x,'Select a repository'));
 await control('click','Run a deep scan');await check('deep scan fixes entire codebase',x=>field(x,'Run a deep scan')?.checked==='true'&&field(x,'Entire codebase')?.disabled);
 await control('click','Add additional security context');await check('additional context fields shown',x=>field(x,'Add additional security context')?.checked==='true'&&field(x,'Authentication bypass, account takeover, or prompt injection')&&field(x,'Authorization, admin endpoints, billing, or file uploads'));
 await control('fill','Authentication bypass, account takeover, or prompt injection','Synthetic test context');await control('click','Add additional security context');await check('context fields hidden',x=>field(x,'Add additional security context')?.checked==='false'&&!field(x,'Authentication bypass, account takeover, or prompt injection'));
 await control('click','Run a deep scan');await check('standard scope unlocked',x=>field(x,'Run a deep scan')?.checked==='false'&&!field(x,'Entire codebase')?.disabled);
 await control('click','Entire codebase');await wait(()=>control('inspect'),x=>x.some(c=>c.role==='menuitem'&&c.text==='Single folder'));await control('activate-popup-item','Single folder');await check('folder scope selected',x=>!!field(x,'Single folder'));await control('click','Scans');await check('leave setup returns to reports',x=>x.scan&&!x.headings.includes('New scan'));
 fs.writeFileSync(path.join(__dirname,'state',profile,'security-scan-form-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,submissionVerified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{fs.writeFileSync(path.join(__dirname,'state',profile,'security-scan-form-ui-check.json'),JSON.stringify({passed:false,results,error:e.message},null,2)+'\n');console.error(e.message);process.exitCode=1;});
