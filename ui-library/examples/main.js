import {createProfileMenuFlow} from './ProfileMenuFlow.js';
import {createAvatarFlow} from './AvatarFlow.js';
import {createConversationFlow} from './ConversationFlow.js';
import {createViewerFlow} from './ViewerFlow.js';
import {createSearchIcons} from '../src/SearchIcons.js';
import {classNames} from '../src/classNames.js';
import {createSidebarFlow} from './SidebarFlow.js';
import {createSearchFlow} from './SearchFlow.js';
import React from 'react';
import {createRoot} from 'react-dom/client';
import * as ReactDOM from 'react-dom';
import {motion,animate,AnimatePresence,MotionConfig,useMotionValue,LayoutGroup,useIsPresent} from 'framer-motion';
import {createReaUI,createMenu,createLegacyButton,createAvatar,createNavigationRail,createFileIcon,createAttachmentThumbnail,createResourceCards,createComposerContextAction,createTooltip,createComposerActions,createComposerLayout,createAnimatedArtwork,createAnimatedNavigationIcon} from '../src/index.js';
import {createDecisionFlow} from './DecisionFlow.js';
const searchIcons=createSearchIcons(React,classNames);
const AnimatedIcon=createAnimatedNavigationIcon({React,AnimatedIcon:createAnimatedArtwork({React})});
const ui=createReaUI({React,motion,AnimatePresence,MotionConfig,AnimatedIcon});
const {ComposerLayout}=createComposerLayout({React,motion,useMotionValue,useDarkTheme:ui.useDarkTheme,MotionConfig,LayoutGroup,AnimatePresence,useIsPresent});
const tooltip=createTooltip({React,ReactDOM,ShortcutBadge:ui.ShortcutBadge});
const {Tooltip,TooltipProvider}=tooltip;
// Local window event adapter for the original menu dismissal bridge.
const menu=createMenu({React,ReactDOM,motion,AnimatePresence,tooltip,AssetIcon:ui.AssetIcon,eventBridge:{subscribe(name,callback){window.addEventListener(name,callback);return ()=>window.removeEventListener(name,callback);}}});
const composerActions=createComposerActions({React,motion,Spinner:ui.Spinner,ResponsiveIcon:ui.ResponsiveIcon,AssetIcon:ui.AssetIcon,Tooltip,morphingEnabled:true});
const contextActions=createComposerContextAction({React,Button:ui.Button,Tooltip,ShortcutBadge:ui.ShortcutBadge,ResponsiveIcon:ui.ResponsiveIcon,AssetIcon:ui.AssetIcon});
const {Avatar}=createAvatar({React,animate});
const {ProfileFooter}=createNavigationRail({React,SidebarList:ui.SidebarList});
const {LegacyButton}=createLegacyButton({React});
const ProfileMenuFlow=createProfileMenuFlow(React,{menu,Tooltip,Button:ui.Button,LegacyButton,Avatar,AssetIcon:ui.AssetIcon,ResponsiveIcon:ui.ResponsiveIcon,ProfileFooter});
const AvatarFlow=createAvatarFlow(React,{...ui,Button:LegacyButton,Avatar,ProfileFooter});
const {FileIcon}=createFileIcon({React,AssetIcon:ui.AssetIcon,useDarkTheme:ui.useDarkTheme});
const resources=createResourceCards({React,AssetIcon:ui.AssetIcon});
// Authored local image provider; does not emulate the original upload/query service.
function useLocalThumbnailQuery({source}){
 const file=source.file.blob,[result,setResult]=React.useState(null);
 React.useEffect(()=>{const url=URL.createObjectURL(file);setResult({file,data:{dataUrl:url,byteLength:file.size}});return ()=>URL.revokeObjectURL(url);},[file]);
 return {data:result?.file===file?result.data:undefined,isError:false};
}
const thumbnails=createAttachmentThumbnail({React,AttachmentUploadProgress:resources.AttachmentUploadProgress,useThumbnailQuery:useLocalThumbnailQuery,useAccountId:()=> 'local'});
const ConversationFlow=createConversationFlow(React,{...ui,...resources,...thumbnails,FileIcon,...composerActions,...contextActions,ComposerLayout});
const ViewerFlow=createViewerFlow(React,ui);
const SidebarFlow=createSidebarFlow(React,{...ui,...menu});
const SearchFlow=createSearchFlow(React,ui);
const DecisionFlow=createDecisionFlow(React,ui);
function App(){
 const [result,setResult]=React.useState(null),dark=ui.useDarkTheme();
 return React.createElement('main',{className:'mx-auto max-w-xl p-6'},
  React.createElement('h1',{className:'mb-4 text-xl font-medium'},'Reusable decision flow'),
  React.createElement('div',{className:'flex items-center gap-2 mb-4'},React.createElement('label',{htmlFor:'dark-theme'},'Dark theme'),React.createElement(ui.Switch,{id:'dark-theme',ariaLabel:'Dark theme',checked:dark===true,onChange:value=>{document.documentElement.dataset.theme=value ? 'dark' : 'light';}})),
  React.createElement(DecisionFlow,{onConfirm:setResult}),
  result ? React.createElement('p',{role:'status',className:'mt-4'},React.createElement(ui.Badge,{variant:'success'},`Confirmed: ${result.mode}`)) : null,React.createElement(ui.NavigationItem,{label:'Focus project search',icon:searchIcons.Search16,animatedIcon:'sidebar-search',fullWidth:false,onClick:()=>document.getElementById('project-search')?.focus()}),React.createElement('p',{className:'text-secondary text-sm'},'Use ',React.createElement(ui.ShortcutBadge,{keysLabel:'Tab'}),' to move between controls and ',React.createElement(ui.ShortcutBadge,{keysLabel:'Enter'}),' to activate.'),React.createElement(SearchFlow),React.createElement(ViewerFlow),React.createElement(ConversationFlow),React.createElement(SidebarFlow),React.createElement(AvatarFlow),React.createElement(ProfileMenuFlow));
}
createRoot(document.getElementById('root')).render(React.createElement(TooltipProvider,null,React.createElement(App)));
