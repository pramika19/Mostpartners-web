import { useEffect, useRef } from 'react'

// Fixed architectural backdrop for the Companies page: glass towers under a blue veil
// that slowly rise and settle as the page scrolls.
export default function CityBackdrop() {
  const ref = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      const p = window.scrollY / max
      el.style.transform = `translate3d(0, ${-p * 12}%, 0) scale(${1.02 + p * 0.1})`
      el.parentElement.style.setProperty('--fade', String(Math.min(window.scrollY / window.innerHeight, 1)))
    }
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="city-backdrop" aria-hidden="true">
      <div className="city-photo" ref={ref} />
      <div className="city-tint" />
    </div>
  )
}
