import { useEffect, useRef } from 'react'

// Shared hero for inner pages: full-height scene with a staggered title and parallax on scroll
export default function PageHero({ eyebrow, title, sub, children, scene }) {
  const sceneRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 1000)
        if (sceneRef.current) sceneRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.00018})`
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`
          contentRef.current.style.opacity = String(Math.max(0, 1 - y / 650))
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])

  return (
    <section className="page-hero">
      <div className="page-hero-scene" ref={sceneRef}>{scene}</div>
      <div className="container page-hero-content" ref={contentRef}>
        <p className="eyebrow hero-in" style={{ '--d': '0.2s' }}>— {eyebrow} —</p>
        <h1 className="page-title">
          {title.map((line, i) => (
            <span key={line} className="hero-line">
              <span style={{ '--d': `${0.35 + i * 0.15}s` }}>
                {i === title.length - 1 ? <span className="grad-text">{line}</span> : line}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-sub hero-in" style={{ '--d': '0.9s' }}>{sub}</p>
        <div className="hero-in" style={{ '--d': '1.05s' }}>{children}</div>
      </div>
    </section>
  )
}
