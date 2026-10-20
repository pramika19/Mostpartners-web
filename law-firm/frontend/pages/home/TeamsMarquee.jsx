// Placeholder client logos. Replace each entry with an <img> of the real logo later.
const LOGOS = [
  { name: 'Northwind', shape: 'circle' },
  { name: 'Altura', shape: 'triangle' },
  { name: 'Lumen Labs', shape: 'square' },
  { name: 'Vertex', shape: 'diamond' },
  { name: 'Kestrel', shape: 'circle' },
  { name: 'Summit Co.', shape: 'triangle' },
  { name: 'Orbital', shape: 'ring' },
  { name: 'Halcyon', shape: 'square' },
]

const Mark = ({ shape }) => (
  <svg viewBox="0 0 24 24" className="logo-mark" aria-hidden="true">
    {shape === 'circle' && <circle cx="12" cy="12" r="9" />}
    {shape === 'ring' && <><circle cx="12" cy="12" r="9" fill="none" /><circle cx="12" cy="12" r="4" /></>}
    {shape === 'triangle' && <path d="M12 3l10 18H2z" />}
    {shape === 'square' && <rect x="4" y="4" width="16" height="16" rx="4" />}
    {shape === 'diamond' && <path d="M12 2l10 10-10 10L2 12z" />}
  </svg>
)

export default function TeamsMarquee() {
  // The list is rendered twice so the loop is seamless at -50%.
  const items = [...LOGOS, ...LOGOS]
  return (
    <section className="section teams" id="team">
      <div className="container section-head section-head--center" data-reveal>
        <p className="eyebrow">— Trusted by —</p>
        <h2 className="h-display">Teams We Have <span className="grad-text">Worked With</span></h2>
      </div>
      <div className="marquee" data-reveal style={{ '--d': '0.2s' }}>
        <ul className="marquee-track">
          {items.map((l, i) => (
            <li key={i} className="marquee-item" aria-hidden={i >= LOGOS.length}>
              <Mark shape={l.shape} />
              <span>{l.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
