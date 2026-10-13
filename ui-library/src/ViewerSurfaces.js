// TRi/ERi/DRi: original viewer toolbar containers, not a new layout theme.
export function createViewerSurfaces(React,mergeClasses){
 const h=React.createElement;
 function ViewerCapsule({className,variant='default',...props}){
  return h('div',{className:mergeClasses('_capsule_1gips_2','_controlSurface_1gips_2',variant==='input' && '_inputSurface_1gips_2','rounded-full',className),...props});
 }
 function ViewerControlGroup({hideWhenEmpty=false,children,label,shrink=false,variant='default'}){
  return h(ViewerCapsule,{'aria-label':label,className:mergeClasses('_group_1gips_2',variant==='joined' && '_joined_1gips_2',variant==='zoom' && '_zoomGroup_1gips_2',hideWhenEmpty && 'empty:hidden','inline-flex items-center border-0 text-default',shrink ? 'min-w-0' : 'shrink-0',(variant==='joined' || variant==='zoom') && 'gap-0'),role:'group'},children);
 }
 function ViewerDivider(){return h('span',{'aria-hidden':true,className:'_divider_1gips_2'});}
 return {ViewerCapsule,ViewerControlGroup,ViewerDivider};
}
