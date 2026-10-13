// Pji in app-shared: menu-local editable input, not a general form field.
export function createMenuInput(React,mergeClasses) {
 return function MenuInput({onKeyDown,className,...props}) {
  return React.createElement('input',{
   className:mergeClasses('w-full min-w-0 rounded-sm border border-none px-row-x py-row-y text-sm !outline-none',className),
   autoFocus:true,
   onKeyDown:event=>{
    event.stopPropagation();
    if((event.metaKey || event.ctrlKey) && event.key.toLowerCase()==='a') {
     event.preventDefault();event.currentTarget.select();return;
    }
    onKeyDown?.(event);
   },...props});
 };
}
