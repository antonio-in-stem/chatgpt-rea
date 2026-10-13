// Original Page mentions inbox contract, backed only by explicit local demo fixtures.
function demoMentionsHttp(method,url,settingsPath,fs,path){
 if(url.origin!=='https://chatgpt.com')return null;
 const base='/pages/mentions/inbox',id=url.pathname.match(/^\/pages\/mentions\/inbox\/(rea-mention-[1-9][0-9]*)\/read$/)?.[1];
 if(!(method==='GET'&&url.pathname===base)&&!(method==='POST'&&id))return null;
 if(!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')throw Error('Explicit demo state required');
 const file=path.join(path.dirname(settingsPath),'demo-mentions.json');
 const state=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{version:1,items:[]};
 if(state.version!==1||!Array.isArray(state.items)||new Set(state.items.map(x=>x.notification_id)).size!==state.items.length||state.items.some(x=>!/^rea-mention-[1-9][0-9]*$/.test(x.notification_id)||!/^rea-page-[1-9][0-9]*$/.test(x.page_id)||typeof x.page_title!=='string'||!Number.isFinite(Date.parse(x.created_at))||(x.read_at!=null&&!Number.isFinite(Date.parse(x.read_at)))))throw Error('Invalid demo mentions store');
 if(method==='POST'){
  const item=state.items.find(x=>x.notification_id===id);if(!item)throw Error('Unknown demo mention');
  if(item.read_at==null){item.read_at=new Date().toISOString();const temporary=file+'.pending';let owned=false;try{fs.writeFileSync(temporary,JSON.stringify(state),{flag:'wx'});owned=true;fs.renameSync(temporary,file);}finally{if(owned&&fs.existsSync(temporary))fs.unlinkSync(temporary);}}
  return {};
 }
 const query=url.searchParams,rawLimit=query.get('limit')??'20',unread=query.get('unread_only')??'false';
 if(!/^[1-9][0-9]*$/.test(rawLimit)||Number(rawLimit)>100||!['true','false'].includes(unread))throw Error('Invalid inbox query');
 const sorted=[...state.items].sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at)||a.notification_id.localeCompare(b.notification_id));
 const cursor=query.get('cursor');let offset=0;
 if(cursor){const prefix='mention:'+unread+':';if(!cursor.startsWith(prefix))throw Error('Invalid inbox cursor');const index=sorted.findIndex(x=>x.notification_id===cursor.slice(prefix.length));if(index<0)throw Error('Unknown inbox cursor');offset=index+1;}
 const remaining=sorted.slice(offset).filter(x=>unread!=='true'||x.read_at==null),items=remaining.slice(0,Number(rawLimit));
 return {items,next_cursor:remaining.length>items.length?'mention:'+unread+':'+items.at(-1).notification_id:null};
}
module.exports={demoMentionsHttp};
