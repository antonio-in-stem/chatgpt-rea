// Local invitation lifecycle consumed by the original parental-controls renderer.
// No emails, SMS, account links or real family settings are changed.
function demoFamilyHttp(method,url,body,settingsPath,fs){
 if(url.origin!=='https://chatgpt.com'||!(url.pathname==='/amphora'||url.pathname.startsWith('/amphora/')))return null;
 if(!settingsPath)throw Error('Explicit demo state required');
 const route=decodeURIComponent(url.pathname),id='rea-demo-family',file=settingsPath+'.family.json';
 const read=()=>fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{id:null,role:null,items:[]};
 const save=state=>{const pending=file+'.pending';let created=false;try{fs.writeFileSync(pending,JSON.stringify(state)+'\n',{flag:'wx'});created=true;fs.renameSync(pending,file);}catch(error){if(created){try{fs.unlinkSync(pending);}catch{}}throw error;}};
 const state=read();
 if(method==='GET'&&route==='/amphora')return {id:state.id,role:state.role};
 if(method==='GET'&&route==='/amphora/notifications')return {items:[],cursor:null};
 if(method==='GET'&&route==='/amphora/u18_graduation_unlink_setting_notices')return {notices:[]};
 const memberRoute='/amphora/'+id+'/members';
 if(method==='GET'&&route===memberRoute){if(state.id!==id)throw Error('No demo family');return {items:state.items,total:state.items.length};}
 if(method!=='POST')throw Error('Demo family contract not implemented: '+route);
 if(typeof body!=='string'||body.length>4096)throw Error('Expected bounded JSON body');
 const data=JSON.parse(body);
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Expected object');
 if(route==='/amphora'){
  if(Object.keys(data).length!==1||!['parent','teen'].includes(data.role))throw Error('Invalid family role');
  if(state.id)return {id:state.id,role:state.role};
  state.id=id;state.role=data.role==='parent'?'owner':'member_role';state.items=[{user_id:'rea-demo-user',name:'Demo',email:'demo@example.invalid',account_identifier:'demo@example.invalid',role:state.role,status:'accepted'}];save(state);return {id,role:state.role};
 }
 if(state.id!==id)throw Error('No demo family');
 if(route===memberRoute){
  if(Object.keys(data).length!==1||!Array.isArray(data.members)||data.members.length!==1)throw Error('One demo invitation required');
  const member=data.members[0];
  if(!member||Object.keys(member).some(k=>!['account_identifier','role'].includes(k))||!['teen','parent'].includes(member.role)||typeof member.account_identifier!=='string'||!/^[-a-zA-Z0-9._+]+@example\.invalid$/.test(member.account_identifier))throw Error('Use a synthetic example.invalid email');
  if((state.role==='owner')!==(member.role==='teen'))throw Error('Invalid invitation role');
  if(state.items.some(m=>m.account_identifier.toLowerCase()===member.account_identifier.toLowerCase()))return {items:state.items,total:state.items.length};
  if(state.items.length>=20)throw Error('Demo family limit');
  state.items.push({user_id:null,name:null,email:member.account_identifier,account_identifier:member.account_identifier,role:member.role==='teen'?'child':'owner',status:'invited'});save(state);return {items:state.items,total:state.items.length};
 }
 if(route===memberRoute+'/resend'||route==='/amphora/'+id+'/remove'){
  const key=data.email?'email':'account_identifier';
  if(Object.keys(data).length!==1||typeof data[key]!=='string')throw Error('One invitation identifier required');
  const index=state.items.findIndex(m=>m.status==='invited'&&m.account_identifier===data[key]);
  if(index<0)throw Error('Unknown demo invitation');
  if(route.endsWith('/remove')){state.items.splice(index,1);save(state);}return {success:true};
 }
 throw Error('Demo family operation not implemented: '+route);
}
module.exports={demoFamilyHttp};
