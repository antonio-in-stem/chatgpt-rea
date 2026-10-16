const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const {activeSpaceGrant}=require('./Seed-ActiveSharing.cjs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
const file=path.join(__dirname,'state',profile,'demo-pages.json');
const grants=()=>{const s=JSON.parse(fs.readFileSync(file,'utf8')),space=s.spaces.find(e=>e.name==='Original Space demo'&&!e.deleted_at);return s.items.find(e=>e.metadata.page_id===space.root_page_id).shares||[];};
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const read=()=>control('inspect-demo-sharing'),items=()=>control('inspect');
async function wait(fn,predicate){const deadline=Date.now()+60000;let previous;do{try{const x=await fn();const geometry=JSON.stringify(x.geometry);if(predicate(x)&&(!x.geometry||geometry===previous))return x;previous=geometry;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,500));}while(Date.now()<deadline);throw Error('Sharing state timed out');}
const button=(x,text)=>x.buttons?.some(e=>e.text===text&&!e.disabled);
async function check(name,predicate){await wait(read,x=>x.ready&&x.alerts.length===0&&predicate(x));results.push(name);console.log('PASS '+name);}
async function open(){await wait(read,x=>x!==null);await control('show-demo-window');if((await read()).ready)return;await wait(items,x=>x.some(e=>e.text==='Space'));await control('activate-navigation-button','Space');await wait(items,x=>x.some(e=>e.tag==='A'&&e.label==='Original Space demo'));await control('open-demo-sharing-page');await wait(items,x=>x.some(e=>e.label==='Share Original Space demo'));await control('click','Share Original Space demo');await wait(read,x=>x.ready);}

(async()=>{
if(grants().length===0){activeSpaceGrant(profile);await control('reload-demo');}
const initial=grants();if(initial.length!==1||initial[0].status!=='active'||initial[0].recipient.principal_id!=='rea-demo-collaborator'||initial[0].role_id!=='role-library-folder-viewer')throw Error('Only the exact synthetic active Viewer scenario is allowed');
await open();await check('active collaborator shows name and email without pending invitation',x=>x.activeName&&x.email&&!x.pending&&x.owner&&button(x,'Viewer'));
await control('click-dialog','Viewer');await wait(items,x=>x.some(e=>e.text==='Editor'&&e.role?.startsWith('menuitem')));await control('click','Editor');await check('role change remains a draft',x=>button(x,'Editor')&&button(x,'Save'));if(grants()[0].role_id!=='role-library-folder-viewer')throw Error('Role persisted before Save');
await control('click-dialog','Cancel');await check('Cancel restores active Viewer',x=>button(x,'Viewer')&&!x.pending);if(grants()[0].role_id!=='role-library-folder-viewer')throw Error('Cancel changed stored role');
await control('click-dialog','Viewer');await wait(items,x=>x.some(e=>e.text==='Editor'&&e.role?.startsWith('menuitem')));await control('click','Editor');await control('click-dialog','Save');await wait(async()=>grants(),x=>x.length===1&&x[0].role_id==='role-library-folder-editor'&&x[0].status==='active');
await control('reload-demo');await open();await check('saved active Editor survives reload',x=>x.activeName&&x.email&&!x.pending&&button(x,'Editor'));
await control('click-dialog','Editor');await wait(items,x=>x.some(e=>e.text==='Remove access'&&e.role?.startsWith('menuitem')));await control('click','Remove access');await control('click-dialog','Save');await wait(async()=>grants(),x=>x.length===0);await check('Remove access clears collaborator and preserves owner',x=>!x.activeName&&!x.email&&x.owner);
await control('reload-demo');await open();await check('removal survives reload with owner retained',x=>!x.activeName&&!x.email&&x.owner);await control('click-dialog','Done');
fs.writeFileSync(path.join(__dirname,'state',profile,'active-sharing-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,simulatedCounterpartyAcceptance:true,realInvitationsSent:false,finalShares:0},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
