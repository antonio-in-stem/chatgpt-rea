import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const start=source.indexOf('function '+name+'(');if(start<0)throw Error(name);return source.slice(start,start+source.slice(start).search(/^}\r?$/m)+1);};
const extraAssets=['EOi','AOi','MOi'];
const assetInitializers=extraAssets.map(v=>{const i=source.indexOf('('+v+' = Z({');if(i<0)throw Error(v);return source.slice(source.lastIndexOf('function ',i)).match(/^function ([\w$]+)/)[1];});
const symbols=['H5','_Ti','bTi','vTi','IOi',...assetInitializers],body=symbols.map(def).join('\n');
const output=`// Original file icon renderer and legacy SVG family.
import {classNames as q} from './classNames.js';
import {fileIconAssets,textFileIconAssets} from './FileTypeGlyph.js';
import {resolveFileIcon as qEi,describeFileArtwork as YEi} from './fileIconSelection.js';
import {createProviderArtwork} from './ProviderArtwork.js';
export function createFileIcon({React,AssetIcon,useDarkTheme,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!AssetIcon||!useDarkTheme)throw new TypeError('FileIcon requires compiler runtime, AssetIcon and theme hook');
 const {ProviderArtwork:xOi}=createProviderArtwork({React,AssetIcon,useDarkTheme,compilerRuntime});
 const t=fn=>fn,o=()=>{},Q=()=>{},LOi=compilerRuntime,t5=AssetIcon;
 const X5={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},K=()=>X5;
 const Z=asset=>({...asset,body:asset.body.trim(),hasGradients:false});
 let U5,Zwi,Qwi,$wi,eTi,tTi,nTi,rTi,iTi,aTi,oTi,sTi,cTi,lTi,uTi,dTi,fTi,pTi,mTi,hTi,gTi,yTi,EOi,AOi,MOi;
${body}
 bTi();${assetInitializers.map(n=>n+'();').join('')}
 const ROi=fileIconAssets,POi={12:EOi,16:textFileIconAssets[16],20:textFileIconAssets[20],24:AOi,32:MOi};
 return {FileIcon:IOi,legacyFileArtwork:yTi};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/FileIcon.js'),output);
fs.writeFileSync(path.join(root,'file-icon-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols,bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original IOi renderer, H5 SVG wrapper, legacy artwork initializer and lookup, additional text presets. Runtime and reused dependencies explicit; compiler cache retained.',limits:['FileIcon source branches extracted; whole-screen visual parity remains unverified','Caller supplies original metadata; demo still local fixtures']},null,2)+'\n');
