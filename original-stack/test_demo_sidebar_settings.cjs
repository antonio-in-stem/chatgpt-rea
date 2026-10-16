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

test('observed boolean preferences survive fresh host instances without replacing sidebar state',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-preferences-')),file=path.join(dir,'settings.json');
 const change=(feature,value)=>{const u=new URL('https://chatgpt.com/settings/account_user_setting');u.searchParams.set('feature',feature);u.searchParams.set('value',value);return u;};
 try {
  route('PATCH',patch(settings),file,fs);const sidebarBefore=fs.readFileSync(file,'utf8');
  route('PATCH',change('training_allowed','true'),file,fs);
  route('PATCH',change('precise_location_allowed','false'),file,fs);
  const reloaded=vm.runInNewContext('('+route.toString()+')');
  assert.equal(JSON.stringify(reloaded('GET',readUrl,file,fs)),JSON.stringify({settings:{training_allowed:true,precise_location_allowed:false,sidebar_customization:settings}}));
  route('PATCH',change('training_allowed','false'),file,fs);
  assert.equal(route('GET',readUrl,file,fs).settings.training_allowed,false);
  assert.equal(fs.readFileSync(file,'utf8'),sidebarBefore);
  const pref=file+'.preferences.json',before=fs.readFileSync(pref,'utf8');
  for(const value of ['1','null','{}','TRUE',''])assert.throws(()=>route('PATCH',change('training_allowed',value),file,fs),/Invalid/);
  assert.throws(()=>route('PATCH',change('unknown','true'),file,fs),/Unsupported/);
  const failing={...fs,renameSync(){throw Error('simulated commit failure');}};
  assert.throws(()=>route('PATCH',change('training_allowed','true'),file,failing),/commit failure/);
  assert.equal(fs.readFileSync(pref,'utf8'),before);assert.equal(fs.existsSync(pref+'.pending'),false);
  fs.writeFileSync(pref+'.pending','foreign');
  assert.throws(()=>route('PATCH',change('training_allowed','true'),file,fs),{code:'EEXIST'});
  assert.equal(fs.readFileSync(pref+'.pending','utf8'),'foreign');
  fs.writeFileSync(pref,'{"training_allowed":"false"}');
  assert.throws(()=>route('GET',readUrl,file,fs),/Invalid demo boolean/);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

test('account accent confirms saved value and preserves other preferences on failure',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-accent-')),file=path.join(dir,'settings.json');
 const change=(feature,value)=>{const u=new URL('https://chatgpt.com/settings/account_user_setting');u.searchParams.set('feature',feature);u.searchParams.set('value',value);return u;};
 try{
  route('PATCH',patch(settings),file,fs);route('PATCH',change('training_allowed','false'),file,fs);
  for(const color of ['default','blue','green','yellow','pink','orange','purple','black']){const reply=route('PATCH',change('chat_theme',color),file,fs);assert.equal(reply.chat_theme,color);assert.equal(reply.training_allowed,false);assert.equal(route('GET',readUrl,file,fs).settings.chat_theme,color);}
  assert.throws(()=>route('PATCH',change('chat_theme','white'),file,fs),/Invalid demo accent/);
  const failing={...fs,renameSync(){throw Error('accent disk failure');}};
  assert.throws(()=>route('PATCH',change('chat_theme','blue'),file,failing),/accent disk failure/);
  const saved=route('GET',readUrl,file,fs).settings;assert.equal(saved.chat_theme,'black');assert.equal(saved.training_allowed,false);assert.deepEqual(saved.sidebar_customization,settings);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
