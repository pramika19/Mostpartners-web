import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

// A thin rail on the right edge: an orange dot travels down it as you scroll,
// and each section's marker lights up once you reach it.
export default function ScrollRail() {
  const { pathname } = useLocation()
  const [progress, setProgress] = useState(0)
  const [marks, setMarks] = useState([])
  const marksRef = useRef([])

  useEffect(() => {
    let frame = 0
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      marksRef.current = [...document.querySelectorAll('main section')].map((s) =>
        Math.min(1, Math.max(0, (s.offsetTop - window.innerHeight * 0.4) / max))
      )
      setMarks(marksRef.current)
    }
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    const t = setTimeout(() => { measure(); update() }, 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [pathname])

  return (
    <div className="rail" aria-hidden="true" style={{ '--p': progress }}>
      <span className="rail-fill" />
      {marks.map((m, i) => (
        <span key={i} className={`rail-mark ${progress >= m - 0.001 ? 'is-on' : ''}`} style={{ top: `${m * 100}%` }} />
      ))}
      <span className="rail-dot" />
    </div>
  )
}
