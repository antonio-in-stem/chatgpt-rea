// Verification harness: menu click adapter is not the recovered dropdown.
import React from 'react';
import {createRoot} from 'react-dom/client';
import {animate} from 'framer-motion';
import {createAvatar} from '../../src/Avatar.js';
import {createAssetIcon} from '../../src/AssetIcon.js';
import {createLegacyButton} from '../../src/LegacyButton.js';
import {createProfileControl} from '../../src/ProfileControl.js';
import {createNavigationRail} from '../../src/NavigationRail.js';
const h=React.createElement,{Avatar}=createAvatar({React,animate}),{LegacyButton}=createLegacyButton({React});
const {ProfileFooter}=createNavigationRail({React,SidebarList:'div'});
function MenuAdapter({triggerButton}){const [open,setOpen]=React.useState(false);return React.cloneElement(triggerButton,{'aria-expanded':open,onClick:()=>setOpen(!open)});}
const {ProfileControl}=createProfileControl({React,Avatar,LegacyButton,AssetIcon:createAssetIcon(React),ProfileMenu:MenuAdapter,useImageSource:src=>({src,isError:false})});
export function mount(target){
 function Fixture(){const [snapshot,setSnapshot]=React.useState({auth:{authMethod:'chatgpt',accountId:'a',userId:'u',nameAtLogin:'Demo User'},accountQuery:{data:{structure:'personal'}}}),[compact,setCompact]=React.useState(true);window.setProfileSnapshot=setSnapshot;window.setProfileCompact=setCompact;return h(ProfileFooter,{compact,leading:h(ProfileControl,{snapshot,compact})});}
 const root=createRoot(target);root.render(h(Fixture));return()=>root.unmount();
}
