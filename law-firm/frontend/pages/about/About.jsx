import { Link } from 'react-router-dom'
import PageHero from '../../components/shared/PageHero.jsx'
import PageScene from '../../components/shared/PageScene.jsx'
import ArchBackdrop from '../../components/shared/ArchBackdrop.jsx'
import Architecture from '../../components/shared/Architecture.jsx'
import Timeline from '../../components/shared/Timeline.jsx'
import TeamGrid from './TeamGrid.jsx'
import GrowTogether from '../../components/shared/GrowTogether.jsx'

const STATS = [
  { value: '200+', label: 'Funding rounds closed' },
  { value: '300+', label: 'Businesses scaled' },
  { value: '20+', label: 'Years of experience' },
  { value: '3', label: 'Legal systems: PL · UK · US' },
]

const VALUES = [
  { title: 'Ambition', text: 'We are drawn to bold plans and the people brave enough to pursue them.' },
  { title: 'Clarity', text: 'Plain-language advice, clear options and honest recommendations.' },
  { title: 'Partnership', text: 'We measure success by the long-term growth of the businesses we serve.' },
  { title: 'Integrity', text: 'Discretion, independence and the highest professional standards.' },
  { title: 'Global outlook', text: 'Cross-border by default, with deep roots in every market we work in.' },
]

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title={['Long-term partners', 'in law and business.']}
        sub="Most Partners is a boutique law firm for founders, companies and investors who are building something that lasts."
        scene={<PageScene variant="about" />}
      >
        <div className="hero-actions">
          <a href="#team" className="btn btn-solid btn-lg">Meet the team <span aria-hidden="true">↓</span></a>
          <a href="#contact" className="btn btn-outline btn-lg">Contact us</a>
        </div>
      </PageHero>

      <section className="section story">
        <ArchBackdrop variant="arches" />
        <div className="container story-grid">
          <div>
            <p className="eyebrow" data-reveal>— Our story —</p>
            <h2 className="h-display" data-reveal style={{ '--d': '0.1s' }}>
              Built for those who <span className="grad-text">aim higher.</span>
            </h2>
            <Architecture variant="courthouse" />
          </div>
          <div className="story-text">
            <p data-reveal>
              We started Most Partners with a simple belief: legal advice should move a business forward, not hold it back.
              Too often, ambitious teams are left choosing between slow, traditional firms and advice that does not
              understand their market.
            </p>
            <p data-reveal style={{ '--d': '0.1s' }}>
              Today we advise founders, scale-ups and investors across Polish, English and US law. We work as an extension
              of our clients’ teams, combining legal precision with commercial instinct, from the first incorporation to
              international expansion and exit.
            </p>
            <Link to="/#expertise" className="text-link" data-reveal style={{ '--d': '0.2s' }}>
              Explore our expertise <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="container">
          <ul className="about-stats">
            {STATS.map((s, i) => (
              <li key={s.label} data-reveal style={{ '--d': `${i * 0.1}s` }}>
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section values">
        <ArchBackdrop variant="atrium" />
        <div className="container who-grid">
          <div className="who-intro">
            <p className="eyebrow" data-reveal>— What we stand for —</p>
            <h2 className="h-display" data-reveal style={{ '--d': '0.1s' }}>
              Our <span className="grad-text">values</span>
            </h2>
            <p className="lead" data-reveal style={{ '--d': '0.2s' }}>
              Five principles that shape every piece of advice we give.
            </p>
            <Architecture variant="framework" />
          </div>
          <Timeline items={VALUES} />
        </div>
      </section>

      <TeamGrid />
      <GrowTogether />
    </main>
  )
}
