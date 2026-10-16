// Archived cloud-task list/restore contract used by original DataControlsSettings.
// Read-only completed conversation fixtures also feed the original cloud viewer.
function demoArchivedTasksHttp(method,url,body,settingsPath,fs){
 if(url.origin!=='https://chatgpt.com')return null;
 // Original iPr consumes offset + limit < total; this demo has no archived ChatGPT chats.
 if(url.pathname==='/conversations'&&url.searchParams.get('is_archived')==='true'){
  if(method!=='GET')throw Error('Unsupported archived conversations method');
  if(!settingsPath)throw Error('Explicit demo state required');
  const offset=Number(url.searchParams.get('offset')??0),limit=Number(url.searchParams.get('limit')??20);
  if(!Number.isSafeInteger(offset)||offset<0||!Number.isSafeInteger(limit)||limit<1||limit>100)throw Error('Invalid demo archive pagination');
  return {items:[],offset,limit,total:0};
 }
 const route=url.pathname,search=route==='/wham/tasks/search',list=route==='/wham/tasks/list'&&url.searchParams.get('task_filter')==='archived';
 const action=route.match(/^\/wham\/tasks\/(rea-demo-archived-[12])\/(recover|archive)$/);
 const viewer=route.match(/^\/wham\/tasks\/(rea-demo-archived-[12])(?:\/(turns)(?:\/(rea-archive-(?:user|assistant)-[12]))?)?$/);
 if(!list&&!search&&!action&&!viewer)return null;
 if(!settingsPath)throw Error('Explicit demo state required');
 const file=settingsPath+'.archived-tasks.json';
 const defaults=[1,2].map(n=>({id:'rea-demo-archived-'+n,title:'REA archived demo '+n,archived:true,created_at:1792022400,updated_at:1792022400,task_status_display:{environment_label:'Demo environment'}}));
 const rows=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):defaults;
 if(viewer){
  if(method!=='GET')throw Error('Unsupported archived viewer method');
  const row=rows.find(r=>r.id===viewer[1]);if(!row)throw Error('Unknown demo task');
  const number=row.id.slice(-1),userId='rea-archive-user-'+number,assistantId='rea-archive-assistant-'+number;
  const user={id:userId,previous_turn_id:null,created_at:row.created_at,role:'user',
   input_items:[{type:'message',role:'user',content:[{content_type:'text',text:'Review this archived demo conversation.'}]}]};
  const assistant={id:assistantId,previous_turn_id:userId,created_at:row.created_at+1,role:'assistant',
   turn_status:'completed',discarded:false,conversation_id:row.id,environment:null,error:null,
   output_items:[{type:'message',role:'assistant',content:[{content_type:'text',text:'This archived conversation uses the original cloud viewer. Its content is synthetic.'}]}],
   thread_events:{events:[]}};
  if(viewer[3]){if(viewer[3]!==userId&&viewer[3]!==assistantId)throw Error('Unknown demo turn');return {turn:viewer[3]===userId?user:assistant};}
  if(viewer[2])return {turn_mapping:{[userId]:{turn:user},[assistantId]:{turn:assistant}}};
  return {task:{...row,has_unread_turn:false},current_user_turn:user,current_assistant_turn:assistant,current_diff_task_turn:null};
 }
 if(search){if(method!=='GET')throw Error('Unsupported archive search method');const query=url.searchParams.get('query')||'';if(query.length>1000)throw Error('Demo query too long');return {items:url.searchParams.get('cursor')?[]:rows.filter(r=>(r.title+' '+r.task_status_display.environment_label).toLowerCase().includes(query.toLowerCase())),cursor:null};}
 if(list){if(method!=='GET')throw Error('Unsupported archive list method');return {items:url.searchParams.get('cursor')?[]:rows.filter(r=>r.archived),cursor:null};}
 if(method!=='POST')throw Error('Unsupported archive mutation');
 const row=rows.find(r=>r.id===action[1]);if(!row)throw Error('Unknown demo task');row.archived=action[2]==='archive';
 const pending=file+'.pending';let created=false;
 try{fs.writeFileSync(pending,JSON.stringify(rows)+'\n',{flag:'wx'});created=true;fs.renameSync(pending,file);}catch(error){if(created){try{fs.unlinkSync(pending);}catch{}}throw error;}
 return {};
}
module.exports={demoArchivedTasksHttp};
