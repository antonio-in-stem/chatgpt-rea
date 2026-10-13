// Explicit synthetic inbox fixture; never replaces an existing notification store.
const fs=require('node:fs'),path=require('node:path');
const [stateName,pageId]=process.argv.slice(2);
if(!/^demo-[a-zA-Z0-9_-]+$/.test(stateName||'')||!/^rea-page-[1-9][0-9]*$/.test(pageId||''))throw Error('Explicit demo profile and page required');
const state=path.join(__dirname,'state',stateName);
if(fs.existsSync(path.join(state,'codex-home','auth.json')))throw Error('Credential-free demo required');
const pages=JSON.parse(fs.readFileSync(path.join(state,'demo-pages.json'),'utf8'));
const page=pages.items.find(x=>x.metadata.page_id===pageId&&!x.metadata.deleted_at&&!x.permanentlyDeleted);
if(!page||!page.metadata.title)throw Error('Named live demo page required');
const now=Date.now(),items=[1,2].map(n=>({notification_id:'rea-mention-'+n,page_id:pageId,page_title:page.metadata.title,block_id:null,thread_id:null,message_id:null,actor_account_user_id:'rea-demo-user',actor_display_name:'Demo',created_at:new Date(now-(2-n)*60000).toISOString(),read_at:null}));
fs.writeFileSync(path.join(state,'demo-mentions.json'),JSON.stringify({version:1,items},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({syntheticMentions:items.length,page:pageId}));
