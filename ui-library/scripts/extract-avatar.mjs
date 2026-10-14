import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass initial source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const symbols=['M9i','t9i','FMo','IMo','LMo','HMo','UMo','VMo','KMo','qMo','YMo','QMo','$Mo','eNo','tNo','D1'],body=symbols.map(def).join('\n');
const output=`// Generated original avatar image/fallback/shape family.
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
export function createAvatar({React,animate,motionPreference,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!animate)throw new TypeError('Avatar requires original-compatible animate and React compiler runtime');
 const runtime={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
 const e=fn=>fn,J=()=>compilerRuntime,us=()=>React,W=()=>runtime,_0e=()=>{},ip=()=>{},dq=()=>{},Hg=()=>{},Qs=animate,ft=createMotionPreference(React,motionPreference);
 let w1,RMo,zMo,BMo,WMo,T1,GMo,JMo,XMo,ZMo,nNo,rNo,E1,iNo,aNo,oNo;
${body}
 D1();
 return {Avatar:$Mo,AvatarFallback:tNo,AvatarImage:eNo,AvatarShape:HMo,avatarInitials:t9i,avatarColorKey:qMo,avatarShapes:w1};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/Avatar.js'),output);
fs.writeFileSync(path.join(root,'avatar-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols,bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original avatar, image state, initials/color, shapes, sampling, easing and initializer bodies; React/motion/preference imports adapted; compiler cache retained.',limits:['Identity queries and profile menu not included','Browser shape-animation comparison against original pending','Avatar CSS uses existing original initial stylesheet']},null,2)+'\n');
