// Local automation host contract: main z_e; src-BJv5Mk7n rI/cF. No scheduler.
function demoLocalAutomations(method,input,settingsPath,fs,path){
 if(!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo state required');
 const file=path.join(path.dirname(settingsPath),'demo-local-automations.json');
 const state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{items:[],sequence:0};
 if(method==='list')return {items:state.items};
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Expected local task parameters');
 const old=state.items.find(x=>x.id===input.id);let result;
 if(method==='delete'){
  if(!old)return {item:null,success:true,status:'not_found'};
  state.items=state.items.filter(x=>x.id!==input.id);result={item:old,success:true,status:'deleted'};
 }else if(method==='create'||method==='update'){
  if(method==='update'&&!old)throw Error('Unknown demo local task');
  const source={...old,...input};
  for(const field of ['name','prompt','rrule'])if(typeof source[field]!=='string'||!source[field].trim())throw Error('Missing '+field);
  if(!['heartbeat','cron'].includes(source.kind))throw Error('Unknown demo task kind');
  if(source.kind==='heartbeat'&&(typeof source.targetThreadId!=='string'||!source.targetThreadId))throw Error('Heartbeat needs thread');
  const status=source.status??'ACTIVE';if(!['ACTIVE','PAUSED'].includes(status))throw Error('Invalid status');
  const next=status==='ACTIVE'?Date.parse('2099-01-01T00:00:00Z'):null,now=Date.now();
  const item={id:old?.id||'rea-local-task-'+(++state.sequence),kind:source.kind,name:source.name,prompt:source.prompt,status,rrule:source.rrule,model:source.model??null,reasoningEffort:source.reasoningEffort??null,nextRunAt:next,nextRunNominalAt:next,lastRunAt:null,createdAt:old?.createdAt??now,updatedAt:now};
  if(source.notificationPolicy==='failed_runs_only')item.notificationPolicy=source.notificationPolicy;
  if(source.kind==='heartbeat')item.targetThreadId=source.targetThreadId;
  else Object.assign(item,{autoArchive:source.autoArchive??false,pluginTemplateId:source.pluginTemplateId??null,target:source.projectId?{type:'project',projectId:source.projectId}:{type:'projectless'},cwds:[],executionEnvironment:'local',localEnvironmentConfigPath:null});
  state.items=old?state.items.map(x=>x.id===old.id?item:x):[item,...state.items];result={item};
 }else throw Error('Unsupported local demo action');
 const temporary=file+'.pending';let owned=false;
 try{fs.writeFileSync(temporary,JSON.stringify(state),{flag:'wx'});owned=true;fs.renameSync(temporary,file);}finally{if(owned&&fs.existsSync(temporary))fs.unlinkSync(temporary);}
 return result;
}
module.exports={demoLocalAutomations};
