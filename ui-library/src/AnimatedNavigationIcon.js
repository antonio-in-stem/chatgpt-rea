import {createNavigationFallbackIcons} from './NavigationFallbackIcons.js';
import {classNames} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
// par: controls activation only. Supply the original renderer and static glyph registry.
export function createAnimatedNavigationIcon({React,AnimatedIcon,fallbackIcons=createNavigationFallbackIcons(React),motionPreference,mergeClasses=classNames}){
 if(!AnimatedIcon)throw new TypeError('AnimatedIcon renderer is required');
 const h=React.createElement,useReducedMotion=createMotionPreference(React,motionPreference);
 return function AnimatedNavigationIcon({className,animation,Icon,staticIcon}){
  const FallbackIcon=(animation==null ? undefined : fallbackIcons[animation]) ?? Icon;
  const ref=React.useRef(null),[state,setState]=React.useState('idle'),reduced=useReducedMotion();
  const reset=React.useCallback(()=>setState('idle'),[]);
  const ready=React.useCallback(()=>setState(previous=>previous==='loading' ? 'ready' : previous),[]);
  React.useEffect(()=>{
   const target=ref.current?.closest('button, [role="menuitem"]');
   if(target==null || animation==null || reduced)return;
   let timer=null;
   const cancel=()=>{if(timer!=null){window.clearTimeout(timer);timer=null;}};
   const start=()=>setState(previous=>previous==='idle' ? 'loading' : previous);
   const enter=event=>{if(event.pointerType==='mouse'){cancel();timer=window.setTimeout(()=>{timer=null;start();},300);}};
   const focus=()=>{if(target.matches(':focus-visible')){cancel();start();}};
   const leave=()=>{cancel();reset();};
   target.addEventListener('blur',leave);target.addEventListener('focus',focus);
   target.addEventListener('pointerenter',enter);target.addEventListener('pointerleave',leave);
   return ()=>{cancel();target.removeEventListener('blur',leave);target.removeEventListener('focus',focus);target.removeEventListener('pointerenter',enter);target.removeEventListener('pointerleave',leave);};
  },[animation,reset,reduced]);
  const active=state!=='idle' && !reduced;
  return h('span',{ref,'aria-hidden':true,className:mergeClasses('relative inline-flex shrink-0',className)},
   h('span',{className:mergeClasses(staticIcon==null ? 'absolute inset-0 size-full' : 'inline-flex',active && state==='ready' && 'invisible')},staticIcon ?? h(FallbackIcon,{className:'size-full'})),
   active && animation!=null ? h(AnimatedIcon,{className:mergeClasses('absolute inset-0 size-full',state!=='ready' && 'invisible'),FallbackIcon,fallbackIcon:staticIcon,animation,onComplete:reset,onReady:ready}) : null);
 };
}
