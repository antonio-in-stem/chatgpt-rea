function XGr(e) {
  let t = (0, QGr.c)(4),
    n;
  t[0] === e ? (n = t[1]) : ((n = e === void 0 ? {} : e), (t[0] = e), (t[1] = n));
  let { enabled: r } = n,
    i = r === void 0 || r,
    { authMethod: a } = KGr(),
    o = (a === `chatgpt` || a === `chatgptAuthTokens`) && i,
    s;
  return (t[2] === o ? (s = t[3]) : ((s = { enabled: o }), (t[2] = o), (t[3] = s)), ZGr(s));
}
function ZGr(e) {
  let t = (0, QGr.c)(10),
    { enabled: n } = e,
    r = n === void 0 || n,
    i;
  t[0] === r ? (i = t[1]) : ((i = { enabled: r }), (t[0] = r), (t[1] = i));
  let a = lA($Gr, i),
    o,
    s;
  t[2] === a
    ? ((o = t[3]), (s = t[4]))
    : (({ refetch: s, ...o } = a), (t[2] = a), (t[3] = o), (t[4] = s));
  let c;
  t[5] === s
    ? (c = t[6])
    : ((c = async (e) => (await MAn(`account-info`), s(e))), (t[5] = s), (t[6] = c));
  let l;
  return (
    t[7] !== o || t[8] !== c
      ? ((l = { ...o, refetch: c }), (t[7] = o), (t[8] = c), (t[9] = l))
      : (l = t[9]),
    l
  );
}
var QGr, $Gr;
function eKr() {
  return (eKr = t(() => {
    ((QGr = c()),
      gA(),
      uW(),
      t6(),
      bF(),
      eK(),
      sq(),
      C2(),
      ($Gr = Qk(X, ({ get: e, scope: t }) => {
        let n = e(tq);
        return {
          queryKey: XG(`account-info`),
          staleTime: e6?.accessInputs == null ? 5e3 : 0,
          refetchOnMount: !0,
          queryFn: async ({ signal: e }) => {
            if (n === `error`) throw Error(`Account input subscription unavailable`);
            await $K(t, e);
            let r = e6?.accessInputs;
            return r == null
              ? $G(`account-info`, { signal: e, responsePriority: lW() ? `critical` : void 0 })
              : oq(await JL(r.readAccountInfo(), e));
          },
        };
      })));
