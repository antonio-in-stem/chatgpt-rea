// Original profile identity and editor contracts; isolated synthetic profile only.
function demoProfileHttp(method,url,body,settingsPath,fs,picture){
 if(url.origin!=='https://chatgpt.com'||!['/profiles/me','/wham/profiles/me'].includes(url.pathname))return null;
 if(!settingsPath||typeof picture!=='string'||!picture.startsWith('data:image/png;base64,'))throw Error('Explicit demo profile identity required');
 const file=settingsPath+'.profile.json';
 const defaults={display_name:'REA Demo',username:'rea_demo',description:'',photo_frame_style:'circle'};
 const validate=p=>{if(!p||typeof p!=='object'||Array.isArray(p)||Object.keys(p).some(k=>!Object.hasOwn(defaults,k)))throw Error('Unsupported profile field');if(typeof p.display_name!=='string'||!p.display_name.trim()||p.display_name.length>100)throw Error('Invalid display name');if(typeof p.username!=='string'||!/^[a-z0-9._-]{3,20}$/.test(p.username))throw Error('Invalid username');if(typeof p.description!=='string'||p.description.length>1000)throw Error('Invalid description');if(!['circle','scalloped_circle','rounded_square','oval','scalloped_oval'].includes(p.photo_frame_style))throw Error('Invalid photo shape');return p;};
 let profile=validate(fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):defaults);
 if(method==='PATCH'){
  if(typeof body!=='string'||body.length>8192)throw Error('Expected bounded JSON body');const patch=JSON.parse(body);
  if(!patch||typeof patch!=='object'||Array.isArray(patch)||!Object.keys(patch).length||Object.keys(patch).some(k=>!Object.hasOwn(defaults,k)))throw Error('Unsupported profile patch');
  profile=validate({...profile,...patch});const pending=file+'.pending';let created=false;
  try{fs.writeFileSync(pending,JSON.stringify(profile)+'\n',{flag:'wx'});created=true;fs.renameSync(pending,file);}catch(error){if(created){try{fs.unlinkSync(pending);}catch{}}throw error;}
 }else if(method!=='GET')throw Error('Unsupported profile operation');
 const details={...profile,profile_picture_url:picture};
 if(url.pathname==='/profiles/me')return {is_self:true,user_id:'rea-demo-user',profile_details:details};
 return {profile:details,metadata:{stats_error:null},stats:{fast_mode_usage_percentage:0,top_invocations:[],most_used_reasoning_effort:null,most_used_reasoning_effort_percentage:0,unique_skills_used:0,total_skills_used:0,total_threads:0,daily_usage_buckets:[],current_streak_days:0,longest_streak_days:0,longest_running_turn_sec:0,peak_daily_tokens:0,lifetime_tokens:0}};
}
module.exports={demoProfileHttp};
