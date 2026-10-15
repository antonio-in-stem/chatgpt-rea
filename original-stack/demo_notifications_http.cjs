// Source: notifications-settings-5f0e05f81547.js Ye/Xe/Qe.
// Categories/labels are explicit demo server data; renderer controls are unchanged.
function demoNotificationsHttp(method,url,body,settingsPath,fs){
 if(url.origin!=='https://chatgpt.com'||url.pathname!=='/notifications/settings')return null;
 if(!settingsPath)throw Error('Explicit demo state required');
 const file=settingsPath+'.notifications.json';
 const defaults={settings:[{category:'tasks',name:'Tasks',description:'Demo task notifications',options:[{channel:'push',name:'Push',enabled:true},{channel:'email',name:'Email',enabled:false}]}]};
 const current=()=>fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):defaults;
 if(method==='GET')return current();
 if(method!=='PATCH'||typeof body!=='string'||body.length>4096)throw Error('Expected bounded preference patch');
 const data=JSON.parse(body),object=x=>x&&typeof x==='object'&&!Array.isArray(x);
 if(!object(data)||Object.keys(data).length!==1||!object(data.updates)||!Object.keys(data.updates).length)throw Error('Invalid notification update');
 const next=current();
 for(const [category,changes] of Object.entries(data.updates)){
  const row=next.settings.find(s=>s.category===category);
  if(!row||!object(changes)||!Object.keys(changes).length)throw Error('Unknown notification category');
  for(const [channel,enabled] of Object.entries(changes)){const option=row.options.find(o=>o.channel===channel);if(!option||typeof enabled!=='boolean')throw Error('Invalid notification channel');option.enabled=enabled;}
 }
 const pending=file+'.pending';let created=false;
 try{fs.writeFileSync(pending,JSON.stringify(next)+'\n',{flag:'wx'});created=true;fs.renameSync(pending,file);}catch(error){if(created){try{fs.unlinkSync(pending);}catch{}}throw error;}
 return next;
}
module.exports={demoNotificationsHttp};
