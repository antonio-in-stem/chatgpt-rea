"""Source-shaped, read-only transcript for exercising the original renderer."""
import copy
import json
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

def handle(method, params):
    if params is None and method == "thread/list":params={}
    if not isinstance(params, dict):
        raise ThreadError("Expected object parameters")
    thread = copy.deepcopy(THREAD)
    if method == "thread/list":
        if params.get("originators") or params.get("ancestorThreadId"):
            raise ThreadError("Unsupported demo thread filter")
        matches = not params.get("archived")
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
