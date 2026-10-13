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
   with doc.begin_transaction() as transaction:
    doc.get_text('title').insert(transaction,0,'Original editor demo')
    doc.get_map('pagesMetadata').set(transaction,'symbol',{'kind':'emoji','value':'\U0001f680'})
   message={'client_update_id':'edit-1','update':base64.b64encode(y.encode_state_as_update(doc)).decode()}
   ack,committed=store.commit('rea-page-1',message)
   self.assertEqual(ack['sequence'],1)
   self.assertEqual(json.loads((folder/'rea-page-1-document.json').read_text())['symbol'],{'kind':'emoji','value':'\U0001f680'})
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
 def test_archived_and_deleted_pages_reject_sync_and_commit(self):
  with tempfile.TemporaryDirectory(prefix='rea-page-sync-') as directory:
   folder=Path(directory);file=folder/'demo-pages.json';store=PageSyncStore(folder)
   for item in [{'metadata':{'page_id':'rea-page-1','deleted_at':'2026-10-13'}},{'metadata':{'page_id':'rea-page-1'},'permanentlyDeleted':True}]:
    file.write_text(json.dumps({'items':[item]}))
    with self.assertRaisesRegex(ValueError,'Unavailable'):store.sync('rea-page-1')
    with self.assertRaisesRegex(ValueError,'Unavailable'):store.commit('rea-page-1',{'client_update_id':'edit','update':'AAA='})
   self.assertFalse((folder/'rea-page-1-document.json').exists())
if __name__=='__main__':unittest.main()
