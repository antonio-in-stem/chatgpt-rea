// Visual branch of Ft. Caller supplies resolved account/feature state and rendered content.
export function createUserMessageBubble(React,mergeClasses){
 const h=React.createElement;
 return function UserMessageBubble({children,alignment='end',accentColor,compact=false,otherUser=false,temporary=false,hasText=true}){
  return h('div',{'data-user-message-bubble':true,className:mergeClasses('bg-user-message text-user-message min-w-0 max-w-(--user-chat-width) overflow-hidden break-words px-(--thread-content-margin) [&_.contain-inline-size]:[contain:initial]','_bubble_11evq_1',alignment==='start' && '_leadingBubble_11evq_7',compact && '_compactMessageBubble_11evq_15',otherUser && '_otherUserMessage_11evq_39',accentColor!=null && '_accentedBubble_11evq_44',compact ? 'py-2' : 'py-2.5',temporary ? '_temporaryBubble_11evq_58' : 'rounded-2xl',!hasText && 'leading-none','relative text-start'),style:{'--user-message-accent-color':accentColor}},
   temporary ? h('svg',{'aria-hidden':'true',className:'pointer-events-none absolute inset-0 h-full w-full _temporaryOutline_11evq_64',focusable:'false'},h('rect',{x:'0.5',y:'0.5',width:'calc(100% - 1px)',height:'calc(100% - 1px)',fill:'none',stroke:'currentColor',strokeOpacity:'0.4',strokeWidth:'1',strokeDasharray:'8 8',vectorEffect:'non-scaling-stroke'})) : null,children);
 };
}
