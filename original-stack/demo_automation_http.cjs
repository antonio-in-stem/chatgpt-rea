// Scheduled page: app-shared-737655e1fb23.js:254224 consumes items and cursor.
function demoAutomationHttp(method,url){
 if(method!=='GET'||url.origin!=='https://chatgpt.com'||url.pathname!=='/automations')return null;
 const filter=url.searchParams.get('filter');
 if(filter!==null&&!['scheduled','finished','paused'].includes(filter))throw Error('Unsupported demo automation filter');
 const raw=url.searchParams.get('limit');
 if(raw!==null&&(!/^[1-9][0-9]*$/.test(raw)||Number(raw)>100))throw Error('Invalid automation page size');
 if(url.searchParams.get('cursor'))throw Error('Unknown demo automation cursor');
 return {items:[],cursor:null};
}
module.exports={demoAutomationHttp};
