import base64,json,tempfile,unittest
from pathlib import Path
from demo_page_sync import PageSyncStore,y
class PageSyncTests(unittest.TestCase):
 def test_update_replay_reload_and_conflicting_receipt(self):
  with tempfile.TemporaryDirectory(prefix='rea-page-sync-') as directory:
   folder=Path(directory)
   (folder/'demo-pages.json').write_text(json.dumps({'items':[{'metadata':{'page_id':'rea-page-1'}}]}))
   store=PageSyncStore(folder)
   doc=y.YDoc()
   with doc.begin_transaction() as transaction:doc.get_text('title').insert(transaction,0,'Original editor demo')
   message={'client_update_id':'edit-1','update':base64.b64encode(y.encode_state_as_update(doc)).decode()}
   ack,committed=store.commit('rea-page-1',message)
   self.assertEqual(ack['sequence'],1)
   self.assertEqual(committed['update'],message['update'])
   self.assertEqual(store.commit('rea-page-1',message),(ack,None))
   restored=PageSyncStore(folder).sync('rea-page-1')
   client=y.YDoc();y.apply_update(client,base64.b64decode(restored['update']))
   self.assertEqual(json.loads(client.get_text('title').to_json()),'Original editor demo')
   self.assertEqual(restored['committed_sequence'],1)
   with self.assertRaises(ValueError):store.commit('rea-page-1',{**message,'update':'AAA='})
   (folder/'rea-page-1-document.pending').write_text('foreign')
   with self.assertRaises(FileExistsError):store.commit('rea-page-1',{**message,'client_update_id':'edit-2'})
   self.assertEqual(store.sync('rea-page-1')['committed_sequence'],1)
   self.assertEqual((folder/'rea-page-1-document.pending').read_text(),'foreign')
if __name__=='__main__':unittest.main()
