// Authored demo composition; the controls themselves come from recovered modules.
export function createSearchFlow(React,{SearchField,Button}) {
 const h=React.createElement,items=['Design system','Windows application','Component library'];
 return function SearchFlow(){
  const [query,setQuery]=React.useState(''),[selected,setSelected]=React.useState(null);
  const results=items.filter(item=>item.toLowerCase().includes(query.toLowerCase()));
  return h('section',{'aria-label':'Search and open',className:'mt-6'},
   h(SearchField,{id:'project-search',label:'Search projects',placeholder:'Search projects',searchQuery:query,onSearchQueryChange:setQuery,variant:'toolbar'}),
   h('div',{className:'grid gap-2 mt-4'},...results.map(item=>h(Button,{key:item,color:'ghostActive',size:'dialog',onClick:()=>setSelected(item)},item))),
   results.length===0 ? h('p',{role:'status'},'No results') : null,
   selected ? h('p',{role:'status'},`Opened: ${selected}`) : null);
 };}
