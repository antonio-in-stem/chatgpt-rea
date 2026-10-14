import {motion,AnimatePresence,MotionConfig,useReducedMotion} from 'framer-motion';
import {createSettingsSidebarIcons} from '../src/SettingsSidebarIcons.js';
import {createSecuritySettingsItem,createExternalDestinationIndicator,createSettingsExternalIcon,createSettingsSidebar,createNavigationSurfaces,createSettingsLabels,searchableSectionSlugs,orderSettingsSections,settingsSectionOrder,createListNavigation,classNames,createNavigationList,createSettingsSearch,settingsSearchDocuments,buildSettingsPath,getBrowserSubpage,createSettingsSearchField,createSettingsSearchResults,createSettingsArtworkRegistry,createSettingsSharedArtwork,createSettingsComponentArtwork,createSettingsExtensionArtwork} from '../src/index.js';
// Local orchestration fixture. Recovered input, ranking, result rows and artwork are unchanged.
export function createSettingsSearchFlow(React,ui){
 const h=React.createElement,labels={appearance:'Appearance',voice:'Voice',storage:'Storage','keyboard-shortcuts':'Keyboard shortcuts','browser-use':'Browser','local-environments':'Local environments'};
 const intl={messages:{},formatMessage:(m,v)=>m.id==='settings.search.result.ariaLabel'?`${v.destination}, ${v.panel}`:m.defaultMessage};
 const originalLabels=createSettingsLabels({React,getBrowserMetadata:()=>null,formatMessage:intl.formatMessage});
 const sharedArtwork={...createSettingsSharedArtwork(ui.AssetIcon),...createSettingsComponentArtwork(React),na:createSettingsExtensionArtwork({React,getBrowserMetadata:()=>null})};
 const {getSectionIcon}=createSettingsArtworkRegistry({React,sharedArtwork});
 const search=createSettingsSearch({getSectionMessage:originalLabels.getSectionMessage,getBrowserSubpage,buildSettingsPath,creatorMicroMessage:originalLabels.creatorMicroMessage});
 const sections=orderSettingsSections(Object.keys(labels).map(slug=>({slug})),settingsSectionOrder);
 const targets=Object.keys(labels).map(sectionSlug=>({sectionSlug,messages:settingsSearchDocuments[sectionSlug]??[]}));
 function useAccelerator(config){React.useEffect(()=>{const fn=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='f'&&document.activeElement?.closest('[data-settings-search-demo]'))config.onKeyDown(e);};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);},[config]);}
 const Input=createSettingsSearchField({React,SearchField:ui.SearchField,useAccelerator});
 const unsupported=()=>{throw Error('This local fixture contains no team destinations');};
 const ExternalIcon=createSettingsExternalIcon(React);
 const ExternalLink=createExternalDestinationIndicator({React,ExternalIcon,BrowserIcon:getSectionIcon('browser-use','windows').component,useOpenTarget:options=>{if(options.openTarget!=='external-browser')throw Error('Unexpected destination policy in local security fixture');return options.openTarget;}});
 const securitySettings={message:{id:'settings.nav.securitySettings',defaultMessage:'Security Settings'},icon:sharedArtwork.ri,href:'https://chatgpt.com/open-security-settings'};
 function useStableCallback(fn){const ref=React.useRef(fn);React.useLayoutEffect(()=>{ref.current=fn;},[fn]);return React.useCallback((...args)=>ref.current(...args),[]);}
 const useListNavigation=createListNavigation({React,isMac:()=>false,useStableCallback});
 const surfaces=createNavigationSurfaces({React,mergeClasses:classNames,motion,AnimatePresence,MotionConfig,useReducedMotion,useVisualScale:()=>1});
 const snapshot={store:{},embedded:true,platform:'windows',authMethod:'local'},empty=[];
 function buildSidebar(openExternal){
 const Results=createSettingsSearchResults({React,NavigationItem:ui.NavigationItem,NavigationList:createNavigationList({React,mergeClasses:classNames}),usePlatform:()=> 'windows',getSectionIcon,ResponsiveIcon:ui.ResponsiveIcon,prefetchSection:()=>Promise.resolve(),openExternal,ExternalLink,ExternalIcon,securityIcon:sharedArtwork.ri,TeamList:unsupported,formatMessage:intl.formatMessage});
 const SecurityItem=createSecuritySettingsItem({React,NavigationItem:ui.NavigationItem,Tooltip:ui.Tooltip,ExternalLink,ExternalIcon,securitySettings,openExternalEvent:openExternal,formatMessage:intl.formatMessage});
 const Sidebar=createSettingsSidebar({React,components:{...surfaces,NavigationItem:ui.NavigationItem,ResponsiveIcon:ui.ResponsiveIcon,Tooltip:ui.Tooltip,SettingsSearchField:Input,SettingsSearchResults:Results,SecuritySettingsItem:SecurityItem,TeamList:unsupported,Button:ui.Button},labels:originalLabels,search,useListNavigation,useSnapshot:()=>snapshot,usePluginViews:()=>empty,useQuery:()=>({data:empty}),useSearchTargets:()=>targets,pluginRoutes:{},prefetchSection:()=>Promise.resolve(),openExternal,openExternalEvent:openExternal,securitySettings,icons:{...createSettingsSidebarIcons(React),getSectionIcon},mergeClasses:classNames,formatMessage:intl.formatMessage,defaultHostId:'local'});
return Sidebar;
}
 return function SettingsSearchFlow(){const [selected,setSelected]=React.useState('appearance'),[external,setExternal]=React.useState(null);const Sidebar=React.useMemo(()=>buildSidebar(payload=>setExternal(payload.href)),[]);return h('section',{'data-settings-search-demo':true,'aria-label':'Recovered settings sidebar',className:'mt-6'},h('p',{className:'text-secondary text-sm'},'Original settings sidebar; local section destinations and empty service queries.'),h('div',{style:{height:440,width:300,display:'flex'}},h(Sidebar,{settingsSections:sections,searchTargets:targets,activeSection:selected,canCollapse:true,groupSettingsSections:true,securitySettingsEnabled:true,onSelect:slug=>setSelected(slug)})),h('p',{role:'status','data-settings-search-selection':true},h(originalLabels.SettingsSectionTitle,{slug:selected}),' — '+buildSettingsPath(selected)),external?h('p',{'data-settings-external-selection':true,role:'status'},'Local external action: '+external):null);};
}
