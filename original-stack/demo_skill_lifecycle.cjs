// Original host shapes: main:66071/66082/66116; synthetic state only.
function demoSkillLifecycle(method,params,settingsPath,fs,path){
 if(params.hostId!=null&&params.hostId!=='local')throw Error('Only local demo skills');
 if(!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo settings path required');
 const file=path.join(path.dirname(settingsPath),'demo-skills.json');
 const state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{};
 if(method==='catalog')return {skills:[{id:'rea-ui-demo',name:'rea-ui-demo',description:'Synthetic skill for inspecting the original frontend. No executable actions.',shortDescription:'Inspect original skill controls',iconSmall:null,iconLarge:null,repoPath:'skills/rea-ui-demo'}],fetchedAt:1791849600000,source:'bundled',repoRoot:'C:/REA-Demo',error:null};
 if(method==='install'){
  if(params.skillId!=='rea-ui-demo'||params.repoPath!=='skills/rea-ui-demo'||params.installRoot!=null)throw Error('Only synthetic default destination');
 }else if(method==='remove'){
  if(typeof params.skillPath!=='string'||params.skillPath.replace(/\\/g,'/')!=='C:/REA-Demo/skills/rea-ui-demo/SKILL.md')throw Error('Only synthetic skill removal');
 }else throw Error('Unknown demo skill lifecycle');
 const installed=method==='install', next={enabled:state.enabled??true,installed};
 const temporary=path.join(path.dirname(file),'demo-skills.pending');let owned=false;
 try{const fd=fs.openSync(temporary,'wx');owned=true;try{fs.writeFileSync(fd,JSON.stringify(next));}finally{fs.closeSync(fd);}fs.renameSync(temporary,file);}
 finally{if(owned&&fs.existsSync(temporary))fs.unlinkSync(temporary);}
 return {success:true,[installed?'destination':'deletedPath']:'C:/REA-Demo/skills/rea-ui-demo',error:null};
}
module.exports={demoSkillLifecycle};
