import { useState } from 'react'

// Founders: "Our Expertise" as a Venn diagram. Three overlapping circles (Build, Protect, Grow)
// and the eight areas sit in the region where they belong. Click a dot or use the arrows to
// read about an area; the circles it belongs to light up.
const CIRCLES = [
  { id: 'build', name: 'Build', cx: 215, cy: 230, lx: 215, ly: 38, anchor: 'middle' },
  { id: 'protect', name: 'Protect', cx: 385, cy: 230, lx: 385, ly: 38, anchor: 'middle' },
  { id: 'grow', name: 'Grow', cx: 300, cy: 375, lx: 300, ly: 582, anchor: 'middle' },
]
const R = 170

const AREAS = [
  { name: 'Idea', in: ['build'], x: 140, y: 200, text: 'Testing the concept, early structuring and the first legal steps' },
  { name: 'Company', in: ['build', 'protect'], x: 300, y: 158, text: "Company formation, founders' agreements, cap table planning" },
  { name: 'Contracts', in: ['protect'], x: 460, y: 200, text: 'Commercial agreements, terms and conditions, partnerships' },
  { name: 'Team', in: ['build', 'grow'], x: 200, y: 336, text: 'Hiring, employment contracts, ESOP and incentive plans' },
  { name: 'Exit', in: ['build', 'protect', 'grow'], x: 300, y: 276, text: 'M&A, secondary sales and getting ready for an exit' },
  { name: 'IP', in: ['protect', 'grow'], x: 400, y: 336, text: 'Trademarks, IP assignment and protecting your technology' },
  { name: 'Funding', in: ['grow'], x: 240, y: 460, text: 'Funding rounds, VC term sheets and investor documents' },
  { name: 'Expansion', in: ['grow'], x: 360, y: 460, text: 'Entering new markets and cross-border structuring' },
]

const where = (a) => a.in.map((id) => CIRCLES.find((c) => c.id === id).name).join(' + ')

export default function ExpertiseVenn() {
  const [active, setActive] = useState(1)
  const [list, setList] = useState(false)
  const area = AREAS[active]
  const step = (d) => setActive((i) => (i + d + AREAS.length) % AREAS.length)

  return (
    <section className="section expertise expertise--venn" id="expertise">
      <div className="container venn-wrap">
        <div className="venn-intro" data-reveal>
          <p className="eyebrow">— What we do —</p>
          <h2 className="h-display">Our <span className="grad-text">Expertise</span></h2>
          <p className="lead">
            Whether you are forming your first company, hiring talent, protecting IP, raising capital,
            acquiring a business, or building partnerships, we help build the legal foundations that
            support your strategy.
          </p>
        </div>

        <div className="venn-side">
          <div className="venn-detail" data-hidden={list} aria-live="polite">
            <p className="venn-count">{String(active + 1).padStart(2, '0')} / {String(AREAS.length).padStart(2, '0')}</p>
            <h3 key={area.name}>{area.name}</h3>
            <p className="venn-where">{where(area)}</p>
            <p className="venn-text">{area.text}</p>
          </div>
          <div className="venn-controls">
            {!list && (
              <>
                <button type="button" className="venn-arrow" onClick={() => step(-1)} aria-label="Previous area">←</button>
                <button type="button" className="venn-arrow" onClick={() => step(1)} aria-label="Next area">→</button>
              </>
            )}
            <button type="button" className="venn-toggle" onClick={() => setList((v) => !v)}>
              {list ? 'Show as diagram' : 'Show as a list'}
            </button>
          </div>
        </div>

        <div className="venn-stage" data-reveal>
          {list ? (
            <ul className="venn-list">
              {AREAS.map((a) => (
                <li key={a.name}>
                  <span className="venn-list-name">{a.name}</span>
                  <span className="venn-where">{where(a)}</span>
                  <span className="venn-list-text">{a.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <svg className="venn" viewBox="0 0 600 590" role="group" aria-label="Areas of expertise">
              {CIRCLES.map((c) => (
                <circle key={c.id} className={`venn-circle venn-circle--${c.id}`} data-on={area.in.includes(c.id)}
                  cx={c.cx} cy={c.cy} r={R} pathLength="1" />
              ))}
              {CIRCLES.map((c) => (
                <text key={c.id} className="venn-name" data-on={area.in.includes(c.id)} x={c.lx} y={c.ly} textAnchor={c.anchor}>{c.name}</text>
              ))}
              {AREAS.map((a, i) => (
                <g key={a.name} className="venn-dot" data-on={i === active} tabIndex={0} role="button"
                  aria-label={a.name} onClick={() => setActive(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i) } }}>
                  <circle className="venn-hit" cx={a.x} cy={a.y} r="26" />
                  <circle className="venn-ring" cx={a.x} cy={a.y} r="11" />
                  <circle className="venn-core" cx={a.x} cy={a.y} r="5" />
                  <text x={a.x} y={a.y + 30} textAnchor="middle">{a.name}</text>
                </g>
              ))}
            </svg>
          )}
          <p className="venn-caption">Areas of expertise</p>
        </div>
      </div>
    </section>
  )
}
