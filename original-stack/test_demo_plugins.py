import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from demo_config import ConfigStore
from demo_plugins import PluginStore, PluginError, PLUGIN_ID, MARKETPLACE
from demo_transport import handle_message

class PluginTests(unittest.TestCase):
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
            config.handle('config/batchWrite',{'edits':[{'keyPath':'plugins."'+PLUGIN_ID+'".enabled','value':False,'mergeStrategy':'upsert'}]})
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
