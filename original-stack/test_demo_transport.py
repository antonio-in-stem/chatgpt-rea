import json
import unittest
from websockets.asyncio.client import connect
from websockets.asyncio.server import serve
from demo_transport import handle_message

class TransportTests(unittest.IsolatedAsyncioTestCase):
    async def test_roundtrip_preserves_id_without_retaining_values(self):
        seen=[]
        async def handler(socket):
            async for raw in socket:
                reply,record=handle_message(raw);seen.append(record)
                if reply is not None:await socket.send(json.dumps(reply))
        async with serve(handler,'127.0.0.1',0) as server:
            port=server.sockets[0].getsockname()[1]
            async with connect(f'ws://127.0.0.1:{port}') as socket:
                await socket.send(json.dumps({'id':17,'method':'unknown/demoMethod','params':{'token':'must-not-be-retained'}}))
                reply=json.loads(await socket.recv())
                self.assertEqual(reply['id'],17)
                self.assertEqual(reply['error']['code'],-32601)
        self.assertNotIn('must-not-be-retained',json.dumps(seen))
        self.assertEqual(seen[0]['paramKeys'],['token'])
    async def test_fixture_methods_do_not_produce_credentials(self):
        for method in ["initialize", "account/read", "configRequirements/read", "getAuthStatus"]:
            reply,_=handle_message(json.dumps({"id": "fixture", "method": method}))
            self.assertEqual(reply["id"], "fixture")
            self.assertIn("result",reply)
        reply,_=handle_message(json.dumps({"id":1,"method":"account/read"}))
        self.assertIsNone(reply["result"]["account"])
        self.assertFalse(reply["result"]["requiresOpenaiAuth"])

        legacy,_=handle_message(json.dumps({"id":2,"method":"getAuthStatus","params":{"includeToken":True,"refreshToken":True}}))
        self.assertEqual(legacy["result"], {"authMethod":None,"authToken":None,"requiresOpenaiAuth":False})

    async def test_notifications_and_malformed_frames(self):
        self.assertIsNone(handle_message('{"method":"initialized"}')[0])
        self.assertEqual(handle_message('{broken')[0]['error']['code'],-32700)
        self.assertEqual(handle_message('[]')[0]['error']['code'],-32600)
        self.assertEqual(handle_message('{"id":{},"method":"read"}')[0]['error']['code'],-32600)

if __name__=='__main__':unittest.main()
