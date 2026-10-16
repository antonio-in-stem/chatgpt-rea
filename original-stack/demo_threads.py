"""Source-shaped, read-only transcript for exercising the original renderer."""
import copy
import base64
import hashlib
import secrets
import json
import time
import uuid
from pathlib import Path

THREAD = json.loads((Path(__file__).parent / "demo-thread.json").read_text(encoding="utf-8"))
PINNED_SECTION = "01984de2-8f74-7c91-a3b2-5c5e937cf318"
METHODS = {"threadSection/list", "thread/search", "thread/list", "thread/read", "thread/turns/list", "thread/resume", "thread/goal/get", "thread/items/list"}

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

def search_threads(entries, params):
    """Local substring demo search, not a reproduction of upstream full-text ranking."""
    term=params.get("searchTerm")
    if not isinstance(term,str):raise ThreadError("Search term must be text")
    term=term.strip().casefold()
    keys={"created_at":"createdAt","updated_at":"updatedAt","recency_at":"recencyAt"}
    sort=params.get("sortKey") or "created_at"
    direction=params.get("sortDirection") or "desc"
    if not isinstance(sort,str) or sort not in keys or direction not in ("asc","desc"):raise ThreadError("Invalid search sort")
    archived=params.get("archived")
    if archived is not None and type(archived) is not bool:raise ThreadError("Invalid archive filter")
    sources=params.get("sourceKinds")
    allowed={"cli","vscode","exec","appServer","subAgent","subAgentReview","subAgentCompact","subAgentThreadSpawn","subAgentOther","unknown"}
    if sources is not None and (not isinstance(sources,list) or any(not isinstance(v,str) or v not in allowed for v in sources)):raise ThreadError("Invalid source filter")
    sources=sorted(set(sources or ["cli","vscode","appServer"]))
    limit=params.get("limit") if params.get("limit") is not None else 100
    if type(limit) is not int or not 1<=limit<=1000:raise ThreadError("Invalid limit")
    scope=hashlib.sha256(json.dumps([term,sort,bool(archived),sources]).encode()).hexdigest()[:16]
    anchor=None
    cursor=params.get("cursor")
    if cursor is not None:
        try:
            if not isinstance(cursor,str) or not cursor.startswith("demo-search:"):raise ValueError()
            token=json.loads(base64.b64decode(cursor[12:],altchars=b"-_",validate=True))
            if not isinstance(token,list) or len(token)!=3 or token[0]!=scope or type(token[1]) is not int or not isinstance(token[2],str):raise ValueError()
            anchor=tuple(token[1:])
        except (ValueError,TypeError,UnicodeError):raise ThreadError("Invalid demo search cursor") from None
    def cursor_for(key):return "demo-search:"+base64.urlsafe_b64encode(json.dumps([scope,*key]).encode()).decode()
    matches=[]
    for entry in entries:
        thread=entry["thread"]
        if bool(entry["archived"])!=bool(archived) or thread["source"] not in sources:continue
        texts=[thread.get("name") or "",thread.get("preview") or ""]
        for turn in thread["turns"]:
            for item in turn["items"]:
                if item["type"]=="userMessage":texts.extend(v["text"] for v in item["content"] if v["type"]=="text")
                elif item["type"]=="agentMessage":texts.append(item["text"])
        text=next((t for t in texts if term and term in t.casefold()),None)
        if text is None:continue
        # Map folded offsets back to original Unicode before clipping a snippet.
        folded_position=text.casefold().find(term)
        folded_offset=0
        position=0
        for position,char in enumerate(text):
            folded_offset+=len(char.casefold())
            if folded_offset>folded_position:break
        start=max(0,position-60)
        snippet=("\u2026" if start else "")+text[start:start+240]+("\u2026" if start+240<len(text) else "")
        key=(thread[keys[sort]] or 0,thread["id"])
        if anchor is not None and not (key>anchor if direction=="asc" else key<anchor):continue
        matches.append((key,{"thread":{**copy.deepcopy(thread),"turns":[]},"snippet":snippet}))
    matches.sort(key=lambda row:row[0],reverse=direction=="desc")
    selected=matches[:limit]
    return {"data":[row[1] for row in selected],"nextCursor":cursor_for(selected[-1][0]) if len(matches)>limit else None,"backwardsCursor":cursor_for(selected[0][0]) if selected else None}

def handle(method, params, thread_data=None, archived=False):
    if params is None and method == "thread/list":params={}
    if not isinstance(params, dict):
        raise ThreadError("Expected object parameters")
    if method == "threadSection/list":
        result=page([{"id":PINNED_SECTION,"name":"Pinned","appearance":None}],params,"demo-section:")
        result.pop("backwardsCursor")
        return result
    thread = copy.deepcopy(THREAD if thread_data is None else thread_data)
    if method == "thread/search":return search_threads([{"thread":thread,"archived":archived}],params)
    if method == "thread/list":
        if params.get("originators") or params.get("ancestorThreadId"):
            raise ThreadError("Unsupported demo thread filter")
        matches = bool(params.get("archived")) == archived
        for key, field in [("sectionId","section"),("projectId","projectId"),("parentThreadId","parentThreadId")]:
            if key in params and params[key] != ((thread[field] or {}).get("id") if field=="section" else thread[field]): matches = False
        for key, field in [("modelProviders","modelProvider"),("sourceKinds","source")]:
            if params.get(key) and thread[field] not in params[key]: matches = False
        cwd=params.get("cwd")
        if cwd is not None and thread["cwd"] not in (cwd if isinstance(cwd,list) else [cwd]): matches=False
        term=params.get("searchTerm")
        if term and term.casefold() not in (thread["name"] or "").casefold():matches=False
        if params.get("sortDirection") not in (None,"asc","desc"):raise ThreadError("Invalid direction")
        thread["turns"]=[]
        return page([thread] if matches else [],params,"demo-thread:")
    if params.get("threadId") != thread["id"]:
        raise ThreadError("Unknown demo thread")
    if method == "thread/goal/get":return {"goal":None}
    if method == "thread/resume":
        if params.get("history") or params.get("path"):
            raise ThreadError("Importing arbitrary history is not supported by the demo")
        initial = params.get("initialTurnsPage")
        turns_page = handle("thread/turns/list", {**initial, "threadId": thread["id"]}, thread) if isinstance(initial, dict) else None
        if params.get("excludeTurns"):thread["turns"]=[]
        thread["status"]={"type":"active","activeFlags":[]} if any(t["status"]=="inProgress" for t in (thread_data or THREAD)["turns"]) else {"type":"idle"}
        return {"thread":thread,"model":"rea-demo","modelProvider":"openai","serviceTier":None,"disabledPluginIds":[],"cwd":thread["cwd"],"runtimeWorkspaceRoots":[thread["cwd"]],"instructionSources":[],"approvalPolicy":"on-request","approvalsReviewer":"user","sandbox":{"type":"readOnly","networkAccess":False},"activePermissionProfile":None,"reasoningEffort":"medium","collaborationMode":None,"multiAgentMode":"explicitRequestOnly","initialTurnsPage":turns_page,"turnsBackwardsCursor":None,"itemsBackwardsCursor":None}
    if method == "thread/read":
        if not params.get("includeTurns"):thread["turns"]=[]
        return {"thread":thread}
    if method == "thread/items/list":
        direction=params.get("sortDirection") or "asc"
        if direction not in ("asc","desc"):raise ThreadError("Invalid item direction")
        turn_id=params.get("turnId")
        if turn_id is not None and not any(t["id"]==turn_id for t in thread["turns"]):raise ThreadError("Unknown item turn")
        items=[{"turnId":t["id"],"item":copy.deepcopy(item),"startedAtMs":None,"completedAtMs":None} for t in thread["turns"] if turn_id is None or t["id"]==turn_id for item in t["items"]]
        if direction=="desc":items.reverse()
        cursor=params.get("cursor")
        if isinstance(cursor,dict):
            if not turn_id or cursor.get("type")!="item":raise ThreadError("Item anchor requires a turn")
            matches=[i for i,row in enumerate(items) if row["item"]["id"]==cursor.get("itemId")]
            if not matches:raise ThreadError("Unknown item anchor")
            params={**params,"cursor":"demo-item:"+str(matches[0]+1)}
        return page(items,params,"demo-item:")
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
    MUTATIONS = {"thread/section/move", "thread/name/set", "thread/archive", "thread/unarchive", "thread/fork", "thread/goal/set", "thread/goal/clear", "thread/start", "turn/start", "turn/interrupt", "thread/revert", "thread/rollback"}
    SECTION_METHODS = {"threadSection/list","threadSection/create","threadSection/update","threadSection/delete"}
    from demo_thread_queue import METHODS as QUEUE_METHODS
    METHODS = METHODS | MUTATIONS | SECTION_METHODS | QUEUE_METHODS

    def __init__(self, path, streaming=False):
        self.streaming=streaming
        self.path = Path(path)
        data = json.loads(self.path.read_text(encoding="utf-8")) if self.path.exists() else {"thread":copy.deepcopy(THREAD),"archived":False}
        if "thread" in data:
            data = {"version":2,"threads":{data["thread"]["id"]:data}}
        if data.get("version") != 2 or not isinstance(data.get("threads"),dict):
            raise ThreadError("Unsupported demo thread store")
        data.setdefault("sections",{})
        if not isinstance(data["sections"],dict):raise ThreadError("Invalid section store")
        self.data = data

    def _commit(self, data):
        self.path.parent.mkdir(parents=True,exist_ok=True)
        temporary = self.path.with_suffix(".tmp")
        temporary.write_text(json.dumps(data,indent=2),encoding="utf-8")
        temporary.replace(self.path)
        self.data = data

    def _sections(self):
        return {PINNED_SECTION:{"id":PINNED_SECTION,"name":"Pinned","appearance":None},**self.data["sections"]}

    def _section_operation(self, method, params):
        if method=="threadSection/list":
            result=page(copy.deepcopy(list(self._sections().values())),params,"demo-section:")
            result.pop("backwardsCursor")
            return result,None
        identifier=params.get("sectionId")
        if method!="threadSection/create":
            if not isinstance(identifier,str) or identifier not in self.data["sections"]:raise ThreadError("Unknown or reserved demo section")
        if method!="threadSection/delete":
            name=params.get("name")
            if not isinstance(name,str) or not name.strip():raise ThreadError("Section name required")
            appearance=params.get("appearance")
            if appearance is not None and (not isinstance(appearance,dict) or set(appearance)!={"icon","color"} or any(v is not None and not isinstance(v,str) for v in appearance.values())):raise ThreadError("Invalid section appearance")
        data=copy.deepcopy(self.data)
        if method=="threadSection/delete":
            del data["sections"][identifier]
            for entry in data["threads"].values():
                if (entry["thread"]["section"] or {}).get("id")==identifier:
                    entry["thread"].update(section=None,sectionEnteredAt=None)
                    entry.pop("sectionPosition",None)
            result={}
        else:
            if method=="threadSection/create":
                # Timestamp-based UUIDv7 identity; randomness disambiguates same-ms creates.
                while True:
                    bits=(int(time.time()*1000)<<80)|(7<<76)|(secrets.randbits(12)<<64)|(2<<62)|secrets.randbits(62)
                    identifier=str(uuid.UUID(int=bits))
                    if identifier not in self._sections():break
                section={"id":identifier,"name":name.strip(),"appearance":copy.deepcopy(appearance)}
            else:
                section=data["sections"][identifier]
                section["name"]=name.strip()
                if "appearance" in params:section["appearance"]=copy.deepcopy(appearance)
            data["sections"][identifier]=section
            for entry in data["threads"].values():
                if (entry["thread"]["section"] or {}).get("id")==identifier:entry["thread"]["section"]=copy.deepcopy(section)
            result={"section":copy.deepcopy(section)}
        self._commit(data)
        return result,None

    def end_failed_turn(self, thread_id, turn_id, message, ended_at_ms=None):
        data=copy.deepcopy(self.data)
        entry=data["threads"][thread_id]
        thread=entry["thread"]
        turn=next(t for t in thread["turns"] if t["id"]==turn_id)
        if turn["status"]!="inProgress":return []
        ended=int(time.time()*1000) if ended_at_ms is None else ended_at_ms
        turn.update(status="failed",completedAt=ended//1000,durationMs=max(0,ended-turn["startedAt"]*1000),error={"message":message,"codexErrorInfo":None,"additionalDetails":None,"misalignment":None})
        thread["status"]={"type":"idle"}
        self._commit(data)
        return [{"method":"turn/completed","params":{"threadId":thread_id,"turn":copy.deepcopy(turn)}},{"method":"thread/status/changed","params":{"threadId":thread_id,"status":{"type":"idle"}}}]

    def recover_active_turns(self):
        recovered=0
        for thread_id,entry in list(self.data["threads"].items()):
            for turn in entry["thread"]["turns"]:
                if turn["status"]=="inProgress":
                    self.end_failed_turn(thread_id,turn["id"],"Demo transport restarted before this response finished.",entry.get("demoProgressAtMs",turn["startedAt"]*1000))
                    recovered+=1
        return recovered

    def apply_stream_event(self, thread_id, turn_id, event):
        data=copy.deepcopy(self.data)
        thread=data["threads"][thread_id]["thread"]
        turn=next(t for t in thread["turns"] if t["id"]==turn_id)
        if turn["status"] in ("interrupted","failed"):return False
        method,params=event["method"],event["params"]
        if method in ("item/started","item/completed"):
            params["startedAtMs" if method=="item/started" else "completedAtMs"]=int(time.time()*1000)
            item=copy.deepcopy(params["item"])
            turn["items"]=[i for i in turn["items"] if i["id"]!=item["id"]]+[item]
        elif method=="item/agentMessage/delta":
            item=next(i for i in turn["items"] if i["id"]==params["itemId"])
            item["text"]+=params["delta"]
        elif method=="turn/completed":
            now=int(time.time())
            turn.update(status="completed",completedAt=now,durationMs=max(0,now-turn["startedAt"])*1000)
            params["turn"]=copy.deepcopy(turn)
            thread.update(updatedAt=now,recencyAt=now)
        elif method=="thread/status/changed":thread["status"]=copy.deepcopy(params["status"])
        else:return True
        data["threads"][thread_id]["demoProgressAtMs"]=int(time.time()*1000)
        self._commit(data)
        return True

    def _start(self, params):
        from pathlib import PureWindowsPath
        ephemeral=params.get("ephemeral") is True
        if params.get("ephemeral"):
            expected={"ephemeral":True,"permissions":":read-only","threadSource":"mcp_extension_host"}
            if not ephemeral or params != expected:raise ThreadError("Only read-only MCP extension demo sessions are supported")
        for key in ("environments","dynamicTools","selectedCapabilityRoots"):
            if params.get(key):raise ThreadError("Unsupported demo start option: "+key)
        config=params.get("config") if params.get("config") is not None else {}
        if not isinstance(config,dict):raise ThreadError("Start config must be an object")
        cwd=params.get("cwd") or THREAD["cwd"]
        if not isinstance(cwd,str) or not PureWindowsPath(cwd).is_absolute():raise ThreadError("Absolute demo cwd required")
        roots=params.get("runtimeWorkspaceRoots")
        if roots is None:roots=[cwd]
        if not isinstance(roots,list) or any(not isinstance(root,str) or not PureWindowsPath(root).is_absolute() for root in roots):raise ThreadError("Absolute workspace roots required")
        mode=params.get("historyMode") or "legacy"
        if mode not in ("legacy","paginated"):raise ThreadError("Unknown history mode")
        for key in ("model","modelProvider","serviceTier","threadSource","projectId"):
            if params.get(key) is not None and not isinstance(params[key],str):raise ThreadError("Invalid start metadata: "+key)
        if params.get("daybreakEnabled") is not None and type(params["daybreakEnabled"]) is not bool:raise ThreadError("Invalid daybreak flag")
        thread=copy.deepcopy(THREAD)
        identifier=str(uuid.uuid4())
        now=int(time.time())
        effort=config.get("model_reasoning_effort") or "medium"
        if not isinstance(effort,str):raise ThreadError("Invalid reasoning effort")
        thread.update(id=identifier,sessionId=identifier,name=None,preview="",turns=[],createdAt=now,updatedAt=now,recencyAt=now,cwd=cwd,historyMode=mode,status={"type":"idle"},projectId=params.get("projectId"),threadSource=params.get("threadSource"),daybreakEnabled=params.get("daybreakEnabled"),model=params.get("model") or "rea-demo",modelProvider=params.get("modelProvider") or "openai",reasoningEffort=effort)
        response=handle("thread/resume",{"threadId":identifier},thread)
        for key in ("collaborationMode","initialTurnsPage","turnsBackwardsCursor","itemsBackwardsCursor"):response.pop(key)
        settings={"model":thread["model"],"modelProvider":thread["modelProvider"],"reasoningEffort":effort,"serviceTier":params.get("serviceTier"),"runtimeWorkspaceRoots":roots}
        response.update(settings)
        # The original MCP bootstrap needs an ID, without sidebar or disk history.
        # No executor or persistent ephemeral turns are supplied by this demo.
        if ephemeral:return response,None
        data=copy.deepcopy(self.data)
        # Store frontend preferences as inert demo metadata; no instructions/tools run.
        data["threads"][identifier]={"thread":thread,"archived":False,"settings":settings,"startConfig":copy.deepcopy(config)}
        self._commit(data)
        return response,{"method":"thread/started","params":{"thread":copy.deepcopy(thread)}}

    def handle(self, method, params):
        if method in self.QUEUE_METHODS:
            from demo_thread_queue import handle as handle_queue
            return handle_queue(self, method, params)
        if params is None and method == "thread/list":params={}
        if not isinstance(params,dict):raise ThreadError("Expected object parameters")
        if method in self.SECTION_METHODS:return self._section_operation(method,params)
        if method == "thread/start":return self._start(params)
        if method == "thread/search":return search_threads(self.data["threads"].values(),params),None
        if method == "thread/list":
            ancestor=params.get("ancestorThreadId")
            if ancestor is not None and not isinstance(ancestor,str):raise ThreadError("Invalid ancestor")
            if ancestor is not None and params.get("parentThreadId") is not None:raise ThreadError("Parent and ancestor filters are mutually exclusive")
            per_thread={**params,"cursor":None,"limit":1,"ancestorThreadId":None}
            rows=[]
            for entry in self.data["threads"].values():
                if ancestor is not None:
                    # Spawn ancestry follows parentThreadId, never forkedFromId.
                    current=entry["thread"].get("parentThreadId")
                    seen={entry["thread"]["id"]}
                    while current is not None and current != ancestor and current not in seen:
                        seen.add(current)
                        current=self.data["threads"].get(current,{}).get("thread",{}).get("parentThreadId")
                    if current != ancestor or entry["thread"]["id"] == ancestor:continue
                rows.extend(handle(method,per_thread,entry["thread"],entry["archived"])["data"])
            sort_key=params.get("sortKey") or "created_at"
            keys={"created_at":"createdAt","updated_at":"updatedAt","recency_at":"recencyAt"}
            if sort_key == "section_position":
                if not isinstance(params.get("sectionId"),str) or params["sectionId"] not in self._sections():raise ThreadError("Section ordering requires an existing demo section")
                rows.sort(key=lambda t:(self.data["threads"][t["id"]].get("sectionPosition",0),t["id"]),reverse=params.get("sortDirection")=="desc")
                return page(rows,params,"demo-thread:"),None
            if sort_key not in keys:raise ThreadError("Unsupported demo thread sort")
            rows.sort(key=lambda t:(t[keys[sort_key]] or 0,t["id"]),reverse=params.get("sortDirection")!="asc")
            return page(rows,params,"demo-thread:"),None
        thread_id=params.get("threadId")
        if not isinstance(thread_id,str) or thread_id not in self.data["threads"]:
            raise ThreadError("Unknown demo thread")
        entry=self.data["threads"][thread_id]
        if method == "thread/goal/get":return {"goal":copy.deepcopy(entry.get("goal"))},None
        if method not in self.MUTATIONS:
            response=handle(method,params,entry["thread"],entry["archived"])
            if method == "thread/resume":response.update(copy.deepcopy(entry.get("settings",{})))
            return response,None
        data=copy.deepcopy(self.data)
        entry=data["threads"][thread_id]
        thread=entry["thread"]
        if method == "thread/section/move":
            if "sectionId" not in params or (params["sectionId"] is not None and (not isinstance(params["sectionId"],str) or params["sectionId"] not in self._sections())):raise ThreadError("Unknown demo section")
            destination=params["sectionId"]
            before=params.get("beforeThreadId")
            if before is not None and not isinstance(before,str):raise ThreadError("Invalid section anchor")
            if destination is None and before is not None:raise ThreadError("Unsectioned move cannot specify an anchor")
            if before is not None and (before not in data["threads"] or (data["threads"][before]["thread"]["section"] or {}).get("id")!=destination):raise ThreadError("Anchor is not in destination section")
            if before==thread_id:return {},None
            if (thread["section"] or {}).get("id")!=destination:thread["sectionEnteredAt"]=int(time.time()) if destination else None
            thread["section"]=copy.deepcopy(self._sections()[destination]) if destination else None
            if destination:
                ordered=sorted((value for key,value in data["threads"].items() if key!=thread_id and (value["thread"]["section"] or {}).get("id")==destination),key=lambda e:(e.get("sectionPosition",0),e["thread"]["id"]))
                at=next((i for i,e in enumerate(ordered) if e["thread"]["id"]==before),len(ordered))
                ordered.insert(at,entry)
                for position,value in enumerate(ordered):value["sectionPosition"]=position
            else:entry.pop("sectionPosition",None)
            self._commit(data)
            return {},None
        if method == "thread/rollback":
            if thread["historyMode"]!="legacy":raise ThreadError("Rollback requires legacy demo history")
            count=params.get("numTurns")
            if type(count) is not int or not 1 <= count <= len(thread["turns"]):raise ThreadError("Invalid demo rollback count")
            if any(t["status"]=="inProgress" for t in thread["turns"]):raise ThreadError("Cannot roll back an active demo turn")
            thread["turns"]=thread["turns"][:-count]
            thread.update(updatedAt=int(time.time()),status={"type":"idle"})
            self._commit(data)
            # Recovered B9t/_8t consume a full thread with retained turns.
            return {"thread":copy.deepcopy(thread)},None
        if method == "thread/revert":
            if thread["historyMode"]!="paginated":raise ThreadError("Revert requires paginated demo history")
            if any(t["status"]=="inProgress" for t in thread["turns"]):raise ThreadError("Cannot revert an active demo turn")
            matches=[i for i,t in enumerate(thread["turns"]) if t["id"]==params.get("beforeTurnId")]
            if not matches:raise ThreadError("Unknown revert boundary")
            thread["turns"]=thread["turns"][:matches[0]]
            thread["updatedAt"]=int(time.time())
            thread["status"]={"type":"idle"}
            response={"thread":{**copy.deepcopy(thread),"turns":[]},"turnsBackwardsCursor":"demo-turn:0" if thread["turns"] else None,"itemsBackwardsCursor":None}
            self._commit(data)
            return response,{"method":"thread/reverted","params":{"threadId":thread_id}}
        if method == "turn/interrupt":
            turn=next((t for t in thread["turns"] if t["id"]==params.get("turnId")),None)
            if turn is None or turn["status"]!="inProgress":raise ThreadError("No matching active demo turn")
            now=int(time.time())
            turn.update(status="interrupted",completedAt=now,durationMs=max(0,now-turn["startedAt"])*1000)
            thread["status"]={"type":"idle"}
            self._commit(data)
            return {},[{"method":"turn/completed","params":{"threadId":thread_id,"turn":copy.deepcopy(turn)}},{"method":"thread/status/changed","params":{"threadId":thread_id,"status":{"type":"idle"}}}]
        if method == "turn/start":
            from demo_turns import build_turn
            if entry["archived"]:raise ThreadError("Cannot send to an archived demo chat")
            try:start,completed,events,text=build_turn(thread_id,params)
            except ValueError as error:raise ThreadError(str(error)) from error
            if any(t["status"]=="inProgress" for t in thread["turns"]):raise ThreadError("A demo turn is already active")
            thread["turns"].append(copy.deepcopy(start) if self.streaming else completed)
            thread.update(updatedAt=completed["completedAt"],recencyAt=completed["completedAt"],preview=text[:160],status={"type":"idle"})
            if self.streaming:
                thread["status"]={"type":"active","activeFlags":[]}
                entry["demoProgressAtMs"]=start["startedAt"]*1000
            if not thread.get("name"):
                thread["name"]=text.strip().splitlines()[0][:80]
                events.append({"method":"thread/name/updated","params":{"threadId":thread_id,"threadName":thread["name"]}})
            self._commit(data)
            return {"turn":start},events
        if method in ("thread/goal/set","thread/goal/clear"):
            if params.get("origin") not in (None,"user","automatic"):raise ThreadError("Invalid goal origin")
            goal=entry.get("goal")
            if method == "thread/goal/clear":
                response={"cleared":goal is not None}
                entry["goal"]=None
                event={"method":"thread/goal/cleared","params":{"threadId":thread_id}} if goal is not None else None
            else:
                objective=params.get("objective")
                if objective is not None and (not isinstance(objective,str) or not objective.strip()):raise ThreadError("Nonempty goal objective required")
                if goal is None and objective is None:raise ThreadError("An objective is required to create a goal")
                status=params.get("status")
                if status is not None and status not in ("active","paused","blocked","usageLimited","budgetLimited","complete"):raise ThreadError("Invalid goal status")
                budget=params.get("tokenBudget")
                if budget is not None and (type(budget) is not int or not 0 < budget <= 9007199254740991):raise ThreadError("Positive demo token budget required")
                now=int(time.time())
                if goal is None:
                    goal={"threadId":thread_id,"objective":objective,"status":"active","tokenBudget":None,"tokensUsed":0,"timeUsedSeconds":0,"createdAt":now,"updatedAt":now}
                if goal["status"] == "active":goal["timeUsedSeconds"]+=max(0,now-goal["updatedAt"])
                if objective is not None:goal["objective"]=objective
                if status is not None:goal["status"]=status
                if "tokenBudget" in params:goal["tokenBudget"]=budget
                goal["updatedAt"]=now
                entry["goal"]=goal
                response={"goal":copy.deepcopy(goal)}
                event={"method":"thread/goal/updated","params":{"threadId":thread_id,"turnId":None,"goal":copy.deepcopy(goal)}}
            # Demo presentation state only; never schedule an automatic continuation.
            self._commit(data)
            return response,event
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
