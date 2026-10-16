// Verify original color draft behavior, font selection, persistence and restoration.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const items=()=>control('inspect'),values=()=>control('inspect-appearance-values');
async function wait(read,predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,400));}while(Date.now()<deadline);throw Error('Accent state timed out');}
async function open(){const ready=await wait(items,x=>x.some(e=>e.label==='Appearance'||e.label==='Open profile menu'));if(!ready.some(e=>e.label==='Appearance')){await wait(items,x=>x.some(e=>e.label==='Open profile menu'));await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Appearance'));}await control('activate-settings-section','Appearance');return wait(values,x=>x.pickers.some(p=>p.label.endsWith('accent color')));}
const field=(x,label)=>x.fields.find(f=>f.label===label)?.value;
async function check(name,predicate){await wait(values,x=>predicate(x)&&!x.alerts.some(a=>/failed|could not/i.test(a)));results.push(name);console.log('PASS '+name);}
async function fill(label,value){await control('focus-appearance-field',label);await control('fill',label,value);}
async function font(label,value){await control('click',label);await wait(items,x=>x.some(e=>e.text===value&&e.role?.startsWith('menuitem')));await control('click',value);}
(async()=>{const initial=await open(),background=initial.fields.find(f=>f.label.endsWith('background color')),ink=initial.fields.find(f=>f.label.endsWith('ink color')),fontPicker=initial.pickers.find(p=>p.label.endsWith('UI font'));if(!background||!ink||!fontPicker)throw Error('Appearance fields missing');const bg='#20242A',fg='#E6EAF0',targetFont=fontPicker.text==='Arial'?'Calibri':'Arial';
 try{
  await fill(background.label,'#12');await check('incomplete color remains draft',x=>field(x,background.label)==='#12');
  await control('click',fontPicker.label);await control('click',fontPicker.label);await check('blur discards incomplete color',x=>field(x,background.label)===background.value);
  await fill(background.label,bg);await check('valid background applied',x=>field(x,background.label)===bg);
  await fill(ink.label,fg);await check('valid foreground applied',x=>field(x,ink.label)===fg);
  await font(fontPicker.label,targetFont);await check('font selection changes interface font',x=>x.pickers.some(p=>p.label===fontPicker.label&&p.text===targetFont)&&x.uiFont.toLowerCase().includes(targetFont.toLowerCase()));
  await control('reload-demo');await open();await check('colors and font persist after reload',x=>field(x,background.label)===bg&&field(x,ink.label)===fg&&x.pickers.some(p=>p.label===fontPicker.label&&p.text===targetFont));
 }finally{
  await open();await fill(background.label,background.value);await fill(ink.label,ink.value);const current=await values();if(current.pickers.find(p=>p.label===fontPicker.label)?.text!==fontPicker.text)await font(fontPicker.label,fontPicker.text);
  await check('original colors and font restored',x=>field(x,background.label)===background.value&&field(x,ink.label)===ink.value&&x.pickers.some(p=>p.label===fontPicker.label&&p.text===fontPicker.text));
 }
 await control('reload-demo');await open();await check('restoration persists after reload',x=>field(x,background.label)===background.value&&field(x,ink.label)===ink.value&&x.pickers.some(p=>p.label===fontPicker.label&&p.text===fontPicker.text));
 fs.writeFileSync(path.join(__dirname,'state',profile,'appearance-colors-font-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
