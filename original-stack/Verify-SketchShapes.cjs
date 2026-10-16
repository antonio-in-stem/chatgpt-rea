const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[],shapes=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function c(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000});return JSON.parse(stdout);}
async function wait(op,p){const end=Date.now()+20000;do{const x=await c(op);if(p(x))return x;await new Promise(r=>setTimeout(r,200));}while(Date.now()<end);throw Error('Sketch state timed out: '+op);}
async function open(){await c('click','Add files and more');await wait('inspect',x=>x.some(e=>e.text==='Sketch\nDraw a sketch'));await c('activate','Sketch\nDraw a sketch');return wait('inspect-demo-sketch',x=>x.ready);}
function pass(name){results.push(name);console.log('PASS '+name);}
(async()=>{
await c('show-demo-window');let initial=await c('inspect-demo-sketch');if(!initial.ready)initial=await open();if(initial.bounds||initial.buttons.some(e=>e.label==='Attach sketch'&&!e.disabled))throw Error('Empty disposable editor required');
await c('click','Use red');
for(const name of ['Line','Arrow','Rectangle','Ellipse','Triangle','Diamond','Star','Heart']){
 await c('click','Shapes');await wait('inspect',x=>x.some(e=>e.text===name||e.label===name));await c('click',name);await c('draw-demo-sketch','box');
 const s=await wait('inspect-demo-sketch',x=>x.bounds&&x.redPixels>100&&x.buttons.some(e=>e.label==='Attach sketch'&&!e.disabled));
 if(shapes.some(e=>e.redMaskFingerprint===s.redMaskFingerprint))throw Error('Shape did not produce a distinct rendered mask: '+name);
 shapes.push({name,redPixels:s.redPixels,redMaskFingerprint:s.redMaskFingerprint,bounds:s.bounds});
 const shot=await c('capture-demo-window');fs.copyFileSync(shot.file,path.join(__dirname,'state',profile,'sketch-shape-'+name.toLowerCase()+'.png'));
 await c('click','Undo');await wait('inspect-demo-sketch',x=>!x.bounds&&x.buttons.some(e=>e.label==='Attach sketch'&&e.disabled));pass(name+' draws a distinct visible shape and Undo restores empty canvas');
}
await c('click','Redo');const before=await wait('inspect-demo-sketch',x=>!!x.bounds);
await c('click','Close sketch editor');await wait('inspect',x=>x.some(e=>e.text==='Keep editing')&&x.some(e=>e.text==='Discard changes'));pass('Closing unsaved sketch opens original discard confirmation');
await c('click','Keep editing');const kept=await wait('inspect-demo-sketch',x=>x.redMaskFingerprint===before.redMaskFingerprint&&x.redPixels===before.redPixels);if(!kept.bounds)throw Error('Keep editing lost drawing');pass('Keep editing preserves rendered drawing');
await c('click','Close sketch editor');await wait('inspect',x=>x.some(e=>e.text==='Discard changes'));await c('click','Discard changes');await wait('inspect-demo-sketch',x=>!x.ready);pass('Discard changes closes editor');
const reopened=await open();if(reopened.bounds||reopened.buttons.some(e=>e.label==='Attach sketch'&&!e.disabled))throw Error('Discarded drawing returned');pass('Reopening after discard starts empty');
await c('click','Close sketch editor');await wait('inspect-demo-sketch',x=>!x.ready);
fs.writeFileSync(path.join(__dirname,'state',profile,'sketch-shapes-ui-check.json'),JSON.stringify({passed:true,results,shapes,rendererModified:false,canvasStateInjected:false,messageSent:false,attachmentExported:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
