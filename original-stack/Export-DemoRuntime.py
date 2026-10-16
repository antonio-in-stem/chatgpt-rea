"""Export only inventoried runtime files; never include demo profiles or credentials."""
import hashlib,json,os,re,shutil,sys
from pathlib import Path, PureWindowsPath

PINNED_SOURCE='c5fdef328cfa2ad9095786f9c3a7aaa447e68834d31299d6ef2592da02029038'

def read_json(p):
    return json.loads(p.read_text(encoding='utf-8-sig'))

def linked(p):
    return p.is_symlink() or p.is_junction()

def export_runtime(location_file, destination):
    location_file=Path(location_file).absolute()
    location=read_json(location_file)
    resolved={}
    for field in ('runtimeRoot','inventoryPath','patchManifestPath'):
        value=location.get(field)
        if not isinstance(value,str) or not value.strip():raise ValueError('Invalid location field: '+field)
        p=Path(value)
        resolved[field]=p if p.is_absolute() else location_file.parent/p
    source=resolved['runtimeRoot'].absolute()
    if linked(source):raise ValueError('Runtime root is a link')
    source=source.resolve(strict=True)
    inventory=read_json(resolved['inventoryPath']);patch=read_json(resolved['patchManifestPath'])
    if patch.get('mode')!='instrumented-demo-host' or patch.get('rendererFilesModified') is not False or patch.get('sourceSha256')!=PINNED_SOURCE:raise ValueError('Unexpected demo provenance')
    expected={}
    for row in inventory.get('files',[]):
        raw=row.get('path');count=row.get('bytes');digest=row.get('sha256')
        if not isinstance(raw,str) or not raw or PureWindowsPath(raw).drive or ':' in raw:raise ValueError('Invalid inventory path')
        parts=raw.replace('\\','/').split('/')
        if any(p in ('','..','.') for p in parts):raise ValueError('Unsafe inventory path')
        relative='/'.join(parts);key=relative.casefold()
        if key in expected:raise ValueError('Duplicate inventory path')
        if type(count) is not int or count<0 or not isinstance(digest,str) or not re.fullmatch('[0-9a-f]{64}',digest):raise ValueError('Invalid inventory record')
        expected[key]={'path':relative,'bytes':count,'sha256':digest}
    total=sum(r['bytes'] for r in expected.values())
    if not expected or len(expected)!=inventory.get('fileCount') or total!=inventory.get('bytes'):raise ValueError('Inventory totals mismatch')
    if expected.get('resources/app.asar',{}).get('sha256')!=patch.get('outputSha256') or expected.get('chatgpt.exe',{}).get('sha256')!=patch.get('executablePatch',{}).get('patchedSha256'):raise ValueError('Runtime hashes differ from patch metadata')
    actual=set()
    for base,dirs,files in os.walk(source,followlinks=False):
        for name in dirs+files:
            if linked(Path(base)/name):raise ValueError('Runtime contains a link')
        for name in files:actual.add((Path(base)/name).relative_to(source).as_posix().casefold())
    if actual!=set(expected):raise ValueError('Runtime file membership differs from inventory')
    destination=Path(destination).absolute()
    if destination.exists() or destination.is_symlink():raise ValueError('Destination must be new')
    parent=destination.parent.resolve(strict=True);destination=parent/destination.name
    if destination.is_relative_to(source):raise ValueError('Destination cannot be inside runtime')
    if shutil.disk_usage(parent).free<total+64*1024*1024:raise ValueError('Insufficient export space')
    destination.mkdir()
    runtime=destination/'runtime';runtime.mkdir()
    copied=0
    # Failures retain this fresh directory for inspection; no launch manifest is published.
    for row in expected.values():
        src=source/row['path'];out=runtime/row['path'];out.parent.mkdir(parents=True,exist_ok=True)
        if linked(src):raise ValueError('Source changed to a link')
        digest=hashlib.sha256();size=0
        with src.open('rb') as incoming,out.open('xb') as outgoing:
            while chunk:=incoming.read(1024*1024):
                outgoing.write(chunk);digest.update(chunk);size+=len(chunk)
        if size!=row['bytes'] or digest.hexdigest()!=row['sha256']:raise ValueError('Copied runtime differs: '+row['path'])
        copied+=1
        if copied%500==0:print(json.dumps({'copiedFiles':copied,'totalFiles':len(expected)}),flush=True)
    def write(name,value):
        with (destination/name).open('x',encoding='utf-8') as f:json.dump(value,f,indent=2);f.write('\n')
    write('runtime-inventory.json',{'scope':'Exported verified demo runtime; profiles excluded','fileCount':len(expected),'bytes':total,'files':list(expected.values())})
    write('patch-manifest.json',{'mode':patch['mode'],'sourceSha256':PINNED_SOURCE,'outputSha256':patch['outputSha256'],'rendererFilesModified':False,'executablePatch':{'patchedSha256':patch['executablePatch']['patchedSha256']}})
    report={'passed':True,'files':copied,'bytes':total,'profilesCopied':False,'rendererModified':False,'sourceAsarSha256':PINNED_SOURCE,'demoAsarSha256':patch['outputSha256'],'runtimeExecutableSha256':patch['executablePatch']['patchedSha256']}
    write('export-verification.json',report)
    write('runtime-location.json',{'runtimeRoot':'runtime','inventoryPath':'runtime-inventory.json','patchManifestPath':'patch-manifest.json'})
    return report

if __name__=='__main__':
    if len(sys.argv)!=3:raise SystemExit('Usage: Export-DemoRuntime.py runtime-location.json NEW_DESTINATION')
    print(json.dumps(export_runtime(sys.argv[1],sys.argv[2])))
