import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const onFounders = useLocation().pathname === '/founders'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''} ${onFounders ? 'nav--ink' : ''}`}>
      <div className="nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Main">
          <div className="nav-group">
            <NavLink to="/about" onClick={close}>About us</NavLink>
            <Link to="/#expertise" onClick={close}>Our Expertise</Link>
            <Link to="/about#team" onClick={close}>Our Team</Link>
          </div>
          <div className="nav-group">
            <span className="nav-label">Explore as <span className="dash" /></span>
            <NavLink to="/founders" onClick={close}>Founders</NavLink>
            <NavLink to="/companies" onClick={close}>Companies</NavLink>
            <NavLink to="/investors" onClick={close}>Investors</NavLink>
          </div>
          <a href="#contact" className="btn btn-outline" onClick={close}>Contact us</a>
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  )
}
