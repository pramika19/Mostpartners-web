import { Link } from 'react-router-dom'
import Architecture from '../../components/shared/Architecture.jsx'

const ROUTES = [
  {
    name: 'Founders',
    tagline: 'Starting, building and growing',
    text: 'We accompany you as your legal and strategic partner through every stage of building your business, from formation and hiring to funding, expansion and exit. We help you make key decisions, put the right structures in place and navigate the legal and strategic aspects of running a business, so you can focus on growing it.',
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
    text: 'We structure the legal framework and put in place the processes each business needs to scale and expand with confidence. From day-to-day operations and commercial contracts to cross-border transactions and complex deals, we support your next stage of growth, helping you scale operations, evolve your business structure and enter new markets.',
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
    text: 'We structure, negotiate and close deals so you can focus on sourcing opportunities and building your portfolio. Our focus is on bringing clarity to deal economics, investor rights and downside risks, from due diligence through closing. Partner with us to turn potential into performance and close deals seamlessly across borders, time zones and stages of growth.',
    points: [
      'Structure deals with future growth and exit in mind',
      'Negotiate balanced, investor-aligned terms',
      'Identify material risks through focused due diligence',
      'Close investments across jurisdictions and time zones',
    ],
    cta: 'Explore as an investor',
  },
]

export default function ThreeRoutes() {
  return (
    <section className="section routes" id="routes">
      <Architecture variant="skyline" />
      <div className="container">
        <div className="routes-head">
          <div data-reveal>
            <p className="eyebrow">— Explore as —</p>
            <h2 className="h-display">Three Routes, <span className="grad-text">One Partner</span></h2>
          </div>
          <p className="lead" data-reveal style={{ '--d': '0.15s' }}>
            Different priorities, different stages, but always the same long-term partnership in law and business.
          </p>
        </div>
        <div className="route-cards">
          {ROUTES.map((r, i) => (
            <Link key={r.name} to={`/${r.name.toLowerCase()}`} className="route-card" data-reveal style={{ '--d': `${0.15 + i * 0.12}s`, '--i': i }}>
              <span className="route-edge" aria-hidden="true" />
              <h3>{r.name}</h3>
              <p className="route-tagline">{r.tagline}</p>
              <p>{r.text}</p>
              <ul>
                {r.points.map((p, k) => <li key={p} style={{ '--k': k }}>{p}</li>)}
              </ul>
              <span className="route-cta">{r.cta} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
