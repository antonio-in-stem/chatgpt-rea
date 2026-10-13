import copy
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from demo_queue import QueueError, QueueStore


class QueueTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path = Path(self.temp.name) / "queue.json"
        self.store = QueueStore(self.path)

    def call(self, action, thread="one", **params):
        return self.store.handle("thread/queue/" + action, {"threadId": thread, **params})

    def add(self, client="a", text="Hola 🌱", thread="one"):
        return self.call("add", thread, clientUserMessageId=client,
                         input=[{"type": "text", "text": text, "text_elements": []}])

    def test_persistence_notifications_and_identity(self):
        result, event = self.add()
        self.assertEqual(event, {"method": "thread/queue/changed", "params": {"threadId": "one"}})
        identity = result["queuedSubmission"]["id"]
        result["queuedSubmission"]["input"][0]["text"] = "external mutation"
        self.store = QueueStore(self.path)
        result, event = self.add()
        self.assertIsNone(event)
        self.assertEqual(identity, result["queuedSubmission"]["id"])
        edited, event = self.call("update", queuedSubmissionId=identity,
            input=[{"type": "localImage", "path": "C:/demo/image.png"}])
        self.assertIsNotNone(event)
        self.assertEqual(edited["queuedSubmission"]["clientUserMessageId"], "a")
        self.assertEqual(QueueStore(self.path).prepare_start({"threadId": "one"}), edited["queuedSubmission"])
        self.assertEqual(self.call("delete", queuedSubmissionId=identity)[0], {"deleted": True})
        self.assertEqual(self.call("delete", queuedSubmissionId=identity), ({"deleted": False}, None))

    def test_order_pagination_and_thread_isolation(self):
        ids = [self.add(client)[0]["queuedSubmission"]["id"] for client in ("a", "b", "c")]
        self.add("other", thread="two")
        self.call("reorder", queuedSubmissionIds=[ids[2]])
        result, _ = self.call("list", limit=1)
        self.assertEqual(result["data"][0]["id"], ids[2])
        page, _ = self.call("list", cursor=result["nextCursor"], limit=10)
        self.assertEqual([item["id"] for item in page["data"]], ids[:2])
        self.assertIsNone(page["nextCursor"])
        with self.assertRaises(QueueError):
            self.call("list", "two", cursor=result["nextCursor"])
        self.assertEqual(len(self.call("list", "two")[0]["data"]), 1)
        self.assertIsNone(self.call("reorder", queuedSubmissionIds=[ids[2]])[1])

    def test_invalid_changes_leave_disk_and_memory_unchanged(self):
        identity = self.add()[0]["queuedSubmission"]["id"]
        before = self.path.read_bytes()
        memory = copy.deepcopy(self.store.data)
        invalid = [("add", {"clientUserMessageId": "a", "input": [{"type": "text", "text": "different"}]}),
                   ("reorder", {"queuedSubmissionIds": [identity, identity]}),
                   ("reorder", {"queuedSubmissionIds": ["missing"]}),
                   ("update", {"queuedSubmissionId": identity, "input": [{"type": "unknown"}]}),
                   ("list", {"limit": True}), ("list", {"cursor": 4})]
        for action, params in invalid:
            with self.subTest(action=action, params=params), self.assertRaises(QueueError):
                self.call(action, **params)
        self.assertEqual(before, self.path.read_bytes())
        self.assertEqual(memory, self.store.data)

    def test_failed_write_does_not_acknowledge_or_mutate(self):
        self.add()
        before = self.path.read_bytes()
        memory = copy.deepcopy(self.store.data)
        with patch.object(Path, "replace", side_effect=OSError("disk failure")):
            with self.assertRaises(OSError):
                self.add("second")
        self.assertEqual(before, self.path.read_bytes())
        self.assertEqual(memory, self.store.data)
        self.assertEqual(list(self.path.parent.glob("*.tmp")), [])

    def test_prepare_is_read_only_and_start_is_explicitly_unsupported(self):
        self.add()
        before = self.path.read_bytes()
        snapshot = self.store.prepare_start({"threadId": "one"})
        snapshot["input"].clear()
        self.assertEqual(before, self.path.read_bytes())
        self.assertTrue(self.store.prepare_start({"threadId": "one"})["input"])
        with self.assertRaises(QueueError):
            self.call("start")
        with self.assertRaises(QueueError):
            self.store.prepare_start({"threadId": "empty"})
        self.assertNotIn("thread/queue/start", QueueStore.METHODS)


if __name__ == "__main__":
    unittest.main()
