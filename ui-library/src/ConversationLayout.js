// GIn/KIn: recovered conversation shell and composer backdrop.
export function createConversationLayout(React,mergeClasses){
 const h=React.createElement;
 function ConversationLayout({header,banner,children,className,bodyClassName,containerRef,floatingPanelWidth,style,tabIndex,...props}){
  // p5 keeps the DOM ref stable while updating its target after commit.
  const target=React.useRef(containerRef);
  React.useInsertionEffect(()=>{target.current=containerRef;},[containerRef]);
  const ref=React.useCallback(node=>{
   const current=target.current;
   if(typeof current==='function') current(node);
   else if(current) current.current=node;
  },[]);
  return h('div',{ref,className:mergeClasses('relative flex h-full flex-col transition-[padding-right] duration-relaxed ease-basic motion-reduce:transition-none',floatingPanelWidth!=null && '@[900px]/app-shell-main-content:pr-[calc(var(--thread-floating-panel-width)+var(--spacing)*5)]',className),style:{...style,'--thread-floating-panel-width':floatingPanelWidth==null ? undefined : `${floatingPanelWidth}px`},tabIndex,...props},
   h('div',{className:'sticky top-0 z-10'},header),
   h('div',{className:mergeClasses('flex min-h-0 flex-1 flex-col',bodyClassName)},
    h('div',{className:'relative mx-auto flex min-h-0 w-full flex-1 flex-col'},banner,h('div',{className:'min-h-0 flex-1'},children))));
 }
 function ComposerBackdrop({part}){
  return h('div',{'aria-hidden':true,className:mergeClasses('pointer-events-none absolute inset-x-0 -top-8 z-0 group-has-[[data-conversation-followup-reserved-hidden=true]]/thread-scroll-layout:top-6 group-has-[[data-in-progress-fixed-content]]/thread-scroll-layout:top-0 group-has-[[data-in-progress-fixed-content]]/thread-scroll-layout:group-has-[[data-conversation-followup-reserved-hidden=true]]/thread-scroll-layout:top-6',part==='fade' ? 'h-8' : 'bottom-0',part==='surface' ? 'mt-8 bg-surface extension:bg-surface-secondary' : ['bg-gradient-to-t from-surface extension:from-surface-secondary',part==null && 'via-surface via-[calc(100%-var(--spacing)*8)] extension:via-surface-secondary'])});
 }
 return {ConversationLayout,ComposerBackdrop};
}
