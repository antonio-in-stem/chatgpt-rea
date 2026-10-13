const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {demoStatsigBootstrap}=require('./demo_feature_flags.cjs');
test('original V1 lookup recognizes all selected demo gates including explicit false',()=>{
 const source=fs.readFileSync(path.join(__dirname,'state/recovered-all/readable/assets/app-shared-737655e1fb23.js'),'utf8');
 const begin=source.indexOf('e.V1InitializeContainer = class {');
 const end=source.indexOf('\n  }),\n  Gvn',begin);
 assert(begin>=0&&end>begin);
 const scope={e:{},t:{_DJB2(){throw Error('Selected gates should resolve by original literal-name lookup')}}};
 vm.runInNewContext(source.slice(begin,end),scope);
 const response=demoStatsigBootstrap(),data=JSON.parse(response.statsigPayload);
 assert.equal(data.has_updates,true);
 assert.equal(data.user.userID,'rea-demo-user');
 const lookup=new scope.e.V1InitializeContainer(data);
 for(const [name,value] of Object.entries({'3085093835':true,'2200939124':true,'637432221':true,'2120612410':true,'1032827878':true,'770071981':false})){
   assert.equal(lookup.getGate(name).value,value);
   assert.equal(lookup.getGate(name).rule_id,'rea-demo');
 }
 assert.equal(lookup.getLayer('2813816346').value.enabled,true);
 assert.equal(lookup.getLayer('2813816346').value.thumbnail_previews_enabled,true);
 assert.deepEqual(Array.from(lookup.getConfigList()),[]);
 assert(Math.abs(Date.now()-data.time)<10000);
});
