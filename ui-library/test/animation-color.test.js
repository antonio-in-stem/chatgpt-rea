import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {animations} from '../animations/index.js';
import {createAnimationColorReader,recolorAnimation,observeAnimationColor} from '../src/animationColor.js';
const base=new URL('../../original-stack/state/recovered-all/readable/assets/',import.meta.url);
const source=fs.readFileSync(new URL('animated-icon-1526fd61ba39.js',base),'utf8');
const initial=fs.readFileSync(new URL('app-initial-b8e1c8014bb4.js',base),'utf8');
test('color remapping matches original C on every recovered animation without mutating source',()=>{
 const context={D:{default:structuredClone}};vm.createContext(context);vm.runInContext(source.slice(source.indexOf('function C('),source.indexOf('function w(')),context);
 for(const animation of Object.values(animations))for(const color of [null,[1,0.5,0,1],[0.2,0.3,0.4,0.5]]){
  const before=JSON.stringify(animation),actual=recolorAnimation(animation,color);
  assert.equal(JSON.stringify(actual),JSON.stringify(context.C(animation,color)));
  assert.equal(JSON.stringify(animation),before);assert.notEqual(actual,animation);
 }
});
test('canvas conversion matches original yIc/S and reuses its one-pixel context',()=>{
 const build=()=>{let creations=0;const log=[];const context={clearRect:(...v)=>log.push(['clear',...v]),set fillStyle(v){log.push(['color',v]);},fillRect:(...v)=>log.push(['fill',...v]),getImageData:()=>({data:new Uint8ClampedArray([10,20,30,128])})};return {log,document:{createElement:()=>{creations++;return {getContext:(...v)=>{log.push(['context',...v]);return context;}};}},count:()=>creations};};
 const a=build(),b=build();const original={document:a.document,getComputedStyle:element=>({color:element.color})};vm.createContext(original);
 vm.runInContext(initial.slice(initial.indexOf('function yIc('),initial.indexOf('function xIc('))+';var _=yIc;'+source.slice(source.indexOf('function S('),source.indexOf('function C(')),original);
 try{globalThis.document=b.document;globalThis.getComputedStyle=element=>({color:element.color});const read=createAnimationColorReader();
 for(const color of ['', 'rgb(10, 20, 30)','color(display-p3 0.2 0.3 0.4)'])assert.equal(JSON.stringify(read({color})),JSON.stringify(original.S({color})));
 assert.equal(JSON.stringify(b.log),JSON.stringify(a.log));assert.equal(b.count(),1);
 }finally{delete globalThis.document;delete globalThis.getComputedStyle;}
});
test('observer watches original attribute boundaries, deduplicates and disconnects',()=>{
 const watched=[],values=[];let notify,disconnected=false,color=[1,0,0,1];const element={};
 try{globalThis.document={documentElement:{root:true}};globalThis.MutationObserver=class{constructor(fn){notify=fn;}observe(...args){watched.push(args);}disconnect(){disconnected=true;}};
 const stop=observeAnimationColor(element,value=>values.push(value),()=>color);
 notify();color=[0,1,0,1];notify();notify();color=null;notify();stop();
 assert.deepEqual(values,[[1,0,0,1],[0,1,0,1],null]);assert.equal(watched.length,2);assert.equal(watched[1][0],element);assert.deepEqual(watched[0][1],{attributes:true,attributeFilter:['class','style']});assert.equal(disconnected,true);
 }finally{delete globalThis.document;delete globalThis.MutationObserver;}
});
