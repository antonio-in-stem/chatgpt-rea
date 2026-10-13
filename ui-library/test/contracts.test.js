import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createReaUI} from '../src/index.js';
function setup(){
 const frames=[];
 const React={createElement:(type,props,...children)=>({type,props,children}),useId:()=> 'instance-1'};
 return {...createReaUI({React,motion:{span:'motion.span'},mergeClasses:(...parts)=>parts.filter(Boolean).join(' '),requestFrame:callback=>frames.push(callback)}),frames};
}
test('choice action waits for two distinct frames and retains native button props',()=>{
 const {ChoiceButton,frames}=setup();let calls=0;
 const button=ChoiceButton({onClick:()=>calls++,disabled:true,'aria-label':'Choose',type:'submit'});
 assert.equal(button.props.type,'button');assert.equal(button.props.disabled,true);
 button.props.onClick();assert.equal(calls,0);assert.equal(frames.length,1);
 frames.shift()();assert.equal(calls,0);frames.shift()();assert.equal(calls,1);
 assert.equal(ChoiceButton({}).props.onClick,undefined);
});
test('segmented selection is controlled and preserves original motion and accessibility contract',()=>{
 const {SegmentedControl}=setup();const selected=[];
 const props={ariaLabel:'Mode',options:[{id:'a',label:'A'},{id:'b',label:'B'}],selectedId:'a',onSelect:id=>selected.push(id)};
 const tree=SegmentedControl(props);
 assert.equal(tree.props.role,'group');assert.equal(tree.props['aria-label'],'Mode');
 assert.equal(tree.children[0].props['aria-pressed'],true);assert.equal(tree.children[1].props['aria-pressed'],false);
 tree.children[1].props.onClick();assert.deepEqual(selected,['b']);assert.equal(tree.children[0].props['aria-pressed'],true);
 const next=SegmentedControl({...props,selectedId:'b',animateSelection:false,size:'compact'});
 assert.equal(next.children[1].props['aria-pressed'],true);
 assert.equal(next.children[1].children[0].props.layoutId,undefined);
 assert.deepEqual(next.children[1].children[0].props.transition,{type:'spring',duration:0.28,bounce:0});
});
