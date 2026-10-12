(async () => {
  const checks = [];
  const assert = (name, value) => { checks.push({name, passed: !!value}); if (!value) throw Error(name); };
  const frameProbe = '<script>parent.postMessage({kind:"smoke-frame",title:document.querySelector("h1")?.textContent,notes:!!document.querySelector("textarea"),count:document.querySelector("#count")?.textContent},"*")<\/script>';
  const navigate = (action) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => { removeEventListener('message', listen); reject(Error('Local iframe did not report DOM readiness')); }, 3000);
    const listen = event => {
      if (event.source !== $('page').contentWindow || event.data?.kind !== 'smoke-frame') return;
      clearTimeout(timer); removeEventListener('message', listen); resolve(event.data);
    };
    addEventListener('message', listen); action();
  });
  try {
    if (document.readyState !== 'complete') await new Promise(resolve => addEventListener('load', resolve, {once:true}));
    assert('top-level title', document.title === 'Web content preview');
    assert('toolbar controls', ['back','forward','reload','address','go','page'].every(id => !!$(id)));
    assert('iframe scripts allowed without same-origin', $('page').getAttribute('sandbox') === 'allow-scripts');
    Object.keys(pages).forEach(key => pages[key] += frameProbe);
    let frame = await navigate(() => $('reload').click());
    assert('home iframe DOM', frame.title === 'A place for your ideas.');
    assert('initial navigation state', $('address').value === 'demo://home' && $('back').disabled && $('forward').disabled);
    frame = await navigate(() => { $('address').value = 'demo://notes'; $('go').click(); });
    assert('go renders editable notes', frame.title === 'Notes' && frame.notes && $('address').value === 'demo://notes');
    frame = await navigate(() => $('back').click());
    assert('back returns home', frame.title === 'A place for your ideas.' && !$('forward').disabled);
    frame = await navigate(() => $('forward').click());
    assert('forward restores notes', frame.notes && !$('back').disabled);
    frame = await navigate(() => $('reload').click());
    assert('reload retains current page', frame.notes && $('address').value === 'demo://notes');
    frame = await navigate(() => { $('address').value = 'demo://dashboard'; $('address').dispatchEvent(new KeyboardEvent('keydown', {key:'Enter', bubbles:true})); });
    assert('address Enter renders dashboard', frame.title === 'Project dashboard' && frame.count === '12');
    $('address').value = 'https://example.invalid'; $('go').click();
    assert('external address rejected', $('status').textContent.startsWith('Use demo://') && $('page').srcdoc.includes('Project dashboard'));
    window.ipc.postMessage(JSON.stringify({kind:'native-web-host-smoke',ok:true,title:document.title,checks}));
  } catch (error) {
    window.ipc.postMessage(JSON.stringify({kind:'native-web-host-smoke',ok:false,error:String(error),checks}));
  }
})();
