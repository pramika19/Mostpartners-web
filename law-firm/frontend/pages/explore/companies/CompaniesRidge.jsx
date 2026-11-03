// Companies: a light grey mountain rises over the bottom of the hero photo and becomes the
// page below it. An orange line runs along its ridge, lighting a dot at each step up.
const W = 1600
const H = 500

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

function ridgeY(x) {
  // low on the left so the hero title has room, then a long climb to a high peak on the right
  const base = 398 + 14 * Math.sin(x / 130) - 300 * smooth(680, 1500, x) + 26 * smooth(1500, 1600, x)
    - 22 * Math.exp(-(((x - 1040) / 70) ** 2))
  return base + 6 * Math.sin(x * 0.031 + 1) + 3 * Math.sin(x * 0.11) + 1.4 * Math.sin(x * 0.47 + 2) + 0.8 * Math.sin(x * 1.3)
}
const PTS = Array.from({ length: W / 5 + 1 }, (_, k) => [k * 5, ridgeY(k * 5)])
const RIDGE = 'M' + PTS.map(([x, y]) => `${x} ${y.toFixed(1)}`).join(' L')
// the orange line runs a little way inside the mountain, below its edge
const DROP = 22
const LINE = 'M' + PTS.map(([x, y]) => `${x} ${(y + DROP).toFixed(1)}`).join(' L')
const DOTS = [250, 640, 1120, 1420].map((x) => [x, ridgeY(x) + DROP])

export default function CompaniesRidge() {
  return (
    <div className="c-ridge" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <path className="c-ridge-fill" d={`${RIDGE} L${W} ${H} L0 ${H} Z`} />
        <path className="c-ridge-line" d={LINE} pathLength="1" />
        {DOTS.map(([x, y], i) => (
          <g key={x} className="c-ridge-dot" style={{ '--i': i }}>
            <circle cx={x} cy={y} r="13" className="c-ridge-ring" />
            <circle cx={x} cy={y} r="6" />
          </g>
        ))}
      </svg>
    </div>
  )
}
