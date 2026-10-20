import { useRef } from 'react'
import useParallax from '../../hooks/useParallax.js'

// Quiet backdrops of natural terrain: topographic contour lines like a mountain survey map,
// over faint layered ridges that fade into the section. They drift on scroll.

const rand = (n) => {
  const s = Math.sin(n * 12.9898) * 43758.5453
  return s - Math.floor(s)
}

// One closed, irregular contour ring around a peak
function contour(cx, cy, r, seed, squash = 0.62) {
  const pts = []
  const steps = 90
  for (let k = 0; k <= steps; k++) {
    const t = (k / steps) * Math.PI * 2
    const wobble = 1 + 0.16 * Math.sin(3 * t + seed) + 0.09 * Math.sin(5 * t + seed * 1.7) + 0.05 * Math.sin(9 * t + seed * 2.3)
    pts.push([cx + Math.cos(t) * r * wobble, cy + Math.sin(t) * r * wobble * squash])
  }
  return 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L') + ' Z'
}

function ridge(seed, base, amp, w = 1440, h = 900) {
  let d = `M0 ${h}`
  for (let x = 0; x <= w; x += 8) {
    const y = base - amp * (0.55 * Math.sin(x * 0.0035 + seed) + 0.3 * Math.sin(x * 0.009 + seed * 2.1) + 0.15 * Math.sin(x * 0.023 + seed * 3.7)) + 4 * (rand(x + seed * 100) - 0.5)
    d += ` L${x} ${y.toFixed(1)}`
  }
  return d + ` L${w} ${h} Z`
}

const LAYOUTS = {
  atrium: { peaks: [[1080, 300, 11, 1.3], [300, 620, 7, 4.1]] },
  arches: { peaks: [[260, 280, 10, 2.2], [1220, 640, 8, 5.6]] },
  towers: { peaks: [[760, 360, 12, 0.7]] },
}

export default function ArchBackdrop({ variant = 'atrium', speed = 0.12 }) {
  const ref = useRef(null)
  useParallax(ref, speed)
  const { peaks } = LAYOUTS[variant] || LAYOUTS.atrium
  return (
    <div className={`backdrop backdrop--${variant}`} aria-hidden="true">
      <div className="backdrop-inner" ref={ref}>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`ridgeFade-${variant}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a3448" stopOpacity="0.45" />
              <stop offset="1" stopColor="#121826" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={ridge(variant.length * 1.3, 700, 120)} fill={`url(#ridgeFade-${variant})`} />
          <path d={ridge(variant.length * 2.7, 790, 80)} fill={`url(#ridgeFade-${variant})`} />
          <g className="topo">
            {peaks.map(([cx, cy, rings, seed], p) =>
              Array.from({ length: rings }, (_, n) => (
                <path
                  key={`${p}-${n}`}
                  d={contour(cx, cy, 26 + n * 34 + n * n * 1.6, seed + n * 0.18)}
                  className={n % 5 === 4 ? 'topo-index' : undefined}
                />
              ))
            )}
          </g>
        </svg>
      </div>
    </div>
  )
}
