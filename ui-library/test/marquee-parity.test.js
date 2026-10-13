import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {marqueeAnimation} from '../src/marqueeTiming.js';
import {createMarqueeText} from '../src/MarqueeText.js';
import {createSidebarItem} from '../src/SidebarItem.js';
import {classNames} from '../src/classNames.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js',import.meta.url),'utf8');
const definition=name=>{const start=source.indexOf('function '+name+'(');assert.ok(start>=0);return source.slice(start,source.indexOf('\n}',start)+2);};
let metrics=null,reduced=false;
const element=(type,props)=>({type,props});
const React={useId:()=> 'label-id',useState:()=>[metrics,()=>{}],useRef:()=>({current:null}),useCallback:f=>f,useLayoutEffect:()=>{},useSyncExternalStore:()=>reduced,createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const context={e:f=>f,ng:classNames,gRo:React,Z4o:React,Ef:()=>1,ft:()=>reduced,Dd:f=>f,Qm:f=>f,vRo:13,yRo:2,bRo:1.15,xRo:0.35,SRo:1.85,CRo:32,wRo:{x1:0.49,y1:0.6,x2:0.7,y2:1},oh:(n,s)=>n/s,ORo:'surface',MRo:'indent',dRo:'marquee',vZ:'leading'};
for(const name of ['hRo','X4o'])context[name]={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))};
for(const name of ['_Ro','M2'])context[name]={jsx:element,jsxs:element};
vm.createContext(context);vm.runInContext(['uRo','fRo','pRo','mRo','dRo','Y4o'].map(definition).join('\n')+'\nuRo();',context);
const plain=value=>JSON.parse(JSON.stringify(value,(key,v)=>key==='ref' ? undefined : typeof v==='function' ? '[handler]' : v));
test('marquee duration and sampled easing match original at different widths and speeds',()=>{
 for(const distance of [0.75,20,100,487.5])for(const speed of [13,26,40])for(const mode of ['loop','stop-at-end'])assert.deepEqual(plain(marqueeAnimation(distance,speed,mode)),plain(context.fRo(distance,speed,mode)));
});
test('marquee DOM, masks and inert copy match original for overflow and reduced motion',()=>{
 const Marquee=createMarqueeText({React,mergeClasses:classNames});
 for(metrics of [null,{contentWidth:400,scrollDistance:200,speedPxPerSecond:26}])for(reduced of [false,true])for(const scrollMode of ['loop','stop-at-end'])for(const animate of [false,true]){
 const props={children:'Long label',animate,animateOnGroupHover:true,scrollMode};
 assert.deepEqual(plain(Marquee(props)),plain(context.dRo(props)));
 }
 metrics=null;reduced=false;
});
test('sidebar item slots and inherited state match original row assembly',()=>{
 // The source leading slot and recovered leading slot are compared after expanding that boundary.
 const Item=createSidebarItem({React,mergeClasses:classNames,SidebarRowSurface:'surface',SidebarIndent:'indent',MarqueeText:'marquee'});
 const expandLeading=node=>{if(!node || typeof node!=='object')return node;if(Array.isArray(node))return node.map(expandLeading);if(node.type===context.dRo)return {...node,type:'marquee'};if(node.type==='leading'){const {disclosure,icon}=node.props;return element('div',{className:'flex shrink-0 items-center ps-1 pe-1 browser:pe-0',children:element('span',{className:'-mx-[3px] flex icon-leading-slot size-[var(--height-token-row)] shrink-0 items-center justify-center browser:-mx-0.5',role:'presentation',onClick:disclosure==null ? undefined : ()=>{},onPointerDown:disclosure==null ? undefined : ()=>{},children:disclosure ?? icon})});}return {...node,props:node.props ? {...node.props,children:expandLeading(node.props.children)} : undefined};};
 for(const flags of [{},{isDisabled:true},{isActive:true,indentLevel:2},{ariaLabel:'Override',ariaExpanded:false,disclosure:'disclosure'},{actions:'actions',trailingContent:'status',dragHandleListeners:{onPointerDown:()=>{}}}]){
 const props={label:'Title',icon:'icon',...flags};assert.deepEqual(plain(expandLeading(Item(props))),plain(expandLeading(context.Y4o(props))));
 }
});
