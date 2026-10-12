use gpui_kit::base::FocusTrapElement;
use gpui_kit::component::{
    ActiveTheme,
    input::{Input, InputEvent, InputState, Textarea, TextareaState},
    text::TextView,
};
use gpui_kit::{prelude::*, *};
use native_core::{DocumentKind, MessageRole, Workspace};
use native_rich::{RichKind, RichSurface};
use native_settings::SettingsSurface;
use native_tools::{ToolKind, ToolSurface};
use std::{collections::HashMap, path::PathBuf, time::Duration};
gpui_kit::actions!(workspace, [NewChat, Search, Escape]);
#[derive(Clone, Copy, PartialEq, Eq)]
enum Route {
    Chat,
    Projects,
    Library,
    Settings,
    Rich(usize),
    Tool(usize),
}
#[derive(Clone)]
enum Action {
    Route(Route),
    Chat(String),
    New,
    Send,
    Stop,
    Sidebar,
    Theme,
    Search,
    Close,
    Pin,
    Archive,
    DeleteChat,
    ConfirmDelete,
    Rename,
    SaveRename,
    Copy(String),
    Edit(String, String),
    Branch(String),
    Regenerate(String),
    Share,
    Model,
    Attach,
    RemoveAttachment(u64),
    RetryAttachment(u64),
    ChooseModel(usize),
    ChooseProject(Option<String>),
    ShowMoreChats,
    Fixture(usize),
    Project(String),
    NewProject,
    SaveProject,
    DeleteProject,
    NewProjectChat,
    AssignProject,
    Document(String),
    NewDocument,
    SaveDocument,
    DeleteDocument,
    Preview,
}
#[derive(Clone, Copy, PartialEq, Eq)]
enum Dialog {
    Search,
    Rename,
    Delete,
    Attachments,
    Model,
    Project,
}
const MODELS: [&str; 3] = ["Demo · Balanced", "Demo · Fast", "Demo · Thoughtful"];
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum AttachmentStatus {
    Queued,
    Ready,
    Failed,
}
#[derive(Clone, Debug)]
struct Attachment {
    id: u64,
    name: String,
    status: AttachmentStatus,
    attempt: u32,
}
pub struct WorkspaceApp {
    workspace: Workspace,
    path: PathBuf,
    load_error: Option<String>,
    route: Route,
    active: String,
    sidebar: bool,
    notice: String,
    dialog: Option<Dialog>,
    focus: FocusHandle,
    modal_focus: FocusHandle,
    previous_focus: Option<FocusHandle>,
    composer: Entity<TextareaState>,
    search: Entity<InputState>,
    rename: Entity<InputState>,
    project_name: Entity<InputState>,
    project_instructions: Entity<TextareaState>,
    doc_title: Entity<InputState>,
    doc_editor: Entity<TextareaState>,
    project: Option<String>,
    document: Option<String>,
    doc_preview: bool,
    attachments: HashMap<String, Vec<Attachment>>,
    attachment_sequence: u64,
    recent_limit: usize,
    transcript: ScrollHandle,
    recents_scroll: ScrollHandle,
    edit_message: Option<String>,
    stream: Option<Task<()>>,
    generation: u64,
    streaming: bool,
    model_index: usize,
    settings: Entity<SettingsSurface>,
    rich: Vec<Entity<RichSurface>>,
    tools: Vec<Entity<ToolSurface>>,
}
impl WorkspaceApp {
    pub fn new(window: &mut Window, cx: &mut Context<Self>) -> Self {
        let base = std::env::var_os("LOCALAPPDATA")
            .map(PathBuf::from)
            .unwrap_or_else(std::env::temp_dir)
            .join("NativeWorkspaceDemo");
        Self::with_storage(base, window, cx)
    }
    pub(crate) fn with_storage(base: PathBuf, window: &mut Window, cx: &mut Context<Self>) -> Self {
        let path = base.join("workspace.json");
        let (mut workspace, load_error) = if !path.exists() {
            (crate::fixtures::workspace(), None)
        } else {
            match Workspace::load(&path) {
                Ok(w) => (w, None),
                Err(e) => (Workspace::default(), Some(e)),
            }
        };
        if workspace.conversations.is_empty() {
            workspace.create_conversation();
        }
        let active = workspace.conversations[0].id.clone();
        let settings = cx.new(|cx| SettingsSurface::new(base.join("settings.json"), window, cx));
        let rich = [
            RichKind::Document,
            RichKind::Spreadsheet,
            RichKind::Slides,
            RichKind::Image,
            RichKind::Media,
            RichKind::Diagram,
            RichKind::Map,
            RichKind::Pdf,
            RichKind::Math,
            RichKind::Scene,
            RichKind::Charts,
        ]
        .into_iter()
        .map(|kind| cx.new(|cx| RichSurface::new(kind, window, cx)))
        .collect();
        let tools = [
            ToolKind::Automations,
            ToolKind::Connectors,
            ToolKind::Browser,
            ToolKind::CodeReview,
            ToolKind::Terminal,
        ]
        .into_iter()
        .map(|kind| cx.new(|cx| ToolSurface::new(kind, window, cx)))
        .collect();
        let composer = cx.new(|cx| {
            TextareaState::new(window, cx)
                .auto_grow(2, 8)
                .placeholder("Ask anything · Ctrl+Enter to send")
                .default_value(
                    workspace
                        .conversation(&active)
                        .map(|c| c.draft.clone())
                        .unwrap_or_default(),
                )
        });
        let app = Self {
            workspace,
            path,
            load_error,
            route: Route::Chat,
            active,
            sidebar: true,
            notice: String::new(),
            dialog: None,
            focus: cx.focus_handle(),
            modal_focus: cx.focus_handle(),
            previous_focus: None,
            composer: composer.clone(),
            search: cx
                .new(|cx| InputState::new(window, cx).placeholder("Search titles and messages")),
            rename: cx.new(|cx| InputState::new(window, cx).placeholder("Chat title")),
            project_name: cx.new(|cx| InputState::new(window, cx).placeholder("Project name")),
            project_instructions: cx.new(|cx| {
                TextareaState::new(window, cx)
                    .auto_grow(3, 8)
                    .placeholder("Custom instructions")
            }),
            doc_title: cx.new(|cx| InputState::new(window, cx).placeholder("Document title")),
            doc_editor: cx.new(|cx| {
                TextareaState::new(window, cx)
                    .auto_grow(16, 35)
                    .placeholder("Write Markdown here…")
            }),
            project: None,
            document: None,
            doc_preview: false,
            attachments: HashMap::new(),
            attachment_sequence: 0,
            recent_limit: 30,
            transcript: ScrollHandle::new(),
            recents_scroll: ScrollHandle::new(),
            edit_message: None,
            stream: None,
            generation: 0,
            streaming: false,
            model_index: 0,
            settings,
            rich,
            tools,
        };
        cx.subscribe_in(
            &composer,
            window,
            |this, _, event, window, cx| match event {
                InputEvent::PressEnter {
                    secondary: true, ..
                } => this.act(Action::Send, window, cx),
                InputEvent::Change => {
                    if this.edit_message.is_none() {
                        let text = this.composer.read(cx).value().to_string();
                        let _ = this.workspace.set_draft(&this.active, text);
                        this.persist();
                    }
                }
                _ => {}
            },
        )
        .detach();
        cx.subscribe(&app.search, |_, _, _: &InputEvent, cx| cx.notify())
            .detach();
        cx.subscribe(
            &app.settings,
            |_, _, _: &native_settings::SettingsChanged, cx| cx.notify(),
        )
        .detach();
        app.composer.update(cx, |input, cx| input.focus(window, cx));
        app
    }
    fn handle_key(&mut self, event: &KeyDownEvent, window: &mut Window, cx: &mut Context<Self>) {
        if event.keystroke.key == "escape" && (self.dialog.is_some() || self.edit_message.is_some())
        {
            self.act(Action::Close, window, cx);
            cx.stop_propagation();
            return;
        }
        let action = self
            .settings
            .read(cx)
            .current_settings()
            .hotkeys
            .iter()
            .find(|(_, shortcut)| matches_shortcut(shortcut, &event.keystroke))
            .map(|(name, _)| name.clone());
        let action = match action.as_deref() {
            Some("New chat") => Some(Action::New),
            Some("Search") => Some(Action::Search),
            Some("Settings") => Some(Action::Route(Route::Settings)),
            _ => None,
        };
        if let Some(action) = action {
            self.act(action, window, cx);
            cx.stop_propagation();
        }
    }
    fn persist(&mut self) {
        if self.load_error.is_none() {
            if let Err(e) = self.workspace.save(&self.path) {
                self.notice = e;
            }
        }
    }
    fn switch_chat(&mut self, id: String, window: &mut Window, cx: &mut Context<Self>) {
        self.stop();
        self.active = id;
        self.route = Route::Chat;
        self.edit_message = None;
        let draft = self
            .workspace
            .conversation(&self.active)
            .map(|c| c.draft.clone())
            .unwrap_or_default();
        self.composer
            .update(cx, |input, cx| input.set_value(draft, window, cx));
        self.dialog = None;
        self.previous_focus = None;
        self.transcript.scroll_to_bottom();
        self.composer
            .update(cx, |input, cx| input.focus(window, cx));
    }
    fn stop(&mut self) {
        self.generation = self.generation.wrapping_add(1);
        self.stream = None;
        self.streaming = false;
        self.persist();
    }
    fn current_attachments(&self) -> &[Attachment] {
        self.attachments
            .get(&self.active)
            .map(Vec::as_slice)
            .unwrap_or(&[])
    }
    fn prepare_attachment(
        &mut self,
        conversation: String,
        id: u64,
        attempt: u32,
        cx: &mut Context<Self>,
    ) {
        cx.spawn(async move |this, cx| {
            cx.background_executor()
                .timer(Duration::from_millis(350))
                .await;
            let _ = this.update(cx, |app, cx| {
                if let Some(item) = app.attachments.get_mut(&conversation).and_then(|items| {
                    items.iter_mut().find(|a| {
                        a.id == id && a.attempt == attempt && a.status == AttachmentStatus::Queued
                    })
                }) {
                    item.status = if item.name.ends_with(".csv") && attempt == 0 {
                        AttachmentStatus::Failed
                    } else {
                        AttachmentStatus::Ready
                    };
                    cx.notify();
                }
            });
        })
        .detach();
    }
    fn stream_response(&mut self, prompt: String, cx: &mut Context<Self>) {
        self.stop();
        if self.settings.read(cx).current_settings().reduced_motion {
            let _ = self.workspace.append_message(
                &self.active,
                MessageRole::Assistant,
                crate::fixtures::response(&prompt),
            );
            self.transcript.scroll_to_bottom();
            self.persist();
            cx.notify();
            return;
        }
        let conversation = self.active.clone();
        let Ok(message) = self
            .workspace
            .append_message(&conversation, MessageRole::Assistant, "…")
        else {
            return;
        };
        self.generation += 1;
        let token = self.generation;
        self.streaming = true;
        let response = crate::fixtures::response(&prompt);
        let chunks = response
            .split_inclusive(' ')
            .map(String::from)
            .collect::<Vec<_>>();
        self.stream = Some(cx.spawn(async move |this, cx| {
            let mut text = String::new();
            for chunk in chunks {
                cx.background_executor()
                    .timer(Duration::from_millis(40))
                    .await;
                text.push_str(&chunk);
                let content = text.clone();
                let continue_stream = this
                    .update(cx, |app, cx| {
                        if app.generation != token {
                            return false;
                        }
                        let follow_bottom =
                            app.transcript.max_offset().y + app.transcript.offset().y <= px(48.);
                        if let Ok(chat) = app.workspace.conversation_mut(&conversation) {
                            if let Some(m) = chat.messages.iter_mut().find(|m| m.id == message) {
                                m.content = content;
                            }
                        }
                        if app.route == Route::Chat && app.active == conversation && follow_bottom {
                            app.transcript.scroll_to_bottom();
                        }
                        cx.notify();
                        true
                    })
                    .unwrap_or(false);
                if !continue_stream {
                    return;
                }
            }
            let _ = this.update(cx, |app, cx| {
                if app.generation == token {
                    app.streaming = false;
                    app.persist();
                    cx.notify();
                }
            });
        }));
    }
    fn send(&mut self, window: &mut Window, cx: &mut Context<Self>) {
        if self.streaming {
            return;
        }
        if self
            .current_attachments()
            .iter()
            .any(|a| a.status != AttachmentStatus::Ready)
        {
            self.notice =
                "Wait for queued attachments or retry/remove failed ones before sending.".into();
            return;
        }
        let attached = self
            .current_attachments()
            .iter()
            .map(|a| a.name.clone())
            .collect::<Vec<_>>();
        let original_conversation = self.active.clone();
        let mut prompt = self.composer.read(cx).value().to_string();
        if prompt.trim().is_empty() {
            return;
        }
        if let Some(message) = self.edit_message.take() {
            match self
                .workspace
                .edit_message_branch(&self.active, &message, &prompt)
            {
                Ok(branch) => self.active = branch,
                Err(e) => {
                    self.notice = e;
                    return;
                }
            }
        } else {
            if !attached.is_empty() {
                prompt.push_str(&format!("\n\n[Demo attachments: {}]", attached.join(", ")));
            }
            if let Err(e) =
                self.workspace
                    .append_message(&self.active, MessageRole::User, prompt.clone())
            {
                self.notice = e;
                return;
            }
            if self
                .workspace
                .conversation(&self.active)
                .is_ok_and(|c| c.title == "New chat")
            {
                let title = prompt.chars().take(36).collect::<String>();
                let _ = self.workspace.rename_conversation(&self.active, &title);
            }
        }
        let _ = self.workspace.set_draft(&self.active, "");
        self.attachments.remove(&original_conversation);
        self.transcript.scroll_to_bottom();
        self.composer
            .update(cx, |s, cx| s.set_value("", window, cx));
        self.persist();
        self.stream_response(prompt, cx);
    }
    fn act(&mut self, action: Action, window: &mut Window, cx: &mut Context<Self>) {
        match action {
            Action::Route(route) => {
                self.route = route;
                self.dialog = None;
            }
            Action::Chat(id) => self.switch_chat(id, window, cx),
            Action::New => {
                let id = self.workspace.create_conversation();
                self.switch_chat(id, window, cx);
                self.persist();
            }
            Action::Send => self.send(window, cx),
            Action::Stop => self.stop(),
            Action::Sidebar => self.sidebar = !self.sidebar,
            Action::Theme => {
                self.settings
                    .update(cx, |settings, cx| settings.toggle_theme(window, cx));
            }
            Action::Search => {
                self.previous_focus = window.focused(cx);
                self.dialog = Some(Dialog::Search);
                self.search.update(cx, |input, cx| input.focus(window, cx));
            }
            Action::Close => {
                let had_dialog = self.dialog.take().is_some();
                if !had_dialog && self.edit_message.take().is_some() {
                    let draft = self
                        .workspace
                        .conversation(&self.active)
                        .map(|c| c.draft.clone())
                        .unwrap_or_default();
                    self.composer
                        .update(cx, |input, cx| input.set_value(draft, window, cx));
                }
                if let Some(focus) = self.previous_focus.take() {
                    window.focus(&focus, cx);
                } else if self.route == Route::Chat {
                    self.composer
                        .update(cx, |input, cx| input.focus(window, cx));
                } else {
                    window.focus(&self.focus, cx);
                }
            }
            Action::Pin => {
                if let Ok(c) = self.workspace.conversation_mut(&self.active) {
                    c.pinned = !c.pinned;
                }
                self.persist();
            }
            Action::Archive => {
                if let Ok(c) = self.workspace.conversation_mut(&self.active) {
                    c.archived = !c.archived;
                }
                self.persist();
            }
            Action::DeleteChat => {
                self.previous_focus = window.focused(cx);
                self.dialog = Some(Dialog::Delete);
                window.focus(&self.modal_focus, cx);
            }
            Action::ConfirmDelete => {
                self.stop();
                let _ = self.workspace.delete_conversation(&self.active);
                let id = self
                    .workspace
                    .conversations
                    .first()
                    .map(|c| c.id.clone())
                    .unwrap_or_else(|| self.workspace.create_conversation());
                self.switch_chat(id, window, cx);
                self.persist();
            }
            Action::Rename => {
                self.previous_focus = window.focused(cx);
                let title = self
                    .workspace
                    .conversation(&self.active)
                    .map(|c| c.title.clone())
                    .unwrap_or_default();
                self.rename
                    .update(cx, |s, cx| s.set_value(title, window, cx));
                self.dialog = Some(Dialog::Rename);
                self.rename.update(cx, |input, cx| input.focus(window, cx));
            }
            Action::SaveRename => {
                let title = self.rename.read(cx).value().to_string();
                match self.workspace.rename_conversation(&self.active, &title) {
                    Ok(()) => {
                        self.act(Action::Close, window, cx);
                        self.persist();
                    }
                    Err(e) => self.notice = e,
                }
            }
            Action::Copy(text) => {
                cx.write_to_clipboard(ClipboardItem::new_string(text));
                self.notice = "Copied to clipboard".into();
            }
            Action::Edit(id, text) => {
                self.edit_message = Some(id);
                self.composer.update(cx, |s, cx| {
                    s.set_value(text, window, cx);
                    s.focus(window, cx);
                });
            }
            Action::Branch(message) => {
                match self.workspace.branch_conversation(&self.active, &message) {
                    Ok(id) => {
                        self.switch_chat(id, window, cx);
                        self.persist();
                    }
                    Err(e) => self.notice = e,
                }
            }
            Action::Regenerate(message) => {
                match self.workspace.prepare_regeneration(&self.active, &message) {
                    Ok(id) => {
                        self.switch_chat(id, window, cx);
                        let prompt = self
                            .workspace
                            .conversation(&self.active)
                            .ok()
                            .and_then(|c| c.messages.last())
                            .map(|m| m.content.clone())
                            .unwrap_or_default();
                        self.stream_response(prompt, cx);
                    }
                    Err(e) => self.notice = e,
                }
            }
            Action::Share => {
                if let Ok(chat) = self.workspace.conversation(&self.active) {
                    match serde_json::to_string_pretty(chat) {
                        Ok(snapshot) => {
                            cx.write_to_clipboard(ClipboardItem::new_string(snapshot));
                            self.notice =
                                "Local chat snapshot copied as JSON. No public link was created."
                                    .into();
                        }
                        Err(e) => self.notice = e.to_string(),
                    }
                }
            }
            Action::Model => {
                self.previous_focus = window.focused(cx);
                self.dialog = Some(Dialog::Model);
                window.focus(&self.modal_focus, cx);
            }
            Action::ChooseModel(index) => {
                if index < MODELS.len() {
                    self.model_index = index;
                    self.act(Action::Close, window, cx);
                }
            }
            Action::ShowMoreChats => self.recent_limit = self.recent_limit.saturating_add(30),
            Action::Attach => {
                self.previous_focus = window.focused(cx);
                self.dialog = Some(Dialog::Attachments);
                window.focus(&self.modal_focus, cx);
            }
            Action::Fixture(i) => {
                let names = [
                    "design-notes.md",
                    "reference-image.png",
                    "quarterly-data.csv",
                ];
                if let Some(name) = names.get(i) {
                    if !self.current_attachments().iter().any(|a| a.name == *name) {
                        self.attachment_sequence += 1;
                        let id = self.attachment_sequence;
                        self.attachments
                            .entry(self.active.clone())
                            .or_default()
                            .push(Attachment {
                                id,
                                name: (*name).into(),
                                status: AttachmentStatus::Queued,
                                attempt: 0,
                            });
                        self.prepare_attachment(self.active.clone(), id, 0, cx);
                    }
                }
                self.act(Action::Close, window, cx);
            }
            Action::RemoveAttachment(id) => {
                if let Some(items) = self.attachments.get_mut(&self.active) {
                    items.retain(|a| a.id != id);
                }
            }
            Action::RetryAttachment(id) => {
                let attempt = self
                    .attachments
                    .get_mut(&self.active)
                    .and_then(|items| items.iter_mut().find(|a| a.id == id))
                    .map(|item| {
                        item.attempt += 1;
                        item.status = AttachmentStatus::Queued;
                        item.attempt
                    });
                if let Some(attempt) = attempt {
                    self.prepare_attachment(self.active.clone(), id, attempt, cx);
                }
            }
            Action::Project(id) => {
                if let Some(p) = self.workspace.projects.iter().find(|p| p.id == id) {
                    let (name, instructions) = (p.name.clone(), p.instructions.clone());
                    self.project_name
                        .update(cx, |s, cx| s.set_value(name, window, cx));
                    self.project_instructions
                        .update(cx, |s, cx| s.set_value(instructions, window, cx));
                    self.project = Some(id);
                    self.route = Route::Projects;
                }
            }
            Action::NewProject => {
                self.dialog = None;
                self.previous_focus = None;
                self.project = None;
                self.project_name
                    .update(cx, |s, cx| s.set_value("", window, cx));
                self.project_instructions
                    .update(cx, |s, cx| s.set_value("", window, cx));
                self.route = Route::Projects;
            }
            Action::SaveProject => {
                let name = self.project_name.read(cx).value().to_string();
                let instructions = self.project_instructions.read(cx).value().to_string();
                let result = if let Some(id) = &self.project {
                    self.workspace.update_project(id, &name, &instructions)
                } else {
                    self.workspace.create_project(&name).and_then(|id| {
                        self.project = Some(id.clone());
                        self.workspace.update_project(&id, &name, &instructions)
                    })
                };
                match result {
                    Ok(()) => {
                        self.notice = "Project saved".into();
                        self.persist();
                    }
                    Err(e) => self.notice = e,
                }
            }
            Action::DeleteProject => {
                if let Some(id) = self.project.take() {
                    let _ = self.workspace.delete_project(&id);
                    self.notice = "Project removed; its chats are preserved".into();
                    self.persist();
                }
            }
            Action::NewProjectChat => {
                let id = self.workspace.create_conversation();
                let _ = self.workspace.assign_project(&id, self.project.as_deref());
                self.switch_chat(id, window, cx);
                self.persist();
            }
            Action::AssignProject => {
                self.previous_focus = window.focused(cx);
                self.dialog = Some(Dialog::Project);
                window.focus(&self.modal_focus, cx);
            }
            Action::ChooseProject(project) => {
                match self
                    .workspace
                    .assign_project(&self.active, project.as_deref())
                {
                    Ok(()) => {
                        self.persist();
                        self.act(Action::Close, window, cx);
                    }
                    Err(e) => self.notice = e,
                }
            }
            Action::Document(id) => {
                if let Some(d) = self.workspace.documents.iter().find(|d| d.id == id) {
                    let (title, content) = (d.title.clone(), d.content.clone());
                    self.doc_title
                        .update(cx, |s, cx| s.set_value(title, window, cx));
                    self.doc_editor
                        .update(cx, |s, cx| s.set_value(content, window, cx));
                    self.document = Some(id);
                    self.route = Route::Library;
                }
            }
            Action::NewDocument => {
                let id = self
                    .workspace
                    .create_document("Untitled", DocumentKind::Markdown);
                self.act(Action::Document(id), window, cx);
                self.persist();
            }
            Action::SaveDocument => {
                if let Some(id) = &self.document {
                    match self.workspace.update_document(
                        id,
                        &self.doc_title.read(cx).value(),
                        &self.doc_editor.read(cx).value(),
                    ) {
                        Ok(()) => {
                            self.notice = "Document saved locally".into();
                            self.persist();
                        }
                        Err(e) => self.notice = e,
                    }
                }
            }
            Action::DeleteDocument => {
                if let Some(id) = self.document.take() {
                    let _ = self.workspace.delete_document(&id);
                    self.persist();
                }
            }
            Action::Preview => self.doc_preview = !self.doc_preview,
        }
        cx.notify();
    }
}
include!("views.rs");

fn matches_shortcut(shortcut: &str, key: &Keystroke) -> bool {
    let parts = shortcut
        .split('+')
        .map(|s| s.trim().to_ascii_lowercase())
        .collect::<Vec<_>>();
    let Some(last) = parts.last() else {
        return false;
    };
    let expected = match last.as_str() {
        "comma" => ",",
        "space" => "space",
        s => s,
    };
    let mods = &parts[..parts.len() - 1];
    expected == key.key.to_ascii_lowercase()
        && mods.iter().any(|s| s == "ctrl") == key.modifiers.control
        && mods.iter().any(|s| s == "alt") == key.modifiers.alt
        && mods.iter().any(|s| s == "shift") == key.modifiers.shift
        && mods.iter().any(|s| s == "win") == key.modifiers.platform
}

#[cfg(test)]
mod shortcut_tests {
    use super::matches_shortcut;
    use gpui_kit::{Keystroke, Modifiers};
    #[test]
    fn current_mapping_matches_exact_modifiers() {
        let key = Keystroke {
            key: "j".into(),
            key_char: None,
            modifiers: Modifiers {
                control: true,
                ..Default::default()
            },
        };
        assert!(matches_shortcut("Ctrl+J", &key));
        assert!(!matches_shortcut("Ctrl+K", &key));
        assert!(!matches_shortcut("Ctrl+Shift+J", &key));
    }
}

#[cfg(all(test, feature = "ui-tests"))]
#[path = "ui_tests.rs"]
mod ui_tests;
