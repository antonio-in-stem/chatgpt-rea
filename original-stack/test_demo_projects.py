import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from demo_projects import ProjectStore, ProjectError
from demo_transport import handle_message

class ProjectTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path = Path(self.temp.name)/"projects.json"
        self.store = ProjectStore(self.path)

    def create(self, key="one", name="Demo"):
        return self.store.handle("project/create", {"name":name,"roots":[],"idempotencyKey":key})

    def test_lifecycle_persistence_idempotency_and_notifications(self):
        created,event = self.create()
        project_id = created["project"]["id"]
        self.assertEqual(event["params"]["changeType"], "created")
        self.store = ProjectStore(self.path)
        repeated,event = self.create()
        self.assertEqual(repeated, created)
        self.assertIsNone(event)
        updated,event = self.store.handle("project/update", {"projectId":project_id,"name":"Renamed"})
        self.assertEqual(updated["project"]["name"], "Renamed")
        self.assertEqual(ProjectStore(self.path).handle("project/read", {"projectId":project_id})[0], updated)
        self.assertEqual(self.store.handle("project/delete", {"projectId":project_id})[1]["params"]["changeType"], "deleted")
        self.assertEqual(ProjectStore(self.path).handle("project/list", {})[0]["data"], [])

    def test_invalid_requests_do_not_change_store(self):
        self.create()
        before = self.path.read_bytes()
        with self.assertRaises(ProjectError): self.create(name="Different")
        with self.assertRaises(ProjectError): self.store.handle("project/create", {"name":"Bad","roots":[{"path":"relative"}],"idempotencyKey":"bad"})
        self.assertEqual(before, self.path.read_bytes())
        with patch.object(Path, "replace", side_effect=OSError("disk unavailable")):
            with self.assertRaises(OSError): self.create("two")
        self.assertEqual(len(self.store.data["projects"]), 1)
        self.assertEqual(before, self.path.read_bytes())

    def test_pagination_and_sorting(self):
        for i in range(3): self.create(str(i), str(i))
        first,_ = self.store.handle("project/list", {"limit":2})
        second,_ = self.store.handle("project/list", {"limit":2,"cursor":first["nextCursor"]})
        self.assertEqual([p["name"] for p in first["data"]+second["data"]], ["0","1","2"])
        self.assertIsNone(second["nextCursor"])
        descending,_ = self.store.handle("project/list", {"sortDirection":"desc"})
        self.assertEqual([p["name"] for p in descending["data"]], ["2","1","0"])

    def test_rpc_routes_persistent_store_and_notifications(self):
        events=[]
        response,_=handle_message(json.dumps({"id":3,"method":"project/create","params":{"name":"Demo","roots":[],"idempotencyKey":"rpc"}}),self.store,events)
        self.assertEqual(response["id"],3)
        self.assertEqual(events[0]["method"],"project/changed")
        reply,_=handle_message(json.dumps({"id":4,"method":"project/list","params":{}}),self.store)
        self.assertEqual(reply["result"]["data"],[response["result"]["project"]])

if __name__ == "__main__": unittest.main()
