// Read-only metrics from the untouched renderer; restricted to credential-free demo profiles.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function measureRenderer() {
  const properties = ['display','position','box-sizing','width','height','min-width','max-width','min-height','max-height','padding-top','padding-right','padding-bottom','padding-left','margin-top','margin-right','margin-bottom','margin-left','gap','row-gap','column-gap','corner-shape','corner-top-left-shape','corner-top-right-shape','corner-bottom-right-shape','corner-bottom-left-shape','border-top-left-radius','border-top-right-radius','border-bottom-right-radius','border-bottom-left-radius','border-top-width','border-right-width','border-bottom-width','border-left-width','border-top-color','border-right-color','border-bottom-color','border-left-color','border-top-style','background-color','background-image','background-clip','backdrop-filter','filter','mask-image','color','box-shadow','opacity','font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-rendering','overflow-x','overflow-y','align-items','justify-content','flex-direction','flex-grow','flex-shrink','transform','clip-path','transition-property','transition-duration','transition-timing-function'];
  const nodes = [], ids = new Map();
  const variables = e => {const s=getComputedStyle(e);return Object.fromEntries([...s].filter(p=>p.startsWith('--')).map(p=>[p,s.getPropertyValue(p)]))};
  const rootVariables=variables(document.documentElement);
  function selector(e) {
    const parts = [];
    while(e && e.nodeType === 1) {
      const tag = e.tagName.toLowerCase();
      const siblings = e.parentElement ? [...e.parentElement.children].filter(n => n.tagName === e.tagName) : [e];
      parts.unshift(`${tag}:nth-of-type(${siblings.indexOf(e)+1})`);
      e = e.parentElement;
    }
    return parts.join(' > ');
  }
  function record(e) {
    if(ids.has(e)) return ids.get(e);
    const id = nodes.length, s = getComputedStyle(e), r = e.getBoundingClientRect();
    ids.set(e,id);
    nodes.push({id,selector:selector(e),tag:e.tagName,classes:e.getAttribute('class'),role:e.getAttribute('role'),ariaLabel:e.getAttribute('aria-label'),ariaExpanded:e.getAttribute('aria-expanded'),ariaChecked:e.getAttribute('aria-checked'),dataState:e.getAttribute('data-state'),dataHighlighted:e.hasAttribute('data-highlighted'),ariaHidden:e.getAttribute('aria-hidden'),inert:e.inert,rect:{x:r.x,y:r.y,width:r.width,height:r.height},styles:Object.fromEntries(properties.map(p=>[p,s.getPropertyValue(p)])),variableOverrides:Object.fromEntries(Object.entries(variables(e)).filter(([k,v])=>v!==(e.parentElement?getComputedStyle(e.parentElement).getPropertyValue(k):rootVariables[k]))),scroll:{width:e.scrollWidth,height:e.scrollHeight,left:e.scrollLeft,top:e.scrollTop},focused:document.activeElement===e,hovered:e.matches(':hover')});
    nodes[id].parentId=e.parentElement?record(e.parentElement):null;
    nodes[id].pseudoElements=Object.fromEntries(["::before","::after"].map(p=>{const ps=getComputedStyle(e,p);return [p,{content:ps.content,...Object.fromEntries(properties.map(k=>[k,ps.getPropertyValue(k)]))}]}));
    return id;
  }
  const buttons = [...document.querySelectorAll('button')];
  const anchors = {
    sidebarToggle:buttons.find(e=>['Ocultar barra lateral','Mostrar barra lateral'].includes(e.getAttribute('aria-label'))),
    conversationMain:document.querySelector('main'),
    conversationScroller:document.querySelector('.thread-scroll-container'),
    railHome:buttons.find(e=>e.innerText.trim()==='Inicio'),
    sidebarMode:buttons.find(e=>e.getAttribute('aria-label')?.startsWith('Cambiar de modo')),
    sidebarNewChat:buttons.find(e=>e.innerText.trim()==='Nuevo chat'),
    conversationActions:document.querySelector('[aria-label="Acciones del chat"]'),
    composer:document.querySelector('[contenteditable="true"]'),
    composerSend:document.querySelector('button[aria-label="Enviar"]'),
    composerPermissions:document.querySelector('button[aria-label="Cambiar permisos"]'),
    userMessage:document.querySelector('._bubble_11evq_1'),
    tableInline:document.querySelector('[data-markdown-table] table'),
    tableExpand:document.querySelector('[aria-label="Expandir tabla"]'),
    tablePreviewClose:document.querySelector('[aria-label="Cerrar vista previa de tabla"]'),
    tablePreview:document.querySelector('[aria-label="Cerrar vista previa de tabla"]')?.closest('[role="dialog"]'),
    tablePreviewGrid:document.querySelector('[aria-label="Cerrar vista previa de tabla"]')?.closest('[role="dialog"]')?.querySelector('table'),
    userMessageToggle:document.querySelector('._bubble_11evq_1 button[aria-expanded]'),
  };
  // Capture actual visible portal menus and each interactive row, including nested submenus.
  for(const [i,menu] of [...document.querySelectorAll('[role="menu"]')].filter(e=>e.getBoundingClientRect().width>0).entries()) {
    anchors[`menu${i}`]=menu;
    for(const [j,row] of [...menu.querySelectorAll('[role^="menuitem"]')].filter(e=>e.closest('[role="menu"]')===menu).entries())anchors[`menu${i}Item${j}`]=row;
  }
  const chains = {}, fontSamples = {};
  for(const [name,e] of Object.entries(anchors)) {
    chains[name]=[];
    fontSamples[name]=[];
    if(e){
      const walker=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);
      let text;
      while((text=walker.nextNode()) && fontSamples[name].length<8){
        const parent=text.parentElement;
        if(text.textContent.trim() && parent.getBoundingClientRect().width>0){
          const id=record(parent);
          if(!fontSamples[name].includes(id))fontSamples[name].push(id);
        }
      }
    }
    for(let n=e;n;n=n.parentElement)chains[name].push(record(n));
  }
  const userAncestorGeometry=(chains.userMessage||[]).map(id=>{
    const e=document.querySelector(nodes[id].selector);
    return {id,children:[...e.children].map(child=>({tag:child.tagName,classes:child.getAttribute('class'),role:child.getAttribute('role'),rect:child.getBoundingClientRect().toJSON()}))};
  });
  return {userAncestorGeometry,viewport:{width:innerWidth,height:innerHeight,devicePixelRatio,visualViewportScale:visualViewport?.scale},document:{url:location.href,visibility:document.visibilityState,focused:document.hasFocus(),fontsStatus:document.fonts.status,activeElement:{tag:document.activeElement?.tagName,role:document.activeElement?.getAttribute('role'),label:document.activeElement?.getAttribute('aria-label')}},anchors:chains,fontSamples,rootVariables,nodes};
}

(async()=>{
  const stateName=process.argv[2];
  if(!/^demo-[a-zA-Z0-9][a-zA-Z0-9_-]{0,57}$/.test(stateName||''))throw Error('Explicit demo profile required');
  const state=path.join(__dirname,'state',stateName);
  if(fs.existsSync(path.join(state,'codex-home','auth.json')))throw Error('Profile contains account credentials');
  const port=fs.readFileSync(path.join(state,'profile','DevToolsActivePort'),'utf8').split(/\r?\n/)[0];
  if(!/^\d+$/.test(port))throw Error('Invalid CDP port');
  const targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target=targets.find(t=>t.type==='page'&&t.url==='app://-/index.html');
  if(!target)throw Error('Original renderer missing');
  const ws=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
  let sequence=0;const pending=new Map(),styleSheets=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.method==='CSS.styleSheetAdded')styleSheets.set(m.params.header.styleSheetId,m.params.header);const p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result)}};
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
  const timer=setTimeout(()=>{for(const p of pending.values())p.reject(Error('Metrics timeout'));ws.close()},20000);
  try{
    await send('DOM.enable');await send('CSS.enable');
    const root=await send('DOM.getDocument',{depth:0});
    const measured=await send('Runtime.evaluate',{expression:`(${measureRenderer.toString()})()`,returnByValue:true});
    if(measured.exceptionDetails)throw Error('Renderer measurement failed');
    const metrics=measured.result.value;
    if(!metrics.anchors.composer.length||!metrics.anchors.railHome.length)throw Error('Shell/composer not ready');
    const fontNodeIds=new Set([...Object.values(metrics.anchors).filter(c=>c.length).map(c=>c[0]),...Object.values(metrics.fontSamples).flat()]);
    const menuNodeIds=new Set(Object.entries(metrics.anchors).filter(([name,c])=>name.startsWith('menu')&&c.length).map(([,c])=>c[0]));
    for(const id of fontNodeIds){
      const node=metrics.nodes[id];
      const found=await send('DOM.querySelector',{nodeId:root.root.nodeId,selector:node.selector});
      if(found.nodeId){
        node.platformFonts=(await send('CSS.getPlatformFontsForNode',{nodeId:found.nodeId})).fonts;
        if(menuNodeIds.has(id)){
          const matched=await send('CSS.getMatchedStylesForNode',{nodeId:found.nodeId});
          node.matchedRules=(matched.matchedCSSRules||[]).map(({rule,matchingSelectors})=>({selectors:rule.selectorList,matchingSelectors,origin:rule.origin,style:rule.style,media:rule.media,supports:rule.supports,source:styleSheets.get(rule.styleSheetId)||null}));
        }
      }
    }
    const hash=relative=>crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'pristine',relative))).digest('hex');
    const report={capturedUtc:new Date().toISOString(),profile:stateName,targetId:target.id,method:'Read-only computed styles, geometry and CDP platform fonts; no renderer mutation',source:{exeSha256:hash('ChatGPT.exe'),asarSha256:hash('resources/app.asar')},limitations:['One viewport and UI state; not a complete responsive or interaction specification','CSS px; physical dimensions depend on devicePixelRatio','Computed styles do not identify source rules or reproduce Chromium rasterization','Missing anchors are explicit empty arrays'],...metrics};
    fs.writeFileSync(path.join(state,'render-metrics.json'),JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify({viewport:metrics.viewport,nodes:metrics.nodes.length,anchors:Object.fromEntries(Object.entries(metrics.anchors).map(([k,v])=>[k,v.length])),output:path.join(state,'render-metrics.json')}));
  }finally{clearTimeout(timer);ws.close()}
})().catch(e=>{console.error(e.message);process.exitCode=1});
