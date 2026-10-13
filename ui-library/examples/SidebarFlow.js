// Authored state controller around recovered sidebar components.
export function createSidebarFlow(React,{SidebarItem,SidebarStatus,StatusPill,SidebarSection,SidebarSectionToggle,useSidebarOrder,Button}) {
 const h=React.createElement;
 return function SidebarFlow() {
  const [keys,setKeys]=React.useState(['design','library','working']);
  const {controller,displayedKeys}=useSidebarOrder({keys,onOrderChange:async({nextKeys})=>setKeys(nextKeys)});
  const [collapsed,setCollapsed]=React.useState(false);
  const [selected,setSelected]=React.useState('design'),[unread,setUnread]=React.useState(3);
  const items=[
   {id:'design',label:'Design system with a long title to inspect original scrolling behavior',status:{}},
   {id:'library',label:'Component library',status:{unreadCount:unread}},
   {id:'working',label:'Windows application',status:{type:'loading'}}
  ];
  const rows=displayedKeys.map(key=>items.find(item=>item.id===key)).map(item=>h(SidebarItem,{
   key:item.id,isActive:selected===item.id,label:item.label,
   onPress:()=>{setSelected(item.id);if(item.id==='library')setUnread(0);},
   trailingContent:h(SidebarStatus,{statusState:item.status})
  }));
  return h('nav',{'aria-label':'Sidebar interaction example',className:'mt-6',style:{width:260}},
   h(SidebarSection,{
    collapsed,
    title:h(SidebarSectionToggle,{collapsed,showCollapsedChevron:true,onToggle:()=>setCollapsed(!collapsed)},'Projects'),
    titleTrailing:collapsed ? h(SidebarStatus,{statusState:{unreadCount:unread}}) : null
   },...rows),
   h(StatusPill,{label:`Selected: ${selected}`,maxWidth:'container'}),
   h('div',{className:'flex gap-2 mt-2'},
    h(Button,{color:'secondary',disabled:displayedKeys.indexOf(selected)===0,onClick:()=>controller.moveItem(selected,-1)},'Move up'),
    h(Button,{color:'secondary',disabled:displayedKeys.indexOf(selected)===displayedKeys.length-1,onClick:()=>controller.moveItem(selected,1)},'Move down'))
  );
 };
}
