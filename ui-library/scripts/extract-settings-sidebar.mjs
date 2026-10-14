import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';
const input=process.argv[2];if(!input)throw Error('Pass settings-page source');const source=fs.readFileSync(input,'utf8'),root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const names=['Or','kr','Ar','jr','Mr','Nr','Pr','Fr','Ir','Lr','Rr','zr','Br','Gr','Kr','qr'];const body=names.map(n=>{const i=source.indexOf('function '+n+'(');return source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1);}).join('\n');
fs.writeFileSync(path.join(root,'src/SettingsSidebar.js'),`// Original complete sidebar controller body. Service and host operations are explicit adapters.
import {settingsSectionGroups,settingsSectionOrder} from './SettingsSections.js';
import {shortcutMatchScore as It} from './ShortcutMatching.js';
export function createSettingsSidebar({React,components,labels,search,useListNavigation,useSnapshot,usePluginViews,useQuery,useSearchTargets,pluginRoutes,prefetchSection,openExternal,openExternalEvent,securitySettings,icons,mergeClasses,formatMessage,defaultHostId,compilerRuntime=React.__COMPILER_RUNTIME}){
const h=React.createElement,Jr=compilerRuntime,Xr=React,Q={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)},B=props=>formatMessage(props,props.values),intl={formatMessage},ye=()=>intl;
const ee=()=>useSnapshot().store,te=null,c=()=>useSnapshot().embedded,se=null,Ae=()=>({platform:useSnapshot().platform}),Te=()=>({authMethod:useSnapshot().authMethod}),ie=(_,host)=>usePluginViews(host),mt=null,re=defaultHostId,Ee=useQuery,yr=useSearchTargets;
const {hosted:Ye,plugin:Ge,isRemoteServer:pe,resolveSource:kt,source:Yt,resolved:zt}=pluginRoutes;
const {searchSettings:Qn,resolveSettingsDestination:lr}=search,{getSectionMessage:et,SettingsNavigationLabel:ut,creatorMicroMessage}=labels,Tt={creatorMicro:creatorMicroMessage};
const {NavigationItem:vt,ResponsiveIcon:Ne,Tooltip:s,NavigationHeader:Ze,NavigationHeaderRow:qe,NavigationHeading:lt,NavigationSection:tt,SettingsSearchField:Ur,SettingsSearchResults:Wr,SecuritySettingsItem:Vr,TeamList:qn,Button:u}=components;
const {getSectionIcon:gn,Back16:Pe,Back20:De,External:ct,ActivePet:zn,Expand:Gn,Collapse:Hn}=icons;
const rn=prefetchSection,Qe=openExternal,_t=openExternalEvent,hn={securitySettings},Ve=mergeClasses,$t=useListNavigation,$r=settingsSectionOrder,ei=settingsSectionGroups;
const Zr={back:{id:'settings.nav.back',defaultMessage:'Back to app'},collapseSidebar:{id:'settings.nav.collapseSidebar',defaultMessage:'Collapse settings navigation'},expandSidebar:{id:'settings.nav.expandSidebar',defaultMessage:'Expand settings navigation'}},ti={collapsed:{icon:Gn,message:Zr.expandSidebar},expanded:{icon:Hn,message:Zr.collapseSidebar}};
// Equivalent uniqBy adapter: original call sites deduplicate by path or panel slug.
const Yr={default:(items,key)=>{const seen=new Set();return items.filter(item=>{const id=typeof key==='function'?key(item):item[key];if(seen.has(id))return false;seen.add(id);return true;});}};
${body}
return Or;
}
`);
fs.writeFileSync(path.join(root,'settings-sidebar-manifest.json'),JSON.stringify({source:path.basename(input),sha256:createHash('sha256').update(source).digest('hex'),symbols:names,adapters:['Resolved host state and plugin views','Query/search-target hooks and plugin route resolution','Original recovered components labels artwork and list controller','Prefetch and external navigation','Localization and uniqBy'],limits:['Factory extraction needs host adapter integration','Original visibility provider runs upstream','Full installed-window visual parity remains unverified']},null,2)+'\n');
