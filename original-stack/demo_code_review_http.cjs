// Source contracts: settings-9cb776a9f000.js Rt/zt/Bt/Vt; app-initial gBt/OGt.
// Synthetic fixtures only. No network or real repository mutation.
function demoCodeReviewHttp(method,url,body,settingsPath,fs){
 if(url.origin!=='https://chatgpt.com')return null;
 const connectorId='connector_76869538009648d5b282a4bb21c3d157';
 const connectorPath='/aip/connectors/'+connectorId;
 const route=url.pathname;
 const recognized=route===connectorPath||route===connectorPath+'/link'||route==='/ps/connectors/by-template'||route==='/aip/connectors/links/list_accessible'||route==='/wham/settings/code_review'||route==='/wham/settings/code_review_search'||route.startsWith('/wham/settings/code_review/');
 if(!recognized)return null;
 if(!settingsPath)throw Error('Explicit demo state required');
 const connector={id:connectorId,name:'GitHub Demo',status:'ENABLED',labels:{},template_id:'templated_apps_GitHubEnterprise'};
 const link={id:'rea-demo-github-link',connector_id:connectorId,status:'CONNECTED'};
 if(method==='GET'&&route===connectorPath)return connector;
 if(method==='GET'&&route===connectorPath+'/link')return {link};
 if(method==='GET'&&route==='/ps/connectors/by-template')return {connectors:[]};
 if(method==='POST'&&route==='/aip/connectors/links/list_accessible')return {links:[link]};
 const file=settingsPath+'.code-review.json';
 const defaults=['demo-app','demo-components'].map(name=>({repository:{id:'github-rea-demo/'+name,repository_full_name:'rea-demo/'+name,archived:false,permissions:{admin:true,push:true}},review_preference:'never',global_review_preference:'review_if_enabled',funding_generation:0,funding_authorization_required:false,code_review_trigger_policy:null,exhaustive_code_review:null,security_review:null}));
 const current=()=>fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):defaults;
 if(method==='GET'&&(route==='/wham/settings/code_review_search'||route==='/wham/settings/code_review')){
  const query=(url.searchParams.get('query')||'').replace('archived:false','').trim().toLowerCase();
  const page=Number(url.searchParams.get('page')||1);
  return {repo_review_settings:page===1?current().filter(r=>r.repository.repository_full_name.toLowerCase().includes(query)):[],next_token:null};
 }
 if(method==='GET'&&route.startsWith('/wham/settings/code_review/')){
  const id=decodeURIComponent(route.slice('/wham/settings/code_review/'.length));
  const row=current().find(r=>r.repository.id===id);if(!row)throw Error('Unknown demo repository');return row;
 }
 if(method!=='PATCH'||route!=='/wham/settings/code_review')throw Error('Unsupported demo review operation');
 if(typeof body!=='string'||body.length>8192)throw Error('Expected bounded JSON body');
 const patch=JSON.parse(body);
 if(!patch||Object.keys(patch).length!==1||!Array.isArray(patch.repo_review_settings)||patch.repo_review_settings.length!==1)throw Error('Expected one repository update');
 const update=patch.repo_review_settings[0];
 const allowed=['repository','review_preference','global_review_preference','funding_generation','code_review_trigger_policy','exhaustive_code_review'];
 if(!update||Object.keys(update).some(k=>!allowed.includes(k)))throw Error('Unsupported review field');
 const rows=current(),index=rows.findIndex(r=>r.repository.id===update.repository);
 if(index<0)throw Error('Unknown demo repository');
 if(update.funding_generation!==rows[index].funding_generation)throw Error('Stale review generation');
 const {repository,funding_generation,...changes}=update,next={...rows[index],...changes};
 if(!['never','team'].includes(next.review_preference)||!['never_review','review_everyone','review_if_enabled'].includes(next.global_review_preference)||![null,'pr_open','every_push','smart_detect'].includes(next.code_review_trigger_policy)||![null,true,false].includes(next.exhaustive_code_review))throw Error('Invalid review preference');
 rows[index]=next;
 const pending=file+'.pending';let created=false;
 try{fs.writeFileSync(pending,JSON.stringify(rows)+'\n',{flag:'wx'});created=true;fs.renameSync(pending,file);}catch(error){if(created){try{fs.unlinkSync(pending);}catch{}}throw error;}
 return {repo_review_settings:[next]};
}
module.exports={demoCodeReviewHttp};
