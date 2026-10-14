import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass readable app-initial source');
const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
function body(name){const i=source.indexOf('function '+name+'(');if(i<0)throw Error('Missing '+name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);}
function expression(start){let depth=0,quote=null;for(let i=start;i<source.length;i++){const c=source[i];if(quote){if(c==='\\'){i++;continue;}if(c===quote)quote=null;continue;}if(c==='`'||c==='"'||c==="'"){quote=c;continue;}if('([{'.includes(c))depth++;else if(')]}'.includes(c)){if(depth===0)return source.slice(start,i);depth--;}else if((c===','||c===';')&&depth===0)return source.slice(start,i);}throw Error('Unclosed SVG');}
const prefix='T7o = ',start=source.indexOf(prefix);if(start<0)throw Error('Missing local icon');const svg=expression(start+prefix.length),remote=body('KRo');
fs.writeFileSync(path.join(root,'src/SettingsHostArtwork.js'),`// Original local SVG and remote host presentation. Host state/theme/color services are caller-owned.
export function createSettingsLocalHostIcon(React){const w7o={jsx:(type,props)=>React.createElement(type,props)};return ${svg};}
export function createSettingsRemoteHostIcon({React,useHostColor,useTheme,resolveColor:HUr,DefaultIcon:Ko,Icon16:ti,Icon20:xme,compilerRuntime=React.__COMPILER_RUNTIME}){
for(const [name,value] of Object.entries({useHostColor,useTheme,resolveColor:HUr}))if(typeof value!=='function')throw new TypeError(name+' adapter required');
const qRo=compilerRuntime,JRo={jsx:(type,props)=>React.createElement(type,props)},$$r=Symbol('host-color'),Zs=(_selector,hostId)=>useHostColor(hostId),nWr=useTheme,rWr=theme=>theme;
${remote}
return KRo;
}
`);
fs.writeFileSync(path.join(root,'settings-host-artwork-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),records:[{symbol:'T7o',kind:'svg-expression',sha256:createHash('sha256').update(svg).digest('hex')},{symbol:'KRo',kind:'function',sha256:createHash('sha256').update(remote).digest('hex')}],limits:['Host color lookup, resolved light/dark theme and palette conversion are explicit adapters','Remote default/16/20 artwork remains injected; no placeholder icon is supplied','No runtime connectivity or screenshot parity claim']},null,2)+'\n');
