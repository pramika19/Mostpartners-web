import { useEffect, useRef } from 'react'

// Large orange line architecture behind a section: a colonnade, arches and a rising frame
// that draw themselves in as the section scrolls through the screen.
function Colonnade() {
  const cols = Array.from({ length: 9 }, (_, n) => 140 + n * 145)
  return (
    <>
      <path pathLength="1" d="M60 860 H1380 M90 840 H1350 M120 820 H1320" />
      {cols.map((x) => (
        <path pathLength="1" key={x} d={`M${x - 26} 820 V800 H${x + 26} V820 M${x - 18} 800 V360 M${x + 18} 800 V360 M${x - 6} 790 V370 M${x + 6} 790 V370 M${x - 30} 360 H${x + 30} V344 H${x - 30} Z`} />
      ))}
      <path pathLength="1" d="M90 344 H1350 V300 H90 Z M90 322 H1350" />
      <path pathLength="1" d="M70 300 L720 90 L1370 300 Z M150 290 L720 112 L1290 290" />
      <path pathLength="1" d="M690 210 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0" />
    </>
  )
}

function Arches() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((n) => {
        const x = 120 + n * 250
        return <path pathLength="1" key={n} d={`M${x} 860 V460 A110 110 0 0 1 ${x + 220} 460 V860 M${x + 30} 860 V470 A80 80 0 0 1 ${x + 190} 470 V860`} />
      })}
      <path pathLength="1" d="M80 860 H1360 M80 330 H1360 M80 300 H1360" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
        <path pathLength="1" key={`w${n}`} d={`M${100 + n * 100} 300 V200 H${160 + n * 100} V300`} />
      ))}
    </>
  )
}

function Frame() {
  // a modern tower frame next to a stepped classical base; each line is its own path so
  // the flowing lights can run along them independently
  const lines = []
  for (let f = 0; f <= 12; f++) lines.push(`M820 ${860 - f * 55} H1240`)
  for (let c = 0; c <= 6; c++) lines.push(`M${820 + c * 70} 860 V200`)
  for (let f = 0; f < 12; f++) lines.push(`M820 ${860 - f * 55} L890 ${805 - f * 55}`)
  lines.push('M140 860 V560 H600 V860', 'M180 560 V480 H560 V560', 'M230 480 V420 H510 V480', 'M140 700 H600', 'M140 630 H600')
  lines.push('M1290 860 V140', 'M1290 140 H880', 'M1290 140 L1240 100', 'M1290 600 L1340 860')
  return lines.map((d, i) => <path pathLength="1" key={i} d={d} style={{ '--k': i }} />)
}

// Windows in the tower that light up one after another, on a slow loop
function FrameWindows() {
  const cells = []
  for (let f = 1; f < 12; f++) for (let c = 0; c < 6; c++) if ((f * 7 + c * 3) % 5 === 0) cells.push([830 + c * 70, 868 - (f + 1) * 55, cells.length])
  return cells.map(([x, y, i]) => <rect key={i} className="arch-window" x={x} y={y} width="50" height="35" style={{ '--k': i }} />)
}

const DRAWINGS = { colonnade: Colonnade, arches: Arches, frame: Frame }

export default function OrangeArchitecture({ variant = 'colonnade', flow = false }) {
  const ref = useRef(null)
  useEffect(() => {
    let frame = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const r = el.parentElement.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh * 0.2)))
      el.style.setProperty('--draw', String(Math.min(1, p * 1.5)))
      el.style.transform = `translate3d(0, ${(r.top + r.height / 2 - vh / 2) * -0.08}px, 0)`
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
  const Drawing = DRAWINGS[variant]
  return (
    <div className="orange-arch" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax meet">
        <g><Drawing /></g>
        {flow && <g className="arch-flow"><Drawing /></g>}
        {flow && variant === 'frame' && <g><FrameWindows /></g>}
      </svg>
    </div>
  )
}
