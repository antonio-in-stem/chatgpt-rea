import {resolveDisplayedOrder,resolveDropTarget,moveItemBefore,moveSelectionBefore,dropPlacement,moveArrayItem} from './sidebarOrder.js';
// q1o controller. Caller owns canonical keys and asynchronous persistence; no service imported.
export function createUseSidebarOrder(React) {
 return function useSidebarOrder({keys,onOrderChange,getSelectedKeys,decodeDragId}) {
  const [dropTarget,setDropTarget]=React.useState(null),[pending,setPending]=React.useState(null);
  const displayedKeys=resolveDisplayedOrder({keys,pending});
  function targetFor(event,pointerY){
   const activeRect=event.active.rect.current.translated,over=event.over;
   if(activeRect==null || over==null)return null;
   if(!decodeDragId)throw new Error('Drag events require decodeDragId for consumer-owned IDs');
   return resolveDropTarget({keys:displayedKeys,activeKey:decodeDragId(event.active.id),overKey:decodeDragId(over.id),placement:dropPlacement({activeRect,pointerY,targetRect:over.rect})});
  }
  function commit(nextKeys){
   if(onOrderChange==null || nextKeys===displayedKeys)return;
   const operation={previousKeys:keys,nextKeys};setPending(operation);
   // The returned promise is exposed so a consumer can handle a persistence failure.
   return onOrderChange({keys,nextKeys}).finally(()=>setPending(current=>current===operation ? null : current));
  }
  const controller={
   handleDragOver(event,pointerY){if(onOrderChange!=null)setDropTarget(targetFor(event,pointerY));},
   handleDragCancel(){setDropTarget(null);},
   handleDragEnd(event,pointerY){
    if(!decodeDragId)throw new Error('Drag events require decodeDragId for consumer-owned IDs');
    const activeKey=decodeDragId(event.active.id),target=targetFor(event,pointerY);setDropTarget(null);
    if(onOrderChange==null || activeKey==null || target==null)return;
    const selection=getSelectedKeys?.(activeKey);
    return commit(selection!=null && selection.length>1 ? moveSelectionBefore({keys:displayedKeys,selectedKeys:new Set(selection),beforeKey:target.beforeKey}) : moveItemBefore({keys:displayedKeys,activeKey,beforeKey:target.beforeKey}));
   },
   moveItem(key,offset){const from=displayedKeys.indexOf(key),to=from+offset;if(from===-1 || to<0 || to>=displayedKeys.length)return;return commit(moveArrayItem(displayedKeys,from,to));}
  };
  return {controller,displayedKeys,dropTarget};
 };
}
