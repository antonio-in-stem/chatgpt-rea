const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const read=()=>control('inspect-demo-remote-plugin');
async function wait(predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(x.failure)throw Error('Original plugin screen reports load failure');if(x.ready!==false&&predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,500));}while(Date.now()<deadline);throw Error('Remote plugin screen timed out');}
async function check(name,predicate){await wait(predicate);results.push(name);console.log('PASS '+name);}
(async()=>{
await wait(x=>x.search);
await control('activate-tab','Personal');
await check('Personal renders original remote catalog card',x=>x.cards.length===1&&x.cards[0].text.includes('REA Catalog Demo'));
await control('open-demo-remote-plugin');
await check('original remote detail displays fixture title and description',x=>x.headings.includes('REA Catalog Demo')&&x.description&&!x.search);
await check('uninstalled remote detail offers Install instead of Try now',x=>x.buttons.some(e=>e.text==='Install plugin'&&!e.disabled)&&!x.buttons.some(e=>e.text==='Try now'));
await control('reload-demo');
await wait(x=>x.buttons?.some(e=>e.text==='Plugins'));
await control('activate-navigation-button','Plugins');await wait(x=>x.search);
await control('activate-tab','Personal');await wait(x=>x.cards.length===1);
await control('open-demo-remote-plugin');
await check('remote detail can be reopened after reload',x=>x.headings.includes('REA Catalog Demo')&&x.description&&!x.search);
await control('open-demo-plugin-directory');await wait(x=>x.search);await control('activate-tab','Personal');
await check('original breadcrumb returns to populated Personal catalog',x=>x.search&&x.cards.length===1);
await control('fill','Search plugins','rea-no-such-plugin-9472');
await check('unmatched search renders original empty state',x=>x.search&&x.cards.length===0&&x.empty);
await control('fill','Search plugins','CATALOG');
await check('desktop search returns remote catalog fixture after empty state',x=>x.search&&x.cards.length===1&&x.cards[0].text.includes('REA Catalog Demo')&&!x.empty);
await control('fill','Search plugins','');
await check('clearing search restores populated Personal catalog',x=>x.search&&x.cards.length===1&&!x.empty&&x.headings.includes('Created by you'));
fs.writeFileSync(path.join(__dirname,'state',profile,'remote-plugin-catalog-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false,pluginCodeExecuted:false,remoteMutationTested:false,searchTested:true},null,2)+'\n');
console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
