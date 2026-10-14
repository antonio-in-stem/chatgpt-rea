// Local demo actions; profile trigger, placement and menu surfaces are recovered.
import {createProfileMenu} from '../src/ProfileMenu.js';
import {createProfileControl} from '../src/ProfileControl.js';
export function createProfileMenuFlow(React,{menu,Tooltip,Button,LegacyButton,Avatar,AssetIcon,ProfileFooter}){
 const h=React.createElement,Actions=React.createContext(null);
 function LocalItems(){const {compact,setCompact,selectPhoto,removePhoto,hasPhoto}=React.useContext(Actions);return h(React.Fragment,null,
  h(menu.MenuSectionLabel,null,'Local demo actions'),
  h(menu.MenuItem,{onSelect:selectPhoto},'Choose profile photo'),
  h(menu.MenuItem,{disabled:!hasPhoto,onSelect:removePhoto},'Clear profile photo'),
  h(menu.MenuSeparator),h(menu.MenuCheckboxItem,{checked:!compact,onCheckedChange:value=>setCompact(!value),closeOnSelect:true,indicator:'switch'},'Expanded sidebar'));
 }
 const profile=createProfileMenu({React,Dropdown:menu.Dropdown,Button,Tooltip,MenuMessage:menu.MenuMessage,ProfileMenuItems:LocalItems,prefetchItems:()=>{}});
 const {ProfileControl}=createProfileControl({React,LegacyButton,Avatar,AssetIcon,ProfileMenu:profile.ProfileMenu,useImageSource:src=>({src,isError:false})});
 return function ProfileMenuFlow(){
  const [compact,setCompact]=React.useState(true),[file,setFile]=React.useState(null),[url,setUrl]=React.useState(null),input=React.useRef(null);
  React.useEffect(()=>{if(!file){setUrl(null);return;}const next=URL.createObjectURL(file);setUrl(next);return()=>URL.revokeObjectURL(next);},[file]);
  const snapshot={enabled:true,ambientUsageEnabled:true,sidebarWidth:308,auth:{authMethod:'chatgpt',accountId:'demo',userId:'demo',nameAtLogin:'Local Profile'},accountQuery:{data:{id:'demo',structure:'personal',profile_picture_url:url}}};
  return h('section',{'aria-label':'Recovered profile menu example',className:'mt-6'},
   h('h2',{className:'text-lg font-medium'},'Profile menu'),
   h('p',{className:'text-sm text-secondary'},'Recovered profile trigger and dropdown with local demo actions. Original account-menu options are still being extracted.'),
   h('input',{ref:input,type:'file',accept:'image/*',hidden:true,onChange:event=>{setFile(event.target.files[0]??null);event.target.value='';}}),
   h(Actions.Provider,{value:{compact,setCompact,hasPhoto:!!file,selectPhoto:()=>input.current.click(),removePhoto:()=>setFile(null)}},
    h(profile.ProfileMenuProvider,{snapshot},h('div',{style:{width:compact?36:308}},h(ProfileFooter,{compact,leading:h(ProfileControl,{snapshot,compact})})))));
 };
}
