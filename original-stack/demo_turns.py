"""Deterministic transcript/event construction; no model, tools or network."""
import copy
import time
import uuid


def build_turn(thread_id, params):
    inputs=params.get("input")
    if not isinstance(inputs,list) or not inputs:raise ValueError("Demo turn requires text input")
    for item in inputs:
        if not isinstance(item,dict) or item.get("type")!="text" or not isinstance(item.get("text"),str):raise ValueError("Only text demo input is implemented")
        if item.get("text_elements",[]) != []:raise ValueError("Rich text spans are not implemented")
    text="\n".join(item["text"] for item in inputs)
    if not text.strip():raise ValueError("Nonempty demo message required")
    client_id=params.get("clientUserMessageId")
    if client_id is not None and not isinstance(client_id,str):raise ValueError("Invalid client message ID")
    turn_id=str(uuid.uuid4())
    now=int(time.time())
    user={"type":"userMessage","id":str(uuid.uuid4()),"clientId":client_id,"content":[{"type":"text","text":item["text"],"text_elements":[]} for item in inputs]}
    agent={"type":"agentMessage","id":str(uuid.uuid4()),"text":"Demo message received. This fixed response exercises the original frontend; no model or tools were invoked.","phase":"final_answer","memoryCitation":None,"delivery":None,"questions":None}
    start={"id":turn_id,"rootTurnId":turn_id,"items":[],"itemsView":"full","status":"inProgress","error":None,"startedAt":now,"completedAt":None,"durationMs":None}
    completed={**copy.deepcopy(start),"items":[user,agent],"status":"completed","completedAt":now,"durationMs":0}
    events=[{"method":"thread/status/changed","params":{"threadId":thread_id,"status":{"type":"active","activeFlags":[]}}},{"method":"turn/started","params":{"threadId":thread_id,"turn":copy.deepcopy(start)}}]
    for item in (user,agent):
        initial={**copy.deepcopy(item),"text":""} if item is agent else copy.deepcopy(item)
        events.append({"method":"item/started","params":{"threadId":thread_id,"turnId":turn_id,"item":initial,"startedAtMs":now*1000}})
        if item is agent:events.append({"method":"item/agentMessage/delta","params":{"threadId":thread_id,"turnId":turn_id,"itemId":item["id"],"delta":item["text"]}})
        events.append({"method":"item/completed","params":{"threadId":thread_id,"turnId":turn_id,"item":copy.deepcopy(item),"completedAtMs":now*1000}})
    events.extend([{"method":"turn/completed","params":{"threadId":thread_id,"turn":copy.deepcopy(completed)}},{"method":"thread/status/changed","params":{"threadId":thread_id,"status":{"type":"idle"}}}])
    return start,completed,events,text
