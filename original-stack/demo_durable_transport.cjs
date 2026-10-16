// Used only by the separately built demo host. No real-account transport or tokens.
function demoDurableTransport(options,env,WebSocketTransport){
 if(options.hostConfig?.id!=='durable')return null;
 if(!env.REA_DEMO_SETTINGS_PATH)throw Error('Explicit demo state required');
 const url=new URL(env.CODEX_APP_SERVER_WS_URL);
 if(url.protocol!=='ws:'||url.hostname!=='127.0.0.1'||!url.port||url.username||url.password||url.pathname!=='/'||url.search||url.hash)throw Error('Expected isolated demo loopback endpoint');
 url.pathname='/demo-durable';
 return new WebSocketTransport({hostConfig:options.hostConfig,websocketUrl:url.href});
}
module.exports={demoDurableTransport};
