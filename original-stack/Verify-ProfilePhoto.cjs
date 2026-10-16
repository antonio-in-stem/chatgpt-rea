const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){try{const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:15000,maxBuffer:1048576});return JSON.parse(stdout);}catch{throw Error('Control failed: '+op);}}
const read=()=>control('inspect-profile-flow'),items=()=>control('inspect');
async function wait(fn,predicate){const end=Date.now()+45000;do{try{const x=await fn();if(predicate(x))return x;}catch{}await new Promise(r=>setTimeout(r,500));}while(Date.now()<end);throw Error('Expected profile state did not arrive');}
async function check(name,predicate){await wait(read,x=>x.alerts.length===0&&predicate(x));results.push(name);console.log('PASS '+name);}
async function open(){let list=await wait(items,x=>x.some(e=>e.label==='Open profile menu'));if(!list.some(x=>x.label==='Profile')){await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Profile'));}await control('activate-settings-section','Profile');await wait(items,x=>x.some(e=>e.label==='Edit profile'&&!e.disabled));}
async function edit(){await control('click','Edit profile');await wait(read,x=>x.dialogOpen&&x.fields.some(e=>e.label==='Display name'));}

const photos=()=>control('inspect-profile-photo');
async function cropCheck(name,predicate){await wait(photos,predicate);results.push(name);console.log('PASS '+name);}
const crop=rows=>rows.find(x=>x.title==='Adjust your image'),editor=rows=>rows.find(x=>x.title==='Edit profile');
(async()=>{
 await open();await edit();const initial=editor(await photos()).images;
 await control('select-demo-profile-photo');await cropCheck('original crop loads demo image',x=>crop(x)?.images.every(i=>i.loaded&&i.width===96&&i.height===64));
 await control('profile-crop-action','Zoom in');await cropCheck('zoom in changes original slider',x=>Number(crop(x)?.sliders[0].value)>1);
 await control('profile-crop-action','Zoom out');await cropCheck('zoom out returns to minimum',x=>Number(crop(x)?.sliders[0].value)===1);
 await control('profile-crop-action','Cancel');await cropCheck('crop cancel preserves editor photo',x=>!crop(x)&&JSON.stringify(editor(x)?.images)===JSON.stringify(initial));
 await control('select-demo-profile-photo');await cropCheck('crop reopens',x=>!!crop(x));await control('profile-crop-action','Save');
 await cropCheck('crop save returns processed square preview',x=>!crop(x)&&editor(x)?.images.some(i=>i.loaded&&i.width===i.height&&i.width>100));
 await control('click-dialog','Cancel');await check('editor cancel closes without save',x=>!x.dialogOpen&&x.avatarLoaded);
 await edit();await cropCheck('canceled draft is discarded',x=>JSON.stringify(editor(x)?.images)===JSON.stringify(initial));await control('click-dialog','Cancel');
 await edit();await control('select-demo-profile-photo');await cropCheck('upload crop ready',x=>!!crop(x));await control('profile-crop-action','Save');await cropCheck('upload preview ready',x=>!crop(x)&&!!editor(x));await control('click-dialog','Save');await check('photo editor save completes',x=>!x.dialogOpen&&x.avatarLoaded);
 const state=path.join(__dirname,'state',profile),saved=JSON.parse(fs.readFileSync(path.join(state,'demo-sidebar-settings.json.profile.json'),'utf8')),assets=JSON.parse(fs.readFileSync(path.join(state,'demo-sidebar-settings.json.profile-photos.json'),'utf8'));
 const photo=assets[saved.profile_asset_pointer];if(typeof photo!=='string')throw Error('Saved demo photo missing');const hash=require('node:crypto').createHash('sha256').update(photo).digest('hex');
 await wait(()=>control('inspect-profile-avatar'),x=>x.rail?.hash===hash);results.push('rail uses saved cropped photo');console.log('PASS rail uses saved cropped photo');
 await control('reload-demo');await open();await wait(()=>control('inspect-profile-avatar'),x=>x.rail?.hash===hash);results.push('saved rail photo survives reload');console.log('PASS saved rail photo survives reload');
 await edit();await cropCheck('editor loads saved square photo after reload',x=>editor(x)?.images.some(i=>i.loaded&&i.width===i.height&&i.width>100));await control('click-dialog','Cancel');
 fs.writeFileSync(path.join(__dirname,'state',profile,'profile-photo-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,uploadVerified:true},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length,uploadVerified:true}));
})().catch(e=>{fs.writeFileSync(path.join(__dirname,'state',profile,'profile-photo-ui-check.json'),JSON.stringify({passed:false,results,error:e.message},null,2)+'\n');console.error(e.message);process.exitCode=1;});
