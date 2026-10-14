// Raw original-engine fixture; app surface/controller integration is tested separately.
import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import {createMenuEngine} from '../../src/MenuEngine.js';
const h=React.createElement,M=createMenuEngine({React,ReactDOM});
export function mount(target){
 function Fixture(){const [selection,setSelection]=React.useState('None');return h(React.Fragment,null,h(M.Root,{modal:false},h(M.Trigger,null,'Open engine menu'),h(M.Portal,null,h(M.Content,{'aria-label':'Engine menu',sideOffset:4},h(M.Item,{onSelect:()=>setSelection('First')},'First action'),h(M.Item,{disabled:true},'Disabled action'),h(M.Item,{onSelect:()=>setSelection('Last')},'Last action')))),h('output',{'aria-label':'Engine selection'},selection));}
 const root=createRoot(target);root.render(h(Fixture));return()=>root.unmount();
}
