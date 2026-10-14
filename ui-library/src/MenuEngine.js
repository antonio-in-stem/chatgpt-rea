// Original contiguous DOM interaction, positioning and dropdown engine.
import {a as e,n as t,o as n,r,t as i} from './BundleRuntime.js';
export function createMenuEngine({React,ReactDOM}){
 if(!ReactDOM?.createPortal||!ReactDOM?.flushSync)throw new TypeError('Menu engine requires ReactDOM');
 const o=()=>React,ph=()=>ReactDOM;
 const runtime={Fragment:React.Fragment,jsx:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key}),jsxs:(type,props,key)=>React.createElement(type,key===undefined?props:{...props,key},...props.children)},K=()=>runtime;
function zCe(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
function BCe(...e) {
  return (t) => {
    let n = !1,
      r = e.map((e) => {
        let r = zCe(e, t);
        return (!n && typeof r == `function` && (n = !0), r);
      });
    if (n)
      return () => {
        for (let t = 0; t < r.length; t++) {
          let n = r[t];
          typeof n == `function` ? n() : zCe(e[t], null);
        }
      };
  };
}
function zg(...e) {
  return VCe.useCallback(BCe(...e), e);
}
var VCe, HCe, UCe;
function Bg() {
  return (Bg = t(() => {
    ((VCe = n(o(), 1)),
      (HCe = Object.defineProperty),
      (UCe = (e, t) => HCe(e, `name`, { value: t, configurable: !0 })),
      UCe(zCe, `setRef`),
      UCe(BCe, `composeRefs`),
      UCe(zg, `useComposedRefs`));
  }))();
}
function Vg(e) {
  let t = Hg.forwardRef((t, n) => {
    let { children: r, ...i } = t,
      a = null,
      o = !1,
      s = [];
    (JCe(r) && typeof Wg == `function` && (r = Wg(r._payload)),
      Hg.Children.forEach(r, (e) => {
        if (qCe(e)) {
          o = !0;
          let t = e,
            n = `child` in t.props ? t.props.child : t.props.children;
          (JCe(n) && typeof Wg == `function` && (n = Wg(n._payload)),
            (a = $Ce(t, n)),
            s.push(a?.props?.children));
        } else s.push(e);
      }),
      a
        ? (a = Hg.cloneElement(a, void 0, s))
        : !o && Hg.Children.count(r) === 1 && Hg.isValidElement(r) && (a = r));
    let c = a ? KCe(a) : void 0,
      l = zg(n, c);
    if (!a) {
      if (r || r === 0) throw Error(o ? nwe(e) : twe(e));
      return r;
    }
    let u = GCe(i, a.props ?? {});
    return (a.type !== Hg.Fragment && (u.ref = n ? l : c), Hg.cloneElement(a, u));
  });
  return ((t.displayName = `${e}.Slot`), t);
}
function WCe(e) {
  let t = Ug((e) => (`child` in e ? e.children(e.child) : e.children), `Slottable`);
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = QCe), t);
}
function GCe(e, t) {
  let n = { ...t };
  for (let r in t) {
    let i = e[r],
      a = t[r];
    /^on[A-Z]/.test(r)
      ? i && a
        ? (n[r] = (...e) => {
            let t = a(...e);
            return (i(...e), t);
          })
        : i && (n[r] = i)
      : r === `style`
        ? (n[r] = { ...i, ...a })
        : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `));
  }
  return { ...e, ...n };
}
function KCe(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function qCe(e) {
  return (
    Hg.isValidElement(e) &&
    typeof e.type == `function` &&
    `__radixId` in e.type &&
    e.type.__radixId === QCe
  );
}
function JCe(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `$$typeof` in e &&
    e.$$typeof === ewe &&
    `_payload` in e &&
    YCe(e._payload)
  );
}
function YCe(e) {
  return typeof e == `object` && !!e && `then` in e;
}
var Hg, XCe, Ug, ZCe, QCe, $Ce, ewe, twe, nwe, Wg;
function Gg() {
  return (Gg = t(() => {
    ((Hg = n(o(), 1)),
      Bg(),
      (XCe = Object.defineProperty),
      (Ug = (e, t) => XCe(e, `name`, { value: t, configurable: !0 })),
      Ug(Vg, `createSlot`),
      (ZCe = Vg(`Slot`)),
      (QCe = Symbol.for(`radix.slottable`)),
      Ug(WCe, `createSlottable`),
      ($Ce = Ug((e, t) => {
        if (`child` in e.props) {
          let t = e.props.child;
          return Hg.isValidElement(t)
            ? Hg.cloneElement(t, void 0, e.props.children(t.props.children))
            : null;
        }
        return Hg.isValidElement(t) ? t : null;
      }, `getSlottableElementFromSlottable`)),
      Ug(GCe, `mergeProps`),
      Ug(KCe, `getElementRef`),
      Ug(qCe, `isSlottable`),
      (ewe = Symbol.for(`react.lazy`)),
      Ug(JCe, `isLazyComponent`),
      Ug(YCe, `isPromiseLike`),
      (twe = Ug(
        (e) =>
          `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
        `createSlotError`,
      )),
      (nwe = Ug(
        (e) =>
          `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
        `createSlottableError`,
      )),
      (Wg = Hg.use));
  }))();
}
function rwe(e, t) {
  e && awe.flushSync(() => e.dispatchEvent(t));
}
var iwe, awe, owe, swe, cwe, Kg;
function qg() {
  return (qg = t(() => {
    ((iwe = n(o(), 1)),
      (awe = n(ph(), 1)),
      Gg(),
      (owe = K()),
      (swe = Object.defineProperty),
      (cwe = (e, t) => swe(e, `name`, { value: t, configurable: !0 })),
      (Kg = [
        `a`,
        `button`,
        `div`,
        `form`,
        `h2`,
        `h3`,
        `img`,
        `input`,
        `label`,
        `li`,
        `nav`,
        `ol`,
        `p`,
        `select`,
        `span`,
        `svg`,
        `ul`,
      ].reduce((e, t) => {
        let n = Vg(`Primitive.${t}`),
          r = iwe.forwardRef((e, r) => {
            let { asChild: i, ...a } = e,
              o = i ? n : t;
            return (
              typeof window < `u` && (window[Symbol.for(`radix-ui`)] = !0),
              (0, owe.jsx)(o, { ...a, ref: r })
            );
          });
        return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
      }, {})),
      cwe(rwe, `dispatchDiscreteCustomEvent`));
  }))();
}
var lwe, uwe, dwe, fwe, pwe, mwe, hwe;
function gwe() {
  return (gwe = t(() => {
    ((lwe = n(o(), 1)),
      qg(),
      (uwe = K()),
      (dwe = Object.defineProperty),
      (fwe = (e, t) => dwe(e, `name`, { value: t, configurable: !0 })),
      (pwe = Object.freeze({
        position: `absolute`,
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: `hidden`,
        clip: `rect(0, 0, 0, 0)`,
        whiteSpace: `nowrap`,
        wordWrap: `normal`,
      })),
      (mwe = lwe.forwardRef(
        fwe(function (e, t) {
          return (0, uwe.jsx)(Kg.span, { ...e, ref: t, style: { ...pwe, ...e.style } });
        }, `VisuallyHidden`),
      )),
      (hwe = mwe));
  }))();
}
function _we(e, t) {
  let n = Yg.createContext(t);
  n.displayName = e + `Context`;
  let r = Xg((e) => {
    let { children: t, ...r } = e,
      i = Yg.useMemo(() => r, Object.values(r));
    return (0, ywe.jsx)(n.Provider, { value: i, children: t });
  }, `Provider`);
  r.displayName = e + `Provider`;
  function i(r, i = {}) {
    let { optional: a = !1 } = i,
      o = Yg.useContext(n);
    if (o) return o;
    if (t !== void 0) return t;
    if (!a) throw Error(`\`${r}\` must be used within \`${e}\``);
  }
  return (Xg(i, `useContext`), [r, i]);
}
function Jg(e, t = []) {
  let n = [];
  function r(t, r) {
    let i = Yg.createContext(r);
    i.displayName = t + `Context`;
    let a = n.length;
    n = [...n, r];
    let o = Xg((t) => {
      let { scope: n, children: r, ...o } = t,
        s = n?.[e]?.[a] || i,
        c = Yg.useMemo(() => o, Object.values(o));
      return (0, ywe.jsx)(s.Provider, { value: c, children: r });
    }, `Provider`);
    o.displayName = t + `Provider`;
    function s(n, o, s = {}) {
      let { optional: c = !1 } = s,
        l = o?.[e]?.[a] || i,
        u = Yg.useContext(l);
      if (u) return u;
      if (r !== void 0) return r;
      if (!c) throw Error(`\`${n}\` must be used within \`${t}\``);
    }
    return (Xg(s, `useContext`), [o, s]);
  }
  Xg(r, `createContext`);
  let i = Xg(() => {
    let t = n.map((e) => Yg.createContext(e));
    return Xg(function (n) {
      let r = n?.[e] || t;
      return Yg.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: r } }), [n, r]);
    }, `useScope`);
  }, `createScope`);
  return ((i.scopeName = e), [r, vwe(i, ...t)]);
}
function vwe(...e) {
  let t = e[0];
  if (e.length === 1) return t;
  let n = Xg(() => {
    let n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
    return Xg(function (e) {
      let r = n.reduce((t, { useScope: n, scopeName: r }) => {
        let i = n(e)[`__scope${r}`];
        return { ...t, ...i };
      }, {});
      return Yg.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
    }, `useComposedScopes`);
  }, `createScope`);
  return ((n.scopeName = t.scopeName), n);
}
var Yg, ywe, bwe, Xg;
function Zg() {
  return (Zg = t(() => {
    ((Yg = n(o(), 1)),
      (ywe = K()),
      (bwe = Object.defineProperty),
      (Xg = (e, t) => bwe(e, `name`, { value: t, configurable: !0 })),
      Xg(_we, `createContext`),
      Xg(Jg, `createContextScope`),
      Xg(vwe, `composeContextScopes`));
  }))();
}
function Qg(e) {
  let t = e + `CollectionProvider`,
    [n, r] = Jg(t),
    [i, a] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    o = i_((e) => {
      let { scope: t, children: n } = e,
        r = e_.useRef(null),
        a = e_.useRef(new Map()).current;
      return (0, t_.jsx)(i, { scope: t, itemMap: a, collectionRef: r, children: n });
    }, `CollectionProvider`);
  o.displayName = t;
  let s = e + `CollectionSlot`,
    c = Vg(s),
    l = e_.forwardRef((e, t) => {
      let { scope: n, children: r } = e,
        i = zg(t, a(s, n).collectionRef);
      return (0, t_.jsx)(c, { ref: i, children: r });
    });
  l.displayName = s;
  let u = e + `CollectionItemSlot`,
    d = `data-radix-collection-item`,
    f = Vg(u),
    p = e_.forwardRef((e, t) => {
      let { scope: n, children: r, ...i } = e,
        o = e_.useRef(null),
        s = zg(t, o),
        c = a(u, n);
      return (
        e_.useEffect(() => (c.itemMap.set(o, { ref: o, ...i }), () => void c.itemMap.delete(o))),
        (0, t_.jsx)(f, { [d]: ``, ref: s, children: r })
      );
    });
  p.displayName = u;
  function m(t) {
    let n = a(e + `CollectionConsumer`, t);
    return e_.useCallback(() => {
      let e = n.collectionRef.current;
      if (!e) return [];
      let t = Array.from(e.querySelectorAll(`[${d}]`));
      return Array.from(n.itemMap.values()).sort(
        (e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current),
      );
    }, [n.collectionRef, n.itemMap]);
  }
  return (i_(m, `useCollection`), [{ Provider: o, Slot: l, ItemSlot: p }, m, r]);
}
function $g(e, t) {
  if (`at` in Array.prototype) return Array.prototype.at.call(e, t);
  let n = xwe(e, t);
  return n === -1 ? void 0 : e[n];
}
function xwe(e, t) {
  let n = e.length,
    r = Swe(t),
    i = r >= 0 ? r : n + r;
  return i < 0 || i >= n ? -1 : i;
}
function Swe(e) {
  return e !== e || e === 0 ? 0 : Math.trunc(e);
}
function Cwe(e) {
  let t = e + `CollectionProvider`,
    [n, r] = Jg(t),
    [i, a] = n(t, {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new a_(),
      setItemMap: i_(() => void 0, `setItemMap`),
    }),
    o = i_(
      ({ state: e, ...t }) => (e ? (0, r_.jsx)(c, { ...t, state: e }) : (0, r_.jsx)(s, { ...t })),
      `CollectionProvider`,
    );
  o.displayName = t;
  let s = i_((e) => {
    let t = h();
    return (0, r_.jsx)(c, { ...e, state: t });
  }, `CollectionInit`);
  s.displayName = t + `Init`;
  let c = i_((e) => {
    let { scope: t, children: n, state: r } = e,
      a = n_.useRef(null),
      [o, s] = n_.useState(null),
      c = zg(a, s),
      [l, u] = r;
    return (
      n_.useEffect(() => {
        if (!o) return;
        let e = Dwe(() => {});
        return (
          e.observe(o, { childList: !0, subtree: !0 }),
          () => {
            e.disconnect();
          }
        );
      }, [o]),
      (0, r_.jsx)(i, {
        scope: t,
        itemMap: l,
        setItemMap: u,
        collectionRef: c,
        collectionRefObject: a,
        collectionElement: o,
        children: n,
      })
    );
  }, `CollectionProviderImpl`);
  c.displayName = t + `Impl`;
  let l = e + `CollectionSlot`,
    u = Vg(l),
    d = n_.forwardRef((e, t) => {
      let { scope: n, children: r } = e,
        i = zg(t, a(l, n).collectionRef);
      return (0, r_.jsx)(u, { ref: i, children: r });
    });
  d.displayName = l;
  let f = e + `CollectionItemSlot`,
    p = Vg(f),
    m = n_.forwardRef((e, t) => {
      let { scope: n, children: r, ...i } = e,
        o = n_.useRef(null),
        [s, c] = n_.useState(null),
        l = zg(t, o, c),
        { setItemMap: u } = a(f, n),
        d = n_.useRef(i);
      wwe(d.current, i) || (d.current = i);
      let m = d.current;
      return (
        n_.useEffect(() => {
          let e = m;
          return (
            u((t) =>
              s
                ? t.has(s)
                  ? t.set(s, { ...e, element: s }).toSorted(Ewe)
                  : (t.set(s, { ...e, element: s }), t.toSorted(Ewe))
                : t,
            ),
            () => {
              u((e) => (!s || !e.has(s) ? e : (e.delete(s), new a_(e))));
            }
          );
        }, [s, m, u]),
        (0, r_.jsx)(p, { "data-radix-collection-item": ``, ref: l, children: r })
      );
    });
  m.displayName = f;
  function h() {
    return n_.useState(new a_());
  }
  i_(h, `useInitCollection`);
  function g(t) {
    let { itemMap: n } = a(e + `CollectionConsumer`, t);
    return n;
  }
  return (
    i_(g, `useCollection`),
    [
      { Provider: o, Slot: d, ItemSlot: m },
      { createCollectionScope: r, useCollection: g, useInitCollection: h },
    ]
  );
}
function wwe(e, t) {
  if (e === t) return !0;
  if (typeof e != `object` || typeof t != `object` || e == null || t == null) return !1;
  let n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (let r of n) if (!Object.prototype.hasOwnProperty.call(t, r) || e[r] !== t[r]) return !1;
  return !0;
}
function Twe(e, t) {
  return !!(t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING);
}
function Ewe(e, t) {
  return !e[1].element || !t[1].element ? 0 : Twe(e[1].element, t[1].element) ? -1 : 1;
}
function Dwe(e) {
  return new MutationObserver((t) => {
    for (let n of t)
      if (n.type === `childList`) {
        e();
        return;
      }
  });
}
var e_, t_, n_, r_, Owe, i_, kwe, a_;
function o_() {
  return (o_ = t(() => {
    ((e_ = n(o(), 1)),
      Zg(),
      Bg(),
      Gg(),
      (t_ = K()),
      (n_ = n(o(), 1)),
      (r_ = K()),
      (Owe = Object.defineProperty),
      (i_ = (e, t) => Owe(e, `name`, { value: t, configurable: !0 })),
      i_(Qg, `createCollection`),
      (kwe = new WeakMap()),
      (a_ = class e extends Map {
        static {
          i_(this, `OrderedDict`);
        }
        #e;
        constructor(e) {
          (super(e), (this.#e = [...super.keys()]), kwe.set(this, !0));
        }
        set(e, t) {
          return (
            kwe.get(this) && (this.has(e) ? (this.#e[this.#e.indexOf(e)] = e) : this.#e.push(e)),
            super.set(e, t),
            this
          );
        }
        insert(e, t, n) {
          let r = this.has(t),
            i = this.#e.length,
            a = Swe(e),
            o = a >= 0 ? a : i + a,
            s = o < 0 || o >= i ? -1 : o;
          if (s === this.size || (r && s === this.size - 1) || s === -1)
            return (this.set(t, n), this);
          let c = this.size + +!r;
          a < 0 && o++;
          let l = [...this.#e],
            u,
            d = !1;
          for (let e = o; e < c; e++)
            if (o === e) {
              let i = l[e];
              (l[e] === t && (i = l[e + 1]),
                r && this.delete(t),
                (u = this.get(i)),
                this.set(t, n));
            } else {
              !d && l[e - 1] === t && (d = !0);
              let n = l[d ? e : e - 1],
                r = u;
              ((u = this.get(n)), this.delete(n), this.set(n, r));
            }
          return this;
        }
        with(t, n, r) {
          let i = new e(this);
          return (i.insert(t, n, r), i);
        }
        before(e) {
          let t = this.#e.indexOf(e) - 1;
          if (!(t < 0)) return this.entryAt(t);
        }
        setBefore(e, t, n) {
          let r = this.#e.indexOf(e);
          return r === -1 ? this : this.insert(r, t, n);
        }
        after(e) {
          let t = this.#e.indexOf(e);
          if (((t = t === -1 || t === this.size - 1 ? -1 : t + 1), t !== -1))
            return this.entryAt(t);
        }
        setAfter(e, t, n) {
          let r = this.#e.indexOf(e);
          return r === -1 ? this : this.insert(r + 1, t, n);
        }
        first() {
          return this.entryAt(0);
        }
        last() {
          return this.entryAt(-1);
        }
        clear() {
          return ((this.#e = []), super.clear());
        }
        delete(e) {
          let t = super.delete(e);
          return (t && this.#e.splice(this.#e.indexOf(e), 1), t);
        }
        deleteAt(e) {
          let t = this.keyAt(e);
          return t !== void 0 && this.delete(t);
        }
        at(e) {
          let t = $g(this.#e, e);
          if (t !== void 0) return this.get(t);
        }
        entryAt(e) {
          let t = $g(this.#e, e);
          if (t !== void 0) return [t, this.get(t)];
        }
        indexOf(e) {
          return this.#e.indexOf(e);
        }
        keyAt(e) {
          return $g(this.#e, e);
        }
        from(e, t) {
          let n = this.indexOf(e);
          if (n === -1) return;
          let r = n + t;
          return (r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r));
        }
        keyFrom(e, t) {
          let n = this.indexOf(e);
          if (n === -1) return;
          let r = n + t;
          return (r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r));
        }
        find(e, t) {
          let n = 0;
          for (let r of this) {
            if (Reflect.apply(e, t, [r, n, this])) return r;
            n++;
          }
        }
        findIndex(e, t) {
          let n = 0;
          for (let r of this) {
            if (Reflect.apply(e, t, [r, n, this])) return n;
            n++;
          }
          return -1;
        }
        filter(t, n) {
          let r = [],
            i = 0;
          for (let e of this) (Reflect.apply(t, n, [e, i, this]) && r.push(e), i++);
          return new e(r);
        }
        map(t, n) {
          let r = [],
            i = 0;
          for (let e of this) (r.push([e[0], Reflect.apply(t, n, [e, i, this])]), i++);
          return new e(r);
        }
        reduce(...e) {
          let [t, n] = e,
            r = 0,
            i = n ?? this.at(0);
          for (let n of this)
            ((i = r === 0 && e.length === 1 ? n : Reflect.apply(t, this, [i, n, r, this])), r++);
          return i;
        }
        reduceRight(...e) {
          let [t, n] = e,
            r = n ?? this.at(-1);
          for (let n = this.size - 1; n >= 0; n--) {
            let i = this.at(n);
            r = n === this.size - 1 && e.length === 1 ? i : Reflect.apply(t, this, [r, i, n, this]);
          }
          return r;
        }
        toSorted(t) {
          let n = [...this.entries()].sort(t);
          return new e(n);
        }
        toReversed() {
          let t = new e();
          for (let e = this.size - 1; e >= 0; e--) {
            let n = this.keyAt(e),
              r = this.get(n);
            t.set(n, r);
          }
          return t;
        }
        toSpliced(...t) {
          let n = [...this.entries()];
          return (n.splice(...t), new e(n));
        }
        slice(t, n) {
          let r = new e(),
            i = this.size - 1;
          if (t === void 0) return r;
          (t < 0 && (t += this.size), n !== void 0 && n > 0 && (i = n - 1));
          for (let e = t; e <= i; e++) {
            let t = this.keyAt(e),
              n = this.get(t);
            r.set(t, n);
          }
          return r;
        }
        every(e, t) {
          let n = 0;
          for (let r of this) {
            if (!Reflect.apply(e, t, [r, n, this])) return !1;
            n++;
          }
          return !0;
        }
        some(e, t) {
          let n = 0;
          for (let r of this) {
            if (Reflect.apply(e, t, [r, n, this])) return !0;
            n++;
          }
          return !1;
        }
      }),
      i_($g, `at`),
      i_(xwe, `toSafeIndex`),
      i_(Swe, `toSafeInteger`),
      i_(Cwe, `createCollection`),
      i_(wwe, `shallowEqual`),
      i_(Twe, `isElementPreceding`),
      i_(Ewe, `sortByDocumentPosition`),
      i_(Dwe, `getChildListObserver`));
  }))();
}
function s_(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return c_(function (r) {
    if ((e?.(r), n === !1 || !r || !r.defaultPrevented)) return t?.(r);
  }, `handleEvent`);
}
function Awe(e) {
  if (!Fwe) throw Error(`Cannot access window outside of the DOM`);
  return e?.ownerDocument?.defaultView ?? window;
}
function jwe(e) {
  if (!Fwe) throw Error(`Cannot access document outside of the DOM`);
  return e?.ownerDocument ?? document;
}
function Mwe(e, t = !1) {
  let { activeElement: n } = jwe(e);
  if (!n?.nodeName) return null;
  if (Nwe(n) && n.contentDocument) return Mwe(n.contentDocument.body, t);
  if (t) {
    let e = n.getAttribute(`aria-activedescendant`);
    if (e) {
      let t = jwe(n).getElementById(e);
      if (t) return t;
    }
  }
  return n;
}
function Nwe(e) {
  return e.tagName === `IFRAME`;
}
var Pwe, c_, Fwe;
function l_() {
  return (l_ = t(() => {
    ((Pwe = Object.defineProperty),
      (c_ = (e, t) => Pwe(e, `name`, { value: t, configurable: !0 })),
      (Fwe = !!(typeof window < `u` && window.document && window.document.createElement)),
      c_(s_, `composeEventHandlers`),
      c_(Awe, `getOwnerWindow`),
      c_(jwe, `getOwnerDocument`),
      c_(Mwe, `getActiveElement`),
      c_(Nwe, `isFrame`));
  }))();
}
var Iwe, u_;
function d_() {
  return (d_ = t(() => {
    ((Iwe = n(o(), 1)), (u_ = globalThis?.document ? Iwe.useLayoutEffect : () => {}));
  }))();
}
function Lwe(e) {
  if (typeof Bwe == `function`) return Bwe(e);
  let t = f_.useRef(() => {
    throw Error(`Cannot call an event handler while rendering.`);
  });
  return (
    typeof Vwe == `function`
      ? Vwe(() => {
          t.current = e;
        })
      : u_(() => {
          t.current = e;
        }),
    f_.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
var f_, Rwe, zwe, Bwe, Vwe;
function Hwe() {
  return (Hwe = t(() => {
    (d_(),
      (f_ = n(o(), 1)),
      (Rwe = Object.defineProperty),
      (zwe = (e, t) => Rwe(e, `name`, { value: t, configurable: !0 })),
      (Bwe = f_.useEffectEvent),
      (Vwe = f_.useInsertionEffect),
      zwe(Lwe, `useEffectEvent`));
  }))();
}
function p_({ prop: e, defaultProp: t, onChange: n = g_(() => {}, `onChange`), caller: r }) {
  let [i, a, o] = Uwe({ defaultProp: t, onChange: n }),
    s = e !== void 0;
  return [
    s ? e : i,
    m_.useCallback(
      (t) => {
        if (s) {
          let n = Wwe(t) ? t(e) : t;
          n !== e && o.current?.(n);
        } else a(t);
      },
      [s, e, a, o],
    ),
  ];
}
function Uwe({ defaultProp: e, onChange: t }) {
  let [n, r] = m_.useState(e),
    i = m_.useRef(n),
    a = m_.useRef(t);
  return (
    qwe(() => {
      a.current = t;
    }, [t]),
    m_.useEffect(() => {
      i.current !== n && (a.current?.(n), (i.current = n));
    }, [n, i]),
    [n, r, a]
  );
}
function Wwe(e) {
  return typeof e == `function`;
}
function Gwe(e, t, n, r) {
  let { prop: i, defaultProp: a, onChange: o, caller: s } = t,
    c = i !== void 0,
    l = Lwe(o),
    u = [{ ...n, state: a }];
  r && u.push(r);
  let [d, f] = h_.useReducer(
      (t, n) => {
        if (n.type === Jwe) return { ...t, state: n.state };
        let r = e(t, n);
        return (c && !Object.is(r.state, t.state) && l(r.state), r);
      },
      ...u,
    ),
    p = d.state,
    m = h_.useRef(p);
  h_.useEffect(() => {
    m.current !== p && ((m.current = p), c || l(p));
  }, [p, m, c]);
  let h = h_.useMemo(() => (i === void 0 ? d : { ...d, state: i }), [d, i]);
  return (
    h_.useEffect(() => {
      c && !Object.is(i, d.state) && f({ type: Jwe, state: i });
    }, [i, d.state, c]),
    [h, f]
  );
}
var m_, h_, Kwe, g_, qwe, Jwe;
function __() {
  return (__ = t(() => {
    ((m_ = n(o(), 1)),
      d_(),
      (h_ = n(o(), 1)),
      Hwe(),
      (Kwe = Object.defineProperty),
      (g_ = (e, t) => Kwe(e, `name`, { value: t, configurable: !0 })),
      (qwe = m_.useInsertionEffect || u_),
      g_(p_, `useControllableState`),
      g_(Uwe, `useUncontrolledState`),
      g_(Wwe, `isFunction`),
      (Jwe = Symbol(`RADIX:SYNC_STATE`)),
      g_(Gwe, `useControllableStateReducer`));
  }))();
}
function Ywe(e, t) {
  return eTe.useReducer((e, n) => t[e][n] ?? e, e);
}
function Xwe(e) {
  let [t, n] = y_.useState(),
    r = y_.useRef(null),
    i = y_.useRef(e),
    a = y_.useRef(`none`),
    o = y_.useRef(void 0),
    [s, c] = Ywe(e ? `mounted` : `unmounted`, {
      mounted: { UNMOUNT: `unmounted`, ANIMATION_OUT: `unmountSuspended` },
      unmountSuspended: { MOUNT: `mounted`, ANIMATION_END: `unmounted` },
      unmounted: { MOUNT: `mounted` },
    });
  return (
    y_.useEffect(() => {
      s === `mounted`
        ? ((a.current = o.current ?? v_(r.current)), (o.current = void 0))
        : (a.current = `none`);
    }, [s]),
    u_(() => {
      let t = r.current,
        n = i.current;
      if (n !== e) {
        let r = a.current,
          s = v_(t);
        (e
          ? ((o.current = s), c(`MOUNT`))
          : s === `none` || t?.display === `none`
            ? c(`UNMOUNT`)
            : c(n && r !== s ? `ANIMATION_OUT` : `UNMOUNT`),
          (i.current = e));
      }
    }, [e, c]),
    u_(() => {
      if (t) {
        let e,
          n = t.ownerDocument.defaultView ?? window,
          o = b_((a) => {
            let o = v_(r.current).includes(CSS.escape(a.animationName));
            if (a.target === t && o && (c(`ANIMATION_END`), !i.current)) {
              let r = t.style.animationFillMode;
              ((t.style.animationFillMode = `forwards`),
                (e = n.setTimeout(() => {
                  t.style.animationFillMode === `forwards` && (t.style.animationFillMode = r);
                })));
            }
          }, `handleAnimationEnd`),
          s = b_((e) => {
            e.target === t && (a.current = v_(r.current));
          }, `handleAnimationStart`);
        return (
          t.addEventListener(`animationstart`, s),
          t.addEventListener(`animationcancel`, o),
          t.addEventListener(`animationend`, o),
          () => {
            (n.clearTimeout(e),
              t.removeEventListener(`animationstart`, s),
              t.removeEventListener(`animationcancel`, o),
              t.removeEventListener(`animationend`, o));
          }
        );
      }
      c(`ANIMATION_END`);
    }, [t, c]),
    {
      isPresent: [`mounted`, `unmountSuspended`].includes(s),
      ref: y_.useCallback((e) => {
        if (e) {
          let t = getComputedStyle(e);
          ((r.current = t), (o.current = v_(t)));
        } else r.current = null;
        n(e);
      }, []),
    }
  );
}
function Zwe(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
function Qwe(...e) {
  let t = y_.useRef(e);
  return (
    (t.current = e),
    y_.useCallback((e) => {
      let n = t.current,
        r = !1,
        i = n.map((t) => {
          let n = Zwe(t, e);
          return (!r && typeof n == `function` && (r = !0), n);
        });
      if (r)
        return () => {
          for (let e = 0; e < i.length; e++) {
            let t = i[e];
            typeof t == `function` ? t() : Zwe(n[e], null);
          }
        };
    }, [])
  );
}
function v_(e) {
  return e?.animationName || `none`;
}
function $we(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var y_, eTe, tTe, b_, x_;
function S_() {
  return (S_ = t(() => {
    ((y_ = n(o(), 1)),
      d_(),
      (eTe = n(o(), 1)),
      (tTe = Object.defineProperty),
      (b_ = (e, t) => tTe(e, `name`, { value: t, configurable: !0 })),
      b_(Ywe, `useStateMachine`),
      (x_ = b_((e) => {
        let { present: t, children: n } = e,
          r = Xwe(t),
          i = typeof n == `function` ? n({ present: r.isPresent }) : y_.Children.only(n),
          a = Qwe(r.ref, $we(i));
        return typeof n == `function` || r.isPresent ? y_.cloneElement(i, { ref: a }) : null;
      }, `Presence`)),
      b_(Xwe, `usePresence`),
      b_(Zwe, `setRef`),
      b_(Qwe, `useStableComposedRefs`),
      b_(v_, `getAnimationName`),
      b_($we, `getElementRef`));
  }))();
}
function C_(e) {
  let [t, n] = nTe.useState(aTe());
  return (
    u_(() => {
      e || n((e) => e ?? String(oTe++));
    }, [e]),
    e || (t ? `radix-${t}` : ``)
  );
}
var nTe, rTe, iTe, aTe, oTe;
function w_() {
  return (w_ = t(() => {
    ((nTe = n(o(), 1)),
      d_(),
      (rTe = Object.defineProperty),
      (iTe = (e, t) => rTe(e, `name`, { value: t, configurable: !0 })),
      (aTe = nTe.useId || (() => void 0)),
      (oTe = 0),
      iTe(C_, `useId`));
  }))();
}
function T_(e) {
  let t = sTe.useContext(dTe);
  return e || t || `ltr`;
}
var sTe, cTe, lTe, uTe, dTe, fTe;
function E_() {
  return (E_ = t(() => {
    ((sTe = n(o(), 1)),
      (cTe = K()),
      (lTe = Object.defineProperty),
      (uTe = (e, t) => lTe(e, `name`, { value: t, configurable: !0 })),
      (dTe = sTe.createContext(void 0)),
      (fTe = uTe((e) => {
        let { dir: t, children: n } = e;
        return (0, cTe.jsx)(dTe.Provider, { value: t, children: n });
      }, `DirectionProvider`)),
      uTe(T_, `useDirection`));
  }))();
}
function D_(e) {
  let t = O_.useRef(e);
  return (
    O_.useEffect(() => {
      t.current = e;
    }),
    O_.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
var O_, pTe, mTe;
function k_() {
  return (k_ = t(() => {
    ((O_ = n(o(), 1)),
      (pTe = Object.defineProperty),
      (mTe = (e, t) => pTe(e, `name`, { value: t, configurable: !0 })),
      mTe(D_, `useCallbackRef`));
  }))();
}
function hTe() {
  let e = A_.useContext(TTe),
    [t, n] = A_.useState(null);
  return (
    A_.useEffect(() => {
      if (t)
        return (
          e.dismissableSurfaces.add(t),
          () => {
            e.dismissableSurfaces.delete(t);
          }
        );
    }, [t, e.dismissableSurfaces]),
    n
  );
}
function gTe(e, t) {
  let {
      ownerDocument: n = globalThis?.document,
      deferPointerDownOutside: r = !1,
      isDeferredPointerDownOutsideRef: i,
      dismissableSurfaces: a,
      shouldHandlePointerDownOutside: o = ETe,
    } = t,
    s = D_(e),
    c = A_.useRef(!1),
    l = A_.useRef(!1),
    u = A_.useRef(new Map()),
    d = A_.useRef(() => {});
  return (
    A_.useEffect(() => {
      function e() {
        ((l.current = !1), (i.current = !1), u.current.clear());
      }
      j_(e, `resetOutsideInteraction`);
      function t() {
        return Array.from(u.current.values()).some(Boolean);
      }
      j_(t, `isOutsideInteractionIntercepted`);
      function f(e) {
        if (!l.current) return;
        let t = e.target;
        ((t instanceof (n.defaultView?.Node ?? Node) && [...a].some((e) => e.contains(t))) ||
          u.current.set(e.type, !0),
          e.type === `click` &&
            window.setTimeout(() => {
              l.current && d.current();
            }, 0));
      }
      j_(f, `handleInteractionCapture`);
      function p(e) {
        l.current && u.current.set(e.type, !1);
      }
      j_(p, `handleInteractionBubble`);
      let m = j_((a) => {
          if (a.target && !c.current) {
            let f = function () {
              n.removeEventListener(`click`, d.current);
              let r = t();
              (e(), r || yTe(STe, s, p, { discrete: !0 }));
            };
            if ((j_(f, `handleAndDispatchPointerDownOutsideEvent`), !o(a.target))) {
              (n.removeEventListener(`click`, d.current), e(), (c.current = !1));
              return;
            }
            let p = { originalEvent: a };
            ((l.current = !0),
              (i.current = r && a.button === 0),
              u.current.clear(),
              !r || a.button !== 0
                ? f()
                : (n.removeEventListener(`click`, d.current),
                  (d.current = f),
                  n.addEventListener(`click`, d.current, { once: !0 })));
          } else (n.removeEventListener(`click`, d.current), e());
          c.current = !1;
        }, `handlePointerDown`),
        h = [`pointerup`, `mousedown`, `mouseup`, `touchstart`, `touchend`, `click`];
      for (let e of h) (n.addEventListener(e, f, !0), n.addEventListener(e, p));
      let g = window.setTimeout(() => {
        n.addEventListener(`pointerdown`, m);
      }, 0);
      return () => {
        (window.clearTimeout(g),
          n.removeEventListener(`pointerdown`, m),
          n.removeEventListener(`click`, d.current));
        for (let e of h) (n.removeEventListener(e, f, !0), n.removeEventListener(e, p));
      };
    }, [n, s, r, i, a, o]),
    { onPointerDownCapture: j_(() => (c.current = !0), `onPointerDownCapture`) }
  );
}
function _Te(e, t = globalThis?.document) {
  let n = D_(e),
    r = A_.useRef(!1);
  return (
    A_.useEffect(() => {
      let e = j_((e) => {
        e.target && !r.current && yTe(CTe, n, { originalEvent: e }, { discrete: !1 });
      }, `handleFocus`);
      return (t.addEventListener(`focusin`, e), () => t.removeEventListener(`focusin`, e));
    }, [t, n]),
    {
      onFocusCapture: j_(() => (r.current = !0), `onFocusCapture`),
      onBlurCapture: j_(() => (r.current = !1), `onBlurCapture`),
    }
  );
}
function vTe() {
  let e = new CustomEvent(M_);
  document.dispatchEvent(e);
}
function yTe(e, t, n, { discrete: r }) {
  let i = n.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && i.addEventListener(e, t, { once: !0 }), r ? rwe(i, a) : i.dispatchEvent(a));
}
var A_, bTe, xTe, j_, M_, STe, CTe, wTe, TTe, N_, ETe;
function P_() {
  return (P_ = t(() => {
    ((A_ = n(o(), 1)),
      l_(),
      qg(),
      Bg(),
      k_(),
      (bTe = K()),
      (xTe = Object.defineProperty),
      (j_ = (e, t) => xTe(e, `name`, { value: t, configurable: !0 })),
      (M_ = `dismissableLayer.update`),
      (STe = `dismissableLayer.pointerDownOutside`),
      (CTe = `dismissableLayer.focusOutside`),
      (TTe = A_.createContext({
        layers: new Set(),
        layersWithOutsidePointerEventsDisabled: new Set(),
        branches: new Set(),
        dismissableSurfaces: new Set(),
      })),
      (N_ = A_.forwardRef(
        j_(function (e, t) {
          let {
              disableOutsidePointerEvents: n = !1,
              deferPointerDownOutside: r = !1,
              onEscapeKeyDown: i,
              onPointerDownOutside: a,
              onFocusOutside: o,
              onInteractOutside: s,
              onDismiss: c,
              ...l
            } = e,
            u = A_.useContext(TTe),
            [d, f] = A_.useState(null),
            p = d?.ownerDocument ?? globalThis?.document,
            [, m] = A_.useState({}),
            h = zg(t, f),
            g = Array.from(u.layers),
            [_] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
            v = _ ? g.indexOf(_) : -1,
            y = d ? g.indexOf(d) : -1,
            b = u.layersWithOutsidePointerEventsDisabled.size > 0,
            x = y >= v,
            S = A_.useRef(!1),
            C = gTe(
              (e) => {
                (a?.(e), s?.(e), e.defaultPrevented || c?.());
              },
              {
                ownerDocument: p,
                deferPointerDownOutside: r,
                isDeferredPointerDownOutsideRef: S,
                dismissableSurfaces: u.dismissableSurfaces,
                shouldHandlePointerDownOutside: A_.useCallback(
                  (e) => {
                    if (!(e instanceof (p.defaultView?.Node ?? Node))) return !1;
                    let t = [...u.branches].some((t) => t.contains(e));
                    return x && !t;
                  },
                  [u.branches, x, p],
                ),
              },
            ),
            w = _Te((e) => {
              if (r && S.current) return;
              let t = e.target;
              [...u.branches].some((e) => e.contains(t)) ||
                (o?.(e), s?.(e), e.defaultPrevented || c?.());
            }, p),
            T = d ? y === g.length - 1 : !1,
            E = D_((e) => {
              e.key === `Escape` && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
            });
          return (
            A_.useEffect(() => {
              if (T)
                return (
                  p.addEventListener(`keydown`, E, { capture: !0 }),
                  () => p.removeEventListener(`keydown`, E, { capture: !0 })
                );
            }, [p, T, E]),
            A_.useEffect(() => {
              if (d)
                return (
                  n &&
                    (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                      ((wTe = p.body.style.pointerEvents), (p.body.style.pointerEvents = `none`)),
                    u.layersWithOutsidePointerEventsDisabled.add(d)),
                  u.layers.add(d),
                  vTe(),
                  () => {
                    n &&
                      (u.layersWithOutsidePointerEventsDisabled.delete(d),
                      u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                        (p.body.style.pointerEvents = wTe));
                  }
                );
            }, [d, p, n, u]),
            A_.useEffect(
              () => () => {
                d &&
                  (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), vTe());
              },
              [d, u],
            ),
            A_.useEffect(() => {
              let e = j_(() => m({}), `handleUpdate`);
              return (document.addEventListener(M_, e), () => document.removeEventListener(M_, e));
            }, []),
            (0, bTe.jsx)(Kg.div, {
              ...l,
              ref: h,
              style: { pointerEvents: b ? (x ? `auto` : `none`) : void 0, ...e.style },
              onFocusCapture: s_(e.onFocusCapture, w.onFocusCapture),
              onBlurCapture: s_(e.onBlurCapture, w.onBlurCapture),
              onPointerDownCapture: s_(e.onPointerDownCapture, C.onPointerDownCapture),
            })
          );
        }, `DismissableLayer`),
      )),
      j_(hTe, `useDismissableLayerSurface`),
      (ETe = j_(() => !0, `IS_TRUE`)),
      j_(gTe, `usePointerDownOutside`),
      j_(_Te, `useFocusOutside`),
      j_(vTe, `dispatchUpdate`),
      j_(yTe, `handleAndDispatchCustomEvent`));
  }))();
}
function DTe(e, { select: t = !1 } = {}) {
  let n = F_();
  for (let r of e) if ((L_(r, { select: t }), F_() !== n)) return;
}
function F_() {
  let e = document.activeElement;
  for (; e?.shadowRoot?.activeElement; ) e = e.shadowRoot.activeElement;
  return e;
}
function I_(e, t) {
  for (; t; ) {
    if (e.contains(t)) return !0;
    t = t.getRootNode().host;
  }
  return !1;
}
function OTe(e) {
  let t = kTe(e);
  return [ATe(t, e), ATe(t.reverse(), e)];
}
function kTe(e) {
  let t = [];
  function n(e) {
    if (e.hidden || e.inert) return;
    let r = e.shadowRoot,
      i = e.tagName === `INPUT` && e.type === `hidden`;
    if (
      (!e.disabled && !i && e.tabIndex >= 0 && !r?.delegatesFocus && t.push(e),
      r && e.hasAttribute(`tabindex`) && e.tabIndex < 0)
    )
      return;
    let a = r
      ? r.children
      : e.localName === `slot`
        ? e.assignedElements({ flatten: !0 })
        : e.children;
    for (let e of a) n(e);
  }
  for (let t of e.children) n(t);
  return t;
}
function ATe(e, t) {
  let n = typeof t.checkVisibility == `function` && t.checkVisibility({ checkVisibilityCSS: !0 });
  for (let r of e)
    if (!(n ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : jTe(r, { upTo: t }))) return r;
}
function jTe(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === `hidden`) return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === `none`) return !0;
    e = e.assignedSlot || e.parentElement || e.getRootNode().host;
  }
  return !1;
}
function MTe(e) {
  return e instanceof HTMLInputElement && `select` in e;
}
function L_(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    let n = F_();
    (e.focus({ preventScroll: !0 }), e !== n && MTe(e) && t && e.select());
  }
}
function NTe() {
  let e = [];
  return {
    add(t) {
      let n = e[0];
      (t !== n && n?.pause(), (e = PTe(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = PTe(e, t)), e[0]?.resume());
    },
  };
}
function PTe(e, t) {
  let n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function FTe(e) {
  return e.filter((e) => e.tagName !== `A`);
}
var R_, ITe, LTe, z_, B_, V_, RTe, H_, zTe;
function U_() {
  return (U_ = t(() => {
    ((R_ = n(o(), 1)),
      Bg(),
      qg(),
      k_(),
      (ITe = K()),
      (LTe = Object.defineProperty),
      (z_ = (e, t) => LTe(e, `name`, { value: t, configurable: !0 })),
      (B_ = `focusScope.autoFocusOnMount`),
      (V_ = `focusScope.autoFocusOnUnmount`),
      (RTe = { bubbles: !1, cancelable: !0 }),
      (H_ = R_.forwardRef(
        z_(function (e, t) {
          let {
              loop: n = !1,
              trapped: r = !1,
              onMountAutoFocus: i,
              onUnmountAutoFocus: a,
              ...o
            } = e,
            [s, c] = R_.useState(null),
            l = D_(i),
            u = D_(a),
            d = R_.useRef(null),
            f = zg(t, c),
            p = R_.useRef({
              paused: !1,
              pause() {
                this.paused = !0;
              },
              resume() {
                this.paused = !1;
              },
            }).current;
          (R_.useEffect(() => {
            if (r) {
              let e = function (e) {
                  if (p.paused || !s) return;
                  let t = e.composedPath()[0];
                  I_(s, t) ? (d.current = t) : L_(d.current, { select: !0 });
                },
                t = function (e) {
                  if (p.paused || !s) return;
                  let t = e.relatedTarget;
                  if (t === null) return;
                  let n = e.composedPath()[0];
                  (I_(s, n) && (d.current = n), I_(s, t) || L_(d.current, { select: !0 }));
                },
                n = function (e) {
                  if (F_() === document.body) for (let t of e) t.removedNodes.length > 0 && L_(s);
                };
              (z_(e, `handleFocusIn`),
                z_(t, `handleFocusOut`),
                z_(n, `handleMutations`),
                document.addEventListener(`focusin`, e),
                document.addEventListener(`focusout`, t));
              let r = new MutationObserver(n);
              return (
                s && r.observe(s, { childList: !0, subtree: !0 }),
                () => {
                  (document.removeEventListener(`focusin`, e),
                    document.removeEventListener(`focusout`, t),
                    r.disconnect());
                }
              );
            }
          }, [r, s, p.paused]),
            R_.useEffect(() => {
              if (s) {
                zTe.add(p);
                let e = F_();
                if (!I_(s, e)) {
                  let t = new CustomEvent(B_, RTe);
                  (s.addEventListener(B_, l),
                    s.dispatchEvent(t),
                    t.defaultPrevented || (DTe(FTe(kTe(s)), { select: !0 }), F_() === e && L_(s)));
                }
                return () => {
                  (s.removeEventListener(B_, l),
                    setTimeout(() => {
                      let t = new CustomEvent(V_, RTe);
                      (s.addEventListener(V_, u),
                        s.dispatchEvent(t),
                        t.defaultPrevented || L_(e ?? document.body, { select: !0 }),
                        s.removeEventListener(V_, u),
                        zTe.remove(p));
                    }, 0));
                };
              }
            }, [s, l, u, p]));
          let m = R_.useCallback(
            (e) => {
              if ((!n && !r) || p.paused || e.key !== `Tab` || e.altKey || e.ctrlKey || e.metaKey)
                return;
              let t = F_();
              if (t) {
                let r = e.currentTarget,
                  [i, a] = OTe(r);
                i && a
                  ? !e.shiftKey && t === a
                    ? (e.preventDefault(), n && L_(i, { select: !0 }))
                    : e.shiftKey &&
                      (t === i || t === r) &&
                      (e.preventDefault(), n && L_(a, { select: !0 }))
                  : t === r && e.preventDefault();
              }
            },
            [n, r, p.paused],
          );
          return (0, ITe.jsx)(Kg.div, { tabIndex: -1, ...o, ref: f, onKeyDown: m });
        }, `FocusScope`),
      )),
      z_(DTe, `focusFirst`),
      z_(OTe, `getTabbableEdges`),
      z_(kTe, `getTabbableCandidates`),
      z_(ATe, `findVisible`),
      z_(jTe, `isHidden`),
      z_(MTe, `isSelectableInput`),
      z_(L_, `focus`),
      (zTe = NTe()),
      z_(NTe, `createFocusScopesStack`),
      z_(PTe, `arrayRemove`),
      z_(FTe, `removeLinks`));
  }))();
}
var BTe, VTe, HTe, UTe, WTe, W_;
function G_() {
  return (G_ = t(() => {
    ((BTe = n(o(), 1)),
      (VTe = n(ph(), 1)),
      qg(),
      d_(),
      (HTe = K()),
      (UTe = Object.defineProperty),
      (WTe = (e, t) => UTe(e, `name`, { value: t, configurable: !0 })),
      (W_ = BTe.forwardRef(
        WTe(function (e, t) {
          let { container: n, ...r } = e,
            [i, a] = BTe.useState(!1);
          u_(() => a(!0), []);
          let o = n || (i && globalThis?.document?.body);
          return o ? VTe.createPortal((0, HTe.jsx)(Kg.div, { ...r, ref: t }), o) : null;
        }, `Portal`),
      )));
  }))();
}
function GTe(e) {
  return (K_(), e.children);
}
function K_() {
  qTe.useEffect(() => {
    Y_ ||= { start: KTe(), end: KTe() };
    let { start: e, end: t } = Y_;
    return (
      document.body.firstElementChild !== e && document.body.insertAdjacentElement(`afterbegin`, e),
      document.body.lastElementChild !== t && document.body.insertAdjacentElement(`beforeend`, t),
      J_++,
      () => {
        (J_ === 1 && (Y_?.start.remove(), Y_?.end.remove(), (Y_ = null)),
          (J_ = Math.max(0, J_ - 1)));
      }
    );
  }, []);
}
function KTe() {
  let e = document.createElement(`span`);
  return (
    e.setAttribute(`data-radix-focus-guard`, ``),
    (e.tabIndex = 0),
    (e.style.outline = `none`),
    (e.style.opacity = `0`),
    (e.style.position = `fixed`),
    (e.style.pointerEvents = `none`),
    e
  );
}
var qTe, JTe, q_, J_, Y_;
function X_() {
  return (X_ = t(() => {
    ((qTe = n(o(), 1)),
      (JTe = Object.defineProperty),
      (q_ = (e, t) => JTe(e, `name`, { value: t, configurable: !0 })),
      (J_ = 0),
      (Y_ = null),
      q_(GTe, `FocusGuards`),
      q_(K_, `useFocusGuards`),
      q_(KTe, `createFocusGuard`));
  }))();
}
function Z_(e, t) {
  if (typeof t != `function` && t !== null)
    throw TypeError(`Class extends value ` + String(t) + ` is not a constructor or null`);
  ev(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
}
function Q_(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == `function`)
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function YTe(e, t, n, r) {
  var i = arguments.length,
    a = i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r,
    o;
  if (typeof Reflect == `object` && typeof Reflect.decorate == `function`)
    a = Reflect.decorate(e, t, n, r);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
  return (i > 3 && a && Object.defineProperty(t, n, a), a);
}
function XTe(e, t, n, r) {
  function i(e) {
    return e instanceof n
      ? e
      : new n(function (t) {
          t(e);
        });
  }
  return new (n ||= Promise)(function (n, a) {
    function o(e) {
      try {
        c(r.next(e));
      } catch (e) {
        a(e);
      }
    }
    function s(e) {
      try {
        c(r.throw(e));
      } catch (e) {
        a(e);
      }
    }
    function c(e) {
      e.done ? n(e.value) : i(e.value).then(o, s);
    }
    c((r = r.apply(e, t || [])).next());
  });
}
function ZTe(e, t) {
  var n = {
      label: 0,
      sent: function () {
        if (a[0] & 1) throw a[1];
        return a[1];
      },
      trys: [],
      ops: [],
    },
    r,
    i,
    a,
    o = Object.create((typeof Iterator == `function` ? Iterator : Object).prototype);
  return (
    (o.next = s(0)),
    (o.throw = s(1)),
    (o.return = s(2)),
    typeof Symbol == `function` &&
      (o[Symbol.iterator] = function () {
        return this;
      }),
    o
  );
  function s(e) {
    return function (t) {
      return c([e, t]);
    };
  }
  function c(s) {
    if (r) throw TypeError(`Generator is already executing.`);
    for (; o && ((o = 0), s[0] && (n = 0)), n; )
      try {
        if (
          ((r = 1),
          i &&
            (a =
              s[0] & 2 ? i.return : s[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) &&
            !(a = a.call(i, s[1])).done)
        )
          return a;
        switch (((i = 0), a && (s = [s[0] & 2, a.value]), s[0])) {
          case 0:
          case 1:
            a = s;
            break;
          case 4:
            return (n.label++, { value: s[1], done: !1 });
          case 5:
            (n.label++, (i = s[1]), (s = [0]));
            continue;
          case 7:
            ((s = n.ops.pop()), n.trys.pop());
            continue;
          default:
            if (
              ((a = n.trys), !(a = a.length > 0 && a[a.length - 1]) && (s[0] === 6 || s[0] === 2))
            ) {
              n = 0;
              continue;
            }
            if (s[0] === 3 && (!a || (s[1] > a[0] && s[1] < a[3]))) {
              n.label = s[1];
              break;
            }
            if (s[0] === 6 && n.label < a[1]) {
              ((n.label = a[1]), (a = s));
              break;
            }
            if (a && n.label < a[2]) {
              ((n.label = a[2]), n.ops.push(s));
              break;
            }
            (a[2] && n.ops.pop(), n.trys.pop());
            continue;
        }
        s = t.call(e, n);
      } catch (e) {
        ((s = [6, e]), (i = 0));
      } finally {
        r = a = 0;
      }
    if (s[0] & 5) throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
}
function $_(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && ((a ||= Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
  return e.concat(a || Array.prototype.slice.call(t));
}
var ev, tv;
function nv() {
  return (nv = t(() => {
    ((ev = function (e, t) {
      return (
        (ev =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (e, t) {
              e.__proto__ = t;
            }) ||
          function (e, t) {
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          }),
        ev(e, t)
      );
    }),
      (tv = function () {
        return (
          (tv =
            Object.assign ||
            function (e) {
              for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in ((t = arguments[n]), t))
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              return e;
            }),
          tv.apply(this, arguments)
        );
      }));
  }))();
}
var rv, iv, QTe, $Te;
function eEe() {
  return (eEe = t(() => {
    ((rv = `right-scroll-bar-position`),
      (iv = `width-before-scroll-bar`),
      (QTe = `with-scroll-bars-hidden`),
      ($Te = `--removed-body-scroll-bar-size`));
  }))();
}
function tEe(e, t) {
  return (typeof e == `function` ? e(t) : e && (e.current = t), e);
}
function nEe(e, t) {
  var n = (0, rEe.useState)(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(e) {
          var t = n.value;
          t !== e && ((n.value = e), n.callback(e, t));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var rEe;
function iEe() {
  return (iEe = t(() => {
    rEe = o();
  }))();
}
function aEe(e, t) {
  var n = nEe(t || null, function (t) {
    return e.forEach(function (e) {
      return tEe(e, t);
    });
  });
  return (
    sEe(
      function () {
        var t = cEe.get(n);
        if (t) {
          var r = new Set(t),
            i = new Set(e),
            a = n.current;
          (r.forEach(function (e) {
            i.has(e) || tEe(e, null);
          }),
            i.forEach(function (e) {
              r.has(e) || tEe(e, a);
            }));
        }
        cEe.set(n, e);
      },
      [e],
    ),
    n
  );
}
var oEe, sEe, cEe;
function lEe() {
  return (lEe = t(() => {
    ((oEe = n(o())),
      iEe(),
      (sEe = typeof window < `u` ? oEe.useLayoutEffect : oEe.useEffect),
      (cEe = new WeakMap()));
  }))();
}
function uEe(e) {
  return e;
}
function dEe(e, t) {
  t === void 0 && (t = uEe);
  var n = [],
    r = !1;
  return {
    read: function () {
      if (r)
        throw Error(
          "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
        );
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function (e) {
      var i = t(e, r);
      return (
        n.push(i),
        function () {
          n = n.filter(function (e) {
            return e !== i;
          });
        }
      );
    },
    assignSyncMedium: function (e) {
      for (r = !0; n.length; ) {
        var t = n;
        ((n = []), t.forEach(e));
      }
      n = {
        push: function (t) {
          return e(t);
        },
        filter: function () {
          return n;
        },
      };
    },
    assignMedium: function (e) {
      r = !0;
      var t = [];
      if (n.length) {
        var i = n;
        ((n = []), i.forEach(e), (t = n));
      }
      var a = function () {
          var n = t;
          ((t = []), n.forEach(e));
        },
        o = function () {
          return Promise.resolve().then(a);
        };
      (o(),
        (n = {
          push: function (e) {
            (t.push(e), o());
          },
          filter: function (e) {
            return ((t = t.filter(e)), n);
          },
        }));
    },
  };
}
function fEe(e) {
  e === void 0 && (e = {});
  var t = dEe(null);
  return ((t.options = tv({ async: !0, ssr: !1 }, e)), t);
}
function pEe() {
  return (pEe = t(() => {
    nv();
  }))();
}
function mEe(e, t) {
  return (e.useMedium(t), gEe);
}
var hEe, gEe;
function _Ee() {
  return (_Ee = t(() => {
    (nv(),
      (hEe = n(o())),
      (gEe = function (e) {
        var t = e.sideCar,
          n = Q_(e, [`sideCar`]);
        if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
        var r = t.read();
        if (!r) throw Error(`Sidecar medium not found`);
        return hEe.createElement(r, tv({}, n));
      }),
      (gEe.isSideCarExport = !0));
  }))();
}
var vEe;
function yEe() {
  return (yEe = t(() => {
    (pEe(), (vEe = fEe()));
  }))();
}
var av, ov, sv;
function bEe() {
  return (bEe = t(() => {
    (nv(),
      (av = n(o())),
      eEe(),
      lEe(),
      yEe(),
      (ov = function () {}),
      (sv = av.forwardRef(function (e, t) {
        var n = av.useRef(null),
          r = av.useState({ onScrollCapture: ov, onWheelCapture: ov, onTouchMoveCapture: ov }),
          i = r[0],
          a = r[1],
          o = e.forwardProps,
          s = e.children,
          c = e.className,
          l = e.removeScrollBar,
          u = e.enabled,
          d = e.shards,
          f = e.sideCar,
          p = e.noRelative,
          m = e.noIsolation,
          h = e.inert,
          g = e.allowPinchZoom,
          _ = e.as,
          v = _ === void 0 ? `div` : _,
          y = e.gapMode,
          b = Q_(e, [
            `forwardProps`,
            `children`,
            `className`,
            `removeScrollBar`,
            `enabled`,
            `shards`,
            `sideCar`,
            `noRelative`,
            `noIsolation`,
            `inert`,
            `allowPinchZoom`,
            `as`,
            `gapMode`,
          ]),
          x = f,
          S = aEe([n, t]),
          C = tv(tv({}, b), i);
        return av.createElement(
          av.Fragment,
          null,
          u &&
            av.createElement(x, {
              sideCar: vEe,
              removeScrollBar: l,
              shards: d,
              noRelative: p,
              noIsolation: m,
              inert: h,
              setCallbacks: a,
              allowPinchZoom: !!g,
              lockRef: n,
              gapMode: y,
            }),
          o
            ? av.cloneElement(av.Children.only(s), tv(tv({}, C), { ref: S }))
            : av.createElement(v, tv({}, C, { className: c, ref: S }), s),
        );
      })),
      (sv.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
      (sv.classNames = { fullWidth: iv, zeroRight: rv }));
  }))();
}
var xEe;
function SEe() {
  return (SEe = t(() => {
    xEe = function () {
      if (typeof __webpack_nonce__ < `u`) return __webpack_nonce__;
    };
  }))();
}
function CEe() {
  if (!document) return null;
  var e = document.createElement(`style`);
  e.type = `text/css`;
  var t = xEe();
  return (t && e.setAttribute(`nonce`, t), e);
}
function wEe(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function TEe(e) {
  (document.head || document.getElementsByTagName(`head`)[0]).appendChild(e);
}
var EEe;
function DEe() {
  return (DEe = t(() => {
    (SEe(),
      (EEe = function () {
        var e = 0,
          t = null;
        return {
          add: function (n) {
            (e == 0 && (t = CEe()) && (wEe(t, n), TEe(t)), e++);
          },
          remove: function () {
            (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
          },
        };
      }));
  }))();
}
var OEe, kEe;
function AEe() {
  return (AEe = t(() => {
    ((OEe = n(o())),
      DEe(),
      (kEe = function () {
        var e = EEe();
        return function (t, n) {
          OEe.useEffect(
            function () {
              return (
                e.add(t),
                function () {
                  e.remove();
                }
              );
            },
            [t && n],
          );
        };
      }));
  }))();
}
var jEe;
function MEe() {
  return (MEe = t(() => {
    (AEe(),
      (jEe = function () {
        var e = kEe();
        return function (t) {
          var n = t.styles,
            r = t.dynamic;
          return (e(n, r), null);
        };
      }));
  }))();
}
function NEe() {
  return (NEe = t(() => {
    (MEe(), AEe());
  }))();
}
var PEe, FEe, IEe, LEe;
function REe() {
  return (REe = t(() => {
    ((PEe = { left: 0, top: 0, right: 0, gap: 0 }),
      (FEe = function (e) {
        return parseInt(e || ``, 10) || 0;
      }),
      (IEe = function (e) {
        var t = window.getComputedStyle(document.body),
          n = t[e === `padding` ? `paddingLeft` : `marginLeft`],
          r = t[e === `padding` ? `paddingTop` : `marginTop`],
          i = t[e === `padding` ? `paddingRight` : `marginRight`];
        return [FEe(n), FEe(r), FEe(i)];
      }),
      (LEe = function (e) {
        if ((e === void 0 && (e = `margin`), typeof window > `u`)) return PEe;
        var t = IEe(e),
          n = document.documentElement.clientWidth,
          r = window.innerWidth;
        return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
      }));
  }))();
}
var zEe, BEe, cv, VEe, HEe, UEe, WEe;
function GEe() {
  return (GEe = t(() => {
    ((zEe = n(o())),
      NEe(),
      eEe(),
      REe(),
      (BEe = jEe()),
      (cv = `data-scroll-locked`),
      (VEe = function (e, t, n, r) {
        var i = e.left,
          a = e.top,
          o = e.right,
          s = e.gap;
        return (
          n === void 0 && (n = `margin`),
          `
  .${QTe} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${cv}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
      t && `position: relative ${r};`,
      n === `margin` &&
        `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
      n === `padding` && `padding-right: ${s}px ${r};`,
    ]
      .filter(Boolean)
      .join(``)}
  }
  
  .${rv} {
    right: ${s}px ${r};
  }
  
  .${iv} {
    margin-right: ${s}px ${r};
  }
  
  .${rv} .${rv} {
    right: 0 ${r};
  }
  
  .${iv} .${iv} {
    margin-right: 0 ${r};
  }
  
  body[${cv}] {
    ${$Te}: ${s}px;
  }
`
        );
      }),
      (HEe = function () {
        var e = parseInt(document.body.getAttribute(`data-scroll-locked`) || `0`, 10);
        return isFinite(e) ? e : 0;
      }),
      (UEe = function () {
        zEe.useEffect(function () {
          return (
            document.body.setAttribute(cv, (HEe() + 1).toString()),
            function () {
              var e = HEe() - 1;
              e <= 0
                ? document.body.removeAttribute(cv)
                : document.body.setAttribute(cv, e.toString());
            }
          );
        }, []);
      }),
      (WEe = function (e) {
        var t = e.noRelative,
          n = e.noImportant,
          r = e.gapMode,
          i = r === void 0 ? `margin` : r;
        UEe();
        var a = zEe.useMemo(
          function () {
            return LEe(i);
          },
          [i],
        );
        return zEe.createElement(BEe, { styles: VEe(a, !t, i, n ? `` : `!important`) });
      }));
  }))();
}
function KEe() {
  return (KEe = t(() => {
    GEe();
  }))();
}
var qEe, lv, uv;
function JEe() {
  return (JEe = t(() => {
    if (((qEe = !1), typeof window < `u`))
      try {
        ((lv = Object.defineProperty({}, "passive", {
          get: function () {
            return ((qEe = !0), !0);
          },
        })),
          window.addEventListener(`test`, lv, lv),
          window.removeEventListener(`test`, lv, lv));
      } catch {
        qEe = !1;
      }
    uv = qEe ? { passive: !1 } : !1;
  }))();
}
var YEe, XEe, ZEe, QEe, $Ee, eDe, tDe, nDe, rDe, iDe, aDe;
function oDe() {
  return (oDe = t(() => {
    ((YEe = function (e) {
      return e.tagName === `TEXTAREA`;
    }),
      (XEe = function (e, t) {
        if (!(e instanceof Element)) return !1;
        var n = window.getComputedStyle(e);
        return n[t] !== `hidden` && !(n.overflowY === n.overflowX && !YEe(e) && n[t] === `visible`);
      }),
      (ZEe = function (e) {
        return XEe(e, `overflowY`);
      }),
      (QEe = function (e) {
        return XEe(e, `overflowX`);
      }),
      ($Ee = function (e, t) {
        var n = t.ownerDocument,
          r = t;
        do {
          if ((typeof ShadowRoot < `u` && r instanceof ShadowRoot && (r = r.host), nDe(e, r))) {
            var i = rDe(e, r);
            if (i[1] > i[2]) return !0;
          }
          r = r.parentNode;
        } while (r && r !== n.body);
        return !1;
      }),
      (eDe = function (e) {
        return [e.scrollTop, e.scrollHeight, e.clientHeight];
      }),
      (tDe = function (e) {
        return [e.scrollLeft, e.scrollWidth, e.clientWidth];
      }),
      (nDe = function (e, t) {
        return e === `v` ? ZEe(t) : QEe(t);
      }),
      (rDe = function (e, t) {
        return e === `v` ? eDe(t) : tDe(t);
      }),
      (iDe = function (e, t) {
        return e === `h` && t === `rtl` ? -1 : 1;
      }),
      (aDe = function (e, t, n, r, i) {
        var a = iDe(e, window.getComputedStyle(t).direction),
          o = a * r,
          s = n.target,
          c = t.contains(s),
          l = !1,
          u = o > 0,
          d = 0,
          f = 0;
        do {
          if (!s) break;
          var p = rDe(e, s),
            m = p[0],
            h = p[1] - p[2] - a * m;
          (m || h) && nDe(e, s) && ((d += h), (f += m));
          var g = s.parentNode;
          s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
        } while ((!c && s !== document.body) || (c && (t.contains(s) || t === s)));
        return (
          ((u && ((i && Math.abs(d) < 1) || (!i && o > d))) ||
            (!u && ((i && Math.abs(f) < 1) || (!i && -o > f)))) &&
            (l = !0),
          l
        );
      }));
  }))();
}
function sDe(e) {
  var t = dv.useRef([]),
    n = dv.useRef([0, 0]),
    r = dv.useRef(),
    i = dv.useState(pDe++)[0],
    a = dv.useState(jEe)[0],
    o = dv.useRef(e);
  (dv.useEffect(
    function () {
      o.current = e;
    },
    [e],
  ),
    dv.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add(`block-interactivity-${i}`);
          var t = $_([e.lockRef.current], (e.shards || []).map(uDe), !0).filter(Boolean);
          return (
            t.forEach(function (e) {
              return e.classList.add(`allow-interactivity-${i}`);
            }),
            function () {
              (document.body.classList.remove(`block-interactivity-${i}`),
                t.forEach(function (e) {
                  return e.classList.remove(`allow-interactivity-${i}`);
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var s = dv.useCallback(function (e, t) {
      if ((`touches` in e && e.touches.length === 2) || (e.type === `wheel` && e.ctrlKey))
        return !o.current.allowPinchZoom;
      var i = fv(e),
        a = n.current,
        s = `deltaX` in e ? e.deltaX : a[0] - i[0],
        c = `deltaY` in e ? e.deltaY : a[1] - i[1],
        l,
        u = e.target,
        d = Math.abs(s) > Math.abs(c) ? `h` : `v`;
      if (`touches` in e && d === `h` && u.type === `range`) return !1;
      var f = window.getSelection(),
        p = f && f.anchorNode;
      if (p && (p === u || p.contains(u))) return !1;
      var m = $Ee(d, u);
      if (!m) return !0;
      if ((m ? (l = d) : ((l = d === `v` ? `h` : `v`), (m = $Ee(d, u))), !m)) return !1;
      if ((!r.current && `changedTouches` in e && (s || c) && (r.current = l), !l)) return !0;
      var h = r.current || l;
      return aDe(h, t, e, h === `h` ? s : c, !0);
    }, []),
    c = dv.useCallback(function (e) {
      var n = e;
      if (pv.length && pv[pv.length - 1] === a) {
        var r = `deltaY` in n ? lDe(n) : fv(n),
          i = t.current.filter(function (e) {
            return (
              e.name === n.type &&
              (e.target === n.target || n.target === e.shadowParent) &&
              dDe(e.delta, r)
            );
          })[0];
        if (i && i.should) {
          n.cancelable && n.preventDefault();
          return;
        }
        if (!i) {
          var c = (o.current.shards || [])
            .map(uDe)
            .filter(Boolean)
            .filter(function (e) {
              return e.contains(n.target);
            });
          (c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) &&
            n.cancelable &&
            n.preventDefault();
        }
      }
    }, []),
    l = dv.useCallback(function (e, n, r, i) {
      var a = { name: e, delta: n, target: r, should: i, shadowParent: cDe(r) };
      (t.current.push(a),
        setTimeout(function () {
          t.current = t.current.filter(function (e) {
            return e !== a;
          });
        }, 1));
    }, []),
    u = dv.useCallback(function (e) {
      ((n.current = fv(e)), (r.current = void 0));
    }, []),
    d = dv.useCallback(function (t) {
      l(t.type, lDe(t), t.target, s(t, e.lockRef.current));
    }, []),
    f = dv.useCallback(function (t) {
      l(t.type, fv(t), t.target, s(t, e.lockRef.current));
    }, []);
  dv.useEffect(function () {
    return (
      pv.push(a),
      e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: f }),
      document.addEventListener(`wheel`, c, uv),
      document.addEventListener(`touchmove`, c, uv),
      document.addEventListener(`touchstart`, u, uv),
      function () {
        ((pv = pv.filter(function (e) {
          return e !== a;
        })),
          document.removeEventListener(`wheel`, c, uv),
          document.removeEventListener(`touchmove`, c, uv),
          document.removeEventListener(`touchstart`, u, uv));
      }
    );
  }, []);
  var p = e.removeScrollBar,
    m = e.inert;
  return dv.createElement(
    dv.Fragment,
    null,
    m ? dv.createElement(a, { styles: fDe(i) }) : null,
    p ? dv.createElement(WEe, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  );
}
function cDe(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
var dv, fv, lDe, uDe, dDe, fDe, pDe, pv;
function mDe() {
  return (mDe = t(() => {
    (nv(),
      (dv = n(o())),
      KEe(),
      NEe(),
      JEe(),
      oDe(),
      (fv = function (e) {
        return `changedTouches` in e
          ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
          : [0, 0];
      }),
      (lDe = function (e) {
        return [e.deltaX, e.deltaY];
      }),
      (uDe = function (e) {
        return e && `current` in e ? e.current : e;
      }),
      (dDe = function (e, t) {
        return e[0] === t[0] && e[1] === t[1];
      }),
      (fDe = function (e) {
        return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
      }),
      (pDe = 0),
      (pv = []));
  }))();
}
var hDe;
function gDe() {
  return (gDe = t(() => {
    (_Ee(), mDe(), yEe(), (hDe = mEe(vEe, sDe)));
  }))();
}
var _De, mv;
function vDe() {
  return (vDe = t(() => {
    (nv(),
      (_De = n(o())),
      bEe(),
      gDe(),
      (mv = _De.forwardRef(function (e, t) {
        return _De.createElement(sv, tv({}, e, { ref: t, sideCar: hDe }));
      })),
      (mv.classNames = sv.classNames));
  }))();
}
var yDe, hv, gv, _v, bDe, xDe, SDe, CDe, wDe, TDe;
function vv() {
  return (vv = t(() => {
    ((yDe = function (e) {
      return typeof document > `u` ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
    }),
      (hv = new WeakMap()),
      (gv = new WeakMap()),
      (_v = {}),
      (bDe = 0),
      (xDe = function (e) {
        return e && (e.host || xDe(e.parentNode));
      }),
      (SDe = function (e, t) {
        return t
          .map(function (t) {
            if (e.contains(t)) return t;
            var n = xDe(t);
            return n && e.contains(n)
              ? n
              : (console.error(`aria-hidden`, t, `in not contained inside`, e, `. Doing nothing`),
                null);
          })
          .filter(function (e) {
            return !!e;
          });
      }),
      (CDe = function (e, t, n, r) {
        var i = SDe(t, Array.isArray(e) ? e : [e]);
        _v[n] || (_v[n] = new WeakMap());
        var a = _v[n],
          o = [],
          s = new Set(),
          c = new Set(i),
          l = function (e) {
            e && !s.has(e) && (s.add(e), l(e.parentNode));
          };
        i.forEach(l);
        var u = function (e) {
          e &&
            !c.has(e) &&
            Array.prototype.forEach.call(e.children, function (e) {
              if (s.has(e)) u(e);
              else
                try {
                  var t = e.getAttribute(r),
                    i = t !== null && t !== `false`,
                    c = (hv.get(e) || 0) + 1,
                    l = (a.get(e) || 0) + 1;
                  (hv.set(e, c),
                    a.set(e, l),
                    o.push(e),
                    c === 1 && i && gv.set(e, !0),
                    l === 1 && e.setAttribute(n, `true`),
                    i || e.setAttribute(r, `true`));
                } catch (t) {
                  console.error(`aria-hidden: cannot operate on `, e, t);
                }
            });
        };
        return (
          u(t),
          s.clear(),
          bDe++,
          function () {
            (o.forEach(function (e) {
              var t = hv.get(e) - 1,
                i = a.get(e) - 1;
              (hv.set(e, t),
                a.set(e, i),
                t || (gv.has(e) || e.removeAttribute(r), gv.delete(e)),
                i || e.removeAttribute(n));
            }),
              bDe--,
              bDe || ((hv = new WeakMap()), (hv = new WeakMap()), (gv = new WeakMap()), (_v = {})));
          }
        );
      }),
      (wDe = function (e, t, n) {
        n === void 0 && (n = `data-aria-hidden`);
        var r = Array.from(Array.isArray(e) ? e : [e]),
          i = t || yDe(e);
        return i
          ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))),
            CDe(r, i, n, `aria-hidden`))
          : function () {
              return null;
            };
      }),
      (TDe = function (e, t, n) {
        n === void 0 && (n = `data-inert-ed`);
        var r = t || yDe(e);
        return r
          ? CDe(e, r, n, `inert`)
          : function () {
              return null;
            };
      }));
  }))();
}
var EDe = r({
  Close: () => Av,
  Content: () => BDe,
  Description: () => kv,
  Dialog: () => Cv,
  DialogClose: () => Av,
  DialogContent: () => BDe,
  DialogDescription: () => kv,
  DialogOverlay: () => Ev,
  DialogPortal: () => Tv,
  DialogTitle: () => Ov,
  DialogTrigger: () => wv,
  Overlay: () => Ev,
  Portal: () => Tv,
  Root: () => Cv,
  Title: () => Ov,
  Trigger: () => wv,
  WarningProvider: () => qDe,
  createDialogScope: () => jDe,
});
function DDe(e) {
  return e ? `open` : `closed`;
}
var yv,
  bv,
  ODe,
  xv,
  kDe,
  ADe,
  jDe,
  MDe,
  Sv,
  Cv,
  NDe,
  wv,
  PDe,
  FDe,
  IDe,
  Tv,
  LDe,
  Ev,
  RDe,
  zDe,
  Dv,
  BDe,
  VDe,
  HDe,
  UDe,
  WDe,
  Ov,
  GDe,
  kv,
  KDe,
  Av,
  qDe;
function JDe() {
  return (JDe = t(() => {
    ((yv = n(o(), 1)),
      l_(),
      Bg(),
      Zg(),
      w_(),
      __(),
      P_(),
      U_(),
      G_(),
      S_(),
      qg(),
      X_(),
      d_(),
      vDe(),
      vv(),
      Gg(),
      (bv = K()),
      (ODe = Object.defineProperty),
      (xv = (e, t) => ODe(e, `name`, { value: t, configurable: !0 })),
      (kDe = `Dialog`),
      ([ADe, jDe] = Jg(kDe)),
      ([MDe, Sv] = ADe(kDe)),
      (Cv = xv((e) => {
        let {
            __scopeDialog: t,
            children: n,
            open: r,
            defaultOpen: i,
            onOpenChange: a,
            modal: o = !0,
          } = e,
          s = yv.useRef(null),
          c = yv.useRef(null),
          [l, u] = p_({ prop: r, defaultProp: i ?? !1, onChange: a, caller: kDe }),
          [d, f] = yv.useState(0),
          [p, m] = yv.useState(0);
        return (0, bv.jsx)(MDe, {
          scope: t,
          triggerRef: s,
          contentRef: c,
          contentId: C_(),
          titleId: C_(),
          descriptionId: C_(),
          titlePresent: d > 0,
          descriptionPresent: p > 0,
          setTitleCount: f,
          setDescriptionCount: m,
          open: l,
          onOpenChange: u,
          onOpenToggle: yv.useCallback(() => u((e) => !e), [u]),
          modal: o,
          children: n,
        });
      }, `Dialog`)),
      (NDe = `DialogTrigger`),
      (wv = yv.forwardRef(
        xv(function (e, t) {
          let { __scopeDialog: n, ...r } = e,
            i = Sv(NDe, n),
            a = zg(t, i.triggerRef);
          return (0, bv.jsx)(Kg.button, {
            type: `button`,
            "aria-haspopup": `dialog`,
            "aria-expanded": i.open,
            "aria-controls": i.open ? i.contentId : void 0,
            "data-state": DDe(i.open),
            ...r,
            ref: a,
            onClick: s_(e.onClick, i.onOpenToggle),
          });
        }, `DialogTrigger`),
      )),
      (PDe = `DialogPortal`),
      ([FDe, IDe] = ADe(PDe, { forceMount: void 0 })),
      (Tv = xv((e) => {
        let { __scopeDialog: t, forceMount: n, children: r, container: i } = e,
          a = Sv(PDe, t);
        return (0, bv.jsx)(FDe, {
          scope: t,
          forceMount: n,
          children: yv.Children.map(r, (e) =>
            (0, bv.jsx)(x_, {
              present: n || a.open,
              children: (0, bv.jsx)(W_, { asChild: !0, container: i, children: e }),
            }),
          ),
        });
      }, `DialogPortal`)),
      (LDe = `DialogOverlay`),
      (Ev = yv.forwardRef(
        xv(function (e, t) {
          let n = IDe(LDe, e.__scopeDialog),
            { forceMount: r = n.forceMount, ...i } = e,
            a = Sv(LDe, e.__scopeDialog);
          return a.modal
            ? (0, bv.jsx)(x_, {
                present: r || a.open,
                children: (0, bv.jsx)(zDe, { ...i, ref: t }),
              })
            : null;
        }, `DialogOverlay`),
      )),
      (RDe = Vg(`DialogOverlay.RemoveScroll`)),
      (zDe = yv.forwardRef(
        xv(function (e, t) {
          let { __scopeDialog: n, ...r } = e,
            i = Sv(LDe, n),
            a = zg(t, hTe());
          return (0, bv.jsx)(mv, {
            as: RDe,
            allowPinchZoom: !0,
            shards: [i.contentRef],
            children: (0, bv.jsx)(Kg.div, {
              "data-state": DDe(i.open),
              ...r,
              ref: a,
              style: { pointerEvents: `auto`, ...r.style },
            }),
          });
        }, `DialogOverlayImpl`),
      )),
      (Dv = `DialogContent`),
      (BDe = yv.forwardRef(
        xv(function (e, t) {
          let n = IDe(Dv, e.__scopeDialog),
            { forceMount: r = n.forceMount, ...i } = e,
            a = Sv(Dv, e.__scopeDialog);
          return (0, bv.jsx)(x_, {
            present: r || a.open,
            children: a.modal
              ? (0, bv.jsx)(VDe, { ...i, ref: t })
              : (0, bv.jsx)(HDe, { ...i, ref: t }),
          });
        }, `DialogContent`),
      )),
      (VDe = yv.forwardRef(
        xv(function (e, t) {
          let n = Sv(Dv, e.__scopeDialog),
            r = yv.useRef(null),
            i = zg(t, n.contentRef, r);
          return (
            yv.useEffect(() => {
              let e = r.current;
              if (e) return wDe(e);
            }, []),
            (0, bv.jsx)(UDe, {
              ...e,
              ref: i,
              trapFocus: n.open,
              disableOutsidePointerEvents: n.open,
              onCloseAutoFocus: s_(e.onCloseAutoFocus, (e) => {
                (e.preventDefault(), n.triggerRef.current?.focus());
              }),
              onPointerDownOutside: s_(e.onPointerDownOutside, (e) => {
                let t = e.detail.originalEvent,
                  n = t.button === 0 && t.ctrlKey === !0;
                (t.button === 2 || n) && e.preventDefault();
              }),
              onFocusOutside: s_(e.onFocusOutside, (e) => e.preventDefault()),
            })
          );
        }, `DialogContentModal`),
      )),
      (HDe = yv.forwardRef(
        xv(function (e, t) {
          let n = Sv(Dv, e.__scopeDialog),
            r = yv.useRef(!1),
            i = yv.useRef(!1);
          return (0, bv.jsx)(UDe, {
            ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: (t) => {
              (e.onCloseAutoFocus?.(t),
                t.defaultPrevented ||
                  (r.current || n.triggerRef.current?.focus(), t.preventDefault()),
                (r.current = !1),
                (i.current = !1));
            },
            onInteractOutside: (t) => {
              (e.onInteractOutside?.(t),
                t.defaultPrevented ||
                  ((r.current = !0),
                  t.detail.originalEvent.type === `pointerdown` && (i.current = !0)));
              let a = t.target;
              (n.triggerRef.current?.contains(a) && t.preventDefault(),
                t.detail.originalEvent.type === `focusin` && i.current && t.preventDefault());
            },
          });
        }, `DialogContentNonModal`),
      )),
      (UDe = yv.forwardRef(
        xv(function (e, t) {
          let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e,
            s = Sv(Dv, n);
          return (
            K_(),
            (0, bv.jsx)(bv.Fragment, {
              children: (0, bv.jsx)(H_, {
                asChild: !0,
                loop: !0,
                trapped: r,
                onMountAutoFocus: i,
                onUnmountAutoFocus: a,
                children: (0, bv.jsx)(N_, {
                  role: `dialog`,
                  id: s.contentId,
                  "aria-describedby": s.descriptionPresent ? s.descriptionId : void 0,
                  "aria-labelledby": s.titlePresent ? s.titleId : void 0,
                  "data-state": DDe(s.open),
                  ...o,
                  ref: t,
                  deferPointerDownOutside: !0,
                  onDismiss: () => s.onOpenChange(!1),
                }),
              }),
            })
          );
        }, `DialogContentImpl`),
      )),
      (WDe = `DialogTitle`),
      (Ov = yv.forwardRef(
        xv(function (e, t) {
          let { __scopeDialog: n, ...r } = e,
            i = Sv(WDe, n),
            { setTitleCount: a } = i;
          return (
            u_(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]),
            (0, bv.jsx)(Kg.h2, { id: i.titleId, ...r, ref: t })
          );
        }, `DialogTitle`),
      )),
      (GDe = `DialogDescription`),
      (kv = yv.forwardRef(
        xv(function (e, t) {
          let { __scopeDialog: n, ...r } = e,
            i = Sv(GDe, n),
            { setDescriptionCount: a } = i;
          return (
            u_(() => (a((e) => e + 1), () => a((e) => e - 1)), [a]),
            (0, bv.jsx)(Kg.p, { id: i.descriptionId, ...r, ref: t })
          );
        }, `DialogDescription`),
      )),
      (KDe = `DialogClose`),
      (Av = yv.forwardRef(
        xv(function (e, t) {
          let { __scopeDialog: n, ...r } = e,
            i = Sv(KDe, n);
          return (0, bv.jsx)(Kg.button, {
            type: `button`,
            ...r,
            ref: t,
            onClick: s_(e.onClick, () => i.onOpenChange(!1)),
          });
        }, `DialogClose`),
      )),
      (qDe = xv((e) => e.children, `WarningProvider`)),
      xv(DDe, `getState`));
  }))();
}
function YDe(e) {
  let [t, n] = XDe.useState(void 0);
  return (
    u_(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        let t = new ResizeObserver((t) => {
          if (!Array.isArray(t) || !t.length) return;
          let r = t[0],
            i,
            a;
          if (`borderBoxSize` in r) {
            let e = r.borderBoxSize,
              t = Array.isArray(e) ? e[0] : e;
            ((i = t.inlineSize), (a = t.blockSize));
          } else ((i = e.offsetWidth), (a = e.offsetHeight));
          n({ width: i, height: a });
        });
        return (t.observe(e, { box: `border-box` }), () => t.unobserve(e));
      }
      n(void 0);
    }, [e]),
    t
  );
}
var XDe, ZDe, QDe;
function $De() {
  return ($De = t(() => {
    ((XDe = n(o(), 1)),
      d_(),
      (ZDe = Object.defineProperty),
      (QDe = (e, t) => ZDe(e, `name`, { value: t, configurable: !0 })),
      QDe(YDe, `useSize`));
  }))();
}
function eOe(e) {
  let {
      __scopeCheckbox: t,
      checked: n,
      children: r,
      defaultChecked: i,
      disabled: a,
      form: o,
      name: s,
      onCheckedChange: c,
      required: l,
      value: u = `on`,
      internal_do_not_use_render: d,
    } = e,
    [f, p] = p_({ prop: n, defaultProp: i ?? !1, onChange: c, caller: iOe }),
    [m, h] = Mv.useState(null),
    [g, _] = Mv.useState(null),
    v = Mv.useRef(!1),
    [y, b] = Mv.useReducer((e) => e + 1, 0),
    x = !m || !!o || !!m.closest(`form`),
    S = {
      checked: f,
      disabled: a,
      setChecked: p,
      control: m,
      setControl: h,
      name: s,
      form: o,
      value: u,
      hasConsumerStoppedPropagationRef: v,
      userInteractionCount: y,
      onUserInteraction: b,
      required: l,
      defaultChecked: !jv(i) && i,
      isFormControl: x,
      bubbleInput: g,
      setBubbleInput: _,
    };
  return (0, Nv.jsx)(sOe, { scope: t, ...S, children: tOe(d) ? d(S) : r });
}
function tOe(e) {
  return typeof e == `function`;
}
function jv(e) {
  return e === `indeterminate`;
}
function nOe(e) {
  return jv(e) ? `indeterminate` : e ? `checked` : `unchecked`;
}
var Mv, Nv, rOe, Pv, iOe, aOe, oOe, sOe, cOe, lOe, uOe, dOe, fOe, pOe, mOe, hOe;
function gOe() {
  return (gOe = t(() => {
    ((Mv = n(o(), 1)),
      Bg(),
      Zg(),
      l_(),
      __(),
      $De(),
      S_(),
      qg(),
      (Nv = K()),
      (rOe = Object.defineProperty),
      (Pv = (e, t) => rOe(e, `name`, { value: t, configurable: !0 })),
      (iOe = `Checkbox`),
      ([aOe, oOe] = Jg(iOe)),
      ([sOe, cOe] = aOe(iOe)),
      Pv(eOe, `CheckboxProvider`),
      (lOe = `CheckboxTrigger`),
      (uOe = Mv.forwardRef(
        Pv(function ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, i) {
          let {
              control: a,
              value: o,
              disabled: s,
              checked: c,
              required: l,
              setControl: u,
              setChecked: d,
              hasConsumerStoppedPropagationRef: f,
              onUserInteraction: p,
              isFormControl: m,
              bubbleInput: h,
            } = cOe(lOe, e),
            g = zg(i, u),
            _ = Mv.useRef(c);
          return (
            Mv.useEffect(() => {
              let e = a?.form;
              if (e) {
                let t = Pv(() => d(_.current), `reset`);
                return (e.addEventListener(`reset`, t), () => e.removeEventListener(`reset`, t));
              }
            }, [a, d]),
            (0, Nv.jsx)(Kg.button, {
              type: `button`,
              role: `checkbox`,
              "aria-checked": jv(c) ? `mixed` : c,
              "aria-required": l,
              "data-state": nOe(c),
              "data-disabled": s ? `` : void 0,
              disabled: s,
              value: o,
              ...r,
              ref: g,
              onKeyDown: s_(t, (e) => {
                e.key === `Enter` && e.preventDefault();
              }),
              onClick: s_(n, (e) => {
                (p(),
                  d((e) => (jv(e) ? !0 : !e)),
                  h &&
                    m &&
                    ((f.current = e.isPropagationStopped()), f.current || e.stopPropagation()));
              }),
            })
          );
        }, `CheckboxTrigger`),
      )),
      (dOe = Mv.forwardRef(
        Pv(function (e, t) {
          let {
            __scopeCheckbox: n,
            name: r,
            checked: i,
            defaultChecked: a,
            required: o,
            disabled: s,
            value: c,
            onCheckedChange: l,
            form: u,
            ...d
          } = e;
          return (0, Nv.jsx)(eOe, {
            __scopeCheckbox: n,
            checked: i,
            defaultChecked: a,
            disabled: s,
            required: o,
            onCheckedChange: l,
            name: r,
            form: u,
            value: c,
            internal_do_not_use_render: ({ isFormControl: e }) =>
              (0, Nv.jsxs)(Nv.Fragment, {
                children: [
                  (0, Nv.jsx)(uOe, { ...d, ref: t, __scopeCheckbox: n }),
                  e && (0, Nv.jsx)(hOe, { __scopeCheckbox: n }),
                ],
              }),
          });
        }, `Checkbox`),
      )),
      (fOe = `CheckboxIndicator`),
      (pOe = Mv.forwardRef(
        Pv(function (e, t) {
          let { __scopeCheckbox: n, forceMount: r, ...i } = e,
            a = cOe(fOe, n);
          return (0, Nv.jsx)(x_, {
            present: r || jv(a.checked) || a.checked === !0,
            children: (0, Nv.jsx)(Kg.span, {
              "data-state": nOe(a.checked),
              "data-disabled": a.disabled ? `` : void 0,
              ...i,
              ref: t,
              style: { pointerEvents: `none`, ...e.style },
            }),
          });
        }, `CheckboxIndicator`),
      )),
      (mOe = `CheckboxBubbleInput`),
      (hOe = Mv.forwardRef(
        Pv(function ({ __scopeCheckbox: e, onClick: t, ...n }, r) {
          let {
              control: i,
              hasConsumerStoppedPropagationRef: a,
              userInteractionCount: o,
              checked: s,
              defaultChecked: c,
              required: l,
              disabled: u,
              name: d,
              value: f,
              form: p,
              bubbleInput: m,
              setBubbleInput: h,
            } = cOe(mOe, e),
            g = zg(r, h),
            _ = YDe(i),
            v = Mv.useRef(!1),
            y = Mv.useRef(s),
            b = Mv.useRef(o);
          Mv.useEffect(() => {
            let e = m;
            if (!e) return;
            let t = window.HTMLInputElement.prototype,
              n = Object.getOwnPropertyDescriptor(t, `checked`).set,
              r = o !== b.current;
            b.current = o;
            let i = y.current !== s;
            y.current = s;
            let c = !(r && a.current);
            if (i && n) {
              v.current = !r;
              let t = new Event(`click`, { bubbles: c });
              ((e.indeterminate = jv(s)),
                n.call(e, !jv(s) && s),
                e.dispatchEvent(t),
                (v.current = !1));
            }
          }, [m, s, a, o]);
          let x = Mv.useRef(!jv(s) && s);
          return (0, Nv.jsx)(Kg.input, {
            type: `checkbox`,
            "aria-hidden": !0,
            defaultChecked: c ?? x.current,
            required: l,
            disabled: u,
            name: d,
            value: f,
            form: p,
            ...n,
            tabIndex: -1,
            ref: g,
            onClick: s_(t, (e) => {
              v.current && e.stopPropagation();
            }),
            style: {
              ...n.style,
              ..._,
              position: `absolute`,
              pointerEvents: `none`,
              opacity: 0,
              margin: 0,
              transform: `translateX(-100%)`,
            },
          });
        }, `CheckboxBubbleInput`),
      )),
      Pv(tOe, `isFunction`),
      Pv(jv, `isIndeterminate`),
      Pv(nOe, `getState`));
  }))();
}
function _Oe(e, t, n) {
  return Bv(e, zv(t, n));
}
function Fv(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function Iv(e) {
  return e.split(`-`)[0];
}
function Lv(e) {
  return e.split(`-`)[1];
}
function vOe(e) {
  return e === `x` ? `y` : `x`;
}
function yOe(e) {
  return e === `y` ? `height` : `width`;
}
function Rv(e) {
  let t = e[0];
  return t === `t` || t === `b` ? `y` : `x`;
}
function bOe(e) {
  return vOe(Rv(e));
}
function xOe(e, t, n) {
  n === void 0 && (n = !1);
  let r = Lv(e),
    i = bOe(e),
    a = yOe(i),
    o =
      i === `x`
        ? r === (n ? `end` : `start`)
          ? `right`
          : `left`
        : r === `start`
          ? `bottom`
          : `top`;
  return (t.reference[a] > t.floating[a] && (o = EOe(o)), [o, EOe(o)]);
}
function SOe(e) {
  let t = EOe(e);
  return [COe(e), t, COe(t)];
}
function COe(e) {
  return e.includes(`start`) ? e.replace(`start`, `end`) : e.replace(`end`, `start`);
}
function wOe(e, t, n) {
  switch (e) {
    case `top`:
    case `bottom`:
      return n ? (t ? NOe : MOe) : t ? MOe : NOe;
    case `left`:
    case `right`:
      return t ? POe : FOe;
    default:
      return [];
  }
}
function TOe(e, t, n, r) {
  let i = Lv(e),
    a = wOe(Iv(e), n === `start`, r);
  return (i && ((a = a.map((e) => e + `-` + i)), t && (a = a.concat(a.map(COe)))), a);
}
function EOe(e) {
  let t = Iv(e);
  return jOe[t] + e.slice(t.length);
}
function DOe(e) {
  return { top: e.top ?? 0, right: e.right ?? 0, bottom: e.bottom ?? 0, left: e.left ?? 0 };
}
function OOe(e) {
  return typeof e == `number` ? { top: e, right: e, bottom: e, left: e } : DOe(e);
}
function kOe(e) {
  let { x: t, y: n, width: r, height: i } = e;
  return { width: r, height: i, top: n, left: t, right: t + r, bottom: n + i, x: t, y: n };
}
var AOe, zv, Bv, Vv, Hv, Uv, jOe, MOe, NOe, POe, FOe;
function IOe() {
  return (IOe = t(() => {
    ((AOe = [`top`, `right`, `bottom`, `left`]),
      (zv = Math.min),
      (Bv = Math.max),
      (Vv = Math.round),
      (Hv = Math.floor),
      (Uv = (e) => ({ x: e, y: e })),
      (jOe = { left: `right`, right: `left`, bottom: `top`, top: `bottom` }),
      (MOe = [`left`, `right`]),
      (NOe = [`right`, `left`]),
      (POe = [`top`, `bottom`]),
      (FOe = [`bottom`, `top`]));
  }))();
}
function LOe(e, t, n) {
  let { reference: r, floating: i } = e,
    a = Rv(t),
    o = bOe(t),
    s = yOe(o),
    c = Iv(t),
    l = a === `y`,
    u = r.x + r.width / 2 - i.width / 2,
    d = r.y + r.height / 2 - i.height / 2,
    f = r[s] / 2 - i[s] / 2,
    p;
  switch (c) {
    case `top`:
      p = { x: u, y: r.y - i.height };
      break;
    case `bottom`:
      p = { x: u, y: r.y + r.height };
      break;
    case `right`:
      p = { x: r.x + r.width, y: d };
      break;
    case `left`:
      p = { x: r.x - i.width, y: d };
      break;
    default:
      p = { x: r.x, y: r.y };
  }
  let m = Lv(t);
  return (m && (p[o] += f * (m === `end` ? 1 : -1) * (n && l ? -1 : 1)), p);
}
async function ROe(e, t) {
  t === void 0 && (t = {});
  let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e,
    {
      boundary: c = `clippingAncestors`,
      rootBoundary: l = `viewport`,
      elementContext: u = `floating`,
      altBoundary: d = !1,
      padding: f = 0,
    } = Fv(t, e),
    p = OOe(f),
    m = o[d ? (u === `floating` ? `reference` : `floating`) : u],
    h = kOe(
      await i.getClippingRect({
        element:
          ((await (i.isElement == null ? void 0 : i.isElement(m))) ?? !0)
            ? m
            : m.contextElement ||
              (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating))),
        boundary: c,
        rootBoundary: l,
        strategy: s,
      }),
    ),
    g =
      u === `floating`
        ? { x: n, y: r, width: a.floating.width, height: a.floating.height }
        : a.reference,
    _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)),
    v = ((await (i.isElement == null ? void 0 : i.isElement(_))) &&
      (await (i.getScale == null ? void 0 : i.getScale(_)))) || { x: 1, y: 1 },
    y = kOe(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: o,
            rect: g,
            offsetParent: _,
            strategy: s,
          })
        : g,
    );
  return {
    top: (h.top - y.top + p.top) / v.y,
    bottom: (y.bottom - h.bottom + p.bottom) / v.y,
    left: (h.left - y.left + p.left) / v.x,
    right: (y.right - h.right + p.right) / v.x,
  };
}
function zOe(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function BOe(e) {
  return AOe.some((t) => e[t] >= 0);
}
async function VOe(e, t) {
  let { placement: n, platform: r, elements: i } = e,
    a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
    o = Iv(n),
    s = Lv(n),
    c = Rv(n) === `y`,
    l = qOe.has(o) ? -1 : 1,
    u = a && c ? -1 : 1,
    d = Fv(t, e),
    {
      mainAxis: f,
      crossAxis: p,
      alignmentAxis: m,
    } = typeof d == `number`
      ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
      : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis };
  return (
    s && typeof m == `number` && (p = s === `end` ? m * -1 : m),
    c ? { x: p * u, y: f * l } : { x: f * l, y: p * u }
  );
}
var HOe, UOe, WOe, GOe, KOe, qOe, JOe, YOe, XOe, ZOe;
function QOe() {
  return (QOe = t(() => {
    (IOe(),
      (HOe = 50),
      (UOe = async (e, t, n) => {
        let {
            placement: r = `bottom`,
            strategy: i = `absolute`,
            middleware: a = [],
            platform: o,
          } = n,
          s = o.detectOverflow ? o : { ...o, detectOverflow: ROe },
          c = await (o.isRTL == null ? void 0 : o.isRTL(t)),
          l = await o.getElementRects({ reference: e, floating: t, strategy: i }),
          { x: u, y: d } = LOe(l, r, c),
          f = r,
          p = 0,
          m = {};
        for (let n = 0; n < a.length; n++) {
          let h = a[n];
          if (!h) continue;
          let { name: g, fn: _ } = h,
            {
              x: v,
              y,
              data: b,
              reset: x,
            } = await _({
              x: u,
              y: d,
              initialPlacement: r,
              placement: f,
              strategy: i,
              middlewareData: m,
              rects: l,
              platform: s,
              elements: { reference: e, floating: t },
            });
          ((u = v ?? u),
            (d = y ?? d),
            (m[g] = { ...m[g], ...b }),
            x &&
              p < HOe &&
              (p++,
              typeof x == `object` &&
                (x.placement && (f = x.placement),
                x.rects &&
                  (l =
                    x.rects === !0
                      ? await o.getElementRects({ reference: e, floating: t, strategy: i })
                      : x.rects),
                ({ x: u, y: d } = LOe(l, f, c))),
              (n = -1)));
        }
        return { x: u, y: d, placement: f, strategy: i, middlewareData: m };
      }),
      (WOe = (e) => ({
        name: `arrow`,
        options: e,
        async fn(t) {
          let {
              x: n,
              y: r,
              placement: i,
              rects: a,
              platform: o,
              elements: s,
              middlewareData: c,
            } = t,
            { element: l, padding: u = 0 } = Fv(e, t) || {};
          if (l == null) return {};
          let d = OOe(u),
            f = { x: n, y: r },
            p = bOe(i),
            m = yOe(p),
            h = await o.getDimensions(l),
            g = p === `y`,
            _ = g ? `top` : `left`,
            v = g ? `bottom` : `right`,
            y = g ? `clientHeight` : `clientWidth`,
            b = a.reference[m] + a.reference[p] - f[p] - a.floating[m],
            x = f[p] - a.reference[p],
            S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)),
            C = S ? S[y] : 0;
          (!C || !(await (o.isElement == null ? void 0 : o.isElement(S)))) &&
            (C = s.floating[y] || a.floating[m]);
          let w = b / 2 - x / 2,
            T = C / 2 - h[m] / 2 - 1,
            E = zv(d[_], T),
            D = zv(d[v], T),
            O = C - h[m] - D,
            k = C / 2 - h[m] / 2 + w,
            A = _Oe(E, k, O),
            j =
              !c.arrow &&
              Lv(i) != null &&
              k !== A &&
              a.reference[m] / 2 - (k < E ? E : D) - h[m] / 2 < 0,
            M = j ? (k < E ? k - E : k - O) : 0;
          return {
            [p]: f[p] + M,
            data: { [p]: A, centerOffset: k - A - M, ...(j && { alignmentOffset: M }) },
            reset: j,
          };
        },
      })),
      (GOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            name: `flip`,
            options: e,
            async fn(t) {
              var n;
              let {
                  placement: r,
                  middlewareData: i,
                  rects: a,
                  initialPlacement: o,
                  platform: s,
                  elements: c,
                } = t,
                {
                  mainAxis: l = !0,
                  crossAxis: u = !0,
                  fallbackPlacements: d,
                  fallbackStrategy: f = `bestFit`,
                  fallbackAxisSideDirection: p = `none`,
                  flipAlignment: m = !0,
                  ...h
                } = Fv(e, t);
              if ((n = i.arrow) != null && n.alignmentOffset) return {};
              let g = Iv(r),
                _ = Rv(o),
                v = Iv(o) === o,
                y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)),
                b = d || (v || !m ? [EOe(o)] : SOe(o)),
                x = p !== `none`;
              !d && x && b.push(...TOe(o, m, p, y));
              let S = [o, ...b],
                C = await s.detectOverflow(t, h),
                w = [],
                T = i.flip?.overflows || [];
              if ((l && w.push(C[g]), u)) {
                let e = xOe(r, a, y);
                w.push(C[e[0]], C[e[1]]);
              }
              if (((T = [...T, { placement: r, overflows: w }]), !w.every((e) => e <= 0))) {
                let e = (i.flip?.index || 0) + 1,
                  t = S[e];
                if (
                  t &&
                  (u !== `alignment` ||
                    _ === Rv(t) ||
                    T.every((e) => Rv(e.placement) !== _ || e.overflows[0] > 0))
                )
                  return { data: { index: e, overflows: T }, reset: { placement: t } };
                let n = T.filter((e) => e.overflows[0] <= 0).sort(
                  (e, t) => e.overflows[1] - t.overflows[1],
                )[0]?.placement;
                if (!n)
                  switch (f) {
                    case `bestFit`: {
                      let e = T.filter((e) => {
                        if (x) {
                          let t = Rv(e.placement);
                          return t === _ || t === `y`;
                        }
                        return !0;
                      })
                        .map((e) => [
                          e.placement,
                          e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0),
                        ])
                        .sort((e, t) => e[1] - t[1])[0]?.[0];
                      e && (n = e);
                      break;
                    }
                    case `initialPlacement`:
                      n = o;
                  }
                if (r !== n) return { reset: { placement: n } };
              }
              return {};
            },
          }
        );
      }),
      (KOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            name: `hide`,
            options: e,
            async fn(t) {
              let { rects: n, platform: r } = t,
                { strategy: i = `referenceHidden`, ...a } = Fv(e, t);
              switch (i) {
                case `referenceHidden`: {
                  let e = zOe(
                    await r.detectOverflow(t, { ...a, elementContext: `reference` }),
                    n.reference,
                  );
                  return { data: { referenceHiddenOffsets: e, referenceHidden: BOe(e) } };
                }
                case `escaped`: {
                  let e = zOe(await r.detectOverflow(t, { ...a, altBoundary: !0 }), n.floating);
                  return { data: { escapedOffsets: e, escaped: BOe(e) } };
                }
                default:
                  return {};
              }
            },
          }
        );
      }),
      (qOe = new Set([`left`, `top`])),
      (JOe = function (e) {
        return (
          e === void 0 && (e = 0),
          {
            name: `offset`,
            options: e,
            async fn(t) {
              var n;
              let { x: r, y: i, placement: a, middlewareData: o } = t,
                s = await VOe(t, e);
              return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset
                ? {}
                : { x: r + s.x, y: i + s.y, data: { ...s, placement: a } };
            },
          }
        );
      }),
      (YOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            name: `shift`,
            options: e,
            async fn(t) {
              let { x: n, y: r, placement: i, platform: a } = t,
                {
                  mainAxis: o = !0,
                  crossAxis: s = !1,
                  limiter: c = {
                    fn: (e) => {
                      let { x: t, y: n } = e;
                      return { x: t, y: n };
                    },
                  },
                  ...l
                } = Fv(e, t),
                u = { x: n, y: r },
                d = await a.detectOverflow(t, l),
                f = Rv(i),
                p = vOe(f),
                m = u[p],
                h = u[f],
                g = (e, t) =>
                  _Oe(t + d[e === `y` ? `top` : `left`], t, t - d[e === `y` ? `bottom` : `right`]);
              (o && (m = g(p, m)), s && (h = g(f, h)));
              let _ = c.fn({ ...t, [p]: m, [f]: h });
              return { ..._, data: { x: _.x - n, y: _.y - r, enabled: { [p]: o, [f]: s } } };
            },
          }
        );
      }),
      (XOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            options: e,
            fn(t) {
              let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t,
                { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Fv(e, t),
                u = { x: n, y: r },
                d = Rv(i),
                f = vOe(d),
                p = u[f],
                m = u[d],
                h = Fv(s, t),
                g =
                  typeof h == `number`
                    ? { mainAxis: h, crossAxis: 0 }
                    : { mainAxis: h.mainAxis ?? 0, crossAxis: h.crossAxis ?? 0 };
              if (c) {
                let e = f === `y` ? `height` : `width`,
                  t = a.reference[f] - a.floating[e] + g.mainAxis,
                  n = a.reference[f] + a.reference[e] - g.mainAxis;
                p < t ? (p = t) : p > n && (p = n);
              }
              if (l) {
                let e = f === `y` ? `width` : `height`,
                  t = qOe.has(Iv(i)),
                  n =
                    a.reference[d] -
                    a.floating[e] +
                    ((t && o.offset?.[d]) || 0) +
                    (t ? 0 : g.crossAxis),
                  r =
                    a.reference[d] +
                    a.reference[e] +
                    (t ? 0 : o.offset?.[d] || 0) -
                    (t ? g.crossAxis : 0);
                m < n ? (m = n) : m > r && (m = r);
              }
              return { [f]: p, [d]: m };
            },
          }
        );
      }),
      (ZOe = function (e) {
        return (
          e === void 0 && (e = {}),
          {
            name: `size`,
            options: e,
            async fn(t) {
              let { placement: n, rects: r, platform: i, elements: a } = t,
                { apply: o = () => {}, ...s } = Fv(e, t),
                c = await i.detectOverflow(t, s),
                l = Iv(n),
                u = Lv(n),
                d = Rv(n) === `y`,
                { width: f, height: p } = r.floating,
                m,
                h;
              l === `top` || l === `bottom`
                ? ((m = l),
                  (h =
                    u ===
                    ((await (i.isRTL == null ? void 0 : i.isRTL(a.floating))) ? `start` : `end`)
                      ? `left`
                      : `right`))
                : ((h = l), (m = u === `end` ? `top` : `bottom`));
              let g = p - c.top - c.bottom,
                _ = f - c.left - c.right,
                v = zv(p - c[m], g),
                y = zv(f - c[h], _),
                b = t.middlewareData.shift,
                x = !b,
                S = v,
                C = y;
              (b != null && b.enabled.x && (C = _),
                b != null && b.enabled.y && (S = g),
                x &&
                  !u &&
                  (d ? (C = f - 2 * Bv(c.left, c.right)) : (S = p - 2 * Bv(c.top, c.bottom))),
                await o({ ...t, availableWidth: C, availableHeight: S }));
              let w = await i.getDimensions(a.floating);
              return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
            },
          }
        );
      }));
  }))();
}
function $Oe() {
  return typeof window < `u`;
}
function Wv(e) {
  return eke(e) ? (e.nodeName || ``).toLowerCase() : `#document`;
}
function Gv(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Kv(e) {
  return ((eke(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function eke(e) {
  return $Oe() ? e instanceof Node || e instanceof Gv(e).Node : !1;
}
function qv(e) {
  return $Oe() ? e instanceof Element || e instanceof Gv(e).Element : !1;
}
function Jv(e) {
  return $Oe() ? e instanceof HTMLElement || e instanceof Gv(e).HTMLElement : !1;
}
function tke(e) {
  return !$Oe() || typeof ShadowRoot > `u`
    ? !1
    : e instanceof ShadowRoot || e instanceof Gv(e).ShadowRoot;
}
function nke(e) {
  let { overflow: t, overflowX: n, overflowY: r, display: i } = Xv(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== `inline` && i !== `contents`;
}
function rke(e) {
  return /^(table|td|th)$/.test(Wv(e));
}
function ike(e) {
  try {
    if (e.matches(`:popover-open`)) return !0;
  } catch {}
  try {
    return e.matches(`:modal`);
  } catch {
    return !1;
  }
}
function ake(e) {
  let t = qv(e) ? Xv(e) : e;
  return (
    $v(t.transform) ||
    $v(t.translate) ||
    $v(t.scale) ||
    $v(t.rotate) ||
    $v(t.perspective) ||
    (!ske() && ($v(t.backdropFilter) || $v(t.filter))) ||
    dke.test(t.willChange || ``) ||
    fke.test(t.contain || ``)
  );
}
function oke(e) {
  let t = Zv(e);
  for (; Jv(t) && !Yv(t); ) {
    if (ake(t)) return t;
    if (ike(t)) return null;
    t = Zv(t);
  }
  return null;
}
function ske() {
  return (
    (pke ??= typeof CSS < `u` && CSS.supports && CSS.supports(`-webkit-backdrop-filter`, `none`)),
    pke
  );
}
function Yv(e) {
  return /^(html|body|#document)$/.test(Wv(e));
}
function Xv(e) {
  return Gv(e).getComputedStyle(e);
}
function cke(e) {
  return qv(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Zv(e) {
  if (Wv(e) === `html`) return e;
  let t = e.assignedSlot || e.parentNode || (tke(e) && e.host) || Kv(e);
  return tke(t) ? t.host : t;
}
function lke(e) {
  let t = Zv(e);
  return Yv(t) ? (e.ownerDocument || e).body : Jv(t) && nke(t) ? t : lke(t);
}
function Qv(e, t, n) {
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  let r = lke(e),
    i = r === e.ownerDocument?.body,
    a = Gv(r);
  if (i) {
    let e = uke(a);
    return t.concat(a, a.visualViewport || [], nke(r) ? r : [], e && n ? Qv(e) : []);
  }
  return t.concat(r, Qv(r, [], n));
}
function uke(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
var dke, fke, $v, pke;
function mke() {
  return (mke = t(() => {
    ((dke = /transform|translate|scale|rotate|perspective|filter/),
      (fke = /paint|layout|strict|content/),
      ($v = (e) => !!e && e !== `none`));
  }))();
}
function hke(e) {
  let t = Xv(e),
    n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0,
    i = Jv(e),
    a = i ? e.offsetWidth : n,
    o = i ? e.offsetHeight : r,
    s = Vv(n) !== a || Vv(r) !== o;
  return (s && ((n = a), (r = o)), { width: n, height: r, $: s });
}
function gke(e) {
  return qv(e) ? e : e.contextElement;
}
function ey(e) {
  let t = gke(e);
  if (!Jv(t)) return Uv(1);
  let n = t.getBoundingClientRect(),
    { width: r, height: i, $: a } = hke(t),
    o = (a ? Vv(n.width) : n.width) / r,
    s = (a ? Vv(n.height) : n.height) / i;
  return (
    (!o || !Number.isFinite(o)) && (o = 1),
    (!s || !Number.isFinite(s)) && (s = 1),
    { x: o, y: s }
  );
}
function _ke(e) {
  let t = Gv(e);
  return !ske() || !t.visualViewport
    ? Lke
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function vke(e, t, n) {
  return (t === void 0 && (t = !1), !!n && t && n === Gv(e));
}
function ty(e, t, n, r) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  let i = e.getBoundingClientRect(),
    a = gke(e),
    o = Uv(1);
  t && (r ? qv(r) && (o = ey(r)) : (o = ey(e)));
  let s = vke(a, n, r) ? _ke(a) : Uv(0),
    c = (i.left + s.x) / o.x,
    l = (i.top + s.y) / o.y,
    u = i.width / o.x,
    d = i.height / o.y;
  if (a && r) {
    let e = Gv(a),
      t = qv(r) ? Gv(r) : r,
      n = e,
      i = uke(n);
    for (; i && t !== n; ) {
      let e = ey(i),
        t = i.getBoundingClientRect(),
        r = Xv(i),
        a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x,
        o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
      ((c *= e.x),
        (l *= e.y),
        (u *= e.x),
        (d *= e.y),
        (c += a),
        (l += o),
        (n = Gv(i)),
        (i = uke(n)));
    }
  }
  return kOe({ width: u, height: d, x: c, y: l });
}
function yke(e, t) {
  let n = cke(e).scrollLeft;
  return t ? t.left + n : ty(Kv(e)).left + n;
}
function bke(e, t) {
  let n = e.getBoundingClientRect();
  return { x: n.left + t.scrollLeft - yke(e, n), y: n.top + t.scrollTop };
}
function xke(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: i } = e,
    a = i === `fixed`,
    o = Kv(r),
    s = t ? ike(t.floating) : !1;
  if (r === o || (s && a)) return n;
  let c = { scrollLeft: 0, scrollTop: 0 },
    l = Uv(1),
    u = Uv(0),
    d = Jv(r);
  if ((d || !a) && ((Wv(r) !== `body` || nke(o)) && (c = cke(r)), d)) {
    let e = ty(r);
    ((l = ey(r)), (u.x = e.x + r.clientLeft), (u.y = e.y + r.clientTop));
  }
  let f = o && !d && !a ? bke(o, c) : Uv(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + f.y,
  };
}
function Ske(e) {
  return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function Cke(e) {
  let t = cke(e),
    n = e.ownerDocument.body,
    r = Bv(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth),
    i = Bv(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight),
    a = -t.scrollLeft + yke(e),
    o = -t.scrollTop;
  return (
    Xv(n).direction === `rtl` && (a += Bv(e.clientWidth, n.clientWidth) - r),
    { width: r, height: i, x: a, y: o }
  );
}
function wke(e, t, n) {
  n === void 0 && (n = `viewport`);
  let r = n === `layoutViewport`,
    i = Gv(e),
    a = Kv(e),
    o = i.visualViewport,
    s = a.clientWidth,
    c = a.clientHeight,
    l = 0,
    u = 0;
  if (o) {
    let e = !ske() || t === `fixed`;
    r
      ? e || ((l = -o.offsetLeft), (u = -o.offsetTop))
      : ((s = o.width), (c = o.height), e && ((l = o.offsetLeft), (u = o.offsetTop)));
  }
  if (yke(a) <= 0) {
    let e = a.ownerDocument,
      t = e.body,
      n = getComputedStyle(t),
      r =
        (e.compatMode === `CSS1Compat` && parseFloat(n.marginLeft) + parseFloat(n.marginRight)) ||
        0,
      i = Math.abs(a.clientWidth - t.clientWidth - r),
      o = getComputedStyle(a).scrollbarGutter === `stable both-edges` ? i / 2 : i;
    o <= Rke && (s -= o);
  }
  return { width: s, height: c, x: l, y: u };
}
function Tke(e, t) {
  let n = ty(e, !0, t === `fixed`),
    r = n.top + e.clientTop,
    i = n.left + e.clientLeft,
    a = ey(e);
  return { width: e.clientWidth * a.x, height: e.clientHeight * a.y, x: i * a.x, y: r * a.y };
}
function Eke(e, t, n) {
  let r;
  if (t === `viewport` || t === `layoutViewport`) r = wke(e, n, t);
  else if (t === `document`) r = Cke(Kv(e));
  else if (qv(t)) r = Tke(t, n);
  else {
    let n = _ke(e);
    r = { x: t.x - n.x, y: t.y - n.y, width: t.width, height: t.height };
  }
  return kOe(r);
}
function Dke(e, t) {
  let n = t.get(e);
  if (n) return n;
  let r = Qv(e, [], !1).filter((e) => qv(e) && Wv(e) !== `body`),
    i = null,
    a = Xv(e).position === `fixed`,
    o = a ? Zv(e) : e;
  for (; qv(o) && !Yv(o); ) {
    let e = Xv(o),
      t = ake(o),
      n = i ? i.position : a ? `fixed` : ``;
    (!t && (n === `fixed` || (n === `absolute` && e.position === `static`))
      ? (r = r.filter((e) => e !== o))
      : (i = e),
      (o = Zv(o)));
  }
  return (t.set(e, r), r);
}
function Oke(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: i } = e,
    a = [...(n === `clippingAncestors` ? (ike(t) ? [] : Dke(t, this._c)) : [].concat(n)), r],
    o = Eke(t, a[0], i),
    s = o.top,
    c = o.right,
    l = o.bottom,
    u = o.left;
  for (let e = 1; e < a.length; e++) {
    let n = Eke(t, a[e], i);
    ((s = Bv(n.top, s)), (c = zv(n.right, c)), (l = zv(n.bottom, l)), (u = Bv(n.left, u)));
  }
  return { width: c - u, height: l - s, x: u, y: s };
}
function kke(e) {
  let { width: t, height: n } = hke(e);
  return { width: t, height: n };
}
function Ake(e, t, n) {
  let r = Jv(t),
    i = Kv(t),
    a = n === `fixed`,
    o = ty(e, !0, a, t),
    s = { scrollLeft: 0, scrollTop: 0 },
    c = Uv(0);
  if ((r || !a) && ((Wv(t) !== `body` || nke(i)) && (s = cke(t)), r)) {
    let e = ty(t, !0, a, t);
    ((c.x = e.x + t.clientLeft), (c.y = e.y + t.clientTop));
  }
  !r && i && (c.x = yke(i));
  let l = i && !r && !a ? bke(i, s) : Uv(0);
  return {
    x: o.left + s.scrollLeft - c.x - l.x,
    y: o.top + s.scrollTop - c.y - l.y,
    width: o.width,
    height: o.height,
  };
}
function jke(e) {
  return Xv(e).position === `static`;
}
function Mke(e, t) {
  if (!Jv(e) || Xv(e).position === `fixed`) return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (Kv(e) === n && (n = n.ownerDocument.body), n);
}
function Nke(e, t) {
  let n = Gv(e);
  if (ike(e)) return n;
  if (!Jv(e)) {
    let t = Zv(e);
    for (; t && !Yv(t); ) {
      if (qv(t) && !jke(t)) return t;
      t = Zv(t);
    }
    return n;
  }
  let r = Mke(e, t);
  for (; r && rke(r) && jke(r); ) r = Mke(r, t);
  return r && Yv(r) && jke(r) && !ake(r) ? n : r || oke(e) || n;
}
function Pke(e) {
  return Xv(e).direction === `rtl`;
}
function Fke(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ike(e, t, n) {
  let r = null,
    i,
    a = Kv(e);
  function o() {
    var e;
    (clearTimeout(i), (e = r) == null || e.disconnect(), (r = null));
  }
  function s(n, c) {
    (n === void 0 && (n = !1), c === void 0 && (c = 1), o());
    let l = e.getBoundingClientRect(),
      { left: u, top: d, width: f, height: p } = l;
    if ((n || t(), !f || !p)) return;
    let m = Hv(d),
      h = Hv(a.clientWidth - (u + f)),
      g = Hv(a.clientHeight - (d + p)),
      _ = Hv(u),
      v = {
        rootMargin: -m + `px ` + -h + `px ` + -g + `px ` + -_ + `px`,
        threshold: Bv(0, zv(1, c)) || 1,
      },
      y = !0;
    function b(t) {
      let n = t[0].intersectionRatio;
      if (!Fke(l, e.getBoundingClientRect())) return s();
      if (n !== c) {
        if (!y) return s();
        n
          ? s(!1, n)
          : (i = setTimeout(() => {
              s(!1, 1e-7);
            }, 1e3));
      }
      y = !1;
    }
    try {
      r = new IntersectionObserver(b, { ...v, root: a.ownerDocument });
    } catch {
      r = new IntersectionObserver(b, v);
    }
    r.observe(e);
  }
  let c = Gv(e),
    l = () => s(n);
  return (
    c.addEventListener(`resize`, l),
    s(!0),
    () => {
      (c.removeEventListener(`resize`, l), o());
    }
  );
}
function ny(e, t, n, r) {
  r === void 0 && (r = {});
  let {
      ancestorScroll: i = !0,
      ancestorResize: a = !0,
      elementResize: o = typeof ResizeObserver == `function`,
      layoutShift: s = typeof IntersectionObserver == `function`,
      animationFrame: c = !1,
    } = r,
    l = gke(e),
    u = i || a ? [...(l ? Qv(l) : []), ...(t ? Qv(t) : [])] : [];
  u.forEach((e) => {
    (i && e.addEventListener(`scroll`, n), a && e.addEventListener(`resize`, n));
  });
  let d = l && s ? Ike(l, n, a) : null,
    f = -1,
    p = null;
  o &&
    ((p = new ResizeObserver((e) => {
      let [r] = e;
      (r &&
        r.target === l &&
        p &&
        t &&
        (p.unobserve(t),
        cancelAnimationFrame(f),
        (f = requestAnimationFrame(() => {
          var e;
          (e = p) == null || e.observe(t);
        }))),
        n());
    })),
    l && !c && p.observe(l),
    t && p.observe(t));
  let m,
    h = c ? ty(e) : null;
  c && g();
  function g() {
    let t = ty(e);
    (h && !Fke(h, t) && n(), (h = t), (m = requestAnimationFrame(g)));
  }
  return (
    n(),
    () => {
      var e;
      (u.forEach((e) => {
        (i && e.removeEventListener(`scroll`, n), a && e.removeEventListener(`resize`, n));
      }),
        d?.(),
        (e = p) == null || e.disconnect(),
        (p = null),
        c && cancelAnimationFrame(m));
    }
  );
}
var Lke, Rke, zke, Bke, Vke, Hke, Uke, Wke, Gke, Kke, qke, Jke, Yke;
function Xke() {
  return (Xke = t(() => {
    (QOe(),
      IOe(),
      mke(),
      (Lke = Uv(0)),
      (Rke = 25),
      (zke = async function (e) {
        let t = this.getOffsetParent || Nke,
          n = this.getDimensions,
          r = await n(e.floating);
        return {
          reference: Ake(e.reference, await t(e.floating), e.strategy),
          floating: { x: 0, y: 0, width: r.width, height: r.height },
        };
      }),
      (Bke = {
        convertOffsetParentRelativeRectToViewportRelativeRect: xke,
        getDocumentElement: Kv,
        getClippingRect: Oke,
        getOffsetParent: Nke,
        getElementRects: zke,
        getClientRects: Ske,
        getDimensions: kke,
        getScale: ey,
        isElement: qv,
        isRTL: Pke,
      }),
      (Vke = ROe),
      (Hke = JOe),
      (Uke = YOe),
      (Wke = GOe),
      (Gke = ZOe),
      (Kke = KOe),
      (qke = WOe),
      (Jke = XOe),
      (Yke = (e, t, n) => {
        let r = new Map(),
          i = n ?? {},
          a = { ...Bke, ...i.platform, _c: r };
        return UOe(e, t, { ...i, platform: a });
      }));
  }))();
}
function Zke(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == `function` && e.toString() === t.toString()) return !0;
  let n, r, i;
  if (e && t && typeof e == `object`) {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!Zke(e[r], t[r])) return !1;
      return !0;
    }
    if (((i = Object.keys(e)), (n = i.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
    for (r = n; r-- !== 0; ) {
      let n = i[r];
      if (!(n === `_owner` && e.$$typeof) && !Zke(e[n], t[n])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Qke(e) {
  return typeof window > `u` ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function $ke(e, t) {
  let n = Qke(e);
  return Math.round(t * n) / n;
}
function eAe(e) {
  let t = ry.useRef(e);
  return (
    iy(() => {
      t.current = e;
    }),
    t
  );
}
function tAe(e) {
  e === void 0 && (e = {});
  let {
      placement: t = `bottom`,
      strategy: n = `absolute`,
      middleware: r = [],
      platform: i,
      elements: { reference: a, floating: o } = {},
      transform: s = !0,
      whileElementsMounted: c,
      open: l,
    } = e,
    [u, d] = ry.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [f, p] = ry.useState(r);
  Zke(f, r) || p(r);
  let [m, h] = ry.useState(null),
    [g, _] = ry.useState(null),
    v = ry.useCallback((e) => {
      e !== S.current && ((S.current = e), h(e));
    }, []),
    y = ry.useCallback((e) => {
      e !== C.current && ((C.current = e), _(e));
    }, []),
    b = a || m,
    x = o || g,
    S = ry.useRef(null),
    C = ry.useRef(null),
    w = ry.useRef(u),
    T = c != null,
    E = eAe(c),
    D = eAe(i),
    O = eAe(l),
    k = ry.useCallback(() => {
      if (!S.current || !C.current) return;
      let e = { placement: t, strategy: n, middleware: f };
      (D.current && (e.platform = D.current),
        Yke(S.current, C.current, e).then((e) => {
          let t = { ...e, isPositioned: O.current !== !1 };
          A.current &&
            !Zke(w.current, t) &&
            ((w.current = t),
            rAe.flushSync(() => {
              d(t);
            }));
        }));
    }, [f, t, n, D, O]);
  iy(() => {
    l === !1 &&
      w.current.isPositioned &&
      ((w.current.isPositioned = !1), d((e) => ({ ...e, isPositioned: !1 })));
  }, [l]);
  let A = ry.useRef(!1);
  (iy(
    () => (
      (A.current = !0),
      () => {
        A.current = !1;
      }
    ),
    [],
  ),
    iy(() => {
      if ((b && (S.current = b), x && (C.current = x), b && x)) {
        if (E.current) return E.current(b, x, k);
        k();
      }
    }, [b, x, k, E, T]));
  let j = ry.useMemo(
      () => ({ reference: S, floating: C, setReference: v, setFloating: y }),
      [v, y],
    ),
    M = ry.useMemo(() => ({ reference: b, floating: x }), [b, x]),
    N = ry.useMemo(() => {
      let e = { position: n, left: 0, top: 0 };
      if (!M.floating) return e;
      let t = $ke(M.floating, u.x),
        r = $ke(M.floating, u.y);
      return s
        ? {
            ...e,
            transform: `translate(` + t + `px, ` + r + `px)`,
            ...(Qke(M.floating) >= 1.5 && { willChange: `transform` }),
          }
        : { position: n, left: t, top: r };
    }, [n, s, M.floating, u.x, u.y]);
  return ry.useMemo(
    () => ({ ...u, update: k, refs: j, elements: M, floatingStyles: N }),
    [u, k, j, M, N],
  );
}
var ry, nAe, rAe, iy, iAe, aAe, oAe, sAe, cAe, lAe, uAe, dAe;
function ay() {
  return (ay = t(() => {
    (Xke(),
      (ry = n(o(), 1)),
      (nAe = o()),
      (rAe = n(ph(), 1)),
      (iy = typeof document < `u` ? nAe.useLayoutEffect : function () {}),
      (iAe = (e) => {
        function t(e) {
          return {}.hasOwnProperty.call(e, `current`);
        }
        return {
          name: `arrow`,
          options: e,
          fn(n) {
            let { element: r, padding: i } = typeof e == `function` ? e(n) : e;
            return r && t(r)
              ? r.current == null
                ? {}
                : qke({ element: r.current, padding: i }).fn(n)
              : r
                ? qke({ element: r, padding: i }).fn(n)
                : {};
          },
        };
      }),
      (aAe = (e, t) => {
        let n = Hke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (oAe = (e, t) => {
        let n = Uke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (sAe = (e, t) => ({ fn: Jke(e).fn, options: [e, t] })),
      (cAe = (e, t) => {
        let n = Wke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (lAe = (e, t) => {
        let n = Gke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (uAe = (e, t) => {
        let n = Kke(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }),
      (dAe = (e, t) => {
        let n = iAe(e);
        return { name: n.name, fn: n.fn, options: [e, t] };
      }));
  }))();
}
var fAe, pAe, mAe, hAe, gAe, _Ae;
function vAe() {
  return (vAe = t(() => {
    ((fAe = n(o(), 1)),
      qg(),
      (pAe = K()),
      (mAe = Object.defineProperty),
      (hAe = (e, t) => mAe(e, `name`, { value: t, configurable: !0 })),
      (gAe = fAe.forwardRef(
        hAe(function (e, t) {
          let { children: n, width: r = 10, height: i = 5, ...a } = e;
          return (0, pAe.jsx)(Kg.svg, {
            ...a,
            ref: t,
            width: r,
            height: i,
            viewBox: `0 0 30 10`,
            preserveAspectRatio: `none`,
            children: e.asChild ? n : (0, pAe.jsx)(`polygon`, { points: `0,0 30,0 15,10` }),
          });
        }, `Arrow`),
      )),
      (_Ae = gAe));
  }))();
}
function yAe(e) {
  return e !== null;
}
function bAe(e) {
  let [t, n = `center`] = e.split(`-`);
  return [t, n];
}
var oy,
  sy,
  xAe,
  cy,
  SAe,
  CAe,
  ly,
  wAe,
  TAe,
  EAe,
  DAe,
  OAe,
  kAe,
  AAe,
  jAe,
  MAe,
  NAe,
  PAe,
  FAe,
  IAe,
  uy,
  dy,
  LAe,
  RAe;
function zAe() {
  return (zAe = t(() => {
    ((oy = n(o(), 1)),
      ay(),
      vAe(),
      Bg(),
      Zg(),
      qg(),
      k_(),
      d_(),
      $De(),
      (sy = K()),
      (xAe = Object.defineProperty),
      (cy = (e, t) => xAe(e, `name`, { value: t, configurable: !0 })),
      (SAe = `Popper`),
      ([CAe, ly] = Jg(SAe)),
      ([wAe, TAe] = CAe(SAe)),
      (EAe = cy((e) => {
        let { __scopePopper: t, children: n } = e,
          [r, i] = oy.useState(null),
          [a, o] = oy.useState(void 0);
        return (0, sy.jsx)(wAe, {
          scope: t,
          anchor: r,
          onAnchorChange: i,
          placementState: a,
          setPlacementState: o,
          children: n,
        });
      }, `Popper`)),
      (DAe = `PopperAnchor`),
      (OAe = oy.forwardRef(
        cy(function (e, t) {
          let { __scopePopper: n, virtualRef: r, ...i } = e,
            a = TAe(DAe, n),
            o = oy.useRef(null),
            s = a.onAnchorChange,
            c = zg(
              t,
              oy.useCallback(
                (e) => {
                  ((o.current = e), e && s(e));
                },
                [s],
              ),
            ),
            l = oy.useRef(null);
          oy.useEffect(() => {
            if (!r) return;
            let e = l.current;
            ((l.current = r.current), e !== l.current && s(l.current));
          });
          let u = a.placementState && bAe(a.placementState),
            d = u?.[0],
            f = u?.[1];
          return r
            ? null
            : (0, sy.jsx)(Kg.div, {
                "data-radix-popper-side": d,
                "data-radix-popper-align": f,
                ...i,
                ref: c,
              });
        }, `PopperAnchor`),
      )),
      (kAe = `PopperContent`),
      ([AAe, jAe] = CAe(kAe)),
      (MAe = oy.forwardRef(
        cy(function (e, t) {
          let {
              __scopePopper: n,
              side: r = `bottom`,
              sideOffset: i = 0,
              align: a = `center`,
              alignOffset: o = 0,
              arrowPadding: s = 0,
              avoidCollisions: c = !0,
              collisionBoundary: l = [],
              collisionPadding: u = 0,
              sticky: d = `partial`,
              hideWhenDetached: f = !1,
              updatePositionStrategy: p = `optimized`,
              onPlaced: m,
              ...h
            } = e,
            g = TAe(kAe, n),
            [_, v] = oy.useState(null),
            y = zg(t, v),
            [b, x] = oy.useState(null),
            S = YDe(b),
            C = S?.width ?? 0,
            w = S?.height ?? 0,
            T = r + (a === `center` ? `` : `-` + a),
            E = typeof u == `number` ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u },
            D = Array.isArray(l) ? l : [l],
            O = D.length > 0,
            k = { padding: E, boundary: D.filter(yAe), altBoundary: O },
            {
              refs: A,
              floatingStyles: j,
              placement: M,
              isPositioned: N,
              middlewareData: P,
            } = tAe({
              strategy: `fixed`,
              placement: T,
              whileElementsMounted: cy(
                (...e) => ny(...e, { animationFrame: p === `always` }),
                `whileElementsMounted`,
              ),
              elements: { reference: g.anchor },
              middleware: [
                aAe({ mainAxis: i + w, alignmentAxis: o }),
                c &&
                  oAe({
                    mainAxis: !0,
                    crossAxis: !1,
                    limiter: d === `partial` ? sAe() : void 0,
                    ...k,
                  }),
                c && cAe({ ...k }),
                lAe({
                  ...k,
                  apply: cy(({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
                    let { width: i, height: a } = t.reference,
                      o = e.floating.style;
                    (o.setProperty(`--radix-popper-available-width`, `${n}px`),
                      o.setProperty(`--radix-popper-available-height`, `${r}px`),
                      o.setProperty(`--radix-popper-anchor-width`, `${i}px`),
                      o.setProperty(`--radix-popper-anchor-height`, `${a}px`));
                  }, `apply`),
                }),
                b && dAe({ element: b, padding: s }),
                IAe({ arrowWidth: C, arrowHeight: w }),
                f && uAe({ strategy: `referenceHidden`, ...k, boundary: O ? k.boundary : void 0 }),
              ],
            }),
            F = g.setPlacementState;
          u_(
            () => (
              F(M),
              () => {
                F(void 0);
              }
            ),
            [M, F],
          );
          let [ee, te] = bAe(M),
            ne = D_(m);
          u_(() => {
            N && ne?.();
          }, [N, ne]);
          let re = P.arrow?.x,
            I = P.arrow?.y,
            L = P.arrow?.centerOffset !== 0,
            [R, ie] = oy.useState();
          return (
            u_(() => {
              _ && ie(window.getComputedStyle(_).zIndex);
            }, [_]),
            (0, sy.jsx)(`div`, {
              ref: A.setFloating,
              "data-radix-popper-content-wrapper": ``,
              style: {
                ...j,
                transform: N ? j.transform : `translate(0, -200%)`,
                minWidth: `max-content`,
                zIndex: R,
                "--radix-popper-transform-origin": [
                  P.transformOrigin?.x,
                  P.transformOrigin?.y,
                ].join(` `),
                ...(P.hide?.referenceHidden && { visibility: `hidden`, pointerEvents: `none` }),
              },
              dir: e.dir,
              children: (0, sy.jsx)(AAe, {
                scope: n,
                placedSide: ee,
                placedAlign: te,
                onArrowChange: x,
                arrowX: re,
                arrowY: I,
                shouldHideArrow: L,
                children: (0, sy.jsx)(Kg.div, {
                  "data-side": ee,
                  "data-align": te,
                  ...h,
                  ref: y,
                  style: { ...h.style, animation: N ? h.style?.animation : `none` },
                }),
              }),
            })
          );
        }, `PopperContent`),
      )),
      (NAe = `PopperArrow`),
      (PAe = { top: `bottom`, right: `left`, bottom: `top`, left: `right` }),
      (FAe = oy.forwardRef(
        cy(function (e, t) {
          let { __scopePopper: n, ...r } = e,
            i = jAe(NAe, n),
            a = PAe[i.placedSide];
          return (0, sy.jsx)(`span`, {
            ref: i.onArrowChange,
            style: {
              position: `absolute`,
              left: i.arrowX,
              top: i.arrowY,
              [a]: 0,
              transformOrigin: { top: ``, right: `0 0`, bottom: `center 0`, left: `100% 0` }[
                i.placedSide
              ],
              transform: {
                top: `translateY(100%)`,
                right: `translateY(50%) rotate(90deg) translateX(-50%)`,
                bottom: `rotate(180deg)`,
                left: `translateY(50%) rotate(-90deg) translateX(50%)`,
              }[i.placedSide],
              visibility: i.shouldHideArrow ? `hidden` : void 0,
            },
            children: (0, sy.jsx)(_Ae, { ...r, ref: t, style: { ...r.style, display: `block` } }),
          });
        }, `PopperArrow`),
      )),
      cy(yAe, `isNotNull`),
      (IAe = cy(
        (e) => ({
          name: `transformOrigin`,
          options: e,
          fn(t) {
            let { placement: n, rects: r, middlewareData: i } = t,
              a = i.arrow?.centerOffset !== 0,
              o = a ? 0 : e.arrowWidth,
              s = a ? 0 : e.arrowHeight,
              [c, l] = bAe(n),
              u = { start: `0%`, center: `50%`, end: `100%` }[l],
              d = (i.arrow?.x ?? 0) + o / 2,
              f = (i.arrow?.y ?? 0) + s / 2,
              p = ``,
              m = ``;
            return (
              c === `bottom`
                ? ((p = a ? u : `${d}px`), (m = `${-s}px`))
                : c === `top`
                  ? ((p = a ? u : `${d}px`), (m = `${r.floating.height + s}px`))
                  : c === `right`
                    ? ((p = `${-s}px`), (m = a ? u : `${f}px`))
                    : c === `left` && ((p = `${r.floating.width + s}px`), (m = a ? u : `${f}px`)),
              { data: { x: p, y: m } }
            );
          },
        }),
        `transformOrigin`,
      )),
      cy(bAe, `getSideAndAlignFromPlacement`),
      (uy = EAe),
      (dy = OAe),
      (LAe = MAe),
      (RAe = FAe));
  }))();
}
function BAe() {
  let [e, t] = WAe.useState(py);
  return (
    WAe.useEffect(() => {
      py || ((py = !0), t(!0));
    }, []),
    e
  );
}
function VAe() {
  return () => {};
}
function HAe() {
  return KAe(
    VAe,
    () => !0,
    () => !1,
  );
}
var UAe, WAe, GAe, fy, py, KAe, qAe;
function JAe() {
  return (JAe = t(() => {
    ((UAe = n(o(), 1)),
      (WAe = n(o(), 1)),
      (GAe = Object.defineProperty),
      (fy = (e, t) => GAe(e, `name`, { value: t, configurable: !0 })),
      (py = !1),
      fy(BAe, `useIsHydrated`),
      (KAe = UAe.useSyncExternalStore),
      fy(VAe, `subscribe`),
      fy(HAe, `useIsHydratedModern`),
      (qAe = typeof KAe == `function` ? HAe : BAe));
  }))();
}
function YAe(e, t) {
  return t === `rtl`
    ? e === `ArrowLeft`
      ? `ArrowRight`
      : e === `ArrowRight`
        ? `ArrowLeft`
        : e
    : e;
}
function XAe(e, t, n) {
  let r = YAe(e.key, n);
  if (
    !(t === `vertical` && [`ArrowLeft`, `ArrowRight`].includes(r)) &&
    !(t === `horizontal` && [`ArrowUp`, `ArrowDown`].includes(r))
  )
    return uje[r];
}
function ZAe(e, t = !1) {
  let n = document.activeElement;
  for (let r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function QAe(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var my, hy, $Ae, gy, _y, eje, vy, yy, tje, nje, rje, by, ije, aje, oje, sje, cje, lje, uje, xy, Sy;
function Cy() {
  return (Cy = t(() => {
    ((my = n(o(), 1)),
      l_(),
      o_(),
      Bg(),
      Zg(),
      w_(),
      qg(),
      k_(),
      __(),
      E_(),
      d_(),
      JAe(),
      (hy = K()),
      ($Ae = Object.defineProperty),
      (gy = (e, t) => $Ae(e, `name`, { value: t, configurable: !0 })),
      (_y = `rovingFocusGroup.onEntryFocus`),
      (eje = { bubbles: !1, cancelable: !0 }),
      (vy = `RovingFocusGroup`),
      ([yy, tje, nje] = Qg(vy)),
      ([rje, by] = Jg(vy, [nje])),
      ([ije, aje] = rje(vy)),
      (oje = my.forwardRef(
        gy(function (e, t) {
          return (0, hy.jsx)(yy.Provider, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, hy.jsx)(yy.Slot, {
              scope: e.__scopeRovingFocusGroup,
              children: (0, hy.jsx)(sje, { ...e, ref: t }),
            }),
          });
        }, `RovingFocusGroup`),
      )),
      (sje = my.forwardRef(
        gy(function (e, t) {
          let {
              __scopeRovingFocusGroup: n,
              orientation: r,
              loop: i = !1,
              dir: a,
              currentTabStopId: o,
              defaultCurrentTabStopId: s,
              onCurrentTabStopIdChange: c,
              onEntryFocus: l,
              preventScrollOnEntryFocus: u = !1,
              ...d
            } = e,
            f = my.useRef(null),
            p = zg(t, f),
            m = T_(a),
            [h, g] = p_({ prop: o, defaultProp: s ?? null, onChange: c, caller: vy }),
            [_, v] = my.useState(!1),
            y = D_(l),
            b = tje(n),
            x = my.useRef(!1),
            [S, C] = my.useState(0);
          return (
            my.useEffect(() => {
              let e = f.current;
              if (e) return (e.addEventListener(_y, y), () => e.removeEventListener(_y, y));
            }, [y]),
            (0, hy.jsx)(ije, {
              scope: n,
              orientation: r,
              dir: m,
              loop: i,
              currentTabStopId: h,
              onItemFocus: my.useCallback((e) => g(e), [g]),
              onItemShiftTab: my.useCallback(() => v(!0), []),
              onFocusableItemAdd: my.useCallback(() => C((e) => e + 1), []),
              onFocusableItemRemove: my.useCallback(() => C((e) => e - 1), []),
              children: (0, hy.jsx)(Kg.div, {
                tabIndex: _ || S === 0 ? -1 : 0,
                "data-orientation": r,
                ...d,
                ref: p,
                style: { outline: `none`, ...e.style },
                onMouseDown: s_(e.onMouseDown, () => {
                  x.current = !0;
                }),
                onFocus: s_(e.onFocus, (e) => {
                  let t = !x.current;
                  if (e.target === e.currentTarget && t && !_) {
                    let t = new CustomEvent(_y, eje);
                    if ((e.currentTarget.dispatchEvent(t), !t.defaultPrevented)) {
                      let e = b().filter((e) => e.focusable);
                      ZAe(
                        [e.find((e) => e.active), e.find((e) => e.id === h), ...e]
                          .filter(Boolean)
                          .map((e) => e.ref.current),
                        u,
                      );
                    }
                  }
                  x.current = !1;
                }),
                onBlur: s_(e.onBlur, () => v(!1)),
              }),
            })
          );
        }, `RovingFocusGroupImpl`),
      )),
      (cje = `RovingFocusGroupItem`),
      (lje = my.forwardRef(
        gy(function (e, t) {
          let {
              __scopeRovingFocusGroup: n,
              focusable: r = !0,
              active: i = !1,
              tabStopId: a,
              children: o,
              ...s
            } = e,
            c = C_(),
            l = a || c,
            u = aje(cje, n),
            d = u.currentTabStopId === l,
            f = tje(n),
            { onFocusableItemAdd: p, onFocusableItemRemove: m, currentTabStopId: h } = u,
            g = qAe();
          return (
            u_(() => {
              if (g && r) return (p(), () => m());
            }, [g, r, p, m]),
            my.useEffect(() => {
              if (!g && r) return (p(), () => m());
            }, [g, r, p, m]),
            (0, hy.jsx)(yy.ItemSlot, {
              scope: n,
              id: l,
              focusable: r,
              active: i,
              children: (0, hy.jsx)(Kg.span, {
                tabIndex: d ? 0 : -1,
                "data-orientation": u.orientation,
                ...s,
                ref: t,
                onMouseDown: s_(e.onMouseDown, (e) => {
                  r ? u.onItemFocus(l) : e.preventDefault();
                }),
                onFocus: s_(e.onFocus, () => u.onItemFocus(l)),
                onKeyDown: s_(e.onKeyDown, (e) => {
                  if (e.key === `Tab` && e.shiftKey) {
                    u.onItemShiftTab();
                    return;
                  }
                  if (e.target !== e.currentTarget) return;
                  let t = XAe(e, u.orientation, u.dir);
                  if (t !== void 0) {
                    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                    e.preventDefault();
                    let n = f()
                      .filter((e) => e.focusable)
                      .map((e) => e.ref.current);
                    if (t === `last`) n.reverse();
                    else if (t === `prev` || t === `next`) {
                      t === `prev` && n.reverse();
                      let r = n.indexOf(e.currentTarget);
                      n = u.loop ? QAe(n, r + 1) : n.slice(r + 1);
                    }
                    setTimeout(() => ZAe(n));
                  }
                }),
                children:
                  typeof o == `function` ? o({ isCurrentTabStop: d, hasTabStop: h != null }) : o,
              }),
            })
          );
        }, `RovingFocusGroupItem`),
      )),
      (uje = {
        ArrowLeft: `prev`,
        ArrowUp: `prev`,
        ArrowRight: `next`,
        ArrowDown: `next`,
        PageUp: `first`,
        Home: `first`,
        PageDown: `last`,
        End: `last`,
      }),
      gy(YAe, `getDirectionAwareKey`),
      gy(XAe, `getFocusIntent`),
      gy(ZAe, `focusFirst`),
      gy(QAe, `wrapArray`),
      (xy = oje),
      (Sy = lje));
  }))();
}
function dje(e) {
  return e ? `open` : `closed`;
}
function wy(e) {
  return e === `indeterminate`;
}
function Ty(e) {
  return wy(e) ? `indeterminate` : e ? `checked` : `unchecked`;
}
function fje(e) {
  let t = document.activeElement;
  for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function pje(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function mje(e, t, n) {
  let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1,
    a = pje(e, Math.max(i, 0));
  r.length === 1 && (a = a.filter((e) => e !== n));
  let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
  return o === n ? void 0 : o;
}
function hje(e, t) {
  let { x: n, y: r } = e,
    i = !1;
  for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
    let o = t[e],
      s = t[a],
      c = o.x,
      l = o.y,
      u = s.x,
      d = s.y;
    l > r != d > r && n < ((u - c) * (r - l)) / (d - l) + c && (i = !i);
  }
  return i;
}
function gje(e, t) {
  return t ? hje({ x: e.clientX, y: e.clientY }, t) : !1;
}
function Ey(e) {
  return (t) => (t.pointerType === `mouse` ? e(t) : void 0);
}
var Dy,
  Oy,
  _je,
  ky,
  Ay,
  vje,
  yje,
  bje,
  xje,
  Sje,
  jy,
  My,
  Cje,
  wje,
  Ny,
  Py,
  Fy,
  Tje,
  Eje,
  Iy,
  Dje,
  Ly,
  Oje,
  kje,
  Aje,
  jje,
  Mje,
  Nje,
  Ry,
  Pje,
  zy,
  Fje,
  Ije,
  Lje,
  Rje,
  By,
  zje,
  Bje,
  Vy,
  Vje,
  Hy,
  Hje,
  Uje,
  Wje,
  Gje,
  Kje,
  qje,
  Jje,
  Yje,
  Xje,
  Zje,
  Qje,
  $je,
  eMe,
  tMe,
  nMe,
  rMe,
  iMe,
  Uy,
  aMe,
  oMe,
  sMe,
  Wy,
  Gy,
  Ky,
  qy,
  cMe,
  lMe,
  Jy,
  Yy,
  uMe,
  dMe,
  fMe,
  Xy,
  pMe,
  Zy,
  Qy,
  $y;
function eb() {
  return (eb = t(() => {
    ((Dy = n(o(), 1)),
      l_(),
      o_(),
      Bg(),
      Zg(),
      E_(),
      P_(),
      X_(),
      U_(),
      w_(),
      zAe(),
      G_(),
      S_(),
      qg(),
      Cy(),
      Gg(),
      k_(),
      vv(),
      vDe(),
      (Oy = K()),
      (_je = Object.defineProperty),
      (ky = (e, t) => _je(e, `name`, { value: t, configurable: !0 })),
      (Ay = [`Enter`, ` `]),
      (vje = [`ArrowDown`, `PageUp`, `Home`]),
      (yje = [`ArrowUp`, `PageDown`, `End`]),
      (bje = [...vje, ...yje]),
      (xje = { ltr: [...Ay, `ArrowRight`], rtl: [...Ay, `ArrowLeft`] }),
      (Sje = { ltr: [`ArrowLeft`], rtl: [`ArrowRight`] }),
      (jy = `Menu`),
      ([My, Cje, wje] = Qg(jy)),
      ([Ny, Py] = Jg(jy, [wje, ly, by])),
      (Fy = ly()),
      (Tje = by()),
      ([Eje, Iy] = Ny(jy)),
      ([Dje, Ly] = Ny(jy)),
      (Oje = ky((e) => {
        let {
            __scopeMenu: t,
            open: n = !1,
            children: r,
            dir: i,
            onOpenChange: a,
            modal: o = !0,
          } = e,
          s = Fy(t),
          [c, l] = Dy.useState(null),
          u = Dy.useRef(!1),
          d = D_(a),
          f = T_(i);
        return (
          Dy.useEffect(() => {
            let e = ky(() => {
                ((u.current = !0),
                  document.addEventListener(`pointerdown`, t, { capture: !0, once: !0 }),
                  document.addEventListener(`pointermove`, t, { capture: !0, once: !0 }));
              }, `handleKeyDown`),
              t = ky(() => (u.current = !1), `handlePointer`);
            return (
              document.addEventListener(`keydown`, e, { capture: !0 }),
              () => {
                (document.removeEventListener(`keydown`, e, { capture: !0 }),
                  document.removeEventListener(`pointerdown`, t, { capture: !0 }),
                  document.removeEventListener(`pointermove`, t, { capture: !0 }));
              }
            );
          }, []),
          Dy.useEffect(() => {
            if (!n) return;
            let e = ky(() => d(!1), `handleBlur`);
            return (
              window.addEventListener(`blur`, e),
              () => window.removeEventListener(`blur`, e)
            );
          }, [n, d]),
          (0, Oy.jsx)(uy, {
            ...s,
            children: (0, Oy.jsx)(Eje, {
              scope: t,
              open: n,
              onOpenChange: d,
              content: c,
              onContentChange: l,
              children: (0, Oy.jsx)(Dje, {
                scope: t,
                onClose: Dy.useCallback(() => d(!1), [d]),
                isUsingKeyboardRef: u,
                dir: f,
                modal: o,
                children: r,
              }),
            }),
          })
        );
      }, `Menu`)),
      (kje = Dy.forwardRef(
        ky(function (e, t) {
          let { __scopeMenu: n, ...r } = e,
            i = Fy(n);
          return (0, Oy.jsx)(dy, { ...i, ...r, ref: t });
        }, `MenuAnchor`),
      )),
      (Aje = `MenuPortal`),
      ([jje, Mje] = Ny(Aje, { forceMount: void 0 })),
      (Nje = ky((e) => {
        let { __scopeMenu: t, forceMount: n, children: r, container: i } = e,
          a = Iy(Aje, t);
        return (0, Oy.jsx)(jje, {
          scope: t,
          forceMount: n,
          children: (0, Oy.jsx)(x_, {
            present: n || a.open,
            children: (0, Oy.jsx)(W_, { asChild: !0, container: i, children: r }),
          }),
        });
      }, `MenuPortal`)),
      (Ry = `MenuContent`),
      ([Pje, zy] = Ny(Ry)),
      (Fje = Dy.forwardRef(
        ky(function (e, t) {
          let n = Mje(Ry, e.__scopeMenu),
            { forceMount: r = n.forceMount, ...i } = e,
            a = Iy(Ry, e.__scopeMenu),
            o = Ly(Ry, e.__scopeMenu);
          return (0, Oy.jsx)(My.Provider, {
            scope: e.__scopeMenu,
            children: (0, Oy.jsx)(x_, {
              present: r || a.open,
              children: (0, Oy.jsx)(My.Slot, {
                scope: e.__scopeMenu,
                children: o.modal
                  ? (0, Oy.jsx)(Ije, { ...i, ref: t })
                  : (0, Oy.jsx)(Lje, { ...i, ref: t }),
              }),
            }),
          });
        }, `MenuContent`),
      )),
      (Ije = Dy.forwardRef(
        ky(function (e, t) {
          let n = Iy(Ry, e.__scopeMenu),
            r = Dy.useRef(null),
            i = zg(t, r);
          return (
            Dy.useEffect(() => {
              let e = r.current;
              if (e) return wDe(e);
            }, []),
            (0, Oy.jsx)(By, {
              ...e,
              ref: i,
              trapFocus: n.open,
              disableOutsidePointerEvents: n.open,
              disableOutsideScroll: !0,
              onFocusOutside: s_(e.onFocusOutside, (e) => e.preventDefault(), {
                checkForDefaultPrevented: !1,
              }),
              onDismiss: () => n.onOpenChange(!1),
            })
          );
        }, `MenuRootContentModal`),
      )),
      (Lje = Dy.forwardRef(
        ky(function (e, t) {
          let n = Iy(Ry, e.__scopeMenu);
          return (0, Oy.jsx)(By, {
            ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            onDismiss: () => n.onOpenChange(!1),
          });
        }, `MenuRootContentNonModal`),
      )),
      (Rje = Vg(`MenuContent.ScrollLock`)),
      (By = Dy.forwardRef(
        ky(function (e, t) {
          let {
              __scopeMenu: n,
              loop: r = !1,
              trapFocus: i,
              onOpenAutoFocus: a,
              onCloseAutoFocus: o,
              disableOutsidePointerEvents: s,
              onEntryFocus: c,
              onEscapeKeyDown: l,
              onPointerDownOutside: u,
              onFocusOutside: d,
              onInteractOutside: f,
              onDismiss: p,
              disableOutsideScroll: m,
              ...h
            } = e,
            g = Iy(Ry, n),
            _ = Ly(Ry, n),
            v = Fy(n),
            y = Tje(n),
            b = Cje(n),
            [x, S] = Dy.useState(null),
            C = Dy.useRef(null),
            w = zg(t, C, g.onContentChange),
            T = Dy.useRef(0),
            E = Dy.useRef(``),
            D = Dy.useRef(0),
            O = Dy.useRef(null),
            k = Dy.useRef(`right`),
            A = Dy.useRef(0),
            j = m ? mv : Dy.Fragment,
            M = m ? { as: Rje, allowPinchZoom: !0 } : void 0,
            N = ky((e) => {
              let t = E.current + e,
                n = b().filter((e) => !e.disabled),
                r = document.activeElement,
                i = n.find((e) => e.ref.current === r)?.textValue,
                a = mje(
                  n.map((e) => e.textValue),
                  t,
                  i,
                ),
                o = n.find((e) => e.textValue === a)?.ref.current;
              (ky(function e(t) {
                ((E.current = t),
                  window.clearTimeout(T.current),
                  t !== `` && (T.current = window.setTimeout(() => e(``), 1e3)));
              }, `updateSearch`)(t),
                o && setTimeout(() => o.focus()));
            }, `handleTypeaheadSearch`);
          (Dy.useEffect(() => () => window.clearTimeout(T.current), []), K_());
          let P = Dy.useCallback(
            (e) => k.current === O.current?.side && gje(e, O.current?.area),
            [],
          );
          return (0, Oy.jsx)(Pje, {
            scope: n,
            searchRef: E,
            onItemEnter: Dy.useCallback(
              (e) => {
                P(e) && e.preventDefault();
              },
              [P],
            ),
            onItemLeave: Dy.useCallback(
              (e) => {
                P(e) || (C.current?.focus(), S(null));
              },
              [P],
            ),
            onTriggerLeave: Dy.useCallback(
              (e) => {
                P(e) && e.preventDefault();
              },
              [P],
            ),
            pointerGraceTimerRef: D,
            onPointerGraceIntentChange: Dy.useCallback((e) => {
              O.current = e;
            }, []),
            children: (0, Oy.jsx)(j, {
              ...M,
              children: (0, Oy.jsx)(H_, {
                asChild: !0,
                trapped: i,
                onMountAutoFocus: s_(a, (e) => {
                  (e.preventDefault(), C.current?.focus({ preventScroll: !0 }));
                }),
                onUnmountAutoFocus: o,
                children: (0, Oy.jsx)(N_, {
                  asChild: !0,
                  disableOutsidePointerEvents: s,
                  onEscapeKeyDown: l,
                  onPointerDownOutside: u,
                  onFocusOutside: d,
                  onInteractOutside: f,
                  onDismiss: p,
                  children: (0, Oy.jsx)(xy, {
                    asChild: !0,
                    ...y,
                    dir: _.dir,
                    orientation: `vertical`,
                    loop: r,
                    currentTabStopId: x,
                    onCurrentTabStopIdChange: S,
                    onEntryFocus: s_(c, (e) => {
                      _.isUsingKeyboardRef.current || e.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: (0, Oy.jsx)(LAe, {
                      role: `menu`,
                      "aria-orientation": `vertical`,
                      "data-state": dje(g.open),
                      "data-radix-menu-content": ``,
                      dir: _.dir,
                      ...v,
                      ...h,
                      ref: w,
                      style: { outline: `none`, ...h.style },
                      onKeyDown: s_(h.onKeyDown, (e) => {
                        let t = e.target.closest(`[data-radix-menu-content]`) === e.currentTarget,
                          n = e.ctrlKey || e.altKey || e.metaKey,
                          r = e.key.length === 1;
                        t && (e.key === `Tab` && e.preventDefault(), !n && r && N(e.key));
                        let i = C.current;
                        if (e.target !== i || !bje.includes(e.key)) return;
                        e.preventDefault();
                        let a = b()
                          .filter((e) => !e.disabled)
                          .map((e) => e.ref.current);
                        (yje.includes(e.key) && a.reverse(), fje(a));
                      }),
                      onBlur: s_(e.onBlur, (e) => {
                        e.currentTarget.contains(e.target) ||
                          (window.clearTimeout(T.current), (E.current = ``));
                      }),
                      onPointerMove: s_(
                        e.onPointerMove,
                        Ey((e) => {
                          let t = e.target,
                            n = A.current !== e.clientX;
                          if (e.currentTarget.contains(t) && n) {
                            let t = e.clientX > A.current ? `right` : `left`;
                            ((k.current = t), (A.current = e.clientX));
                          }
                        }),
                      ),
                    }),
                  }),
                }),
              }),
            }),
          });
        }, `MenuContentImpl`),
      )),
      (zje = Dy.forwardRef(
        ky(function (e, t) {
          let { __scopeMenu: n, ...r } = e;
          return (0, Oy.jsx)(Kg.div, { role: `group`, ...r, ref: t });
        }, `MenuGroup`),
      )),
      (Bje = Dy.forwardRef(
        ky(function (e, t) {
          let { __scopeMenu: n, ...r } = e;
          return (0, Oy.jsx)(Kg.div, { ...r, ref: t });
        }, `MenuLabel`),
      )),
      (Vy = `MenuItem`),
      (Vje = `menu.itemSelect`),
      (Hy = Dy.forwardRef(
        ky(function (e, t) {
          let { disabled: n = !1, onSelect: r, ...i } = e,
            a = Dy.useRef(null),
            o = Ly(Vy, e.__scopeMenu),
            s = zy(Vy, e.__scopeMenu),
            c = zg(t, a),
            l = Dy.useRef(!1),
            u = ky(() => {
              let e = a.current;
              if (!n && e) {
                let t = new CustomEvent(Vje, { bubbles: !0, cancelable: !0 });
                (e.addEventListener(Vje, (e) => r?.(e), { once: !0 }),
                  rwe(e, t),
                  t.defaultPrevented ? (l.current = !1) : o.onClose());
              }
            }, `handleSelect`);
          return (0, Oy.jsx)(Hje, {
            ...i,
            ref: c,
            disabled: n,
            onClick: s_(e.onClick, u),
            onPointerDown: (t) => {
              (e.onPointerDown?.(t), (l.current = !0));
            },
            onPointerUp: s_(e.onPointerUp, (e) => {
              l.current || e.currentTarget?.click();
            }),
            onKeyDown: s_(e.onKeyDown, (e) => {
              n ||
                e.target !== e.currentTarget ||
                ((s.searchRef.current === `` || e.key !== ` `) &&
                  Ay.includes(e.key) &&
                  (e.currentTarget.click(), e.preventDefault()));
            }),
          });
        }, `MenuItem`),
      )),
      (Hje = Dy.forwardRef(
        ky(function (e, t) {
          let { __scopeMenu: n, disabled: r = !1, textValue: i, ...a } = e,
            o = zy(Vy, n),
            s = Tje(n),
            c = Dy.useRef(null),
            l = zg(t, c),
            [u, d] = Dy.useState(!1),
            [f, p] = Dy.useState(``);
          return (
            Dy.useEffect(() => {
              let e = c.current;
              e && p((e.textContent ?? ``).trim());
            }, [a.children]),
            (0, Oy.jsx)(My.ItemSlot, {
              scope: n,
              disabled: r,
              textValue: i ?? f,
              children: (0, Oy.jsx)(Sy, {
                asChild: !0,
                ...s,
                focusable: !r,
                children: (0, Oy.jsx)(Kg.div, {
                  role: `menuitem`,
                  "data-highlighted": u ? `` : void 0,
                  "aria-disabled": r || void 0,
                  "data-disabled": r ? `` : void 0,
                  ...a,
                  ref: l,
                  onPointerMove: s_(
                    e.onPointerMove,
                    Ey((e) => {
                      r
                        ? o.onItemLeave(e)
                        : (o.onItemEnter(e),
                          e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
                    }),
                  ),
                  onPointerLeave: s_(
                    e.onPointerLeave,
                    Ey((e) => o.onItemLeave(e)),
                  ),
                  onFocus: s_(e.onFocus, () => d(!0)),
                  onBlur: s_(e.onBlur, () => d(!1)),
                }),
              }),
            })
          );
        }, `MenuItemImpl`),
      )),
      (Uje = Dy.forwardRef(
        ky(function (e, t) {
          let { checked: n = !1, onCheckedChange: r, ...i } = e;
          return (0, Oy.jsx)(Xje, {
            scope: e.__scopeMenu,
            checked: n,
            children: (0, Oy.jsx)(Hy, {
              role: `menuitemcheckbox`,
              "aria-checked": wy(n) ? `mixed` : n,
              ...i,
              ref: t,
              "data-state": Ty(n),
              onSelect: s_(i.onSelect, () => r?.(wy(n) ? !0 : !n), {
                checkForDefaultPrevented: !1,
              }),
            }),
          });
        }, `MenuCheckboxItem`),
      )),
      ([Wje, Gje] = Ny(`MenuRadioGroup`, {
        value: void 0,
        onValueChange: ky(() => {}, `onValueChange`),
      })),
      (Kje = Dy.forwardRef(
        ky(function (e, t) {
          let { value: n, onValueChange: r, ...i } = e,
            a = D_(r);
          return (0, Oy.jsx)(Wje, {
            scope: e.__scopeMenu,
            value: n,
            onValueChange: a,
            children: (0, Oy.jsx)(zje, { ...i, ref: t }),
          });
        }, `MenuRadioGroup`),
      )),
      (qje = `MenuRadioItem`),
      (Jje = Dy.forwardRef(
        ky(function (e, t) {
          let { value: n, ...r } = e,
            i = Gje(qje, e.__scopeMenu),
            a = n === i.value;
          return (0, Oy.jsx)(Xje, {
            scope: e.__scopeMenu,
            checked: a,
            children: (0, Oy.jsx)(Hy, {
              role: `menuitemradio`,
              "aria-checked": a,
              ...r,
              ref: t,
              "data-state": Ty(a),
              onSelect: s_(r.onSelect, () => i.onValueChange?.(n), {
                checkForDefaultPrevented: !1,
              }),
            }),
          });
        }, `MenuRadioItem`),
      )),
      (Yje = `MenuItemIndicator`),
      ([Xje, Zje] = Ny(Yje, { checked: !1 })),
      (Qje = Dy.forwardRef(
        ky(function (e, t) {
          let { __scopeMenu: n, forceMount: r, ...i } = e,
            a = Zje(Yje, n);
          return (0, Oy.jsx)(x_, {
            present: r || wy(a.checked) || a.checked === !0,
            children: (0, Oy.jsx)(Kg.span, { ...i, ref: t, "data-state": Ty(a.checked) }),
          });
        }, `MenuItemIndicator`),
      )),
      ($je = Dy.forwardRef(
        ky(function (e, t) {
          let { __scopeMenu: n, ...r } = e;
          return (0, Oy.jsx)(Kg.div, {
            role: `separator`,
            "aria-orientation": `horizontal`,
            ...r,
            ref: t,
          });
        }, `MenuSeparator`),
      )),
      (eMe = Dy.forwardRef(
        ky(function (e, t) {
          let { __scopeMenu: n, ...r } = e,
            i = Fy(n);
          return (0, Oy.jsx)(RAe, { ...i, ...r, ref: t });
        }, `MenuArrow`),
      )),
      (tMe = `MenuSub`),
      ([nMe, rMe] = Ny(tMe)),
      (iMe = ky((e) => {
        let { __scopeMenu: t, children: n, open: r = !1, onOpenChange: i } = e,
          a = Iy(tMe, t),
          o = Fy(t),
          [s, c] = Dy.useState(null),
          [l, u] = Dy.useState(null),
          d = D_(i);
        return (
          Dy.useEffect(() => (a.open === !1 && d(!1), () => d(!1)), [a.open, d]),
          (0, Oy.jsx)(uy, {
            ...o,
            children: (0, Oy.jsx)(Eje, {
              scope: t,
              open: r,
              onOpenChange: d,
              content: l,
              onContentChange: u,
              children: (0, Oy.jsx)(nMe, {
                scope: t,
                contentId: C_(),
                triggerId: C_(),
                trigger: s,
                onTriggerChange: c,
                children: n,
              }),
            }),
          })
        );
      }, `MenuSub`)),
      (Uy = `MenuSubTrigger`),
      (aMe = Dy.forwardRef(
        ky(function (e, t) {
          let n = Iy(Uy, e.__scopeMenu),
            r = Ly(Uy, e.__scopeMenu),
            i = rMe(Uy, e.__scopeMenu),
            a = zy(Uy, e.__scopeMenu),
            o = Dy.useRef(null),
            { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = a,
            l = { __scopeMenu: e.__scopeMenu },
            u = Dy.useCallback(() => {
              (o.current && window.clearTimeout(o.current), (o.current = null));
            }, []);
          (Dy.useEffect(() => u, [u]),
            Dy.useEffect(() => {
              let e = s.current;
              return () => {
                (window.clearTimeout(e), c(null));
              };
            }, [s, c]));
          let d = zg(t, i.onTriggerChange);
          return (0, Oy.jsx)(kje, {
            asChild: !0,
            ...l,
            children: (0, Oy.jsx)(Hje, {
              id: i.triggerId,
              "aria-haspopup": `menu`,
              "aria-expanded": n.open,
              "aria-controls": n.open ? i.contentId : void 0,
              "data-state": dje(n.open),
              ...e,
              ref: d,
              onClick: (t) => {
                (e.onClick?.(t),
                  !(e.disabled || t.defaultPrevented) &&
                    (t.currentTarget.focus(), n.open || n.onOpenChange(!0)));
              },
              onPointerMove: s_(
                e.onPointerMove,
                Ey((t) => {
                  (a.onItemEnter(t),
                    !t.defaultPrevented &&
                      !e.disabled &&
                      !n.open &&
                      !o.current &&
                      (a.onPointerGraceIntentChange(null),
                      (o.current = window.setTimeout(() => {
                        (n.onOpenChange(!0), u());
                      }, 100))));
                }),
              ),
              onPointerLeave: s_(
                e.onPointerLeave,
                Ey((e) => {
                  u();
                  let t = n.content?.getBoundingClientRect();
                  if (t) {
                    let r = n.content?.dataset.side,
                      i = r === `right`,
                      o = i ? -5 : 5,
                      c = t[i ? `left` : `right`],
                      l = t[i ? `right` : `left`];
                    (a.onPointerGraceIntentChange({
                      area: [
                        { x: e.clientX + o, y: e.clientY },
                        { x: c, y: t.top },
                        { x: l, y: t.top },
                        { x: l, y: t.bottom },
                        { x: c, y: t.bottom },
                      ],
                      side: r,
                    }),
                      window.clearTimeout(s.current),
                      (s.current = window.setTimeout(
                        () => a.onPointerGraceIntentChange(null),
                        300,
                      )));
                  } else {
                    if ((a.onTriggerLeave(e), e.defaultPrevented)) return;
                    a.onPointerGraceIntentChange(null);
                  }
                }),
              ),
              onKeyDown: s_(e.onKeyDown, (t) => {
                e.disabled ||
                  t.target !== t.currentTarget ||
                  ((a.searchRef.current === `` || t.key !== ` `) &&
                    xje[r.dir].includes(t.key) &&
                    (n.onOpenChange(!0), n.content?.focus(), t.preventDefault()));
              }),
            }),
          });
        }, `MenuSubTrigger`),
      )),
      (oMe = `MenuSubContent`),
      (sMe = Dy.forwardRef(
        ky(function (e, t) {
          let n = Mje(Ry, e.__scopeMenu),
            { forceMount: r = n.forceMount, align: i = `start`, ...a } = e,
            o = Iy(Ry, e.__scopeMenu),
            s = Ly(Ry, e.__scopeMenu),
            c = rMe(oMe, e.__scopeMenu),
            l = Dy.useRef(null),
            u = zg(t, l);
          return (0, Oy.jsx)(My.Provider, {
            scope: e.__scopeMenu,
            children: (0, Oy.jsx)(x_, {
              present: r || o.open,
              children: (0, Oy.jsx)(My.Slot, {
                scope: e.__scopeMenu,
                children: (0, Oy.jsx)(By, {
                  id: c.contentId,
                  "aria-labelledby": c.triggerId,
                  ...a,
                  ref: u,
                  align: i,
                  side: s.dir === `rtl` ? `left` : `right`,
                  disableOutsidePointerEvents: !1,
                  disableOutsideScroll: !1,
                  trapFocus: !1,
                  onOpenAutoFocus: (e) => {
                    (s.isUsingKeyboardRef.current && l.current?.focus(), e.preventDefault());
                  },
                  onCloseAutoFocus: (e) => e.preventDefault(),
                  onFocusOutside: s_(e.onFocusOutside, (e) => {
                    e.target !== c.trigger && o.onOpenChange(!1);
                  }),
                  onEscapeKeyDown: s_(e.onEscapeKeyDown, (e) => {
                    (s.onClose(), e.preventDefault());
                  }),
                  onKeyDown: s_(e.onKeyDown, (e) => {
                    let t = e.currentTarget.contains(e.target),
                      n = Sje[s.dir].includes(e.key);
                    t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
                  }),
                }),
              }),
            }),
          });
        }, `MenuSubContent`),
      )),
      ky(dje, `getOpenState`),
      ky(wy, `isIndeterminate`),
      ky(Ty, `getCheckedState`),
      ky(fje, `focusFirst`),
      ky(pje, `wrapArray`),
      ky(mje, `getNextMatch`),
      ky(hje, `isPointInPolygon`),
      ky(gje, `isPointerInGraceArea`),
      ky(Ey, `whenMouse`),
      (Wy = Oje),
      (Gy = kje),
      (Ky = Nje),
      (qy = Fje),
      (cMe = zje),
      (lMe = Bje),
      (Jy = Hy),
      (Yy = Uje),
      (uMe = Kje),
      (dMe = Jje),
      (fMe = Qje),
      (Xy = $je),
      (pMe = eMe),
      (Zy = iMe),
      (Qy = aMe),
      ($y = sMe));
  }))();
}
function tb(e) {
  return (t) => (t.pointerType === `mouse` ? void 0 : e(t));
}
var nb,
  rb,
  mMe,
  ib,
  ab,
  hMe,
  gMe,
  ob,
  _Me,
  vMe,
  yMe,
  bMe,
  xMe,
  SMe,
  CMe,
  wMe,
  TMe,
  EMe,
  DMe,
  OMe,
  kMe,
  AMe,
  jMe,
  MMe,
  NMe,
  sb,
  PMe,
  FMe,
  IMe,
  LMe,
  RMe,
  zMe,
  BMe;
function VMe() {
  return (VMe = t(() => {
    ((nb = n(o(), 1)),
      l_(),
      Zg(),
      qg(),
      eb(),
      __(),
      (rb = K()),
      (mMe = Object.defineProperty),
      (ib = (e, t) => mMe(e, `name`, { value: t, configurable: !0 })),
      (ab = `ContextMenu`),
      ([hMe, gMe] = Jg(ab, [Py])),
      (ob = Py()),
      ([_Me, vMe] = hMe(ab)),
      (yMe = ib((e) => {
        let {
            __scopeContextMenu: t,
            children: n,
            onOpenChange: r,
            open: i,
            dir: a,
            modal: o = !0,
          } = e,
          s = nb.useRef(!1),
          [c, l] = p_({ prop: i, defaultProp: !1, onChange: r, caller: ab }),
          u = ob(t);
        return (0, rb.jsx)(_Me, {
          scope: t,
          open: c,
          onOpenChange: l,
          modal: o,
          hasInteractedRef: s,
          children: (0, rb.jsx)(Wy, {
            ...u,
            dir: a,
            open: c,
            onOpenChange: l,
            modal: o,
            children: n,
          }),
        });
      }, `ContextMenu`)),
      (bMe = `ContextMenuTrigger`),
      (xMe = nb.forwardRef(
        ib(function (e, t) {
          let { __scopeContextMenu: n, disabled: r = !1, ...i } = e,
            a = vMe(bMe, n),
            o = ob(n),
            [s, c] = nb.useState({ x: 0, y: 0 }),
            l = nb.useMemo(
              () => ({
                current: {
                  getBoundingClientRect: ib(
                    () => DOMRect.fromRect({ width: 0, height: 0, ...s }),
                    `getBoundingClientRect`,
                  ),
                },
              }),
              [s],
            ),
            u = nb.useRef(0),
            d = nb.useCallback(() => window.clearTimeout(u.current), []),
            f = ib((e) => {
              ((a.hasInteractedRef.current = !0),
                c({ x: e.clientX, y: e.clientY }),
                a.onOpenChange(!0));
            }, `handleOpen`);
          return (
            nb.useEffect(() => d, [d]),
            nb.useEffect(() => void (r && d()), [r, d]),
            (0, rb.jsxs)(rb.Fragment, {
              children: [
                (0, rb.jsx)(Gy, { ...o, virtualRef: l }),
                (0, rb.jsx)(Kg.span, {
                  "data-state": a.open ? `open` : `closed`,
                  "data-disabled": r ? `` : void 0,
                  ...i,
                  ref: t,
                  style: { WebkitTouchCallout: `none`, ...e.style },
                  onContextMenu: r
                    ? e.onContextMenu
                    : s_(e.onContextMenu, (e) => {
                        (d(), f(e), e.preventDefault());
                      }),
                  onPointerDown: r
                    ? e.onPointerDown
                    : s_(
                        e.onPointerDown,
                        tb((e) => {
                          (d(),
                            a.open && a.onOpenChange(!1),
                            (u.current = window.setTimeout(() => f(e), 700)));
                        }),
                      ),
                  onPointerMove: r ? e.onPointerMove : s_(e.onPointerMove, tb(d)),
                  onPointerCancel: r ? e.onPointerCancel : s_(e.onPointerCancel, tb(d)),
                  onPointerUp: r ? e.onPointerUp : s_(e.onPointerUp, tb(d)),
                }),
              ],
            })
          );
        }, `ContextMenuTrigger`),
      )),
      (SMe = ib((e) => {
        let { __scopeContextMenu: t, ...n } = e,
          r = ob(t);
        return (0, rb.jsx)(Ky, { ...r, ...n });
      }, `ContextMenuPortal`)),
      (CMe = `ContextMenuContent`),
      (wMe = nb.forwardRef(
        ib(function (e, t) {
          let { __scopeContextMenu: n, ...r } = e,
            i = vMe(CMe, n),
            a = ob(n),
            o = nb.useRef(!1);
          return (0, rb.jsx)(qy, {
            ...a,
            ...r,
            ref: t,
            side: `right`,
            sideOffset: 2,
            align: `start`,
            onCloseAutoFocus: (t) => {
              (e.onCloseAutoFocus?.(t),
                !t.defaultPrevented && o.current && t.preventDefault(),
                (o.current = !1));
            },
            onInteractOutside: (t) => {
              (e.onInteractOutside?.(t), !t.defaultPrevented && !i.modal && (o.current = !0));
            },
            style: {
              ...e.style,
              "--radix-context-menu-content-transform-origin": `var(--radix-popper-transform-origin)`,
              "--radix-context-menu-content-available-width": `var(--radix-popper-available-width)`,
              "--radix-context-menu-content-available-height": `var(--radix-popper-available-height)`,
              "--radix-context-menu-trigger-width": `var(--radix-popper-anchor-width)`,
              "--radix-context-menu-trigger-height": `var(--radix-popper-anchor-height)`,
            },
          });
        }, `ContextMenuContent`),
      )),
      (TMe = nb.forwardRef(
        ib(function (e, t) {
          let { __scopeContextMenu: n, ...r } = e,
            i = ob(n);
          return (0, rb.jsx)(Jy, { ...i, ...r, ref: t });
        }, `ContextMenuItem`),
      )),
      (EMe = nb.forwardRef(
        ib(function (e, t) {
          let { __scopeContextMenu: n, ...r } = e,
            i = ob(n);
          return (0, rb.jsx)(Yy, { ...i, ...r, ref: t });
        }, `ContextMenuCheckboxItem`),
      )),
      (DMe = nb.forwardRef(
        ib(function (e, t) {
          let { __scopeContextMenu: n, ...r } = e,
            i = ob(n);
          return (0, rb.jsx)(Xy, { ...i, ...r, ref: t });
        }, `ContextMenuSeparator`),
      )),
      (OMe = `ContextMenuSub`),
      (kMe = ib((e) => {
        let { __scopeContextMenu: t, children: n, onOpenChange: r, open: i, defaultOpen: a } = e,
          o = ob(t),
          [s, c] = p_({ prop: i, defaultProp: a ?? !1, onChange: r, caller: OMe });
        return (0, rb.jsx)(Zy, { ...o, open: s, onOpenChange: c, children: n });
      }, `ContextMenuSub`)),
      (AMe = nb.forwardRef(
        ib(function (e, t) {
          let { __scopeContextMenu: n, ...r } = e,
            i = ob(n);
          return (0, rb.jsx)(Qy, { ...i, ...r, ref: t });
        }, `ContextMenuSubTrigger`),
      )),
      (jMe = nb.forwardRef(
        ib(function (e, t) {
          let { __scopeContextMenu: n, ...r } = e,
            i = ob(n);
          return (0, rb.jsx)($y, {
            ...i,
            ...r,
            ref: t,
            style: {
              ...e.style,
              "--radix-context-menu-content-transform-origin": `var(--radix-popper-transform-origin)`,
              "--radix-context-menu-content-available-width": `var(--radix-popper-available-width)`,
              "--radix-context-menu-content-available-height": `var(--radix-popper-available-height)`,
              "--radix-context-menu-trigger-width": `var(--radix-popper-anchor-width)`,
              "--radix-context-menu-trigger-height": `var(--radix-popper-anchor-height)`,
            },
          });
        }, `ContextMenuSubContent`),
      )),
      ib(tb, `whenTouchOrPen`),
      (MMe = yMe),
      (NMe = xMe),
      (sb = SMe),
      (PMe = wMe),
      (FMe = TMe),
      (IMe = EMe),
      (LMe = DMe),
      (RMe = kMe),
      (zMe = AMe),
      (BMe = jMe));
  }))();
}
var HMe = r({
    Arrow: () => hNe,
    CheckboxItem: () => vb,
    Content: () => gb,
    DropdownMenu: () => JMe,
    DropdownMenuArrow: () => cNe,
    DropdownMenuCheckboxItem: () => rNe,
    DropdownMenuContent: () => $Me,
    DropdownMenuGroup: () => eNe,
    DropdownMenuItem: () => nNe,
    DropdownMenuItemIndicator: () => oNe,
    DropdownMenuLabel: () => tNe,
    DropdownMenuPortal: () => ZMe,
    DropdownMenuRadioGroup: () => iNe,
    DropdownMenuRadioItem: () => aNe,
    DropdownMenuSeparator: () => sNe,
    DropdownMenuSub: () => lNe,
    DropdownMenuSubContent: () => dNe,
    DropdownMenuSubTrigger: () => uNe,
    DropdownMenuTrigger: () => XMe,
    Group: () => fNe,
    Item: () => _b,
    ItemIndicator: () => xb,
    Label: () => pNe,
    Portal: () => hb,
    RadioGroup: () => yb,
    RadioItem: () => bb,
    Root: () => pb,
    Separator: () => mNe,
    Sub: () => gNe,
    SubContent: () => Cb,
    SubTrigger: () => Sb,
    Trigger: () => mb,
    createDropdownMenuScope: () => GMe,
  }),
  cb,
  lb,
  UMe,
  ub,
  db,
  WMe,
  GMe,
  fb,
  KMe,
  qMe,
  JMe,
  YMe,
  XMe,
  ZMe,
  QMe,
  $Me,
  eNe,
  tNe,
  nNe,
  rNe,
  iNe,
  aNe,
  oNe,
  sNe,
  cNe,
  lNe,
  uNe,
  dNe,
  pb,
  mb,
  hb,
  gb,
  fNe,
  pNe,
  _b,
  vb,
  yb,
  bb,
  xb,
  mNe,
  hNe,
  gNe,
  Sb,
  Cb;
function wb() {
  return (wb = t(() => {
    ((cb = n(o(), 1)),
      l_(),
      Bg(),
      Zg(),
      __(),
      qg(),
      eb(),
      w_(),
      (lb = K()),
      (UMe = Object.defineProperty),
      (ub = (e, t) => UMe(e, `name`, { value: t, configurable: !0 })),
      (db = `DropdownMenu`),
      ([WMe, GMe] = Jg(db, [Py])),
      (fb = Py()),
      ([KMe, qMe] = WMe(db)),
      (JMe = ub((e) => {
        let {
            __scopeDropdownMenu: t,
            children: n,
            dir: r,
            open: i,
            defaultOpen: a,
            onOpenChange: o,
            modal: s = !0,
          } = e,
          c = fb(t),
          l = cb.useRef(null),
          [u, d] = p_({ prop: i, defaultProp: a ?? !1, onChange: o, caller: db });
        return (0, lb.jsx)(KMe, {
          scope: t,
          triggerId: C_(),
          triggerRef: l,
          contentId: C_(),
          open: u,
          onOpenChange: d,
          onOpenToggle: cb.useCallback(() => d((e) => !e), [d]),
          modal: s,
          children: (0, lb.jsx)(Wy, {
            ...c,
            open: u,
            onOpenChange: d,
            dir: r,
            modal: s,
            children: n,
          }),
        });
      }, `DropdownMenu`)),
      (YMe = `DropdownMenuTrigger`),
      (XMe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e,
            a = qMe(YMe, n),
            o = fb(n),
            s = zg(t, a.triggerRef);
          return (0, lb.jsx)(Gy, {
            asChild: !0,
            ...o,
            children: (0, lb.jsx)(Kg.button, {
              type: `button`,
              id: a.triggerId,
              "aria-haspopup": `menu`,
              "aria-expanded": a.open,
              "aria-controls": a.open ? a.contentId : void 0,
              "data-state": a.open ? `open` : `closed`,
              "data-disabled": r ? `` : void 0,
              disabled: r,
              ...i,
              ref: s,
              onPointerDown: s_(e.onPointerDown, (e) => {
                !r &&
                  e.button === 0 &&
                  e.ctrlKey === !1 &&
                  (a.onOpenToggle(), a.open || e.preventDefault());
              }),
              onKeyDown: s_(e.onKeyDown, (e) => {
                r ||
                  ([`Enter`, ` `].includes(e.key) && a.onOpenToggle(),
                  e.key === `ArrowDown` && a.onOpenChange(!0),
                  [`Enter`, ` `, `ArrowDown`].includes(e.key) && e.preventDefault());
              }),
            }),
          });
        }, `DropdownMenuTrigger`),
      )),
      (ZMe = ub((e) => {
        let { __scopeDropdownMenu: t, ...n } = e,
          r = fb(t);
        return (0, lb.jsx)(Ky, { ...r, ...n });
      }, `DropdownMenuPortal`)),
      (QMe = `DropdownMenuContent`),
      ($Me = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = qMe(QMe, n),
            a = fb(n),
            o = cb.useRef(!1);
          return (0, lb.jsx)(qy, {
            id: i.contentId,
            "aria-labelledby": i.triggerId,
            ...a,
            ...r,
            ref: t,
            onCloseAutoFocus: s_(e.onCloseAutoFocus, (e) => {
              (o.current || i.triggerRef.current?.focus(), (o.current = !1), e.preventDefault());
            }),
            onInteractOutside: s_(e.onInteractOutside, (e) => {
              let t = e.detail.originalEvent,
                n = t.button === 0 && t.ctrlKey === !0,
                r = t.button === 2 || n;
              (!i.modal || r) && (o.current = !0);
            }),
            style: {
              ...e.style,
              "--radix-dropdown-menu-content-transform-origin": `var(--radix-popper-transform-origin)`,
              "--radix-dropdown-menu-content-available-width": `var(--radix-popper-available-width)`,
              "--radix-dropdown-menu-content-available-height": `var(--radix-popper-available-height)`,
              "--radix-dropdown-menu-trigger-width": `var(--radix-popper-anchor-width)`,
              "--radix-dropdown-menu-trigger-height": `var(--radix-popper-anchor-height)`,
            },
          });
        }, `DropdownMenuContent`),
      )),
      (eNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(cMe, { ...i, ...r, ref: t });
        }, `DropdownMenuGroup`),
      )),
      (tNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(lMe, { ...i, ...r, ref: t });
        }, `DropdownMenuLabel`),
      )),
      (nNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(Jy, { ...i, ...r, ref: t });
        }, `DropdownMenuItem`),
      )),
      (rNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(Yy, { ...i, ...r, ref: t });
        }, `DropdownMenuCheckboxItem`),
      )),
      (iNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(uMe, { ...i, ...r, ref: t });
        }, `DropdownMenuRadioGroup`),
      )),
      (aNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(dMe, { ...i, ...r, ref: t });
        }, `DropdownMenuRadioItem`),
      )),
      (oNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(fMe, { ...i, ...r, ref: t });
        }, `DropdownMenuItemIndicator`),
      )),
      (sNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(Xy, { ...i, ...r, ref: t });
        }, `DropdownMenuSeparator`),
      )),
      (cNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(pMe, { ...i, ...r, ref: t });
        }, `DropdownMenuArrow`),
      )),
      (lNe = ub((e) => {
        let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e,
          o = fb(t),
          [s, c] = p_({ prop: r, defaultProp: a ?? !1, onChange: i, caller: `DropdownMenuSub` });
        return (0, lb.jsx)(Zy, { ...o, open: s, onOpenChange: c, children: n });
      }, `DropdownMenuSub`)),
      (uNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)(Qy, { ...i, ...r, ref: t });
        }, `DropdownMenuSubTrigger`),
      )),
      (dNe = cb.forwardRef(
        ub(function (e, t) {
          let { __scopeDropdownMenu: n, ...r } = e,
            i = fb(n);
          return (0, lb.jsx)($y, {
            ...i,
            ...r,
            ref: t,
            style: {
              ...e.style,
              "--radix-dropdown-menu-content-transform-origin": `var(--radix-popper-transform-origin)`,
              "--radix-dropdown-menu-content-available-width": `var(--radix-popper-available-width)`,
              "--radix-dropdown-menu-content-available-height": `var(--radix-popper-available-height)`,
              "--radix-dropdown-menu-trigger-width": `var(--radix-popper-anchor-width)`,
              "--radix-dropdown-menu-trigger-height": `var(--radix-popper-anchor-height)`,
            },
          });
        }, `DropdownMenuSubContent`),
      )),
      (pb = JMe),
      (mb = XMe),
      (hb = ZMe),
      (gb = $Me),
      (fNe = eNe),
      (pNe = tNe),
      (_b = nNe),
      (vb = rNe),
      (yb = iNe),
      (bb = aNe),
      (xb = oNe),
      (mNe = sNe),
      (hNe = cNe),
      (gNe = lNe),
      (Sb = uNe),
      (Cb = dNe));
  }))();
}
 wb();JDe();
 return {Root:pb,Trigger:mb,Portal:hb,Content:gb,Group:fNe,Label:pNe,Item:_b,CheckboxItem:vb,RadioGroup:yb,RadioItem:bb,ItemIndicator:xb,Separator:mNe,Arrow:hNe,Sub:gNe,SubTrigger:Sb,SubContent:Cb,Dialog:EDe};
}
