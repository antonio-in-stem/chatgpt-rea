//! Local domain state. No network requests or provider credentials belong here.
use serde::{Deserialize, Serialize};
use std::{
    collections::HashSet,
    fs::{self, OpenOptions},
    io::Write,
    path::Path,
    sync::atomic::{AtomicU64, Ordering},
    time::{SystemTime, UNIX_EPOCH},
};

pub const SCHEMA_VERSION: u32 = 1;
static NEXT_ID: AtomicU64 = AtomicU64::new(1);
fn id() -> String {
    format!(
        "{:x}-{:x}-{:x}",
        SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default()
            .as_nanos(),
        std::process::id(),
        NEXT_ID.fetch_add(1, Ordering::Relaxed)
    )
}
fn timestamp_ms() -> Option<u64> {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .ok()
        .and_then(|elapsed| u64::try_from(elapsed.as_millis()).ok())
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub instructions: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub modified_at_ms: Option<u64>,
}
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum MessageRole {
    User,
    Assistant,
    System,
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ChatMessage {
    pub id: String,
    pub role: MessageRole,
    pub content: String,
    pub parent_id: Option<String>,
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Conversation {
    pub id: String,
    pub title: String,
    pub project_id: Option<String>,
    pub messages: Vec<ChatMessage>,
    pub draft: String,
    pub archived: bool,
    pub pinned: bool,
}
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum DocumentKind {
    Markdown,
    PlainText,
    Code,
    Spreadsheet,
    Presentation,
    Drawing,
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Document {
    pub id: String,
    pub title: String,
    pub kind: DocumentKind,
    pub content: String,
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Settings {
    #[serde(default = "default_sidebar_width")]
    pub sidebar_width: u16,
    pub dark_mode: bool,
    pub provider_url: String,
    pub model: String,
}
fn default_sidebar_width() -> u16 {
    340
}
impl Default for Settings {
    fn default() -> Self {
        Self {
            sidebar_width: default_sidebar_width(),
            dark_mode: true,
            provider_url: "https://api.openai.com/v1".into(),
            model: String::new(),
        }
    }
}
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Workspace {
    pub schema_version: u32,
    pub projects: Vec<Project>,
    pub conversations: Vec<Conversation>,
    pub documents: Vec<Document>,
    pub settings: Settings,
}
impl Default for Workspace {
    fn default() -> Self {
        Self {
            schema_version: SCHEMA_VERSION,
            projects: vec![],
            conversations: vec![],
            documents: vec![],
            settings: Settings::default(),
        }
    }
}
fn nonempty(value: &str, field: &str) -> Result<String, String> {
    let value = value.trim();
    if value.is_empty() {
        Err(format!("{field} cannot be empty"))
    } else {
        Ok(value.into())
    }
}
impl Workspace {
    pub fn create_conversation(&mut self) -> String {
        let id = id();
        self.conversations.push(Conversation {
            id: id.clone(),
            title: "New chat".into(),
            project_id: None,
            messages: vec![],
            draft: String::new(),
            archived: false,
            pinned: false,
        });
        id
    }
    pub fn create_project(&mut self, name: impl AsRef<str>) -> Result<String, String> {
        let name = nonempty(name.as_ref(), "Project name")?;
        let id = id();
        self.projects.push(Project {
            id: id.clone(),
            name,
            instructions: String::new(),
            modified_at_ms: timestamp_ms(),
        });
        Ok(id)
    }
    pub fn create_document(&mut self, title: impl Into<String>, kind: DocumentKind) -> String {
        let id = id();
        let title = title.into();
        self.documents.push(Document {
            id: id.clone(),
            title: if title.trim().is_empty() {
                "Untitled".into()
            } else {
                title
            },
            kind,
            content: String::new(),
        });
        id
    }
    pub fn conversation(&self, id: &str) -> Result<&Conversation, String> {
        self.conversations
            .iter()
            .find(|c| c.id == id)
            .ok_or_else(|| "Conversation not found".into())
    }
    pub fn conversation_mut(&mut self, id: &str) -> Result<&mut Conversation, String> {
        self.conversations
            .iter_mut()
            .find(|c| c.id == id)
            .ok_or_else(|| "Conversation not found".into())
    }
    pub fn rename_conversation(&mut self, id: &str, title: &str) -> Result<(), String> {
        let title = nonempty(title, "Title")?;
        self.conversation_mut(id)?.title = title;
        Ok(())
    }
    pub fn set_draft(&mut self, id: &str, draft: impl Into<String>) -> Result<(), String> {
        self.conversation_mut(id)?.draft = draft.into();
        Ok(())
    }
    pub fn set_archived(&mut self, id: &str, archived: bool) -> Result<(), String> {
        self.conversation_mut(id)?.archived = archived;
        Ok(())
    }
    pub fn set_pinned(&mut self, id: &str, pinned: bool) -> Result<(), String> {
        self.conversation_mut(id)?.pinned = pinned;
        Ok(())
    }
    pub fn assign_project(
        &mut self,
        conversation: &str,
        project: Option<&str>,
    ) -> Result<(), String> {
        if project.is_some_and(|id| !self.projects.iter().any(|p| p.id == id)) {
            return Err("Project not found".into());
        }
        self.conversation_mut(conversation)?.project_id = project.map(String::from);
        Ok(())
    }
    pub fn update_project(
        &mut self,
        id: &str,
        name: &str,
        instructions: &str,
    ) -> Result<(), String> {
        let name = nonempty(name, "Project name")?;
        let p = self
            .projects
            .iter_mut()
            .find(|p| p.id == id)
            .ok_or("Project not found")?;
        if p.name != name || p.instructions != instructions {
            p.modified_at_ms = timestamp_ms();
        }
        p.name = name;
        p.instructions = instructions.into();
        Ok(())
    }
    pub fn delete_project(&mut self, id: &str) -> Result<(), String> {
        let i = self
            .projects
            .iter()
            .position(|p| p.id == id)
            .ok_or("Project not found")?;
        self.projects.remove(i);
        for c in &mut self.conversations {
            if c.project_id.as_deref() == Some(id) {
                c.project_id = None;
            }
        }
        Ok(())
    }
    pub fn delete_conversation(&mut self, id: &str) -> Result<(), String> {
        let i = self
            .conversations
            .iter()
            .position(|c| c.id == id)
            .ok_or("Conversation not found")?;
        self.conversations.remove(i);
        Ok(())
    }
    pub fn update_document(&mut self, id: &str, title: &str, content: &str) -> Result<(), String> {
        let title = nonempty(title, "Title")?;
        let d = self
            .documents
            .iter_mut()
            .find(|d| d.id == id)
            .ok_or("Document not found")?;
        d.title = title;
        d.content = content.into();
        Ok(())
    }
    pub fn delete_document(&mut self, id: &str) -> Result<(), String> {
        let i = self
            .documents
            .iter()
            .position(|d| d.id == id)
            .ok_or("Document not found")?;
        self.documents.remove(i);
        Ok(())
    }
    pub fn append_message(
        &mut self,
        conversation: &str,
        role: MessageRole,
        content: impl Into<String>,
    ) -> Result<String, String> {
        let content = content.into();
        nonempty(&content, "Message")?;
        let c = self.conversation_mut(conversation)?;
        let id = id();
        c.messages.push(ChatMessage {
            id: id.clone(),
            role,
            content,
            parent_id: c.messages.last().map(|m| m.id.clone()),
        });
        Ok(id)
    }
    /// Branch through the selected message. IDs are remapped so conversations own independent messages and drafts.
    pub fn branch_conversation(
        &mut self,
        conversation: &str,
        through_message: &str,
    ) -> Result<String, String> {
        let source = self.conversation(conversation)?;
        let end = source
            .messages
            .iter()
            .position(|m| m.id == through_message)
            .ok_or("Message not found")?;
        let mut branch = source.clone();
        branch.id = id();
        branch.title = format!("{} (branch)", source.title);
        branch.draft.clear();
        branch.archived = false;
        branch.pinned = false;
        branch.messages.truncate(end + 1);
        let mut parent = None;
        for message in &mut branch.messages {
            message.id = id();
            message.parent_id = parent;
            parent = Some(message.id.clone());
        }
        let id = branch.id.clone();
        self.conversations.push(branch);
        Ok(id)
    }
    /// Editing creates a branch; the original conversation and all subsequent messages remain intact.
    pub fn edit_message_branch(
        &mut self,
        conversation: &str,
        message: &str,
        content: &str,
    ) -> Result<String, String> {
        nonempty(content, "Message")?;
        if self
            .conversation(conversation)?
            .messages
            .iter()
            .find(|m| m.id == message)
            .ok_or("Message not found")?
            .role
            != MessageRole::User
        {
            return Err("Only user messages can be edited".into());
        }
        let branch = self.branch_conversation(conversation, message)?;
        self.conversation_mut(&branch)?
            .messages
            .last_mut()
            .unwrap()
            .content = content.into();
        Ok(branch)
    }
    /// Creates a branch ending immediately before the chosen assistant response. Caller may request a new response.
    pub fn prepare_regeneration(
        &mut self,
        conversation: &str,
        assistant_message: &str,
    ) -> Result<String, String> {
        let c = self.conversation(conversation)?;
        let index = c
            .messages
            .iter()
            .position(|m| m.id == assistant_message)
            .ok_or("Message not found")?;
        if c.messages[index].role != MessageRole::Assistant || index == 0 {
            return Err(
                "Regeneration requires an assistant response with a preceding message".into(),
            );
        }
        let parent = c.messages[index - 1].id.clone();
        self.branch_conversation(conversation, &parent)
    }
    pub fn validate(&self) -> Result<(), String> {
        if self.schema_version != SCHEMA_VERSION {
            return Err(format!(
                "Unsupported workspace schema {}",
                self.schema_version
            ));
        }
        let mut ids = HashSet::new();
        for key in self
            .projects
            .iter()
            .map(|p| &p.id)
            .chain(self.conversations.iter().map(|c| &c.id))
            .chain(self.documents.iter().map(|d| &d.id))
        {
            if key.is_empty() || !ids.insert(key) {
                return Err("Empty or duplicate object ID".into());
            }
        }
        for c in &self.conversations {
            if c.project_id
                .as_ref()
                .is_some_and(|id| !self.projects.iter().any(|p| &p.id == id))
            {
                return Err("Conversation references missing project".into());
            }
            let mut previous = None;
            for m in &c.messages {
                if m.id.is_empty() || !ids.insert(&m.id) {
                    return Err("Empty or duplicate message ID".into());
                }
                if m.parent_id.as_ref() != previous {
                    return Err("Invalid message parent chain".into());
                }
                previous = Some(&m.id);
            }
        }
        Ok(())
    }
    /// Missing files initialize an empty workspace; malformed/unreadable files are errors and never modified.
    pub fn load(path: impl AsRef<Path>) -> Result<Self, String> {
        let path = path.as_ref();
        let data = match fs::read(path) {
            Ok(data) => data,
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => return Ok(Self::default()),
            Err(e) => return Err(format!("Read {}: {e}", path.display())),
        };
        let workspace: Self = serde_json::from_slice(&data)
            .map_err(|e| format!("Invalid workspace {}: {e}", path.display()))?;
        workspace.validate()?;
        Ok(workspace)
    }
    /// Same-directory staging and OS replacement preserve the previous file if staging or replacement fails.
    pub fn save(&self, path: impl AsRef<Path>) -> Result<(), String> {
        self.validate()?;
        let path = path.as_ref();
        let data = serde_json::to_vec_pretty(self).map_err(|e| e.to_string())?;
        let parent = path
            .parent()
            .filter(|p| !p.as_os_str().is_empty())
            .unwrap_or_else(|| Path::new("."));
        fs::create_dir_all(parent).map_err(|e| format!("Create storage directory: {e}"))?;
        // Refuse to overwrite invalid or newer-version persisted data, even when the caller constructed a default workspace after a load error.
        if path.exists() {
            Self::load(path)?;
        }
        let temp = parent.join(format!(".workspace-{}.tmp", id()));
        let result = (|| -> std::io::Result<()> {
            let mut f = OpenOptions::new()
                .write(true)
                .create_new(true)
                .open(&temp)?;
            f.write_all(&data)?;
            f.sync_all()?;
            drop(f);
            atomic_replace(&temp, path)
        })();
        if let Err(error) = result {
            let cleanup = fs::remove_file(&temp);
            return Err(format!(
                "Save {}: {error}{}",
                path.display(),
                match cleanup {
                    Err(e) if e.kind() != std::io::ErrorKind::NotFound =>
                        format!("; temporary file cleanup failed: {e}"),
                    _ => String::new(),
                }
            ));
        }
        Ok(())
    }
}
#[cfg(not(windows))]
fn atomic_replace(source: &Path, destination: &Path) -> std::io::Result<()> {
    fs::rename(source, destination)
}
#[cfg(windows)]
fn atomic_replace(source: &Path, destination: &Path) -> std::io::Result<()> {
    use std::os::windows::ffi::OsStrExt;
    #[link(name = "kernel32")]
    unsafe extern "system" {
        fn MoveFileExW(existing: *const u16, new: *const u16, flags: u32) -> i32;
    }
    let source: Vec<u16> = source.as_os_str().encode_wide().chain(Some(0)).collect();
    let destination: Vec<u16> = destination
        .as_os_str()
        .encode_wide()
        .chain(Some(0))
        .collect();
    if source[..source.len() - 1].contains(&0) || destination[..destination.len() - 1].contains(&0)
    {
        return Err(std::io::Error::new(
            std::io::ErrorKind::InvalidInput,
            "Storage path contains NUL",
        ));
    }
    // Valid NUL-terminated UTF-16 buffers remain alive throughout this synchronous OS call.
    if unsafe { MoveFileExW(source.as_ptr(), destination.as_ptr(), 0x1 | 0x8) } == 0 {
        Err(std::io::Error::last_os_error())
    } else {
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn project_dates_preserve_legacy_unknown_and_track_edits() {
        let old: Project =
            serde_json::from_str(r#"{"id":"legacy","name":"Old","instructions":""}"#).unwrap();
        assert_eq!(old.modified_at_ms, None);
        assert!(
            !serde_json::to_string(&old)
                .unwrap()
                .contains("modified_at_ms")
        );
        let mut workspace = Workspace::default();
        let id = workspace.create_project("New").unwrap();
        assert!(workspace.projects[0].modified_at_ms.is_some());
        workspace.projects[0].modified_at_ms = Some(1);
        workspace.update_project(&id, "New", "").unwrap();
        assert_eq!(workspace.projects[0].modified_at_ms, Some(1));
        workspace.update_project(&id, "Renamed", "Notes").unwrap();
        assert!(workspace.projects[0].modified_at_ms.unwrap() > 1);
        let serialized = serde_json::to_string(&workspace).unwrap();
        let restored: Workspace = serde_json::from_str(&serialized).unwrap();
        assert_eq!(restored.projects, workspace.projects);
    }
    struct Storage(std::path::PathBuf);
    impl Storage {
        fn new() -> Self {
            Self(
                std::env::temp_dir()
                    .join(format!("native-core-test-{}", id()))
                    .join("state.json"),
            )
        }
    }
    impl Drop for Storage {
        fn drop(&mut self) {
            let _ = fs::remove_dir_all(self.0.parent().unwrap());
        }
    }
    #[test]
    fn persistence_roundtrip_and_atomic_replacement() {
        let file = Storage::new();
        let mut w = Workspace::default();
        let p = w.create_project("Test").unwrap();
        let c = w.create_conversation();
        w.assign_project(&c, Some(&p)).unwrap();
        w.set_draft(&c, "Unsaved text ✨").unwrap();
        w.append_message(&c, MessageRole::User, "Hello").unwrap();
        w.save(&file.0).unwrap();
        assert_eq!(Workspace::load(&file.0).unwrap(), w);
        w.rename_conversation(&c, "Changed").unwrap();
        w.save(&file.0).unwrap();
        assert_eq!(Workspace::load(&file.0).unwrap(), w);
        assert_eq!(fs::read_dir(file.0.parent().unwrap()).unwrap().count(), 1);
    }
    #[test]
    fn corrupt_file_is_not_overwritten() {
        let file = Storage::new();
        fs::create_dir_all(file.0.parent().unwrap()).unwrap();
        fs::write(&file.0, b"{broken").unwrap();
        assert!(Workspace::load(&file.0).is_err());
        assert!(Workspace::default().save(&file.0).is_err());
        assert_eq!(fs::read(&file.0).unwrap(), b"{broken");
    }
    #[test]
    fn future_schema_is_not_overwritten() {
        let file = Storage::new();
        let mut w = Workspace::default();
        w.schema_version = SCHEMA_VERSION + 1;
        fs::create_dir_all(file.0.parent().unwrap()).unwrap();
        let original = serde_json::to_vec(&w).unwrap();
        fs::write(&file.0, &original).unwrap();
        assert!(Workspace::load(&file.0).is_err());
        assert!(Workspace::default().save(&file.0).is_err());
        assert_eq!(fs::read(&file.0).unwrap(), original);
    }
    #[test]
    fn missing_file_starts_empty_but_directory_is_error() {
        let file = Storage::new();
        assert_eq!(Workspace::load(&file.0).unwrap(), Workspace::default());
        fs::create_dir_all(&file.0).unwrap();
        assert!(Workspace::load(&file.0).is_err());
        assert!(Workspace::default().save(&file.0).is_err());
    }
    #[test]
    fn project_delete_detaches_without_deleting_chats() {
        let mut w = Workspace::default();
        let p = w.create_project("Project").unwrap();
        let c = w.create_conversation();
        w.assign_project(&c, Some(&p)).unwrap();
        w.set_draft(&c, "retain me").unwrap();
        w.delete_project(&p).unwrap();
        assert_eq!(w.conversation(&c).unwrap().project_id, None);
        assert_eq!(w.conversation(&c).unwrap().draft, "retain me");
        assert!(w.delete_project(&p).is_err());
        w.validate().unwrap();
    }
    #[test]
    fn branch_remaps_ids_preserves_original_and_draft_identity() {
        let mut w = Workspace::default();
        let c = w.create_conversation();
        let user = w.append_message(&c, MessageRole::User, "question").unwrap();
        w.append_message(&c, MessageRole::Assistant, "answer")
            .unwrap();
        w.set_draft(&c, "original draft").unwrap();
        let original = w.conversation(&c).unwrap().clone();
        let b = w.branch_conversation(&c, &user).unwrap();
        assert_eq!(w.conversation(&c).unwrap(), &original);
        let branch = w.conversation(&b).unwrap();
        assert_eq!(branch.messages.len(), 1);
        assert_ne!(branch.messages[0].id, user);
        assert_eq!(branch.messages[0].parent_id, None);
        assert!(branch.draft.is_empty());
        w.set_draft(&b, "branch draft").unwrap();
        assert_eq!(w.conversation(&c).unwrap().draft, "original draft");
        w.validate().unwrap();
    }
    #[test]
    fn edit_and_regeneration_preserve_original_history() {
        let mut w = Workspace::default();
        let c = w.create_conversation();
        let u = w.append_message(&c, MessageRole::User, "old").unwrap();
        let a = w
            .append_message(&c, MessageRole::Assistant, "answer")
            .unwrap();
        let edited = w.edit_message_branch(&c, &u, "new").unwrap();
        assert_eq!(w.conversation(&edited).unwrap().messages[0].content, "new");
        assert_eq!(w.conversation(&c).unwrap().messages[0].content, "old");
        let regenerated = w.prepare_regeneration(&c, &a).unwrap();
        assert_eq!(w.conversation(&regenerated).unwrap().messages.len(), 1);
        assert_eq!(w.conversation(&c).unwrap().messages.len(), 2);
        assert!(w.prepare_regeneration(&c, &u).is_err());
        assert!(w.edit_message_branch(&c, &a, "bad").is_err());
        w.validate().unwrap();
    }
    #[test]
    fn invalid_operations_do_not_mutate() {
        let mut w = Workspace::default();
        let c = w.create_conversation();
        let before = w.clone();
        assert!(w.assign_project(&c, Some("missing")).is_err());
        assert!(w.create_project("   ").is_err());
        assert!(w.append_message(&c, MessageRole::User, " ").is_err());
        assert!(w.branch_conversation(&c, "missing").is_err());
        assert_eq!(w, before);
    }
    #[test]
    fn invalid_parent_chain_and_duplicate_ids_rejected() {
        let mut w = Workspace::default();
        let c = w.create_conversation();
        w.append_message(&c, MessageRole::User, "a").unwrap();
        w.conversation_mut(&c).unwrap().messages[0].parent_id = Some("bad".into());
        assert!(w.validate().is_err());
        w.conversation_mut(&c).unwrap().messages[0].parent_id = None;
        w.conversation_mut(&c).unwrap().messages[0].id = c.clone();
        assert!(w.validate().is_err());
    }
    #[test]
    fn document_crud_and_all_discriminants_roundtrip() {
        let mut w = Workspace::default();
        for kind in [
            DocumentKind::Markdown,
            DocumentKind::PlainText,
            DocumentKind::Code,
            DocumentKind::Spreadsheet,
            DocumentKind::Presentation,
            DocumentKind::Drawing,
        ] {
            let d = w.create_document("Document", kind);
            w.update_document(&d, "Changed", "{\"example\":true}")
                .unwrap();
        }
        assert_eq!(
            serde_json::from_str::<Workspace>(&serde_json::to_string(&w).unwrap()).unwrap(),
            w
        );
        let d = w.documents[0].id.clone();
        w.delete_document(&d).unwrap();
        assert!(w.delete_document(&d).is_err());
    }
}
