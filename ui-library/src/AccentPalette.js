// Distributed accent normalization, palette and theme resolution; bodies unchanged.
const e=fn=>fn;
let UUr,WUr,GUr,KUr;
function BUr(e) {
  let t = e?.trim();
  if (t == null || t.length === 0) return `black`;
  let n = t.toLowerCase();
  return n === `black`
    ? `black`
    : (WUr.find(
        (e) =>
          e === n ||
          Object.values(GUr[e]).some((e) => e.toLowerCase() === n) ||
          KUr[e].some((e) => e === n),
      ) ?? null);
}
function VUr(e) {
  return e === `black` ? null : GUr[e].light;
}
function HUr(e, t) {
  let n = BUr(e);
  return n == null ? (e?.trim() ?? null) : n === `black` ? null : GUr[n][t];
}
function $B() {
  return ($B = e(() => {
    ((UUr = {
      black: { swatchClassName: `bg-codex-icon`, accentClassName: `text-codex-icon` },
      blue: {
        swatchClassName: `bg-[#0285ff] dark:bg-[#339cff]`,
        accentClassName: `text-[#0285ff] dark:text-[#339cff]`,
      },
      green: {
        swatchClassName: `bg-[#04b84c] dark:bg-[#40c977]`,
        accentClassName: `text-[#04b84c] dark:text-[#40c977]`,
      },
      orange: {
        swatchClassName: `bg-[#fb6a22] dark:bg-[#ff8549]`,
        accentClassName: `text-[#fb6a22] dark:text-[#ff8549]`,
      },
      pink: {
        swatchClassName: `bg-[#ff66ad] dark:bg-[#ff8cc1]`,
        accentClassName: `text-[#ff66ad] dark:text-[#ff8cc1]`,
      },
      purple: {
        swatchClassName: `bg-[#924ff7] dark:bg-[#ad7bf9]`,
        accentClassName: `text-[#924ff7] dark:text-[#ad7bf9]`,
      },
      red: {
        swatchClassName: `bg-[#fa423e] dark:bg-[#ff6764]`,
        accentClassName: `text-[#fa423e] dark:text-[#ff6764]`,
      },
      yellow: {
        swatchClassName: `bg-[#ffc300] dark:bg-[#ffd240]`,
        accentClassName: `text-[#ffc300] dark:text-[#ffd240]`,
      },
    }),
      (WUr = [`orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`]),
      (GUr = {
        blue: { dark: `#339cff`, light: `#0285ff` },
        green: { dark: `#40c977`, light: `#04b84c` },
        orange: { dark: `#ff8549`, light: `#fb6a22` },
        pink: { dark: `#ff8cc1`, light: `#ff66ad` },
        purple: { dark: `#ad7bf9`, light: `#924ff7` },
        red: { dark: `#ff6764`, light: `#fa423e` },
        yellow: { dark: `#ffd240`, light: `#ffc300` },
      }),
      (KUr = {
        blue: [`#3a83f7`],
        green: [`#53b559`],
        orange: [`#ee7c37`],
        pink: [`#f6c8c6`],
        purple: [`#c9b1f6`],
        red: [],
        yellow: [`#f8d45d`],
      }));
  }))();
}
$B();
export {BUr as normalizeAccent,VUr as serializeAccent,HUr as resolveAccent,UUr as accentClasses,WUr as accentOrder,GUr as accentColors,KUr as legacyAccentColors};
