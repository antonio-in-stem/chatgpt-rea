// Local settings composition using original modal, sections, panels and action rows.
// This is not the installed app's full settings router.
import {createMenuEngine} from '../src/MenuEngine.js';
import {createDialog} from '../src/Dialog.js';
import {createDialogSurfaces} from '../src/DialogSurfaces.js';
import {createSettingsSurfaces} from '../src/SettingsSurfaces.js';
export function createSettingsFlow(React,{ReactDOM,tooltip,AssetIcon,Button,Switch,useDarkTheme}){
 const h=React.createElement,dialog=createDialog({React,primitives:createMenuEngine({React,ReactDOM}).Dialog,tooltip,AssetIcon}),layout=createDialogSurfaces({React,Button}),s=createSettingsSurfaces({React});
 return function SettingsFlow({onOpenChange,onOpenShortcuts}) {
  const dark=useDarkTheme();
  const appearance=h(s.SettingsGroup,null,
   h(s.SettingsGroup.Header,{title:'Appearance'}),
   h(s.SettingsGroup.Content,null,h(s.SettingsPanel,null,
    h(s.SettingsValueRow,{label:h(s.SettingsLabel,{label:'Dark theme',description:'Changes this local example.'}),valueAlignment:'end'},
     h(Switch,{ariaLabel:'Settings dark theme',checked:dark===true,onChange:value=>{document.documentElement.dataset.theme=value?'dark':'light';}})))),
   h(s.SettingsGroup.Footer,null,'Theme selection applies immediately.'));
  const keyboard=h(s.SettingsGroup,null,
   h(s.SettingsGroup.Header,{title:'Keyboard'}),
   h(s.SettingsGroup.Content,null,h(s.SettingsPanel,null,
    h(s.SettingsActionRow,{label:'Keyboard shortcuts',description:'View and search the local command list.',onClick:()=>{onOpenChange(false);onOpenShortcuts();}}))));
  return h(dialog.Dialog,{open:true,onOpenChange,size:'wide'},h(layout.DialogBody,null,
   h(layout.DialogSection,null,h(layout.DialogHeader,{title:h(dialog.DialogTitle,null,'Local preferences'),subtitle:'Recovered settings components with local actions.'})),
   h(layout.DialogSection,null,appearance,keyboard),
   h(layout.DialogSection,null,h(layout.DialogFooter,null,h(dialog.DialogClose,{asChild:true},h(Button,{color:'secondary'},'Done'))))));
 };
}
