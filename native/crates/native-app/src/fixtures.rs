use native_core::{DocumentKind, MessageRole, Workspace};
pub fn workspace() -> Workspace {
    let mut w = Workspace::default();
    let project = w.create_project("Product launch").unwrap();
    w.update_project(
        &project,
        "Product launch",
        "Keep ideas practical. Prefer clear writing and a calm visual style.",
    )
    .unwrap();
    let c = w.create_conversation();
    w.rename_conversation(&c, "A quieter workspace").unwrap();
    w.assign_project(&c, Some(&project)).unwrap();
    w.set_pinned(&c, true).unwrap();
    w.append_message(&c, MessageRole::User, "Help me design a focused workspace.")
        .unwrap();
    w.append_message(&c,MessageRole::Assistant,"## Make room for your ideas\n\nA good workspace starts with **clear priorities** and useful tools close at hand.\n\n1. Keep the sidebar quiet.\n2. Let conversations and documents share the same space.\n3. Make every action easy to undo.\n\n> This is a local demo. Explore the editors, tools and settings from the sidebar.\n\n```rust\nfn main() {\n    println!(\"Build something thoughtful.\");\n}\n```").unwrap();
    let c = w.create_conversation();
    w.rename_conversation(&c, "Weekend reading list").unwrap();
    w.append_message(&c, MessageRole::User, "Organize my reading notes.")
        .unwrap();
    w.append_message(&c,MessageRole::Assistant,"### A simple reading plan\n\n| Day | Focus |\n| --- | --- |\n| Saturday | Design and typography |\n| Sunday | Rust and native interfaces |\n\nSave your notes in the **Library** and open the document editor.").unwrap();
    let d = w.create_document("Launch notes", DocumentKind::Markdown);
    w.update_document(&d,"Launch notes","# Launch notes\n\n## Goals\n\n- Build a calm, useful interface.\n- Keep state local and predictable.\n- Test keyboard interactions.\n\n## Next steps\n\nWrite the first draft, review the visuals, and share the prototype.").unwrap();
    w
}
pub fn response(prompt: &str) -> String {
    format!(
        "## Let's explore that\n\nYou asked: **{}**\n\nThis response is a deterministic **local demo**, streamed to demonstrate the interface.\n\n- Open **Library** to edit a document.\n- Try **Code review** to compare changes and add comments.\n- Visit **Apps** or **Scheduled tasks** for more interactive flows.\n\nYou can stop this response, copy it, or branch the conversation. Nothing was sent to a server.",
        prompt.chars().take(180).collect::<String>()
    )
}

#[cfg(test)]
mod tests {
    #[test]
    fn fixture_is_valid_and_contains_local_examples() {
        let workspace = super::workspace();
        workspace.validate().unwrap();
        assert!(!workspace.projects.is_empty());
        assert!(!workspace.documents.is_empty());
        assert!(
            workspace
                .conversations
                .iter()
                .all(|c| !c.messages.is_empty())
        );
    }
    #[test]
    fn response_is_explicitly_demo() {
        let response = super::response("hello");
        assert!(response.contains("local demo"));
        assert!(response.contains("hello"));
    }
}
