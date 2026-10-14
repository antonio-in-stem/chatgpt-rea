import {createViewerFlow} from './ViewerFlow.js';
import {createSearchIcons} from '../src/SearchIcons.js';
import {classNames} from '../src/classNames.js';
import {createSidebarFlow} from './SidebarFlow.js';
import {createSearchFlow} from './SearchFlow.js';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence,MotionConfig} from 'framer-motion';
import {createReaUI,createAnimatedArtwork,createAnimatedNavigationIcon} from '../src/index.js';
import {createDecisionFlow} from './DecisionFlow.js';
const searchIcons=createSearchIcons(React,classNames);
const AnimatedIcon=createAnimatedNavigationIcon({React,AnimatedIcon:createAnimatedArtwork({React})});
const ui=createReaUI({React,motion,AnimatePresence,MotionConfig,AnimatedIcon});
const ViewerFlow=createViewerFlow(React,ui);
const SidebarFlow=createSidebarFlow(React,ui);
const SearchFlow=createSearchFlow(React,ui);
const DecisionFlow=createDecisionFlow(React,ui);
function App(){
 const [result,setResult]=React.useState(null),dark=ui.useDarkTheme();
 return React.createElement('main',{className:'mx-auto max-w-xl p-6'},
  React.createElement('h1',{className:'mb-4 text-xl font-medium'},'Reusable decision flow'),
  React.createElement('div',{className:'flex items-center gap-2 mb-4'},React.createElement('label',{htmlFor:'dark-theme'},'Dark theme'),React.createElement(ui.Switch,{id:'dark-theme',ariaLabel:'Dark theme',checked:dark===true,onChange:value=>{document.documentElement.dataset.theme=value ? 'dark' : 'light';}})),
  React.createElement(DecisionFlow,{onConfirm:setResult}),
  result ? React.createElement('p',{role:'status',className:'mt-4'},React.createElement(ui.Badge,{variant:'success'},`Confirmed: ${result.mode}`)) : null,React.createElement(ui.NavigationItem,{label:'Focus project search',icon:searchIcons.Search16,animatedIcon:'sidebar-search',fullWidth:false,onClick:()=>document.getElementById('project-search')?.focus()}),React.createElement('p',{className:'text-secondary text-sm'},'Use ',React.createElement(ui.ShortcutBadge,{keysLabel:'Tab'}),' to move between controls and ',React.createElement(ui.ShortcutBadge,{keysLabel:'Enter'}),' to activate.'),React.createElement(SearchFlow),React.createElement(ViewerFlow),React.createElement(SidebarFlow));
}
createRoot(document.getElementById('root')).render(React.createElement(App));
