"""Inert catalog data for the packaged plugin UI; never installs or runs code."""
import json
from pathlib import Path

PLUGIN_ID = 'rea-demo@rea-local'
MARKETPLACE = 'C:/REA-Demo/marketplace.json'
METHODS = {'plugin/list', 'plugin/installed', 'plugin/read', 'plugin/install', 'plugin/uninstall'}

class PluginError(ValueError):
    pass

class PluginStore:
    def __init__(self, config):
        self.config = config
        self.path = config.path.parent / 'demo-plugins.json'
        self.installed = json.loads(self.path.read_text()).get('installed', False) if self.path.exists() else False

    def summary(self):
        enabled = self.config.values.get('plugins', {}).get(PLUGIN_ID, {}).get('enabled', True)
        return {'id':PLUGIN_ID,'name':'rea-demo','remotePluginId':None,'version':'1.0.0',
            'localVersion':'1.0.0' if self.installed else None,'shareContext':None,
            'source':{'type':'local','path':'C:/REA-Demo/plugins/rea-demo'},
            'installed':self.installed,'installedAt':None,'enabled':self.installed and enabled is True,
            'installPolicy':'AVAILABLE','installPolicySource':None,'mustShowInstallationInterstitial':False,
            'authPolicy':'ON_USE','availability':'AVAILABLE','disabledReason':None,
            'eligiblePlanTypes':None,'interface':None,'keywords':[]}

    def handle(self, method, params):
        params = {} if params is None else params
        if not isinstance(params, dict): raise PluginError('Expected plugin parameters')
        if method not in METHODS: raise PluginError('Unknown plugin method')
        if method in {'plugin/read','plugin/install'}:
            if params.get('pluginName') != 'rea-demo' or str(params.get('marketplacePath','')).replace('\\','/') != MARKETPLACE or params.get('remoteMarketplaceName'):
                raise PluginError('Only the synthetic demo plugin is available')
        if method == 'plugin/uninstall' and params.get('pluginId') != PLUGIN_ID:
            raise PluginError('Unknown demo plugin')
        if method in {'plugin/install','plugin/uninstall'}:
            installed = method == 'plugin/install'
            self.path.parent.mkdir(parents=True,exist_ok=True)
            temporary = self.path.with_suffix('.pending')
            owned = False
            try:
                with temporary.open('x',encoding='utf8') as f:
                    owned = True
                    json.dump({'installed':installed},f)
                temporary.replace(self.path)
            finally:
                if owned: temporary.unlink(missing_ok=True)
            self.installed = installed
            return {'authPolicy':'ON_USE','appsNeedingAuth':[]} if installed else {}
        summary = self.summary()
        marketplace = {'name':'rea-local','path':MARKETPLACE,'interface':None,'plugins':[summary]}
        if method == 'plugin/read':
            return {'plugin':{'marketplaceName':'rea-local','marketplacePath':MARKETPLACE,
                'summary':summary,'shareUrl':None,'description':'Inert UI demonstration. No executable capabilities.',
                'skills':[],'onboardingSkill':None,'hooks':[],'apps':[],'appTemplates':[],
                'mcpServers':[],'scheduledTasks':None}}
        if method == 'plugin/installed' and not self.installed: marketplace['plugins']=[]
        result = {'marketplaces':[marketplace],'marketplaceLoadErrors':[]}
        # Original Security eligibility requires an enabled codex-security@ identity.
        # This entry describes only the in-process synthetic read provider, never executable code.
        if method == 'plugin/installed':
            security = {**summary, 'id':'codex-security@rea-local', 'name':'codex-security',
                        'installed':True, 'enabled':True, 'localVersion':'1.0.0',
                        'source':{'type':'local','path':'C:/REA-Demo/plugins/codex-security'}}
            result['marketplaces'].append({'name':'rea-security-demo','path':MARKETPLACE,
                                          'interface':None,'plugins':[security]})
        if method == 'plugin/list': result['featuredPluginIds']=[]
        return result
