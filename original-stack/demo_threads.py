"""Source-shaped, read-only transcript for exercising the original renderer."""
import copy
import json
import time
import uuid
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
    MUTATIONS = {"thread/name/set", "thread/archive", "thread/unarchive", "thread/fork"}
    METHODS = METHODS | MUTATIONS

    def __init__(self, path):
        self.path = Path(path)
        data = json.loads(self.path.read_text(encoding="utf-8")) if self.path.exists() else {"thread":copy.deepcopy(THREAD),"archived":False}
        if "thread" in data:
            data = {"version":2,"threads":{data["thread"]["id"]:data}}
        if data.get("version") != 2 or not isinstance(data.get("threads"),dict):
            raise ThreadError("Unsupported demo thread store")
        self.data = data

    def _commit(self, data):
        self.path.parent.mkdir(parents=True,exist_ok=True)
        temporary = self.path.with_suffix(".tmp")
        temporary.write_text(json.dumps(data,indent=2),encoding="utf-8")
        temporary.replace(self.path)
        self.data = data

    def handle(self, method, params):
        if params is None and method == "thread/list":params={}
        if not isinstance(params,dict):raise ThreadError("Expected object parameters")
        if method == "thread/list":
            per_thread={**params,"cursor":None,"limit":1}
            rows=[]
            for entry in self.data["threads"].values():
                rows.extend(handle(method,per_thread,entry["thread"],entry["archived"])["data"])
            sort_key=params.get("sortKey") or "created_at"
            keys={"created_at":"createdAt","updated_at":"updatedAt","recency_at":"recencyAt"}
            if sort_key not in keys:raise ThreadError("Unsupported demo thread sort")
            rows.sort(key=lambda t:(t[keys[sort_key]] or 0,t["id"]),reverse=params.get("sortDirection")!="asc")
            return page(rows,params,"demo-thread:"),None
        thread_id=params.get("threadId")
        if not isinstance(thread_id,str) or thread_id not in self.data["threads"]:
            raise ThreadError("Unknown demo thread")
        entry=self.data["threads"][thread_id]
        if method not in self.MUTATIONS:
            response=handle(method,params,entry["thread"],entry["archived"])
            if method == "thread/resume":response.update(copy.deepcopy(entry.get("settings",{})))
            return response,None
        data=copy.deepcopy(self.data)
        entry=data["threads"][thread_id]
        thread=entry["thread"]
        if method == "thread/fork":
            for key in ("path","experimentalPredictionMode","ephemeral","baseInstructions","developerInstructions","permissions","sandbox","approvalPolicy","approvalsReviewer"):
                if params.get(key):raise ThreadError("Unsupported demo fork option: "+key)
            config=params.get("config") if params.get("config") is not None else {}
            if not isinstance(config,dict):raise ThreadError("Fork config must be an object")
            roots=params.get("runtimeWorkspaceRoots")
            if roots is not None:
                from pathlib import PureWindowsPath
                if not isinstance(roots,list) or any(not isinstance(root,str) or not PureWindowsPath(root).is_absolute() for root in roots):raise ThreadError("Absolute workspace roots required")
            source=params.get("threadSource")
            if source is not None and not isinstance(source,str):raise ThreadError("Invalid thread source")
            last,before=params.get("lastTurnId"),params.get("beforeTurnId")
            if last is not None and before is not None:raise ThreadError("Fork boundaries are mutually exclusive")
            boundary=last if last is not None else before
            if boundary is not None:
                matches=[i for i,t in enumerate(thread["turns"]) if t["id"]==boundary]
                if not matches:raise ThreadError("Unknown fork turn")
                index=matches[0]
                if thread["turns"][index]["status"]=="inProgress":raise ThreadError("Cannot fork an active turn")
                thread["turns"]=thread["turns"][:index+(last is not None)]
            thread["id"]=str(uuid.uuid4())
            thread["forkedFromId"]=thread_id
            thread["parentThreadId"]=None
            thread["path"]=None
            thread["name"]=(thread["name"] or "Demo")+" (fork)"
            now=int(time.time())
            thread.update(createdAt=now,updatedAt=now,recencyAt=now,status={"type":"idle"})
            # Metadata-only model overrides; there is no generation backend.
            for key in ("model","modelProvider"):
                if params.get(key) is not None:
                    if not isinstance(params[key],str):raise ThreadError("Invalid fork model metadata")
                    thread[key]=params[key]
            if params.get("cwd") is not None:
                from pathlib import PureWindowsPath
                if not isinstance(params["cwd"],str) or not PureWindowsPath(params["cwd"]).is_absolute():raise ThreadError("Absolute demo cwd required")
                thread["cwd"]=params["cwd"]
            # The source entry must remain byte-for-byte unchanged.
            data["threads"][thread_id]=copy.deepcopy(self.data["threads"][thread_id])
            data["threads"][thread["id"]]={"thread":thread,"archived":False}
            response=handle("thread/resume",{"threadId":thread["id"],"excludeTurns":params.get("excludeTurns",False)},thread)
            for key in ("collaborationMode","initialTurnsPage","turnsBackwardsCursor","itemsBackwardsCursor"):response.pop(key)
            response["model"]=thread["model"] or "rea-demo"
            response["modelProvider"]=thread["modelProvider"]
            response["serviceTier"]=params.get("serviceTier")
            # Frontend settings are demo metadata only: no tool/config execution.
            settings=copy.deepcopy(entry.get("settings",{}))
            settings.update(model=response["model"],modelProvider=response["modelProvider"],serviceTier=response["serviceTier"])
            if roots is not None:settings["runtimeWorkspaceRoots"]=roots
            effort=config.get("model_reasoning_effort")
            if effort is not None:
                if effort not in ("none","minimal","low","medium","high","xhigh","max","ultra","persistent"):raise ThreadError("Invalid demo reasoning effort")
                settings["reasoningEffort"]=effort
            data["threads"][thread["id"]].update(settings=settings,forkConfig=copy.deepcopy(config),threadSource=source)
            response.update(settings)
            event={"method":"thread/started","params":{"thread":{**copy.deepcopy(thread),"turns":[]}}}
        else:
            if method == "thread/name/set":
                name=params.get("name")
                if not isinstance(name,str) or not name.strip():raise ThreadError("Thread name must be nonempty")
                thread["name"]=name
                response={}
                event={"method":"thread/name/updated","params":{"threadId":thread_id,"threadName":name}}
            else:
                entry["archived"]=method=="thread/archive"
                response={} if entry["archived"] else {"thread":{**copy.deepcopy(thread),"turns":[]}}
                event={"method":"thread/archived" if entry["archived"] else "thread/unarchived","params":{"threadId":thread_id}}
            thread["updatedAt"]=int(time.time())
            if "thread" in response:response["thread"]["updatedAt"]=thread["updatedAt"]
        self._commit(data)
        return response,event
