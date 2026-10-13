const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const Ajv=require(process.argv[2]);
const ajv=new Ajv({allErrors:true});
ajv.addFormat('int64',{type:'number',validate:Number.isSafeInteger});
ajv.addFormat('uint32',{type:'number',validate:n=>Number.isInteger(n)&&n>=0&&n<=4294967295});
const code=`import json,tempfile
from pathlib import Path
from demo_projects import ProjectStore
with tempfile.TemporaryDirectory() as directory:
 s=ProjectStore(Path(directory)/'projects.json')
 samples=[]
 result,event=s.handle('project/create',{'name':'Demo','roots':[],'idempotencyKey':'validation'})
 samples.extend([['ProjectCreateResponse',result],['ProjectChangedNotification',event['params']]])
 project_id=result['project']['id']
 for method,schema,params in [('project/read','ProjectReadResponse',{'projectId':project_id}),('project/update','ProjectUpdateResponse',{'projectId':project_id,'name':'Updated'}),('project/list','ProjectListResponse',{}),('project/move','ProjectMoveResponse',{'projectId':project_id}),('project/delete','ProjectDeleteResponse',{'projectId':project_id})]:
  result,event=s.handle(method,params)
  samples.append([schema,result])
  if event:samples.append(['ProjectChangedNotification',event['params']])
 print(json.dumps(samples))`;
const samples=JSON.parse(cp.execFileSync('python',['-c',code],{cwd:__dirname,encoding:'utf8'}));
for(const [name,value] of samples){
 const schema=JSON.parse(fs.readFileSync(path.join(__dirname,'protocol/json/v2',name+'.json'),'utf8'));
 const validate=ajv.compile(schema);
 if(!validate(value))throw Error(name+': '+JSON.stringify(validate.errors));
 console.log(name+' validated');
}
