import {createLoadingSurfaces} from '../src/LoadingSurfaces.js';
import {createProfileHelpMenu} from '../src/ProfileHelpMenu.js';
import {motion,AnimatePresence} from 'framer-motion';
import {createProfilePetMenuItem} from '../src/ProfilePetMenuItem.js';
import {createProfileMenuLayout} from '../src/ProfileMenuLayout.js';
// Local demo actions; profile trigger, placement and menu surfaces are recovered.
import {createProfileMenu} from '../src/ProfileMenu.js';
import {createProfileControl} from '../src/ProfileControl.js';
export function createProfileMenuFlow(React,{menu,Tooltip,Button,LegacyButton,Avatar,AssetIcon,ResponsiveIcon,ProfileFooter,KeyboardShortcutsFlow,SettingsFlow}){
 const h=React.createElement,Actions=React.createContext(null);
 const {ProfilePetMenuItem}=createProfilePetMenuItem({React,MenuItem:menu.MenuItem,useStateSnapshot:()=>React.useContext(Actions).petState});
 const loading=createLoadingSurfaces({React});
 const posts=[{id:'demo-1',title:'Local release example',date:'2026-10-12',version:'26.1007.1'},{id:'demo-2',title:'Component behavior example',date:'2026-10-10',version:'26.1006.1'},{id:'demo-3',title:'Interface example',date:'2026-10-08',version:'26.1005.1'}];
 const unavailable=()=>{throw Error('This demo has not integrated this recovered dependency yet');};
 function HelpMenu(){const actions=React.useContext(Actions);const help=React.useMemo(()=>createProfileHelpMenu({React,menu,AssetIcon,ResponsiveIcon,motion,AnimatePresence,DemoBuildItem:unavailable,ExternalLinkIndicator:unavailable,Skeleton:loading.ShimmerLines,Row:loading.ContentRow,useStateSnapshot:()=>React.useContext(Actions).helpState,isFeedEnabled:loading.isFeedEnabled,parseVersion:loading.parseVersion,isNewVersion:loading.isNewVersion,onSelectPost:post=>actions.setStatus('Local release selected: '+post.id),navigate:path=>actions.setStatus('Local route selected: '+path),dispatchCommand:command=>command==='showKeyboardShortcuts'?actions.setShortcutsOpen(true):actions.setStatus('Local command selected: '+command),openDebug:unavailable}),[actions.setStatus]);return h(help.ProfileHelpMenu,{onOpenDocs:()=>actions.setStatus('User guide selected (local demo)'),onOpenWhatsNew:()=>actions.setStatus('Changelog selected (local demo)'),onOpenPrivacyCenter:unavailable,privacyCenterHref:'https://chatgpt.com/privacy-center'});}
 const {ProfileMenuLayout}=createProfileMenuLayout({React,menu,AssetIcon,ResponsiveIcon,HelpMenu,PetMenuItem:ProfilePetMenuItem,useProviderQuery:()=>({data:{model_provider:'openai'}}),providerDisplayName:()=>null,parseProviderInfo:()=>({success:false})});
 function LocalItems(){const {compact,setCompact,selectPhoto,removePhoto,hasPhoto,setStatus,setSettingsOpen,petState,setMini,overlayOpen,setOverlayOpen,newsLoading,setNewsLoading}=React.useContext(Actions);return h(ProfileMenuLayout,{displayName:'Local Profile',isOverlayOpen:overlayOpen,onTogglePet:()=>{setOverlayOpen(!overlayOpen);setStatus('Overlay action toggled (local state; floating window pending)');},onOpenProfile:selectPhoto,onCopyUserId:()=>setStatus('Local user ID: demo'),onOpenSettings:()=>setSettingsOpen(true),onLogOut:()=>setStatus('Log out action selected (local demo; no account session)'),additionalItems:h(React.Fragment,null,
  h(menu.MenuSectionLabel,null,'Local demo actions'),
  h(menu.MenuItem,{onSelect:selectPhoto},'Choose profile photo'),
  h(menu.MenuItem,{disabled:!hasPhoto,onSelect:removePhoto},'Clear profile photo'),
  h(menu.MenuSeparator),h(menu.MenuCheckboxItem,{checked:!compact,onCheckedChange:value=>setCompact(!value),closeOnSelect:true,indicator:'switch'},'Expanded sidebar'),h(menu.MenuCheckboxItem,{checked:petState.miniFeatureEnabled,onCheckedChange:setMini,indicator:'switch'},'Use Mini menu variant'),h(menu.MenuCheckboxItem,{checked:newsLoading,onCheckedChange:setNewsLoading,indicator:'switch'},'Preview news loading'))});
 }
 const profile=createProfileMenu({React,Dropdown:menu.Dropdown,Button,Tooltip,MenuMessage:menu.MenuMessage,ProfileMenuItems:LocalItems,prefetchItems:()=>{}});
 const {ProfileControl}=createProfileControl({React,LegacyButton,Avatar,AssetIcon,ProfileMenu:profile.ProfileMenu,useImageSource:src=>({src,isError:false})});
 return function ProfileMenuFlow(){
  const [settingsOpen,setSettingsOpen]=React.useState(false),[shortcutsOpen,setShortcutsOpen]=React.useState(false),[newsLoading,setNewsLoading]=React.useState(false),[mini,setMini]=React.useState(false),[overlayOpen,setOverlayOpen]=React.useState(false),[status,setStatus]=React.useState(null),[compact,setCompact]=React.useState(true),[file,setFile]=React.useState(null),[url,setUrl]=React.useState(null),input=React.useRef(null);
  React.useEffect(()=>{if(!file){setUrl(null);return;}const next=URL.createObjectURL(file);setUrl(next);return()=>URL.revokeObjectURL(next);},[file]);
  const snapshot={enabled:true,ambientUsageEnabled:true,sidebarWidth:308,auth:{authMethod:'chatgpt',accountId:'demo',userId:'demo',nameAtLogin:'Local Profile'},accountQuery:{data:{id:'demo',structure:'personal',profile_picture_url:url}}};
  return h('section',{'aria-label':'Recovered profile menu example',className:'mt-6'},
   h('h2',{className:'text-lg font-medium'},'Profile menu'),
   h('p',{className:'text-sm text-secondary'},'Recovered profile trigger and dropdown with local demo actions. Original composition with local actions; account gating and destination screens are still being extracted.'),
   h('input',{ref:input,type:'file',accept:'image/*',hidden:true,onChange:event=>{setFile(event.target.files[0]??null);event.target.value='';}}),
   h(Actions.Provider,{value:{setSettingsOpen,setShortcutsOpen,newsLoading,setNewsLoading,helpState:{auth:{authMethod:'chatgpt'},mobileSetupAvailable:true,mobileSetupQuery:{data:false,isLoading:false},features:{'410065390':true},localeQuery:{data:{}},postsQuery:{data:{items:posts},isPending:newsLoading},lastSeenVersion:'26.1006',intl:{locale:'en-US',formatDate:(date,options)=>new Intl.DateTimeFormat('en-US',options).format(date)}},compact,setCompact,setStatus,setMini,overlayOpen,setOverlayOpen,petState:{petVisible:false,miniFeatureEnabled:mini,miniOverrideEnabled:false,hasOrbitAgent:false},hasPhoto:!!file,selectPhoto:()=>input.current.click(),removePhoto:()=>setFile(null)}},
    h(profile.ProfileMenuProvider,{snapshot},h('div',{style:{width:compact?36:308}},h(ProfileFooter,{compact,leading:h(ProfileControl,{snapshot,compact})})))),settingsOpen?h(SettingsFlow,{onOpenChange:setSettingsOpen,onOpenShortcuts:()=>setShortcutsOpen(true)}):null,shortcutsOpen?h(KeyboardShortcutsFlow,{onOpenChange:setShortcutsOpen}):null,status?h('p',{role:'status'},status):null);
 };
}
