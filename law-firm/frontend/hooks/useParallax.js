import { useEffect } from 'react'

// Moves an element at `speed` relative to its section as the page scrolls.
export default function useParallax(ref, speed = 0.15, scaleBy = 0) {
  useEffect(() => {
    let frame = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const host = el.parentElement.getBoundingClientRect()
      const offset = host.top + host.height / 2 - window.innerHeight / 2
      const scale = 1 + Math.min(Math.abs(offset) / window.innerHeight, 1) * scaleBy
      el.style.transform = `translate3d(0, ${offset * -speed}px, 0) scale(${scale})`
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
  }, [ref, speed, scaleBy])
}
