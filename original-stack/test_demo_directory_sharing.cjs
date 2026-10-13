'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {demoPagesHttp}=require('./demo_pages_http.cjs');
function fixture(run){const dir=fs.mkdtempSync(path.join(os.tmpdir(),'rea-folder-share-')),settings=path.join(dir,'demo-sidebar-settings.json');const call=(method,route,input)=>demoPagesHttp(method,new URL('https://chatgpt.com'+route),input===undefined?undefined:JSON.stringify(input),settings,fs,path);try{run(call,path.join(dir,'demo-pages.json'));}finally{fs.rmSync(dir,{recursive:true,force:true});}}
test('folder sharing preserves its distinct original scope and synthetic email contracts',()=>fixture((call,file)=>{
 const folder=call('POST','/files/library/directories',{name:'Folder'}),base='/files/library/directories/'+folder.id;
 const sharing=call('GET',base+'/sharing-state');assert.equal(sharing.resource.resource_type,'library_folder');assert.equal(sharing.resource.resource_id,folder.id);assert.equal(sharing.owner.principal.principal_id,sharing.viewer.principal.principal_id);assert.equal(sharing.capabilities.direct_sharing_capabilities_version,1);assert.equal(sharing.link_access,'collaborators_only');
 assert.equal(call('GET',base+'/effective-access').complete,true);assert.deepEqual(call('GET',base+'/shares').shares,[]);
 assert.deepEqual(call('POST','/sharing/recipients/resolve',{email:'Collaborator@example.invalid'}),{eligible:true});assert.deepEqual(call('POST','/sharing/recipients/resolve',{email:'someone@example.invalid'}),{eligible:false});
 const recipient={recipient_type:'email',email:'collaborator@example.invalid'},input={recipient,role_id:'role-library-folder-viewer'};
 const grant=call('POST',base+'/shares',input);assert.equal(grant.status,'pending');assert.deepEqual(grant.resource,sharing.resource);assert.deepEqual(call('POST',base+'/shares',input),grant);
 const changed=call('POST',base+'/shares',{...input,role_id:'role-library-folder-editor',expected_invitation_id:grant.share_id});assert.notEqual(changed.share_id,grant.share_id);assert.equal(call('GET',base+'/shares').shares.length,1);assert.equal(call('GET',base+'/shares').shares[0].role_id,'role-library-folder-editor');
 assert.deepEqual(call('GET',base+'/effective-access').collaborators,[]);
 const child=call('POST','/files/library/directories',{name:'Child',parent_directory_id:folder.id});assert.equal(call('GET','/files/library/directories/'+child.id+'/effective-access').complete,false);
 call('DELETE',base+'/shares/'+changed.share_id);assert.deepEqual(call('GET',base+'/shares').shares,[]);assert.equal(call('GET','/files/library/directories/'+child.id+'/effective-access').complete,true);
}));
test('folder invitations reject unknown recipients, stale updates and preserve writes atomically',()=>fixture((call,file)=>{
 const folder=call('POST','/files/library/directories',{name:'Folder'}),base='/files/library/directories/'+folder.id,recipient={recipient_type:'email',email:'collaborator@example.invalid'},input={recipient,role_id:'role-library-folder-viewer'};
 const before=fs.readFileSync(file);fs.writeFileSync(file+'.pending','foreign');assert.throws(()=>call('POST',base+'/shares',input));assert.deepEqual(fs.readFileSync(file),before);assert.equal(fs.readFileSync(file+'.pending','utf8'),'foreign');fs.unlinkSync(file+'.pending');
 const grant=call('POST',base+'/shares',input),current=fs.readFileSync(file);
 assert.throws(()=>call('POST',base+'/shares',{...input,role_id:'role-library-folder-editor'}),/current invitation/);
 assert.throws(()=>call('POST',base+'/shares',{...input,expected_invitation_id:'old'}),/Stale/);
 assert.throws(()=>call('POST',base+'/shares',{...input,recipient:{recipient_type:'email',email:'other@example.invalid'}}),/synthetic/);
 assert.throws(()=>call('POST',base+'/shares',{...input,role_id:'owner'}),/role/);
 assert.throws(()=>call('GET','/files/library/directories/rea-directory-999/shares'),/Unknown/);assert.deepEqual(fs.readFileSync(file),current);
 fs.writeFileSync(file+'.pending','foreign');assert.throws(()=>call('DELETE',base+'/shares/'+grant.share_id));assert.deepEqual(fs.readFileSync(file),current);
}));

test('file sharing keeps resource roles and invitations isolated from parent folders',()=>fixture((call,file)=>{
 const parent=call('POST','/files/library/directories',{name:'Parent'}),state=JSON.parse(fs.readFileSync(file));state.libraryFiles=[{id:'libfile-rea-1',file_id:'file-rea-upload-1',name:'demo.txt',parent_directory_id:parent.id}];fs.writeFileSync(file,JSON.stringify(state));
 const base='/files/library/files/libfile-rea-1',folderBase='/files/library/directories/'+parent.id,recipient={recipient_type:'email',email:'collaborator@example.invalid'};
 const sharing=call('GET',base+'/sharing-state');assert.equal(sharing.resource.resource_type,'library_file');assert.equal(sharing.viewer.role_id,'role-library-file-editor');assert.equal(call('GET',base+'/effective-access').complete,true);
 assert.throws(()=>call('POST',base+'/shares',{recipient,role_id:'role-library-folder-editor'}),/role/);
 const grant=call('POST',base+'/shares',{recipient,role_id:'role-library-file-viewer'});assert.match(grant.share_id,/^rea-file-share-/);assert.deepEqual(call('GET',folderBase+'/shares').shares,[]);
 const changed=call('POST',base+'/shares',{recipient,role_id:'role-library-file-editor',expected_invitation_id:grant.share_id});assert.equal(call('GET',base+'/shares').shares[0].role_id,'role-library-file-editor');
 call('POST',folderBase+'/shares',{recipient,role_id:'role-library-folder-viewer'});assert.equal(call('GET',base+'/effective-access').complete,false);
 call('DELETE',base+'/shares/'+changed.share_id);assert.deepEqual(call('GET',base+'/shares').shares,[]);assert.equal(call('GET',folderBase+'/shares').shares.length,1);
 const unavailable=JSON.parse(fs.readFileSync(file));unavailable.libraryFiles[0].deleted_at='2026-01-01T00:00:00Z';fs.writeFileSync(file,JSON.stringify(unavailable));assert.throws(()=>call('GET',base+'/sharing-state'),/Unknown/);
}));
