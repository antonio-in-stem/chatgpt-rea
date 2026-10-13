const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const Ajv=require(process.argv[2]);
const ajv=new Ajv({allErrors:true,strict:false});
// Schemars numeric format extensions. Restrict wide integers to JS-safe values.
for(const [format,max] of [['uint',Number.MAX_SAFE_INTEGER],['uint16',65535],['uint32',4294967295],['uint64',Number.MAX_SAFE_INTEGER]]){
 ajv.addFormat(format,{type:'number',validate:value=>Number.isSafeInteger(value)&&value>=0&&value<=max});
}
ajv.addFormat('int64',{type:'number',validate:Number.isSafeInteger});
ajv.addFormat('int32',{type:'number',validate:value=>Number.isInteger(value)&&value>=-2147483648&&value<=2147483647});
const fixtureFile=JSON.parse(fs.readFileSync(path.join(__dirname,'demo-fixtures.json'),'utf8'));
const initialize={schema:'v1/InitializeResponse.json'};
const cases={initialize,...fixtureFile};
for(const [method,info] of Object.entries(cases)){
 const response=JSON.parse(cp.execFileSync('python',['-c','import json,sys;from demo_transport import handle_message;print(json.dumps(handle_message(json.dumps({"id":1,"method":sys.argv[1]}))[0]))',method],{cwd:__dirname,encoding:'utf8'}));
 const schema=JSON.parse(fs.readFileSync(info.derivedSchema ? path.join(__dirname,info.derivedSchema) : path.join(__dirname,'protocol/json',info.schema),'utf8'));
 const validate=ajv.compile(schema);
 if(!validate(response.result))throw Error(method+': '+JSON.stringify(validate.errors));
 console.log(method+' matches '+(info.derivedSchema ? info.derivedSchema+' (transcribed from '+info.sourceType+')' : info.schema));
}
