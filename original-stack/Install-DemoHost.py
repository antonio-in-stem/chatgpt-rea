"""Install a built demo ASAR into the previously staged, stopped test runtime."""
import hashlib,json,shutil,struct,sys
from pathlib import Path
root=Path(__file__).resolve().parent
stage=root/'state/instrumented-profile-host'
location=json.loads((stage/'runtime-location.json').read_text())
runtime=Path(location['runtimeRoot']).resolve()
if runtime == (root/'pristine').resolve():raise SystemExit('Refusing pristine runtime')
package=Path(sys.argv[1]).resolve()
new=json.loads((package/'patch-manifest.json').read_text())
old=json.loads(Path(location['patchManifestPath']).read_text())
def sha(p):
 with p.open('rb') as f:return hashlib.file_digest(f,'sha256').hexdigest()
if new['sourceSha256']!='c5fdef328cfa2ad9095786f9c3a7aaa447e68834d31299d6ef2592da02029038' or new['rendererFilesModified']:raise SystemExit('Unexpected package provenance')
if sha(package/'app.asar')!=new['outputSha256']:raise SystemExit('Package digest mismatch')
exe=runtime/'ChatGPT.exe';before=exe.read_bytes()
patch=old['executablePatch']
if hashlib.sha256(before).hexdigest()!=patch['patchedSha256']:raise SystemExit('Executable changed')
with (package/'app.asar').open('rb') as f:
 h=f.read(16);header=f.read(struct.unpack('<4I',h)[3])
expected=patch['demoHeaderHash'].encode();replacement=hashlib.sha256(header).hexdigest().encode()
if before.count(expected)!=1 or before.find(expected)!=patch['offset']:raise SystemExit('Non-unique integrity reference')
after=before.replace(expected,replacement)
tmp=runtime/'resources/app.asar.rea-new'
if tmp.exists():raise SystemExit('Pending install exists')
shutil.copyfile(package/'app.asar',tmp)
if sha(tmp)!=new['outputSha256']:raise SystemExit('Copied package differs')
tmp.replace(runtime/'resources/app.asar');exe.write_bytes(after)
new['executablePatch']={**patch,'patchedSha256':sha(exe),'demoHeaderHash':replacement.decode()}
new['previousExecutableSha256']=hashlib.sha256(before).hexdigest()
invpath=Path(location['inventoryPath']);inv=json.loads(invpath.read_text())
for row in inv['files']:
 if row['path'].replace('\\','/') in ['ChatGPT.exe','resources/app.asar']:
  file=runtime/row['path'];row['sha256']=sha(file);row['bytes']=file.stat().st_size
inv['bytes']=sum(row['bytes'] for row in inv['files'])
invpath.write_text(json.dumps(inv,indent=2),encoding='utf-8')
Path(location['patchManifestPath']).write_text(json.dumps(new,indent=2),encoding='utf-8')
shutil.copyfile(package/'demo-account-read.json',stage/'demo-account-read.json')
print(json.dumps({'runtime':str(runtime),'packageSha256':new['outputSha256'],'exeSha256':new['executablePatch']['patchedSha256']}))
