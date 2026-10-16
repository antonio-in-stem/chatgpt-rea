import importlib.util,json,hashlib,tempfile,unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('export_demo',Path(__file__).with_name('Export-DemoRuntime.py'))
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)

class ExportRuntimeTests(unittest.TestCase):
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory(prefix='rea-export-test-')
  self.root=Path(self.temp.name).resolve()
  assert self.root.is_relative_to(Path(tempfile.gettempdir()).resolve()) and self.root!=Path(tempfile.gettempdir()).resolve()
  self.addCleanup(self.temp.cleanup)
  self.runtime=self.root/'source';(self.runtime/'resources').mkdir(parents=True)
  (self.runtime/'ChatGPT.exe').write_bytes(b'inert fixture exe')
  (self.runtime/'resources/app.asar').write_bytes(b'inert fixture asar')
  rows=[{'path':p.relative_to(self.runtime).as_posix(),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in self.runtime.rglob('*') if p.is_file()]
  by={r['path']:r for r in rows}
  self.inventory={'files':rows,'fileCount':len(rows),'bytes':sum(r['bytes'] for r in rows)}
  self.patch={'mode':'instrumented-demo-host','rendererFilesModified':False,'sourceSha256':module.PINNED_SOURCE,'outputSha256':by['resources/app.asar']['sha256'],'executablePatch':{'patchedSha256':by['ChatGPT.exe']['sha256']}}
  self.location=self.root/'location.json';self.out=self.root/'export with spaces'
  self.save('inventory.json',self.inventory);self.save('patch.json',self.patch)
  self.save('location.json',{'runtimeRoot':'source','inventoryPath':'inventory.json','patchManifestPath':'patch.json'})
 def save(self,name,obj):(self.root/name).write_text(json.dumps(obj),encoding='utf-8')
 def export(self):return module.export_runtime(self.location,self.out)
 def test_complete_export_and_relative_metadata(self):
  (self.root/'auth.json').write_text('must not be exported')
  result=self.export();self.assertEqual(result['files'],2)
  metadata=json.loads((self.out/'runtime-location.json').read_text());self.assertEqual(metadata['runtimeRoot'],'runtime')
  self.assertFalse((self.out/'auth.json').exists())
  for row in self.inventory['files']:self.assertEqual(hashlib.sha256((self.out/'runtime'/row['path']).read_bytes()).hexdigest(),row['sha256'])
 def test_changed_file_retains_no_launch_manifest(self):
  (self.runtime/'ChatGPT.exe').write_bytes(b'changed fixture!!')
  with self.assertRaisesRegex(ValueError,'Copied runtime differs'):self.export()
  self.assertFalse((self.out/'runtime-location.json').exists())
 def test_unknown_runtime_file_rejected_before_destination(self):
  (self.runtime/'unexpected.txt').write_text('extra')
  with self.assertRaisesRegex(ValueError,'membership'):self.export()
  self.assertFalse(self.out.exists())
 def test_unsafe_inventory_path(self):
  self.inventory['files'][0]['path']='../outside';self.save('inventory.json',self.inventory)
  with self.assertRaisesRegex(ValueError,'Unsafe inventory'):self.export()
  self.assertFalse(self.out.exists())
 def test_existing_destination_preserved(self):
  self.out.mkdir();(self.out/'keep').write_text('unchanged')
  with self.assertRaisesRegex(ValueError,'Destination must be new'):self.export()
  self.assertEqual((self.out/'keep').read_text(),'unchanged')
 def test_altered_renderer_metadata_rejected(self):
  self.patch['rendererFilesModified']=True;self.save('patch.json',self.patch)
  with self.assertRaisesRegex(ValueError,'provenance'):self.export()
  self.assertFalse(self.out.exists())

if __name__=='__main__':unittest.main()
