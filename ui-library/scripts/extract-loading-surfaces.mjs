import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass recovered initial source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=n=>{const i=source.indexOf('function '+n+'(');if(i<0)throw Error(n);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const start=source.indexOf('var sRt = r('),end=source.indexOf('\n  gRt,',start),seedSegment=source.slice(start,end),seedBody=seedSegment.replace(/,$/,';');
const symbols=['rC','iC','SRt','CRt','xRt','WFc','Bws','Wws','Hws','Jws','Yws','Zws','uq','lq'],body=symbols.map(def).join('\n');
const output=`// Original loading lines, deterministic width generation and content row.
import {t as r} from './BundleRuntime.js';
import {classNames as ng} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
${seedBody}
export function createLoadingSurfaces({React,motionPreference,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c)throw new TypeError('LoadingSurfaces requires the React compiler runtime');
 const h=React.createElement,ERt={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key})},KFc=ERt,wRt=compilerRuntime,GFc=compilerRuntime,ft=createMotionPreference(React,motionPreference),TRt={default:hRt()},DRt=120,e=fn=>fn;
 const E7i=()=>{};let Xws;
 let gRt,_Rt,vRt,yRt,bRt;
${body}
 xRt();Zws();return {ShimmerLines:rC,LoadingShimmer:iC,ContentRow:WFc,shimmerWidths:SRt,isFeedEnabled:Hws,parseVersion:Bws,isNewVersion:Wws};
}
`;
const hash=s=>createHash('sha256').update(s).digest('hex'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
fs.writeFileSync(path.join(root,'src/LoadingSurfaces.js'),output);
fs.writeFileSync(path.join(root,'loading-surfaces-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sha256:hash(source),symbols,bodySha256:hash(body),seedSegmentSha256:hash(seedSegment),transformation:'Original bodies and bundled seedrandom closure preserved; terminal comma replaced with semicolon; React/motion preference injected.',limits:['No whole-window visual parity claim']},null,2)+'\n');
