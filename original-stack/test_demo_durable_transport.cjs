const {test}=require('node:test'),assert=require('node:assert/strict');
const {demoDurableTransport:make}=require('./demo_durable_transport.cjs');
class Transport{constructor(options){this.options=options;}}
const host={hostConfig:{id:'durable'}},env={REA_DEMO_SETTINGS_PATH:'demo-settings',CODEX_APP_SERVER_WS_URL:'ws://127.0.0.1:12345'};
test('durable uses dedicated loopback route without handshake and local stays original',()=>{const result=make(host,env,Transport);assert.deepEqual(result.options,{hostConfig:host.hostConfig,websocketUrl:'ws://127.0.0.1:12345/demo-durable'});assert.equal(make({hostConfig:{id:'local'}},{},Transport),null);});
test('non-demo and remote/credential-bearing endpoints fail closed',()=>{assert.throws(()=>make(host,{},Transport));for(const url of ['wss://127.0.0.1:12345','ws://example.com:12345','ws://a:b@127.0.0.1:12345','ws://127.0.0.1:12345/path','ws://127.0.0.1:12345?x=1','ws://127.0.0.1:12345#x'])assert.throws(()=>make(host,{...env,CODEX_APP_SERVER_WS_URL:url},Transport));});
