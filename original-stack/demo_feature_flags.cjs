// Explicit demo scenario from recovered Statsig bootstrap consumers; no upstream SDK call.
'use strict';
function demoStatsigBootstrap() {
  const feature_gates={};
  for(const [name,value] of Object.entries({'3085093835':true,'2200939124':true,'637432221':true,'2120612410':true,'1032827878':true,'224248639':true,'2245491494':true,'770071981':false,'1598376':true,'3500066563':true})) {
    feature_gates[name]={value,rule_id:'rea-demo',secondary_exposures:[]};
  }
  return {statsigPayload:JSON.stringify({user:{userID:'rea-demo-user',customIDs:{account_id:'rea-demo-account'},custom:{auth_method:'chatgpt'}},has_updates:true,time:Date.now(),feature_gates,dynamic_configs:{},layer_configs:{'2813816346':{value:{enabled:true,thumbnail_previews_enabled:true},rule_id:'rea-demo',secondary_exposures:[]}},param_stores:{}})};
}
function demoStatsigHttp(method,url) {
 if(method!=='POST')return null;
 if(url.origin==='https://chatgpt.com'&&url.pathname==='/wham/statsig/bootstrap')return demoStatsigBootstrap();
 if(url.origin==='https://ab.chatgpt.com'&&url.pathname==='/v1/initialize')return JSON.parse(demoStatsigBootstrap().statsigPayload);
 // Acknowledge local demo SDK events without storing or forwarding their bodies.
 if(url.origin==='https://chatgpt.com'&&['/ces/v1/rgstr','/ces/v1/log_event'].includes(url.pathname))return {success:true};
 return null;
}
module.exports={demoStatsigBootstrap,demoStatsigHttp};
