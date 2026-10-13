import {buttonColors,buttonSizes,buttonRadii,sizeRadii} from './buttonVariants.js';
// Source: Jbi/r5. App services and router are supplied by consumers, never imported.
export function createButton({React,mergeClasses,Spinner}) {
 const h=React.createElement;
 return function Button({uniform=false,uniformAtMobile=false,unstyled=false,allowShrink=false,
  color='primary',contentLayout='default',radius='default',size='default',focusRing,
  disabled=false,disabledAppearance='dimmed',className,children,sizingLabels,
  loading=false,spinnerVariant='default',...props}) {
  const sizeRadius=uniform && ['toolbar','compact','medium','dialogGhost'].includes(size) ? 'rounded-lg' : sizeRadii[size];
  const classes=mergeClasses(
        `no-drag cursor-interaction items-center select-none disabled:cursor-default aria-disabled:cursor-default`,
        focusRing === `surface` &&
          `focus:outline-none focus-visible:bg-primary-ghost-hover forced-colors:focus-visible:bg-[Highlight] forced-colors:focus-visible:text-[HighlightText] forced-colors:focus-visible:forced-color-adjust-none`,
        focusRing === `native` && `focus-visible:outline-auto`,
        focusRing !== `surface` && focusRing !== `native` && color !== `chatgptPrimary` && `focus:outline-hidden`,
        disabledAppearance === `dimmed` &&
          (color === `cardAction`
            ? `disabled:opacity-50 aria-disabled:opacity-50`
            : `disabled:opacity-40 aria-disabled:opacity-40`),
        focusRing !== `none` &&
          focusRing !== `surface` &&
          focusRing !== `native` &&
          `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0`,
        size === `auth` ||
          size === `surveyOption` ||
          size === `surveyCard` ||
          size === `selectionTile` ||
          size === `settingsOption`
          ? `whitespace-normal`
          : `whitespace-nowrap`,
        contentLayout === `balanced` ? `grid grid-cols-[1fr_auto_1fr]` : `flex`,
        !unstyled && [
          size === `composerPill` ? `gap-1.5 border-0` : `border`,
          size !== `composerPill` &&
            size !== `headerUpsell` &&
            size !== `entityRowAction` &&
            size !== `conversationPill` &&
            size !== `actionChip` &&
            size !== `actionChipWithIcon` &&
            size !== `surveyCard` &&
            size !== `settingsOption` &&
            spinnerVariant !== `rays` &&
            `gap-1`,
          size === `headerUpsell` && `gap-0.75`,
          spinnerVariant === `rays` && `gap-1.5`,
          radius === "default" ? sizeRadius : buttonRadii[radius],
          buttonColors[
            color === `segmentedInsetSelected` && size === `fieldSegment` ? `segmentedFieldSelected` : color
          ],
          buttonSizes[size],
          size === `entityHeader` &&
            color === `ghostActive` &&
            `group-data-[transparent=true]/entity-header:not-disabled:not-aria-disabled:hover:bg-surface group-data-[transparent=true]/entity-header:focus-visible:bg-surface group-data-[transparent=true]/entity-header:data-[state=open]:bg-surface`,
          contentLayout === `dropdown` && `pe-1`,
        ],
        (size === `fieldSegment` ||
          focusRing === `inset` ||
          (focusRing == null && (size === `inputSegment` || size === `fieldControl`))) &&
          `focus-visible:ring-inset`,
        allowShrink && `min-w-0`,
        sizingLabels != null && `min-w-0 max-w-full`,
        uniform && `aspect-square shrink-0 items-center justify-center !px-0`,
        uniformAtMobile &&
          `browser:max-md:aspect-square browser:max-md:shrink-0 browser:max-md:justify-center browser:max-md:!px-0`,
        className,
      );
  const spinner=h(Spinner,spinnerVariant==='rays' ? {variant:'rays'} : {className:['imageActionIcon','floatingAction'].includes(size) ? 'icon' : 'icon-xxs'});
  const content=h(React.Fragment,null,loading && spinner,children);
  const body=sizingLabels==null ? content : h('span',{className:'grid min-w-0 text-center whitespace-normal'},
   React.Children.map(sizingLabels,label=>h('span',{className:'invisible col-start-1 row-start-1 flex min-w-0 items-center justify-center gap-1','aria-hidden':true},spinner,h('span',{className:'min-w-0 break-words'},label))),
   h('span',{className:'col-start-1 row-start-1 flex min-w-0 items-center justify-center gap-1'},content));
  if(props.as==='a') {
   const {as,renderLink,href,onClick,onAuxClick,onKeyDown,tabIndex,...rest}=props;
   const inactive=disabled || loading;
   const linkProps={...rest,className:mergeClasses(classes,'button-link'),href:inactive ? undefined : href,
    role:inactive ? 'link' : rest.role,'aria-disabled':inactive || rest['aria-disabled'],tabIndex:inactive ? -1 : tabIndex,children:body,
    onClick:event=>inactive ? event.preventDefault() : onClick?.(event),
    onAuxClick:event=>inactive ? event.preventDefault() : onAuxClick?.(event),
    onKeyDown:event=>inactive ? (event.key==='Enter' || event.key===' ') && event.preventDefault() : onKeyDown?.(event)};
   return renderLink!=null && !inactive ? renderLink(linkProps) : h('a',linkProps,body);
  }
  const {as,type,...rest}=props;
  return h('button',{type:type ?? 'button',className:classes,disabled:disabled || loading,...rest},body);
 };
}
