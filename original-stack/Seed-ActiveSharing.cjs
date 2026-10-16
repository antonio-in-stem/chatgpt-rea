// Seed a counterparty acceptance event only in an explicit credential-free demo store.
const fs=require('node:fs'),path=require('node:path');
function activeSpaceGrant(profile){
 if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
 const root=path.join(__dirname,'state',profile);
 if(fs.existsSync(path.join(root,'codex-home','auth.json')))throw Error('Credential-free demo required');
 const file=path.join(root,'demo-pages.json');
 if(fs.lstatSync(file).isSymbolicLink())throw Error('Demo store cannot be a symlink');
 const state=JSON.parse(fs.readFileSync(file,'utf8'));
 const space=state.spaces?.find(e=>e.name==='Original Space demo'&&!e.deleted_at);
 const page=state.items?.find(e=>e.metadata.page_id===space?.root_page_id&&!e.metadata.deleted_at);
 if(!page||page.metadata.creator_account_user_id!=='rea-demo-user'||(page.shares||[]).length)throw Error('Unshared synthetic space required');
 const sequence=(state.shareSequence??0)+1;if(!Number.isSafeInteger(sequence))throw Error('Invalid share sequence');
 const grant={share_id:'rea-share-'+sequence,recipient:{recipient_type:'principal',principal_type:'user',principal_id:'rea-demo-collaborator'},role_id:'role-library-folder-viewer',status:'active',inviter:{principal_id:'rea-demo-user'},recipient_display_name:'Demo collaborator',recipient_email:'collaborator@example.invalid',recipient_avatar_url:null};
 page.shares=[grant];state.shareSequence=sequence;
 const pending=file+'.active-sharing.pending';let owned=false;
 try{fs.writeFileSync(pending,JSON.stringify(state)+'\n',{flag:'wx'});owned=true;fs.renameSync(pending,file);}finally{if(owned&&fs.existsSync(pending))fs.unlinkSync(pending);}
 return {spaceId:space.id,pageId:page.metadata.page_id,shareId:grant.share_id};
}
module.exports={activeSpaceGrant};
if(require.main===module)console.log(JSON.stringify(activeSpaceGrant(process.argv[2])));
