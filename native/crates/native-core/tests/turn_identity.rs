use native_core::{MessageRole, Workspace, turns::ConversationTurn};
fn fixture() -> (Workspace, String, String, String) {
    let mut w = Workspace::default();
    let c = w.create_conversation();
    let u = w.append_message(&c, MessageRole::User, "question").unwrap();
    let a = w
        .append_message(&c, MessageRole::Assistant, "answer")
        .unwrap();
    w.conversation_mut(&c)
        .unwrap()
        .record_turn(ConversationTurn {
            id: "turn".into(),
            message_ids: vec![u.clone(), a.clone()],
            started_at_ms: Some(100),
            final_assistant_started_at_ms: Some(200),
        })
        .unwrap();
    (w, c, u, a)
}
#[test]
fn turn_roundtrip_and_legacy_absence() {
    let (w, c, _, _) = fixture();
    w.validate().unwrap();
    let decoded: Workspace = serde_json::from_str(&serde_json::to_string(&w).unwrap()).unwrap();
    assert_eq!(
        decoded.conversation(&c).unwrap().turns,
        w.conversation(&c).unwrap().turns
    );
    let mut json = serde_json::to_value(w).unwrap();
    json["conversations"][0]
        .as_object_mut()
        .unwrap()
        .remove("turns");
    let old: Workspace = serde_json::from_value(json).unwrap();
    old.validate().unwrap();
    assert!(old.conversation(&c).unwrap().turns.is_empty());
}
#[test]
fn invalid_membership_is_atomic() {
    let (mut w, c, u, a) = fixture();
    let before = w.clone();
    for ids in [
        vec!["missing".into()],
        vec![a.clone(), u.clone()],
        vec![u.clone(), u.clone()],
    ] {
        assert!(
            w.conversation_mut(&c)
                .unwrap()
                .record_turn(ConversationTurn {
                    id: "turn".into(),
                    message_ids: ids,
                    started_at_ms: None,
                    final_assistant_started_at_ms: None
                })
                .is_err()
        );
        assert_eq!(w, before);
    }
    let mut overlapping = w.conversation(&c).unwrap().turns[0].clone();
    overlapping.id = "other".into();
    assert!(
        w.conversation_mut(&c)
            .unwrap()
            .record_turn(overlapping)
            .is_err()
    );
    assert_eq!(w, before);
    let mut orphan_time = w.conversation(&c).unwrap().turns[0].clone();
    orphan_time.message_ids = vec![u];
    assert!(
        w.conversation_mut(&c)
            .unwrap()
            .record_turn(orphan_time)
            .is_err()
    );
    assert_eq!(w, before);
}
#[test]
fn branches_remap_membership_and_remove_truncated_assistant_time() {
    let (mut w, c, u, a) = fixture();
    let original = w.conversation(&c).unwrap().clone();
    let full = w.branch_conversation(&c, &a).unwrap();
    let full = w.conversation(&full).unwrap();
    assert_ne!(full.turns[0].id, original.turns[0].id);
    assert_eq!(
        full.turns[0].message_ids,
        full.messages
            .iter()
            .map(|m| m.id.clone())
            .collect::<Vec<_>>()
    );
    assert_eq!(full.turns[0].final_assistant_started_at_ms, Some(200));
    let partial = w.branch_conversation(&c, &u).unwrap();
    let partial = w.conversation(&partial).unwrap();
    assert_eq!(
        partial.turns[0].message_ids,
        vec![partial.messages[0].id.clone()]
    );
    assert_eq!(partial.turns[0].started_at_ms, Some(100));
    assert_eq!(partial.turns[0].final_assistant_started_at_ms, None);
    assert_eq!(w.conversation(&c).unwrap(), &original);
    w.validate().unwrap();
}
