// Original cloud-preferences HTTP boundary; all data stays in the demo profile.
function demoCloudPreferences(method,url,body,settingsPath,fs){
 if(url.origin!=='https://chatgpt.com')return null;
 const configRoute='/wham/settings/configs/user-preferences',userRoute='/wham/settings/user';
 if(![configRoute,userRoute].includes(url.pathname))return null;
 if(!settingsPath)throw Error('Explicit demo state required');
 // Synthetic server-provided choices; the original renderer performs validation/preview.
 const config={branch_format_max_length:120,branch_format_special_values:[{value:'{task}',example:'update-button',char_count:32}]};
 if(method==='GET'&&url.pathname===configRoute)return config;
 const file=settingsPath+'.cloud-preferences.json';
 function validate(value){
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!['git_diff_mode','branch_format'].includes(k)))throw Error('Unknown cloud preference');
  if(!['unified','split'].includes(value.git_diff_mode))throw Error('Invalid diff mode');
  const branch=value.branch_format;
  if(typeof branch!=='string'||branch.length>512||!branch.includes('{task}')||branch.startsWith('/')||!/^[-a-zA-Z0-9._/]+$/.test(branch.replaceAll('{task}','x'.repeat(32)))||branch.replaceAll('{task}','x'.repeat(32)).length>120)throw Error('Invalid branch format');
  return value;
 }
 const current=()=>validate(fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{git_diff_mode:'unified',branch_format:'codex/{task}'});
 if(method==='GET'&&url.pathname===userRoute)return current();
 if(method!=='PATCH'||url.pathname!==userRoute)throw Error('Unsupported cloud preference operation');
 if(typeof body!=='string'||body.length>4096)throw Error('Expected bounded JSON body');
 const patch=JSON.parse(body);
 if(!patch||typeof patch!=='object'||Array.isArray(patch)||!Object.keys(patch).length||Object.keys(patch).some(k=>!['git_diff_mode','branch_format'].includes(k)))throw Error('Invalid preference patch');
 const next=validate({...current(),...patch}),temporary=file+'.pending';let created=false;
 try{fs.writeFileSync(temporary,JSON.stringify(next)+'\n',{flag:'wx'});created=true;fs.renameSync(temporary,file);}
 catch(error){if(created){try{fs.unlinkSync(temporary);}catch{}}throw error;}
 return next;
}
module.exports={demoCloudPreferences};
