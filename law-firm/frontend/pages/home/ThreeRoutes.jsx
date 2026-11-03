import { useState } from 'react'
import { Link } from 'react-router-dom'
import Architecture from '../../components/shared/Architecture.jsx'

const ROUTES = [
  {
    name: 'Founders',
    tagline: 'Starting, building and growing',
    text: ' We accompany you as your legal and strategic partner at every stage of building your business.',
    points: [
      'Form your company and set up your cap table',
      'Raise funding and negotiate terms that protect real value',
      'Hire and incentivise the team (employment, contractors, ESOP)',
      'Protect your IP, technology and product',
    ],
    cta: 'Explore as a founder',
  },
  {
    name: 'Companies',
    tagline: 'Scaling and expanding with confidence',
    text: 'We structure the legal framework for your business to scale and expand with confidence.',
    points: [
      'Build legal foundations for day-to-day operations and growth',
      'Raise capital with clear, investor-aligned terms and documentation',
      'Manage employment, contractors and incentive plans (ESOP/VSOP)',
      'Navigate cross-border expansion',
    ],
    cta: 'Explore as a company',
  },
  {
    name: 'Investors',
    tagline: 'Investing across borders, turning investments into lasting value',
    text: 'We structure, negotiate and close deals with clarity protecting your interests.',
    points: [
      'Structure deals with future growth and exit in mind',
      'Negotiate balanced, investor-aligned terms',
      'Identify material risks through focused due diligence',
      'Close investments across jurisdictions and time zones',
    ],
    cta: 'Explore as an investor',
  },
]

// Text on the left; on the right each route shows its name and tagline on a timeline, and the + opens the details (one card at a time)
export default function ThreeRoutes() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section routes" id="routes">
      <Architecture variant="skyline" />
      <div className="container">
        <div className="routes-layout">
          <div className="routes-head">
            <div data-reveal>
              <p className="eyebrow">— Explore as —</p>
              <h2 className="h-display routes-title">Three Routes,<br /><span className="grad-text">One Partner</span></h2>
            </div>
            <p className="lead" data-reveal style={{ '--d': '0.15s' }}>
              Different priorities, different stages, but always the same long-term partnership in law and business.
            </p>
          </div>
          {/* The cards hang on a vertical timeline; the + opens one at a time */}
          <div className="route-cards">
            <span className="route-line" aria-hidden="true" />
            {ROUTES.map((r, i) => {
              const isOpen = open === i
              return (
                <div key={r.name} className="route-item" data-open={isOpen}>
                  <span className="route-node" aria-hidden="true" />
                  <div className="route-card" data-open={isOpen} data-reveal style={{ '--d': `${0.1 + i * 0.32}s`, '--i': i }}>
                    <span className="route-edge" aria-hidden="true" />
                    <button type="button" className="route-toggle" aria-expanded={isOpen} aria-controls={`route-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}>
                      <span className="route-title" role="heading" aria-level={3}>
                        <span className="route-name">{r.name}</span>
                        <span className="route-tagline">{r.tagline}</span>
                      </span>
                      <span className="route-plus" aria-hidden="true" />
                      <span className="sr-only">{isOpen ? 'Hide details' : 'Show details'}</span>
                    </button>
                    <div className="route-body" id={`route-${i}`}>
                      <div className="route-body-inner">
                        <p>{r.text}</p>
                        <ul>
                          {r.points.map((p, k) => <li key={p} style={{ '--k': k }}>{p}</li>)}
                        </ul>
                        <Link to={`/${r.name.toLowerCase()}`} className="route-cta" tabIndex={isOpen ? 0 : -1}>{r.cta} <span aria-hidden="true">→</span></Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
