import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw Error('Pass initial source');
const source=fs.readFileSync(process.argv[2],'utf8');
const def=name=>{const i=source.indexOf('function '+name+'(');if(i<0)throw Error(name);return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);};
const rail=def('D2o'),footer=def('y2o');
const literals=[...rail.matchAll(/`([^`]+)`/g)].map(m=>m[1]);
const get=prefix=>{const found=literals.find(v=>v.startsWith(prefix));if(found==null)throw Error(prefix);return found;};
const classes={root:get('group/sidebar-rail relative'),codexSurface:get('bg-surface-secondary electron:bg-transparent browser:'),surface:literals.find(v=>v==='bg-surface-secondary electron:bg-transparent'),top:get('pt-[calc('),bottom:get('[[data-app-shell-page-surface=true]_&]:pb-1'),border:get('pointer-events-none absolute inset-y-0'),list:get('vertical-scroll-fade-mask hide-scrollbar')};
const output=`// Layout-only semantic extraction of D2o; original y2o footer body retained.
import {classNames as ng} from './classNames.js';
export const navigationRailClasses=${JSON.stringify(classes,null,2)};
export function createNavigationRail({React,SidebarList,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!SidebarList||!compilerRuntime?.c)throw new TypeError('Rail requires original SidebarList and compiler runtime');
 const h=React.createElement,b2o=compilerRuntime,x2o={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
${footer}
 function NavigationRail({header,children,footer,codex=false,ariaLabel='App navigation',railRef}){
  const c=navigationRailClasses;
  return h('nav',{ref:railRef,className:ng(c.root,codex?c.codexSurface:c.surface,c.top,c.bottom),'data-app-navigation-rail':true,'aria-label':ariaLabel},
   h('div',{'aria-hidden':'true',className:ng(c.border,codex&&'electron:hidden')}),header,
   h(SidebarList,{className:ng(c.list,codex&&'browser:gap-y-4'),itemSpacing:'rail'},children),footer);
 }
 return {NavigationRail,ProfileFooter:y2o};
}
`;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');fs.writeFileSync(path.join(root,'src/NavigationRail.js'),output);
fs.writeFileSync(path.join(root,'navigation-rail-manifest.json'),JSON.stringify({source:path.basename(process.argv[2]),sourceSha256:createHash('sha256').update(source).digest('hex'),footerSymbol:'y2o',footerSha256:createHash('sha256').update(footer).digest('hex'),layoutSymbol:'D2o',layoutSha256:createHash('sha256').update(rail).digest('hex'),classes,transformation:'Footer function body unchanged. Rail presentation subtree semantically extracted: original classes, DOM order, landmark and list spacing; destinations/header/footer explicit slots.',limits:['Not complete D2o controller: drag sensors, destination visibility, menu actions and width-store reporting are not extracted here','ProfileFooter arranges supplied identity and controls; avatar/menu component still separate','No fallback settings glyph is inserted for missing identity','Full window shell and visual comparison pending']},null,2)+'\n');
