import {classNames,createNavigationList,createSettingsSearch,settingsSearchDocuments,buildSettingsPath,getBrowserSubpage,createSettingsSearchField,createSettingsSearchResults,createSettingsArtworkRegistry,createSettingsSharedArtwork,createSettingsComponentArtwork,createSettingsExtensionArtwork} from '../src/index.js';
// Local orchestration fixture. Recovered input, ranking, result rows and artwork are unchanged.
export function createSettingsSearchFlow(React,ui){
 const h=React.createElement,labels={appearance:'Appearance',voice:'Voice',storage:'Storage','keyboard-shortcuts':'Keyboard shortcuts','browser-use':'Browser','local-environments':'Local environments'};
 const intl={messages:{},formatMessage:(m,v)=>m.id==='settings.search.result.ariaLabel'?`${v.destination}, ${v.panel}`:m.defaultMessage};
 const sharedArtwork={...createSettingsSharedArtwork(ui.AssetIcon),...createSettingsComponentArtwork(React),na:createSettingsExtensionArtwork({React,getBrowserMetadata:()=>null})};
 const {getSectionIcon}=createSettingsArtworkRegistry({React,sharedArtwork});
 const {searchSettings}=createSettingsSearch({getSectionMessage:slug=>({defaultMessage:labels[slug]??slug}),getBrowserSubpage,buildSettingsPath,creatorMicroMessage:{defaultMessage:'Creator Micro'}});
 const targets=Object.keys(labels).map(sectionSlug=>({sectionSlug,messages:settingsSearchDocuments[sectionSlug]??[]}));
 function useAccelerator(config){React.useEffect(()=>{const fn=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='f'&&document.activeElement?.closest('[data-settings-search-demo]'))config.onKeyDown(e);};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);},[config]);}
 const Input=createSettingsSearchField({React,SearchField:ui.SearchField,useAccelerator});
 const unsupported=()=>{throw Error('This local fixture contains no external or team destinations');};
 const Results=createSettingsSearchResults({React,NavigationItem:ui.NavigationItem,NavigationList:createNavigationList({React,mergeClasses:classNames}),usePlatform:()=> 'windows',getSectionIcon,ResponsiveIcon:ui.ResponsiveIcon,prefetchSection:()=>Promise.resolve(),openExternal:unsupported,ExternalLink:unsupported,ExternalIcon:unsupported,securityIcon:sharedArtwork.ri,TeamList:unsupported,formatMessage:intl.formatMessage});
 return function SettingsSearchFlow(){const [query,setQuery]=React.useState(''),[highlight,setHighlight]=React.useState(0),[selected,setSelected]=React.useState(null),listRef=React.useRef(null);
 const results=searchSettings({intl,query,targets,visibleSectionSlugs:Object.keys(labels)}).map(r=>({...r,id:r.sectionSlug,kind:'section',panelSlug:r.sectionSlug}));
 const select=r=>setSelected({label:r.label,path:r.path??buildSettingsPath(r.sectionSlug)});
 const keydown=e=>{if(!results.length)return;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setHighlight(i=>(i+(e.key==='ArrowDown'?1:-1)+results.length)%results.length);}else if(e.key==='Enter'){e.preventDefault();select(results[Math.min(highlight,results.length-1)]);}};
 return h('section',{'data-settings-search-demo':true,'aria-label':'Recovered settings search',className:'mt-6'},h('h2',{className:'text-lg font-medium'},'Settings search'),h('p',{className:'text-secondary text-sm'},'Original search and artwork; six local destinations. Keyboard orchestration is demo glue.'),h(Input,{searchQuery:query,onQueryChange:value=>{setQuery(value);setHighlight(0);},onKeyDown:keydown}),h(Results,{searchResults:results,highlightedIndex:highlight,intl,listRef,onSelectResult:select}),selected?h('p',{role:'status','data-settings-search-selection':true},selected.label+' — '+selected.path):null);
 };
}
