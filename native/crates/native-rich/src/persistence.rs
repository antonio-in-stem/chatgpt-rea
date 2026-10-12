//! Same-directory staged writes. A load error is never permission to replace data.
use crate::model::RichModel;
use serde::{Deserialize, Serialize};
use std::{
    fs::{self, File, OpenOptions},
    io::{self, Write},
    path::Path,
    sync::atomic::{AtomicU64, Ordering},
};
static NEXT: AtomicU64 = AtomicU64::new(1);
#[derive(Serialize, Deserialize)]
struct Saved {
    schema_version: u32,
    model: RichModel,
}
pub fn load(path: &Path) -> Result<Option<RichModel>, String> {
    let bytes = match fs::read(path) {
        Ok(bytes) => bytes,
        Err(e) if e.kind() == io::ErrorKind::NotFound => return Ok(None),
        Err(e) => return Err(format!("Read {}: {e}", path.display())),
    };
    if bytes.len() > 2_000_000 {
        return Err(format!(
            "{} exceeds the 2 MB demo storage limit",
            path.display()
        ));
    }
    let saved: Saved = serde_json::from_slice(&bytes)
        .map_err(|e| format!("Invalid saved data {}: {e}", path.display()))?;
    if saved.schema_version != 1 {
        return Err(format!(
            "Unsupported storage version {} in {}",
            saved.schema_version,
            path.display()
        ));
    }
    if !saved.model.validate() {
        return Err(format!("Invalid model state in {}", path.display()));
    }
    Ok(Some(saved.model))
}
pub fn save(path: &Path, model: &RichModel) -> Result<(), String> {
    save_with(path, model, |file, data| file.write_all(data))
}
fn save_with(
    path: &Path,
    model: &RichModel,
    write: impl FnOnce(&mut File, &[u8]) -> io::Result<()>,
) -> Result<(), String> {
    if !model.validate() {
        return Err("Refusing to save invalid model state".into());
    }
    // Validate the existing destination even if the caller forgot an earlier load failure.
    load(path)?;
    let bytes = serde_json::to_vec_pretty(&Saved {
        schema_version: 1,
        model: model.clone(),
    })
    .map_err(|e| e.to_string())?;
    if bytes.len() > 2_000_000 {
        return Err("Save exceeds the 2 MB demo storage limit".into());
    }
    let parent = path
        .parent()
        .filter(|p| !p.as_os_str().is_empty())
        .unwrap_or(Path::new("."));
    fs::create_dir_all(parent).map_err(|e| format!("Create storage directory: {e}"))?;
    let temp = parent.join(format!(
        ".native-rich-{}-{}.tmp",
        std::process::id(),
        NEXT.fetch_add(1, Ordering::Relaxed)
    ));
    let result = (|| -> io::Result<()> {
        let mut file = OpenOptions::new()
            .write(true)
            .create_new(true)
            .open(&temp)?;
        write(&mut file, &bytes)?;
        file.sync_all()?;
        drop(file);
        replace(&temp, path)
    })();
    if let Err(e) = result {
        let cleanup = fs::remove_file(&temp);
        let extra = match cleanup {
            Err(e) if e.kind() != io::ErrorKind::NotFound => {
                format!("; staging cleanup failed: {e}")
            }
            _ => String::new(),
        };
        return Err(format!("Save {} failed: {e}{extra}", path.display()));
    }
    Ok(())
}
#[cfg(not(windows))]
fn replace(source: &Path, destination: &Path) -> io::Result<()> {
    fs::rename(source, destination)
}
#[cfg(windows)]
fn replace(source: &Path, destination: &Path) -> io::Result<()> {
    use std::os::windows::ffi::OsStrExt;
    #[link(name = "kernel32")]
    unsafe extern "system" {
        fn MoveFileExW(existing: *const u16, new: *const u16, flags: u32) -> i32;
    }
    let src: Vec<u16> = source.as_os_str().encode_wide().chain(Some(0)).collect();
    let dst: Vec<u16> = destination
        .as_os_str()
        .encode_wide()
        .chain(Some(0))
        .collect();
    if src[..src.len() - 1].contains(&0) || dst[..dst.len() - 1].contains(&0) {
        return Err(io::Error::new(
            io::ErrorKind::InvalidInput,
            "NUL in storage path",
        ));
    }
    // Both UTF-16 buffers are NUL-terminated and live for the synchronous OS call.
    if unsafe { MoveFileExW(src.as_ptr(), dst.as_ptr(), 0x1 | 0x8) } == 0 {
        Err(io::Error::last_os_error())
    } else {
        Ok(())
    }
}
#[cfg(test)]
mod tests {
    use super::*;
    use std::path::PathBuf;
    struct Temp(PathBuf);
    impl Temp {
        fn new() -> Self {
            let p = std::env::temp_dir().join(format!(
                "native-rich-test-{}-{}",
                std::process::id(),
                NEXT.fetch_add(1, Ordering::Relaxed)
            ));
            fs::create_dir_all(&p).unwrap();
            Self(p)
        }
        fn file(&self) -> PathBuf {
            self.0.join("model.json")
        }
    }
    impl Drop for Temp {
        fn drop(&mut self) {
            let _ = fs::remove_dir_all(&self.0);
        }
    }
    #[test]
    fn missing_only_is_default() {
        let t = Temp::new();
        assert!(load(&t.file()).unwrap().is_none());
        fs::write(t.file(), b"{broken").unwrap();
        assert!(load(&t.file()).is_err());
    }
    #[test]
    fn corrupt_file_cannot_be_overwritten() {
        let t = Temp::new();
        let bytes = b"user data that is not JSON";
        fs::write(t.file(), bytes).unwrap();
        assert!(save(&t.file(), &RichModel::default()).is_err());
        assert_eq!(fs::read(t.file()).unwrap(), bytes);
    }
    #[test]
    fn partial_write_failure_preserves_previous_bytes() {
        let t = Temp::new();
        let mut model = RichModel::default();
        save(&t.file(), &model).unwrap();
        let before = fs::read(t.file()).unwrap();
        model.document = "new contents".into();
        let result = save_with(&t.file(), &model, |file, data| {
            file.write_all(&data[..16])?;
            Err(io::Error::other("simulated disk full"))
        });
        assert!(result.is_err());
        assert_eq!(fs::read(t.file()).unwrap(), before);
        assert_eq!(fs::read_dir(&t.0).unwrap().count(), 1);
    }
    #[test]
    fn successful_atomic_replacement_roundtrips() {
        let t = Temp::new();
        let mut m = RichModel::default();
        save(&t.file(), &m).unwrap();
        m.document = "Updated ✨".into();
        save(&t.file(), &m).unwrap();
        assert_eq!(load(&t.file()).unwrap().unwrap().document, m.document);
    }
    #[test]
    fn future_version_is_preserved() {
        let t = Temp::new();
        let value = serde_json::json!({"schema_version":999,"model":RichModel::default()});
        let bytes = serde_json::to_vec(&value).unwrap();
        fs::write(t.file(), &bytes).unwrap();
        assert!(save(&t.file(), &RichModel::default()).is_err());
        assert_eq!(fs::read(t.file()).unwrap(), bytes);
    }
}
