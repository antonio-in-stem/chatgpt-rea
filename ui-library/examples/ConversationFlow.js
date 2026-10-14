// Authored local flow connecting recovered surfaces; not an original conversation screen.
export function createConversationFlow(React,ui){
 const h=React.createElement;
 return function ConversationFlow(){
  const [compact,setCompact]=React.useState(false),[temporary,setTemporary]=React.useState(false),[messages,setMessages]=React.useState(['A local message using the recovered bubble surface.']);
  return h('section',{className:'mt-6', 'aria-label':'Conversation surface example'},
   h(ui.ConversationLayout,{header:h('h2',{className:'text-lg font-medium'},'Conversation surfaces'),banner:h('p',{className:'text-sm text-secondary'},'Local composition; message surfaces recovered from the shipped app.')},
    h('div',{className:'flex items-center gap-2 my-2'},h('label',{htmlFor:'compact-bubbles'},'Compact'),h(ui.Switch,{id:'compact-bubbles',ariaLabel:'Compact bubbles',checked:compact,onChange:setCompact}),h('label',{htmlFor:'temporary-bubbles'},'Temporary'),h(ui.Switch,{id:'temporary-bubbles',ariaLabel:'Temporary bubbles',checked:temporary,onChange:setTemporary})),
    h('div',{className:'flex flex-col items-end gap-2','aria-live':'polite'},messages.map((message,index)=>h(ui.UserMessageBubble,{key:index,compact,temporary},message))),
    h('form',{className:'flex gap-2 mt-4',onSubmit:event=>{event.preventDefault();const input=event.currentTarget.elements.message;const value=input.value.trim();if(value){setMessages(previous=>[...previous,value]);input.value='';input.focus();}}},h('input',{name:'message','aria-label':'Demo message',placeholder:'Write a local message',className:'min-w-0 flex-1',required:true}),h(ui.Button,{type:'submit'},'Add message'))));
 };
}
