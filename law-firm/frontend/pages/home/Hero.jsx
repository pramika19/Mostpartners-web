import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CountUp from './CountUp.jsx'

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/hero-bg.jpg`
const IMG_W = 1742
const IMG_H = 903

// Where the four orange dots sit in the photo, as fractions of its width/height
const PHOTO_DOTS = [
  [0.1734, 0.7929],
  [0.4173, 0.7176],
  [0.651, 0.5592],
  [0.8783, 0.4596],
]

const STATS = [
  { value: 200, suffix: '+', label: 'Funding rounds closed' },
  { value: 300, suffix: '+', label: 'Businesses scaled internationally' },
  { value: 20, suffix: '+', label: 'Years of experience' },
  { text: 'EU · US · UK', label: 'Cross-border practice' },
]

// Mirrors `object-fit: cover; object-position: center bottom` to find each dot on screen
function useDotPositions(imgRef) {
  const [dots, setDots] = useState([])
  useLayoutEffect(() => {
    const measure = () => {
      const img = imgRef.current
      if (!img) return
      const W = img.clientWidth
      const H = img.clientHeight
      const s = Math.max(W / IMG_W, H / IMG_H)
      const offX = img.offsetLeft + (W - IMG_W * s) / 2
      const offY = img.offsetTop + H - IMG_H * s
      setDots(PHOTO_DOTS.map(([fx, fy]) => ({ x: offX + fx * IMG_W * s, y: offY + fy * IMG_H * s })))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(imgRef.current)
    return () => ro.disconnect()
  }, [imgRef])
  return dots
}

export default function Hero() {
  const sceneRef = useRef(null)
  const contentRef = useRef(null)
  const photoRef = useRef(null)
  const dots = useDotPositions(photoRef)

  // The mountains drift and slowly zoom as the hero scrolls
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 1000)
        if (sceneRef.current) sceneRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.00018})`
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`
          contentRef.current.style.opacity = String(Math.max(0, 1 - y / 700))
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])

  return (
    <section className="hero">
      <div className="hero-scene" ref={sceneRef}>
        <img className="hero-photo" ref={photoRef} src={HERO_IMAGE} alt="" />
        <div className="hero-sun" aria-hidden="true" />
        {dots.map((d, i) => (
          <span key={i} className="photo-dot" style={{ left: d.x, top: d.y, '--i': i }} aria-hidden="true" />
        ))}
      </div>

      <div className="container hero-content" ref={contentRef}>
        <p className="eyebrow hero-in" style={{ '--d': '0.2s' }}>— Let’s make the most at every stage —</p>
        <h1 className="hero-title">
          <span className="hero-line"><span style={{ '--d': '0.35s' }}>Your Legal Partner</span></span>
          <span className="hero-line"><span style={{ '--d': '0.5s' }}>for Growth, Funding,</span></span>
          <span className="hero-line"><span style={{ '--d': '0.65s' }}>and Global Expansion.</span></span>
        </h1>
        <p className="hero-sub hero-in" style={{ '--d': '0.9s' }}>Partners in shaping the way ahead.</p>
        <a href="#routes" className="btn btn-outline btn-lg hero-in" style={{ '--d': '1.05s' }}>
          Choose your path <span className="bob" aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="hero-stats">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="stat hero-in"
            style={{ '--d': `${1.4 + i * 0.15}s`, '--x': dots[i] ? `clamp(150px, ${dots[i].x}px, calc(100% - 150px))` : `${(i + 0.5) * 25}%` }}
          >
            <span className="stat-value">
              {s.text ?? <CountUp to={s.value} suffix={s.suffix} delay={1400 + i * 150} />}
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
