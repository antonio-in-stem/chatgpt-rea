// Local workspace selection using original browser account surfaces, not the profile's disabled slot.
import {createAccountSurfaces} from '../src/AccountSurfaces.js';
export function createAccountFlow(React,{menu,Avatar,AssetIcon}){
 const h=React.createElement,ui=createAccountSurfaces({React,menu,Avatar,AssetIcon,useImageSource:url=>url});
 const accounts=[{id:'personal',name:'Demo user',structure:'personal',plan_type:'plus'},{id:'team',name:'Demo workspace',structure:'workspace',plan_type:'team'},{id:'education',name:'Demo school',structure:'workspace',plan_type:'k12'}];
 return function AccountFlow(){const [selected,setSelected]=React.useState('personal'),[open,setOpen]=React.useState(false);const current=accounts.find(a=>a.id===selected);const avatar=a=>h(ui.WorkspaceAvatar,{name:a.name,colorKey:a.id,isPersonalWorkspace:a.structure==='personal',imageUrl:null});return h('section',{'aria-label':'Browser workspace surfaces example',className:'mt-6'},
 h('h2',{className:'text-lg font-medium'},'Browser workspace selector'),h('p',{className:'text-sm text-secondary'},'Original browser workspace trigger, labels and avatars; local sample accounts. Session switching remains pending.'),
 h(menu.Dropdown,{triggerButton:h('button',null,'Open browser account example')},h(ui.WorkspaceFlyout,{workspaceIdentity:{label:current.name,subtitle:h(ui.WorkspaceSubtitle,{account:current,hasMultipleWorkspaces:true}),icon:avatar(current)},open,onOpenChange:setOpen},h(menu.MenuRadioGroup,{value:selected,onValueChange:id=>{setSelected(id);setOpen(false);}},...accounts.map(a=>h(menu.MenuRadioItem,{key:a.id,value:a.id,icon:avatar(a),SubText:h(ui.WorkspaceSubtitle,{account:a,hasMultipleWorkspaces:true})},a.name))))),h('output',{'aria-label':'Local selected workspace'},current.name));};
}
