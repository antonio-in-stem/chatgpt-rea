"""Queue/turn transaction on the existing thread store; no second state file.

All calls are synchronous within the adapter event loop. Notifications are
returned only after the combined thread/queue record has committed.
"""
import copy
from demo_queue import QueueStore, QueueError

METHODS = QueueStore.METHODS | {"thread/queue/start"}

class _QueueDraft(QueueStore):
    def __init__(self, data):
        self.data = {"queues": copy.deepcopy(data.get("demoQueues", {}))}

    def _commit(self, data):
        self.data = data


def handle(threads, method, params):
    from demo_threads import ThreadError, ThreadStore
    if not isinstance(params, dict) or not isinstance(params.get("threadId"), str):
        raise ThreadError("Expected demo thread ID")
    thread_id = params["threadId"]
    if thread_id not in threads.data["threads"]:
        raise ThreadError("Unknown demo thread")
    queue = _QueueDraft(threads.data)
    try:
        if method != "thread/queue/start":
            result, event = queue.handle(method, params)
            if event:
                data = copy.deepcopy(threads.data)
                data["demoQueues"] = queue.data["queues"]
                threads._commit(data)
            return result, event
        submission = queue.prepare_start(params)
        class StagedThreads(ThreadStore):
            def _commit(self, data):
                self.data = data
        staged = StagedThreads.__new__(StagedThreads)
        staged.path, staged.streaming = threads.path, threads.streaming
        staged.data = copy.deepcopy(threads.data)
        result, events = staged.handle("turn/start", {
            "threadId": thread_id,
            "input": submission["input"],
            "clientUserMessageId": submission["clientUserMessageId"],
        })
        _, changed = queue.handle("thread/queue/delete", {
            "threadId": thread_id, "queuedSubmissionId": submission["id"]})
        staged.data["demoQueues"] = queue.data["queues"]
        # Persist the submitted user item in the same commit as removal. A crash
        # before the first stream event must not discard its input/client ID.
        if staged.streaming:
            user = next(event["params"]["item"] for event in events
                        if event["method"] == "item/started"
                        and event["params"]["item"]["type"] == "userMessage")
            turn = next(turn for turn in staged.data["threads"][thread_id]["thread"]["turns"]
                        if turn["id"] == result["turn"]["id"])
            turn["items"] = [copy.deepcopy(user)]
        threads._commit(staged.data)
        return result, [changed, *events]
    except QueueError as error:
        raise ThreadError(str(error)) from error
