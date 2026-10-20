import { useEffect, useRef, useState } from 'react'

// A vertical list whose orange line fills as the reader scrolls, lighting each dot it reaches
export default function Timeline({ items }) {
  const listRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const list = listRef.current
      if (!list) return
      const marker = window.innerHeight * 0.6
      const rect = list.getBoundingClientRect()
      setProgress(Math.min(1, Math.max(0, (marker - rect.top) / rect.height)))
      let last = -1
      list.querySelectorAll('.timeline-dot').forEach((d, i) => { if (d.getBoundingClientRect().top < marker) last = i })
      setActive(last)
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ol className="timeline" ref={listRef} style={{ '--p': progress }}>
      <span className="timeline-track" aria-hidden="true"><span className="timeline-fill" /><span className="timeline-head" /></span>
      {items.map((t, i) => (
        <li key={t.title} className={`timeline-item ${i <= active ? 'is-active' : ''}`}>
          <span className="timeline-dot" aria-hidden="true" />
          <span className="topic-num">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="topic-title">{t.title}</h3>
          {t.kicker && <p className="topic-kicker">{t.kicker}</p>}
          <p className="topic-text">{t.text}</p>
        </li>
      ))}
    </ol>
  )
}
