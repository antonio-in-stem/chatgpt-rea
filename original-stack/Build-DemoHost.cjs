// Create a separate ASAR with demo host data. Never writes the pristine archive.
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const {createDemoIdentity}=require('./demo_identity.cjs');
const {demoStatsigBootstrap}=require('./demo_feature_flags.cjs');
const {demoSidebarSettings}=require('./demo_sidebar_settings.cjs');
const {demoPluginHttp}=require('./demo_plugin_http.cjs');
const {demoAutomationHttp}=require('./demo_automation_http.cjs');
const {demoSpaceHttp}=require('./demo_space_http.cjs');
const {demoLocalAutomations}=require('./demo_local_automations.cjs');
const {demoSkillFile}=require('./demo_skill_file.cjs');
const {demoSkillLifecycle}=require('./demo_skill_lifecycle.cjs');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const [avatarPngPath,outputDirectory]=process.argv.slice(2);
if(!avatarPngPath)throw Error('Pass an explicit local demo PNG path');
const out=outputDirectory?path.resolve(outputDirectory):path.join(__dirname,'state','instrumented-profile-host');
const pristine=path.resolve(__dirname,'pristine');
if(out===pristine||out.startsWith(pristine+path.sep)||pristine.startsWith(out+path.sep))throw Error('Output overlaps pristine runtime');
if(fs.existsSync(out))throw Error('Output already exists; preserve it and choose a deliberate rebuild workflow');
const input=path.join(__dirname,'pristine','resources','app.asar');
const raw=fs.readFileSync(input);
if(sha(raw)!=='c5fdef328cfa2ad9095786f9c3a7aaa447e68834d31299d6ef2592da02029038')throw Error('Unexpected pristine archive');
const header=JSON.parse(raw.subarray(16,16+raw.readUInt32LE(12)).toString('utf8'));
const dataStart=8+raw.readUInt32LE(4);
const entry=header.files['.vite'].files.build.files['main-BklS_2Y2.js'];
const original=raw.subarray(dataStart+Number(entry.offset),dataStart+Number(entry.offset)+entry.size);
if(sha(original)!=='5cf1544463be9497b85b69051aa5ad32320f9ebdca063ec2ab41abb75b6cadf7')throw Error('Unexpected host bundle');
const identity=createDemoIdentity({avatarPngPath,sessionState:'signedIn'});
const values={accountInfo:identity.accountInfo(),currentUser:identity.currentUser(),accounts:identity.hostAccounts(),workspaceSettings:identity.workspaceSettings()};
values.http={
 '/me':identity.currentUser(),'/backend-api/me':identity.currentUser(),
 '/accounts/check/v4-2023-04-27':identity.accountsCheck(),
 '/wham/accounts/check':identity.hostAccounts(),
 '/accounts/rea-demo-account/settings':identity.workspaceSettings(),
 '/settings/user':{settings:{}},'/wham/sites/access':{enabled:true},
 '/wham/onboarding/context':{role:null,desktop_onboarding_completed_at:'2026-10-13T00:00:00Z'}
};
const replacements=[
 ['"list-automations":async()=>{','"list-automations":async()=>{return demoLocalAutomations(`list`,{},process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`),require(`node:path`));'],
 ['"automation-run-now":async({id:e,collaborationMode:t,permissions:n})=>(','"automation-run-now":async({id:e,collaborationMode:t,permissions:n})=>(await Promise.reject(Error(`REA demo does not execute scheduled tasks`)),'],
 ['"automation-create":e=>this.automationsService.create(e)','"automation-create":e=>demoLocalAutomations(`create`,e,process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`),require(`node:path`))'],
 ['"automation-update":e=>this.automationsService.update(e)','"automation-update":e=>demoLocalAutomations(`update`,e,process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`),require(`node:path`))'],
 ['"automation-delete":e=>this.automationsService.delete(e)','"automation-delete":e=>demoLocalAutomations(`delete`,e,process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`),require(`node:path`))'],

 ['"recommended-skills":async({hostId:e,refresh:t})=>{','"recommended-skills":async({hostId:e,refresh:t})=>{if(e!=null&&e!==`local`)throw Error(`Only local demo skills`);return demoSkillLifecycle(`catalog`,{hostId:e},process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`),require(`node:path`));'],
 ['"install-recommended-skill":async({hostId:e,skillId:t,repoPath:n,installRoot:r,skillStatsigOverride:a,forceReinstall:o,source:s})=>{','"install-recommended-skill":async({hostId:e,skillId:t,repoPath:n,installRoot:r,skillStatsigOverride:a,forceReinstall:o,source:s})=>{if(e!=null&&e!==`local`)throw Error(`Only local demo skills`);return demoSkillLifecycle(`install`,{hostId:e,skillId:t,repoPath:n,installRoot:r},process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`),require(`node:path`));'],
 ['"remove-skill":async({hostId:e,skillPath:t})=>{','"remove-skill":async({hostId:e,skillPath:t})=>{if(e!=null&&e!==`local`)throw Error(`Only local demo skills`);return demoSkillLifecycle(`remove`,{hostId:e,skillPath:t},process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`),require(`node:path`));'],
 ['"read-file":async({path:e,hostId:t})=>{','"read-file":async({path:e,hostId:t})=>{const demoSkill=demoSkillFile(e,t);if(demoSkill!==null)return demoSkill;'],
 ['async function O_(e){','async function O_(e){return structuredClone(__reaDemoIdentity.accountInfo);'],
 ['readAccountInfo(e=!1){','readAccountInfo(e=!1){return Promise.resolve({status:`ready`,data:structuredClone(__reaDemoIdentity.accountInfo)});'],
 ['readAccounts(e,t=!1){','readAccounts(e,t=!1){return Promise.resolve({status:`ready`,data:structuredClone(__reaDemoIdentity.accounts)});'],
 ['readWorkspaceSettings(e,t=!1){','readWorkspaceSettings(e,t=!1){if(e.accountId!==__reaDemoIdentity.accountInfo.accountId)throw Error(`Unknown demo account`);return Promise.resolve({status:`ready`,data:structuredClone(__reaDemoIdentity.workspaceSettings)});'],
 ['async fetchHttp(e,t,n,i,a){','async fetchHttp(e,t,n,i,a){const demoUrl=new URL(t.url,`https://chatgpt.com`);const demoSpace=demoSpaceHttp(String(t.method||`GET`).toUpperCase(),demoUrl,t.body);if(demoSpace!==null)return {response:new Response(JSON.stringify(demoSpace),{status:200,headers:{"content-type":"application/json"}})};const demoAutomations=demoAutomationHttp(String(t.method||`GET`).toUpperCase(),demoUrl,t.body,process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`),require(`node:path`));if(demoAutomations!==null)return {response:new Response(JSON.stringify(demoAutomations),{status:200,headers:{"content-type":"application/json"}})};const demoPluginCatalog=demoPluginHttp(String(t.method||`GET`).toUpperCase(),demoUrl);if(demoPluginCatalog!==null)return {response:new Response(JSON.stringify(demoPluginCatalog),{status:200,headers:{"content-type":"application/json"}})};const demoSettings=demoSidebarSettings(String(t.method||`GET`).toUpperCase(),demoUrl,process.env.REA_DEMO_SETTINGS_PATH,require(`node:fs`));if(demoSettings!==null)return {response:new Response(JSON.stringify(demoSettings),{status:200,headers:{"content-type":"application/json"}})};if(String(t.method).toUpperCase()===`POST`&&demoUrl.origin===`https://chatgpt.com`&&demoUrl.pathname===`/wham/statsig/bootstrap`){return {response:new Response(JSON.stringify(demoStatsigBootstrap()),{status:200,headers:{"content-type":"application/json"}})}}if((String(t.method||`GET`).toUpperCase()===`GET`)&&Object.hasOwn(__reaDemoIdentity.http,demoUrl.pathname)&&demoUrl.origin===`https://chatgpt.com`){return {response:new Response(JSON.stringify(__reaDemoIdentity.http[demoUrl.pathname]),{status:200,headers:{"content-type":"application/json"}})}}throw Error(`REA demo HTTP contract not implemented: `+demoUrl.pathname);']
];
let patched=original.toString('utf8');
for(const [needle,replacement] of replacements){
 if(patched.split(needle).length!==2)throw Error('Host seam is not unique: '+needle);
 patched=patched.replace(needle,replacement);
}
patched=demoSpaceHttp.toString()+'\n'+demoLocalAutomations.toString()+'\n'+demoAutomationHttp.toString()+'\n'+demoSkillLifecycle.toString()+'\n'+demoSkillFile.toString()+'\n'+demoPluginHttp.toString()+'\n'+demoSidebarSettings.toString()+'\n'+demoStatsigBootstrap.toString()+'\nconst __reaDemoIdentity='+JSON.stringify(values)+';\n'+patched;
new vm.Script(patched,{filename:'demo-main.js'});
const bytes=Buffer.from(patched);
entry.offset=String(raw.length-dataStart);entry.size=bytes.length;
entry.integrity={algorithm:'SHA256',hash:sha(bytes),blockSize:4194304,blocks:[]};
for(let i=0;i<bytes.length;i+=4194304)entry.integrity.blocks.push(sha(bytes.subarray(i,i+4194304)));
const json=Buffer.from(JSON.stringify(header));
const payloadLength=Math.ceil((4+json.length)/4)*4;
const prefix=Buffer.alloc(12+payloadLength);
prefix.writeUInt32LE(4,0);prefix.writeUInt32LE(4+payloadLength,4);prefix.writeUInt32LE(payloadLength,8);prefix.writeUInt32LE(json.length,12);json.copy(prefix,16);
fs.mkdirSync(out,{recursive:true});
const dest=path.join(out,'app.asar');const fd=fs.openSync(dest,'wx');
try{fs.writeFileSync(fd,prefix);fs.writeFileSync(fd,raw.subarray(dataStart));fs.writeFileSync(fd,bytes);}finally{fs.closeSync(fd)}
const check=fs.readFileSync(dest), start=8+check.readUInt32LE(4);
if(!check.subarray(start,start+raw.length-dataStart).equals(raw.subarray(dataStart)))throw Error('Original archive data changed');
if(sha(check.subarray(start+Number(entry.offset),start+Number(entry.offset)+entry.size))!==sha(bytes))throw Error('Patched member mismatch');
fs.writeFileSync(path.join(out,'demo-account-read.json'),JSON.stringify(identity.accountRead(),null,2)+'\n');
const manifest={mode:'instrumented-demo-host',simulatedSessionState:'signedIn',sourceSha256:sha(raw),outputSha256:sha(check),changedMember:'.vite/build/main-BklS_2Y2.js',originalMemberSha256:sha(original),patchedMemberSha256:sha(bytes),seams:replacements.map(([needle])=>needle),originalArchiveDataPreserved:true,rendererFilesModified:false,credentialsPresent:false,networkBoundary:'Only this host fetchHttp service is blocked for unmatched routes; this is not full process network isolation.',runtimeVerified:false};
fs.writeFileSync(path.join(out,'patch-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({output:dest,...manifest},null,2));
