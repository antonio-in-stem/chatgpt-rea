// Authored zoom flow using recovered viewer components; not an original viewer screen.
export function createViewerFlow(React,{ViewerControlGroup,ViewerButton,ViewerDivider}){
 const h=React.createElement;
 return function ViewerFlow(){
  const [zoom,setZoom]=React.useState(100);
  return h('section',{'aria-label':'Viewer demo',className:'my-4'},
   h(ViewerControlGroup,{variant:'zoom',label:'Preview zoom'},
    h(ViewerButton,{'aria-label':'Zoom out',disabled:zoom<=50,onClick:()=>setZoom(value=>value-25)},'−'),
    h(ViewerButton,{variant:'zoom','aria-label':'Reset zoom',onClick:()=>setZoom(100)},zoom+'%'),
    h(ViewerDivider),
    h(ViewerButton,{'aria-label':'Zoom in',disabled:zoom>=200,onClick:()=>setZoom(value=>value+25)},'+')),
   h('div',{className:'mt-3 overflow-auto rounded-lg border border-default p-4'},h('p',{style:{fontSize:16*zoom/100},'aria-live':'polite'},'Preview at '+zoom+'%')));
 };
}
