import { useEffect, useRef, useState } from 'react'
import ArchBackdrop from '../../components/shared/ArchBackdrop.jsx'

// "What we help you achieve" (Companies, Investors): a timeline line runs through the middle.
// As you scroll it draws once for the top row of outcomes, then again for the bottom row,
// and each card appears when the line reaches it.
export default function Achieve({ intro, items }) {
  const ref = useRef(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      setP(Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.8))))
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

  const half = Math.ceil(items.length / 2)
  const rows = [items.slice(0, half), items.slice(half)]
  const a = Math.min(1, p * 2)
  const b = Math.max(0, p * 2 - 1)

  return (
    <section className="section achieve">
      <ArchBackdrop variant="towers" speed={0.08} />
      <div className="container">
        <div className="section-head achieve-head">
          <p className="eyebrow" data-reveal>— Outcomes —</p>
          <h2 className="h-display" data-reveal style={{ '--d': '0.1s' }}>
            What we help you <span className="grad-text">achieve</span>
          </h2>
          <p className="lead" data-reveal style={{ '--d': '0.2s' }}>{intro}</p>
        </div>
        <div className="atl" ref={ref} style={{ '--a': a, '--b': b }}>
          {rows.map((row, r) => (
            <ul key={r} className={`atl-row atl-row--${r ? 'below' : 'above'}`}>
              {row.map((it, i) => (
                <li key={it.title} className={`achieve-card ${(r ? b : a) >= (i + 0.5) / row.length ? 'is-on' : ''}`}>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </li>
              ))}
            </ul>
          ))}
          <div className="atl-track" aria-hidden="true"><span className="atl-pass atl-pass--a" /><span className="atl-pass atl-pass--b" /></div>
        </div>
      </div>
    </section>
  )
}
