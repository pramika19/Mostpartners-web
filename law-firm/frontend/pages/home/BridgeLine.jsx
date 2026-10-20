import { useEffect, useRef } from 'react'

// Home: an orange line drawing of a suspension bridge (a nod to cross-border work) that draws
// itself left to right as it scrolls into view. Sits between Our Expertise and the Teams strip.
const W = 1440
const DECK = 232
const TOWERS = [430, 1010]
const TOP = 70

// y of the main cable at x: rises to each tower top and sags to just above the deck in between
function cableY(x) {
  const [a, b] = TOWERS
  if (x <= a) return TOP + (DECK - 18 - TOP) * ((a - x) / a) ** 2
  if (x >= b) return TOP + (DECK - 18 - TOP) * ((x - b) / (W - b)) ** 2
  const t = (x - a) / (b - a)
  return DECK - 14 - (DECK - 14 - TOP) * (1 - 4 * t * (1 - t))
}

const cable = Array.from({ length: 73 }, (_, i) => i * 20).map((x) => `${x} ${cableY(x).toFixed(1)}`).join(' L')
const hangers = Array.from({ length: 35 }, (_, i) => 20 + i * 40).filter((x) => !TOWERS.some((t) => Math.abs(t - x) < 20))

export default function BridgeLine() {
  const ref = useRef(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      el.style.setProperty('--draw', String(Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.7)))))
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="bridge" ref={ref} aria-hidden="true">
      <svg viewBox={`0 0 ${W} 320`} preserveAspectRatio="xMidYMid meet">
        <path className="bridge-line" pathLength="1" d={`M0 ${DECK} H${W} M0 ${DECK + 12} H${W}`} />
        <path className="bridge-line" pathLength="1" d={`M${cable}`} />
        {TOWERS.map((x) => (
          <path key={x} className="bridge-line" pathLength="1"
            d={`M${x - 16} 310 V${TOP} H${x + 16} V310 M${x - 16} 120 H${x + 16} M${x - 16} 175 H${x + 16} M${x - 22} 310 H${x + 22}`} />
        ))}
        {hangers.map((x) => (
          <line key={x} className="bridge-hanger" x1={x} x2={x} y1={cableY(x)} y2={DECK} style={{ '--t': x / W }} />
        ))}
        <path className="bridge-line bridge-water" pathLength="1" d={`M0 300 C 240 292, 480 308, 720 300 S 1200 292, ${W} 300`} />
        {TOWERS.map((x, i) => (
          <circle key={x} className="bridge-node" cx={x} cy={TOP} r="5" style={{ '--t': x / W, '--i': i }} />
        ))}
        <circle className="bridge-pulse" r="3.5">
          <animateMotion dur="9s" repeatCount="indefinite" path={`M0 ${DECK - 6} H${W}`} />
        </circle>
      </svg>
    </div>
  )
}
