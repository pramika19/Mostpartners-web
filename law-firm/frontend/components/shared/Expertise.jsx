import { Link } from 'react-router-dom'
import Architecture from './Architecture.jsx'

export const AREAS = [
  { icon: 'company-setup', label: 'Company setup and structuring' },
  { icon: 'hiring', label: 'Hiring and incentive programs' },
  { icon: 'fundraising', label: 'Fundraising, VC and M&A' },
  { icon: 'contracts', label: 'Commercial contracts and operations' },
  { icon: 'ip', label: 'IP protection' },
  { icon: 'global', label: 'Global expansion' },
]

export default function Expertise({
  intro = 'We integrate legal considerations into business strategy, supporting our clients in:',
  sub,
  more,
}) {
  return (
    <section className="section expertise" id="expertise">
      <div className="container expertise-grid">
        <div className="expertise-intro" data-reveal>
          <p className="eyebrow">— What we do —</p>
          <h2 className="h-display">Our <span className="grad-text">Expertise</span></h2>
          {sub && <p className="expertise-sub">{sub}</p>}
          <p className="lead">{intro}</p>
          <a href="#contact" className="text-link">
            Talk to a partner <span aria-hidden="true">↗</span>
          </a>
          <Architecture variant="framework" />
        </div>
        <ul className="expertise-boxes">
          {AREAS.map(({ icon, label }, i) => (
            <li key={label} className="expertise-box" data-reveal style={{ '--d': `${0.1 + i * 0.08}s` }}>
              <div className="expertise-icon">
                <img src={`/images/icons/${icon}.png`} alt="" />
              </div>
              <p>{label}</p>
            </li>
          ))}
        </ul>
      </div>
      {more && (
        <div className="container expertise-more" data-reveal>
          <Link to={more.to} className="expertise-more-link">{more.label} <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </section>
  )
}
