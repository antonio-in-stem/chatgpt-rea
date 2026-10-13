// Change only the served demo index connection policy; original JS/CSS remain untouched.
async function demoPageCsp(url,response,settingsPath,fs,path){
 if(url!=='app://-/index.html'||!settingsPath||path.basename(settingsPath)!=='demo-sidebar-settings.json')return response;
 const runtime=JSON.parse(fs.readFileSync(path.join(path.dirname(settingsPath),'demo-pages-runtime.json'),'utf8'));
 if(!/^ws:\/\/127\.0\.0\.1:[1-9][0-9]*$/.test(runtime.endpoint))throw Error('Invalid demo endpoint');
 const html=await response.text();
 const marker='connect-src &#39;self&#39;';
 if(html.split(marker).length!==2)throw Error('Unexpected original CSP');
 const modified=html.replace(marker,marker+' '+runtime.endpoint+'/demo-pages/');
 const headers=new Headers(response.headers);headers.delete('content-length');
 return new Response(modified,{status:response.status,statusText:response.statusText,headers});
}
module.exports={demoPageCsp};
