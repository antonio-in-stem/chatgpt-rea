// Authored promise adapter and fake accounts around the original replacement dialog.
import {createMenuEngine} from '../src/MenuEngine.js';
import {createDialog} from '../src/Dialog.js';
import {createDialogSurfaces} from '../src/DialogSurfaces.js';
import {createAccountReplacementDialog} from '../src/AccountReplacementDialog.js';
export function createAccountReplacementFlow(React,{ReactDOM,tooltip,AssetIcon,Button,Switch}){
 const h=React.createElement,dialog=createDialog({React,primitives:createMenuEngine({React,ReactDOM}).Dialog,tooltip,AssetIcon}),layout=createDialogSurfaces({React,Button}),accounts=[{sessionToken:'demo-session-one',userId:'demo-one',email:'one@example.test'},{sessionToken:'demo-session-two',userId:'demo-two',name:'Demo Two',phoneNumber:'5551234567'}];
 return function AccountReplacementFlow(){const [open,setOpen]=React.useState(false),[fail,setFail]=React.useState(true),[status,setStatus]=React.useState(''),failRef=React.useRef(fail);failRef.current=fail;
 const {AccountReplacementDialog}=React.useMemo(()=>createAccountReplacementDialog({React,dialog,layout,Button,AssetIcon,logoutAndContinue:async({session})=>{await new Promise(resolve=>setTimeout(resolve,700));if(failRef.current){setFail(false);throw Error('Local demo failure');}setOpen(false);setStatus('Local replacement completed: '+session.userId);}}),[]);
 return h('section',{'aria-label':'Account replacement example',className:'mt-6'},h('h2',{className:'text-lg font-medium'},'Account replacement'),h('p',{className:'text-sm text-secondary'},'Original selection, busy and error states using fake accounts and a local promise.'),h('label',null,'Fail next local attempt ',h(Switch,{ariaLabel:'Fail next local attempt',checked:fail,onChange:setFail})),h(Button,{color:'secondary',onClick:()=>setOpen(true)},'Open account replacement'),status?h('p',{role:'status'},status):null,open?h(AccountReplacementDialog,{accounts,currentSessionToken:'demo-session-one',onClose:()=>setOpen(false),onSessionsChanged:()=>setStatus('Local session list refreshed after failed attempt'),returnHref:'/local-demo'}):null);
 };
}
