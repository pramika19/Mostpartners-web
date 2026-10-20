import { useEffect, useRef, useState } from 'react'
import OrangeArchitecture from './OrangeArchitecture.jsx'

// Founders: "What we help you achieve" as a horizontal timeline. An orange line runs left to
// right as you scroll, and each outcome rises in when the line reaches its dot.
export default function AchieveTimeline({ intro, items }) {
  const ref = useRef(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      setP(Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.75))))
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
    <section className="section achieve achieve--timeline">
      <OrangeArchitecture variant="colonnade" />
      <div className="container">
        <div className="section-head achieve-head">
          <p className="eyebrow" data-reveal>— Outcomes —</p>
          <h2 className="h-display" data-reveal style={{ '--d': '0.1s' }}>
            What we help you <span className="grad-text">achieve</span>
          </h2>
          <p className="lead" data-reveal style={{ '--d': '0.2s' }}>{intro}</p>
        </div>
        <div className="htl" ref={ref} style={{ '--p': p }}>
          <div className="htl-track" aria-hidden="true"><span className="htl-fill" /><span className="htl-head" /></div>
          <ol className="htl-items">
            {items.map((it, i) => (
              <li key={it.title} className={`htl-item ${i % 2 ? 'is-below' : 'is-above'} ${p >= (i + 0.5) / items.length ? 'is-on' : ''}`}>
                <span className="htl-dot" aria-hidden="true" />
                <div className="htl-card">
                  <span className="htl-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
