// Archived cloud-task list/restore contract used by original DataControlsSettings.
// This does not implement the cloud task conversation/viewer itself.
function demoArchivedTasksHttp(method,url,body,settingsPath,fs){
 if(url.origin!=='https://chatgpt.com')return null;
 const route=url.pathname,list=route==='/wham/tasks/list'&&url.searchParams.get('task_filter')==='archived';
 const action=route.match(/^\/wham\/tasks\/(rea-demo-archived-[12])\/(recover|archive)$/);
 if(!list&&!action)return null;
 if(!settingsPath)throw Error('Explicit demo state required');
 const file=settingsPath+'.archived-tasks.json';
 const defaults=[1,2].map(n=>({id:'rea-demo-archived-'+n,title:'REA archived demo '+n,archived:true,created_at:1792022400,updated_at:1792022400,task_status_display:{environment_label:'Demo environment'}}));
 const rows=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):defaults;
 if(list){if(method!=='GET')throw Error('Unsupported archive list method');return {items:url.searchParams.get('cursor')?[]:rows.filter(r=>r.archived),cursor:null};}
 if(method!=='POST')throw Error('Unsupported archive mutation');
 const row=rows.find(r=>r.id===action[1]);if(!row)throw Error('Unknown demo task');row.archived=action[2]==='archive';
 const pending=file+'.pending';let created=false;
 try{fs.writeFileSync(pending,JSON.stringify(rows)+'\n',{flag:'wx'});created=true;fs.renameSync(pending,file);}catch(error){if(created){try{fs.unlinkSync(pending);}catch{}}throw error;}
 return {};
}
module.exports={demoArchivedTasksHttp};
