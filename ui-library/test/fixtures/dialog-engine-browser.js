// Primitive interaction harness. Its outer positioning is test-only, not the original tNi shell.
import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import {createMenuEngine} from '../../src/MenuEngine.js';
import {createDialogSurfaces} from '../../src/DialogSurfaces.js';
import {createButton} from '../../src/Button.js';
import {createSpinner} from '../../src/Spinner.js';
import {classNames} from '../../src/classNames.js';
const h=React.createElement,d=createMenuEngine({React,ReactDOM}).Dialog,Button=createButton({React,mergeClasses:classNames,Spinner:createSpinner(React,classNames)}),ui=createDialogSurfaces({React,Button});
export function mount(target){const root=createRoot(target);root.render(h(d.Root,null,h(d.Trigger,{asChild:true},h('button',null,'Open recovered dialog')),h(d.Portal,null,h(d.Overlay,{'data-testid':'modal-overlay',style:{position:'fixed',inset:0,zIndex:100}}),h(d.Content,{style:{position:'fixed',top:100,left:100,width:400,zIndex:101,background:'#222'}},h(ui.DialogBody,null,h(ui.DialogSection,null,h(ui.DialogHeader,{title:h(d.Title,null,'Recovered dialog'),subtitle:h(d.Description,null,'Keyboard interaction fixture')})),h(ui.DialogSection,null,h('label',null,'Modal field',h('input',{'aria-label':'Modal field'}))),h(ui.DialogSection,null,h(ui.DialogFooter,null,h(d.Close,{asChild:true},h(Button,null,'Close recovered dialog')))))))));return()=>root.unmount();}
