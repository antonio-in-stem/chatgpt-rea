fn main() {
    println!("cargo:rerun-if-changed=resources/app.rc");
    println!("cargo:rerun-if-changed=resources/chatgpt-app-dark.ico");
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() == Ok("windows") {
        embed_resource::compile("resources/app.rc", embed_resource::NONE)
            .manifest_required()
            .expect("Windows SDK resource compiler must embed the application icon");
    }
}
