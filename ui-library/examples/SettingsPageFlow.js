import {createUnsavedSettingsDialog} from '../src/UnsavedSettingsDialog.js';
import {createDialog} from '../src/Dialog.js';
import {createDialogSurfaces} from '../src/DialogSurfaces.js';
import {motion,useTransform} from 'framer-motion';
import {createSettingsContent} from '../src/SettingsContent.js';
import {createSettingsSurfaces} from '../src/SettingsSurfaces.js';
export function createSettingsPageFlow(React,{Button,menu,tooltip,AssetIcon}){
 const h=React.createElement,c=createSettingsContent({React,motion,useTransform,useLayoutEnvironment:()=>{}}),s=createSettingsSurfaces({React});
 const UnsavedSettingsDialog=createUnsavedSettingsDialog({React,dialog:createDialog({React,primitives:menu.DialogPrimitives,tooltip,AssetIcon}),layout:createDialogSurfaces({React,Button}),Button});
 return function SettingsPageFlow(){const [draft,setDraft]=React.useState(''),[saved,setSaved]=React.useState(''),[pending,setPending]=React.useState(null);const [route,setRoute]=React.useState({navigationKey:0,slateLayout:true}),[section,setSection]=React.useState(0);const rows=Array.from({length:18},(_,i)=>h(s.SettingsActionRow,{key:i,label:'Local option '+(i+1),description:'Recovered row within original scrolling content.',onClick:()=>{}}));
 return h('section',{'aria-label':'Original settings content example',className:'mt-6'},h('h2',{className:'text-lg font-medium'},'Settings page content'),h('label',null,'Local draft',h('input',{'aria-label':'Local draft',value:draft,onChange:e=>setDraft(e.target.value)})),h(Button,{onClick:()=>setSaved(draft)},'Save local draft'),h(UnsavedSettingsDialog,{pendingNavigation:pending,onClearPendingNavigation:()=>setPending(null)}),h('div',{className:'flex gap-2'},h(Button,{onClick:()=>setRoute({...route,navigationKey:route.navigationKey+1,targetText:'Local option 18'})},'Find last option'),h(Button,{onClick:()=>{const go=()=>{setDraft(saved);setSection(section+1);setRoute({navigationKey:route.navigationKey+1,slateLayout:true});};if(draft!==saved)setPending(()=>go);else go();}},'Change local section')),h('div',{style:{height:420},'data-settings-content-demo':true},h(c.SettingsNavigationTarget,route,h(c.SettingsContent,{title:'Local section '+section,subtitle:'Original content layout; local rows and navigation controls.',scrollResetKey:section,footer:h('span',null,'Local footer')},h(s.SettingsGroup,null,h(s.SettingsGroup.Header,{title:'Example options'}),h(s.SettingsGroup.Content,null,h(s.SettingsPanel,null,...rows)))))));
 };
}
