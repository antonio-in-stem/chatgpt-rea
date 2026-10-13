// Original plugins-query/plugins-skills-tabs personal catalog dependency.
function demoPluginHttp(method,url){
 if(method!=='GET'||url.origin!=='https://chatgpt.com'||url.pathname!=='/ps/plugins/list')return null;
 if(url.searchParams.get('scope')!=='USER')throw Error('Only synthetic USER plugin catalog is supported');
 const raw=url.searchParams.get('limit');
 if(raw!==null&&!/^[1-9][0-9]*$/.test(raw))throw Error('Invalid plugin page limit');
 const limit=raw===null?50:Number(raw);
 if(limit>100||url.searchParams.get('pageToken'))throw Error('Unsupported demo plugin page');
 return {plugins:[],pagination:{limit,next_page_token:null}};
}
module.exports={demoPluginHttp};
