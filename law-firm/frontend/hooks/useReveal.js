import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Fades elements marked with data-reveal into view as they scroll in.
export default function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible)')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target
            el.classList.add('is-visible')
            io.unobserve(el)
            // Once the entrance is over, hand transitions back to hover effects
            setTimeout(() => el.classList.add('reveal-done'), 1800)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}
