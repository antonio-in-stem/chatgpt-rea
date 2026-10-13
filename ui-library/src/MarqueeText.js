import {marqueeAnimation} from './marqueeTiming.js';
const css={viewport:'_viewport_a3okg_1',clipViewport:'_clipViewport_a3okg_20',track:'_track_a3okg_28',content:'_content_a3okg_35',overflowingViewport:'_overflowingViewport_a3okg_40',animate:'_animate_a3okg_66',scrolling:'_scrolling_a3okg_66',animateOnGroupHover:'_animateOnGroupHover_a3okg_67',stopAtEnd:'_stopAtEnd_a3okg_73'};
// dRo measurement; dimensions are normalized by the app's visual scale, not devicePixelRatio.
export function measureMarquee(element,scrollMode,scale=1) {
 if(element.checkVisibility?.({contentVisibilityAuto:true})===false)return undefined;
 const content=element.querySelector('[data-marquee-content]');
 const win=element.ownerDocument.defaultView;
 if(!(content instanceof HTMLElement) && !(content instanceof (win ?? window).HTMLElement))return undefined;
 const rect=content.getBoundingClientRect(),normalized=rect.width/scale;
 const contentWidth=normalized>0 ? normalized : content.scrollWidth;
 const outer=element.getBoundingClientRect().width/scale,viewportWidth=outer>0 ? outer : element.clientWidth;
 if(viewportWidth<=0 || contentWidth-viewportWidth<1)return null;
 const style=getComputedStyle(content),parsedFont=Number.parseFloat(style.fontSize),font=Number.isFinite(parsedFont) ? parsedFont : 13;
 const parsedSpeed=Number.parseFloat(style.getPropertyValue('--marquee-speed-em-per-second')),speed=Number.isFinite(parsedSpeed) && parsedSpeed>0 ? parsedSpeed : 2;
 let distance=contentWidth-viewportWidth;
 if(scrollMode==='loop'){
  distance=contentWidth+font*1.15;
  const copy=element.querySelector('[data-marquee-copy]');
  if(copy instanceof HTMLElement){const offset=Math.abs(copy.getBoundingClientRect().left-rect.left)/scale;if(offset>0)distance=offset;}
 }
 return {contentWidth,scrollDistance:distance,speedPxPerSecond:font*speed};
}
export function createMarqueeText({React,mergeClasses,motionPreference='system',visualScale=1}){
 const h=React.createElement;
 const media=typeof window!=='undefined' && typeof window.matchMedia==='function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
 const subscribe=callback=>{media?.addEventListener('change',callback);return ()=>media?.removeEventListener('change',callback);};
 const snapshot=()=>motionPreference==='on' || (motionPreference==='system' && (media?.matches ?? false));
 return function MarqueeText({id,className,animate=false,animateOnGroupHover=false,scrollMode='stop-at-end',children,style,...props}) {
  const reduced=React.useSyncExternalStore(subscribe,snapshot,()=>false),viewport=React.useRef(null),track=React.useRef(null),content=React.useRef(null);
  const [metrics,setMetrics]=React.useState(null);
  const measure=React.useCallback(element=>{if(!element)return;const next=measureMarquee(element,scrollMode,visualScale);if(next===undefined)return;setMetrics(previous=>next===null ? null : previous?.contentWidth===next.contentWidth && previous.scrollDistance===next.scrollDistance && previous.speedPxPerSecond===next.speedPxPerSecond ? previous : next);},[scrollMode]);
  React.useLayoutEffect(()=>{
   const elements=[viewport.current,track.current,content.current].filter(Boolean);
   const observer=typeof ResizeObserver==='undefined' ? null : new ResizeObserver(()=>measure(viewport.current));
   elements.forEach(element=>observer?.observe(element));
   return ()=>observer?.disconnect();
  },[measure]);
  const copyRef=React.useCallback(element=>{const root=element?.closest('[data-marquee-text]');if(root instanceof HTMLElement)measure(root);},[measure]);
  const overflowing=metrics!=null,duplicate=scrollMode==='loop' && overflowing && !reduced;
  const animation=overflowing && !reduced ? marqueeAnimation(metrics.scrollDistance,metrics.speedPxPerSecond,scrollMode) : undefined;
  return h('span',{...props,id,ref:viewport,className:mergeClasses(css.viewport,animate && css.animate,animateOnGroupHover && css.animateOnGroupHover,scrollMode==='stop-at-end' && css.stopAtEnd,className),style,'data-marquee-text':true,'data-marquee-overflowing':overflowing || undefined,'data-marquee-animatable':animation!=null || undefined,draggable:false},
   h('span',{className:mergeClasses(css.clipViewport,overflowing && css.overflowingViewport),style:animation},
    h('span',{ref:track,className:mergeClasses(css.track,animation!=null && css.scrolling)},h('span',{ref:content,className:css.content,'data-marquee-content':true},children),duplicate ? h('span',{ref:copyRef,className:css.content,'aria-hidden':true,'data-marquee-copy':true,inert:true},children) : null)));
 };
}
