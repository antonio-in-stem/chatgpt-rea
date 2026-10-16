// Validate an explicitly selected installed frontend payload before original protocol startup.
function demoFrontendRoot(env,fs,path,crypto){
 const selected=env.REA_DEMO_FRONTEND_PACKAGE;if(!selected)return null;
 if(!env.REA_DEMO_SETTINGS_PATH)throw Error('Frontend package requires demo host');
 const root=fs.realpathSync(selected),metadata=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
 if(metadata.name!=='@rea/original-frontend')throw Error('Unexpected frontend package');
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
 if(manifest.sourceArchiveSha256!=='c5fdef328cfa2ad9095786f9c3a7aaa447e68834d31299d6ef2592da02029038'||manifest.rendererModified!==false||!Array.isArray(manifest.files))throw Error('Unexpected payload provenance');
 const webview=fs.realpathSync(path.join(root,'webview')),seen=new Set();
 for(const item of manifest.files){
  if(typeof item.path!=='string'||item.path.split('/').some(p=>!p||p==='.'||p==='..'||/[\\:]/.test(p))||seen.has(item.path))throw Error('Unsafe or duplicate frontend path');
  seen.add(item.path);const file=fs.realpathSync(path.join(webview,...item.path.split('/')));
  if(!file.startsWith(webview+path.sep))throw Error('Frontend file escapes package');
  const bytes=fs.readFileSync(file);
  if(bytes.length!==item.bytes||crypto.createHash('sha256').update(bytes).digest('hex')!==item.sha256)throw Error('Frontend integrity mismatch: '+item.path);
 }
 if(!seen.has('index.html')||!seen.has('detached-window.html'))throw Error('Missing frontend entry');
 console.info('[rea-demo-frontend] installed payload verified: '+seen.size+' files');
 return webview;
}
module.exports={demoFrontendRoot};
