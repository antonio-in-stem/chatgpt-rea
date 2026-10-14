// Local command descriptors drive the original Codex shortcut dialog presentation.
import {createMenuEngine} from '../src/MenuEngine.js';
import {createDialog} from '../src/Dialog.js';
import {createDialogSurfaces} from '../src/DialogSurfaces.js';
import {createSettingsSurfaces} from '../src/SettingsSurfaces.js';
import {createShortcutSearchInput} from '../src/ShortcutSearchInput.js';
import {createKeyboardShortcuts} from '../src/KeyboardShortcuts.js';
export function createKeyboardShortcutsFlow(React,{ReactDOM,tooltip,AssetIcon,Button,SearchField}){
 const h=React.createElement,dialog=createDialog({React,primitives:createMenuEngine({React,ReactDOM}).Dialog,tooltip,AssetIcon}),layout=createDialogSurfaces({React,Button}),settings=createSettingsSurfaces({React}),ShortcutSearchInput=createShortcutSearchInput({React,SearchField});
 const {KeyboardShortcutsDialog}=createKeyboardShortcuts({React,dialog,layout,...settings,ShortcutSearchInput});
 const items=[{id:'demoNewChat',title:'New chat',description:'Start a local conversation',sectionKey:'thread',shortcutLabels:['Ctrl+N']},{id:'demoSearch',title:'Search projects',description:'Find a local project',sectionKey:'navigation',shortcutLabels:['Ctrl+K']},{id:'demoSidebar',title:'Toggle sidebar',description:'Show or hide navigation',sectionKey:'panels',shortcutLabels:['Ctrl+B']},{id:'demoShortcuts',title:'Keyboard shortcuts',description:'Show this command list',sectionKey:'general',shortcutLabels:['Ctrl+/']}];
 return function KeyboardShortcutsFlow({onOpenChange}){return h(KeyboardShortcutsDialog,{items,onOpenChange});};
}
