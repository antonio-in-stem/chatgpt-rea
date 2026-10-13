// Validate actual demo responses against the protocol exported from the package.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const Ajv=require(process.argv[2]);
const ajv=new Ajv({allErrors:true});
for(const [name,max] of [['int64',Number.MAX_SAFE_INTEGER],['uint64',Number.MAX_SAFE_INTEGER],['uint',Number.MAX_SAFE_INTEGER],['uint32',4294967295],['int32',2147483647]])ajv.addFormat(name,{type:'number',validate:n=>Number.isSafeInteger(n)&&n<=max});
const code=`import json,tempfile
from pathlib import Path
from demo_config import ConfigStore
from demo_plugins import PluginStore,MARKETPLACE,PLUGIN_ID
samples=[]
with tempfile.TemporaryDirectory() as directory:
 config=ConfigStore(Path(directory)/'config.json',{})
 store=PluginStore(config)
 params={'pluginName':'rea-demo','marketplacePath':MARKETPLACE}
 for method,name in [('plugin/list','PluginListResponse'),('plugin/installed','PluginInstalledResponse'),('plugin/read','PluginReadResponse')]:
  samples.append([name,store.handle(method,params)])
 samples.append(['PluginInstallResponse',store.handle('plugin/install',params)])
 for method,name in [('plugin/list','PluginListResponse'),('plugin/installed','PluginInstalledResponse'),('plugin/read','PluginReadResponse')]:
  samples.append([name,store.handle(method,params)])
 samples.append(['PluginUninstallResponse',store.handle('plugin/uninstall',{'pluginId':PLUGIN_ID})])
print(json.dumps(samples))`;
const samples=JSON.parse(cp.execFileSync(process.argv[3]||'python',['-c',code],{cwd:__dirname,encoding:'utf8'}));
const compiled=new Map();
for(const [name,value] of samples){
 if(!compiled.has(name))compiled.set(name,ajv.compile(JSON.parse(fs.readFileSync(path.join(__dirname,'protocol/json/v2',name+'.json'),'utf8'))));
 const validate=compiled.get(name);if(!validate(value))throw Error(name+': '+JSON.stringify(validate.errors));
}
console.log(JSON.stringify({validated:samples.length,schemas:compiled.size}));
