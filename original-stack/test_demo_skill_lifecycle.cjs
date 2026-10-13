const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {demoSkillLifecycle:call}=require('./demo_skill_lifecycle.cjs');
test('lifecycle only changes owned demo state and preserves enablement across reinstall',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-skill-test-')),settings=path.join(dir,'demo-sidebar-settings.json'),state=path.join(dir,'demo-skills.json');
 try{
  fs.writeFileSync(state,JSON.stringify({enabled:false}));
  assert.equal(call('catalog',{},settings,fs,path).skills[0].id,'rea-ui-demo');
  call('remove',{skillPath:'C:/REA-Demo/skills/rea-ui-demo/SKILL.md'},settings,fs,path);
  assert.deepEqual(JSON.parse(fs.readFileSync(state)),{enabled:false,installed:false});
  call('install',{skillId:'rea-ui-demo',repoPath:'skills/rea-ui-demo'},settings,fs,path);
  assert.deepEqual(JSON.parse(fs.readFileSync(state)),{enabled:false,installed:true});
  assert.throws(()=>call('remove',{skillPath:'C:/real/SKILL.md'},settings,fs,path));
  assert.throws(()=>call('install',{skillId:'rea-ui-demo',repoPath:'../escape'},settings,fs,path));
  fs.writeFileSync(path.join(dir,'demo-skills.pending'),'another writer');
  assert.throws(()=>call('remove',{skillPath:'C:/REA-Demo/skills/rea-ui-demo/SKILL.md'},settings,fs,path));
  assert.equal(fs.readFileSync(path.join(dir,'demo-skills.pending'),'utf8'),'another writer');
  assert.equal(JSON.parse(fs.readFileSync(state)).installed,true);
 }finally{for(const name of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,name));fs.rmdirSync(dir);}
});
