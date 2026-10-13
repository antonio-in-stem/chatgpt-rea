import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from demo_config import ConfigStore, ConfigError

class ConfigTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path=Path(self.temp.name)/"demo.json"
        self.store=ConfigStore(self.path,{"model":None})

    def write(self,key,value,**extra):
        return self.store.handle("config/value/write",{"keyPath":key,"value":value,"mergeStrategy":"replace",**extra})

    def test_quoted_path_persistence_layers_and_versions(self):
        key="projects.'C:\\Demo\\folder.with.dot'.trust_level"
        before=self.store.version()
        response=self.write(key,"trusted",expectedVersion=before)
        self.assertNotEqual(response["version"],before)
        self.store=ConfigStore(self.path,{"model":None})
        read=self.store.handle("config/read",{"includeLayers":True})
        self.assertEqual(read["config"]["projects"][r"C:\Demo\folder.with.dot"]["trust_level"],"trusted")
        self.assertEqual(read["layers"][0]["version"],response["version"])
        self.assertEqual(read["origins"]["projects"]["name"]["file"],str(self.path))
        with self.assertRaises(ConfigError):self.write("model","other",expectedVersion=before)

    def test_batch_is_atomic_and_writes_cannot_escape(self):
        self.write("model","demo")
        before=self.path.read_bytes()
        with self.assertRaises(ConfigError):
            self.store.handle("config/batchWrite",{"edits":[{"keyPath":"model","value":"changed","mergeStrategy":"replace"},{"keyPath":"invalid..key","value":0,"mergeStrategy":"replace"}]})
        with self.assertRaises(ConfigError): self.write("model","escape",filePath=str(self.path.parent/"real.toml"))
        with patch.object(Path,"replace",side_effect=OSError("disk unavailable")):
            with self.assertRaises(OSError):self.write("model","failed")
        self.assertEqual(before,self.path.read_bytes())
        self.assertEqual(self.store.values["model"],"demo")

    def test_merge_delete_and_empty_reload(self):
        self.write("features",{"a":True,"b":False})
        self.store.handle("config/value/write",{"keyPath":"features","value":{"b":True},"mergeStrategy":"upsert"})
        self.assertEqual(self.store.values["features"],{"a":True,"b":True})
        self.write("features.a",None)
        version=self.store.version()
        self.assertEqual(self.store.handle("config/batchWrite",{"edits":[],"reloadUserConfig":True})["version"],version)
        self.assertEqual(self.store.values["features"],{"b":True})

if __name__ == "__main__":unittest.main()
