// Original profile identity and editor contracts; isolated synthetic profile only.
function demoProfileHttp(method,url,body,settingsPath,fs,picture,headers={}){
 if(url.origin!=='https://chatgpt.com'||!['/profiles/me','/wham/profiles/me','/wham/profiles/me/photo'].includes(url.pathname))return null;
 if(!settingsPath||typeof picture!=='string'||!picture.startsWith('data:image/png;base64,'))throw Error('Explicit demo profile identity required');

 const file=settingsPath+'.profile.json',assetsFile=settingsPath+'.profile-photos.json';
 function save(file,value){const pending=file+'.pending';let created=false;try{fs.writeFileSync(pending,JSON.stringify(value)+'\n',{flag:'wx'});created=true;fs.renameSync(pending,file);}catch(error){if(created){try{fs.unlinkSync(pending);}catch{}}throw error;}}
 const assets=()=>fs.existsSync(assetsFile)?JSON.parse(fs.readFileSync(assetsFile,'utf8')):{};
 if(url.pathname==='/wham/profiles/me/photo'){
  if(method!=='POST')throw Error('Unsupported photo operation');
  const type=Object.entries(headers).find(([key])=>key.toLowerCase()==='content-type')?.[1];
  const boundary=typeof type==='string'&&/^multipart\/form-data; boundary=([-A-Za-z0-9]{1,100})$/.exec(type)?.[1];
  const bytes=ArrayBuffer.isView(body)?Buffer.from(body.buffer,body.byteOffset,body.byteLength):body instanceof ArrayBuffer?Buffer.from(body):null;
  if(!boundary||!bytes||bytes.length>2*1024*1024)throw Error('Invalid demo photo multipart');
  const split=bytes.indexOf('\r\n\r\n'),end=Buffer.from('\r\n--'+boundary+'--\r\n');
  if(split<0||split>1024||!bytes.subarray(-end.length).equals(end))throw Error('Invalid demo photo framing');
  const head=bytes.subarray(0,split).toString('utf8');
  if(!head.startsWith('--'+boundary+'\r\n')||!/^Content-Disposition: form-data; name="file"; filename="[^"\r\n]+"$/m.test(head.replaceAll('\r','')))throw Error('Expected one photo file');
  const mime=/\r\nContent-Type: (image\/(?:png|jpeg))$/.exec(head)?.[1];
  const image=bytes.subarray(split+4,bytes.length-end.length);
  if(!mime||image.includes(Buffer.from('\r\n--'+boundary)))throw Error('Unsupported photo parts');
  if(mime==='image/png'?!image.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):image.length<4||image[0]!==255||image[1]!==216||image[image.length-2]!==255||image[image.length-1]!==217)throw Error('Invalid photo signature');
  const pointer='rea-demo-photo-'+require('node:crypto').createHash('sha256').update(image).digest('hex');
  const stored=assets();stored[pointer]='data:'+mime+';base64,'+image.toString('base64');save(assetsFile,stored);
  return {asset_pointer:pointer};
 }

 const defaults={display_name:'REA Demo',username:'rea_demo',description:'',photo_frame_style:'circle',profile_asset_pointer:null};
 const validate=p=>{if(!p||typeof p!=='object'||Array.isArray(p)||Object.keys(p).some(k=>!Object.hasOwn(defaults,k)))throw Error('Unsupported profile field');if(typeof p.display_name!=='string'||!p.display_name.trim()||p.display_name.length>100)throw Error('Invalid display name');if(typeof p.username!=='string'||!/^[a-z0-9._-]{3,20}$/.test(p.username))throw Error('Invalid username');if(typeof p.description!=='string'||p.description.length>1000)throw Error('Invalid description');if(!['circle','scalloped_circle','rounded_square','oval','scalloped_oval'].includes(p.photo_frame_style))throw Error('Invalid photo shape');if(p.profile_asset_pointer!=null&&(!/^rea-demo-photo-[a-f0-9]{64}$/.test(p.profile_asset_pointer)||!Object.hasOwn(assets(),p.profile_asset_pointer)))throw Error('Unknown demo photo');return p;};
 let profile=validate(fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):defaults);
 if(method==='PATCH'){
  if(typeof body!=='string'||body.length>8192)throw Error('Expected bounded JSON body');const patch=JSON.parse(body);
  if(!patch||typeof patch!=='object'||Array.isArray(patch)||!Object.keys(patch).length||Object.keys(patch).some(k=>!Object.hasOwn(defaults,k)))throw Error('Unsupported profile patch');
  profile=validate({...profile,...patch});const pending=file+'.pending';let created=false;
  try{fs.writeFileSync(pending,JSON.stringify(profile)+'\n',{flag:'wx'});created=true;fs.renameSync(pending,file);}catch(error){if(created){try{fs.unlinkSync(pending);}catch{}}throw error;}
 }else if(method!=='GET')throw Error('Unsupported profile operation');
 const details={...profile,profile_picture_url:profile.profile_asset_pointer?assets()[profile.profile_asset_pointer]:picture};
 if(url.pathname==='/profiles/me')return {is_self:true,user_id:'rea-demo-user',viewer_access:{can_edit:true},profile_details:details};
 return {profile:details,metadata:{stats_error:null},stats:{fast_mode_usage_percentage:0,top_invocations:[],most_used_reasoning_effort:null,most_used_reasoning_effort_percentage:0,unique_skills_used:0,total_skills_used:0,total_threads:0,daily_usage_buckets:[],current_streak_days:0,longest_streak_days:0,longest_running_turn_sec:0,peak_daily_tokens:0,lifetime_tokens:0}};
}
module.exports={demoProfileHttp};
