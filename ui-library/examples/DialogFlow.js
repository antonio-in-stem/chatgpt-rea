// Local content state inside the recovered complete modal shell and layout.
import {createMenuEngine} from '../src/MenuEngine.js';
import {createDialog} from '../src/Dialog.js';
import {createDialogSurfaces} from '../src/DialogSurfaces.js';
export function createDialogFlow(React,{ReactDOM,tooltip,AssetIcon,Button}){
 const h=React.createElement,dialog=createDialog({React,primitives:createMenuEngine({React,ReactDOM}).Dialog,tooltip,AssetIcon}),layout=createDialogSurfaces({React,Button});
 return function DialogFlow(){const [expanded,setExpanded]=React.useState(false);return h('section',{'aria-label':'Original dialog example',className:'mt-6'},h('h2',{className:'text-lg font-medium'},'Dialog'),h(dialog.Dialog,{size:'narrow',triggerContent:h(Button,{color:'secondary'},'Open original dialog')},h(layout.DialogBody,null,h(layout.DialogSection,null,h(layout.DialogHeader,{title:h(dialog.DialogTitle,null,'Local dialog example'),subtitle:h(dialog.DialogDescription,null,'Original modal surfaces with local content state.')})),h(layout.DialogSection,null,h('label',null,'Example field',h('input',{'aria-label':'Example field'})),expanded?h('p',null,'Additional local content. This paragraph changes the measured height of the original dialog and exercises its existing resize transition.'):null),h(layout.DialogSection,null,h(layout.DialogFooter,null,h(Button,{onClick:()=>setExpanded(!expanded)},expanded?'Collapse details':'Expand details'),h(dialog.DialogClose,{asChild:true},h(Button,{color:'secondary'},'Done')))))));};
}
