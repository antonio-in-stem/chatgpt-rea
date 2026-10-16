const {execFile}=require('node:child_process'),{promisify}=require('node:util'),path=require('node:path'),fs=require('node:fs');
const exec=promisify(execFile),profile=process.argv[2],results=[];
if(!/^demo-[a-zA-Z0-9_-]+$/.test(profile||''))throw Error('Explicit demo profile required');
async function c(op,...args){const {stdout}=await exec(process.execPath,[path.join(__dirname,'Demo-Controls.cjs'),profile,op,...args],{windowsHide:true,timeout:20000});return JSON.parse(stdout);}
async function wait(op,p){const end=Date.now()+20000;do{const x=await c(op);if(p(x))return x;await new Promise(r=>setTimeout(r,200));}while(Date.now()<end);throw Error('Sketch state timed out: '+op);}
const pass=name=>{results.push(name);console.log('PASS '+name)};
async function open(){await c('click','Add files and more');await wait('inspect',x=>x.some(e=>e.text==='Sketch\nDraw a sketch'));await c('activate','Sketch\nDraw a sketch');await wait('inspect-demo-sketch',x=>x.ready);}
const texts=()=>c('inspect-sketch-text'),sliders=()=>c('inspect-sketch-sliders');
const original='Texto demo: café 123',edited='Texto demo: edición 456';
(async()=>{
await c('show-demo-window');if((await c('inspect-demo-sketch')).ready)throw Error('Close existing editor before running');await open();if((await texts()).length)throw Error('Fresh disposable editor required');
await c('click','Text');await c('draw-demo-sketch','box');await wait('inspect-sketch-text',x=>x.some(e=>!e.readOnly));await c('insert-focused',original);await c('click','Select');await wait('inspect-sketch-text',x=>x.some(e=>e.readOnly&&e.value===original));pass('Unicode text commits to original text layer');
await c('edit-demo-sketch-text');await wait('inspect-sketch-text',x=>x.some(e=>!e.readOnly&&e.value===original));await c('replace-focused',edited);await c('click','Select');await wait('inspect-sketch-text',x=>x.some(e=>e.readOnly&&e.value===edited));pass('Double click reopens text and edits Unicode content');
await c('click','Undo');await wait('inspect-sketch-text',x=>x.some(e=>e.value===original));pass('Undo restores original text');
await c('click','Redo');await wait('inspect-sketch-text',x=>x.some(e=>e.value===edited));pass('Redo restores edited text');
const beforeText=(await texts())[0],beforeSize=(await sliders()).find(e=>e.label==='Text size').value;
await c('focus-sketch-slider','Text size');await c('sketch-slider-key','ArrowUp');await wait('inspect-sketch-sliders',x=>x.some(e=>e.label==='Text size'&&e.value===beforeSize+1));const afterText=(await wait('inspect-sketch-text',x=>x.some(e=>e.value===edited&&e.bounds.height>beforeText.bounds.height)))[0];pass('Text size keyboard control increases rendered text geometry');
await c('click','Undo');await wait('inspect-sketch-text',x=>x.some(e=>e.value===edited&&Math.abs(e.bounds.height-beforeText.bounds.height)<0.1));pass('Undo restores rendered text size');
await c('click','Redo');await wait('inspect-sketch-text',x=>x.some(e=>e.value===edited&&Math.abs(e.bounds.height-afterText.bounds.height)<0.1));pass('Redo restores rendered text size');
await c('capture-demo-window');
await c('click','Close sketch editor');await wait('inspect',x=>x.some(e=>e.text==='Discard changes'));await c('click','Discard changes');await wait('inspect-demo-sketch',x=>!x.ready);await open();
await c('click','Shapes');await wait('inspect',x=>x.some(e=>e.label==='Line'||e.text==='Line'));await c('click','Line');await c('click','Use red');await c('draw-demo-sketch','box');const stroke=await wait('inspect-demo-sketch',x=>x.redPixels>100);const widthBefore=(await sliders()).find(e=>e.label==='Stroke width').value;
await c('focus-sketch-slider','Stroke width');await c('sketch-slider-key','End');const widthAfter=(await wait('inspect-sketch-sliders',x=>x.some(e=>e.label==='Stroke width'&&e.value>widthBefore))).find(e=>e.label==='Stroke width').value;
const thick=await wait('inspect-demo-sketch',x=>x.redPixels>stroke.redPixels);pass('Stroke width keyboard control visibly thickens selected line');
await c('click','Undo');await wait('inspect-demo-sketch',x=>x.redMaskFingerprint===stroke.redMaskFingerprint);pass('Undo restores original stroke pixels');
await c('click','Redo');await wait('inspect-demo-sketch',x=>x.redMaskFingerprint===thick.redMaskFingerprint);pass('Redo restores thick stroke pixels');
await c('click','Close sketch editor');await wait('inspect',x=>x.some(e=>e.text==='Discard changes'));await c('click','Discard changes');await wait('inspect-demo-sketch',x=>!x.ready);
fs.writeFileSync(path.join(__dirname,'state',profile,'sketch-text-style-ui-check.json'),JSON.stringify({passed:true,results,textSize:{before:beforeSize,after:beforeSize+1,beforeHeight:beforeText.bounds.height,afterHeight:afterText.bounds.height},strokeWidth:{before:widthBefore,after:widthAfter,beforePixels:stroke.redPixels,afterPixels:thick.redPixels},rendererModified:false,canvasStateInjected:false,messageSent:false,attachmentExported:false},null,2)+'\n');console.log(JSON.stringify({passed:true,checks:results.length}));
})().catch(e=>{console.error(e.message);process.exitCode=1});
