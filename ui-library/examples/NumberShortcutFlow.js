import {createNumberShortcutPreference} from '../src/NumberShortcutPreference.js';
import {createSettingsDropdownButton} from '../src/SettingsDropdownButton.js';
// Local keymap flags exercise original states; no real shortcut resolver or registration.
export function createNumberShortcutFlow(React,{settings,menu,Button,Switch}){
 const h=React.createElement,Context=React.createContext(null),DropdownButton=createSettingsDropdownButton({React,Button});
 const {NumberShortcutPreference}=createNumberShortcutPreference({React,settings,menu,DropdownButton,useStateSnapshot:()=>React.useContext(Context),saveTarget:async(store,value)=>{await new Promise(resolve=>setTimeout(resolve,500));store.setTarget(value);},hasNumberConflicts:({keymapState})=>keymapState.demoConflict,formatMessage:(message,values={})=>message.defaultMessage.replace(/\{(primary|secondary)\}/g,(_,key)=>values[key])});
 return function NumberShortcutFlow(){const [target,setTarget]=React.useState('sidebar'),[conflict,setConflict]=React.useState(false);return h(Context.Provider,{value:{store:{setTarget},target,platform:'Windows',keymapState:{bindings:[],demoConflict:conflict}}},h(settings.SettingsPanel,null,h(NumberShortcutPreference),h(settings.SettingsControlRow,{label:'Preview local conflict notice',control:props=>h(Switch,{...props,checked:conflict,onChange:setConflict})})));};
}
