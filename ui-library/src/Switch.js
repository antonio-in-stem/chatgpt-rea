// uji/dji: controlled switch and its visual track; no preference persistence.
export function createSwitches(React,mergeClasses){
 const h=React.createElement,tracks={default:'h-5 w-8',sm:'h-4 w-7'};
 const movement='data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[14px] rtl:data-[state=unchecked]:-translate-x-[2px] rtl:data-[state=checked]:-translate-x-[14px]';
 const thumbs={default:'h-4 w-4 '+movement,sm:'h-3 w-3 '+movement};
 function SwitchTrack({checked,size='default',tone='accent',trackClassName,thumbClassName}){
  const state=checked ? 'checked' : 'unchecked';
  return h('span',{'aria-hidden':true,className:mergeClasses('relative inline-flex shrink-0 items-center rounded-full transition-colors duration-basic ease-out',checked && (tone==='neutral' ? 'bg-text' : 'bg-chart-blue'),!checked && 'bg-text/10',tracks[size],trackClassName),'data-state':state},h('span',{className:mergeClasses('rounded-full border shadow-sm transition-transform duration-basic ease-out data-[state=unchecked]:translate-x-0',tone==='neutral' && checked ? 'border-transparent bg-surface' : 'border-control-thumb-on-accent bg-control-thumb-on-accent',thumbs[size],thumbClassName),'data-state':state}));
 }
 function Switch({checked,onChange,disabled=false,className,id,ariaLabel,size='default',tone='accent',trackClassName,thumbClassName,onClick,...props}){
  return h('button',{type:'button',role:'switch','aria-checked':checked,'aria-label':ariaLabel,id,className:mergeClasses('inline-flex items-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-full',disabled ? 'cursor-not-allowed opacity-60' : 'cursor-interaction',className),'data-state':checked ? 'checked' : 'unchecked',...props,onClick:event=>{onClick?.(event);if(!event.defaultPrevented && !disabled)onChange(!checked);},disabled},h(SwitchTrack,{checked,size,tone,trackClassName,thumbClassName}));
 }
 return {Switch,SwitchTrack};
}
