'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { createDemoIdentity } = require('./demo_identity.cjs');
test('one local fixture supplies consistent source-shaped identity without credentials', () => {
  const asset = path.resolve(__dirname, '../../../extracted/webview/assets/atlas-app-5b67bfaeebb3.png');
  const demo = createDemoIdentity({avatarPngPath: asset});
  const info = demo.accountInfo(), user = demo.currentUser(), account = demo.accountRead();
  assert.equal(info.userId, user.id);
  assert.equal(info.email, user.email);
  assert.equal(account.account.email, user.email);
  assert.equal(info.hasChatGptToken, false);
  assert.equal(account.requiresOpenaiAuth, false);
  assert.equal(account.account.type, 'chatgpt');
  assert.deepEqual(Buffer.from(user.picture.split(',')[1], 'base64'), fs.readFileSync(asset));
  info.userId = 'changed'; user.name = 'changed'; account.account.email = 'changed';
  assert.equal(demo.accountInfo().userId, 'rea-demo-user');
  assert.equal(demo.currentUser().name, 'Demo');
  assert.equal(demo.accountRead().account.email, 'demo@example.invalid');
  assert.doesNotMatch(JSON.stringify([info,user,account]), /access_token|refresh_token|authToken/);
});
test('invalid local image fails before an identity is made', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'rea-demo-identity-'));
  const file = path.join(temp, 'bad.png');
  try {
    fs.writeFileSync(file, 'not an image');
    assert.throws(() => createDemoIdentity({avatarPngPath:file}), /PNG/);
    assert.throws(() => createDemoIdentity({avatarPngPath:temp}), /must be a file/);
    assert.throws(() => createDemoIdentity({avatarPngPath:''}), /required/);
  } finally { fs.rmSync(file, {force:true}); fs.rmdirSync(temp); }
});

test('signed-in scenario changes UI state without generating any token', () => {
  const avatarPngPath=path.resolve(__dirname,'../../../extracted/webview/assets/atlas-app-5b67bfaeebb3.png');
  const demo=createDemoIdentity({avatarPngPath,sessionState:'signedIn'});
  assert.equal(demo.accountInfo().hasChatGptToken,true);
  assert.equal(demo.currentUser().id,demo.accountInfo().userId);
  assert.equal(Object.hasOwn(demo.accountInfo(),'authToken'),false);
  assert.throws(()=>createDemoIdentity({avatarPngPath,sessionState:'unknown'}),/scenario/);
});

test('account map, host account array and workspace settings describe the same demo', () => {
  const avatarPngPath=path.resolve(__dirname,'../../../extracted/webview/assets/atlas-app-5b67bfaeebb3.png');
  const demo=createDemoIdentity({avatarPngPath,sessionState:'signedIn'});
  const id=demo.accountInfo().accountId, map=demo.accountsCheck(), host=demo.hostAccounts();
  assert.equal(map.accounts[id].account.account_id,id);
  assert.equal(host.accounts[0].id,id);
  assert.equal(host.accounts[0].account_user_id,demo.accountInfo().userId);
  assert.equal(map.accounts[id].can_access_with_session,true);
  assert.equal(host.accounts[0].is_deactivated,false);
  assert.deepEqual(map.account_ordering,host.account_ordering);
  assert.equal(host.default_account_id,id);
  host.accounts[0].name='mutated';map.accounts[id].account.name='mutated';
  assert.equal(demo.hostAccounts().accounts[0].name,'REA Demo');
  assert.equal(demo.accountsCheck().accounts[id].account.name,'REA Demo');
  assert.deepEqual(demo.workspaceSettings().beta_settings,{});
});

test('original trial selector accepts the demo free account without a subscription',()=>{
 const vm=require('node:vm');
 const source=fs.readFileSync(path.join(__dirname,'state/recovered-all/readable/assets/app-primary-19fe57fd8c00.js'),'utf8');
 const begin=source.indexOf('function lGe('),end=source.indexOf('function SP()',begin);
 assert(begin>=0&&end>begin);
 const scope={yke(){throw Error('No active subscription should reach offer evaluation')}};
 vm.runInNewContext(source.slice(begin,end),scope);
 const demo=createDemoIdentity({avatarPngPath:path.resolve(__dirname,'../../../extracted/webview/assets/atlas-app-5b67bfaeebb3.png'),sessionState:'signedIn'});
 const info=demo.accountInfo(),account=demo.accountsCheck().accounts[info.accountId];
 assert.equal(scope.lGe(account,info.accountId,info.userId,Date.now(),true),null);
});
