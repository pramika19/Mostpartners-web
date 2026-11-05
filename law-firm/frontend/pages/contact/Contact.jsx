import { useState } from 'react'
import GrowTogether from '../../components/shared/GrowTogether.jsx'
import Architecture from '../../components/shared/Architecture.jsx'

const EMAIL = 'bemost@mostpartners.com'
const ROLES = ['Founder', 'Company', 'Investor', 'Other']

// Contact: Pramika's lookout photo as the hero, then a short form that opens a ready-written email
export default function Contact() {
  const [role, setRole] = useState('Founder')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const send = (e) => {
    e.preventDefault()
    const subject = `New enquiry from ${form.name || 'the website'} (${role})`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      `I am a: ${role}`,
      '',
      form.message,
    ].filter((l) => l !== false).join('\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main className="page--contact">
      <section className="ct-hero">
        <img className="ct-photo" src={`${import.meta.env.BASE_URL}images/hero-contact-lookout.jpg`} alt="" />
        <div className="container ct-hero-content">
          <p className="eyebrow hero-in" style={{ '--d': '0.2s' }}>Let’s make the most at every stage</p>
          <h1 className="ct-title">
            <span className="hero-line"><span style={{ '--d': '0.35s' }}>Let’s talk about</span></span>
            <span className="hero-line"><span style={{ '--d': '0.5s' }}><span className="grad-text">what comes next.</span></span></span>
          </h1>
          <p className="hero-sub hero-in" style={{ '--d': '0.8s' }}>Tell us where you are headed. We usually reply within one business day.</p>
        </div>
        {/* a glowing line runs down and off the hero, inviting the scroll to the form */}
        <a href="#ct-form" className="ct-scroll hero-in" style={{ '--d': '1.2s' }} aria-label="Scroll to the form">
          <span className="ct-scroll-label">Scroll to write to us</span>
          <span className="ct-scroll-line" aria-hidden="true"><span /></span>
        </a>
      </section>

      <section className="ct-form-section" id="ct-form">
        <Architecture variant="skyline" className="ct-arch" />
        <Architecture variant="courthouse" className="ct-topo" />
        <div className="container ct-form-grid">
          <div className="ct-form-head" data-reveal>
            <p className="eyebrow">— Get in touch —</p>
            <h2 className="ct-h2">Start the <span className="grad-text">conversation.</span></h2>
            <p className="ct-lead">A few lines are enough. Share your stage, your plans and what you need, and the right partner will come back to you.</p>
            <dl className="ct-details">
              <div className="ct-detail" data-reveal style={{ '--d': '0.2s' }}>
                <dt className="ct-label">Email</dt>
                <dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
              </div>
              <div className="ct-detail" data-reveal style={{ '--d': '0.3s' }}>
                <dt className="ct-label">Our experience</dt>
                <dd>Europe – US – UK</dd>
              </div>
              <div className="ct-detail" data-reveal style={{ '--d': '0.4s' }}>
                <dt className="ct-label">Office</dt>
                <dd>Bracka 20, 00-028 Warsaw</dd>
              </div>
              <div className="ct-detail" data-reveal style={{ '--d': '0.5s' }}>
                <dt className="ct-label">Follow us</dt>
                <dd><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></dd>
              </div>
            </dl>
          </div>
          <form className="ct-form" onSubmit={send} data-reveal style={{ '--d': '0.15s' }}>
            <span className="ct-form-glow" aria-hidden="true" />
            <fieldset className="ct-roles">
              <legend className="ct-label">I am a</legend>
              {ROLES.map((r) => (
                <button type="button" key={r} className={`ct-chip ${role === r ? 'is-on' : ''}`} aria-pressed={role === r} onClick={() => setRole(r)}>{r}</button>
              ))}
            </fieldset>
            <div className="ct-row">
              <label className="ct-field"><span className="ct-label">Name</span><input required value={form.name} onChange={set('name')} autoComplete="name" /></label>
              <label className="ct-field"><span className="ct-label">Email</span><input required type="email" value={form.email} onChange={set('email')} autoComplete="email" /></label>
            </div>
            <label className="ct-field"><span className="ct-label">Company <em>(optional)</em></span><input value={form.company} onChange={set('company')} autoComplete="organization" /></label>
            <label className="ct-field"><span className="ct-label">How can we help?</span><textarea required rows="4" value={form.message} onChange={set('message')} /></label>
            <button type="submit" className="btn btn-solid btn-lg ct-send">Send message <span aria-hidden="true">→</span></button>
          </form>
        </div>
      </section>

      {/* same footer as the home page; its button jumps back up to the form */}
      <GrowTogether
        title={<>Want to unlock business potential<br /><span className="grad-text">built for growth?</span></>}
        cta="Let’s shape your growth.."
        to="/contact#ct-form"
      />
    </main>
  )
}
