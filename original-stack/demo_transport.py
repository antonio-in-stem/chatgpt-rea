"""Loopback-only contract recorder for the recovered app-server transport.
No upstream connections, credentials, filesystem tools, or invented account data.
"""
import argparse
import asyncio
import json
from pathlib import Path
from websockets.asyncio.server import serve
from websockets.exceptions import ConnectionClosed
from demo_projects import ProjectStore, ProjectError
from demo_config import ConfigStore, ConfigError
import demo_threads

MAX_FRAME_BYTES = 1024 * 1024
FIXTURES = json.loads((Path(__file__).parent / "demo-fixtures.json").read_text(encoding="utf-8"))


def handle_message(raw, projects=None, notifications=None, config=None, threads=None):
    """Return an optional RPC reply and a value-free method/shape observation."""
    try:
        message = json.loads(raw)
    except (ValueError, TypeError):
        return {"id": None, "error": {"code": -32700, "message": "Invalid JSON"}}, {"kind": "parse-error"}
    if not isinstance(message, dict) or not isinstance(message.get("method"), str):
        return {"id": None, "error": {"code": -32600, "message": "Invalid request"}}, {"kind": "invalid-request"}
    request_id = message.get("id")
    if request_id is not None and (isinstance(request_id, bool) or not isinstance(request_id, (str, int))):
        return {"id": None, "error": {"code": -32600, "message": "Invalid request ID"}}, {"kind": "invalid-request"}
    params = message.get("params")
    observation = {"kind": "request" if "id" in message else "notification", "method": message["method"],
                   "paramKeys": sorted(params) if isinstance(params, dict) else [],
                   "paramsType": type(params).__name__}
    if "id" not in message:
        return None, observation
    if threads is not None and message["method"] in threads.METHODS:
        try:
            result,event=threads.handle(message["method"],params)
            if event is not None and notifications is not None:notifications.append(event)
            return {"id":request_id,"result":result}, observation
        except demo_threads.ThreadError as error:
            return {"id":request_id,"error":{"code":-32602,"message":str(error)}}, observation
    if message["method"] in demo_threads.METHODS:
        try:
            return {"id":request_id,"result":demo_threads.handle(message["method"],params)}, observation
        except demo_threads.ThreadError as error:
            return {"id":request_id,"error":{"code":-32602,"message":str(error)}}, observation
    if config is not None and message["method"] in ConfigStore.METHODS:
        try:
            return {"id":request_id,"result":config.handle(message["method"],params)}, observation
        except ConfigError as error:
            return {"id":request_id,"error":{"code":-32602,"message":str(error)}}, observation
    if projects is not None and message["method"] in ProjectStore.METHODS:
        try:
            result, notification = projects.handle(message["method"], params)
            if notification is not None and notifications is not None:
                notifications.append(notification)
            return {"id": request_id, "result": result}, observation
        except ProjectError as error:
            return {"id": request_id, "error": {"code": -32602, "message": str(error)}}, observation
    if message["method"] == "hooks/list":
        options={} if params is None else params
        cwds=options.get("cwds",[]) if isinstance(options,dict) else None
        if not isinstance(cwds,list) or any(not isinstance(cwd,str) or not cwd for cwd in cwds):
            return {"id":request_id,"error":{"code":-32602,"message":"Expected working-directory strings"}},observation
        # A demo has no configured executable hooks. Do not access these paths.
        roots=cwds or [demo_threads.THREAD["cwd"]]
        return {"id":request_id,"result":{"data":[{"cwd":cwd,"hooks":[],"warnings":[],"errors":[]} for cwd in roots]}},observation
    if message["method"] == "initialize":
        return {"id": request_id, "result": {
            "userAgent": "rea-demo/0.162.0-alpha.17.2",
            "codexHome": str((Path(__file__).parent / "state" / "demo-home").resolve()),
            "platformFamily": "windows", "platformOs": "windows"}}, observation
    if message["method"] in FIXTURES:
        return {"id": request_id, "result": FIXTURES[message["method"]]["result"]}, observation
    # Fail closed until a source-derived fixture for this method exists.
    return {"id": request_id, "error": {"code": -32601, "message": "Demo contract not implemented"}}, observation


async def run(port, output, project_state, config_state, thread_state):
    output.parent.mkdir(parents=True, exist_ok=True)
    projects = ProjectStore(project_state)
    config = ConfigStore(config_state, FIXTURES["config/read"]["result"]["config"])
    threads = demo_threads.ThreadStore(thread_state)
    clients = set()
    async def connection(socket):
        clients.add(socket)
        try:
            async for raw in socket:
                notifications = []
                reply, observation = handle_message(raw, projects, notifications, config, threads)
                with output.open("a", encoding="utf-8") as stream:
                    stream.write(json.dumps(observation) + "\n")
                if reply is not None:
                    await socket.send(json.dumps(reply))
                for notification in notifications:
                    deliveries=await asyncio.gather(*(client.send(json.dumps(notification)) for client in tuple(clients)), return_exceptions=True)
                    with output.open("a",encoding="utf-8") as stream:
                        stream.write(json.dumps({"kind":"notification-sent","method":notification["method"],"delivered":sum(not isinstance(result,BaseException) for result in deliveries),"failed":sum(isinstance(result,BaseException) for result in deliveries)})+"\n")
        except ConnectionClosed:
            pass
        finally:
            clients.discard(socket)
    async with serve(connection, "127.0.0.1", port, max_size=MAX_FRAME_BYTES) as server:
        print(json.dumps({"endpoint": f"ws://127.0.0.1:{server.sockets[0].getsockname()[1]}",
                          "mode": "demo-contract-adapter", "fixtureMethods": ["initialize", *FIXTURES]}), flush=True)
        await asyncio.Future()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=0)
    parser.add_argument("--output", type=Path, default=Path(__file__).parent / "state" / "demo-methods.jsonl")
    parser.add_argument("--project-state", type=Path, default=Path(__file__).parent / "state" / "demo-projects.json")
    parser.add_argument("--config-state", type=Path, default=Path(__file__).parent / "state" / "demo-config.json")
    parser.add_argument("--thread-state", type=Path, default=Path(__file__).parent / "state" / "demo-threads.json")
    args = parser.parse_args()
    asyncio.run(run(args.port, args.output, args.project_state, args.config_state, args.thread_state))
