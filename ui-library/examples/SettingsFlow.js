import {createLinkShortcutFlow} from './LinkShortcutFlow.js';
import {createSettingsDisclosure} from '../src/SettingsDisclosure.js';
// Local settings composition using original modal, sections, panels and action rows.
// This is not the installed app's full settings router.
import {createDialog} from '../src/Dialog.js';
import {createDialogSurfaces} from '../src/DialogSurfaces.js';
import {createSettingsSurfaces} from '../src/SettingsSurfaces.js';
export function createSettingsFlow(React,{ReactDOM,tooltip,AssetIcon,Button,Switch,useDarkTheme,menu}){
 const h=React.createElement,dialog=createDialog({React,primitives:menu.DialogPrimitives,tooltip,AssetIcon}),layout=createDialogSurfaces({React,Button}),s=createSettingsSurfaces({React});
 const LinkShortcutFlow=createLinkShortcutFlow(React,{settings:s,menu,Button,AssetIcon,Switch});
 const {AdvancedShortcutGroup}=createSettingsDisclosure({React,settings:s,Button,AssetIcon});
 return function SettingsFlow({onOpenChange,onOpenShortcuts}) {
  const dark=useDarkTheme();
  const appearance=h(s.SettingsGroup,null,
   h(s.SettingsGroup.Header,{title:'Appearance'}),
   h(s.SettingsGroup.Content,null,h(s.SettingsPanel,null,
    h(s.SettingsControlRow,{label:'Dark theme',description:'Changes this local example.',control:props=>h(Switch,{...props,checked:dark===true,onChange:value=>{document.documentElement.dataset.theme=value?'dark':'light';}})}),
    ...['light','dark'].map(value=>h(s.SettingsRadioRow,{key:value,id:'local-theme-'+value,name:'local-theme',value,ariaLabel:value==='light'?'Light appearance':'Dark appearance',label:value==='light'?'Light':'Dark',checked:dark===(value==='dark'),indicator:'checkmark',onChange:()=>{document.documentElement.dataset.theme=value;}})))),
   h(s.SettingsGroup.Footer,null,'Theme selection applies immediately.'));
  const keyboard=h(s.SettingsGroup,null,
   h(s.SettingsGroup.Header,{title:'Keyboard'}),
   h(s.SettingsGroup.Content,null,h(s.SettingsPanel,null,
    h(s.SettingsActionRow,{label:'Keyboard shortcuts',description:'View and search the local command list.',onClick:()=>{onOpenChange(false);onOpenShortcuts();}}))));
  return h(dialog.Dialog,{open:true,onOpenChange,size:'wide'},h(layout.DialogBody,null,
   h(layout.DialogSection,null,h(layout.DialogHeader,{title:h(dialog.DialogTitle,null,'Local preferences'),subtitle:'Recovered settings components with local actions.'})),
   h(layout.DialogSection,null,appearance,keyboard,h(LinkShortcutFlow),h(AdvancedShortcutGroup,{shortcut:h(s.SettingsValueRow,{label:'Local shortcut preview'},h(s.ShortcutBadge,{keysLabel:'Ctrl+Shift+D'})),singleTapShortcut:h(s.SettingsValueRow,{label:'Local single-tap preview'},h(s.ShortcutBadge,{keysLabel:'Ctrl+D'}))})),
   h(layout.DialogSection,null,h(layout.DialogFooter,null,h(dialog.DialogClose,{asChild:true},h(Button,{color:'secondary'},'Done'))))));
 };
}
