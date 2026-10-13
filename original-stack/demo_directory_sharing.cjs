// Synthetic pending invitations for the original Library folder sharing dialog.
// No email delivery or real principals; Pages/Spaces use a separate contract.
function demoDirectorySharing(method,url,body,state,persist){
 const route=url.pathname,resolve=route==='/sharing/recipients/resolve'&&method==='POST';
 const match=route.match(/^\/files\/library\/directories\/(rea-directory-[1-9][0-9]*)\/(sharing-state|shares|effective-access)(?:\/(rea-directory-share-[1-9][0-9]*))?$/);
 if(!resolve&&!match)return null;
 const parse=()=>{if(typeof body!=='string'||body.length>65536)throw Error('Expected sharing JSON');const value=JSON.parse(body);if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid sharing body');return value;};
 const email='collaborator@example.invalid';
 if(resolve){const input=parse();if(Object.keys(input).some(k=>k!=='email')||typeof input.email!=='string')throw Error('Invalid recipient request');return {eligible:input.email.trim().toLowerCase()===email};}
 const folder=state.directories?.find(d=>d.id===match[1]);if(!folder)throw Error('Unknown demo directory');
 const resource={resource_type:'library_folder',resource_id:folder.id},owner={principal_type:'user',principal_id:'rea-demo-user'};
 const roles=['role-library-folder-viewer','role-library-folder-commenter','role-library-folder-editor'];
 const shares=folder.shares??[],leaf=match[2],shareId=match[3];
 if(method==='GET'&&!shareId){
  if(url.searchParams.has('cursor'))throw Error('Unexpected demo sharing cursor');
  if(leaf==='sharing-state')return {resource,owner:{principal:owner,display_name:'Demo',email:'demo@example.invalid',avatar_url:null},viewer:{principal:owner,display_name:'Demo',email:'demo@example.invalid',avatar_url:null,role_id:roles[2]},link_access:'collaborators_only',capabilities:{direct_sharing_capabilities_version:1,can_invite:true,can_manage_access:true,can_request_access:false,can_manage_access_requests:false}};
  if(leaf==='shares')return {resource,owner,shares,next_cursor:null,allowed_roles:roles};
  if(leaf==='effective-access'){
   // Invitations stay pending in this demo; no access has been accepted.
   // Ancestor grants have not been modeled, so do not assert completeness for them.
   let parent=folder.parent_directory_id,complete=true;const seen=new Set([folder.id]);
   while(parent!=null){if(seen.has(parent))throw Error('Directory hierarchy cycle');seen.add(parent);const ancestor=state.directories.find(d=>d.id===parent);if(!ancestor)throw Error('Unknown parent');if(ancestor.shares?.length)complete=false;parent=ancestor.parent_directory_id;}
   return {resource,owner,collaborators:[],complete};
  }
 }
 if(leaf==='shares'&&method==='POST'&&!shareId){
  const input=parse();if(Object.keys(input).some(k=>!['recipient','role_id','expected_invitation_id'].includes(k)))throw Error('Unsupported invitation field');
  if(!roles.includes(input.role_id))throw Error('Unsupported folder role');
  const recipient=input.recipient;if(!recipient||recipient.recipient_type!=='email'||recipient.email!==email||Object.keys(recipient).some(k=>!['recipient_type','email'].includes(k)))throw Error('Only synthetic email recipient allowed');
  const existing=shares.find(s=>s.recipient.email===email);
  if(input.expected_invitation_id!=null&&input.expected_invitation_id!==existing?.share_id)throw Error('Stale invitation');
  if(existing){if(existing.role_id===input.role_id)return existing;if(input.expected_invitation_id!==existing.share_id)throw Error('Expected current invitation for role replacement');}
  const sequence=(state.directoryShareSequence??0)+1;
  const grant={resource,share_id:'rea-directory-share-'+sequence,recipient:{...recipient},role_id:input.role_id,status:'pending',recipient_email:email,recipient_display_name:'Demo collaborator',recipient_avatar_url:null};
  state.directoryShareSequence=sequence;folder.shares=[...shares.filter(s=>s.share_id!==existing?.share_id),grant];persist();return grant;
 }
 if(leaf==='shares'&&method==='DELETE'&&shareId){const grant=shares.find(s=>s.share_id===shareId);if(!grant)throw Error('Unknown folder invitation');folder.shares=shares.filter(s=>s.share_id!==shareId);persist();return {};}
 throw Error('Unsupported demo folder sharing operation');
}
module.exports={demoDirectorySharing};
