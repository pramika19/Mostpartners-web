import { useEffect, useRef, useState } from 'react'

// A tower that builds itself floor by floor as the section scrolls past: finished floors in
// beige line, the floor under construction in orange, a crane lifting the next beam into place.
const FLOORS = 14
const GROUND = 600
const FLOOR_H = 30
const LEFT = 170
const RIGHT = 410
const COLS = [170, 230, 290, 350, 410]

export default function BuildingConstruct() {
  const ref = useRef(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const section = ref.current?.closest('section')
      if (!section) return
      const r = section.getBoundingClientRect()
      const vh = window.innerHeight
      setP(Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height - vh * 0.25))))
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

  const built = p * FLOORS                 // floors finished, fractional
  const current = Math.min(FLOORS - 1, Math.floor(built))
  const partial = built - Math.floor(built)
  const topY = GROUND - Math.min(built, FLOORS) * FLOOR_H
  const craneTop = Math.min(GROUND - FLOORS * FLOOR_H - 60, topY - 90)
  const trolleyX = LEFT + 30 + (RIGHT - LEFT - 60) * (0.5 + 0.5 * Math.sin(p * Math.PI * 6))
  const beamY = Math.max(craneTop + 40, topY - 40 - 50 * (1 - partial))
  const done = p >= 0.999

  return (
    <div className="construct" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 600 640">
        {/* blueprint of the finished tower */}
        <rect className="c-plan" x={LEFT} y={GROUND - FLOORS * FLOOR_H} width={RIGHT - LEFT} height={FLOORS * FLOOR_H} />
        {Array.from({ length: FLOORS }, (_, i) => (
          <line key={`p${i}`} className="c-plan" x1={LEFT} x2={RIGHT} y1={GROUND - i * FLOOR_H} y2={GROUND - i * FLOOR_H} />
        ))}
        <line className="c-ground" x1="40" x2="560" y1={GROUND} y2={GROUND} />

        {/* finished floors */}
        {Array.from({ length: Math.floor(built) }, (_, i) => {
          const y = GROUND - (i + 1) * FLOOR_H
          return (
            <g key={i} className="c-floor">
              <rect x={LEFT} y={y} width={RIGHT - LEFT} height={FLOOR_H} className="c-glass" style={{ '--i': i }} />
              <line x1={LEFT} x2={RIGHT} y1={y} y2={y} />
              {COLS.map((x) => <line key={x} x1={x} x2={x} y1={y} y2={y + FLOOR_H} />)}
            </g>
          )
        })}

        {/* the floor going up now */}
        {!done && (
          <g className="c-active">
            {COLS.map((x) => (
              <line key={x} x1={x} x2={x} y1={GROUND - current * FLOOR_H} y2={GROUND - current * FLOOR_H - FLOOR_H * partial} />
            ))}
            <line x1={LEFT} x2={LEFT + (RIGHT - LEFT) * partial} y1={GROUND - (current + 1) * FLOOR_H} y2={GROUND - (current + 1) * FLOOR_H} />
          </g>
        )}

        {/* crane */}
        <g className="c-crane">
          <line x1="470" x2="470" y1={GROUND} y2={craneTop} />
          <line x1="482" x2="482" y1={GROUND} y2={craneTop} />
          {Array.from({ length: Math.floor((GROUND - craneTop) / 24) }, (_, i) => (
            <line key={i} x1="470" x2="482" y1={GROUND - i * 24} y2={GROUND - (i + 1) * 24} />
          ))}
          <line x1={LEFT - 10} x2="540" y1={craneTop} y2={craneTop} />
          <line x1={LEFT - 10} x2="476" y1={craneTop} y2={craneTop - 28} />
          <line x1="540" x2="476" y1={craneTop} y2={craneTop - 28} />
          <rect x="515" y={craneTop} width="22" height="16" />
        </g>
        <circle className="c-beacon" cx={LEFT - 10} cy={craneTop} r="3.5" />
        {!done && (
          <g className="c-load">
            <line className="c-cable" x1={trolleyX} x2={trolleyX} y1={craneTop} y2={beamY} />
            <rect x={trolleyX - 40} y={beamY} width="80" height="6" rx="1" />
          </g>
        )}
        {done && <circle className="c-beacon" cx={(LEFT + RIGHT) / 2} cy={GROUND - FLOORS * FLOOR_H - 4} r="4" />}
      </svg>
      <p className="construct-caption">
        <span>{String(Math.min(FLOORS, Math.floor(built))).padStart(2, '0')}</span> / {FLOORS} floors in place
      </p>
    </div>
  )
}
