// Q1/FRo/IRo/LRo/zRo in app-initial. State priority follows the shipped renderer.
export function createSidebarStatus({React,Spinner,mergeClasses,formatMessage=m=>m.defaultMessage}) {
 const h=React.createElement;
 function UnreadCount({count}){return h('div',{className:'relative flex h-5 min-w-5 shrink-0 items-center justify-center'},h('span',{className:'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] leading-none font-semibold',style:{backgroundColor:'color-mix(in srgb, var(--color-text-info) 18%, transparent)',boxShadow:'inset 0 0 0 1px color-mix(in srgb, var(--color-text-info) 72%, transparent)',color:'var(--color-text-info)'}},count>99 ? '99+' : count));}
 function UnreadDot(){return h('div',{className:'relative flex size-5 shrink-0 items-center justify-center text-codex-description'},h('span',{className:'icon-xs relative scale-50'},h('span',{className:'absolute inset-0 rounded-full bg-info-solid'})));}
 function Working({size}){return h('div',{className:'relative flex size-5 shrink-0 items-center justify-center text-text/70',role:'status','aria-label':formatMessage({id:'taskRow.working',defaultMessage:'Working',description:'Accessible label for the spinner beside a task that is running or publishing its Cloud environment'})},h(Spinner,{className:size==='compact' ? 'icon-xs shrink-0' : 'size-5 shrink-0'}));}
 function SidebarStatus({statusState,size='compact'}){
  if((statusState.unreadCount ?? 0)>0)return h(UnreadCount,{count:statusState.unreadCount ?? 0});
  if(statusState.type==='loading')return h(Working,{size});
  if(statusState.unread===true)return h(UnreadDot,{});
  return null;
 }
 function StatusPill({label,maxWidth='inline',tone='approval'}){return h('span',{className:mergeClasses('inline-flex min-w-0 items-center overflow-hidden rounded-full py-0.5 pe-2.5 ps-2 text-sm',tone==='approval' ? 'bg-chart-green/20 text-chart-green' : 'bg-blue/15 text-blue',maxWidth==='container' ? 'max-w-full' : 'max-w-[150px]')},h('span',{className:'min-w-0 truncate'},label));}
 return {SidebarStatus,StatusPill};
}
