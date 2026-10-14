// Authored local flow connecting recovered surfaces; not an original conversation screen.
export function createConversationFlow(React,ui){
 const h=React.createElement,C=ui.ComposerLayout;
 return function ConversationFlow(){
  const [singleLine,setSingleLine]=React.useState(false),[compact,setCompact]=React.useState(false),[temporary,setTemporary]=React.useState(false),[messages,setMessages]=React.useState(['A local message using the recovered bubble surface.']);
  return h('section',{className:'mt-6', 'aria-label':'Conversation surface example'},
   h(ui.ConversationLayout,{header:h('h2',{className:'text-lg font-medium'},'Conversation surfaces'),banner:h('p',{className:'text-sm text-secondary'},'Local composition; message surfaces recovered from the shipped app.')},
    h('div',{className:'flex items-center gap-2 my-2'},h('label',{htmlFor:'compact-bubbles'},'Compact'),h(ui.Switch,{id:'compact-bubbles',ariaLabel:'Compact bubbles',checked:compact,onChange:setCompact}),h('label',{htmlFor:'temporary-bubbles'},'Temporary'),h(ui.Switch,{id:'temporary-bubbles',ariaLabel:'Temporary bubbles',checked:temporary,onChange:setTemporary})),
    h('div',{className:'flex items-center gap-2 my-2'},h('label',{htmlFor:'single-line-composer'},'Single-line composer'),h(ui.Switch,{id:'single-line-composer',ariaLabel:'Single-line composer',checked:singleLine,onChange:setSingleLine})),
    h('div',{className:'flex flex-col items-end gap-2','aria-live':'polite'},messages.map((message,index)=>h(ui.UserMessageBubble,{key:index,compact,temporary},message))),
    h('form',{className:'flex gap-2 mt-4',onSubmit:event=>{event.preventDefault();const input=event.currentTarget.elements.message;const value=input.value.trim();if(value){setMessages(previous=>[...previous,value]);input.value='';input.focus();}}},h(C.LayoutTransition,null,h(C,{className:'w-full',layout:singleLine?'single-line':'multiline'},h(C.Body,{layout:singleLine?'single-line':'multiline'},h(C.AdaptiveFooter,{layout:singleLine?'single-line':'multiline',input:h(C.Input,{layout:singleLine?'single-line':'multiline'},h(C.Editor,{singleLine},h('textarea',{name:'message','aria-label':'Demo message',placeholder:'Write a local message',className:'block w-full resize-none bg-transparent outline-none',rows:1,required:true,onKeyDown:event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.nativeEvent.isComposing){event.preventDefault();event.currentTarget.form.requestSubmit();}}}))),trailingControls:h(C.FooterActions,null,h(ui.Button,{type:'submit'},'Add message'))})))))));
 };
}
