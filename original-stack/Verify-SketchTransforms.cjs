const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function c(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000});return JSON.parse(stdout);}
async function wait(op,predicate){const end=Date.now()+20000;do{const x=await c(op);if(predicate(x))return x;await new Promise(r=>setTimeout(r,200));}while(Date.now()<end);throw Error('Original Sketch state timed out: '+op);}
const read=()=>c('inspect-demo-sketch');
const same=(a,b)=>a&&b&&['x','y','width','height'].every(k=>Math.abs(a[k]-b[k])<=1);
const enabled=(s,label)=>s.buttons.some(e=>e.label===label&&!e.disabled);
async function check(name,p){const s=await wait('inspect-demo-sketch',p);results.push(name);console.log('PASS '+name);return s;}
(async()=>{
await c('show-demo-window');
if(!(await read()).ready){await c('click','Add files and more');await wait('inspect',x=>x.some(e=>e.text==='Sketch\nDraw a sketch'));await c('activate','Sketch\nDraw a sketch');}
await check('original empty editor has no drawing to attach',s=>s.ready&&!s.bounds&&!enabled(s,'Attach sketch'));
await c('click','Shapes');await wait('inspect',x=>x.some(e=>e.text==='Rectangle'||e.label==='Rectangle'));await c('click','Rectangle');await c('click','Use red');await c('draw-demo-sketch','box');
const initial=(await check('red rectangle drawn and automatically selected',s=>s.bounds&&s.redPixels>100&&s.buttons.some(e=>e.label==='Select'&&e.pressed==='true'))).bounds;
await c('transform-demo-sketch','move');const moved=(await check('native move translates rectangle without resizing',s=>s.bounds&&Math.abs(s.bounds.x-initial.x-40)<=1&&Math.abs(s.bounds.y-initial.y-30)<=1&&Math.abs(s.bounds.width-initial.width)<=1&&Math.abs(s.bounds.height-initial.height)<=1)).bounds;
await c('click','Undo');await check('Undo restores pre-move rectangle',s=>same(s.bounds,initial));
await c('click','Redo');await check('Redo restores moved rectangle',s=>same(s.bounds,moved));
await c('transform-demo-sketch','resize');const resized=(await check('native corner resize increases both dimensions and preserves opposite corner',s=>s.bounds&&Math.abs(s.bounds.x-moved.x)<=1&&Math.abs(s.bounds.y-moved.y)<=1&&s.bounds.width-moved.width>=35&&s.bounds.width-moved.width<=45&&s.bounds.height-moved.height>=25&&s.bounds.height-moved.height<=35)).bounds;
await c('capture-demo-window');
await c('click','Undo');await check('Undo restores pre-resize rectangle',s=>same(s.bounds,moved));
await c('click','Redo');await check('Redo restores resized rectangle',s=>same(s.bounds,resized));
await c('click','Undo');await c('click','Undo');await c('click','Undo');await check('drawing history returns to empty before closing',s=>!s.bounds&&!enabled(s,'Attach sketch'));
await c('click','Close sketch editor');await wait('inspect-demo-sketch',s=>!s.ready);
fs.writeFileSync(path.join(__dirname,'state',profile,'sketch-transforms-ui-check.json'),JSON.stringify({passed:true,results,initial,moved,resized,rendererModified:false,canvasStateInjected:false,messageSent:false,attachmentExported:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
