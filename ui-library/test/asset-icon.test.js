import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createAssetIcon} from '../src/AssetIcon.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const manifest=JSON.parse(fs.readFileSync(new URL('../asset-renderer-manifest.json',import.meta.url),'utf8'));
const definition=name=>{const start=source.indexOf('function '+name+'(');return source.slice(start,source.indexOf('\n}',start)+2);};
const element=(type,props)=>({type,props}),React={createElement:element,useId:()=> 'test-id'};
const cache={c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))};
const context={t:fn=>fn,Q:()=>{},Z:x=>x,ilr:cache,Ibi:cache,alr:React,olr:{jsx:element},Lbi:{jsx:element},m2n:/^[A-Za-z_:][A-Za-z0-9_.:-]*$/,h2n:new Set(['icon','mask','clipPath'])};
vm.createContext(context);vm.runInContext([...manifest.symbols,'v8n','Mbi'].map(definition).join('\n')+';v8n();Mbi();',context);
const expand=node=>typeof node?.type==='function' ? expand(node.type(node.props)) : node;
const plain=node=>JSON.parse(JSON.stringify(expand(node)));
const AssetIcon=createAssetIcon(React);
test('asset renderer matches original pipeline for inline, optical and sprite variants',()=>{
 const assets=[context._8n,context.jbi,{kind:'inline',preset:context._8n},{kind:'sprite',name:'sprite',canvas:context._8n.canvas,href:'#sprite',alignment:{authored:{x:0,y:0,overflows:false},composite:{x:1,y:2,overflows:true},foreground:{x:2,y:1,overflows:false}},style:{color:'red'}}];
 for(const asset of assets)for(const alignment of [undefined,'composite','foreground'])for(const label of [undefined,'Open']){
  const props={asset,alignment,label,className:'custom',style:{opacity:0.5}};
  assert.deepEqual(plain(AssetIcon(props)),plain(context.t5(props)));
 }
});
test('local SVG IDs stay isolated and unsupported capability is rejected',()=>{
 const preset={...context._8n,body:'<defs><clipPath id="clip"><path d="M0 0"/></clipPath></defs><path clip-path="url(#clip)"/><use href="#clip"/>'};
 const tree=plain(AssetIcon({asset:preset,idPrefix:'example',label:'Named'}));
 assert.match(tree.props.dangerouslySetInnerHTML.__html,/id="example-clip"/);assert.match(tree.props.dangerouslySetInnerHTML.__html,/url\(#example-clip\)/);assert.match(tree.props.dangerouslySetInnerHTML.__html,/href="#example-clip"/);assert.equal(tree.props.role,'img');
 assert.throws(()=>plain(AssetIcon({asset:preset,idPrefix:'bad prefix'})),/idPrefix/);
 assert.throws(()=>plain(AssetIcon({asset:{...preset,capabilities:['mask']}})),/does not support/);
});
