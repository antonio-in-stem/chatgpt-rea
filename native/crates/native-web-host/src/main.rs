#![cfg_attr(all(target_os = "windows", not(test)), windows_subsystem = "windows")]
use base64::Engine;
use std::{path::PathBuf, time::Duration};
use tao::{
    event::{Event, WindowEvent},
    event_loop::{ControlFlow, EventLoopBuilder},
    window::WindowBuilder,
};
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut args = std::env::args_os().skip(1);
    let report = match args.next() {
        None => None,
        Some(flag) if flag == "--smoke-test" => Some(PathBuf::from(
            args.next()
                .ok_or("--smoke-test requires an output JSON path")?,
        )),
        Some(_) => return Err("Usage: native-web-host [--smoke-test output.json]".into()),
    };
    if args.next().is_some() {
        return Err("Unexpected extra arguments".into());
    }
    // Reserve the requested output before creating UI so path errors are never silent.
    if let Some(path) = &report {
        std::fs::write(path, r#"{"ok":false,"state":"starting"}"#)?;
    }
    let stage = std::sync::Arc::new(std::sync::Mutex::new("before-event-loop".to_string()));
    let completed = std::sync::Arc::new(std::sync::atomic::AtomicBool::new(false));
    if let Some(path) = report.clone() {
        let stage = stage.clone();
        let completed = completed.clone();
        std::thread::spawn(move || {
            std::thread::sleep(Duration::from_secs(25));
            if !completed.load(std::sync::atomic::Ordering::SeqCst) {
                let stage = stage.lock().unwrap().clone();
                let result = serde_json::json!({"ok":false,"error":"Host watchdog timed out after 25 seconds","stage":stage});
                eprintln!("{result}");
                let _ = std::fs::write(path, result.to_string());
                std::process::exit(1);
            }
        });
    }
    let mark = |name: &str| {
        *stage.lock().unwrap() = name.to_string();
        if let Some(path) = &report {
            eprintln!("Host smoke stage: {name}");
            let _ = std::fs::write(
                path,
                serde_json::json!({"ok":false,"state":"starting","stage":name}).to_string(),
            );
        }
    };
    mark("before-event-loop");
    let events = EventLoopBuilder::<String>::with_user_event().build();
    mark("before-window-create");
    let window = WindowBuilder::new()
        .with_title("Native Workspace · Web content preview")
        .with_inner_size(tao::dpi::LogicalSize::new(1100., 760.))
        .build(&events)?;
    mark("after-window-create");
    let mut html = include_str!("demo.html").to_string();
    if report.is_some() {
        html.push_str("<script>");
        html.push_str(include_str!("smoke.js"));
        html.push_str("</script>");
    }
    let local_document_url = format!(
        "data:text/html;charset=utf-8;base64,{}",
        base64::engine::general_purpose::STANDARD.encode(html.as_bytes())
    );
    let send = events.create_proxy();
    let smoke_enabled = report.is_some();
    let diagnostic_path = report.as_ref().map(|p| p.with_extension("stages.jsonl"));
    let diagnostic = std::sync::Arc::new(move |value: serde_json::Value| {
        if let Some(path) = &diagnostic_path {
            use std::io::Write;
            eprintln!("Host diagnostic: {value}");
            if let Ok(mut file) = std::fs::OpenOptions::new()
                .create(true)
                .append(true)
                .open(path)
            {
                let _ = writeln!(file, "{value}");
            }
        }
    });
    let nav_log = diagnostic.clone();
    let page_log = diagnostic.clone();
    let page_proxy = events.create_proxy();
    let eval_proxy = events.create_proxy();
    // WebView2 may navigate with_html through a data URL. Permit only these exact local bytes and blank/srcdoc.
    mark("before-webview-build");
    let view = wry::WebViewBuilder::new()
        .with_html(html)
        .with_navigation_handler(move |url| {
            let allowed = url == "about:blank" || url == "about:srcdoc" || url == local_document_url;
            nav_log(serde_json::json!({"stage":"navigation","url":url.chars().take(200).collect::<String>(),"allowed":allowed}));
            allowed
        })
        .with_on_page_load_handler(move |event, url| {
            page_log(serde_json::json!({"stage":"page-load","event":match event { wry::PageLoadEvent::Started => "started", wry::PageLoadEvent::Finished => "finished" },"url":url.chars().take(200).collect::<String>()}));
            if smoke_enabled { let _ = page_proxy.send_event(serde_json::json!({"kind":"probe-dom"}).to_string()); }
        })
        .with_initialization_script("addEventListener('error',e=>window.ipc.postMessage(JSON.stringify({kind:'diagnostic',error:String(e.message),line:e.lineno}))); ")
        .with_ipc_handler(move |request| {
            if smoke_enabled {
                let _ = send.send_event(request.body().clone());
            }
        })
        .build(&window)?;
    mark("after-webview-build");
    if smoke_enabled {
        let _ = eval_proxy.send_event(serde_json::json!({"kind":"probe-dom"}).to_string());
    }
    if smoke_enabled {
        let wake = events.create_proxy();
        let completed = completed.clone();
        std::thread::spawn(move || {
            std::thread::sleep(Duration::from_secs(20));
            if !completed.load(std::sync::atomic::Ordering::SeqCst) {
                let _ = wake.send_event(serde_json::json!({"kind":"native-web-host-smoke","ok":false,"error":"DOM smoke timed out after 20 seconds"}).to_string());
            }
        });
    }
    let mut finished = false;
    events.run(move |event, _, flow| {
        let _keep_alive = &view;
        if finished { return; }
        *flow = ControlFlow::Wait;
        match event {
            Event::UserEvent(result) => {
                let envelope = serde_json::from_str::<serde_json::Value>(&result).unwrap_or_default();
                if envelope["kind"] == "probe-dom" {
                    let log = diagnostic.clone();
                    if let Err(error) = view.evaluate_script_with_callback("JSON.stringify({ready:document.readyState,title:document.title,body:document.body?.innerText.slice(0,600),scripts:document.scripts.length,iframe:!!document.querySelector('iframe'),ipc:typeof window.ipc,pages:typeof pages})", move |value| log(serde_json::json!({"stage":"dom-evaluation","value":value}))) { diagnostic(serde_json::json!({"stage":"evaluation-error","error":error.to_string()})); }
                    return;
                }
                if envelope["kind"] == "diagnostic" { diagnostic(envelope); return; }
                if let Some(path) = &report {
                    completed.store(true, std::sync::atomic::Ordering::SeqCst);
                    let parsed: Result<serde_json::Value, _> = serde_json::from_str(&result);
                    let valid = parsed.as_ref().ok().is_some_and(|v| v["kind"] == "native-web-host-smoke" && v["ok"].is_boolean());
                    let success = valid && parsed.as_ref().ok().is_some_and(|v| v["ok"] == true);
                    if !success { eprintln!("WebView smoke failed: {result}"); }
                    let content = if valid { result } else { serde_json::json!({"ok":false,"error":"Invalid smoke IPC report","detail":result}).to_string() };
                    let code = if let Err(error) = std::fs::write(path, content) { eprintln!("Cannot write smoke report: {error}"); 2 } else if success { 0 } else { 1 };
                    finished = true;
                    *flow = ControlFlow::ExitWithCode(code);
                }
            }
            Event::WindowEvent { event: WindowEvent::CloseRequested, .. } => {
                completed.store(true, std::sync::atomic::Ordering::SeqCst);
                finished = true;
                if let Some(path) = &report {
                    let _ = std::fs::write(path, serde_json::json!({"ok":false,"error":"Smoke window closed before completion"}).to_string());
                    *flow = ControlFlow::ExitWithCode(1);
                } else { *flow = ControlFlow::Exit; }
            }
            _ => {}
        }
    });
}
