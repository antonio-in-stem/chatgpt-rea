// Y4o + vZ row assembly. Navigation, drag controller and actions belong to the consumer.
export function createSidebarItem({React,mergeClasses,SidebarRowSurface,SidebarIndent,MarqueeText}){
 const h=React.createElement;
 return function SidebarItem({ref,className,actions,ariaLabel,ariaExpanded,disclosure,dragHandleListeners,dragHandleRef,icon,indentLevel=0,isActive=false,isDisabled=false,label,onPress,trailingContent,...props}) {
  const labelId=React.useId();
  const stop=disclosure==null ? undefined : event=>event.stopPropagation();
  const leading=h('div',{className:'flex shrink-0 items-center ps-1 pe-1 browser:pe-0'},h('span',{className:'-mx-[3px] flex icon-leading-slot size-[var(--height-token-row)] shrink-0 items-center justify-center browser:-mx-0.5',role:'presentation',onClick:stop,onPointerDown:stop},disclosure ?? icon));
  const labelContent=h('div',{ref:dragHandleRef,className:mergeClasses('flex min-w-0 flex-1 items-center gap-2 whitespace-nowrap rounded-md py-1 pe-0 text-start text-base',isDisabled ? 'text-codex-description' : 'text-default',dragHandleListeners!=null && 'cursor-interaction'),...dragHandleListeners},
   h('span',{id:labelId,className:'flex min-w-0 flex-1 items-center gap-0.5'},h(MarqueeText,{className:'select-none',animateOnGroupHover:true},label)),
   h('span',{className:'me-2 flex min-w-5 shrink-0 items-center justify-center empty:hidden'},trailingContent));
  return h(SidebarRowSurface,{...props,ref,className:mergeClasses('sidebar-row-focus group/folder-row flex items-center justify-between overflow-hidden text-default [contain-intrinsic-block-size:auto_var(--height-token-row)] [content-visibility:auto]',isDisabled && 'text-codex-description',className),isActive,isDisabled,onPress,'aria-label':ariaLabel,'aria-labelledby':ariaLabel==null ? labelId : undefined,'aria-expanded':ariaExpanded},
   h(SidebarIndent,{indentLevel},h('div',{className:'flex min-w-0 flex-1 items-center'},leading,labelContent)),actions);
 };
}
