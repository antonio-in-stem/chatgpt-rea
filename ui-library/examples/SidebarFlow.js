// Authored state controller around recovered sidebar components.
export function createSidebarFlow(React,{SidebarItem,SidebarStatus,StatusPill,SidebarSection,SidebarSectionToggle}) {
 const h=React.createElement;
 return function SidebarFlow() {
  const [collapsed,setCollapsed]=React.useState(false);
  const [selected,setSelected]=React.useState('design'),[unread,setUnread]=React.useState(3);
  const items=[
   {id:'design',label:'Design system with a long title to inspect original scrolling behavior',status:{}},
   {id:'library',label:'Component library',status:{unreadCount:unread}},
   {id:'working',label:'Windows application',status:{type:'loading'}}
  ];
  const rows=items.map(item=>h(SidebarItem,{
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
   h(StatusPill,{label:`Selected: ${selected}`,maxWidth:'container'})
  );
 };
}
