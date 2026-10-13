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
  if(operation==='inspect')expression=`[...document.querySelectorAll('button,a,[role="button"],[role="link"],[role^="menuitem"],input')].map(e=>({tag:e.tagName,role:e.getAttribute('role'),label:e.getAttribute('aria-label'),placeholder:e.getAttribute('placeholder'),text:(e.innerText||'').slice(0,100),type:e.type,disabled:!!e.disabled}))`;
  else if((operation==='click'||operation==='hover'||operation==='activate'||operation==='activate-text')&&label)expression=`(()=>{const text=${JSON.stringify(label)};let matches=[...document.querySelectorAll('button,a,[role="button"],[role="link"],[role^="menuitem"]')].filter(e=>e.innerText.trim()===text||(${JSON.stringify(operation)}!=='activate-text'&&e.getAttribute('aria-label')===text)).filter(e=>e.getBoundingClientRect().width>0);if(matches.length===0&&${JSON.stringify(operation)}==='activate')matches=[...document.querySelectorAll('span')].filter(e=>e.children.length===0&&e.textContent.trim()===text&&e.getBoundingClientRect().width>0);if(matches.length!==1||matches[0].disabled)throw Error('Expected one enabled control');if(${JSON.stringify(operation)}==='activate'||${JSON.stringify(operation)}==='activate-text'){matches[0].click();return {activated:text}}const r=matches[0].getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`;
  else if(operation==='row-action'&&label&&value)expression=`(()=>{const rows=[...document.querySelectorAll('[role="button"]')].filter(e=>e.getAttribute('aria-label')===${JSON.stringify(value)}&&e.getBoundingClientRect().width>0);if(rows.length!==1)throw Error('Expected one visible row');const controls=[...rows[0].querySelectorAll('button')].filter(e=>e.getAttribute('aria-label')===${JSON.stringify(label)});if(controls.length!==1||controls[0].disabled)throw Error('Expected one enabled row action');controls[0].click();return {row:${JSON.stringify(value)},action:${JSON.stringify(label)}}})()`;
  else if(operation==='search-key'&&['Enter','Escape','ArrowDown','ArrowUp'].includes(label))expression=`(()=>{if(!document.activeElement?.matches('input[role="combobox"]'))throw Error('Focused search combobox required');return {focused:true}})()`;
  else if(operation==='insert-focused'&&label)expression=`(()=>{const e=document.activeElement;if(!e||(!e.isContentEditable&&!(e instanceof HTMLTextAreaElement)&&!(e instanceof HTMLInputElement&&["text","search"].includes(e.type))))throw Error('Focused editable required');return {tag:e.tagName,editable:true}})()`;
  else if(operation==='describe'&&label)expression=`[...document.querySelectorAll('[aria-label]')].filter(e=>e.getAttribute('aria-label')===${JSON.stringify(label)}).map(e=>({html:e.outerHTML,ancestor:e.parentElement?.outerHTML.slice(0,5000),rect:e.getBoundingClientRect().toJSON()}))`;
  else if(operation==='locate'&&label)expression=`[...document.querySelectorAll('*')].filter(e=>e.children.length===0&&e.textContent.trim()===${JSON.stringify(label)}).map(e=>e.parentElement.parentElement.parentElement.outerHTML.slice(0,2400))`;
  else if(operation==='fill'&&label&&value!==undefined)expression=`(()=>{const matches=[...document.querySelectorAll('input')].filter(e=>e.getAttribute('aria-label')===${JSON.stringify(label)}||e.getAttribute('placeholder')===${JSON.stringify(label)});if(matches.length!==1)throw Error('Expected one input');const input=matches[0];Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,${JSON.stringify(value)});input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));return {filled:${JSON.stringify(label)}}})()`;
  else throw Error('Supported operations: inspect, click, hover, activate, activate-text, fill, insert-focused, search-key, row-action, describe');
  const result=await send('Runtime.evaluate',{returnByValue:true,expression});
  if(result.exceptionDetails)throw Error(result.exceptionDetails.text);
  if(operation==='search-key'){
   const code={Enter:13,Escape:27,ArrowDown:40,ArrowUp:38}[label];
   await send('Input.dispatchKeyEvent',{type:'keyDown',key:label,code:label,windowsVirtualKeyCode:code});
   await send('Input.dispatchKeyEvent',{type:'keyUp',key:label,code:label,windowsVirtualKeyCode:code});
   console.log(JSON.stringify({searchKey:label}));
  }else if(operation==='insert-focused'){
   await send('Input.insertText',{text:label});console.log(JSON.stringify({inserted:true}));
  }else if(operation==='click'||operation==='hover'){
   const {x,y}=result.result.value;
   await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y});
   if(operation==='click'){
   const hit=await send('Runtime.evaluate',{returnByValue:true,expression:`(()=>{const e=document.elementFromPoint(${x},${y})?.closest('button,a,[role="button"],[role="link"],[role^="menuitem"]');return !!e&&(e.innerText.trim()===${JSON.stringify(label)}||e.getAttribute('aria-label')===${JSON.stringify(label)})()`});
   if(hit.result.value!==true)throw Error('Control is obscured or moved; reveal it with hover and retry');
   await send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',clickCount:1});
   await send('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',clickCount:1});
   }
   console.log(JSON.stringify({operation,label,x,y}));
  }else console.log(JSON.stringify(result.result.value));
 }finally{clearTimeout(timer);ws.close()}
})().catch(e=>{console.error(e.message);process.exitCode=1});
