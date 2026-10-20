import { useEffect, useRef } from 'react'

const FOOTER_IMAGE = '/images/footer-bg.jpg'

export default function GrowTogether({ image = FOOTER_IMAGE, variant, title, cta = 'Contact us' }) {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)

  // The mountains rise slowly as the section scrolls into view
  useEffect(() => {
    let frame = 0
    const update = () => {
      const section = sectionRef.current
      if (!section || !photoRef.current) return
      const rect = section.getBoundingClientRect()
      const p = Math.min(1, Math.max(-1, (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight))
      photoRef.current.style.transform = `translate3d(0, ${p * 90}px, 0) scale(${1.12 - Math.abs(p) * 0.04})`
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])

  return (
    <section className={`grow${variant ? ` grow--${variant}` : ''}`} id="contact" ref={sectionRef}>
      <div className="grow-fade">
        <img className="grow-photo" ref={photoRef} src={image} alt="" />
      </div>
      <div className="container grow-inner">
        <h2 className="h-display grow-title" data-reveal>
          {title || <>Want to <span className="grad-text">Grow Together?</span></>}
        </h2>
        <a href="mailto:bemost@mostpartners.com" className="btn btn-solid btn-lg" data-reveal style={{ '--d': '0.15s' }}>
          {cta} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
