// Investors hero: the twilight summit photo with a deal line that climbs the sky above the
// range, lighting each stage of a transaction as it passes, then keeps a pulse moving along it.
import PageScene from '../../../components/shared/PageScene.jsx'

const POINTS = [[950, 480], [1030, 430], [1090, 448], [1170, 350], [1230, 368], [1300, 250], [1350, 262], [1410, 175]]
const STAGES = [
  { at: 1, label: 'Term sheet' },
  { at: 3, label: 'Diligence' },
  { at: 5, label: 'Closing' },
  { at: 7, label: 'Value created' },
]
const LINE = 'M' + POINTS.map((p) => p.join(' ')).join(' L')
const AREA = `${LINE} L1410 520 L950 520 Z`

export default function InvestorScene() {
  return (
    <div className="investor-scene">
      <PageScene variant="investors" />
      <svg className="deal-overlay" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="dealStroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#24375f" />
            <stop offset="0.55" stopColor="#f7692a" />
            <stop offset="1" stopColor="#f3d2b4" />
          </linearGradient>
          <linearGradient id="dealArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7692a" stopOpacity="0.22" />
            <stop offset="1" stopColor="#f7692a" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[180, 290, 400, 510].map((y, i) => (
          <line key={y} className="deal-grid" x1="900" x2="1440" y1={y} y2={y} style={{ '--i': i }} />
        ))}
        <path className="deal-area" d={AREA} fill="url(#dealArea)" />
        <path className="deal-line" d={LINE} pathLength="1" stroke="url(#dealStroke)" />
        {STAGES.map(({ at, label }, i) => {
          const [x, y] = POINTS[at]
          return (
            <g key={label} className="deal-stage" style={{ '--i': i }}>
              <line x1={x} x2={x} y1={y + 12} y2="520" className="deal-drop" />
              <circle cx={x} cy={y} r="14" className="deal-ring" />
              <circle cx={x} cy={y} r="5" className="deal-node" />
              <text x={x - 12} y={y - 24} textAnchor="end" className="deal-label">{label}</text>
            </g>
          )
        })}
        <circle r="4" className="deal-pulse">
          <animateMotion dur="6s" begin="3.4s" repeatCount="indefinite" path={LINE} />
        </circle>
      </svg>
    </div>
  )
}
