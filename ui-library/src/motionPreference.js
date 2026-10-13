// Adapter for the source app preference (on/off/system); no account store dependency.
export function createMotionPreference(React,preference='system'){
 const media=typeof window!=='undefined' && typeof window.matchMedia==='function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
 const subscribe=callback=>{media?.addEventListener('change',callback);return ()=>media?.removeEventListener('change',callback);};
 const snapshot=()=>preference==='on' || (preference==='system' && (media?.matches ?? false));
 return ()=>React.useSyncExternalStore(subscribe,snapshot,()=>false);
}
