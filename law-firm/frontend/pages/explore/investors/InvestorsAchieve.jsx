import { useEffect, useRef, useState } from 'react'

// Investors: "What We Help You Achieve" as a calm three-column list, each outcome marked by a
// thin coral rule on its left. The items fade in one after another as the section arrives.
export default function InvestorsAchieve({ intro, items }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section iach" ref={ref} data-seen={seen}>
      <div className="container">
        <h2 className="iach-title" data-reveal>What We Help You Achieve</h2>
        <p className="iach-lead" data-reveal style={{ '--d': '0.1s' }}>{intro}</p>
        <ul className="iach-list">
          {items.map((it, i) => (
            <li key={it.text} style={{ '--i': i }}>{it.text}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
