// Verify immediate advanced Appearance reset while preserving both original themes and baseline preferences.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const items=()=>control('inspect'),values=()=>control('inspect-appearance-values');
async function wait(read,predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,400));}while(Date.now()<deadline);throw Error('Theme import state timed out');}
async function open(){const ready=await wait(items,x=>x.some(e=>e.label==='Appearance'||e.label==='Open profile menu'));if(!ready.some(e=>e.label==='Appearance')){await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Appearance'));}await control('activate-settings-section','Appearance');return wait(values,x=>x.pickers.length>0);}
let label,trigger;
async function form(){if(!(await items()).some(e=>e.label===label))await control('click',trigger);return wait(items,x=>x.some(e=>e.label===label));}
async function importString(s){await form();await control('fill',label,s);await wait(items,x=>x.some(e=>e.text==='Import theme'&&e.type==='submit'&&!e.disabled));await control('click','Import theme');await wait(items,x=>!x.some(e=>e.label===label));}
const field=(x,label)=>x.fields.find(f=>f.label===label)?.value;
async function check(name,read,predicate){await wait(read,predicate);results.push(name);console.log('PASS '+name);}
const advanced=()=>control('inspect-appearance-advanced');
const selected=(x,label)=>x.segments.find(e=>e.label===label)?.pressed==='true';
const switched=(x,label)=>x.switches.find(e=>e.label===label)?.checked;
async function expand(){if(!(await values()).fields.some(e=>e.label==='Sans font size'))await control('click','Advanced');await wait(values,x=>x.fields.some(e=>e.label==='Sans font size'));}
async function variant(mode){await control('choose-theme',mode);await wait(values,x=>x.theme===mode.toLowerCase());label=mode+' theme share string';trigger='Import '+mode+' theme';}
async function snapshot(mode){await variant(mode);const s=(await form()).find(e=>e.label===label).placeholder;await control('click','Cancel');return s;}
async function size(label,value){await control('focus-appearance-field',label);await control('fill',label,value);await control('appearance-size-key','Enter');}
(async()=>{
await open();await expand();const mode=(await control('inspect-theme')).choices.find(e=>e.checked)?.label;if(!mode)throw Error('Initial mode missing');const baseValues=await values(),base=await advanced();
const sizes={'Sans font size':'14','Content font size':'14','Code font size':'13'},defaults={...sizes,'Code font size':'12'};
if(!Object.entries(sizes).every(([k,v])=>field(baseValues,k)===v)||!selected(base,'System')||!selected(base,'Color diff markers')||switched(base,'Separate light and dark modes')!=='false'||switched(base,'Smart punctuation')!=='true'||switched(base,'Full width pages')!=='false'||switched(base,'Use pointer cursors')!=='false')throw Error('Reset scenario requires known global advanced baseline; no mutation performed');
const exports={Light:await snapshot('Light'),Dark:await snapshot('Dark')};const darkBefore=await values();
try{
await expand();await size('Sans font size','15');await size('Content font size','15');await size('Code font size','14');
await control('choose-appearance-segment','On');await control('choose-appearance-segment','Plus / minus diff markers');await control('activate','Use pointer cursors');
await check('advanced preferences changed together',advanced,x=>selected(x,'On')&&selected(x,'Plus / minus diff markers')&&switched(x,'Use pointer cursors')==='true');
await control('activate','Reset to default');
await check('reset restores three sizes',values,x=>Object.entries(defaults).every(([k,v])=>field(x,k)===v));
await check('reset restores motion markers and cursor',advanced,x=>selected(x,'System')&&selected(x,'Color diff markers')&&switched(x,'Use pointer cursors')==='false');
await check('reset preserves basic theme colors',values,x=>field(x,'Dark background color')===field(darkBefore,'Dark background color')&&field(x,'Dark ink color')===field(darkBefore,'Dark ink color'));
await control('reload-demo');await open();await expand();await check('reset preferences persist reload',advanced,x=>selected(x,'System')&&selected(x,'Color diff markers')&&switched(x,'Use pointer cursors')==='false');await check('reset sizes persist reload',values,x=>Object.entries(defaults).every(([k,v])=>field(x,k)===v));
}finally{
await open();await expand();for(const [k,v]of Object.entries(sizes))await size(k,v);await control('choose-appearance-segment','System');await control('choose-appearance-segment','Color diff markers');if(switched(await advanced(),'Use pointer cursors')!=='false')await control('activate','Use pointer cursors');
for(const v of ['Light','Dark']){await variant(v);await importString(exports[v]);}const accent=baseValues.pickers.find(e=>e.label.endsWith('accent color'));const current=(await values()).pickers.find(e=>e.label.endsWith('accent color'));if(current.text!==accent.text){await control('click',current.label);await wait(items,x=>x.some(e=>e.role==='menuitemradio'&&e.text===accent.text));await control('click',accent.text);}await control('choose-theme',mode);
}
await control('reload-demo');await open();for(const v of ['Light','Dark']){if(await snapshot(v)!==exports[v])throw Error(v+' theme not exactly restored');}await control('choose-theme',mode);await expand();if(JSON.stringify(await advanced())!==JSON.stringify(base))throw Error('Advanced baseline differs after restoration');results.push('both serialized themes and advanced baseline restored after reload');
fs.writeFileSync(path.join(__dirname,'state',profile,'appearance-reset-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});