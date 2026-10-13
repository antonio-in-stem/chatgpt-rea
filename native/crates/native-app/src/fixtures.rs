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
    w.append_message(&c,MessageRole::Assistant,"## Make room for your ideas\n\nA good workspace starts with **clear priorities** and useful tools close at hand.\n\n1. Keep the sidebar quiet.\n2. Let conversations and documents share the same space.\n3. Make every action easy to undo.\n\n```rust\nfn main() {\n    println!(\"Build something thoughtful.\");\n}\n```").unwrap();
    if let Some(message)=w.conversation_mut(&c).unwrap().messages.last_mut() {
        message.activity=Some(activity(native_core::ActivityStatus::Worked));
    }
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
        "Here is a starting point for **{}**.\n\nBegin with the outcome you want, then break it into a few manageable steps:\n\n1. Write down the most important constraint.\n2. Sketch a first version that addresses it.\n3. Review what works and refine the details.\n\nKeep the first version small enough to try and clear enough to discuss.",
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
    fn response_preserves_prompt_and_has_readable_structure() {
        let response = super::response("hello");
        assert!(response.contains("1. Write down"));
        assert!(response.contains("hello"));
    }
}

pub fn activity(status: native_core::ActivityStatus) -> native_core::TurnActivity {
    use native_core::{ActivityEntry, ActivityStatus, TurnActivity};
    TurnActivity {
        status, elapsed_ms: if status==ActivityStatus::Worked { 3190 } else { 0 }, expanded:false,
        entries:vec![
            ActivityEntry::Commentary { text:"I'll inspect the layout and check the component states.".into() },
            ActivityEntry::Command { command:"cargo check --workspace".into(),
                output:"Demo output — no command was executed.\nFinished checking the example workspace.".into(),exit_code:0 },
        ],
    }
}
