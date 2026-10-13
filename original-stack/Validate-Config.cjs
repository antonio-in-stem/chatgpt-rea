const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const Ajv=require(process.argv[2]);
const ajv=new Ajv({allErrors:true});
ajv.addFormat('int64',{type:'number',validate:Number.isSafeInteger});
ajv.addFormat('uint32',{type:'number',validate:n=>Number.isInteger(n)&&n>=0&&n<=4294967295});
for(const [format,max] of [['uint',Number.MAX_SAFE_INTEGER],['uint16',65535],['uint64',Number.MAX_SAFE_INTEGER]])ajv.addFormat(format,{type:'number',validate:n=>Number.isSafeInteger(n)&&n>=0&&n<=max});
const code=`import json,tempfile
from pathlib import Path
from demo_config import ConfigStore
from demo_transport import FIXTURES
with tempfile.TemporaryDirectory() as directory:
 s=ConfigStore(Path(directory)/'demo.json',FIXTURES['config/read']['result']['config'])
 written=s.handle('config/value/write',{'keyPath':'projects.demo.trust_level','value':'trusted','mergeStrategy':'replace'})
 print(json.dumps([['ConfigWriteResponse',written],['ConfigReadResponse',s.handle('config/read',{'includeLayers':True})]]))`;
const samples=JSON.parse(cp.execFileSync('python',['-c',code],{cwd:__dirname,encoding:'utf8'}));
for(const [name,value] of samples){
 const schema=JSON.parse(fs.readFileSync(path.join(__dirname,'protocol/json/v2',name+'.json'),'utf8'));
 const validate=ajv.compile(schema);
 if(!validate(value))throw Error(name+': '+JSON.stringify(validate.errors));
 console.log(name+' validated');
}
