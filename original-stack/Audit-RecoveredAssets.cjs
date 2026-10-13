// Verify recovered text against its manifest and resolve literal module references only.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const source=path.resolve('C:/Users/PC/Repositories/chatgpt-rea/extracted/webview/assets');
const output=path.join(__dirname,'state/recovered-all');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifestPath=path.join(output,'manifest.json');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const records=new Map(manifest.files.map(r=>[path.basename(r.original),r]));
const names=fs.readdirSync(source).filter(n=>/\.(js|mjs|css)$/.test(n)).sort();
const issues=[],references=[];
for(const name of names){
 const r=records.get(name);
 if(!r){issues.push({name,reason:'missing record'});continue;}
 if(r.error||r.astEquivalent===false)issues.push({name,reason:'recovery validation failed'});
 const original=fs.readFileSync(path.join(source,name));
 if(hash(original)!==r.originalSha256)issues.push({name,reason:'original hash mismatch'});
 const dest=path.join(output,'readable/assets',name);
 if(!fs.existsSync(dest)||hash(fs.readFileSync(dest))!==r.readableSha256)issues.push({name,reason:'readable hash mismatch'});
 for(const ref of r.imports||[]){
  const spec=ref.specifier;
  if(!spec.startsWith('.')){references.push({from:name,...ref,resolution:'external-or-runtime'});continue;}
  const resolved=path.resolve(source,spec.split(/[?#]/)[0]);
  const exists=fs.existsSync(resolved);
  references.push({from:name,...ref,resolution:exists?'present':'missing',target:path.relative(source,resolved).replaceAll('\\','/')});
 }
}
for(const name of records.keys())if(!names.includes(name))issues.push({name,reason:'record outside current selection'});
const report={capturedUtc:new Date().toISOString(),manifestSha256:hash(fs.readFileSync(manifestPath)),expected:names.length,records:records.size,issues,literalReferences:references.length,missingReferences:references.filter(r=>r.resolution==='missing'),externalOrRuntimeReferences:references.filter(r=>r.resolution==='external-or-runtime'),limitations:['Only top-level distributed JS/MJS/CSS selected','Only literal import/export specifiers recovered by Babel; computed imports and resource URLs not covered','CSS is parsed/formatted, not independently semantic-equivalence verified','No original TypeScript, source-map recovery or standalone source build claimed']};
fs.writeFileSync(path.join(output,'dependency-edges.json'),JSON.stringify(references,null,2)+'\n');
fs.writeFileSync(path.join(output,'audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,issues:issues.length,missingReferences:report.missingReferences.length,externalOrRuntimeReferences:report.externalOrRuntimeReferences.length}));
if(issues.length||report.missingReferences.length)process.exitCode=1;
