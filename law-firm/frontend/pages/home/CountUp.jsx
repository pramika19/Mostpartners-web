import { useEffect, useState } from 'react'

// Counts from 0 to `to` with an ease-out curve, after `delay` ms.
export default function CountUp({ to, suffix = '', duration = 1800, delay = 0 }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return }
    let frame
    let start
    const timer = setTimeout(() => {
      const step = (ts) => {
        start ??= ts
        const p = Math.min((ts - start) / duration, 1)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(frame) }
  }, [to, duration, delay])

  return <>{n}{suffix}</>
}
