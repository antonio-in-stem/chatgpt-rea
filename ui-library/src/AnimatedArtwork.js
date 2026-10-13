import {classNames} from './classNames.js';
import {createMotionPreference} from './motionPreference.js';
import {createNavigationFallbackIcons} from './NavigationFallbackIcons.js';
import {createAnimationColorReader,observeAnimationColor,recolorAnimation} from './animationColor.js';
const names=new Set(['hello','loader','memory','sidebar-finances','sidebar-images','sidebar-library','sidebar-more','sidebar-new-chat','sidebar-plugins','sidebar-projects','sidebar-search','sidebar-tasks']);
export function createAnimatedArtwork({React,motionPreference,mergeClasses=classNames}){
 const h=React.createElement,useReducedMotion=createMotionPreference(React,motionPreference),readColor=createAnimationColorReader(),fallbacks=createNavigationFallbackIcons(React),renderers=new Map();
 let svgRenderer;
 // Consumer-side async boundary replaces the app's lazy-loader service.
 class Boundary extends React.Component{
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed ? this.props.fallback : this.props.children;}
 }
 function renderer(name){
  if(!renderers.has(name))renderers.set(name,React.lazy(async()=>{
   svgRenderer ??= import('./SvgLottie.js').then(module=>module.createSvgLottie(React));
   const [{animations},SvgLottie]=await Promise.all([import('../animations/index.js'),svgRenderer]);
   return {default:function ColoredAnimation({color,loop,onComplete,onReady}){
    const animationData=React.useMemo(()=>recolorAnimation(animations[name],color),[color]);
    return h(SvgLottie,{animationData,autoplay:true,className:'pointer-events-none h-full w-full contain-[paint_style_layout_inline-size]',loop,onComplete,onDOMLoaded:onReady});
   }};
  }));
  return renderers.get(name);
 }
 return function AnimatedArtwork({className,animation,animated=true,loop=false,FallbackIcon,fallbackIcon,onComplete,onReady}){
  const ref=React.useRef(null),[color,setColor]=React.useState(),reduced=useReducedMotion();
  React.useEffect(()=>{if(ref.current)return observeAnimationColor(ref.current,value=>React.startTransition(()=>setColor(value)),readColor);},[]);
  const Icon=FallbackIcon ?? fallbacks[animation];
  if(fallbackIcon==null && !Icon)throw new Error('Supply FallbackIcon for non-navigation artwork');
  const fallback=fallbackIcon ?? h(Icon,{className:'h-full w-full'});
  const content=reduced || !animated || !names.has(animation) || color===undefined ? fallback : h(Boundary,{key:animation,fallback},h(React.Suspense,{fallback},h(renderer(animation),{color,loop,onComplete,onReady})));
  return h('div',{ref,className:mergeClasses('h-full w-full',className,'flex items-center justify-center')},content);
 };
}
