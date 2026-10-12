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
        // Local Project currently has no modifiedAt. Source treats absent dates as 0,
        // then breaks ties by base-sensitivity name and finally stable ID.
        let result = compare_names(&left.name, &right.name).then_with(|| left.id.cmp(&right.id));
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
    #[cfg(windows)]
    #[test]
    fn windows_names_ignore_case_and_accents() {
        assert_eq!(compare_names("Álpha", "alpha"), Ordering::Equal);
        assert_eq!(compare_names("Alpha", "Zulu"), Ordering::Less);
    }
}
