// Recovered list/save/status consumers and shared-task-dialog Ve preview shape.
function demoAutomationHttp(method,url,body,settingsPath,fs,path){
 if(url.origin!=='https://chatgpt.com')return null;
 const route=url.pathname;
 if(!((method==='GET'&&route==='/automations')||(method==='POST'&&['/automations/save','/automations/set_status','/automations/remove'].includes(route))))return null;
 let file=null;
 if(settingsPath){if(path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo settings required');file=path.join(path.dirname(settingsPath),'demo-automations.json');}
 const state=file&&fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{items:[],sequence:0};
 if(method==='GET'){
  const filter=url.searchParams.get('filter'),raw=url.searchParams.get('limit');
  if(filter!==null&&!['scheduled','finished','paused'].includes(filter))throw Error('Unsupported demo automation filter');
  if(raw!==null&&(!/^[1-9][0-9]*$/.test(raw)||Number(raw)>100))throw Error('Invalid automation page size');
  const cursor=url.searchParams.get('cursor'),offset=cursor===null?0:Number(cursor);
  if(cursor!==null&&!/^(0|[1-9][0-9]*)$/.test(cursor))throw Error('Unknown demo automation cursor');
  const items=state.items.filter(x=>!filter||(filter==='scheduled'?x.is_enabled:filter==='paused'?!x.is_enabled:false));
  const limit=raw===null?25:Number(raw);
  if(!Number.isSafeInteger(offset)||offset>items.length)throw Error('Unknown demo automation cursor');
  return {items:items.slice(offset,offset+limit),cursor:offset+limit<items.length?String(offset+limit):null};
 }
 if(!file)throw Error('Explicit demo state required');
 if(typeof body!=='string'||body.length>65536)throw Error('Expected bounded JSON task body');
 const input=JSON.parse(body);if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Invalid task body');
 let result;
 const id=route==='/automations/remove'?input.automation_id:input.jawbone_id;
 const existing=id==null?null:state.items.find(x=>x.id===id);
 if(id!=null&&!existing)throw Error('Unknown demo task');
 if(route==='/automations/save'){
  for(const key of ['title','prompt','schedule','default_timezone'])if(typeof input[key]!=='string'||!input[key].trim())throw Error('Missing task '+key);
  new Intl.DateTimeFormat('en-US',{timeZone:input.default_timezone});
  if(typeof input.is_enabled!=='boolean'||![0,1,2].includes(input.timing_mode))throw Error('Invalid task state');
  if(input.team_id!=null)throw Error('Demo team tasks unsupported');
  const rule=input.schedule.match(/^RRULE:(.+)$/m)?.[1];
  const fields=new Map((rule||'').split(';').map(v=>v.split('=')));
  const frequency=rule?({DAILY:'daily',WEEKLY:'weekly',MONTHLY:'monthly',YEARLY:'yearly'}[fields.get('FREQ')]||'custom'):'once';
  const components={frequency,start_time:null,by_day:fields.get('BYDAY')||null};
  for(const [key,label] of [['BYHOUR','by_hour'],['BYMINUTE','by_minute'],['BYSECOND','by_second'],['BYMONTH','by_month'],['BYMONTHDAY','by_month_day'],['BYYEARDAY','by_year_day']]){const value=fields.get(key);components[label]=value!=null&&/^\d+$/.test(value)?Number(value):null;}
  result={complexity:null,content_type:null,conversation_id:null,default_timezone:input.default_timezone,display_emoji:input.emoji??null,display_schedule:null,display_title:null,email_enabled:input.email_enabled===true,id:existing?.id||'rea-demo-task-'+(++state.sequence),is_enabled:input.is_enabled,last_run_time:null,next_run_times:['2099-01-01T00:00:00Z'],notifications_enabled:input.notifications_enabled===true,prompt:input.prompt,schedule:input.schedule,schedule_components:components,schedule_time_of_day:null,source_conversation_is_work_mode:true,target_time_utc:null,timing_mode:['exact_schedule','flexible_schedule','condition_watch'][input.timing_mode],title:input.title,updated_at:new Date().toISOString(),webhook_triggers:[],model:input.model??existing?.model??null,reasoning_effort:input.reasoning_effort??existing?.reasoning_effort??null,thread_mode:input.thread_mode??existing?.thread_mode??'new_chat'};
  state.items=existing?state.items.map(x=>x.id===id?result:x):[result,...state.items];
 }else if(route==='/automations/set_status'){
  if(!existing||typeof input.is_enabled!=='boolean')throw Error('Invalid task status');
  result={...existing,is_enabled:input.is_enabled,updated_at:new Date().toISOString()};state.items=state.items.map(x=>x.id===id?result:x);
 }else{
  if(!existing)throw Error('Unknown demo task');state.items=state.items.filter(x=>x.id!==id);result={};
 }
 const temporary=file+'.pending';let owned=false;
 try{fs.writeFileSync(temporary,JSON.stringify(state),{flag:'wx'});owned=true;fs.renameSync(temporary,file);}finally{if(owned&&fs.existsSync(temporary))fs.unlinkSync(temporary);}
 return result;
}
module.exports={demoAutomationHttp};
