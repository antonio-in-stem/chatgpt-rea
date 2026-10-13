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
