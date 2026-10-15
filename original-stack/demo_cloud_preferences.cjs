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
 const defaults={git_diff_mode:'unified',branch_format:'codex/{task}',code_review_preference:'repo_default',code_review_trigger_policy:'pr_open',exhaustive_code_review:false,allow_credits_for_code_reviews:false};
 const keys=Object.keys(defaults);
 function validate(value){
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!keys.includes(k)))throw Error('Unknown cloud preference');
  if(!['unified','split'].includes(value.git_diff_mode))throw Error('Invalid diff mode');
  const branch=value.branch_format;
  if(typeof branch!=='string'||branch.length>512||!branch.includes('{task}')||branch.startsWith('/')||!/^[-a-zA-Z0-9._/]+$/.test(branch.replaceAll('{task}','x'.repeat(32)))||branch.replaceAll('{task}','x'.repeat(32)).length>120)throw Error('Invalid branch format');
  if(!['always','repo_default'].includes(value.code_review_preference))throw Error('Invalid review preference');
  if(!['pr_open','every_push','smart_detect'].includes(value.code_review_trigger_policy))throw Error('Invalid review trigger');
  for(const key of ['exhaustive_code_review','allow_credits_for_code_reviews'])if(typeof value[key]!=='boolean')throw Error('Invalid review toggle');
  return value;
 }
 const current=()=>validate({...defaults,...(fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{})});
 if(method==='GET'&&url.pathname===userRoute)return current();
 if(method!=='PATCH'||url.pathname!==userRoute)throw Error('Unsupported cloud preference operation');
 if(typeof body!=='string'||body.length>4096)throw Error('Expected bounded JSON body');
 const patch=JSON.parse(body);
 if(!patch||typeof patch!=='object'||Array.isArray(patch)||!Object.keys(patch).length||Object.keys(patch).some(k=>!keys.includes(k)))throw Error('Invalid preference patch');
 const next=validate({...current(),...patch}),temporary=file+'.pending';let created=false;
 try{fs.writeFileSync(temporary,JSON.stringify(next)+'\n',{flag:'wx'});created=true;fs.renameSync(temporary,file);}
 catch(error){if(created){try{fs.unlinkSync(temporary);}catch{}}throw error;}
 return next;
}
module.exports={demoCloudPreferences};
