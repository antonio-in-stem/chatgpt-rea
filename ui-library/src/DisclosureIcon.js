// Udr = $(_8n): chevron-right-md-light-16, authored optical alignment.
export function createDisclosureIcon(React,mergeClasses){
 return function DisclosureIcon(props={}){
  const {'aria-hidden':hidden,'aria-label':label,'aria-labelledby':labelledBy,className,focusable,role,style,...rest}=props;
  const named=(label!=null && label!=='') || (labelledBy!=null && labelledBy!=='');
  return React.createElement('svg',{...rest,'aria-hidden':hidden ?? (!named || undefined),'aria-label':label,'aria-labelledby':labelledBy,className:mergeClasses('_Icon_uttcz_1',className),'data-icon-p3':undefined,focusable:focusable ?? 'false',height:16,role:role ?? (named ? 'img' : undefined),style:{...style},viewBox:'0 0 16 16',width:16,xmlns:'http://www.w3.org/2000/svg',dangerouslySetInnerHTML:{__html:"<path d=\"M5.96236 11.6289C5.75734 11.8339 5.75734 12.166 5.96236 12.3711C6.16739 12.5761 6.49953 12.5761 6.70455 12.3711L10.4692 8.60641C10.8039 8.27129 10.8039 7.72863 10.4692 7.39351L6.70455 3.62887C6.49952 3.42384 6.16739 3.42384 5.96236 3.62887C5.75734 3.83389 5.75734 4.16603 5.96236 4.37105L9.59127 7.99996L5.96236 11.6289Z\" fill=\"currentColor\"/>"}});
 };
}
