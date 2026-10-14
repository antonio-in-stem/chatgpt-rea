// Recovered ranking and grouping. Host labels and routes are explicit adapters.
import {shortcutMatchScore as It} from './ShortcutMatching.js';
export function createSettingsSearch({getSectionMessage:et,getBrowserSubpage:On,buildSettingsPath:K,creatorMicroMessage}){
if([et,On,K].some(fn=>typeof fn!=='function')||!creatorMicroMessage)throw new TypeError('Settings search requires section labels, browser routes, settings routes and device label');
const sr=new WeakMap(),Tt={creatorMicro:creatorMicroMessage};
// Original lodash sum call receives only nonnegative numeric scores.
const or={default:values=>values.reduce((sum,value)=>sum+value,0)};
function Qn({
  codexMicroDeviceModel: e,
  intl: t,
  query: n,
  showChatGptSettingsLabels: r = !1,
  showChatGptDataControlsLabel: i = !1,
  showEnterpriseUsageLabel: a = !1,
  targets: o,
  visibleSectionSlugs: s,
}) {
  if (n.trim().length === 0) return [];
  let c = n.trim().split(/\s+/).filter(Boolean),
    l = t
      .formatMessage(et(`local-environments`))
      .toLocaleLowerCase()
      .startsWith(n.trim().toLocaleLowerCase()),
    u = new Map();
  for (let [e, t] of s.entries()) u.has(t) || u.set(t, e);
  return o
    .flatMap((o) => {
      if (!u.has(o.sectionSlug)) return [];
      let s = er(ar(t, o, e, a, r || (o.sectionSlug === `data-controls` && i)), n, c);
      return s == null ? [] : [s];
    })
    .sort((e, t) => {
      if (l) {
        let n = $n(e.sectionSlug) - $n(t.sectionSlug);
        if (n !== 0) return n;
      }
      return e.matchPriority === t.matchPriority
        ? e.score === t.score
          ? (u.get(e.sectionSlug) ?? 0) - (u.get(t.sectionSlug) ?? 0)
          : t.score - e.score
        : e.matchPriority - t.matchPriority;
    })
    .map(({ label: e, messageId: t, panelLabel: n, sectionSlug: r }) => ({
      path: r === `browser-use` && t != null ? On(t) : void 0,
      label: e,
      panelLabel: n,
      sectionSlug: r,
    }));
}
function $n(e) {
  return e === `codex-cloud`
    ? 0
    : e === `local-environments` || e === `worktrees`
      ? 1
      : e === `cloud-environments`
        ? 2
        : 3;
}
function er(e, t, n) {
  let { messageTextGroups: r, panelLabel: i, sectionSlug: a, termTexts: o } = e,
    s = It(i, t);
  if (s > 0) return { label: i, matchPriority: 0, panelLabel: i, score: s, sectionSlug: a };
  let c = ir([i, ...o], n),
    l = c === 0 ? null : tr(o, t, n),
    u = n.map((e) => It(i, e) > 0),
    d = r.filter((e) => n.every((t, n) => u[n] || e.some((e) => rr(e.text, t) > 0))).flat(),
    f = Array.from(new Set(d.map((e) => e.text))),
    p = ir([i, ...f], n, rr),
    m = p === 0 ? null : tr(f, t, n, rr);
  if (c === 0 && p === 0) return null;
  let h = c === 0 || (p > 0 && m != null && (l == null || m.score > l.score));
  return {
    label: nr((h ? m : l)?.text, i),
    messageId: h && m != null ? d.find((e) => e.text === m.text)?.id : void 0,
    matchPriority: h ? 2 : 1,
    panelLabel: i,
    score: h ? p : c,
    sectionSlug: a,
  };
}
function tr(e, t, n, r = It) {
  let i = null;
  for (let a of e) {
    let e = Math.max(r(a, t), ...n.map((e) => r(a, e)));
    e > 0 && (i == null || e > i.score) && (i = { score: e, text: a });
  }
  return i;
}
function nr(e, t) {
  return e == null || /[<{]/u.test(e) ? t : e;
}
function rr(e, t) {
  return e.toLocaleLowerCase().includes(t.toLocaleLowerCase()) ? It(e, t) : 0;
}
function ir(e, t, n = It) {
  let r = t.map((t) => Math.max(0, ...e.map((e, r) => (r === 0 ? It(e, t) : n(e, t)))));
  return r.length === 0 || r.some((e) => e === 0) ? 0 : (0, or.default)(r);
}
function ar(e, t, n, r, i) {
  let a = sr.get(e);
  a ?? ((a = new WeakMap()), sr.set(e, a));
  let o = a.get(t);
  o ?? ((o = new Map()), a.set(t, o));
  let s = `${n ?? ``}:${r}:${i}`,
    c = o.get(s);
  if (c != null) return c;
  let l = new Map(
      t.messages.map((t) => {
        let n = e.messages[t.id];
        return [t.id, typeof n == `string` ? n : t.defaultMessage];
      }),
    ),
    u = et(t.sectionSlug, r, i),
    d = {
      messageTextGroups: Array.from(l, ([e, t]) => {
        let n = [{ id: e, text: t }],
          r = e.lastIndexOf(`.`);
        for (; r !== -1; ) {
          let t = e.slice(0, r),
            i = l.get(t);
          (i != null && n.push({ id: t, text: i }), (r = e.lastIndexOf(`.`, r - 1)));
        }
        return n;
      }),
      panelLabel:
        t.sectionSlug === `codex-micro` && n === `creator-micro-v2`
          ? e.formatMessage(Tt.creatorMicro)
          : e.formatMessage(u, u.values),
      sectionSlug: t.sectionSlug,
      termTexts: t.terms ?? [],
    };
  return (o.set(s, d), d);
}
function lr(e, t) {
  if (!t.some((t) => t.slug === e)) {
    if (e === `local-environments`)
      return { sectionSlug: `worktrees`, path: K(`worktrees`, `?tab=environments`) };
    if (e === `cloud-settings`)
      return {
        sectionSlug: `cloud-environments`,
        path: K(`cloud-environments`, `?tab=preferences`),
      };
  }
  return { sectionSlug: e, path: K(e) };
}
return {searchSettings:Qn,resolveSettingsDestination:lr};
}
