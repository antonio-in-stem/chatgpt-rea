import unittest
import tempfile
from pathlib import Path
from unittest.mock import patch
from demo_threads import THREAD,handle,ThreadError,ThreadStore

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

    def test_mutations_survive_restart_and_preserve_history(self):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json"
            store=ThreadStore(path)
            reply,event=store.handle("thread/name/set",{"threadId":THREAD["id"],"name":"Renamed Demo"})
            self.assertEqual(event["params"]["threadName"],"Renamed Demo")
            store=ThreadStore(path)
            self.assertEqual(store.handle("thread/list",{})[0]["data"][0]["name"],"Renamed Demo")
            store.handle("thread/archive",{"threadId":THREAD["id"]})
            store=ThreadStore(path)
            self.assertEqual(store.handle("thread/list",{})[0]["data"],[])
            self.assertEqual(len(store.handle("thread/list",{"archived":True})[0]["data"]),1)
            restored,event=store.handle("thread/unarchive",{"threadId":THREAD["id"]})
            self.assertEqual(restored["thread"]["turns"],[])
            self.assertEqual(event["method"],"thread/unarchived")
            self.assertEqual(ThreadStore(path).handle("thread/read",{"threadId":THREAD["id"],"includeTurns":True})[0]["thread"]["turns"],THREAD["turns"])

    def test_failed_mutation_does_not_change_memory(self):
        with tempfile.TemporaryDirectory() as directory:
            store=ThreadStore(Path(directory)/"threads.json")
            with patch.object(Path,"replace",side_effect=OSError("disk unavailable")):
                with self.assertRaises(OSError):store.handle("thread/archive",{"threadId":THREAD["id"]})
            self.assertFalse(store.data["threads"][THREAD["id"]]["archived"])
            with self.assertRaises(ThreadError):store.handle("thread/name/set",{"threadId":THREAD["id"],"name":""})

    def test_fork_preserves_parent_and_is_independent_after_reload(self):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json"
            store=ThreadStore(path)
            original=store.handle("thread/read",{"threadId":THREAD["id"],"includeTurns":True})[0]
            fork,event=store.handle("thread/fork",{"threadId":THREAD["id"],"lastTurnId":THREAD["turns"][0]["id"]})
            fork_id=fork["thread"]["id"]
            self.assertNotEqual(fork_id,THREAD["id"])
            self.assertEqual(fork["thread"]["forkedFromId"],THREAD["id"])
            self.assertEqual(event["params"]["thread"]["turns"],[])
            self.assertEqual(store.handle("thread/read",{"threadId":THREAD["id"],"includeTurns":True})[0],original)
            store=ThreadStore(path)
            store.handle("thread/name/set",{"threadId":fork_id,"name":"Branch"})
            self.assertEqual(store.handle("thread/read",{"threadId":THREAD["id"]})[0]["thread"]["name"],THREAD["name"])
            first=store.handle("thread/list",{"limit":1})[0]
            second=store.handle("thread/list",{"limit":1,"cursor":first["nextCursor"]})[0]
            self.assertEqual(len({first["data"][0]["id"],second["data"][0]["id"]}),2)

    def test_legacy_store_migration_preserves_history_and_archive(self):
        import json
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json"
            path.write_text(json.dumps({"thread":THREAD,"archived":True}),encoding="utf-8")
            store=ThreadStore(path)
            self.assertEqual(store.handle("thread/list",{})[0]["data"],[])
            store.handle("thread/name/set",{"threadId":THREAD["id"],"name":"Migrated"})
            reloaded=ThreadStore(path)
            result=reloaded.handle("thread/read",{"threadId":THREAD["id"],"includeTurns":True})[0]["thread"]
            self.assertEqual(result["turns"],THREAD["turns"])
            self.assertEqual(result["name"],"Migrated")
            self.assertEqual(len(reloaded.handle("thread/list",{"archived":True})[0]["data"]),1)

    def test_fork_frontend_metadata_survives_resume(self):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json"
            store=ThreadStore(path)
            params={"threadId":THREAD["id"],"config":{"model_reasoning_effort":"high","features.demo":True},"runtimeWorkspaceRoots":[THREAD["cwd"]],"threadSource":"user","excludeTurns":True}
            result,_=store.handle("thread/fork",params)
            self.assertEqual(result["thread"]["turns"],[])
            branch=result["thread"]["id"]
            resumed=ThreadStore(path).handle("thread/resume",{"threadId":branch})[0]
            self.assertEqual(resumed["reasoningEffort"],"high")
            self.assertEqual(resumed["runtimeWorkspaceRoots"],[THREAD["cwd"]])
            self.assertEqual(resumed["thread"]["turns"],THREAD["turns"])
            for invalid in ({"config":[]},{"runtimeWorkspaceRoots":["relative"]},{"threadSource":3}):
                with self.assertRaises(ThreadError):store.handle("thread/fork",{"threadId":THREAD["id"],**invalid})
            self.assertEqual(len(ThreadStore(path).data["threads"]),2)

    def test_fork_before_turn_and_invalid_boundary(self):
        with tempfile.TemporaryDirectory() as directory:
            store=ThreadStore(Path(directory)/"threads.json")
            result,_=store.handle("thread/fork",{"threadId":THREAD["id"],"beforeTurnId":THREAD["turns"][0]["id"]})
            self.assertEqual(result["thread"]["turns"],[])
            with self.assertRaises(ThreadError):store.handle("thread/fork",{"threadId":THREAD["id"],"lastTurnId":"missing"})
            self.assertEqual(len(store.data["threads"]),2)

    def test_spawn_ancestry_excludes_forks_and_ancestor(self):
        import copy
        with tempfile.TemporaryDirectory() as directory:
            store=ThreadStore(Path(directory)/"threads.json")
            fork,_=store.handle("thread/fork",{"threadId":THREAD["id"]})
            for identifier,parent in (("child",THREAD["id"]),("grandchild","child"),("unrelated",None)):
                entry=copy.deepcopy(store.data["threads"][THREAD["id"]])
                entry["thread"].update(id=identifier,parentThreadId=parent)
                store.data["threads"][identifier]=entry
            result=store.handle("thread/list",{"ancestorThreadId":THREAD["id"]})[0]
            self.assertEqual({t["id"] for t in result["data"]},{"child","grandchild"})
            with self.assertRaises(ThreadError):store.handle("thread/list",{"ancestorThreadId":THREAD["id"],"parentThreadId":"child"})
            self.assertEqual(store.handle("thread/goal/get",{"threadId":fork["thread"]["id"]})[0],{"goal":None})
            with self.assertRaises(ThreadError):store.handle("thread/goal/get",{"threadId":"missing"})

    def test_goal_lifecycle_persists_without_execution(self):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json"
            store=ThreadStore(path)
            result,event=store.handle("thread/goal/set",{"threadId":THREAD["id"],"objective":"Inspect original goal controls","tokenBudget":500})
            self.assertEqual(event["method"],"thread/goal/updated")
            self.assertEqual(result["goal"]["tokensUsed"],0)
            store=ThreadStore(path)
            paused,_=store.handle("thread/goal/set",{"threadId":THREAD["id"],"status":"paused"})
            self.assertEqual(paused["goal"]["objective"],result["goal"]["objective"])
            self.assertEqual(paused["goal"]["tokenBudget"],500)
            with self.assertRaises(ThreadError):store.handle("thread/goal/set",{"threadId":THREAD["id"],"tokenBudget":-1})
            self.assertEqual(ThreadStore(path).handle("thread/goal/get",{"threadId":THREAD["id"]})[0]["goal"]["status"],"paused")
            response,event=store.handle("thread/goal/clear",{"threadId":THREAD["id"]})
            self.assertTrue(response["cleared"])
            self.assertEqual(event["method"],"thread/goal/cleared")
            self.assertIsNone(ThreadStore(path).handle("thread/goal/get",{"threadId":THREAD["id"]})[0]["goal"])
            self.assertFalse(store.handle("thread/goal/clear",{"threadId":THREAD["id"]})[0]["cleared"])

    def test_goal_pause_preserves_elapsed_time(self):
        with tempfile.TemporaryDirectory() as directory:
            store=ThreadStore(Path(directory)/"threads.json")
            with patch("demo_threads.time.time",return_value=100):store.handle("thread/goal/set",{"threadId":THREAD["id"],"objective":"Timer demo"})
            with patch("demo_threads.time.time",return_value=145):
                paused,_=store.handle("thread/goal/set",{"threadId":THREAD["id"],"status":"paused"})
            self.assertEqual(paused["goal"]["timeUsedSeconds"],45)
            with patch("demo_threads.time.time",return_value=200):
                resumed,_=store.handle("thread/goal/set",{"threadId":THREAD["id"],"status":"active"})
            self.assertEqual(resumed["goal"]["timeUsedSeconds"],45)

    def test_start_creates_empty_independent_persistent_sessions(self):
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json"
            store=ThreadStore(path)
            ids=[]
            for mode in ("legacy","paginated"):
                response,event=store.handle("thread/start",{"historyMode":mode,"cwd":THREAD["cwd"],"projectId":"demo-project","threadSource":"user","model":"demo-selected","config":{"model_reasoning_effort":"high"}})
                thread=response["thread"]
                ids.append(thread["id"])
                self.assertEqual(thread["turns"],[])
                self.assertIsNone(thread["forkedFromId"])
                self.assertEqual(thread["historyMode"],mode)
                self.assertEqual(event["params"]["thread"],thread)
                resumed=ThreadStore(path).handle("thread/resume",{"threadId":thread["id"]})[0]
                self.assertEqual(resumed["model"],"demo-selected")
                self.assertEqual(resumed["reasoningEffort"],"high")
            self.assertEqual(len(set(ids)),2)
            self.assertEqual(len(store.handle("thread/list",{"projectId":"demo-project"})[0]["data"]),2)
            self.assertEqual(store.handle("thread/list",{"searchTerm":"no-such-title"})[0]["data"],[])
            for invalid in ({"cwd":"relative"},{"runtimeWorkspaceRoots":[False]},{"config":[]},{"historyMode":"unknown"}):
                with self.assertRaises(ThreadError):store.handle("thread/start",invalid)
            self.assertEqual(len(ThreadStore(path).data["threads"]),3)

    def test_turn_events_and_history_survive_reload(self):
        import json
        from demo_transport import handle_message
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json"
            store=ThreadStore(path)
            started,_=store.handle("thread/start",{})
            identifier=started["thread"]["id"]
            events=[]
            reply,_=handle_message(json.dumps({"id":9,"method":"turn/start","params":{"threadId":identifier,"clientUserMessageId":"client-1","input":[{"type":"text","text":"First demo message","text_elements":[]}]}}),threads=store,notifications=events)
            self.assertEqual(reply["result"]["turn"]["status"],"inProgress")
            methods=[e["method"] for e in events]
            self.assertLess(methods.index("turn/started"),methods.index("turn/completed"))
            self.assertLess(methods.index("item/agentMessage/delta"),methods.index("turn/completed"))
            completed=ThreadStore(path).handle("thread/read",{"threadId":identifier,"includeTurns":True})[0]["thread"]
            self.assertEqual(completed["name"],"First demo message")
            self.assertEqual(completed["turns"][0]["status"],"completed")
            self.assertEqual(completed["turns"][0]["items"][0]["clientId"],"client-1")
            store.handle("thread/archive",{"threadId":identifier})
            with self.assertRaises(ThreadError):store.handle("turn/start",{"threadId":identifier,"input":[{"type":"text","text":"blocked"}]})
            self.assertEqual(len(ThreadStore(path).data["threads"][identifier]["thread"]["turns"]),1)

    def test_stream_interrupt_preserves_partial_output_and_rejects_late_events(self):
        import copy
        with tempfile.TemporaryDirectory() as directory:
            path=Path(directory)/"threads.json"
            store=ThreadStore(path,streaming=True)
            started,_=store.handle("thread/start",{})
            thread_id=started["thread"]["id"]
            response,events=store.handle("turn/start",{"threadId":thread_id,"input":[{"type":"text","text":"Streaming demo"}]})
            turn_id=response["turn"]["id"]
            for event in events:
                if event["method"]=="item/agentMessage/delta":
                    piece=copy.deepcopy(event);piece["params"]["delta"]="Partial"
                    store.apply_stream_event(thread_id,turn_id,piece)
                    break
                store.apply_stream_event(thread_id,turn_id,event)
            with self.assertRaises(ThreadError):store.handle("turn/start",{"threadId":thread_id,"input":[{"type":"text","text":"overlap"}]})
            response,ended=store.handle("turn/interrupt",{"threadId":thread_id,"turnId":turn_id})
            self.assertEqual(response,{})
            self.assertEqual(ended[0]["params"]["turn"]["status"],"interrupted")
            self.assertFalse(store.apply_stream_event(thread_id,turn_id,piece))
            saved=ThreadStore(path).handle("thread/read",{"threadId":thread_id,"includeTurns":True})[0]["thread"]
            self.assertEqual(saved["turns"][0]["items"][-1]["text"],"Partial")
            self.assertEqual(saved["status"],{"type":"idle"})
            self.assertEqual(saved["turns"][0]["status"],"interrupted")

    def test_invalid_ids_cursors_and_limits(self):
        for method,params in [("thread/read",{"threadId":"unknown"}),("thread/list",{"cursor":"bad"}),("thread/list",{"limit":0})]:
            with self.assertRaises(ThreadError):handle(method,params)

if __name__=="__main__":unittest.main()
