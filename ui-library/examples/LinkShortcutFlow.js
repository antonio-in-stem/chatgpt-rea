// Explicit local persistence demo for the original preference row.
import {createLinkShortcutPreference} from '../src/LinkShortcutPreference.js';
export function createLinkShortcutFlow(React,{settings,menu,Button,AssetIcon,Switch}){
 const h=React.createElement,Store=React.createContext(null);
 const formatMessage=(message,values)=>{
  const key=message.id.split('.').at(-1),mac=values?.platform==='macOS';
  return ({primary:mac?'⌘+Click':'Ctrl+Click',alt:mac?'⌥+Click':'Alt+Click','primaryShift':mac?'⇧⌘+Click':'Ctrl+Shift+Click'})[key]??message.defaultMessage;
 };
 const {LinkShortcutPreference}=createLinkShortcutPreference({React,settings,menu,Button,AssetIcon,formatMessage,usePreferenceStore:()=>React.useContext(Store),saveShortcut:async(store,value)=>{await new Promise(resolve=>setTimeout(resolve,700));if(store.failNext){store.setFailNext(false);throw Error('Local simulated save failure');}store.setShortcut(value);}});
 return function LinkShortcutFlow(){const [shortcut,setShortcut]=React.useState('primary'),[failNext,setFailNext]=React.useState(false);return h(Store.Provider,{value:{shortcut,setShortcut,failNext,setFailNext}},h(settings.SettingsGroup,null,h(settings.SettingsGroup.Header,{title:'Browser links'}),h(settings.SettingsGroup.Content,null,h(settings.SettingsPanel,null,h(LinkShortcutPreference,{platform:'Windows',shortcut}))),h(settings.SettingsGroup.Footer,null,h('label',null,h(Switch,{ariaLabel:'Simulate next local save failure',checked:failNext,onChange:setFailNext}),' Simulate next local save failure'))));};
}
