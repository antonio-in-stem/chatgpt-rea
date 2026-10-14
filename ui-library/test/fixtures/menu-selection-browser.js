import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import {createMenu} from '../../src/Menu.js';
import {createTooltip} from '../../src/Tooltip.js';
import {createAssetIcon} from '../../src/AssetIcon.js';
const h=React.createElement,tooltip=createTooltip({React,ReactDOM}),menu=createMenu({React,ReactDOM,tooltip,AssetIcon:createAssetIcon(React),eventBridge:{subscribe:()=>()=>{}}});
export function mount(target){function Fixture(){const [checked,setChecked]=React.useState(false),[choice,setChoice]=React.useState('one');return h(tooltip.TooltipProvider,null,h(menu.Dropdown,{triggerButton:h('button',null,'Selection menu')},h(menu.MenuCheckboxItem,{checked,onCheckedChange:setChecked},'Toggle selection'),h(menu.MenuRadioGroup,{value:choice,onValueChange:setChoice},h(menu.MenuRadioItem,{value:'one',variant:'chatgpt'},'Choice one'),h(menu.MenuRadioItem,{value:'two',variant:'chatgpt'},'Choice two'))));}const root=createRoot(target);root.render(h(Fixture));return()=>root.unmount();}
