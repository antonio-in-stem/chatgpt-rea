// yIc + animated-icon S/C. Browser canvas supplies the original CSS color conversion.
export function createAnimationColorReader(){
 let context;
 return element=>{
  const color=getComputedStyle(element).color;
  if(!color)return null;
  if(context===undefined){const canvas=document.createElement('canvas');canvas.width=1;canvas.height=1;context=canvas.getContext('2d',{willReadFrequently:true});}
  if(context==null)return null;
  context.clearRect(0,0,1,1);context.fillStyle=color;context.fillRect(0,0,1,1);
  return Array.from(context.getImageData(0,0,1,1).data,value=>value/255);
 };
}
// Recovered assets are JSON trees; structuredClone replaces bundled cloneDeep for this data contract.
export function recolorAnimation(animation,color){
 const result=structuredClone(animation);
 if(!color)return result;
 const shape=item=>{
  if((item.ty==='fl' || item.ty==='st') && item?.c?.k)item.c.k=color;
  if(Array.isArray(item.it))item.it.forEach(shape);
 };
 const layer=item=>{
  if(item.ty===4 && Array.isArray(item.shapes))item.shapes.forEach(shape);
  if(Array.isArray(item.layers))item.layers.forEach(layer);
 };
 layer(result);if(Array.isArray(result.assets))result.assets.forEach(layer);
 return result;
}
// w's mount effect: only root/own class and style attributes, with value deduplication.
export function observeAnimationColor(element,onColor,readColor){
 let previous;
 const update=()=>{const color=readColor(element),key=color?.join(',') ?? null;if(previous!==key){previous=key;onColor(color);}};
 update();
 const observer=new MutationObserver(update),options={attributes:true,attributeFilter:['class','style']};
 observer.observe(document.documentElement,options);observer.observe(element,options);
 return ()=>observer.disconnect();
}
