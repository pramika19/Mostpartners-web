import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand" data-reveal>
          <Logo />
          <p>Long-term partners in law and business.</p>
        </div>
        <div className="footer-col" data-reveal style={{ '--d': '0.1s' }}>
          <h4>Pages</h4>
          <Link to="/about">About us</Link>
          <Link to="/#expertise">Our Expertise</Link>
          <Link to="/about#team">Our Team</Link>
          <a href="#contact">Contact us</a>
        </div>
        <div className="footer-col" data-reveal style={{ '--d': '0.2s' }}>
          <h4>Explore as</h4>
          <Link to="/founders">Founders</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/investors">Investors</Link>
        </div>
        <div className="footer-col" data-reveal style={{ '--d': '0.3s' }}>
          <h4>Contact</h4>
          <a href="mailto:bemost@mostpartners.com">bemost@mostpartners.com</a>
          <span>Bracka 20, 00-028 Warsaw, Poland</span>
          <a href="https://www.linkedin.com" className="social" aria-label="LinkedIn" target="_blank" rel="noreferrer">in</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Most Partners. All rights reserved.</span>
      </div>
    </footer>
  )
}
