// Local demo persistence for original sidebar and observed boolean preference contracts.
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
  const preferenceFile = file + '.preferences.json';
  const booleanFeatures = ['training_allowed','precise_location_allowed'];
  const accentValues = ['default','blue','green','yellow','pink','orange','purple','black'];
  function preferences() {
    if (!fs.existsSync(preferenceFile)) return {};
    const record = JSON.parse(fs.readFileSync(preferenceFile,'utf8'));
    if (!record || typeof record !== 'object' || Array.isArray(record) ||
        Object.entries(record).some(([key,value]) => key === 'chat_theme' ? !accentValues.includes(value) : !booleanFeatures.includes(key) || typeof value !== 'boolean'))
      throw Error('Invalid demo boolean preferences');
    return record;
  }
  if (read) {
    const settings = preferences();
    if (fs.existsSync(file)) settings.sidebar_customization = validate(JSON.parse(fs.readFileSync(file,'utf8')));
    return {settings};
  }
  const feature = url.searchParams.get('feature');
  if (feature !== 'sidebar_customization' && feature !== 'chat_theme' && !booleanFeatures.includes(feature)) throw Error('Unsupported demo setting');
  const serialized = url.searchParams.get('value');
  if (!serialized || serialized.length > 65536) throw Error('Invalid demo setting size');
  let value;
  if (feature === 'sidebar_customization') value = validate(JSON.parse(serialized));
  else if (feature === 'chat_theme') {
    if (!accentValues.includes(serialized)) throw Error('Invalid demo accent');
    value = {...preferences(),chat_theme:serialized};
    file = preferenceFile;
  } else {
    if (!['true','false'].includes(serialized)) throw Error('Invalid demo boolean preference');
    value = {...preferences(),[feature]:serialized === 'true'};
    file = preferenceFile;
  }
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
  return feature === 'chat_theme' ? value : {};
}
module.exports={demoSidebarSettings};
