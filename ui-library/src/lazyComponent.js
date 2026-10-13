// oxi (gk): shared in-flight load, one 200ms retry, optional prefetch and error fallback.
export function createLazyComponentFactory({React,reportLoadError=()=>{},schedule=(callback,delay)=>setTimeout(callback,delay)}){
 return function lazyComponent(load,{fallback=null,suspendToParent=false,errorFallback=null,propagateLoadError=false}={}){
  let pending,prefetched,prefetchPromise;
  const resolve=()=>pending ??= Promise.resolve().then(load).catch(error=>{pending=undefined;throw error;});
  const Lazy=React.lazy(async()=>{
   try{return {default:await resolve()};}catch{await new Promise(done=>schedule(done,200));}
   try{return {default:await resolve()};}catch(error){
    if(propagateLoadError)throw error;
    reportLoadError(error instanceof Error ? error : Error('Failed to load lazy component',{cause:error}),{tags:{operation:'lazy-component-load'}});
    return {default:props=>typeof errorFallback==='function' ? errorFallback(props,error) : errorFallback};
   }
  });
  function Component(props){
   const [Loaded]=React.useState(()=>prefetched);
   const child=React.createElement(Loaded==null ? Lazy : Loaded,{...props});
   return suspendToParent ? child : React.createElement(React.Suspense,{fallback},child);
  }
  return Object.assign(Component,{prefetch(){return prefetchPromise ??= resolve().then(value=>{prefetched=value;},()=>undefined);}});
 };
}
