// Verify independent light/dark settings, actual interface fonts and exact two-theme restoration.
const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function control(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000,maxBuffer:1048576});return JSON.parse(stdout);}
const items=()=>control('inspect'),values=()=>control('inspect-appearance-values');
async function wait(read,predicate){const deadline=Date.now()+60000;do{try{const x=await read();if(predicate(x))return x;}catch(e){if(!String(e.stderr||e.message).includes('Original renderer missing'))throw e;}await new Promise(r=>setTimeout(r,400));}while(Date.now()<deadline);throw Error('Theme import state timed out');}
async function open(){const ready=await wait(items,x=>x.some(e=>e.label==='Appearance'||e.label==='Open profile menu'));if(!ready.some(e=>e.label==='Appearance')){await control('click','Open profile menu');await wait(items,x=>x.some(e=>e.role==='menuitem'&&e.text==='Settings\nCtrl+,'));await control('activate-popup-item','Settings\nCtrl+,');await wait(items,x=>x.some(e=>e.label==='Appearance'));}await control('activate-settings-section','Appearance');return wait(values,x=>x.pickers.length>0);}
let label,trigger;
async function form(){if(!(await items()).some(e=>e.label===label))await control('activate',trigger);return wait(items,x=>x.some(e=>e.label===label));}
async function importString(s){await form();await control('fill',label,s);await wait(items,x=>x.some(e=>e.text==='Import theme'&&e.type==='submit'&&!e.disabled));await control('click','Import theme');await wait(items,x=>!x.some(e=>e.label===label));}
const field=(x,label)=>x.fields.find(f=>f.label===label)?.value;
async function check(name,read,predicate){await wait(read,predicate);results.push(name);console.log('PASS '+name);}
const advanced=()=>control('inspect-appearance-advanced');
async function split(enabled){if(!(await values()).fields.some(f=>f.label==='Sans font size'))await control('activate','Advanced');const checked=(await advanced()).switches.find(e=>e.label==='Separate light and dark modes')?.checked;if(checked!==String(enabled))await control('toggle-appearance-switch','Separate light and dark modes');await wait(values,x=>x.fields.some(f=>f.label==='Light background color')===enabled||(!enabled&&x.fields.filter(f=>f.label.endsWith('background color')).length===1));}
async function exportVariant(v){label=v+' theme share string';trigger='Import '+v+' theme';const s=(await form()).find(e=>e.label===label).placeholder;await control('click','Cancel');return s;}
async function font(v,name){await control('reveal-appearance-control',v+' UI font');await control('click',v+' UI font');await wait(items,x=>x.some(e=>e.text===name&&e.role?.startsWith('menuitem')));await control('reveal-appearance-font-option',name);await control('click',name);}
(async()=>{
await open();const mode=(await control('inspect-theme')).choices.find(e=>e.checked)?.label;await split(true);const exports={Light:await exportVariant('Light'),Dark:await exportVariant('Dark')};const background={Light:'#F3F0E8',Dark:'#20242A'},fonts={Light:'Arial',Dark:'Calibri'};
try{
for(const v of ['Light','Dark']){await control('focus-appearance-field',v+' background color');await control('fill',v+' background color',background[v]);await font(v,fonts[v]);}
await check('both variants keep independent colors and fonts',values,x=>['Light','Dark'].every(v=>field(x,v+' background color')===background[v]&&x.pickers.some(p=>p.label===v+' UI font'&&p.text===fonts[v])));
await split(false);await control('choose-theme','Light');await check('light mode uses its saved interface font',values,x=>x.theme==='light'&&field(x,'Light background color')===background.Light&&x.uiFont.includes('Arial'));
await control('choose-theme','Dark');await check('dark mode uses its saved interface font',values,x=>x.theme==='dark'&&field(x,'Dark background color')===background.Dark&&x.uiFont.includes('Calibri'));
await control('reload-demo');await open();await split(true);await check('both variants persist reload',values,x=>['Light','Dark'].every(v=>field(x,v+' background color')===background[v]&&x.pickers.some(p=>p.label===v+' UI font'&&p.text===fonts[v])));
}finally{await open();await split(true);for(const v of ['Light','Dark']){label=v+' theme share string';trigger='Import '+v+' theme';await importString(exports[v]);}await control('choose-theme',mode);await split(false);}
await control('reload-demo');await open();await split(true);for(const v of ['Light','Dark'])if(await exportVariant(v)!==exports[v])throw Error(v+' initial theme not exactly restored');await split(false);if((await control('inspect-theme')).choices.find(e=>e.checked)?.label!==mode)throw Error('Initial mode not restored');results.push('both full themes and original mode restored after reload');
fs.writeFileSync(path.join(__dirname,'state',profile,'appearance-split-ui-check.json'),JSON.stringify({passed:true,results,rendererModified:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});