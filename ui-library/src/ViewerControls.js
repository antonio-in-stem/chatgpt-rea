// c9/CRi: viewer-specific skins around the recovered shared Button.
export function createViewerControls({React,Button,mergeClasses}){
 function ViewerButton({className,variant='default',uniform,...props}){
  const classes=mergeClasses('_button_1gips_2','_controlSurface_1gips_2',variant==='primary' && '_primary_1gips_2',variant==='selected' && '_selected_1gips_2',(variant==='dropdown' || variant==='zoom') && '_dropdown_1gips_2',variant==='zoom' && '_zoom_1gips_2',variant==='label' && '_label_1gips_2',variant==='avatarGroup' && '_avatarGroup_1gips_2',variant!=='primary' && 'disabled:text-disabled disabled:opacity-100 aria-disabled:text-disabled aria-disabled:opacity-100',className);
  return React.createElement(Button,{className:classes,unstyled:true,uniform,...props});
 }
 function ViewerControl({className,color='ghostActive',uniform,...props}){
  return React.createElement(Button,{className:mergeClasses('_control_1gips_2',className),color,radius:'full',uniform,...props});
 }
 return {ViewerButton,ViewerControl};
}
