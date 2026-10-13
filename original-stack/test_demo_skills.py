import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from demo_config import ConfigStore
from demo_skills import SkillStore, SkillError, SKILL_PATH, NAME
from demo_transport import handle_message

class SkillTests(unittest.TestCase):
    def test_toggle_reload_and_rpc_scope(self):
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{})
            for enabled in [False, True]:
                result=SkillStore(config).handle('skills/config/write',{'path':SKILL_PATH,'enabled':enabled},'C:/demo')
                self.assertEqual(result,{'effectiveEnabled':enabled})
                reply,_=handle_message(json.dumps({'id':1,'method':'skills/list','params':{'cwds':['C:/one','C:/two']}}),config=config)
                self.assertEqual([r['cwd'] for r in reply['result']['data']],['C:/one','C:/two'])
                self.assertTrue(all(r['skills'][0]['enabled'] is enabled for r in reply['result']['data']))

    def test_reject_unknown_selector_and_preserve_failed_write(self):
        with tempfile.TemporaryDirectory() as directory:
            config=ConfigStore(Path(directory)/'config.json',{})
            store=SkillStore(config)
            for params in [{'name':'unknown','enabled':False},{'enabled':True},{'name':NAME,'path':'C:/other','enabled':False},{'name':NAME,'enabled':1}]:
                with self.assertRaises(SkillError):store.handle('skills/config/write',params,'C:/demo')
            store.handle('skills/config/write',{'name':NAME,'enabled':False},'C:/demo')
            with patch.object(Path,'replace',side_effect=OSError('disk full')):
                reply,_=handle_message(json.dumps({'id':2,'method':'skills/config/write','params':{'name':NAME,'enabled':True}}),config=config)
                self.assertEqual(reply['error']['code'],-32603)
            self.assertFalse(SkillStore(config).enabled)
            self.assertFalse(store.path.with_suffix('.pending').exists())
