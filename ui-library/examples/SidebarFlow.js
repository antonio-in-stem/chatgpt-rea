// Authored composition of recovered row surface/status primitives; not the full app sidebar.
export function createSidebarFlow(React,{SidebarItem,SidebarStatus,StatusPill}){
const h=React.createElement;
return function SidebarFlow(){
 const [selected,setSelected]=React.useState('design'),[unread,setUnread]=React.useState(3);
 const items=[{id:'design',label:'Design system with a long title to inspect original scrolling behavior',status:{}},{id:'library',label:'Component library',status:{unreadCount:unread}},{id:'working',label:'Windows application',status:{type:'loading'}}];
 return h('nav',{'aria-label':'Sidebar interaction example',className:'mt-6',style:{width:260}},...items.map(item=>h(SidebarItem,{key:item.id,isActive:selected===item.id,onPress:()=>{setSelected(item.id);if(item.id==='library')setUnread(0);},label:item.label,trailingContent:h(SidebarStatus,{statusState:item.status})})),h(StatusPill,{label:`Selected: ${selected}`,maxWidth:'container'}));
};}
