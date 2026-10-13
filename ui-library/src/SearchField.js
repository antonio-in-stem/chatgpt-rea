// PJa / Met in app-initial: controlled query, no coupled search service.
export function createSearchField({React,mergeClasses,icons,formatMessage=m=>m.defaultMessage}) {
const h=React.createElement;
const {Search16,ClearSearch,LegacySearch,ResponsiveSearch,SidebarIcon}=icons;
return function SearchField({id,inputRef,className,autoFocus,clearLabel,disabled,inputKey,inputRole,isClearable=true,label,maxLength,onFocus,onKeyDown,onSearchQueryChange,placeholder,readOnly,searchQuery,trailingControl,variant='default'}) {
const localRef=React.useRef(null),ref=inputRef ?? localRef;
const toolbar = variant === `toolbar` || variant === `toolbar-action` || variant === `toolbar-compact`,
    baseStyle =
      (variant === "default" || variant === `settings`) &&
      `h-page-search gap-2 border border-primary-outline bg-page-search px-2.5`,
    defaultRadius = variant === "default" && `rounded-full`,
    settingsRadius = variant === `settings` && `rounded-button-toolbar`,
    toolbarStyle =
      toolbar && `gap-2 rounded-full border border-primary-outline bg-transparent px-3 text-sm leading-5`,
    toolbarHeight = variant === `toolbar` && `h-9`,
    toolbarActionHeight = variant === `toolbar-action` && `h-token-button-composer`,
    toolbarCompactHeight = variant === `toolbar-compact` && `h-8 browser:h-9`,
    sidebarStyle =
      variant === `sidebar` &&
      `sidebar-item h-[var(--height-token-row)] bg-background-secondary-soft-alpha pe-[var(--padding-row-cell-x,var(--padding-row-x))]`,
    sidebarHeaderStyle =
      variant === `sidebar-header` &&
      `h-9 shrink-0 gap-2 rounded-full bg-background-secondary-soft-alpha px-3`,
    catalogStyle = variant === `catalog` && `h-14 gap-3 rounded-xl border border-primary-outline bg-surface px-5`,
    catalogFilterStyle =
      variant === `catalog-filter` &&
      `h-12 gap-3 rounded-xl border border-primary-outline bg-surface-secondary px-4`;
const classes=mergeClasses('no-drag flex items-center py-0 text-base leading-[18px]',baseStyle,defaultRadius,settingsRadius,toolbarStyle,toolbarHeight,toolbarActionHeight,toolbarCompactHeight,sidebarStyle,sidebarHeaderStyle,catalogStyle,catalogFilterStyle,className);
const leading=variant==='sidebar' ? h(SidebarIcon,{icon:h(LegacySearch,{className:'icon-sm text-secondary'})}) : h('span',{className:'flex shrink-0 items-center justify-center'},toolbar && h(ResponsiveSearch,{className:'text-secondary'}),!toolbar && (variant==='sidebar-header' ? h(Search16,{className:'text-secondary'}) : h(LegacySearch,{className:'icon-sm text-secondary'})));
return h('div',{className:classes,'data-sidebar-header-search':variant==='sidebar-header' || undefined},leading,
h('label',{className:'sr-only',htmlFor:id},label),
h('input',{key:inputKey,autoFocus,id,ref,className:mergeClasses('min-w-0 flex-1 bg-transparent text-default outline-none select-text placeholder:text-tertiary [&::placeholder]:select-none',toolbar ? 'text-sm leading-5' : 'text-base leading-[18px]'),autoComplete:'off',disabled,maxLength,readOnly,role:inputRole,type:'text',value:searchQuery,onChange:event=>onSearchQueryChange(event.target.value),onFocus,onKeyDown,placeholder}),
isClearable && searchQuery.length>0 ? h('button',{disabled,'aria-label':clearLabel ?? formatMessage({id:'skills.pageSearchInput.clear',defaultMessage:'Clear search',description:'Accessible label for clearing a search field'}),className:mergeClasses('flex shrink-0 cursor-interaction items-center justify-center text-secondary hover:text-default',variant==='sidebar' && 'size-6'),type:'button',onClick:()=>{ref.current?.focus();onSearchQueryChange('');}},h(ClearSearch,{})) : null,
trailingControl==null ? null : h('div',{className:'flex shrink-0 items-center'},trailingControl));};}
