fn main() {
    println!("cargo:rerun-if-changed=resources/app.rc");
    println!("cargo:rerun-if-changed=resources/chatgpt-app-dark.ico");
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() == Ok("windows") {
        if std::env::var("CARGO_CFG_TARGET_ENV").as_deref() == Ok("msvc") {
            // Debug GPUI layout with expanded rich transcript rows exceeds the
            // MSVC default 1 MiB main-thread reserve. Reserve only, not commit.
            println!("cargo:rustc-link-arg-bin=native-workspace=/STACK:8388608");
        }
        embed_resource::compile("resources/app.rc", embed_resource::NONE)
            .manifest_required()
            .expect("Windows SDK resource compiler must embed the application icon");
    }
}
