"""Loopback-only contract recorder for the recovered app-server transport.
No upstream connections, credentials or filesystem tools. Synthetic identity is opt-in.
"""
import argparse
import asyncio
from contextlib import AsyncExitStack
import json
from pathlib import Path
from websockets.asyncio.server import serve
from websockets.exceptions import ConnectionClosed
from demo_projects import ProjectStore, ProjectError
from demo_config import ConfigStore, ConfigError
import demo_threads
import demo_plugins
import demo_security
import demo_skills
from demo_page_sync import PageSyncStore

MAX_FRAME_BYTES = 1024 * 1024
FIXTURES = json.loads((Path(__file__).parent / "demo-fixtures.json").read_text(encoding="utf-8"))


def handle_message(raw, projects=None, notifications=None, config=None, threads=None, demo_sandbox_state="notConfigured"):
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
    if config is not None and message["method"] in demo_security.METHODS:
        try:
            return {"id":request_id,"result":demo_security.handle(message["method"],params)},observation
        except demo_security.SecurityError as error:
            return {"id":request_id,"error":{"code":-32602,"message":str(error)}},observation
    if config is not None and message["method"] in demo_skills.METHODS:
        try:
            return {"id":request_id,"result":demo_skills.SkillStore(config).handle(message["method"],params,demo_threads.THREAD["cwd"])},observation
        except demo_skills.SkillError as error:
            return {"id":request_id,"error":{"code":-32602,"message":str(error)}},observation
        except OSError:
            return {"id":request_id,"error":{"code":-32603,"message":"Demo skill state could not be saved"}},observation
    if config is not None and message["method"] in demo_plugins.METHODS:
        try:
            return {"id":request_id,"result":demo_plugins.PluginStore(config).handle(message["method"],params)},observation
        except demo_plugins.PluginError as error:
            return {"id":request_id,"error":{"code":-32602,"message":str(error)}},observation
        except OSError:
            return {"id":request_id,"error":{"code":-32603,"message":"Demo plugin state could not be saved"}},observation
    if threads is not None and message["method"] in threads.METHODS:
        try:
            result,event=threads.handle(message["method"],params)
            if event is not None and notifications is not None:notifications.extend(event if isinstance(event,list) else [event])
            return {"id":request_id,"result":result}, observation
        except demo_threads.ThreadError as error:
            return {"id":request_id,"error":{"code":-32602,"message":str(error)}}, observation
        except OSError:
            return {"id":request_id,"error":{"code":-32603,"message":"Demo state could not be saved"}}, observation
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
    if message["method"] == "windowsSandbox/readiness":
        if demo_sandbox_state not in ("ready","notConfigured","updateRequired"):raise ValueError("Invalid demo sandbox state")
        return {"id":request_id,"result":{"status":demo_sandbox_state}},observation
    if message["method"] == "skills/list":
        options={} if params is None else params
        cwds=options.get("cwds",[]) if isinstance(options,dict) else None
        if not isinstance(cwds,list) or any(not isinstance(cwd,str) or not cwd for cwd in cwds):
            return {"id":request_id,"error":{"code":-32602,"message":"Expected working-directory strings"}},observation
        roots=cwds or [demo_threads.THREAD["cwd"]]
        return {"id":request_id,"result":{"data":[{"cwd":cwd,"skills":[],"errors":[]} for cwd in roots]}},observation
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


async def run(port, output, project_state, config_state, thread_state, demo_sandbox_state="notConfigured", demo_chunk_delay=0.6, demo_pages_tls=False):
    output.parent.mkdir(parents=True, exist_ok=True)
    projects = ProjectStore(project_state)
    config = ConfigStore(config_state, FIXTURES["config/read"]["result"]["config"])
    threads = demo_threads.ThreadStore(thread_state,streaming=True)
    recovered_turns=threads.recover_active_turns()
    pages=PageSyncStore(output.parent)
    pages.prepare_exports()
    clients = set()
    tasks=set()
    async def publish(notification):
        deliveries=await asyncio.gather(*(client.send(json.dumps(notification)) for client in tuple(clients)), return_exceptions=True)
        with output.open("a",encoding="utf-8") as stream:
            stream.write(json.dumps({"kind":"notification-sent","method":notification["method"],"delivered":sum(not isinstance(result,BaseException) for result in deliveries),"failed":sum(isinstance(result,BaseException) for result in deliveries)})+"\n")
    async def deliver_turn(thread_id,turn_id,events):
        for event in events:
            pieces=[event]
            if event["method"]=="item/agentMessage/delta":
                delta=event["params"]["delta"]
                pieces=[{"method":event["method"],"params":{**event["params"],"delta":delta[i:i+12]}} for i in range(0,len(delta),12)]
            for piece in pieces:
                if piece["method"]=="item/agentMessage/delta":await asyncio.sleep(demo_chunk_delay)
                if not threads.apply_stream_event(thread_id,turn_id,piece):return
                await publish(piece)
    async def stream_turn(thread_id,turn_id,events):
        try:await deliver_turn(thread_id,turn_id,events)
        except asyncio.CancelledError:raise
        except Exception as error:
            with output.open("a",encoding="utf-8") as stream:
                stream.write(json.dumps({"kind":"stream-error","errorType":type(error).__name__})+"\n")
            for notification in threads.end_failed_turn(thread_id,turn_id,"The demo response could not finish."):
                await publish(notification)
    def finished(task):
        tasks.discard(task)
        if not task.cancelled():
            error=task.exception()
            if error is not None:print(json.dumps({"kind":"stream-finalization-error","errorType":type(error).__name__}),flush=True)
    async def connection(socket):
        if socket.request.path.startswith("/demo-pages/"):
            if demo_pages_tls:
                await socket.close(1008,"Demo Pages requires the TLS listener");return
            await pages.connection(socket)
            return
        clients.add(socket)
        try:
            async for raw in socket:
                notifications=[]
                reply,observation=handle_message(raw,projects,notifications,config,threads,demo_sandbox_state)
                with output.open("a",encoding="utf-8") as stream:stream.write(json.dumps(observation)+"\n")
                if reply is not None:await socket.send(json.dumps(reply))
                if observation.get("method") in ("turn/start", "thread/queue/start") and reply is not None and "result" in reply:
                    task=asyncio.create_task(stream_turn(json.loads(raw)["params"]["threadId"],reply["result"]["turn"]["id"],notifications))
                    tasks.add(task)
                    task.add_done_callback(finished)
                else:
                    for notification in notifications:await publish(notification)
        except ConnectionClosed:pass
        finally:clients.discard(socket)
    async with AsyncExitStack() as stack:
        server = await stack.enter_async_context(serve(connection, "127.0.0.1", port, max_size=MAX_FRAME_BYTES, select_subprotocol=lambda connection, offered: next((p for p in offered if p.startswith("pages-realtime-room.rea-page-")), None)))
        if demo_pages_tls:
            from demo_page_tls import pages_tls_listener
            metadata = await stack.enter_async_context(pages_tls_listener(pages, MAX_FRAME_BYTES))
            pages.publish_endpoint(**metadata)
        else:
            pages.publish_endpoint("ws://127.0.0.1:"+str(server.sockets[0].getsockname()[1]))
        print(json.dumps({"endpoint": f"ws://127.0.0.1:{server.sockets[0].getsockname()[1]}",
                          "mode": "demo-contract-adapter", "simulatedWindowsReadiness":demo_sandbox_state,"executesTools":False,"recoveredDemoTurns":recovered_turns, "fixtureMethods": ["initialize", *FIXTURES]}), flush=True)
        try:await asyncio.Future()
        finally:
            for task in tasks:task.cancel()
            await asyncio.gather(*tasks,return_exceptions=True)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=0)
    parser.add_argument("--output", type=Path, default=Path(__file__).parent / "state" / "demo-methods.jsonl")
    parser.add_argument("--project-state", type=Path, default=Path(__file__).parent / "state" / "demo-projects.json")
    parser.add_argument("--config-state", type=Path, default=Path(__file__).parent / "state" / "demo-config.json")
    parser.add_argument("--thread-state", type=Path, default=Path(__file__).parent / "state" / "demo-threads.json")
    parser.add_argument("--demo-sandbox-state", choices=["ready","notConfigured","updateRequired"], default="notConfigured", help="Simulated UI state only; does not configure or provide Windows sandboxing")
    parser.add_argument("--demo-chunk-delay", type=float, default=0.6, help="Seconds between synthetic text chunks")
    parser.add_argument("--demo-pages-tls", action="store_true", help="Separate ephemeral loopback TLS listener for original Pages; no system DNS or trust changes")
    parser.add_argument("--demo-profile-identity", action="store_true", help="Synthetic account state for the separately instrumented demo host; no token")
    args = parser.parse_args()
    if args.demo_profile_identity:
        account_file = Path(__file__).parent / "state/instrumented-profile-host/demo-account-read.json"
        demo_account = json.loads(account_file.read_text(encoding="utf-8"))
        expected = {"account": {"type": "chatgpt", "email": "demo@example.invalid", "planType": "free"}, "requiresOpenaiAuth": False, "workspaceRouting": None}
        if demo_account != expected:
            parser.error("Unexpected demo identity fixture")
        FIXTURES["account/read"]["result"] = demo_account
        FIXTURES["getAuthStatus"]["result"] = {"authMethod": "chatgpt", "authToken": None, "requiresOpenaiAuth": False}
    if not 0 <= args.demo_chunk_delay <= 10:parser.error("Demo delay must be between 0 and 10 seconds")
    asyncio.run(run(args.port, args.output, args.project_state, args.config_state, args.thread_state, args.demo_sandbox_state, args.demo_chunk_delay, args.demo_pages_tls))
