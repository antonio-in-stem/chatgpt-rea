// Verify recovered text against its manifest and resolve literal module references only.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {builtinModules,createRequire}=require('node:module');
const builtins=new Set(builtinModules.flatMap(n=>[n,n.startsWith('node:')?n:'node:'+n]));
const babel=require('C:/Users/PC/AppData/Local/npm-cache/_npx/83e71da30ae7cab2/node_modules/prettier/plugins/babel');
(async()=>{
const host=process.argv.includes('--host');
const source=path.resolve('C:/Users/PC/Repositories/chatgpt-rea/extracted',host?'.vite/build':'webview/assets');
const output=path.join(__dirname,host?'state/recovered-host':'state/recovered-all');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifestPath=path.join(output,'manifest.json');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const records=new Map(manifest.files.map(r=>[path.basename(r.original),r]));
const names=fs.readdirSync(source).filter(n=>/\.(js|mjs|css)$/.test(n)).sort();
const issues=[],references=[],computedRequires=[];
async function commonJsReferences(code,name){
 const ast=await babel.parsers.babel.parse(code,{}),result=[],stack=[ast];
 while(stack.length){
  const v=stack.pop();if(!v||typeof v!=='object')continue;
  if(v.type==='CallExpression'&&v.callee?.type==='Identifier'&&v.callee.name==='require'){
   const a=v.arguments?.[0];
   if(a?.type==='StringLiteral')result.push({kind:'require-literal-candidate',specifier:a.value,line:v.loc?.start.line});
   else computedRequires.push({from:name,line:v.loc?.start.line,argumentType:a?.type||null});
  }
  for(const [key,x] of Object.entries(v))if(!['loc','tokens','comments','leadingComments','trailingComments','innerComments','extra'].includes(key)){
   if(Array.isArray(x))stack.push(...x);else if(x&&typeof x==='object')stack.push(x);
  }
 }
 return result;
}
for(const name of names){
 const r=records.get(name);
 if(!r){issues.push({name,reason:'missing record'});continue;}
 if(r.error||(/\.m?js$/.test(name)&&r.astEquivalent!==true))issues.push({name,reason:'recovery validation failed'});
 const original=fs.readFileSync(path.join(source,name));
 if(hash(original)!==r.originalSha256)issues.push({name,reason:'original hash mismatch'});
 const dest=path.join(output,'readable/assets',name);
 if(!fs.existsSync(dest)||hash(fs.readFileSync(dest))!==r.readableSha256)issues.push({name,reason:'readable hash mismatch'});
 const refs=[...(r.imports||[]),...(host?await commonJsReferences(original.toString('utf8'),name):[])];
 for(const ref of refs){
  const spec=ref.specifier;
  if(ref.kind==='require-literal-candidate'){
   if(builtins.has(spec)){references.push({from:name,...ref,resolution:'node-builtin'});continue;}
   if(spec==='electron'){references.push({from:name,...ref,resolution:'desktop-runtime-provided'});continue;}
   try{
    const resolved=createRequire(path.join(source,name)).resolve(spec);
    references.push({from:name,...ref,resolution:'present',target:path.relative(source,resolved).replaceAll('\\','/')});
   }catch(error){references.push({from:name,...ref,resolution:'unresolved-require-candidate',code:error.code});}
   continue;
  }
  if(!spec.startsWith('.')){references.push({from:name,...ref,resolution:'external-or-runtime'});continue;}
  const resolved=path.resolve(source,spec.split(/[?#]/)[0]);
  const exists=fs.existsSync(resolved);
  references.push({from:name,...ref,resolution:exists?'present':'missing',target:path.relative(source,resolved).replaceAll('\\','/')});
 }
}
for(const name of records.keys())if(!names.includes(name))issues.push({name,reason:'record outside current selection'});
const report={capturedUtc:new Date().toISOString(),manifestSha256:hash(fs.readFileSync(manifestPath)),expected:names.length,records:records.size,javascriptAstVerified:manifest.files.filter(r=>/\.m?js$/.test(r.original)&&r.astEquivalent===true).length,cssFormatted:manifest.files.filter(r=>r.original.endsWith('.css')&&!r.error).length,issues,literalReferences:references.length,computedRequires,unresolvedRequireCandidates:references.filter(r=>r.resolution==='unresolved-require-candidate'),missingReferences:references.filter(r=>r.resolution==='missing'),externalOrRuntimeReferences:references.filter(r=>r.resolution==='external-or-runtime'),limitations:['Only top-level distributed JS/MJS/CSS in selected renderer or host directory','Host only: direct require(string) syntactic candidates included; aliases/shadowing/require.resolve are not analyzed; resolution uses local Node conditions, not proof of runtime loading','Only literal import/export specifiers recovered by Babel; computed imports and resource URLs not covered','CSS is parsed/formatted, not independently semantic-equivalence verified','No original TypeScript, source-map recovery or standalone source build claimed']};
fs.writeFileSync(path.join(output,'dependency-edges.json'),JSON.stringify(references,null,2)+'\n');
fs.writeFileSync(path.join(output,'audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,issues:issues.length,missingReferences:report.missingReferences.length,externalOrRuntimeReferences:report.externalOrRuntimeReferences.length}));
if(issues.length||report.missingReferences.length)process.exitCode=1;

})().catch(e=>{console.error(e);process.exitCode=1});
