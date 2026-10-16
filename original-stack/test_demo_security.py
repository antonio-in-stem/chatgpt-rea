import json
import unittest
import tempfile
from pathlib import Path
from demo_security import handle, SecurityError, SCAN_ID
from demo_config import ConfigStore
from demo_transport import handle_message

class SecurityTests(unittest.TestCase):
    def test_persistent_rename_triage_and_failed_write(self):
        from unittest.mock import patch
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{})
            def call(tool,args):return handle('mcpServer/tool/call',{'server':'codex-security','tool':tool,'arguments':args},config)['structuredContent']
            call('rename_codex_security_scan',{'scanId':SCAN_ID,'name':'Renamed demo'})
            result=call('set_codex_security_finding_triage',{'occurrenceId':'rea-occurrence-1','status':'closed','closeReason':'false_positive','note':'Demo note'})
            self.assertEqual(result['scan']['name'],'Renamed demo')
            self.assertEqual(result['scan']['findings'][0]['triage']['status'],'closed')
            self.assertEqual(call('list_codex_security_global_findings',{'status':'open'})['findings'],[])
            self.assertEqual(len(call('list_codex_security_global_findings',{'status':'closed'})['findings']),1)
            self.assertEqual(call('list_codex_security_repositories',{})['repositories'][0]['openFindingsCount'],0)
            path=Path(directory)/'demo-security.json';before=path.read_bytes()
            with self.assertRaises(SecurityError):call('set_codex_security_finding_triage',{'occurrenceId':'rea-occurrence-1','status':'closed'})
            with self.assertRaises(SecurityError):call('set_codex_security_finding_triage',{'occurrenceId':'rea-occurrence-1','status':'closed','closeReason':'wont_fix'})
            with patch.object(Path,'replace',side_effect=OSError('disk failure')):
                with self.assertRaises(OSError):call('rename_codex_security_scan',{'scanId':SCAN_ID,'name':'Not saved'})
            self.assertEqual(path.read_bytes(),before)
            self.assertFalse(path.with_suffix('.pending').exists())
            result=call('set_codex_security_finding_triage',{'occurrenceId':'rea-occurrence-1','status':'open'})
            self.assertEqual(result['scan']['findings'][0]['triage']['status'],'open')
            self.assertIsNone(result['scan']['findings'][0]['triage']['closeReason'])

    def call(self, tool, args=None):
        return handle('mcpServer/tool/call', {'server':'codex-security','threadId':'demo','tool':tool,'arguments':args or {}})

    def test_discovery_and_read_shapes(self):
        discovery=handle('mcpServerStatus/list',{})
        self.assertEqual(discovery['data'][0]['name'],'codex-security')
        self.assertEqual(len(discovery['data'][0]['tools']),5)
        scan=self.call('get_codex_security_scan',{'scanId':SCAN_ID})['structuredContent']['scan']
        self.assertEqual(scan['progress']['status'],'complete')
        self.assertFalse(scan['remediationAvailable'])
        self.assertEqual(scan['findingCount'],len(scan['findings']))
        scan['findings'].clear()
        self.assertEqual(len(self.call('get_codex_security_scan',{'scanId':SCAN_ID})['structuredContent']['scan']['findings']),1)
        repos=self.call('list_codex_security_repositories')['structuredContent']['repositories']
        self.assertFalse(repos[0]['checkoutAvailable'])

    def test_filter_pages_and_rejected_mutations(self):
        tool='list_codex_security_global_findings'
        self.assertEqual(len(self.call(tool,{'query':'SYNTHETIC','status':'open','severity':'low'})['structuredContent']['findings']),1)
        for args in ({'query':'absent'},{'status':'closed'},{'severity':'high'},{'offset':1},{'targetId':'foreign'}):
            self.assertEqual(self.call(tool,args)['structuredContent'],{'findings':[],'nextOffset':None})
        for args in ({'offset':-1},{'limit':0},{'limit':True},{'query':[]}):
            with self.assertRaises(SecurityError): self.call(tool,args)
        for name in ('start_codex_security_scan','set_codex_security_finding_triage','unknown'):
            with self.assertRaises(SecurityError): self.call(name)
        with self.assertRaises(SecurityError): self.call('get_codex_security_scan',{'scanId':'foreign'})
        with self.assertRaises(SecurityError): handle('mcpServer/tool/call',{'server':'foreign'})

    def test_transport_scope_and_protocol_required_fields(self):
        root=Path(__file__).parent
        discovery=handle('mcpServerStatus/list',{})
        schema=json.loads((root/'protocol/json/v2/ListMcpServerStatusResponse.json').read_text())
        self.assertTrue(set(schema['definitions']['McpServerStatus']['required']) <= discovery['data'][0].keys())
        schema=json.loads((root/'protocol/json/v2/McpServerToolCallResponse.json').read_text())
        self.assertTrue(set(schema['required']) <= self.call('list_codex_security_scans').keys())
        raw=json.dumps({'id':1,'method':'mcpServerStatus/list','params':{}})
        self.assertEqual(handle_message(raw)[0]['result']['data'],[])
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{})
            self.assertEqual(handle_message(raw,config=config)[0]['result'],handle('mcpServerStatus/list',{},config))

    def test_original_plugin_eligibility_identity(self):
        from demo_plugins import PluginStore
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{})
            plugins=PluginStore(config).handle('plugin/installed',{})['marketplaces']
            eligible=[p for m in plugins for p in m['plugins'] if p['id'].startswith('codex-security@')]
            self.assertEqual(len(eligible),1)
            self.assertTrue(eligible[0]['enabled'])
            self.assertEqual(eligible[0]['availability'],'AVAILABLE')
