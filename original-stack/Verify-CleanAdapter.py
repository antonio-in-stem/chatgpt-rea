"""Verify delivery dependencies using isolated source and an actual loopback adapter."""
import asyncio, concurrent.futures, importlib.metadata, json, os, shutil, subprocess, sys, tempfile
from pathlib import Path
import websockets, cryptography, y_py

def verify():
    if sys.prefix==sys.base_prefix:raise RuntimeError('Run with a fresh virtual environment Python')
    prefix=Path(sys.prefix).resolve()
    for module in (websockets,cryptography,y_py):
        if not Path(module.__file__).resolve().is_relative_to(prefix):raise RuntimeError('Dependency loaded outside virtual environment')
    source=Path(__file__).resolve().parent
    with tempfile.TemporaryDirectory(prefix='rea-clean-adapter-') as tmp:
        root=Path(tmp)
        for file in source.glob('demo_*.py'):shutil.copyfile(file,root/file.name)
        for name in ('demo-fixtures.json','demo-thread.json'):shutil.copyfile(source/name,root/name)
        identity=source/'fixtures/demo-account-read.json'
        if identity.exists():
            (root/'fixtures').mkdir();shutil.copyfile(identity,root/'fixtures/demo-account-read.json')
        if (root/'state').exists():raise RuntimeError('Unexpected copied state')
        env=os.environ.copy();env.pop('PYTHONPATH',None);env['PYTHONNOUSERSITE']='1'
        command=[sys.executable,'-u',str(root/'demo_transport.py'),'--demo-profile-identity','--demo-pages-tls']
        with (root/'stderr.log').open('w+',encoding='utf8') as errors:
            process=subprocess.Popen(command,cwd=root,env=env,stdout=subprocess.PIPE,stderr=errors,text=True,creationflags=getattr(subprocess,'CREATE_NO_WINDOW',0))
            reader=concurrent.futures.ThreadPoolExecutor(max_workers=1)
            try:
                line=reader.submit(process.stdout.readline).result(timeout=25)
                if not line:
                    errors.flush();errors.seek(0);raise RuntimeError('Isolated startup failed: '+errors.read()[-1200:])
                announcement=json.loads(line)
                if announcement['mode']!='demo-contract-adapter' or not announcement['endpoint'].startswith('ws://127.0.0.1:'):raise RuntimeError('Unexpected adapter announcement')
                async def rpc():
                    async with websockets.connect(announcement['endpoint']) as socket:
                        await socket.send(json.dumps({'id':1,'method':'account/read','params':{}}))
                        reply=json.loads(await asyncio.wait_for(socket.recv(),10))
                        if reply.get('result',{}).get('account',{}).get('email')!='demo@example.invalid':raise RuntimeError('Synthetic account contract failed')
                asyncio.run(rpc())
                tls=json.loads((root/'state/demo-pages-runtime.json').read_text())
                if not tls['endpoint'].startswith('wss://') or not tls.get('spkiSha256'):raise RuntimeError('TLS listener not initialized')
                if (root/'state/page-sync-deps').exists() or (root/'state/instrumented-profile-host').exists():raise RuntimeError('Used ignored deployment state')
                return {'passed':True,'python':sys.version.split()[0],'versions':{name:importlib.metadata.version(name) for name in ('websockets','cryptography','y-py','cffi','pycparser')},'dependenciesFromVenv':True,'ignoredStateCopied':False,'accountReadRpc':True,'pagesTlsStarted':True,'desktopUiTested':False}
            finally:
                if process.poll() is None:process.terminate()
                process.wait(timeout=10);reader.shutdown(wait=True);process.stdout.close()

if __name__=='__main__':print(json.dumps(verify()))
