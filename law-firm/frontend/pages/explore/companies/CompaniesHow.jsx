import { useEffect, useRef, useState } from 'react'

// Companies: "How we work with companies" over Pramika's curved facade photo, which fades into
// the page above and below. A fine ridge line draws across and lights a dot for each point.
function ridge() {
  let d = ''
  for (let x = 0; x <= 1000; x += 5) {
    const y = 20 + 4 * Math.sin(x * 0.021) + 2.6 * Math.sin(x * 0.083 + 1.3) + 1.6 * Math.sin(x * 0.31 + 0.4) + 0.9 * Math.sin(x * 0.77)
    d += `${x ? 'L' : 'M'}${x} ${y.toFixed(1)} `
  }
  return d
}
const RIDGE = ridge()

export default function CompaniesHow({ steps, title, eyebrow = '— Our process —', image = 'how-companies-facade.jpg', className = '' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.35 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className={`section chow ${className}`} ref={ref} data-seen={seen}>
      <div className="chow-bg" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}images/${image}`} alt="" />
      </div>
      <div className="container">
        {eyebrow && <p className="eyebrow" data-reveal>{eyebrow}</p>}
        <h2 className="h-display" data-reveal style={{ '--d': '0.1s' }}>{title || <>How we work with <span className="grad-text">companies</span></>}</h2>
        <div className="chow-row">
          <svg className="chow-line" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
            <path d={RIDGE} />
          </svg>
          <ol className="chow-items">
            {steps.map((s, i) => (
              <li key={s.title} style={{ '--i': i }}>
                <span className="chow-dot" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
