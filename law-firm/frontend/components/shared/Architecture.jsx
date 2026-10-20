// Fine line mountain drawings in the style of a survey map that sketch themselves in
// when scrolled into view. Every path uses pathLength=1 so CSS can animate the stroke.

const P = ({ d, i = 0, dashed }) => (
  <path d={d} pathLength="1" style={{ '--i': i }} className={dashed ? 'guide' : undefined} />
)

const wave = (x, seed) => 0.55 * Math.sin(x * 0.012 + seed) + 0.3 * Math.sin(x * 0.031 + seed * 2.1) + 0.15 * Math.sin(x * 0.07 + seed * 3.3)

function ring(cx, cy, r, seed, squash = 0.6) {
  let d = ''
  for (let k = 0; k <= 72; k++) {
    const t = (k / 72) * Math.PI * 2
    const w = 1 + 0.17 * Math.sin(3 * t + seed) + 0.08 * Math.sin(5 * t + seed * 1.9) + 0.04 * Math.sin(8 * t + seed)
    d += `${k ? 'L' : 'M'}${(cx + Math.cos(t) * r * w).toFixed(1)} ${(cy + Math.sin(t) * r * w * squash).toFixed(1)} `
  }
  return d + 'Z'
}

// A peak seen from above: nested contour rings with a summit marker
function Topo() {
  return (
    <svg viewBox="0 0 600 420">
      <P d="M20 400 H580 M20 400 V380 M140 400 V390 M260 400 V390 M380 400 V390 M500 400 V390" dashed />
      {Array.from({ length: 9 }, (_, n) => (
        <P key={n} d={ring(290, 200, 18 + n * 24 + n * n, 1.2 + n * 0.2)} i={n * 0.6} dashed={n % 4 !== 0} />
      ))}
      {Array.from({ length: 4 }, (_, n) => (
        <P key={`b${n}`} d={ring(470, 110, 10 + n * 16, 3.4 + n * 0.3)} i={3 + n * 0.6} dashed={n % 2 === 1} />
      ))}
      <P d="M284 194 L290 184 L296 194 Z" i={7} />
    </svg>
  )
}

// A mountain range in profile with stacked ridge lines, like a relief map's elevation view
function Range() {
  const lines = [0, 1, 2, 3]
  return (
    <svg viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice">
      {lines.map((n) => {
        const base = 210 + n * 52
        const amp = 150 - n * 28
        let d = ''
        for (let x = 0; x <= 1600; x += 10) {
          const y = base - amp * Math.abs(wave(x, n * 1.7 + 0.4))
          d += `${x ? 'L' : 'M'}${x} ${y.toFixed(1)} `
        }
        return <P key={n} d={d} i={n * 1.2} dashed={n === 0} />
      })}
      <P d="M0 410 H1600" i={5} />
    </svg>
  )
}

// A single summit profile with contour hatching and a route to the top
function Summit() {
  let profile = ''
  for (let x = 0; x <= 600; x += 6) {
    const peak = 300 - 230 * Math.exp(-((x - 330) ** 2) / 15000) - 70 * Math.exp(-((x - 140) ** 2) / 6000)
    profile += `${x ? 'L' : 'M'}${x} ${(peak + 8 * wave(x * 3, 2)).toFixed(1)} `
  }
  const hatches = [110, 150, 190, 230, 270].map((y, n) => {
    const half = (y - 70) * 0.9
    return <P key={y} d={`M${330 - half} ${y} Q330 ${y - 14} ${330 + half} ${y}`} i={2 + n * 0.5} dashed />
  })
  return (
    <svg viewBox="0 0 600 420">
      <P d={profile} i={0} />
      {hatches}
      <P d="M60 380 C160 360 220 330 260 290 C290 260 300 220 320 170 C326 140 330 110 330 78" i={5} dashed />
      <P d="M20 390 H580" i={1} dashed />
    </svg>
  )
}

const VARIANTS = { courthouse: Topo, skyline: Range, framework: Summit }

export default function Architecture({ variant, className = '' }) {
  const Drawing = VARIANTS[variant]
  return (
    <div className={`arch arch--${variant} ${className}`} data-reveal aria-hidden="true">
      <Drawing />
    </div>
  )
}
