//! projects-index-page Xr/Zr/Kr and Gi: modified desc; name asc on first selection.
use native_core::Project;
use std::cmp::Ordering;
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum ProjectSortKey {
    Name,
    Modified,
}
#[derive(Clone, Copy, Debug)]
pub(super) struct ProjectSort {
    pub key: ProjectSortKey,
    pub descending: bool,
}
impl Default for ProjectSort {
    fn default() -> Self {
        Self {
            key: ProjectSortKey::Modified,
            descending: true,
        }
    }
}
impl ProjectSort {
    pub fn select(&mut self, key: ProjectSortKey) {
        if self.key == key {
            self.descending = !self.descending;
        } else {
            self.key = key;
            self.descending = key == ProjectSortKey::Modified;
        }
    }
    pub fn compare(&self, left: &Project, right: &Project) -> Ordering {
        let date_order = match self.key {
            ProjectSortKey::Modified => left
                .modified_at_ms
                .unwrap_or(0)
                .cmp(&right.modified_at_ms.unwrap_or(0)),
            ProjectSortKey::Name => Ordering::Equal,
        };
        let result = date_order
            .then_with(|| compare_names(&left.name, &right.name))
            .then_with(|| left.id.cmp(&right.id));
        if self.descending {
            result.reverse()
        } else {
            result
        }
    }
}
#[cfg(windows)]
fn compare_names(left: &str, right: &str) -> Ordering {
    use windows_sys::Win32::Globalization::{
        CompareStringEx, NORM_IGNORECASE, NORM_IGNORENONSPACE,
    };
    let a: Vec<u16> = left.encode_utf16().collect();
    let b: Vec<u16> = right.encode_utf16().collect();
    // Null locale requests the Windows user default. NLS is the native approximation
    // to the source Intl.Collator(undefined, {sensitivity: "base"}), not ICU identity.
    let result = unsafe {
        CompareStringEx(
            std::ptr::null(),
            NORM_IGNORECASE | NORM_IGNORENONSPACE,
            a.as_ptr(),
            a.len() as i32,
            b.as_ptr(),
            b.len() as i32,
            std::ptr::null(),
            std::ptr::null(),
            0,
        )
    };
    match result {
        1 => Ordering::Less,
        2 => Ordering::Equal,
        3 => Ordering::Greater,
        _ => left.to_lowercase().cmp(&right.to_lowercase()),
    }
}
#[cfg(not(windows))]
fn compare_names(left: &str, right: &str) -> Ordering {
    left.to_lowercase().cmp(&right.to_lowercase())
}

#[cfg(test)]
mod tests {
    use super::*;
    fn project(id: &str, name: &str) -> Project {
        Project {
            id: id.into(),
            name: name.into(),
            instructions: String::new(),
            modified_at_ms: None,
        }
    }
    #[test]
    fn sort_defaults_and_id_ties_are_stable() {
        let mut sort = ProjectSort::default();
        assert!(sort.descending);
        assert_eq!(
            sort.compare(&project("a", "same"), &project("b", "same")),
            Ordering::Greater
        );
        sort.select(ProjectSortKey::Name);
        assert!(!sort.descending);
        assert_eq!(
            sort.compare(&project("a", "same"), &project("b", "same")),
            Ordering::Less
        );
        sort.select(ProjectSortKey::Name);
        assert!(sort.descending);
        sort.select(ProjectSortKey::Modified);
        assert!(sort.descending);
    }
    #[test]
    fn modified_dates_take_priority_over_names() {
        let mut alpha = project("a", "Alpha");
        let mut zulu = project("z", "Zulu");
        alpha.modified_at_ms = Some(2000);
        zulu.modified_at_ms = Some(1000);
        let mut sort = ProjectSort::default();
        assert_eq!(sort.compare(&alpha, &zulu), Ordering::Less);
        sort.select(ProjectSortKey::Modified);
        assert_eq!(sort.compare(&alpha, &zulu), Ordering::Greater);
        zulu.modified_at_ms = None;
        assert_eq!(sort.compare(&zulu, &alpha), Ordering::Less);
    }
    #[test]
    fn compact_dates_match_source_boundaries_and_calendar_days() {
        use chrono::{Duration, TimeZone, Utc};
        let now = Utc.with_ymd_and_hms(2026, 10, 12, 0, 30, 0).unwrap();
        let format = |delta: chrono::Duration| {
            modified_label(Some((now - delta).timestamp_millis() as u64), now)
        };
        assert_eq!(modified_label(None, now), "-");
        for (seconds, label) in [
            (0, "just now"),
            (59, "just now"),
            (60, "1m"),
            (3599, "59m"),
            (3600, "1h"),
            (86399, "23h"),
            (86400, "1d"),
            (604800, "1w"),
            (2592000, "1mo"),
            (31536000, "1y"),
        ] {
            assert_eq!(format(Duration::seconds(seconds)), label);
        }
        assert_eq!(format(Duration::seconds(-60)), "just now");
        let date = Utc.with_ymd_and_hms(2026, 10, 10, 23, 30, 0).unwrap();
        assert_eq!(
            modified_label(Some(date.timestamp_millis() as u64), now),
            "2d"
        );
    }
    #[cfg(windows)]
    #[test]
    fn windows_names_ignore_case_and_accents() {
        assert_eq!(compare_names("Álpha", "alpha"), Ordering::Equal);
        assert_eq!(compare_names("Alpha", "Zulu"), Ordering::Less);
    }
}

/// English compact format from app-initial dBo/xBo (359520–359690).
/// Calendar days are local dates, while the first 24 hours use elapsed time.
pub(super) fn modified_label<Tz: chrono::TimeZone>(
    timestamp: Option<u64>,
    now: chrono::DateTime<Tz>,
) -> String {
    let Some(timestamp) = timestamp.and_then(|v| i64::try_from(v).ok()) else {
        return "-".into();
    };
    let Some(date) = chrono::DateTime::from_timestamp_millis(timestamp) else {
        return "-".into();
    };
    let elapsed = now.timestamp_millis().saturating_sub(timestamp);
    if elapsed < 60_000 {
        return "just now".into();
    }
    let minutes = elapsed / 60_000;
    if minutes < 60 {
        return format!("{minutes}m");
    }
    let hours = minutes / 60;
    if hours < 24 {
        return format!("{hours}h");
    }
    let days = (now.date_naive() - date.with_timezone(&now.timezone()).date_naive())
        .num_days()
        .max(1);
    if days < 7 {
        format!("{days}d")
    } else if days < 30 {
        format!("{}w", days / 7)
    } else if days < 365 {
        format!("{}mo", days / 30)
    } else {
        format!("{}y", days / 365)
    }
}
