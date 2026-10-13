// Execute only the recovered pure selection functions, never the app runtime.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const sourcePath=path.join(__dirname,'state/recovered-all/readable/assets/timestamps-85bd12c0e1b2.js');
const source=fs.readFileSync(sourcePath,'utf8');
const hash=crypto.createHash('sha256').update(source).digest('hex');
if(hash!=='32a74d12511a53f0f089e04e7861ec455f8d660e9cbf1821103b383afc33b7ef')throw Error('Recovered source changed; review extraction before regenerating');
const begin=source.indexOf('function t('),end=source.indexOf('function r(');
const initialization=source.match(/\(\(o = ([^)]*)\), \(s = ([^)]*)\)\);/);
if(begin<0||end<=begin||!initialization)throw Error('Original function boundaries/constants missing');
const context=vm.createContext({});
vm.runInContext(source.slice(begin,end)+`const o=${initialization[1]},s=${initialization[2]};`,context,{timeout:1000});
let seed=0x517ac39;
const next=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed;};
const roles=['user','assistant','system'],times=[null,-3600001,-1,0,1,599999,600000,600001,3599999,3600000,3600001,7200001];
const cases=[];
for(let index=0;index<384;index++){
 const groups=Array.from({length:next()%9},()=>next()%7===0?null:Array.from({length:next()%6},()=>({role:roles[next()%3],sentAtMs:times[next()%times.length],breaksPreviousAdjacency:next()%5===0})));
 const nowMs=times[1+next()%(times.length-1)];
 context.groups=groups;context.nowMs=nowMs;
 const expected=vm.runInContext('t(groups,nowMs)',context,{timeout:1000});
 cases.push({groups,nowMs,expected});
}
const result={source:'timestamps-85bd12c0e1b2.js',sourceReadableSha256:hash,scope:'Recovered t/n functions and their original o/s constants; integer finite milliseconds only',cases};
const output=path.join(__dirname,'../native/crates/native-core/tests/fixtures/timestamps-original.json');
fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(result)+'\n');
console.log(JSON.stringify({cases:cases.length,output,sourceReadableSha256:hash}));

// Probe the exact original local projection. N is supplied as a normalized
// eligibility input; this does not validate classification of voice/history rows.
const localPath=path.join(__dirname,'state/recovered-all/readable/assets/local-conversation-thread-turn-entries-a91ee5eaba74.js');
const localSource=fs.readFileSync(localPath,'utf8');
const localHash=crypto.createHash('sha256').update(localSource).digest('hex');
if(localHash!=='362214ffd6ef4fc0db3157e14e14d0925ad493a1f9d39cf5f4e99612c7ee1a14')throw Error('Local turn source changed');
const localStart=localSource.indexOf('B.map((e) => {',localSource.indexOf('q = ie('));
const localEnd=localSource.indexOf('\n      }),',localStart)+'\n      })'.length;
if(localStart<0||localEnd<=localStart)throw Error('Local projection not found');
const projection=localSource.slice(localStart,localEnd);
vm.runInContext('const N=e=>e.eligible;',context);
const localCases=[];
for(let index=0;index<384;index++){
 const entries=Array.from({length:next()%9},()=>{
  const eligible=next()%9!==0,isAeonThread=next()%11===0,preserveServerUserMessages=next()%13===0,missingTurn=next()%7===0;
  const hasUserInput=next()%3!==0,hasAgentMessage=next()%3!==0;
  const turnStartedAtMs=times[next()%times.length],finalAssistantStartedAtMs=times[next()%times.length];
  return {eligible,isAeonThread,preserveServerUserMessages,turn:missingTurn?null:{params:{input:hasUserInput?[{}]:[]},items:hasAgentMessage?[{type:'agentMessage'}]:[{type:'commandExecution'}],turnStartedAtMs,finalAssistantStartedAtMs}};
 });
 const nowMs=7200001;context.B=entries;context.nowMs=nowMs;
 const expected=vm.runInContext(`t(${projection},nowMs)`,context,{timeout:1000});
 localCases.push({entries,nowMs,expected});
}
const localOutput=path.join(path.dirname(output),'local-timestamps-original.json');
fs.writeFileSync(localOutput,JSON.stringify({sourceReadableSha256:localHash,projectionStartLine:481,projectionEndLine:491,scope:'Original B.map projection and t/n; N eligibility supplied, not inferred',cases:localCases})+'\n');
console.log(JSON.stringify({localCases:localCases.length,output:localOutput}));
