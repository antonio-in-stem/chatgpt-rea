// Original content bounds lifecycle and ref merger. The host owns storage of bounds.
export function createContentBoundary({React,motion:Kl,useStore,reportBounds:rve,useStableCallback:Dd,compilerRuntime=React.__COMPILER_RUNTIME}){
for(const [name,value] of Object.entries({useStore,reportBounds:rve,useStableCallback:Dd}))if(typeof value!=='function')throw new TypeError(name+' adapter required');
if(!Kl?.div)throw new TypeError('motion.div required');
const sDi=compilerRuntime,pW=React,mW={jsx:(type,props)=>React.createElement(type,props)},q=Symbol('bounds-store'),Di=()=>useStore(),t=fn=>fn;let M5;
function pCi() {
  return (pCi = t(() => {
    M5 =
      (...e) =>
      (t) => {
        if (t == null) {
          e.forEach((e) => {
            if (typeof e == `function`) e(null);
            else if (e) {
              let t = e;
              t.current = null;
            }
          });
          return;
        }
        let n = [];
        if (
          (e.forEach((e) => {
            if (typeof e == `function`) {
              let r = e(t);
              typeof r == `function` ? n.push(r) : n.push(() => e(null));
            } else if (e) {
              let r = e;
              ((r.current = t),
                n.push(() => {
                  r.current = null;
                }));
            }
          }),
          n.length !== 0)
        )
          return () => {
            n.forEach((e) => e());
          };
      };
  }))();
}
pCi();const Fd=M5;
function iDi(e) {
  let t = (0, sDi.c)(12),
    n,
    r;
  t[0] === e
    ? ((n = t[1]), (r = t[2]))
    : (({ ref: r, ...n } = e), (t[0] = e), (t[1] = n), (t[2] = r));
  let i = Di(q),
    a = (0, pW.useId)(),
    o = (0, pW.useRef)(null),
    s;
  t[3] !== a || t[4] !== i
    ? ((s = (e) => {
        if ((o.current?.disconnect(), (o.current = null), e == null)) {
          rve(i, a, null);
          return;
        }
        let t = () => {
          let t = e.getBoundingClientRect();
          rve(i, a, {
            bottom: window.innerHeight - t.bottom,
            left: t.left,
            right: window.innerWidth - t.right,
            top: t.top,
          });
        };
        if (typeof ResizeObserver > `u`)
          return (
            t(),
            () => {
              rve(i, a, null);
            }
          );
        let n = new ResizeObserver(t);
        return (
          n.observe(e),
          n.observe(document.documentElement),
          (o.current = n),
          () => {
            (n.disconnect(), o.current === n && (o.current = null), rve(i, a, null));
          }
        );
      }),
      (t[3] = a),
      (t[4] = i),
      (t[5] = s))
    : (s = t[5]);
  let c = Dd(s),
    l;
  t[6] !== r || t[7] !== c ? ((l = Fd(r, c)), (t[6] = r), (t[7] = c), (t[8] = l)) : (l = t[8]);
  let u;
  return (
    t[9] !== n || t[10] !== l
      ? ((u = (0, mW.jsx)(Kl.div, { ref: l, ...n })), (t[9] = n), (t[10] = l), (t[11] = u))
      : (u = t[11]),
    u
  );
}
return iDi;
}
