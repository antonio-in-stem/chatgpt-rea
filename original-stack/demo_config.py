"""Persistent demo configuration; never writes caller-selected user config files."""
import copy
import hashlib
import json
import tomllib
from pathlib import Path

class ConfigError(ValueError):
    pass

class ConfigStore:
    METHODS = {"config/read", "config/value/write", "config/batchWrite"}

    def __init__(self, path, defaults):
        self.path = Path(path).resolve()
        self.defaults = copy.deepcopy(defaults)
        self.values = json.loads(self.path.read_text(encoding="utf-8")) if self.path.exists() else {}

    def version(self):
        return hashlib.sha256(json.dumps(self.values, sort_keys=True).encode()).hexdigest()

    @staticmethod
    def key_parts(key):
        if not isinstance(key, str) or not key or "\n" in key or "\r" in key:
            raise ConfigError("Invalid keyPath")
        try:
            tree = tomllib.loads(key + " = 0")
        except tomllib.TOMLDecodeError as error:
            raise ConfigError("Invalid TOML keyPath") from error
        parts = []
        while isinstance(tree, dict) and len(tree) == 1:
            part, tree = next(iter(tree.items()))
            parts.append(part)
        if tree != 0 or not parts:
            raise ConfigError("Invalid keyPath")
        return parts

    @staticmethod
    def merge(old, new):
        if isinstance(new, dict):
            result = copy.deepcopy(old) if isinstance(old, dict) else {}
            for key, value in new.items():
                result[key] = ConfigStore.merge(result.get(key), value)
            return result
        if isinstance(new, list):
            raise ConfigError("Demo upsert of arrays is not implemented")
        return copy.deepcopy(new)

    def handle(self, method, params):
        if not isinstance(params, dict):
            raise ConfigError("Expected object parameters")
        version = self.version()
        source = {"type":"user", "file":str(self.path), "profile":None}
        if method == "config/read":
            config = copy.deepcopy(self.defaults)
            config.update(copy.deepcopy(self.values))
            return {"config":config,"origins":{key:{"name":source,"version":version} for key in self.values},"layers":[{"name":source,"version":version,"config":copy.deepcopy(self.values),"disabledReason":None}] if params.get("includeLayers") else None}
        if params.get("filePath") is not None and Path(params["filePath"]).resolve() != self.path:
            raise ConfigError("Demo writes are restricted to the demo config file")
        if params.get("expectedVersion") not in (None, version):
            raise ConfigError("Demo configuration version conflict")
        edits = params.get("edits") if method == "config/batchWrite" else [params]
        if not isinstance(edits, list):
            raise ConfigError("Expected edits array")
        values = copy.deepcopy(self.values)
        for edit in edits:
            if not isinstance(edit, dict) or "value" not in edit or edit.get("mergeStrategy") not in ("replace", "upsert"):
                raise ConfigError("Invalid config edit")
            parts = self.key_parts(edit.get("keyPath"))
            parent = values
            for part in parts[:-1]:
                if part not in parent: parent[part] = {}
                if not isinstance(parent[part], dict): raise ConfigError("Key path crosses scalar value")
                parent = parent[part]
            key = parts[-1]
            value = edit["value"]
            if value is None:
                parent.pop(key, None)
            elif edit["mergeStrategy"] == "replace":
                parent[key] = copy.deepcopy(value)
            else:
                parent[key] = self.merge(parent.get(key), value)
        if values != self.values:
            self.path.parent.mkdir(parents=True, exist_ok=True)
            temporary = self.path.with_suffix(".tmp")
            temporary.write_text(json.dumps(values, indent=2, allow_nan=False), encoding="utf-8")
            temporary.replace(self.path)
            self.values = values
        return {"status":"ok","version":self.version(),"filePath":str(self.path),"overriddenMetadata":None}
