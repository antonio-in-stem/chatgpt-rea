import json
import unittest
from demo_transport import handle_message

class DurableContract(unittest.TestCase):
    def call(self, method, params=None):
        return handle_message(json.dumps({"id":1,"method":method,"params":params}),durable=True)
    def test_empty_catalog_and_no_mutations(self):
        reply, observation=self.call("thread/list",{"archived":True,"limit":50})
        self.assertEqual(reply["result"]["data"],[])
        self.assertIsNone(reply["result"]["nextCursor"])
        self.assertEqual(observation["demoHost"],"durable")
        for method in ["thread/start","thread/archive","turn/start","thread/read"]:
            self.assertEqual(self.call(method)[0]["error"]["code"],-32601)
    def test_initialization_and_invalid_pagination(self):
        self.assertIn("result",self.call("initialize")[0])
        for params in [[],{"limit":0},{"cursor":"local:1"}]:
            self.assertEqual(self.call("thread/list",params)[0]["error"]["code"],-32602)

if __name__ == '__main__':unittest.main()
