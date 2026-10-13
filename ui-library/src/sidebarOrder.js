// Source algorithms retained; domain-specific thread property names generalized to keys.
export function resolveDisplayedOrder({ keys: e, pending: t }) {
  return t == null || !sameOrder(t.previousKeys, e) || !sameKeys(t.nextKeys, e)
    ? e
    : t.nextKeys;
}
export function resolveDropTarget({ keys: e, activeKey: t, overKey: n, placement: r }) {
  if (t == null || n == null || t === n) return null;
  let i = e.filter((e) => e !== t),
    a = i.indexOf(n);
  if (a === -1) return null;
  let o = i[a + +(r === `after`)] ?? null;
  return e.includes(t) &&
    sameOrder(e, moveItemBefore({ keys: e, activeKey: t, beforeKey: o }))
    ? null
    : { beforeKey: o };
}
export function moveItemBefore({ keys: e, activeKey: t, beforeKey: n }) {
  let r = e.filter((e) => e !== t),
    i = n == null ? r.length : r.indexOf(n);
  return i === -1 ? e : [...r.slice(0, i), t, ...r.slice(i)];
}
export function moveSelectionBefore({ keys: e, selectedKeys: t, beforeKey: n }) {
  let r = e.filter((e) => t.has(e)),
    i = e.filter((e) => !t.has(e)),
    a = n == null ? i.length : i.indexOf(n);
  if (a === -1) return e;
  let o = [...i.slice(0, a), ...r, ...i.slice(a)];
  return sameOrder(o, e) ? e : o;
}
export function sameOrder(e, t) {
  return e.length === t.length && e.every((e, n) => e === t[n]);
}
export function sameKeys(e, t) {
  if (e.length !== t.length) return !1;
  let n = new Set(t);
  return e.every((e) => n.has(e));
}
export function dropPlacement({ activeRect: e, pointerY: t, targetRect: n }) {
  return (t ?? (e.top + e.bottom) / 2) < (n.top + n.bottom) / 2 ? `before` : `after`;
}
export function moveArrayItem(e, t, n) {
  let r = e.slice();
  return (r.splice(n < 0 ? r.length + n : n, 0, r.splice(t, 1)[0]), r);
}
