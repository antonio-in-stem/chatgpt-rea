// ORo + fYa + ERo: row surface and event routing recovered from app-initial.
export function createSidebarRow(React,mergeClasses) {
 return function SidebarRowSurface({ref,className,children,isActive=false,tone='default',isDisabled=false,isHighlighted=false,multiline=false,onClick,onKeyDown,onPress,hasNavigationLink=false,variant='sidebar',...props}) {
  const inactive=isDisabled || onPress==null;
  const select=event=>{if(!inactive && !event.defaultPrevented && event.target instanceof Node && event.currentTarget.contains(event.target)) onPress?.(event);};
  const activate=event=>{if(!inactive && !event.defaultPrevented && event.currentTarget===event.target && (event.key==='Enter' || event.key===' ')){event.preventDefault();onPress?.(event);}};
  return React.createElement('div',{...props,ref,'data-theme':tone==='inverse' ? 'dark' : undefined,
   className:mergeClasses('group relative cursor-interaction text-sm hover:bg-primary-ghost-hover',
    hasNavigationLink && 'pointer-events-none isolate [&_[data-state]]:pointer-events-auto [&_[role=button]]:pointer-events-auto [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto',
    multiline ? 'min-h-[var(--height-token-row)]' : 'h-[var(--height-token-row)]',
    variant==='sidebar' ? 'sidebar-item focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring has-[[aria-haspopup=menu][aria-expanded=true]]:bg-primary-ghost-hover' : 'rounded-[var(--radius-token-row)] focus-visible:outline-offset-[-2px]',
    (isActive || isHighlighted) && 'bg-primary-ghost-hover',tone==='inverse' && 'bg-surface-elevated-secondary text-default',isDisabled && 'opacity-60',variant==='tableRow' && '!h-9 bg-transparent !px-0 !py-0 hover:bg-transparent',className),
   onClick:event=>{onClick?.(event);const plain=!event.defaultPrevented && event.button===0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;if((!hasNavigationLink || plain) && event.button===0){select(event);if(hasNavigationLink)event.preventDefault();}},
   onKeyDown:event=>{onKeyDown?.(event);activate(event);},role:hasNavigationLink ? 'group' : 'button',tabIndex:hasNavigationLink ? undefined : isDisabled ? -1 : 0,'aria-current':isActive ? 'page' : undefined,'aria-disabled':isDisabled || undefined},children);
 };
}
export function createSidebarIndent(React){return function SidebarIndent({children,indentLevel}){let result=children;for(let i=0;i<indentLevel;i++)result=React.createElement('div',{className:'flex min-w-0 flex-1 ps-4'},result);return result;};}
