import unittest
import tempfile
from pathlib import Path
from uuid import uuid4
from demo_config import ConfigStore
from demo_security import handle, SecurityError, SCAN_ID
from demo_security_remediation import TOOLS, PATCH

class RemediationTests(unittest.TestCase):
    def test_claim_stages_persistence_and_rejection(self):
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{})
            def call(tool,args):return handle('mcpServer/tool/call',dict(server='codex-security',tool=tool,arguments=args),config)['structuredContent']
            def read():return call('get_codex_security_scan',{'scanId':SCAN_ID})['scan']['findings'][0].get('remediationState')
            args=dict(occurrenceId='rea-occurrence-1',requestId=str(uuid4()),actionToken=str(uuid4()))
            first=call(TOOLS[0],args)['scan']['findings'][0]['remediationState']
            self.assertEqual(first['pendingAction'],'generate')
            self.assertEqual(first['actionClaimToken'],args['actionToken'])
            path=Path(directory)/'demo-security.json';before=path.read_bytes()
            with self.assertRaises(SecurityError):call(TOOLS[0],args)
            with self.assertRaises(SecurityError):call(TOOLS[3],dict(args,actionToken=str(uuid4())))
            self.assertEqual(path.read_bytes(),before)
            call(TOOLS[4],args)
            args['actionToken']=str(uuid4())
            self.assertEqual(call(TOOLS[2],args)['actionToken'],args['actionToken'])
            call(TOOLS[3],args)
            self.assertEqual(read()['patch'],PATCH)
            self.assertEqual(read()['state'],'generated')
            for action,result in [('apply','applied'),('verify','verified')]:
                version=read()['version'];args['actionToken']=str(uuid4())
                with self.assertRaises(SecurityError):call(TOOLS[1],dict(args,action=action,expectedVersion=version-1))
                call(TOOLS[1],dict(args,action=action,expectedVersion=version))
                self.assertEqual(read()['pendingAction'],action)
                call(TOOLS[3],args)
                self.assertEqual(read()['state'],result)
                self.assertIsNone(read()['actionClaimToken'])
            self.assertIn('No commands',read()['verificationSummary'])
            self.assertFalse((Path(directory)/'demo.txt').exists())

    def test_cancel_and_no_config(self):
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{})
            args=dict(occurrenceId='rea-occurrence-1',requestId=str(uuid4()),actionToken=str(uuid4()))
            def call(name,config=config):return handle('mcpServer/tool/call',dict(server='codex-security',tool=name,arguments=args),config)
            with self.assertRaises(SecurityError):call(TOOLS[0],None)
            call(TOOLS[0]);call(TOOLS[5])
            call(TOOLS[0])
            args['occurrenceId']='foreign'
            with self.assertRaises(SecurityError):call(TOOLS[3])
