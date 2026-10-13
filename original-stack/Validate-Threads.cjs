const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const Ajv=require(process.argv[2]);
const ajv=new Ajv({allErrors:true});
ajv.addFormat('int64',{type:'number',validate:Number.isSafeInteger});
ajv.addFormat('uint32',{type:'number',validate:n=>Number.isInteger(n)&&n>=0&&n<=4294967295});
ajv.addFormat('int32',{type:'number',validate:n=>Number.isInteger(n)&&n>=-2147483648&&n<=2147483647});
for(const [f,max] of [['uint',Number.MAX_SAFE_INTEGER],['uint16',65535],['uint64',Number.MAX_SAFE_INTEGER]])ajv.addFormat(f,{type:'number',validate:n=>Number.isSafeInteger(n)&&n>=0&&n<=max});
const code=`import json
from demo_threads import handle,THREAD
samples=[['ThreadResumeResponse',handle('thread/resume',{'threadId':THREAD['id']})],['ThreadListResponse',handle('thread/list',{})],['ThreadReadResponse',handle('thread/read',{'threadId':THREAD['id'],'includeTurns':True})],['ThreadTurnsListResponse',handle('thread/turns/list',{'threadId':THREAD['id'],'itemsView':'full'})]]
print(json.dumps(samples))`;
const samples=JSON.parse(cp.execFileSync('python',['-c',code],{cwd:__dirname,encoding:'utf8'}));
for(const [name,value] of samples){
 const schema=JSON.parse(fs.readFileSync(path.join(__dirname,'protocol/json/v2',name+'.json'),'utf8'));
 const validate=ajv.compile(schema);
 if(!validate(value))throw Error(name+': '+JSON.stringify(validate.errors));
 console.log(name+' validated');
}
