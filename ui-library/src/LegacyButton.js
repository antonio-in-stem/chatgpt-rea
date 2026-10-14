// Generated original legacy Button, loader and TransitionGroup family.
import {classNames as q} from './classNames.js';
export function createLegacyButton({React,config={}}){
 const runtime={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)};
 const t=fn=>{let initialized=false;return()=>{if(!initialized){initialized=true;fn();}};},o=()=>React,n=value=>value,K=()=>runtime,yh=()=>{};
 // Explicit app-config adapter; original shipped defaults, no account dependency.
 const wg={pill:true,squircle:false,pressable:false,pressableScaleMultiplier:1,...config},pSe=()=>{};
 const Ag=React,eCe=typeof window==='undefined'?React.useEffect:React.useLayoutEffect,rCe=()=>{};
 let mSe,hSe,gSe,Tg,_Se,vSe,ySe,bSe,xSe,SSe,CSe,wSe,TSe,ESe,DSe,OSe,Dg,kSe,ASe,jSe;
 let kg,PSe,ISe,LSe,RSe,BSe,VSe,iCe,jg,Mg,Ng,Pg,uCe,dCe,fCe,mCe,hCe,Fg,Ig,_Ce,vCe,yCe,bCe,xCe,SCe,CCe,TCe,Rg,ECe;
function Eg() {
  return (Eg = t(() => {
    ((mSe = typeof window < `u`),
      (hSe = typeof document < `u`),
      (gSe = mSe && hSe),
      (Tg = typeof navigator < `u`),
      (_Se = Tg ? (navigator.userAgent ?? ``) : ``),
      (vSe =
        (Tg && /(jsdom|happy-dom)/i.test(_Se)) ||
        typeof Reflect.get(globalThis, `happyDOM`) == `object`),
      (ySe = {
        BASE_URL: `./`,
        CODEX_ELECTRON_PLATFORM: `win32`,
        DEV: !1,
        MODE: `production`,
        PROD: !0,
        SSR: !1,
        VITE_CODEX_BUILD_COMMIT: `615adb2c04224ce3b678e72cd9e6927ce72331f5`,
        VITE_DIL_RUNNER_URL: ``,
        VITE_WEB_PUSH_PUBLIC_KEY: ``,
      }),
      (bSe = !!ySe?.DEV),
      (xSe = vSe || ySe?.MODE === `test`));
  }))();
}
function Og() {
  return (Og = t(() => {
    (pSe(),
      Eg(),
      (SSe = () =>
        !mSe || typeof window.matchMedia != `function`
          ? !1
          : window.matchMedia(`(prefers-reduced-motion: reduce)`).matches),
      (CSe = (e) => {
        if (!wg.pressable) return;
        let t = e.currentTarget;
        if (!gSe || !(t instanceof HTMLElement)) return;
        let n = t.offsetWidth,
          r = 0.985;
        (n <= 80
          ? (r = 0.96)
          : n <= 150
            ? (r = 0.97)
            : n <= 220
              ? (r = 0.98)
              : n > 600 && (r = 0.995),
          t.style.setProperty(`--scale`, (1 + (r - 1) * wg.pressableScaleMultiplier).toString()));
      }),
      (wSe = (e, t) => {
        let n = () => {
          let t = setTimeout(e);
          return () => {
            clearTimeout(t);
          };
        };
        if (
          !gSe ||
          typeof window.requestAnimationFrame != `function` ||
          (hSe && document.visibilityState === `hidden`)
        )
          return n();
        let r = t?.frames ?? 2,
          i = window.requestAnimationFrame(function t() {
            (--r, r === 0 ? e() : (i = window.requestAnimationFrame(t)));
          });
        return () => {
          typeof window.cancelAnimationFrame == `function` && window.cancelAnimationFrame(i);
        };
      }),
      (TSe = (e) =>
        Object.keys(e).reduce((t, n) => {
          let r = e[n];
          if (r || r === 0) {
            let e = n.startsWith(`--`) ? `` : `--`,
              i = typeof r == `number` ? `${r}px` : r;
            t[`${e}${n}`] = i;
          }
          return t;
        }, {})),
      (ESe = (e) => {
        e.preventDefault();
      }),
      (DSe = (e) => (typeof e == `number` ? `${e}deg` : e)),
      (OSe = (e) => String(e)),
      (Dg = (e) => `${e}ms`),
      (kSe = ({ x: e, y: t, scale: n, rotate: r, skewX: i, skewY: a } = {}) => {
        let o = [
          e == null ? null : `translateX(${e}px)`,
          t == null ? null : `translateY(${t}px)`,
          n == null ? null : `scale(${n})`,
          r == null ? null : `rotate(${DSe(r)})`,
          i == null ? null : `skewX(${DSe(i)})`,
          a == null ? null : `skewY(${DSe(a)})`,
        ].filter(Boolean);
        return o.length ? o.join(` `) : `none`;
      }),
      (ASe = ({ blur: e } = {}) => {
        let t = [e == null ? null : `blur(${e}px)`].filter(Boolean);
        return t.length ? t.join(` `) : `none`;
      }),
      (jSe = (e) =>
        e.querySelectorAll(
          `a[href], input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex^="-"]), [contenteditable]`,
        )));
  }))();
}
function MSe(e) {
  let t = NSe(e);
  return kg.Children.map(t, (e) => {
    if (typeof e == `string` && e.trim() !== ``)
      return t.length > 1 ? (0, PSe.jsx)(`span`, { children: e }) : e;
    if ((0, kg.isValidElement)(e)) {
      let { children: t, ...n } = e.props;
      if (t != null) return (0, kg.cloneElement)(e, n, MSe(t));
    }
    return e;
  });
}
function NSe(e) {
  let t = [],
    n = ``,
    r = () => {
      n !== `` && (t.push(n), (n = ``));
    };
  for (let i of kg.Children.toArray(e)) {
    if (typeof i == `string` || typeof i == `number`) {
      n += String(i);
      continue;
    }
    (r(), t.push(i));
  }
  return (r(), t);
}
function FSe() {
  return (FSe = t(() => {
    ((kg = o()), (PSe = K()));
  }))();
}
function zSe() {
  return (zSe = t(() => {
    ((ISe = `_LoadingIndicator_mlrw0_1`),
      (LSe = `_rotate_mlrw0_41`),
      (RSe = { LoadingIndicator: ISe, rotate: LSe }));
  }))();
}
function HSe() {
  return (HSe = t(() => {
    (yh(),
      Og(),
      zSe(),
      (BSe = K()),
      (VSe = ({ className: e, size: t, strokeWidth: n, style: r, ...i }) =>
        (0, BSe.jsx)(`div`, {
          ...i,
          className: q(RSe.LoadingIndicator, e),
          style: r || TSe({ "indicator-size": t, "indicator-stroke": n }),
        })));
  }))();
}
function USe(e) {
  return (t) => {
    e.forEach((e) => {
      typeof e == `function` ? e(t) : e != null && (e.current = t);
    });
  };
}
function QSe(e, t) {
  let n = (0, Ag.useRef)(e);
  (eCe(() => {
    n.current = e;
  }, [e]),
    (0, Ag.useEffect)(() => {
      if (!t && t !== 0) return;
      let e = setTimeout(() => {
        n.current();
      }, t);
      return () => {
        clearTimeout(e);
      };
    }, [t]));
}
function aCe() {
  return (aCe = t(() => {
    (Eg(), Og(), (iCe = () => xSe || SSe()));
  }))();
}
function oCe(e) {
  return (0, jg.isValidElement)(e) && !!e.key;
}
function sCe(e, t, n, r) {
  let i = e.reduce((e, t) => ({ ...e, [t.key]: 1 }), {}),
    a = t.reduce((e, t) => ({ ...e, [t.component.key]: 1 }), {}),
    o = e.filter((e) => !a[e.key]).map(n),
    s = t.map((t) => ({
      ...t,
      component: e.find(({ key: e }) => e === t.component.key) || t.component,
      shouldRender: !!i[t.component.key],
    }));
  return r === `append` ? s.concat(o) : o.concat(s);
}
function cCe(e, t, n) {
  if ((xSe || bSe) && t && n > 1)
    throw Error(`Cannot use forwardRef with multiple children in <${e} />`);
}
function lCe() {
  return (lCe = t(() => {
    ((jg = o()),
      Eg(),
      (Mg = (e, t = !1, n = `TransitionGroup`) => {
        let r = [];
        return (
          jg.Children.forEach(e, (e) => {
            if (oCe(e)) r.push(e);
            else if (t) throw Error(`Child elements of <${n} /> must include a \`key\``);
          }),
          r
        );
      }),
      (Ng = () => {}),
      (Pg = (e) => {
        let t = (0, jg.useRef)(e);
        return ((t.current = e), (0, jg.useCallback)((e) => t.current(e), []));
      }));
  }))();
}
function pCe() {
  return (pCe = t(() => {
    ((uCe = { enter: !1, enterActive: !1, exit: !1, exitActive: !1, interrupted: !1 }),
      (dCe = (e) => ({ ...uCe, enter: !e })),
      (fCe = (e, t) => {
        switch (t.type) {
          case `enter-before`:
            return {
              enter: !0,
              enterActive: !1,
              exit: !1,
              exitActive: !1,
              interrupted: e.interrupted || e.exit,
            };
          case `enter-active`:
            return { enter: !0, enterActive: !0, exit: !1, exitActive: !1, interrupted: !1 };
          case `exit-before`:
            return {
              enter: !1,
              enterActive: !1,
              exit: !0,
              exitActive: !1,
              interrupted: e.interrupted || e.enter,
            };
          case `exit-active`:
            return { enter: !1, enterActive: !1, exit: !0, exitActive: !0, interrupted: !1 };
          case `done`:
            return uCe;
        }
      }));
  }))();
}
function gCe() {
  return (gCe = t(() => {
    ((mCe = `_TransitionGroupChild_nbx58_1`), (hCe = { TransitionGroupChild: mCe }));
  }))();
}
function Lg() {
  return (Lg = t(() => {
    (yh(),
      (Fg = n(o(), 1)),
      rCe(),
      Og(),
      aCe(),
      lCe(),
      pCe(),
      gCe(),
      (Ig = K()),
      (_Ce = ({
        ref: e,
        as: t,
        children: n,
        className: r,
        transitionId: i,
        style: a,
        preventMountTransition: o,
        shouldRender: s,
        enterDuration: c,
        exitDuration: l,
        removeChild: u,
        onEnter: d,
        onEnterActive: f,
        onEnterComplete: p,
        onExit: m,
        onExitActive: h,
        onExitComplete: g,
      }) => {
        let [_, v] = (0, Fg.useReducer)(fCe, dCe(o || !1)),
          y = (0, Fg.useRef)(!1),
          b = (0, Fg.useRef)(null),
          x = (0, Fg.useRef)(c);
        x.current = c;
        let S = (0, Fg.useRef)(l);
        S.current = l;
        let C = (0, Fg.useRef)(null),
          w = (0, Fg.useCallback)(
            (e) => {
              let t = b.current;
              if (t && e !== C.current)
                switch (((C.current = e), e)) {
                  case `enter`:
                    d(t);
                    break;
                  case `enter-active`:
                    f(t);
                    break;
                  case `enter-complete`:
                    p(t);
                    break;
                  case `exit`:
                    m(t);
                    break;
                  case `exit-active`:
                    h(t);
                    break;
                  case `exit-complete`:
                    g(t);
                }
            },
            [d, f, p, m, h, g],
          );
        return (
          Fg.useLayoutEffect(() => {
            if (!s) {
              let e;
              (v({ type: `exit-before` }), w(`exit`));
              let t = wSe(() => {
                (v({ type: `exit-active` }),
                  w(`exit-active`),
                  (e = window.setTimeout(() => {
                    (w(`exit-complete`), u());
                  }, S.current)));
              });
              return () => {
                (t(), e !== void 0 && clearTimeout(e));
              };
            }
            if (o && !y.current) {
              y.current = !0;
              return;
            }
            let e;
            (v({ type: `enter-before` }), w(`enter`));
            let t = wSe(() => {
              (v({ type: `enter-active` }),
                w(`enter-active`),
                (e = window.setTimeout(() => {
                  (v({ type: `done` }), w(`enter-complete`));
                }, x.current)));
            });
            return () => {
              (t(), e !== void 0 && clearTimeout(e));
            };
          }, [s, o, u, w]),
          (0, Fg.useEffect)(
            () => () => {
              y.current = !1;
            },
            [],
          ),
          (0, Ig.jsx)(t, {
            ref: USe([b, e]),
            className: q(r, hCe.TransitionGroupChild),
            "data-transition-id": i,
            style: a,
            "data-entering": _.enter ? `` : void 0,
            "data-entering-active": _.enterActive ? `` : void 0,
            "data-exiting": _.exit ? `` : void 0,
            "data-exiting-active": _.exitActive ? `` : void 0,
            "data-interrupted": _.interrupted ? `` : void 0,
            children: n,
          })
        );
      }),
      (vCe = (e) => {
        let { enterMountDelay: t, preventMountTransition: n } = e,
          r = !n && t != null ? t : null,
          [i, a] = (0, Fg.useState)(r == null);
        return (QSe(() => a(!0), i ? null : r), i ? (0, Ig.jsx)(_Ce, { ...e }) : null);
      }),
      (yCe = (e) => {
        let {
            ref: t,
            as: n = `span`,
            children: r,
            className: i,
            transitionId: a,
            style: o,
            enterDuration: s = 0,
            exitDuration: c = 0,
            preventInitialTransition: l = !0,
            enterMountDelay: u,
            insertMethod: d = `append`,
            disableAnimations: f = iCe(),
          } = e,
          p = Pg(e.onEnter ?? Ng),
          m = Pg(e.onEnterActive ?? Ng),
          h = Pg(e.onEnterComplete ?? Ng),
          g = Pg(e.onExit ?? Ng),
          _ = Pg(e.onExitActive ?? Ng),
          v = Pg(e.onExitComplete ?? Ng);
        Fg.Children.forEach(r, (e) => {
          if (e && !oCe(e))
            throw Error("Child elements of <TransitionGroup /> must include a `key`");
        });
        let y = (0, Fg.useCallback)(
            (e) => ({
              component: e,
              shouldRender: !0,
              removeChild: () => {
                x((t) => t.filter((t) => e.key !== t.component.key));
              },
              onEnter: p,
              onEnterActive: m,
              onEnterComplete: h,
              onExit: g,
              onExitActive: _,
              onExitComplete: v,
            }),
            [p, m, h, g, _, v],
          ),
          [b, x] = (0, Fg.useState)(() =>
            Mg(r).map((e) => ({ ...y(e), preventMountTransition: l })),
          );
        if (
          ((0, Fg.useLayoutEffect)(() => {
            x((e) => sCe(Mg(r), e, y, d));
          }, [r, d, y]),
          cCe(`TransitionGroup`, t, Fg.Children.count(r)),
          f)
        )
          return (0, Ig.jsx)(Ig.Fragment, {
            children: Mg(r).map((e) =>
              (0, Ig.jsx)(
                n,
                { ref: t, className: i, style: o, "data-transition-id": a, children: e },
                e.key,
              ),
            ),
          });
        let S = new Map(Mg(r).map((e) => [e.key, e]));
        return (0, Ig.jsx)(Ig.Fragment, {
          children: b.map(({ component: e, ...r }) => {
            let l = S.get(e.key) ?? e;
            return (0, Ig.jsx)(
              vCe,
              {
                ...r,
                as: n,
                className: i,
                transitionId: a,
                enterDuration: s,
                exitDuration: c,
                enterMountDelay: u,
                style: o,
                ref: t,
                children: l,
              },
              l.key,
            );
          }),
        });
      }));
  }))();
}
function wCe() {
  return (wCe = t(() => {
    ((bCe = `_Button_eg66f_2`),
      (xCe = `_ButtonInner_eg66f_2`),
      (SCe = `_ButtonLoader_eg66f_2`),
      (CCe = { Button: bCe, ButtonInner: xCe, ButtonLoader: SCe }));
  }))();
}
function DCe() {
  return (DCe = t(() => {
    (yh(),
      (TCe = o()),
      pSe(),
      Og(),
      FSe(),
      HSe(),
      Lg(),
      wCe(),
      (Rg = K()),
      (ECe = (e) => {
        let {
            type: t = `button`,
            color: n = `primary`,
            variant: r = `solid`,
            pill: i = wg.pill,
            squircle: a = !i && wg.squircle,
            uniform: o = !1,
            size: s = `xs`,
            iconSize: c,
            gutterSize: l,
            loading: u,
            selected: d,
            block: f,
            opticallyAlign: p,
            children: m,
            className: h,
            onClick: g,
            disabled: _,
            disabledTone: v,
            inert: y = u,
            ...b
          } = e,
          x = _ || y,
          S = (0, TCe.useCallback)(
            (e) => {
              _ || g?.(e);
            },
            [g, _],
          );
        return (0, Rg.jsxs)(`button`, {
          type: t,
          className: q(CCe.Button, h),
          "data-color": n,
          "data-variant": r,
          "data-pill": i && !a ? `` : void 0,
          "data-squircle": a ? `` : void 0,
          "data-uniform": o ? `` : void 0,
          "data-size": s,
          "data-gutter-size": l,
          "data-icon-size": c,
          "data-loading": u ? `` : void 0,
          "data-selected": d ? `` : void 0,
          "data-suppress-active-style": d === !1 ? `` : void 0,
          "data-block": f ? `` : void 0,
          "data-optically-align": p,
          onPointerEnter: CSe,
          disabled: x,
          "aria-disabled": x,
          tabIndex: x ? -1 : void 0,
          "data-disabled": _ ? `` : void 0,
          "data-disabled-tone": _ ? v : void 0,
          onClick: S,
          ...b,
          children: [
            (0, Rg.jsx)(yCe, {
              className: CCe.ButtonLoader,
              enterDuration: 250,
              exitDuration: 150,
              children: u && (0, Rg.jsx)(VSe, {}, `loader`),
            }),
            (0, Rg.jsx)(`span`, { className: CCe.ButtonInner, children: MSe(m) }),
          ],
        });
      }));
  }))();
}
 DCe();
 return {LegacyButton:ECe,LoadingIndicator:VSe,TransitionGroup:yCe};
}
