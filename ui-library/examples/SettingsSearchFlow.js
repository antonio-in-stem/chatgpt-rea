import {searchableSectionSlugs,orderSettingsSections,settingsSectionOrder,createListNavigation,classNames,createNavigationList,createSettingsSearch,settingsSearchDocuments,buildSettingsPath,getBrowserSubpage,createSettingsSearchField,createSettingsSearchResults,createSettingsArtworkRegistry,createSettingsSharedArtwork,createSettingsComponentArtwork,createSettingsExtensionArtwork} from '../src/index.js';
// Local orchestration fixture. Recovered input, ranking, result rows and artwork are unchanged.
export function createSettingsSearchFlow(React,ui){
 const h=React.createElement,labels={appearance:'Appearance',voice:'Voice',storage:'Storage','keyboard-shortcuts':'Keyboard shortcuts','browser-use':'Browser','local-environments':'Local environments'};
 const intl={messages:{},formatMessage:(m,v)=>m.id==='settings.search.result.ariaLabel'?`${v.destination}, ${v.panel}`:m.defaultMessage};
 const sharedArtwork={...createSettingsSharedArtwork(ui.AssetIcon),...createSettingsComponentArtwork(React),na:createSettingsExtensionArtwork({React,getBrowserMetadata:()=>null})};
 const {getSectionIcon}=createSettingsArtworkRegistry({React,sharedArtwork});
 const {searchSettings}=createSettingsSearch({getSectionMessage:slug=>({defaultMessage:labels[slug]??slug}),getBrowserSubpage,buildSettingsPath,creatorMicroMessage:{defaultMessage:'Creator Micro'}});
 const sections=orderSettingsSections(Object.keys(labels).map(slug=>({slug})),settingsSectionOrder);
 const targets=Object.keys(labels).map(sectionSlug=>({sectionSlug,messages:settingsSearchDocuments[sectionSlug]??[]}));
 function useAccelerator(config){React.useEffect(()=>{const fn=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='f'&&document.activeElement?.closest('[data-settings-search-demo]'))config.onKeyDown(e);};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);},[config]);}
 const Input=createSettingsSearchField({React,SearchField:ui.SearchField,useAccelerator});
 const unsupported=()=>{throw Error('This local fixture contains no external or team destinations');};
 const Results=createSettingsSearchResults({React,NavigationItem:ui.NavigationItem,NavigationList:createNavigationList({React,mergeClasses:classNames}),usePlatform:()=> 'windows',getSectionIcon,ResponsiveIcon:ui.ResponsiveIcon,prefetchSection:()=>Promise.resolve(),openExternal:unsupported,ExternalLink:unsupported,ExternalIcon:unsupported,securityIcon:sharedArtwork.ri,TeamList:unsupported,formatMessage:intl.formatMessage});
 function useStableCallback(fn){const ref=React.useRef(fn);React.useLayoutEffect(()=>{ref.current=fn;},[fn]);return React.useCallback((...args)=>ref.current(...args),[]);}
 const useListNavigation=createListNavigation({React,isMac:()=>false,useStableCallback});
 return function SettingsSearchFlow(){const [query,setQuery]=React.useState(''),[selected,setSelected]=React.useState(null);
 const results=searchSettings({intl,query,targets,visibleSectionSlugs:sections.flatMap(searchableSectionSlugs)}).map(r=>({...r,id:r.sectionSlug,kind:'section',panelSlug:r.sectionSlug}));
 const select=r=>setSelected({label:r.label,path:r.path??buildSettingsPath(r.sectionSlug)});
 const ids=React.useMemo(()=>results.map(r=>r.id),[results.map(r=>r.id).join('\0')]);
 const nav=useListNavigation({items:ids,isActive:query.length>0,autoHighlightFirst:false,onSelect:(_,i)=>select(results[i]),onEscape:()=>setQuery('')});

 return h('section',{'data-settings-search-demo':true,'aria-label':'Recovered settings search',className:'mt-6'},h('h2',{className:'text-lg font-medium'},'Settings search'),h('p',{className:'text-secondary text-sm'},'Original search and artwork; six local destinations. Original list keyboard controller; local destinations.'),h(Input,{searchQuery:query,onQueryChange:setQuery,onKeyDown:nav.handleKeyDown}),h(Results,{searchResults:results,highlightedIndex:nav.highlightedIndex,intl,listRef:nav.listRef,onSelectResult:select}),selected?h('p',{role:'status','data-settings-search-selection':true},selected.label+' — '+selected.path):null);
 };
}
