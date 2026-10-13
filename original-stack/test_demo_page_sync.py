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
   self.assertEqual(restored['capabilities'],['comments_v1'])
   self.assertEqual(restored['viewer'],{'account_user_id':'rea-demo-user','display_name':'Demo'})
   with self.assertRaises(ValueError):store.commit('rea-page-1',{**message,'update':'AAA='})
   (folder/'rea-page-1-document.pending').write_text('foreign')
   with self.assertRaises(FileExistsError):store.commit('rea-page-1',{**message,'client_update_id':'edit-2'})
   self.assertEqual(store.sync('rea-page-1')['committed_sequence'],1)
   self.assertEqual((folder/'rea-page-1-document.pending').read_text(),'foreign')
 def test_original_comment_update_survives_reload_and_unrelated_edit(self):
  fixture=json.loads((Path(__file__).parent/'fixtures/page-comments-original-update.json').read_text(encoding='utf-8'))
  with tempfile.TemporaryDirectory(prefix='rea-comments-') as directory:
   folder=Path(directory)
   (folder/'demo-pages.json').write_text(json.dumps({'items':[{'metadata':{'page_id':'rea-page-1'}}]}))
   store=PageSyncStore(folder)
   store.commit('rea-page-1',{'client_update_id':'original-comments','update':fixture['update']})
   restored=PageSyncStore(folder).sync('rea-page-1')
   client=y.YDoc();y.apply_update(client,base64.b64decode(restored['update']))
   comments=json.loads(client.get_map('comments').to_json())
   self.assertEqual(len(comments),1)
   thread=next(iter(comments.values()))
   self.assertEqual(thread['state'],'resolved')
   self.assertEqual(thread['resolved_by'],restored['viewer']['account_user_id'])
   self.assertEqual([m['body'] for m in thread['messages']],['Local demo comment from the original Pages editor.','A local reply preserved with the original thread.'])
   self.assertEqual(thread['target']['kind'],'selection')
   with client.begin_transaction() as transaction:
    client.get_text('title').insert(transaction,0,'Edited: ')
   store.commit('rea-page-1',{'client_update_id':'unrelated-title','update':base64.b64encode(y.encode_state_as_update(client)).decode()})
   final=y.YDoc();y.apply_update(final,base64.b64decode(PageSyncStore(folder).sync('rea-page-1')['update']))
   self.assertEqual(json.loads(final.get_map('comments').to_json()),comments)
 def test_block_attribution_tracks_only_changed_blocks(self):
  with tempfile.TemporaryDirectory(prefix='rea-attribution-') as directory:
   folder=Path(directory);(folder/'demo-pages.json').write_text(json.dumps({'items':[{'metadata':{'page_id':'rea-page-1'}}]}))
   store=PageSyncStore(folder);doc=y.YDoc()
   def commit(key):
    store.commit('rea-page-1',{'client_update_id':key,'update':base64.b64encode(y.encode_state_as_update(doc)).decode()})
    return json.loads((folder/'rea-page-1-document.json').read_text())['block_attributions']
   with doc.begin_transaction() as tx:
    doc.get_map('blocksById').set(tx,'block-a',{'kind':'markdown','markdown':'First'})
   first=commit('create');self.assertEqual(first['block-a']['actor']['account_user_id'],'rea-demo-user')
   with doc.begin_transaction() as tx:doc.get_text('title').insert(tx,0,'Title only')
   self.assertEqual(commit('title'),first)
   with doc.begin_transaction() as tx:doc.get_map('blocksById').set(tx,'block-b',{'kind':'markdown','markdown':'Second'})
   second=commit('new-block');self.assertEqual(second['block-a'],first['block-a']);self.assertIn('block-b',second)
   with doc.begin_transaction() as tx:doc.get_map('blocksById').pop(tx,'block-a')
   self.assertEqual(set(commit('delete')),{'block-b'})
 def test_checkpoints_freeze_original_yjs_state_and_replay_does_not_duplicate(self):
  with tempfile.TemporaryDirectory(prefix='rea-checkpoints-') as directory:
   folder=Path(directory);(folder/'demo-pages.json').write_text(json.dumps({'items':[{'metadata':{'page_id':'rea-page-1'}}]}))
   store=PageSyncStore(folder);doc=y.YDoc()
   with doc.begin_transaction() as tx:doc.get_text('title').insert(tx,0,'First version')
   message={'client_update_id':'first','update':base64.b64encode(y.encode_state_as_update(doc)).decode()}
   store.commit('rea-page-1',message);store.commit('rea-page-1',message)
   first=json.loads((folder/'rea-page-1-document.json').read_text())['checkpoints']
   self.assertEqual(len(first),1)
   with doc.begin_transaction() as tx:doc.get_text('title').insert(tx,0,'Second: ')
   store.commit('rea-page-1',{'client_update_id':'second','update':base64.b64encode(y.encode_state_as_update(doc)).decode()})
   final=json.loads((folder/'rea-page-1-document.json').read_text())['checkpoints']
   self.assertEqual(final[0],first[0]);self.assertEqual(len(final),2)
   snapshot=json.loads(final[0]['envelope']);restored=y.YDoc();y.apply_update(restored,base64.b64decode(snapshot['yjs_state_update_base64']))
   self.assertEqual(json.loads(restored.get_text('title').to_json()),'First version')
   self.assertEqual(base64.b64decode(snapshot['state_vector_base64']),y.encode_state_vector(restored))
   self.assertEqual(snapshot['through_sequence'],1)
 def test_archived_and_deleted_pages_reject_sync_and_commit(self):
  with tempfile.TemporaryDirectory(prefix='rea-page-sync-') as directory:
   folder=Path(directory);file=folder/'demo-pages.json';store=PageSyncStore(folder)
   for item in [{'metadata':{'page_id':'rea-page-1','deleted_at':'2026-10-13'}},{'metadata':{'page_id':'rea-page-1'},'permanentlyDeleted':True}]:
    file.write_text(json.dumps({'items':[item]}))
    with self.assertRaisesRegex(ValueError,'Unavailable'):store.sync('rea-page-1')
    with self.assertRaisesRegex(ValueError,'Unavailable'):store.commit('rea-page-1',{'client_update_id':'edit','update':'AAA='})
   self.assertFalse((folder/'rea-page-1-document.json').exists())
if __name__=='__main__':unittest.main()
