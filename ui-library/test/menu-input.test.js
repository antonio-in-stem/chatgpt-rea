import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createMenuInput} from '../src/MenuInput.js';
import {classNames} from '../src/classNames.js';
const Input=createMenuInput({createElement:(type,props)=>({type,props})},classNames);
test('menu text editing contains keys and selects only its own input on Ctrl/Meta+A',()=>{
 for(const modifier of ['ctrlKey','metaKey']) {
  const log=[];const input=Input({onKeyDown:()=>log.push('consumer')});
  input.props.onKeyDown({key:'A',[modifier]:true,stopPropagation:()=>log.push('stop'),preventDefault:()=>log.push('prevent'),currentTarget:{select:()=>log.push('select')}});
  assert.deepEqual(log,['stop','prevent','select']);
 }
 const log=[];const input=Input({autoFocus:false,disabled:true,value:'Filter',onKeyDown:()=>log.push('consumer')});
 input.props.onKeyDown({key:'ArrowDown',stopPropagation:()=>log.push('stop')});
 assert.deepEqual(log,['stop','consumer']);assert.equal(input.props.autoFocus,false);assert.equal(input.props.disabled,true);assert.equal(input.props.value,'Filter');
});
