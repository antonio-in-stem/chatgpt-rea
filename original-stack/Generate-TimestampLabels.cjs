const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const source=fs.readFileSync(path.join(__dirname,'state/recovered-all/readable/assets/timestamps-85bd12c0e1b2.js'),'utf8');
const hash=crypto.createHash('sha256').update(source).digest('hex');
if(hash!=='32a74d12511a53f0f089e04e7861ec455f8d660e9cbf1821103b383afc33b7ef')throw Error('Source changed');
process.env.TZ='UTC';
const context=vm.createContext({});
vm.runInContext(source.slice(source.indexOf('function r('),source.indexOf('var o, s;'))+`
const intl={locale:'en-US',formatRelativeTime:(value,unit,options)=>new Intl.RelativeTimeFormat('en-US',options).format(value,unit),formatDate:(date,options)=>new Intl.DateTimeFormat('en-US',{...options,timeZone:'UTC'}).format(date),formatTime:(date,options)=>new Intl.DateTimeFormat('en-US',{...options,timeZone:'UTC'}).format(date)};
`,context);
const nowMs=Date.UTC(2026,9,13,12,30),cases=[];
for(const days of [-2,0,1,2,7,8,365,366])for(const hour of [0,12,23]){
 const sent=new Date(nowMs-days*86400000);sent.setUTCHours(hour,5,0,0);
 context.sentMs=sent.getTime();context.nowMs=nowMs;
 const result=vm.runInContext('a(intl,new Date(sentMs),new Date(nowMs))',context,{timeout:1000});
 cases.push({sentMs:sent.getTime(),nowMs,date:result.date,suffix:(result.includeAt?' at ':' ')+result.time});
}
const output=path.join(__dirname,'../native/crates/native-app/src/timestamp-labels-original.json');
fs.writeFileSync(output,JSON.stringify({sourceReadableSha256:hash,locale:'en-US',timezone:'UTC',cases})+'\n');
console.log(JSON.stringify({cases:cases.length,output}));
