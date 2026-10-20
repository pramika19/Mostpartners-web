import { Link } from 'react-router-dom'
import Architecture from '../../components/shared/Architecture.jsx'
import ArchBackdrop from '../../components/shared/ArchBackdrop.jsx'
import Timeline from '../../components/shared/Timeline.jsx'

const TOPICS = [
  {
    title: 'Our Perspective',
    kicker: 'Improving business outcomes through legal and strategic judgment.',
    text: 'The legal work is the mechanism. The value is the business outcome. We combine cross-border legal and business experience in Europe, the US and the UK with an investment-driven understanding of how businesses raise capital, hire, scale and make strategic decisions.',
  },
  {
    title: 'Our Experience',
    text: 'We accompany our clients through every stage of growth, from early decisions to cross-border deals, supporting their day-to-day business operations, funding rounds, international expansion, and complex commercial and M&A transactions.',
  },
  {
    title: 'Our Approach',
    text: 'We use legal expertise and strategic judgment to improve business outcomes, helping you make better decisions, protect deal economics, manage downside risk and avoid unnecessary complexity.',
  },
  {
    title: 'Our Mission',
    text: 'Our mission is to help shape ideas into businesses built for growth, and investment opportunities into well-structured transactions.',
  },
  {
    title: 'Our Commitment',
    text: 'Your business will evolve, and so will our support. We are committed to helping you make informed decisions and achieve better business outcomes, wherever your next step takes you.',
  },
]

export default function WhoWeAre() {
  return (
    <section className="section who" id="who-we-are">
      <ArchBackdrop variant="atrium" />
      <div className="container who-grid">
        <div className="who-intro">
          <p className="eyebrow" data-reveal>— Who we are —</p>
          <h2 className="h-display" data-reveal style={{ '--d': '0.1s' }}>
            A law firm built for <span className="grad-text">tech, venture and cross-border growth.</span>
          </h2>
          <p className="lead" data-reveal style={{ '--d': '0.2s' }}>
            At Most, we help founders, companies and investors move from idea to exit, making deals
            happen, avoiding costly mistakes and unlocking opportunity.
          </p>
          <Link to="/about" className="btn btn-outline btn-sm" data-reveal style={{ '--d': '0.3s' }}>
            About us <span aria-hidden="true">↗</span>
          </Link>
          <Architecture variant="courthouse" />
        </div>
        <Timeline items={TOPICS} />
      </div>
    </section>
  )
}
