import { useEffect, useRef, useState } from 'react'

// Companies: "Our Expertise" as one main circle with the nine areas around it. An orange arrow runs
// from every area into the main circle; hovering (or tapping) an area lights its arrow and shows
// that area's words inside the main circle.
const AREAS = [
  { label: 'Equity and debt financing', text: 'Including pre-Seed, Seed, Series A/B/C and beyond, convertible instruments, SAFEs, and venture debt.' },
  { label: 'Commercial contracts', text: 'MSAs, licensing agreements, and strategic partnership arrangements.' },
  { label: 'Employment documentation', text: 'Contractor agreements, executive contracts, and ESOP design and implementation.' },
  { label: 'Product, platform, data, and privacy documentation' },
  { label: 'Group structuring', text: 'Reorganisations and adjusted set-ups for evolving business needs.' },
  { label: 'Corporate housekeeping and governance' },
  { label: 'International expansion and subsidiary setup' },
  { label: 'IP protection, licensing, and technology agreements' },
  { label: 'M&A, corporate transactions, and due diligence' },
]

// wide screens: the areas sit on an oval around the main circle
const WIDE = (() => {
  const w = 1100, h = 660, c = [550, 330], R = 135, r = 72
  const at = AREAS.map((_, k) => {
    const a = ((-70 + k * 40) * Math.PI) / 180
    return [c[0] + 430 * Math.cos(a), c[1] + 245 * Math.sin(a)]
  })
  return { w, h, c, R, r, at }
})()
// phones: a tall oval, with no area level with the main circle so every arrow has room
const TALL = (() => {
  const w = 390, h = 680, c = [195, 340], R = 84, r = 46
  const at = [-90, -50, -22, 22, 60, 120, 158, -158, -130].map((deg) => {
    const a = (deg * Math.PI) / 180
    return [c[0] + 140 * Math.cos(a), c[1] + 270 * Math.sin(a)]
  })
  return { w, h, c, R, r, at }
})()

function arrow(from, to, r, R) {
  const dx = to[0] - from[0], dy = to[1] - from[1], d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d
  const s = [from[0] + ux * (r + 6), from[1] + uy * (r + 6)], e = [to[0] - ux * (R + 12), to[1] - uy * (R + 12)]
  return `M${s[0].toFixed(1)} ${s[1].toFixed(1)} L${e[0].toFixed(1)} ${e[1].toFixed(1)}`
}

export default function ExpertiseHub() {
  const ref = useRef(null)
  const [tall, setTall] = useState(false)
  const [seen, setSeen] = useState(false)
  const [active, setActive] = useState(-1)
  const L = tall ? TALL : WIDE
  const pct = (v, of) => `${(v / of) * 100}%`

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

  const area = AREAS[active]

  return (
    <section className="section expertise expertise--circles" id="expertise">
      <div className="container">
        <div className="expertise-intro" data-reveal>
          <p className="eyebrow">— What we do —</p>
          <h2 className="h-display">Our <span className="grad-text">Expertise</span></h2>
          <p className="lead">Our work is designed to support opportunity, strengthen decisions, and enable sustainable success.</p>
        </div>

        <div className="xh" ref={ref} data-seen={seen} data-has-active={active >= 0} style={{ aspectRatio: `${L.w} / ${L.h}` }}
          onPointerLeave={(e) => { if (e.pointerType === 'mouse') setActive(-1) }}>
          <svg className="xh-arrows" viewBox={`0 0 ${L.w} ${L.h}`} aria-hidden="true">
            <defs>
              <marker id="xh-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 Z" />
              </marker>
            </defs>
            {L.at.map((p, i) => {
              const d = arrow(p, L.c, L.r, L.R)
              return (
                <g key={i} className="xh-arrow" data-on={i === active} style={{ '--i': i }}>
                  <path className="xh-arrow-line" d={d} pathLength="1" markerEnd="url(#xh-head)" />
                  <path className="xh-arrow-flow" d={d} />
                </g>
              )
            })}
          </svg>

          <div className="xh-main" style={{ left: pct(L.c[0], L.w), top: pct(L.c[1], L.h), width: pct(L.R * 2, L.w) }} aria-live="polite">
            <div className="xh-main-inner" key={active}>
              {area ? (
                <>
                  <span className="xh-main-title">{area.label}</span>
                  {area.text && <span className="xh-main-text">{area.text}</span>}
                </>
              ) : (
                <>
                  <span className="xh-main-eyebrow">Most Partners</span>
                  <span className="xh-main-title">Legal support for every part of your business</span>
                  <span className="xh-main-hint">{tall ? 'Tap an area' : 'Hover an area'}</span>
                </>
              )}
            </div>
          </div>

          {AREAS.map((a, i) => (
            <button key={a.label} type="button" className="xh-node" data-on={i === active} style={{
              '--i': i, left: pct(L.at[i][0], L.w), top: pct(L.at[i][1], L.h), width: pct(L.r * 2, L.w) }}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i) }} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
              <span className="xh-node-label">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
