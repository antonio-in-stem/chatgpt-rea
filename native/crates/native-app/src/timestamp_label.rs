//! Recovered timestamp date buckets, for the native application's current en-US UI.
use chrono::{DateTime, Datelike, TimeZone, Timelike};

pub struct TimestampLabel {
    pub date: String,
    pub suffix: String,
}
pub fn format<T: TimeZone>(sent: DateTime<T>, now: DateTime<T>) -> TimestampLabel {
    let days = (now.date_naive() - sent.date_naive()).num_days().max(0);
    let weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];
    let months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    let weekday = weekdays[sent.weekday().num_days_from_monday() as usize];
    let month = months[sent.month0() as usize];
    let date = match days {
        0 => "Today".to_string(),
        1 => "Yesterday".to_string(),
        2..=7 => weekday.to_string(),
        8..=365 => format!("{}, {} {}", &weekday[..3], month, sent.day()),
        _ => format!("{} {}, {}", month, sent.day(), sent.year()),
    };
    let hour = match sent.hour() % 12 {
        0 => 12,
        hour => hour,
    };
    let suffix = format!(
        "{}{}:{:02} {}",
        if days > 7 { " at " } else { " " },
        hour,
        sent.minute(),
        if sent.hour() < 12 { "AM" } else { "PM" }
    );
    TimestampLabel { date, suffix }
}
#[cfg(test)]
mod tests {
    use super::*;
    use chrono::{Duration, FixedOffset};
    #[test]
    fn agrees_with_original_intl_en_us() {
        let fixture: serde_json::Value =
            serde_json::from_str(include_str!("timestamp-labels-original.json")).unwrap();
        let cases = fixture["cases"].as_array().unwrap();
        assert_eq!(cases.len(), 24);
        for case in cases {
            let sent = DateTime::from_timestamp_millis(case["sentMs"].as_i64().unwrap()).unwrap();
            let now = DateTime::from_timestamp_millis(case["nowMs"].as_i64().unwrap()).unwrap();
            let label = format(sent, now);
            assert_eq!(label.date, case["date"].as_str().unwrap());
            assert_eq!(label.suffix, case["suffix"].as_str().unwrap());
        }
    }
    #[test]
    fn recovered_day_bucket_boundaries() {
        let zone = FixedOffset::east_opt(0).unwrap();
        let now = zone.with_ymd_and_hms(2026, 10, 13, 0, 30, 0).unwrap();
        for (days, date) in [
            (0, "Today"),
            (1, "Yesterday"),
            (7, "Tuesday"),
            (8, "Mon, Oct 5"),
            (365, "Mon, Oct 13"),
            (366, "Oct 12, 2025"),
        ] {
            let label = format(now - Duration::days(days), now);
            assert_eq!(label.date, date);
            assert_eq!(
                label.suffix,
                if days > 7 {
                    " at 12:30 AM"
                } else {
                    " 12:30 AM"
                }
            );
        }
        assert_eq!(format(now + Duration::days(2), now).date, "Today");
    }
    #[test]
    fn calendar_day_boundary_does_not_require_twenty_four_hours() {
        let zone = FixedOffset::west_opt(6 * 3600).unwrap();
        let now = zone.with_ymd_and_hms(2026, 10, 13, 0, 10, 0).unwrap();
        let label = format(now - Duration::minutes(20), now);
        assert_eq!(label.date, "Yesterday");
        assert_eq!(label.suffix, " 11:50 PM");
    }
}
