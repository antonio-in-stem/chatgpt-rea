// Layout-only semantic extraction of D2o; original y2o footer body retained.
import {classNames as ng} from './classNames.js';
export const navigationRailClasses={
  "root": "group/sidebar-rail relative flex min-h-0 shrink-0 flex-col items-center gap-2 px-2 pb-2 select-none browser:w-13 browser:gap-0 browser:px-0 browser:pt-0 browser:[--height-token-nav-row:36px] browser:[--height-token-row:36px] browser:[--padding-row-cell-x:8px] browser:[--padding-row-x:8px] browser:max-md:border-e browser:max-md:border-subtle browser:max-md:dark:border-default",
  "codexSurface": "bg-surface-secondary electron:bg-transparent browser:[--control-radius-md:var(--radius-token-row)] browser:[--radius-token-row:10px]",
  "surface": "bg-surface-secondary electron:bg-transparent",
  "top": "pt-[calc((var(--sidebar-navigation-header-height,calc(var(--spacing)*10))-var(--spacing)*9)/2)]",
  "bottom": "[[data-app-shell-page-surface=true]_&]:pb-1",
  "border": "pointer-events-none absolute inset-y-0 end-0 z-10 border-e-hairline border-default",
  "list": "vertical-scroll-fade-mask hide-scrollbar -m-0.5 min-h-0 flex-1 scroll-py-0.5 items-center overflow-y-auto p-0.5 browser:m-0 browser:mt-2 browser:w-full browser:items-stretch browser:px-row-x browser:pt-0"
};
export function createNavigationRail({React,SidebarList,compilerRuntime=React.__COMPILER_RUNTIME}){
 if(!SidebarList||!compilerRuntime?.c)throw new TypeError('Rail requires original SidebarList and compiler runtime');
 const h=React.createElement,b2o=compilerRuntime,x2o={jsx:(type,props,key)=>h(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>h(type,key===undefined?props:{...props,key},...props.children)};
function y2o(e) {
  let t = (0, b2o.c)(25),
    { compact: n, leading: r, showProfileDivider: i, trailing: a } = e,
    o = n !== void 0 && n,
    s = i != null,
    c = o ? `flex w-full` : `min-w-0 flex-1`,
    l;
  t[0] !== r || t[1] !== c
    ? ((l = (0, x2o.jsx)(`div`, { className: c, children: r })), (t[0] = r), (t[1] = c), (t[2] = l))
    : (l = t[2]);
  let u = l,
    d = o ? `w-9` : `[container-type:inline-size] w-full`,
    f;
  t[3] === d ? (f = t[4]) : ((f = ng(`relative shrink-0`, d)), (t[3] = d), (t[4] = f));
  let p;
  t[5] !== o || t[6] !== s || t[7] !== i
    ? ((p =
        !o &&
        i !== !1 &&
        (0, x2o.jsx)(`div`, {
          "aria-hidden": `true`,
          className: ng(
            `pointer-events-none absolute inset-x-0 top-0 z-10 border-t-hairline`,
            s ? `border-token-border-heavy opacity-35 dark:opacity-30` : `border-default`,
          ),
        })),
      (t[5] = o),
      (t[6] = s),
      (t[7] = i),
      (t[8] = p))
    : (p = t[8]);
  let m = o
      ? `flex-col gap-2`
      : `h-toolbar gap-2 px-row-x has-[[data-ambient-usage-label]]:h-auto has-[[data-ambient-usage-label]]:min-h-toolbar browser:h-auto browser:min-h-16`,
    h;
  t[9] === m ? (h = t[10]) : ((h = ng(`flex items-center`, m)), (t[9] = m), (t[10] = h));
  let g = !o && u,
    _ = o ? `flex-col gap-2` : `gap-1`,
    v;
  t[11] === _
    ? (v = t[12])
    : ((v = ng(`flex items-center empty:hidden`, _)), (t[11] = _), (t[12] = v));
  let y;
  t[13] !== v || t[14] !== a
    ? ((y = (0, x2o.jsx)(`div`, { className: v, children: a })),
      (t[13] = v),
      (t[14] = a),
      (t[15] = y))
    : (y = t[15]);
  let b = o && u,
    x;
  t[16] !== y || t[17] !== b || t[18] !== h || t[19] !== g
    ? ((x = (0, x2o.jsxs)(`div`, { className: h, children: [g, y, b] })),
      (t[16] = y),
      (t[17] = b),
      (t[18] = h),
      (t[19] = g),
      (t[20] = x))
    : (x = t[20]);
  let S;
  return (
    t[21] !== x || t[22] !== f || t[23] !== p
      ? ((S = (0, x2o.jsxs)(`div`, { className: f, children: [p, x] })),
        (t[21] = x),
        (t[22] = f),
        (t[23] = p),
        (t[24] = S))
      : (S = t[24]),
    S
  );
}
 function NavigationRail({header,children,footer,codex=false,ariaLabel='App navigation',railRef}){
  const c=navigationRailClasses;
  return h('nav',{ref:railRef,className:ng(c.root,codex?c.codexSurface:c.surface,c.top,c.bottom),'data-app-navigation-rail':true,'aria-label':ariaLabel},
   h('div',{'aria-hidden':'true',className:ng(c.border,codex&&'electron:hidden')}),header,
   h(SidebarList,{className:ng(c.list,codex&&'browser:gap-y-4'),itemSpacing:'rail'},children),footer);
 }
 return {NavigationRail,ProfileFooter:y2o};
}
