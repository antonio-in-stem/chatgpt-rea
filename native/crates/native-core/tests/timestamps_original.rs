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

#[test]
fn local_turn_projection_agrees_with_original() {
    use native_core::timestamps::{
        LocalTimestampEntry, LocalTimestampTurn, select_local_separators,
    };
    let fixture: serde_json::Value =
        serde_json::from_str(include_str!("fixtures/local-timestamps-original.json")).unwrap();
    let cases = fixture["cases"].as_array().unwrap();
    assert_eq!(cases.len(), 384);
    for (index, case) in cases.iter().enumerate() {
        let entries: Vec<_> = case["entries"]
            .as_array()
            .unwrap()
            .iter()
            .map(|entry| {
                if entry["eligible"] == false
                    || entry["isAeonThread"] == true
                    || entry["preserveServerUserMessages"] == true
                    || entry["turn"].is_null()
                {
                    LocalTimestampEntry::Excluded
                } else {
                    let turn = &entry["turn"];
                    LocalTimestampEntry::Turn(LocalTimestampTurn {
                        has_user_input: !turn["params"]["input"].as_array().unwrap().is_empty(),
                        has_agent_message: turn["items"]
                            .as_array()
                            .unwrap()
                            .iter()
                            .any(|item| item["type"] == "agentMessage"),
                        turn_started_at_ms: turn["turnStartedAtMs"].as_i64(),
                        final_assistant_started_at_ms: turn["finalAssistantStartedAtMs"].as_i64(),
                    })
                }
            })
            .collect();
        let expected: Vec<Option<i64>> = serde_json::from_value(case["expected"].clone()).unwrap();
        assert_eq!(
            select_local_separators(&entries, case["nowMs"].as_i64().unwrap()),
            expected,
            "local original case {index}"
        );
    }
}
