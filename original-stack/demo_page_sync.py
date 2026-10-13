"""Original legacy Pages realtime protocol, loopback demo only. No semantic capabilities."""
import base64
import hashlib
import json
import re
import secrets
import sys
from pathlib import Path
from urllib.parse import urlparse, parse_qs
sys.path.insert(0,str(Path(__file__).parent/'state/page-sync-deps'))
import y_py as y

class PageSyncStore:
    def __init__(self, directory):
        self.directory=Path(directory)
        self.token=secrets.token_urlsafe(32)
        self.clients={}
    def publish_endpoint(self,endpoint):
        (self.directory/'demo-pages-runtime.json').write_text(json.dumps({'endpoint':endpoint,'token':self.token}),encoding='utf-8')
    def load(self,page_id):
        if not re.fullmatch(r'rea-page-[1-9][0-9]*',page_id):raise ValueError('Invalid page ID')
        pages=json.loads((self.directory/'demo-pages.json').read_text(encoding='utf-8'))
        if not any(x['metadata']['page_id']==page_id and not x.get('permanentlyDeleted') and not x['metadata'].get('deleted_at') for x in pages['items']):raise ValueError('Unavailable demo page')
        file=self.directory/(page_id+'-document.json')
        state=json.loads(file.read_text(encoding='utf-8')) if file.exists() else {'sequence':0,'update':'AAA=','receipts':{}}
        doc=y.YDoc()
        y.apply_update(doc,base64.b64decode(state['update'],validate=True))
        return file,state,doc
    def sync(self,page_id):
        _,state,doc=self.load(page_id)
        return {'type':'sync_step_2','committed_sequence':state['sequence'],'session_id':'demo-'+page_id,'update':base64.b64encode(y.encode_state_as_update(doc)).decode(),'capabilities':['comments_v1'],'viewer':{'account_user_id':'rea-demo-user','display_name':'Demo'}}
    def commit(self,page_id,message):
        key=message.get('client_update_id')
        if not isinstance(key,str) or not 1<=len(key)<=128:raise ValueError('Invalid update ID')
        raw=base64.b64decode(message['update'],validate=True)
        if len(raw)>524288:raise ValueError('Oversized update')
        digest=hashlib.sha256(raw).hexdigest()
        file,state,doc=self.load(page_id)
        old=state['receipts'].get(key)
        if old:
            if old['digest']!=digest:raise ValueError('Conflicting update ID')
            return {'type':'ack','client_update_id':key,'update_id':key,'sequence':old['sequence']},None
        y.apply_update(doc,raw)
        state['sequence']+=1
        state['update']=base64.b64encode(y.encode_state_as_update(doc)).decode()
        state['title']=json.loads(doc.get_text('title').to_json())
        state['symbol']=json.loads(doc.get_map('pagesMetadata').to_json()).get('symbol')
        state['receipts'][key]={'digest':digest,'sequence':state['sequence']}
        temporary=file.with_suffix('.pending');owned=False
        try:
            with temporary.open('x',encoding='utf-8') as stream:
                owned=True;json.dump(state,stream)
            temporary.replace(file)
        finally:
            if owned and temporary.exists():temporary.unlink()
        ack={'type':'ack','client_update_id':key,'update_id':key,'sequence':state['sequence']}
        committed={'type':'committed_update','sequence':state['sequence'],'update_id':key,'update':message['update']}
        return ack,committed
    async def connection(self,socket):
        url=urlparse(socket.request.path);page_id=url.path.removeprefix('/demo-pages/')
        if parse_qs(url.query).get('token')!=[self.token]:
            await socket.close(1008,'Invalid demo token');return
        self.load(page_id)
        peers=self.clients.setdefault(page_id,set());peers.add(socket)
        try:
            await socket.send(json.dumps({'type':'server_capabilities','capabilities':[]}))
            async for raw in socket:
                message=json.loads(raw);kind=message.get('type')
                if kind=='sync_step_1':await socket.send(json.dumps(self.sync(page_id)))
                elif kind=='document_update':
                    ack,committed=self.commit(page_id,message)
                    if committed:
                        for peer in tuple(peers):
                            await peer.send(json.dumps(committed))
                    await socket.send(json.dumps(ack))
                elif kind=='ping':
                    iteration=message.get('iteration')
                    if not isinstance(iteration,int) or iteration<1:raise ValueError('Invalid ping')
                    await socket.send(json.dumps({'type':'pong','iteration':iteration}))
                elif kind=='awareness_update':pass
                else:await socket.send(json.dumps({'type':'error','code':'unsupported_demo_message','message':str(kind)}))
        finally:peers.discard(socket)
