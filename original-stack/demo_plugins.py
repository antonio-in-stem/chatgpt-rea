"""Inert catalog data for the packaged plugin UI; never installs or runs code."""
import json
from pathlib import Path

PLUGIN_ID = 'rea-demo@rea-local'
MARKETPLACE = 'C:/REA-Demo/marketplace.json'
METHODS = {'plugin/list', 'plugin/installed', 'plugin/read', 'plugin/install', 'plugin/uninstall', 'plugin/search'}

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

    def remote_summary(self):
        # Same inert service entry as demo_plugin_http; desktop details use plugin/read.
        return {**self.summary(), 'id':'rea-catalog-demo@chatgpt-workspace',
            'name':'rea-catalog-demo','remotePluginId':'plugin_rea_catalog_demo',
            'source':{'type':'remote'},'installed':False,'enabled':False,'localVersion':None,
            'interface':{'displayName':'REA Catalog Demo',
                'shortDescription':'Explore the original remote plugin detail.',
                'longDescription':'A synthetic plugin used to verify the original catalog and detail screens. No executable capabilities.',
                'developerName':'REA Demo','capabilities':[],'category':None,'defaultPrompt':[],
                'logo':None,'logoDark':None,'logoUrl':None,'logoUrlDark':None,'screenshots':[],
                'screenshotUrls':[],'composerIcon':None,'composerIconUrl':None},
            'keywords':['demo','catalog']}

    def handle(self, method, params):
        params = {} if params is None else params
        if not isinstance(params, dict): raise PluginError('Expected plugin parameters')
        if method not in METHODS: raise PluginError('Unknown plugin method')
        if method == 'plugin/search':
            query=params.get('searchTerm');scope=params.get('scope');limit=params.get('limit',50);cursor=params.get('cursor')
            if not isinstance(query,str) or scope not in (None,'personal','global','workspace') or type(limit) is not int or not 1 <= limit <= 100 or cursor not in (None,'1'):
                raise PluginError('Invalid demo plugin search')
            entries=[{'marketplaceName':'rea-local','marketplacePath':MARKETPLACE,'plugin':self.summary()},
                     {'marketplaceName':'chatgpt-workspace','marketplacePath':None,'plugin':self.remote_summary()}] if scope in (None,'personal') else []
            terms=query.casefold().split()
            data=[e for e in entries if all(t in (e['plugin']['name']+' '+str(e['plugin']['interface'] or '')).casefold() for t in terms)]
            offset=0 if cursor is None else 1
            end=offset+limit
            return {'data':data[offset:end],'nextCursor':str(end) if end < len(data) else None}
        if method == 'plugin/read' and params.get('pluginName') == 'plugin_rea_catalog_demo' and params.get('remoteMarketplaceName') == 'chatgpt-workspace' and not params.get('marketplacePath'):
            summary=self.remote_summary()
            return {'plugin':{'marketplaceName':'chatgpt-workspace','marketplacePath':None,
                'summary':summary,'shareUrl':None,'description':summary['interface']['longDescription'],
                'skills':[],'onboardingSkill':None,'hooks':[],'apps':[],'appTemplates':[],
                'mcpServers':[],'scheduledTasks':None}}
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
