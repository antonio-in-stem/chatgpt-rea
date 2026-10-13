"""Persistent demo queue using exported ThreadQueue contracts.

Owns queue data only, never starts turns or executes input. The caller must
validate thread existence. One owning adapter process is required (no locking).
queue/start is intentionally NOT routed: a turn and queue removal need a shared
transaction. prepare_start returns a snapshot only, with no successful RPC claim.
Partial reorder moves supplied IDs first, retaining the rest, matching the
renderer projection. Client-ID retry deduplication is an explicit demo policy.
"""
import copy
import json
import uuid
from pathlib import Path
from demo_turns import normalize_input


class QueueError(ValueError):
    pass


def _text(value, field):
    if not isinstance(value, str) or not value.strip():
        raise QueueError("Expected nonempty " + field)
    return value


def _input(value):
    if not isinstance(value, list) or not value:
        raise QueueError("Expected nonempty input array")
    try:
        return [normalize_input(item) for item in value]
    except ValueError as error:
        raise QueueError(str(error)) from error


class QueueStore:
    METHODS = {"thread/queue/" + action for action in ("list", "add", "update", "delete", "reorder")}

    def __init__(self, path):
        self.path = Path(path)
        self.data = json.loads(self.path.read_text(encoding="utf-8")) if self.path.exists() else {"queues": {}}
        if not isinstance(self.data, dict) or not isinstance(self.data.get("queues"), dict):
            raise QueueError("Invalid queue store")
        for thread_id, items in self.data["queues"].items():
            _text(thread_id, "threadId")
            if not isinstance(items, list):
                raise QueueError("Invalid stored queue")
            ids, clients = set(), set()
            for item in items:
                if not isinstance(item, dict):
                    raise QueueError("Invalid stored submission")
                identity = _text(item.get("id"), "id")
                client = _text(item.get("clientUserMessageId"), "clientUserMessageId")
                if identity in ids or client in clients:
                    raise QueueError("Duplicate stored queue identity")
                ids.add(identity)
                clients.add(client)
                _input(item.get("input"))

    def _commit(self, data):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        temporary = self.path.with_name(self.path.name + "." + uuid.uuid4().hex + ".tmp")
        try:
            temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
            temporary.replace(self.path)
        finally:
            if temporary.exists():
                temporary.unlink()
        self.data = data

    def prepare_start(self, params):
        """Read-only selection; integrator must atomically commit turn + removal.

        Omitted/null ID selects first item as demo policy. This method neither
        reserves the item nor guards later concurrent changes. It is not a
        ThreadQueueStartResponse; never send it as a successful start response.
        """
        if not isinstance(params, dict):
            raise QueueError("Expected object parameters")
        thread_id = _text(params.get("threadId"), "threadId")
        identity = params.get("queuedSubmissionId")
        if identity is not None:
            _text(identity, "queuedSubmissionId")
        items = self.data["queues"].get(thread_id, [])
        item = next((item for item in items if identity is None or item["id"] == identity), None)
        if item is None:
            raise QueueError("Queued submission not found")
        return copy.deepcopy(item)

    def handle(self, method, params):
        if method not in self.METHODS:
            raise QueueError("Queue method not implemented; start requires a shared turn transaction")
        if not isinstance(params, dict):
            raise QueueError("Expected object parameters")
        thread_id = _text(params.get("threadId"), "threadId")
        data = copy.deepcopy(self.data)
        items = data["queues"].get(thread_id, [])
        if method == "thread/queue/list":
            limit = params.get("limit")
            limit = 100 if limit is None else limit
            if type(limit) is not int or not 1 <= limit <= 1000:
                raise QueueError("Invalid limit")
            cursor = params.get("cursor")
            offset = 0
            if cursor is not None:
                try:
                    value = json.loads(cursor)
                    if (not isinstance(value, list) or len(value) != 3 or value[0] != "demo-queue"
                            or value[1] != thread_id or type(value[2]) is not int or value[2] < 0):
                        raise ValueError()
                    offset = value[2]
                except (ValueError, TypeError):
                    raise QueueError("Invalid queue cursor") from None
            end = offset + limit
            return {"data": items[offset:end], "nextCursor": json.dumps(["demo-queue", thread_id, end]) if end < len(items) else None}, None
        if method == "thread/queue/add":
            client = _text(params.get("clientUserMessageId"), "clientUserMessageId")
            inputs = _input(params.get("input"))
            existing = next((item for item in items if item["clientUserMessageId"] == client), None)
            if existing is not None:
                if existing["input"] != inputs:
                    raise QueueError("Client message ID already used with different input")
                return {"queuedSubmission": existing}, None
            item = {"id": str(uuid.uuid4()), "input": inputs, "clientUserMessageId": client}
            items.append(item)
            result = {"queuedSubmission": item}
        elif method == "thread/queue/reorder":
            identities = params.get("queuedSubmissionIds")
            if not isinstance(identities, list):
                raise QueueError("Expected queuedSubmissionIds array")
            for identity in identities:
                _text(identity, "queuedSubmissionId")
            indexed = {item["id"]: item for item in items}
            if len(set(identities)) != len(identities) or any(identity not in indexed for identity in identities):
                raise QueueError("Duplicate or unknown queue identity")
            selected = set(identities)
            items = [indexed[identity] for identity in identities] + [item for item in items if item["id"] not in selected]
            result = {}
        else:
            identity = _text(params.get("queuedSubmissionId"), "queuedSubmissionId")
            item = next((item for item in items if item["id"] == identity), None)
            if method == "thread/queue/delete":
                if item is None:
                    return {"deleted": False}, None
                items.remove(item)
                result = {"deleted": True}
            else:
                if item is None:
                    raise QueueError("Queued submission not found")
                item["input"] = _input(params.get("input"))
                result = {"queuedSubmission": item}
        data["queues"][thread_id] = items
        event = None
        if data != self.data:
            self._commit(data)
            event = {"method": "thread/queue/changed", "params": {"threadId": thread_id}}
        return copy.deepcopy(result), event
