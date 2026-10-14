import {createSettingsHostDropdown,createSettingsDropdownButton,createSettingsLocalHostIcon,createSettingsRemoteHostIcon,createSettingsHostSharedArtwork} from '../src/index.js';
// Local fixture connections and selection; presentation and menu are recovered originals.
export function createSettingsHostFlow(React,ui){
 const h=React.createElement,artwork=createSettingsHostSharedArtwork({React,AssetIcon:ui.AssetIcon});
 const RemoteHostIcon=createSettingsRemoteHostIcon({React,...artwork,useHostColor:()=>null,useTheme:()=>ui.useDarkTheme()?'dark':'light',resolveColor:color=>color});
 const {SettingsHostDropdown}=createSettingsHostDropdown({React,...artwork,RemoteHostIcon,LocalIcon:createSettingsLocalHostIcon(React),Dropdown:ui.menu.Dropdown,menu:{Title:ui.menu.MenuTitle,Section:ui.menu.MenuSection,Item:ui.menu.MenuItem},Tooltip:ui.Tooltip,Button:ui.Button,DropdownButton:createSettingsDropdownButton({React,Button:ui.Button})});
 const connections=[{hostId:'demo-remote',displayName:'Demo remote'}];
 return function SettingsHostFlow(){const [host,setHost]=React.useState('local');const props={connectedRemoteConnections:connections,selectedHostId:host,onSelectHost:setHost,showConnectedIndicator:true};return h('section',{'data-settings-host-demo':true,'aria-label':'Recovered host selector'},h('div',{className:'flex items-center gap-2'},h(SettingsHostDropdown,props),h(SettingsHostDropdown,{...props,triggerVariant:'filter'})),h('p',{role:'status','data-settings-host-selection':true},'Local host selection: '+host));};
}
