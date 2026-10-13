import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createLazyComponentFactory} from '../src/lazyComponent.js';
const source=fs.readFileSync(new URL('../../original-stack/state/recovered-all/readable/assets/app-shared-737655e1fb23.js',import.meta.url),'utf8');
const start=source.indexOf('function oxi('),code=source.slice(start,source.indexOf('var sxi, cxi, lxi;',start));
async function run(original,{failures=0,propagate=false,prefetch=false,suspend=false}={}){
 let calls=0;const delays=[],reports=[];
 const element=(type,props)=>({type,props});
 const React={lazy:load=>({load}),Suspense:'suspense',useState:initialize=>[initialize()],createElement:(type,props,...children)=>element(type,{...props,...(children.length ? {children:children[0]} : {})})};
 const schedule=(done,ms)=>{delays.push(ms);queueMicrotask(done);};
 const report=(error,metadata)=>reports.push({message:error.message,...metadata});
 const context={Error,cxi:React,sxi:{c:n=>Array(n).fill(Symbol.for('react.memo_cache_sentinel'))},lxi:{jsx:element},Yfn:report,setTimeout:schedule};
 vm.createContext(context);vm.runInContext(code,context);
 const factory=original ? context.oxi : createLazyComponentFactory({React,reportLoadError:report,schedule});
 const Component=factory(()=>{calls++;if(calls<=failures)throw Error('unavailable');return props=>'loaded:'+props.tag;},{fallback:'waiting',suspendToParent:suspend,propagateLoadError:propagate,errorFallback:(props,error)=>'fallback:'+props.tag+':'+error.message});
 if(prefetch){const first=Component.prefetch();assert.equal(first,Component.prefetch());await first;}
 const tree=Component({tag:'example'}),child=suspend ? tree : tree.props.children;
 let value;
 try{const loaded=typeof child.type==='function' ? child.type : (await child.type.load()).default;value=loaded(child.props);}catch(error){value='thrown:'+error.message;}
 return JSON.parse(JSON.stringify({calls,delays,reports,value,wrapper:suspend ? null : tree.type,fallback:suspend ? null : tree.props.fallback}));
}
test('lazy loading retry, fallback, propagation and prefetch match recovered oxi',async()=>{
 for(const flags of [{},{failures:1},{failures:2},{failures:2,propagate:true},{prefetch:true},{prefetch:true,failures:1},{suspend:true}])assert.deepEqual(await run(false,flags),await run(true,flags));
});
