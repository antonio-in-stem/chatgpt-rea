import {createSearchFlow} from './SearchFlow.js';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {motion} from 'framer-motion';
import {createReaUI} from '../src/index.js';
import {createDecisionFlow} from './DecisionFlow.js';
const ui=createReaUI({React,motion});
const SearchFlow=createSearchFlow(React,ui);
const DecisionFlow=createDecisionFlow(React,ui);
function App(){
 const [result,setResult]=React.useState(null);
 return React.createElement('main',{className:'mx-auto max-w-xl p-6'},
  React.createElement('h1',{className:'mb-4 text-xl font-medium'},'Reusable decision flow'),
  React.createElement(DecisionFlow,{onConfirm:setResult}),
  result ? React.createElement('p',{role:'status',className:'mt-4'},`Confirmed: ${result.mode}`) : null,React.createElement(SearchFlow));
}
createRoot(document.getElementById('root')).render(React.createElement(App));
