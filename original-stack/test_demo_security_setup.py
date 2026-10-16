import unittest,tempfile
from pathlib import Path
from demo_config import ConfigStore
from demo_security import handle,SecurityError,SCAN_ID
class SetupTests(unittest.TestCase):
 def test_lifecycle_claim_and_persistence(self):
  with tempfile.TemporaryDirectory() as tmp:
   config=ConfigStore(Path(tmp)/'config.json',{})
   def call(tool,**args):return handle('mcpServer/tool/call',{'server':'codex-security','tool':tool,'arguments':args},config)['structuredContent']
   setup={'targetPath':'C:/REA-Demo/security','mode':'standard','scope':'.'}
   self.assertTrue(call('inspect_codex_security_target',targetPath=setup['targetPath'])['target']['targetMetadata']['reviewChangesSupported'])
   with self.assertRaises(SecurityError):call('inspect_codex_security_target',targetPath='C:/private')
   with self.assertRaises(SecurityError):call('inspect_codex_security_setup',**{**setup,'scope':'../outside'})
   session=call('open_codex_security_workspace',**setup)['workspace']['id']
   with self.assertRaises(SecurityError):call('start_codex_security_scan',sessionId=session)
   call('submit_codex_security_setup',**setup,sessionId=session,userContext='Demo')
   first=call('start_codex_security_scan',sessionId=session)['workspace']['results'];scan=first['scanId']
   self.assertNotEqual(scan,SCAN_ID)
   self.assertEqual(call('start_codex_security_scan',sessionId=session)['workspace']['results'],first)
   call('claim_codex_security_scan_handoff_delivery',scanId=scan,claimToken='synthetic-token')
   with self.assertRaises(SecurityError):call('attach_codex_security_scan_continuation_thread',scanId=scan,claimToken='wrong',threadId='demo-thread')
   call('attach_codex_security_scan_continuation_thread',scanId=scan,claimToken='synthetic-token',threadId='demo-thread')
   detail=call('get_codex_security_scan',scanId=scan)['scan']
   self.assertEqual(detail['progress']['status'],'complete');self.assertEqual(detail['continuationThreadId'],'demo-thread')
   self.assertEqual(detail['findings'],[]);self.assertEqual(len(call('list_codex_security_scans')['scans']),2)
   call('rename_codex_security_scan',scanId=scan,name='Renamed created demo')
   self.assertEqual(call('get_codex_security_scan',scanId=scan)['scan']['name'],'Renamed created demo')
   call('cancel_codex_security_scan_from_app',scanId=scan)
   self.assertEqual(call('get_codex_security_scan',scanId=scan)['scan']['progress']['status'],'canceled')
if __name__=='__main__':unittest.main()
