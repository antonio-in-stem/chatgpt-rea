//! Explicit turn identity from demo/provider lifecycles. Never infer legacy turns
//! from adjacent message roles. Timestamp fields match the recovered local contract.
use crate::{Conversation, MessageRole};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ConversationTurn {
    pub id: String,
    pub message_ids: Vec<String>,
    pub started_at_ms: Option<i64>,
    pub final_assistant_started_at_ms: Option<i64>,
}

impl Conversation {
    /// One optional separator per message position, attached only to a turn's
    /// first member. Unassociated legacy messages break history adjacency.
    pub fn timestamp_separators(&self, now_ms: i64) -> Result<Vec<Option<i64>>, String> {
        use crate::timestamps::{LocalTimestampEntry, LocalTimestampTurn, select_local_separators};
        validate_turns(self)?;
        let starts: HashMap<_, _> = self
            .turns
            .iter()
            .map(|turn| (turn.message_ids[0].as_str(), turn))
            .collect();
        let mut entries = Vec::new();
        let mut positions = Vec::new();
        let mut index = 0;
        while index < self.messages.len() {
            positions.push(index);
            if let Some(turn) = starts.get(self.messages[index].id.as_str()) {
                let members = &self.messages[index..index + turn.message_ids.len()];
                entries.push(LocalTimestampEntry::Turn(LocalTimestampTurn {
                    has_user_input: members
                        .iter()
                        .any(|message| message.role == MessageRole::User),
                    has_agent_message: members
                        .iter()
                        .any(|message| message.role == MessageRole::Assistant),
                    turn_started_at_ms: turn.started_at_ms,
                    final_assistant_started_at_ms: turn.final_assistant_started_at_ms,
                }));
                index += members.len();
            } else {
                entries.push(LocalTimestampEntry::Excluded);
                index += 1;
            }
        }
        let mut result = vec![None; self.messages.len()];
        for (position, timestamp) in positions
            .into_iter()
            .zip(select_local_separators(&entries, now_ms))
        {
            result[position] = timestamp;
        }
        Ok(result)
    }

    /// Upsert a lifecycle snapshot atomically; invalid memberships leave state intact.
    pub fn record_turn(&mut self, turn: ConversationTurn) -> Result<(), String> {
        let mut candidate = self.clone();
        if let Some(existing) = candidate.turns.iter_mut().find(|item| item.id == turn.id) {
            *existing = turn;
        } else {
            candidate.turns.push(turn);
        }
        validate_turns(&candidate)?;
        self.turns = candidate.turns;
        Ok(())
    }
}

pub(crate) fn validate_turns(conversation: &Conversation) -> Result<(), String> {
    let positions: HashMap<_, _> = conversation
        .messages
        .iter()
        .enumerate()
        .map(|(i, message)| (message.id.as_str(), i))
        .collect();
    if positions.len() != conversation.messages.len() || positions.contains_key("") {
        return Err("Empty or duplicate message identity".into());
    }
    let mut turn_ids = HashSet::new();
    let mut claimed = HashSet::new();
    let mut last_end = None;
    for turn in &conversation.turns {
        if turn.id.is_empty() || !turn_ids.insert(&turn.id) || turn.message_ids.is_empty() {
            return Err("Empty or duplicate turn identity/membership".into());
        }
        let mut previous = None;
        for message in &turn.message_ids {
            let &position = positions
                .get(message.as_str())
                .ok_or("Turn references missing message")?;
            if !claimed.insert(message)
                || previous.is_some_and(|last| position != last + 1)
                || last_end.is_some_and(|last| position <= last)
            {
                return Err("Turn membership overlaps or is not contiguous/in order".into());
            }
            previous = Some(position);
        }
        last_end = previous;
        if turn.final_assistant_started_at_ms.is_some()
            && !turn.message_ids.iter().any(|id| {
                conversation.messages[positions[id.as_str()]].role == MessageRole::Assistant
            })
        {
            return Err("Final assistant time requires an assistant message".into());
        }
    }
    Ok(())
}

pub(crate) fn remap_branch_turns(
    conversation: &mut Conversation,
    remapped: &HashMap<String, String>,
) {
    for turn in &mut conversation.turns {
        let previous_count = turn.message_ids.len();
        turn.id = crate::id();
        turn.message_ids = turn
            .message_ids
            .iter()
            .filter_map(|id| remapped.get(id).cloned())
            .collect();
        if turn.message_ids.len() != previous_count
            || !turn.message_ids.iter().any(|id| {
                conversation
                    .messages
                    .iter()
                    .any(|message| &message.id == id && message.role == MessageRole::Assistant)
            })
        {
            turn.final_assistant_started_at_ms = None;
        }
    }
    conversation
        .turns
        .retain(|turn| !turn.message_ids.is_empty());
}

impl crate::Workspace {
    /// Start the fixed demo's final response to its trailing user message.
    /// This lifecycle boundary is explicit; it does not retroactively group history.
    pub fn append_demo_response(
        &mut self,
        conversation: &str,
        content: impl Into<String>,
    ) -> Result<String, String> {
        let mut candidate = self.clone();
        let chat = candidate.conversation(conversation)?;
        let user = chat
            .messages
            .last()
            .filter(|message| message.role == MessageRole::User)
            .ok_or("Demo response requires a trailing user message")?;
        let user_id = user.id.clone();
        let user_time = user.sent_at_ms;
        let existing = chat
            .turns
            .iter()
            .find(|turn| turn.message_ids.contains(&user_id))
            .cloned();
        let assistant_id =
            candidate.append_message(conversation, MessageRole::Assistant, content)?;
        let chat = candidate.conversation_mut(conversation)?;
        let assistant_time = chat.messages.last().and_then(|message| message.sent_at_ms);
        let mut turn = existing.unwrap_or_else(|| ConversationTurn {
            id: crate::id(),
            message_ids: vec![user_id],
            started_at_ms: user_time,
            final_assistant_started_at_ms: None,
        });
        turn.message_ids.push(assistant_id.clone());
        turn.final_assistant_started_at_ms = assistant_time;
        chat.record_turn(turn)?;
        candidate.validate()?;
        *self = candidate;
        Ok(assistant_id)
    }
}
