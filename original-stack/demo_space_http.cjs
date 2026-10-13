// Shapes recovered from app-initial Space/library queries and inbox module.
function demoSpaceHttp(method,url,body){
 if(url.origin!=='https://chatgpt.com')return null;
 const route=url.pathname;
 const paged=['/spaces/v2','/pages','/pages/catalog','/pages/mentions/inbox'];
 if(method==='GET'&&route==='/pins/pages')return [];
 if(method==='GET'&&paged.includes(route)){
  const cursor=url.searchParams.get('cursor'),limit=url.searchParams.get('limit');
  if(cursor)throw Error('Unknown empty demo page cursor');
  if(limit!==null&&(!/^[1-9][0-9]*$/.test(limit)||Number(limit)>100))throw Error('Invalid demo page limit');
  const result={items:[],next_cursor:null};
  if(route==='/pages/catalog')result.order_by=url.searchParams.get('order_by')||'last_used_at';
  return result;
 }
 if(method==='POST'&&route==='/files/library'){
  if(typeof body!=='string'||body.length>65536)throw Error('Expected library JSON body');
  const data=JSON.parse(body);
  if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Invalid library body');
  if(data.cursor)throw Error('Unknown empty library cursor');
  if(data.limit!=null&&(!Number.isInteger(data.limit)||data.limit<1||data.limit>100))throw Error('Invalid library limit');
  return {items:[],cursor:null};
 }
 return null;
}
module.exports={demoSpaceHttp};
