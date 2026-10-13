// hxi/gxi/_xi/vxi: read the same root attribute that drives the original CSS.
export function createDarkThemeHook(React){
 const snapshot=()=>{const theme=document.documentElement.dataset.theme;return theme==null ? null : theme==='dark';};
 const serverSnapshot=()=>null;
 const subscribe=callback=>{
  const observer=new MutationObserver(callback);
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  return ()=>observer.disconnect();
 };
 return ()=>React.useSyncExternalStore(subscribe,snapshot,serverSnapshot);
}
