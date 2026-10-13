// Synthetic personal-account usage for the original renderer; never real billing data.
function demoUsageHttp(method,url,now=Date.now()){
 if(url.origin!=='https://chatgpt.com'||url.pathname!=='/wham/usage'||method!=='GET')return null;
 if(!Number.isFinite(now)||now<0)throw Error('Invalid demo usage clock');
 const seconds=Math.floor(now/1000),window=(duration,used)=>{const reset=(Math.floor(seconds/duration)+1)*duration;return {used_percent:used,limit_window_seconds:duration,reset_after_seconds:reset-seconds,reset_at:reset};};
 return {account_id:'rea-demo-account',user_id:'rea-demo-user',plan_type:'free',rate_limit:{allowed:true,limit_reached:false,primary_window:window(18000,12),secondary_window:window(604800,8)},credits:{has_credits:false,unlimited:false,balance:'0'},additional_rate_limits:[],rate_limit_reached_type:null,rate_limit_upsell:null,model_picker_upsell:null,rate_limit_warning:null,sidebar_usage_warnings:[],ambient_usage:{default:{profile_subtext:"Demo usage",source:{kind:"included",heading:"Demo usage"},menu:{rows:[{label:"5-hour limit",value:{text:"88% remaining",tone:"neutral"}},{label:"Weekly limit",value:{text:"92% remaining",tone:"neutral"}}],actions:[]}}}};
}
module.exports={demoUsageHttp};
