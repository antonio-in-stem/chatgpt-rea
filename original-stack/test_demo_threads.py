import unittest
from demo_threads import THREAD,handle,ThreadError

class ThreadTests(unittest.TestCase):
    def test_list_omits_history_and_honors_filters(self):
        self.assertEqual(handle("thread/list",{})["data"][0]["turns"],[])
        self.assertEqual(handle("thread/list",{"archived":True})["data"],[])
        self.assertEqual(handle("thread/list",{"projectId":"other"})["data"],[])
        self.assertEqual(handle("thread/list",{"searchTerm":"missing"})["data"],[])
        self.assertEqual(len(handle("thread/list",{"cwd":THREAD["cwd"]})["data"]),1)

    def test_history_copy_and_item_loading(self):
        params={"threadId":THREAD["id"],"includeTurns":True}
        response=handle("thread/read",params)
        response["thread"]["turns"].clear()
        self.assertEqual(len(handle("thread/read",params)["thread"]["turns"]),1)
        self.assertEqual(handle("thread/read",{"threadId":THREAD["id"]})["thread"]["turns"],[])
        self.assertEqual(handle("thread/turns/list",{"threadId":THREAD["id"],"itemsView":"notLoaded"})["data"][0]["items"],[])

    def test_resume_returns_original_history_without_execution(self):
        result=handle("thread/resume",{"threadId":THREAD["id"]})
        self.assertEqual(result["thread"]["turns"],THREAD["turns"])
        self.assertFalse(result["thread"]["canAcceptDirectInput"])
        self.assertEqual(result["sandbox"],{"type":"readOnly","networkAccess":False})
        result=handle("thread/resume",{"threadId":THREAD["id"],"excludeTurns":True,"initialTurnsPage":{"limit":1}})
        self.assertEqual(result["thread"]["turns"],[])
        self.assertEqual(len(result["initialTurnsPage"]["data"]),1)

    def test_invalid_ids_cursors_and_limits(self):
        for method,params in [("thread/read",{"threadId":"unknown"}),("thread/list",{"cursor":"bad"}),("thread/list",{"limit":0})]:
            with self.assertRaises(ThreadError):handle(method,params)

if __name__=="__main__":unittest.main()
