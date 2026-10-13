// Exact timing calculation recovered from fRo/pRo/mRo.
const startDelay=0.35,loopPause=1.85,curveSteps=32,curve={x1:0.49,y1:0.6,x2:0.7,y2:1};
export function marqueeAnimation(e, t, n) {
  let r = e / t,
    i = startDelay,
    a = i + r + (n === `loop` ? loopPause : 0);
  return {
    "--marquee-duration": `${a.toFixed(3)}s`,
    "--marquee-scroll-distance": `${e}px`,
    "--marquee-scroll-timing": `linear(${[timingPoint(0, 0, a), ...sampleCurve(i, r, a), ...(n === `loop` ? [timingPoint(1, a, a)] : [])].join(`, `)})`,
  };
}
function sampleCurve(e, t, n) {
  return Array.from({ length: 33 }, (r, i) => {
    let a = i / curveSteps,
      o = 1 - a,
      s = 3 * o ** 2 * a,
      c = 3 * o * a ** 2,
      l = a ** 3;
    return timingPoint(s * curve.y1 + c * curve.y2 + l, e + t * (s * curve.x1 + c * curve.x2 + l), n);
  });
}
function timingPoint(e, t, n) {
  return `${e.toFixed(4)} ${((t / n) * 100).toFixed(4)}%`;
}
