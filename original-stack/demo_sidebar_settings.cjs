// Local demo persistence for the original sidebar_customization HTTP contract.
'use strict';
function demoSidebarSettings(method, url, file, fs) {
  if (url.origin !== 'https://chatgpt.com') return null;
  const read = method === 'GET' && url.pathname === '/settings/user';
  const write = method === 'PATCH' && url.pathname === '/settings/account_user_setting';
  if (!read && !write) return null;
  if (!file) throw Error('Explicit demo settings path required');
  function validate(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) ||
        !Array.isArray(value.order) || value.order.length > 128 ||
        value.order.some(x => typeof x !== 'string' || !x || x.length > 256) ||
        new Set(value.order).size !== value.order.length ||
        !value.pinOverrides || typeof value.pinOverrides !== 'object' || Array.isArray(value.pinOverrides) ||
        Object.entries(value.pinOverrides).length > 128 ||
        Object.entries(value.pinOverrides).some(([k,v]) => !k || k.length > 256 || typeof v !== 'boolean'))
      throw Error('Invalid demo sidebar customization');
    return {order:[...value.order],pinOverrides:{...value.pinOverrides}};
  }
  if (read) {
    if (!fs.existsSync(file)) return {settings:{}};
    return {settings:{sidebar_customization:validate(JSON.parse(fs.readFileSync(file,'utf8')))}};
  }
  if (url.searchParams.get('feature') !== 'sidebar_customization') throw Error('Unsupported demo setting');
  const serialized = url.searchParams.get('value');
  if (!serialized || serialized.length > 65536) throw Error('Invalid demo setting size');
  const value = validate(JSON.parse(serialized));
  // A failed write must not be reported as success or alter the previous record.
  const temporary = file + '.pending';
  let created = false;
  try {
    fs.writeFileSync(temporary,JSON.stringify(value)+'\n',{flag:'wx'});
    created = true;
    fs.renameSync(temporary,file);
  } catch (error) {
    // Only remove a temporary file created by this write.
    if (created) { try { fs.unlinkSync(temporary); } catch {} }
    throw error;
  }
  return {};
}
module.exports={demoSidebarSettings};
