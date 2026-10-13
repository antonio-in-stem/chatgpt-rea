const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {demoStatsigBootstrap,demoStatsigHttp}=require('./demo_feature_flags.cjs');
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
 for(const [name,value] of Object.entries({'3085093835':true,'2200939124':true,'637432221':true,'2120612410':true,'1032827878':true,'224248639':true,'2245491494':true,'770071981':false})){
   assert.equal(lookup.getGate(name).value,value);
   assert.equal(lookup.getGate(name).rule_id,'rea-demo');
 }
 assert.equal(lookup.getLayer('2813816346').value.enabled,true);
 assert.equal(lookup.getLayer('2813816346').value.thumbnail_previews_enabled,true);
 assert.deepEqual(Array.from(lookup.getConfigList()),[]);
 assert(Math.abs(Date.now()-data.time)<10000);
});

test('SDK refresh returns direct V1 evaluations and local event acknowledgment stays scoped',()=>{
 const call=(method,url)=>demoStatsigHttp(method,new URL(url));
 const boot=call('POST','https://chatgpt.com/wham/statsig/bootstrap');
 const refresh=call('POST','https://ab.chatgpt.com/v1/initialize?k=demo');
 assert.equal(typeof boot.statsigPayload,'string');assert.equal(refresh.statsigPayload,undefined);
 assert.deepEqual(refresh.feature_gates,JSON.parse(boot.statsigPayload).feature_gates);
 assert.deepEqual(refresh.layer_configs,JSON.parse(boot.statsigPayload).layer_configs);
 assert.equal(refresh.has_updates,true);
 for(const endpoint of ['rgstr','log_event'])assert.deepEqual(call('POST','https://chatgpt.com/ces/v1/'+endpoint),{success:true});
 for(const url of ['https://example.invalid/v1/initialize','https://chatgpt.com/v1/initialize','https://ab.chatgpt.com/other'])assert.equal(call('POST',url),null);
 assert.equal(call('GET','https://ab.chatgpt.com/v1/initialize'),null);
});
