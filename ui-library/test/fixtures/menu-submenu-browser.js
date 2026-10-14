import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence} from 'framer-motion';
import {createMenu} from '../../src/Menu.js';
import {createTooltip} from '../../src/Tooltip.js';
import {createAssetIcon} from '../../src/AssetIcon.js';
const h=React.createElement,tooltip=createTooltip({React,ReactDOM}),menu=createMenu({React,ReactDOM,motion,AnimatePresence,tooltip,AssetIcon:createAssetIcon(React),eventBridge:{subscribe:()=>()=>{}}});
export function mount(target){function Fixture(){const [selection,setSelection]=React.useState('None');return h(tooltip.TooltipProvider,null,h(menu.Dropdown,{triggerButton:h('button',null,'Nested recovered menu')},h(menu.MenuFlyoutSubmenuItem,{label:'Flyout actions'},h(menu.MenuItem,{onSelect:()=>setSelection('Flyout chosen')},'Choose nested')),h(menu.MenuSubmenuItem,{trigger:h(menu.MenuItem,null,'Inline actions')},h(menu.MenuItem,{onSelect:()=>setSelection('Inline chosen')},'Choose inline'))),h('output',{'aria-label':'Nested selection'},selection));}const root=createRoot(target);root.render(h(Fixture));return()=>root.unmount();}
