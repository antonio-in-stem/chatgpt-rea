'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm');
const {demoSidebarSettings:route}=require('./demo_sidebar_settings.cjs');
const readUrl=new URL('https://chatgpt.com/settings/user');
function patch(value){const u=new URL('https://chatgpt.com/settings/account_user_setting');u.searchParams.set('feature','sidebar_customization');u.searchParams.set('value',JSON.stringify(value));return u;}
const settings={order:['builtin:sites','builtin:projects'],pinOverrides:{'builtin:projects':true,'builtin:images':false}};
test('original HTTP shape persists across fresh host function instances',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-sidebar-')),file=path.join(dir,'settings.json');
 try{
  assert.deepEqual(route('GET',readUrl,file,fs),{settings:{}});
  assert.deepEqual(route('PATCH',patch(settings),file,fs),{});
  const reloaded=vm.runInNewContext('('+route.toString()+')');
  assert.equal(JSON.stringify(reloaded('GET',readUrl,file,fs)),JSON.stringify({settings:{sidebar_customization:settings}}));
  assert.equal(route('GET',new URL('https://example.invalid/settings/user'),file,fs),null);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('invalid values and failed commit preserve prior settings',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-sidebar-')),file=path.join(dir,'settings.json');
 try{
  route('PATCH',patch(settings),file,fs);const before=fs.readFileSync(file,'utf8');
  assert.throws(()=>route('PATCH',patch({...settings,order:['x','x']}),file,fs),/Invalid/);
  const failing={...fs,renameSync(){throw Error('simulated commit failure');}};
  assert.throws(()=>route('PATCH',patch({order:[],pinOverrides:{}}),file,failing),/commit failure/);
  assert.equal(fs.readFileSync(file,'utf8'),before);assert.equal(fs.existsSync(file+'.pending'),false);
  fs.writeFileSync(file+'.pending','owned by earlier operation');
  assert.throws(()=>route('PATCH',patch(settings),file,fs),{code:'EEXIST'});
  assert.equal(fs.readFileSync(file+'.pending','utf8'),'owned by earlier operation');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
