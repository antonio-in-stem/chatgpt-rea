// Original profile controller and dropdown; local action items are a verification adapter.
import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence,animate} from 'framer-motion';
import {createMenu} from '../../src/Menu.js';
import {createTooltip} from '../../src/Tooltip.js';
import {createAssetIcon} from '../../src/AssetIcon.js';
import {createLegacyButton} from '../../src/LegacyButton.js';
import {createProfileMenu} from '../../src/ProfileMenu.js';
import {createProfileControl} from '../../src/ProfileControl.js';
import {createAvatar} from '../../src/Avatar.js';
const h=React.createElement,tooltip=createTooltip({React,ReactDOM}),AssetIcon=createAssetIcon(React),menu=createMenu({React,ReactDOM,motion,AnimatePresence,tooltip,AssetIcon,eventBridge:{subscribe:()=>()=>{}}}),{LegacyButton}=createLegacyButton({React}),{Avatar}=createAvatar({React,animate});
export function mount(target){
 const events=[];window.profileMenuEvents=events;
 const profileMenu=createProfileMenu({React,Dropdown:menu.Dropdown,Button:LegacyButton,Tooltip:tooltip.Tooltip,MenuMessage:menu.MenuMessage,prefetchItems:()=>events.push('prefetch'),onOpen:details=>events.push(details),ProfileMenuItems:({onClose,ambientUsage})=>h(React.Fragment,null,h(menu.MenuMessage,null,ambientUsage?'Matching account usage':'No account usage'),h(menu.MenuItem,{onSelect:()=>{events.push('selected');onClose();}},'Local profile action'))});
 const {ProfileControl}=createProfileControl({React,Avatar,LegacyButton,AssetIcon,ProfileMenu:profileMenu.ProfileMenu,useImageSource:src=>({src,isError:false})});
 function Fixture(){const [compact,setCompact]=React.useState(true);window.setProfileMenuCompact=setCompact;const snapshot={enabled:true,ambientUsageEnabled:true,sidebarWidth:308,auth:{authMethod:'chatgpt',accountId:'a',userId:'u',nameAtLogin:'Local Profile'},accountQuery:{data:{id:'a',structure:'personal'}},usage:{usage:{account_id:'a',user_id:'u'}}};return h(tooltip.TooltipProvider,null,h(profileMenu.ProfileMenuProvider,{snapshot},h('div',{style:{position:'fixed',bottom:20,left:20,width:compact?36:308}},h(ProfileControl,{snapshot,compact}))));}
 const root=createRoot(target);root.render(h(Fixture));return()=>root.unmount();
}
