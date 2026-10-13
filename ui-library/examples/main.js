import {createSearchIcons} from '../src/SearchIcons.js';
import {classNames} from '../src/classNames.js';
import {createSidebarFlow} from './SidebarFlow.js';
import {createSearchFlow} from './SearchFlow.js';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence,MotionConfig} from 'framer-motion';
import {createReaUI} from '../src/index.js';
import {createDecisionFlow} from './DecisionFlow.js';
const searchIcons=createSearchIcons(React,classNames);
const ui=createReaUI({React,motion,AnimatePresence,MotionConfig});
const SidebarFlow=createSidebarFlow(React,ui);
const SearchFlow=createSearchFlow(React,ui);
const DecisionFlow=createDecisionFlow(React,ui);
function App(){
 const [result,setResult]=React.useState(null);
 return React.createElement('main',{className:'mx-auto max-w-xl p-6'},
  React.createElement('h1',{className:'mb-4 text-xl font-medium'},'Reusable decision flow'),
  React.createElement(DecisionFlow,{onConfirm:setResult}),
  result ? React.createElement('p',{role:'status',className:'mt-4'},`Confirmed: ${result.mode}`) : null,React.createElement(ui.NavigationItem,{label:'Focus project search',icon:searchIcons.Search16,fullWidth:false,onClick:()=>document.getElementById('project-search')?.focus()}),React.createElement(SearchFlow),React.createElement(SidebarFlow));
}
createRoot(document.getElementById('root')).render(React.createElement(App));
