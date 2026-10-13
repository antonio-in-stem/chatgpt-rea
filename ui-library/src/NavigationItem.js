import {navClasses as css} from './navigationClasses.js';
// VF in app-initial. Adapters retain specialized artwork and router boundaries.
export function createNavigationItem({React,mergeClasses,Link,ResponsiveIcon,AnimatedIcon,DisclosureIcon,formatMessage=m=>m.defaultMessage}){
 const h=React.createElement;
 function requireAdapter(adapter,name){if(!adapter)throw new Error(`NavigationItem requires ${name} for this variant`);return adapter;}
 return function NavigationItem({animatedIcon,icon,iconAssetSource,thumbnail,label,labelTrailing,layout='default',description,wrapDescription=false,hideLabel,fullWidth=true,hoverBackground=true,isActive=false,activeVariant='default',tone='default',disabled=false,className,weightClassName,iconClassName,trailing,interactiveTrailing,disclosure=false,unread=false,interactive=true,...props}){
  const unreadId=React.useId(),describedBy=unread ? [props['aria-describedby'],unreadId].filter(Boolean).join(' ') : props['aria-describedby'];
  const hasDescription=!hideLabel && description!=null,blocked=disabled || props['aria-disabled']===true || props['aria-disabled']==='true',inverse=tone==='inverse',accent=activeVariant==='accent';
  const selectedBg=accent ? mergeClasses(inverse ? 'before:bg-text-info/10' : 'bg-text-info/10',!blocked && (inverse ? 'hover:before:bg-text-info/15' : 'hover:bg-text-info/15')) : inverse ? 'before:bg-primary-ghost-hover' : 'bg-primary-ghost-hover';
  const selectedText=accent ? 'text-info' : 'text-emphasis',selectedIcon=accent ? 'text-info' : 'text-codex-icon-active';
  const outer=mergeClasses(css.grouped,css.base,interactive && 'cursor-interaction',hasDescription ? 'min-h-[var(--height-token-row)]' : 'h-[var(--nav-item-height,var(--height-token-row))]',fullWidth ? 'flex w-full' : 'inline-flex w-auto',interactiveTrailing==null ? [layout==='summary' ? 'gap-2 px-2 py-1' : 'gap-2 px-[var(--padding-row-cell-x,var(--padding-row-x))] py-row-y',hasDescription && 'group-data-[appearance=grouped]/nav-list:py-1.25'] : 'pe-[var(--padding-row-cell-x,var(--padding-row-x))]',isActive ? selectedBg : !blocked && interactive && hoverBackground && (inverse ? 'hover:before:bg-primary-ghost-hover data-[state=open]:before:bg-primary-ghost-hover' : 'hover:bg-primary-ghost-hover data-[state=open]:bg-primary-ghost-hover'),weightClassName,inverse && css.inverse,className);
  let artwork=null;
  if(iconAssetSource!=null){
   const staticIcon=h(requireAdapter(ResponsiveIcon,'ResponsiveIcon'),{className:mergeClasses(iconClassName,isActive && selectedIcon),icon:iconAssetSource});
   artwork=animatedIcon!=null && icon!=null && !React.isValidElement(icon) ? h(requireAdapter(AnimatedIcon,'AnimatedIcon'),{animation:animatedIcon,className:mergeClasses(iconClassName,isActive && selectedIcon),Icon:icon,staticIcon}) : staticIcon;
  }else if(animatedIcon!=null && icon!=null && !React.isValidElement(icon))artwork=h(requireAdapter(AnimatedIcon,'AnimatedIcon'),{animation:animatedIcon,className:mergeClasses(iconClassName ?? 'icon-xs browser:icon-base',isActive && selectedIcon),Icon:icon});
  else if(React.isValidElement(icon))artwork=icon;
  else if(icon!=null)artwork=h(icon,{className:mergeClasses(iconClassName ?? 'icon-xs browser:icon-base',isActive && selectedIcon)});
  let text;
  if(hideLabel)text=h('span',{className:'sr-only'},label);
  else if(layout==='summary')text=h('span',{className:'flex min-w-0 flex-1 flex-col text-default'},h('span',{className:'flex min-w-0 flex-1 items-start gap-2'},h('span',{className:css.summaryLabel},label),labelTrailing),hasDescription ? h('span',{className:css.summaryDescription},description) : null);
  else if(hasDescription || labelTrailing!=null)text=h('span',{className:mergeClasses(css.descriptionColumn,hasDescription && 'pb-0.5 group-data-[appearance=grouped]/nav-list:pb-0')},h('span',{className:css.labelRow},h('span',{className:'text-fade-truncate flex-1'},label),labelTrailing),hasDescription ? h('span',{className:mergeClasses(css.description,wrapDescription ? 'whitespace-normal break-words' : css.descriptionInline)},description) : null);
  else text=h('span',{className:'text-fade-truncate'},label);
  const content=h('div',{className:mergeClasses(css.content,fullWidth && 'flex-1',hideLabel!==undefined && 'min-h-6',isActive ? selectedText : 'text-default')},thumbnail ?? (artwork==null ? null : h('span',{className:mergeClasses(css.iconSlot,hasDescription && css.iconDescription)},artwork)),text);
  const buttonClass=mergeClasses('focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-[-2px]',interactiveTrailing==null ? outer : [css.innerButton,hasDescription && 'py-row-y group-data-[appearance=grouped]/nav-list:py-1.25',interactive && 'cursor-interaction']);
  const unreadContent=unread ? h(React.Fragment,null,h('span',{'aria-hidden':true,className:'h-1.5 w-1.5 shrink-0 rounded-full bg-blue'}),h('span',{id:unreadId,className:'sr-only'},formatMessage({id:'sidebar.navItem.unread',defaultMessage:'Unread updates',description:'Accessible description for a navigation item with unread updates'}))) : null;
  const body=h(React.Fragment,null,content,interactiveTrailing==null ? trailing : null,unreadContent,disclosure ? h(requireAdapter(DisclosureIcon,'DisclosureIcon'),{className:'text-tertiary'}) : null);
  let control;
  if(!interactive)control=h('div',{className:buttonClass},body);
  else {const common={className:buttonClass,'data-theme':interactiveTrailing==null && inverse ? 'dark' : undefined,'aria-current':isActive ? 'page' : undefined};
   control=props.to!=null ? h(requireAdapter(Link,'Link'),{...common,...props,'aria-describedby':describedBy},body) : h('button',{type:'button',...common,disabled,...props,'aria-describedby':describedBy},body);
  }
  return interactiveTrailing==null ? control : h('div',{className:outer,'data-theme':inverse ? 'dark' : undefined},control,h('div',{className:'flex items-center gap-1'},interactiveTrailing));
 };
}
