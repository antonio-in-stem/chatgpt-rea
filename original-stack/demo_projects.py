"""Local demo project store. Project roots are metadata, never filesystem actions."""
import copy
import json
import time
import uuid
from pathlib import Path, PureWindowsPath

class ProjectError(ValueError):
    pass

class ProjectStore:
    METHODS = {"project/list", "project/read", "project/create", "project/update", "project/delete"}

    def __init__(self, path):
        self.path = Path(path)
        self.data = json.loads(self.path.read_text(encoding="utf-8")) if self.path.exists() else {"projects": {}, "requests": {}}

    def _commit(self, data):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        temporary = self.path.with_suffix(".tmp")
        temporary.write_text(json.dumps(data, indent=2), encoding="utf-8")
        temporary.replace(self.path)
        self.data = data

    @staticmethod
    def _fields(params, required=False):
        out = {}
        for key in ("name", "roots", "metadata"):
            value = params.get(key)
            if value is None:
                if required and key in ("name", "roots"):
                    raise ProjectError("Missing " + key)
                continue
            if key == "name" and (not isinstance(value, str) or not value.strip()):
                raise ProjectError("Invalid name")
            if key == "roots" and (not isinstance(value, list) or any(not isinstance(r, dict) or set(r) != {"path"} or not isinstance(r["path"], str) or not PureWindowsPath(r["path"]).is_absolute() for r in value)):
                raise ProjectError("Roots require absolute Windows paths")
            if key == "metadata" and (not isinstance(value, dict) or any(not isinstance(v, str) for v in value.values())):
                raise ProjectError("Metadata values must be strings")
            out[key] = copy.deepcopy(value)
        return out

    def handle(self, method, params):
        if not isinstance(params, dict):
            raise ProjectError("Expected object parameters")
        data = copy.deepcopy(self.data)
        projects = data["projects"]
        if method == "project/list":
            key = params.get("sortKey") or "position"
            direction = params.get("sortDirection") or ("desc" if key == "recencyAt" else "asc")
            if key not in ("position", "recencyAt") or direction not in ("asc", "desc"):
                raise ProjectError("Invalid sort")
            limit = params.get("limit") if params.get("limit") is not None else 100
            if type(limit) is not int or not 1 <= limit <= 1000:
                raise ProjectError("Invalid limit")
            cursor = params.get("cursor")
            prefix = f"demo:{key}:{direction}:"
            if cursor is not None and (not isinstance(cursor, str) or not cursor.startswith(prefix) or not cursor[len(prefix):].isdigit()):
                raise ProjectError("Invalid cursor")
            offset = int(cursor[len(prefix):]) if cursor else 0
            items = sorted(projects.values(), key=lambda p: (p[key] if p[key] is not None else 0, p["id"]), reverse=direction == "desc")
            if key == "recencyAt":
                items = [p for p in items if p[key] is not None] + [p for p in items if p[key] is None]
            page = items[offset:offset+limit]
            return {"data": page, "nextCursor": prefix+str(offset+limit) if offset+limit < len(items) else None}, None
        if method == "project/create":
            fields = self._fields(params, True)
            token = params.get("idempotencyKey")
            if not isinstance(token, str) or not token:
                raise ProjectError("Missing idempotencyKey")
            prior = data["requests"].get(token)
            if prior:
                if prior["fields"] != fields:
                    raise ProjectError("Idempotency key reused with different fields")
                return copy.deepcopy(prior["response"]), None
            project_id = str(uuid.uuid4())
            now = int(time.time())
            project = {"id": project_id, "metadata": {}, **fields, "position": max((p["position"] for p in projects.values()), default=-1)+1, "createdAt": now, "updatedAt": now, "recencyAt": None}
            projects[project_id] = project
            response = {"project": project}
            data["requests"][token] = {"fields": fields, "response": copy.deepcopy(response)}
            change = "created"
        else:
            project_id = params.get("projectId")
            if not isinstance(project_id, str) or project_id not in projects:
                raise ProjectError("Unknown demo project")
            if method == "project/read":
                return {"project": projects[project_id]}, None
            if method == "project/update":
                projects[project_id].update(self._fields(params))
                projects[project_id]["updatedAt"] = int(time.time())
                response, change = {"project": projects[project_id]}, "updated"
            elif method == "project/delete":
                del projects[project_id]
                response, change = {}, "deleted"
            else:
                raise ProjectError("Unsupported project operation")
        self._commit(data)
        return response, {"method": "project/changed", "params": {"projectId": project_id, "changeType": change}}
