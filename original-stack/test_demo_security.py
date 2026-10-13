import json
import unittest
import tempfile
from pathlib import Path
from demo_security import handle, SecurityError, SCAN_ID
from demo_config import ConfigStore
from demo_transport import handle_message

class SecurityTests(unittest.TestCase):
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
            self.assertEqual(handle_message(raw,config=config)[0]['result'],discovery)
