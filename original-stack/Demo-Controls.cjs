// Operate only the original renderer of an explicitly selected, credential-free demo profile.
const fs=require('node:fs'),path=require('node:path');
(async()=>{
 const [stateName,operation='inspect',label,value]=process.argv.slice(2);
 if(!/^demo-[a-zA-Z0-9_-]+$/.test(stateName||''))throw Error('Explicit demo profile required');
 const state=path.join(__dirname,'state',stateName);
 if(fs.existsSync(path.join(state,'codex-home','auth.json')))throw Error('Profile contains account credentials');
 const port=fs.readFileSync(path.join(state,'profile','DevToolsActivePort'),'utf8').split(/\r?\n/)[0];
 if(!/^\d+$/.test(port))throw Error('Invalid CDP port');
 const target=(await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t=>t.type==='page'&&t.url==='app://-/index.html');
 if(!target)throw Error('Original renderer missing');
 const ws=new WebSocket(target.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
 const timer=setTimeout(()=>{ws.close();process.exitCode=1},10000);
 let sequence=0;const pending=new Map();
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}};
 const send=(method,params)=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 try{
  let expression;
  if(operation==='inspect')expression=`[...document.querySelectorAll('button,a,[role="button"],[role="link"],[role^="menuitem"],input')].map(e=>({tag:e.tagName,role:e.getAttribute('role'),checked:e.getAttribute('aria-checked'),expanded:e.getAttribute('aria-expanded'),label:e.getAttribute('aria-label'),placeholder:e.getAttribute('placeholder'),text:(e.innerText||'').slice(0,100),type:e.type,disabled:!!e.disabled||e.getAttribute('aria-disabled')==='true'}))`;
  else if(operation==='scroll-thread'&&Number.isFinite(Number(label))&&Math.abs(Number(label))<=5000)expression=`(()=>{const e=document.querySelector('.thread-scroll-container');if(!e||document.querySelector('[role="dialog"]'))throw Error('Unobscured thread scroller required');const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+Math.min(100,r.height/2),scrollTop:e.scrollTop,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight}})()`;
  else if(operation==='scroll-code'&&Number.isFinite(Number(label))&&Math.abs(Number(label))<=5000)expression=`(()=>{const blocks=[...document.querySelectorAll('[class*=_CodeSurface_]')];if(blocks.length!==1||document.querySelector('[role="dialog"]'))throw Error('One unobscured code block required');const e=[...blocks[0].querySelectorAll('div')].find(e=>getComputedStyle(e).overflowX==='auto'&&e.querySelector('code'));if(!e)throw Error('Original code scroller missing');const r=e.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2;if(!e.contains(document.elementFromPoint(x,y)))throw Error('Code scroller is obscured');return {x,y,scrollLeft:e.scrollLeft,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth}})()`;
  else if(operation==='inspect-images')expression=`[...document.querySelectorAll('img')].filter(e=>e.getBoundingClientRect().width>0).map(e=>({alt:e.alt,complete:e.complete,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight,sourceKind:e.currentSrc.split(':')[0],rect:e.getBoundingClientRect().toJSON(),transform:getComputedStyle(e).transform,parentTransform:getComputedStyle(e.parentElement).transform,objectFit:getComputedStyle(e).objectFit}))`;
  else if(operation==='focus-composer')expression=`(()=>{const fields=[...document.querySelectorAll('[contenteditable="true"]')].filter(e=>e.getBoundingClientRect().width>0);if(fields.length!==1||document.querySelector('[role="dialog"]'))throw Error('Expected one unobscured original composer');fields[0].focus();return {focused:document.activeElement===fields[0]}})()`;
  else if(operation==='plugin-details-menu')expression=`(()=>{const b=[...document.querySelectorAll('button[aria-label="More actions"][data-size="xl"]')].filter(e=>e.getBoundingClientRect().width>0);if(b.length!==1)throw Error('Expected original detail menu');const r=b[0].getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2;if(!b[0].contains(document.elementFromPoint(x,y)))throw Error('Obscured');return {x,y}})()`;
  else if(operation==='open-demo-plugin')expression=`(()=>{const a=[...document.querySelectorAll('a[href]')].filter(e=>e.getAttribute('href').startsWith('/plugins/rea-demo@rea-local?')&&e.getBoundingClientRect().width>0);if(a.length!==1)throw Error('Expected one original demo plugin link');a[0].click();return {opened:true}})()`;
  else if(operation==='open-demo-skill')expression=`(()=>{const cards=[...document.querySelectorAll('[role="button"]')].filter(e=>e.innerText.trim()==='Rea UI Demo\\nInspect original skill controls'&&e.getBoundingClientRect().width>0);if(cards.length!==2)throw Error('Expected installed and Personal demo skill cards');cards[0].click();return {opened:true}})()`;
  else if(operation==='inspect-plugin-card')expression=`(()=>{const e=[...document.querySelectorAll('span')].find(e=>e.children.length===0&&e.textContent==='rea-demo');const rows=[];for(let p=e,i=0;p&&i<11;p=p.parentElement,i++)rows.push({tag:p.tagName,role:p.getAttribute('role'),tabindex:p.getAttribute('tabindex'),label:p.getAttribute('aria-label'),html:p.outerHTML.slice(0,1000)});return rows})()`;
  else if(operation==='activate-popup-item'&&label)expression=`(()=>{const items=[...document.querySelectorAll('[role="menu"] [role="menuitem"]')].filter(e=>e.innerText.trim()===${JSON.stringify(label)}&&e.getBoundingClientRect().width>0);if(items.length!==1||items[0].getAttribute('aria-disabled')==='true'||items[0].disabled)throw Error('Expected one enabled popup item');items[0].click();return {activated:${JSON.stringify(label)}}})()`;
  else if(operation==='inspect-dialog-fields')expression=`[...document.querySelectorAll('[role="dialog"] input,[role="dialog"] textarea,[role="dialog"] [contenteditable]')].map(e=>({tag:e.tagName,placeholder:e.getAttribute('placeholder'),label:e.getAttribute('aria-label'),role:e.getAttribute('role'),editable:e.getAttribute('contenteditable')}))`;
  else if(operation==='focus-dialog-field'&&label)expression=`(()=>{const fields=[...document.querySelectorAll('[role="dialog"] input,[role="dialog"] textarea,[role="dialog"] [contenteditable="true"]')].filter(e=>e.getAttribute('placeholder')===${JSON.stringify(label)}||e.getAttribute('aria-label')===${JSON.stringify(label)});if(fields.length!==1)throw Error('Expected one dialog field');fields[0].focus();return {focused:true}})()`;
  else if(operation==='inspect-content')expression='document.body.innerText.slice(-14000)';
  else if(operation==='reload-demo')expression='true';
  else if(operation==='drop-demo-file')expression=`(()=>{const e=document.activeElement;if(!e?.matches('[contenteditable="true"]')||document.querySelector('[role="dialog"]'))throw Error('Focused unobscured composer required');const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`;
  else if(operation==='paste-demo-file'){
   expression=`(()=>{const e=document.activeElement;if(!e?.matches('[contenteditable="true"]')||document.querySelector('[role="dialog"]'))throw Error('Focused unobscured composer required');const transfer=new DataTransfer();transfer.items.add(new File(['REA synthetic text attachment. No private content.'],'rea-demo-note.txt',{type:'text/plain'}));const event=new ClipboardEvent('paste',{bubbles:true,cancelable:true,clipboardData:transfer});e.dispatchEvent(event);return {syntheticPaste:true,handled:event.defaultPrevented}})()`;
  }
  else if(operation==='paste-demo-image'){
   const imagePath=path.resolve(__dirname,'../../../extracted/webview/assets/atlas-app-5b67bfaeebb3.png');
   const bytes=fs.readFileSync(imagePath);if(bytes.length>1024*1024||bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Expected packaged demo PNG');
   expression=`(()=>{const e=document.activeElement;if(!e?.matches('[contenteditable="true"]')||document.querySelector('[role="dialog"]'))throw Error('Focused unobscured composer required');const bytes=Uint8Array.from(atob(${JSON.stringify(bytes.toString('base64'))}),c=>c.charCodeAt(0));const transfer=new DataTransfer();transfer.items.add(new File([bytes],'rea-demo-image.png',{type:'image/png'}));const event=new ClipboardEvent('paste',{bubbles:true,cancelable:true,clipboardData:transfer});e.dispatchEvent(event);return {syntheticPaste:true,handled:event.defaultPrevented}})()`;
  }
  else if(operation==='opposite-follow-up')expression=`(()=>{if(!document.activeElement?.matches('[contenteditable="true"]'))throw Error('Focused original composer required');return {focused:true}})()`;
  else if(operation==='inspect-focus')expression=`(()=>{const e=document.activeElement;return {tag:e?.tagName,role:e?.getAttribute('role'),label:e?.getAttribute('aria-label'),dialogLabel:e?.closest('[role="dialog"]')?.getAttribute('aria-label')||null}})()`;
  else if((operation==='click'||operation==='hover'||operation==='activate'||operation==='activate-text')&&label)expression=`(()=>{const text=${JSON.stringify(label)};let matches=[...document.querySelectorAll('button,a,[role="button"],[role="link"],[role^="menuitem"]')].filter(e=>e.innerText.trim()===text||(${JSON.stringify(operation)}!=='activate-text'&&e.getAttribute('aria-label')===text)).filter(e=>e.getBoundingClientRect().width>0);if(matches.length===0&&${JSON.stringify(operation)}==='activate')matches=[...document.querySelectorAll('span')].filter(e=>e.children.length===0&&e.textContent.trim()===text&&e.getBoundingClientRect().width>0);if(matches.length!==1||matches[0].disabled||matches[0].getAttribute('aria-disabled')==='true')throw Error('Expected one enabled control');if(${JSON.stringify(operation)}==='activate'||${JSON.stringify(operation)}==='activate-text'){matches[0].click();return {activated:text}}const r=matches[0].getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`;
  else if(operation==='pin-destination'&&['Projects','Pull requests','Sites'].includes(label))expression=`(()=>{const name=${JSON.stringify(label)};const candidates=[...document.querySelectorAll('button[aria-label="Pin to sidebar"]')].filter(b=>{if(b.getBoundingClientRect().width===0)return false;let p=b.parentElement;for(let i=0;p&&i<5;i++,p=p.parentElement){if(p.innerText.trim()===name&&p.querySelectorAll('button[aria-label="Pin to sidebar"]').length===1)return true;}return false;});if(candidates.length!==1)throw Error('Expected one original pin control for destination');candidates[0].click();return {pinned:name}})()`;
  else if(operation==='row-action'&&label&&value)expression=`(()=>{const rows=[...document.querySelectorAll('[role="button"]')].filter(e=>e.getAttribute('aria-label')===${JSON.stringify(value)}&&e.getBoundingClientRect().width>0);if(rows.length!==1)throw Error('Expected one visible row');const controls=[...rows[0].querySelectorAll('button')].filter(e=>e.getAttribute('aria-label')===${JSON.stringify(label)});if(controls.length!==1||controls[0].disabled)throw Error('Expected one enabled row action');controls[0].click();return {row:${JSON.stringify(value)},action:${JSON.stringify(label)}}})()`;
  else if(operation==='dialog-key'&&['Escape','Tab'].includes(label))expression=`(()=>{const dialog=document.activeElement?.closest('[role="dialog"]');if(!dialog||!dialog.querySelector('[aria-label="Cerrar vista previa de tabla"]'))throw Error('Focused original table preview required');return {focused:true}})()`;
  else if(operation==='search-key'&&['Enter','Escape','ArrowDown','ArrowUp'].includes(label))expression=`(()=>{if(!document.activeElement?.matches('input[role="combobox"]'))throw Error('Focused search combobox required');return {focused:true}})()`;
  else if(operation==='insert-focused'&&label)expression=`(()=>{const e=document.activeElement;if(!e||(!e.isContentEditable&&!(e instanceof HTMLTextAreaElement)&&!(e instanceof HTMLInputElement&&["text","search"].includes(e.type))))throw Error('Focused editable required');return {tag:e.tagName,editable:true}})()`;
  else if(operation==='describe'&&label)expression=`[...document.querySelectorAll('[aria-label]')].filter(e=>e.getAttribute('aria-label')===${JSON.stringify(label)}).map(e=>({html:e.outerHTML,ancestor:e.parentElement?.outerHTML.slice(0,5000),rect:e.getBoundingClientRect().toJSON()}))`;
  else if(operation==='locate'&&label)expression=`[...document.querySelectorAll('*')].filter(e=>e.children.length===0&&e.textContent.trim()===${JSON.stringify(label)}).map(e=>e.parentElement.parentElement.parentElement.outerHTML.slice(0,2400))`;
  else if(operation==='fill'&&label&&value!==undefined)expression=`(()=>{const matches=[...document.querySelectorAll('input')].filter(e=>e.getAttribute('aria-label')===${JSON.stringify(label)}||e.getAttribute('placeholder')===${JSON.stringify(label)});if(matches.length!==1)throw Error('Expected one input');const input=matches[0];Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,${JSON.stringify(value)});input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));return {filled:${JSON.stringify(label)}}})()`;
  else throw Error('Supported operations: inspect, inspect-content, inspect-focus, inspect-images, reload-demo, paste-demo-image, paste-demo-file, drop-demo-file, scroll-thread, scroll-code, click, hover, activate, activate-text, fill, insert-focused, search-key, dialog-key, row-action, describe');
  const result=await send('Runtime.evaluate',{returnByValue:true,expression});
  if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);
  if(operation==='plugin-details-menu'){const {x,y}=result.result.value;await send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',clickCount:1});console.log(JSON.stringify({opened:true}));
  }else if(operation==='drop-demo-file'){
   const extension=label||'txt';if(!['txt','csv'].includes(extension))throw Error('Only synthetic txt/csv fixtures');const file=path.join(state,'rea-demo-note.'+extension);fs.writeFileSync(file,extension==='csv'?'Component,State\nSidebar,Ready\nComposer,Ready\n':'REA synthetic text attachment. No private content.\n');
   const {x,y}=result.result.value;const data={items:[],files:[file],dragOperationsMask:1};
   for(const type of ['dragEnter','dragOver','drop'])await send('Input.dispatchDragEvent',{type,x,y,data});
   console.log(JSON.stringify({dropped:path.basename(file),synthetic:true}));
  }else if(operation==='reload-demo'){await send('Page.reload',{ignoreCache:false});console.log(JSON.stringify({reloaded:true}));
  }else if(operation==='scroll-code'){
   const {x,y}=result.result.value;await send('Input.dispatchMouseEvent',{type:'mouseWheel',x,y,deltaX:Number(label),deltaY:0});console.log(JSON.stringify({operation,deltaX:Number(label),before:result.result.value}));
  }else if(operation==='scroll-thread'){
   const {x,y}=result.result.value;await send('Input.dispatchMouseEvent',{type:'mouseWheel',x,y,deltaX:0,deltaY:Number(label)});console.log(JSON.stringify({operation,deltaY:Number(label),before:result.result.value}));
  }else if(operation==='search-key'||operation==='dialog-key'){
   const code={Enter:13,Escape:27,ArrowDown:40,ArrowUp:38,Tab:9}[label];
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:label,code:label,windowsVirtualKeyCode:code});
   await send('Input.dispatchKeyEvent',{type:'keyUp',key:label,code:label,windowsVirtualKeyCode:code});
   console.log(JSON.stringify({operation,key:label}));
  }else if(operation==='opposite-follow-up'){
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,modifiers:2});
   await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,modifiers:2});
   console.log(JSON.stringify({operation,shortcut:'Ctrl+Enter'}));
  }else if(operation==='insert-focused'){
   await send('Input.insertText',{text:label});console.log(JSON.stringify({inserted:true}));
  }else if(operation==='click'||operation==='hover'){
   const {x,y}=result.result.value;
   await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y});
   if(operation==='click'){
   const hit=await send('Runtime.evaluate',{returnByValue:true,expression:`(()=>{const e=document.elementFromPoint(${x},${y})?.closest('button,a,[role="button"],[role="link"],[role^="menuitem"]');return !!e&&(e.innerText.trim()===${JSON.stringify(label)}||e.getAttribute('aria-label')===${JSON.stringify(label)});})()`});
   if(hit.exceptionDetails)throw Error('Hit-test evaluation failed: '+(hit.exceptionDetails.exception?.description||hit.exceptionDetails.text));
   if(hit.result.value!==true)throw Error('Control is obscured or moved; reveal it with hover and retry');
   await send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',clickCount:1});
   await send('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',clickCount:1});
   }
   console.log(JSON.stringify({operation,label,x,y}));
  }else console.log(JSON.stringify(result.result.value));
 }finally{clearTimeout(timer);ws.close()}
})().catch(e=>{console.error(e.message);process.exitCode=1});
