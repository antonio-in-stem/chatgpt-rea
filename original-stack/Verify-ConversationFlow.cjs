// Behavioral acceptance against the existing, credential-free original demo.
// Uses only UI operations; does not launch/rebuild the app or replace its renderer.
const {execFile}=require('node:child_process');
const {promisify}=require('node:util');
const path=require('node:path');
const fs=require('node:fs');
const run=promisify(execFile);
const state=process.argv[2];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(state||'')) {
  console.error('Usage: node original-stack/Verify-ConversationFlow.cjs demo-PROFILE');
  process.exit(1);
}
const results=[];
const title='REA flow '+Date.now();
const renamed=title+' renamed';
const fixedReply='Demo message received. This fixed response exercises the original frontend; no model or tools were invoked.';
async function control(operation,...args) {
  try {
    const {stdout}=await run(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),state,operation,...args],{timeout:15000,windowsHide:true,maxBuffer:1024*1024});
    return JSON.parse(stdout.trim());
  } catch { throw Error('Demo control failed: '+operation); }
}
async function until(name,read,predicate) {
  const deadline=Date.now()+20000;
  do {
    // Reload may briefly remove the CDP document. Retry only read observations,
    // never the click/send/rename mutations, and never treat a failed read as success.
    let value;
    try {value=await read();} catch {value=undefined;}
    if(value!==undefined&&predicate(value)) {results.push({scenario:name,passed:true});console.log('PASS '+name);return;}
    await new Promise(resolve=>setTimeout(resolve,350));
  } while(Date.now()<deadline);
  throw Error('Timed out: '+name);
}
const content=()=>control('inspect-content');
const controls=()=>control('inspect');
const conversation=()=>control('check-demo-conversation',title);
const hasTurn=value=>value.ready&&value.messageVisible&&value.replyVisible;
const labelled=(items,label)=>items.some(item=>item.label===label);
const imageLoaded=items=>items.some(item=>item.alt==='User attachment'&&item.complete&&item.naturalWidth===100&&item.naturalHeight===100);
(async()=>{
  await control('show-demo-window'); // Restores only the verified isolated demo if minimized.
  await control('inspect-theme'); // Connects only to the explicitly selected demo.
  await control('activate-navigation-button','New chat');
  await until('new-chat landing',content,text=>text.includes('What should we build?'));
  await control('focus-composer');
  await control('paste-demo-image');
  await until('attachment chip',controls,items=>labelled(items,'Remove rea-demo-image.png'));
  await control('click','Remove rea-demo-image.png');
  await until('attachment removal',controls,items=>!labelled(items,'Remove rea-demo-image.png'));
  await control('focus-composer');
  await control('paste-demo-image');
  await until('attachment restored',controls,items=>labelled(items,'Remove rea-demo-image.png'));
  await control('focus-composer');
  await control('insert-focused',title);
  await control('click','Send');
  await until('message and fixed reply',conversation,hasTurn);
  await until('loaded sent image',()=>control('inspect-images'),imageLoaded);
  await control('activate-navigation-button','New chat');
  await until('return to landing',content,text=>text.includes('What should we build?')&&!text.includes(fixedReply));
  await control('activate-row',title);
  await until('reopened conversation',conversation,hasTurn);
  await control('click','Chat actions');
  await control('activate-popup-item','Rename\nCtrl+Alt+R');
  await until('rename dialog',controls,items=>labelled(items,'Chat title'));
  await control('fill','Chat title',renamed);
  await control('click-dialog','Save');
  await until('renamed sidebar row',controls,items=>labelled(items,renamed)&&!labelled(items,'Chat title'));
  await control('reload-demo');
  await until('persisted sidebar title',controls,items=>labelled(items,renamed));
  await control('activate-row',renamed);
  await until('persisted message and reply',conversation,hasTurn);
  await until('persisted image',()=>control('inspect-images'),imageLoaded);
  console.log(JSON.stringify({passed:true,scenarios:results.length,syntheticThreadRetained:true}));
})().catch(error=>{
  results.push({scenario:error.message,passed:false});
  console.error(error.message);process.exitCode=1;
}).finally(()=>{
  // Local-only report deliberately excludes DOM text, screenshots, paths and account data.
  const report={checkedAt:new Date().toISOString(),passed:results.length>0&&results.every(r=>r.passed),results};
  const directory=path.join(__dirname,'state',state);
  if(fs.existsSync(directory))fs.writeFileSync(path.join(directory,'conversation-flow-check.json'),JSON.stringify(report,null,2)+'\n');
});
