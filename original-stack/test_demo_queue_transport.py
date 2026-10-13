import asyncio
import json
import sys
import tempfile
import unittest
from pathlib import Path
from websockets.asyncio.client import connect
from demo_threads import THREAD, ThreadStore

class QueueTransportTests(unittest.IsolatedAsyncioTestCase):
    async def test_queued_turn_streams_and_persists_through_real_transport(self):
        with tempfile.TemporaryDirectory() as temp:
            root=Path(temp)
            command=[sys.executable,'-u',str(Path(__file__).with_name('demo_transport.py')),
                '--output',str(root/'methods.jsonl'),'--project-state',str(root/'projects.json'),
                '--config-state',str(root/'config.json'),'--thread-state',str(root/'threads.json'),
                '--demo-chunk-delay','0.001']
            process=await asyncio.create_subprocess_exec(*command,stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.PIPE)
            try:
                announcement=json.loads(await asyncio.wait_for(process.stdout.readline(),10))
                async with connect(announcement['endpoint']) as socket:
                    async def request(number,method,params):
                        await socket.send(json.dumps({'id':number,'method':method,'params':params}))
                        while True:
                            reply=json.loads(await asyncio.wait_for(socket.recv(),5))
                            if reply.get('id')==number:return reply
                    added=await request(1,'thread/queue/add',{'threadId':THREAD['id'],
                        'clientUserMessageId':'transport-client','input':[{'type':'text','text':'Queued over websocket'}]})
                    selected=added['result']['queuedSubmission']['id']
                    started=await request(2,'thread/queue/start',{'threadId':THREAD['id'],'queuedSubmissionId':selected})
                    self.assertIn('turn',started['result'])
                    events=[]
                    while not any(e.get('method')=='turn/completed' for e in events):
                        events.append(json.loads(await asyncio.wait_for(socket.recv(),5)))
                    self.assertGreater(sum(e.get('method')=='item/agentMessage/delta' for e in events),1)
                    self.assertTrue(any(e.get('method')=='thread/queue/changed' for e in events))
                    listed=await request(3,'thread/queue/list',{'threadId':THREAD['id']})
                    self.assertEqual(listed['result']['data'],[])
                    store=ThreadStore(root/'threads.json')
                    turn=store.data['threads'][THREAD['id']]['thread']['turns'][-1]
                    self.assertEqual(turn['status'],'completed')
                    self.assertEqual(turn['items'][0]['clientId'],'transport-client')
                    self.assertEqual(turn['items'][0]['content'][0]['text'],'Queued over websocket')
            finally:
                if process.returncode is None:process.terminate()
                await asyncio.wait_for(process.communicate(),5)
