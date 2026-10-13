import {classNames} from './classNames.js';
// s5 / wxi / Txi / Exi: preserve source variants and prop forwarding boundaries.
export function createResponsiveIcons({React,AssetIcon,useDarkTheme,mergeClasses=classNames}){
 const h=React.createElement;
 const asset=props=>{if(!AssetIcon)throw new Error('ResponsiveIcon requires AssetIcon for assets');return h(AssetIcon,props);};
 function ResponsiveIconPair({'aria-hidden':hidden,compact,leading}){
  return h(React.Fragment,null,h('span',{className:'_CompactSource_ym4jk_2','aria-hidden':hidden},compact),h('span',{className:'_LeadingSource_ym4jk_6','aria-hidden':hidden},leading));
 }
 function Artwork({className,artwork,size}){
  if(!useDarkTheme)throw new Error('ResponsiveIcon artwork requires useDarkTheme');
  const icon=useDarkTheme()===true ? (artwork.dark ?? artwork.light) : artwork.light;
  return h(ResponsiveIcon,{className,'aria-hidden':true,icon,legacyClassName:size==='inline' ? 'icon-base shrink-0' : 'icon-leading shrink-0',size});
 }
 function ResponsiveIcon({className,icon,legacyClassName='icon-xs shrink-0',size='leading',...props}){
  if('assets' in icon){
   const hidden=props['aria-hidden'] ?? icon.ariaHidden;
   if(size!=='leading')return asset({className,'aria-hidden':hidden,asset:icon.assets[size==='inline' ? 20 : 16]});
   return h(ResponsiveIconPair,{compact:asset({className,'aria-hidden':hidden,asset:icon.assets[16]}),leading:asset({className,'aria-hidden':hidden,asset:icon.assets[20]})});
  }
  if('artwork' in icon){
   if(size==='secondary' && icon.secondary!=null)return h(icon.secondary,{className:mergeClasses(legacyClassName,className),...props,'aria-hidden':true});
   return h(Artwork,{className,artwork:icon.artwork,size});
  }
  if(16 in icon){
   if(size!=='leading')return h(icon[size==='inline' ? 20 : 16],{className,...props,'aria-hidden':true});
   return h(ResponsiveIconPair,{'aria-hidden':true,compact:h(icon[16],{className,...props,'aria-hidden':true}),leading:h(icon[20],{className,...props,'aria-hidden':true})});
  }
  return h(icon,{className:mergeClasses(legacyClassName,className),...props});
 }
 function CompactIcon({className,icon16,asset16,legacyIcon,legacyClassName='icon-2xs shrink-0',...props}){
  return h(ResponsiveIconPair,{compact:h(legacyIcon,{className:mergeClasses(legacyClassName,className),...props}),leading:asset16==null ? h(icon16,{className,...props}) : asset({className,...props,asset:asset16})});
 }
 return {ResponsiveIcon,ResponsiveIconPair,CompactIcon};
}
