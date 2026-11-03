import { useEffect, useRef, useState } from 'react'

// Investors: "Our Expertise" drawn as a mapped mountain range, one area of work on each summit.
// Three designs, switched with the small buttons above the map (or ?map= in the address):
//   topo (default): see below.
//   heartbeat: an orange heartbeat line spikes up into peaks of different heights,
//     with faint contour outlines under each peak and a pulse travelling along the line.
//   profile: a smooth elevation profile of the range in soft misty layers, an orange ridge line
//     in front, an altitude grid behind and a marker on every summit.
//   topo: a top-down contour map; rings of contour lines around each summit and an orange
//     dotted trail that links the summits in order.
const AREAS = [
  'Deal structuring, term sheets, and negotiation',
  'Convertible instruments, SAFEs, venture debt, and equity rounds (from pre-Seed to Seed and Series A/B/C and beyond)',
  "Shareholders' agreements, governance frameworks, and investor rights",
  'Due diligence, risk assessment, and investment readiness reviews',
  'Follow-ons, secondaries, and recapitalisations',
  'Cross-border transactions and multi-jurisdictional coordination',
  'Exits, SPAs, and post-closing matters',
]
// how tall each peak is, as a share of the tallest
const HEIGHT = [0.5, 0.26, 0.74, 0.42, 0.82, 0.55, 1]
const MAPS = ['topo', 'heartbeat', 'profile']
const MAP_NAMES = { topo: 'Topo map', heartbeat: 'Heartbeat', profile: 'Profile' }

// ---------- shared helpers ----------
const fmt = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`
const poly = (pts) => 'M' + pts.map(fmt).join(' L')
// a smooth curve through points (Catmull-Rom turned into Bezier curves)
function smooth(pts, closed = false) {
  const P = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]]
  let d = `M${fmt(P[1])}`
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${fmt(c1)} ${fmt(c2)} ${fmt(p2)}`
  }
  return closed ? d + ' Z' : d
}

// Layouts are worked out in "along / out" terms, then laid flat (wide) or upright (phones).
const WIDE = { w: 1200, h: 470, base: 440, start: 100, gap: 166.6, max: 330 }
const TALL = { w: 390, h: 1150, base: 34, start: 70, gap: 166, max: 120 }
const place = (L, tall) => ([a, o]) => (tall ? [L.base + o, a] : [a, L.base - o])
const peaksOf = (L) => AREAS.map((_, k) => ({ at: L.start + k * L.gap, h: HEIGHT[k] * L.max }))

// ---------- design 1: heartbeat ----------
function heartbeat(L, tall) {
  const f = place(L, tall)
  const len = tall ? L.h : L.w
  const peaks = peaksOf(L)
  const pts = [[0, 0]]
  peaks.forEach(({ at, h }) => {
    pts.push([at - 52, 0], [at - 38, -7], [at - 28, 5], [at - 14, h * 0.5], [at - 8, h * 0.44], [at, h],
      [at + 8, h * 0.36], [at + 15, h * 0.42], [at + 26, -16], [at + 36, 5], [at + 48, 0])
  })
  pts.push([len, 0])
  const back = []
  peaks.forEach(({ at, h }) => {
    ;[0.78, 0.58, 0.4, 0.22].forEach((s) => {
      const w = Math.min(80, 36 + h * 0.3) * (1.15 - s * 0.6)
      const c = []
      for (let i = 0; i <= 24; i++) {
        const t = i / 24
        c.push(f([at - w + 2 * w * t, h * s * Math.pow(Math.sin(Math.PI * t), 1.6) * (1 + 0.05 * Math.sin(t * 17 + (at % 7)))]))
      }
      back.push(poly(c))
    })
  })
  return {
    back, line: poly(pts.map(f)), base: poly([f([0, 0]), f([len, 0])]),
    summits: peaks.map(({ at, h }) => ({ tip: f([at, h]), foot: f([at, 0]) })),
    label: tall ? 'right' : 'above',
  }
}

// ---------- design 2: elevation profile ----------
function profile(L, tall) {
  const f = place(L, tall)
  const len = tall ? L.h : L.w
  const peaks = peaksOf(L)
  const ridge = (scale, shift, dip, shoulders) => {
    const p = [[0, L.max * 0.1]]
    peaks.forEach(({ at, h }, k) => {
      p.push([at + shift - L.gap * 0.5, L.max * dip * (0.75 + 0.25 * Math.sin(k * 2.1))])
      if (shoulders) p.push([at + shift - 16, h * scale * 0.88], [at + shift, h * scale], [at + shift + 20, h * scale * 0.84])
      else p.push([at + shift, h * scale])
    })
    p.push([len, L.max * 0.08])
    return p
  }
  const front = ridge(1, 0, 0.16, true)
  const layers = [ridge(0.6, 75, 0.3), ridge(0.78, -60, 0.24)]
  const fill = (p) => `${smooth(p.map(f))} L${fmt(f([len, 0]))} L${fmt(f([0, 0]))} Z`
  const grid = [0.25, 0.5, 0.75, 1].map((s) => poly([f([0, L.max * s]), f([len, L.max * s])]))
  return {
    layers: layers.map(fill), frontFill: fill(front), line: smooth(front.map(f)), grid,
    base: poly([f([0, 0]), f([len, 0])]),
    summits: peaks.map(({ at, h }) => ({ tip: f([at, h]), foot: f([at, 0]) })),
    label: tall ? 'right' : 'above',
  }
}

// ---------- design 3: top-down contour map ----------
const TOPO_WIDE = { w: 1200, h: 560, at: [[120, 400], [300, 240], [470, 420], [640, 250], [815, 425], [985, 225], [1105, 420]] }
const TOPO_TALL = { w: 390, h: 1130, at: [[86, 90], [150, 245], [80, 400], [148, 560], [84, 720], [150, 875], [92, 1035]] }
function topo(tall) {
  const T = tall ? TOPO_TALL : TOPO_WIDE
  const step = tall ? 11 : 17
  const rings = []
  T.at.forEach(([cx, cy], k) => {
    const n = 2 + Math.round(HEIGHT[k] * 4)
    for (let j = 1; j <= n; j++) {
      const r = j * step
      const pts = []
      for (let i = 0; i < 40; i++) {
        const t = (i / 40) * Math.PI * 2
        const rr = r * (1 + 0.13 * Math.sin(3 * t + k * 1.7 + j * 0.3) + 0.07 * Math.sin(5 * t + k))
        pts.push([cx + rr * Math.cos(t), cy + rr * 0.78 * Math.sin(t)])
      }
      rings.push({ d: smooth(pts, true), index: j === n - 1 })
    }
  })
  // labels sit just outside each summit's outermost ring
  const reach = (k) => (2 + Math.round(HEIGHT[k] * 4)) * step * 1.15
  return {
    ...T, rings, trail: smooth(T.at), label: tall ? 'right' : 'above',
    summits: T.at.map((p, k) => ({ tip: p, anchor: tall ? [p[0] + reach(k) - 14, p[1]] : [p[0], p[1] - reach(k) * 0.78 + 8] })),
  }
}

export default function ExpertisePeaks() {
  const ref = useRef(null)
  const [tall, setTall] = useState(false)
  const [seen, setSeen] = useState(false)
  const [active, setActive] = useState(-1)
  const [map, setMap] = useState(() => {
    const q = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('map') : null
    return MAPS.includes(q) ? q : 'topo'
  })
  // switching design replays the drawing-in animation
  const choose = (m) => {
    if (m === map) return
    setActive(-1)
    setSeen(false)
    setMap(m)
    requestAnimationFrame(() => requestAnimationFrame(() => setSeen(true)))
  }

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const on = () => setTall(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const L = tall ? TALL : WIDE
  const D = map === 'topo' ? topo(tall) : map === 'profile' ? profile(L, tall) : heartbeat(L, tall)
  const W = D.w || L.w
  const H = D.h || L.h
  const len = tall ? H : W
  const t = (p) => (tall ? p[1] : p[0]) / len

  return (
    <section className="section ipk" id="expertise">
      <div className="container">
        <div className="ipk-head" data-reveal>
          <h2 className="ipk-title">Our Expertise</h2>
          <p className="ipk-lead">We are here to guide, structure, and enable what comes next, with advice grounded in experience across jurisdictions, markets, and stages of growth.</p>
        </div>

        <div className="ipk-switch" role="group" aria-label="Map design">
          {MAPS.map((m) => (
            <button key={m} type="button" aria-pressed={m === map} onClick={() => choose(m)}>{MAP_NAMES[m]}</button>
          ))}
        </div>

        <div className={`ipk-stage ipk-stage--${map} ${tall ? 'ipk-stage--tall' : ''}`} ref={ref} data-seen={seen} data-has-active={active >= 0}
          style={{ aspectRatio: `${W} / ${H}` }} onPointerLeave={(e) => { if (e.pointerType === 'mouse') setActive(-1) }}>
          <svg className="ipk-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            {map === 'heartbeat' && (
              <>
                <g className="ipk-contours">{D.back.map((d, i) => <path key={i} d={d} style={{ '--i': Math.floor(i / 4) }} />)}</g>
                <path className="ipk-base" d={D.base} />
              </>
            )}
            {map === 'profile' && (
              <>
                <g className="ipk-grid">{D.grid.map((d, i) => <path key={i} d={d} />)}</g>
                {D.layers.map((d, i) => <path key={i} className={`ipk-layer ipk-layer--${i}`} d={d} style={{ '--i': i }} />)}
                <path className="ipk-front" d={D.frontFill} />
                <path className="ipk-base" d={D.base} />
              </>
            )}
            {map === 'topo' && (
              <g className="ipk-rings">
                {D.rings.map((r, i) => <path key={i} d={r.d} data-index={r.index} style={{ '--i': i % 6 }} />)}
              </g>
            )}

            <path className={map === 'topo' ? 'ipk-trail' : 'ipk-line'} d={map === 'topo' ? D.trail : D.line} pathLength="1" />
            {map !== 'topo' && (
              <circle r="4.5" className="ipk-pulse">
                <animateMotion dur="7s" begin="3s" repeatCount="indefinite" path={D.line} />
              </circle>
            )}

            {D.summits.map(({ tip, foot }, i) => (
              <g key={i} className="ipk-peak" data-on={i === active} style={{ '--t': t(tip) }}>
                {foot && <line x1={foot[0]} y1={foot[1]} x2={tip[0]} y2={tip[1]} className="ipk-drop" />}
                <circle cx={tip[0]} cy={tip[1]} r="12" className="ipk-ring" />
                {map === 'topo'
                  ? <path className="ipk-dot" d={`M${tip[0]} ${tip[1] - 7} L${tip[0] + 6.5} ${tip[1] + 4.5} L${tip[0] - 6.5} ${tip[1] + 4.5} Z`} />
                  : <circle cx={tip[0]} cy={tip[1]} r="5" className="ipk-dot" />}
              </g>
            ))}
          </svg>

          {D.summits.map(({ tip, anchor = tip }, i) => (
            <button key={i} type="button" className="ipk-label" data-on={i === active}
              style={{ '--t': t(tip), left: `${(anchor[0] / W) * 100}%`, top: `${(anchor[1] / H) * 100}%` }}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i) }} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
              {AREAS[i]}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
