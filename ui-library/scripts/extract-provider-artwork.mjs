import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass shared source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const start=source.indexOf('function '+name+'(');if(start<0)throw Error(name);return source.slice(start,start+source.slice(start).search(/^}\r?$/m)+1);};
const begin=source.indexOf('(wOi = {'),finish=source.indexOf('}));',begin)+1,table=source.slice(begin+7,finish);
const assets=[...new Set([...table.matchAll(/(?:12|16|20|24|32): ([\w$]+)/g)].map(m=>m[1]))];
const initializers=assets.map(symbol=>{const assignment=source.indexOf('('+symbol+' = Z({');if(assignment<0)throw Error(symbol);const start=source.lastIndexOf('function ',assignment);return source.slice(start).match(/^function ([\w$]+)/)[1];});
const symbols=[...initializers,'vOi','bOi','SOi','xOi','c2n'],body=symbols.map(def).join('\n');
const output=`// Generated original provider artwork and dark/light Figma document.
import {classNames as q} from './classNames.js';
export function createProviderArtwork({React,AssetIcon,useDarkTheme,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!compilerRuntime?.c||!AssetIcon||!useDarkTheme)throw new TypeError('Provider artwork requires compiler runtime, AssetIcon and theme hook');
 const t=fn=>fn,Q=()=>{},o=()=>{},K=()=>Y5,COi=compilerRuntime,t5=AssetIcon,hxi=useDarkTheme;
 const Y5={jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
 const Z=asset=>({...asset,body:asset.body.trim(),hasGradients:c2n(asset.body)});
 let ${assets.join(',')},q5,_Oi,J5,yOi;
${body}
${initializers.map(n=>n+'();').join('')}vOi();bOi();
 const wOi=${table};
 return {ProviderArtwork:xOi,FigmaDocumentArtwork:SOi,providerArtworkAssets:wOi};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/ProviderArtwork.js'),output);
fs.writeFileSync(path.join(root,'provider-artwork-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),symbols,assetCount:assets.length,tableSha256:createHash('sha256').update(table).digest('hex'),bodySha256:createHash('sha256').update(body).digest('hex'),transformation:'Original preset initializers, component bodies and gradient detection. JSX/runtime initialization adapted; original compiler cache retained; explicit theme hook.',limits:['ProviderArtwork accepts original artwork keys and sizes; it does not resolve file type','Generic legacy file artwork still separate','Full-screen visual parity unverified']},null,2)+'\n');
