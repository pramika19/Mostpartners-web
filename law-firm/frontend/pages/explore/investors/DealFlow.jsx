import { useEffect, useRef, useState } from 'react'

// Investors: a value curve that draws itself as the section scrolls, lighting each deal stage
// in orange as the line reaches it and counting the deal's progress.
const STAGES = ['Sourcing', 'Diligence', 'Terms', 'Closing', 'Portfolio']
const PTS = [[40, 330], [120, 300], [170, 315], [240, 240], [290, 255], [360, 170], [410, 182], [480, 80]]
const NODES = [0, 1, 3, 5, 7]
const LINE = 'M' + PTS.map((p) => p.join(' ')).join(' L')

export default function DealFlow() {
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

  // where along the path each node sits, as a share of total length
  const seg = PTS.slice(1).map((pt, i) => Math.hypot(pt[0] - PTS[i][0], pt[1] - PTS[i][1]))
  const total = seg.reduce((a, b) => a + b, 0)
  const at = (k) => seg.slice(0, k).reduce((a, b) => a + b, 0) / total

  return (
    <div className="dealflow" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 520 380">
        <defs>
          <linearGradient id="flowStroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#24375f" />
            <stop offset="0.5" stopColor="#f7692a" />
            <stop offset="1" stopColor="#f3d2b4" />
          </linearGradient>
          <clipPath id="flowClip"><rect x="0" y="0" width={40 + 440 * p} height="380" /></clipPath>
        </defs>
        {[80, 160, 240, 320].map((y) => <line key={y} className="f-grid" x1="30" x2="500" y1={y} y2={y} />)}
        <path className="f-ghost" d={LINE} />
        <path className="f-area" d={`${LINE} L480 360 L40 360 Z`} clipPath="url(#flowClip)" />
        <path className="f-line" d={LINE} pathLength="1" stroke="url(#flowStroke)" style={{ strokeDashoffset: 1 - p }} />
        {NODES.map((k, i) => {
          const [x, y] = PTS[k]
          const on = p >= at(k) - 0.002
          return (
            <g key={k} className={`f-node ${on ? 'is-on' : ''}`}>
              <line x1={x} x2={x} y1={y + 8} y2="360" />
              <circle cx={x} cy={y} r="11" className="f-ring" />
              <circle cx={x} cy={y} r="4.5" className="f-dot" />
              <text x={x} y={y - 20} textAnchor="middle">{STAGES[i]}</text>
            </g>
          )
        })}
        <line className="f-axis" x1="30" x2="500" y1="360" y2="360" />
      </svg>
      <p className="construct-caption"><span>{Math.round(p * 100)}%</span> of the deal path covered</p>
    </div>
  )
}
