// Authored local profile-edit flow around original avatar/footer components.
export function createAvatarFlow(React,{Avatar,ProfileFooter,Button,SegmentedControl}){
 const h=React.createElement;
 return function AvatarFlow(){
  const [file,setFile]=React.useState(null),[url,setUrl]=React.useState(null),[shape,setShape]=React.useState('circle'),[error,setError]=React.useState(false),[hovered,setHovered]=React.useState(false),input=React.useRef(null);
  React.useEffect(()=>{if(!file){setUrl(null);return;}const value=URL.createObjectURL(file);setUrl(value);return ()=>URL.revokeObjectURL(value);},[file]);
  return h('section',{className:'mt-6','aria-label':'Local profile example'},
   h('h2',{className:'text-lg font-medium'},'Local profile'),
   h('p',{className:'text-sm text-secondary'},'Local photo editing using recovered avatar and footer components.'),
   h(ProfileFooter,{compact:true,leading:h('span',{onMouseEnter:()=>setHovered(true),onMouseLeave:()=>setHovered(false)},h(Avatar,{name:'Demo User',colorKey:'demo-user',alt:'Demo User avatar',src:url,shape,animateShape:true,hovered,fadeIn:true,size:'sm',loadingFallback:h('span',{role:'status'},'Loading photo'),onImageError:()=>setError(true)}))}),
   h('input',{ref:input,type:'file',accept:'image/*',hidden:true,onChange:event=>{const selected=event.target.files[0];event.target.value='';setError(false);setFile(selected??null);}}),
   h('div',{className:'flex gap-2 my-2'},h(Button,{color:'secondary',onClick:()=>input.current.click()},'Change demo photo'),h(Button,{color:'secondary',disabled:!file,onClick:()=>{setFile(null);setError(false);}},'Remove demo photo')),
   error?h('p',{role:'status'},'Photo could not load; showing the original initials fallback.'):null,
   h(SegmentedControl,{ariaLabel:'Avatar shape',size:'compact',options:['circle','blossom','square','oval','scalloped'].map(id=>({id,label:id})),selectedId:shape,onSelect:setShape}));
 };
}
