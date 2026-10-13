use native_core::{
    MessageRole,
    timestamps::{TimestampItem, select_separators},
};
use serde::Deserialize;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Item {
    role: MessageRole,
    sent_at_ms: Option<i64>,
    breaks_previous_adjacency: bool,
}
#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Case {
    groups: Vec<Option<Vec<Item>>>,
    now_ms: i64,
    expected: Vec<Option<i64>>,
}
#[derive(Deserialize)]
struct Oracle {
    cases: Vec<Case>,
}

#[test]
fn agrees_with_recovered_original_javascript() {
    let oracle: Oracle =
        serde_json::from_str(include_str!("fixtures/timestamps-original.json")).unwrap();
    assert_eq!(oracle.cases.len(), 384);
    for (index, case) in oracle.cases.into_iter().enumerate() {
        let groups: Vec<_> = case
            .groups
            .into_iter()
            .map(|group| {
                group.map(|items| {
                    items
                        .into_iter()
                        .map(|item| TimestampItem {
                            role: item.role,
                            sent_at_ms: item.sent_at_ms,
                            breaks_previous_adjacency: item.breaks_previous_adjacency,
                        })
                        .collect()
                })
            })
            .collect();
        assert_eq!(
            select_separators(&groups, case.now_ms),
            case.expected,
            "original JS case {index}"
        );
    }
}
