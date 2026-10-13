"""Deterministic transcript/event construction; no model, tools or network."""
import copy
import time
import uuid


def text_elements(item):
    """Preserve original TextElement byte ranges; never interpret placeholder data."""
    elements = item.get("text_elements", [])
    if not isinstance(elements, list):
        raise ValueError("Text elements must be an array")
    boundaries = {0}
    offset = 0
    for character in item["text"]:
        offset += len(character.encode("utf-8"))
        boundaries.add(offset)
    for element in elements:
        if not isinstance(element, dict) or "placeholder" not in element:
            raise ValueError("Invalid text element")
        if element["placeholder"] is not None and not isinstance(element["placeholder"], str):
            raise ValueError("Invalid text element placeholder")
        byte_range = element.get("byteRange")
        if not isinstance(byte_range, dict):
            raise ValueError("Invalid text element byte range")
        start, end = byte_range.get("start"), byte_range.get("end")
        if (type(start) is not int or type(end) is not int or start > end
                or start not in boundaries or end not in boundaries):
            raise ValueError("Text element range must align with UTF-8 boundaries")
    return copy.deepcopy(elements)


def build_turn(thread_id, params):
    inputs=params.get("input")
    if not isinstance(inputs,list) or not inputs:raise ValueError("Demo turn requires text input")
    for item in inputs:
        if not isinstance(item,dict) or item.get("type")!="text" or not isinstance(item.get("text"),str):raise ValueError("Only text demo input is implemented")
        text_elements(item)
    text="\n".join(item["text"] for item in inputs)
    if not text.strip():raise ValueError("Nonempty demo message required")
    client_id=params.get("clientUserMessageId")
    if client_id is not None and not isinstance(client_id,str):raise ValueError("Invalid client message ID")
    turn_id=str(uuid.uuid4())
    now=int(time.time())
    user={"type":"userMessage","id":str(uuid.uuid4()),"clientId":client_id,"content":[{"type":"text","text":item["text"],"text_elements":text_elements(item)} for item in inputs]}
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
