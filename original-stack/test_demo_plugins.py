import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from demo_config import ConfigStore
from demo_plugins import PluginStore, PluginError, PLUGIN_ID, MARKETPLACE
from demo_transport import handle_message

class PluginTests(unittest.TestCase):
    def test_remote_catalog_read_search_and_rejected_mutations(self):
        with tempfile.TemporaryDirectory() as directory:
            store=PluginStore(ConfigStore(Path(directory)/'config.json',{}))
            params={'pluginName':'plugin_rea_catalog_demo','remoteMarketplaceName':'chatgpt-workspace'}
            detail=store.handle('plugin/read',params)['plugin']
            self.assertFalse(detail['summary']['installed'])
            self.assertEqual(detail['summary']['remotePluginId'],'plugin_rea_catalog_demo')
            for key in ('skills','hooks','apps','mcpServers'):self.assertEqual(detail[key],[])
            result=store.handle('plugin/search',{'searchTerm':'CATALOG','scope':'personal','limit':50})
            self.assertEqual([e['plugin'] for e in result['data']],[detail['summary']])
            self.assertIsNone(result['nextCursor'])
            first=store.handle('plugin/search',{'searchTerm':'rea','limit':1})
            second=store.handle('plugin/search',{'searchTerm':'rea','limit':1,'cursor':first['nextCursor']})
            self.assertEqual(len(first['data'])+len(second['data']),2)
            self.assertNotEqual(first['data'][0]['plugin']['id'],second['data'][0]['plugin']['id'])
            self.assertIsNone(second['nextCursor'])
            self.assertEqual(store.handle('plugin/search',{'searchTerm':'no-such-demo'})['data'],[])
            self.assertEqual(store.handle('plugin/search',{'searchTerm':'catalog','scope':'workspace'})['data'],[])
            for method in ('plugin/install','plugin/uninstall'):
                with self.assertRaises(PluginError):store.handle(method,params)
            for params in ({'searchTerm':5},{'searchTerm':'x','cursor':'unknown'},{'searchTerm':'x','limit':0}):
                with self.assertRaises(PluginError):store.handle('plugin/search',params)
            self.assertEqual(list(Path(directory).iterdir()),[])

    def test_skill_refresh_after_inert_install_is_empty_and_scoped(self):
        reply,_=handle_message(json.dumps({'id':1,'method':'skills/list','params':{'cwds':['C:/demo/one','C:/demo/two'],'forceReload':True}}))
        self.assertEqual(reply['result']['data'],[{'cwd':p,'skills':[],'errors':[]} for p in ['C:/demo/one','C:/demo/two']])
        reply,_=handle_message(json.dumps({'id':2,'method':'skills/list','params':{'cwds':'invalid'}}))
        self.assertEqual(reply['error']['code'],-32602)

    def test_install_toggle_reload_uninstall(self):
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{})
            store=PluginStore(config)
            params={'pluginName':'rea-demo','marketplacePath':MARKETPLACE}
            self.assertFalse(store.handle('plugin/read',params)['plugin']['summary']['installed'])
            self.assertEqual(store.handle('plugin/install',params),{'authPolicy':'ON_USE','appsNeedingAuth':[]})
            config.handle('config/batchWrite',{'edits':[{'keyPath':'plugins.'+PLUGIN_ID+'.enabled','value':False,'mergeStrategy':'upsert'}]})
            reloaded=PluginStore(ConfigStore(config.path,{}))
            summary=reloaded.handle('plugin/installed',{})['marketplaces'][0]['plugins'][0]
            self.assertTrue(summary['installed']);self.assertFalse(summary['enabled'])
            reloaded.handle('plugin/uninstall',{'pluginId':PLUGIN_ID})
            self.assertEqual(PluginStore(config).handle('plugin/installed',{})['marketplaces'][0]['plugins'],[])

    def test_failed_save_preserves_state_and_rejects_other_plugins(self):
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{});store=PluginStore(config)
            params={'pluginName':'rea-demo','marketplacePath':MARKETPLACE}
            store.handle('plugin/install',params)
            with patch.object(Path,'replace',side_effect=OSError('disk full')):
                reply,_=handle_message(json.dumps({'id':7,'method':'plugin/uninstall','params':{'pluginId':PLUGIN_ID}}),config=config)
                self.assertEqual(reply['error']['code'],-32603)
            self.assertTrue(PluginStore(config).installed)
            self.assertFalse(store.path.with_suffix('.pending').exists())
            with self.assertRaises(PluginError):store.handle('plugin/install',{'pluginName':'other','marketplacePath':MARKETPLACE})
            self.assertEqual(list(Path(directory).iterdir()),[store.path])
