import { Link } from 'react-router-dom'
import OrangeArchitecture from '../../pages/explore/founders/OrangeArchitecture.jsx'

export const AREAS = [
  { icon: 'company-setup', title: <>Company setup<br />and structuring</>, text: 'Locally and internationally – ready to scale and raise capital.', cta: 'Let’s start' },
  { icon: 'hiring', title: <>Hiring and<br />incentive programs</>, text: 'Hiring, equity plans and contractors – the right team, with confidence.', cta: 'Let’s hire' },
  { icon: 'fundraising', title: <>Fundraising,<br />VC and M&amp;A</>, text: 'From term sheet to closing, and buy- and sell-side deals.', cta: 'Let’s fund' },
  { icon: 'contracts', title: <>Commercial contracts<br />and operations</>, text: 'Contracts that support your product, platform and operations.', cta: 'Let’s sign' },
  { icon: 'ip', title: 'IP protection', text: 'Ownership, licensing, confidentiality and open-source risk.', cta: 'Let’s create' },
  { icon: 'global', title: 'Global expansion', text: 'Foreign entities, global contracts and compliance.', cta: 'Let’s expand' },
]

export default function Expertise({
  intro = 'We integrate legal considerations into business strategy, supporting our clients in:',
  sub,
  more,
  arch = false,
}) {
  return (
    <section className="section expertise" id="expertise">
      {/* faint brown line architecture behind the cards, drawn in as the section scrolls by */}
      {arch && <OrangeArchitecture variant="colonnade" />}
      <div className="container">
        <div className="expertise-intro" data-reveal>
          <p className="eyebrow">— What we do —</p>
          <h2 className="h-display">Our <span className="grad-text">Expertise</span></h2>
          {sub && <p className="expertise-sub">{sub}</p>}
          <p className="lead">{intro}</p>
        </div>
        <ul className="expertise-boxes">
          {AREAS.map(({ icon, title, text, cta }, i) => (
            <li key={icon} className="expertise-box expertise-card" data-reveal style={{ '--d': `${0.1 + i * 0.08}s` }}>
              <div className="expertise-card-text">
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact" className="expertise-cta">{cta} <span aria-hidden="true">↗</span></a>
              </div>
              <div className="expertise-icon" style={{ '--f': `${i * -1.3}s` }}>
                <img src={`${import.meta.env.BASE_URL}images/icons/${icon}.png`} alt="" />
              </div>
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
