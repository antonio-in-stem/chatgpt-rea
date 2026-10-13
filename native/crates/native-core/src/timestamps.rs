//! Separator selection recovered from timestamps-85bd12c0e1b2.js (function t/n).
//! Groups preserve turn boundaries; None represents an unavailable history group.
//! Formatting and timezone handling belong to the presentation layer.
use crate::MessageRole;

#[derive(Clone, Copy, Debug)]
pub struct TimestampItem {
    pub role: MessageRole,
    pub sent_at_ms: Option<i64>,
    pub breaks_previous_adjacency: bool,
}

pub fn select_separators(groups: &[Option<Vec<TimestampItem>>], now_ms: i64) -> Vec<Option<i64>> {
    let mut previous: Option<TimestampItem> = None;
    let mut seen_user = false;
    groups
        .iter()
        .map(|group| {
            let Some(items) = group else {
                previous = None;
                seen_user = true;
                return None;
            };
            let mut selected = None;
            for item in items {
                if item.breaks_previous_adjacency {
                    previous = None;
                }
                if selected.is_none() {
                    if let Some(sent) = item.sent_at_ms {
                        let first_old_user = item.role == MessageRole::User
                            && !seen_user
                            && i128::from(now_ms) - i128::from(sent) > 3_600_000;
                        let after_assistant = previous.is_some_and(|last| {
                            last.role == MessageRole::Assistant
                                && last.sent_at_ms.is_some_and(|last_sent| {
                                    let threshold = if item.role == MessageRole::User {
                                        3_600_000
                                    } else {
                                        600_000
                                    };
                                    i128::from(sent) - i128::from(last_sent) > threshold
                                })
                        });
                        if first_old_user || after_assistant {
                            selected = Some(sent);
                        }
                    }
                }
                seen_user |= item.role == MessageRole::User;
                previous = Some(*item);
            }
            selected
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;
    fn item(role: MessageRole, ms: Option<i64>) -> TimestampItem {
        TimestampItem {
            role,
            sent_at_ms: ms,
            breaks_previous_adjacency: false,
        }
    }
    #[test]
    fn first_user_age_is_strict_and_missing_time_is_not_invented() {
        let groups = [Some(vec![item(MessageRole::User, Some(0))])];
        assert_eq!(select_separators(&groups, 3_600_000), vec![None]);
        assert_eq!(select_separators(&groups, 3_600_001), vec![Some(0)]);
        assert_eq!(select_separators(&groups, -1), vec![None]);
        assert_eq!(
            select_separators(&[Some(vec![item(MessageRole::User, None)])], i64::MAX),
            vec![None]
        );
    }
    #[test]
    fn subsequent_threshold_depends_on_current_role() {
        for (role, threshold) in [
            (MessageRole::User, 3_600_000),
            (MessageRole::Assistant, 600_000),
        ] {
            for delta in [0, 1] {
                let groups = [
                    Some(vec![
                        item(MessageRole::User, Some(0)),
                        item(MessageRole::Assistant, Some(0)),
                    ]),
                    Some(vec![item(role, Some(threshold + delta))]),
                ];
                assert_eq!(
                    select_separators(&groups, 0)[1],
                    if delta == 1 {
                        Some(threshold + 1)
                    } else {
                        None
                    }
                );
            }
        }
    }
    #[test]
    fn history_gap_prevents_first_user_and_previous_assistant_inference() {
        let groups = [
            Some(vec![item(MessageRole::Assistant, Some(0))]),
            None,
            Some(vec![item(MessageRole::User, Some(10_000_000))]),
        ];
        assert_eq!(
            select_separators(&groups, 20_000_000),
            vec![None, None, None]
        );
    }
    #[test]
    fn explicit_break_resets_adjacency_but_not_first_user_eligibility() {
        let mut user = item(MessageRole::User, Some(10_000_000));
        user.breaks_previous_adjacency = true;
        let groups = [
            Some(vec![
                item(MessageRole::User, Some(0)),
                item(MessageRole::Assistant, Some(0)),
            ]),
            Some(vec![user]),
        ];
        assert_eq!(select_separators(&groups, 0), vec![None, None]);
        assert_eq!(
            select_separators(&[Some(vec![user])], 20_000_000),
            vec![Some(10_000_000)]
        );
    }
    #[test]
    fn first_qualifying_timestamp_wins_per_group() {
        let groups = [Some(vec![
            item(MessageRole::User, Some(0)),
            item(MessageRole::Assistant, Some(1)),
            item(MessageRole::Assistant, Some(700_000)),
        ])];
        assert_eq!(select_separators(&groups, 10_000_000), vec![Some(0)]);
    }
    #[test]
    fn legacy_message_loads_without_time_and_new_messages_record_time() {
        let old = r#"{"id":"old","role":"user","content":"hello","parent_id":null}"#;
        let parsed: crate::ChatMessage = serde_json::from_str(old).unwrap();
        assert_eq!(parsed.sent_at_ms, None);
        assert!(
            !serde_json::to_string(&parsed)
                .unwrap()
                .contains("sent_at_ms")
        );
        let mut workspace = crate::Workspace::default();
        let id = workspace.create_conversation();
        workspace
            .append_message(&id, MessageRole::User, "new")
            .unwrap();
        let sent = workspace.conversation(&id).unwrap().messages[0].sent_at_ms;
        assert!(sent.is_some_and(|value| value > 0));
        let decoded: crate::Workspace =
            serde_json::from_str(&serde_json::to_string(&workspace).unwrap()).unwrap();
        assert_eq!(
            decoded.conversation(&id).unwrap().messages[0].sent_at_ms,
            sent
        );
    }
}
