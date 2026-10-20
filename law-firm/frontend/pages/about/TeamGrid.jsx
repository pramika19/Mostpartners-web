import { TEAM } from './team.js'
import ArchBackdrop from '../../components/shared/ArchBackdrop.jsx'

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2)

export default function TeamGrid() {
  return (
    <section className="section team" id="team">
      <ArchBackdrop variant="atrium" speed={0.1} />
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow" data-reveal>— Our team —</p>
          <h2 className="h-display" data-reveal style={{ '--d': '0.1s' }}>
            The people <span className="grad-text">behind the climb</span>
          </h2>
          <p className="lead lead--center" data-reveal style={{ '--d': '0.2s' }}>
            Lawyers who think like business partners, and stay with you for the long run.
          </p>
        </div>
        <ul className="team-grid">
          {TEAM.map((m, i) => (
            <li key={i} className="team-card" data-reveal style={{ '--d': `${0.1 + (i % 3) * 0.12}s` }}>
              <div className="team-photo">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} loading="lazy" />
                ) : (
                  <div className="team-placeholder" aria-hidden="true">
                    <svg viewBox="0 0 200 250">
                      <path d="M30 250 V120 A70 70 0 0 1 170 120 V250" />
                      <path d="M50 250 V126 A50 50 0 0 1 150 126 V250" />
                    </svg>
                    <span>{initials(m.name)}</span>
                  </div>
                )}
                <span className="team-glow" aria-hidden="true" />
              </div>
              <div className="team-info">
                <span className="team-dot" aria-hidden="true" />
                <h3>{m.name}</h3>
                <p className="team-role">{m.role}</p>
                <p className="team-focus">{m.focus}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
