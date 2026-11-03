import { useLayoutEffect, useRef, useState } from 'react'
import CountUp from './CountUp.jsx'

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/hero-home-climb.jpg`
const IMG_W = 1620
const IMG_H = 971

// Where the four orange dots sit in the photo, as fractions of its width/height
const PHOTO_DOTS = [
  [0.1699, 0.765],
  [0.4144, 0.697],
  [0.6432, 0.5601],
  [0.8747, 0.4741],
]

const STATS = [
  { value: 200, suffix: '+', label: 'Funding rounds closed' },
  { value: 300, suffix: '+', label: 'Businesses scaled internationally' },
  { value: 20, suffix: '+', label: 'Years of experience' },
  { text: 'EU · US · UK', label: 'Cross-border practice' },
]

// Mirrors `object-fit: cover; object-position: center bottom` to find each dot on screen
function useDotPositions(imgRef, statsRef) {
  const [dots, setDots] = useState([])
  const [box, setBox] = useState(null)
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
      const stats = statsRef.current
      if (stats) setBox({ w: stats.offsetWidth, h: stats.offsetTop + 8, show: stats.offsetLeft === 0 && getComputedStyle(stats).position === 'absolute' })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(imgRef.current)
    if (statsRef.current) ro.observe(statsRef.current)
    return () => ro.disconnect()
  }, [imgRef, statsRef])
  return [dots, box]
}

// Same rule as the stat's left: clamp(150px, x, 100% - 150px)
const statX = (x, w) => Math.min(Math.max(x, 150), w - 150)

export default function Hero() {
  const photoRef = useRef(null)
  const statsRef = useRef(null)
  const [dots, box] = useDotPositions(photoRef, statsRef)

  return (
    <section className="hero">
      <div className="hero-scene">
        <img className="hero-photo" ref={photoRef} src={HERO_IMAGE} alt="" />
        <div className="hero-sun" aria-hidden="true" />
        {dots.map((d, i) => (
          <span key={i} className="photo-dot" style={{ left: d.x, top: d.y, '--i': i }} aria-hidden="true" />
        ))}
      </div>

      {/* Orange dotted threads tying each dot on the line to its number below */}
      {box?.show && dots.length > 0 && (
        <svg className="hero-links" width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true">
          {dots.map((d, i) => {
            const path = `M${d.x} ${d.y + 12} L${statX(d.x, box.w)} ${box.h - 6}`
            return (
              <g key={i} style={{ '--i': i }}>
                <path className="hero-link" d={path} />
                <path className="hero-link-spark" d={path} pathLength="100" />
                <circle className="hero-link-end" cx={statX(d.x, box.w)} cy={box.h - 6} r="2.5" />
              </g>
            )
          })}
        </svg>
      )}

      {/* The text stays pinned while the tall hero scrolls past, then leaves with it */}
      <div className="hero-pin">
        <div className="container hero-content">
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
      </div>

      <div className="hero-stats" ref={statsRef}>
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
