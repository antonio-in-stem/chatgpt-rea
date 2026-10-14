import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import {createMenu} from '../../src/Menu.js';
import {createTooltip} from '../../src/Tooltip.js';
import {createAssetIcon} from '../../src/AssetIcon.js';
const h=React.createElement,tooltip=createTooltip({React,ReactDOM});
const menu=createMenu({React,ReactDOM,tooltip,AssetIcon:createAssetIcon(React),eventBridge:{subscribe(name,cb){window.addEventListener(name,cb);return()=>window.removeEventListener(name,cb);}}});
export function mount(target){const root=createRoot(target);root.render(h(tooltip.TooltipProvider,null,h(menu.Dropdown,{contentAriaLabelledBy:'long-menu-trigger',scrollFade:true,contentMaxHeight:'compact',triggerButton:h('button',{id:'long-menu-trigger'},'Long recovered menu')},...Array.from({length:30},(_,i)=>h(menu.MenuItem,{key:i,onSelect:()=>{}},'Option '+(i+1))))));return()=>root.unmount();}
