import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/examples/index.html':pathname));
  const relative=path.relative(root,file).replaceAll('\\','/');
  if(!['examples/','dist/','styles/'].some(prefix=>relative.startsWith(prefix))||relative.includes('..')){res.writeHead(404);return res.end();}
  const real=fs.realpathSync(file);if(!real.startsWith(root+path.sep)){res.writeHead(404);return res.end();}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(fs.readFileSync(file));
 }catch{res.writeHead(404);res.end();}
});
server.listen(0,'127.0.0.1',()=>console.log(`Demo: http://127.0.0.1:${server.address().port}/examples/index.html`));
