"""Source-shaped, read-only transcript for exercising the original renderer."""
import copy
import json
import time
from pathlib import Path

THREAD = json.loads((Path(__file__).parent / "demo-thread.json").read_text(encoding="utf-8"))
METHODS = {"thread/list", "thread/read", "thread/turns/list", "thread/resume"}

class ThreadError(ValueError):
    pass

def page(items, params, prefix):
    limit = params.get("limit") if params.get("limit") is not None else 100
    if type(limit) is not int or not 1 <= limit <= 1000:
        raise ThreadError("Invalid limit")
    cursor = params.get("cursor")
    if cursor is not None and (not isinstance(cursor, str) or not cursor.startswith(prefix) or not cursor[len(prefix):].isdigit()):
        raise ThreadError("Invalid demo cursor")
    offset = int(cursor[len(prefix):]) if cursor else 0
    result = items[offset:offset+limit]
    return {"data":result,"nextCursor":prefix+str(offset+limit) if offset+limit<len(items) else None,"backwardsCursor":None}

def handle(method, params, thread_data=None, archived=False):
    if params is None and method == "thread/list":params={}
    if not isinstance(params, dict):
        raise ThreadError("Expected object parameters")
    thread = copy.deepcopy(THREAD if thread_data is None else thread_data)
    if method == "thread/list":
        if params.get("originators") or params.get("ancestorThreadId"):
            raise ThreadError("Unsupported demo thread filter")
        matches = bool(params.get("archived")) == archived
        for key, field in [("sectionId","section"),("projectId","projectId"),("parentThreadId","parentThreadId")]:
            if key in params and params[key] != thread[field]: matches = False
        for key, field in [("modelProviders","modelProvider"),("sourceKinds","source")]:
            if params.get(key) and thread[field] not in params[key]: matches = False
        cwd=params.get("cwd")
        if cwd is not None and thread["cwd"] not in (cwd if isinstance(cwd,list) else [cwd]): matches=False
        term=params.get("searchTerm")
        if term and term.casefold() not in thread["name"].casefold():matches=False
        if params.get("sortDirection") not in (None,"asc","desc"):raise ThreadError("Invalid direction")
        thread["turns"]=[]
        return page([thread] if matches else [],params,"demo-thread:")
    if params.get("threadId") != thread["id"]:
        raise ThreadError("Unknown demo thread")
    if method == "thread/resume":
        if params.get("history") or params.get("path"):
            raise ThreadError("Importing arbitrary history is not supported by the demo")
        initial = params.get("initialTurnsPage")
        turns_page = page(thread["turns"], initial, "demo-turn:") if isinstance(initial, dict) else None
        if params.get("excludeTurns"):thread["turns"]=[]
        thread["status"]={"type":"idle"}
        return {"thread":thread,"model":"rea-demo","modelProvider":"openai","serviceTier":None,"disabledPluginIds":[],"cwd":thread["cwd"],"runtimeWorkspaceRoots":[thread["cwd"]],"instructionSources":[],"approvalPolicy":"on-request","approvalsReviewer":"user","sandbox":{"type":"readOnly","networkAccess":False},"activePermissionProfile":None,"reasoningEffort":"medium","collaborationMode":None,"multiAgentMode":"explicitRequestOnly","initialTurnsPage":turns_page,"turnsBackwardsCursor":None,"itemsBackwardsCursor":None}
    if method == "thread/read":
        if not params.get("includeTurns"):thread["turns"]=[]
        return {"thread":thread}
    if method == "thread/turns/list":
        view=params.get("itemsView") or "summary"
        if view not in ("notLoaded","summary","full"):raise ThreadError("Invalid items view")
        turns=thread["turns"]
        for turn in turns:
            if view == "notLoaded":turn["items"]=[]
            turn["itemsView"]=view
        if params.get("sortDirection") not in (None,"asc","desc"):raise ThreadError("Invalid direction")
        if params.get("sortDirection") != "asc":turns.reverse()
        return page(turns,params,"demo-turn:")
    raise ThreadError("Unsupported demo method")


class ThreadStore:
    MUTATIONS = {"thread/name/set", "thread/archive", "thread/unarchive"}
    METHODS = METHODS | MUTATIONS

    def __init__(self, path):
        self.path = Path(path)
        self.data = json.loads(self.path.read_text(encoding="utf-8")) if self.path.exists() else {"thread":copy.deepcopy(THREAD),"archived":False}

    def handle(self, method, params):
        if method not in self.MUTATIONS:
            return handle(method,params,self.data["thread"],self.data["archived"]), None
        if not isinstance(params,dict) or params.get("threadId") != self.data["thread"]["id"]:
            raise ThreadError("Unknown demo thread")
        next_data = copy.deepcopy(self.data)
        thread = next_data["thread"]
        if method == "thread/name/set":
            name = params.get("name")
            if not isinstance(name,str) or not name.strip():raise ThreadError("Thread name must be nonempty")
            thread["name"] = name
            response = {}
            event = {"method":"thread/name/updated","params":{"threadId":thread["id"],"threadName":name}}
        else:
            next_data["archived"] = method == "thread/archive"
            response = {} if next_data["archived"] else {"thread":{**copy.deepcopy(thread),"turns":[]}}
            event = {"method":"thread/archived" if next_data["archived"] else "thread/unarchived","params":{"threadId":thread["id"]}}
        thread["updatedAt"] = int(time.time())
        if "thread" in response:response["thread"]["updatedAt"]=thread["updatedAt"]
        self.path.parent.mkdir(parents=True,exist_ok=True)
        temporary = self.path.with_suffix(".tmp")
        temporary.write_text(json.dumps(next_data,indent=2),encoding="utf-8")
        temporary.replace(self.path)
        self.data = next_data
        return response,event
