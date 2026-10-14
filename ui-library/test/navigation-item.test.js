import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createNavigationItem,createNavigationList} from '../src/NavigationItem.js';
import {classNames} from '../src/classNames.js';
const element=(type,props)=>({type,props});
const React={__COMPILER_RUNTIME:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},useId:()=> 'unread-id',isValidElement:value=>value!=null && typeof value==='object' && 'type' in value,Fragment:'fragment',createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children.length===1 ? children[0] : children} : {})})};
const options={React,mergeClasses:classNames,Link:'link',ResponsiveIcon:'responsive',AnimatedIcon:'animated',DisclosureIcon:'disclosure'};
const Item=createNavigationItem(options);
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-initial-b8e1c8014bb4.js',import.meta.url),'utf8');
const start=source.indexOf('function VF('),end=source.indexOf('\nfunction HF(',start);
const context={Ear:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},Dar:React,ng:classNames,WF:{jsx:element,jsxs:element,Fragment:'fragment'},rm:'responsive',par:'animated',ih:'link',dle:'disclosure',$:props=>props.defaultMessage,Oar:'focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-[-2px]'};
vm.createContext(context);vm.runInContext(source.slice(start,end),context);
const expand=node=>{if(node==null || typeof node!=='object')return node;if(Array.isArray(node))return node.map(expand);if(typeof node.type==='function')return expand(node.type(node.props));return {...node,props:node.props ? {...node.props,children:expand(node.props.children)} : undefined};};
const plain=node=>JSON.parse(JSON.stringify(expand(node),(_,v)=>typeof v==='function' ? '[handler]' : v));
test('navigation variants match shipped VF structure, classes and prop precedence',()=>{
 const cases=[{}, {hideLabel:true},{hideLabel:false},{fullWidth:false},{isActive:true},{activeVariant:'accent',isActive:true},{tone:'inverse',isActive:true},{tone:'inverse',activeVariant:'accent',isActive:true},{disabled:true},{'aria-disabled':'true'},{interactive:false},{hoverBackground:false},{description:'Details'},{description:'Details',wrapDescription:true},{description:'Details',layout:'summary'},{labelTrailing:'badge'},{interactiveTrailing:'action',description:'Details'},{interactiveTrailing:'action',tone:'inverse',trailing:'ignored'},{unread:true,'aria-describedby':'existing'},{disclosure:true},{to:'/library'},{icon:'icon'},{icon:element('svg',{})},{thumbnail:'image'},{icon:'icon',animatedIcon:{animate:'spin'}},{iconAssetSource:{16:'small',20:'large'}},{icon:'icon',animatedIcon:{animate:'spin'},iconAssetSource:{16:'small'}},{icon:'icon',isActive:true,iconClassName:'custom',weightClassName:'font-medium'}];
 for(const flags of cases){const props={label:'Library',...flags};assert.deepEqual(plain(Item(props)),plain(context.VF(props)),JSON.stringify(flags));}
});
test('specialized missing adapters fail explicitly instead of silently replacing the original variant',()=>{
 const Bare=createNavigationItem({React,mergeClasses:classNames});
 assert.throws(()=>Bare({label:'Link',to:'/x'}),/requires Link/);
 assert.throws(()=>Bare({label:'Icon',iconAssetSource:{}}),/requires ResponsiveIcon/);
 assert.throws(()=>Bare({label:'Animated',icon:'svg',animatedIcon:{}}),/requires AnimatedIcon/);
});

test('navigation item and list preserve complete shipped function bodies',()=>{const output=fs.readFileSync(new URL('../src/NavigationItem.js',import.meta.url),'utf8');for(const name of ['VF','HF']){const i=source.indexOf('function '+name+'(');assert.ok(output.includes(source.slice(i,i+source.slice(i).search(/^}\r?$/m)+1)));}});
test('grouped and rail navigation lists preserve original layout contracts',()=>{const List=createNavigationList(options);const grouped=List({appearance:'grouped',children:'rows'});assert.equal(grouped.props['data-appearance'],'grouped');assert.match(grouped.props.className,/rounded-2xl/);assert.match(grouped.props.className,/overflow-hidden/);assert.match(grouped.props.className,/--display-icon-leading:contents/);assert.equal(grouped.props.children,'rows');const rail=List({itemSpacing:'rail'});assert.match(rail.props.className,/gap-2 browser:gap-px/);assert.equal(rail.props['data-appearance'],'plain');});
