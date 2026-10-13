// Semantics recovered from app-shared Vde/q (export vgn), equivalent to clsx concatenation.
function valueToClasses(value) {
  let result='';
  if(typeof value==='string'||typeof value==='number')return ''+value;
  if(typeof value==='object'&&value){
    if(Array.isArray(value))for(const item of value){if(item){const text=valueToClasses(item);if(text)result+=(result?' ':'')+text;}}
    else for(const key in value)if(value[key])result+=(result?' ':'')+key;
  }
  return result;
}
export function classNames(...values){
 let result='';for(const value of values)if(value){const text=valueToClasses(value);if(text)result+=(result?' ':'')+text;}return result;
}
