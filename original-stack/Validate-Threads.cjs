const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const Ajv=require(process.argv[2]);
const ajv=new Ajv({allErrors:true});
ajv.addFormat('int64',{type:'number',validate:Number.isSafeInteger});
ajv.addFormat('uint32',{type:'number',validate:n=>Number.isInteger(n)&&n>=0&&n<=4294967295});
ajv.addFormat('int32',{type:'number',validate:n=>Number.isInteger(n)&&n>=-2147483648&&n<=2147483647});
for(const [f,max] of [['uint',Number.MAX_SAFE_INTEGER],['uint16',65535],['uint64',Number.MAX_SAFE_INTEGER]])ajv.addFormat(f,{type:'number',validate:n=>Number.isSafeInteger(n)&&n>=0&&n<=max});
const code=`import json
from demo_threads import handle,THREAD,ThreadStore,PINNED_SECTION
from pathlib import Path
import tempfile
from demo_transport import handle_message
samples=[['ThreadResumeResponse',handle('thread/resume',{'threadId':THREAD['id']})],['ThreadListResponse',handle('thread/list',{})],['ThreadReadResponse',handle('thread/read',{'threadId':THREAD['id'],'includeTurns':True})],['ThreadTurnsListResponse',handle('thread/turns/list',{'threadId':THREAD['id'],'itemsView':'full'})]]
with tempfile.TemporaryDirectory() as directory:
 store=ThreadStore(Path(directory)/'thread.json')
 section,_=store.handle('threadSection/create',{'name':'Library','appearance':{'icon':'folder','color':'blue'}})
 samples.append(['ThreadSectionCreateResponse',section])
 updated,_=store.handle('threadSection/update',{'sectionId':section['section']['id'],'name':'Components'})
 samples.append(['ThreadSectionUpdateResponse',updated])
 samples.append(['ThreadSectionListResponse',store.handle('threadSection/list',{})[0]])
 deleted,_=store.handle('threadSection/delete',{'sectionId':section['section']['id']})
 samples.append(['ThreadSectionDeleteResponse',deleted])
 pinned,_=store.handle('thread/section/move',{'threadId':THREAD['id'],'sectionId':PINNED_SECTION})
 samples.extend([['ThreadSectionMoveResponse',pinned],['ThreadSectionListResponse',handle('threadSection/list',{})]])
 started,event=store.handle('thread/start',{'historyMode':'paginated'})
 samples.extend([['ThreadStartResponse',started],['ThreadStartedNotification',event['params']]])
 turn,events=store.handle('turn/start',{'threadId':started['thread']['id'],'input':[{'type':'text','text':'Demo message','text_elements':[]}]})
 samples.append(['TurnStartResponse',turn])
 names={'thread/status/changed':'ThreadStatusChangedNotification','turn/started':'TurnStartedNotification','item/started':'ItemStartedNotification','item/completed':'ItemCompletedNotification','item/agentMessage/delta':'AgentMessageDeltaNotification','turn/completed':'TurnCompletedNotification','thread/name/updated':'ThreadNameUpdatedNotification'}
 samples.extend([[names[e['method']],e['params']] for e in events])
 reverted,event=store.handle('thread/revert',{'threadId':started['thread']['id'],'beforeTurnId':turn['turn']['id']})
 samples.extend([['ThreadRevertResponse',reverted],['ThreadRevertedNotification',event['params']]])
 for method,response_schema,event_schema,params in [('thread/name/set','ThreadSetNameResponse','ThreadNameUpdatedNotification',{'threadId':THREAD['id'],'name':'Renamed Demo'}),('thread/archive','ThreadArchiveResponse','ThreadArchivedNotification',{'threadId':THREAD['id']}),('thread/unarchive','ThreadUnarchiveResponse','ThreadUnarchivedNotification',{'threadId':THREAD['id']})]:
  result,event=store.handle(method,params)
  samples.extend([[response_schema,result],[event_schema,event['params']]])
 for method,rs,ns,params in [('thread/goal/set','ThreadGoalSetResponse','ThreadGoalUpdatedNotification',{'threadId':THREAD['id'],'objective':'Demo goal'}),('thread/goal/clear','ThreadGoalClearResponse','ThreadGoalClearedNotification',{'threadId':THREAD['id']})]:
  result,event=store.handle(method,params)
  samples.extend([[rs,result],[ns,event['params']]])
 legacy=ThreadStore(Path(directory)/'legacy.json')
 rollback,_=legacy.handle('thread/rollback',{'threadId':THREAD['id'],'numTurns':1})
 # Structural Thread wrapper check only; no original legacy rollback schema was exported.
 samples.append(['ThreadReadResponse',rollback])
 result,event=store.handle('thread/fork',{'threadId':THREAD['id'],'lastTurnId':THREAD['turns'][0]['id']})
 samples.extend([['ThreadForkResponse',result],['ThreadStartedNotification',event['params']]])
 streaming=ThreadStore(Path(directory)/'streaming.json',streaming=True)
 started,_=streaming.handle('turn/start',{'threadId':THREAD['id'],'input':[{'type':'text','text':'Interrupt demo'}]})
 stopped,events=streaming.handle('turn/interrupt',{'threadId':THREAD['id'],'turnId':started['turn']['id']})
 samples.append(['TurnInterruptResponse',stopped])
 failed_start,_=streaming.handle('turn/start',{'threadId':THREAD['id'],'input':[{'type':'text','text':'Failure demo'}]})
 failure=streaming.end_failed_turn(THREAD['id'],failed_start['turn']['id'],'Demo failure')
 samples.extend([[names[e['method']],e['params']] for e in failure])
 samples.extend([[names[e['method']],e['params']] for e in events])
samples.append(['ThreadSearchResponse',handle('thread/search',{'searchTerm':'demo'})])
samples.append(['ThreadItemsListResponse',handle('thread/items/list',{'threadId':THREAD['id']})])
samples.append(['ThreadGoalGetResponse',handle('thread/goal/get',{'threadId':THREAD['id']})])
samples.append(['HooksListResponse',handle_message(json.dumps({'id':1,'method':'hooks/list','params':{'cwds':[THREAD['cwd']]}}))[0]['result']])
print(json.dumps(samples))`;
const samples=JSON.parse(cp.execFileSync('python',['-c',code],{cwd:__dirname,encoding:'utf8'}));
for(const [name,value] of samples){
 const schema=JSON.parse(fs.readFileSync(path.join(__dirname,'protocol/json/v2',name+'.json'),'utf8'));
 const validate=ajv.compile(schema);
 if(!validate(value))throw Error(name+': '+JSON.stringify(validate.errors));
 console.log(name+' validated');
}
